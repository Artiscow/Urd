/**
 * The phone check before publishing: the sections whose phone layout changed since they last stood in the phone view, so publishing can remind the owner to look at them on the phone.
 * A section's phone layout is what the phone draws it from: its blocks in the phone's reading order, each block's own settings for the phone, the desktop's size where the phone takes it (the height of a block that does not grow with its content, and the frame's shape), and the section's phone settings. Words, other settings and a desktop place that leaves the reading order as it was are no change.
 * Each page keeps a baseline in this browser, the layout of each section as it was last seen in the phone view, first taken from the page as published; a section whose layout differs from its baseline, or that has none, is not checked yet.
 * Pure, node-tested (tests/phone-check.test.mjs); the editor keeps the baselines in localStorage under `urd-phone-check` (page.svelte.js).
 */
import { followsContent } from '$engine/push-model.js';
import { stackOrder, phoneSetupOf } from '$engine/phone-order.js';
import { pinsOnPhone } from '$engine/sticky-model.js';

/** Blocks that grow with their words on the phone, so the desktop's height is not theirs there (autoGrows in render.js). */
const GROWS = new Set(['text', 'terms']);

/** A size as the phone tells it apart. */
const round = (v) => (Number.isFinite(v) ? Math.round(v * 10) / 10 : null);

/**
 * A section's phone layout, as text to compare.
 * @param {{blocks?: Array<object>, phoneOrder?: string, phoneList?: string[], phoneStacks?: string[][], phoneLoose?: string[], size?: object}} section
 * @returns {string}
 */
export function layoutKey(section) {
  const blocks = section?.blocks ?? [];
  const setup = phoneSetupOf(section);
  const order = stackOrder(blocks, setup).map((block) => block.id);
  const own = blocks.map((block) => {
    const frame = block.frames?.desktop ?? {};
    const grows = GROWS.has(block.type) || followsContent(block);
    return [block.id, block.hideMobile ? 1 : 0, block.frames?.mobile ?? null, block.phonePlace ?? null,
      grows ? null : round(frame.w), grows ? null : round(frame.h), frame.rot ?? 0,
      // A size of the phone's own and the bounds that stop it, only where the block has one, so a block without one keeps the key it had.
      ...(block.phoneSize !== undefined ? [block.phoneSize, block.sizeMin ?? null, block.sizeMax ?? null] : []),
      // Pinning on the phone («On phones too»), its distance and how long it holds, only where the block pins there, likewise.
      ...(pinsOnPhone(block.sticky) ? ['pin', block.sticky.offset, block.sticky.until ?? null, block.sticky.group ?? null] : [])];
  }).sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return JSON.stringify([order, own, setup, section?.size?.mobileGap ?? null, section?.size?.readablePhone ?? null, section?.size?.mobilePadTop ?? null, section?.size?.mobilePadBottom ?? null]);
}

/**
 * A page's baseline: each section's layout by its id.
 * @param {Array<{id: string, blocks?: Array<object>}>} sections
 * @returns {Record<string, string>}
 */
export function layoutKeys(sections) {
  return Object.fromEntries((sections ?? []).map((section) => [section.id, layoutKey(section)]));
}

/**
 * The sections of a page not looked at in the phone view since their layout changed, by id in the page's order; none where the page has no baseline.
 * @param {Array<{id: string, blocks?: Array<object>}>} sections
 * @param {Record<string, string>|null|undefined} base
 * @returns {string[]}
 */
export function uncheckedSections(sections, base) {
  if (!base) return [];
  return (sections ?? []).filter((section) => base[section.id] !== layoutKey(section)).map((section) => section.id);
}

/**
 * The baseline with the sections seen in the phone view taken as they stand now; the same object where none of them changed it, so the caller writes only a change.
 * @param {Record<string, string>|null|undefined} base
 * @param {Array<{id: string, blocks?: Array<object>}>} sections
 * @param {string[]} seen
 * @returns {Record<string, string>}
 */
export function seeSections(base, sections, seen) {
  const from = base ?? {};
  let next = from;
  for (const section of sections ?? []) {
    if (!seen.includes(section.id)) continue;
    const key = layoutKey(section);
    if (from[section.id] === key) continue;
    if (next === from) next = { ...from };
    next[section.id] = key;
  }
  return next;
}
