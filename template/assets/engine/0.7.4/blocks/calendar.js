/**
 * Core block: calendar. A subscribable event calendar built from iCal feeds
 * (Google Calendar, Nextcloud, Outlook and others), following the ApeironLF
 * design requirements. Fetching ALWAYS goes through the site's own feed proxy
 * (/api/ics): feed hosts send no CORS, and the site's CSP allows connect-src
 * 'self' only. Locally, without functions, the preview shows demo data and
 * visitors get a quiet empty state.
 *
 * Views: list (date-badge rows), cards, month, agenda (compact rows under
 * their month) and next (a card for the next one to three events, with more
 * listed under «Later»). The sources are merged, and the same event from two
 * calendars is shown once. A source can carry a name and a colour: the name
 * is then the category of everything in that calendar (the chip, and the
 * filter), and the colour tints its chips and date badges. A view with
 * nothing to show draws a visible empty state, with the owner's own words and
 * icon when set. Conventions: "Category: Title" gives category chips with a filter,
 * and a signup link in the description becomes a button.
 *
 * The look is a design (calendar-designs.js): the plain one draws every
 * view on the theme's colours, and every design exposes its colour slots,
 * an optional edge stripe on its boxes, the sign-up and subscribe buttons as
 * switches, and a style per event field, all set in the Style tab. The
 * static texts (the labels and the buttons' words) are rewritten by clicking
 * them in the preview, with the text toolbar, and stored as HTML under
 * `texts`. The parser (ics.js) and the design model are loaded on the first
 * render, never in the visitor closure. The sources, the view and the count
 * are edited in the Properties panel; the help chip (ADR-0008) explains the
 * conventions.
 */
// t() for visitor texts (the site language), ta() for the editor chrome
// (the admin language), dates() for month and weekday names, tp() for
// plurals; never called at module level.
import { t, ta, tp, taApiError, dates, adminLocaleReady } from '../i18n.js';
import { iconSvg } from '../icons.js';
import { resolveColor } from '../theme.js';
import { stripActiveContent, safeHtmlFragment } from '../sanitize.js';

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

/* ---------- Fetching (proxy + short-lived cache) ---------- */

const CACHE_TTL = 10 * 60 * 1000;

async function fetchSource(url) {
  const key = `urd-cal-cache:${url}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) ?? 'null');
    if (cached && Date.now() - cached.t < CACHE_TTL) return cached.text;
  } catch { /* a corrupt cache entry is ignored */ }
  const res = await fetch(`/api/ics?url=${encodeURIComponent(url)}`);
  if (!res.ok) {
    const detail = taApiError(await res.json().catch(() => null));
    throw new Error(detail ?? ta('calendar.feedStatus', { status: res.status }));
  }
  const text = await res.text();
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), text })); } catch { /* a full store is fine */ }
  return text;
}

/** All sources → sorted occurrences with category and signup link. */
async function loadOccurrences(ics, cf, sources, limit, view, from, zone, meetingHosts) {
  const errors = [];
  const events = [];
  let feedZone = null;
  await Promise.all(sources.map(async (source) => {
    const entry = ics.sourceEntry(source);
    const url = ics.normalizeSourceUrl(entry.url);
    if (!url) { errors.push(ta('calendar.unknownSource', { source: entry.url })); return; }
    try {
      // Every event remembers the calendar it came from: its name and colour.
      const feed = ics.parseIcs(await fetchSource(url));
      feedZone ??= feed.timezone;
      for (const event of feed.events) events.push({ ...event, calendar: entry.name, calendarColor: entry.color });
    } catch (error) {
      errors.push(`${url}: ${error.message}`);
    }
  }));
  // The window follows the view: a year design wants the whole year, a month, week or day design its own span.
  const wide = ['year', 'month', 'week', 'day'].includes(view) || from < ics.windowStart('list');
  const expanded = ics.expandEvents(events, { from, max: wide ? 600 : Math.max(limit * 4, 120) })
    .map((occ) => {
      // A named calendar is the category; otherwise the feed's own first category, and last «Category: Title» in the event itself.
      const named = occ.calendar || occ.categories?.[0];
      const split = named ? { category: named, title: occ.summary } : ics.splitCategory(occ.summary);
      return { ...occ, ...split, color: occ.calendarColor || '', signup: ics.signupLinkOf(occ, meetingHosts), image: occ.image || ics.findImageLink(occ.description) };
    });
  // The sources are one calendar to the visitor: an event that stands in two of them is shown once.
  // With a zone set for the site, every time is moved to that zone's clock; `real` keeps the moment itself for the countdowns.
  const placed = zone ? expanded.map((occ) => ({ ...occ, real: occ.start, start: cf.shiftToZone(occ.start, zone), end: cf.shiftToZone(occ.end, zone) })) : expanded;
  return { occurrences: ics.dedupeOccurrences(placed), errors, feedZone };
}

/* ---------- Demo data (preview only, when no sources or feed) ---------- */

/** A drawn picture for the sample data: hills under a sun, as an inline SVG the preview may load from itself. */
const DEMO_IMAGE = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="800" height="450" fill="#bfe3dd"/><circle cx="610" cy="130" r="64" fill="#f6d77a"/><path d="M0 330 L170 200 L300 300 L450 150 L640 310 L800 220 L800 450 L0 450Z" fill="#3f8f80"/><path d="M0 380 L220 290 L420 370 L620 300 L800 360 L800 450 L0 450Z" fill="#256b5f"/></svg>')}`;

function demoOccurrences() {
  const day = 24 * 3600 * 1000;
  const base = Date.now();
  // The sample events carry what a real feed can: an end, a description with a link, a picture, a sign-up, a meeting link, a repeat and a cancellation.
  return [
    { start: base + 3 * day, end: base + 3 * day + 2 * 3600 * 1000, allDay: false, title: ta('calendar.demoTitle1'), category: ta('calendar.demoCat1'), location: ta('calendar.demoLoc1'), signup: null, description: `${ta('calendar.demoDesc2')} https://meet.jit.si/urd-example`, hasEnd: true, demo: true },
    { start: base + 10 * day, end: base + 10 * day + 3600 * 1000, allDay: false, title: ta('calendar.demoTitle2'), category: ta('calendar.demoCat2'), location: ta('calendar.demoLoc1'), signup: null, description: ta('calendar.demoDesc3'), recurring: true, demo: true },
    { start: base + 17 * day, end: base + 18 * day, allDay: true, title: ta('calendar.demoTitle3'), category: ta('calendar.demoCat3'), location: ta('calendar.demoLoc2'), signup: 'https://example.org/signup', description: `${ta('calendar.demoDesc4')} https://example.org/signup`, demo: true },
    { start: base + day, end: base + day + 90 * 60 * 1000, allDay: false, title: ta('calendar.demoTitle4'), category: ta('calendar.demoCat1'), location: ta('calendar.demoLoc1'), signup: 'https://example.org/signup', description: `${ta('calendar.demoDesc1')} https://example.org/training`, image: DEMO_IMAGE, hasEnd: true, demo: true },
    { start: base - 9 * day, end: base - 9 * day + 3600 * 1000, allDay: false, title: ta('calendar.demoTitle2'), category: ta('calendar.demoCat2'), location: ta('calendar.demoLoc1'), signup: null, description: ta('calendar.demoDesc3'), recurring: true, hasEnd: true, demo: true },
    { start: base + 5 * day, end: base + 5 * day, allDay: true, title: ta('calendar.demoTitle5'), category: ta('calendar.demoCat2'), location: ta('calendar.demoLoc2'), signup: null, description: '', cancelled: true, demo: true },
  ].sort((a, b) => a.start - b.start);
}

/* ---------- Formatting ---------- */

const two = (n) => String(n).padStart(2, '0');

/** The date, time and place as one string: the month view's tooltip. The views draw it as fields (makeUi). */
function metaLine(occ) {
  const start = new Date(occ.start);
  const d = dates();
  const parts = [t('calendar.dateLine', {
    wd: d.weekdaysShort[(start.getDay() + 6) % 7],
    d: start.getDate(),
    m: d.monthsShort[start.getMonth()],
  })];
  if (!occ.allDay) parts.push(t('calendar.timeAt', { time: `${two(start.getHours())}:${two(start.getMinutes())}` }));
  if (occ.location) parts.push(occ.location);
  return parts.join(' · ');
}

/** The event's calendar colour on a box, so its chip, badge and stripe follow the calendar. */
function tintNode(node, occ) {
  if (occ.color) node.style.setProperty('--urd-cal-color', resolveColor(occ.color));
  // A cancelled event's box is marked, so its title is struck in every design.
  if (occ.cancelled) node.classList.add('urd-cal-cancelled');
  return node;
}

function badgeNode(occ, ui) {
  const start = new Date(occ.start);
  const badge = tintNode(el2('div', 'urd-collection-badge'), occ);
  badge.append(ui.field('strong', 'number', String(start.getDate()), null, start), ui.field('span', 'date', dates().monthsShort[start.getMonth()], null, start));
  return badge;
}

function chipNode(category, color, ui) {
  if (!category) return null;
  const chip = ui.field('span', 'category', category, 'urd-cal-chip');
  if (color) chip.style.setProperty('--urd-cal-color', resolveColor(color));
  return chip;
}

/** «Today!», «Tomorrow» or «In N days» for an event. */
function countdownText(occ) {
  const days = Math.max(0, Math.round(((occ.real ?? occ.start) - Date.now()) / (24 * 3600 * 1000)));
  // Dedicated keys instead of Intl.RelativeTimeFormat: the exclaiming
  // today wording is kept, and ICU has no North Sami (it would fall back to
  // a bare number).
  return days === 0 ? t('calendar.today') : days === 1 ? t('calendar.tomorrow') : tp('calendar.inDays', days);
}

/**
 * The event's picture through the site's own picture route (the CSP allows
 * pictures from the site itself only, and the route checks the host against
 * the picture allowlist); null when the event has none.
 */
function imageUrl(occ, width = 800) {
  if (!occ.image) return null;
  // The sample data's own drawing is loaded as it is; a feed's picture always goes through the route.
  if (occ.demo && occ.image.startsWith('data:image/svg+xml,')) return occ.image;
  return `/api/photo?p=u&u=${encodeURIComponent(occ.image)}&w=${width}`;
}

/* ---------- The design's helpers (fields, static texts, buttons) ---------- */

/**
 * The helpers a draw hands its view. `field` builds an element for an event
 * field (title, date, time, place, description, category, number) carrying
 * the owner's style for that field; `meta` is the date, time and place line
 * as such fields; `tx` is a static text (a label or a button's words) that
 * the owner rewrites by clicking it in the preview, where the text toolbar
 * attaches to it as to a text block; `signup` is the sign-up button when the
 * block shows them; `recurring` is the mark on an event that repeats,
 * `program` the link to the whole programme when the block has an address
 * for it, and `openToAll` the words on an event without a sign-up. `filter`
 * is the category filter for a design that draws its own, and `offset`,
 * `total` and `rest` tell a list design where in the whole list its rows
 * stand when the block folds the rest. `opt` holds the design's own
 * settings (calOptions). Every edit posts the whole props with the text under
 * its key in `texts`, so the editor's draft stays the owner of the words.
 */
function makeUi(cd, cf, ics, maps, links, el, host, props, ctx, sources, zone) {
  const lang = ctx.site?.site?.lang;
  const clock12 = cf.calClock12(props);
  const weekStart = cf.calWeekStart(props, lang);
  const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
  // The keys of a day grid belong to the visitor: with the editing handles on in the preview they are left alone.
  const keysOn = () => !ctx.preview || document.body.classList.contains('urd-chrome-off');
  // The coordinates a feed gives a place (GEO), by the place's text, so every link to that place leads to the same point.
  const places = new Map();
  const post = (msg) => window.parent?.postMessage(msg, location.origin);
  const field = (tag, key, text, className, when) => {
    const node = el2(tag, className ? `${className} urd-cal-f-${key}` : `urd-cal-f-${key}`);
    // A description keeps its addresses as links, and a place leads to the map (or to itself, when it is an address).
    if (key === 'description' && text) linkedText(node, text);
    else if (key === 'place' && text) node.appendChild(placeLink(text, maps, maps.mapService(ctx.site), places.get(text)));
    else if (text != null) node.textContent = text;
    // A date or a time with the day or the event behind it (`when`) is written as a `<time>` a machine can read.
    const stamp = when != null && text ? cf.dateTimeAttr(when, key === 'time') : null;
    if (stamp) {
      const time = el2('time', null, text);
      time.dateTime = stamp;
      node.replaceChildren(time);
    }
    Object.assign(node.style, cd.calFieldCss(props.fieldStyle?.[key]));
    return node;
  };
  /** The first line of a description cut to a length, never inside a word or an address. */
  const excerpt = (description, max = 140) => excerptOf(description, max);
  /** The event's last day as «6. okt», for an event that ends on a later day than it starts. */
  const endDate = (occ) => {
    const end = new Date(occ.end);
    return t('calendar.dayMonth', { d: end.getDate(), m: dates().monthsShort[end.getMonth()] });
  };
  /**
   * The event's time as it is written: «18:00-21:00» with its end, «all day»,
   * «until 6 Oct» for a span of days, and «Cancelled» for a cancelled event.
   * The clock is 24 hours unless the block is set to 12.
   */
  const time = (occ) => {
    if (occ.cancelled) return t('calendar.cancelled');
    const multi = cf.isMultiDay(occ);
    if (occ.allDay) return multi ? t('calendar.until', { date: endDate(occ) }) : t('calendar.allDay');
    const { from, to } = cf.timeRange(occ, clock12);
    if (multi) return t('calendar.timeRange', { from, to: `${endDate(occ)} ${to ?? ''}`.trim() });
    return to ? t('calendar.timeRange', { from, to }) : from;
  };
  /** The time with the language's word before a clock time («kl. 18:00»). */
  const timeText = (occ) => (occ.cancelled || occ.allDay ? time(occ) : t('calendar.timeAt', { time: time(occ) }));
  /** True when the event has something to write where the time stands: a clock time, a later last day, or its cancellation. */
  const hasTime = (occ) => !occ.allDay || occ.cancelled || cf.isMultiDay(occ);
  const meta = (occ, { date = true, place = true } = {}) => {
    const start = new Date(occ.start);
    const d = dates();
    const parts = [];
    if (date) {
      parts.push(field('span', 'date', t('calendar.dateLine', {
        wd: d.weekdaysShort[(start.getDay() + 6) % 7],
        d: start.getDate(),
        m: d.monthsShort[start.getMonth()],
      }), null, start));
    }
    if (hasTime(occ)) parts.push(field('span', 'time', timeText(occ), null, occ));
    if (place && occ.location) parts.push(field('span', 'place', occ.location));
    if (!parts.length) return null;
    const line = el2('div', 'urd-cal-meta');
    parts.forEach((part, i) => {
      if (i) line.appendChild(document.createTextNode(' · '));
      line.appendChild(part);
    });
    return line;
  };
  const tx = (key, className) => {
    const node = el2('span', className ? `urd-cal-tx ${className}` : 'urd-cal-tx');
    const html = cd.calTextHtml(props.texts, key);
    if (html) {
      node.innerHTML = html;
      // Visitor protection: executable code is always stripped on render.
      stripActiveContent(node);
    } else {
      node.textContent = t(cd.CAL_TEXTS[key]);
    }
    if (editable) {
      // The text toolbar attaches to .urd-text fields; a click in the words
      // edits them and never reaches the button or link around them.
      // In the Clean view the words are plain text and the link around them works (urd.js switches this with the handles).
      const clean = () => document.body.classList.contains('urd-chrome-off');
      node.classList.add('urd-text');
      node.contentEditable = clean() ? 'false' : 'true';
      node.addEventListener('click', (event) => { if (!clean()) event.stopPropagation(); });
      node.addEventListener('input', () => {
        post({
          type: 'urd-edit',
          sectionId: ctx.section.id,
          blockId: el.dataset.blockId,
          props: { ...props, texts: { ...(props.texts ?? {}), [key]: node.innerHTML } },
        });
      });
    }
    return node;
  };
  /** A link whose words are a static text. */
  const link = (className, key, href, title) => {
    const a = el2('a', className);
    a.href = href;
    a.title = title;
    a.appendChild(tx(key));
    // With the editing handles on, the words are edited and the link is never followed; in the Clean view it works as published.
    if (editable) a.addEventListener('click', (event) => { if (!document.body.classList.contains('urd-chrome-off')) event.preventDefault(); });
    return a;
  };
  const signup = (occ) => {
    if (!occ.signup || occ.cancelled || props.showSignup !== true) return null;
    const a = link('urd-cal-signup', 'signup', occ.signup, ui.hosted(t('calendar.signupTitle'), occ.signup));
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  };
  const chip = (occ) => chipNode(occ.category, occ.color, ui);
  /**
   * The event's box: tinted by its calendar, and opening the event in full
   * at a click or Enter. A click on a link, a button or a text being edited
   * is left to that element, and with the editing handles on in the preview
   * a click selects the block as before.
   */
  const tint = (node, occ) => {
    tintNode(node, occ);
    if (node.closest?.('a, button') || /^(A|BUTTON)$/.test(node.tagName)) return node;
    node.classList.add('urd-cal-event');
    node.tabIndex = 0;
    node.setAttribute('aria-haspopup', 'dialog');
    const open = (event) => {
      if (event.target.closest('a, button, input, [contenteditable="true"]')) return;
      if (ctx.preview && !document.body.classList.contains('urd-chrome-off')) return;
      event.stopPropagation();
      openEvent(occ, node);
    };
    node.addEventListener('click', open);
    node.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.target !== node) return;
      event.preventDefault();
      open(event);
    });
    return node;
  };
  /** The event in full, in a native dialog over the page (ADR-0011). */
  const openEvent = (occ, from) => showEventDialog(occ, from, ics, ui, props);
  /** The mark on an event that repeats, with words the owner can rewrite; null on a single event. */
  const recurring = (occ) => {
    if (!occ.recurring) return null;
    const mark = el2('span', 'urd-cal-rec');
    mark.appendChild(tx('recurring'));
    return mark;
  };
  /** The link to the whole programme; null when the block has no address or the design draws none. */
  const program = (className) => {
    const to = cd.calProgramHref(props);
    return to ? link(className ? `urd-cal-program ${className}` : 'urd-cal-program', 'wholeProgram', to, '') : null;
  };
  /** «Open to everyone» on an event without a sign-up, for a design that writes it; null when switched off. */
  const openToAll = (occ) => {
    if (occ.signup || props.showOpen === false || !cd.calDesign(props.design).open) return null;
    return tx('openToAll', 'urd-cal-open');
  };
  /** The subscribe buttons, for a design that places them itself; null when they are off or there is no source. */
  const subscribe = () => (props.showSubscribe !== false && sources.length ? subscribeRow(ics, sources, ui) : null);
  /** The event's own page: the address the feed gives it, else its sign-up link; null without either. */
  const href = (occ) => (typeof occ.url === 'string' && /^https?:\/\//i.test(occ.url) ? occ.url : occ.signup || null);
  const ui = { el: el2, tint, field, meta, tx, link, signup, chip, recurring, program, openToAll, subscribe, href, countdown: countdownText, image: imageUrl, all: [], offset: 0, total: 0, rest: false, filter: null, opt: cd.calOptions(props), time, timeText, hasTime, excerpt, sources,
    /** The week as the site's language lays it out: the empty cells before the first of a month, the weekday names in order, and the first day of a week. */
    lead: (first) => cf.leadDays(first, weekStart),
    dows: () => cf.orderWeekdays(dates().weekdaysShort, weekStart),
    weekStartOf: (ms) => cf.startOfWeek(ms, weekStart),
    /** Now, on the clock the times are shown in. */
    today: () => new Date(zone ? cf.shiftToZone(Date.now(), zone) : Date.now()),
    /** True on the phone, where a design with seven columns draws its phone layout. */
    phone: ctx.viewport === 'mobile',
    /** A label that names the week, month or day shown: a change of it is read out by a screen reader. */
    live: (node) => {
      node.setAttribute('aria-live', 'polite');
      node.setAttribute('aria-atomic', 'true');
      return node;
    },
    /** A day cell's name for a screen reader: the date and the number of events on it. */
    dayLabel: (node, date, count) => {
      const names = dates();
      if (node.tagName !== 'BUTTON') node.setAttribute('role', 'group');
      node.setAttribute('aria-label', `${names.weekdays[(date.getDay() + 6) % 7]} ${t('calendar.dayMonth', { d: date.getDate(), m: names.months[date.getMonth()] })}, ${tp('calendar.count', count)}`);
      return node;
    },
    dayGrid: (grid, selector, opts) => dayGrid(grid, selector, opts, keysOn),
    keepFocus: (grid) => { const state = GRIDS.get(grid); if (state) Object.assign(state, { want: 'current', focus: true }); },
    phoneDays: (grid, panel, year, month, occs, cellClass) => phoneDays(ui, grid, panel, year, month, occs, cellClass),
    places,
    /** The site's own meeting hosts (site.meetingHosts), beside the services known by their host. */
    meetingHosts: links.meetingHostList(ctx.site?.site?.meetingHosts),
    /** A button's tooltip with the host it leads to, so a visitor sees where a press goes. */
    hosted: (words, address) => {
      const host = links.linkHost(address);
      return host ? (words ? `${words} (${host})` : host) : words;
    },
    mapUrl: (place, geo) => maps.mapSearchUrl(place, maps.mapService(ctx.site), geo) };
  return ui;
}

/* ---------- The event in full ---------- */

/** A place as a link: to the map as a search for its words, or to itself when the place is an address. */
function placeLink(place, maps, service, geo) {
  const a = el2('a', 'urd-cal-place-link', place);
  a.href = /^https?:\/\/\S+$/i.test(place.trim()) ? place.trim() : maps.mapSearchUrl(place, service, geo);
  a.target = '_blank';
  a.rel = 'noopener';
  return a;
}

/** The first line of a description, cut at a word boundary near `max` and never inside an address. */
function excerptOf(description, max) {
  const line = String(description ?? '').split('\n')[0].trim();
  if (line.length <= max) return line;
  let cut = line.lastIndexOf(' ', max);
  if (cut < max * 0.5) cut = max;
  // An address that straddles the cut is kept whole.
  for (const m of line.matchAll(/https?:\/\/[^\s<>"')\]]+/gi)) {
    if (m.index < cut && m.index + m[0].length > cut) cut = m.index + m[0].length;
  }
  return cut >= line.length ? line : `${line.slice(0, cut).trimEnd()} …`;
}

/** Plain text with its addresses as links and its line breaks kept. */
function linkedText(node, text) {
  const parts = String(text).split(/(https?:\/\/[^\s<>"')\]]+)/gi);
  parts.forEach((part, i) => {
    if (i % 2) {
      const address = part.replace(/[.,;:!?]+$/, '');
      const a = el2('a', null, address);
      a.href = address;
      a.target = '_blank';
      a.rel = 'noopener';
      node.append(a, part.slice(address.length));
      return;
    }
    part.split('\n').forEach((line, n) => {
      if (n) node.appendChild(document.createElement('br'));
      if (line) node.appendChild(document.createTextNode(line));
    });
  });
}

/** The feed's description: markup from the feed with everything active stripped, or plain text with its links. */
function descriptionNode(description, ui) {
  const box = ui.field('div', 'description', '', 'urd-cal-dialog-text');
  if (/<[a-z][^>]*>/i.test(description)) {
    // A feed's HTML is somebody else's markup: only what the allowlist keeps is drawn.
    box.appendChild(safeHtmlFragment(description));
  } else {
    linkedText(box, description);
  }
  return box;
}

const CLEAR = /^(?:transparent|rgba\(0, 0, 0, 0\))$/;

/** A computed colour as [r, g, b, a]; null for anything else than rgb() and rgba(). */
function rgba(colour) {
  const m = /^rgba?\(([^)]+)\)$/.exec(String(colour).trim());
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  if (parts.length < 3 || parts.some((n) => !Number.isFinite(n))) return null;
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

/** One colour laid over another. */
const over = (top, under) => top.slice(0, 3).map((c, i) => c * top[3] + under[i] * (1 - top[3]));

/** The relative luminance of a colour (WCAG). */
function luminance([r, g, b]) {
  const lin = (c) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** The contrast between two colours, 1 to 21. */
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Black or white, whichever reads better on a colour. */
const readableOn = (colour) => (luminance(colour) > 0.4 ? [17, 17, 17] : [255, 255, 255]);
const css = (colour) => `rgb(${colour.slice(0, 3).map(Math.round).join(' ')})`;

/**
 * Dresses the dialog as the card it was opened from, so every design gets
 * its own: the ground (colour, gradient and blur) of the event's box or of
 * the nearest box around it that has one, its text colour, corners and
 * border, the face and weight of its title, and the design's accent. What
 * the design does not set falls back to the theme in base.css.
 */
function dressDialog(dialog, from) {
  const host = from?.closest?.('.urd-cal');
  if (!host) return;
  let ground = from;
  while (ground && ground !== host.parentElement) {
    const cs = getComputedStyle(ground);
    if (!CLEAR.test(cs.backgroundColor) || cs.backgroundImage !== 'none') break;
    ground = ground.parentElement;
  }
  const set = (name, value) => { if (value) dialog.style.setProperty(name, value); };
  const own = getComputedStyle(from);
  if (ground && ground !== host.parentElement) {
    const cs = getComputedStyle(ground);
    set('--urd-cal-dlg-bg', cs.backgroundColor);
    if (cs.backgroundImage !== 'none' && !cs.backgroundImage.includes('url(')) set('--urd-cal-dlg-image', cs.backgroundImage);
    if (cs.backdropFilter && cs.backdropFilter !== 'none') set('--urd-cal-dlg-blur', cs.backdropFilter);
    set('--urd-cal-dlg-radius', `min(${cs.borderTopLeftRadius}, 28px)`);
    if (parseFloat(cs.borderTopWidth) > 0) set('--urd-cal-dlg-border', `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`);
  }
  set('--urd-cal-dlg-font', own.fontFamily);
  // The colours are checked before they are used: a see-through ground is
  // laid on the theme's surface, and words that would not read on the
  // ground become black or white.
  const surface = rgba(getComputedStyle(document.body).backgroundColor) ?? [255, 255, 255, 1];
  const raw = rgba(dialog.style.getPropertyValue('--urd-cal-dlg-bg')) ?? surface;
  const blurred = Boolean(dialog.style.getPropertyValue('--urd-cal-dlg-blur'));
  const solid = raw[3] < 1 ? over(raw, surface) : raw.slice(0, 3);
  if (raw[3] < 1 && !blurred) dialog.style.setProperty('--urd-cal-dlg-bg', css(solid));
  const words = rgba(own.color);
  const text = words && contrast(words, solid) >= 4.5 ? words : readableOn(solid);
  set('--urd-cal-dlg-text', css(text));
  dialog.dataset.ground = css(solid);
  const title = from.matches('.urd-cal-f-title') ? from : from.querySelector('.urd-cal-f-title');
  if (title) {
    const cs = getComputedStyle(title);
    set('--urd-cal-dlg-title-font', cs.fontFamily);
    set('--urd-cal-dlg-title-weight', cs.fontWeight);
    const titleColour = rgba(cs.color);
    if (titleColour && contrast(titleColour, solid) >= 3) set('--urd-cal-dlg-title-color', cs.color);
    set('--urd-cal-dlg-title-case', cs.textTransform);
    set('--urd-cal-dlg-title-style', cs.fontStyle);
  }
  // The accent: the colour the design gives its own small words (the date, a number), else the calendar's accent.
  const mark = from.querySelector('.urd-cal-f-number, .urd-cal-f-date');
  const probe = el2('i');
  probe.style.color = 'var(--urd-cal-accent)';
  host.appendChild(probe);
  const hostAccent = getComputedStyle(probe).color;
  probe.remove();
  const marked = mark ? getComputedStyle(mark).color : '';
  const accent = [marked !== own.color ? marked : '', hostAccent].map(rgba).find((c) => c && contrast(c, solid) >= 3) ?? text;
  set('--urd-cal-dlg-accent', css(accent));
  set('--urd-cal-dlg-on-accent', css(readableOn(accent)));
}

/**
 * Opens one event in a native dialog: the date and the time, the title, the
 * place as a link to the map, the calendar it belongs to, the picture, the
 * whole description with its links, and the sign-up, the meeting link and
 * «Add to calendar» (a file with the one event, and the Google link). The
 * dialog is built per opening and removed when it closes; the focus returns
 * to the event it was opened from.
 */
function showEventDialog(occ, from, ics, ui, props) {
  const dialog = el2('dialog', 'urd-cal-dialog');
  dressDialog(dialog, from);
  const close = el2('button', 'urd-cal-dialog-close');
  close.type = 'button';
  close.setAttribute('aria-label', t('calendar.close'));
  close.innerHTML = iconSvg('cross') || '';
  if (!close.firstChild) close.textContent = '×';
  close.addEventListener('click', () => dialog.close('escape'));
  const start = new Date(occ.start);
  const d = dates();
  const when = ui.field('span', 'date', `${d.weekdays[(start.getDay() + 6) % 7]} ${t('calendar.dayMonth', { d: start.getDate(), m: d.months[start.getMonth()] })}`, 'urd-cal-dialog-date', start);
  const title = ui.field('h3', 'title', occ.title, 'urd-cal-dialog-title');
  if (occ.cancelled) title.classList.add('urd-cal-cancelled');
  dialog.append(close, when, title);
  const facts = el2('dl', 'urd-cal-dialog-facts');
  const fact = (key, value) => {
    const term = el2('dt');
    term.appendChild(ui.tx(key));
    const def = el2('dd');
    def.appendChild(value);
    facts.append(term, def);
  };
  fact('when', ui.field('span', 'time', ui.timeText(occ)));
  if (!occ.location && occ.geo) {
    // Coordinates without a place in words: the map itself is the place.
    const onMap = el2('a', 'urd-cal-place-link', t('calendar.onMap'));
    onMap.href = ui.mapUrl('', occ.geo);
    onMap.target = '_blank';
    onMap.rel = 'noopener';
    fact('where', onMap);
  }
  if (occ.location) {
    fact('where', ui.field('span', 'place', occ.location));
  }
  dialog.appendChild(facts);
  const meta = el2('div', 'urd-cal-dialog-meta');
  const chip = ui.chip(occ);
  if (chip) meta.appendChild(chip);
  const rec = occ.recurring ? el2('span', 'urd-cal-rec', t('calendar.recurring')) : null;
  if (rec) meta.appendChild(rec);
  if (meta.children.length) dialog.appendChild(meta);
  const src = ui.image(occ, 1000);
  if (src) {
    const img = document.createElement('img');
    img.className = 'urd-cal-dialog-img';
    img.alt = '';
    img.addEventListener('error', () => img.remove());
    img.src = src;
    dialog.appendChild(img);
  }
  // The feed's HTML description when it has one, else the plain one.
  if (occ.descriptionHtml || occ.description) dialog.appendChild(descriptionNode(occ.descriptionHtml || occ.description, ui));
  const actions = el2('div', 'urd-cal-dialog-actions');
  // The card shows the sign-up when the block does («Show sign-up button»).
  if (occ.signup && !occ.cancelled && props.showSignup === true) {
    const signup = ui.link('urd-cal-dialog-primary', 'signup', occ.signup, ui.hosted(t('calendar.signupTitle'), occ.signup));
    signup.target = '_blank';
    signup.rel = 'noopener';
    actions.appendChild(signup);
  }
  const meeting = occ.cancelled ? null : ics.meetingLinkOf(occ, ui.meetingHosts);
  if (meeting) {
    const join = ui.link('urd-cal-dialog-primary', 'join', meeting, ui.hosted('', meeting));
    join.target = '_blank';
    join.rel = 'noopener';
    actions.appendChild(join);
  }
  if (!occ.cancelled) {
    // The moment itself, when the times are shown on the site's own clock.
    const shift = occ.real != null ? occ.start - occ.real : 0;
    const real = { ...occ, start: occ.start - shift, end: Number.isFinite(occ.end) ? occ.end - shift : occ.end };
    // «Add to calendar» opens the ways to do it: this one event (to Google,
    // or as a file for the other calendar apps), or the whole calendar (a
    // subscription, and its iCal address to copy).
    const add = el2('details', 'urd-cal-dialog-add');
    const summary = el2('summary', 'urd-cal-dialog-link');
    summary.appendChild(ui.tx('addEvent'));
    const choices = el2('div', 'urd-cal-dialog-choices');
    const one = el2('span', 'urd-cal-dialog-choice-label');
    one.appendChild(ui.tx('addOne'));
    const google = ui.link('urd-cal-dialog-link', 'addGoogle', ics.googleEventUrl(real), '');
    google.target = '_blank';
    google.rel = 'noopener';
    const file = ui.link('urd-cal-dialog-link', 'addFile', URL.createObjectURL(new Blob([ics.eventIcs(real)], { type: 'text/calendar' })), '');
    file.download = `${String(occ.title || 'event').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60) || 'event'}.ics`;
    choices.append(one, google, file);
    const feeds = ui.sources.map((source) => ics.subscribeLinks(ics.sourceEntry(source).url)).filter(Boolean);
    if (feeds.length) {
      const whole = el2('span', 'urd-cal-dialog-choice-label');
      whole.appendChild(ui.tx('addWhole'));
      choices.appendChild(whole);
      for (const links of feeds) {
        choices.appendChild(ui.link('urd-cal-dialog-link', 'subscribe', links.webcal, t('calendar.subscribeTitle')));
        // The calendar's own address, to paste into a calendar app by hand.
        const row = el2('label', 'urd-cal-dialog-address');
        row.appendChild(ui.tx('icalAddress'));
        const field = el2('input');
        field.type = 'text';
        field.readOnly = true;
        field.value = links.webcal.replace(/^webcal:/, 'https:');
        field.addEventListener('focus', () => field.select());
        row.appendChild(field);
        choices.appendChild(row);
      }
    }
    add.append(summary, choices);
    actions.appendChild(add);
    dialog.addEventListener('close', () => URL.revokeObjectURL(file.href));
  }
  dialog.appendChild(actions);
  // The card lies over its calendar and leaves the page alone (a dialog that
  // is not modal): the page scrolls under it, and Escape or a press anywhere
  // outside it closes it. One card is open at a time.
  for (const other of document.querySelectorAll('dialog.urd-cal-dialog[open]')) other.close();
  const watch = new AbortController();
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    dialog.close('escape');
  }, { signal: watch.signal });
  document.addEventListener('pointerdown', (event) => {
    if (!dialog.contains(event.target)) dialog.close();
  }, { capture: true, signal: watch.signal });
  dialog.addEventListener('close', () => {
    watch.abort();
    // The focus goes back to the event when the card held it or Escape closed it; a press elsewhere keeps what it pressed.
    const back = dialog.returnValue === 'escape' || dialog.contains(document.activeElement);
    dialog.remove();
    if (back && from?.isConnected) from.focus({ preventScroll: true });
  });
  // The card is given a place in the part of the page that is in view before
  // it opens, so opening it (which moves the focus into it) never scrolls the page.
  dialog.style.left = `${window.scrollX + 8}px`;
  dialog.style.top = `${window.scrollY + 8}px`;
  document.body.appendChild(dialog);
  dialog.show();
  placeOverCalendar(dialog, from);
}

/**
 * Lays the card inside the calendar it belongs to, not over the page: no
 * wider and no taller than the calendar allows (its own content scrolls when
 * there is more), centred on the part of the calendar that is in view, never
 * over the navigation bar when it opens. It is placed on the page, so it
 * scrolls away with its calendar, and placed again when the window changes
 * or its own content unfolds. A calendar too low to hold a card lets it reach below
 * itself. The calendar is shaded behind it; the rest of the page is left as
 * it is.
 */
const CARD_MAX_W = 460;
const CARD_MIN_H = 300;

function placeOverCalendar(dialog, from) {
  const host = from?.closest?.('.urd-cal');
  if (!host) return;
  const shade = el2('i', 'urd-cal-shade');
  host.appendChild(shade);
  const place = () => {
    const box = host.getBoundingClientRect();
    // The navigation bar's height, when it stays at the top of the window.
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--urd-nav-h')) || 0;
    const roof = nav + 8;
    const floor = window.innerHeight - 8;
    const width = Math.max(240, Math.min(CARD_MAX_W, box.width - 24, window.innerWidth - 16));
    dialog.style.width = `${width}px`;
    // As tall as the calendar holds, but never so low that the card cannot be read, and never taller than the window under the bar.
    dialog.style.maxHeight = `${Math.max(Math.min(CARD_MIN_H, floor - roof), Math.min(box.height - 24, floor - roof))}px`;
    const top = Math.max(roof, box.top);
    const bottom = Math.min(floor, box.bottom);
    const height = dialog.offsetHeight;
    const centre = top + Math.max(0, bottom - top) / 2;
    // The place is on the page, not in the window: the card scrolls away with its calendar.
    const page = (dialog.offsetParent ?? document.documentElement).getBoundingClientRect();
    dialog.style.left = `${Math.max(8, Math.min(window.innerWidth - width - 8, box.left + (box.width - width) / 2)) - page.left}px`;
    dialog.style.top = `${Math.max(roof, Math.min(floor - height, Math.max(box.top + 12, centre - height / 2))) - page.top}px`;
  };
  const watch = new AbortController();
  window.addEventListener('resize', place, { signal: watch.signal });
  dialog.addEventListener('toggle', place, { capture: true, signal: watch.signal });
  dialog.addEventListener('close', () => {
    watch.abort();
    shade.remove();
  });
  place();
}

/* ---------- Views ---------- */

function renderList(host, occs, props, ics, ui) {
  const list = el2('div', 'urd-collection-list');
  for (const occ of occs) {
    const row = ui.tint(el2('article', 'urd-collection-row'), occ);
    row.appendChild(badgeNode(occ, ui));
    const body = el2('div', 'urd-collection-body');
    const titleRow = el2('div', 'urd-cal-titlerow');
    titleRow.appendChild(ui.field('strong', 'title', occ.title, 'urd-collection-title'));
    const chip = chipNode(occ.category, occ.color, ui);
    if (chip) titleRow.appendChild(chip);
    body.appendChild(titleRow);
    const meta = ui.meta(occ);
    if (meta) body.appendChild(meta);
    const signup = ui.signup(occ);
    if (signup) body.appendChild(signup);
    row.appendChild(body);
    list.appendChild(row);
  }
  host.appendChild(list);
}

function renderCards(host, occs, props, ics, ui) {
  const grid = el2('div', 'urd-collection-cards');
  for (const occ of occs) {
    const card = ui.tint(el2('article', 'urd-collection-card'), occ);
    const top = el2('div', 'urd-cal-titlerow');
    const when = ui.meta(occ);
    if (when) {
      when.className = 'urd-collection-date';
      top.appendChild(when);
    }
    const chip = chipNode(occ.category, occ.color, ui);
    if (chip) top.appendChild(chip);
    card.appendChild(top);
    card.appendChild(ui.field('strong', 'title', occ.title, 'urd-collection-title'));
    const excerpt = ui.excerpt(occ.description);
    if (excerpt) card.appendChild(ui.field('div', 'description', excerpt, 'urd-collection-text'));
    const signup = ui.signup(occ);
    if (signup) card.appendChild(signup);
    grid.appendChild(card);
  }
  host.appendChild(grid);
}

/** One featured event in the «next» card: badge, title, when and where, the countdown and the signup. */
function nextRow(occ, ui) {
  const row = ui.tint(el2('div', 'urd-cal-next-row'), occ);
  row.appendChild(badgeNode(occ, ui));
  const body = el2('div', null);
  const titleRow = el2('div', 'urd-cal-titlerow');
  titleRow.appendChild(ui.field('strong', 'title', occ.title, 'urd-cal-next-title'));
  const chip = chipNode(occ.category, occ.color, ui);
  if (chip) titleRow.appendChild(chip);
  body.appendChild(titleRow);
  const meta = ui.meta(occ);
  if (meta) body.appendChild(meta);
  body.appendChild(el2('div', 'urd-cal-next-count', countdownText(occ)));
  const signup = ui.signup(occ);
  if (signup) body.appendChild(signup);
  row.appendChild(body);
  return row;
}

/**
 * The «next» card: the next one to three events in full (props.nextCount),
 * and as many more as props.laterCount says as one-line rows under «Later».
 */
function renderNext(host, occs, props, ics, ui) {
  if (!occs.length) return;
  const count = ics.nextCount(props.nextCount);
  const panel = el2('div', 'urd-cal-next');
  // One event is «the next event»; several are what is on right now.
  const label = el2('div', 'urd-cal-next-label');
  label.appendChild(ui.tx(count > 1 ? 'now' : 'next'));
  panel.appendChild(label);
  for (const occ of occs.slice(0, count)) panel.appendChild(nextRow(occ, ui));
  const later = occs.slice(count, count + ics.laterCount(props.laterCount));
  if (later.length) {
    const laterLabel = el2('div', 'urd-cal-next-label urd-cal-later-label');
    laterLabel.appendChild(ui.tx('later'));
    panel.appendChild(laterLabel);
    const list = el2('ul', 'urd-cal-later');
    for (const occ of later) {
      const item = ui.tint(el2('li', null), occ);
      const when = ui.meta(occ, { place: false });
      if (when) {
        when.className = 'urd-cal-later-when';
        item.appendChild(when);
      }
      item.appendChild(ui.field('span', 'title', occ.title, 'urd-cal-later-title'));
      list.appendChild(item);
    }
    panel.appendChild(list);
  }
  host.appendChild(panel);
}

/** The agenda: compact rows under their month, for a programme that is read rather than browsed. */
function renderAgenda(host, occs, props, ics, ui) {
  const wrap = el2('div', 'urd-cal-agenda');
  for (const group of ics.groupByMonth(occs)) {
    wrap.appendChild(el2('h4', 'urd-cal-agenda-month', `${dates().months[group.month]} ${group.year}`));
    const list = el2('ul', 'urd-cal-agenda-list');
    for (const occ of group.items) {
      const start = new Date(occ.start);
      const item = ui.tint(el2('li', 'urd-cal-agenda-row'), occ);
      const day = el2('span', 'urd-cal-agenda-day');
      day.append(ui.field('strong', 'number', String(start.getDate()), null, start), ui.field('span', 'date', dates().weekdaysShort[(start.getDay() + 6) % 7], null, start));
      const body = el2('span', 'urd-cal-agenda-body');
      const titleRow = el2('span', 'urd-cal-titlerow');
      titleRow.appendChild(ui.field('strong', 'title', occ.title));
      const chip = chipNode(occ.category, occ.color, ui);
      if (chip) titleRow.appendChild(chip);
      body.appendChild(titleRow);
      const where = ui.meta(occ, { date: false });
      if (where) body.appendChild(where);
      const signup = ui.signup(occ);
      if (signup) body.appendChild(signup);
      item.append(day, body);
      list.appendChild(item);
    }
    wrap.appendChild(list);
  }
  host.appendChild(wrap);
}

/**
 * The empty state: an icon and a line of text, in every view. The words are
 * the owner's (props.emptyText) or the translated default; the icon is an id
 * from the icon library (props.emptyIcon), the calendar when none is set and
 * nothing at all for 'none'.
 */
function emptyNode(props) {
  const box = el2('div', 'urd-cal-empty');
  const icon = props.emptyIcon === 'none' ? null : (iconSvg(props.emptyIcon) || iconSvg('calendar'));
  if (icon) {
    const mark = el2('span', 'urd-cal-empty-icon');
    mark.setAttribute('aria-hidden', 'true');
    mark.innerHTML = icon;
    box.appendChild(mark);
  }
  const words = typeof props.emptyText === 'string' ? props.emptyText.trim() : '';
  box.appendChild(el2('p', 'urd-cal-empty-text', words || t('calendar.empty')));
  return box;
}

/**
 * ApeironLF's empty state, for the designs that declare it: a pill with a
 * kicker and a heading, the owner's line and icon in a dashed box, and the
 * subscribe buttons under it.
 */
function emptyApNode(props, ui) {
  const wrap = el2('div', 'urd-cal-apempty');
  const pill = el2('div', 'urd-cal-apempty-pill');
  const kicker = el2('span', 'urd-cal-apempty-kicker');
  kicker.appendChild(ui.tx('emptyKicker'));
  const title = el2('span', 'urd-cal-apempty-title');
  title.appendChild(ui.tx('emptyTitle'));
  pill.append(kicker, title);
  wrap.append(pill, emptyNode(props));
  return wrap;
}

function renderMonth(host, occs, props, ics, ui) {
  const now = new Date();
  let shown = { y: now.getFullYear(), mo: now.getMonth() };

  const wrap = el2('div', 'urd-cal-month');
  const head = el2('div', 'urd-cal-month-head');
  const prev = el2('button', 'urd-cal-nav', '‹');
  prev.type = 'button';
  prev.setAttribute('aria-label', t('calendar.prevMonth'));
  const label = ui.live(el2('strong', null, ''));
  const next = el2('button', 'urd-cal-nav', '›');
  next.type = 'button';
  next.setAttribute('aria-label', t('calendar.nextMonth'));
  head.append(prev, label, next);
  const grid = el2('div', 'urd-cal-grid');
  wrap.append(head, grid);
  // On the phone a day is a button with dots, and its events are listed under the grid.
  const panel = ui.phone ? el2('div', 'urd-cal-daylist') : null;
  if (panel) wrap.appendChild(panel);

  const move = (dir) => {
    shown = shown.mo + dir < 0 ? { y: shown.y - 1, mo: 11 } : shown.mo + dir > 11 ? { y: shown.y + 1, mo: 0 } : { ...shown, mo: shown.mo + dir };
    paint();
  };
  const paint = () => {
    label.textContent = `${dates().months[shown.mo]} ${shown.y}`;
    grid.replaceChildren();
    for (const day of ui.dows()) grid.appendChild(el2('div', 'urd-cal-dow', day));
    const first = new Date(shown.y, shown.mo, 1);
    const lead = ui.lead(first);
    const dim = new Date(shown.y, shown.mo + 1, 0).getDate();
    const today = new Date();
    for (let i = 0; i < lead; i++) grid.appendChild(el2('div', 'urd-cal-day urd-cal-day-empty'));
    if (panel) {
      ui.phoneDays(grid, panel, shown.y, shown.mo, occs, 'urd-cal-day');
      ui.dayGrid(grid, '.urd-cal-pday', { page: move, current: '[aria-pressed="true"]' });
      return;
    }
    for (let d = 1; d <= dim; d++) {
      const cell = el2('div', 'urd-cal-day');
      if (d === today.getDate() && shown.mo === today.getMonth() && shown.y === today.getFullYear()) {
        cell.classList.add('urd-cal-today');
      }
      cell.appendChild(el2('span', 'urd-cal-daynum', String(d)));
      const todays = occs.filter((occ) => {
        const s = new Date(occ.start);
        return s.getFullYear() === shown.y && s.getMonth() === shown.mo && s.getDate() === d;
      });
      for (const occ of todays.slice(0, 3)) {
        const pill = ui.tint(ui.field('div', 'title', occ.title, 'urd-cal-pill'), occ);
        pill.title = `${occ.title}\n${metaLine(occ)}`;
        cell.appendChild(pill);
      }
      if (todays.length > 3) cell.appendChild(el2('div', 'urd-cal-more', t('calendar.more', { n: todays.length - 3 })));
      ui.dayLabel(cell, new Date(shown.y, shown.mo, d), todays.length);
      grid.appendChild(cell);
    }
    ui.dayGrid(grid, '.urd-cal-day:not(.urd-cal-day-empty)', { page: move, current: '.urd-cal-today' });
  };
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  paint();
  host.appendChild(wrap);
}

const VIEWS = { list: renderList, cards: renderCards, month: renderMonth, next: renderNext, agenda: renderAgenda };

/* ---------- Subscribe and category filter ---------- */

function subscribeRow(ics, sources, ui) {
  const row = el2('div', 'urd-cal-subscribe');
  for (const source of sources) {
    const links = ics.subscribeLinks(ics.sourceEntry(source).url);
    if (!links) continue;
    row.appendChild(ui.link('urd-cal-sub-btn', sources.length > 1 ? 'subscribeMulti' : 'subscribe', links.webcal, t('calendar.subscribeTitle')));
    if (links.google) {
      const google = ui.link('urd-cal-sub-btn', 'addGoogle', links.google, t('calendar.addGoogleTitle'));
      google.target = '_blank';
      google.rel = 'noopener';
      row.appendChild(google);
    }
  }
  return row.children.length ? row : null;
}

function categoryRow(occs, active, onpick, ui) {
  const categories = [...new Set(occs.map((occ) => occ.category).filter(Boolean))];
  if (categories.length < 2) return null;
  const colourOf = (category) => occs.find((occ) => occ.category === category && occ.color)?.color ?? '';
  const row = el2('div', 'urd-cal-chips');
  const all = el2('button', 'urd-cal-chipbtn');
  all.type = 'button';
  all.appendChild(ui.tx('all'));
  all.dataset.calKey = 'category';
  all.setAttribute('aria-pressed', active ? 'false' : 'true');
  if (!active) all.classList.add('selected');
  all.addEventListener('click', () => onpick(null));
  row.appendChild(all);
  for (const category of categories) {
    const btn = el2('button', 'urd-cal-chipbtn');
    btn.type = 'button';
    btn.appendChild(ui.field('span', 'category', category));
    const colour = colourOf(category);
    if (colour) btn.style.setProperty('--urd-cal-color', resolveColor(colour));
    btn.dataset.calKey = `category-${category}`;
    btn.setAttribute('aria-pressed', active === category ? 'true' : 'false');
    if (active === category) btn.classList.add('selected');
    btn.addEventListener('click', () => onpick(category));
    row.appendChild(btn);
  }
  return row;
}

/**
 * The fold for the events beyond the max count: a native details element
 * whose summary counts them, with the same design drawing the rest inside
 * it, so the whole list is in the page.
 */
function foldNode(render, rest, total, props, ics, ui) {
  const fold = el2('details', 'urd-cal-fold');
  fold.appendChild(el2('summary', 'urd-cal-fold-summary', t('calendar.showAll', { n: total, m: rest.length })));
  const body = el2('div', 'urd-cal-fold-body');
  ui.offset = total - rest.length;
  ui.rest = true;
  render(body, rest, props, ics, ui);
  ui.offset = 0;
  ui.rest = false;
  fold.appendChild(body);
  return fold;
}

/** The place filter: a chip per venue (the place up to its first comma), drawn when the events have two or more. */
function placeRow(occs, active, onpick, ics) {
  const places = [...new Set(occs.map((occ) => ics.placeName(occ.location)).filter(Boolean))];
  if (places.length < 2) return null;
  const row = el2('div', 'urd-cal-chips urd-cal-places');
  row.setAttribute('role', 'group');
  row.setAttribute('aria-label', t('calendar.places'));
  for (const place of [null, ...places]) {
    const btn = el2('button', 'urd-cal-chipbtn', place ?? t('calendar.allPlaces'));
    btn.type = 'button';
    btn.dataset.calKey = place ? `place-${place}` : 'place';
    btn.setAttribute('aria-pressed', active === place ? 'true' : 'false');
    if (active === place) btn.classList.add('selected');
    btn.addEventListener('click', () => onpick(place));
    row.appendChild(btn);
  }
  return row;
}

const SEARCH_WAIT = 200;

/** The search field: one node for the life of the block, so the words and the caret stay while the calendar is redrawn under it. */
function searchField(onsearch) {
  const row = el2('div', 'urd-cal-searchrow');
  const input = el2('input', 'urd-cal-search');
  input.type = 'search';
  input.placeholder = t('calendar.search');
  input.setAttribute('aria-label', t('calendar.search'));
  let timer = 0;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onsearch(input.value.trim());
      input.focus({ preventScroll: true });
    }, SEARCH_WAIT);
  });
  row.appendChild(input);
  return row;
}

const EARLIER_MAX = 50;

/** The events that are over, the latest first, folded under «Earlier» with their count; a row opens the event in full. */
function earlierNode(past, ui) {
  const fold = el2('details', 'urd-cal-fold urd-cal-earlier');
  fold.appendChild(el2('summary', 'urd-cal-fold-summary', t('calendar.earlier', { n: past.length })));
  const body = el2('div', 'urd-cal-earlier-rows');
  const names = dates();
  for (const occ of past.slice(0, EARLIER_MAX)) {
    const start = new Date(occ.start);
    const row = ui.tint(el2('div', 'urd-cal-earlier-row'), occ);
    row.appendChild(ui.field('span', 'date', t('calendar.dayMonth', { d: start.getDate(), m: names.monthsShort[start.getMonth()] }), 'urd-cal-earlier-date', start));
    row.appendChild(ui.field('strong', 'title', occ.title));
    if (occ.location) row.appendChild(ui.field('span', 'place', occ.location, 'urd-cal-earlier-place'));
    body.appendChild(row);
  }
  fold.appendChild(body);
  return fold;
}

/** The view switcher: the block's own design, the week and the month, as a row of pressed buttons. */
const SWITCH_MODES = [['own', 'swUpcoming'], ['week', 'swWeek'], ['month', 'swMonth']];

function switchRow(mode, onpick, ui) {
  const row = el2('div', 'urd-cal-switch');
  row.setAttribute('role', 'group');
  for (const [id, key] of SWITCH_MODES) {
    const btn = el2('button', 'urd-cal-switch-btn');
    btn.type = 'button';
    btn.setAttribute('aria-pressed', mode === id ? 'true' : 'false');
    btn.dataset.calKey = `view-${id}`;
    btn.appendChild(ui.tx(key));
    btn.addEventListener('click', () => onpick(id));
    row.appendChild(btn);
  }
  return row;
}

/* ---------- A day grid on the keyboard ---------- */

const GRIDS = new WeakMap();

/** One day holds the grid's tab stop, and the events inside it with it. */
function setStop(days, target) {
  for (const day of days) {
    const on = day === target;
    day.tabIndex = on ? 0 : -1;
    for (const event of day.querySelectorAll('.urd-cal-event')) event.tabIndex = on ? 0 : -1;
  }
}

/**
 * A day grid as one tab stop, called after every paint of the grid. The
 * arrow keys move between the days (up and down to the day above and below
 * on the screen), Home and End to the ends of the row, and PageUp and
 * PageDown to the span before and after (`page`, the design's own move
 * through its weeks or months); an arrow past the first or the last day
 * pages too. Tab from a day goes through that day's events and out of the
 * grid. The tab stop starts on the day `current` matches, else the first.
 */
function dayGrid(grid, selector, { page = null, current = null } = {}, keysOn = () => true) {
  let state = GRIDS.get(grid);
  if (!state) {
    state = { want: null, focus: false };
    GRIDS.set(grid, state);
    const daysOf = () => [...grid.querySelectorAll(state.selector)];
    grid.addEventListener('focusin', (event) => {
      const day = event.target.closest?.(state.selector);
      if (day && grid.contains(day)) setStop(daysOf(), day);
    });
    grid.addEventListener('keydown', (event) => {
      if (!keysOn() || !event.target.matches?.(state.selector)) return;
      const days = daysOf();
      const i = days.indexOf(event.target);
      const box = event.target.getBoundingClientRect();
      const boxes = days.map((day) => day.getBoundingClientRect());
      const sameRow = days.filter((_, n) => Math.abs(boxes[n].top - box.top) < 2);
      // The day straight above or below: the nearest row in that direction, and in it the day nearest sideways.
      const vertical = (dir) => {
        const rows = boxes.map((b, n) => ({ b, n })).filter(({ b }) => (dir < 0 ? b.top < box.top - 2 : b.top > box.top + 2));
        if (!rows.length) return null;
        const near = rows.reduce((best, row) => (Math.abs(row.b.top - box.top) < Math.abs(best.b.top - box.top) ? row : best));
        const inRow = rows.filter((row) => Math.abs(row.b.top - near.b.top) < 2);
        return days[inRow.reduce((best, row) => (Math.abs(row.b.left - box.left) < Math.abs(best.b.left - box.left) ? row : best)).n];
      };
      const turn = (dir, want) => {
        if (!state.page) return;
        Object.assign(state, { want, focus: true });
        state.page(dir);
      };
      let to = null;
      if (event.key === 'ArrowLeft') to = days[i - 1] ?? (() => turn(-1, 'last'));
      else if (event.key === 'ArrowRight') to = days[i + 1] ?? (() => turn(1, 0));
      else if (event.key === 'ArrowUp') to = vertical(-1) ?? (() => turn(-1, 'last'));
      else if (event.key === 'ArrowDown') to = vertical(1) ?? (() => turn(1, 0));
      else if (event.key === 'Home') to = sameRow[0];
      else if (event.key === 'End') to = sameRow[sameRow.length - 1];
      else if (event.key === 'PageUp') to = () => turn(-1, i);
      else if (event.key === 'PageDown') to = () => turn(1, i);
      else return;
      event.preventDefault();
      if (typeof to === 'function') to();
      else to.focus();
    });
  }
  Object.assign(state, { selector, page });
  const days = [...grid.querySelectorAll(selector)];
  if (!days.length) return;
  let at = state.want === 'last' ? days.length - 1 : Number.isInteger(state.want) ? Math.min(state.want, days.length - 1) : current ? days.findIndex((day) => day.matches(current)) : 0;
  if (at < 0) at = 0;
  setStop(days, days[at]);
  if (state.focus) days[at].focus();
  Object.assign(state, { want: null, focus: false });
}

/* ---------- Structured data ---------- */

/**
 * The events a published calendar shows, written into <head> as JSON-LD
 * (schema.org `Event`), one script per block. It carries the mark seo.js
 * clears at every page render, so a page left takes its events with it.
 */
function writeEventData(el, occs, ics, ctx, meetingHosts) {
  const id = el.dataset.blockId ?? '';
  for (const old of document.head.querySelectorAll('script[data-urd-cal]')) {
    if (old.dataset.urdCal === id) old.remove();
  }
  const site = { pageUrl: location.origin + location.pathname, organizer: ctx.site?.site?.title ?? '', meetingHosts };
  const events = occs.slice(0, PRINT_MAX).map((occ) => ics.eventJsonLd(occ, site)).filter(Boolean);
  if (!events.length) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.urdSeo = '1';
  script.dataset.urdCal = id;
  script.textContent = JSON.stringify(events);
  document.head.appendChild(script);
}

/* ---------- The printed list ---------- */

const PRINT_MAX = 40;
/** The views that show a span of time, not a count of what is coming. */
const SPAN_VIEWS = ['month', 'week', 'day', 'year'];
/** How far back «Earlier» reaches. */
const EARLIER_DAYS = 90;

/** The events as a plain list, drawn for the printed page only (base.css shows it in print and hides the design). */
function printList(occs, ui) {
  const list = el2('ul', 'urd-cal-print');
  const names = dates();
  for (const occ of occs.slice(0, PRINT_MAX)) {
    const start = new Date(occ.start);
    const item = el2('li');
    item.appendChild(ui.field('span', 'date', `${names.weekdays[(start.getDay() + 6) % 7]} ${t('calendar.dayMonth', { d: start.getDate(), m: names.months[start.getMonth()] })}`, null, start));
    if (ui.hasTime(occ)) item.append(' ', ui.field('span', 'time', ui.timeText(occ), null, occ));
    item.append(' ', el2('strong', null, occ.title));
    if (occ.location) item.append(' · ', el2('span', null, occ.location));
    list.appendChild(item);
  }
  return list;
}

/* ---------- The month on the phone ---------- */

const DAY_MS = 24 * 3600 * 1000;
const DOTS_MAX = 4;

/**
 * The days of a month as the phone draws them: every day a button with its
 * number and a dot per event, and the picked day's events listed in the
 * panel under the grid. Today is picked first, else the month's first day
 * with an event. The day buttons are appended to the grid after its lead cells.
 */
function phoneDays(ui, grid, panel, year, month, occs, cellClass) {
  const today = ui.today();
  const dim = new Date(year, month + 1, 0).getDate();
  const eventsOf = (d) => {
    const from = new Date(year, month, d).getTime();
    return occs.filter((occ) => occ.start < from + DAY_MS && Math.max(occ.end ?? occ.start, occ.start + 1) > from);
  };
  const buttons = [];
  const pick = (d) => {
    buttons.forEach((btn, i) => btn.setAttribute('aria-pressed', i + 1 === d ? 'true' : 'false'));
    const date = new Date(year, month, d);
    const names = dates();
    const list = el2('div', 'urd-cal-daylist-rows');
    for (const occ of eventsOf(d)) {
      const row = ui.tint(el2('div', 'urd-cal-daylist-row'), occ);
      if (ui.hasTime(occ)) row.appendChild(ui.field('span', 'time', ui.time(occ), 'urd-cal-daylist-time', occ));
      row.appendChild(ui.field('strong', 'title', occ.title));
      if (occ.location) row.appendChild(ui.field('span', 'place', occ.location, 'urd-cal-daylist-place'));
      list.appendChild(row);
    }
    if (!list.children.length) list.appendChild(el2('p', 'urd-cal-daylist-none', t('calendar.dayNone')));
    panel.replaceChildren(
      ui.field('strong', 'date', `${names.weekdays[(date.getDay() + 6) % 7]} ${t('calendar.dayMonth', { d, m: names.months[month] })}`, 'urd-cal-daylist-head', date),
      list,
    );
  };
  let first = 0;
  for (let d = 1; d <= dim; d++) {
    const events = eventsOf(d);
    const btn = el2('button', `${cellClass} urd-cal-pday`);
    btn.type = 'button';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', `${t('calendar.dayMonth', { d, m: dates().months[month] })}, ${tp('calendar.count', events.length)}`);
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      btn.classList.add('urd-cal-pday-today');
      first = d;
    }
    btn.appendChild(el2('i', 'urd-cal-pday-num', String(d)));
    const dots = el2('span', 'urd-cal-dots');
    for (const occ of events.slice(0, DOTS_MAX)) dots.appendChild(tintNode(el2('i'), occ));
    btn.appendChild(dots);
    if (events.length && !first) first = d;
    btn.addEventListener('click', () => pick(d));
    buttons.push(btn);
    grid.appendChild(btn);
  }
  if (first) pick(first);
  else panel.replaceChildren();
}

/* ---------- Loading ---------- */

/** The height the calendar last had in this viewport, kept for the session so the loading state can stand at it. */
const heightKey = (el, ctx) => `urd-cal-h:${el.dataset.blockId ?? ''}:${ctx.viewport === 'mobile' ? 'm' : 'd'}`;

/** The loading state: quiet bars at the height the calendar will have, with the word for a screen reader. */
function loadingNode(el, ctx) {
  const box = el2('div', 'urd-cal-loading');
  box.setAttribute('role', 'status');
  box.appendChild(el2('span', 'urd-cal-loading-text', t('calendar.loading')));
  for (let i = 0; i < 4; i++) box.appendChild(el2('i'));
  try {
    const known = Number(sessionStorage.getItem(heightKey(el, ctx)));
    if (known > 0) box.style.minHeight = `${known}px`;
  } catch { /* without the store the loading state stands at its own height */ }
  return box;
}

/* ---------- The views' names (the variants in the block menus) ---------- */

/** View id + label KEY (looked up with ta at use time; never at module level). */
const VIEW_NAMES = [['list', 'calendar.viewList'], ['cards', 'calendar.viewCards'], ['month', 'calendar.viewMonth'], ['next', 'calendar.viewNext'], ['agenda', 'calendar.viewAgenda']];

/* ---------- The designs in the block menu ---------- */

/** A variant per design beside the plain views: filled when the design model is loaded. */
let designVariants = [];

function keepDesignVariants(cd) {
  designVariants = cd.CAL_DESIGNS.filter((d) => d.id !== 'plain').map((d) => ({ label: d.id, labelKey: d.labelKey, props: { design: d.id, view: d.view } }));
}

// The editor's block menu lists the designs, so the preview loads the design
// model up front; a visitor loads it with the first calendar on a page.
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('preview')) {
  import('../calendar-designs.js').then(keepDesignVariants, () => {});
}

/* ---------- The block ---------- */

function renderCalendar(el, props, ctx) {
  const host = el2('div', 'urd-cal');
  el.appendChild(host);
  // A calendar with a feed stands in its loading state until the events are drawn.
  if ((props.sources ?? []).length) {
    host.setAttribute('aria-busy', 'true');
    host.appendChild(loadingNode(el, ctx));
  }
  // The parser and the design model are loaded together, on the first
  // render, and a design's renderer module with them (literal paths, so the
  // modules stay out of the visitor closure and the preload list).
  const DESIGN_MODULES = { list: () => import('./calendar-list.js'), cards: () => import('./calendar-cards.js'), time: () => import('./calendar-time.js'), next: () => import('./calendar-next.js'), more: () => import('./calendar-more.js') };
  Promise.all([import('../ics.js'), import('../calendar-designs.js'), import('../calendar-format.js'), import('../map-links.js'), import('../meeting-links.js')]).then(async ([ics, cd, cf, maps, links]) => {
    const design = cd.calDesign(props.design);
    const mod = design.module ? await DESIGN_MODULES[design.module]?.() : null;
    // The view switcher draws the week with the week strip, so its module comes along.
    const weekMod = cd.calSwitcher(props) ? await DESIGN_MODULES.time() : null;
    if (host.isConnected) drawCalendar(ics, cd, cf, maps, links, mod, weekMod, el, host, props, ctx);
  });
}

function drawCalendar(ics, cd, cf, maps, links, mod, weekMod, el, host, props, ctx) {
  // The site's own time zone, when set: every visitor sees the times on that zone's clock.
  const siteZone = ctx.site?.site?.timeZone;
  const zone = cf.zoneValid(siteZone) ? siteZone.trim() : null;
  const sources = (props.sources ?? []).filter((source) => ics.sourceEntry(source).url);
  let activeCategory = null;
  let activePlace = null;
  let query = '';
  let shown = null;
  const search = props.showSearch === true ? searchField((words) => {
    query = words;
    if (shown) draw(shown.occurrences, shown.note);
  }) : null;
  // The view switcher's mode: the block's own design until the visitor picks the week or the month.
  const switcher = Boolean(weekMod);
  let mode = 'own';
  // The design: its class, the owner's colour slots and the edge stripe on the host.
  const design = cd.calDesign(props.design);
  const view = cd.calView(props);
  host.className = `urd-cal urd-cal-d-${design.id}`;
  host.classList.toggle('urd-cal-phone', ctx.viewport === 'mobile');
  for (const [name, value] of Object.entries(cd.calSlotVars(design, props.colors))) host.style.setProperty(name, value);
  // The calendar's size: the whole design, text included, drawn smaller or larger (the Style tab's size).
  const scale = cd.calScale(props);
  if (scale !== 1) host.style.setProperty('--urd-cal-zoom', String(scale));
  const stripe = cd.calStripe(design, props.stripe);
  host.classList.toggle('urd-cal-stripes', stripe.show);
  if (stripe.color) host.style.setProperty('--urd-cal-stripe', stripe.color);
  const ui = makeUi(cd, cf, ics, maps, links, el, host, props, ctx, sources, zone);
  let feedZone = null;
  // The design's own settings as classes, for the ones the style sheet draws.
  for (const [key, value] of Object.entries(ui.opt)) {
    if (typeof value === 'boolean') host.classList.add(`urd-cal-o-${key}-${value ? 'on' : 'off'}`);
    else if (typeof value === 'string') host.classList.add(`urd-cal-o-${key}-${value}`);
  }

  const draw = (occurrences, note) => {
    shown = { occurrences, note };
    for (const occ of occurrences) if (occ.geo && occ.location) ui.places.set(occ.location, occ.geo);
    host.removeAttribute('aria-busy');
    // A press on the view switcher or a category redraws the calendar: the focus goes back to the button that was pressed.
    const focused = host.contains(document.activeElement) ? document.activeElement.dataset.calKey : null;
    host.replaceChildren();
    if (ctx.preview && ctx.viewport !== 'mobile') {
      // Help chip (ADR-0008): the sources, the conventions and the subscribe buttons need explaining.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintCalendar.title'),
          lines: [
            ta('hintCalendar.l1'), ta('hintCalendar.l2'), ta('hintCalendar.l3'), ta('hintCalendar.l4'),
            ta('hintCalendar.l5'), ta('hintCalendar.l6'), ta('hintCalendar.l7'), ta('hintCalendar.l8'),
          ],
        });
      });
    }
    // With the switcher on, the window reaches back to the start of the
    // week and the month; the block's own design still shows what is coming.
    const own = mode === 'own';
    const soon = ui.today().getTime() - 6 * 3600 * 1000;
    // Cancelled events are shown as cancelled unless the owner has hidden them.
    const kept = props.showCancelled === false ? occurrences.filter((occ) => !occ.cancelled) : occurrences;
    // The visitor's own narrowing: the words searched for, the place and the category.
    const narrowed = kept.filter((occ) => ics.matchesSearch(occ, query)
      && (!activePlace || ics.placeName(occ.location) === activePlace)
      && (!activeCategory || occ.category === activeCategory));
    // A design that counts out what is coming shows nothing that is over; a week, month, day or year shows its whole span.
    const comingOnly = own && !SPAN_VIEWS.includes(view);
    const filtered = comingOnly ? narrowed.filter((occ) => (occ.end ?? occ.start) >= soon) : narrowed;
    const past = comingOnly && props.showEarlier === true ? narrowed.filter((occ) => (occ.end ?? occ.start) < soon).reverse() : [];
    // The max count applies to list, cards and agenda; the month, week, day and year views show their span and next has its own two counts.
    const limit = Math.max(1, props.limit ?? 6);
    const limited = !own || ['next', ...SPAN_VIEWS].includes(view)
      ? filtered
      : filtered.slice(0, limit);
    // A list folds the events beyond the max count instead of dropping them.
    const folds = own && cd.calFolds(props) && filtered.length > limit;
    if (switcher) {
      host.appendChild(switchRow(mode, (picked) => {
        mode = picked;
        draw(occurrences, note);
      }, ui));
    }
    // A design with switches of its own (ownFilter) draws no chip row.
    const chips = props.showCategories === false || design.ownFilter ? null : categoryRow(occurrences, activeCategory, (category) => {
      activeCategory = category;
      draw(occurrences, note);
    }, ui);
    if (search) host.appendChild(search);
    if (chips) host.appendChild(chips);
    const places = props.showPlaces === true ? placeRow(kept, activePlace, (place) => {
      activePlace = place;
      draw(occurrences, note);
    }, ics) : null;
    if (places) host.appendChild(places);
    // The whole filtered list, for a design that draws more than the rows (the bento's month dots).
    ui.all = filtered;
    ui.total = folds ? filtered.length : limited.length;
    // The category filter, for a design that draws it itself (ownFilter).
    ui.filter = {
      names: [...new Set(occurrences.map((occ) => occ.category).filter(Boolean))],
      active: activeCategory,
      pick: (category) => {
        activeCategory = category;
        draw(occurrences, note);
      },
    };
    if (mode === 'week') {
      weekMod.weekStrip(host, limited, props, ics, ui);
    } else if (mode === 'month') {
      renderMonth(host, limited, props, ics, ui);
    } else if (!limited.length && (query || activePlace || activeCategory) && kept.length) {
      // Events there are, but none the visitor's search or filter leaves.
      host.appendChild(el2('p', 'urd-cal-nomatch', t('calendar.noMatch')));
    } else if (!limited.length) {
      host.appendChild(design.empty === 'ap' ? emptyApNode(props, ui) : emptyNode(props));
    } else {
      const render = mod?.[design.id] ?? VIEWS[view] ?? renderList;
      render(host, limited, props, ics, ui);
      if (folds) host.appendChild(foldNode(render, filtered.slice(limit), filtered.length, props, ics, ui));
    }
    if (past.length) host.appendChild(earlierNode(past, ui));
    // A design that places the subscribe buttons itself (ownSubscribe) gets no row under it.
    if (!design.ownSubscribe || !limited.length || !own) {
      const row = ui.subscribe();
      if (row) host.appendChild(row);
    }
    // The zone the times are shown in, named when it is not the visitor's own:
    // the site's zone when one is set, else the visitor's when the feed is kept in another.
    const nowMs = Date.now();
    let zoneText = '';
    if (zone && cf.zoneDiffers(zone, nowMs)) zoneText = t('calendar.zoneOf', { zone: cf.zoneName(zone, nowMs, ctx.site?.site?.lang) });
    else if (!zone && cf.zoneValid(feedZone) && cf.zoneDiffers(feedZone, nowMs)) zoneText = t('calendar.zoneYours', { zone: cf.zoneName(null, nowMs, ctx.site?.site?.lang) });
    if (zoneText && limited.length) host.appendChild(el2('p', 'urd-cal-zone', zoneText));
    // The printed page gets the events as a plain list: the ones the design counts out, else what is coming.
    const listed = own && !['next', ...SPAN_VIEWS].includes(view) ? limited : filtered.filter((occ) => (occ.end ?? occ.start) >= soon);
    if (listed.length) host.appendChild(printList(listed, ui));
    // Search engines get the same events as structured data, on the published page and from a real feed only.
    if (!ctx.preview && sources.length) writeEventData(el, props.structuredData === false ? [] : listed, ics, ctx, ui.meetingHosts);
    if (focused) [...host.querySelectorAll('[data-cal-key]')].find((node) => node.dataset.calKey === focused)?.focus({ preventScroll: true });
    // The note is editing chrome on the block, not content: it hangs below
    // the block (base.css) and the push pass skips it, so it never makes the
    // block taller in the preview than on the published page.
    el.querySelector(':scope > .urd-cal-note')?.remove();
    if (note) el.appendChild(el2('p', 'urd-cal-note', note));
  };

  if (!sources.length) {
    // Demo data exists only in the preview, so it must not change the
    // block's height there: the published page shows the empty state at the
    // frame's height, and a taller demo would push the neighbours in the
    // preview alone. The block is marked so the push pass measures no
    // growth (render.js contentHeight), and the demo is clipped to the frame.
    if (ctx.preview) adminLocaleReady.then(() => {
      if (!host.isConnected) return;
      el.dataset.urdDemo = '1';
      host.style.maxHeight = '100%';
      host.style.overflow = 'hidden';
      draw(demoOccurrences(), ta('calendar.demoNote'));
    });
    // Visitors see the empty state, as for a calendar with nothing coming up.
    else draw([], null);
    return;
  }
  delete el.dataset.urdDemo;
  host.style.maxHeight = '';
  host.style.overflow = '';

  // The switcher needs the week and the month from their start, whichever is the earlier.
  // The week begins on the day the site's language starts it on, which can be the day before Monday.
  const weekFrom = Math.min(ics.windowStart('week'), ui.weekStartOf(Date.now()));
  const viewFrom = switcher ? Math.min(weekFrom, ics.windowStart('month')) : view === 'week' ? weekFrom : ics.windowStart(view);
  const from = props.showEarlier === true ? Math.min(viewFrom, Date.now() - EARLIER_DAYS * 24 * 3600 * 1000) : viewFrom;
  loadOccurrences(ics, cf, sources, Math.max(1, props.limit ?? 6), view, from, zone, ui.meetingHosts).then(({ occurrences, errors, feedZone: fz }) => {
    if (!host.isConnected) return;
    feedZone = fz;
    if (!occurrences.length && errors.length) {
      // Visitors get a quiet empty state; the preview gets the error.
      draw([], ctx.preview ? ta('calendar.feedFailed', { error: errors[0] }) : null);
      return;
    }
    draw(occurrences, ctx.preview && errors.length ? ta('calendar.sourceFailed', { error: errors[0] }) : null);
    try { sessionStorage.setItem(heightKey(el, ctx), String(Math.round(host.offsetHeight))); } catch { /* a full store is fine */ }
  });
}

export const calendarBlock = {
  version: 1,
  // Natural height in the mobile row grid; on the desktop the push pass owns the box.
  autoGrow: true,
  label: 'Calendar',
  labelKey: 'blocks.calendar',
  // A new calendar starts quiet: the category filter and the subscribe and sign-up buttons are switched on by the owner.
  defaults: () => ({ sources: [], view: 'list', limit: 6, showCategories: false, showSubscribe: false, showSignup: false }),
  // One variant per view and one per design: the preview's block menu lists
  // them as «Calendar: Month», «Calendar: Week strip» and the like.
  get variants() {
    return [...VIEW_NAMES.map(([view, labelKey]) => ({ label: view, labelKey, props: { view } })), ...designVariants];
  },
  migrations: {},
  render: renderCalendar,
};
