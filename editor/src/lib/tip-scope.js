/**
 * Tooltips on what they name: a tooltip (the title attribute) that stands on a whole row, a label with its field or a fold's heading, shows only while the pointer is on words where they stand, on a picture, a drawing or a preview, or on a control (a button, a field, a chip), and never on the row's empty room.
 * A name that stretches across its row counts where its words stand, not over the room its box takes beyond them, and a part that only holds others (a grid of pictures, a column of fields) is room too.
 * A tooltip that only says the words its item already shows (a design's tile named under its picture) never shows; it stays in the page, where a screen reader and the menu's search read it, and a name cut off by its room (an ellipsis) shows its tooltip, which holds the rest.
 * One listener on the admin's document serves every row: while a mouse stands on a row's room its title is blanked (the words kept in data-urd-tip, where the menu's search reads them), and it comes back as the pointer reaches the words or anything in it, leaves it, presses, or a key or the focus moves; a title the row rewrites meanwhile is the one that stays.
 * A control that is one thing (a button, a link, a field, a chip, a label drawn as a button), and a part dragged by its room (`data-tip-whole`), keeps its tooltip over all of itself; an empty title, which keeps a menu's own tooltip from a menu that opens on hover, is left as it is.
 */

/** What is one thing to point at, whose tooltip covers all of it. */
export const CONTROL = 'button, a[href], input, select, textarea, [role="button"], [role="switch"], [role="option"], [role="menuitem"], [role="tab"], [role="checkbox"], .ghost, .filepick, [data-tip-whole]';

/**
 * Whether a row's tooltip shows for the pointer: anywhere on a control, a picture, a drawing or a preview, on words only where they stand, and nowhere else.
 * @param {{control: boolean, picture: boolean, words: boolean, onWords: boolean}} where
 *   `control`: the pointer is on a control or the row is one; `picture`: it is on a picture, a drawing or a preview; `words`: what it is on holds words of its own; `onWords`: it stands on those words.
 */
export function tipShows({ control, picture, words, onWords }) {
  if (control || picture) return true;
  return words && onWords;
}

const plain = (text) => (text ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
/** Whether a tooltip only says the words its item already shows, so it adds nothing to them. */
export const echoes = (tip, shown) => plain(tip) !== '' && plain(tip) === plain(shown);

/** Whether a part of the item, or the item, holds more than its room shows: words cut off by an ellipsis or a clamp. */
const cutOff = (holder) => [holder, ...holder.querySelectorAll('*')]
  .some((el) => el instanceof HTMLElement && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1));

const PICTURE_TAGS = new Set(['svg', 'img', 'canvas', 'picture', 'video']);
/** Whether an element is a picture, a drawing or a preview: an image or a drawing of its own, a part of a drawing, or a part named for one (a `-pic`, a `-thumb`, a swatch, a preview). */
export const isPicture = (el) => PICTURE_TAGS.has(el.localName) || Boolean(el.closest('svg'))
  || [...el.classList].some((name) => /(^|-)(pic|thumb|swatch|preview)$/.test(name));

/** Whether an element holds words of its own: text that is its, not a child element's. */
const hasWords = (el) => [...el.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());

/** Whether the point stands on words of the element's own. */
function onOwnWords(el, x, y) {
  for (const node of el.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    for (const r of range.getClientRects()) if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
  }
  return false;
}

/** Sets the listener on the admin's document, once. */
export function installTipScope(doc = document) {
  let held = null;
  /** The title blanked comes back, unless the row has drawn another or taken it away meanwhile. */
  const give = () => {
    if (!held) return;
    if (held.getAttribute('title') === '') held.setAttribute('title', held.dataset.urdTip ?? '');
    delete held.dataset.urdTip;
    held = null;
  };
  const take = (el) => {
    if (held === el) return;
    give();
    el.dataset.urdTip = el.getAttribute('title');
    el.setAttribute('title', '');
    held = el;
  };
  let frame = 0;
  let last = null;
  const decide = () => {
    frame = 0;
    const { target, x, y } = last;
    const holder = target?.closest('[title]');
    const tip = holder && (holder.dataset.urdTip || holder.getAttribute('title'));
    if (!holder || !tip) {
      give();
      return;
    }
    if (held && held !== holder) give();
    const shows = tipShows({
      control: holder.matches(CONTROL) || Boolean(target.closest(CONTROL)),
      picture: isPicture(target),
      words: hasWords(target),
      onWords: onOwnWords(target, x, y),
    }) && !(holder.textContent.length < tip.length * 2 + 40 && echoes(tip, holder.innerText) && !cutOff(holder));
    if (shows) {
      if (held === holder) give();
    } else take(holder);
  };
  doc.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    last = { target: event.target instanceof Element ? event.target : null, x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(decide);
  }, { passive: true });
  for (const type of ['pointerdown', 'keydown', 'focusin']) doc.addEventListener(type, give, true);
  doc.documentElement.addEventListener('pointerleave', give);
}
