/**
 * The order of a section's blocks on the phone, in the row grid (ADR-0019): pure, node-tested (tests/phone-order.test.mjs).
 * The section's rule (`phoneOrder`) reads its blocks top first, by their top on the desktop (or the key `mobileOrder` a preset gives them), or column by column where blocks stand beside each other on the desktop, the left or the right column first.
 * A block's exception (`phonePlace`) puts it directly before or after another block, wherever the rule puts that one.
 */

/** The section's rules, the first the standard. */
export const PHONE_ORDERS = ['top', 'left', 'right'];

/** The section's rule, the standard where it has none or one this engine does not know. */
export function phoneOrderOf(section) {
  return PHONE_ORDERS.includes(section?.phoneOrder) ? section.phoneOrder : 'top';
}

/** A block's place in the rule's sort: the key a preset gives it, else its top on the desktop. */
const sortKey = (block) => block.mobileOrder ?? block.frames.desktop.y;

/** By the sort key, then from the left. */
const byKey = (a, b) => (sortKey(a) - sortKey(b)) || (a.frames.desktop.x - b.frames.desktop.x);

/** The most a band may stand below the one above it, in px, for the two to read as one grid: a card's parts stand closer than its rows of cards do. */
export const PHONE_JOIN_GAP = 24;

/** Whether a block flows in the row grid, rather than standing on rows placed by hand. */
const flowing = (block) => !Number.isFinite(block.frames.mobile?.row);

/** The block a block's exception names, or null. */
const anchorOf = (block) => (typeof block.phonePlace?.before === 'string' ? block.phonePlace.before : typeof block.phonePlace?.after === 'string' ? block.phonePlace.after : null);

/**
 * The blocks read column by column: a band holds the blocks whose heights overlap on the desktop, one after another; a column inside a band the blocks whose widths overlap there.
 * Bands close below each other (PHONE_JOIN_GAP) with columns that line up, one to one, stand as one grid, so a card of an icon over a text is one column even where the two do not overlap in height, while two rows of cards, or a zig-zag of text and picture, stay rows.
 * @param {object[]} blocks
 * @param {'left'|'right'} side Which column is read first
 * @returns {object[]}
 */
function byColumns(blocks, side) {
  const top = (b) => b.frames.desktop.y;
  const bottom = (b) => b.frames.desktop.y + Math.max(0, b.frames.desktop.h);
  const left = (b) => b.frames.desktop.x;
  const right = (b) => b.frames.desktop.x + Math.max(0, b.frames.desktop.w);
  const bands = [];
  for (const block of blocks.slice().sort((a, b) => (top(a) - top(b)) || (left(a) - left(b)))) {
    const band = bands[bands.length - 1];
    if (band && top(block) < band.bottom) {
      band.blocks.push(block);
      band.bottom = Math.max(band.bottom, bottom(block));
    } else {
      bands.push({ blocks: [block], top: top(block), bottom: bottom(block) });
    }
  }
  /** A band's columns, left to right: its blocks joined wherever their widths overlap, a block across two columns joining them into one. */
  const columnsOf = (band) => {
    const columns = [];
    for (const block of band.blocks) {
      const touching = columns.filter((col) => left(block) < col.right && right(block) > col.left);
      const merged = { blocks: [block], left: left(block), right: right(block) };
      for (const col of touching) {
        merged.blocks.push(...col.blocks);
        merged.left = Math.min(merged.left, col.left);
        merged.right = Math.max(merged.right, col.right);
        columns.splice(columns.indexOf(col), 1);
      }
      columns.push(merged);
    }
    return columns.sort((a, b) => (a.left - b.left) || (a.right - b.right));
  };
  /** Whether two bands' columns line up one to one: as many, each overlapping the one in its place and no other. */
  const lineUp = (upper, lower) => upper.length > 1 && upper.length === lower.length
    && lower.every((col, i) => upper.every((other, j) => (col.left < other.right && col.right > other.left) === (i === j)));
  const grids = [];
  let last = null;
  let lastBottom = -Infinity;
  for (const band of bands) {
    const columns = columnsOf(band);
    const grid = grids[grids.length - 1];
    if (grid && last && band.top - lastBottom <= PHONE_JOIN_GAP && lineUp(last, columns)) {
      columns.forEach((col, i) => grid[i].blocks.push(...col.blocks));
    } else {
      grids.push(columns.map((col) => ({ ...col, blocks: [...col.blocks] })));
    }
    last = columns;
    lastBottom = band.bottom;
  }
  const out = [];
  for (const grid of grids) {
    const columns = side === 'right' ? grid.slice().reverse() : grid;
    for (const col of columns) out.push(...col.blocks.sort(byKey));
  }
  return out;
}

/**
 * A block's exception, where it names a block of the same order other than itself.
 * @param {object} block
 * @param {Set<string>} ids The ids in the order
 * @returns {{side: 'before'|'after', of: string}|null}
 */
function placeOf(block, ids) {
  const place = block.phonePlace;
  const side = typeof place?.before === 'string' ? 'before' : typeof place?.after === 'string' ? 'after' : null;
  const of = side ? place[side] : null;
  return side && of !== block.id && ids.has(of) ? { side, of } : null;
}

/**
 * The rule's order with each exception moved before or after its block.
 * Blocks placed against the same block keep the rule's order among themselves; a block placed against one that is placed itself follows it there; a ring of exceptions keeps the rule's places.
 * @param {object[]} base The rule's order
 * @returns {{list: object[], placed: Set<string>}} The order, and the blocks whose exception holds in it
 */
function withExceptions(base) {
  const ids = new Set(base.map((b) => b.id));
  const moved = base.filter((b) => placeOf(b, ids));
  const placed = new Set();
  if (!moved.length) return { list: base, placed };
  const list = base.filter((b) => !placeOf(b, ids));
  /** The last block placed after each block, so the next one placed after it follows that one. */
  const lastAfter = new Map();
  let pending = moved;
  while (pending.length) {
    const waiting = [];
    for (const block of pending) {
      const { side, of } = placeOf(block, ids);
      const at = list.findIndex((b) => b.id === of);
      if (at < 0) {
        waiting.push(block);
        continue;
      }
      if (side === 'before') {
        list.splice(at, 0, block);
      } else {
        const tail = lastAfter.get(of);
        list.splice((tail ? list.indexOf(tail) : at) + 1, 0, block);
        lastAfter.set(of, block);
      }
      placed.add(block.id);
    }
    if (waiting.length === pending.length) {
      // A ring: each stands where the rule puts it, after the nearest block before it in the rule's order.
      for (const block of waiting) {
        const before = base.slice(0, base.indexOf(block)).reverse().find((b) => list.includes(b));
        list.splice(before ? list.indexOf(before) + 1 : 0, 0, block);
      }
      break;
    }
    pending = waiting;
  }
  return { list, placed };
}

/**
 * The reading order in the row grid: the blocks the phone shows (not hidden there), by the section's rule, with each block's exception.
 * Blocks placed by hand (frames.mobile with a row) are included, in the same order: auto-placement skips them, but the DOM order carries the read-aloud order.
 * @param {object[]} blocks The section's blocks
 * @param {string} [rule] The section's rule (phoneOrderOf)
 * @returns {object[]}
 */
export function stackOrder(blocks, rule = 'top') {
  return withExceptions(ruleOrder(blocks, rule)).list;
}

/**
 * The blocks the phone shows in the rule's order, before the exceptions.
 * A block shown on phones only stands nowhere on the desktop, so it shapes no column: it joins the columns' order before the first block whose key is its own or greater.
 */
function ruleOrder(blocks, rule) {
  const shown = (blocks ?? []).filter((block) => !block.hideMobile && block.frames?.desktop);
  if (rule !== 'left' && rule !== 'right') return shown.slice().sort(byKey);
  const base = byColumns(shown.filter((block) => !block.hideDesktop), rule);
  for (const block of shown.filter((b) => b.hideDesktop).sort(byKey)) {
    const at = base.findIndex((b) => sortKey(b) >= sortKey(block));
    base.splice(at < 0 ? base.length : at, 0, block);
  }
  return base;
}

/**
 * The blocks whose exception leads to this block, directly or through another such block: they move with it.
 * @param {object[]} blocks
 * @param {string} blockId
 * @returns {Set<string>}
 */
function followersOf(blocks, blockId) {
  const followers = new Set();
  let grew = true;
  while (grew) {
    grew = false;
    for (const block of blocks) {
      const of = anchorOf(block);
      if (block.id !== blockId && !followers.has(block.id) && (of === blockId || followers.has(of))) {
        followers.add(block.id);
        grew = true;
      }
    }
  }
  return followers;
}

/**
 * The flowing blocks' ids in the order a trial exception for one block gives.
 * @param {object[]} blocks
 * @param {string} rule
 * @param {string} blockId
 * @param {object|null} place The trial exception
 */
function trialOrder(blocks, rule, blockId, place) {
  return stackOrder(blocks.map((b) => (b.id === blockId ? { ...b, phonePlace: place } : b)), rule).filter(flowing).map((b) => b.id);
}

/**
 * The exception that moves a flowing block exactly one place past the other blocks in the phone's order, earlier or later; the blocks placed against it move with it, and every other block keeps its order.
 * The nearest block that gives that is chosen, before the block before it or after the block after it where those give it; null at the ends, or where no exception gives it.
 * Only flowing blocks take part: a block placed by hand has a row of its own.
 * @param {object[]} blocks The section's blocks
 * @param {string} rule The section's rule
 * @param {string} blockId
 * @param {number} dir -1 earlier, 1 later
 * @returns {{before: string}|{after: string}|null} The block's new `phonePlace`
 */
export function phonePlaceStep(blocks, rule, blockId, dir) {
  const now = stackOrder(blocks, rule).filter(flowing).map((b) => b.id);
  const at = now.indexOf(blockId);
  if (at < 0) return null;
  const followers = followersOf(blocks, blockId);
  const others = (ids) => ids.filter((id) => id !== blockId && !followers.has(id));
  const rank = (ids) => others(ids.slice(0, ids.indexOf(blockId))).length;
  const kept = others(now).join(' ');
  const goal = rank(now) + Math.sign(dir);
  const nearest = others(now).sort((a, b) => Math.abs(now.indexOf(a) - at) - Math.abs(now.indexOf(b) - at));
  for (const of of nearest) {
    for (const side of dir < 0 ? ['before', 'after'] : ['after', 'before']) {
      const place = { [side]: of };
      const order = trialOrder(blocks, rule, blockId, place);
      if (others(order).join(' ') === kept && rank(order) === goal) return place;
    }
  }
  return null;
}

/**
 * The exception on one side that keeps a flowing block where it stands: the nearest block it can stand before (or after) without anything moving, else the nearest that keeps every other block's order; null where none can.
 * @param {object[]} blocks
 * @param {string} rule
 * @param {string} blockId
 * @param {'before'|'after'} side
 * @returns {{before: string}|{after: string}|null}
 */
export function phonePlaceKeeping(blocks, rule, blockId, side) {
  const now = stackOrder(blocks, rule).filter(flowing).map((b) => b.id);
  const at = now.indexOf(blockId);
  if (at < 0) return null;
  const followers = followersOf(blocks, blockId);
  const others = (ids) => ids.filter((id) => id !== blockId && !followers.has(id));
  const kept = others(now).join(' ');
  let fallback = null;
  for (const of of others(now).sort((a, b) => Math.abs(now.indexOf(a) - at) - Math.abs(now.indexOf(b) - at))) {
    const place = { [side]: of };
    const order = trialOrder(blocks, rule, blockId, place);
    if (order.join(' ') === now.join(' ')) return place;
    if (!fallback && others(order).join(' ') === kept) fallback = place;
  }
  return fallback;
}

/**
 * Whether a block's exception holds in its section: it names another block the phone shows, and is no part of a ring.
 * @param {object} block
 * @param {object[]} blocks The section's blocks
 * @returns {boolean}
 */
export function hasPhonePlace(block, blocks) {
  return Boolean(block?.id) && withExceptions(ruleOrder(blocks, 'top')).placed.has(block.id);
}
