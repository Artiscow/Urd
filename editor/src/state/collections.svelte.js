/**
 * The collections: their draft stores, the view the preview and the panels read, and the mutators.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { createDraftStore } from '../lib/draftStore.js';
import { slugify } from '$engine/imageTools.js';
import { ta } from '$engine/i18n.js';
import { makeId } from '$engine/sections/presets.js';
import { historyState } from './history.svelte.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';

// Collections are shared site data (like nav/footer): an index file +
// one file per collection, each with its own draftStore. Editing goes
// through the Ctrl+Z history (like pages/site).
let collectionsIndexStore = null;

let collectionStores = {};

/** Published baseline per collection id: used when undo recreates a deleted collection's store. */
let publishedCollections = {};

/** True only once initCollections has filled ALL stores; snapshot() includes collections only then. */
let collectionsReady = false;

let collectionIds = $state([]);

let collectionsView = $state({});

let activeCollection = $state(null);

let newCollectionName = $state('');

let newCollectionKind = $state('news');

async function initCollections() {
  let index = { version: 1, samlinger: [] };
  try {
    index = await (await fetch('/content/collections.json')).json();
  } catch { /* no index is perfectly fine */ }
  collectionsIndexStore = createDraftStore('urd-draft-collections', () => index, shellState.draftSaveError, 'urd-draft-samlinger');
  collectionIds = [...(collectionsIndexStore.data.samlinger ?? [])];
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
function insertCollection(id, name, kind) {
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
  activeCollection = id;
  historyState.updateDirty();
  syncCollectionsView();
}

function addCollection() {
  const name = newCollectionName.trim();
  if (!name) return;
  const id = slugify(name);
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
  const name = ta('seed.productCatalogName');
  const base = slugify(name) || 'collection';
  let id = base;
  // Slug dedup: a non-product collection can already own the base name.
  for (let n = 2; collectionIds.includes(id); n += 1) id = `${base}-${n}`;
  historyState.pushHistory('collections');
  insertCollection(id, name, 'products');
  pageState.mutateBlock(null, (b) => { b.props.collection = id; });
}

function removeCollection(id) {
  historyState.pushHistory('collections');
  localStorage.removeItem(`urd-draft-collection-${id}`);
      localStorage.removeItem(`urd-draft-samling-${id}`);
  delete collectionStores[id];
  collectionsIndexStore.data.samlinger = collectionIds.filter((x) => x !== id);
  collectionsIndexStore.save();
  collectionIds = collectionIds.filter((x) => x !== id);
  if (activeCollection === id) activeCollection = null;
  historyState.updateDirty();
  syncCollectionsView();
}

function addCollectionEntry(id) {
  mutateCollection(id, `collection:${id}:add-entry`, (data) => {
    if (data.kind === 'products') {
      // Products: no date (irrelevant), the price is set in the panel;
      // added LAST so the adder card in the preview gets the new card
      // next to it.
      data.entries.push({ id: makeId('entry'), title: ta('seed.newProduct'), text: '' });
    } else {
      data.entries.unshift({
        id: makeId('entry'),
        title: ta('seed.newEntry'),
        date: new Date().toISOString().slice(0, 10),
        text: '',
      });
    }
  });
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const collectionsState = {
  get collectionsIndexStore() { return collectionsIndexStore; },
  set collectionsIndexStore(v) { collectionsIndexStore = v; },
  get collectionStores() { return collectionStores; },
  set collectionStores(v) { collectionStores = v; },
  get publishedCollections() { return publishedCollections; },
  set publishedCollections(v) { publishedCollections = v; },
  get collectionsReady() { return collectionsReady; },
  set collectionsReady(v) { collectionsReady = v; },
  get collectionIds() { return collectionIds; },
  set collectionIds(v) { collectionIds = v; },
  get collectionsView() { return collectionsView; },
  set collectionsView(v) { collectionsView = v; },
  get activeCollection() { return activeCollection; },
  set activeCollection(v) { activeCollection = v; },
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
