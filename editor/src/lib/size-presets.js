/**
 * The sizes a product's «Presets» fill with one press (panels/collections/SizePresets.svelte): the size sets other products of the shop already use, the common sets, and a numbered set whose wording the owner writes, where «#» stands for each number («#-pack» gives «2-pack»).
 * Pure, node-tested (tests/size-presets.test.mjs).
 */

/** The common sets that read the same in every language; a worded set comes from the admin dictionary as seed text. */
export const COMMON_SETS = [
  ['S', 'M', 'L', 'XL'],
  ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
];

/** Sizes as a set's key: the same sizes in the same order are one set. */
const keyOf = (sizes) => sizes.join('\u0000');

/**
 * The size sets the products of every product collection use, each once, named by the first product that has it; the entry being edited is left out, and so is a set it already has.
 * @param {Record<string, {kind?: string, entries?: Array}>} views The collections by id
 * @param {string|null} exceptId The entry being edited
 * @param {(html: string) => string} plain A product title's words
 * @param {number} [max]
 * @returns {Array<{sizes: string[], from: string}>}
 */
export function shopSizeSets(views, exceptId, plain, max = 6) {
  const out = [];
  const seen = new Set();
  let own = null;
  for (const view of Object.values(views ?? {})) {
    if (view?.kind !== 'products') continue;
    for (const entry of view.entries ?? []) {
      const sizes = (Array.isArray(entry.sizes) ? entry.sizes : []).map(String).filter(Boolean);
      if (entry.id === exceptId) { own = keyOf(sizes); continue; }
      if (!sizes.length) continue;
      const key = keyOf(sizes);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ sizes, from: plain(entry.title ?? '') });
    }
  }
  return out.filter((set) => keyOf(set.sizes) !== own).slice(0, max);
}

/** A worded set from its seed text, the words divided by commas. */
export function wordedSet(text) {
  return String(text ?? '').split(',').map((s) => s.trim()).filter(Boolean);
}

/**
 * A numbered set: each number written into the wording, where «#» stands for it, or put before the wording with a space where there is no «#».
 * The numbers are divided by commas or spaces, so a decimal takes a dot; anything that is not a number is left out, and so is a size given twice.
 * @param {string} numbers «2, 4, 6»
 * @param {string} wording «#-pack», «# pcs», «Pack of #» or «pcs»
 * @returns {string[]}
 */
export function numberedSet(numbers, wording) {
  const words = String(wording ?? '').trim();
  const nums = String(numbers ?? '').split(/[\s,;]+/).map((n) => n.trim()).filter((n) => /^\d+(?:\.\d+)?$/.test(n));
  const out = nums.map((n) => (words.includes('#') ? words.replaceAll('#', n) : `${n} ${words}`.trim()));
  return [...new Set(out)];
}

/** The sizes with a set added: each size once, the ones already there first and in their order. */
export function withSizes(sizes, add) {
  const out = [...(sizes ?? [])];
  for (const size of add) if (size && !out.includes(size)) out.push(size);
  return out;
}
