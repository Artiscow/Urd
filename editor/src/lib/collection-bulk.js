/**
 * Several entries at once in the Collections panel (panels/collections/SelectionBar.svelte and the collection's menu): which entries fit which kind of collection, the ticks with a run and all shown, the copies placed under their originals, the moves between collections, and one field set or cleared on many.
 * Pure, node-tested (tests/collection-bulk.test.mjs).
 */

/** The fields only a product has (kind products). */
export const PRODUCT_FIELDS = ['price', 'memberPrice', 'badge', 'sizes', 'colors', 'requireSize', 'requireColor', 'disableUntilChosen', 'quantity'];

/** The fields only the dated kinds have: the date and the link the title follows (news, notices, publications and custom). */
export const DATED_FIELDS = ['date', 'page', 'target', 'href', 'newTab', 'rel', 'download'];

export const KINDS = ['news', 'notices', 'publications', 'products', 'custom'];

const has = (entry, field) => entry?.[field] !== undefined && entry[field] !== null && entry[field] !== '';

/**
 * Whether entries fit a kind of collection: a product's fields fit only a product collection, a date or a link only the others.
 * @returns {{fits: boolean, reason: 'productFields'|'datedFields'|null}}
 */
export function entriesFit(entries, kind) {
  const list = entries ?? [];
  if (kind === 'products') {
    return list.some((e) => DATED_FIELDS.some((f) => has(e, f))) ? { fits: false, reason: 'datedFields' } : { fits: true, reason: null };
  }
  return list.some((e) => PRODUCT_FIELDS.some((f) => has(e, f))) ? { fits: false, reason: 'productFields' } : { fits: true, reason: null };
}

/** The kinds a collection may change to: every kind its entries fit, its own among them. */
export function kindsFor(collection) {
  return KINDS.map((kind) => ({ kind, ...entriesFit(collection?.entries, kind) }));
}

/** The ids from the anchor to the id pressed, both included, in the order shown; a missing anchor gives the id alone. */
export function tickRun(shownIds, anchor, id) {
  const a = shownIds.indexOf(anchor);
  const b = shownIds.indexOf(id);
  if (a < 0 || b < 0) return b < 0 ? [] : [id];
  return shownIds.slice(Math.min(a, b), Math.max(a, b) + 1);
}

/** The ticks with ids added or taken away, in no particular order and each once. */
export function withTicks(ticked, ids, on) {
  const set = new Set(ticked);
  for (const id of ids) {
    if (on) set.add(id);
    else set.delete(id);
  }
  return [...set];
}

/** How many ticked entries the search hides. */
export function hiddenTicks(ticked, shownIds) {
  const shown = new Set(shownIds);
  return ticked.filter((id) => !shown.has(id)).length;
}

/** The ticks that still name an entry of the collection (a deletion or an undo may take some away). */
export function liveTicks(ticked, entries) {
  const ids = new Set((entries ?? []).map((e) => e.id));
  return ticked.filter((id) => ids.has(id));
}

/** An id not in use: the entry's own where it is free, else a fresh one. */
function freeId(id, used, makeId) {
  let next = id && !used.has(id) ? id : makeId('entry');
  while (used.has(next)) next = makeId('entry');
  used.add(next);
  return next;
}

/**
 * Copies of the entries named, each placed right under its original with an id of its own.
 * @returns {{entries: Array, copyIds: string[]}}
 */
export function withCopies(entries, ids, makeId) {
  const wanted = new Set(ids);
  const used = new Set(entries.map((e) => e.id));
  const out = [];
  const copyIds = [];
  for (const entry of entries) {
    out.push(entry);
    if (!wanted.has(entry.id)) continue;
    const copy = structuredClone(entry);
    copy.id = freeId(null, used, makeId);
    copyIds.push(copy.id);
    out.push(copy);
  }
  return { entries: out, copyIds };
}

/**
 * The entries named, carried from one collection's list to another's: moved (they leave the first) or copied (fresh ids); an id the second list already holds is given a new one.
 * The carried entries go last in the second list, where a product stays in the order the panel keeps, and a dated entry stands by its date anyway.
 * @returns {{from: Array, to: Array, carriedIds: string[]}}
 */
export function carryEntries(fromEntries, toEntries, ids, copy, makeId) {
  const wanted = new Set(ids);
  const used = new Set(toEntries.map((e) => e.id));
  const carried = [];
  for (const entry of fromEntries) {
    if (!wanted.has(entry.id)) continue;
    const moved = structuredClone(entry);
    moved.id = freeId(copy ? null : entry.id, used, makeId);
    carried.push(moved);
  }
  return {
    from: copy ? fromEntries : fromEntries.filter((e) => !wanted.has(e.id)),
    to: [...toEntries, ...carried],
    carriedIds: carried.map((e) => e.id),
  };
}

/** The fields «Set a field» offers for a kind, each with the input it takes. */
export function settableFields(kind) {
  if (kind === 'products') {
    return [
      { field: 'badge', labelKey: 'lbl.productBadge', input: 'text' },
      { field: 'price', labelKey: 'lbl.price', input: 'number' },
      { field: 'memberPrice', labelKey: 'lbl.memberPrice', input: 'number' },
    ];
  }
  return [{ field: 'date', labelKey: 'lbl.date', input: 'date' }];
}

/**
 * The entries with one field set on those named, or cleared where the value is empty; a number field takes a number from 0 up, and anything else leaves the entries as they were.
 * @returns {Array|null} null when the value does not fit the field
 */
export function withField(entries, ids, field, value) {
  const spec = [...settableFields('products'), ...settableFields('news')].find((f) => f.field === field);
  if (!spec) return null;
  let next = value;
  if (value !== '' && spec.input === 'number') {
    next = Number(value);
    if (!Number.isFinite(next) || next < 0) return null;
  }
  if (value !== '' && spec.input === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return null;
  const wanted = new Set(ids);
  return entries.map((entry) => {
    if (!wanted.has(entry.id)) return entry;
    const out = { ...entry };
    if (value === '') delete out[field];
    else out[field] = next;
    return out;
  });
}
