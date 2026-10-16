/**
 * The calendar block's retro designs (milestone 0.7.19.23): looks from a past of paper, boards and screens, each a renderer over the block's ui helpers (fields, static texts, buttons; see makeUi in calendar.js) with its own rules and colour set in base.css under its own class names.
 * A design's theme words are drawn through ui.tx like any text: the block swaps in the design's own words where it has them (calThemeTexts in calendar-designs.js), and a design that rewrites calendar data asks ui.rewrite first.
 * Loaded by the block on the first render of a block that uses one of them, never in the visitor closure.
 */
import { dates } from '../i18n.js';

const dayOf = (occ) => new Date(occ.start);
const two = (n) => String(n).padStart(2, '0');

/** The events after the featured one, as the block's nextCount and laterCount say (the same slice as the «Coming up» designs). */
const laterOf = (occs, props, ics) => occs.slice(ics.nextCount(props.nextCount), ics.nextCount(props.nextCount) + ics.laterCount(props.laterCount));

/**
 * «Add to calendar» as a button on the event's box: it opens the event's card, where the ways to add it stand (this one event to Google or as a file, or the whole calendar).
 * Null on a cancelled event, and when the owner left «Add to calendar» out of the card (showAdd).
 */
function addButton(occ, props, ui, box, className) {
  if (occ.cancelled || props.showAdd === false) return null;
  const button = ui.el('button', className);
  button.type = 'button';
  button.appendChild(ui.tx('addEvent'));
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    box.click();
  });
  return button;
}

/** A «date · title · time» row for the events after the featured one, struck when cancelled. */
function laterRow(occ, ui, className) {
  const d = dayOf(occ);
  const row = ui.tint(ui.el('div', className), occ);
  row.append(ui.field('strong', 'date', ui.dayMonth(d), `${className}-date`, d), ui.field('span', 'title', occ.title, `${className}-title`), ui.field('span', 'time', ui.timeText(occ), `${className}-time`, occ));
  return row;
}

/**
 * R1 Tear-off pad: a paper pad under the month's bar, the day huge over its weekday, the next event on the page with its countdown, time and place, excerpt and buttons, and the events after it as dashed rows; the torn pages show as a stack at the bottom edge.
 * The countdown's words are the design's own («Today in {n} days», the theme word inDays).
 */
export function pad(host, occs, props, ics, ui) {
  const [hero] = occs;
  const d = dayOf(hero);
  const title = ui.field('strong', 'title', hero.title, 'urd-cal-pad-title');
  const page = ui.tint(ui.el('div', 'urd-cal-pad'), hero, title);
  const head = ui.el('div', 'urd-cal-pad-head');
  head.append(ui.field('span', 'date', dates().months[d.getMonth()], 'urd-cal-pad-month', d), ui.field('span', 'date', String(d.getFullYear()), 'urd-cal-pad-year', d));
  const day = ui.el('div', 'urd-cal-pad-day');
  day.append(ui.field('strong', 'number', String(d.getDate()), 'urd-cal-pad-num', d), ui.field('span', 'date', dates().weekdays[(d.getDay() + 6) % 7], 'urd-cal-pad-wd', d));
  const body = ui.el('div', 'urd-cal-pad-body');
  body.append(ui.el('span', 'urd-cal-pad-in', ui.countdown(hero)), title);
  const meta = ui.meta(hero, { date: false });
  if (meta) {
    meta.classList.add('urd-cal-pad-when');
    body.appendChild(meta);
  }
  const excerpt = ui.excerpt(hero.description, 220);
  if (excerpt && ui.descriptionIn !== 'card') {
    const text = ui.field('p', 'description', excerpt, 'urd-cal-pad-text');
    const href = ui.href(hero);
    if (href) {
      const more = ui.link('urd-cal-pad-more', 'moreInfo', href, '');
      more.target = '_blank';
      more.rel = 'noopener';
      text.append(document.createTextNode(' '), more);
    }
    body.appendChild(text);
  }
  const buttons = ui.el('div', 'urd-cal-pad-buttons');
  const signup = ui.signup(hero);
  if (signup) {
    signup.classList.add('urd-cal-pad-signup');
    buttons.appendChild(signup);
  }
  const add = addButton(hero, props, ui, page, 'urd-cal-pad-add');
  if (add) buttons.appendChild(add);
  if (buttons.childElementCount) body.appendChild(buttons);
  const later = laterOf(occs, props, ics);
  if (later.length) {
    const list = ui.el('div', 'urd-cal-pad-later');
    for (const occ of later) list.appendChild(laterRow(occ, ui, 'urd-cal-pad-row'));
    body.appendChild(list);
  }
  page.append(head, day, body);
  host.appendChild(page);
}

/**
 * R2 Index cards: typewritten cards on lined paper, each a little askew, numbered in their head with the category beside, the event as «Date:», «Time:» and «Place:» lines with the sign-up or «Open to everyone» and «Repeats» as lines of the same kind, the excerpt under them, and a stamp across a cancelled event.
 * The line words and the number are the design's own (the theme words cardNo, colDate, colTime, colPlace, signup, openToAll and recurring).
 */
export function index(host, occs, props, ics, ui) {
  const box = ui.el('div', 'urd-cal-index');
  const line = (key, content) => {
    const row = ui.el('div', 'urd-cal-index-line');
    row.append(ui.tx(key, 'urd-cal-index-key'), document.createTextNode(' '), content);
    return row;
  };
  occs.forEach((occ, i) => {
    const d = dayOf(occ);
    const card = ui.tint(ui.el('article', `urd-cal-index-card urd-cal-index-tilt-${i % 4}`), occ);
    const head = ui.el('div', 'urd-cal-index-head');
    head.appendChild(ui.el('span', 'urd-cal-index-no', ui.tx('cardNo', null, { n: two(ui.offset + i + 1) })));
    if (occ.category) head.appendChild(ui.field('span', 'category', occ.category, 'urd-cal-index-cat'));
    const body = ui.el('div', 'urd-cal-index-body');
    body.appendChild(ui.field('strong', 'title', occ.title, 'urd-cal-index-title'));
    body.appendChild(line('colDate', ui.field('span', 'date', `${ui.dayMonth(d)} (${dates().weekdaysShort[(d.getDay() + 6) % 7]})`, null, d)));
    // The time line is left out of a cancelled event: its stamp says what the time would.
    if (!occ.cancelled && ui.hasTime(occ)) body.appendChild(line('colTime', ui.field('span', 'time', ui.time(occ), null, occ)));
    if (occ.location) body.appendChild(line('colPlace', ui.field('span', 'place', occ.location)));
    const signup = ui.signup(occ) ?? ui.openToAll(occ);
    if (signup) body.appendChild(signup);
    const recurring = ui.recurring(occ);
    if (recurring) body.appendChild(recurring);
    const excerpt = ui.excerpt(occ.description, 160);
    if (excerpt && ui.descriptionIn !== 'card') {
      const text = ui.field('p', 'description', excerpt, 'urd-cal-index-text');
      const href = ui.href(occ);
      if (href) {
        const more = ui.link('urd-cal-index-more', 'moreInfo', href, '');
        more.target = '_blank';
        more.rel = 'noopener';
        text.append(document.createTextNode(' '), more);
      }
      body.appendChild(text);
    }
    card.append(head, body);
    if (occ.cancelled) card.appendChild(ui.el('span', 'urd-cal-index-stamp', ui.tx('cancelled')));
    box.appendChild(card);
  });
  host.appendChild(box);
}

/** The departure board's columns: the head text of each and its width in flap cells. */
const DEP_COLS = [['colDate', 5], ['colTime', 5], ['colEvent', 19], ['colPlace', 9], ['colStatus', 6]];

/** Text cut to a column's cells, as a board with fixed flaps cuts it; the whole text when the design draws without rewriting. */
const cut = (text, n, rewrite) => (rewrite && text.length > n ? text.slice(0, n).trimEnd() : text);

/** A run of n flap cells holding one text (the tiles are the style sheet's); `className` adds the small size or a tone. */
function cells(ui, n, content, className) {
  const run = ui.el('span', className ? `urd-cal-dep-cells ${className}` : 'urd-cal-dep-cells', content);
  run.style.setProperty('--n', String(n));
  return run;
}

/** The date as the board writes it: 04.10 with rewriting, else the language's day and month. */
const depDate = (d, ui) => (ui.rewrite ? `${two(d.getDate())}.${two(d.getMonth() + 1)}` : ui.dayMonth(d));

/** The time as the board writes it: the all-day word, the start alone with rewriting, else the event's time. */
const depTime = (occ, ui) => (occ.allDay ? ui.tx('allDay') : ui.rewrite ? document.createTextNode(ui.startClock(occ)) : ui.time(occ));

/**
 * An event's status on the board: the sign-up word with a sign-up to show (amber), else «open to everyone» where the design says it, else nothing; a cancelled event says so in the alert colour.
 * @returns {{node: Node|null, tone: string}}
 */
function statusOf(occ, props, ui) {
  if (occ.cancelled) return { node: ui.tx('cancelled'), tone: 'urd-cal-dep-alert' };
  if (occ.signup && props.showSignup === true) return { node: ui.tx('signup'), tone: 'urd-cal-dep-amber' };
  return { node: ui.openToAll(occ), tone: '' };
}

/** The board's head: the heading and the time it was updated. */
function depHead(ui) {
  const now = ui.today();
  const stamp = `${depDate(now, ui)} ${ui.startClock({ start: now.getTime() })}`;
  const head = ui.el('div', 'urd-cal-dep-head');
  head.append(ui.tx('now', 'urd-cal-dep-title'), ui.tx('updated', 'urd-cal-dep-updated', { time: stamp }));
  return head;
}

/** The board's foot: the subscribe links, where there is a source, and the hint. */
function depFoot(ui) {
  const foot = ui.el('div', 'urd-cal-dep-foot');
  const subscribe = ui.subscribe();
  if (subscribe) foot.appendChild(subscribe);
  foot.appendChild(ui.tx('rowHint', 'urd-cal-dep-hint'));
  return foot;
}

/** The first event's excerpt with its link, for the boards that carry one; null without. */
function depExcerpt(occ, ui) {
  const excerpt = ui.excerpt(occ.description, 220);
  if (!excerpt || ui.descriptionIn === 'card') return null;
  const text = ui.field('p', 'description', excerpt, 'urd-cal-dep-text');
  const href = ui.href(occ);
  if (href) {
    const more = ui.link('urd-cal-dep-more', 'moreInfo', href, '');
    more.target = '_blank';
    more.rel = 'noopener';
    text.append(document.createTextNode(' '), more);
  }
  return text;
}

/**
 * R3 Departure board: a dark board of split-flap rows under an amber heading and the time it was updated, the columns headed Date, Time, Event, Place and Status, each row the event's start as 04.10 and 18:00, its title and place cut to the flaps and set in capitals by the style sheet, and its status (the sign-up, open to everyone, or cancelled in the alert colour); the first row carries the excerpt. With rewriting off the rows hold the calendar's own text whole, wrapping as it must.
 * The heading, the status words and the subscribe link are the design's own (the theme words now, signup, openToAll and subscribe).
 */
export function departures(host, occs, props, ics, ui) {
  const rewrite = ui.rewrite;
  const board = ui.el('div', rewrite ? 'urd-cal-dep' : 'urd-cal-dep urd-cal-dep-plain');
  const cols = ui.el('div', 'urd-cal-dep-cols');
  for (const [key, n] of DEP_COLS) cols.appendChild(cells(ui, n, ui.tx(key), 'urd-cal-dep-col'));
  // The column heads stand in the rows' grid, so without rewriting they share its columns.
  const rows = ui.el('div', 'urd-cal-dep-rows');
  rows.appendChild(cols);
  occs.forEach((occ, i) => {
    const d = dayOf(occ);
    const title = ui.field('span', 'title', cut(occ.title, DEP_COLS[2][1], rewrite));
    const row = ui.tint(ui.el('div', 'urd-cal-dep-row'), occ, title);
    const status = statusOf(occ, props, ui);
    row.append(
      cells(ui, DEP_COLS[0][1], ui.field('span', 'date', depDate(d, ui), null, d)),
      cells(ui, DEP_COLS[1][1], ui.field('span', 'time', depTime(occ, ui), null, occ)),
      cells(ui, DEP_COLS[2][1], title),
      cells(ui, DEP_COLS[3][1], occ.location ? ui.field('span', 'place', cut(occ.location, DEP_COLS[3][1], rewrite)) : null),
      cells(ui, DEP_COLS[4][1], status.node, status.tone),
    );
    rows.appendChild(row);
    // The first row carries its excerpt, with the link on.
    const text = i === 0 ? depExcerpt(occ, ui) : null;
    if (text) rows.appendChild(text);
  });
  board.append(depHead(ui), rows, depFoot(ui));
  host.appendChild(board);
}

/* ---------- The departure board on a phone: two phone designs of its own (CAL_PHONE_DESIGNS), neither scrolling sideways ---------- */

/** The compact board: each event as two rows of small flaps, the date, time and status on the first, the title on the second, the place as text under. */
export function depRows(host, occs, props, ics, ui) {
  const board = ui.el('div', `urd-cal-dep urd-cal-dep-compact${ui.rewrite ? '' : ' urd-cal-dep-plain'}`);
  const cols = ui.el('div', 'urd-cal-dep-cols');
  for (const [key, n] of [['colDate', 5], ['colTime', 5], ['colStatus', 6]]) cols.appendChild(cells(ui, n, ui.tx(key), 'urd-cal-dep-col urd-cal-dep-small'));
  const rows = ui.el('div', 'urd-cal-dep-rows');
  rows.appendChild(cols);
  occs.forEach((occ, i) => {
    const d = dayOf(occ);
    const title = ui.field('span', 'title', cut(occ.title, 20, ui.rewrite));
    const event = ui.tint(ui.el('article', 'urd-cal-dep-event'), occ, title);
    const status = statusOf(occ, props, ui);
    const row = ui.el('div', 'urd-cal-dep-row');
    row.append(cells(ui, 5, ui.field('span', 'date', depDate(d, ui), null, d), 'urd-cal-dep-small'), cells(ui, 5, ui.field('span', 'time', depTime(occ, ui), null, occ), 'urd-cal-dep-small'), cells(ui, 6, status.node, `urd-cal-dep-small ${status.tone}`));
    event.append(row, cells(ui, 20, title, 'urd-cal-dep-small'));
    if (occ.location) event.appendChild(ui.field('span', 'place', occ.location, 'urd-cal-dep-place'));
    const text = i === 0 ? depExcerpt(occ, ui) : null;
    if (text) event.appendChild(text);
    rows.appendChild(event);
  });
  board.append(depHead(ui), rows, depFoot(ui));
  host.appendChild(board);
}

/** The strip: one flap strip per event with the date, time and status, the title on the condensed face and the place as text under it. */
export function depStrip(host, occs, props, ics, ui) {
  const board = ui.el('div', `urd-cal-dep urd-cal-dep-strip${ui.rewrite ? '' : ' urd-cal-dep-plain'}`);
  const cols = ui.el('div', 'urd-cal-dep-cols');
  for (const [key, n] of [['colDate', 5], ['colTime', 5], ['colStatus', 6]]) cols.appendChild(cells(ui, n, ui.tx(key), 'urd-cal-dep-col'));
  const rows = ui.el('div', 'urd-cal-dep-rows');
  rows.appendChild(cols);
  occs.forEach((occ, i) => {
    const d = dayOf(occ);
    const title = ui.field('strong', 'title', occ.title, 'urd-cal-dep-name');
    const event = ui.tint(ui.el('article', 'urd-cal-dep-event'), occ, title);
    const status = statusOf(occ, props, ui);
    const row = ui.el('div', 'urd-cal-dep-row');
    row.append(cells(ui, 5, ui.field('span', 'date', depDate(d, ui), null, d)), cells(ui, 5, ui.field('span', 'time', depTime(occ, ui), null, occ)), cells(ui, 6, status.node, status.tone));
    event.append(row, title);
    if (occ.location) event.appendChild(ui.field('span', 'place', occ.location, 'urd-cal-dep-place'));
    const text = i === 0 ? depExcerpt(occ, ui) : null;
    if (text) event.appendChild(text);
    rows.appendChild(event);
  });
  board.append(depHead(ui), rows, depFoot(ui));
  host.appendChild(board);
}

/* ---------- The departure board's card dresses (`cards` in the design list) ---------- */

/** Words laid in lines of at most n letters, a word longer than a line cut across lines. */
function wrapWords(text, n) {
  const lines = [];
  let line = '';
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    let rest = word;
    while (rest.length > n) {
      if (line) lines.push(line);
      lines.push(rest.slice(0, n));
      rest = rest.slice(n);
      line = '';
    }
    if (!line) line = rest;
    else if (line.length + 1 + rest.length <= n) line += ` ${rest}`;
    else {
      lines.push(line);
      line = rest;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** The card's parts, each a decorator the block runs on the event's card after it is built (ui.dressCard), in the common words. */
export const cards = {
  /** The board row on top: the date, time and status as flaps over the date line, the facts labelled as the board's columns by the style sheet. */
  depHead(dialog, occ, ui, props) {
    const d = dayOf(occ);
    const status = statusOf(occ, props, ui);
    const row = ui.el('div', `urd-cal-dep-cardrow${ui.rewrite ? '' : ' urd-cal-dep-plain'}`);
    row.append(cells(ui, 5, ui.field('span', 'date', depDate(d, ui), null, d)), cells(ui, 5, ui.field('span', 'time', depTime(occ, ui), null, occ)), cells(ui, 6, status.node, status.tone));
    dialog.insertBefore(row, dialog.querySelector('.urd-cal-dialog-date'));
  },
  /** The title on the flaps, a line of seventeen at a time, and the status among the facts. */
  depTitle(dialog, occ, ui, props) {
    const title = dialog.querySelector('.urd-cal-dialog-title');
    if (title) {
      const lines = wrapWords(occ.title, 17);
      title.replaceChildren(...lines.map((line, i) => cells(ui, 17, document.createTextNode(i < lines.length - 1 ? `${line} ` : line))));
      title.classList.add('urd-cal-dep-cardtitle');
    }
    const facts = dialog.querySelector('.urd-cal-dialog-facts');
    const status = statusOf(occ, props, ui);
    if (facts && status.node) {
      const dt = ui.el('dt');
      dt.appendChild(ui.tx('colStatus'));
      const dd = ui.el('dd');
      dd.appendChild(cells(ui, 6, status.node, `urd-cal-dep-small ${status.tone}`));
      facts.append(dt, dd);
    }
  },
  /** The screen: the date in a band across the top, the status flaps beside the title, the actions as tiles by the style sheet. */
  depScreen(dialog, occ, ui, props) {
    const date = dialog.querySelector('.urd-cal-dialog-date');
    if (date) {
      const band = ui.el('div', 'urd-cal-dep-cardband');
      dialog.insertBefore(band, dialog.firstChild);
      band.appendChild(date);
    }
    const title = dialog.querySelector('.urd-cal-dialog-title');
    const status = statusOf(occ, props, ui);
    if (title && status.node) {
      const top = ui.el('div', 'urd-cal-dep-cardtop');
      title.replaceWith(top);
      top.append(title, cells(ui, 6, status.node, `urd-cal-dep-small ${status.tone}`));
    }
  },
};
