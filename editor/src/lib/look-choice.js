/**
 * Which designs stand in place in a menu or a panel when Urd settings «Choosing a design» puts their pictures there (lib/rows/LookChoice.svelte).
 * A choice of a few designs shows them all; a larger one shows a run of designs around the one in use, in the picker's order, beside a tile that opens the picker with every design.
 * Pure, node-tested (tests/look-choice.test.mjs).
 */

/** A choice of up to this many designs stands in place whole. */
export const LOOKS_WHOLE = 12;

/** A larger choice shows this many, the one in use among them. */
export const LOOKS_SHOWN = 8;

/**
 * The designs drawn in place, whether the tile that opens the picker stands beside them, and where the run starts.
 * A run already drawn (`start`) stays where it stands while the design in use is in it, so a press on one of its pictures moves none of them; otherwise the run is drawn around the design in use.
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
