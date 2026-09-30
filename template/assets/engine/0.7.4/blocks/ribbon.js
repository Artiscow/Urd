/**
 * Core block: ribbon. A band of words that rolls across the page, the frieze
 * every builder has and none of them needs a library for. The band is up to
 * three stripes: a thin one above, the main one, and a thin one below. Each
 * stripe holds the words, the separator mark over and over, or nothing but
 * colour, so a plain rule above a rolling line is one block rather than three.
 *
 * The motion is the background loop layer's idiom (.urd-bg-loop-runner in
 * base.css): a stripe's track is built TWICE inside a clipping row and
 * translated by half its width, so one period lands exactly where the previous
 * one started and the loop has no seam. The copy is aria-hidden, so the words
 * are read once. For `roll` and `sway` the duration is the measured width of
 * one copy divided by the speed (ribbonDuration); for `step` it is the item
 * count times the dwell (ribbonStepDuration), since a ticker is timed per word
 * and not per pixel. A ResizeObserver measures again when the width changes.
 *
 * ADR-0011 gating: under prefers-reduced-motion the words stand as a static
 * row, and while the editing chrome is on the band stands still so the words
 * can be read and edited. The panel's «Play the motion» (urd-demo-motion) and
 * Clean view both show the real thing.
 */
import { growSectionTo } from '../render.js';
import {
  ribbonItems, ribbonDuration, ribbonStepDuration, separatorMark, clampTilt, ribbonSize,
  ribbonMotion, ribbonWidth, ribbonMoves, mainMode, stripeMode, stripePlace, clampThickness,
} from '../ribbon-model.js';
import { resolveColor } from '../theme.js';
// ta/adminLocaleReady: only called in preview (after the admin dictionary is loaded), never at module level.
import { ta, adminLocaleReady } from '../i18n.js';

const post = (msg) => window.parent?.postMessage(msg, location.origin);
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** How many marks a mark stripe carries before the track is copied. */
const MARK_RUN = 16;

/** The drawn separators, on the same 24x24 grid as the icon library. */
const MARKS = {
  dot: '<circle cx="12" cy="12" r="3"/>',
  dash: '<rect x="3" y="10.6" width="18" height="2.8" rx="1.4"/>',
  slash: '<path d="M15.5 3.5L8.5 20.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/>',
  star: '<path d="M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z"/>',
};

const markSvg = (id) =>
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">${MARKS[id] ?? MARKS.dot}</svg>`;

/** A separator node, drawn or written. */
function sepNode(sep) {
  const mark = document.createElement('span');
  mark.className = 'urd-ribbon-sep';
  mark.setAttribute('aria-hidden', 'true');
  if (sep.kind === 'draw') mark.innerHTML = markSvg(sep.value);
  else mark.textContent = sep.value;
  return mark;
}

/**
 * One copy of a stripe's content. The separator sits after every item, so the
 * last one meets the first across the seam with the same spacing.
 * @param {string} mode text or marks
 * @param {Array<string>} items
 * @param {{kind: string, value: string}} sep
 * @param {boolean} editable Only the main stripe's first copy is typed in
 * @returns {HTMLDivElement}
 */
function buildRun(mode, items, sep, editable) {
  const run = document.createElement('div');
  run.className = 'urd-ribbon-run';
  if (mode === 'marks') {
    // A mark stripe is the separator over and over: a rule with rhythm.
    const mark = sep.kind === 'none' ? { kind: 'draw', value: 'dot' } : sep;
    for (let i = 0; i < MARK_RUN; i += 1) run.appendChild(sepNode(mark));
    return run;
  }
  items.forEach((text, index) => {
    const word = document.createElement('span');
    word.className = 'urd-ribbon-item';
    word.textContent = text;
    if (editable) word.dataset.ribbonIndex = String(index);
    run.appendChild(word);
    if (sep.kind !== 'none') run.appendChild(sepNode(sep));
  });
  return run;
}

/**
 * One stripe: a clipping row with a track that holds its content twice. A
 * `plain` stripe is colour alone and has no track to measure or move.
 * @returns {{el: HTMLElement, measure: () => void, run: HTMLElement|null}}
 */
function buildStripe({ mode, items, sep, motion, still, props, editable, count, colour }) {
  const el = document.createElement('div');
  el.className = `urd-ribbon-stripe urd-ribbon-motion-${motion}`;
  // One colour serves both kinds of stripe: a plain one paints its surface
  // with currentColor, and a stripe with content inks its words and marks.
  if (colour) el.style.color = resolveColor(colour);
  if (props.fade !== false && motion !== 'none') el.classList.add('urd-ribbon-fade');
  if (props.pauseOnHover !== false && motion !== 'none') el.classList.add('urd-ribbon-pausable');
  if (still) el.classList.add('urd-ribbon-still');
  if (mode === 'plain') {
    el.classList.add('urd-ribbon-solid');
    return { el, measure: () => {}, run: null };
  }

  const track = document.createElement('div');
  track.className = 'urd-ribbon-track';
  if (props.direction === 'right') track.classList.add('urd-ribbon-right');
  const run = buildRun(mode, items, sep, editable);
  track.appendChild(run);
  if (motion !== 'none') {
    const copy = buildRun(mode, items, sep, false);
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  }
  // The ticker jumps once per item, so each one stands still to be read.
  if (motion === 'step') track.style.animationTimingFunction = `steps(${Math.max(1, count)})`;
  el.appendChild(track);

  const measure = () => {
    if (motion === 'none') return;
    if (motion !== 'step' && !run.scrollWidth) return;
    const seconds = motion === 'step'
      ? ribbonStepDuration(count, props.dwell)
      : ribbonDuration(run.scrollWidth, props.speed);
    track.style.setProperty('--urd-ribbon-ms', `${seconds * 1000}ms`);
  };
  return { el, measure, run };
}

export const ribbonBlock = {
  version: 1,
  autoGrow: true,
  label: 'Ribbon',
  labelKey: 'blocks.ribbon',
  // The seed rule (ADR-0012): ta() is called only here, on insertion in preview.
  defaults: () => ({
    items: [ta('seed.ribbonBlock.a'), ta('seed.ribbonBlock.b'), ta('seed.ribbonBlock.c')],
    sep: 'dot',
    motion: 'roll',
    width: 'content',
    main: 'text',
    above: 'none',
    below: 'none',
    stripePlace: 'stack',
    thickness: 8,
    speed: 60,
    dwell: 2.5,
    direction: 'left',
    pauseOnHover: true,
    variant: 'band',
    size: 'md',
    caps: false,
    weight: 'normal',
    outline: false,
    tilt: 0,
    fade: true,
    gap: 40,
  }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {object} props See defaults; every choice is allowlisted in ribbon-model.js
   * @param {object} ctx Render context
   */
  render(el, props, ctx) {
    const items = ribbonItems(props.items);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
    const motion = ribbonMotion(props.motion);
    const main = mainMode(props.main);
    const above = stripeMode(props.above);
    const below = stripeMode(props.below);
    // Nothing to draw at all: no words, and no stripe that stands on its own.
    if (!items.length && main === 'text' && above === 'none' && below === 'none') {
      if (ctx.preview) {
        const empty = document.createElement('div');
        empty.className = 'urd-ribbon-empty';
        empty.textContent = ta('canvas.ribbonEmpty');
        el.appendChild(empty);
      }
      return;
    }

    const host = document.createElement('div');
    host.className = `urd-ribbon urd-ribbon-${props.variant === 'plain' ? 'plain' : 'band'}`
      + ` urd-ribbon-size-${ribbonSize(props.size)}`;
    if (props.caps === true) host.classList.add('urd-ribbon-caps');
    if (props.outline === true) host.classList.add('urd-ribbon-outline');
    if (props.weight === 'bold') host.classList.add('urd-ribbon-bold');
    const tilt = clampTilt(props.tilt);
    if (tilt) host.style.setProperty('--urd-ribbon-tilt', `${tilt}deg`);
    host.style.setProperty('--urd-ribbon-gap', `${Math.min(120, Math.max(8, Number(props.gap) || 40))}px`);
    host.style.setProperty('--urd-ribbon-thin', `${clampThickness(props.thickness)}px`);
    if (props.variant !== 'plain') host.style.background = resolveColor(props.bg || 'accent');
    const ink = resolveColor(props.color || (props.variant === 'plain' ? 'text' : 'accent-text'));
    host.style.color = ink;
    // The outline strokes with the resolved colour, never currentColor: an
    // outlined word has no fill, so currentColor would be transparent too.
    host.style.setProperty('--urd-ribbon-ink', ink);

    // The chrome's hold is a CSS rule on the body (base.css): Clean view never
    // re-renders, so a class decided here would stick. What is decided here is
    // only what cannot change without a new render.
    const still = !ribbonMoves({ count: items.length, motion, reducedMotion: reducedMotion() });
    const stripes = [];
    // The thin stripes run against the main one, the way the gallery's second
    // row does: two bands going the same way read as one wide band.
    const opposed = { ...props, direction: props.direction === 'right' ? 'left' : 'right' };
    const sep = separatorMark(props.sep, props.sepText);
    const countFor = (mode) => (mode === 'marks' ? MARK_RUN : Math.max(1, items.length));
    const add = (mode, own, classes, canEdit, colour) => {
      if (mode === 'none') return;
      const stripe = buildStripe({
        mode, items, sep, motion, still, props: own, editable: canEdit, count: countFor(mode), colour,
      });
      stripe.el.classList.add(...classes);
      host.appendChild(stripe.el);
      stripes.push(stripe);
    };
    // On the edges the thin stripes lie on the band's own border instead of
    // taking a share of its height.
    if (stripePlace(props.stripePlace) === 'edge') host.classList.add('urd-ribbon-edges');
    add(above, opposed, ['urd-ribbon-thin', 'urd-ribbon-above'], false, props.aboveColor);
    add(main, props, ['urd-ribbon-main'], editable && main === 'text', null);
    add(below, opposed, ['urd-ribbon-thin', 'urd-ribbon-below'], false, props.belowColor);
    el.appendChild(host);

    // Full page width: the canvas binds the content (ADR-0018), so a band that
    // should reach the window's edges is measured out to the section's width
    // instead of guessing with vw, which would count the scrollbar too. The
    // ancestors are looked up in the frame below: render runs before the block
    // is in the DOM.
    const wide = ribbonWidth(props.width) === 'page';
    if (wide) host.classList.add('urd-ribbon-wide');
    const fitWide = () => {
      if (!wide || !el.isConnected) return;
      const sectionEl = el.closest('.urd-section');
      const canvasEl = el.closest('.urd-canvas');
      if (!sectionEl || !canvasEl) return;
      host.style.width = `${sectionEl.offsetWidth}px`;
      host.style.marginLeft = `${-(el.offsetLeft + canvasEl.offsetLeft)}px`;
    };

    if (editable && main === 'text') {
      // Click-and-type on each word in the main stripe; the list and its order
      // live in the panel.
      const mainRun = host.querySelector('.urd-ribbon-main .urd-ribbon-run');
      for (const word of mainRun?.querySelectorAll('.urd-ribbon-item') ?? []) {
        try {
          word.contentEditable = 'plaintext-only';
        } catch {
          word.contentEditable = 'true';
        }
        word.addEventListener('input', () => {
          const next = [...mainRun.querySelectorAll('.urd-ribbon-item')].map((node) => node.textContent ?? '');
          post({
            type: 'urd-edit',
            sectionId: ctx.section.id,
            blockId: el.dataset.blockId,
            props: { ...props, items: next },
          });
        });
      }
    }
    if (editable) {
      // The help chip (ADR-0008): the band has special functions and explains itself.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintRibbon.title'),
          lines: [ta('hintRibbon.l1'), ta('hintRibbon.l2'), ta('hintRibbon.l3')],
        });
      });
    }

    // Everything that has to be measured waits for the frame after the block
    // has been put in the page: the width of each track, the reach of a
    // full-width band, and the height the block needs (auto-grow, where the
    // blocks below are moved by the push pass, ADR-0024).
    requestAnimationFrame(() => {
      if (!el.isConnected) return;
      for (const stripe of stripes) stripe.measure();
      fitWide();
      if (typeof ResizeObserver === 'function') {
        const ro = new ResizeObserver(() => {
          if (!host.isConnected) {
            ro.disconnect();
            return;
          }
          for (const stripe of stripes) stripe.measure();
          fitWide();
        });
        for (const stripe of stripes) if (stripe.run) ro.observe(stripe.run);
        const sectionEl = wide ? el.closest('.urd-section') : null;
        if (sectionEl) ro.observe(sectionEl);
      }
      const needed = host.offsetHeight;
      if (needed && Math.abs(needed - el.clientHeight) > 8 && ctx.viewport !== 'mobile') {
        el.style.height = `${needed}px`;
        const sectionEl = el.closest('.urd-section');
        if (sectionEl) growSectionTo(sectionEl, el.offsetTop + needed + 24);
      }
    });
  },
};
