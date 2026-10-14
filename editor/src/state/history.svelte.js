/**
 * Undo and redo: one stack over the page, the site, the collections, the templates and the plugins, and the dirty flag.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { createDraftStore } from '../lib/draftStore.js';
import { ta } from '$engine/i18n.js';
import { collectionsState } from './collections.svelte.js';
import { pageState } from './page.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';
import { templatesState } from './templates.svelte.js';

let dirty = $state(false);

function updateDirty() {
  // Drafts on ALL pages count, not just the current one - but not newly
  // published pages that are just waiting for deploy.
  const anyPageDraft = siteState.siteDraft?.pages?.some((p) =>
    !pageState.pendingPublished.has(p.id) && localStorage.getItem(`urd-draft-${p.id}`) !== null) ?? false;
  const anyCollectionDraft = collectionsState.collectionsIndexStore?.hasDraft()
    || Object.values(collectionsState.collectionStores).some((st) => st.hasDraft());
  const anyTemplateDraft = templatesState.templatesIndexStore?.hasDraft()
    || Object.values(templatesState.templateStores).some((st) => st.hasDraft());
  dirty = anyPageDraft
    || (pageState.store?.hasDraft() && !pageState.pendingPublished.has(pageState.pageId))
    || siteState.siteStore?.hasDraft() || pluginsState.pluginsStore?.hasDraft() || anyCollectionDraft || anyTemplateDraft || false;
}

/**
 * Undo/redo: snapshot-based history over the page, site, collection and
 * plugin drafts. pushHistory is called BEFORE every mutation; the keys
 * are used to merge bursts of the same action (each keystroke in a text
 * block must not become its own undo step).
 */
const history = [];

const redoStack = [];

let lastHistoryKey = null;

function snapshot() {
  // pageId is included: undo across page switches must put the page
  // content back on the PAGE it came from, not into the current page's draft.
  // Collections/plugins are null until their init flow has FINISHED (the
  // collectionsReady flag, not merely the index store existing: the stores
  // fill asynchronously afterwards, and a snapshot from that window would
  // miss collections that an undo would then delete); restore skips the
  // null parts.
  return JSON.stringify({
    pageId: pageState.pageId,
    page: pageState.store.data,
    site: siteState.siteStore.data,
    collectionsIndex: collectionsState.collectionsReady ? collectionsState.collectionsIndexStore.data : null,
    collections: collectionsState.collectionsReady
      ? Object.fromEntries(Object.entries(collectionsState.collectionStores).map(([id, st]) => [id, st.data]))
      : {},
    templatesIndex: templatesState.templatesReady ? templatesState.templatesIndexStore.data : null,
    templates: templatesState.templatesReady
      ? Object.fromEntries(Object.entries(templatesState.templateStores).map(([id, st]) => [id, st.data]))
      : {},
    plugins: pluginsState.pluginsStore?.data ?? null,
  });
}

function pushHistory(key) {
  if (key === lastHistoryKey && (key.startsWith('edit:') || key.startsWith('grid:'))) return;
  history.push(snapshot());
  if (history.length > 50) history.shift();
  redoStack.length = 0;
  lastHistoryKey = key;
}

function restore(snap) {
  const { pageId: snapPageId, page, site: siteSnap, collectionsIndex, collections, templatesIndex, templates, plugins } = JSON.parse(snap);
  siteState.siteStore.replace(siteSnap);
  siteState.linkSiteDraft();
  siteState.siteStore.save();
  siteState.grid = { snap: true, ...siteState.siteDraft.grid };
  siteState.pushSiteToPreview();
  // Collections/templates/plugins are restored BEFORE the page-switch
  // branch below, otherwise cross-page undo would lose those parts of the snapshot.
  restoreCollections(collectionsIndex, collections ?? {});
  restoreTemplates(templatesIndex, templates ?? {});
  restorePlugins(plugins);

  // The snapshot belongs to another page (undo across a page switch): put
  // the page content back as a draft THERE, and switch to it.
  if (snapPageId && snapPageId !== pageState.pageId && siteState.siteDraft.pages.some((p) => p.id === snapPageId)) {
    shellState.writeDraftKey(`urd-draft-${snapPageId}`, JSON.stringify(page));
    pageState.selectPage(snapPageId, { keepHistory: true });
    updateDirty();
    return;
  }

  pageState.store.replace(page);
  pageState.store.save();
  updateDirty();
  shellState.updateAttention();
  // The panel mirrors must follow the restored data, otherwise the
  // Properties/section panel shows stale values and the undo looks dead.
  pageState.syncSelectedBlock();
  pageState.syncSectionMirrors(pageState.store.data.sections.find((s) => s.id === pageState.activeSectionId));
  // Undo can remove the page you are on (an undone page creation):
  // then switch to the front page instead of being left hanging.
  if (!siteState.siteDraft.pages.some((p) => p.id === pageState.pageId)) {
    pageState.selectPage(siteState.siteDraft.pages[0].id, { keepHistory: true });
  } else {
    previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
  }
}

/** Restore the collection drafts from a snapshot (null = taken before init, skip).
 *  Missing stores are recreated against the published baseline; stores outside the snapshot are removed. */
function restoreCollections(indexSnap, collectionsSnap) {
  if (!collectionsState.collectionsIndexStore || !indexSnap) return;
  const current = JSON.stringify({
    index: collectionsState.collectionsIndexStore.data,
    collections: Object.fromEntries(Object.entries(collectionsState.collectionStores).map(([id, st]) => [id, st.data])),
  });
  if (current === JSON.stringify({ index: indexSnap, collections: collectionsSnap })) return;
  collectionsState.collectionsIndexStore.replace(indexSnap);
  collectionsState.collectionsIndexStore.save();
  for (const id of Object.keys(collectionsState.collectionStores)) {
    if (!(id in collectionsSnap)) {
      localStorage.removeItem(`urd-draft-collection-${id}`);
      localStorage.removeItem(`urd-draft-samling-${id}`);
      delete collectionsState.collectionStores[id];
    }
  }
  for (const [id, data] of Object.entries(collectionsSnap)) {
    if (!collectionsState.collectionStores[id]) {
      // Undone deletion: the baseline is the published state, or "does
      // not exist" (null) for a collection that never got published
      // (mirrors addCollection, so hasDraft() stays true until publish).
      const baseline = collectionsState.publishedCollections[id] ?? null;
      collectionsState.collectionStores[id] = createDraftStore(`urd-draft-collection-${id}`, () => baseline, shellState.draftSaveError, `urd-draft-samling-${id}`);
    }
    collectionsState.collectionStores[id].replace(data);
    collectionsState.collectionStores[id].save();
  }
  collectionsState.collectionIds = [...(indexSnap.samlinger ?? [])];
  if (collectionsState.activeCollection && !collectionsState.collectionIds.includes(collectionsState.activeCollection)) collectionsState.activeCollection = null;
  collectionsState.syncCollectionsView();
}

/** Restore the template drafts from a snapshot (null = taken before init, skip).
 *  Mirrors restoreCollections, with a "does not exist" baseline for never-published templates. */
function restoreTemplates(indexSnap, templatesSnap) {
  if (!templatesState.templatesIndexStore || !indexSnap) return;
  const current = JSON.stringify({
    index: templatesState.templatesIndexStore.data,
    templates: Object.fromEntries(Object.entries(templatesState.templateStores).map(([id, st]) => [id, st.data])),
  });
  if (current === JSON.stringify({ index: indexSnap, templates: templatesSnap })) return;
  templatesState.templatesIndexStore.replace(indexSnap);
  templatesState.templatesIndexStore.save();
  for (const id of Object.keys(templatesState.templateStores)) {
    if (!(id in templatesSnap)) {
      localStorage.removeItem(`urd-draft-template-${id}`);
      localStorage.removeItem(`urd-draft-mal-${id}`);
      delete templatesState.templateStores[id];
    }
  }
  for (const [id, data] of Object.entries(templatesSnap)) {
    if (!templatesState.templateStores[id]) {
      templatesState.templateStores[id] = createDraftStore(`urd-draft-template-${id}`, () => templatesState.publishedTemplates[id] ?? null, shellState.draftSaveError, `urd-draft-mal-${id}`);
    }
    templatesState.templateStores[id].replace(data);
    templatesState.templateStores[id].save();
  }
  templatesState.templateIds = [...(indexSnap.maler ?? [])];
  updateDirty();
  templatesState.pushTemplatesToPreview();
}

/** Restore the plugin draft from a snapshot (null = taken before init, skip).
 *  Diff-guarded: only a real plugin change should cost a preview reboot. */
function restorePlugins(pluginsSnap) {
  if (!pluginsState.pluginsStore || !pluginsSnap) return;
  if (JSON.stringify(pluginsState.pluginsStore.data) === JSON.stringify(pluginsSnap)) return;
  pluginsState.pluginsStore.replace(pluginsSnap);
  pluginsState.pluginsStore.save();
  pluginsState.syncPluginsView();
  previewState.reloadPreview();
}

function undo() {
  if (!history.length) return;
  pageState.dropFits();
  redoStack.push(snapshot());
  restore(history.pop());
  lastHistoryKey = null;
  shellState.setStatus(ta('status.undone'));
}

function redo() {
  if (!redoStack.length) return;
  pageState.dropFits();
  history.push(snapshot());
  restore(redoStack.pop());
  lastHistoryKey = null;
  shellState.setStatus(ta('status.redone'));
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const historyState = {
  get dirty() { return dirty; },
  set dirty(v) { dirty = v; },
  updateDirty,
  history,
  redoStack,
  get lastHistoryKey() { return lastHistoryKey; },
  set lastHistoryKey(v) { lastHistoryKey = v; },
  snapshot,
  pushHistory,
  restore,
  restoreCollections,
  restoreTemplates,
  restorePlugins,
  undo,
  redo,
};
