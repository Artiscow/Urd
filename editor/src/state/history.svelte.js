/**
 * Undo and redo: one stack over the page, the site, the collections, the templates and the plugins, and what waits to be published with the dirty flag that follows it.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { untrack } from 'svelte';
import { createDraftStore, dropDraft, flushDrafts, onDraftsWritten } from '../lib/draftStore.js';
import { joinsLast, emptyTail, walkSteps, stepTyped, stepPage, keptHolds, HISTORY_LIMIT, ownStepKey } from '../lib/history-model.js';
import { readKept, writeKept } from '../lib/history-store.js';
import { createMediaTable } from '../lib/history-media.js';
import { indexPending } from '../lib/collection-index.js';
import { unpublishedParts } from '../lib/unpublished.js';
import { outSite } from '../lib/publish-pick.js';
import { readNotLive, stillNotLive } from '../lib/not-live.js';
import { partName } from '../lib/saved-model.js';
import { sameJSON } from '../lib/json-copy.js';
import { ta } from '$engine/i18n.js';
import { contentHash } from '$engine/imageTools.js';
import { collectionsState } from './collections.svelte.js';
import { pageState } from './page.svelte.js';
import { pluginsState } from './plugins.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';
import { templatesState } from './templates.svelte.js';
import { redirectsState } from './redirects.svelte.js';

let dirty = $state(false);
// The marks of what waits to be published follow the drafts as they are written (lib/draftStore.js).
onDraftsWritten(() => updateDirty());
/** What waits to be published, one part per thing a publish would write (lib/unpublished.js); the dirty flag is whether it holds any. */
let unpublished = $state.raw([]);
/** When the last publish of everything from this browser was made, kept over a reload, so a part's row shows only the steps since. */
let publishedAt = $state(Number(localStorage.getItem('urd-published-at')) || 0);
/** When a part last went out in a publish of some parts, by its name (lib/saved-model.js partName), kept over a reload. */
let publishedParts = $state.raw(readPublishedParts());

function readPublishedParts() {
  try {
    const kept = JSON.parse(localStorage.getItem('urd-published-at-parts') ?? 'null');
    return kept && typeof kept === 'object' ? kept : {};
  } catch {
    return {};
  }
}
/** Counts the changes saved this session, so a view that reads the page's own data (which is not reactive) follows every change. */
let edits = $state(0);

/** A publish went out: of everything, or of the parts named, so a part kept back still lists the steps made on it before. */
function markPublished(parts = null) {
  const now = Date.now();
  if (!parts) {
    publishedAt = now;
    publishedParts = {};
    localStorage.setItem('urd-published-at', String(publishedAt));
    localStorage.removeItem('urd-published-at-parts');
    return;
  }
  // The times of the parts still waiting are kept, the rest pruned, so a part gone (a deleted page) leaves no time behind.
  const waiting = new Set(unpublished.map(partName));
  publishedParts = { ...Object.fromEntries(Object.entries(publishedParts).filter(([name]) => waiting.has(name))), ...Object.fromEntries([...parts].map((name) => [name, now])) };
  try {
    localStorage.setItem('urd-published-at-parts', JSON.stringify(publishedParts));
  } catch { /* the storage is full: the times hold for this session */ }
}

/** When a part last went out, for the steps its row lists. */
const publishedAtOf = (name) => Math.max(publishedAt, publishedParts[name] ?? 0);

/** Whether the site settings wait: a draft that differs from the live settings other than in the entries of pages not live yet that went out hidden (lib/not-live.js), which go out shown with their page. */
function siteWaits() {
  if (!siteState.siteStore?.hasDraft()) return false;
  const kept = stillNotLive(readNotLive(), siteState.site?.pages ?? []);
  if (!kept.size) return true;
  return JSON.stringify(outSite(siteState.siteDraft, kept)) !== JSON.stringify(siteState.site);
}

function updateDirty() {
  // Read without tracking, so an effect that saves never follows its own count.
  edits = untrack(() => edits) + 1;
  // Drafts on ALL pages count, not just the current one; a newly published page waiting for its deploy counts only where it was edited since it went. The open page counts by its store too, also before its draft is written.
  const pages = [...(siteState.siteDraft?.pages ?? [])];
  if (pageState.pageId && !pages.some((p) => p.id === pageState.pageId)) pages.push({ id: pageState.pageId });
  const pageDraft = (id) => (pageState.pendingPublished.has(id)
    ? pageState.pendingChanged(id)
    : localStorage.getItem(`urd-draft-${id}`) !== null || (id === pageState.pageId && Boolean(pageState.store?.hasDraft())));
  unpublished = unpublishedParts({
    pages,
    pageDraft,
    site: siteWaits(),
    collectionsIndex: indexPending(collectionsState.collectionsIndexStore?.hasDraft() ?? false, collectionsState.legacyIndexIds),
    collections: Object.entries(collectionsState.collectionStores)
      // A collection's name is read without tracking, so an effect that saves never follows the view it refreshes.
      .map(([id, st]) => ({ id, name: untrack(() => collectionsState.collectionsView[id]?.name), draft: st.hasDraft() })),
    templates: Boolean(templatesState.templatesIndexStore?.hasDraft() || Object.values(templatesState.templateStores).some((st) => st.hasDraft())),
    plugins: Boolean(pluginsState.pluginsStore?.hasDraft()),
    redirects: Boolean(redirectsState.redirectsStore?.hasDraft()),
  });
  dirty = unpublished.length > 0;
}

/** Takes the owner to a part that waits to be published (lib/UnpublishedRows.svelte): the page onto the canvas, a collection into its panel, the rest to the panel or the dialog that holds it. */
function goToUnpublished(part) {
  if (part.kind === 'page') {
    // A page saved elsewhere that this browser's site settings do not list has nowhere to go to.
    if (siteState.siteDraft.pages.some((p) => p.id === part.id)) pageState.selectPage(part.id);
  }
  else if (part.kind === 'site') shellState.activePanel = 'site';
  else if (part.kind === 'collections' || part.kind === 'collection') {
    if (part.kind === 'collection') {
      collectionsState.panelCollection = part.id;
      collectionsState.panelEntry = null;
    }
    shellState.activePanel = 'collections';
  } else if (part.kind === 'templates') shellState.showFold('blocks', 'templates');
  else if (part.kind === 'plugins') shellState.activePanel = 'plugins';
  else if (part.kind === 'redirects') redirectsState.openRedirects();
}

/**
 * Undo/redo: snapshot-based history over the page, site, collection and
 * plugin drafts. pushHistory is called BEFORE every mutation; the keys
 * are used to merge bursts of the same action (each keystroke in a text
 * block, each tick of a slider, must not become its own undo step;
 * lib/history-model.js joinsLast). Each step is { snap, view, pages, key,
 * at, made, typed, pageId }: the state before the change, the selection and
 * caret it was made with (put back by an undo), the pages beside the open
 * one whose drafts the state holds, the kind of change, when it last grew
 * and when it was made, whether it was typing, and the page it was made on
 * (the list of steps).
 */
const history = [];

const redoStack = [];

/** The pictures and films the steps hold, each kept once: a step's state holds a token in an unpublished picture's place (lib/history-media.js). */
const media = createMediaTable();

/** Gives a step the id it is kept under (lib/history-store.js). */
function withId(step) {
  step.id ??= `${(step.made ?? Date.now()).toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return step;
}

let lastHistoryKey = null;

/** While a change runs as a step of its own (asOwnStep), and the number that sets it apart (ownStepKey). */
let ownStepDepth = 0;
let ownSteps = 0;
/** The key of the step of its own running now: its first change's, which every change after it in the step takes, so several changes are one step (a capability's way back clears several settings). */
let ownStepNow = null;

/** Keys whose next change is a step of its own, for a change the preview makes and hands back after the call that asked for it has returned (ownStepNext). */
const ownNext = new Set();

/** Runs `fn` as an undo step of its own: a setting's way back never joins the change before it, so an undo right after brings that change back, and the next change never joins it. */
function asOwnStep(fn) {
  if (ownStepDepth === 0) {
    ownSteps += 1;
    ownStepNow = null;
  }
  ownStepDepth += 1;
  try {
    return fn();
  } finally {
    ownStepDepth -= 1;
  }
}

/** Makes the next change under `key` a step of its own, as asOwnStep does for a change made at once: the whole text's font and size come back from the preview as the text's edit (setTextStyle in page.svelte.js). */
function ownStepNext(key) {
  ownNext.add(key);
}

/** When the step the history ends on last grew, for the window a slider's ticks join in. */
let lastHistoryAt = 0;

/** The redo steps a new step set aside: given back if that step turns out to have changed nothing. */
let redoAside = null;

/** Counts the undos and redos, so a view that caches page data reads it again after one. */
let restores = $state(0);

/** Counts every change to the steps, so the buttons and the list of steps follow them. */
let stepsTick = $state(0);

/** The kept steps are written a moment after they change, so a burst of steps is written once. */
let keepTimer = 0;

/** Whether the steps of the last session have been looked at: until then nothing is kept, so a change during the start never writes over them. */
let keptTaken = false;

/** Keeps the steps a moment after they change; the state they lead to is marked again as the page goes (keepOnLeave). */
function scheduleKeep() {
  if (!keptTaken) return;
  clearTimeout(keepTimer);
  keepTimer = setTimeout(keep, 100);
}

/** Marks the steps changed: the buttons and the list redraw, and the history is kept for a reload. */
function stepsChanged() {
  stepsTick += 1;
  scheduleKeep();
}

/** Where the mark of the kept history stands: in localStorage, written at once, so it can be written as the page goes. */
const MARK_KEY = 'urd-history-mark';

/** Writes the steps for the next session in this browser (lib/history-store.js), and the mark of the state they lead to. */
function keep() {
  keepTimer = 0;
  flushDrafts();
  writeKept({ history, redoStack }, media);
  // The pictures no step holds any longer are let go; the redo steps a step set aside hold theirs, since they come back when that step changed nothing.
  media.keepOnly(new Set([...history, ...redoStack, ...(redoAside ?? [])].flatMap((step) => media.tokensIn(step.snap))));
  writeMark();
}

/** A page's stored draft, hashed with its pictures as tokens (an empty text where it has none), as the next session hashes it (loadKept). */
function storedDraftHash(pageId) {
  const text = localStorage.getItem(`urd-draft-${pageId}`);
  try {
    return contentHash(text ? media.stringify(JSON.parse(text)) : '');
  } catch {
    return '';
  }
}

/**
 * The state the steps lead to, hashed (lib/history-model.js keptHolds): the steps it was taken with, and the open page apart from the rest, with their pictures as tokens, and that page's stored draft.
 * After a step the drafts have just been written, so the stored draft is taken as the page held, or none; as the page goes (`exact`) the stored text itself is read, which can differ where a page was changed without a write.
 */
function writeMark(exact = false) {
  const { pageId, page, ...rest } = stateObject();
  const pageHash = contentHash(media.stringify(page));
  const mark = {
    steps: history.length, top: history.at(-1)?.made ?? 0, redo: redoStack.length, redoTop: redoStack.at(-1)?.made ?? 0,
    pageId, page: pageHash, rest: contentHash(media.stringify(rest)),
    draft: exact ? storedDraftHash(pageId) : pageState.store?.hasDraft() ? pageHash : contentHash(''),
  };
  try {
    localStorage.setItem(MARK_KEY, JSON.stringify(mark));
  } catch { /* storage full: the next session starts its own history */ }
}

/** The page goes or is hidden (a reload, a closed tab, another app): the mark follows the drafts as they stand, the typing that joined a step included. */
function keepOnLeave(event) {
  if (event.type === 'visibilitychange' && document.visibilityState !== 'hidden') return;
  flushDrafts();
  writeMark(true);
}

/**
 * Takes up the steps kept from the last session, once the drafts are loaded: only when the drafts are the ones the steps were kept with, so an undo never writes back over drafts discarded or a site published since.
 */
async function loadKept() {
  try {
    const kept = await readKept(media);
    if (!kept || !Array.isArray(kept.history) || !Array.isArray(kept.redoStack)) return;
    let mark = null;
    try { mark = JSON.parse(localStorage.getItem(MARK_KEY) ?? 'null'); } catch { /* a broken mark holds nothing */ }
    const { pageId, page, ...rest } = stateObject();
    const now = {
      pageId, page: contentHash(media.stringify(page)), rest: contentHash(media.stringify(rest)),
      draftOf: storedDraftHash,
    };
    if (!keptHolds(mark, kept, now)) return;
    history.splice(0, history.length, ...kept.history.slice(-HISTORY_LIMIT).map(withId));
    redoStack.splice(0, redoStack.length, ...kept.redoStack.map(withId));
    stepsTick += 1;
  } finally {
    keptTaken = true;
    window.addEventListener('pagehide', keepOnLeave);
    document.addEventListener('visibilitychange', keepOnLeave);
  }
}

/** The selection and the caret a change is made with: the page, the active section, the selected block and, for typing, the caret's place in its text. */
function currentView(caret = null) {
  return {
    pageId: pageState.pageId,
    sectionId: pageState.activeSectionId ?? null,
    blockId: pageState.selectedBlock?.blockId ?? null,
    caret: caret && Number.isFinite(caret.offset) ? caret : null,
  };
}

/** The selection and the caret of a step put back on the page it was made on: the block selected again, the caret back in its text. */
function restoreView(view) {
  if (!view || view.pageId !== pageState.pageId) return;
  const bridge = previewState.bridge;
  if (view.blockId) {
    bridge?.sendSelect(view.blockId);
    if (view.caret) bridge?.sendCaret(view.caret.blockId ?? view.blockId, view.caret.offset);
  } else if (view.sectionId) {
    pageState.onSelectSection({ sectionId: view.sectionId });
    bridge?.sendActiveSection(view.sectionId);
  }
}

/**
 * The state of every draft as one string: what a step holds and an undo compares.
 * @param {string[]} [pageIds] Pages beside the open one whose drafts the state holds (a change made to a page that is not open)
 */
function snapshot(pageIds = []) {
  return media.stringify({
    ...stateObject(),
    ...(pageIds?.length ? { others: Object.fromEntries(pageIds.map((id) => [id, readDraft(id)])) } : {}),
  });
}

/** Every draft's state as one object, the open page first: what a snapshot holds, and what the kept history's mark hashes. */
function stateObject() {
  // pageId is included: undo across page switches must put the page
  // content back on the PAGE it came from, not into the current page's draft.
  // Collections/plugins are null until their init flow has FINISHED (the
  // collectionsReady flag, not merely the index store existing: the stores
  // fill asynchronously afterwards, and a snapshot from that window would
  // miss collections that an undo would then delete); restore skips the
  // null parts.
  return {
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
    redirects: redirectsState.redirectsStore?.data ?? null,
  };
}

/** A page's draft as stored, parsed; null for a page without one. */
function readDraft(id) {
  try {
    const raw = localStorage.getItem(`urd-draft-${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** A change that is not undone (the media tidy, state/publish.svelte.js): every step before it and after it is let go, so no undo brings back what it changed. */
function startAnew() {
  history.length = 0;
  redoStack.length = 0;
  redoAside = null;
  lastHistoryKey = null;
  stepsChanged();
}

/**
 * Records the state before a change, as a step undo goes back to; a change that joins the step before it (joinsLast) records nothing.
 * A step whose change turned out to change nothing gives way to the next, and the redo steps it set aside come back.
 * @param {string} key The kind of change, which decides what joins
 * @param {{caret?: {blockId: string, offset: number}|null, pages?: string[]}} [options] The caret the change was typed at, and pages beside the open one the change writes, whose drafts the step holds
 */
function pushHistory(key, { caret = null, pages = [] } = {}) {
  if (ownStepDepth > 0) key = ownStepNow ??= ownStepKey(key, ownSteps);
  else if (ownNext.delete(key)) key = ownStepKey(key, (ownSteps += 1));
  const now = Date.now();
  if (joinsLast(lastHistoryKey === null ? null : { key: lastHistoryKey, at: lastHistoryAt }, key, now)) {
    lastHistoryAt = now;
    // The step's time follows the change it gathers, so the list of steps says when it last grew.
    const top = history.at(-1);
    if (top) top.at = now;
    stepsTick += 1;
    return;
  }
  const snap = snapshot(pages);
  const top = history.at(-1);
  // The state now as the step before holds it: the same string unless either names other pages.
  if (top && redoAside && top.snap === (!top.pages?.length && !pages.length ? snap : snapshot(top.pages))) {
    // The step before changed nothing: it goes, and the redo it set aside comes back for this step to set aside again.
    history.pop();
    redoStack.splice(0, redoStack.length, ...redoAside);
  }
  const view = currentView(caret);
  history.push(withId({ snap, view, pages, key, at: now, made: now, typed: !!view.caret, pageId: view.pageId }));
  if (history.length > HISTORY_LIMIT) history.shift();
  redoAside = redoStack.splice(0);
  lastHistoryKey = key;
  lastHistoryAt = now;
  stepsChanged();
}

function restore(snap) {
  const { pageId: snapPageId, page, site: siteSnap, collectionsIndex, collections, templatesIndex, templates, plugins, redirects, others } = media.parse(snap);
  restores += 1;
  // Pages beside the open one the step wrote: their drafts as they were, written back without leaving the page.
  for (const [id, doc] of Object.entries(others ?? {})) {
    if (doc) shellState.writeDraftKey(`urd-draft-${id}`, JSON.stringify(doc));
    else localStorage.removeItem(`urd-draft-${id}`);
  }
  // The canvas is sent what the step changed: the site, the page, or both in one message, so the page is drawn once.
  const siteChanged = !sameJSON(siteSnap, $state.snapshot(siteState.siteDraft));
  siteState.siteStore.replace(siteSnap);
  siteState.linkSiteDraft();
  siteState.siteStore.save();
  siteState.grid = { snap: true, ...siteState.siteDraft.grid };
  // Collections/templates/plugins are restored BEFORE the page-switch
  // branch below, otherwise cross-page undo would lose those parts of the snapshot.
  restoreCollections(collectionsIndex, collections ?? {});
  restoreTemplates(templatesIndex, templates ?? {});
  restorePlugins(plugins);
  redirectsState.restoreRedirects(redirects);

  // The snapshot belongs to another page (undo across a page switch): put
  // the page content back as a draft THERE, and switch to it.
  if (snapPageId && snapPageId !== pageState.pageId && siteState.siteDraft.pages.some((p) => p.id === snapPageId)) {
    if (siteChanged) siteState.pushSiteToPreview();
    shellState.writeDraftKey(`urd-draft-${snapPageId}`, JSON.stringify(page));
    pageState.selectPage(snapPageId, { keepHistory: true });
    updateDirty();
    return;
  }

  const pageChanged = !sameJSON(page, pageState.store.data);
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
    if (siteChanged) siteState.pushSiteToPreview();
    pageState.selectPage(siteState.siteDraft.pages[0].id, { keepHistory: true });
  } else if (siteChanged) {
    siteState.pushSiteToPreview({ page: pageChanged });
  } else if (pageChanged) {
    previewState.bridge?.sendPage(pageState.pageId, pageState.store.data);
  }
}

/** Restore the collection drafts from a snapshot (null = taken before init, skip).
 *  Missing stores are recreated against the published baseline; stores outside the snapshot are removed. */
function restoreCollections(indexSnap, collectionsSnap) {
  if (!collectionsState.collectionsIndexStore || !indexSnap) return;
  const current = media.stringify({
    index: collectionsState.collectionsIndexStore.data,
    collections: Object.fromEntries(Object.entries(collectionsState.collectionStores).map(([id, st]) => [id, st.data])),
  });
  if (current === media.stringify({ index: indexSnap, collections: collectionsSnap })) return;
  collectionsState.collectionsIndexStore.replace(indexSnap);
  collectionsState.collectionsIndexStore.save();
  for (const id of Object.keys(collectionsState.collectionStores)) {
    if (!(id in collectionsSnap)) {
      dropDraft(`urd-draft-collection-${id}`);
      dropDraft(`urd-draft-samling-${id}`);
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
  const current = media.stringify({
    index: templatesState.templatesIndexStore.data,
    templates: Object.fromEntries(Object.entries(templatesState.templateStores).map(([id, st]) => [id, st.data])),
  });
  if (current === media.stringify({ index: indexSnap, templates: templatesSnap })) return;
  templatesState.templatesIndexStore.replace(indexSnap);
  templatesState.templatesIndexStore.save();
  for (const id of Object.keys(templatesState.templateStores)) {
    if (!(id in templatesSnap)) {
      dropDraft(`urd-draft-template-${id}`);
      dropDraft(`urd-draft-mal-${id}`);
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
  if (media.stringify(pluginsState.pluginsStore.data) === media.stringify(pluginsSnap)) return;
  pluginsState.pluginsStore.replace(pluginsSnap);
  pluginsState.pluginsStore.save();
  pluginsState.syncPluginsView();
  previewState.reloadPreview();
}

/**
 * Goes back one step that changed something: steps at the end that hold the state as it is now changed nothing and are passed (lib/history-model.js emptyTail), with the redo a last empty step set aside given back.
 */
function undo() {
  // The stored drafts of the pages a step names are read and written: a change waiting to be written goes first.
  flushDrafts();
  // The state now, once for the steps that hold the open page alone and once per step that holds other pages too.
  let plain = null;
  const nowFor = (pages) => (pages?.length ? snapshot(pages) : (plain ??= snapshot()));
  const top = history.at(-1);
  if (top && redoAside && top.snap === nowFor(top.pages)) redoStack.splice(0, redoStack.length, ...redoAside);
  redoAside = null;
  const passed = emptyTail(history.map((step) => ({ snap: step.snap === nowFor(step.pages) ? '' : step.snap })), '');
  history.splice(history.length - passed, passed);
  if (!history.length) {
    // Only steps that changed nothing were left: they are gone, and the buttons and the list follow.
    stepsChanged();
    return;
  }
  pageState.dropFits();
  const step = history.pop();
  redoStack.push(withId({ snap: nowFor(step.pages), view: currentView(), pages: step.pages, key: step.key, at: step.at, made: step.made, typed: stepTyped(step), pageId: stepPage(step) }));
  restore(step.snap);
  restoreView(step.view);
  lastHistoryKey = null;
  stepsChanged();
  shellState.setStatus(ta('status.undone'));
}

function redo() {
  if (!redoStack.length) return;
  flushDrafts();
  redoAside = null;
  pageState.dropFits();
  const step = redoStack.pop();
  history.push(withId({ snap: snapshot(step.pages), view: currentView(), pages: step.pages, key: step.key, at: step.at, made: step.made, typed: stepTyped(step), pageId: stepPage(step) }));
  restore(step.snap);
  restoreView(step.view);
  lastHistoryKey = null;
  stepsChanged();
  shellState.setStatus(ta('status.redone'));
}

/**
 * The list of steps' jump: back to just after the step at that place in the history, or forward through the redo steps to one of them, as that many undos or redos with the state drawn once at the end.
 * The pages beside the open one that any passed step wrote are carried along, each with its draft as the walk leaves it, and the selection put back is the last passed step's (lib/history-model.js walkSteps).
 * @param {'back'|'forward'} way
 * @param {number} count How many steps to go
 */
function goSteps(way, count) {
  flushDrafts();
  const from = way === 'back' ? history : redoStack;
  const to = way === 'back' ? redoStack : history;
  const n = Math.min(Math.max(0, count), from.length);
  if (!n) return;
  pageState.dropFits();
  redoAside = null;
  const steps = [];
  for (let i = 0; i < n; i += 1) steps.push(from.pop());
  const walk = walkSteps(steps, { state: snapshot(), view: currentView() }, readDraft, media.stringify);
  to.push(...walk.passed.map(withId));
  restore(walk.state);
  restoreView(walk.view);
  lastHistoryKey = null;
  stepsChanged();
  shellState.setStatus(ta(way === 'back' ? 'status.undone' : 'status.redone'));
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const historyState = {
  get dirty() { return dirty; },
  /** What waits to be published, for the Publish menu and History's «Not published yet». */
  get unpublished() { return unpublished; },
  goToUnpublished,
  get publishedAt() { return publishedAt; },
  publishedAtOf,
  markPublished,
  get edits() { return edits; },
  updateDirty,
  history,
  redoStack,
  get lastHistoryKey() { return lastHistoryKey; },
  set lastHistoryKey(v) { lastHistoryKey = v; },
  get restores() { return restores; },
  /** The steps as the buttons and the list show them: the history newest first, and the redo steps nearest first; each with its kind of change, its page and its time. */
  get steps() {
    void stepsTick;
    const describe = (step) => ({ key: step.key ?? '', at: step.at ?? 0, pageId: stepPage(step), pages: step.pages ?? [], typed: stepTyped(step) });
    return { undo: history.map(describe).reverse(), redo: redoStack.map(describe).reverse() };
  },
  goSteps,
  loadKept,
  snapshot,
  pushHistory,
  startAnew,
  asOwnStep,
  ownStepNext,
  restore,
  restoreCollections,
  restoreTemplates,
  restorePlugins,
  undo,
  redo,
};
