/**
 * Where a dragged menu row lands in the Nav panel's tree, reckoned on the menu's items alone.
 * A row's key is its path in the menu, 'i', 'i.j', 'i.j.k' or 'i.j.k.l'; its level is the number of steps under the bar, and the menu is `depth` submenu levels deep (NAV_DEPTH in the engine's nav-model.js).
 * Pure, so it is node-tested (tests/nav-drop.test.mjs); the panel draws the clone where these say and moves the row on the drop.
 */

/** The level of a row under the bar. */
export const navLevel = (key) => key.split('.').length - 1;

/** The key of a row's parent, or null at the top level. */
export const parentKey = (key) => (key.includes('.') ? key.slice(0, key.lastIndexOf('.')) : null);

/**
 * The row at a key: its item, the list it stands in, its index there and its parent (null at the top level).
 * @param {Array<object>} items The menu's top-level items
 * @param {string} key
 */
export function navRowAt(items, key) {
  const path = key.split('.').map(Number);
  let list = items;
  let parent = null;
  for (let d = 0; d < path.length - 1; d += 1) { parent = list[path[d]]; list = parent.children; }
  const index = path[path.length - 1];
  return { list, index, parent, node: list[index] };
}

/** How many levels stand under a row: none for a plain item. */
export const navDepthOf = (node) => (node.children?.length ? 1 + Math.max(...node.children.map(navDepthOf)) : 0);

/** The key of an item wherever it stands in the menu, or null. */
export function navKeyOf(items, item, prefix = '') {
  for (let i = 0; i < items.length; i += 1) {
    const key = `${prefix}${i}`;
    if (items[i] === item) return key;
    const deeper = items[i].children?.length ? navKeyOf(items[i].children, item, `${key}.`) : null;
    if (deeper) return deeper;
  }
  return null;
}

/** The level the dragged row would stand at after a drop. */
export const landLevel = (drop) => (drop.pos === 'into' ? navLevel(drop.key) + 1 : navLevel(drop.key));

/**
 * The drop position over a row from the pointer's place in it.
 * The top third puts the dragged row before the row and the bottom third after it, across the whole row, so the first place in the menu is as easy to reach as any other.
 * The middle third takes it in as the row's last child, where the menu's depth still holds the dragged row with its own submenu; over a row it cannot go under, the midline alone decides.
 * On a row under the bar the strip left of `out` is the way out: there the drop lands one level up, after the row's parent and its whole submenu. The Nav panel's menu takes its rows' grip column (28 px); a list whose rows' grips stand where a drag usually starts takes 0, the room the row is set in by.
 * A position that would change nothing gives null.
 * @param {Array<object>} items
 * @param {string} dragKey The dragged row
 * @param {string} key The row under the pointer
 * @param {number} x The pointer's distance from the row's left edge, below 0 in the room the row is set in by
 * @param {number} y The pointer's height in the row, 0 at its top and 1 at its bottom
 * @param {number} depth How many submenu levels the menu holds
 * @param {number} [out] Left of this, over a row under the bar, the drop leads one level out
 * @returns {{ key: string, pos: 'before'|'after'|'into' }|null}
 */
export function navDropAt(items, dragKey, key, x, y, depth, out = 28) {
  if (!dragKey || dragKey === key) return null;
  const moving = navRowAt(items, dragKey).node;
  const nests = y >= 1 / 3 && y <= 2 / 3 && navLevel(key) + 1 + navDepthOf(moving) <= depth;
  let drop;
  if (navLevel(key) > 0 && x < out) drop = { key: parentKey(key), pos: 'after' };
  else if (nests) drop = { key, pos: 'into' };
  else drop = { key, pos: y < 0.5 ? 'before' : 'after' };
  return navDropOrNull(items, dragKey, drop, depth);
}

/**
 * The drop unless the row would land exactly where it is, or inside its own submenu.
 * A drop too deep for the row's own submenu is lifted, level by level, to the first place the menu's depth holds it; the top level always does.
 */
export function navDropOrNull(items, dragKey, drop, depth) {
  const moving = navRowAt(items, dragKey).node;
  for (let k = drop.key; k !== null; k = parentKey(k)) if (navRowAt(items, k).node === moving) return null;
  while (landLevel(drop) + navDepthOf(moving) > depth && (drop.pos === 'into' || parentKey(drop.key) !== null)) {
    drop = drop.pos === 'into' ? { key: drop.key, pos: 'after' } : { key: parentKey(drop.key), pos: 'after' };
  }
  const dest = navRowAt(items, drop.key);
  if (drop.pos === 'into') {
    const kids = dest.node.children ?? [];
    return kids.length && kids[kids.length - 1] === moving ? null : drop;
  }
  const after = dest.list.filter((it) => it !== moving);
  const idx = after.indexOf(dest.node) + (drop.pos === 'after' ? 1 : 0);
  const src = navRowAt(items, dragKey);
  return dest.list === src.list && idx === src.index ? null : drop;
}

/**
 * One name for one place, so the clone is never torn down and regrown where it already stands: before a row with a row above it is after that row, and after a row's last child is into the row.
 */
export function canonicalDrop(items, drop) {
  if (!drop) return null;
  const dest = navRowAt(items, drop.key);
  const up = parentKey(drop.key);
  if (drop.pos === 'before' && dest.index > 0) return { key: `${up === null ? '' : `${up}.`}${dest.index - 1}`, pos: 'after' };
  if (drop.pos === 'after' && up !== null && dest.index === dest.list.length - 1) return { key: up, pos: 'into' };
  return drop;
}
