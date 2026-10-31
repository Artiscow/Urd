/**
 * The themed date picker's calendar (editor/src/lib/date-grid.js): the stored values read and written, the month grid, the week's start and the moves on it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDateValue, formatDateValue, weekStartFor, weekdayNames, monthName, monthGrid, shiftMonth, shiftDays, formatDateLabel } from '../editor/src/lib/date-grid.js';

test('a stored value is read with or without its time, and an impossible one is refused', () => {
  assert.deepEqual(parseDateValue('2026-10-31'), { y: 2026, m: 10, d: 31, hh: null, mm: null });
  assert.deepEqual(parseDateValue('2026-10-31T18:05'), { y: 2026, m: 10, d: 31, hh: 18, mm: 5 });
  assert.equal(parseDateValue('2026-02-30'), null);
  assert.equal(parseDateValue('2026-10-31T24:00'), null);
  assert.deepEqual(parseDateValue('2026-10-31T18:05:30'), { y: 2026, m: 10, d: 31, hh: 18, mm: 5 });
  assert.equal(parseDateValue('2026-10-31xyz'), null);
  assert.equal(parseDateValue(''), null);
  assert.equal(parseDateValue(undefined), null);
});

test('a value is written as the fields keep it, the time only when the field takes one', () => {
  assert.equal(formatDateValue({ y: 2026, m: 3, d: 7 }, false), '2026-03-07');
  assert.equal(formatDateValue({ y: 2026, m: 3, d: 7, hh: 9, mm: 30 }, true), '2026-03-07T09:30');
  assert.equal(formatDateValue({ y: 2026, m: 3, d: 7 }, true), '2026-03-07T00:00');
});

test('the week starts where the language says, Monday when the runtime does not know, and the names follow', () => {
  const start = weekStartFor('nb');
  assert.ok(start >= 1 && start <= 7);
  assert.equal(weekStartFor('zz-not-a-language'), 1);
  const names = weekdayNames('en-GB', 1);
  assert.equal(names.length, 7);
  assert.match(names[0], /^Mon/);
  assert.match(weekdayNames('en-GB', 7)[0], /^Sun/);
  assert.match(monthName(2026, 10, 'en-GB'), /October 2026/);
});

test('the month grid holds six weeks with the neighbours filled in and marked outside', () => {
  // October 2026 starts on a Thursday: three lead days from September with a Monday start.
  const grid = monthGrid(2026, 10, 1);
  assert.equal(grid.length, 42);
  assert.deepEqual(grid.slice(0, 4).map((c) => [c.m, c.d, c.inMonth]), [[9, 28, false], [9, 29, false], [9, 30, false], [10, 1, true]]);
  assert.equal(grid.filter((c) => c.inMonth).length, 31);
  // With a Sunday start the lead is four days.
  assert.deepEqual(monthGrid(2026, 10, 7)[4], { y: 2026, m: 10, d: 1, inMonth: true });
});

test('months and days shift with the year carried', () => {
  assert.deepEqual(shiftMonth(2026, 12, 1), { y: 2027, m: 1 });
  assert.deepEqual(shiftMonth(2026, 1, -1), { y: 2025, m: 12 });
  assert.deepEqual(shiftMonth(2026, 6, -18), { y: 2024, m: 12 });
  assert.deepEqual(shiftDays({ y: 2026, m: 10, d: 31 }, 1), { y: 2026, m: 11, d: 1 });
  assert.deepEqual(shiftDays({ y: 2026, m: 3, d: 1 }, -1), { y: 2026, m: 2, d: 28 });
  assert.deepEqual(shiftDays({ y: 2026, m: 10, d: 31 }, -7), { y: 2026, m: 10, d: 24 });
});

test('the field shows the date in the language with the time after it, and nothing for no value', () => {
  assert.match(formatDateLabel('2026-10-31', 'en-GB'), /31 Oct 2026/);
  assert.match(formatDateLabel('2026-10-31T18:05', 'en-GB'), /31 Oct 2026 18:05/);
  assert.equal(formatDateLabel('', 'en-GB'), '');
  assert.equal(formatDateLabel('nonsense', 'nb'), '');
});
