/**
 * The presets that suggest a section's layout on the phone (0.7.3.14), in the editor only: pure, node-tested (tests/phone-layouts.test.mjs).
 * A preset fills the phone's eight cell columns with the section's units in the phone's order, a block alone or a stack (phone-moves.js phoneTree), as a starting point the owner changes freely afterwards.
 * Its change writes the cells of each unit's blocks (`frames.mobile.col` and `cols`), and for «Alternate sides» the order that puts the picture first on every other line, since a block later in the order never stands left of an earlier one on its line.
 */
import { phoneTree, settle, flowing } from './phone-moves.js';
import { phoneSetupOf, stackOrder } from './phone-order.js';
import { phoneCells } from './migrate.js';

/** The presets, in the order they stand where none fits better. */
export const PHONE_LAYOUTS = ['two-per-line', 'pairs', 'alternate', 'wide-two', 'big-two', 'one-column'];

/** The block types that are words: a text beside a picture reads as a pair. */
const WORD_TYPES = new Set(['text', 'terms', 'button', 'faq', 'timeline', 'quote', 'stats', 'table']);
/** The block types that are pictures. */
const PICTURE_TYPES = new Set(['image', 'video', 'gallery']);

const LEFT = { col: 1, cols: 4 };
const RIGHT = { col: 5, cols: 4 };

/**
 * A block's mark in the pictures of the phone's order and layout: a picture, a heading, a button, or text.
 * @param {{type: string, props?: object}} block
 * @returns {'pic'|'btn'|'head'|'text'}
 */
export function phoneMark(block) {
  if (['image', 'gallery', 'video', 'map', 'calendar', 'collection', 'product'].includes(block.type)) return 'pic';
  if (block.type === 'button') return 'btn';
  return /^\s*<h[1-6]/i.test(String(block.props?.html ?? '')) ? 'head' : 'text';
}

/** The setup from a rule alone or a whole setup. */
const setupFrom = (setup) => (setup && typeof setup === 'object' ? { list: null, stacks: [], ...setup } : { rule: setup ?? 'top', list: null, stacks: [] });

/** The section's units on the phone, each with its blocks and what it is: a picture, words, or else. */
function unitsOf(blocks, setup) {
  const byId = new Map(blocks.map((b) => [b.id, b]));
  return phoneTree(blocks, setup).map((node) => {
    const members = (node.children ? node.children.map((c) => c.id) : [node.id]).map((id) => byId.get(id)).filter(Boolean);
    const kind = members.every((b) => PICTURE_TYPES.has(b.type)) ? 'picture'
      : members.some((b) => WORD_TYPES.has(b.type)) ? 'words' : 'other';
    return { ids: members.map((b) => b.id), blocks: members, kind };
  });
}

/** The units that read as a pair, a picture and words next to each other, by the index of the first; each unit in one pair at most. */
function pairsOf(units) {
  const out = [];
  for (let i = 0; i + 1 < units.length; i += 1) {
    const kinds = [units[i].kind, units[i + 1].kind];
    if (kinds.includes('picture') && kinds.includes('words')) {
      out.push(i);
      i += 1;
    }
  }
  return out;
}

/**
 * The presets for a section, the ones that fit first and the best of those first, each saying whether it fits; one that does not fit is shown greyed, never left out.
 * @param {object[]} blocks The section's blocks
 * @param {string|object} setup The section's rule, or its setup (phoneSetupOf)
 * @returns {Array<{id: string, fits: boolean}>}
 */
export function phoneLayouts(blocks, setup) {
  const units = unitsOf(blocks, setupFrom(setup));
  const pairs = pairsOf(units).length;
  const cards = units.filter((u) => u.ids.length > 1).length;
  const celled = blocks.some((b) => flowing(b) && !b.hideMobile && phoneCells(b.frames?.mobile));
  const fits = {
    'two-per-line': units.length >= 2,
    pairs: pairs >= 1,
    alternate: pairs >= 2,
    'wide-two': units.length >= 3,
    'big-two': units.length >= 3 && units[0].kind === 'picture',
    'one-column': celled,
  };
  // Cards of several blocks read two to a line first; pictures with their words pair up first.
  const score = {
    'two-per-line': cards >= 2 && cards >= units.length / 2 ? 6 : 3,
    alternate: pairs >= 2 ? 5 : 0,
    pairs: pairs >= 1 ? 4 : 0,
    'big-two': 2.5,
    'wide-two': 2,
    'one-column': 1,
  };
  const fitting = PHONE_LAYOUTS.filter((id) => fits[id]).sort((a, b) => score[b] - score[a]);
  return [...fitting.map((id) => ({ id, fits: true })), ...PHONE_LAYOUTS.filter((id) => !fits[id]).map((id) => ({ id, fits: false }))];
}

/**
 * Each unit's cells under a preset, in the units' order; for «Pairs» and «Alternate sides» the pairs instead, whose cells are given by where they stand once read the other way round where asked (`flip`).
 * @returns {{cells: Array<{col: number, cols: number}|null>, flip: number[], pairs: number[]}}
 */
function plan(units, id) {
  const cells = units.map(() => null);
  const flip = [];
  const pairs = [];
  if (id === 'two-per-line') units.forEach((_, i) => { cells[i] = i % 2 ? RIGHT : LEFT; });
  if (id === 'wide-two') units.forEach((_, i) => { cells[i] = i % 3 === 0 ? null : i % 3 === 1 ? LEFT : RIGHT; });
  if (id === 'big-two' && units.length >= 3) {
    cells[0] = LEFT;
    cells[1] = RIGHT;
    cells[2] = RIGHT;
  }
  if (id === 'pairs' || id === 'alternate') {
    pairsOf(units).forEach((i, k) => {
      pairs.push(i);
      // Every other pair reads its picture first, so it stands on the left; the first reads its words first.
      if (id === 'alternate' && (units[i].kind === 'picture') !== (k % 2 === 1)) flip.push(i);
    });
  }
  return { cells, flip, pairs };
}

/** The blocks and setup with a change written in, as the editor writes it. */
function written(blocks, setup, change) {
  const next = blocks.map((b) => {
    if (!(b.id in (change.places ?? {}))) return b;
    const copy = { ...b };
    if (change.places[b.id]) copy.phonePlace = change.places[b.id]; else delete copy.phonePlace;
    return copy;
  });
  return { blocks: next, setup: { ...setup, ...(change.stacks ? { stacks: change.stacks } : {}), ...(change.list ? { list: change.list } : {}) } };
}

/**
 * A preset's change for a section: the cells of every block of every unit (null for the full row), and for «Alternate sides» the exceptions, stacks or custom order that read every other pair the other way round.
 * @param {object[]} blocks The section's blocks
 * @param {string|object} rawSetup The section's rule, or its setup (phoneSetupOf)
 * @param {string} id A preset of PHONE_LAYOUTS
 * @returns {{cells: Record<string, {col: number, cols: number}|null>, places?: Record<string, object|null>, stacks?: string[][], list?: string[]}|null} The change, a block's cells null for the full row (where a width set by hand stays); null where the press would change nothing
 */
export function phoneLayoutChange(blocks, rawSetup, id) {
  if (!PHONE_LAYOUTS.includes(id)) return null;
  const setup = setupFrom(rawSetup);
  const units = unitsOf(blocks, setup);
  const { cells, flip, pairs } = plan(units, id);
  const change = { cells: {} };
  // Each pair to flip: its second unit moved before its first, one move at a time on the order as the moves before it left it.
  let work = { blocks, setup };
  for (const i of flip) {
    const [first, second] = [units[i], units[i + 1]];
    const tree = phoneTree(work.blocks, work.setup);
    const now = tree.map((node) => (node.children ? node.children.map((c) => c.id) : [node.id]));
    const a = now.findIndex((u) => u.includes(first.ids[0]));
    const b = now.findIndex((u) => u.includes(second.ids[0]));
    if (a < 0 || b < 0) continue;
    const want = now.filter((_, k) => k !== b);
    want.splice(want.indexOf(now[a]), 0, now[b]);
    const step = settle(work.blocks, work.setup, tree, want, now[b]);
    if (!step) continue;
    change.places = { ...change.places, ...step.places };
    if (step.stacks) change.stacks = step.stacks;
    if (step.list) change.list = step.list;
    work = written(work.blocks, work.setup, step);
  }
  // A pair stands side by side where its two units stand next to each other once the moves are made, the one read first on the left; a pair that could not be read the other way round stands as it reads.
  if (pairs.length) {
    const final = phoneTree(work.blocks, work.setup).map((node) => (node.children ? node.children.map((c) => c.id) : [node.id]));
    const at = (unit) => final.findIndex((ids) => ids.includes(unit.ids[0]));
    for (const i of pairs) {
      const [a, b] = [at(units[i]), at(units[i + 1])];
      if (Math.abs(a - b) !== 1) continue;
      cells[a < b ? i : i + 1] = LEFT;
      cells[a < b ? i + 1 : i] = RIGHT;
    }
  }
  units.forEach((unit, i) => { for (const bid of unit.ids) change.cells[bid] = cells[i] ? { ...cells[i] } : null; });
  // A press that changes nothing is none.
  const byId = new Map(blocks.map((b) => [b.id, b]));
  const sameCells = Object.entries(change.cells).every(([bid, want]) => {
    const now = phoneCells(byId.get(bid)?.frames?.mobile);
    return want ? now?.col === want.col && now?.cols === want.cols : !now;
  });
  const placed = Object.entries(change.places ?? {}).some(([bid, place]) => JSON.stringify(place ?? null) !== JSON.stringify(byId.get(bid)?.phonePlace ?? null));
  return sameCells && !placed && !change.stacks && !change.list ? null : change;
}

/**
 * A preset drawn small: the section's blocks after its change, a cell per run of blocks in the same cells, each with its blocks' marks, at most `max` blocks; a preset that changes nothing draws the section as it stands.
 * @param {object} section The section, its blocks and its phone order
 * @param {string} id A preset of PHONE_LAYOUTS
 * @param {number} [max]
 * @returns {Array<{col: number, cols: number, marks: string[]}>}
 */
export function phoneLayoutSketch(section, id, max = 9) {
  const setup = phoneSetupOf(section);
  const blocks = section?.blocks ?? [];
  const change = phoneLayoutChange(blocks, setup, id) ?? { cells: {} };
  const next = written(blocks, setup, change);
  const out = [];
  // Each flowing block in the order the change leaves, in its own cells as the page draws it: those one after another in the same cells under each other in one cell.
  for (const block of stackOrder(next.blocks, next.setup).filter(flowing).slice(0, max)) {
    const cells = block.id in change.cells ? change.cells[block.id] : phoneCells(block.frames?.mobile);
    const { col, cols } = cells ?? { col: 1, cols: 8 };
    const last = out[out.length - 1];
    if (last && last.col === col && last.cols === cols && cols < 8) last.marks.push(phoneMark(block));
    else out.push({ col, cols, marks: [phoneMark(block)] });
  }
  return out;
}
