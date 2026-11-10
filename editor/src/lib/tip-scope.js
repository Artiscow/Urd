/**
 * Tooltips on what they name: a tooltip (the title attribute) that stands on a whole row, a label with its field or a fold's heading, shows only while the pointer is on something in it, its name's words, a field, a button, a chip or a drawing, and never on the row's empty room.
 * A name that stretches across its row counts where its words stand, not over the room its box takes beyond them.
 * One listener on the admin's document serves every row: while a mouse stands on a row's room its title is blanked (the words kept in data-urd-tip, where the menu's search reads them), and it comes back as the pointer reaches the words or anything in it, leaves it, presses, or a key or the focus moves; a title the row rewrites meanwhile is the one that stays.
 * A control that is one thing (a button, a link, a field, a chip, a label drawn as a button), and a part dragged by its room (`data-tip-whole`), keeps its tooltip over all of itself; an empty title, which keeps a menu's own tooltip from a menu that opens on hover, is left as it is.
 */

/** What is one thing to point at, whose tooltip covers all of it. */
export const CONTROL = 'button, a[href], input, select, textarea, [role="button"], [role="switch"], [role="option"], [role="menuitem"], [role="tab"], [role="checkbox"], .ghost, .filepick, [data-tip-whole]';

/**
 * Whether a row's tooltip shows for the pointer: anywhere on a control; on words, only where they stand; on the row's own room, only on its words; and on anything else in it (a swatch, a drawing), always.
 * @param {{control: boolean, room: boolean, words: boolean, onWords: boolean}} where
 *   `control`: the pointer is on a control or the row is one; `room`: it is on the row itself, not on anything in it; `words`: what it is on holds words of its own; `onWords`: it stands on those words.
 */
export function tipShows({ control, room, words, onWords }) {
  if (control) return true;
  if (room || words) return onWords;
  return true;
}

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
      room: target === holder,
      words: hasWords(target),
      onWords: onOwnWords(target, x, y),
    });
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
