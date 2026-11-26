/**
 * A row's tooltip shows only on its words, a picture or a control, never on its empty room, and not where it repeats words the item shows uncut.
 */

/** What is one thing to point at, whose tooltip covers all of it. */
export const CONTROL = 'button, a[href], input, select, textarea, [role="button"], [role="switch"], [role="option"], [role="menuitem"], [role="tab"], [role="checkbox"], .ghost, .filepick, [data-tip-whole]';

/**
 * Whether a row's tooltip shows for the pointer: anywhere on a control, a picture, a drawing or a preview, on words only where they stand, and nowhere else.
 * @param {{control: boolean, picture: boolean, words: boolean, onWords: boolean}} where
 *   `control`: on a control, or the row is one; `picture`: on a picture, drawing or preview; `words`: the target has words; `onWords`: the pointer is on them.
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
/** Whether an element is a picture, a drawing or a preview: an image, a part of a drawing, or a part named `-pic`, `-thumb`, `-swatch` or `-preview`. */
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
