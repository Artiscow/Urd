/**
 * The owner's moves in a section's phone order, in the editor only (the visitor reads the order in phone-order.js): pure, node-tested (tests/phone-order.test.mjs).
 * The order is shown as a tree of one level (phoneTree): a block alone, or a stack of blocks, the owner's own or a column the rule reads whole.
 * A move is a new order of that tree, settled into the section's data (settle): the stacks as they stand, and either the custom order as listed, or the exception that puts the moved block or stack there, the other blocks keeping their order.
 */
import { phoneParts } from './phone-order.js';

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
 * Without a custom order the exception is sought among the other units, the nearest first: one that gives the order exactly, else one that keeps every other block's order with the moved unit among them where it was put, the blocks placed against it following it. What is left of a stack the moved block left keeps its place, by an exception of its own where it needs one.
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
  const next = { ...setup, stacks };
  const placed = withPlaces(blocks, places);
  const first = trialIds(placed, next);
  if (same(first, flat)) return done(change, first);
  const mover = want.find((unit) => unit.some((id) => moved.includes(id)));
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
 * A block moved one place in the phone's order, as the arrows on its bar and Alt with the arrow keys move it: within its stack where it stands in one of the owner's, else past the next block or stack; the blocks placed against it go with it and are passed over, and a column of the rule counts its blocks one by one.
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
