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
import { stripActiveContent } from '../sanitize.js';

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
async function loadOccurrences(ics, sources, limit, view) {
  const errors = [];
  const events = [];
  await Promise.all(sources.map(async (source) => {
    const entry = ics.sourceEntry(source);
    const url = ics.normalizeSourceUrl(entry.url);
    if (!url) { errors.push(ta('calendar.unknownSource', { source: entry.url })); return; }
    try {
      // Every event remembers the calendar it came from: its name and colour.
      for (const event of ics.parseIcs(await fetchSource(url)).events) events.push({ ...event, calendar: entry.name, calendarColor: entry.color });
    } catch (error) {
      errors.push(`${url}: ${error.message}`);
    }
  }));
  // The window follows the view: a year design wants the whole year, a month, week or day design its own span.
  const wide = ['year', 'month', 'week', 'day'].includes(view);
  const expanded = ics.expandEvents(events, { from: ics.windowStart(view), max: wide ? 600 : Math.max(limit * 4, 120) })
    .map((occ) => {
      // A named calendar is the category; otherwise «Category: Title» in the event itself.
      const split = occ.calendar ? { category: occ.calendar, title: occ.summary } : ics.splitCategory(occ.summary);
      return { ...occ, ...split, color: occ.calendarColor || '', signup: ics.findSignupLink(occ.description), image: occ.image || ics.findImageLink(occ.description) };
    });
  // The sources are one calendar to the visitor: an event that stands in two of them is shown once.
  return { occurrences: ics.dedupeOccurrences(expanded), errors };
}

/* ---------- Demo data (preview only, when no sources or feed) ---------- */

function demoOccurrences() {
  const day = 24 * 3600 * 1000;
  const base = Date.now();
  return [
    { start: base + 3 * day, end: base + 3 * day + 2 * 3600 * 1000, allDay: false, title: ta('calendar.demoTitle1'), category: ta('calendar.demoCat1'), location: ta('calendar.demoLoc1'), signup: null, description: '' },
    { start: base + 10 * day, end: base + 10 * day + 3600 * 1000, allDay: false, title: ta('calendar.demoTitle2'), category: ta('calendar.demoCat2'), location: ta('calendar.demoLoc1'), signup: null, description: '' },
    { start: base + 17 * day, end: base + 17 * day, allDay: true, title: ta('calendar.demoTitle3'), category: ta('calendar.demoCat3'), location: ta('calendar.demoLoc2'), signup: null, description: '' },
    { start: base + day, end: base + day + 90 * 60 * 1000, allDay: false, title: ta('calendar.demoTitle4'), category: ta('calendar.demoCat1'), location: ta('calendar.demoLoc1'), signup: null, description: '' },
    { start: base + 5 * day, end: base + 5 * day, allDay: true, title: ta('calendar.demoTitle5'), category: ta('calendar.demoCat2'), location: ta('calendar.demoLoc2'), signup: null, description: '' },
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
  return node;
}

function badgeNode(occ, ui) {
  const start = new Date(occ.start);
  const badge = tintNode(el2('div', 'urd-collection-badge'), occ);
  badge.append(ui.field('strong', 'number', String(start.getDate())), ui.field('span', 'date', dates().monthsShort[start.getMonth()]));
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
  const days = Math.max(0, Math.round((occ.start - Date.now()) / (24 * 3600 * 1000)));
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
 * block shows them. Every edit posts the whole props with the text under
 * its key in `texts`, so the editor's draft stays the owner of the words.
 */
function makeUi(cd, ics, el, host, props, ctx, sources) {
  const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
  const post = (msg) => window.parent?.postMessage(msg, location.origin);
  const field = (tag, key, text, className) => {
    const node = el2(tag, className ? `${className} urd-cal-f-${key}` : `urd-cal-f-${key}`, text);
    Object.assign(node.style, cd.calFieldCss(props.fieldStyle?.[key]));
    return node;
  };
  const meta = (occ, { date = true, place = true } = {}) => {
    const start = new Date(occ.start);
    const d = dates();
    const parts = [];
    if (date) {
      parts.push(field('span', 'date', t('calendar.dateLine', {
        wd: d.weekdaysShort[(start.getDay() + 6) % 7],
        d: start.getDate(),
        m: d.monthsShort[start.getMonth()],
      })));
    }
    if (!occ.allDay) parts.push(field('span', 'time', t('calendar.timeAt', { time: `${two(start.getHours())}:${two(start.getMinutes())}` })));
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
      node.classList.add('urd-text');
      node.contentEditable = 'true';
      node.addEventListener('click', (event) => event.stopPropagation());
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
  /** A link whose words are a static text: in the preview the words are edited, never followed. */
  const link = (className, key, href, title) => {
    const a = el2('a', className);
    a.href = href;
    a.title = title;
    a.appendChild(tx(key));
    if (editable) a.addEventListener('click', (event) => event.preventDefault());
    return a;
  };
  const signup = (occ) => {
    if (!occ.signup || props.showSignup === false) return null;
    const a = link('urd-cal-signup', 'signup', occ.signup, t('calendar.signupTitle'));
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  };
  const chip = (occ) => chipNode(occ.category, occ.color, ui);
  /** The subscribe buttons, for a design that places them itself; null when they are off or there is no source. */
  const subscribe = () => (props.showSubscribe !== false && sources.length ? subscribeRow(ics, sources, ui) : null);
  const ui = { el: el2, tint: tintNode, field, meta, tx, link, signup, chip, subscribe, countdown: countdownText, image: imageUrl, all: [], today: () => new Date() };
  return ui;
}

/* ---------- Views ---------- */

function renderList(host, occs, props, ics, ui) {
  const list = el2('div', 'urd-collection-list');
  for (const occ of occs) {
    const row = tintNode(el2('article', 'urd-collection-row'), occ);
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
    const card = tintNode(el2('article', 'urd-collection-card'), occ);
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
    const excerpt = String(occ.description ?? '').split('\n')[0].slice(0, 140);
    if (excerpt) card.appendChild(ui.field('div', 'description', excerpt, 'urd-collection-text'));
    const signup = ui.signup(occ);
    if (signup) card.appendChild(signup);
    grid.appendChild(card);
  }
  host.appendChild(grid);
}

/** One featured event in the «next» card: badge, title, when and where, the countdown and the signup. */
function nextRow(occ, ui) {
  const row = tintNode(el2('div', 'urd-cal-next-row'), occ);
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
      const item = tintNode(el2('li', null), occ);
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
      const item = tintNode(el2('li', 'urd-cal-agenda-row'), occ);
      const day = el2('span', 'urd-cal-agenda-day');
      day.append(ui.field('strong', 'number', String(start.getDate())), ui.field('span', 'date', dates().weekdaysShort[(start.getDay() + 6) % 7]));
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

function renderMonth(host, occs, props, ics, ui) {
  const now = new Date();
  let shown = { y: now.getFullYear(), mo: now.getMonth() };

  const wrap = el2('div', 'urd-cal-month');
  const head = el2('div', 'urd-cal-month-head');
  const prev = el2('button', 'urd-cal-nav', '‹');
  prev.type = 'button';
  prev.setAttribute('aria-label', t('calendar.prevMonth'));
  const label = el2('strong', null, '');
  const next = el2('button', 'urd-cal-nav', '›');
  next.type = 'button';
  next.setAttribute('aria-label', t('calendar.nextMonth'));
  head.append(prev, label, next);
  const grid = el2('div', 'urd-cal-grid');
  wrap.append(head, grid);

  const paint = () => {
    label.textContent = `${dates().months[shown.mo]} ${shown.y}`;
    grid.replaceChildren();
    for (const day of dates().weekdaysShort) grid.appendChild(el2('div', 'urd-cal-dow', day));
    const first = new Date(shown.y, shown.mo, 1);
    const lead = (first.getDay() + 6) % 7;
    const dim = new Date(shown.y, shown.mo + 1, 0).getDate();
    const today = new Date();
    for (let i = 0; i < lead; i++) grid.appendChild(el2('div', 'urd-cal-day urd-cal-day-empty'));
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
        const pill = tintNode(ui.field('div', 'title', occ.title, 'urd-cal-pill'), occ);
        pill.title = `${occ.title}\n${metaLine(occ)}`;
        cell.appendChild(pill);
      }
      if (todays.length > 3) cell.appendChild(el2('div', 'urd-cal-more', t('calendar.more', { n: todays.length - 3 })));
      grid.appendChild(cell);
    }
  };
  prev.addEventListener('click', () => { shown = shown.mo ? { ...shown, mo: shown.mo - 1 } : { y: shown.y - 1, mo: 11 }; paint(); });
  next.addEventListener('click', () => { shown = shown.mo < 11 ? { ...shown, mo: shown.mo + 1 } : { y: shown.y + 1, mo: 0 }; paint(); });
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
  if (!active) all.classList.add('selected');
  all.addEventListener('click', () => onpick(null));
  row.appendChild(all);
  for (const category of categories) {
    const btn = el2('button', 'urd-cal-chipbtn');
    btn.type = 'button';
    btn.appendChild(ui.field('span', 'category', category));
    const colour = colourOf(category);
    if (colour) btn.style.setProperty('--urd-cal-color', resolveColor(colour));
    if (active === category) btn.classList.add('selected');
    btn.addEventListener('click', () => onpick(category));
    row.appendChild(btn);
  }
  return row;
}

/* ---------- The views' names (the variants in the block menus) ---------- */

/** View id + label KEY (looked up with ta at use time; never at module level). */
const VIEW_NAMES = [['list', 'calendar.viewList'], ['cards', 'calendar.viewCards'], ['month', 'calendar.viewMonth'], ['next', 'calendar.viewNext'], ['agenda', 'calendar.viewAgenda']];

/* ---------- The block ---------- */

function renderCalendar(el, props, ctx) {
  const host = el2('div', 'urd-cal');
  el.appendChild(host);
  // The parser and the design model are loaded together, on the first
  // render, and a design's renderer module with them (literal paths, so the
  // modules stay out of the visitor closure and the preload list).
  const DESIGN_MODULES = { list: () => import('./calendar-list.js'), cards: () => import('./calendar-cards.js'), time: () => import('./calendar-time.js'), next: () => import('./calendar-next.js') };
  Promise.all([import('../ics.js'), import('../calendar-designs.js')]).then(async ([ics, cd]) => {
    const design = cd.calDesign(props.design);
    const mod = design.module ? await DESIGN_MODULES[design.module]?.() : null;
    if (host.isConnected) drawCalendar(ics, cd, mod, el, host, props, ctx);
  });
}

function drawCalendar(ics, cd, mod, el, host, props, ctx) {
  const sources = (props.sources ?? []).filter((source) => ics.sourceEntry(source).url);
  let activeCategory = null;
  // The design: its class, the owner's colour slots and the edge stripe on the host.
  const design = cd.calDesign(props.design);
  const view = cd.calView(props);
  host.className = `urd-cal urd-cal-d-${design.id}`;
  for (const [name, value] of Object.entries(cd.calSlotVars(design, props.colors))) host.style.setProperty(name, value);
  const stripe = cd.calStripe(design, props.stripe);
  host.classList.toggle('urd-cal-stripes', stripe.show);
  if (stripe.color) host.style.setProperty('--urd-cal-stripe', stripe.color);
  const ui = makeUi(cd, ics, el, host, props, ctx, sources);

  const draw = (occurrences, note) => {
    host.replaceChildren();
    if (ctx.preview && ctx.viewport !== 'mobile') {
      // Help chip (ADR-0008): the sources, the conventions and the subscribe buttons need explaining.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintCalendar.title'),
          lines: [
            ta('hintCalendar.l1'), ta('hintCalendar.l2'), ta('hintCalendar.l3'), ta('hintCalendar.l4'),
            ta('hintCalendar.l5'), ta('hintCalendar.l6'), ta('hintCalendar.l7'),
          ],
        });
      });
    }
    const filtered = activeCategory
      ? occurrences.filter((occ) => occ.category === activeCategory)
      : occurrences;
    // The max count applies to list, cards and agenda; the month, week, day and year views show their span and next has its own two counts.
    const limited = ['month', 'next', 'week', 'day', 'year'].includes(view)
      ? filtered
      : filtered.slice(0, Math.max(1, props.limit ?? 6));
    // A design with switches of its own (ownFilter) draws no chip row.
    const chips = props.showCategories === false || design.ownFilter ? null : categoryRow(occurrences, activeCategory, (category) => {
      activeCategory = category;
      draw(occurrences, note);
    }, ui);
    if (chips) host.appendChild(chips);
    // The whole filtered list, for a design that draws more than the rows (the bento's month dots).
    ui.all = filtered;
    if (!limited.length) {
      host.appendChild(emptyNode(props));
    } else {
      (mod?.[design.id] ?? VIEWS[view] ?? renderList)(host, limited, props, ics, ui);
    }
    // A design that places the subscribe buttons itself (ownSubscribe) gets no row under it.
    if (!design.ownSubscribe || !limited.length) {
      const row = ui.subscribe();
      if (row) host.appendChild(row);
    }
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

  if (ctx.preview) draw([], null);
  loadOccurrences(ics, sources, Math.max(1, props.limit ?? 6), view).then(({ occurrences, errors }) => {
    if (!host.isConnected) return;
    if (!occurrences.length && errors.length) {
      // Visitors get a quiet empty state; the preview gets the error.
      draw([], ctx.preview ? ta('calendar.feedFailed', { error: errors[0] }) : null);
      return;
    }
    draw(occurrences, ctx.preview && errors.length ? ta('calendar.sourceFailed', { error: errors[0] }) : null);
  });
}

export const calendarBlock = {
  version: 1,
  // Natural height in the mobile row grid; on the desktop the push pass owns the box.
  autoGrow: true,
  label: 'Calendar',
  labelKey: 'blocks.calendar',
  defaults: () => ({ sources: [], view: 'list', limit: 6, showCategories: true, showSubscribe: true }),
  // One variant per view: the editor's palette and the preview's block menu
  // list them as «Calendar: Month» and the like.
  variants: VIEW_NAMES.map(([view, labelKey]) => ({ label: view, labelKey, props: { view } })),
  migrations: {},
  render: renderCalendar,
};
