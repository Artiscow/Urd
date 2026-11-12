/**
 * The Drafts window (ADR-0032): the System section's Drafts tab opens it over the canvas, beside the work, with three tabs for where each change stands (this browser, saved, live).
 * A mouse resting on the tab opens it, and it closes a moment after the mouse has left the tab and the window, unless a press on the tab or in the window, the pin or the focus inside it keeps it; a press on the tab opens it as well.
 * It is dragged by its head to any place; where it stands, by its tab or where it was dragged, is kept for the browser tab's session in `urd-drafts-place` (sessionStorage), so a reload brings it back there. Pinned, it stays open while the owner edits, and at the next load; folded, it is a pill in the canvas's corner.
 * In This browser each part has a tick, and an unticked part is kept for later: a save writes the ticked ones, with the owner's note and this browser's name, and a publish sends them and saves the unticked ones quietly for the owner's other devices (state/publish.svelte.js).
 * Ctrl+S saves the ticked parts without opening anything, and «Autosave» does so every five minutes while it is on; neither writes over a part saved elsewhere since, which waits for the owner.
 * What is kept per browser, all admin keys: `urd-drafts-pinned`, `urd-drafts-pill`, `urd-drafts-later` (the unticked parts), `urd-browser-name` and `urd-drafts-autosave`.
 */
import { ta } from '$engine/i18n.js';
import { tickedNames, firstTab } from '../lib/saved-model.js';
import { savedState } from './saved.svelte.js';
import { shellState } from './shell.svelte.js';
import { updaterState } from './updater.svelte.js';

const PINNED_KEY = 'urd-drafts-pinned';
const PILL_KEY = 'urd-drafts-pill';
const LATER_KEY = 'urd-drafts-later';
const NAME_KEY = 'urd-browser-name';
const AUTO_KEY = 'urd-drafts-autosave';
const PLACE_KEY = 'urd-drafts-place';
/** How often autosave saves. */
const AUTO_EVERY = 5 * 60_000;
/** The longest name a browser goes by, as the drafts function keeps it. */
const NAME_MAX = 40;

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function keep(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* the storage is full: the choice holds for this session */ }
}

function readLater() {
  try {
    const list = JSON.parse(read(LATER_KEY) ?? '[]');
    return Array.isArray(list) ? list.filter((name) => typeof name === 'string') : [];
  } catch {
    return [];
  }
}

/** Where the window stood this session: the place it was dragged to and the tab's box it opened from, each kept only where its numbers are numbers. */
function readPlace() {
  const box = (value, keys) => (value && keys.every((k) => Number.isFinite(value[k])) ? value : null);
  try {
    const kept = JSON.parse(sessionStorage.getItem(PLACE_KEY) ?? 'null');
    return { place: box(kept?.place, ['left', 'top']), anchor: box(kept?.anchor, ['left', 'top', 'right', 'bottom']) };
  } catch {
    return { place: null, anchor: null };
  }
}

function keepPlace() {
  try {
    sessionStorage.setItem(PLACE_KEY, JSON.stringify({ place, anchor }));
  } catch { /* no session storage: the place holds until the reload */ }
}

const keptPlace = readPlace();
let pinned = $state(read(PINNED_KEY) === '1');
let pill = $state(read(PILL_KEY) === '1');
/** A pinned window stands open from the load, unless it was folded to its pill. */
let open = $state(read(PINNED_KEY) === '1' && read(PILL_KEY) !== '1');
let tab = $state('browser');
/** Where the window was dragged to; null places it by its tab. */
let place = $state(keptPlace.place);
/** The tab's box the window opened from, and whether it stands beside it (a rail's icon, a sidebar's word, a menu's row) or under it (a tab). */
let anchor = $state.raw(keptPlace.anchor);
let later = $state.raw(readLater());
let browserName = $state((read(NAME_KEY) ?? '').slice(0, NAME_MAX));
let autoSave = $state(read(AUTO_KEY) === '1');
/** When the Saved tab began to be shown, so leaving it after a second or more marks what it showed as no longer new. */
let savedShownAt = 0;
/** Opened by a mouse resting on the tab, and not yet kept by a press, the pin or the focus; with what the mouse stands on now. */
let byRest = false;
const hover = { tab: false, window: false };
let restTimer = 0;
/** Counts the openings by a press or a key, after which the window takes the focus (DraftsWindow); a rest leaves the focus where it is. */
let focusAsked = $state(0);
let placeTimer = 0;

/** The counts the tab, the window's tabs and the pill show. */
const waiting = $derived(savedState.saveCount);
const savedCount = $derived(savedState.savedList.length);
const fresh = $derived(savedState.savedFresh);

/** What the Saved tab showed is no longer new once it has stood a second or more. */
function leaveSaved() {
  if (savedShownAt && Date.now() - savedShownAt >= 1000) savedState.markSavedNoticed();
  savedShownAt = 0;
}

function showTab(next) {
  if (tab === 'saved' && next !== 'saved') leaveSaved();
  tab = next;
  if (next === 'saved') {
    savedShownAt = Date.now();
    void savedState.loadSavedPictures();
  }
  if (next === 'live' && updaterState.historyList === null) void updaterState.loadHistory();
}

/** The pill goes once the window is in use: opened by a press, or kept by a press in it. */
function unfold() {
  if (!pill) return;
  pill = false;
  keep(PILL_KEY, null);
}

/**
 * Opens the window at a tab (by default the one with something new, lib/saved-model.js firstTab), under or beside the tab it was opened from.
 * Opened by a press or a key, the window takes the focus and its pill goes; opened by a rest (`rest`), it leaves both, and the menu the tab stood in.
 * @param {{tab?: 'browser'|'saved'|'live', from?: Element|null, beside?: boolean, rest?: boolean}} [opts]
 */
function openDrafts({ tab: at, from = null, beside = false, rest = false } = {}) {
  if (from) {
    const box = from.getBoundingClientRect();
    anchor = { left: box.left, top: box.top, right: box.right, bottom: box.bottom, beside };
    keepPlace();
  }
  byRest = rest;
  hover.window = false;
  if (!rest) {
    unfold();
    shellState.toolMenu = null;
    focusAsked += 1;
  }
  open = true;
  showTab(at ?? firstTab({ fresh, waiting, saved: savedCount }));
}

/** Closes the window; the focus, where it was in the window, goes back to the Drafts tab. */
function closeDrafts() {
  clearTimeout(restTimer);
  byRest = false;
  hover.tab = false;
  hover.window = false;
  if (!open) return;
  if (tab === 'saved') leaveSaved();
  if (typeof document !== 'undefined' && document.activeElement?.closest?.('.drafts-window')) document.querySelector('[data-drafts-tab]')?.focus({ preventScroll: true });
  open = false;
}

/** A press on the Drafts tab: opens the window from where it was pressed, keeps one a rest opened, or closes it; a press while it stands folded opens it. */
function toggleDrafts(from = null, beside = false) {
  clearTimeout(restTimer);
  if (open && byRest) {
    keepDrafts();
    focusAsked += 1;
  } else if (open) closeDrafts();
  else openDrafts({ from, beside });
}

/** The mouse on the tab (`on` true) or off it, a mouse's pointer alone: a rest opens the window, and leaving the tab and the window closes one the rest opened. */
function restOnTab(on, event, from = null, beside = false) {
  if (event.pointerType !== 'mouse') return;
  hover.tab = on;
  clearTimeout(restTimer);
  if (on && !open) restTimer = setTimeout(() => openDrafts({ from, beside, rest: true }), 180);
  else if (!on) leaveSoon();
}

/** The mouse on the window or off it. */
function restOnWindow(on, event) {
  if (event.pointerType !== 'mouse') return;
  hover.window = on;
  clearTimeout(restTimer);
  if (!on) leaveSoon();
}

/** A moment after the mouse has left the tab and the window, a window the rest opened closes, unless the focus has gone into it or it was pinned since. */
function leaveSoon() {
  if (!open || !byRest) return;
  restTimer = setTimeout(() => {
    if (!byRest || pinned || hover.tab || hover.window || document.activeElement?.closest?.('.drafts-window')) return;
    closeDrafts();
  }, 280);
}

/** A press in the window keeps it, as a press on its tab does, and its pill goes. */
function keepDrafts() {
  byRest = false;
  unfold();
}

function setPinned(value) {
  pinned = value;
  keep(PINNED_KEY, value ? '1' : null);
}

/** «Fold to a pill»: the window goes, and the pill stands in the canvas's corner until it is pressed. */
function foldToPill() {
  closeDrafts();
  pill = true;
  keep(PILL_KEY, '1');
}

/** A drag's places; the last is kept for the session once the drag has rested a moment. */
function moveDrafts(next) {
  place = next;
  clearTimeout(placeTimer);
  placeTimer = setTimeout(keepPlace, 200);
}

/** «Move back to the drafts tab»: the dragged place let go, the window standing by its tab again, measured anew where the tab is in sight. */
function resetPlace() {
  place = null;
  const tabEl = document.querySelector('[data-drafts-tab]');
  if (tabEl) {
    const box = tabEl.getBoundingClientRect();
    anchor = { left: box.left, top: box.top, right: box.right, bottom: box.bottom, beside: tabEl.hasAttribute('data-beside') };
  }
  keepPlace();
}

/** A part's tick: unticked, it is kept for later and left out of a save. */
function toggleLater(name) {
  later = later.includes(name) ? later.filter((n) => n !== name) : [...later, name];
  keep(LATER_KEY, later.length ? JSON.stringify(later) : null);
}

/** After a publish of every draft, or Discard drafts: nothing is kept for later any more, so a part edited again stands ticked. */
function clearLater() {
  later = [];
  keep(LATER_KEY, null);
}

/** After a publish of the ticked parts: only the parts still waiting stay kept for later, so a part that went with another stands ticked when it is edited again. */
function keepLaterOf(names) {
  later = later.filter((n) => names.includes(n));
  keep(LATER_KEY, later.length ? JSON.stringify(later) : null);
}

/** Every part ticked, or every part kept for later where all are ticked. */
function tickAll(names) {
  const all = names.every((n) => !later.includes(n));
  later = all ? [...new Set([...later, ...names])] : later.filter((n) => !names.includes(n));
  keep(LATER_KEY, later.length ? JSON.stringify(later) : null);
}

function setBrowserName(value) {
  browserName = String(value ?? '').trim().slice(0, NAME_MAX);
  keep(NAME_KEY, browserName || null);
}

function setAutoSave(value) {
  autoSave = value;
  keep(AUTO_KEY, value ? '1' : null);
}

/** The ticked parts that stand in this browser alone. */
const ticked = $derived(tickedNames(savedState.savedRows, later));

/** «Save ticked…» with its note: the ticked parts, the owner asked first where one was saved elsewhere since. */
function saveTicked(note = '') {
  return savedState.saveDrafts({ names: ticked, note, device: browserName });
}

/**
 * Ctrl+S: the ticked parts saved without a window or a question; one saved elsewhere since stays for the owner in Drafts, and the status line says why nothing was saved: a part saved elsewhere since, every part kept for later, or nothing standing here alone.
 */
function saveKey() {
  if (savedState.savedAvailable === false) {
    shellState.setStatus(ta('tip.save.unavailable'), 'info');
    return;
  }
  if (savedState.savedAvailable === null || savedState.savedBusy) return;
  const names = tickedNames(savedState.savedRows, later, { quiet: true });
  if (!names.length) {
    const show = { label: ta('saved.show'), run: () => openDrafts({ tab: 'browser' }) };
    if (ticked.length) shellState.setStatus(ta('drafts.keyHeld'), 'info', show);
    else if (waiting) shellState.setStatus(ta('drafts.keyLater'), 'info', show);
    else shellState.setStatus(ta('tip.save.nothing'), 'info');
    return;
  }
  void savedState.saveDrafts({ names, device: browserName, quiet: true });
}

/** Autosave: every five minutes while it is on, the ticked parts that stand here alone, quietly. */
function autoTick() {
  if (!autoSave || savedState.savedAvailable !== true || savedState.savedBusy) return;
  const names = tickedNames(savedState.savedRows, later, { quiet: true });
  if (names.length) void savedState.saveDrafts({ names, device: browserName, quiet: true, auto: true });
}

export function effects() {
  $effect(() => {
    if (!autoSave) return;
    const timer = setInterval(autoTick, AUTO_EVERY);
    return () => clearInterval(timer);
  });
}

export const draftsState = {
  get draftsOpen() { return open; },
  get draftsPinned() { return pinned; },
  get draftsPill() { return pill; },
  get draftsTab() { return tab; },
  get draftsPlace() { return place; },
  get draftsAnchor() { return anchor; },
  get draftsLater() { return later; },
  /** Counts the openings after which the window takes the focus. */
  get draftsFocusAsked() { return focusAsked; },
  get draftsTicked() { return ticked; },
  get browserName() { return browserName; },
  get autoSave() { return autoSave; },
  /** The counts: what stands in this browser alone, what is saved, and how much of that is new here. */
  get draftsWaiting() { return waiting; },
  get draftsSaved() { return savedCount; },
  get draftsFresh() { return fresh; },
  openDrafts,
  closeDrafts,
  toggleDrafts,
  restOnDraftsTab: restOnTab,
  restOnDraftsWindow: restOnWindow,
  keepDrafts,
  showDraftsTab: showTab,
  setDraftsPinned: setPinned,
  foldDraftsToPill: foldToPill,
  moveDrafts,
  resetDraftsPlace: resetPlace,
  toggleLater,
  tickAll,
  clearLater,
  keepLaterOf,
  setBrowserName,
  setAutoSave,
  saveTicked,
  saveKey,
  effects,
};
