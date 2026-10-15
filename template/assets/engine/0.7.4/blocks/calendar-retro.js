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
