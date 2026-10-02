/**
 * The calendar block's designs: the pure model behind the Design picker and
 * the Style tab in the Properties panel, and the renderer's look-up. A
 * design is a look on top of a data view (list, cards, month, agenda or
 * next): it names the colour slots the owner can override, the static texts
 * the owner can rewrite in the preview, and whether its boxes carry an edge
 * stripe. The owner's choices are additive props on the block (`design`,
 * `colors`, `stripe`, `texts`, `fieldStyle`, `showSignup`); a block without
 * them renders the plain design on the theme's colours. The module is
 * bundled by the editor and loaded by the block on its first render (with
 * ics.js, outside the visitor closure), so it never touches the DOM and never
 * calls ta().
 */

/** The data views a design can stand on; `null` on a design means the block's own `view`. */
export const CAL_VIEWS = ['list', 'cards', 'month', 'agenda', 'next'];

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
};

/** The texts every design with chips, sign-up and subscribe buttons shows. */
const COMMON_TEXTS = ['all', 'signup', 'subscribe', 'subscribeMulti', 'addGoogle'];

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
 * subscribe buttons inside its own layout, so the block draws no row under it.
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
    view: 'list',
    module: 'list',
    stripe: false,
    slots: [slot('row'), slot('text'), slot('gold'), slot('line')],
    texts: COMMON_TEXTS,
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
    slots: [slot('accent'), slot('surface'), slot('line'), slot('posterA', 'posters'), slot('posterAText', 'posters'), slot('posterB', 'posters'), slot('posterBText', 'posters'), slot('posterC', 'posters'), slot('posterCText', 'posters')],
    texts: COMMON_TEXTS,
  },
  {
    id: 'tickets',
    labelKey: 'calendar.design.tickets',
    view: 'cards',
    module: 'cards',
    stripe: false,
    slots: [slot('accent'), slot('surface'), slot('line'), slot('stub', 'stub'), slot('stubText', 'stub')],
    texts: COMMON_TEXTS,
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
    view: 'cards',
    module: 'cards',
    stripe: false,
    slots: [slot('head'), slot('card'), slot('text'), slot('gold')],
    texts: COMMON_TEXTS,
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
];

/** The renderer modules a design can name (the block maps each to a literal import). */
export const CAL_MODULES = ['list', 'cards'];

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
