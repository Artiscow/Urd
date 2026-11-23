/**
 * The preview's editing of the calendar block: the words written in place on the canvas, their hints, the help chip, the example events the editor's bar switches, and the block menu's variants.
 * Loaded with the preview's editing layer (preview-edit.js), it attaches itself to the block as it loads (attachEditing in calendar.js); a visitor's page never loads it.
 */
import { ta, adminLocaleReady } from '../i18n.js';
import { attachEditing, loadCard } from './calendar.js';
import { calendarParts, loadDesign, DESIGN_MODULES } from './calendar-load.js';

/** The calendars in the editor whose bar chose the example events on or off, by block id, for the editing session; a calendar not listed shows them while it has no sources. */
const EXAMPLES = new Map();

/** What each calendar in the editor shows, by block id, as last drawn: its box, whether the example events stand in for its own, why it has none of its own where a feed failed (read in the admin's language when asked), and its way to be drawn again. */
const SHOWN = new Map();

/** What a calendar in the editor shows, for its bar's button (preview-edit.js): whether the example events stand in for its own, and why its feed gave none where one failed; null until it is drawn. */
export function calendarExamples(blockId) {
  const state = SHOWN.get(blockId);
  return state ? { examples: state.examples, reason: state.reason?.() ?? null } : null;
}

/** The example events on or off for a calendar in the editor, for the session, and the calendar drawn again with them. */
export function toggleCalendarExamples(blockId) {
  const state = SHOWN.get(blockId);
  if (!state) return;
  EXAMPLES.set(blockId, !state.examples);
  state.redraw();
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

/**
 * Loads what a calendar draws with ahead of the first one, every design's renderer among it, so a calendar added in the editor draws at once; a part that cannot be loaded now is loaded when a calendar draws.
 * @returns {Promise<void>}
 */
function warmCalendar() {
  return calendarParts().then(() => Promise.all([...Object.keys(DESIGN_MODULES).map(loadDesign), loadCard()])).then(() => {}, () => {});
}

// The editor's block menu lists the designs, so the preview loads the design model up front, and what a calendar draws with once the editor is idle (a timer where the browser has no idle callback); a visitor loads it with the first calendar on a page.
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('preview')) {
  import('../calendar-designs.js').then(keepDesignVariants, () => {});
  if (typeof requestIdleCallback === 'function') requestIdleCallback(() => warmCalendar(), { timeout: 3000 });
  else setTimeout(warmCalendar, 1500);
}

/* ---------- The words written in place ---------- */

/** Posts a message to the editor. */
const post = (msg) => window.parent?.postMessage(msg, location.origin);

/** The words as stored: every value back to its placeholder, and nothing editable left in them. */
function serialize(node, key, env) {
  const copy = node.cloneNode(true);
  for (const value of copy.querySelectorAll('.urd-cal-n')) value.replaceWith(env.params(key).includes(value.dataset.p) ? `{${value.dataset.p}}` : value.textContent);
  for (const part of copy.querySelectorAll('[contenteditable]')) part.removeAttribute('contenteditable');
  return copy.innerHTML.replace(/\u200b/g, '');
}

/** An empty text's hint in the editor: a removed line's default words, or the prompt of a text that has no words of its own. */
function hintFor(node, key, form, plain, env) {
  const hint = env.cd.CAL_HINT_TEXTS[key];
  if (hint) adminLocaleReady.then(() => { node.dataset.placeholder = ta(hint); });
  else node.dataset.placeholder = env.defaultWords(key, form, plain).replace(/\{([a-z]+)\}/gi, '').trim();
}

/** The line and the group a content text stands in follow its words: gone when it is empty. */
function markLine(node, blank) {
  const box = node.closest('.urd-cal-line');
  if (box) box.classList.toggle('urd-cal-gone', blank);
  const around = node.closest('.urd-cal-group');
  if (around) around.classList.toggle('urd-cal-gone', ![...around.querySelectorAll('.urd-cal-carry')].some((n) => !n.classList.contains('urd-cal-gone')));
}

/**
 * Makes a drawn word writable in place: the text toolbar attaches to it, and every change posts the whole props with the words under their slot in `texts`.
 * `env` is what the block's draw hands its editing (makeUi in calendar.js): its words, its drawing of them, the block and its settings.
 */
function wireText(node, key, env) {
  env.drawn.add(node);
  // The text toolbar attaches to .urd-text fields; a click in the words edits them and never reaches the button or link around them.
  // In the Clean view the words are plain text, as every text written in place is there, and the link around them works (cleanTexts in urd.js, which also gives them back).
  node.classList.add('urd-text');
  node.contentEditable = 'true';
  // The words stop the press, so a link around them is never followed.
  // A fold's summary follows the block's two-step model: the press that selects the block leaves the fold, the next press opens or closes it and goes into the words, and the presses after that edit the words until they lose focus.
  let selectedBefore = false;
  let editing = false;
  node.addEventListener('pointerdown', () => { selectedBefore = env.el.classList.contains('urd-selected'); });
  node.addEventListener('blur', () => { editing = false; });
  node.addEventListener('click', (event) => {
    if (env.clean()) return;
    event.stopPropagation();
    if (node.closest('a[href]')) event.preventDefault();
    if (!node.closest('summary')) return;
    if (!selectedBefore || editing) event.preventDefault();
    else editing = true;
  });
  node.addEventListener('input', () => {
    const { form } = env.TEXTS.get(node);
    const slot = env.cd.calTextSlot(key, form);
    const html = serialize(node, key, env);
    const blank = env.cd.calBlankHtml(html);
    // The texts rewritten since this render are kept together: the editor stores what it is sent and does not render again.
    // An emptied content line is removed; any other emptied text goes back to the dictionary's words.
    if (blank && env.cd.CAL_CONTENT_TEXTS.includes(key)) env.rewritten[slot] = false;
    else if (blank) delete env.rewritten[slot];
    else env.rewritten[slot] = html;
    node.classList.toggle('urd-cal-blank', blank);
    if (blank) hintFor(node, key, form, env.TEXTS.get(node)?.plain, env);
    markLine(node, blank);
    for (const other of env.drawn) {
      if (!other.isConnected) {
        env.drawn.delete(other);
        continue;
      }
      const state = env.TEXTS.get(other);
      if (other === node || state.key !== key || env.cd.calTextSlot(key, state.form) !== slot || other.contains(document.activeElement)) continue;
      env.paintText(other, key, state.values);
      markLine(other, other.classList.contains('urd-cal-blank'));
    }
    for (const measure of env.measures) measure();
    post({
      type: 'urd-edit',
      sectionId: env.ctx.section.id,
      blockId: env.el.dataset.blockId,
      props: { ...env.props, texts: { ...env.rewritten } },
    });
  });
}

/** The help chip on a calendar in the preview (ADR-0008): the sources, the conventions and the subscribe buttons need explaining. */
function helpChip(el) {
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

attachEditing({
  wireText,
  hintFor,
  helpChip,
  /** Whether a calendar shows the example events: the editor bar's choice for the session, else whether it has no sources. */
  examples: (key, sample) => EXAMPLES.get(key) ?? sample,
  /** What a calendar shows, kept for its bar's button; null forgets it. */
  shown: (key, state) => {
    if (!state) {
      SHOWN.delete(key);
      return;
    }
    // A calendar gone from the page (deleted, or drawn anew) leaves the list.
    for (const [id, kept] of SHOWN) if (!kept.host.isConnected) SHOWN.delete(id);
    SHOWN.set(key, state);
  },
  variants: () => [...VIEW_NAMES.map(([view, labelKey]) => ({ label: view, labelKey, props: { view } })), ...designVariants],
});
