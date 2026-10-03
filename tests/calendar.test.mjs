/**
 * Contract tests for the calendar block's pure ICS module (parser, recurrence expansion and the conventions).
 * DOM rendering and fetching are tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  parseIcs, expandEvents, partsToMs, findMeetingLink, eventIcs, googleEventUrl,
  splitCategory, findSignupLink, findImageLink, normalizeSourceUrl, subscribeLinks, startOfWeek, isoWeek, windowStart,
  nextCount, laterCount, NEXT_COUNT, LATER_COUNT, dedupeOccurrences, groupByMonth, sourceEntry,
} = await engineImport('ics.js');

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

test('STATUS:CANCELLED gives an occurrence marked cancelled, and DTEND one marked hasEnd', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:c', 'SUMMARY:Avlyst', 'STATUS:CANCELLED', 'DTSTART:20260910T180000Z',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) });
  assert.equal(occs.length, 1);
  assert.equal(occs[0].cancelled, true);
  assert.equal(occs[0].hasEnd, false);
  const kept = expandEvents(parseIcs(event([
    'UID:k', 'SUMMARY:Møte', 'DTSTART:20260910T180000Z', 'DTEND:20260910T193000Z',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) });
  assert.equal(kept[0].cancelled, false);
  assert.equal(kept[0].hasEnd, true);
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

/* ---------- The view logic of 0.7.13.13 ---------- */

test('nextCount and laterCount: inside their bounds, with the look a stored block keeps as the default', () => {
  assert.equal(nextCount(undefined), NEXT_COUNT.dflt);
  assert.equal(NEXT_COUNT.dflt, 1);
  assert.equal(nextCount(2), 2);
  assert.equal(nextCount(9), 3);
  assert.equal(nextCount(0), 1);
  assert.equal(nextCount('tre'), 1);
  assert.equal(laterCount(undefined), 0);
  assert.equal(LATER_COUNT.dflt, 0);
  assert.equal(laterCount(4), 4);
  assert.equal(laterCount(99), 10);
  assert.equal(laterCount(-2), 0);
});

test('dedupeOccurrences: the same event from two calendars is shown once', () => {
  const t0 = Date.UTC(2026, 9, 10, 17, 0);
  const merged = dedupeOccurrences([
    { start: t0, title: 'Årsmøte', location: '', signup: null, category: null },
    { start: t0 + 3600000, title: 'Quiz', location: 'Kjelleren', signup: null },
    { start: t0, title: '  årsmøte ', location: 'Aulaen', signup: 'https://example.org/meld-pa', category: 'Møte' },
    { start: t0, title: 'Styremøte', location: '', signup: null },
  ]);
  assert.deepEqual(merged.map((occ) => occ.title), ['Årsmøte', 'Quiz', 'Styremøte']);
  // The first copy takes over what the later copy has and it lacks.
  assert.equal(merged[0].location, 'Aulaen');
  assert.equal(merged[0].signup, 'https://example.org/meld-pa');
  assert.equal(merged[0].category, 'Møte');
  // The same title at another time is another event, and the input is left alone.
  const input = [{ start: t0, title: 'Quiz' }, { start: t0 + 7 * 86400000, title: 'Quiz' }];
  assert.equal(dedupeOccurrences(input).length, 2);
  assert.notEqual(dedupeOccurrences(input)[0], input[0]);
  assert.deepEqual(dedupeOccurrences(undefined), []);
});

test('groupByMonth: the occurrences under their month, in the order given', () => {
  const at = (y, m, d) => new Date(y, m, d, 12).getTime();
  const groups = groupByMonth([
    { start: at(2026, 9, 3), title: 'a' }, { start: at(2026, 9, 28), title: 'b' },
    { start: at(2026, 10, 1), title: 'c' }, { start: at(2027, 0, 5), title: 'd' },
  ]);
  assert.deepEqual(groups.map((g) => [g.year, g.month, g.items.map((o) => o.title).join('')]),
    [[2026, 9, 'ab'], [2026, 10, 'c'], [2027, 0, 'd']]);
  assert.deepEqual(groupByMonth([]), []);
  assert.deepEqual(groupByMonth(null), []);
});

test('sourceEntry: a bare address, or an address with a name and a colour', () => {
  assert.deepEqual(sourceEntry('  abc@group.calendar.google.com '), { url: 'abc@group.calendar.google.com', name: '', color: '' });
  assert.deepEqual(sourceEntry({ url: 'https://x.test/a.ics', name: ' Styret ', color: 'accent' }), { url: 'https://x.test/a.ics', name: 'Styret', color: 'accent' });
  assert.deepEqual(sourceEntry({ url: 'https://x.test/a.ics' }), { url: 'https://x.test/a.ics', name: '', color: '' });
  assert.deepEqual(sourceEntry({ name: 7, color: null }), { url: '', name: '', color: '' });
  assert.deepEqual(sourceEntry(undefined), { url: '', name: '', color: '' });
});

test('the picture: the first ATTACH by address is kept, an inline attachment is skipped', () => {
  const { events } = parseIcs(event([
    'UID:p1', 'SUMMARY:Bilde', 'DTSTART:20260910T180000Z',
    'ATTACH;ENCODING=BASE64;VALUE=BINARY:AAAA',
    'ATTACH:https://example.org/plakat.jpg',
    'ATTACH:https://example.org/andre.png',
  ]));
  assert.equal(events[0].image, 'https://example.org/plakat.jpg');
});

test('findImageLink: a picture link in the description, with a query string, otherwise null', () => {
  assert.equal(findImageLink('Se plakaten: https://example.org/bilder/plakat.webp?v=2 og meld deg på'), 'https://example.org/bilder/plakat.webp?v=2');
  assert.equal(findImageLink('Påmelding: https://forening.no/pameld'), null);
  assert.equal(findImageLink(''), null);
  assert.equal(findImageLink(undefined), null);
});

test('startOfWeek and isoWeek: Monday 00:00, and the ISO week around a year change', () => {
  const thu = new Date(2026, 9, 8, 15, 30).getTime();
  assert.equal(startOfWeek(thu), new Date(2026, 9, 5).getTime());
  assert.equal(startOfWeek(new Date(2026, 9, 4, 23).getTime()), new Date(2026, 8, 28).getTime());
  assert.equal(isoWeek(thu), 41);
  // 1 January 2027 is a Friday and belongs to week 53 of 2026; 4 January 2027 opens week 1.
  assert.equal(isoWeek(new Date(2027, 0, 1).getTime()), 53);
  assert.equal(isoWeek(new Date(2027, 0, 4).getTime()), 1);
  assert.equal(isoWeek(new Date(2026, 0, 1).getTime()), 1);
});

test('windowStart: the year, the month, the week or the day for those views, six hours back otherwise', () => {
  const now = new Date(2026, 9, 8, 15, 30).getTime();
  assert.equal(windowStart('year', now), new Date(2026, 0, 1).getTime());
  assert.equal(windowStart('month', now), new Date(2026, 9, 1).getTime());
  assert.equal(windowStart('week', now), new Date(2026, 9, 5).getTime());
  assert.equal(windowStart('day', now), new Date(2026, 9, 8).getTime());
  assert.equal(windowStart('list', now), now - 6 * 3600 * 1000);
  assert.equal(windowStart('next', now), now - 6 * 3600 * 1000);
});

test('an occurrence carries the event\'s picture and address', () => {
  const occs = expandEvents(parseIcs(event([
    'UID:p2', 'SUMMARY:Bilde', 'DTSTART:20260910T180000Z', 'URL:https://forening.no/arrangement/1', 'ATTACH:https://example.org/plakat.jpg',
  ])).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) });
  assert.equal(occs[0].image, 'https://example.org/plakat.jpg');
  assert.equal(occs[0].url, 'https://forening.no/arrangement/1');
});

test('recurring: an occurrence of a repeating event carries the mark, a single event does not', () => {
  const window = { from: Date.UTC(2026, 8, 1), to: Date.UTC(2026, 9, 1) };
  const weekly = expandEvents(parseIcs(event([
    'UID:w', 'SUMMARY:Trening', 'DTSTART:20260902T180000Z', 'DTEND:20260902T190000Z', 'RRULE:FREQ=WEEKLY;COUNT=3',
  ])).events, window);
  assert.equal(weekly.length, 3);
  assert.ok(weekly.every((occ) => occ.recurring === true));
  const single = expandEvents(parseIcs(event([
    'UID:s', 'SUMMARY:Møte', 'DTSTART:20260910T180000Z', 'DTEND:20260910T193000Z',
  ])).events, window);
  assert.equal(single[0].recurring, false);
});

test('findMeetingLink: a video meeting address by its exact host, from the address, the place or the description', () => {
  assert.equal(findMeetingLink(null, 'Rom 2', 'Bli med: https://us02web.zoom.us/j/123?pwd=x.'), 'https://us02web.zoom.us/j/123?pwd=x');
  assert.equal(findMeetingLink('https://teams.microsoft.com/l/meetup-join/abc'), 'https://teams.microsoft.com/l/meetup-join/abc');
  assert.equal(findMeetingLink('', 'https://meet.google.com/abc-defg-hij'), 'https://meet.google.com/abc-defg-hij');
  assert.equal(findMeetingLink('https://example.org/zoom.us/j/1', 'https://notzoom.us.example.com/x'), null);
  assert.equal(findMeetingLink(undefined, undefined, 'Ingen lenke her'), null);
});

test('eventIcs and googleEventUrl: one occurrence as a file and as a Google link', () => {
  const timed = { start: Date.UTC(2026, 9, 4, 16, 0), end: Date.UTC(2026, 9, 4, 19, 0), title: 'Kick-off, høst; 2026', location: 'Klubbhuset', description: 'Linje 1\nLinje 2', uid: 'abc' };
  const file = eventIcs(timed);
  assert.match(file, /^BEGIN:VCALENDAR\r\n/);
  assert.match(file, /DTSTART:20261004T160000Z\r\n/);
  assert.match(file, /DTEND:20261004T190000Z\r\n/);
  assert.match(file, /SUMMARY:Kick-off\\, høst\\; 2026\r\n/);
  assert.match(file, /DESCRIPTION:Linje 1\\nLinje 2\r\n/);
  assert.ok(file.endsWith('END:VCALENDAR\r\n'));
  const day = new Date(2026, 9, 17).getTime();
  const allDay = eventIcs({ start: day, end: new Date(2026, 9, 18).getTime(), allDay: true, title: 'Tur' });
  assert.match(allDay, /DTSTART;VALUE=DATE:20261017\r\n/);
  assert.match(allDay, /DTEND;VALUE=DATE:20261019\r\n/);
  const url = new URL(googleEventUrl(timed));
  assert.equal(url.host, 'calendar.google.com');
  assert.equal(url.searchParams.get('dates'), '20261004T160000Z/20261004T190000Z');
  assert.equal(url.searchParams.get('text'), 'Kick-off, høst; 2026');
});
