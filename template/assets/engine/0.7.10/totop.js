/**
 * The site's «Back to top» button (0.7.13.14): an element of the site, set in the Site panel's «Back to top» button fold and stored in `site.layout.toTop`, with nothing stored for the standard, so a site that sets nothing shows the round button it always had.
 * The settings are read by toTopOf, the shaped designs' outline is drawn by toTopShape (pure, node-tested), and renderToTop draws or updates the one button the page has (urd.js, at the start and as the editor sends the site).
 * The button scrolls to the page's top, smoothly only where motion is welcome; it shows after the scrolling the owner chose, and its look is set by classes and custom properties that base.css reads (.urd-totop).
 */
import { t } from './i18n.js';
import { resolveColor } from './theme.js';

/** The designs, the first the standard: a circle, a rounded square, a pill with words, a ring and the words alone. */
export const TOTOP_DESIGNS = ['circle', 'square', 'pill', 'ring', 'words'];

/** The designs drawn in a shape, whose edge the shape editor's waves act on. */
export const TOTOP_SHAPED = ['circle', 'square', 'ring'];

/** The designs that show words, which may be the owner's own. */
export const TOTOP_WORDED = ['pill', 'words'];

/** The sizes, the first the standard, as the button's height in px; the phone takes its own or the desktop's. */
export const TOTOP_SIZES = { m: 44, l: 56, xl: 68, xxl: 84 };

/** How the words alone answer the mouse, as the menu's links do (nav.style.hover), the first the standard: the colour, an underline, a pill, a lift, or a lift with a glow. */
export const TOTOP_HOVERS = ['standard', 'underline', 'pill', 'liftPlain', 'lift'];

/** How the words alone answer a touch on a phone, as the menu's links do (nav.style.mobile.press); none is the standard. */
export const TOTOP_PRESSES = ['tint', 'underline', 'shrink'];

/** The line under the words alone, the second the standard. */
export const TOTOP_LINES = ['none', 'solid', 'dashed', 'dotted', 'double'];

/** The line's thickness in px. */
export const TOTOP_LINE_WIDTH = { min: 1, max: 4, step: 1, standard: 1 };

/** The colours the owner can set, each where the design shows it: the background, the ring, the arrow, the words, the line, and the hover's or the touch's effect. */
export const TOTOP_COLOURS = ['bg', 'ring', 'arrow', 'words', 'line', 'effect'];

/** How far the page is scrolled before the button shows: a little (400 px), one screen, or always. */
export const TOTOP_AFTER = ['little', 'screen', 'always'];

/** The waves slider (0 for a smooth edge) and how many waves the edge has. */
export const TOTOP_WAVES = { min: 0, max: 100, step: 1 };
export const TOTOP_COUNT = { min: 4, max: 16, step: 1, standard: 10 };

/** The longest words the button takes. */
export const TOTOP_TEXT_MAX = 40;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const colourOf = (value) => (typeof value === 'string' && value.trim() ? value.trim() : null);

/**
 * The button's settings as they apply, each read from `site.layout.toTop` or its standard.
 * @param {object|null|undefined} site site.json
 * @returns {{show: boolean, design: string, place: 'corner'|'content', side: 'left'|'right', size: string, phoneSize: string|null, colors: Record<string, string|null>, after: string, phone: boolean, text: string, waves: number, count: number, hover: string, press: string|null, line: string, lineWidth: number}}
 */
export function toTopOf(site) {
  const raw = site?.layout?.toTop && typeof site.layout.toTop === 'object' ? site.layout.toTop : {};
  const waves = Number(raw.waves);
  // An emptied amount reads as the standard, not as the fewest waves.
  const count = raw.count == null || raw.count === '' ? NaN : Math.round(Number(raw.count));
  const lineWidth = Math.round(Number(raw.lineWidth));
  return {
    show: raw.show !== false,
    design: TOTOP_DESIGNS.includes(raw.design) ? raw.design : TOTOP_DESIGNS[0],
    place: raw.place === 'content' ? 'content' : 'corner',
    side: raw.side === 'left' ? 'left' : 'right',
    size: Object.hasOwn(TOTOP_SIZES, raw.size) ? raw.size : 'm',
    phoneSize: Object.hasOwn(TOTOP_SIZES, raw.phoneSize) ? raw.phoneSize : null,
    colors: Object.fromEntries(TOTOP_COLOURS.map((key) => [key, colourOf(raw.colors?.[key])])),
    after: TOTOP_AFTER.includes(raw.after) ? raw.after : TOTOP_AFTER[0],
    phone: raw.phone !== false,
    text: typeof raw.text === 'string' ? raw.text.trim().slice(0, TOTOP_TEXT_MAX) : '',
    waves: Number.isFinite(waves) ? clamp(Math.round(waves), TOTOP_WAVES.min, TOTOP_WAVES.max) : 0,
    count: Number.isFinite(count) ? clamp(count, TOTOP_COUNT.min, TOTOP_COUNT.max) : TOTOP_COUNT.standard,
    hover: TOTOP_HOVERS.includes(raw.hover) ? raw.hover : TOTOP_HOVERS[0],
    press: TOTOP_PRESSES.includes(raw.press) ? raw.press : null,
    line: TOTOP_LINES.includes(raw.line) ? raw.line : 'solid',
    lineWidth: Number.isFinite(lineWidth) ? clamp(lineWidth, TOTOP_LINE_WIDTH.min, TOTOP_LINE_WIDTH.max) : TOTOP_LINE_WIDTH.standard,
  };
}

/**
 * The outline of a shaped design in a 100 by 100 box, as an SVG path: a circle or a rounded square, its edge turned into waves by `waves` (0 to 100).
 * The waves grow deeper as the slider is dragged, and their crests narrow from round swells to points, so the far end of the slider draws a star; `count` waves stand round the edge, one crest pointing up.
 * The circle and the square fill the box, as the round button always has; the ring stands a little inside it, so its line is drawn whole. A smooth edge is drawn exactly (arcs for the circle, a rounded rectangle for the square).
 * @param {string} design 'circle', 'square' or 'ring'
 * @param {number} [waves]
 * @param {number} [count]
 * @returns {string}
 */
export function toTopShape(design, waves = 0, count = TOTOP_COUNT.standard) {
  const square = design === 'square';
  const share = clamp(Number(waves) || 0, TOTOP_WAVES.min, TOTOP_WAVES.max) / TOTOP_WAVES.max;
  const n = clamp(Math.round(Number(count) || TOTOP_COUNT.standard), TOTOP_COUNT.min, TOTOP_COUNT.max);
  const R = design === 'ring' ? 46 : 50;
  if (share === 0) {
    if (square) return 'M 24 0 H 76 A 24 24 0 0 1 100 24 V 76 A 24 24 0 0 1 76 100 H 24 A 24 24 0 0 1 0 76 V 24 A 24 24 0 0 1 24 0 Z';
    return `M 50 ${50 - R} A ${R} ${R} 0 1 1 50 ${50 + R} A ${R} ${R} 0 1 1 50 ${50 - R} Z`;
  }
  // The depth of the waves, and how narrow their crests are: a crest's share of the edge falls as the slider goes on.
  const depth = 0.34 * share ** 0.8;
  const sharp = 1 + 7 * share * share;
  const steps = 48 * n;
  const points = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const base = square ? 1 / (Math.abs(Math.cos(a)) ** 4 + Math.abs(Math.sin(a)) ** 4) ** 0.25 : 1;
    const crest = ((1 + Math.cos(n * a)) / 2) ** sharp;
    const r = R * base * (1 - depth * (1 - crest));
    // A crest at the top: the angle is measured from straight up.
    const x = 50 + r * Math.sin(a);
    const y = 50 - r * Math.cos(a);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M ${points.join(' L ')} Z`;
}

/** The arrow the button shows in place of an icon of its own. */
const ARROW = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';

/** The one button the page has, and what stops its scroll listener when the page is drawn anew without it. */
let button = null;
let listening = null;

/**
 * Draws the page's «Back to top» button, or updates the one standing, as `site.layout.toTop` sets it; none where it is turned off.
 * @param {object} site site.json
 * @param {HTMLElement} [host] Where the button stands (the page's body)
 */
export function renderToTop(site, host = document.body) {
  const set = toTopOf(site);
  if (!set.show) {
    button?.remove();
    button = null;
    listening?.abort();
    listening = null;
    return;
  }
  if (!button || !button.isConnected) {
    button = document.createElement('button');
    button.type = 'button';
    button.addEventListener('click', () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    host.appendChild(button);
  }
  const shaped = TOTOP_SHAPED.includes(set.design);
  const worded = TOTOP_WORDED.includes(set.design);
  // The words alone answer the mouse and a touch as the menu's links do, and stand on a line of their own.
  const words = set.design === 'words';
  button.className = [
    'urd-totop', `urd-totop-${set.design}`,
    set.side === 'left' ? 'urd-totop-left' : '',
    set.place === 'content' ? 'urd-totop-content' : '',
    set.phone ? '' : 'urd-totop-nophone',
    words ? `urd-totop-hover-${set.hover}` : '',
    words && set.press ? `urd-totop-press-${set.press}` : '',
    words ? `urd-totop-line-${set.line}` : '',
  ].filter(Boolean).join(' ');
  button.style.setProperty('--urd-totop-h', `${TOTOP_SIZES[set.size]}px`);
  if (set.phoneSize) button.style.setProperty('--urd-totop-h-phone', `${TOTOP_SIZES[set.phoneSize]}px`);
  else button.style.removeProperty('--urd-totop-h-phone');
  button.style.setProperty('--urd-totop-line-w', `${set.lineWidth}px`);
  for (const key of TOTOP_COLOURS) {
    if (set.colors[key]) button.style.setProperty(`--urd-totop-${key}`, resolveColor(set.colors[key]));
    else button.style.removeProperty(`--urd-totop-${key}`);
  }
  // The words a visitor reads are the button's name, so a screen reader says what the eye sees; a button of no words is named in full.
  const shownWords = set.text || t('nav.toTop');
  if (worded) {
    button.removeAttribute('aria-label');
    button.removeAttribute('title');
  } else {
    button.setAttribute('aria-label', t('nav.toTopFull'));
    button.title = t('nav.toTop');
  }
  const shape = shaped ? `<svg class="urd-totop-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="${toTopShape(set.design, set.waves, set.count)}"/></svg>` : '';
  // The arrow and the words stand in a label of their own, which the line under the words alone runs along, whatever the hover does to the button.
  button.innerHTML = `${shape}<span class="urd-totop-label"><span class="urd-totop-mark">${ARROW}</span></span>`;
  if (worded) {
    const span = document.createElement('span');
    span.className = 'urd-totop-text';
    span.textContent = shownWords;
    button.querySelector('.urd-totop-label').appendChild(span);
  }
  // Shown after the scrolling chosen: a little, one screen, or at once.
  listening?.abort();
  listening = new AbortController();
  const shown = () => {
    const past = set.after === 'always' ? -1 : set.after === 'screen' ? window.innerHeight : 400;
    button?.classList.toggle('visible', window.scrollY > past);
  };
  window.addEventListener('scroll', shown, { passive: true, signal: listening.signal });
  window.addEventListener('resize', shown, { passive: true, signal: listening.signal });
  shown();
}
