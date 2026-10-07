/**
 * The calendar block's «Coming up» designs (milestone 0.7.19): nine looks on the next view, each built around the next event (and the ones after it as the block's `nextCount` and `laterCount` say), every one a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules in base.css under its own class names.
 * The announcement (`props.notice` with the texts `noticeLabel`, `noticeTitle` and `noticeText`) is an optional part of the designs that declare `notice`.
 * Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.
 */
import { dates } from '../i18n.js';

const DAY = 24 * 3600 * 1000;
const two = (n) => String(n).padStart(2, '0');
const dayOf = (occ) => new Date(occ.start);
const monthShort = (d) => dates().monthsShort[d.getMonth()];
const monthLong = (d) => dates().months[d.getMonth()];
const weekday = (d) => dates().weekdays[(d.getDay() + 6) % 7];

/** Days, hours and minutes left until an event (zero once it has begun). */
function countdownParts(occ, now = Date.now()) {
  const left = Math.max(0, (occ.real ?? occ.start) - now);
  return { days: Math.floor(left / DAY), hours: Math.floor((left % DAY) / 3600000), minutes: Math.floor((left % 3600000) / 60000) };
}

/** Runs fn now and once a minute while the node stays on the page. */
function everyMinute(node, fn) {
  fn();
  const id = setInterval(() => {
    if (!node.isConnected) clearInterval(id);
    else fn();
  }, 60000);
}

/** «Sunday 4 October at 18:00 · The clubhouse» as fields. */
function longWhen(occ, ui, { place = true } = {}) {
  const d = dayOf(occ);
  const line = ui.el('span', 'urd-cal-nx-when');
  line.appendChild(ui.field('span', 'date', ui.dateLine(d, true), null, d));
  if (ui.hasTime(occ)) {
    line.appendChild(document.createTextNode(' '));
    line.appendChild(ui.field('span', 'time', ui.timeText(occ), null, occ));
  }
  if (place && occ.location) {
    line.appendChild(document.createTextNode(' · '));
    line.appendChild(ui.field('span', 'place', occ.location));
  }
  return line;
}

/** The events after the featured ones, as the block's laterCount says. */
const laterOf = (occs, props, ics) => occs.slice(ics.nextCount(props.nextCount), ics.nextCount(props.nextCount) + ics.laterCount(props.laterCount));

/** A one-line «date · title · time» row for the later list. */
function laterRow(occ, ui, className) {
  const d = dayOf(occ);
  const row = ui.tint(ui.el('div', className), occ);
  row.append(ui.field('strong', 'date', ui.dayMonth(d), null, d), ui.field('span', 'title', occ.title, 'urd-cal-nx-later-title'), ui.field('span', 'time', ui.timeText(occ), 'urd-cal-nx-later-time', occ));
  return row;
}

/**
 * The announcement note, when the design shows one and the owner has switched it on.
 * Its title and text are the owner's own words: a note without either is never drawn for a visitor, and stands with its hints in the editor.
 * A text longer than the note holds opens the announcement in full in a card (`ui.notice`).
 */
function noticeNode(props, ui, className) {
  if (props.notice?.show !== true) return null;
  const note = ui.el('div', className);
  const [, title, text] = [['noticeLabel', 'span', 'urd-cal-nx-notice-label', false], ['noticeTitle', 'strong', 'urd-cal-nx-notice-title', true], ['noticeText', 'span', 'urd-cal-nx-notice-text', true]].map(([key, tag, name, carry]) => {
    const part = ui.line(ui.el(tag, name), key, { carry });
    if (part) note.appendChild(part);
    return part;
  });
  const raw = typeof props.notice.href === 'string' ? props.notice.href.trim() : '';
  const href = /^(https?:\/\/|\/(?!\/)|#|mailto:)/i.test(raw) ? raw : '';
  if (href) note.appendChild(ui.link('urd-cal-nx-notice-link', 'moreInfo', href, ''));
  return ui.notice(note, { title, text, href });
}

/** N1 Billboard: a dark board with the pulse label, the title large, a countdown in three tiles and the sign-up as a bar. */
export function billboard(host, occs, props, ics, ui) {
  const [hero] = occs;
  const heroTitle = ui.field('strong', 'title', hero.title, 'urd-cal-bb-title');
  const board = ui.tint(ui.el('div', 'urd-cal-bb'), hero, heroTitle);
  const label = ui.el('div', 'urd-cal-bb-label');
  label.append(ui.el('i', 'urd-cal-bb-pulse'), ui.tx('now'));
  board.append(label, heroTitle, longWhen(hero, ui));
  const tiles = ui.el('div', 'urd-cal-bb-tiles');
  // Each tile's unit takes the plural form of the number on it («1 day», «2 days»).
  const parts = ['unitDays', 'unitHours', 'unitMin'].map((key) => {
    const tile = ui.el('div', 'urd-cal-bb-tile');
    const num = ui.field('strong', 'number', '00');
    const unit = ui.el('span');
    const words = ui.tx(key, null, { n: 0 });
    unit.appendChild(words);
    tile.append(num, unit);
    tiles.appendChild(tile);
    return { num, words };
  });
  everyMinute(board, () => {
    const { days, hours, minutes } = countdownParts(hero);
    [days, hours, minutes].forEach((value, i) => {
      parts[i].num.textContent = two(value);
      ui.retx(parts[i].words, { n: value });
    });
  });
  board.appendChild(tiles);
  const signup = ui.signup(hero);
  if (signup) {
    signup.classList.add('urd-cal-bb-button');
    board.appendChild(signup);
  }
  const foot = ui.el('div', 'urd-cal-bb-foot');
  const later = laterOf(occs, props, ics);
  if (later.length) {
    const then = ui.el('span');
    then.appendChild(ui.tx('then'));
    then.appendChild(document.createTextNode(': '));
    later.forEach((occ, i) => {
      if (i) then.appendChild(document.createTextNode(', '));
      const d = dayOf(occ);
      then.append(ui.field('span', 'title', occ.title), document.createTextNode(' '), ui.field('span', 'date', ui.dayMonth(d), null, d));
    });
    foot.appendChild(then);
  }
  const program = ui.program('urd-cal-bb-program');
  if (program) foot.appendChild(program);
  const sub = ui.subscribe();
  if (sub) foot.appendChild(sub);
  if (foot.children.length) board.appendChild(foot);
  host.appendChild(board);
}

/** N2 Stacked cards: the next events as a stack of cards, the front one in full, a click brings the next to the front. */
export function stacked(host, occs, props, ics, ui) {
  const count = Math.min(occs.length, ics.nextCount(props.nextCount));
  const featured = occs.slice(0, count);
  let front = 0;
  const wrap = ui.el('div', 'urd-cal-stack');
  const head = ui.el('div', 'urd-cal-stack-head');
  const label = ui.el('span', 'urd-cal-stack-label');
  label.appendChild(ui.tx('now'));
  head.append(label, ui.el('span', 'urd-cal-stack-count', ui.tx('nextN', null, { n: count })));
  wrap.appendChild(head);
  const pile = ui.el('div', 'urd-cal-stack-pile');
  const cards = featured.map((occ) => {
    const d = dayOf(occ);
    const card = ui.tint(ui.el('article', 'urd-cal-stack-card'), occ);
    const top = ui.el('div', 'urd-cal-stack-top');
    top.append(ui.field('span', 'date', ui.dateLine(d), 'urd-cal-stack-badge', d), ui.el('span', 'urd-cal-stack-in', ui.countdown(occ)));
    card.append(top, ui.field('strong', 'title', occ.title, 'urd-cal-stack-title'));
    const meta = ui.meta(occ, { date: false });
    if (meta) card.appendChild(meta);
    const signup = ui.signup(occ);
    if (signup) card.appendChild(signup);
    return card;
  });
  const order = () => {
    cards.forEach((card, i) => {
      const depth = (i - front + count) % count;
      card.style.setProperty('--urd-cal-stack-depth', String(depth));
      card.classList.toggle('urd-cal-stack-front', depth === 0);
      card.setAttribute('aria-hidden', depth === 0 ? 'false' : 'true');
      card.inert = depth !== 0;
    });
  };
  for (const card of cards) pile.appendChild(card);
  pile.style.setProperty('--urd-cal-stack-n', String(count));
  order();
  wrap.appendChild(pile);
  const later = laterOf(occs, props, ics);
  if (later.length) {
    const list = ui.el('div', 'urd-cal-stack-later');
    for (const occ of later) list.appendChild(laterRow(occ, ui, 'urd-cal-stack-row'));
    wrap.appendChild(list);
  }
  if (count > 1) {
    const browse = ui.el('button', 'urd-cal-stack-browse');
    browse.type = 'button';
    browse.appendChild(ui.tx('browse'));
    browse.addEventListener('click', () => { front = (front + 1) % count; order(); });
    wrap.appendChild(browse);
  }
  host.appendChild(wrap);
}

/** N3 Noticeboard: a cork board with the next event as a pinned note, the announcement as a second note, and «Later» on a strip. */
export function noticeboard(host, occs, props, ics, ui) {
  const [hero] = occs;
  const board = ui.el('div', 'urd-cal-nb');
  const label = ui.el('div', 'urd-cal-nb-label');
  label.append(ui.el('i', 'urd-cal-nb-dot'), ui.tx('now'));
  board.appendChild(label);
  const note = ui.tint(ui.el('div', 'urd-cal-nb-note'), hero);
  note.appendChild(ui.el('i', 'urd-cal-nb-pin'));
  const kicker = ui.el('span', 'urd-cal-nb-kicker');
  kicker.appendChild(ui.tx('next'));
  note.append(kicker, ui.field('strong', 'title', hero.title, 'urd-cal-nb-title'));
  const meta = ui.meta(hero);
  if (meta) note.appendChild(meta);
  const foot = ui.el('div', 'urd-cal-nb-foot');
  foot.appendChild(ui.el('span', 'urd-cal-nb-in', ui.countdown(hero)));
  const signup = ui.signup(hero);
  if (signup) foot.appendChild(signup);
  note.appendChild(foot);
  board.appendChild(note);
  const notice = noticeNode(props, ui, 'urd-cal-nb-note urd-cal-nb-notice');
  if (notice) {
    notice.prepend(ui.el('i', 'urd-cal-nb-pin urd-cal-nb-pin-alt'));
    board.appendChild(notice);
  }
  const later = laterOf(occs, props, ics);
  if (later.length) {
    const strip = ui.el('div', 'urd-cal-nb-strip');
    const sl = ui.el('span', 'urd-cal-nb-kicker');
    sl.appendChild(ui.tx('later'));
    strip.appendChild(sl);
    for (const occ of later) strip.appendChild(laterRow(occ, ui, 'urd-cal-nb-row'));
    board.appendChild(strip);
  }
  host.appendChild(board);
}

/** N4 Split card: the date huge on a coloured panel to the left, the words and the description to the right, «Later» under. */
export function split(host, occs, props, ics, ui) {
  const [hero] = occs;
  const d = dayOf(hero);
  const heroTitle = ui.field('strong', 'title', hero.title, 'urd-cal-split-title');
  const card = ui.tint(ui.el('div', 'urd-cal-split'), hero, heroTitle);
  const top = ui.el('div', 'urd-cal-split-top');
  const panel = ui.el('div', 'urd-cal-split-panel');
  const label = ui.el('span', 'urd-cal-split-label');
  label.appendChild(ui.tx('now'));
  const when = ui.el('div', 'urd-cal-split-when');
  when.append(ui.field('span', 'date', weekday(d), 'urd-cal-split-wd', d), ui.field('strong', 'number', String(d.getDate()), null, d), ui.field('span', 'date', monthLong(d), 'urd-cal-split-month', d));
  panel.append(label, when, ui.el('span', 'urd-cal-split-in', ui.countdown(hero)));
  const body = ui.el('div', 'urd-cal-split-body');
  const chip = ui.chip(hero);
  if (chip) body.appendChild(chip);
  body.appendChild(heroTitle);
  const meta = ui.meta(hero, { date: false });
  if (meta) body.appendChild(meta);
  const excerpt = ui.excerpt(hero.description, 220);
  if (excerpt && ui.opt.description !== false) body.appendChild(ui.field('p', 'description', excerpt, 'urd-cal-split-text'));
  const signup = ui.signup(hero);
  if (signup) body.appendChild(signup);
  top.append(panel, body);
  card.appendChild(top);
  const later = laterOf(occs, props, ics);
  if (later.length) {
    const list = ui.el('div', 'urd-cal-split-later');
    const sl = ui.el('span', 'urd-cal-split-kicker');
    sl.appendChild(ui.tx('later'));
    list.appendChild(sl);
    for (const occ of later) list.appendChild(laterRow(occ, ui, 'urd-cal-split-row'));
    card.appendChild(list);
  }
  host.appendChild(card);
}

/** N5 Band: one band with the tag at the left and the next events rolling past, a dot between them. */
export function band(host, occs, props, ics, ui) {
  const shown = occs.slice(0, ics.nextCount(props.nextCount) + ics.laterCount(props.laterCount));
  const wrap = ui.el('div', 'urd-cal-band');
  const tag = ui.el('div', 'urd-cal-band-tag');
  tag.append(ui.el('i', 'urd-cal-band-dot'), ui.tx('now'));
  const track = ui.el('div', 'urd-cal-band-track');
  const run = ui.el('div', 'urd-cal-band-run');
  shown.forEach((occ, i) => {
    if (i) run.appendChild(ui.el('i', 'urd-cal-band-sep'));
    const d = dayOf(occ);
    const item = ui.tint(ui.el('span', 'urd-cal-band-item'), occ);
    item.append(ui.field('span', 'date', ui.dayMonth(d), null, d), document.createTextNode(' · '), ui.field('strong', 'title', occ.title), document.createTextNode(' · '), ui.field('span', 'time', ui.timeText(occ), null, occ));
    if (occ.location) {
      item.appendChild(document.createTextNode(' · '));
      item.appendChild(ui.field('span', 'place', occ.location));
    }
    run.appendChild(item);
  });
  track.appendChild(run);
  // The run rolls when it is wider than the band: a copy follows it so the loop has no seam.
  // With rolling switched off the band stands still and scrolls sideways by hand.
  if (ui.opt.roll === false) track.classList.add('urd-cal-band-still');
  else requestAnimationFrame(() => {
    if (!track.isConnected) return;
    if (run.scrollWidth > track.clientWidth) {
      const copy = run.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.inert = true;
      track.appendChild(copy);
      track.classList.add('urd-cal-band-rolling');
      track.style.setProperty('--urd-cal-band-s', `${Math.max(12, Math.round(run.scrollWidth / 60))}s`);
    }
  });
  wrap.append(tag, track);
  host.appendChild(wrap);
}

/** N6 One line: one row per event, the first marked «Coming up» with a pulse, the rest «Later». */
export function oneLine(host, occs, props, ics, ui) {
  const count = ics.nextCount(props.nextCount);
  const shown = occs.slice(0, count + ics.laterCount(props.laterCount));
  const list = ui.el('div', 'urd-cal-line');
  shown.forEach((occ, i) => {
    const d = dayOf(occ);
    const row = ui.tint(ui.el('div', i < count ? 'urd-cal-line-row urd-cal-line-now' : 'urd-cal-line-row'), occ);
    const label = ui.el('span', 'urd-cal-line-label');
    label.appendChild(ui.tx(i < count ? 'now' : 'later'));
    const text = ui.el('span', 'urd-cal-line-text');
    text.append(ui.field('strong', 'title', occ.title), document.createTextNode(' · '), ui.field('span', 'date', ui.dateLine(d), null, d));
    if (ui.hasTime(occ)) {
      text.appendChild(document.createTextNode(' '));
      text.appendChild(ui.field('span', 'time', ui.timeText(occ), null, occ));
    }
    if (occ.location) {
      text.appendChild(document.createTextNode(' · '));
      text.appendChild(ui.field('span', 'place', occ.location));
    }
    row.append(ui.el('i', 'urd-cal-line-dot'), label, text, ui.el('span', 'urd-cal-line-in', ui.countdown(occ)));
    const signup = ui.signup(occ);
    if (signup) row.appendChild(signup);
    list.appendChild(row);
  });
  host.appendChild(list);
}

/** M4 Countdown ring: a ring that fills towards the start with the days left in the middle, the words beside it, the next two under. */
export function ring(host, occs, props, ics, ui) {
  const [hero] = occs;
  const heroTitle = ui.field('strong', 'title', hero.title, 'urd-cal-ring-title');
  const card = ui.tint(ui.el('div', 'urd-cal-ring'), hero, heroTitle);
  const head = ui.el('div', 'urd-cal-ring-head');
  const label = ui.el('span', 'urd-cal-ring-label');
  label.appendChild(ui.tx('now'));
  head.appendChild(label);
  const chip = ui.chip(hero);
  if (chip) head.appendChild(chip);
  card.appendChild(head);
  const main = ui.el('div', 'urd-cal-ring-main');
  const figure = ui.el('div', 'urd-cal-ring-figure');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 132 132');
  svg.setAttribute('aria-hidden', 'true');
  const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  for (const [k, v] of Object.entries({ cx: 66, cy: 66, r: 56, class: 'urd-cal-ring-track' })) track.setAttribute(k, String(v));
  const arc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  for (const [k, v] of Object.entries({ cx: 66, cy: 66, r: 56, class: 'urd-cal-ring-arc', transform: 'rotate(-90 66 66)' })) arc.setAttribute(k, String(v));
  svg.append(track, arc);
  const centre = ui.el('div', 'urd-cal-ring-centre');
  const num = ui.field('strong', 'number', '0');
  const unit = ui.el('span');
  centre.append(num, unit);
  figure.append(svg, centre);
  // The ring fills over the last two weeks before the start; the middle counts days, then hours on the last day.
  everyMinute(card, () => {
    const { days, hours } = countdownParts(hero);
    const left = Math.max(0, (hero.real ?? hero.start) - Date.now());
    const filled = Math.max(0, Math.min(1, 1 - left / (14 * DAY)));
    const circ = 2 * Math.PI * 56;
    arc.setAttribute('stroke-dasharray', `${(filled * circ).toFixed(1)} ${circ.toFixed(1)}`);
    const value = days > 0 ? days : hours;
    num.textContent = String(value);
    // The unit takes the plural form of the number («1 day», «3 days»), and turns to hours on the last day.
    const key = days > 0 ? 'unitDays' : 'unitHours';
    if (unit.dataset.unit !== key) {
      unit.dataset.unit = key;
      unit.replaceChildren(ui.tx(key, null, { n: value }));
    } else {
      ui.retx(unit.firstChild, { n: value });
    }
  });
  const body = ui.el('div', 'urd-cal-ring-body');
  body.append(heroTitle, longWhen(hero, ui, { place: false }));
  if (hero.location) body.appendChild(ui.field('span', 'place', hero.location, 'urd-cal-ring-place'));
  const signup = ui.signup(hero);
  if (signup) body.appendChild(signup);
  main.append(figure, body);
  card.appendChild(main);
  const later = laterOf(occs, props, ics);
  if (later.length) {
    const list = ui.el('div', 'urd-cal-ring-later');
    for (const occ of later) {
      const row = laterRow(occ, ui, 'urd-cal-ring-row');
      row.prepend(ui.el('i', 'urd-cal-ring-rowdot'));
      row.lastChild.replaceChildren(ui.countdown(occ));
      list.appendChild(row);
    }
    card.appendChild(list);
  }
  host.appendChild(card);
}

/** M5 Dark glass: a dark card over two colour blobs, a live countdown, a progress bar, two buttons and «Then». */
export function darkGlass(host, occs, props, ics, ui) {
  const [hero] = occs;
  const heroTitle = ui.field('strong', 'title', hero.title, 'urd-cal-dg-title');
  const card = ui.tint(ui.el('div', 'urd-cal-dg'), hero, heroTitle);
  card.append(ui.el('i', 'urd-cal-dg-blob urd-cal-dg-blob-a'), ui.el('i', 'urd-cal-dg-blob urd-cal-dg-blob-b'));
  const inner = ui.el('div', 'urd-cal-dg-inner');
  const head = ui.el('div', 'urd-cal-dg-head');
  const label = ui.el('span', 'urd-cal-dg-label');
  label.append(ui.el('i', 'urd-cal-dg-pulse'), ui.tx('now'));
  const clock = ui.field('span', 'number', '', 'urd-cal-dg-clock');
  const clockWords = ui.tx('countdownClock', null, { d: '00', h: '00', m: '00' });
  clock.appendChild(clockWords);
  head.append(label, clock);
  inner.append(head, heroTitle, longWhen(hero, ui));
  const progress = ui.el('div', 'urd-cal-dg-progress');
  const pl = ui.el('div', 'urd-cal-dg-progress-label');
  const until = ui.el('span');
  until.appendChild(ui.tx('untilStart'));
  const pct = ui.el('span');
  pl.append(until, pct);
  const bar = ui.el('div', 'urd-cal-dg-bar');
  const fill = ui.el('i');
  bar.appendChild(fill);
  progress.append(pl, bar);
  inner.appendChild(progress);
  everyMinute(card, () => {
    const { days, hours, minutes } = countdownParts(hero);
    ui.retx(clockWords, { d: two(days), h: two(hours), m: two(minutes) });
    const left = Math.max(0, (hero.real ?? hero.start) - Date.now());
    const filled = Math.max(0, Math.min(1, 1 - left / (14 * DAY)));
    pct.textContent = ui.percent(filled);
    fill.style.width = `${Math.round(filled * 100)}%`;
  });
  const buttons = ui.el('div', 'urd-cal-dg-buttons');
  const signup = ui.signup(hero);
  if (signup) buttons.appendChild(signup);
  const sub = ui.subscribe();
  if (sub) buttons.appendChild(sub);
  if (buttons.children.length) inner.appendChild(buttons);
  const later = laterOf(occs, props, ics);
  if (later.length) {
    const box = ui.el('div', 'urd-cal-dg-later');
    const kicker = ui.el('span', 'urd-cal-dg-kicker');
    kicker.appendChild(ui.tx('then'));
    box.appendChild(kicker);
    for (const occ of later) box.appendChild(laterRow(occ, ui, 'urd-cal-dg-row'));
    inner.appendChild(box);
  }
  card.appendChild(inner);
  host.appendChild(card);
}

/** M6 Coming up bento: a coloured hero tile for the next event, a date tile per later event, and a link tile with the count. */
export function nextBento(host, occs, props, ics, ui) {
  const [hero] = occs;
  const d = dayOf(hero);
  const grid = ui.el('div', 'urd-cal-nbento');
  const heroTile = ui.tint(ui.el('article', 'urd-cal-nbento-tile urd-cal-nbento-hero'), hero);
  const top = ui.el('div', 'urd-cal-nbento-top');
  const label = ui.el('span', 'urd-cal-nbento-label');
  label.append(ui.el('i', 'urd-cal-nbento-dot'), ui.tx('now'));
  top.append(label, ui.el('span', 'urd-cal-nbento-in', ui.countdown(hero)));
  const foot = ui.el('div', 'urd-cal-nbento-foot');
  const words = ui.el('div', 'urd-cal-nbento-words');
  words.appendChild(ui.field('strong', 'title', hero.title, 'urd-cal-nbento-title'));
  const meta = ui.el('div', 'urd-cal-meta');
  meta.appendChild(ui.field('span', 'date', ui.dateLine(d), null, d));
  if (ui.hasTime(hero)) {
    meta.appendChild(document.createTextNode(' · '));
    meta.appendChild(ui.field('span', 'time', ui.timeText(hero), null, hero));
  }
  if (hero.location) {
    meta.appendChild(document.createTextNode(' · '));
    meta.appendChild(ui.field('span', 'place', hero.location));
  }
  words.appendChild(meta);
  foot.appendChild(words);
  const signup = ui.signup(hero);
  if (signup) foot.appendChild(signup);
  heroTile.append(top, foot);
  grid.appendChild(heroTile);
  // The day tiles: the featured events after the first, then the later ones.
  const later = occs.slice(1, ics.nextCount(props.nextCount) + ics.laterCount(props.laterCount));
  later.forEach((occ, i) => {
    const od = dayOf(occ);
    const tile = ui.tint(ui.el('article', 'urd-cal-nbento-tile urd-cal-nbento-day'), occ);
    if (i === 2) tile.classList.add('urd-cal-nbento-dark');
    const when = ui.el('span', 'urd-cal-nbento-when');
    when.append(ui.field('strong', 'number', String(od.getDate()), null, od), ui.field('span', 'date', monthShort(od), null, od));
    const body = ui.el('div');
    body.append(ui.field('strong', 'title', occ.title, 'urd-cal-nbento-small'), ui.field('span', 'time', ui.timeText(occ), 'urd-cal-nbento-sub', occ));
    tile.append(when, body);
    grid.appendChild(tile);
  });
  const sub = ui.subscribe();
  const linkTile = ui.el('div', 'urd-cal-nbento-tile urd-cal-nbento-link');
  linkTile.appendChild(ui.el('span', 'urd-cal-nbento-arrow', '→'));
  const count = ui.el('strong', 'urd-cal-nbento-small');
  // The tile's words lead to the whole programme when the block has an address for it.
  count.appendChild(ui.program() ?? ui.tx('wholeProgram'));
  count.appendChild(ui.el('span', 'urd-cal-nbento-sub', ui.tx('count', null, { n: occs.length })));
  linkTile.appendChild(count);
  if (sub) linkTile.appendChild(sub);
  grid.appendChild(linkTile);
  host.appendChild(grid);
}
