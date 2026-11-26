/**
 * The element menu's Pinned rows: a block type's default settings at the top of its menu, with the owner's pins and removals kept per type in the browser.
 */

/** The browser key the choices are kept under: one object, block type to its choice. */
export const QUICK_KEY = 'urd-quick-row';

/** The settings every block type starts with in its row, in order: its own first, then the shared ones. */
const SHARED = ['fit', 'phone'];
const OWN = {
  calendar: ['design', 'limit'],
  text: ['align', 'textBox'],
  button: ['goesTo', 'design'],
  image: ['imgFit', 'radius'],
  video: ['videoSource'],
  icon: ['iconSize', 'iconColor'],
  shape: ['shapeColor', 'thickness'],
  gallery: ['design', 'columns'],
  ribbon: ['ribbonMotion'],
  table: ['tableLines'],
  quote: ['design'],
  stats: ['design'],
  faq: ['design'],
  timeline: ['design'],
  form: ['sendMode'],
  collection: ['design', 'limit'],
  product: ['columns'],
  cart: ['design'],
  checkout: ['vippsButton'],
  share: ['design'],
  countdown: ['seconds'],
  audio: ['loop'],
  map: ['zoom'],
  privacy: ['design'],
  terms: ['design'],
};

/**
 * A block type's default rows in Pinned, in order.
 * @param {string} type
 * @returns {string[]}
 */
export function quickDefaults(type) {
  return [...(OWN[type] ?? []), ...SHARED];
}

/** The older ids of a block's design, which a stored choice reads as `design`. */
const DESIGN_IDS = new Set(['btnStyle', 'galleryView', 'variant', 'collectionView', 'cartView', 'privacyDesign', 'textDesign']);

/** An empty choice: the defaults alone. */
export const NO_CHOICE = Object.freeze({ pinned: [], removed: [] });

/**
 * A stored choice made safe: two lists of distinct ids, a design's older id read as `design`.
 * @param {unknown} value
 * @returns {{pinned: string[], removed: string[]}}
 */
export function cleanChoice(value) {
  const ids = (list) => (Array.isArray(list)
    ? [...new Set(list.filter((id) => typeof id === 'string' && id).map((id) => (DESIGN_IDS.has(id) ? 'design' : id)))]
    : []);
  return { pinned: ids(value?.pinned), removed: ids(value?.removed) };
}

/**
 * The rows a block shows in Pinned, in order: its defaults not taken out, then the settings pinned, in pin order.
 * Only settings the block has right now are shown.
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
 * The choice after a setting's pin is pressed: a setting in the row leaves it, one out of it joins at the end, and a default pinned again returns to its place.
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
 * Keeps every block type's choice in the browser; a type back at its defaults is left out.
 * A full or blocked store keeps the choice for the session.
 * @param {{setItem(key: string, value: string): void}} storage
 * @param {Record<string, {pinned: string[], removed: string[]}>} choices
 */
export function writeChoices(storage, choices) {
  const kept = Object.fromEntries(Object.entries(choices).filter(([, choice]) => choiceChanged(choice)));
  try {
    storage.setItem(QUICK_KEY, JSON.stringify(kept));
  } catch { /* the choice lasts the session */ }
}
