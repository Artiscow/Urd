/**
 * Contract tests for the calendar block's pure ICS module (parser, recurrence expansion and the conventions).
 * DOM rendering and fetching are tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  parseIcs, expandEvents, partsToMs, findMeetingLink, eventIcs, googleEventUrl, eventJsonLd, placeName, matchesSearch, meetingLinkOf,
  splitCategory, findSignupLink, signupLinkOf, findImageLink, normalizeSourceUrl, subscribeLinks, startOfWeek, isoWeek, windowStart,
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

test('findSignupLink and signupLinkOf: a line that names the sign-up, else the event own address, never a link that merely stands there', () => {
  const desc = 'Les mer: https://forening.no/om\nPåmelding: https://forening.no/pameld';
  assert.equal(findSignupLink(desc), 'https://forening.no/pameld');
  assert.equal(findSignupLink('Tickets at https://billett.example.org/e/1.'), 'https://billett.example.org/e/1');
  assert.equal(findSignupLink('Se https://a.no/info.'), null);
  assert.equal(findSignupLink('Ingen lenke her'), null);
  // The event's own address is the sign-up when no line names one.
  assert.equal(signupLinkOf({ description: 'Se https://a.no/info', url: 'https://events.example.org/e/7' }), 'https://events.example.org/e/7');
  assert.equal(signupLinkOf({ description: desc, url: 'https://events.example.org/e/7' }), 'https://forening.no/pameld');
  assert.equal(signupLinkOf({ description: 'Se https://a.no/info' }), null);
  // A picture and a video meeting are never the sign-up, by a known host, by the site's own, or by the feed's own field.
  assert.equal(signupLinkOf({ description: 'Sign up: https://a.no/poster.jpg' }), null);
  assert.equal(signupLinkOf({ description: 'Register: https://us02web.zoom.us/j/1', url: 'https://a.no/e' }), 'https://a.no/e');
  assert.equal(signupLinkOf({ url: 'https://meet.proton.me/join/id-abc' }), null);
  assert.equal(signupLinkOf({ url: 'https://talk.example.org/call/1' }, ['talk.example.org']), null);
  assert.equal(signupLinkOf({ url: 'https://video.example.org/r/1', meeting: 'https://video.example.org/r/1' }), null);
  assert.equal(signupLinkOf({ url: 'ftp://a.no/e' }), null);
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

test('eventJsonLd: an occurrence as a schema.org Event', () => {
  const start = new Date(2026, 9, 5, 18, 0).getTime();
  const timed = { start, end: start + 2 * 3600000, hasEnd: true, allDay: false, title: 'Training', location: 'The hall, Storgata 1', description: 'Bring shoes' };
  const data = eventJsonLd(timed, { pageUrl: 'https://example.org/program', organizer: 'The club' });
  assert.equal(data['@type'], 'Event');
  assert.equal(data.name, 'Training');
  assert.equal(data.startDate, new Date(start).toISOString());
  assert.equal(data.endDate, new Date(start + 2 * 3600000).toISOString());
  assert.equal(data.eventStatus, 'https://schema.org/EventScheduled');
  assert.equal(data.eventAttendanceMode, 'https://schema.org/OfflineEventAttendanceMode');
  assert.deepEqual(data.location, { '@type': 'Place', name: 'The hall, Storgata 1', address: 'The hall, Storgata 1' });
  assert.equal(data.url, 'https://example.org/program');
  assert.deepEqual(data.organizer, { '@type': 'Organization', name: 'The club', url: 'https://example.org/' });

  // Without an end from the feed there is no endDate, and the true moment is used when the start is shown on another clock.
  const moved = eventJsonLd({ ...timed, hasEnd: false, real: start - 3600000 });
  assert.equal(moved.endDate, undefined);
  assert.equal(moved.startDate, new Date(start - 3600000).toISOString());

  // An all-day event gives days, its last day as the end: the occurrence expandEvents makes for 17 and 18 October.
  const [trip] = expandEvents(parseIcs(wrap('BEGIN:VEVENT\r\nUID:t\r\nDTSTART;VALUE=DATE:20261017\r\nDTEND;VALUE=DATE:20261019\r\nSUMMARY:Trip\r\nEND:VEVENT')).events, { from: new Date(2026, 9, 1).getTime() });
  const day = eventJsonLd({ ...trip, title: 'Trip' });
  assert.equal(day.startDate, '2026-10-17');
  assert.equal(day.endDate, '2026-10-18');
  assert.equal(day.location, undefined);

  // A meeting link makes the event online, with a place beside it mixed; a cancelled event says so.
  const online = eventJsonLd({ ...timed, location: '', description: 'Join at https://meet.jit.si/club', cancelled: true });
  assert.equal(online.eventAttendanceMode, 'https://schema.org/OnlineEventAttendanceMode');
  assert.deepEqual(online.location, { '@type': 'VirtualLocation', url: 'https://meet.jit.si/club' });
  assert.equal(online.eventStatus, 'https://schema.org/EventCancelled');
  const mixed = eventJsonLd({ ...timed, description: 'Or https://meet.jit.si/club' });
  assert.equal(mixed.eventAttendanceMode, 'https://schema.org/MixedEventAttendanceMode');
  assert.equal(mixed.location.length, 2);

  // The event's own page wins over the page it is shown on; no name or no start gives nothing.
  assert.equal(eventJsonLd({ ...timed, url: 'https://example.org/e/1' }, { pageUrl: 'https://example.org/program' }).url, 'https://example.org/e/1');
  assert.equal(eventJsonLd({ start }), null);
  assert.equal(eventJsonLd({ title: 'X' }), null);
});

test('CATEGORIES: the feed own categories are read, across lines and with escaped commas', () => {
  const feed = ['BEGIN:VCALENDAR', 'BEGIN:VEVENT', 'UID:c1', 'DTSTART:20261005T160000Z', 'SUMMARY:Board', 'CATEGORIES:Meeting,Members\\, all', 'CATEGORIES:Autumn', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:c2', 'DTSTART:20261006T160000Z', 'SUMMARY:Plain', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const { events } = parseIcs(feed);
  assert.deepEqual(events[0].categories, ['Meeting', 'Members, all', 'Autumn']);
  const occs = expandEvents(events, { from: Date.UTC(2026, 9, 1) });
  assert.deepEqual(occs[0].categories, ['Meeting', 'Members, all', 'Autumn']);
  assert.deepEqual(occs[1].categories, []);
});

test('placeName and matchesSearch: the venue of a place, and a search over title, place and description', () => {
  assert.equal(placeName('The hall, Storgata 1, 7011 Trondheim'), 'The hall');
  assert.equal(placeName('The clubhouse'), 'The clubhouse');
  assert.equal(placeName(''), '');
  const occ = { title: 'Autumn trip', location: 'The car park', description: 'Bring warm clothes' };
  assert.ok(matchesSearch(occ, ''));
  assert.ok(matchesSearch(occ, 'AUTUMN'));
  assert.ok(matchesSearch(occ, 'car'));
  assert.ok(matchesSearch(occ, 'warm trip'));
  assert.ok(!matchesSearch(occ, 'trip summer'));
  assert.ok(matchesSearch({ summary: 'Board' }, 'board'));
});

const feedOf = (...lines) => ['BEGIN:VCALENDAR', 'BEGIN:VEVENT', ...lines, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
const daysOf = (occs) => occs.map((occ) => { const d = new Date(occ.start); return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`; });

test('BYSETPOS: the last Thursday of every month, and the last weekday', () => {
  const window = { from: Date.UTC(2026, 9, 1), to: Date.UTC(2027, 0, 31) };
  const thursdays = expandEvents(parseIcs(feedOf('UID:s1', 'DTSTART:20261001T170000Z', 'RRULE:FREQ=MONTHLY;BYDAY=TH;BYSETPOS=-1', 'SUMMARY:Board')).events, window);
  assert.deepEqual(daysOf(thursdays), ['2026-10-29', '2026-11-26', '2026-12-31', '2027-1-28']);
  const weekdays = expandEvents(parseIcs(feedOf('UID:s2', 'DTSTART:20261001T170000Z', 'RRULE:FREQ=MONTHLY;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1', 'SUMMARY:Pay day')).events, window);
  assert.deepEqual(daysOf(weekdays), ['2026-10-30', '2026-11-30', '2026-12-31', '2027-1-29']);
  // The second position of a month's Tuesdays is the same as BYDAY=2TU.
  const second = expandEvents(parseIcs(feedOf('UID:s3', 'DTSTART:20261001T170000Z', 'RRULE:FREQ=MONTHLY;BYDAY=TU;BYSETPOS=2', 'SUMMARY:Club')).events, window);
  assert.deepEqual(daysOf(second), ['2026-10-13', '2026-11-10', '2026-12-8', '2027-1-12']);
});

test('BYMONTH: a rule kept to its months, monthly, yearly and weekly', () => {
  const monthly = expandEvents(parseIcs(feedOf('UID:m1', 'DTSTART:20260915T170000Z', 'RRULE:FREQ=MONTHLY;BYMONTH=9,10,3', 'SUMMARY:Season')).events, { from: Date.UTC(2026, 8, 1), to: Date.UTC(2027, 3, 30) });
  assert.deepEqual(daysOf(monthly), ['2026-9-15', '2026-10-15', '2027-3-15']);
  // The second Sunday of May every year.
  const yearly = expandEvents(parseIcs(feedOf('UID:m2', 'DTSTART:20260510T100000Z', 'RRULE:FREQ=YEARLY;BYMONTH=5;BYDAY=2SU', 'SUMMARY:Spring day')).events, { from: Date.UTC(2026, 0, 1), to: Date.UTC(2028, 11, 31) });
  assert.deepEqual(daysOf(yearly), ['2026-5-10', '2027-5-9', '2028-5-14']);
  // A yearly rule over two months, on the day of the start.
  const twice = expandEvents(parseIcs(feedOf('UID:m3', 'DTSTART:20260301T100000Z', 'RRULE:FREQ=YEARLY;BYMONTH=3,9', 'SUMMARY:Clean-up')).events, { from: Date.UTC(2026, 0, 1), to: Date.UTC(2027, 11, 31) });
  assert.deepEqual(daysOf(twice), ['2026-3-1', '2026-9-1', '2027-3-1', '2027-9-1']);
  const weekly = expandEvents(parseIcs(feedOf('UID:m4', 'DTSTART:20261026T170000Z', 'RRULE:FREQ=WEEKLY;BYMONTH=10,12', 'SUMMARY:Choir')).events, { from: Date.UTC(2026, 9, 1), to: Date.UTC(2026, 11, 15) });
  assert.deepEqual(daysOf(weekly), ['2026-10-26', '2026-12-7', '2026-12-14']);
  // A rule that names a day no month has ends without a result.
  assert.deepEqual(expandEvents(parseIcs(feedOf('UID:m5', 'DTSTART:20260101T100000Z', 'RRULE:FREQ=MONTHLY;BYMONTH=2;BYMONTHDAY=30', 'SUMMARY:Never')).events, { from: Date.UTC(2026, 0, 2), to: Date.UTC(2030, 0, 1) }), []);
});

test('RDATE: dates of their own beside the start and the rule', () => {
  const window = { from: Date.UTC(2026, 9, 1), to: Date.UTC(2026, 11, 31) };
  const alone = expandEvents(parseIcs(feedOf('UID:r1', 'DTSTART:20261005T170000Z', 'RDATE:20261019T170000Z,20261102T170000Z/20261102T190000Z', 'RDATE:20261005T170000Z', 'SUMMARY:Course')).events, window);
  assert.deepEqual(daysOf(alone), ['2026-10-5', '2026-10-19', '2026-11-2']);
  assert.ok(alone.every((occ) => occ.recurring));
  // Beside a rule, without a date the rule already gives and without one EXDATE takes away.
  const beside = expandEvents(parseIcs(feedOf('UID:r2', 'DTSTART:20261005T170000Z', 'RRULE:FREQ=WEEKLY;COUNT=3', 'RDATE:20261012T170000Z,20261120T170000Z,20261125T170000Z', 'EXDATE:20261125T170000Z', 'SUMMARY:Course')).events, window);
  assert.deepEqual(daysOf(beside), ['2026-10-5', '2026-10-12', '2026-10-19', '2026-11-20']);
  const days = expandEvents(parseIcs(feedOf('UID:r3', 'DTSTART;VALUE=DATE:20261010', 'RDATE;VALUE=DATE:20261017', 'SUMMARY:Market')).events, window);
  assert.equal(days.length, 2);
  assert.ok(days[1].allDay);
});

test('CONFERENCE, GEO and X-ALT-DESC: the meeting link, the point and the HTML description', () => {
  const [occ] = expandEvents(parseIcs(feedOf('UID:x1', 'DTSTART:20261005T170000Z', 'SUMMARY:Board', 'LOCATION:The hall', 'DESCRIPTION:Plain words',
    'CONFERENCE;VALUE=URI;FEATURE=AUDIO,VIDEO;LABEL=Join:https://video.example.org/room/7', 'GEO:63.4327;10.3950',
    'X-ALT-DESC;FMTTYPE=text/html:<p>Rich <b>words</b></p>')).events, { from: Date.UTC(2026, 9, 1) });
  assert.equal(occ.meeting, 'https://video.example.org/room/7');
  assert.equal(meetingLinkOf(occ), 'https://video.example.org/room/7');
  assert.deepEqual(occ.geo, { lat: 63.4327, lon: 10.395 });
  assert.equal(occ.descriptionHtml, '<p>Rich <b>words</b></p>');
  assert.equal(occ.description, 'Plain words');
  assert.equal(eventJsonLd({ ...occ, title: occ.summary }).location[1].url, 'https://video.example.org/room/7');
  // The fields the large calendars write the link in; an address that is not https is no link, and a point outside the globe no point.
  const google = parseIcs(feedOf('UID:x2', 'DTSTART:20261005T170000Z', 'SUMMARY:A', 'X-GOOGLE-CONFERENCE:https://meet.google.com/abc-defg-hij')).events[0];
  assert.equal(google.meeting, 'https://meet.google.com/abc-defg-hij');
  const teams = parseIcs(feedOf('UID:x3', 'DTSTART:20261005T170000Z', 'SUMMARY:A', 'X-MICROSOFT-SKYPETEAMSMEETINGURL:https://teams.microsoft.com/l/meetup-join/1')).events[0];
  assert.equal(teams.meeting, 'https://teams.microsoft.com/l/meetup-join/1');
  const bad = parseIcs(feedOf('UID:x4', 'DTSTART:20261005T170000Z', 'SUMMARY:A', 'CONFERENCE:javascript:alert(1)', 'GEO:120;10', 'X-ALT-DESC;FMTTYPE=text/plain:not html')).events[0];
  assert.equal(bad.meeting, undefined);
  assert.equal(bad.geo, undefined);
  assert.equal(bad.html, undefined);
  // Without a field of its own the link is found in the words, as before.
  assert.equal(meetingLinkOf({ description: 'Join at https://meet.jit.si/club' }), 'https://meet.jit.si/club');
});

test('normalizeSourceUrl: a Nextcloud share link becomes the address of its iCal file', () => {
  const file = 'https://sky.example.org/remote.php/dav/public-calendars/AbCdEf123?export';
  assert.equal(normalizeSourceUrl('https://sky.example.org/apps/calendar/p/AbCdEf123'), file);
  assert.equal(normalizeSourceUrl('https://sky.example.org/index.php/apps/calendar/p/AbCdEf123/dayGridMonth/now'), file);
  assert.equal(normalizeSourceUrl('https://sky.example.org/remote.php/dav/public-calendars/AbCdEf123'), file);
  assert.equal(normalizeSourceUrl('https://sky.example.org/remote.php/dav/public-calendars/AbCdEf123/'), file);
  assert.equal(normalizeSourceUrl('webcal://sky.example.org/remote.php/dav/public-calendars/AbCdEf123?export'), file);
  assert.equal(normalizeSourceUrl(file), file);
  // A server in a folder of its host keeps the folder.
  assert.equal(normalizeSourceUrl('https://example.org/cloud/apps/calendar/p/AbCdEf123'), 'https://example.org/cloud/remote.php/dav/public-calendars/AbCdEf123?export');
  // Any other address is left as it is.
  assert.equal(normalizeSourceUrl('https://x.no/apps/calendar/kal.ics'), 'https://x.no/apps/calendar/kal.ics');
  assert.equal(normalizeSourceUrl('https://calendar.google.com/calendar/ical/a%40b.com/public/basic.ics'), 'https://calendar.google.com/calendar/ical/a%40b.com/public/basic.ics');
});

/** Runs a check with the process on another zone's clock, so a change of clock can be met on a known day. */
function inZone(zone, check) {
  const before = process.env.TZ;
  process.env.TZ = zone;
  try {
    check();
  } finally {
    if (before == null) delete process.env.TZ;
    else process.env.TZ = before;
  }
}

const one = (lines, window) => expandEvents(parseIcs(feedOf(...lines)).events, window);
const dayOfMs = (ms) => { const d = new Date(ms); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };

test('findImageLink: a picture address in linear time, also in a description made to be slow', () => {
  assert.equal(findImageLink('See https://example.org/a/poster.jpg?w=800, then come.'), 'https://example.org/a/poster.jpg?w=800');
  assert.equal(findImageLink('A page https://example.org/a.jpg/more and https://example.org/b.png.'), 'https://example.org/b.png');
  const started = Date.now();
  assert.equal(findImageLink('http://'.repeat(30000)), null);
  assert.ok(Date.now() - started < 500, 'a long run of addresses is read in linear time');
});

test('BYMONTH in any order: the months are walked in the year order', () => {
  const late = one(['UID:y1', 'DTSTART:20260115T100000Z', 'RRULE:FREQ=YEARLY;BYMONTH=6,1', 'SUMMARY:Twice'], { from: Date.UTC(2026, 9, 1), to: Date.UTC(2027, 2, 1) });
  assert.deepEqual(daysOf(late), ['2027-1-15']);
  const counted = one(['UID:y2', 'DTSTART:20260115T100000Z', 'RRULE:FREQ=YEARLY;BYMONTH=6,1;COUNT=3', 'SUMMARY:Twice'], { from: Date.UTC(2026, 0, 1), to: Date.UTC(2028, 0, 1) });
  assert.deepEqual(daysOf(counted), ['2026-1-15', '2026-6-15', '2027-1-15']);
});

test('all-day events across a change of clock keep their days, in the export too', () => {
  inZone('Europe/Oslo', () => {
    // 28 and 29 March 2026; the clock changes in the night to the 29th.
    const [spring] = one(['UID:d1', 'DTSTART;VALUE=DATE:20260328', 'DTEND;VALUE=DATE:20260330', 'SUMMARY:Camp'], { from: new Date(2026, 2, 1).getTime() });
    assert.equal(dayOfMs(spring.end), '2026-3-29');
    assert.equal(new Date(spring.end).getHours(), 0);
    assert.match(eventIcs(spring), /DTEND;VALUE=DATE:20260330/);
    assert.equal(eventJsonLd({ ...spring, title: 'Camp' }).endDate, '2026-03-29');
    // A weekly all-day event on the day the clock goes back.
    const weekly = one(['UID:d2', 'DTSTART;VALUE=DATE:20261018', 'DTEND;VALUE=DATE:20261019', 'RRULE:FREQ=WEEKLY;COUNT=3', 'SUMMARY:Market'], { from: new Date(2026, 9, 1).getTime() });
    const october25 = weekly.find((occ) => dayOfMs(occ.start) === '2026-10-25');
    assert.ok(eventIcs(october25).includes('DTSTART;VALUE=DATE:20261025') && eventIcs(october25).includes('DTEND;VALUE=DATE:20261026'));
    assert.match(googleEventUrl(october25), /dates=20261025%2F20261026/);
  });
});

test('RDATE with an override: the moved or cancelled date is the override', () => {
  const feed = ['BEGIN:VCALENDAR',
    'BEGIN:VEVENT', 'UID:r9', 'DTSTART:20261005T100000Z', 'RDATE:20261010T100000Z,20261017T100000Z', 'SUMMARY:Base', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:r9', 'RECURRENCE-ID:20261010T100000Z', 'DTSTART:20261010T120000Z', 'SUMMARY:Moved', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:r9', 'RECURRENCE-ID:20261017T100000Z', 'DTSTART:20261017T100000Z', 'STATUS:CANCELLED', 'SUMMARY:Base', 'END:VEVENT',
    'END:VCALENDAR'].join('\r\n');
  const occs = expandEvents(parseIcs(feed).events, { from: Date.UTC(2026, 9, 1) });
  assert.deepEqual(occs.map((occ) => [new Date(occ.start).toISOString(), occ.summary, occ.cancelled]), [
    ['2026-10-05T10:00:00.000Z', 'Base', false],
    ['2026-10-10T12:00:00.000Z', 'Moved', false],
    ['2026-10-17T10:00:00.000Z', 'Base', true],
  ]);
});

test('a rule that began years ago still reaches the window', () => {
  const daily = one(['UID:l1', 'DTSTART:20150101T100000Z', 'RRULE:FREQ=DAILY', 'SUMMARY:Daily'], { from: Date.UTC(2026, 9, 1), to: Date.UTC(2026, 9, 4) });
  assert.deepEqual(daysOf(daily), ['2026-10-1', '2026-10-2', '2026-10-3']);
  const weekdays = one(['UID:l2', 'DTSTART:20150105T100000Z', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', 'SUMMARY:Office'], { from: Date.UTC(2026, 9, 5), to: Date.UTC(2026, 9, 11) });
  assert.deepEqual(daysOf(weekdays), ['2026-10-5', '2026-10-6', '2026-10-7', '2026-10-8', '2026-10-9']);
  const monthly = one(['UID:l3', 'DTSTART:19900110T100000Z', 'RRULE:FREQ=MONTHLY;INTERVAL=2', 'SUMMARY:Board'], { from: Date.UTC(2026, 8, 1), to: Date.UTC(2027, 0, 31) });
  assert.deepEqual(daysOf(monthly), ['2026-9-10', '2026-11-10', '2027-1-10']);
  // With COUNT the rule is counted from its start, so it ends where it ends.
  assert.deepEqual(one(['UID:l4', 'DTSTART:20150101T100000Z', 'RRULE:FREQ=DAILY;COUNT=5', 'SUMMARY:Short'], { from: Date.UTC(2026, 9, 1) }), []);
});

test('rule parts: a broken interval is one, a day from the month end, a signed weekday, and a daily rule on weekdays', () => {
  const every = one(['UID:n1', 'DTSTART:20261001T100000Z', 'RRULE:FREQ=DAILY;INTERVAL=Infinity;COUNT=3', 'SUMMARY:A'], { from: Date.UTC(2026, 9, 1) });
  assert.deepEqual(daysOf(every), ['2026-10-1', '2026-10-2', '2026-10-3']);
  assert.ok(every.every((occ) => Number.isFinite(occ.start)));
  assert.equal(daysOf(one(['UID:n2', 'DTSTART:20261001T100000Z', 'RRULE:FREQ=DAILY;INTERVAL=1.5;COUNT=2', 'SUMMARY:A'], { from: Date.UTC(2026, 9, 1) }))[1], '2026-10-2');
  assert.deepEqual(daysOf(one(['UID:n3', 'DTSTART:20261001T100000Z', 'RRULE:FREQ=MONTHLY;BYMONTHDAY=-1;COUNT=3', 'SUMMARY:A'], { from: Date.UTC(2026, 9, 1) })), ['2026-10-31', '2026-11-30', '2026-12-31']);
  assert.deepEqual(daysOf(one(['UID:n4', 'DTSTART:20261001T100000Z', 'RRULE:FREQ=MONTHLY;BYDAY=+1MO;COUNT=2', 'SUMMARY:A'], { from: Date.UTC(2026, 9, 1) })), ['2026-10-5', '2026-11-2']);
  assert.deepEqual(daysOf(one(['UID:n5', 'DTSTART:20261002T100000Z', 'RRULE:FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;COUNT=3', 'SUMMARY:A'], { from: Date.UTC(2026, 9, 1) })), ['2026-10-2', '2026-10-5', '2026-10-6']);
});

test('ATTACH is a picture only when its type or its address says so, and GEO needs both numbers', () => {
  const picture = (line) => parseIcs(feedOf('UID:p1', 'DTSTART:20261005T100000Z', 'SUMMARY:A', line)).events[0];
  assert.equal(picture('ATTACH;FMTTYPE=application/pdf:https://drive.google.com/file/d/x/view').image, undefined);
  assert.equal(picture('ATTACH;FMTTYPE=image/jpeg:https://example.org/p').image, 'https://example.org/p');
  assert.equal(picture('ATTACH:https://example.org/poster.png').image, 'https://example.org/poster.png');
  assert.equal(picture('ATTACH:https://example.org/agenda').image, undefined);
  assert.equal(picture('GEO:;10').geo, undefined);
  assert.equal(picture('GEO:63.4;').geo, undefined);
});

test('signupLinkOf: every line that names a sign-up is tried, and a name is no sign-up word', () => {
  assert.equal(signupLinkOf({ description: 'Register for the call: https://zoom.us/j/1\nTickets: https://tix.example.org/e' }), 'https://tix.example.org/e');
  assert.equal(signupLinkOf({ description: 'Ask Pamela: https://example.org/pam' }), null);
  assert.equal(signupLinkOf({ description: 'Pamelding: https://example.org/form' }), 'https://example.org/form');
});

test('normalizeSourceUrl: the Nextcloud embedding link, and a token with - and _', () => {
  assert.equal(normalizeSourceUrl('https://sky.example.org/apps/calendar/embed/AbC-d_E1'), 'https://sky.example.org/remote.php/dav/public-calendars/AbC-d_E1?export');
  assert.equal(normalizeSourceUrl('https://sky.example.org/remote.php/dav/public-calendars/AbC-d_E1'), 'https://sky.example.org/remote.php/dav/public-calendars/AbC-d_E1?export');
});
