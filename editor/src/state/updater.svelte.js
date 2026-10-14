/**
 * What the deployed site tells the editor: the publish history and its revert, the update check and the update, the publish baseline.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { ta, taApiError } from '$engine/i18n.js';
import { awaitServed, deployTargets } from '../lib/deploy-wait.js';
import { shellState } from './shell.svelte.js';

/**
 * The HEAD commit when the editor loaded (or last published): the
 * baseline for the conflict warning. null = unknown (not logged in /
 * local server), in which case the check is silently skipped.
 */
let baseSha = null;

async function refreshBaseSha() {
  try {
    const res = await fetch('/api/github/latest');
    if (res.ok) baseSha = (await res.json()).head ?? null;
  } catch { /* publishing layer unavailable */ }
}

/**
 * Conflict check before publishing: has someone else published since we
 * loaded, and do we touch the same files? Returns {ok, head}: ok=false
 * means the editor canceled; head is the HEAD we observed and is sent as
 * expect to the commit endpoint (closes the window between check and
 * commit server-side).
 */
async function confirmNoConflict(files) {
  if (!baseSha) {
    // The baseline slipped at load (GitHub down): fetch HEAD now, so
    // expect at least closes the commit window. Without the original
    // baseline we cannot diff, so the editor must make the call
    // explicitly instead of the guard being silently skipped.
    await refreshBaseSha();
    const ok = await shellState.askConfirm({
      title: ta('confirm.conflictUnknown.title'),
      lines: [
        ta('confirm.conflictUnknown.body'),
        ta('confirm.conflictUnknown.warning'),
      ],
      okLabel: ta('confirm.publishAnyway'),
      cancelLabel: ta('confirm.cancel'),
    });
    return { ok, head: baseSha };
  }
  let data = null;
  try {
    const res = await fetch(`/api/github/latest?base=${baseSha}`);
    if (res.ok) data = await res.json().catch(() => null);
  } catch { /* unavailable: we do not stop the publish over that */ }
  if (!data?.head) return { ok: true, head: null };

  const head = data.head;
  if (head === baseSha) return { ok: true, head };

  const mine = new Set(files.map((f) => f.path));
  // Truncated diff (very large changes): we do NOT know whether there is
  // overlap, so the editor must make the call.
  const overlap = data.truncated
    ? [ta('confirm.conflict.truncated')]
    : (data.changedFiles ?? []).filter((p) => mine.has(p));
  if (overlap.length === 0) return { ok: true, head };

  const ok = await shellState.askConfirm({
    title: ta('confirm.conflict.title'),
    lines: [
      ta('confirm.conflict.intro'),
      ...overlap.map((p) => `• ${p}`),
      ta('confirm.conflict.warning'),
    ],
    okLabel: ta('confirm.publishAnyway'),
    cancelLabel: ta('confirm.cancel'),
  });
  return { ok, head };
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
 * After a revert the editor still shows the content from BEFORE the
 * revert (the restored version exists on the server only after deploy).
 * Publishing from that state would silently reintroduce what was
 * reverted - so publishing is blocked until the admin is reloaded.
 */
let revertedSinceLoad = false;

/** The publish whose deploy is being awaited: a newer publish makes an
 *  older wait fall silent instead of reporting a stale result. */
let publishWave = 0;

/**
 * After a publish: poll the committed content files until the site serves
 * them (lib/deploy-wait.js), so the status can say «live» rather than just
 * «committed». Nothing is reloaded and no draft changes: the drafts already
 * are the published state.
 */
async function awaitPublishDeploy(files) {
  const wave = ++publishWave;
  // The status sequence at the publish: any message shown since (a
  // revert, a login prompt) makes the wait fall silent instead of
  // overwriting it.
  const seq = shellState.statusSeq;
  const live = await awaitServed(deployTargets(files));
  if (wave !== publishWave || seq !== shellState.statusSeq) return;
  if (live) shellState.setStatus(ta('status.publishLive'), 'ok');
  else shellState.setStatus(ta('status.publishDeployTimeout'), 'error');
}

/** The response from the GET check (null = not loaded yet). */
let updateInfo = $state(null);

let updateError = $state(null);

let updateBusy = $state(false);

/** Optional files the owner wants to keep their own version of (only
 *  outside the engine atom group; the server validates the same). */
let updateSkip = $state(new Set());

async function loadUpdateCheck() {
  updateBusy = true;
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
  updateBusy = false;
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const updaterState = {
  get baseSha() { return baseSha; },
  set baseSha(v) { baseSha = v; },
  refreshBaseSha,
  confirmNoConflict,
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
  get updateInfo() { return updateInfo; },
  set updateInfo(v) { updateInfo = v; },
  get updateError() { return updateError; },
  set updateError(v) { updateError = v; },
  get updateBusy() { return updateBusy; },
  set updateBusy(v) { updateBusy = v; },
  get updateSkip() { return updateSkip; },
  set updateSkip(v) { updateSkip = v; },
  loadUpdateCheck,
};
