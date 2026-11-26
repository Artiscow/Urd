/**
 * What the deployed site tells the editor: the publish history and its revert, the update check and the update, the publish baseline.
 */
import { ta, taApiError } from '$engine/i18n.js';
import { awaitServed, deployTargets } from '../lib/deploy-wait.js';
import { shellState } from './shell.svelte.js';

/**
 * The HEAD commit when the editor loaded or last published: the conflict check's baseline, null where unknown.
 */
let baseSha = null;

async function refreshBaseSha() {
  try {
    const res = await fetch('/api/github/latest');
    if (res.ok) baseSha = (await res.json()).head ?? null;
  } catch { /* publishing layer unavailable */ }
}

/**
 * The check before a publish: whether another publish since the load touched the same files; gives the HEAD seen, sent as `expect`, and the warning or null.
 */
async function checkConflict(files) {
  if (!baseSha) {
    // Without a baseline, HEAD is read now for `expect`, and the owner is asked, the overlap unknown.
    await refreshBaseSha();
    return {
      head: baseSha,
      warning: { heading: ta('confirm.conflictUnknown.title'), lines: [ta('confirm.conflictUnknown.body'), ta('confirm.conflictUnknown.warning')] },
    };
  }
  let data = null;
  try {
    const res = await fetch(`/api/github/latest?base=${baseSha}`);
    if (res.ok) data = await res.json().catch(() => null);
  } catch { /* unavailable: we do not stop the publish over that */ }
  if (!data?.head) return { head: null, warning: null };

  const head = data.head;
  if (head === baseSha) return { head, warning: null };

  const mine = new Set(files.map((f) => f.path));
  // A deleted folder (a removed plugin's) overlaps every file someone else changed under it.
  const folders = files.filter((f) => f.delete).map((f) => `${f.path}/`);
  // A truncated diff leaves the overlap unknown, so the owner is asked.
  const overlap = data.truncated
    ? [ta('confirm.conflict.truncated')]
    : (data.changedFiles ?? []).filter((p) => mine.has(p) || folders.some((folder) => p.startsWith(folder)));
  if (overlap.length === 0) return { head, warning: null };

  return {
    head,
    warning: { heading: ta('confirm.conflict.title'), lines: [ta('confirm.conflict.intro'), ...overlap.map((p) => `• ${p}`), ta('confirm.conflict.warning')] },
  };
}

/** null = not loaded yet; [] = loaded and empty */
let historyList = $state(null);

let historyError = $state('');

async function loadHistory() {
  historyError = '';
  try {
    const res = await fetch('/api/github/history');
    if (res.ok) {
      historyList = (await res.json()).commits;
    } else if (res.status === 401) {
      historyList = [];
      historyError = ta('status.historyLoginRequired');
    } else {
      historyList = [];
      historyError = taApiError(await res.json().catch(() => null)) ?? ta('status.historyFetchFailed');
    }
  } catch {
    historyList = [];
    historyError = ta('status.historyUnavailable');
  }
}

/**
 * A revert since the load, which blocks publishing until the admin is reloaded.
 */
let revertedSinceLoad = false;

/** The publish whose deploy is awaited; a newer publish silences an older wait. */
let publishWave = 0;

/**
 * After a publish: polls the committed files until the site serves them, and runs `onLive` then, even where a newer message has taken the status line.
 * @param {Array<object>} files The committed files
 * @param {() => void} [onLive]
 */
async function awaitPublishDeploy(files, onLive) {
  const wave = ++publishWave;
  // The status line's count at the publish: a message shown since silences the wait.
  const seq = shellState.statusSeq;
  const live = await awaitServed(deployTargets(files));
  if (live) onLive?.();
  if (wave !== publishWave || seq !== shellState.statusSeq) return;
  if (live) shellState.setStatus(ta('status.publishLive'), 'ok');
  else shellState.setStatus(ta('status.publishDeployTimeout'), 'error');
}

/** The response from the GET check (null = not loaded yet). */
let updateInfo = $state(null);

let updateError = $state(null);

/** A newer Urd is out, as the last check reported; its version is `updateTarget`. */
const updateAvailable = $derived(Boolean(updateInfo && !updateInfo.upToDate));

const updateTarget = $derived(updateInfo?.target ?? '');

let updateBusy = $state(false);

/** The check for a newer Urd is on its way; the panel says so while it has nothing to show. */
let updateChecking = $state(false);

/** Optional files the owner keeps their own version of, outside the engine atom group alone. */
let updateSkip = $state(new Set());

/** The check on its way, which a second call joins instead of starting another. */
let checkRun = null;

function loadUpdateCheck() {
  checkRun ??= runUpdateCheck().finally(() => { checkRun = null; });
  return checkRun;
}

async function runUpdateCheck() {
  updateChecking = true;
  updateError = null;
  updateInfo = null;
  try {
    const res = await fetch('/api/github/update');
    const data = await res.json().catch(() => null);
    if (res.ok) {
      updateInfo = data;
      updateSkip = new Set();
    } else {
      updateError = taApiError(data) ?? ta('update.checkFailed');
    }
  } catch {
    updateError = ta('status.publishLayerUnreachable');
  }
  updateChecking = false;
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const updaterState = {
  get baseSha() { return baseSha; },
  set baseSha(v) { baseSha = v; },
  refreshBaseSha,
  checkConflict,
  get historyList() { return historyList; },
  set historyList(v) { historyList = v; },
  get historyError() { return historyError; },
  set historyError(v) { historyError = v; },
  loadHistory,
  get revertedSinceLoad() { return revertedSinceLoad; },
  set revertedSinceLoad(v) { revertedSinceLoad = v; },
  get publishWave() { return publishWave; },
  set publishWave(v) { publishWave = v; },
  awaitPublishDeploy,
  get updateAvailable() { return updateAvailable; },
  get updateTarget() { return updateTarget; },
  get updateInfo() { return updateInfo; },
  set updateInfo(v) { updateInfo = v; },
  get updateError() { return updateError; },
  set updateError(v) { updateError = v; },
  get updateChecking() { return updateChecking; },
  get updateBusy() { return updateBusy; },
  set updateBusy(v) { updateBusy = v; },
  get updateSkip() { return updateSkip; },
  set updateSkip(v) { updateSkip = v; },
  loadUpdateCheck,
};
