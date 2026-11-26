/**
 * The designs drawn in place when «Choosing a design» shows pictures: a few whole, or a run around the one in use beside a tile that opens the picker.
 */

/** A choice of up to this many designs stands in place whole. */
export const LOOKS_WHOLE = 12;

/** A larger choice shows this many, the one in use among them. */
export const LOOKS_SHOWN = 8;

/**
 * The designs drawn in place, whether the picker's tile is beside them, and the run's start.
 * A run drawn before (`start`) stays while it holds the design in use.
 * @template {{ id: string }} T
 * @param {T[]} items the choice's designs in the picker's order
 * @param {string|null} current the design in use
 * @param {number|null} [start] where the run drawn before starts
 * @returns {{ items: T[], more: boolean, start: number }}
 */
export function looksInPlace(items, current, start = null) {
  if (items.length <= LOOKS_WHOLE) return { items, more: false, start: 0 };
  const at = Math.max(0, items.findIndex((d) => d.id === current));
  const stays = Number.isInteger(start) && start >= 0 && start <= items.length - LOOKS_SHOWN && at >= start && at < start + LOOKS_SHOWN;
  const from = stays ? start : Math.max(0, Math.min(at - Math.floor(LOOKS_SHOWN / 2), items.length - LOOKS_SHOWN));
  return { items: items.slice(from, from + LOOKS_SHOWN), more: true, start: from };
}
