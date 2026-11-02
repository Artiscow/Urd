/**
 * The Collections panel's layouts and the rules they share (panels/CollectionsPanel.svelte): stepping in from the collections to the entries to one entry (the default), two columns in a widened panel, or a table over the page with the entry in a drawer.
 * Pure, node-tested (tests/collection-layout.test.mjs).
 */

/** The layouts, the first the default. */
export const COLLECTION_LAYOUTS = ['drill', 'columns', 'table'];

/** The stored layout, the default for anything else. */
export function collectionLayoutOf(raw) {
  return COLLECTION_LAYOUTS.includes(raw) ? raw : 'drill';
}

/** Whether the page keeps an entry where the panel puts it: a product always, another kind's entry while it has no date, since the collection block sorts dated entries by their date (collections.js). */
export function movable(kind, entry) {
  return kind === 'products' || !entry?.date;
}

/** Whether another colour of the entry has the same name, read as a buyer reads it (case and spaces aside). */
export function sameColorName(colors, index) {
  const name = (colors?.[index]?.name ?? '').trim().toLowerCase();
  return Boolean(name) && colors.some((c, j) => j !== index && (c?.name ?? '').trim().toLowerCase() === name);
}

/**
 * Whether an entry answers a search: every word of the query in its title, text, date, badge, sizes or colour names.
 * `plain` turns the rich title and text into their words (the editor's plainTitle, which parses rather than strips).
 * @param {object} entry
 * @param {string} query
 * @param {(html: string) => string} plain
 */
export function entryMatches(entry, query, plain) {
  const words = String(query ?? '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = [
    plain(entry?.title ?? ''),
    plain(entry?.text ?? ''),
    entry?.date ?? '',
    entry?.badge ?? '',
    ...(Array.isArray(entry?.sizes) ? entry.sizes : []),
    ...(Array.isArray(entry?.colors) ? entry.colors.map((c) => c?.name ?? '') : []),
  ].join(' ').toLowerCase();
  return words.every((w) => hay.includes(w));
}

/**
 * An entry's place among the ids shown: its index, the count and its neighbours, for the arrows that step to the entry before or after.
 * @param {string[]} ids
 * @param {string} id
 * @returns {{index: number, count: number, prev: string|null, next: string|null}|null}
 */
export function entryPosition(ids, id) {
  const index = ids.indexOf(id);
  if (index < 0) return null;
  return { index, count: ids.length, prev: ids[index - 1] ?? null, next: ids[index + 1] ?? null };
}

/** The entry to choose once one is deleted: the one after it, else the one before, else none. */
export function afterRemoval(ids, id) {
  const at = entryPosition(ids, id);
  if (!at) return null;
  return at.next ?? at.prev;
}

/** The table's columns after the picture and the title, by the collection's kind: a product's price, member price, sizes, colours and badge; another kind's date and text. */
export function tableColumns(kind) {
  if (kind === 'products') {
    return [
      { key: 'price', labelKey: 'lbl.price', numeric: true },
      { key: 'memberPrice', labelKey: 'lbl.memberPrice', numeric: true },
      { key: 'sizes', labelKey: 'lbl.sizes' },
      { key: 'colors', labelKey: 'lbl.colors' },
      { key: 'badge', labelKey: 'lbl.productBadge' },
    ];
  }
  return [
    { key: 'date', labelKey: 'lbl.date' },
    { key: 'text', labelKey: 'lbl.text' },
  ];
}

/** A cell's words, empty for a field the entry does not have. */
export function cellText(key, entry, plain) {
  const v = entry?.[key];
  if (v == null || v === '') return '';
  if (key === 'sizes') return Array.isArray(v) ? v.join(', ') : '';
  if (key === 'colors') return Array.isArray(v) ? v.map((c) => c?.name ?? '').filter(Boolean).join(', ') : '';
  if (key === 'text') return plain(String(v));
  return String(v);
}
