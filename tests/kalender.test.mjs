/**
 * Kontraktstester for kalender-pluginens rene ICS-modul (parser, gjentakelses-
 * ekspansjon og konvensjonene). DOM-rendering og henting testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseIcs, expandEvents, partsToMs,
  splitCategory, findSignupLink, normalizeSourceUrl, subscribeLinks,
} from '../template/plugins/kalender/ics.js';

const wrap = (body) => `BEGIN:VCALENDAR\r\nX-WR-CALNAME:Testkalender\r\n${body}\r\nEND:VCALENDAR\r\n`;

const event = (lines) => wrap(`BEGIN:VEVENT\r\n${lines.join('\r\n')}\r\nEND:VEVENT`);

test('parser: kalendernavn, felter og utfoldede fortsettelseslinjer', () => {
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

test('datoformer: UTC, heldag og TZID konverteres riktig', () => {
  const { events } = parseIcs(wrap([
    'BEGIN:VEVENT', 'UID:u', 'SUMMARY:UTC', 'DTSTART:20260601T120000Z', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:h', 'SUMMARY:Heldag', 'DTSTART;VALUE=DATE:20260601', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:o', 'SUMMARY:Oslo', 'DTSTART;TZID=Europe/Oslo:20260601T140000', 'END:VEVENT',
  ].join('\r\n')));
  assert.equal(events.length, 3);
  assert.equal(partsToMs(events[0].start), Date.UTC(2026, 5, 1, 12));
  assert.equal(events[1].start.allDay, true);
  // 1. juni er sommertid i Oslo (UTC+2): 14:00 veggtid = 12:00 UTC.
  assert.equal(partsToMs(events[2].start), Date.UTC(2026, 5, 1, 12));
});

test('enkelthendelse: havner i vinduet med varighet fra DTEND', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:x', 'SUMMARY:Møte', 'DTSTART:20260910T180000Z', 'DTEND:20260910T193000Z',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) });
  assert.equal(occs.length, 1);
  assert.equal(occs[0].end - occs[0].start, 90 * 60 * 1000);
});

test('RRULE WEEKLY med BYDAY og COUNT: riktige dager, riktig antall', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:w', 'SUMMARY:Trening',
    'DTSTART;TZID=Europe/Oslo:20260901T190000',
    'RRULE:FREQ=WEEKLY;BYDAY=TU,TH;COUNT=5',
  ])).events, { from: Date.UTC(2026, 7, 1), to: Date.UTC(2026, 11, 1) });
  assert.equal(occs.length, 5);
  // 1. september 2026 er en tirsdag; mønsteret blir ti-to-ti-to-ti.
  const days = occs.map((o) => new Date(o.start).getUTCDay());
  assert.deepEqual(days, [2, 4, 2, 4, 2]);
});

test('RRULE med UNTIL og EXDATE: stopper og hopper over', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:u2', 'SUMMARY:Ukesmøte',
    'DTSTART:20260901T170000Z',
    'RRULE:FREQ=WEEKLY;UNTIL=20260929T170000Z',
    'EXDATE:20260915T170000Z',
  ])).events, { from: Date.UTC(2026, 7, 1), to: Date.UTC(2026, 11, 1) });
  // 1., 8., 22. og 29. september (15. er EXDATE, UNTIL er inklusiv).
  assert.equal(occs.length, 4);
  assert.ok(!occs.some((o) => o.start === Date.UTC(2026, 8, 15, 17)));
});

test('RRULE MONTHLY med ordnet BYDAY (2TU): andre tirsdag hver måned', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:m', 'SUMMARY:Styremøte',
    'DTSTART:20260908T180000Z',
    'RRULE:FREQ=MONTHLY;BYDAY=2TU;COUNT=3',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2027, 0, 1) });
  assert.equal(occs.length, 3);
  const dates = occs.map((o) => new Date(o.start).getUTCDate());
  // Andre tirsdag i sep/okt/nov 2026: 8., 13., 10.
  assert.deepEqual(dates, [8, 13, 10]);
});

test('RECURRENCE-ID: overstyringen erstatter basisforekomsten', () => {
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

test('STATUS:CANCELLED gir ingen forekomst', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:c', 'SUMMARY:Avlyst', 'STATUS:CANCELLED', 'DTSTART:20260910T180000Z',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) });
  assert.equal(occs.length, 0);
});

test('splitCategory: «Kategori: Tittel»-konvensjonen', () => {
  assert.deepEqual(splitCategory('Konsert: Vårslepp'), { category: 'Konsert', title: 'Vårslepp' });
  assert.deepEqual(splitCategory('Vanlig tittel uten kategori'), { category: null, title: 'Vanlig tittel uten kategori' });
  // URL-koloner er ikke kategorier.
  assert.equal(splitCategory('https://x.no').category, null);
});

test('findSignupLink: påmeldingslinje foretrekkes, ellers første URL', () => {
  const desc = 'Les mer: https://forening.no/om\nPåmelding: https://forening.no/pameld';
  assert.equal(findSignupLink(desc), 'https://forening.no/pameld');
  assert.equal(findSignupLink('Se https://a.no/info.'), 'https://a.no/info');
  assert.equal(findSignupLink('Ingen lenke her'), null);
});

test('normalizeSourceUrl: webcal, http-løft og Google-id', () => {
  assert.equal(normalizeSourceUrl('webcal://x.no/kal.ics'), 'https://x.no/kal.ics');
  assert.equal(normalizeSourceUrl('http://x.no/kal.ics'), 'https://x.no/kal.ics');
  assert.equal(
    normalizeSourceUrl('abc123@group.calendar.google.com'),
    'https://calendar.google.com/calendar/ical/abc123%40group.calendar.google.com/public/basic.ics',
  );
  assert.equal(normalizeSourceUrl('ikke en kilde'), null);
});

test('subscribeLinks: webcal alltid, Google-lenke for Google-kilder', () => {
  const google = subscribeLinks('abc@gmail.com');
  assert.match(google.webcal, /^webcal:\/\/calendar\.google\.com\//);
  assert.match(google.google, /^https:\/\/calendar\.google\.com\/calendar\/r\?cid=/);
  const plain = subscribeLinks('https://forening.no/kal.ics');
  assert.equal(plain.webcal, 'webcal://forening.no/kal.ics');
  assert.equal(plain.google, null);
});
