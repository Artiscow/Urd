/**
 * The command palette's list: the commands in their groups, or the ranked matches of a typed query.
 * A command is `{ id, group, label, hint?, run }`.
 */

/** The groups in the order the palette lists them. */
export const GROUP_ORDER = ['pinned', 'recent', 'actions', 'pages', 'panels', 'blocks', 'sections', 'plugins'];

/** How many shared shortcuts a site holds at most (the schema's maxItems). */
export const PINNED_MAX = 40;

/** The form a pinned id must have (the schema's pattern for `site.shortcuts`). */
export const PINNED_ID = /^[a-z][a-z0-9-]*(:[A-Za-z0-9_.:-]+)?$/;

/**
 * Whether a command can be pinned: its id fits the stored form, and it is not one that stands only while it applies (a section, a device, Publish).
 * @param {string} id
 * @returns {boolean}
 */
export function canPin(id) {
  if (typeof id !== 'string' || id.length > 120 || !PINNED_ID.test(id)) return false;
  return !/^(section-go|device):/.test(id) && id !== 'publish';
}

/**
 * The shared shortcuts with a command pinned or unpinned: a pin past the cap, or of an id that cannot be pinned, changes nothing.
 * @param {string[]} list
 * @param {string} id
 * @returns {string[]}
 */
export function togglePinned(list, id) {
  if (list.includes(id)) return list.filter((x) => x !== id);
  if (!canPin(id) || list.length >= PINNED_MAX) return list;
  return [...list, id];
}

/** The key the commands run last are kept under in the browser. */
export const RECENT_KEY = 'urd-palette-recent';

/** How many recent commands the palette shows. */
export const RECENT_MAX = 6;

/**
 * The ids of the commands run last, newest first, from the browser's store.
 * @param {{getItem: (key: string) => string|null}} storage
 * @returns {string[]}
 */
export function readRecent(storage) {
  try {
    const list = JSON.parse(storage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(list) ? list.filter((id) => typeof id === 'string').slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

/**
 * The recent list with a command put first, once, and the oldest dropped past the limit.
 * @param {string[]} list
 * @param {string} id
 * @param {number} [max]
 * @returns {string[]}
 */
export function rememberCommand(list, id, max = RECENT_MAX) {
  return [id, ...list.filter((x) => x !== id)].slice(0, max);
}

/**
 * The commands grouped: with nothing typed, the shared shortcuts, the recent ones, then each group in GROUP_ORDER; with a query, the ranked matches.
 * @template {{ id: string, group: string, label: string }} T
 * @param {T[]} commands
 * @param {string} query
 * @param {string[]} recent The ids run last, newest first
 * @param {(items: T[], query: string, getLabel: (item: T) => string) => T[]} search The engine's searchItems
 * @param {string[]} [pinned] The site's shared shortcuts, command ids in order
 * @returns {Array<{ group: string, items: T[] }>}
 */
export function arrangeCommands(commands, query, recent, search, pinned = []) {
  const q = (query ?? '').trim();
  if (q) {
    const items = search(commands, q, (c) => c.label);
    return items.length ? [{ group: 'results', items }] : [];
  }
  const byId = new Map(commands.map((c) => [c.id, c]));
  const pinnedItems = pinned.map((id) => byId.get(id)).filter(Boolean);
  const recentItems = recent.filter((id) => !pinned.includes(id)).map((id) => byId.get(id)).filter(Boolean);
  const groups = [];
  if (pinnedItems.length) groups.push({ group: 'pinned', items: pinnedItems });
  if (recentItems.length) groups.push({ group: 'recent', items: recentItems });
  for (const group of GROUP_ORDER.slice(2)) {
    const items = commands.filter((c) => (GROUP_ORDER.includes(c.group) ? c.group : 'plugins') === group);
    if (items.length) groups.push({ group, items });
  }
  return groups;
}

/**
 * The flat list of the items a grouping shows, for the keyboard's walk.
 * @template T
 * @param {Array<{ items: T[] }>} groups
 * @returns {T[]}
 */
export function flatItems(groups) {
  return groups.flatMap((g) => g.items);
}
