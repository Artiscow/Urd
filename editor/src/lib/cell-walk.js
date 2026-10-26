/**
 * The keyboard walk through a picker's grid of cells from its search field (0.7.10.7), as the canvas block menu walks its hits.
 * Typing marks the first hit, the arrows move the mark to the nearest cell in their direction, and Enter takes the marked cell; the focus stays in the field, so the typing goes on.
 * The geometry is pure (nearestCell) and node-tested; the marking needs a DOM.
 */

/** The arrow keys as directions. */
const STEPS = { ArrowDown: [0, 1], ArrowUp: [0, -1], ArrowRight: [1, 0], ArrowLeft: [-1, 0] };

/**
 * The index of the nearest cell from `from` in the direction (dx, dy), by the cells' centres, or -1 when there is none.
 * Only cells lying ahead count; the sideways distance counts double, so a walk keeps to its row or its column.
 * @param {Array<{left: number, top: number, width: number, height: number}>} rects
 * @param {number} from
 * @param {number} dx
 * @param {number} dy
 * @returns {number}
 */
export function nearestCell(rects, from, dx, dy) {
  const centre = (r) => [r.left + r.width / 2, r.top + r.height / 2];
  const [fx, fy] = centre(rects[from]);
  let best = -1;
  let bestScore = Infinity;
  rects.forEach((r, i) => {
    if (i === from) return;
    const [cx, cy] = centre(r);
    const along = dy ? (cy - fy) * dy : (cx - fx) * dx;
    if (along <= 1) return;
    const across = dy ? Math.abs(cx - fx) : Math.abs(cy - fy);
    const score = along + across * 2;
    if (score < bestScore) {
      bestScore = score;
      best = i;
    }
  });
  return best;
}

/**
 * A walker over the cells a picker shows, with the class `picked` on the marked one.
 * @param {() => HTMLElement[]} cells The cells as they stand now, in their order
 */
export function cellWalker(cells) {
  let marked = null;
  const mark = (el) => {
    marked?.classList.remove('picked');
    marked = el ?? null;
    marked?.classList.add('picked');
    marked?.scrollIntoView({ block: 'nearest' });
  };
  return {
    mark,
    /** Marks the first of the cells, or none. */
    markFirst(first = cells()[0]) { mark(first ?? null); },
    /**
     * The search field's keys: an arrow walks (from the cell already chosen, or the first, when nothing is marked yet), Enter takes the marked cell.
     * @param {KeyboardEvent} event
     */
    onKey(event) {
      const step = STEPS[event.key];
      const list = cells();
      if (step) {
        // Left and right move the caret in the field until a walk has begun.
        if (step[1] === 0 && !marked) return;
        event.preventDefault();
        if (!list.length) return;
        if (!marked || !list.includes(marked)) {
          mark(list.find((c) => c.classList.contains('active')) ?? list[0]);
          return;
        }
        const i = nearestCell(list.map((c) => c.getBoundingClientRect()), list.indexOf(marked), step[0], step[1]);
        if (i >= 0) mark(list[i]);
      } else if (event.key === 'Enter' && marked && list.includes(marked)) {
        event.preventDefault();
        marked.click();
      }
    },
  };
}
