/**
 * The site's redirects (content/redirects.json, ADR-0015): the list as a draft of its own beside the site's, the Redirects dialog's open flag, and the writes, each an undo step or a part of the step its caller made.
 * A site without the file starts from an empty list, or from a `_redirects` written by hand, read through the publishing layer, so publishing never writes over rules it did not know (`hostFileKnown`).
 */
import { ta } from '$engine/i18n.js';
import { createDraftStore } from '../lib/draftStore.js';
import { parseHostFile, isUrdHostFile, mergeRules } from '../lib/redirects-model.js';
import { historyState } from './history.svelte.js';
import { shellState } from './shell.svelte.js';

/** An empty list, as a site from before the redirects starts. */
const empty = () => ({ version: 1, rules: [] });

const DRAFT_KEY = 'urd-draft-redirects';

let redirectsStore = null;

/** The list as the editor shows and writes it; the store holds the same proxy (linkRedirects). */
let redirectsDraft = $state(null);

/** Whether publishing may write `_redirects`: the site has content/redirects.json, or the repository's `_redirects` has been looked at, and read in where it was written by hand. */
let hostFileKnown = $state(false);

/** Whether the Redirects dialog is open. */
let redirectsOpen = $state(false);

/** Lines of a `_redirects` written by hand that the list cannot hold (a proxy, a placeholder): they go when publishing first writes the file, so «Before you publish» names them. */
let unkeptLines = $state(0);

/** Links the draft and the store to the same object, through the Svelte proxy. */
function linkRedirects() {
  if (!redirectsStore) return;
  redirectsDraft = redirectsStore.data;
  redirectsStore.replace(redirectsDraft);
}

/** The repository's `_redirects`, through the publishing layer: its text, null where there is none, undefined where it could not be read (a local server, signed out). */
async function readHostFile() {
  try {
    const res = await fetch('/api/github/redirects');
    if (!res.ok) return undefined;
    const { text } = await res.json();
    return typeof text === 'string' ? text : null;
  } catch {
    return undefined;
  }
}

/** Loads the published list, or for a site without one, the rules of a `_redirects` written by hand, and the draft over it. */
async function initRedirects() {
  let published = null;
  try {
    const res = await fetch('/content/redirects.json');
    if (res.ok) published = await res.json();
  } catch { /* no list yet */ }
  let byHand = null;
  if (published && Array.isArray(published.rules)) {
    hostFileKnown = true;
  } else {
    published = empty();
    const text = await readHostFile();
    if (text !== undefined) {
      hostFileKnown = true;
      // The file's rules are the list's start: one written by hand, or Urd's own where the list could not be read (a reload while a publish deploys).
      if (text) {
        const read = parseHostFile(text);
        published.rules = read.rules;
        if (!isUrdHostFile(text)) {
          byHand = read;
          unkeptLines = read.skipped;
        }
      }
    }
  }
  redirectsStore = createDraftStore(DRAFT_KEY, () => published, shellState.draftSaveError);
  linkRedirects();
  if (byHand?.rules.length || byHand?.skipped) {
    shellState.setStatus(ta('status.redirectsReadIn', { count: byHand.rules.length }) + (byHand.skipped ? ` ${ta('status.redirectsUnkept', { count: byHand.skipped })}` : ''));
  }
}

/**
 * Makes sure publishing may write `_redirects`: where the repository's file was not looked at when the admin opened, it is now, and its rules join the list ahead of the draft's own (a rule in the draft wins for its old address).
 * @returns {Promise<boolean>} false where the file still cannot be read
 */
async function ensureHostFileKnown() {
  if (hostFileKnown) return true;
  const text = await readHostFile();
  if (text === undefined) return false;
  if (text) {
    const read = parseHostFile(text);
    const merged = mergeRules(read.rules, $state.snapshot(redirectsDraft.rules)).rules;
    redirectsDraft.rules = merged;
    redirectsStore.save();
    if (!isUrdHostFile(text)) unkeptLines = read.skipped;
  }
  hostFileKnown = true;
  return true;
}

/**
 * A change to the list: `fn` takes the rules and gives the new ones (lib/redirects-model.js), as one undo step or, with `push: false`, as part of the step its caller made.
 * @param {(rules: Array<object>) => Array<object>} fn
 * @param {{key?: string, push?: boolean}} [options]
 */
function mutateRedirects(fn, { key = 'redirects', push = true } = {}) {
  if (!redirectsStore) return;
  if (push) historyState.pushHistory(key);
  redirectsDraft.rules = fn($state.snapshot(redirectsDraft.rules));
  redirectsStore.save();
  historyState.updateDirty();
}

/** The list as an undo puts it back. */
function restoreRedirects(data) {
  if (!redirectsStore || !data) return;
  if (JSON.stringify(redirectsStore.data) === JSON.stringify(data)) return;
  redirectsStore.replace(data);
  linkRedirects();
  redirectsStore.save();
}

/** After a publish: the list as it went out is the published state. */
function adoptPublished() {
  if (!redirectsStore) return;
  const published = JSON.parse(JSON.stringify(redirectsStore.data));
  redirectsStore = createDraftStore(DRAFT_KEY, () => published, shellState.draftSaveError);
  linkRedirects();
  hostFileKnown = true;
  unkeptLines = 0;
}

/** «Discard drafts»: the published list again. */
function discardRedirects() {
  if (!redirectsStore) return;
  redirectsStore.reset();
  linkRedirects();
}

export const redirectsState = {
  get redirectsStore() { return redirectsStore; },
  get redirectsDraft() { return redirectsDraft; },
  /** The rules as they stand. */
  get redirectRules() { return redirectsDraft?.rules ?? []; },
  get hostFileKnown() { return hostFileKnown; },
  get unkeptLines() { return unkeptLines; },
  get redirectsOpen() { return redirectsOpen; },
  set redirectsOpen(v) { redirectsOpen = v; },
  openRedirects() { redirectsOpen = true; },
  closeRedirects() { redirectsOpen = false; },
  initRedirects,
  ensureHostFileKnown,
  mutateRedirects,
  restoreRedirects,
  adoptPublished,
  discardRedirects,
  linkRedirects,
};
