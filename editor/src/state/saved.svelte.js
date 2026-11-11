/**
 * The saved drafts (ADR-0032): the work kept on the drafts branch through /api/github/drafts, for another device, without touching the live site.
 * As the editor loads, the saved parts this browser has not seen, or holds as it last saw them, are written where a reload reads drafts, before the stores are built, and a part this browser saw saved that was published or discarded elsewhere leaves this browser too (meetOnLoad, lib/saved-model.js meet).
 * Each part stands in this browser alone, saved, or live; Save writes what stands in this browser alone, and asks before it writes over a part saved on another device since this browser last saw it.
 * What this browser last saw of each saved part is kept in `urd-saved-seen`, an admin key.
 */
import { ta, taApiError, adminLang } from '$engine/i18n.js';
import { contentHash } from '$engine/imageTools.js';
import { keysByPart, partCanon, partOfName, meet, standing, counts, overwrites, publishedSaves } from '../lib/saved-model.js';
import { timeAgo } from '../lib/time-ago.js';
import { historyState } from './history.svelte.js';
import { shellState } from './shell.svelte.js';
import { pageState } from './page.svelte.js';
import { updaterState } from './updater.svelte.js';
import { templatesState } from './templates.svelte.js';
import { collectionsState } from './collections.svelte.js';

const SEEN_KEY = 'urd-saved-seen';
const ENDPOINT = '/api/github/drafts';
/** How long the load waits for the saved drafts in all before it goes on without them. */
const LOAD_WAIT = 5000;
/** The longest title the drafts function keeps. */
const TITLE_MAX = 200;
/** The answers that say saving cannot be done here: no sign-in, no access, no publishing layer, or one not set up. */
const NOT_HERE = new Set([401, 403, 404, 503]);

/** Whether saving can be done here: null while unknown, false where there is no publishing layer or no sign-in with access. */
let available = $state(null);
/** The drafts branch's head as last read, and its index. */
let head = null;
let index = $state.raw({ version: 1, parts: {} });
/** The hash of each saved part as this browser last saw it. */
let seen = $state.raw(readSeen());
let busy = $state(false);

function readSeen() {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY)) ?? {};
  } catch {
    return {};
  }
}

function keepSeen(next) {
  seen = next;
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(next));
  } catch { /* the storage is full: what was seen is read again from the next save */ }
}

/** A call to the drafts function, with a time limit; a reply that is not JSON reads as a failure. */
async function call(path, init = {}, wait = 0) {
  const controller = new AbortController();
  const timer = wait > 0 ? setTimeout(() => controller.abort(), wait) : 0;
  try {
    const res = await fetch(path, { cache: 'no-store', ...init, signal: controller.signal });
    const body = await res.json().catch(() => null);
    return { ok: res.ok && body !== null, status: res.status, body };
  } catch {
    return { ok: false, status: 0, body: null };
  } finally {
    clearTimeout(timer);
  }
}

const post = (body) => call(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

/** An index as the function gives it, or none for a reply of another shape. */
const indexOf = (body) => (body && body.index && typeof body.index.parts === 'object' && body.index.parts ? body.index : null);

/** The keys of every stored draft in this browser. */
function storedKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('urd-draft-')) keys.push(key);
  }
  return keys;
}

/** A part's stored texts here, by key. */
function textsOf(name, byPart) {
  const texts = {};
  for (const key of byPart.get(name) ?? []) {
    const text = localStorage.getItem(key);
    if (text !== null) texts[key] = text;
  }
  return texts;
}

/** Each stored key's hash, kept while its text stands the same, so a long draft is hashed once per change of its own. */
const keyHashes = new Map();
function keyHash(key, text) {
  const kept = keyHashes.get(key);
  if (kept?.text === text) return kept.hash;
  const hash = contentHash(text);
  keyHashes.set(key, { text, hash });
  return hash;
}

/** A part's hash here from its keys' hashes, or null where this browser holds none of it. */
function hashOf(name, byPart) {
  const hashes = {};
  for (const key of byPart.get(name) ?? []) {
    const text = localStorage.getItem(key);
    if (text !== null) hashes[key] = keyHash(key, text);
  }
  return Object.keys(hashes).length ? contentHash(partCanon(hashes)) : null;
}

/** Where each part stands, following every change, the index and what was seen. */
const rows = $derived.by(() => {
  void historyState.edits;
  const byPart = keysByPart(storedKeys());
  return standing({ parts: historyState.unpublished, localHash: (name) => hashOf(name, byPart), saved: available ? index.parts : {}, seen });
});
const tally = $derived(counts(rows));

/**
 * Meets the saved drafts as the editor loads, before the stores are built, within LOAD_WAIT in all: a part to take in is written where a reload reads drafts, and counts as seen only once all its keys are written.
 * An answer that saving cannot be done here leaves it off; a slow or failed read goes on without the saved drafts, and the next Save reads them again. Nothing here stops the editor from loading.
 */
async function meetOnLoad() {
  const deadline = Date.now() + LOAD_WAIT;
  try {
    const read = await call(ENDPOINT, {}, LOAD_WAIT);
    if (!read.ok || !indexOf(read.body)) {
      available = NOT_HERE.has(read.status) ? false : true;
      return;
    }
    available = true;
    head = read.body.head ?? null;
    index = indexOf(read.body);
    const byPart = keysByPart(storedKeys());
    const names = new Set([...Object.keys(index.parts), ...Object.keys(seen)]);
    const local = Object.fromEntries([...names].map((name) => [name, hashOf(name, byPart)]));
    const met = meet({ local, saved: index.parts, seen });
    const next = { ...met.seen };
    for (const name of met.dropLocal) {
      for (const key of byPart.get(name) ?? []) localStorage.removeItem(key);
    }
    if (met.takeIn.length) {
      const parts = await call(`${ENDPOINT}?parts=${met.takeIn.join(',')}`, {}, deadline - Date.now());
      for (const name of met.takeIn) {
        if (!takeIn(name, parts.ok ? parts.body.parts?.[name] : null, byPart)) {
          if (seen[name]) next[name] = seen[name];
          else delete next[name];
        }
      }
    }
    keepSeen(next);
  } catch (err) {
    console.warn('Urd: the saved drafts were not met', err);
  }
}

/** Writes a saved part's keys in place of this browser's; false where it could not be read or written whole. */
function takeIn(name, text, byPart) {
  if (!text) return false;
  try {
    const { keys } = JSON.parse(text);
    if (!keys || typeof keys !== 'object') return false;
    for (const key of byPart.get(name) ?? []) if (!(key in keys)) localStorage.removeItem(key);
    for (const [key, value] of Object.entries(keys)) localStorage.setItem(key, value);
    return true;
  } catch {
    shellState.draftSaveError();
    return false;
  }
}

/** The words a part goes by, for the saved index and the questions. */
function titleOf(row) {
  const title = row.name ?? { site: ta('unpublished.site'), collections: ta('unpublished.collections'), templates: ta('canvas.tabMyTemplates'), plugins: ta('panel.plugins'), redirects: ta('ui.redirects') }[row.kind] ?? row.part;
  return String(title).slice(0, TITLE_MAX);
}

const whenOf = (iso) => timeAgo(new Date(iso).getTime(), adminLang()) || ta('history.now');

/** Reads the index again, for a save or a removal that found it moved. */
async function readAgain() {
  const read = await call(ENDPOINT);
  if (!read.ok || !indexOf(read.body)) {
    shellState.setStatus(taApiError(read.body) ?? ta('saved.readFailed'), 'error');
    return false;
  }
  available = true;
  head = read.body.head ?? null;
  index = indexOf(read.body);
  return true;
}

/**
 * Save: writes what stands in this browser alone, removes the saved copies this browser has taken back to live, and asks first where a part was saved elsewhere since.
 * A part this browser cannot write (a draft held in memory where the storage is full, a page whose draft key is another part's) is left, and the status line says so.
 */
async function save() {
  if (busy || available === false) return;
  busy = true;
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      if (!(await readAgain())) return;
      const byPart = keysByPart(storedKeys());
      const now = standing({ parts: historyState.unpublished, localHash: (name) => hashOf(name, byPart), saved: index.parts, seen });
      const browser = now.filter((r) => r.band === 'browser');
      const asked = browser.filter((r) => r.draft || r.held);
      const writes = asked.map((r) => ({
        name: r.part, keys: textsOf(r.part, byPart), hash: hashOf(r.part, byPart), title: titleOf(r),
        ...(updaterState.baseSha ? { base: updaterState.baseSha } : {}),
      })).filter((w) => Object.keys(w.keys).length && w.hash);
      const left = asked.length - writes.length;
      const removes = browser.filter((r) => !r.draft && !r.held).map((r) => r.part);
      if (!writes.length && !removes.length) {
        if (left) shellState.setStatus(ta('saved.notStored'), 'error');
        return;
      }
      const over = overwrites([...writes.map((w) => w.name), ...removes], index.parts, seen);
      if (over.length) {
        const ok = await shellState.askConfirm({
          title: ta('saved.overTitle'),
          lines: over.map((name) => ta('saved.overLine', { name: titleOf(now.find((r) => r.part === name) ?? { part: name, ...partOfName(name) }), when: whenOf(index.parts[name].savedAt), who: index.parts[name].saver })),
          okLabel: ta('saved.overOk'),
        });
        if (!ok) return;
      }
      const res = await post({ expect: head, writes, removes });
      if (res.status === 409 && res.body?.code === 'draftsRace' && attempt === 0) continue;
      if (!res.ok || !indexOf(res.body)) {
        shellState.setStatus(taApiError(res.body) ?? ta('saved.failed'), 'error');
        return;
      }
      head = res.body.head;
      index = indexOf(res.body);
      const next = { ...seen };
      for (const w of writes) next[w.name] = w.hash;
      for (const name of removes) delete next[name];
      keepSeen(next);
      const n = writes.length + removes.length;
      if (left) shellState.setStatus(ta('saved.notStored'), 'error');
      else shellState.setStatus(ta(n === 1 ? 'saved.done.one' : 'saved.done', { n }), 'ok');
      return;
    }
  } finally {
    busy = false;
  }
}

/**
 * The state a saved part's stored texts make, written into the history's state object: every store of the part takes the draft the saved part holds, or its published state where the saved part holds none, so the result is the saved copy and never a mix.
 */
function applyKeys(state, name, keys) {
  const parse = (key) => JSON.parse(keys[key]);
  const of = partOfName(name);
  if (of.kind === 'site') state.site = parse('urd-draft-site');
  else if (of.kind === 'plugins') state.plugins = parse('urd-draft-plugins');
  else if (of.kind === 'redirects') state.redirects = parse('urd-draft-redirects');
  else if (of.kind === 'collections') {
    state.collectionsIndex = keys['urd-draft-collections:index'] ? parse('urd-draft-collections:index') : collectionsState.collectionsIndexStore.published();
  } else if (of.kind === 'collection') state.collections = { ...state.collections, [of.id]: parse(`urd-draft-collection-${of.id}`) };
  else if (of.kind === 'templates') {
    const templatesIndex = keys['urd-draft-templates'] ? parse('urd-draft-templates') : templatesState.templatesIndexStore.published();
    const templates = {};
    for (const id of templatesIndex.maler ?? []) {
      const key = `urd-draft-template-${id}`;
      const doc = keys[key] ? parse(key) : (templatesState.templateStores[id]?.published() ?? templatesState.publishedTemplates[id] ?? null);
      if (doc) templates[id] = doc;
    }
    state.templatesIndex = templatesIndex;
    state.templates = templates;
  } else if (of.kind === 'page') {
    if (of.id === pageState.pageId) state.page = parse(`urd-draft-${of.id}`);
    else state.others = { ...state.others, [of.id]: parse(`urd-draft-${of.id}`) };
  }
}

/** «Use the saved one»: the part saved on another device in place of this browser's, as one step an undo takes back. */
async function useSaved(name) {
  const read = await call(`${ENDPOINT}?parts=${name}`);
  const text = read.ok ? read.body.parts?.[name] : null;
  let keys = null;
  try {
    keys = text ? JSON.parse(text).keys : null;
  } catch { /* a part that cannot be read is said below */ }
  if (!keys) {
    shellState.setStatus(taApiError(read.body) ?? ta('saved.readFailed'), 'error');
    return;
  }
  const of = partOfName(name);
  const others = of.kind === 'page' && of.id !== pageState.pageId ? [of.id] : [];
  historyState.pushHistory('use-saved', { pages: others });
  const state = JSON.parse(historyState.snapshot(others));
  applyKeys(state, name, keys);
  historyState.restore(JSON.stringify(state));
  if (read.body.head) head = read.body.head;
  if (index.parts[name]) keepSeen({ ...seen, [name]: index.parts[name].hash });
  historyState.updateDirty();
}

/** The saved parts a publish of every draft here makes stale, read before the publish clears the drafts. */
function staleOnPublish() {
  return available ? publishedSaves(rows, index.parts) : [];
}

/** After a publish: the saved copies it made stale are removed from the branch, never one saved elsewhere since. */
async function afterPublish(names, again = true) {
  if (!available || !names.length) return;
  const res = await post({ expect: head, removes: names });
  if (res.status === 409 && res.body?.code === 'draftsRace') {
    if (!again || !(await readAgain())) return;
    const still = names.filter((name) => index.parts[name] && index.parts[name].hash === seen[name]);
    if (still.length) await afterPublish(still, false);
    return;
  }
  if (!res.ok || !indexOf(res.body)) {
    shellState.setStatus(taApiError(res.body) ?? ta('saved.failed'), 'error');
    return;
  }
  head = res.body.head;
  index = indexOf(res.body);
  const next = { ...seen };
  for (const name of names) delete next[name];
  keepSeen(next);
}

/** After Discard drafts, or a revert of the last publish: every saved part goes too. */
async function discardSaved() {
  if (!available || (head === null && !Object.keys(index.parts).length)) return;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await post({ expect: head, all: true });
    if (res.status === 409 && res.body?.code === 'draftsRace' && attempt === 0) {
      if (!(await readAgain())) return;
      continue;
    }
    if (!res.ok || !indexOf(res.body)) {
      shellState.setStatus(taApiError(res.body) ?? ta('saved.failed'), 'error');
      return;
    }
    head = res.body.head;
    index = indexOf(res.body);
    keepSeen({});
    return;
  }
}

export const savedState = {
  get savedAvailable() { return available; },
  get savedBusy() { return busy; },
  /** Every part with where it stands, for the Publish menu's and History's bands. */
  get savedRows() { return rows; },
  get saveCount() { return available ? tally.save : 0; },
  /** How many parts are saved, for Discard's question. */
  get savedCount() { return available ? Object.keys(index.parts).length : 0; },
  meetOnLoad,
  saveDrafts: save,
  useSaved,
  staleOnPublish,
  afterPublish,
  discardSaved,
  whenSaved: whenOf,
};
