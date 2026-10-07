/**
 * The calendar's time and week rules (calendar-format.js): the clock, the
 * first day of the week, an event's end, a span of days and the time zone.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  calClock12, calWeekStart, formatClock, formatHour, formatPercent, daysBetween, leadDays, orderWeekdays, startOfWeek, isMultiDay, timeRange,
  zoneValid, zoneOffsetMs, shiftToZone, zoneDiffers, localOffsetMs,
  dateTimeAttr,
} = await engineImport('calendar-format.js');

test('calClock12: 24 hours unless the block asks for 12', () => {
  assert.equal(calClock12({ clock: '12' }), true);
  assert.equal(calClock12({ clock: '24' }), false);
  assert.equal(calClock12({}), false);
  assert.equal(calClock12(undefined), false);
  assert.equal(calClock12({ clock: 'noon' }), false);
});

test('calWeekStart: the choice of the block first, then the language, Monday for an unknown one', () => {
  assert.equal(calWeekStart({ weekStart: 'sun' }, 'nb'), 0);
  assert.equal(calWeekStart({ weekStart: 'mon' }, 'en-US'), 1);
  assert.equal(calWeekStart({}, 'nb'), 1);
  assert.equal(calWeekStart({}, 'not a language'), 1);
});

/** Intl writes narrow and non-breaking spaces between its parts: compared as plain spaces. */
const plain = (text) => text.replace(/\s/g, ' ');

test('formatClock: 24 hours with two digits, 12 hours as the language writes them', () => {
  assert.equal(formatClock(18, 0, false), '18:00');
  assert.equal(formatClock(9, 5, false, 'tr'), '09:05');
  assert.equal(plain(formatClock(18, 0, true, 'en-GB')), '6:00 pm');
  assert.equal(plain(formatClock(0, 30, true, 'en-GB')), '12:30 am');
  assert.equal(plain(formatClock(12, 0, true, 'en-GB')), '12:00 pm');
  assert.match(formatClock(18, 0, true, 'tr'), /^ÖS\s6:00$/, 'Turkish writes the half of the day first');
  assert.match(formatClock(18, 0, true, 'nb'), /^6:00\s/, 'Norwegian has its own words for the halves');
  assert.equal(formatClock(18, 0, true, 'no'), formatClock(18, 0, true, 'nb'), 'the legacy tag is Norwegian');
});

test('formatHour and formatPercent: an hour on a plan\'s axis and a share, in the language\'s form', () => {
  assert.equal(formatHour(8, false), '08');
  assert.equal(plain(formatHour(13, true, 'en-GB')), '1 pm');
  assert.match(formatHour(13, true, 'tr'), /^ÖS\s1$/);
  assert.equal(plain(formatPercent(0.45, 'nb')), '45 %');
  assert.equal(formatPercent(0.45, 'en-GB'), '45%');
  assert.equal(formatPercent(0.45, 'tr'), '%45');
});

test('daysBetween: whole calendar days, not hours, across a night and a change of clock', () => {
  assert.equal(daysBetween(new Date(2026, 9, 7, 23, 30).getTime(), new Date(2026, 9, 8, 1, 0).getTime()), 1, 'tomorrow at 01:00 is tomorrow');
  assert.equal(daysBetween(new Date(2026, 9, 7, 0, 10).getTime(), new Date(2026, 9, 7, 23, 50).getTime()), 0);
  assert.equal(daysBetween(new Date(2026, 9, 24, 12, 0).getTime(), new Date(2026, 9, 26, 12, 0).getTime()), 2, 'the weekend the clocks go back');
  assert.equal(daysBetween(new Date(2026, 2, 28, 12, 0).getTime(), new Date(2026, 2, 30, 0, 30).getTime()), 2, 'the weekend the clocks go forward');
  assert.equal(daysBetween(new Date(2026, 9, 8).getTime(), new Date(2026, 9, 7).getTime()), -1);
});

test('the week: lead cells, weekday order and the start of a week follow the first day', () => {
  const thursday = new Date(2026, 9, 1);
  assert.equal(leadDays(thursday, 1), 3);
  assert.equal(leadDays(thursday, 0), 4);
  const names = ['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'];
  assert.deepEqual(orderWeekdays(names, 1), names);
  assert.deepEqual(orderWeekdays(names, 0), ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør']);
  assert.equal(new Date(startOfWeek(thursday.getTime(), 1)).getDate(), 28);
  assert.equal(new Date(startOfWeek(thursday.getTime(), 0)).getDate(), 27);
});

test('isMultiDay and timeRange: the end is written when the feed gave one', () => {
  const start = new Date(2026, 9, 4, 18, 0).getTime();
  const sameDay = { start, end: new Date(2026, 9, 4, 21, 0).getTime(), hasEnd: true };
  assert.equal(isMultiDay(sameDay), false);
  assert.deepEqual(timeRange(sameDay, false), { from: '18:00', to: '21:00' });
  assert.deepEqual(Object.fromEntries(Object.entries(timeRange(sameDay, true, 'en-GB')).map(([k, v]) => [k, plain(v)])), { from: '6:00 pm', to: '9:00 pm' });
  assert.deepEqual(timeRange({ ...sameDay, hasEnd: false }, false), { from: '18:00', to: null });
  assert.equal(isMultiDay({ start, end: new Date(2026, 9, 6, 12, 0).getTime() }), true);
  assert.equal(isMultiDay({ start }), false);
});

test('time zones: a known name, its offset, and a time moved to its clock', () => {
  assert.equal(zoneValid('Europe/Oslo'), true);
  assert.equal(zoneValid('Mars/Olympus'), false);
  assert.equal(zoneValid(''), false);
  const summer = Date.UTC(2026, 6, 1, 12, 0);
  const winter = Date.UTC(2026, 0, 1, 12, 0);
  assert.equal(zoneOffsetMs('Europe/Oslo', summer), 2 * 3600000);
  assert.equal(zoneOffsetMs('Europe/Oslo', winter), 3600000);
  assert.equal(zoneOffsetMs('UTC', summer), 0);
  // The shifted time reads, on the local clock, what the zone's clock shows.
  const shifted = new Date(shiftToZone(summer, 'Asia/Tokyo'));
  assert.equal(shifted.getHours(), 21);
  assert.equal(zoneDiffers('UTC', summer), localOffsetMs(summer) !== 0);
});

test('dateTimeAttr: a day for a date, the moment for a timed event with its clock', () => {
  const day = new Date(2026, 9, 5, 18, 30);
  assert.equal(dateTimeAttr(day), '2026-10-05');
  assert.equal(dateTimeAttr(day.getTime()), '2026-10-05');
  const occ = { start: day.getTime(), end: day.getTime() + 3600000, allDay: false };
  assert.equal(dateTimeAttr(occ), '2026-10-05');
  assert.equal(dateTimeAttr(occ, true), day.toISOString());
  // A time moved to the site's zone keeps the true moment in `real`.
  assert.equal(dateTimeAttr({ ...occ, real: Date.UTC(2026, 9, 5, 12, 0) }, true), '2026-10-05T12:00:00.000Z');
  assert.equal(dateTimeAttr({ ...occ, allDay: true }, true), '2026-10-05');
  assert.equal(dateTimeAttr({ ...occ, cancelled: true }, true), null);
  assert.equal(dateTimeAttr({ ...occ, cancelled: true }), '2026-10-05');
  assert.equal(dateTimeAttr(null), null);
  assert.equal(dateTimeAttr({}), null);
  assert.equal(dateTimeAttr(new Date(NaN)), null);
});

test('shiftToZone: the zone clock is read at the shifted moment, also near the visitor own change of clock', () => {
  const before = process.env.TZ;
  try {
    for (const visitor of ['America/New_York', 'Europe/Oslo', 'Asia/Tokyo']) {
      process.env.TZ = visitor;
      // 1 November 2026, 05:00 UTC: 06:00 in Oslo, an hour before New York changes its clock.
      assert.equal(new Date(shiftToZone(Date.UTC(2026, 10, 1, 5), 'Europe/Oslo')).getHours(), 6, visitor);
      // Every half hour of the weeks around both changes: the visitor's clock reads what the zone's clock reads, except at a time the visitor's clock skips.
      const zone = visitor === 'Europe/Oslo' ? 'America/New_York' : 'Europe/Oslo';
      let wrong = 0;
      for (const [y, m, d] of [[2026, 2, 6], [2026, 2, 26], [2026, 9, 22], [2026, 9, 29]]) {
        for (let step = 0; step < 6 * 48; step++) {
          const ms = Date.UTC(y, m, d) + step * 1800000;
          const want = new Date(ms + zoneOffsetMs(zone, ms));
          const got = new Date(shiftToZone(ms, zone));
          const same = got.getHours() === want.getUTCHours() && got.getMinutes() === want.getUTCMinutes() && got.getDate() === want.getUTCDate();
          // A wall time the visitor's clock skips cannot be read on it: a date made for it lands an hour on, and so does the shift.
          const made = new Date(want.getUTCFullYear(), want.getUTCMonth(), want.getUTCDate(), want.getUTCHours(), want.getUTCMinutes());
          const skipped = made.getHours() !== want.getUTCHours();
          if (skipped) assert.equal(got.getTime(), made.getTime(), `${visitor} ${new Date(ms).toISOString()}`);
          else if (!same) wrong++;
        }
      }
      assert.equal(wrong, 0, visitor);
    }
  } finally {
    if (before == null) delete process.env.TZ;
    else process.env.TZ = before;
  }
});
