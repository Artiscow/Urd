/**
 * Reordering a flat list by dragging a row (lib/rows/row-drag.svelte.js): where the dragged row lands, and the list in its new order.
 */

/**
 * Where a dragged row lands, from its box at the pointer: beside the first row it touches, before it moving up, after it moving down.
 * No change gives null.
 * @param {Array<{ id: string, top: number, bottom: number }>} rows The rows' ids and their boxes on the screen, in list order, the dragged row among them
 * @param {string} dragId The dragged row
 * @param {number} y The pointer's height on the screen
 * @returns {{ id: string, pos: 'before'|'after' }|null}
 */
export function rowDropAt(rows, dragId, y) {
  const self = rows.find((r) => r.id === dragId);
  if (!self) return null;
  // The dragged box follows the pointer with the grip the pointer took it by: its own height, centred on the pointer.
  const half = (self.bottom - self.top) / 2;
  const boxTop = y - half;
  const boxBottom = y + half;
  const others = rows.filter((r) => r.id !== dragId);
  if (!others.length) return null;
  const from = rows.indexOf(self);
  const touching = others.filter((r) => boxBottom >= r.top && boxTop <= r.bottom);
  let drop;
  if (touching.length) {
    // Moving up, the row the box reaches first is its topmost; moving down, its lowest.
    const up = rows.indexOf(touching[0]) < from;
    const hit = up ? touching[0] : touching[touching.length - 1];
    drop = { id: hit.id, pos: up ? 'before' : 'after' };
  } else {
    const next = others.find((r) => r.top > boxBottom);
    drop = next ? { id: next.id, pos: 'before' } : { id: others[others.length - 1].id, pos: 'after' };
  }
  const rest = others.map((r) => r.id);
  const to = rest.indexOf(drop.id) + (drop.pos === 'after' ? 1 : 0);
  return to === from ? null : drop;
}

/**
 * Where a row lands in a flat list, with one name for each place: after a row is before the row under it.
 * Only after the last row is a place «after».
 * @param {Array<{ id: string, top: number, bottom: number }>} rows As rowDropAt takes them
 * @param {string} dragId
 * @param {number} y
 * @returns {{ id: string, pos: 'before'|'after' }|null}
 */
export function flatDropAt(rows, dragId, y) {
  const at = rowDropAt(rows, dragId, y);
  if (at?.pos !== 'after') return at;
  const next = rows[rows.findIndex((r) => r.id === at.id) + 1];
  return next && next.id !== dragId ? { id: next.id, pos: 'before' } : at;
}

/**
 * The list with the dragged row moved to the drop: before or after the target, by the rows' ids.
 * @template T
 * @param {T[]} list
 * @param {(row: T) => string} idOf
 * @param {string} dragId
 * @param {{ id: string, pos: 'before'|'after' }} drop
 * @returns {T[]} A new list; the same rows when the drop names a row the list does not hold
 */
export function reorderRows(list, idOf, dragId, drop) {
  const moving = list.find((row) => idOf(row) === dragId);
  if (!moving) return list;
  const rest = list.filter((row) => row !== moving);
  const at = rest.findIndex((row) => idOf(row) === drop.id);
  if (at < 0) return list;
  const to = at + (drop.pos === 'after' ? 1 : 0);
  return [...rest.slice(0, to), moving, ...rest.slice(to)];
}

/**
 * The list with a row moved one step up or down among the rows that can move, as the arrows on a row move it; the rows that cannot move keep their places.
 * @template T
 * @param {T[]} list
 * @param {(row: T) => boolean} canMove
 * @param {(row: T) => string} idOf
 * @param {string} id The row to move
 * @param {-1|1} dir Up or down
 * @returns {T[]} A new list; the same list when the row cannot move that way
 */
export function stepAmong(list, canMove, idOf, id, dir) {
  const at = list.map((row, i) => (canMove(row) ? i : -1)).filter((i) => i >= 0);
  const k = at.findIndex((i) => idOf(list[i]) === id);
  const j = at[k + dir];
  if (k < 0 || j === undefined) return list;
  const next = [...list];
  [next[at[k]], next[j]] = [next[j], next[at[k]]];
  return next;
}
