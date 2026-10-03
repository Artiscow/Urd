/**
 * Dependency-free iCal parser and recurrence expander for the calendar
 * block. A PURE module (no DOM, no fetch): everything here is unit-testable
 * in node, and blocks/calendar.js handles fetching and rendering. Loaded
 * dynamically by the block on the first render of a calendar, so it stays
 * outside the visitor closure.
 *
 * The scope is the practical subset that club calendars use (Google
 * Calendar, Outlook, Nextcloud): VEVENT with DTSTART/DTEND (UTC, TZID or
 * all-day), RRULE with FREQ/INTERVAL/COUNT/UNTIL/BYDAY/BYMONTHDAY, EXDATE
 * and RECURRENCE-ID overrides. Unknown properties are ignored quietly.
 *
 * Time zones are resolved with the Intl API (no tables): wall time in the
 * zone is converted to UTC by estimating the offset, which is DST-correct.
 */

/* ---------- Line and property parsing ---------- */

/** Unfolds continuation lines (RFC 5545: line break + space/tab). */
function unfold(text) {
  return String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n[ \t]/g, '');
}

/** One content line → { name, params, value }. A colon inside "..." belongs to the parameters. */
function parseLine(line) {
  let inQuotes = false;
  let split = -1;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQuotes = !inQuotes;
    else if (ch === ':' && !inQuotes) { split = i; break; }
  }
  if (split < 0) return null;
  const head = line.slice(0, split);
  const value = line.slice(split + 1);
  const [name, ...paramParts] = head.split(';');
  const params = {};
  for (const part of paramParts) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    params[part.slice(0, eq).toUpperCase()] = part.slice(eq + 1).replace(/^"|"$/g, '');
  }
  return { name: name.toUpperCase(), params, value };
}

/** Text values: \n, \, \; and \\ are escaped in iCal. */
function unescapeText(value) {
  return String(value)
    .replace(/\\n/gi, '\n')
    .replace(/\\([,;\\])/g, '$1');
}

/* ---------- Date and time zone ---------- */

/** Wall time in an IANA zone → UTC ms. The offset is estimated with Intl and
 *  adjusted once more, which catches DST transitions. An unknown zone falls back to local time. */
function zonedToUtc(y, mo, d, h, mi, s, timeZone) {
  let formatter;
  try {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
  } catch {
    return new Date(y, mo - 1, d, h, mi, s).getTime();
  }
  const wallAsUtc = Date.UTC(y, mo - 1, d, h, mi, s);
  const readWall = (utcMs) => {
    const parts = {};
    for (const p of formatter.formatToParts(new Date(utcMs))) parts[p.type] = p.value;
    return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day),
      Number(parts.hour) % 24, Number(parts.minute), Number(parts.second));
  };
  let utc = wallAsUtc - (readWall(wallAsUtc) - wallAsUtc);
  utc -= readWall(utc) - wallAsUtc;
  return utc;
}

/** Date value → { y, mo, d, h, mi, s, allDay, tzid } (wall time + zone), or null. */
function parseDateParts(value, params = {}) {
  const v = String(value).trim();
  let m = /^(\d{4})(\d{2})(\d{2})$/.exec(v);
  if (m || params.VALUE === 'DATE') {
    m = m ?? /^(\d{4})(\d{2})(\d{2})/.exec(v);
    if (!m) return null;
    return { y: +m[1], mo: +m[2], d: +m[3], h: 0, mi: 0, s: 0, allDay: true, tzid: null };
  }
  m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/.exec(v);
  if (!m) return null;
  return {
    y: +m[1], mo: +m[2], d: +m[3], h: +m[4], mi: +m[5], s: +m[6],
    allDay: false,
    tzid: m[7] === 'Z' ? 'UTC' : (params.TZID ?? null),
  };
}

/** Wall-time parts → UTC ms. All-day is read as local midnight (rendered as a date). */
export function partsToMs(parts) {
  if (!parts) return NaN;
  const { y, mo, d, h, mi, s, tzid, allDay } = parts;
  if (allDay || !tzid) return new Date(y, mo - 1, d, h, mi, s).getTime();
  if (tzid === 'UTC') return Date.UTC(y, mo - 1, d, h, mi, s);
  return zonedToUtc(y, mo, d, h, mi, s, tzid);
}

/** Calendar arithmetic on wall-time parts (DST-safe: the clock time survives). */
function addDays(parts, days) {
  const base = new Date(Date.UTC(parts.y, parts.mo - 1, parts.d + days));
  return { ...parts, y: base.getUTCFullYear(), mo: base.getUTCMonth() + 1, d: base.getUTCDate() };
}

function addMonths(parts, months) {
  const total = parts.y * 12 + (parts.mo - 1) + months;
  return { ...parts, y: Math.floor(total / 12), mo: (total % 12) + 1 };
}

const weekday = (parts) => new Date(Date.UTC(parts.y, parts.mo - 1, parts.d)).getUTCDay();

const daysInMonth = (y, mo) => new Date(Date.UTC(y, mo, 0)).getUTCDate();

const BYDAY_CODES = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

/* ---------- VEVENT parsing ---------- */

/**
 * Parses a whole iCal text.
 * @returns {{ name: string|null, timezone: string|null, events: object[] }} events are RAW events; timezone is the feed's own (X-WR-TIMEZONE)
 *   (one per VEVENT, recurrences NOT expanded); see expandEvents.
 */
export function parseIcs(text) {
  const lines = unfold(text).split('\n');
  const events = [];
  let calendarName = null;
  let calendarZone = null;
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line === 'BEGIN:VEVENT') {
      current = { exdates: [] };
      continue;
    }
    if (line === 'END:VEVENT') {
      if (current?.start) events.push(current);
      current = null;
      continue;
    }
    const prop = parseLine(line);
    if (!prop) continue;
    if (!current) {
      if (prop.name === 'X-WR-CALNAME') calendarName = unescapeText(prop.value).trim();
      if (prop.name === 'X-WR-TIMEZONE') calendarZone = prop.value.trim();
      continue;
    }
    switch (prop.name) {
      case 'UID': current.uid = prop.value.trim(); break;
      case 'SUMMARY': current.summary = unescapeText(prop.value).trim(); break;
      case 'DESCRIPTION': current.description = unescapeText(prop.value).trim(); break;
      case 'LOCATION': current.location = unescapeText(prop.value).trim(); break;
      case 'URL': current.url = prop.value.trim(); break;
      // The first picture attached by address; a file attached inline is skipped.
      case 'ATTACH': if (!current.image && /^https?:\/\//i.test(prop.value.trim())) current.image = prop.value.trim(); break;
      case 'STATUS': current.status = prop.value.trim().toUpperCase(); break;
      case 'DTSTART': current.start = parseDateParts(prop.value, prop.params); break;
      case 'DTEND': current.end = parseDateParts(prop.value, prop.params); break;
      case 'RRULE': current.rrule = parseRrule(prop.value); break;
      case 'RECURRENCE-ID': current.recurrenceId = parseDateParts(prop.value, prop.params); break;
      case 'EXDATE':
        for (const part of prop.value.split(',')) {
          const parsed = parseDateParts(part, prop.params);
          if (parsed) current.exdates.push(parsed);
        }
        break;
      default: break;
    }
  }
  return { name: calendarName, timezone: calendarZone, events };
}

function parseRrule(value) {
  const rule = {};
  for (const part of String(value).split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    rule[part.slice(0, eq).toUpperCase()] = part.slice(eq + 1);
  }
  const freq = rule.FREQ?.toUpperCase();
  if (!['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'].includes(freq)) return null;
  const byday = rule.BYDAY
    ? rule.BYDAY.split(',').map((code) => {
      const m = /^(-?\d)?([A-Z]{2})$/.exec(code.trim().toUpperCase());
      return m && m[2] in BYDAY_CODES ? { ord: m[1] ? Number(m[1]) : 0, day: BYDAY_CODES[m[2]] } : null;
    }).filter(Boolean)
    : null;
  return {
    freq,
    interval: Math.max(1, Number(rule.INTERVAL) || 1),
    count: rule.COUNT ? Math.max(1, Number(rule.COUNT) || 1) : null,
    until: rule.UNTIL ? partsToMs(parseDateParts(rule.UNTIL)) : null,
    byday,
    bymonthday: rule.BYMONTHDAY
      ? rule.BYMONTHDAY.split(',').map(Number).filter((n) => Number.isInteger(n) && n >= 1 && n <= 31)
      : null,
  };
}

/* ---------- Expansion ---------- */

/** Generates wall-time starts for a rule, from DTSTART onwards (sorted). */
function* ruleStarts(startParts, rule) {
  const guard = 3000;
  let produced = 0;
  if (rule.freq === 'DAILY') {
    for (let i = 0; produced < guard; i += rule.interval) {
      yield addDays(startParts, i);
      produced++;
    }
  } else if (rule.freq === 'WEEKLY') {
    const days = (rule.byday?.length ? rule.byday.map((b) => b.day) : [weekday(startParts)]).sort();
    // The week is anchored in the week of the DTSTART day (weeks start on Sunday, like getUTCDay).
    const weekAnchor = addDays(startParts, -weekday(startParts));
    for (let week = 0; produced < guard; week += rule.interval) {
      for (const day of days) {
        const candidate = addDays(weekAnchor, week * 7 + day);
        if (partsToMs(candidate) < partsToMs(startParts)) continue;
        yield candidate;
        produced++;
      }
    }
  } else if (rule.freq === 'MONTHLY') {
    for (let i = 0; produced < guard; i += rule.interval) {
      const month = addMonths(startParts, i);
      const dim = daysInMonth(month.y, month.mo);
      let candidates = [];
      if (rule.byday?.length) {
        for (const { ord, day } of rule.byday) {
          // The nth (or nth from last) weekday of the month; ord 0 means all of them.
          const matches = [];
          for (let d = 1; d <= dim; d++) {
            if (weekday({ ...month, d }) === day) matches.push(d);
          }
          if (ord > 0 && matches[ord - 1]) candidates.push(matches[ord - 1]);
          else if (ord < 0 && matches[matches.length + ord] != null) candidates.push(matches[matches.length + ord]);
          else if (ord === 0) candidates.push(...matches);
        }
      } else if (rule.bymonthday?.length) {
        candidates = rule.bymonthday.filter((d) => d <= dim);
      } else if (startParts.d <= dim) {
        candidates = [startParts.d];
      }
      for (const d of [...new Set(candidates)].sort((a, b) => a - b)) {
        const candidate = { ...month, d };
        if (partsToMs(candidate) < partsToMs(startParts)) continue;
        yield candidate;
        produced++;
      }
    }
  } else if (rule.freq === 'YEARLY') {
    for (let i = 0; produced < guard; i += rule.interval) {
      const candidate = { ...startParts, y: startParts.y + i };
      if (candidate.mo === 2 && candidate.d === 29 && daysInMonth(candidate.y, 2) < 29) continue;
      yield candidate;
      produced++;
    }
  }
}

/**
 * Expands raw events into concrete occurrences inside a window.
 * A RECURRENCE-ID event overrides its base occurrence, EXDATE removes one,
 * and STATUS:CANCELLED marks one `cancelled: true` (the block shows it as
 * cancelled or hides it). An occurrence of an event with a recurrence rule
 * carries `recurring: true`, and one whose event has a DTEND `hasEnd: true`. The result is sorted by start.
 *
 * @param {object[]} events from parseIcs
 * @param {{ from?: Date|number, to?: Date|number, max?: number }} window
 * @returns {Array<{ summary, description, location, url, start: number, end: number, allDay: boolean, recurring: boolean, uid }>}
 */
export function expandEvents(events, { from = Date.now(), to, max = 300 } = {}) {
  const fromMs = Number(from);
  const toMs = to != null ? Number(to) : fromMs + 400 * 24 * 3600 * 1000;

  // Overrides: uid + the base occurrence's start → the replacement event.
  const overrides = new Map();
  for (const event of events) {
    if (event.uid && event.recurrenceId) {
      overrides.set(`${event.uid}@${partsToMs(event.recurrenceId)}`, event);
    }
  }

  const out = [];
  const push = (event, startMs, endMs, recurring = false) => {
    out.push({
      uid: event.uid ?? null,
      summary: event.summary ?? '',
      description: event.description ?? '',
      location: event.location ?? '',
      url: event.url ?? null,
      image: event.image ?? null,
      start: startMs,
      end: endMs,
      allDay: !!event.start.allDay,
      recurring,
      cancelled: event.status === 'CANCELLED',
      hasEnd: Boolean(event.end),
    });
  };

  for (const event of events) {
    if (event.recurrenceId) continue;
    const startMs = partsToMs(event.start);
    if (!Number.isFinite(startMs)) continue;
    // DTEND is exclusive for all-day events in iCal; otherwise the duration is DTEND - DTSTART.
    const durationMs = event.end
      ? Math.max(0, partsToMs(event.end) - startMs - (event.start.allDay ? 24 * 3600 * 1000 : 0))
      : (event.start.allDay ? 0 : 3600 * 1000);

    if (!event.rrule) {
      if (startMs + durationMs >= fromMs && startMs <= toMs) push(event, startMs, startMs + durationMs);
      continue;
    }

    const exdateMs = new Set(event.exdates.map(partsToMs));
    let produced = 0;
    for (const parts of ruleStarts(event.start, event.rrule)) {
      const occurrenceMs = partsToMs(parts);
      if (event.rrule.until != null && occurrenceMs > event.rrule.until) break;
      produced++;
      if (event.rrule.count != null && produced > event.rrule.count) break;
      if (occurrenceMs > toMs) break;
      if (exdateMs.has(occurrenceMs)) continue;
      const override = event.uid ? overrides.get(`${event.uid}@${occurrenceMs}`) : null;
      if (override) {
        const oStart = partsToMs(override.start);
        const oEnd = override.end ? partsToMs(override.end) : oStart + durationMs;
        if (oEnd >= fromMs && oStart <= toMs) push({ ...event, ...override }, oStart, oEnd, true);
        continue;
      }
      if (occurrenceMs + durationMs < fromMs) continue;
      push(event, occurrenceMs, occurrenceMs + durationMs, true);
      if (out.length >= max * 2) break;
    }
  }

  out.sort((a, b) => a.start - b.start);
  return out.slice(0, max);
}

/* ---------- Conventions (the ApeironLF patterns) ---------- */

/** "Category: Title" → { category, title }; without a colon prefix category is null. */
export function splitCategory(summary) {
  const m = /^([^:]{1,24}):\s+(.+)$/.exec(String(summary ?? '').trim());
  if (!m || /https?$/i.test(m[1])) return { category: null, title: String(summary ?? '').trim() };
  return { category: m[1].trim(), title: m[2].trim() };
}

/** Signup link from the description: a line naming a signup wins, otherwise the first URL. */
export function findSignupLink(description) {
  const text = String(description ?? '');
  const urlPattern = /https?:\/\/[^\s<>"')\]]+/i;
  // Trailing punctuation belongs to the sentence, not to the link.
  const clean = (url) => url.replace(/[.,;:!?]+$/, '');
  for (const line of text.split('\n')) {
    if (/påmeld|pamel|sign\s?up|registrer/i.test(line)) {
      const m = urlPattern.exec(line);
      if (m) return clean(m[0]);
    }
  }
  const m = urlPattern.exec(text);
  return m ? clean(m[0]) : null;
}

/** The Monday 00:00 (local time) of the week a time falls in. */
export function startOfWeek(ms) {
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getTime();
}

/** The ISO 8601 week number of a time (local date): the week with the year's first Thursday is week 1. */
export function isoWeek(ms) {
  const d = new Date(ms);
  const thursday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  const firstWeekStart = new Date(firstThursday.getFullYear(), 0, firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7));
  return 1 + Math.round((thursday - firstWeekStart) / (7 * 24 * 3600 * 1000));
}

/**
 * Where the occurrence window starts for a view: the whole year for a year
 * view, the current month, week or day for those views, and six hours back
 * for the lists and the card, so an event under way still shows.
 */
export function windowStart(view, now = Date.now()) {
  const d = new Date(now);
  if (view === 'year') return new Date(d.getFullYear(), 0, 1).getTime();
  if (view === 'month') return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  if (view === 'week') return startOfWeek(now);
  if (view === 'day') return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return now - 6 * 3600 * 1000;
}

const MEETING_HOSTS = /^(?:[a-z0-9-]+\.)*(?:zoom\.us|teams\.microsoft\.com|teams\.live\.com|meet\.google\.com|whereby\.com|meet\.jit\.si|webex\.com)$/i;

/**
 * The first address in the texts that leads to a video meeting (Zoom, Teams,
 * Google Meet, Whereby, Jitsi, Webex), or null. The host is compared exactly,
 * never by a substring.
 * @param {...string} texts The event's address, place and description
 */
export function findMeetingLink(...texts) {
  for (const text of texts) {
    for (const m of String(text ?? '').matchAll(/https?:\/\/[^\s<>"')\]]+/gi)) {
      try {
        const url = new URL(m[0].replace(/[.,;:!?]+$/, ''));
        if (MEETING_HOSTS.test(url.hostname)) return url.href;
      } catch { /* not an address */ }
    }
  }
  return null;
}

const pad = (n) => String(n).padStart(2, '0');
const utcStamp = (ms) => {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
};
const dayStamp = (ms) => {
  const d = new Date(ms);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
};
const escapeText = (text) => String(text ?? '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** The start and the end of one occurrence as iCal stamps: dates for an all-day event (the end exclusive), UTC times otherwise. */
function stamps(occ) {
  const start = occ.start;
  const end = Number.isFinite(occ.end) && occ.end >= occ.start ? occ.end : occ.start;
  if (occ.allDay) return { start: dayStamp(start), end: dayStamp(end + 24 * 3600 * 1000), date: true };
  return { start: utcStamp(start), end: utcStamp(end > start ? end : start + 3600 * 1000), date: false };
}

/**
 * One occurrence as an iCal file, for «Add to calendar»: a calendar with
 * the one event, its title, place, description and address.
 * @param {{start: number, end?: number, allDay?: boolean, title?: string, summary?: string, location?: string, description?: string, url?: string, uid?: string}} occ
 */
export function eventIcs(occ) {
  const at = stamps(occ);
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Urd//Calendar//EN', 'BEGIN:VEVENT',
    `UID:${escapeText(occ.uid || `${at.start}-${occ.title ?? occ.summary ?? ''}`)}@urd`,
    `DTSTAMP:${utcStamp(occ.start)}`,
    at.date ? `DTSTART;VALUE=DATE:${at.start}` : `DTSTART:${at.start}`,
    at.date ? `DTEND;VALUE=DATE:${at.end}` : `DTEND:${at.end}`,
    `SUMMARY:${escapeText(occ.title ?? occ.summary)}`,
  ];
  if (occ.location) lines.push(`LOCATION:${escapeText(occ.location)}`);
  if (occ.description) lines.push(`DESCRIPTION:${escapeText(occ.description)}`);
  if (occ.url) lines.push(`URL:${occ.url}`);
  lines.push('END:VEVENT', 'END:VCALENDAR');
  return `${lines.join('\r\n')}\r\n`;
}

/** The address that opens one occurrence as a new event in Google Calendar. */
export function googleEventUrl(occ) {
  const at = stamps(occ);
  const params = new URLSearchParams({ action: 'TEMPLATE', text: occ.title ?? occ.summary ?? '', dates: `${at.start}/${at.end}` });
  if (occ.location) params.set('location', occ.location);
  if (occ.description) params.set('details', occ.description);
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** The first picture address in the description (a link ending in an image file), or null. */
export function findImageLink(description) {
  const m = /https?:\/\/[^\s<>"')\]]+\.(?:jpe?g|png|webp|gif|avif)(?:\?[^\s<>"')\]]*)?/i.exec(String(description ?? ''));
  return m ? m[0] : null;
}

/**
 * Normalizes a source the way the owner writes it:
 * webcal:// → https://, https is kept, http is lifted to https, and a bare
 * Google calendar id (someone@gmail.com / ...@group.calendar.google.com)
 * becomes its public ICS address. An unknown form gives null.
 */
export function normalizeSourceUrl(input) {
  const raw = String(input ?? '').trim();
  if (!raw) return null;
  if (/^webcal:\/\//i.test(raw)) return 'https://' + raw.slice('webcal://'.length);
  if (/^https:\/\//i.test(raw)) return raw;
  if (/^http:\/\//i.test(raw)) return 'https://' + raw.slice('http://'.length);
  if (/^[^\s/]+@[^\s/]+$/.test(raw)) {
    return `https://calendar.google.com/calendar/ical/${encodeURIComponent(raw)}/public/basic.ics`;
  }
  return null;
}

/**
 * A source as the block reads it: the address alone, or an object with an
 * address, a name and a colour. A named calendar is a category of its own
 * (its events wear the name as their chip, whatever their titles say), and a
 * colour tints that calendar's chips and date badges. Pure.
 * @param {unknown} source A string, or `{ url, name?, color? }`
 * @returns {{url: string, name: string, color: string}}
 */
export function sourceEntry(source) {
  if (source && typeof source === 'object') {
    return {
      url: String(source.url ?? '').trim(),
      name: typeof source.name === 'string' ? source.name.trim() : '',
      color: typeof source.color === 'string' ? source.color.trim() : '',
    };
  }
  return { url: String(source ?? '').trim(), name: '', color: '' };
}

/** Subscribe links for a source: webcal always; Google calendars also get "add to Google". */
export function subscribeLinks(url) {
  const normalized = normalizeSourceUrl(url);
  if (!normalized) return null;
  const links = { webcal: 'webcal://' + normalized.slice('https://'.length), google: null };
  const m = /^https:\/\/calendar\.google\.com\/calendar\/ical\/([^/]+)\//.exec(normalized);
  if (m) links.google = `https://calendar.google.com/calendar/r?cid=${m[1]}`;
  return links;
}

/* ---------- The calendar block's view logic (pure) ---------- */

/** How many events the «next» card holds: 1 to 3, one for anything else. */
export const NEXT_COUNT = { min: 1, max: 3, dflt: 1 };

/** How many more the card lists under «Later»: 0 to 10, none for anything else. */
export const LATER_COUNT = { min: 0, max: 10, dflt: 0 };

/** The events in the «next» card, inside the bounds. */
export function nextCount(count) {
  const n = Number(count);
  if (!Number.isFinite(n)) return NEXT_COUNT.dflt;
  return Math.min(NEXT_COUNT.max, Math.max(NEXT_COUNT.min, Math.round(n)));
}

/** The events under «Later», inside the bounds. */
export function laterCount(count) {
  const n = Number(count);
  if (!Number.isFinite(n)) return LATER_COUNT.dflt;
  return Math.min(LATER_COUNT.max, Math.max(LATER_COUNT.min, Math.round(n)));
}

/**
 * The same event from two calendars is one event: occurrences that start at
 * the same time under the same title (case and outer spaces aside) are merged
 * into the first of them, which takes over a signup link or a location the
 * later copy has and it lacks. The order is kept.
 * @param {Array<object>} occurrences With `start` and `title` (or `summary`)
 * @returns {Array<object>}
 */
export function dedupeOccurrences(occurrences) {
  const seen = new Map();
  const out = [];
  for (const occ of Array.isArray(occurrences) ? occurrences : []) {
    const key = `${occ.start}|${String(occ.title ?? occ.summary ?? '').trim().toLowerCase()}`;
    const first = seen.get(key);
    if (!first) {
      const copy = { ...occ };
      seen.set(key, copy);
      out.push(copy);
      continue;
    }
    if (!first.signup && occ.signup) first.signup = occ.signup;
    if (!first.location && occ.location) first.location = occ.location;
    if (!first.category && occ.category) first.category = occ.category;
  }
  return out;
}

/**
 * Occurrences under their month, in the order given, for the agenda view.
 * @param {Array<{start: number}>} occurrences Sorted by start
 * @returns {Array<{year: number, month: number, items: Array<object>}>} month is 0 to 11
 */
export function groupByMonth(occurrences) {
  const groups = [];
  for (const occ of Array.isArray(occurrences) ? occurrences : []) {
    const start = new Date(occ.start);
    const year = start.getFullYear();
    const month = start.getMonth();
    const last = groups[groups.length - 1];
    if (last && last.year === year && last.month === month) last.items.push(occ);
    else groups.push({ year, month, items: [occ] });
  }
  return groups;
}
