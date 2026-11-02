/**
 * The command palette's list (comparison/ELEMENTS.md E1): the commands in their groups, the ones run last first, and a typed query narrowing them to the matches in the rank palette-search.js gives.
 * A command is `{ id, group, label, hint?, run }`; the groups stand in GROUP_ORDER, with the site's shared shortcuts (`site.shortcuts`, pinned for everyone who edits the site) and the recent ones as groups of their own at the top while nothing is typed.
 * Pure, so it is node-tested (tests/command-palette.test.mjs); the dialog (lib/CommandPalette.svelte) draws what this returns, handing in the engine's searchItems (palette-search.js).
 */

/** The groups in the order the palette lists them. */
export const GROUP_ORDER = ['pinned', 'recent', 'actions', 'pages', 'panels', 'blocks', 'sections', 'plugins'];

/** How many shared shortcuts a site holds at most (the schema's maxItems). */
export const PINNED_MAX = 40;

/** The form a pinned id must have (the schema's pattern for `site.shortcuts`). */
export const PINNED_ID = /^[a-z][a-z0-9-]*(:[A-Za-z0-9_.:-]+)?$/;

/**
 * Whether a command can be pinned as a shared shortcut: its id fits the stored form, and it is not bound to the moment: a section of the open page, a device that is not the current one, and Publish stand only while they apply, so a pin on them would come and go.
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
 * The commands grouped for the list. With nothing typed: the shared shortcuts first (in their stored order, those still offered), the recent ones next (in the order they were run, those still offered and not pinned), then every group in GROUP_ORDER. With a query: one group of the matches, ranked by how well the label matches (searchItems).
 * A command whose group is unknown stands with the plugins'.
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
