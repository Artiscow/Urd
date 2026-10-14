/**
 * The element menu's quick row (0.7.20.3): the settings a block type shows at
 * the top of its menu. Each type has default tiles; the owner pins more with
 * the pin beside a setting and takes any tile out, a default too, with the
 * pin on the tile. The choice is kept per block type in the browser, as a
 * working preference rather than site data. Pure functions, node-tested.
 */

/** The browser key the choices are kept under: one object, block type to its choice. */
export const QUICK_KEY = 'urd-quick-row';

/** The settings every block type starts with in its row, in order: its own first, then the shared ones. */
const SHARED = ['fit', 'phone'];
const OWN = {
  calendar: ['design', 'limit', 'subscribe'],
};

/**
 * A block type's default tiles, in order.
 * @param {string} type
 * @returns {string[]}
 */
export function quickDefaults(type) {
  return [...(OWN[type] ?? []), ...SHARED];
}

/** An empty choice: the defaults alone. */
export const NO_CHOICE = Object.freeze({ pinned: [], removed: [] });

/**
 * A stored choice made safe: two lists of distinct ids.
 * @param {unknown} value
 * @returns {{pinned: string[], removed: string[]}}
 */
export function cleanChoice(value) {
  const ids = (list) => (Array.isArray(list) ? [...new Set(list.filter((id) => typeof id === 'string' && id))] : []);
  return { pinned: ids(value?.pinned), removed: ids(value?.removed) };
}

/**
 * The tiles a block shows, in order: its defaults that are not taken out,
 * then the settings pinned, in the order they were pinned. Only settings the
 * block has right now are shown (a calendar's count, for one, only on the
 * views that have it).
 * @param {string} type
 * @param {{pinned: string[], removed: string[]}} choice
 * @param {Set<string>} available The settings the block can show in the row now
 * @returns {string[]}
 */
export function quickIds(type, choice, available) {
  const defaults = quickDefaults(type);
  const shown = defaults.filter((id) => !choice.removed.includes(id));
  for (const id of choice.pinned) if (!shown.includes(id)) shown.push(id);
  return shown.filter((id) => available.has(id));
}

/**
 * Whether a setting stands in the block type's row (shown or not right now).
 * @param {string} type
 * @param {{pinned: string[], removed: string[]}} choice
 * @param {string} id
 * @returns {boolean}
 */
export function isInRow(type, choice, id) {
  return quickDefaults(type).includes(id) ? !choice.removed.includes(id) : choice.pinned.includes(id);
}

/**
 * The choice after the pin beside a setting, or on its tile, is pressed: a
 * setting in the row leaves it, one out of it joins it at the end. A
 * default taken out and pinned again returns to its own place.
 * @param {string} type
 * @param {{pinned: string[], removed: string[]}} choice
 * @param {string} id
 * @returns {{pinned: string[], removed: string[]}}
 */
export function togglePin(type, choice, id) {
  const isDefault = quickDefaults(type).includes(id);
  if (isInRow(type, choice, id)) {
    return isDefault
      ? { pinned: choice.pinned, removed: [...choice.removed, id] }
      : { pinned: choice.pinned.filter((p) => p !== id), removed: choice.removed };
  }
  return isDefault
    ? { pinned: choice.pinned, removed: choice.removed.filter((r) => r !== id) }
    : { pinned: [...choice.pinned, id], removed: choice.removed };
}

/**
 * Whether a choice differs from the defaults, so a reset has something to do.
 * @param {{pinned: string[], removed: string[]}} choice
 * @returns {boolean}
 */
export function choiceChanged(choice) {
  return choice.pinned.length > 0 || choice.removed.length > 0;
}

/**
 * Every block type's choice from the browser; an unreadable or blocked store gives none.
 * @param {{getItem(key: string): string|null}} storage
 * @returns {Record<string, {pinned: string[], removed: string[]}>}
 */
export function readChoices(storage) {
  try {
    const raw = JSON.parse(storage.getItem(QUICK_KEY) ?? '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return Object.fromEntries(Object.entries(raw).map(([type, choice]) => [type, cleanChoice(choice)]));
  } catch {
    return {};
  }
}

/**
 * Keeps every block type's choice in the browser; a type back at its
 * defaults is left out. A full or blocked store keeps the choice for the session.
 * @param {{setItem(key: string, value: string): void}} storage
 * @param {Record<string, {pinned: string[], removed: string[]}>} choices
 */
export function writeChoices(storage, choices) {
  const kept = Object.fromEntries(Object.entries(choices).filter(([, choice]) => choiceChanged(choice)));
  try {
    storage.setItem(QUICK_KEY, JSON.stringify(kept));
  } catch { /* the choice lasts the session */ }
}
