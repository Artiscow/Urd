/**
 * The themed date picker's calendar (lib/DatePicker.svelte): the month as a grid of days, the week's start and names from the admin language through Intl, and the values the fields keep, `YYYY-MM-DD` as `<input type="date">` gives it and `YYYY-MM-DDTHH:MM` as the countdown's target.
 * Pure, so it is node-tested (tests/date-grid.test.mjs).
 */

const pad = (n) => String(n).padStart(2, '0');

/**
 * The parts of a stored value: the date, and the time to the minute when the value carries one (seconds, which the fields never write, are read past); null for anything else.
 * @param {string|null|undefined} value
 * @returns {{ y: number, m: number, d: number, hh: number|null, mm: number|null }|null}
 */
export function parseDateValue(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::\d{2})?)?$/.exec(String(value ?? '').trim());
  if (!m) return null;
  const parts = { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]), hh: m[4] ? Number(m[4]) : null, mm: m[5] ? Number(m[5]) : null };
  const date = new Date(Date.UTC(parts.y, parts.m - 1, parts.d));
  if (date.getUTCMonth() !== parts.m - 1 || date.getUTCDate() !== parts.d) return null;
  if (parts.hh !== null && (parts.hh > 23 || parts.mm > 59)) return null;
  return parts;
}

/**
 * The stored form of a date, with the time when the field takes one.
 * @param {{ y: number, m: number, d: number, hh?: number|null, mm?: number|null }} parts
 * @param {boolean} withTime
 * @returns {string}
 */
export function formatDateValue(parts, withTime) {
  const date = `${parts.y}-${pad(parts.m)}-${pad(parts.d)}`;
  return withTime ? `${date}T${pad(parts.hh ?? 0)}:${pad(parts.mm ?? 0)}` : date;
}

/**
 * The first day of the week in a language, 1 Monday to 7 Sunday, from Intl where the runtime knows it and Monday otherwise.
 * @param {string} lang
 * @returns {number}
 */
export function weekStartFor(lang) {
  try {
    const locale = new Intl.Locale(lang || 'nb');
    const info = locale.getWeekInfo?.() ?? locale.weekInfo;
    const first = Number(info?.firstDay);
    return first >= 1 && first <= 7 ? first : 1;
  } catch {
    return 1;
  }
}

/**
 * The weekday names in the week's order, short, in the language.
 * @param {string} lang
 * @param {number} weekStart 1 Monday to 7 Sunday
 * @returns {string[]}
 */
export function weekdayNames(lang, weekStart) {
  const fmt = new Intl.DateTimeFormat(lang || 'nb', { weekday: 'short', timeZone: 'UTC' });
  // 2024-01-01 is a Monday; the names come from a week that starts there.
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 1 + ((weekStart - 1 + i) % 7)))));
}

/**
 * The month's name with its year, in the language.
 * @param {number} y
 * @param {number} m 1 to 12
 * @param {string} lang
 * @returns {string}
 */
export function monthName(y, m, lang) {
  return new Intl.DateTimeFormat(lang || 'nb', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, 1)));
}

/**
 * The month as six weeks of seven days, the days before and after the month filled in from its neighbours and marked as outside.
 * @param {number} y
 * @param {number} m 1 to 12
 * @param {number} weekStart 1 Monday to 7 Sunday
 * @returns {Array<{ y: number, m: number, d: number, inMonth: boolean }>} 42 cells
 */
export function monthGrid(y, m, weekStart) {
  const first = new Date(Date.UTC(y, m - 1, 1));
  // getUTCDay gives 0 Sunday to 6 Saturday; the week's first day is 1 Monday to 7 Sunday.
  const firstDow = ((first.getUTCDay() + 6) % 7) + 1;
  const lead = (firstDow - weekStart + 7) % 7;
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(Date.UTC(y, m - 1, 1 - lead + i));
    cells.push({ y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate(), inMonth: date.getUTCMonth() === m - 1 });
  }
  return cells;
}

/**
 * The month `delta` months from a month, the year carried.
 * @param {number} y
 * @param {number} m 1 to 12
 * @param {number} delta
 * @returns {{ y: number, m: number }}
 */
export function shiftMonth(y, m, delta) {
  const total = y * 12 + (m - 1) + delta;
  return { y: Math.floor(total / 12), m: (total % 12 + 12) % 12 + 1 };
}

/**
 * A date moved by days, as the arrow keys move the focus on the grid.
 * @param {{ y: number, m: number, d: number }} parts
 * @param {number} days
 * @returns {{ y: number, m: number, d: number }}
 */
export function shiftDays(parts, days) {
  const date = new Date(Date.UTC(parts.y, parts.m - 1, parts.d + days));
  return { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate() };
}

/**
 * Today's date parts in the runtime's own zone, as the picker marks today and starts from it.
 * @param {Date} [now]
 * @returns {{ y: number, m: number, d: number }}
 */
export function todayParts(now = new Date()) {
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

/**
 * The value as the field shows it: the date in the language's own order, the time after it when the value carries one; empty for no value.
 * @param {string|null|undefined} value
 * @param {string} lang
 * @returns {string}
 */
export function formatDateLabel(value, lang) {
  const parts = parseDateValue(value);
  if (!parts) return '';
  const date = new Intl.DateTimeFormat(lang || 'nb', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(parts.y, parts.m - 1, parts.d)));
  return parts.hh === null ? date : `${date} ${pad(parts.hh)}:${pad(parts.mm)}`;
}
