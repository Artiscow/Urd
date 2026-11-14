/**
 * The owner's moves in a section's phone order, in the editor only (the visitor reads the order in phone-order.js): pure, node-tested (tests/phone-order.test.mjs).
 * The order is shown as a tree of one level (phoneTree): a block alone, or a stack of blocks, the owner's own or a column the rule reads whole.
 * A move is a new order of that tree, settled into the section's data (settle): the stacks as they stand, and either the custom order as listed, or the exception that puts the moved block or stack there, the other blocks keeping their order.
 */
import { phoneParts } from './phone-order.js';
import { phoneCells, PHONE_COLUMNS } from './migrate.js';

/** Whether a block flows in the row grid, rather than standing on rows placed by hand. */
export const flowing = (block) => !Number.isFinite(block.frames?.mobile?.row);

/** The block a block's exception names, or null. */
const anchorOf = (block) => (typeof block.phonePlace?.before === 'string' ? block.phonePlace.before : typeof block.phonePlace?.after === 'string' ? block.phonePlace.after : null);

/** The setup from a rule alone or a whole setup (phoneSetupOf). */
const setupFrom = (setup) => (setup && typeof setup === 'object' ? { list: null, stacks: [], ...setup } : { rule: setup ?? 'top', list: null, stacks: [] });

/** Two lists of ids alike. */
const same = (a, b) => a.length === b.length && a.every((id, i) => id === b[i]);

/**
 * The flowing blocks in the phone's order as a tree of one level: each node a block alone (`{ id }`), or a stack of two or more (`{ id: 'stack:<first>', kind, children: [{ id }, ...] }`), `kind` 'stack' for the owner's own and 'column' for a column the rule reads whole.
 * @param {object[]} blocks The section's blocks
 * @param {string|object} setup The section's rule, or its setup (phoneSetupOf)
 * @returns {Array<{id: string, kind?: 'stack'|'column', children?: Array<{id: string}>}>}
 */
export function phoneTree(blocks, setup) {
  const parts = phoneParts(blocks, setup);
  const ids = parts.order.filter(flowing).map((b) => b.id);
  const stackOf = new Map();
  for (const stack of parts.stacks) for (const id of stack) stackOf.set(id, stack);
  const columnOf = new Map();
  parts.columns.forEach((column, k) => { for (const id of column) columnOf.set(id, k); });
  const nodes = [];
  for (let i = 0; i < ids.length;) {
    const stack = stackOf.get(ids[i]);
    const column = stack ? undefined : columnOf.get(ids[i]);
    const run = [];
    if (stack) while (i < ids.length && stackOf.get(ids[i]) === stack) run.push(ids[i++]);
    else if (column !== undefined) while (i < ids.length && !stackOf.has(ids[i]) && columnOf.get(ids[i]) === column) run.push(ids[i++]);
    else run.push(ids[i++]);
    nodes.push(run.length > 1 ? { id: `stack:${run[0]}`, kind: stack ? 'stack' : 'column', children: run.map((id) => ({ id })) } : { id: run[0] });
  }
  return nodes;
}

/** The tree's nodes as units of ids. */
const unitsOf = (tree) => tree.map((node) => (node.children ? node.children.map((c) => c.id) : [node.id]));

/**
 * The blocks whose exception leads to a unit, directly or through another such block: they move with it.
 * A stack's block other than its first has no exception that counts (phoneParts), so it leads nowhere.
 * @param {object[]} blocks
 * @param {string[]} unit
 * @param {string[][]} [stacks] The stacks as they hold
 * @returns {Set<string>}
 */
function followersOf(blocks, unit, stacks = []) {
  const inside = new Set(unit);
  const inert = new Set(stacks.flatMap((stack) => stack.slice(1)));
  const followers = new Set();
  let grew = true;
  while (grew) {
    grew = false;
    for (const block of blocks) {
      const of = anchorOf(block);
      if (!inert.has(block.id) && !inside.has(block.id) && !followers.has(block.id) && (inside.has(of) || followers.has(of))) {
        followers.add(block.id);
        grew = true;
      }
    }
  }
  return followers;
}

/** The blocks with each place in `places` set (a place of null taken away). */
function withPlaces(blocks, places) {
  return blocks.map((b) => {
    if (!(b.id in places)) return b;
    const next = { ...b };
    if (places[b.id]) next.phonePlace = places[b.id]; else delete next.phonePlace;
    return next;
  });
}

/** The flowing blocks' ids in the order a trial setup gives. */
const trialIds = (blocks, setup) => phoneParts(blocks, setup).order.filter(flowing).map((b) => b.id);

/**
 * A new order of the tree settled into the section's data: the stacks as they stand, and the custom order as listed, or the exceptions that bring the moved unit to its place.
 * A stack of two blocks or more is the owner's own, written as one, unless it is a column of the rule left as it stood; it keeps the blocks of it the phone does not show in the list (hidden on phones or placed by hand), and a stack the list shows none of stands as it was. A block taken into a stack leaves its exception, and a stack's first block carries the stack's.
 * Without a custom order the exception is sought among the other units, the nearest first: one that gives the order exactly, else one that keeps every other block's order with the moved unit among them where it was put, the blocks placed against it following it, and a block placed against it that the moved unit lands right beside, on the other side of the block it names, losing its exception. What is left of a stack the moved block left keeps its place, by an exception of its own where it needs one.
 * @param {object[]} blocks The section's blocks
 * @param {string|{rule: string, list: string[]|null, stacks: string[][]}} rawSetup The section's rule, or its setup (phoneSetupOf)
 * @param {Array<{id: string, kind?: string, children?: Array<{id: string}>}>} tree The order as it stands (phoneTree)
 * @param {string[][]} want The new order, as units of ids
 * @param {string[]} moved The ids the owner moved
 * @returns {{places: Record<string, object|null>, stacks?: string[][], list?: string[]}|null} The change, or null where no change gives that order, or the order would stay as it is
 */
export function settle(blocks, rawSetup, tree, want, moved) {
  const setup = setupFrom(rawSetup);
  const byId = new Map(blocks.map((b) => [b.id, b]));
  const now = unitsOf(tree).flat();
  const listed = new Set(now);
  const onPhone = new Set(phoneParts(blocks, setup).order.map((b) => b.id));
  const stored = (setup.stacks ?? []).map((stack) => stack.filter((id) => byId.has(id))).filter((stack) => stack.length > 1);
  const columns = new Set(tree.filter((n) => n.kind === 'column').map((n) => n.children.map((c) => c.id).join(' ')));
  /** The blocks of a stack the list does not show. */
  const unlisted = (stack) => stack.filter((id) => !listed.has(id));
  /** A unit with the unlisted blocks of the stacks it holds on to: those it keeps a block of that stayed, or all of whose listed blocks it took along; each where it stood in its stack. */
  const withUnlisted = (unit) => {
    const out = [...unit];
    for (const stack of stored) {
      const shown = stack.filter((id) => listed.has(id));
      const owns = unit.some((id) => stack.includes(id) && !moved.includes(id)) || (shown.length > 0 && shown.every((id) => unit.includes(id)));
      if (!owns) continue;
      for (const id of unlisted(stack)) {
        const before = stack.slice(0, stack.indexOf(id)).reverse().find((other) => out.includes(other));
        out.splice(before ? out.indexOf(before) + 1 : 0, 0, id);
      }
    }
    return out;
  };
  const stacks = [];
  for (const unit of want) {
    if (columns.has(unit.join(' ')) && !unit.some((id) => moved.includes(id))) continue;
    const full = withUnlisted(unit);
    if (full.length > 1) stacks.push(full);
  }
  for (const stack of stored) if (!stack.some((id) => listed.has(id))) stacks.push(stack);
  /** A stack's first block as the phone reads it: the first of it the phone shows. */
  const headOf = (stack) => stack.find((id) => onPhone.has(id)) ?? stack[0];
  /** The first blocks of the owner's stacks as they stood: each one's exception is its stack's. */
  const heads = new Set(tree.filter((n) => n.kind === 'stack').map((n) => n.children[0].id));
  const places = {};
  for (const stack of stacks) {
    const head = headOf(stack);
    const rest = stack.filter((id) => id !== head);
    const carried = rest.filter((id) => heads.has(id)).map((id) => byId.get(id)?.phonePlace).find(Boolean);
    for (const id of rest) if (byId.get(id)?.phonePlace) places[id] = null;
    if (!byId.get(head)?.phonePlace && carried) places[head] = carried;
  }
  const change = { places };
  if (!same(stacks.map((s) => s.join(' ')), stored.map((s) => s.join(' ')))) change.stacks = stacks;
  const flat = want.flat();
  /** The change, unless it leaves the order and the stacks as they are; a place taken from a block that has none is left out. */
  const done = (result, order) => {
    if (same(order, now) && !result.stacks) return null;
    for (const [id, place] of Object.entries(result.places)) if (place === null && !byId.get(id)?.phonePlace) delete result.places[id];
    return result;
  };
  if (setup.list) {
    change.list = flat;
    return done(change, flat);
  }
  const mover = want.find((unit) => unit.some((id) => moved.includes(id)));
  // A block placed against the moved unit, or against a block that follows it, lets go of it where the moved unit lands right beside it on the other side of the block it names: the move takes the unit past it.
  // The followers further off are left where they stood in the new order, and follow the unit.
  if (mover) {
    const pos = new Map(flat.map((id, i) => [id, i]));
    const current = new Map(withPlaces(blocks, places).map((b) => [b.id, b]));
    const followers = followersOf([...current.values()], mover, stacks);
    const at = want.indexOf(mover);
    const beside = [];
    for (let k = at - 1; k >= 0 && want[k].some((id) => followers.has(id)); k -= 1) beside.push(...want[k]);
    for (let k = at + 1; k < want.length && want[k].some((id) => followers.has(id)); k += 1) beside.push(...want[k]);
    for (const id of beside.filter((b) => followers.has(b))) {
      const place = current.get(id)?.phonePlace;
      const anchor = anchorOf(current.get(id));
      if (!pos.has(id) || !pos.has(anchor)) continue;
      if (typeof place.after === 'string' ? pos.get(id) < pos.get(anchor) : pos.get(id) > pos.get(anchor)) places[id] = null;
    }
  }
  const next = { ...setup, stacks };
  const placed = withPlaces(blocks, places);
  const first = trialIds(placed, next);
  if (same(first, flat)) return done(change, first);
  if (!mover) return null;
  const head = mover[0];
  const followers = followersOf(placed, mover, stacks);
  const outside = (ids) => ids.filter((id) => !mover.includes(id) && !followers.has(id));
  const rank = (ids) => outside(ids.slice(0, ids.indexOf(head))).length;
  // What is left of the stack the moved block came from keeps its place: as it stands, without an exception of its own, or after the unit before it or before the unit after it.
  const origin = unitsOf(tree).find((unit) => unit.includes(moved[0])) ?? [];
  const left = want.find((unit) => unit !== mover && !unit.some((id) => moved.includes(id)) && unit.some((id) => origin.includes(id)) && unit.join(' ') !== origin.join(' '));
  const holds = [{}];
  if (left) {
    const others = want.filter((unit) => unit !== mover && unit !== left && !unit.some((id) => followers.has(id)));
    const at = want.indexOf(left);
    const before = want.slice(0, at).reverse().find((unit) => others.includes(unit));
    const after = want.slice(at + 1).find((unit) => others.includes(unit));
    if (byId.get(left[0])?.phonePlace) holds.push({ [left[0]]: null });
    if (before) holds.push({ [left[0]]: { after: before[0] } });
    if (after) holds.push({ [left[0]]: { before: after[0] } });
  }
  // The units nearest the moved one as it stood come first, each tried on the side it stands of the moved one's new place first.
  const from = now.indexOf(moved[0]);
  const at = want.indexOf(mover);
  const others = want.filter((unit) => unit !== mover && !unit.some((id) => followers.has(id)))
    .sort((a, b) => Math.abs(now.indexOf(a[0]) - from) - Math.abs(now.indexOf(b[0]) - from));
  const tries = [null, ...others.flatMap((unit) => (want.indexOf(unit) > at
    ? [{ before: unit[0] }, { after: unit[0] }]
    : [{ after: unit[0] }, { before: unit[0] }]))];
  let kept = null;
  for (const hold of holds) {
    for (const place of tries) {
      const trial = { ...places, ...hold, [head]: place };
      const order = trialIds(withPlaces(blocks, trial), next);
      if (same(order, flat)) return done({ ...change, places: trial }, order);
      if (!kept && same(outside(order), outside(flat)) && rank(order) === rank(flat)) kept = { places: trial, order };
    }
  }
  return kept ? done({ ...change, places: kept.places }, kept.order) : null;
}

/** A tree's node or a stack's member by its path, 'i' or 'i.j'. */
function nodeAt(tree, key) {
  const [i, j] = key.split('.').map(Number);
  return j === undefined ? tree[i] : tree[i]?.children?.[j];
}

/**
 * A row of the tree moved to a drop, as the list's drag lands it (the drop reckoned by the editor's lib/nav-drop.js, a tree one level deep): before or after a row, or into one, which makes a stack of a block alone.
 * @param {object[]} blocks The section's blocks
 * @param {string|object} rawSetup The section's rule, or its setup (phoneSetupOf)
 * @param {string} key The dragged row, by its path in the tree
 * @param {{key: string, pos: 'before'|'after'|'into'}} drop
 * @returns {ReturnType<typeof settle>}
 */
export function phoneLand(blocks, rawSetup, key, drop) {
  const setup = setupFrom(rawSetup);
  const tree = phoneTree(blocks, setup);
  const units = unitsOf(tree);
  const [i, j] = key.split('.').map(Number);
  if (!units[i] || (j !== undefined && units[i][j] === undefined)) return null;
  const moving = j === undefined ? units[i] : [units[i][j]];
  const target = nodeAt(tree, drop.key);
  if (!target) return null;
  // A stack is found by a block of it that stays: its first may be the one that moves.
  const targetId = target.children ? target.children.map((c) => c.id).find((id) => !moving.includes(id)) : target.id;
  // The units without the dragged row; a stack it leaves keeps the rest.
  let rest = units.map((unit) => unit.filter((id) => !moving.includes(id))).filter((unit) => unit.length);
  const [ti, tj] = drop.key.split('.').map(Number);
  const host = rest.find((unit) => unit.includes(targetId));
  if (!host) return null;
  if (drop.pos === 'into') {
    rest = rest.map((unit) => (unit === host ? [...unit, ...moving] : unit));
  } else if (tj === undefined) {
    const at = rest.indexOf(host) + (drop.pos === 'after' ? 1 : 0);
    rest = [...rest.slice(0, at), moving, ...rest.slice(at)];
  } else {
    const member = units[ti][tj];
    const at = host.indexOf(member) + (drop.pos === 'after' ? 1 : 0);
    rest = rest.map((unit) => (unit === host ? [...unit.slice(0, at), ...moving, ...unit.slice(at)] : unit));
  }
  return settle(blocks, setup, tree, rest, moving);
}

/**
 * A block moved one place in the phone's order, as the arrows on its bar and Alt with the arrow keys move it: within its stack where it stands in one of the owner's, else past the next block or stack; the blocks placed against it go with it and are passed over, unless nothing else stands beyond them, and a column of the rule counts its blocks one by one.
 * @param {object[]} blocks The section's blocks
 * @param {string|object} rawSetup The section's rule, or its setup (phoneSetupOf)
 * @param {string} blockId
 * @param {number} dir -1 earlier, 1 later
 * @returns {ReturnType<typeof settle>} null at the ends, or where no change gives the move
 */
export function phoneStep(blocks, rawSetup, blockId, dir) {
  const setup = setupFrom(rawSetup);
  const tree = phoneTree(blocks, setup).flatMap((node) => (node.kind === 'column' ? node.children.map((c) => ({ id: c.id })) : [node]));
  const units = unitsOf(tree);
  const unit = units.find((u) => u.includes(blockId));
  if (!unit) return null;
  const step = Math.sign(dir);
  if (unit.length > 1) {
    const k = unit.indexOf(blockId);
    if (k + step < 0 || k + step >= unit.length) return null;
    const inside = [...unit];
    [inside[k], inside[k + step]] = [inside[k + step], inside[k]];
    return settle(blocks, setup, tree, units.map((u) => (u === unit ? inside : u)), [blockId]);
  }
  const followers = setup.list ? new Set() : followersOf(blocks, unit, phoneParts(blocks, setup).stacks);
  const at = units.indexOf(unit);
  let next = at + step;
  while (units[next] && units[next].some((id) => followers.has(id))) next += step;
  // Where only blocks that follow it stand beyond it, it steps past the nearest of them, which lets go of it (settle).
  if (!units[next] && units[at + step]) next = at + step;
  if (!units[next]) return null;
  const rest = units.filter((u) => u !== unit);
  const to = rest.indexOf(units[next]) + (step > 0 ? 1 : 0);
  return settle(blocks, setup, tree, [...rest.slice(0, to), unit, ...rest.slice(to)], [blockId]);
}

/**
 * The exception on one side that keeps a flowing block, or the stack it heads, where it stands: the nearest unit it can stand before (or after) without anything moving, else the nearest that keeps every other block's order; null where none can.
 * @param {object[]} blocks
 * @param {string|object} rawSetup The section's rule, or its setup (phoneSetupOf)
 * @param {string} blockId
 * @param {'before'|'after'} side
 * @returns {{before: string}|{after: string}|null}
 */
export function phonePlaceKeeping(blocks, rawSetup, blockId, side) {
  const setup = setupFrom(rawSetup);
  const units = unitsOf(phoneTree(blocks, setup).flatMap((node) => (node.kind === 'column' ? node.children.map((c) => ({ id: c.id })) : [node])));
  const unit = units.find((u) => u.includes(blockId));
  if (!unit || unit[0] !== blockId) return null;
  const now = units.flat();
  const followers = followersOf(blocks, unit, phoneParts(blocks, setup).stacks);
  const outside = (ids) => ids.filter((id) => !unit.includes(id) && !followers.has(id));
  const at = units.indexOf(unit);
  let fallback = null;
  const others = units.filter((u) => u !== unit && !u.some((id) => followers.has(id)))
    .sort((a, b) => Math.abs(units.indexOf(a) - at) - Math.abs(units.indexOf(b) - at));
  for (const other of others) {
    const place = { [side]: other[0] };
    const order = trialIds(withPlaces(blocks, { [blockId]: place }), setup);
    if (same(order, now)) return place;
    if (!fallback && same(outside(order), outside(now))) fallback = place;
  }
  return fallback;
}

/**
 * Whether a block's exception holds in its section: it names another block the phone shows, is no part of a ring, and counts, the section having no custom order and the block no place inside a stack.
 * @param {object} block
 * @param {object[]} blocks The section's blocks
 * @param {object} [setup] The section's setup (phoneSetupOf)
 * @returns {boolean}
 */
export function hasPhonePlace(block, blocks, setup = 'top') {
  return Boolean(block?.id) && phoneParts(blocks, setup).placed.has(block.id);
}

/**
 * The owner's stack a block stands in, as it holds, or null.
 * @param {object[]} blocks
 * @param {object} setup
 * @param {string} blockId
 * @returns {string[]|null}
 */
export function phoneStackOf(blocks, setup, blockId) {
  return phoneParts(blocks, setup).stacks.find((stack) => stack.includes(blockId)) ?? null;
}

/**
 * Where a block dragged on the phone canvas lands, from the pointer over the other units' boxes (a block alone, or a stack's or a cell's blocks together), in the phone's order.
 * Over a unit, its left third lands beside it on the left and its right third on the right, sharing its width; its middle third lands above it in its column where the pointer is in the upper half, below it in the lower. In a unit of several blocks (a stack, a column) the halves are read on the block under the pointer, which `member` names.
 * Off every unit but level with some (the room their line leaves), beside the nearest of them in that room (`free`); off every line, the nearest unit: before it where the pointer is above it, else after it.
 * Before or after a unit that shares its line with others, units standing beside each other, is before the line's first or after its last, so a block across the row never splits a line; `at` is the line's top or bottom edge.
 * Over the dragged block's own place, or nearer to it than to every unit, the block lands nowhere.
 * @param {Array<{id: string, left: number, top: number, right: number, bottom: number, members?: Array<{id: string, top: number, bottom: number}>}>} boxes The units' boxes, by their first block's id, a unit of several blocks with each block's height in it
 * @param {number} x
 * @param {number} y
 * @param {{left: number, top: number, right: number, bottom: number}|null} [own] The dragged block's own place
 * @returns {{pos: 'before'|'after'|'left'|'right'|'above'|'below', of: string, member?: string, free?: boolean, at?: number}|null}
 */
export function phoneDropAt(boxes, x, y, own = null) {
  const within = (b) => x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
  const away = (b) => Math.hypot(x < b.left ? b.left - x : x > b.right ? x - b.right : 0, y < b.top ? b.top - y : y > b.bottom ? y - b.bottom : 0);
  if (!boxes.length || (own && within(own))) return null;
  const hit = boxes.find(within);
  let target = hit;
  let pos;
  if (hit) {
    // The block under the pointer, in a unit of several: its height is the one read.
    const member = hit.members?.find((m) => y >= m.top && y <= m.bottom)
      ?? hit.members?.reduce((best, m) => (Math.abs(y - (m.top + m.bottom) / 2) < Math.abs(y - (best.top + best.bottom) / 2) ? m : best));
    const span = member ?? hit;
    const fy = (y - span.top) / Math.max(1, span.bottom - span.top);
    const fx = (x - hit.left) / Math.max(1, hit.right - hit.left);
    // The outer thirds stand beside it; the middle third above or below the block under the pointer.
    if (fx < 1 / 3) return { pos: 'left', of: hit.id };
    if (fx > 2 / 3) return { pos: 'right', of: hit.id };
    return { pos: fy < 0.5 ? 'above' : 'below', of: hit.id, ...(member ? { member: member.id } : {}) };
  } else {
    // Off every unit but level with some, on their line: beside the nearest of them, in the room the line leaves, unless the block's own place stands beside it on that line, nearer.
    const level = boxes.filter((b) => y >= b.top && y <= b.bottom);
    target = (level.length ? level : boxes).reduce((best, b) => (away(b) < away(best) ? b : best));
    if (level.length) {
      if (own && own.top < target.bottom && own.bottom > target.top && away(own) < away(target)) return null;
      return { pos: x < target.left ? 'left' : 'right', of: target.id, free: true };
    }
    if (own && away(own) < away(target)) return null;
    pos = y < target.top ? 'before' : 'after';
  }
  // The line: the units whose heights overlap the target's, and those overlapping them in turn.
  const line = new Set([target]);
  for (let grew = true; grew;) {
    grew = false;
    for (const b of boxes) {
      if (!line.has(b) && [...line].some((l) => b.top < l.bottom && b.bottom > l.top)) {
        line.add(b);
        grew = true;
      }
    }
  }
  const ends = boxes.filter((b) => line.has(b));
  return pos === 'before'
    ? { pos, of: ends[0].id, at: Math.min(...ends.map((b) => b.top)) }
    : { pos, of: ends[ends.length - 1].id, at: Math.max(...ends.map((b) => b.bottom)) };
}

/**
 * The change a drop on the phone canvas makes (phoneDropAt): the dragged block moved in the order, and its cells.
 * Before or after a unit it stands across the row. Beside one, where the unit's columns and the free ones beside them make the whole row, the two share the row half each, the block on the side it was dropped; where they do not, a drop never makes narrower columns, and the block joins the unit's column as a stack instead, first on its left and last on its right. Dropped in the room beside it (`free`), it takes the columns free on that side, two or more, and the unit keeps its own. Above or below one it joins it as a stack in the unit's cells, before or after the block `member` names, else first or last; above or below a block alone across the row it stands before or after it, its column being the row (`into` is a stack all the same, below).
 * @param {object[]} blocks The section's blocks
 * @param {string|object} rawSetup The section's rule, or its setup (phoneSetupOf)
 * @param {string} blockId The dragged block
 * @param {{pos: 'before'|'after'|'left'|'right'|'above'|'below'|'into', of: string, member?: string, free?: boolean}} drop
 * @returns {{places: Record<string, object|null>, stacks?: string[][], list?: string[], cells: Record<string, {col: number, cols: number}|null>}|null} The change, or null where the drop changes nothing or its order cannot be had
 */
export function phoneDropChange(blocks, rawSetup, blockId, drop) {
  const setup = setupFrom(rawSetup);
  const tree = phoneTree(blocks, setup);
  const units = unitsOf(tree);
  const byId = new Map(blocks.map((b) => [b.id, b]));
  if (!drop || !units.some((u) => u.includes(blockId))) return null;
  drop = { ...drop };
  const rest = units.map((u) => u.filter((id) => id !== blockId)).filter((u) => u.length);
  const host = rest.find((u) => u.includes(drop.of));
  if (!host) return null;
  /** A unit's cells as the row grid draws them: its first block's, else the full row. */
  const cellsOf = (unit) => phoneCellsOf(byId.get(unit[0])) ?? { col: 1, cols: 8 };
  const cells = { [blockId]: null };
  const at = rest.indexOf(host);
  let pos = drop.pos;
  if (pos === 'left' || pos === 'right') {
    const { col, cols } = cellsOf(host);
    const end = col + cols - 1;
    // The columns free on that side of the unit, on its line: from the unit before it where that one shares the line (it ends left of it), else from the row's edge; the same to the right, to the unit after it.
    const prev = rest[at - 1] ? cellsOf(rest[at - 1]) : null;
    const next = rest[at + 1] ? cellsOf(rest[at + 1]) : null;
    const from = prev && prev.col + prev.cols - 1 < col ? prev.col + prev.cols : 1;
    const to = next && next.col > end ? next.col - 1 : 8;
    const free = pos === 'left' ? { col: from, cols: col - from } : { col: end + 1, cols: to - end };
    const span = to - from + 1;
    if (drop.free && free.cols >= 2) {
      cells[blockId] = free;
    } else if (span >= PHONE_COLUMNS) {
      // The two share the row, half each, the block on the side it was dropped: the unit's columns and the free ones beside them make the whole row.
      const half = PHONE_COLUMNS / 2;
      cells[blockId] = pos === 'left' ? { col: 1, cols: half } : { col: half + 1, cols: half };
      for (const id of host) cells[id] = pos === 'left' ? { col: half + 1, cols: half } : { col: 1, cols: half };
    } else {
      // No room for two halves on the line: a drop never makes narrower columns, so the block joins the unit's column instead, first on its left, last on its right (decided 13 November 2026).
      pos = pos === 'left' ? 'above' : 'below';
      delete drop.member;
    }
  }
  // Above or below a block alone across the row: before or after it, since its column is the whole row.
  if ((pos === 'above' || pos === 'below') && host.length === 1 && cellsOf(host).cols >= PHONE_COLUMNS) pos = pos === 'above' ? 'before' : 'after';
  if (pos === 'into') pos = 'below';
  const stacked = pos === 'above' || pos === 'below';
  if (stacked) {
    const shared = cellsOf(host);
    cells[blockId] = shared.cols < 8 ? shared : null;
  }
  /** The host with the dragged block in it, above or below the block named, else first or last. */
  const joined = () => {
    const k = drop.member && host.includes(drop.member) ? host.indexOf(drop.member) : pos === 'above' ? 0 : host.length - 1;
    const i = pos === 'above' ? k : k + 1;
    return [...host.slice(0, i), blockId, ...host.slice(i)];
  };
  const want = stacked ? rest.map((u) => (u === host ? joined() : u))
    : [...rest.slice(0, at + (pos === 'after' || pos === 'right' ? 1 : 0)), [blockId], ...rest.slice(at + (pos === 'after' || pos === 'right' ? 1 : 0))];
  // The order the drop asks for: settled, or as it stands where the drop keeps it.
  const order = settle(blocks, setup, tree, want, [blockId]) ?? (same(want.flat(), units.flat()) ? { places: {} } : null);
  if (!order) return null;
  const change = { ...order, cells };
  const unchanged = Object.entries(cells).every(([id, cell]) => {
    const now = phoneCellsOf(byId.get(id));
    return cell ? now?.col === cell.col && now?.cols === cell.cols : !now;
  });
  return unchanged && !Object.keys(order.places ?? {}).length && !order.stacks && !order.list ? null : change;
}

/**
 * A section with a phone change written in, as the editor writes it (changeSectionPhone): the places, the stacks, the custom order, the cells and the heights; the section given is left as it is.
 * The cells take the place of a width and a left edge set by hand, a height is the block's own on the phone (null takes it away), and a block pinned to rows of its own keeps its place.
 * @param {object} section
 * @param {{places?: Record<string, object|null>, stacks?: string[][], list?: string[], cells?: Record<string, {col: number, cols: number}|null>, heights?: Record<string, number|null>}} change
 * @returns {object}
 */
export function phoneChangeApplied(section, change) {
  const ids = new Set((section?.blocks ?? []).map((b) => b.id));
  const blocks = (section?.blocks ?? []).map((b) => {
    let next = b;
    const own = () => (next === b ? (next = { ...b, frames: { ...b.frames } }) : next);
    if (change?.places && b.id in change.places) {
      const place = change.places[b.id];
      const side = typeof place?.before === 'string' ? 'before' : typeof place?.after === 'string' ? 'after' : null;
      own();
      if (side && place[side] !== b.id && ids.has(place[side])) next.phonePlace = { [side]: place[side] };
      else delete next.phonePlace;
    }
    if (change?.cells && b.id in change.cells && !Number.isFinite(b.frames?.mobile?.row)) {
      const cells = change.cells[b.id];
      const place = { ...(b.frames?.mobile ?? {}) };
      delete place.col;
      delete place.cols;
      if (Number.isInteger(cells?.col) && Number.isInteger(cells?.cols) && cells.cols < PHONE_COLUMNS && cells.col >= 1 && cells.col + cells.cols - 1 <= PHONE_COLUMNS) {
        delete place.x;
        delete place.w;
        Object.assign(place, { col: cells.col, cols: cells.cols });
      }
      own().frames.mobile = Object.keys(place).length ? place : null;
    }
    if (change?.heights && b.id in change.heights && !Number.isFinite(b.frames?.mobile?.row)) {
      const height = change.heights[b.id];
      const place = { ...(next.frames?.mobile ?? {}) };
      delete place.height;
      if (Number.isFinite(height) && height > 0) place.height = Math.round(height);
      own().frames.mobile = Object.keys(place).length ? place : null;
    }
    return next;
  });
  const next = { ...section, blocks };
  if (Array.isArray(change?.stacks)) {
    const stacks = change.stacks.map((stack) => (Array.isArray(stack) ? [...new Set(stack)].filter((id) => ids.has(id)) : [])).filter((stack) => stack.length > 1);
    if (stacks.length) next.phoneStacks = stacks; else delete next.phoneStacks;
  }
  if (Array.isArray(change?.list)) next.phoneList = [...new Set(change.list)].filter((id) => ids.has(id));
  return next;
}

/**
 * A height dragged on the phone, snapped to the row grid's steps, or to the height that lines its bottom up with a block or stack beside it on its line («Same height»).
 * @param {number} raw The height the pointer asks for, in px
 * @param {number} top The block's top in the flow, in px
 * @param {{top: number, bottom: number}[]} beside The boxes of the blocks and stacks on its line, in the flow's px
 * @param {number} [step] The row grid's step (MOBILE_ROW)
 * @param {number} [reach] How near the bottoms snap, in px
 * @returns {{height: number, same: boolean}}
 */
export function phoneHeightSnap(raw, top, beside, step = 8, reach = 6) {
  let best = null;
  for (const box of beside ?? []) {
    const height = box.bottom - top;
    if (height > 0 && Math.abs(height - raw) <= reach && (best === null || Math.abs(height - raw) < Math.abs(best - raw))) best = height;
  }
  if (best !== null) return { height: Math.round(best), same: true };
  return { height: Math.max(step, Math.round(raw / step) * step), same: false };
}

/**
 * The fewest of the phone's columns a cell holding words can take at a window's width without the words floor in base.css drawing it across the row.
 * The floor's own lines: a cell of one column always stands across the row, of two up to a 657 px window, of three up to 438 px and of four up to 328 px; wider cells never do.
 * @param {number} width The window's width in px
 * @returns {number} 2 to 5
 */
export function leastWordsCols(width) {
  if (width > 657) return 2;
  if (width > 438) return 3;
  if (width > 328) return 4;
  return 5;
}

/**
 * The places a block walks through with the arrow keys on the phone canvas (preview-edit.js), each a drop as phoneDropAt would read it: for every other unit in the phone's order, above it and below it, which on a block alone across the row read before and after it. Left and Right from a place are the drops beside that place's unit.
 * `home` is the first place where the block already stands, where the walk begins.
 * @param {object[]} blocks
 * @param {string|object} rawSetup
 * @param {string} blockId
 * @returns {{drops: Array<{pos: 'above'|'below', of: string, member: string}>, home: number}}
 */
export function phoneKeyDrops(blocks, rawSetup, blockId) {
  const setup = setupFrom(rawSetup);
  const drops = [];
  for (const unit of unitsOf(phoneTree(blocks, setup))) {
    const others = unit.filter((id) => id !== blockId);
    if (!others.length) continue;
    const of = others[0];
    drops.push({ pos: 'above', of, member: of }, { pos: 'below', of, member: others[others.length - 1] });
  }
  let home = drops.findIndex((drop) => phoneDropChange(blocks, setup, blockId, drop) === null);
  if (home < 0) home = 0;
  return { drops, home };
}

/** A flowing block's cells (migrate.js phoneCells), or null. */
const phoneCellsOf = (block) => (block && flowing(block) ? phoneCells(block.frames?.mobile) : null);
