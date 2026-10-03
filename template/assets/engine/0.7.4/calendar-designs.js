/**
 * The calendar block's designs: the pure model behind the Design picker and
 * the Style tab in the Properties panel, and the renderer's look-up. A
 * design is a look on top of a data view (list, cards, month, agenda or
 * next): it names the colour slots the owner can override, the static texts
 * the owner can rewrite in the preview, and whether its boxes carry an edge
 * stripe. The owner's choices are additive props on the block (`design`,
 * `colors`, `stripe`, `texts`, `fieldStyle`, `showSignup`, `showMore`,
 * `programHref`, `showOpen`, `options`); a block without
 * them renders the plain design on the theme's colours. The module is
 * bundled by the editor and loaded by the block on its first render (with
 * ics.js, outside the visitor closure), so it never touches the DOM and never
 * calls ta().
 *
 * A design is five things, added together: an entry in CAL_DESIGNS below
 * (its view, the colour slots by section with the plain colours first, the
 * static texts, the stripe and the flags); a renderer exported under the
 * design's id from its blocks/calendar-<module>.js; a CSS block in base.css
 * under `.urd-cal-d-<id>` that reads every slot as `--urd-cal-s-<slot>` with
 * the design's own default; a drawing in calendar-thumb.js; and the label,
 * slot and section keys in the nb, en-GB and tr admin dictionaries.
 * tests/calendar-designs.test.mjs holds the five against each other.
 */

/** The data views a design can stand on; `null` on a design means the block's own `view`. */
export const CAL_VIEWS = ['list', 'cards', 'month', 'agenda', 'next', 'week', 'day', 'year'];

/** The event fields whose look the owner can set per block (the Style tab's field styles). */
export const CAL_FIELDS = ['title', 'date', 'time', 'place', 'description', 'category', 'number'];

/**
 * The static texts a design can show, with the site dictionary key each one
 * falls back to. The owner rewrites them by clicking them in the preview;
 * the block stores the HTML under the text's key in `props.texts`.
 */
export const CAL_TEXTS = {
  next: 'calendar.next',
  now: 'calendar.now',
  later: 'calendar.later',
  all: 'calendar.all',
  signup: 'calendar.signup',
  subscribe: 'calendar.subscribe',
  subscribeMulti: 'calendar.subscribeMulti',
  addGoogle: 'calendar.addGoogle',
  colDate: 'calendar.colDate',
  colTime: 'calendar.colTime',
  colEvent: 'calendar.colEvent',
  colPlace: 'calendar.colPlace',
  program: 'calendar.program',
  nextShort: 'calendar.nextShort',
  thisMonth: 'calendar.thisMonth',
  todayBtn: 'calendar.todayBtn',
  wheel: 'calendar.wheel',
  pickMonth: 'calendar.pickMonth',
  wholeYear: 'calendar.wholeYear',
  fewer: 'calendar.fewer',
  more: 'calendar.moreLegend',
  pickDay: 'calendar.pickDay',
  then: 'calendar.then',
  unitDays: 'calendar.unitDays',
  unitHours: 'calendar.unitHours',
  unitMin: 'calendar.unitMin',
  browse: 'calendar.browse',
  untilStart: 'calendar.untilStart',
  wholeProgram: 'calendar.wholeProgram',
  noticeLabel: 'calendar.noticeLabel',
  noticeTitle: 'calendar.noticeTitle',
  noticeText: 'calendar.noticeText',
  moreInfo: 'calendar.moreInfo',
  series: 'calendar.series',
  when: 'calendar.when',
  where: 'calendar.where',
  forWhom: 'calendar.forWhom',
  openAll: 'calendar.openAll',
  allDates: 'calendar.allDates',
  emptyKicker: 'calendar.emptyKicker',
  emptyTitle: 'calendar.emptyTitle',
  swUpcoming: 'calendar.swUpcoming',
  swWeek: 'calendar.swWeek',
  swMonth: 'calendar.swMonth',
  recurring: 'calendar.recurring',
  openToAll: 'calendar.openToAll',
};

/** The texts of the ApeironLF empty state (the designs with `empty: 'ap'`). */
const AP_EMPTY_TEXTS = ['emptyKicker', 'emptyTitle'];

/** The texts of the announcement note, for the designs that declare `notice`. */
const NOTICE_TEXTS = ['noticeLabel', 'noticeTitle', 'noticeText', 'moreInfo'];

/** The texts every design with chips, sign-up and subscribe buttons shows. */
const COMMON_TEXTS = ['all', 'signup', 'subscribe', 'subscribeMulti', 'addGoogle', 'swUpcoming', 'swWeek', 'swMonth'];

/** A colour slot: the label key is `calendar.slot.<key>`, the section groups the pickers in the panel. */
const slot = (key, section = 'colors') => ({ key, labelKey: `calendar.slot.${key}`, section });

/**
 * The designs, in the order the picker lists them. `view: null` follows the
 * block's own view (the plain design draws every view); a design with a
 * view of its own fixes it, and the editor writes that view into the block
 * so an engine without the design still draws the right data. `module`
 * names the renderer file the block loads for the design (blocks/calendar-<module>.js,
 * exporting a function under the design's id); the plain design's views
 * live in the block itself. `ownSubscribe` marks a design that places the
 * subscribe buttons inside its own layout, so the block draws no row under
 * it, `ownFilter` one that draws its own calendar switches instead of the
 * chip row, and `notice` one that can show the announcement note
 * (`props.notice { show, href, as }` with the texts noticeLabel, noticeTitle
 * and noticeText; `noticeBand` marks a design that can draw it as an alert
 * band instead, `as: 'band'`). `empty: 'ap'` gives the design ApeironLF's
 * empty state (a pill, a dashed box and the subscribe button) in place of
 * the plain one. `program` marks a design that draws a link to the whole
 * programme when the block has an address for it (`props.programHref`), and
 * `open` one that writes «Open to everyone» on an event without a sign-up
 * (`props.showOpen`).
 * @type {Array<{id: string, labelKey: string, view: string|null, module?: string, stripe: boolean,
 *   slots: Array<{key: string, labelKey: string, section: string}>, texts: string[]}>}
 */
export const CAL_DESIGNS = [
  {
    id: 'plain',
    labelKey: 'calendar.design.plain',
    view: null,
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('chip')],
    texts: ['next', 'now', 'later', ...COMMON_TEXTS],
  },
  {
    id: 'timeline',
    labelKey: 'calendar.design.timeline',
    view: 'list',
    module: 'list',
    stripe: false,
    slots: [slot('accent'), slot('dot'), slot('line'), slot('chip')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'table',
    labelKey: 'calendar.design.table',
    view: 'list',
    module: 'list',
    stripe: false,
    slots: [slot('accent'), slot('head'), slot('headText'), slot('zebra'), slot('line'), slot('chip')],
    texts: ['colDate', 'colTime', 'colEvent', 'colPlace', ...COMMON_TEXTS],
  },
  {
    id: 'booklet',
    labelKey: 'calendar.design.booklet',
    view: 'list',
    module: 'list',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('rule'), slot('chip')],
    texts: ['program', ...COMMON_TEXTS],
  },
  {
    id: 'numbered',
    labelKey: 'calendar.design.numbered',
    view: 'list',
    module: 'list',
    stripe: false,
    slots: [slot('accent'), slot('number'), slot('line'), slot('chip')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'apList',
    labelKey: 'calendar.design.apList',
    empty: 'ap',
    view: 'list',
    module: 'list',
    stripe: false,
    slots: [slot('row'), slot('text'), slot('gold'), slot('line'), slot('rec')],
    texts: ['recurring', ...AP_EMPTY_TEXTS, ...COMMON_TEXTS],
  },
  {
    id: 'glass',
    labelKey: 'calendar.design.glass',
    view: 'list',
    module: 'list',
    stripe: false,
    slots: [slot('ground'), slot('text'), slot('glass', 'glass'), slot('glassLine', 'glass'), slot('chip', 'glass'), slot('blobA', 'blobs'), slot('blobB', 'blobs'), slot('blobC', 'blobs')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'posters',
    labelKey: 'calendar.design.posters',
    view: 'cards',
    module: 'cards',
    stripe: false,
    program: true,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('posterA', 'posters'), slot('posterAText', 'posters'), slot('posterB', 'posters'), slot('posterBText', 'posters'), slot('posterC', 'posters'), slot('posterCText', 'posters')],
    texts: ['wholeProgram', ...COMMON_TEXTS],
  },
  {
    id: 'tickets',
    labelKey: 'calendar.design.tickets',
    view: 'cards',
    module: 'cards',
    stripe: false,
    program: true,
    open: true,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('stub', 'stub'), slot('stubText', 'stub')],
    texts: ['wholeProgram', 'openToAll', ...COMMON_TEXTS],
  },
  {
    id: 'carousel',
    labelKey: 'calendar.design.carousel',
    view: 'cards',
    module: 'cards',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('chip'), slot('card', 'first'), slot('cardText', 'first')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'photo',
    labelKey: 'calendar.design.photo',
    view: 'cards',
    module: 'cards',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('placeholder'), slot('badge', 'onPicture'), slot('badgeText', 'onPicture'), slot('chip', 'onPicture')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'apGrid',
    labelKey: 'calendar.design.apGrid',
    empty: 'ap',
    view: 'cards',
    module: 'cards',
    stripe: false,
    slots: [slot('head'), slot('card'), slot('text'), slot('gold'), slot('rec')],
    texts: ['recurring', ...AP_EMPTY_TEXTS, ...COMMON_TEXTS],
  },
  {
    id: 'bento',
    labelKey: 'calendar.design.bento',
    view: 'cards',
    module: 'cards',
    stripe: false,
    ownSubscribe: true,
    slots: [slot('accent'), slot('soft'), slot('tile'), slot('line'), slot('hero', 'hero'), slot('heroText', 'hero')],
    texts: ['nextShort', 'thisMonth', ...COMMON_TEXTS],
  },
  {
    id: 'weekStrip',
    labelKey: 'calendar.design.weekStrip',
    view: 'week',
    module: 'time',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('todayBg'), slot('pill'), slot('pillText')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'weekPlan',
    labelKey: 'calendar.design.weekPlan',
    view: 'week',
    module: 'time',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('todayBg'), slot('event')],
    texts: ['todayBtn', ...COMMON_TEXTS],
  },
  {
    id: 'layers',
    labelKey: 'calendar.design.layers',
    view: 'week',
    module: 'time',
    stripe: false,
    ownFilter: true,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('todayBg')],
    texts: ['subscribe', 'subscribeMulti', 'addGoogle', 'signup'],
  },
  {
    id: 'sidepanel',
    labelKey: 'calendar.design.sidepanel',
    view: 'month',
    module: 'time',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('panel'), slot('line'), slot('todayBg'), slot('selected'), slot('chip')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'apMonth',
    labelKey: 'calendar.design.apMonth',
    empty: 'ap',
    view: 'month',
    module: 'time',
    stripe: false,
    slots: [slot('card'), slot('text'), slot('gold'), slot('goldDark'), slot('grid'), slot('pill')],
    texts: [...AP_EMPTY_TEXTS, ...COMMON_TEXTS],
  },
  {
    id: 'dayPlan',
    labelKey: 'calendar.design.dayPlan',
    view: 'day',
    module: 'time',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('past'), slot('event')],
    texts: ['todayBtn', ...COMMON_TEXTS],
  },
  {
    id: 'yearWheel',
    labelKey: 'calendar.design.yearWheel',
    view: 'year',
    module: 'time',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('ring', 'wheel'), slot('past', 'wheel'), slot('dot', 'wheel'), slot('dotOff', 'wheel')],
    texts: ['wheel', 'pickMonth', ...COMMON_TEXTS],
  },
  {
    id: 'heatmap',
    labelKey: 'calendar.design.heatmap',
    view: 'year',
    module: 'time',
    stripe: false,
    slots: [slot('surface'), slot('panel'), slot('line'), slot('cell0', 'scale'), slot('cell1', 'scale'), slot('cell2', 'scale'), slot('cell3', 'scale'), slot('today', 'scale')],
    texts: ['wholeYear', 'fewer', 'more', 'pickDay', ...COMMON_TEXTS],
  },
  {
    id: 'billboard',
    labelKey: 'calendar.design.billboard',
    view: 'next',
    module: 'next',
    stripe: false,
    ownSubscribe: true,
    program: true,
    slots: [slot('bg'), slot('text'), slot('label'), slot('pulse'), slot('tile', 'countdown'), slot('tileText', 'countdown'), slot('button', 'buttons'), slot('buttonText', 'buttons')],
    texts: ['now', 'then', 'unitDays', 'unitHours', 'unitMin', 'wholeProgram', ...COMMON_TEXTS],
  },
  {
    id: 'stacked',
    labelKey: 'calendar.design.stacked',
    view: 'next',
    module: 'next',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('card', 'cards'), slot('cardText', 'cards'), slot('cardMid', 'cards'), slot('cardBack', 'cards'), slot('badge', 'cards'), slot('badgeText', 'cards')],
    texts: ['now', 'browse', ...COMMON_TEXTS],
  },
  {
    id: 'noticeboard',
    labelKey: 'calendar.design.noticeboard',
    view: 'next',
    module: 'next',
    stripe: false,
    notice: true,
    slots: [slot('board'), slot('boardText'), slot('note', 'notes'), slot('noteText', 'notes'), slot('noteLabel', 'notes'), slot('noteAlt', 'notes'), slot('noteAltText', 'notes'), slot('pin', 'notes'), slot('pinAlt', 'notes'), slot('button', 'buttons'), slot('buttonText', 'buttons'), slot('strip', 'later'), slot('stripText', 'later')],
    texts: ['now', 'next', 'later', ...NOTICE_TEXTS, ...COMMON_TEXTS],
  },
  {
    id: 'split',
    labelKey: 'calendar.design.split',
    view: 'next',
    module: 'next',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('chip'), slot('panel', 'panel'), slot('panelText', 'panel'), slot('button', 'buttons'), slot('buttonText', 'buttons'), slot('laterBg', 'later')],
    texts: ['now', 'later', ...COMMON_TEXTS],
  },
  {
    id: 'band',
    labelKey: 'calendar.design.band',
    view: 'next',
    module: 'next',
    stripe: false,
    slots: [slot('band', 'band'), slot('bandText', 'band'), slot('dot', 'band'), slot('tag', 'band'), slot('tagText', 'band')],
    texts: ['now', ...COMMON_TEXTS],
  },
  {
    id: 'oneLine',
    labelKey: 'calendar.design.oneLine',
    view: 'next',
    module: 'next',
    stripe: true,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('ring'), slot('button', 'buttons'), slot('buttonText', 'buttons')],
    texts: ['now', 'later', ...COMMON_TEXTS],
  },
  {
    id: 'ring',
    labelKey: 'calendar.design.ring',
    view: 'next',
    module: 'next',
    stripe: false,
    slots: [slot('surface'), slot('line'), slot('chip'), slot('accent', 'ring'), slot('track', 'ring')],
    texts: ['now', 'unitDays', 'unitHours', ...COMMON_TEXTS],
  },
  {
    id: 'darkGlass',
    labelKey: 'calendar.design.darkGlass',
    view: 'next',
    module: 'next',
    stripe: false,
    ownSubscribe: true,
    slots: [slot('ground'), slot('text'), slot('label'), slot('edge', 'glass'), slot('glass', 'glass'), slot('track', 'glass'), slot('blobA', 'blobs'), slot('blobB', 'blobs'), slot('button', 'buttons'), slot('buttonText', 'buttons')],
    texts: ['now', 'then', 'untilStart', ...COMMON_TEXTS],
  },
  {
    id: 'nextBento',
    labelKey: 'calendar.design.nextBento',
    view: 'next',
    module: 'next',
    stripe: false,
    ownSubscribe: true,
    program: true,
    slots: [slot('accent'), slot('accentText'), slot('soft'), slot('tile'), slot('line')],
    texts: ['now', 'wholeProgram', ...COMMON_TEXTS],
  },
  {
    id: 'apNow',
    labelKey: 'calendar.design.apNow',
    view: 'next',
    module: 'more',
    stripe: false,
    notice: true,
    noticeBand: true,
    empty: 'ap',
    slots: [slot('head'), slot('card'), slot('panel'), slot('text'), slot('gold'), slot('goldDark'), slot('alert', 'alert'), slot('alertText', 'alert')],
    texts: ['now', 'next', 'later', ...NOTICE_TEXTS, ...AP_EMPTY_TEXTS, ...COMMON_TEXTS],
  },
  {
    id: 'apNavy',
    labelKey: 'calendar.design.apNavy',
    view: 'next',
    module: 'more',
    stripe: false,
    empty: 'ap',
    slots: [slot('ground'), slot('text'), slot('tile'), slot('line'), slot('gold'), slot('goldDark'), slot('card', 'first'), slot('cardText', 'first')],
    texts: ['now', 'later', 'moreInfo', ...AP_EMPTY_TEXTS, ...COMMON_TEXTS],
  },
  {
    id: 'apSeries',
    labelKey: 'calendar.design.apSeries',
    view: 'list',
    module: 'more',
    stripe: false,
    notice: true,
    empty: 'ap',
    slots: [slot('card'), slot('row'), slot('text'), slot('title'), slot('gold'), slot('goldDark'), slot('line')],
    texts: ['series', 'when', 'where', 'forWhom', 'openAll', 'allDates', ...NOTICE_TEXTS, ...AP_EMPTY_TEXTS, ...COMMON_TEXTS],
  },
  {
    id: 'mobileAgenda',
    labelKey: 'calendar.design.mobileAgenda',
    view: 'agenda',
    module: 'more',
    stripe: true,
    ownFilter: true,
    slots: [slot('ground'), slot('text'), slot('card'), slot('edge'), slot('accent'), slot('chip')],
    texts: ['todayBtn', ...COMMON_TEXTS],
  },
];

/**
 * The settings that belong to one design each, stored together under the
 * block's `options`. A `choice` holds one of its values, a `switch` true or
 * false, an `hour` a whole hour from 0 to 24 or nothing (the design then
 * finds the span itself). `def` is what a block without the option draws,
 * which is what the design drew before the option existed. The label key is
 * `calendar.opt.<key>`, a choice's values `calendar.opt.<key>.<value>`.
 */
const choice = (key, values, def) => ({ key, kind: 'choice', values, def, labelKey: `calendar.opt.${key}` });
const toggle = (key, def) => ({ key, kind: 'switch', def, labelKey: `calendar.opt.${key}` });
const hour = (key) => ({ key, kind: 'hour', def: null, labelKey: `calendar.opt.${key}` });
const MONTHS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

export const CAL_OPTIONS = {
  sidepanel: [choice('panelSide', ['right', 'left', 'under'], 'right')],
  weekPlan: [hour('hourFrom'), hour('hourTo'), toggle('weekend', false)],
  dayPlan: [hour('hourFrom'), hour('hourTo'), toggle('weekend', false)],
  table: [toggle('colTime', true), toggle('colPlace', true), toggle('zebra', true)],
  posters: [choice('columns', ['auto', '2', '3', '4'], 'auto')],
  photo: [choice('columns', ['auto', '2', '3', '4'], 'auto')],
  yearWheel: [choice('firstMonth', MONTHS, '0')],
  numbered: [toggle('pad', true)],
  booklet: [toggle('description', true)],
  split: [toggle('description', true)],
  band: [toggle('roll', true)],
};

/** The option definitions of a design; an empty list for a design without settings of its own. */
export function calOptionDefs(designId) {
  return CAL_OPTIONS[calDesign(designId).id] ?? [];
}

/**
 * The design's options as the block draws them: every option of the design
 * with the owner's value when it is valid, else the default. Options that
 * belong to another design are left out.
 * @returns {Record<string, string|boolean|number|null>}
 */
export function calOptions(props) {
  const stored = props?.options ?? {};
  const out = {};
  for (const def of calOptionDefs(props?.design)) {
    const value = stored[def.key];
    if (def.kind === 'choice') out[def.key] = def.values.includes(value) ? value : def.def;
    else if (def.kind === 'switch') out[def.key] = typeof value === 'boolean' ? value : def.def;
    else out[def.key] = Number.isInteger(value) && value >= 0 && value <= 24 ? value : null;
  }
  return out;
}

/** The renderer modules a design can name (the block maps each to a literal import). */
export const CAL_MODULES = ['list', 'cards', 'time', 'next', 'more'];

/** The design for an id; the plain one for anything unknown. */
export function calDesign(id) {
  return CAL_DESIGNS.find((d) => d.id === id) ?? CAL_DESIGNS[0];
}

/** The data view a block draws: the design's own, else the block's `view`, else the list. */
export function calView(props) {
  const own = calDesign(props?.design).view;
  if (own) return own;
  return CAL_VIEWS.includes(props?.view) ? props.view : 'list';
}

/** The views that can carry the in-block view switcher: the ones that list what is coming. */
export const CAL_SWITCH_VIEWS = ['list', 'cards', 'agenda', 'next'];

/**
 * True when the block shows the view switcher: the owner has switched it on
 * (`switcher: true`) and the block's view is one that lists what is coming.
 * The switcher lets a visitor turn the block to the week or the month and
 * back, without changing what is stored.
 */
export function calSwitcher(props) {
  return props?.switcher === true && CAL_SWITCH_VIEWS.includes(calView(props));
}

/**
 * True when the block folds the events beyond its max count under «Show all»:
 * a list view (the plain list and the list designs) with the fold left on
 * (`showMore`, on unless switched off). The regular-event design lists one
 * event's dates and folds them itself.
 */
export function calFolds(props) {
  return props?.showMore !== false && calView(props) === 'list' && calDesign(props?.design).module !== 'more';
}

const SAFE_HREF = /^(?:https?:\/\/|\/(?!\/)|#|mailto:)/i;

/**
 * The address of the whole programme, for a design that links to it
 * (`program`): a page of the site, an anchor or a full address. Null when the
 * block has none, the design draws no such link, or the value is not an address.
 */
export function calProgramHref(props) {
  if (!calDesign(props?.design).program) return null;
  const href = typeof props?.programHref === 'string' ? props.programHref.trim() : '';
  return SAFE_HREF.test(href) ? href : null;
}

/** The picker's groups: the designs by the view they stand on, the plain one first and alone. */
export function calDesignGroups() {
  const groups = [{ view: null, designs: CAL_DESIGNS.filter((d) => d.view === null) }];
  for (const view of CAL_VIEWS) {
    const designs = CAL_DESIGNS.filter((d) => d.view === view);
    if (designs.length) groups.push({ view, designs });
  }
  return groups;
}

const SAFE_HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const SAFE_TOKEN = /^[a-z][a-z0-9-]*$/;

/** A colour as CSS: a hex value as it is, a theme token as its variable, anything else null. */
export function calColorCss(value) {
  if (typeof value !== 'string') return null;
  if (SAFE_HEX.test(value)) return value;
  if (SAFE_TOKEN.test(value)) return `var(--urd-color-${value})`;
  return null;
}

/**
 * The CSS variables for the owner's colour overrides: `--urd-cal-s-<slot>`
 * for every slot of the design that holds a valid colour. The base style
 * reads each slot with the theme's colour as the fallback, so an unset slot
 * follows the theme.
 * @returns {Record<string, string>}
 */
export function calSlotVars(design, colors) {
  const out = {};
  for (const { key } of design.slots) {
    const css = calColorCss(colors?.[key]);
    if (css) out[`--urd-cal-s-${key}`] = css;
  }
  return out;
}

/**
 * The edge stripe on the design's boxes: on or off (the owner's choice, else
 * the design's own), and the stripe's colour as CSS when the owner set one.
 * Without a colour the stripe takes the event's calendar colour, else the accent.
 * @returns {{show: boolean, color: string|null}}
 */
export function calStripe(design, stripe) {
  const show = typeof stripe?.show === 'boolean' ? stripe.show : design.stripe;
  return { show, color: show ? calColorCss(stripe?.color) : null };
}

/** The bounds for a field's size in px, the same as the text toolbar's (text-typo.js). */
export const CAL_SIZE = { min: 8, max: 120 };
const SAFE_FAMILY = /^[\w\s,'"-]{1,80}$/;

/**
 * Inline style for one event field from the owner's settings: font (a stack
 * from the font list or a plain family name), size in px, bold, italic,
 * underline and colour. Only the set and valid parts are written, so the
 * design's own styling stays for the rest.
 * @param {{font?: string, size?: number, bold?: boolean, italic?: boolean, underline?: boolean, color?: string}|undefined} style
 * @returns {Record<string, string>} camelCase style properties
 */
export function calFieldCss(style) {
  const s = style ?? {};
  const css = {};
  if (typeof s.font === 'string' && SAFE_FAMILY.test(s.font)) css.fontFamily = s.font;
  const size = Math.round(Number(s.size));
  if (Number.isFinite(size) && size >= CAL_SIZE.min && size <= CAL_SIZE.max) css.fontSize = `${size}px`;
  if (s.bold === true) css.fontWeight = '700';
  else if (s.bold === false) css.fontWeight = '400';
  if (s.italic === true) css.fontStyle = 'italic';
  if (s.underline === true) css.textDecoration = 'underline';
  const color = calColorCss(s.color);
  if (color) css.color = color;
  return css;
}

/** The owner's HTML for a static text, or null when the design's default words apply. */
export function calTextHtml(texts, key) {
  const html = texts?.[key];
  return typeof html === 'string' && html.trim() ? html : null;
}

/** True when the owner has rewritten at least one of the design's texts. */
export function calHasTextOverrides(design, texts) {
  return design.texts.some((key) => calTextHtml(texts, key) !== null);
}
