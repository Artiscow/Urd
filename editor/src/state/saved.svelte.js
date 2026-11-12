/**
 * The saved drafts (ADR-0032): the work kept on the drafts branch through /api/github/drafts, for another device, without touching the live site.
 * Nothing saved comes into this browser by itself: every saved draft stands in the Drafts window's Saved tab (state/drafts.svelte.js), and is opened here by choice as one undo step (openSaved); a saved draft this browser has not seen is told by a dot on the Drafts tab and a line in the status bar, as the admin loads and as its tab comes back into view.
 * As the editor loads, a part this browser holds exactly as it saw it saved, whose saved copy has left the branch (published or discarded elsewhere), leaves this browser too, before the stores are built (meetOnLoad, lib/saved-model.js meet).
 * Each part this browser holds stands in this browser alone, saved, or live; a save writes the ticked parts that stand in this browser alone, with the owner's note and this browser's name, and asks before it writes over a part saved on another device since this browser last saw it.
 * What this browser last saw of each saved part is kept in `urd-saved-seen`, and what the Saved tab last showed in `urd-saved-noticed`, both admin keys.
 */
import { ta, taApiError, adminLang } from '$engine/i18n.js';
import { contentHash } from '$engine/imageTools.js';
import { keysByPart, partCanon, partOfName, meet, standing, counts, savedList, overwrites, publishedSaves } from '../lib/saved-model.js';
import { timeAgo } from '../lib/time-ago.js';
import { historyState } from './history.svelte.js';
import { shellState } from './shell.svelte.js';
import { pageState } from './page.svelte.js';
import { updaterState } from './updater.svelte.js';
import { templatesState } from './templates.svelte.js';
import { collectionsState } from './collections.svelte.js';
import { siteState } from './site.svelte.js';
import { draftsState } from './drafts.svelte.js';

const SEEN_KEY = 'urd-saved-seen';
const NOTICED_KEY = 'urd-saved-noticed';
/** How often a tab that comes back into view reads the index again, at most. */
const REREAD_EVERY = 60_000;
const ENDPOINT = '/api/github/drafts';
/** How long the load waits for the saved drafts in all before it goes on without them. */
const LOAD_WAIT = 5000;
/** The longest title, note and browser's name the drafts function keeps. */
const TITLE_MAX = 200;
const NOTE_MAX = 200;
const DEVICE_MAX = 40;
/** How long the Drafts tab says a save is done. */
const JUST_SAVED = 3000;
/** The answers that say saving cannot be done here: no sign-in, no access, no publishing layer, or one not set up. */
const NOT_HERE = new Set([401, 403, 404, 503]);

/** Whether saving can be done here: null while unknown, false where there is no publishing layer or no sign-in with access. */
let available = $state(null);
/** The drafts branch's head as last read, and its index. */
let head = null;
let index = $state.raw({ version: 1, parts: {} });
/** The hash of each saved part as this browser last saw it. */
let seen = $state.raw(readKept(SEEN_KEY));
/** The hash of each saved part as the Saved tab last showed it, which ends its being new here. */
let noticed = $state.raw(readKept(NOTICED_KEY));
let busy = $state(false);
/** A save just done: the Drafts tab says so for a few seconds. */
let justSaved = $state(false);
let justTimer = 0;
/** The saved pages' documents, by part, read as the Saved tab first opens, for their pictures: kept while their hash stands. */
let docs = $state.raw({});
/** The new parts the status line has already told of this session. */
const told = new Set();
/** Whether autosave has told this session of parts it could not write, so it says so once rather than every few minutes. */
let toldNotStored = false;
let lastRead = 0;

function readKept(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? {};
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

function keepNoticed(next) {
  noticed = next;
  try {
    localStorage.setItem(NOTICED_KEY, JSON.stringify(next));
  } catch { /* the storage is full: the dot stands until it fits */ }
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
/** The Saved tab's rows: every saved part, the newest first. */
const list = $derived.by(() => {
  void historyState.edits;
  if (!available) return [];
  const byPart = keysByPart(storedKeys());
  return savedList({ saved: index.parts, localHash: (name) => hashOf(name, byPart), seen, noticed });
});
const fresh = $derived(list.filter((r) => r.fresh).length);

/**
 * Meets the saved drafts as the editor loads, before the stores are built, within LOAD_WAIT: nothing comes in by itself, and a part this browser holds exactly as it saw it saved, whose saved copy has left the branch, leaves this browser too.
 * An answer that saving cannot be done here leaves it off; a slow or failed read goes on without the saved drafts, and the next Save reads them again. Nothing here stops the editor from loading.
 */
async function meetOnLoad() {
  try {
    const read = await call(ENDPOINT, {}, LOAD_WAIT);
    if (!read.ok || !indexOf(read.body)) {
      available = NOT_HERE.has(read.status) ? false : true;
      return;
    }
    available = true;
    head = read.body.head ?? null;
    index = indexOf(read.body);
    lastRead = Date.now();
    const byPart = keysByPart(storedKeys());
    const names = new Set([...Object.keys(index.parts), ...Object.keys(seen)]);
    const local = Object.fromEntries([...names].map((name) => [name, hashOf(name, byPart)]));
    const met = meet({ local, saved: index.parts, seen });
    for (const name of met.dropLocal) {
      for (const key of byPart.get(name) ?? []) localStorage.removeItem(key);
    }
    keepSeen(met.seen);
    keepNoticed(Object.fromEntries(Object.entries(noticed).filter(([name]) => index.parts[name])));
  } catch (err) {
    console.warn('Urd: the saved drafts were not met', err);
  }
}

/** The status line tells of the saved drafts this browser has not seen and has not been told of this session, with a way to the Drafts window's Saved tab. */
function noticeNew() {
  const news = list.filter((r) => r.fresh && !told.has(`${r.part}:${r.hash}`));
  if (!news.length) return;
  for (const r of news) told.add(`${r.part}:${r.hash}`);
  shellState.setStatus(ta(news.length === 1 ? 'saved.news.one' : 'saved.news', { n: news.length }), 'info', { label: ta('saved.show'), run: () => draftsState.openDrafts({ tab: 'saved' }) });
}

/** As the tab comes back into view, the index is read again, at most once a minute, and anything new is told. */
function watchSaves() {
  noticeNew();
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState !== 'visible' || !available || busy || Date.now() - lastRead < REREAD_EVERY) return;
    lastRead = Date.now();
    // Another tab of this browser may have opened or saved meanwhile.
    seen = readKept(SEEN_KEY);
    noticed = readKept(NOTICED_KEY);
    const read = await call(ENDPOINT);
    if (!read.ok || !indexOf(read.body)) return;
    head = read.body.head ?? null;
    index = indexOf(read.body);
    noticeNew();
  });
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
 * A save: writes the parts named (`names`, every part that stands in this browser alone where none are named) with the owner's `note` and this browser's name (`device`), and asks first where a part was saved elsewhere since; a saved copy is taken away only by the Saved tab's bin.
 * With `quiet` (Ctrl+S, autosave) a part saved elsewhere since is left for the owner rather than asked about, and with `auto` (autosave) a save that goes well says nothing, the Drafts tab's mark standing for it.
 * A part this browser cannot write (a draft held in memory where the storage is full, a page whose draft key is another part's) is left, and the status line says so, once a session for autosave.
 * @param {{names?: string[]|null, note?: string, device?: string, quiet?: boolean, auto?: boolean}} [opts]
 * @returns {Promise<boolean>} Whether anything was saved
 */
async function save({ names = null, note = '', device = '', quiet = false, auto = false } = {}) {
  if (busy || available === false) return false;
  busy = true;
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      if (!(await readAgain())) return false;
      // The head the index was read at, posted as it is even where the index is read again meanwhile.
      const expect = head;
      const byPart = keysByPart(storedKeys());
      const now = standing({ parts: historyState.unpublished, localHash: (name) => hashOf(name, byPart), saved: index.parts, seen });
      const asked = now.filter((r) => r.band === 'browser' && (!names || names.includes(r.part)));
      const words = { ...(note ? { note: note.slice(0, NOTE_MAX) } : {}), ...(device ? { device: device.slice(0, DEVICE_MAX) } : {}) };
      let writes = asked.map((r) => ({
        name: r.part, keys: textsOf(r.part, byPart), hash: hashOf(r.part, byPart), title: titleOf(r), ...words,
        ...(updaterState.baseSha ? { base: updaterState.baseSha } : {}),
      })).filter((w) => Object.keys(w.keys).length && w.hash);
      const left = asked.length - writes.length;
      const tellLeft = () => {
        if (auto && toldNotStored) return;
        if (auto) toldNotStored = true;
        shellState.setStatus(ta('saved.notStored'), 'error');
      };
      const over = overwrites(writes.map((w) => w.name), index.parts, seen);
      if (quiet) writes = writes.filter((w) => !over.includes(w.name));
      if (!writes.length) {
        if (left) tellLeft();
        return false;
      }
      if (over.length && !quiet) {
        const ok = await shellState.askConfirm({
          title: ta('saved.overTitle'),
          lines: over.map((name) => ta('saved.overLine', { name: titleOf(now.find((r) => r.part === name) ?? { part: name, ...partOfName(name) }), when: whenOf(index.parts[name].savedAt), who: index.parts[name].saver })),
          okLabel: ta('saved.overOk'),
        });
        if (!ok) return false;
      }
      const res = await post({ expect, writes });
      if (res.status === 409 && res.body?.code === 'draftsRace' && attempt === 0) continue;
      if (!res.ok || !indexOf(res.body)) {
        shellState.setStatus(taApiError(res.body) ?? ta('saved.failed'), 'error');
        return false;
      }
      head = res.body.head;
      index = indexOf(res.body);
      const next = { ...seen };
      for (const w of writes) next[w.name] = w.hash;
      keepSeen(next);
      const n = writes.length;
      clearTimeout(justTimer);
      justSaved = true;
      justTimer = setTimeout(() => { justSaved = false; }, JUST_SAVED);
      if (left) tellLeft();
      else if (!auto) shellState.setStatus(ta(n === 1 ? 'saved.done.one' : 'saved.done', { n }), 'ok');
      return true;
    }
    return false;
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

/** Reads saved parts' texts as the branch holds them now, parsed; a part that cannot be read is left out. */
async function readParts(names) {
  const read = await call(`${ENDPOINT}?parts=${names.join(',')}`);
  if (!read.ok) return { ok: false, body: read.body, keys: {} };
  // The head stays the one the index was read at, so a save or a removal is never posted against an index older than its head.
  const keys = {};
  for (const name of names) {
    try {
      const text = read.body.parts?.[name];
      if (text) keys[name] = JSON.parse(text).keys;
    } catch { /* a part that cannot be read stays out */ }
  }
  return { ok: true, body: read.body, keys };
}

/**
 * «Open here» (and «Use the saved one»): the saved part in place of this browser's, as one step an undo takes back.
 * A page this browser's site settings do not list opens together with the saved site settings, which hold its entry; where this browser holds its own changes to a part it opens, the owner is asked first.
 */
async function openSaved(name) {
  const of = partOfName(name);
  const names = [name];
  if (of.kind === 'page' && !siteState.siteDraft?.pages.some((p) => p.id === of.id)) {
    if (!index.parts.site) {
      shellState.setStatus(ta('saved.noPlace', { name: index.parts[name]?.title || of.id }), 'error');
      return;
    }
    names.push('site');
  }
  // The saved site settings bring the pages they list that are neither here nor live, so no page goes out blank; one whose content was not saved stops the opening.
  if (names.includes('site')) {
    const site = await readParts(['site']);
    let pages = [];
    try {
      pages = JSON.parse(site.keys.site?.['urd-draft-site'] ?? 'null')?.pages ?? [];
    } catch { /* a site part that cannot be read is said below */ }
    for (const page of pages) {
      const here = siteState.siteDraft?.pages.some((p) => p.id === page.id) || siteState.site?.pages.some((p) => p.id === page.id);
      if (here || names.includes(`page-${page.id}`)) continue;
      if (!index.parts[`page-${page.id}`]) {
        shellState.setStatus(ta('saved.pageMissing', { name: page.title || page.id }), 'error');
        return;
      }
      names.push(`page-${page.id}`);
    }
  }
  const mine = names.map((n) => list.find((r) => r.part === n)).filter((r) => r?.here === 'mine');
  if (mine.length) {
    const ok = await shellState.askConfirm({
      title: ta('saved.openTitle'),
      lines: mine.map((r) => ta('saved.openLine', { name: titleOf(r), who: r.saver, when: whenOf(r.savedAt) })),
      okLabel: ta('saved.openOk'),
    });
    if (!ok) return;
  }
  const read = await readParts(names);
  if (!read.ok || names.some((n) => !read.keys[n])) {
    shellState.setStatus(taApiError(read.body) ?? ta('saved.readFailed'), 'error');
    return;
  }
  const others = names.map(partOfName).filter((p) => p.kind === 'page' && p.id !== pageState.pageId).map((p) => p.id);
  historyState.pushHistory('use-saved', { pages: others });
  const state = JSON.parse(historyState.snapshot(others));
  for (const n of names) applyKeys(state, n, read.keys[n]);
  historyState.restore(JSON.stringify(state));
  const nextSeen = { ...seen };
  const nextNoticed = { ...noticed };
  for (const n of names) {
    if (!index.parts[n]) continue;
    nextSeen[n] = index.parts[n].hash;
    nextNoticed[n] = index.parts[n].hash;
  }
  keepSeen(nextSeen);
  keepNoticed(nextNoticed);
  historyState.updateDirty();
}

/** The bin in the Saved tab: the saved copy taken away from the branch, this browser's own draft left as it is. */
async function removeSaved(name) {
  if (!available) return;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await post({ expect: head, removes: [name] });
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
    const nextSeen = { ...seen };
    delete nextSeen[name];
    keepSeen(nextSeen);
    return;
  }
}

/** The saved pages' documents for their pictures, read once as the Saved tab opens and kept while their hash stands. */
async function loadPictures() {
  const wanted = list.filter((r) => r.kind === 'page' && docs[r.part]?.hash !== r.hash);
  if (!wanted.length) return;
  const read = await readParts(wanted.map((r) => r.part));
  if (!read.ok) return;
  const next = { ...docs };
  for (const r of wanted) {
    const text = read.keys[r.part]?.[`urd-draft-${r.id}`];
    try {
      if (text) next[r.part] = { hash: r.hash, doc: JSON.parse(text) };
    } catch { /* a page that cannot be read is drawn by its sign */ }
  }
  docs = next;
}

/** As the Saved tab is left, what it showed is no longer new here. */
function markNoticed() {
  if (!list.length) return;
  const next = { ...noticed };
  for (const r of list) next[r.part] = r.hash;
  keepNoticed(next);
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
  /** A save just done, for the Drafts tab's mark. */
  get savedJust() { return justSaved; },
  /** Every part with where it stands, for the Publish menu's and History's bands. */
  get savedRows() { return rows; },
  get saveCount() { return available ? tally.save : 0; },
  /** The Saved tab's rows, and how many of them are new here. */
  get savedList() { return list; },
  get savedFresh() { return fresh; },
  savedDoc: (name) => docs[name]?.doc ?? null,
  /** How many parts are saved, for Discard's question. */
  get savedCount() { return available ? Object.keys(index.parts).length : 0; },
  meetOnLoad,
  saveDrafts: save,
  useSaved: openSaved,
  openSaved,
  removeSaved,
  loadSavedPictures: loadPictures,
  markSavedNoticed: markNoticed,
  watchSaves,
  staleOnPublish,
  afterPublish,
  discardSaved,
  whenSaved: whenOf,
};
