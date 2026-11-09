/**
 * The admin designs at work (ADR-0030, lib/admin-designs.js): the parts' values as stored, the design that stands and the parts that differ from it, and the writes that choose a design, take a part back to it, and undo a design as one step.
 * A part with a row in the Urd settings is written through that row's setter, so the admin follows at once, and then stored as the design has it.
 * The undo lives here with the settings window that offers the designs, not in the site's undo history; it is offered while the parts stand as the design left them.
 */
import { ta } from '$engine/i18n.js';
import { matchAny } from '$engine/search-langs.js';
import { PARTS, ADMIN_DESIGNS, partDefault, readParts, designState, designWrites, restoreWrites } from '../lib/admin-designs.js';
import { SETTINGS_GROUPS } from '../lib/settings-model.js';
import { searchLangs } from '../lib/search-langs.svelte.js';
import { menu, setMenuFormPref, setFoldsPref, setExtraPref, setShortcutsPref, setDesignsPref, setCapListPref } from '../menu/state.svelte.js';

const ROWS = Object.fromEntries(SETTINGS_GROUPS.flatMap((g) => g.settings).map((s) => [s.id, s]));

const stored = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/** Counts the writes made here, so the values are read again after a write no row's state shows. */
let written = $state(0);

/** The values before the last design and after it, while that design can be undone. */
let undoStep = $state(null);

/**
 * Every part's value as stored.
 * Reading each row's value ties the result to the row's state, so a part changed through its row, here or anywhere in the admin, is read again.
 * @param {object} c The settings' context (lib/settings-model.js)
 */
export function partValues(c) {
  void written;
  for (const part of PARTS) if (part.setting) ROWS[part.setting].get(c);
  return readParts(stored);
}

/** The writes, each through its row's setter where it has one and then as stored. */
function write(writes, c) {
  for (const { key, value } of writes) {
    const part = PARTS.find((p) => p.key === key);
    if (part?.setting) ROWS[part.setting].set(c, value ?? partDefault(part));
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {
      // Storage refused: the rows' state holds the choice for this visit.
    }
  }
  written += 1;
}

/** Chooses a design: every part written at once, the values before it kept for the undo where the design changed any. */
export function applyDesign(id, c) {
  const before = readParts(stored);
  write(designWrites(id), c);
  const after = readParts(stored);
  undoStep = PARTS.some((p) => before[p.id] !== after[p.id]) ? { before, after } : null;
}

/** Whether the last design can be undone: the parts still stand as it left them. */
export function canUndo(values) {
  return !!undoStep && PARTS.every((p) => values[p.id] === undoStep.after[p.id]);
}

/** Takes the last design back, every part to its value before it. */
export function undoDesign(c) {
  if (!undoStep) return;
  const { before } = undoStep;
  undoStep = null;
  write(restoreWrites(before), c);
}

/** Takes one part back to the value the standing design gives it. */
export function partBack(partId, designId, c) {
  const part = PARTS.find((p) => p.id === partId);
  const value = ADMIN_DESIGNS.find((d) => d.id === designId)?.parts[partId];
  if (!part || value == null) return;
  write([{ key: part.key, value: value === partDefault(part) ? null : value }], c);
}

/**
 * The designs as the settings' context hands them to the design row (lib/settings-model.js `designs`): the options by name with each design's one line as its tooltip, the values, the design that stands with the parts that differ, and the way to apply one.
 * @param {object} c The settings' context
 */
function designsFor(c) {
  const values = partValues(c);
  return {
    options: ADMIN_DESIGNS.map((d) => [d.id, ta(d.labelKey), ta(`adminDesign.about.${d.id}`)]),
    values,
    state: designState(values),
    apply: (id) => applyDesign(id, c),
  };
}

/**
 * The context the Urd settings' rows read and write through (lib/settings-model.js): the editor, the words, the element menu's form and its three choices, the search in every language once the other languages are in (search-langs.js), and the admin designs, derived once for every change of a part.
 * @param {object} ed The editor's state (the `urd-editor` context)
 */
export function settingsContext(ed) {
  const c = {
    ed,
    ta,
    menu,
    setMenuFormPref,
    setFoldsPref,
    setExtraPref,
    setCapListPref,
    setShortcutsPref,
    setDesignsPref,
    get match() {
      return searchLangs.ready ? matchAny : null;
    },
    get designs() {
      return designs;
    },
  };
  // The designs are derived once for every change of a part, however many rows read them.
  const designs = $derived.by(() => designsFor(c));
  return c;
}

/** A part's name: its row's in the Urd settings, or its own while it has no row. */
export function partLabel(partId) {
  const part = PARTS.find((p) => p.id === partId);
  return part ? ta(part.setting ? ROWS[part.setting].labelKey : part.labelKey) : partId;
}

/**
 * The note on a part's row while its value differs from the design that stands: the design, its name and the value it gives the part, by the row's own word for it; null for a row that is no part, a part the design leaves without effect, or one that agrees.
 * @param {string} settingId The row (lib/settings-model.js)
 * @param {object} c The settings' context
 */
export function partNote(settingId, c) {
  const part = PARTS.find((p) => p.setting === settingId);
  if (!part) return null;
  const { values, state } = c.designs;
  const design = ADMIN_DESIGNS.find((d) => d.id === state.design);
  const value = design?.parts[part.id];
  if (value == null || values[part.id] === value) return null;
  const word = ROWS[settingId].options(c).find(([id]) => id === value)?.[1] ?? (part.optionKey ? ta(`${part.optionKey}.${value}`) : value);
  return { part: part.id, design: design.id, name: ta(design.labelKey), value: word };
}
