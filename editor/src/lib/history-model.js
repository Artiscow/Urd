/**
 * The rules of the undo history (state/history.svelte.js): when a change joins the step before it, and how many steps are kept.
 * Pure, node-tested (tests/history-model.test.mjs).
 */

/** How many steps the history keeps. */
export const HISTORY_LIMIT = 50;

/** How long after a change the same kind of change still joins its step, in ms: a slider dragged across its range, or the same setting changed in a burst, is one step. */
export const MERGE_MS = 500;

/** The keys a burst joins within MERGE_MS: the panels' settings, where a slider writes on every tick. An action (a block added or deleted, a section moved, a page renamed, a collection's change) is one step each however fast they come. */
const TIME_JOINED = new Set(['nav', 'footer', 'theme', 'site', 'section-size', 'section-theme', 'section-hover', 'section-anim']);
const TIME_JOINED_PREFIX = ['section-divider-', 'sticky-group:', 'sticky-dock:', 'page-meta:'];

/**
 * Whether a change joins the step before it instead of making its own.
 * The same key again joins: an `edit:` or `grid:` key at any pause (a text typed, a grid tuned), a panel setting's key while the changes come within MERGE_MS of each other (TIME_JOINED), and no other key.
 * @param {{key: string, at: number}|null} last The step the history ended on, and when it last grew
 * @param {string} key The change's key
 * @param {number} now The time of the change, in ms
 */
export function joinsLast(last, key, now) {
  if (!last || last.key !== key) return false;
  if (key.startsWith('edit:') || key.startsWith('grid:')) return true;
  if (!TIME_JOINED.has(key) && !TIME_JOINED_PREFIX.some((prefix) => key.startsWith(prefix))) return false;
  return now - last.at < MERGE_MS;
}

/**
 * What kind of change a step was, from its key, as the list of steps names it: a dictionary key for its words, an icon, and whether it was made on a page (so the list names the page beside it).
 * @param {string} key The step's key (the history's pushHistory)
 * @param {{typed?: boolean}} [step] typed: the step carries a caret, so it was typing
 * @returns {{labelKey: string, icon: string, onPage: boolean}}
 */
export function stepKind(key, { typed = false } = {}) {
  const k = String(key ?? '');
  const kind = (labelKey, icon, onPage) => ({ labelKey: `history.step.${labelKey}`, icon, onPage });
  if (typed) return kind('typed', 'text', true);
  if (k === 'discard') return kind('discard', 'restore', false);
  if (k.startsWith('page-meta:') || k === 'edit:page-noindex') return kind('pageSettings', 'gear', true);
  if (k === 'pages') return kind('pages', 'panel_pages', false);
  if (k === 'nav' || k.startsWith('nav-') || k.startsWith('edit:nav-')) return kind('nav', 'panel_nav', false);
  if (k === 'footer' || k.startsWith('footer-')) return kind('footer', 'panel_footer', false);
  if (k === 'theme' || k.startsWith('edit:theme-')) return kind('theme', 'panel_theme', false);
  if (k === 'site' || k === 'setup' || k === 'site-shortcuts' || k === 'grid:site' || k.startsWith('edit:site-')) return kind('site', 'panel_site', false);
  if (k === 'collections') return kind('collections', 'panel_collections', false);
  if (k === 'templates') return kind('templates', 'bookmark', false);
  if (k === 'plugins') return kind('plugins', 'panel_plugins', false);
  if (k === 'add-section') return kind('addSection', 'plus', true);
  if (k === 'delete-section') return kind('deleteSection', 'cross', true);
  if (k === 'move-section') return kind('moveSection', 'up', true);
  if (k === 'duplicate-section') return kind('duplicateSection', 'copy', true);
  if (k === 'section-size' || k === 'layout' || k.startsWith('grid:') || k.startsWith('sticky-group:')) return kind('section', 'gridToggle', true);
  if (k === 'add-block' || k === 'add-blocks' || k.endsWith('-item') || k === 'form-field' || k === 'gallery-add') return kind('addBlock', 'plus', true);
  if (k === 'delete-block' || k === 'gallery-remove') return kind('deleteBlock', 'cross', true);
  if (k === 'move-block' || k === 'gallery-move' || /^edit:(z-|multi-|place-|align-|nudge)/.test(k)) return kind('moveBlock', 'fit', true);
  if (k === 'mobile-reset' || k === 'mobile-order' || k === 'review-done' || k === 'hide-mobile') return kind('phone', 'phone', true);
  return kind('block', 'pencil', true);
}

/**
 * The steps to undo past before the state changes: from the end, every step whose state is the state now (a change that changed nothing).
 * @param {Array<{snap: string}>} steps The history, oldest first
 * @param {string} now The state now, as a snapshot
 * @returns {number} How many steps at the end hold the state now
 */
export function emptyTail(steps, now) {
  let n = 0;
  for (let i = steps.length - 1; i >= 0 && steps[i].snap === now; i -= 1) n += 1;
  return n;
}

/** Whether a step was typing: its own mark, or for a step kept by an older session, its view's caret. */
export const stepTyped = (step) => !!(step.typed ?? step.view?.caret);

/** The page a step was made on: its own mark, or its view's. */
export const stepPage = (step) => step.pageId ?? step.view?.pageId ?? null;

/**
 * The list of steps' jump as a walk over the steps taken off one stack (state/history.svelte.js goSteps): the entries for the other stack, and the state and view to put back.
 * A step's state holds the drafts of the pages beside the open one it wrote (`others`); every page any passed step wrote is carried along with its draft as the walk leaves it, so a jump past several steps puts back every page they touched.
 * @param {Array<{snap: string, view: object, pages?: string[], key: string, at: number, typed?: boolean, pageId?: string}>} steps The steps in the order the walk passes them, the nearest first
 * @param {{state: string, view: object}} start The state and the view the walk starts from
 * @param {(id: string) => any} readDraft A page's draft as stored now
 * @returns {{passed: Array<object>, state: string, view: object}} passed: the entries for the other stack, in the order they go onto it
 */
export function walkSteps(steps, start, readDraft) {
  const drafts = {};
  const draftOf = (id) => (id in drafts ? drafts[id] : readDraft(id));
  // A state holding these pages' drafts as the walk stands, in the shape a snapshot of them has.
  const withPages = (snap, pages) => {
    const state = JSON.parse(snap);
    delete state.others;
    if (pages?.length) state.others = Object.fromEntries(pages.map((id) => [id, draftOf(id)]));
    return JSON.stringify(state);
  };
  let { state, view } = start;
  const passed = [];
  for (const step of steps) {
    passed.push({ snap: withPages(state, step.pages), view, pages: step.pages, key: step.key, at: step.at, made: step.made, typed: stepTyped(step), pageId: stepPage(step) });
    for (const [id, doc] of Object.entries(JSON.parse(step.snap).others ?? {})) drafts[id] = doc;
    state = step.snap;
    view = step.view;
  }
  return { passed, state: withPages(state, Object.keys(drafts)), view };
}

/**
 * Whether the steps kept from the last session lead to the drafts as they stand (state/history.svelte.js loadKept).
 * The mark is written as the history is kept and again as the page goes, so it is never older than the drafts; it names the steps the kept history ends on, and holds hashes of the state: the open page apart from the rest, and that page's stored draft, for a session that opens on another page.
 * @param {{steps: number, top: number, redo: number, redoTop: number, pageId: string, page: string, rest: string, draft: string}} mark
 * @param {{history: Array<{made?: number}>, redoStack: Array<{made?: number}>}} kept The steps as IndexedDB kept them
 * @param {{pageId: string, page: string, rest: string, draftOf: (id: string) => string}} now The state now, hashed the same way
 */
export function keptHolds(mark, kept, now) {
  if (!mark || !kept) return false;
  // The kept steps are the ones the mark was taken with: a step made after the last write is missing from them.
  if (mark.steps !== kept.history.length || mark.top !== (kept.history.at(-1)?.made ?? 0)) return false;
  if (mark.redo !== kept.redoStack.length || mark.redoTop !== (kept.redoStack.at(-1)?.made ?? 0)) return false;
  if (mark.rest !== now.rest) return false;
  return mark.pageId === now.pageId ? mark.page === now.page : mark.draft === now.draftOf(mark.pageId);
}

