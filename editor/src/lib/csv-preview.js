/**
 * What the CSV import's three previews show of a plan (engine/collections-csv.js importPlan): the groups in the order they are read, the chips that filter them, a row's line under its title, and a cell of the table with the value it had.
 * Shared by panels/collections/ImportDialog.svelte, ImportStep.svelte and ImportTable.svelte. Pure, node-tested (tests/csv-preview.test.mjs).
 */

/** The groups in the order the preview lists them: what needs the owner first, what changes nothing last. */
export const STATUSES = ['refused', 'new', 'changed', 'skipped', 'same', 'missing'];

/** The fields whose values a changed row shows, old to new; any other changed field is named alone. */
const VALUE_FIELDS = ['title', 'date', 'price', 'memberPrice', 'badge', 'sizes', 'colors', 'quantity'];

/** The plan's items grouped by status, in the preview's order, each group only where it has items, narrowed to one status when a chip is chosen. */
export function groupsOf(plan, filter = 'all') {
  if (!plan) return [];
  return STATUSES
    .filter((status) => filter === 'all' || filter === status)
    .map((status) => ({ status, items: plan.items.filter((item) => item.status === status) }))
    .filter((group) => group.items.length);
}

/** The chips over the list: all, then each status the plan has, with its count. */
export function chipsOf(plan) {
  if (!plan) return [];
  const total = plan.items.length;
  return [{ status: 'all', n: total }, ...STATUSES.filter((s) => plan.counts[s]).map((s) => ({ status: s, n: plan.counts[s] }))];
}

/**
 * A field's value as the preview writes it: the title in words, lists with commas, the quantity's least and most.
 * @param {string} field
 * @param {object} entry
 * @param {(html: string) => string} plain The editor's plainTitle
 */
export function shownValue(field, entry, plain) {
  const v = entry?.[field];
  if (v === undefined || v === null || v === '') return '';
  if (field === 'title') return plain(v);
  if (field === 'sizes') return v.join(', ');
  if (field === 'colors') return v.map((c) => c.name).join(', ');
  if (field === 'quantity') return `${v.min ?? 1}-${v.max ?? 99}`;
  return String(v);
}

/** One change of a changed row: the field, and its value before and after where the field has one to show. */
export function changeOf(field, before, after, plain) {
  if (!VALUE_FIELDS.includes(field)) return { field };
  return { field, from: shownValue(field, before, plain), to: shownValue(field, after, plain) };
}

/** What a new or unchanged entry's line says: a product's price and sizes, another entry's date. */
export function summaryOf(entry, kind) {
  if (kind === 'products') return [entry.price != null ? String(entry.price) : '', (entry.sizes ?? []).join(', ')].filter(Boolean).join(' · ');
  return entry.date ?? '';
}

/**
 * A cell of the table: what the file says for the column, and what the entry held before where the row changes it.
 * A refused row shows the file's own cell; an entry the file does not name shows its own value.
 * @param {object} item A plan item
 * @param {string} column
 * @param {(entry: object, column: string) => string} csvCell The cell as the export writes it (engine/collections-csv.js, with the page register)
 * @returns {{text: string, was: string|null, bad: boolean}}
 */
export function cellOf(item, column, csvCell) {
  if (item.status === 'refused') {
    return { text: String(item.cells?.[column] ?? ''), was: null, bad: item.problem?.column === column };
  }
  const now = item.status === 'skipped' ? item.after : item.entry;
  const text = String(csvCell(now, column));
  const before = item.status === 'changed' ? item.before : item.status === 'skipped' ? item.entry : null;
  const was = before ? String(csvCell(before, column)) : null;
  return { text, was: was !== null && was !== text ? was : null, bad: false };
}
