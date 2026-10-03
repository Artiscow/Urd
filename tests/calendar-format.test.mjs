/**
 * The calendar's time and week rules (calendar-format.js): the clock, the
 * first day of the week, an event's end, a span of days and the time zone.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  calClock12, calWeekStart, formatClock, leadDays, orderWeekdays, startOfWeek, isMultiDay, timeRange,
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

test('formatClock: 24 hours with two digits, 12 hours with am and pm', () => {
  assert.equal(formatClock(18, 0, false), '18:00');
  assert.equal(formatClock(9, 5, false), '09:05');
  assert.equal(formatClock(18, 0, true), '6:00 pm');
  assert.equal(formatClock(0, 30, true), '12:30 am');
  assert.equal(formatClock(12, 0, true), '12:00 pm');
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
  assert.deepEqual(timeRange(sameDay, true), { from: '6:00 pm', to: '9:00 pm' });
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
