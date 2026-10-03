/**
 * How the calendar block writes times and lays out weeks: the pure rules
 * behind the clock (24 or 12 hours), the first day of the week, an event's
 * end, a span over several days, and the time zone the times are shown in.
 * The clock is 24 hours unless the block asks for 12 (`clock`), and the site
 * language decides the week unless the block says otherwise (`weekStart`); the site's own time zone, when set, is the
 * zone every visitor sees the times in. Loaded by the block on its first
 * render, with ics.js and the design model, never in the visitor closure; it
 * never touches the DOM.
 */

/** The block's own choices: the clock is 24 hours unless set to 12; the week's `auto` (or nothing) follows the site language. */
export const CAL_CLOCKS = ['24', '12'];
export const CAL_WEEK_STARTS = ['auto', 'mon', 'sun'];

/** A language tag Intl accepts: the legacy `no` is Bokmål, anything unknown the browser's own. */
function localeOf(lang) {
  const tag = lang === 'no' ? 'nb' : lang;
  try {
    return Intl.getCanonicalLocales(tag)[0];
  } catch {
    return undefined;
  }
}

/** True when times are written with a 12-hour clock: only when the block asks for it; 24 hours is the default in every language. */
export function calClock12(props) {
  return props?.clock === '12';
}

/** The first day of the week as Date.getDay() counts (0 Sunday, 1 Monday): the block's choice, else the language's, else Monday. */
export function calWeekStart(props, lang) {
  if (props?.weekStart === 'sun') return 0;
  if (props?.weekStart === 'mon') return 1;
  try {
    const locale = new Intl.Locale(localeOf(lang) ?? 'nb');
    const info = typeof locale.getWeekInfo === 'function' ? locale.getWeekInfo() : locale.weekInfo;
    // Intl counts Monday as 1 and Sunday as 7.
    if (info?.firstDay === 7) return 0;
    if (info?.firstDay >= 1 && info.firstDay <= 6) return info.firstDay;
  } catch { /* an unknown language starts the week on Monday */ }
  return 1;
}

const two = (n) => String(n).padStart(2, '0');

/** A time of day as text: «18:00», or «6:00 pm» on a 12-hour clock. */
export function formatClock(hours, minutes, clock12) {
  if (!clock12) return `${two(hours)}:${two(minutes)}`;
  const h = hours % 12 === 0 ? 12 : hours % 12;
  return `${h}:${two(minutes)} ${hours < 12 ? 'am' : 'pm'}`;
}

/** The empty cells before the first of a month in a grid whose weeks start on weekStart. */
export function leadDays(first, weekStart) {
  return (first.getDay() - weekStart + 7) % 7;
}

/** Weekday names given Monday first, in the order of a week that starts on weekStart. */
export function orderWeekdays(mondayFirst, weekStart) {
  const shift = (weekStart + 6) % 7;
  return [...mondayFirst.slice(shift), ...mondayFirst.slice(0, shift)];
}

/** 00:00 (local time) of the first day of the week a time falls in. */
export function startOfWeek(ms, weekStart) {
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - leadDays(d, weekStart));
  return d.getTime();
}

const dayKey = (ms) => {
  const d = new Date(ms);
  return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
};

/** True when the event ends on a later day than it starts. */
export function isMultiDay(occ) {
  return Number.isFinite(occ?.end) && dayKey(occ.end) > dayKey(occ.start);
}

/**
 * The start and the end of a timed event as clock texts. `to` is null when
 * the feed gave no end, when the end is the start, or when the event ends on
 * another day (the date then tells the end).
 * @returns {{from: string, to: string|null}}
 */
export function timeRange(occ, clock12) {
  const start = new Date(occ.start);
  const from = formatClock(start.getHours(), start.getMinutes(), clock12);
  if (!occ.hasEnd || !(occ.end > occ.start)) return { from, to: null };
  const end = new Date(occ.end);
  return { from, to: formatClock(end.getHours(), end.getMinutes(), clock12) };
}

/** True for a time zone name Intl knows («Europe/Oslo»). */
export function zoneValid(zone) {
  if (typeof zone !== 'string' || !zone.trim()) return false;
  try {
    new Intl.DateTimeFormat('en', { timeZone: zone.trim() });
    return true;
  } catch {
    return false;
  }
}

/** A zone's offset from UTC at a time, in ms (positive east of Greenwich). */
export function zoneOffsetMs(zone, ms) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).formatToParts(new Date(ms));
  const get = (type) => Number(parts.find((part) => part.type === type)?.value);
  const wall = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return wall - Math.floor(ms / 1000) * 1000;
}

/** The visitor's own offset from UTC at a time, in ms. */
export const localOffsetMs = (ms) => -new Date(ms).getTimezoneOffset() * 60000;

/**
 * A time moved so the browser's local clock reads what the zone's clock
 * shows at that time. The views read local hours and dates, so an event
 * shifted this way is drawn in the zone's time whatever zone the visitor is in.
 */
export function shiftToZone(ms, zone) {
  return ms + zoneOffsetMs(zone, ms) - localOffsetMs(ms);
}

/** True when a zone's clock differs from the visitor's at a time. */
export function zoneDiffers(zone, ms) {
  return zoneOffsetMs(zone, ms) !== localOffsetMs(ms);
}

/** A zone's short name at a time, in the language («CEST», «GMT+2»); the visitor's own zone when none is given. */
export function zoneName(zone, ms, lang) {
  try {
    const parts = new Intl.DateTimeFormat(localeOf(lang), { timeZone: zone || undefined, timeZoneName: 'short' }).formatToParts(new Date(ms));
    return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}
