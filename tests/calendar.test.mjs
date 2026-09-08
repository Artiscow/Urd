/**
 * Contract tests for the calendar plugin's pure ICS module (parser, recurrence expansion and the conventions).
 * DOM rendering and fetching are tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseIcs, expandEvents, partsToMs,
  splitCategory, findSignupLink, normalizeSourceUrl, subscribeLinks,
} from '../template/plugins/calendar/ics.js';

// The ICS fixtures carry deliberate Norwegian event content (titles, locations, signup lines): calendar feeds are user data.
const wrap = (body) => `BEGIN:VCALENDAR\r\nX-WR-CALNAME:Testkalender\r\n${body}\r\nEND:VCALENDAR\r\n`;

const event = (lines) => wrap(`BEGIN:VEVENT\r\n${lines.join('\r\n')}\r\nEND:VEVENT`);

test('parser: calendar name, fields and unfolded continuation lines', () => {
  const { name, events } = parseIcs(event([
    'UID:a1',
    'SUMMARY:Konsert: Vårslepp med et veldig lang',
    ' t navn',
    'DESCRIPTION:Linje en\\nPåmelding: https://forening.no/pameld?x=1\\, gratis',
    'LOCATION:Klubbhuset\\, 2. etg',
    'DTSTART:20260910T180000Z',
    'DTEND:20260910T200000Z',
  ]));
  assert.equal(name, 'Testkalender');
  assert.equal(events.length, 1);
  assert.equal(events[0].summary, 'Konsert: Vårslepp med et veldig langt navn');
  assert.equal(events[0].location, 'Klubbhuset, 2. etg');
  assert.match(events[0].description, /Linje en\nPåmelding/);
});

test('date forms: UTC, all-day and TZID convert correctly', () => {
  const { events } = parseIcs(wrap([
    'BEGIN:VEVENT', 'UID:u', 'SUMMARY:UTC', 'DTSTART:20260601T120000Z', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:h', 'SUMMARY:Heldag', 'DTSTART;VALUE=DATE:20260601', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:o', 'SUMMARY:Oslo', 'DTSTART;TZID=Europe/Oslo:20260601T140000', 'END:VEVENT',
  ].join('\r\n')));
  assert.equal(events.length, 3);
  assert.equal(partsToMs(events[0].start), Date.UTC(2026, 5, 1, 12));
  assert.equal(events[1].start.allDay, true);
  // June 1 is daylight saving time in Oslo (UTC+2): 14:00 wall time = 12:00 UTC.
  assert.equal(partsToMs(events[2].start), Date.UTC(2026, 5, 1, 12));
});

test('single event: lands in the window with duration from DTEND', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:x', 'SUMMARY:Møte', 'DTSTART:20260910T180000Z', 'DTEND:20260910T193000Z',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) });
  assert.equal(occs.length, 1);
  assert.equal(occs[0].end - occs[0].start, 90 * 60 * 1000);
});

test('RRULE WEEKLY with BYDAY and COUNT: correct days, correct count', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:w', 'SUMMARY:Trening',
    'DTSTART;TZID=Europe/Oslo:20260901T190000',
    'RRULE:FREQ=WEEKLY;BYDAY=TU,TH;COUNT=5',
  ])).events, { from: Date.UTC(2026, 7, 1), to: Date.UTC(2026, 11, 1) });
  assert.equal(occs.length, 5);
  // September 1, 2026 is a Tuesday; the pattern becomes Tue-Thu-Tue-Thu-Tue.
  const days = occs.map((o) => new Date(o.start).getUTCDay());
  assert.deepEqual(days, [2, 4, 2, 4, 2]);
});

test('RRULE with UNTIL and EXDATE: stops and skips', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:u2', 'SUMMARY:Ukesmøte',
    'DTSTART:20260901T170000Z',
    'RRULE:FREQ=WEEKLY;UNTIL=20260929T170000Z',
    'EXDATE:20260915T170000Z',
  ])).events, { from: Date.UTC(2026, 7, 1), to: Date.UTC(2026, 11, 1) });
  // September 1, 8, 22 and 29 (the 15th is EXDATE, UNTIL is inclusive).
  assert.equal(occs.length, 4);
  assert.ok(!occs.some((o) => o.start === Date.UTC(2026, 8, 15, 17)));
});

test('RRULE MONTHLY with ordinal BYDAY (2TU): second Tuesday every month', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:m', 'SUMMARY:Styremøte',
    'DTSTART:20260908T180000Z',
    'RRULE:FREQ=MONTHLY;BYDAY=2TU;COUNT=3',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2027, 0, 1) });
  assert.equal(occs.length, 3);
  const dates = occs.map((o) => new Date(o.start).getUTCDate());
  // Second Tuesday of Sep/Oct/Nov 2026: the 8th, 13th and 10th.
  assert.deepEqual(dates, [8, 13, 10]);
});

test('RECURRENCE-ID: the override replaces the base occurrence', () => {
  const occs = expandEvents(parseIcs(wrap([
    'BEGIN:VEVENT', 'UID:r', 'SUMMARY:Kurs',
    'DTSTART:20260901T170000Z', 'RRULE:FREQ=WEEKLY;COUNT=3', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:r', 'SUMMARY:Kurs (flyttet)',
    'RECURRENCE-ID:20260908T170000Z', 'DTSTART:20260909T180000Z', 'END:VEVENT',
  ].join('\r\n'))).events, { from: Date.UTC(2026, 7, 1), to: Date.UTC(2026, 11, 1) });
  assert.equal(occs.length, 3);
  const moved = occs.find((o) => o.summary.includes('flyttet'));
  assert.equal(moved.start, Date.UTC(2026, 8, 9, 18));
  assert.ok(!occs.some((o) => o.start === Date.UTC(2026, 8, 8, 17)));
});

test('STATUS:CANCELLED gives no occurrence', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:c', 'SUMMARY:Avlyst', 'STATUS:CANCELLED', 'DTSTART:20260910T180000Z',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) });
  assert.equal(occs.length, 0);
});

test('splitCategory: the "Category: Title" convention', () => {
  assert.deepEqual(splitCategory('Konsert: Vårslepp'), { category: 'Konsert', title: 'Vårslepp' });
  assert.deepEqual(splitCategory('Vanlig tittel uten kategori'), { category: null, title: 'Vanlig tittel uten kategori' });
  // URL colons are not categories.
  assert.equal(splitCategory('https://x.no').category, null);
});

test('findSignupLink: a signup line is preferred, otherwise the first URL', () => {
  const desc = 'Les mer: https://forening.no/om\nPåmelding: https://forening.no/pameld';
  assert.equal(findSignupLink(desc), 'https://forening.no/pameld');
  assert.equal(findSignupLink('Se https://a.no/info.'), 'https://a.no/info');
  assert.equal(findSignupLink('Ingen lenke her'), null);
});

test('normalizeSourceUrl: webcal, http upgrade and Google id', () => {
  assert.equal(normalizeSourceUrl('webcal://x.no/kal.ics'), 'https://x.no/kal.ics');
  assert.equal(normalizeSourceUrl('http://x.no/kal.ics'), 'https://x.no/kal.ics');
  assert.equal(
    normalizeSourceUrl('abc123@group.calendar.google.com'),
    'https://calendar.google.com/calendar/ical/abc123%40group.calendar.google.com/public/basic.ics',
  );
  assert.equal(normalizeSourceUrl('ikke en kilde'), null);
});

test('subscribeLinks: webcal always, Google link for Google sources', () => {
  const google = subscribeLinks('abc@gmail.com');
  assert.match(google.webcal, /^webcal:\/\/calendar\.google\.com\//);
  assert.match(google.google, /^https:\/\/calendar\.google\.com\/calendar\/r\?cid=/);
  const plain = subscribeLinks('https://forening.no/kal.ics');
  assert.equal(plain.webcal, 'webcal://forening.no/kal.ics');
  assert.equal(plain.google, null);
});
