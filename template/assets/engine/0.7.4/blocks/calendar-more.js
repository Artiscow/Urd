/**
 * The calendar block's ApeironLF set and the dark mobile agenda (milestone
 * 0.7.19): the «Coming up» card on cream (with the announcement as a
 * section or as an alert band), the same on navy with the next events as
 * cards, the recurring event with its facts and the fold of all its dates,
 * and an agenda on a dark ground with a week strip. Each is a renderer over
 * the block's ui helpers (fields, static texts, buttons; see makeUi in
 * calendar.js) with its own CSS block in base.css under `.urd-cal-d-<id>`.
 * Loaded by the block on the first render of a block that uses one of them,
 * never in the visitor closure.
 */
import { t, tp, dates } from '../i18n.js';
import { iconSvg } from '../icons.js';

const two = (n) => String(n).padStart(2, '0');
const dayOf = (occ) => new Date(occ.start);
const monthShort = (d) => dates().monthsShort[d.getMonth()];
const monthLong = (d) => dates().months[d.getMonth()];
const weekdayShort = (d) => dates().weekdaysShort[(d.getDay() + 6) % 7];
const weekday = (d) => dates().weekdays[(d.getDay() + 6) % 7];
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** «Wed · 19:00 · the place» as fields: the weekday, the time and the place. */
function shortWhen(occ, ui, { place = true } = {}) {
  const d = dayOf(occ);
  const line = ui.el('span', 'urd-cal-ap-line');
  line.appendChild(ui.field('span', 'date', weekdayShort(d), null, d));
  if (ui.hasTime(occ)) {
    line.appendChild(document.createTextNode(' · '));
    line.appendChild(ui.field('span', 'time', ui.time(occ), null, occ));
  }
  if (place && occ.location) {
    line.appendChild(document.createTextNode(' · '));
    line.appendChild(ui.field('span', 'place', occ.location));
  }
  return line;
}

/** An arrow link to the event's own page (its address, else its sign-up); null when it has neither. */
function arrowLink(occ, ui, className) {
  const href = ui.href(occ);
  if (!href) return null;
  const a = ui.el('a', className, '→');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', occ.title);
  return a;
}

/** The «Later» rows: a gold dot on a rail, the date in capitals, the title and the arrow. */
function laterRail(later, ui) {
  const list = ui.el('div', 'urd-cal-apn-rail');
  for (const occ of later) {
    const d = dayOf(occ);
    const row = ui.tint(ui.el('div', 'urd-cal-apn-rail-row'), occ);
    row.append(ui.el('i', 'urd-cal-apn-rail-dot'), ui.field('strong', 'date', `${d.getDate()}. ${monthShort(d)}`, null, d), ui.field('span', 'title', occ.title));
    const arrow = arrowLink(occ, ui, 'urd-cal-apn-arrow');
    if (arrow) row.appendChild(arrow);
    list.appendChild(row);
  }
  return list;
}

/** A1 to A3 Coming up on cream: a navy head, the next event with a navy date badge, «Later» on a rail, and the announcement as a section or an alert band. */
export function apNow(host, occs, props, ics, ui) {
  const count = ics.nextCount(props.nextCount);
  const card = ui.el('div', 'urd-cal-apn');
  const head = ui.el('div', 'urd-cal-apn-head');
  head.append(ui.el('i', 'urd-cal-apn-dot'), ui.tx('now'));
  card.appendChild(head);
  const notice = props.notice?.show === true;
  const href = typeof props.notice?.href === 'string' && /^(https?:\/\/|\/|#|mailto:)/i.test(props.notice.href.trim()) ? props.notice.href.trim() : '';
  if (notice && props.notice.as === 'band') {
    const band = ui.el(href ? 'a' : 'div', 'urd-cal-apn-alert');
    if (href) band.href = href;
    const mark = ui.el('span', 'urd-cal-apn-alert-icon');
    mark.setAttribute('aria-hidden', 'true');
    mark.innerHTML = iconSvg('warning') || iconSvg('info') || '';
    const words = ui.el('span', 'urd-cal-apn-alert-text');
    words.appendChild(ui.tx('noticeTitle'));
    band.append(mark, words);
    if (href) band.appendChild(ui.el('span', 'urd-cal-apn-alert-arrow', '→'));
    card.appendChild(band);
  }
  for (const occ of occs.slice(0, count)) {
    const d = dayOf(occ);
    const row = ui.tint(ui.el('div', 'urd-cal-apn-next'), occ);
    const badge = ui.el('div', 'urd-cal-apn-badge');
    badge.append(ui.field('strong', 'number', String(d.getDate()), null, d), ui.field('span', 'date', monthShort(d), null, d));
    const body = ui.el('div', 'urd-cal-apn-body');
    const kicker = ui.el('span', 'urd-cal-apn-kicker');
    kicker.appendChild(ui.tx('next'));
    body.append(kicker, ui.field('strong', 'title', occ.title, 'urd-cal-apn-title'), shortWhen(occ, ui));
    const foot = ui.el('div', 'urd-cal-apn-foot');
    foot.appendChild(ui.el('span', 'urd-cal-apn-in', ui.countdown(occ)));
    const signup = ui.signup(occ);
    if (signup) foot.appendChild(signup);
    body.appendChild(foot);
    row.append(badge, body);
    card.appendChild(row);
  }
  const later = occs.slice(count, count + ics.laterCount(props.laterCount));
  if (later.length) {
    const box = ui.el('div', 'urd-cal-apn-later');
    const kicker = ui.el('span', 'urd-cal-apn-kicker');
    kicker.appendChild(ui.tx('later'));
    box.append(kicker, laterRail(later, ui));
    card.appendChild(box);
  }
  if (notice && props.notice.as !== 'band') {
    const box = ui.el('div', 'urd-cal-apn-notice');
    const text = ui.el('div', 'urd-cal-apn-notice-body');
    const kicker = ui.el('span', 'urd-cal-apn-kicker');
    kicker.appendChild(ui.tx('noticeLabel'));
    const title = ui.el('strong', 'urd-cal-apn-notice-title');
    title.appendChild(ui.tx('noticeTitle'));
    const words = ui.el('span', 'urd-cal-apn-notice-text');
    words.appendChild(ui.tx('noticeText'));
    text.append(kicker, title, words);
    box.appendChild(text);
    if (href) {
      const arrow = ui.el('a', 'urd-cal-apn-arrow', '→');
      arrow.href = href;
      arrow.setAttribute('aria-label', t('calendar.moreInfo'));
      box.appendChild(arrow);
    }
    card.appendChild(box);
  }
  host.appendChild(card);
}

/** A4 Coming up on navy: the next event on a cream card, the following ones as navy cards with a gold edge, «Later» as lines. */
export function apNavy(host, occs, props, ics, ui) {
  const count = Math.min(occs.length, ics.nextCount(props.nextCount));
  const card = ui.el('div', 'urd-cal-apv');
  const head = ui.el('div', 'urd-cal-apv-head');
  const label = ui.el('span', 'urd-cal-apv-label');
  label.append(ui.el('i', 'urd-cal-apn-dot'), ui.tx('now'));
  head.appendChild(label);
  if (count > 1) head.appendChild(ui.el('span', 'urd-cal-apv-count', tp('calendar.nextN', count)));
  card.appendChild(head);
  occs.slice(0, count).forEach((occ, i) => {
    const d = dayOf(occ);
    const tile = ui.tint(ui.el('article', i === 0 ? 'urd-cal-apv-first' : 'urd-cal-apv-tile'), occ);
    const when = ui.el('div', 'urd-cal-apv-when');
    when.append(ui.field('strong', 'number', String(d.getDate()), null, d), ui.field('span', 'date', monthShort(d), null, d));
    const body = ui.el('div', 'urd-cal-apv-body');
    if (i === 0) {
      const top = ui.el('div', 'urd-cal-apv-top');
      const chip = ui.chip(occ);
      if (chip) top.appendChild(chip);
      top.appendChild(shortWhen(occ, ui, { place: false }));
      body.append(top, ui.field('strong', 'title', occ.title, 'urd-cal-apv-title'));
      if (occ.location) body.appendChild(ui.field('span', 'place', occ.location, 'urd-cal-apv-place'));
      const href = ui.href(occ);
      if (href) {
        const more = ui.link('urd-cal-apv-more', 'moreInfo', href, '');
        more.target = '_blank';
        more.rel = 'noopener';
        body.appendChild(more);
      }
    } else {
      body.append(ui.field('strong', 'title', occ.title, 'urd-cal-apv-title'), shortWhen(occ, ui));
    }
    tile.append(when, body);
    if (i > 0) {
      const arrow = arrowLink(occ, ui, 'urd-cal-apv-arrow');
      if (arrow) tile.appendChild(arrow);
    }
    card.appendChild(tile);
  });
  const later = occs.slice(count, count + ics.laterCount(props.laterCount));
  if (later.length) {
    const box = ui.el('div', 'urd-cal-apv-later');
    const kicker = ui.el('span', 'urd-cal-apv-kicker');
    kicker.appendChild(ui.tx('later'));
    box.appendChild(kicker);
    for (const occ of later) {
      const d = dayOf(occ);
      const row = ui.tint(ui.el('div', 'urd-cal-apv-row'), occ);
      const words = ui.el('span');
      words.append(ui.field('strong', 'date', `${d.getDate()}. ${monthShort(d)}`, null, d), ui.field('span', 'title', occ.title));
      row.appendChild(words);
      const arrow = arrowLink(occ, ui, 'urd-cal-apv-arrow');
      if (arrow) row.appendChild(arrow);
      box.appendChild(row);
    }
    card.appendChild(box);
  }
  host.appendChild(card);
}

/** «27 October at 19:00» as fields. */
function longDate(occ, ui) {
  const d = dayOf(occ);
  const line = ui.el('span');
  line.appendChild(ui.field('span', 'date', `${d.getDate()}. ${monthLong(d)}`, null, d));
  if (ui.hasTime(occ)) {
    line.appendChild(document.createTextNode(' '));
    line.appendChild(ui.field('span', 'time', ui.timeText(occ), null, occ));
  }
  return line;
}

/** A8 Regular event: one recurring event with its description, when, where and for whom, a fold with all its dates, and the announcement as an aside. */
export function apSeries(host, occs, props, ics, ui) {
  // The series is every occurrence that shares the next event's title.
  const [first] = occs;
  const series = ui.all.filter((occ) => occ.title === first.title).slice(0, Math.max(1, props.limit ?? 6));
  const card = ui.tint(ui.el('div', 'urd-cal-aps'), first);
  const main = ui.el('div', 'urd-cal-aps-main');
  const kicker = ui.el('span', 'urd-cal-aps-kicker');
  kicker.append(ui.el('i'), ui.tx('series'));
  main.append(kicker, ui.field('strong', 'title', first.title, 'urd-cal-aps-title'));
  const text = String(first.description ?? '').split('\n').find((line) => line.trim() && !/^https?:\/\//i.test(line.trim()));
  if (text) main.appendChild(ui.field('p', 'description', ui.excerpt(text, 400), 'urd-cal-aps-text'));
  const facts = ui.el('div', 'urd-cal-aps-facts');
  const fact = (key, value) => {
    if (!value) return;
    const box = ui.el('div');
    const label = ui.el('span', 'urd-cal-aps-fact');
    label.appendChild(ui.tx(key));
    box.append(label, value);
    facts.appendChild(box);
  };
  fact('when', longDate(first, ui));
  fact('where', first.location ? ui.field('span', 'place', first.location, 'urd-cal-aps-place') : null);
  const open = ui.el('strong');
  open.appendChild(ui.tx('openAll'));
  fact('forWhom', open);
  main.appendChild(facts);
  const signup = ui.signup(first);
  if (signup) main.appendChild(signup);
  if (series.length > 1) {
    const fold = ui.el('details', 'urd-cal-aps-fold');
    const summary = ui.el('summary');
    summary.appendChild(ui.tx('allDates'));
    fold.appendChild(summary);
    const list = ui.el('div', 'urd-cal-aps-dates');
    for (const occ of series) {
      const row = ui.el('div', 'urd-cal-aps-row');
      row.appendChild(longDate(occ, ui));
      if (occ.location) row.appendChild(ui.field('span', 'place', occ.location, 'urd-cal-aps-place'));
      const arrow = arrowLink(occ, ui, 'urd-cal-aps-arrow');
      if (arrow) row.appendChild(arrow);
      list.appendChild(row);
    }
    fold.appendChild(list);
    main.appendChild(fold);
  }
  card.appendChild(main);
  if (props.notice?.show === true) {
    const aside = ui.el('aside', 'urd-cal-aps-aside');
    const title = ui.el('strong', 'urd-cal-aps-aside-title');
    title.appendChild(ui.tx('noticeTitle'));
    const label = ui.el('span', 'urd-cal-aps-fact');
    label.appendChild(ui.tx('noticeLabel'));
    const words = ui.el('p', 'urd-cal-aps-aside-text');
    words.appendChild(ui.tx('noticeText'));
    aside.append(title, label, words);
    card.appendChild(aside);
  }
  host.appendChild(card);
}

let menuSeq = 0;

/**
 * The calendar chip of the dark agenda: a button naming the calendar shown,
 * opening a menu of the named calendars (the Popover API, ADR-0011). Without
 * popovers the calendars stand as a row of chips. Null with fewer than two
 * calendars.
 */
function filterMenu(ui) {
  const { names, active, pick } = ui.filter ?? {};
  if (!names || names.length < 2) return null;
  const colourOf = (name) => ui.all.find((occ) => occ.category === name && occ.color) ?? null;
  const choice = (name, className) => {
    const btn = ui.el('button', className);
    btn.type = 'button';
    if (name) {
      const hit = colourOf(name);
      btn.appendChild(hit ? ui.tint(ui.el('i', 'urd-cal-magenda-dot'), hit) : ui.el('i', 'urd-cal-magenda-dot'));
      btn.appendChild(ui.field('span', 'category', name));
    } else {
      btn.appendChild(ui.tx('all'));
    }
    if ((active ?? null) === name) btn.setAttribute('aria-current', 'true');
    btn.addEventListener('click', () => pick(name));
    return btn;
  };
  const wrap = ui.el('div', 'urd-cal-magenda-filter');
  if (!('popover' in HTMLElement.prototype)) {
    wrap.classList.add('urd-cal-magenda-filter-row');
    for (const name of [null, ...names]) wrap.appendChild(choice(name, 'urd-cal-magenda-pick'));
    return wrap;
  }
  const list = ui.el('div', 'urd-cal-magenda-menu');
  list.id = `urd-cal-menu-${++menuSeq}`;
  list.popover = 'auto';
  for (const name of [null, ...names]) list.appendChild(choice(name, 'urd-cal-magenda-pick'));
  const open = ui.el('button', 'urd-cal-magenda-chip');
  open.type = 'button';
  open.popoverTargetElement = list;
  if (active) open.appendChild(ui.field('span', 'category', active));
  else open.appendChild(ui.tx('all'));
  open.appendChild(ui.el('i', 'urd-cal-magenda-caret'));
  // The menu opens under its chip: its place is measured when it opens.
  list.addEventListener('toggle', (event) => {
    if (event.newState !== 'open') return;
    const box = open.getBoundingClientRect();
    list.style.top = `${box.bottom + 6}px`;
    list.style.left = `${Math.max(8, Math.min(box.left, window.innerWidth - list.offsetWidth - 8))}px`;
  });
  wrap.append(open, list);
  return wrap;
}

/** F5 Agenda, dark: a dark ground with the month and the calendar chip, this week's days with a dot under those with events, and a card per event under its day. */
export function mobileAgenda(host, occs, props, ics, ui) {
  const today = ui.today();
  const monday = new Date(ui.weekStartOf(today.getTime()));
  const card = ui.el('div', 'urd-cal-magenda');
  const head = ui.el('div', 'urd-cal-magenda-head');
  head.appendChild(ui.el('strong', 'urd-cal-magenda-month', monthLong(occs.length ? dayOf(occs[0]) : today)));
  const menu = filterMenu(ui);
  if (menu) head.appendChild(menu);
  card.appendChild(head);
  const strip = ui.el('div', 'urd-cal-magenda-strip');
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const cell = ui.el('span', 'urd-cal-magenda-day');
    if (sameDay(d, today)) cell.classList.add('urd-cal-magenda-today');
    cell.append(ui.field('span', 'date', weekdayShort(d), null, d), ui.field('strong', 'number', String(d.getDate()), null, d));
    const hit = ui.all.find((occ) => sameDay(dayOf(occ), d));
    if (hit) cell.appendChild(ui.tint(ui.el('i', 'urd-cal-magenda-dot'), hit));
    strip.appendChild(cell);
  }
  card.appendChild(strip);
  const list = ui.el('div', 'urd-cal-magenda-list');
  let last = null;
  for (const occ of occs) {
    const d = dayOf(occ);
    if (!last || !sameDay(last, d)) {
      const label = ui.el('span', 'urd-cal-magenda-label');
      if (sameDay(d, today)) {
        label.appendChild(ui.tx('todayBtn'));
        label.appendChild(document.createTextNode(', '));
      }
      label.appendChild(ui.field('span', 'date', `${weekday(d)} ${d.getDate()}.`, null, d));
      list.appendChild(label);
      last = d;
    }
    const row = ui.tint(ui.el('article', 'urd-cal-magenda-card'), occ);
    row.appendChild(ui.field('span', 'time', ui.time(occ), 'urd-cal-magenda-time', occ));
    const body = ui.el('span', 'urd-cal-magenda-body');
    body.appendChild(ui.field('strong', 'title', occ.title));
    if (occ.location) body.appendChild(ui.field('span', 'place', occ.location, 'urd-cal-magenda-place'));
    const signup = ui.signup(occ);
    if (signup) body.appendChild(signup);
    row.appendChild(body);
    list.appendChild(row);
  }
  card.appendChild(list);
  host.appendChild(card);
}
