/**
 * The collections: their draft stores, the view the preview and the panels read, and the mutators.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { createDraftStore } from '../lib/draftStore.js';
import { INDEX_DRAFT_KEY, readIndexes, indexBaseline, earlierDrafts, openingIds } from '../lib/collection-index.js';
import { slugify } from '$engine/imageTools.js';
import { ta, adminLang } from '$engine/i18n.js';
import { makeId } from '$engine/sections/presets.js';
import { readCsv, importPlan, decodeCsv } from '$engine/collections-csv.js';
import { historyState } from './history.svelte.js';
import { withCopies, carryEntries, withField, entriesFit } from '../lib/collection-bulk.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';

// Collections are shared site data (like nav/footer): an index file +
// one file per collection, each with its own draftStore. Editing goes
// through the Ctrl+Z history (like pages/site).
let collectionsIndexStore = null;

/** The ids only the site's legacy index lists, or null when it has none (readIndexes in lib/collection-index.js). */
let legacyIndexIds = null;

let collectionStores = {};

/** Published baseline per collection id: used when undo recreates a deleted collection's store. */
let publishedCollections = {};

/** True only once initCollections has filled ALL stores; snapshot() includes collections only then. */
let collectionsReady = false;

let collectionIds = $state([]);

/** True when the request for the collection index failed as the editor opened: the collections are then out of editing and publishing until a reload. */
let collectionsUnavailable = $state(false);

let collectionsView = $state({});

let activeCollection = $state(null);
/** The entry and field a click on a product card in the preview asks for: the panel opens the entry and focuses the field, then clears it. */
let focusEntry = $state(null);

/** A collection to open in the Collections panel, asked from outside it («Edit the product catalogue», a new collection); a fresh object each time, so the same collection opens again after it was folded. */
let openRequest = $state(null);

/** A click on a card in the preview (urd-open-entry): the Collections panel on that collection, with the entry open and its field focused. */
function openEntry(msg) {
  if (typeof msg?.collection !== 'string' || !collectionIds.includes(msg.collection) || typeof msg.entryId !== 'string') return;
  activeCollection = msg.collection;
  focusEntry = { id: msg.entryId, field: typeof msg.field === 'string' ? msg.field : 'title' };
  shellState.activePanel = 'collections';
}

/** Where the Collections panel stands (panels/CollectionsPanel.svelte): the collection open in it and the entry chosen, kept while the panel is closed and opened again. */
let panelCollection = $state(null);

let panelEntry = $state(null);

/** The entries ticked in the open collection (panels/collections/SelectionBar.svelte); cleared when another collection opens. */
let panelTicks = $state([]);

/**
 * A CSV import waiting for the owner's word (panels/collections/ImportDialog.svelte, ImportStep.svelte, ImportTable.svelte): the file read and checked (readCsv),
 * what rows that match an entry do, what becomes of the entries the file does not name, and the view it shows in. Nothing is stored until it is applied.
 */
let csvImport = $state.raw(null);

/** What the waiting import will do, drawn from the collection as it stands (importPlan); a new entry without an id of its own shows none until the import is applied and gives it one. */
const csvPlan = $derived(csvImport && collectionsView[csvImport.id]
  ? importPlan($state.snapshot(collectionsView[csvImport.id].entries), csvImport.read.rows, { matched: csvImport.matched, missing: csvImport.missing }, () => '')
  : null);

let newCollectionName = $state('');

let newCollectionKind = $state('news');

async function initCollections() {
  // No index is perfectly fine; an index that could not be read is not.
  const { index, legacy, unreadable } = await readIndexes();
  if (unreadable) {
    collectionsUnavailable = true;
    collectionIds = [];
    shellState.setStatus(ta('status.collectionsUnreadable'), 'error');
    return;
  }
  legacyIndexIds = legacy;
  const earlier = earlierDrafts(localStorage);
  const baseline = indexBaseline(index, legacy);
  collectionsIndexStore = createDraftStore(INDEX_DRAFT_KEY, () => baseline, shellState.draftSaveError);
  collectionsIndexStore.data.samlinger = openingIds({
    published: index.samlinger,
    legacy,
    draft: collectionsIndexStore.hasDraft() ? collectionsIndexStore.data.samlinger : null,
    earlier: earlier.ids,
  });
  // The earlier drafts are dropped only once the merge is persisted.
  if (collectionsIndexStore.save()) for (const key of earlier.keys) localStorage.removeItem(key);
  collectionIds = [...collectionsIndexStore.data.samlinger];
  for (const id of collectionIds) {
    let published = null;
    try {
      published = await (await fetch(`/content/samlinger/${id}.json`)).json();
    } catch { /* new, unpublished collection */ }
    // An unpublished collection has the baseline "does not exist"
    // (null), never a synthetic published state: otherwise the draft can
    // equal the false baseline, hasDraft() turn false, and the index be
    // published without the file (index/file drift).
    publishedCollections[id] = published;
    collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => published, shellState.draftSaveError, `urd-draft-samling-${id}`);
    if (!published && !collectionStores[id].data) {
      // Index without a file and without a draft (drifted deploy): give
      // an empty draft so the panel works; the does-not-exist baseline
      // makes the file publish on the next publish and heals the drift.
      collectionStores[id].replace({ schemaVersion: 1, id, name: id, kind: 'custom', entries: [] });
      collectionStores[id].save();
    }
  }
  collectionsReady = true;
  syncCollectionsView();
}

function syncCollectionsView(pushPreview = true) {
  const view = {};
  for (const id of collectionIds) {
    if (collectionStores[id]) view[id] = JSON.parse(JSON.stringify(collectionStores[id].data));
  }
  collectionsView = view;
  // On click-and-type in the block itself the preview push is skipped:
  // the iframe already shows the text, and a rerender mid-typing would
  // lose the caret.
  if (pushPreview) pushCollectionsToPreview();
}

/** Send the collection drafts to the preview (plain copies; $state proxies can never be postMessaged). */
function pushCollectionsToPreview() {
  previewState.bridge?.sendCollections($state.snapshot(collectionsView) ?? {});
}

/** Shared flow for collection changes: history, mutate, save, update
 *  the mirror and the preview. key is the undo key (the edit: prefix
 *  coalesces bursts of the same action). */
function mutateCollection(id, key, fn, pushPreview = true) {
  const store = collectionStores[id];
  if (!store) return;
  historyState.pushHistory(key);
  fn(store.data);
  store.save();
  historyState.updateDirty();
  syncCollectionsView(pushPreview);
}

/** Several collections changed in ONE undo step (a move of entries takes them from one and puts them in another). fn gets the collections' data by id. */
function mutateCollections(ids, key, fn) {
  const stores = ids.map((id) => collectionStores[id]);
  if (stores.some((st) => !st)) return;
  historyState.pushHistory(key);
  fn(Object.fromEntries(ids.map((id, i) => [id, stores[i].data])));
  for (const st of stores) st.save();
  historyState.updateDirty();
  syncCollectionsView();
}

/** A count in words, the one-entry form where the dictionary has it. */
const counted = (key, n, params = {}) => ta(n === 1 ? `${key}.one` : key, { ...params, n: String(n) });

/** The status after a change of several entries, with «Undo» beside it. The button undoes that step alone: once a later change stands on top of it, the button says so instead. */
function doneWithUndo(message) {
  const step = historyState.history.at(-1);
  shellState.setStatus(message, 'ok', { label: ta('ui.undo'), run: () => {
    if (historyState.history.at(-1) === step) historyState.undo();
    else shellState.setStatus(ta('status.undoLater'));
  } });
}

/** A collection's own name; its id, its file, its feed and the blocks that show it stay as they are. */
function renameCollection(id, name) {
  const next = String(name ?? '').trim();
  if (!next) return;
  mutateCollection(id, `collection:${id}:name`, (data) => { data.name = next; });
}

/** Another kind for a collection, only where its entries fit it (lib/collection-bulk.js entriesFit). */
function setCollectionKind(id, kind) {
  const data = collectionStores[id]?.data;
  if (!data || data.kind === kind || !entriesFit(data.entries, kind).fits) return;
  mutateCollection(id, `collection:${id}:kind`, (d) => { d.kind = kind; });
}

/** Copies of the entries, each under its original, in one undo step; the copies' ids are returned. */
function duplicateEntries(id, entryIds) {
  let copyIds = [];
  mutateCollection(id, `collection:${id}:duplicate`, (data) => {
    const out = withCopies(data.entries, entryIds, makeId);
    data.entries = out.entries;
    copyIds = out.copyIds;
  });
  if (entryIds.length > 1) doneWithUndo(ta('status.entriesDuplicated', { n: String(copyIds.length) }));
  return copyIds;
}

/** The entries removed in one undo step, with «Undo» in the status. */
function removeEntries(id, entryIds) {
  const gone = new Set(entryIds);
  mutateCollection(id, `collection:${id}:remove-entries`, (data) => { data.entries = data.entries.filter((e) => !gone.has(e.id)); });
  panelTicks = panelTicks.filter((t) => !gone.has(t));
  if (panelEntry && gone.has(panelEntry)) panelEntry = null;
  doneWithUndo(counted('status.entriesDeleted', entryIds.length));
}

/** One field set on the entries, or cleared with an empty value, in one undo step; false when the value does not fit the field. */
function setFieldOn(id, entryIds, field, value) {
  const data = collectionStores[id]?.data;
  if (!data || !withField(data.entries, entryIds, field, value)) return false;
  mutateCollection(id, `collection:${id}:set-field`, (d) => { d.entries = withField(d.entries, entryIds, field, value); });
  doneWithUndo(counted(value === '' ? 'status.fieldCleared' : 'status.fieldSet', entryIds.length));
  return true;
}

/** The entries carried to another collection of a kind they fit, moved or copied, both collections in one undo step. */
function carryToCollection(from, to, entryIds, copy) {
  const target = collectionStores[to]?.data;
  const source = collectionStores[from]?.data;
  if (!target || !source || from === to) return false;
  const carried = source.entries.filter((e) => entryIds.includes(e.id));
  if (!entriesFit(carried, target.kind).fits) return false;
  mutateCollections([from, to], `collections:${copy ? 'copy' : 'move'}`, (all) => {
    const out = carryEntries(all[from].entries, all[to].entries, entryIds, copy, makeId);
    all[from].entries = out.from;
    all[to].entries = out.to;
  });
  if (!copy) {
    const gone = new Set(entryIds);
    panelTicks = panelTicks.filter((t) => !gone.has(t));
    if (panelEntry && gone.has(panelEntry)) panelEntry = null;
  }
  doneWithUndo(counted(copy ? 'status.entriesCopied' : 'status.entriesMoved', entryIds.length, { name: target.name ?? to }));
  return true;
}

/** A new collection of the same kind made for the entries, and the entries carried into it, all in one undo step. */
function carryToNewCollection(from, name, entryIds, copy) {
  const source = collectionStores[from]?.data;
  const clean = String(name ?? '').trim();
  const id = slugify(clean, '');
  if (!source || !clean) return false;
  if (!id || collectionIds.includes(id)) {
    shellState.setStatus(id ? ta('status.collectionExists') : ta('status.invalidName'), 'error');
    return false;
  }
  if (!collectionsIndexStore) return false;
  historyState.pushHistory('collections');
  insertCollection(id, clean, source.kind, false);
  const out = carryEntries(source.entries, [], entryIds, copy, makeId);
  source.entries = out.from;
  collectionStores[id].data.entries = out.to;
  collectionStores[from].save();
  collectionStores[id].save();
  if (!copy) {
    const gone = new Set(entryIds);
    panelTicks = panelTicks.filter((t) => !gone.has(t));
    if (panelEntry && gone.has(panelEntry)) panelEntry = null;
  }
  historyState.updateDirty();
  syncCollectionsView();
  doneWithUndo(counted(copy ? 'status.entriesCopied' : 'status.entriesMoved', entryIds.length, { name: clean }));
  return true;
}

/** The "+ Product" adder in the product block (urd-collection-add from the iframe). */
function handleCollectionAdd(msg) {
  // Deleted/unknown collection: no-op (the guard also prevents a dead undo step).
  if (!collectionStores[msg.collection]) return;
  addCollectionEntry(msg.collection);
}

/** Plain text from a rich-text title: parsed in an inert document (same
 *  approach as the engine's sanitize.js), never with a regex that can
 *  leave remnants. */
function plainTitle(html) {
  const doc = new DOMParser().parseFromString(String(html ?? ''), 'text/html');
  return (doc.body.textContent ?? '').trim();
}

/** Click-and-type/image swap in the collection block (urd-collection-edit from the iframe). */
function handleCollectionEdit(msg) {
  const { collection, entryId, field, value } = msg;
  if (!['title', 'text', 'image', 'imageAlt', 'imageStyle'].includes(field)) return;
  // An empty title is not kept (the schema requires a title); the old
  // title remains until something is typed. The title is rich text, so
  // emptiness is judged without markup.
  if (field === 'title' && !plainTitle(value)) return;
  mutateCollection(collection, `edit:collection:${collection}:${entryId}:${field}`, (data) => {
    const entry = data.entries.find((e) => e.id === entryId);
    if (!entry) return;
    if (value === '' && field !== 'title') delete entry[field];
    else entry[field] = value;
  }, field === 'image');
}

/** Creates and activates a collection (the caller owns the history step). */
function insertCollection(id, name, kind, open = true) {
  // Without the index (it could not be read) no collection is made: the editor does not know what is published.
  if (!collectionsIndexStore) return;
  const fresh = { schemaVersion: 1, id, name, kind, entries: [] };
  // The baseline is "does not exist" (null) until the first publish: a
  // fresh collection must have hasDraft() true, otherwise the index is
  // published without the file.
  collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => null, shellState.draftSaveError, `urd-draft-samling-${id}`);
  collectionStores[id].replace(fresh);
  collectionStores[id].save();
  collectionsIndexStore.data.samlinger = [...collectionIds, id];
  collectionsIndexStore.save();
  collectionIds = [...collectionIds, id];
  if (open) {
    activeCollection = id;
    openRequest = { id };
  }
  historyState.updateDirty();
  syncCollectionsView();
}

function addCollection() {
  const name = newCollectionName.trim();
  if (!name) return;
  const id = slugify(name, '');
  if (!id || collectionIds.includes(id)) {
    shellState.setStatus(id ? ta('status.collectionExists') : ta('status.invalidName'), 'error');
    return;
  }
  historyState.pushHistory('collections');
  insertCollection(id, name, newCollectionKind);
  newCollectionName = '';
}

/** "+ Create product catalog" in the product block's Properties: collection + binding in ONE undo step. */
function createCatalogForBlock() {
  if (collectionsUnavailable) return;
  const name = ta('seed.productCatalogName');
  const base = slugify(name, 'collection');
  let id = base;
  // Slug dedup: a non-product collection can already own the base name.
  for (let n = 2; collectionIds.includes(id); n += 1) id = `${base}-${n}`;
  historyState.pushHistory('collections');
  insertCollection(id, name, 'products');
  pageState.mutateBlock(null, (b) => { b.props.collection = id; });
}

function removeCollection(id) {
  if (csvImport?.id === id) csvImport = null;
  historyState.pushHistory('collections');
  localStorage.removeItem(`urd-draft-collection-${id}`);
      localStorage.removeItem(`urd-draft-samling-${id}`);
  delete collectionStores[id];
  collectionsIndexStore.data.samlinger = collectionIds.filter((x) => x !== id);
  collectionsIndexStore.save();
  collectionIds = collectionIds.filter((x) => x !== id);
  if (activeCollection === id) activeCollection = null;
  if (panelCollection === id) { panelCollection = null; panelEntry = null; panelTicks = []; }
  historyState.updateDirty();
  syncCollectionsView();
}

/** A new entry, its id returned so the panel can open it. */
function addCollectionEntry(id) {
  const entryId = makeId('entry');
  mutateCollection(id, `collection:${id}:add-entry`, (data) => {
    if (data.kind === 'products') {
      // Products: no date (irrelevant), the price is set in the panel;
      // added LAST so the adder card in the preview gets the new card
      // next to it.
      data.entries.push({ id: entryId, title: ta('seed.newProduct'), text: '' });
    } else {
      data.entries.unshift({
        id: entryId,
        title: ta('seed.newEntry'),
        date: new Date().toISOString().slice(0, 10),
        text: '',
      });
    }
  });
  return entryId;
}

/** A CSV file chosen for a collection, read and checked; it waits in the view Urd settings choose until it is applied or cancelled. */
async function startCsvImport(id, file) {
  const view = collectionsView[id];
  if (!file || !view) return;
  const read = readCsv(decodeCsv(await file.arrayBuffer()), view.kind, siteState.siteDraft?.pages ?? []);
  if (!read) {
    shellState.setStatus(ta('status.csvInvalid'), 'error');
    return;
  }
  // The panel's step needs the Collections panel in view; started where it is not, the import waits in the dialog.
  const pref = shellState.csvPreviewPref;
  const panelShown = shellState.activePanel === 'collections' && !shellState.panelFolded;
  csvImport = { id, fileName: file.name, read, matched: 'update', missing: 'keep', view: pref === 'panel' && !panelShown ? 'dialog' : pref };
}

/** One of the waiting import's choices, or its view. */
function setCsvImport(patch) {
  if (csvImport) csvImport = { ...csvImport, ...patch };
}

function cancelCsvImport() {
  csvImport = null;
}

/** The waiting import stored as one undo step, offered as Undo in the status line; the status names what it did. */
function applyCsvImport() {
  const session = csvImport;
  if (!session || !collectionStores[session.id]) return;
  const plan = importPlan($state.snapshot(collectionStores[session.id].data.entries), session.read.rows,
    { matched: session.matched, missing: session.missing }, makeId);
  csvImport = null;
  const removed = session.missing === 'remove' ? plan.counts.missing : 0;
  const parts = [
    plan.counts.new && counted('csv.part.new', plan.counts.new),
    plan.counts.changed && counted('csv.part.updated', plan.counts.changed),
    removed && counted('csv.part.removed', removed),
  ].filter(Boolean);
  if (!parts.length) {
    shellState.setStatus(ta('status.csvNothing'));
    return;
  }
  mutateCollection(session.id, `collection:${session.id}:import`, (data) => { data.entries = plan.entries; });
  doneWithUndo(ta('status.csvImportDone', { list: new Intl.ListFormat(adminLang(), { type: 'conjunction' }).format(parts) }));
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const collectionsState = {
  get collectionsIndexStore() { return collectionsIndexStore; },
  set collectionsIndexStore(v) { collectionsIndexStore = v; },
  get legacyIndexIds() { return legacyIndexIds; },
  set legacyIndexIds(v) { legacyIndexIds = v; },
  get collectionStores() { return collectionStores; },
  set collectionStores(v) { collectionStores = v; },
  get publishedCollections() { return publishedCollections; },
  set publishedCollections(v) { publishedCollections = v; },
  get collectionsReady() { return collectionsReady; },
  set collectionsReady(v) { collectionsReady = v; },
  get collectionIds() { return collectionIds; },
  get collectionsUnavailable() { return collectionsUnavailable; },
  set collectionIds(v) { collectionIds = v; },
  get collectionsView() { return collectionsView; },
  set collectionsView(v) { collectionsView = v; },
  get activeCollection() { return activeCollection; },
  set activeCollection(v) { activeCollection = v; },
  get openRequest() { return openRequest; },
  set openRequest(v) { openRequest = v; },
  get focusEntry() { return focusEntry; },
  set focusEntry(v) { focusEntry = v; },
  openEntry,
  get panelCollection() { return panelCollection; },
  set panelCollection(v) { if (v !== panelCollection) panelTicks = []; panelCollection = v; },
  get panelEntry() { return panelEntry; },
  set panelEntry(v) { panelEntry = v; },
  get panelTicks() { return panelTicks; },
  set panelTicks(v) { panelTicks = v; },
  get csvImport() { return csvImport; },
  get csvPlan() { return csvPlan; },
  startCsvImport,
  setCsvImport,
  cancelCsvImport,
  applyCsvImport,
  mutateCollections,
  renameCollection,
  setCollectionKind,
  duplicateEntries,
  removeEntries,
  setFieldOn,
  carryToCollection,
  carryToNewCollection,
  get newCollectionName() { return newCollectionName; },
  set newCollectionName(v) { newCollectionName = v; },
  get newCollectionKind() { return newCollectionKind; },
  set newCollectionKind(v) { newCollectionKind = v; },
  initCollections,
  syncCollectionsView,
  pushCollectionsToPreview,
  mutateCollection,
  handleCollectionAdd,
  plainTitle,
  handleCollectionEdit,
  insertCollection,
  addCollection,
  createCatalogForBlock,
  removeCollection,
  addCollectionEntry,
};
