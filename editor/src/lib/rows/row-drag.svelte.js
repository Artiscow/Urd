/* The admin's one way to move a row in a list by dragging it, in the row kit (ADR-0016).
   A row is pressed, held and dragged by itself: by the head of a card that opens, or anywhere on a plain row outside its fields; the grip is its sign.
   Under the pointer stands the row's card, one line with its sign, its name and its detail, whatever stands open in the row; the row stays dimmed in its place.
   Where it will land stands a dashed slot of one line with the card's faint copy, or, chosen in the Urd settings («Moving rows», the root's data-drag-mark), a line between the rows.
   While a row is dragged the whole admin accepts the drop, so a release beside the list lands the row where the mark stood; Escape is the only cancel, and moves nothing.
   Every mark moves smoothly: the slot grows in and shrinks away, and the line fades in and glides; under reduced motion each stands at once.
   As a row lands the slot is gone at once and the rows glide from their old places to their new ones, the landed row from where its mark stood.
   The landed row flashes the accent once and a screen reader hears where it went; a move by the keys ends the same way through `landed`.
   A list takes it in three places: `{@attach drag.list}` on the list, whose rows that move carry `data-drag-id` and stand directly in it; `{@attach drag.handle(id)}` on what a row is dragged by; and the slot, drawn where `drag.at(id, pos)` says, as an element with `{@attach drag.slot}` (and `out:slotOut` where it may shrink away).
   Where the row lands is reckoned by lib/row-drag.js, and the list moves the row in the `land` it gives. */
import { tick } from 'svelte';
import { ta } from '$engine/i18n.js';
import { rowDropAt, reorderRows } from '../row-drag.js';

const TYPE = 'application/x-urd-row';
/** What a press in a row leaves to the control under it: typing, selecting text and sliding. */
const FIELDS = 'input, textarea, select, [contenteditable="true"], [contenteditable=""], [role="slider"], [data-no-drag]';
const GRIP = '<svg width="10" height="16" viewBox="0 0 12 18" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.6"/><circle cx="9" cy="3" r="1.6"/><circle cx="3" cy="9" r="1.6"/><circle cx="9" cy="9" r="1.6"/><circle cx="3" cy="15" r="1.6"/><circle cx="9" cy="15" r="1.6"/></svg>';
/** The card's widest, so a table row's card stays a card. */
const CARD_MAX = 416;

const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
/** How long a row glides to its new place as a move lands. */
const GLIDE_MS = 180;
const GLIDE_EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

/** True while a move lands, so the slot leaves at once and the rows glide into the room it leaves. */
let landing = false;

/** A move is landing: until the list has drawn its new order, the marks leave at once. */
export function landNow() {
  landing = true;
  tick().then(() => { landing = false; });
}

/** Each row's place on the screen, by element, before a move. */
export function placesOf(rows) {
  return new Map([...rows].map((el) => [el, el.getBoundingClientRect()]));
}

/** One row glides from where it stood to where it stands now; one that came from further up or down passes over the others. */
function glide(el, from) {
  const now = el.getBoundingClientRect();
  const dx = from.left - now.left;
  const dy = from.top - now.top;
  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
  el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: GLIDE_MS, easing: GLIDE_EASE });
}

/** After a move, once the list has drawn its new order: every row still on the screen glides from the place it had before. */
export async function glideFrom(places) {
  await tick();
  if (still()) return;
  for (const [el, from] of places) if (el.isConnected) glide(el, from);
}

/** One polite region for every list, where a screen reader hears where a row went. */
let voice = null;
function say(text) {
  if (!voice) {
    voice = document.createElement('div');
    voice.className = 'sr-only';
    voice.setAttribute('aria-live', 'polite');
    document.body.append(voice);
  }
  voice.textContent = '';
  requestAnimationFrame(() => { voice.textContent = text; });
}

/** A card's parts for a row the list gives no card for: the first text field's words, or the row's own, and its first picture. */
function cardFromRow(row) {
  const field = row?.querySelector('input:not([type]), input[type="text"], input[type="url"], textarea');
  const img = row?.querySelector('img');
  const words = (row?.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);
  return { name: field?.value || field?.placeholder || words, src: img?.getAttribute('src') ?? '' };
}

/** The card's parts as elements: the grip, the sign (a picture, a swatch or an icon), the name and the detail. */
function cardParts(c) {
  const parts = [];
  const grip = document.createElement('span');
  grip.className = 'row-drag-grip';
  grip.innerHTML = GRIP;
  parts.push(grip);
  if (c.src) {
    const img = document.createElement('img');
    img.className = 'row-drag-sign';
    img.src = c.src;
    img.alt = '';
    parts.push(img);
  } else if (c.swatch || c.icon) {
    const sign = document.createElement('span');
    sign.className = c.icon && !c.swatch ? 'row-drag-sign row-drag-icon' : 'row-drag-sign';
    if (c.swatch) sign.style.background = c.swatch;
    else sign.innerHTML = c.icon;
    parts.push(sign);
  }
  const name = document.createElement('span');
  name.className = 'row-drag-name';
  name.textContent = c.name ?? '';
  parts.push(name);
  if (c.detail) {
    const detail = document.createElement('span');
    detail.className = 'row-drag-detail';
    detail.textContent = c.detail;
    parts.push(detail);
  }
  return parts;
}

/** The slot shrinking away as the mark moves on: its height, its gap and its strength to nothing; as the row lands it is gone at once. */
export function slotOut(node) {
  if (landing) return { duration: 0 };
  const h = node.offsetHeight;
  const gap = parseFloat(getComputedStyle(node.parentElement ?? node).rowGap) || 0;
  return { duration: still() ? 0 : 150, css: (t) => `height: ${t * h}px; min-height: 0; margin-top: ${(t - 1) * gap}px; opacity: ${t}; animation: none;` };
}

export class RowDrag {
  /** The dragged row's id while a drag is on. */
  drag = $state(null);
  /** Where the row would land: before or after a row, by its id. */
  drop = $state(null);
  /** Whether the mark is the slot or the line, read as the drag starts. */
  #line = false;
  /** The list, the dragged row on the screen, its card, and the line while it stands. */
  #list = null;
  #row = null;
  #face = null;
  #lineEl = null;
  #land;
  #card;

  /**
   * @param {(id: string, drop: { id: string, pos: 'before'|'after' }) => (string|void)} land Moves the row `id` before or after the row the drop names, and gives the landed row's id when it changes with the move
   * @param {(id: string) => ({ name: string, detail?: string, src?: string, swatch?: string, icon?: string }|null)} [card] The card of the row `id`; without it the card is read from the row
   */
  constructor(land, card = null) {
    this.#land = land;
    this.#card = card;
    $effect(() => {
      if (this.drag === null) return;
      const accept = (e) => e.preventDefault();
      window.addEventListener('dragover', accept);
      window.addEventListener('drop', accept);
      return () => {
        window.removeEventListener('dragover', accept);
        window.removeEventListener('drop', accept);
      };
    });
  }

  /** Whether the slot stands before or after the row `id`. */
  at(id, pos) {
    return !this.#line && this.drag !== null && this.drop?.id === String(id) && this.drop.pos === pos;
  }

  /** The list: the mark follows the pointer among the rows that move, and a drop on the list lands the row.
      Over the slot itself nothing is reckoned anew, so the rows a moving slot pushes never change the landing place under a still pointer. */
  list = (el) => {
    this.#list = el;
    const over = (e) => {
      if (this.drag === null) return;
      const onSlot = [...el.querySelectorAll(':scope > .row-drag-slot, :scope > .row-drag-slot-row')].some((m) => { const b = m.getBoundingClientRect(); return e.clientY >= b.top && e.clientY <= b.bottom; });
      if (onSlot) { if (this.drop) e.preventDefault(); return; }
      const boxes = [...el.querySelectorAll(':scope > [data-drag-id]')].map((r) => {
        const b = r.getBoundingClientRect();
        return { id: r.dataset.dragId, top: b.top, bottom: b.bottom };
      });
      const at = rowDropAt(boxes, this.drag, e.clientY);
      if (!at) {
        this.drop = null;
        this.#placeLine(null);
        return;
      }
      e.preventDefault();
      if (this.drop?.id !== at.id || this.drop?.pos !== at.pos) this.drop = at;
      this.#placeLine(at);
    };
    const drop = (e) => {
      if (this.drag === null) return;
      e.preventDefault();
      this.#finish(true);
    };
    el.addEventListener('dragover', over);
    el.addEventListener('drop', drop);
    return () => {
      el.removeEventListener('dragover', over);
      el.removeEventListener('drop', drop);
      if (this.#list === el) this.#list = null;
    };
  };

  /** What the row `id` is pressed, held and dragged by; `movable` false leaves the row in its place. A press in a field inside it is the field's own. */
  handle(id, movable = true) {
    return (el) => {
      if (!movable) return;
      // The handle turns draggable at the press, unless the press is in a field, so a field keeps its typing and its text selection.
      const arm = (e) => {
        if (e.button !== 0) return;
        if (e.target instanceof Element && e.target.closest(FIELDS)) el.removeAttribute('draggable');
        else el.draggable = true;
      };
      const disarm = () => { if (this.drag === null) el.removeAttribute('draggable'); };
      const start = (e) => {
        if (!el.draggable) return;
        e.stopPropagation();
        this.#start(e, String(id), el.closest('[data-drag-id]'));
      };
      const end = (e) => {
        this.#finish(e.dataTransfer?.dropEffect !== 'none');
        el.removeAttribute('draggable');
      };
      el.addEventListener('pointerdown', arm);
      el.addEventListener('pointerup', disarm);
      el.addEventListener('dragstart', start);
      el.addEventListener('dragend', end);
      return () => {
        el.removeEventListener('pointerdown', arm);
        el.removeEventListener('pointerup', disarm);
        el.removeEventListener('dragstart', start);
        el.removeEventListener('dragend', end);
        el.removeAttribute('draggable');
      };
    };
  }

  /** The slot: the dragged row's card, faint and inert, one line tall. */
  slot = (el) => {
    el.inert = true;
    el.setAttribute('aria-hidden', 'true');
    if (this.#face) el.replaceChildren(...cardParts(this.#face));
  };

  /** A row has landed, by a drag or by the keys: it flashes the accent once, and a screen reader hears where it went. */
  async landed(id) {
    await tick();
    const list = this.#list;
    const row = list?.querySelector(`:scope > [data-drag-id="${CSS.escape(String(id))}"]`);
    if (!row) return;
    row.removeAttribute('data-row-landed');
    void row.offsetWidth;
    row.setAttribute('data-row-landed', '');
    row.addEventListener('animationend', () => row.removeAttribute('data-row-landed'), { once: true });
    const rows = [...list.querySelectorAll(':scope > [data-drag-id]')];
    const face = this.#faceOf(String(id), row);
    say(ta('list.moved', { name: face.name || '', n: rows.indexOf(row) + 1, count: rows.length }));
  }

  #faceOf(id, row) {
    return this.#card?.(id) ?? cardFromRow(row);
  }

  /** The drag starts: the row's card is the picture under the pointer, held where the pointer took the row, and the row dims a frame later. */
  #start(e, id, row) {
    this.#line = document.documentElement.dataset.dragMark === 'line';
    this.#face = this.#faceOf(id, row);
    this.drag = id;
    this.drop = null;
    e.dataTransfer?.setData(TYPE, id);
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    if (!row) return;
    const box = row.getBoundingClientRect();
    const width = Math.min(box.width, CARD_MAX);
    const card = document.createElement('div');
    card.className = 'row-drag-card';
    card.style.width = `${width}px`;
    card.append(...cardParts(this.#face));
    const holder = document.createElement('div');
    holder.className = 'row-drag-holder';
    holder.append(card);
    document.body.append(holder);
    const x = Math.min(Math.max(e.clientX - box.left, 8), width - 8);
    const y = Math.min(Math.max(e.clientY - box.top, 8), card.offsetHeight - 8);
    e.dataTransfer?.setDragImage(card, x, y);
    setTimeout(() => holder.remove(), 0);
    this.#row = row;
    requestAnimationFrame(() => { if (this.#row === row) row.setAttribute('data-row-dragging', ''); });
  }

  /** The line between the rows where the row would land, over everything; gone with no landing place. */
  #placeLine(at) {
    if (!this.#line) return;
    const row = at && this.#list?.querySelector(`:scope > [data-drag-id="${CSS.escape(at.id)}"]`);
    if (!row) {
      this.#lineEl?.remove();
      this.#lineEl = null;
      return;
    }
    const b = row.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(this.#list).rowGap) || 0;
    const y = at.pos === 'before' ? b.top - gap / 2 : b.bottom + gap / 2;
    if (!this.#lineEl) {
      this.#lineEl = document.createElement('div');
      this.#lineEl.className = 'row-drag-line';
      this.#lineEl.setAttribute('aria-hidden', 'true');
      document.body.append(this.#lineEl);
    }
    this.#lineEl.style.left = `${b.left}px`;
    this.#lineEl.style.width = `${b.width}px`;
    this.#lineEl.style.top = `${y - 1}px`;
  }

  /** The end of a drag: the row lands when `lands` and a landing place stands, and the list is back at rest. */
  #finish(lands) {
    const id = this.drag;
    const at = this.drop;
    const goes = lands && id !== null && at;
    const before = goes ? this.#places(id) : null;
    if (goes) landNow();
    this.#row?.removeAttribute('data-row-dragging');
    this.#row = null;
    this.#placeLine(null);
    this.drag = null;
    this.drop = null;
    if (!goes) return;
    const moved = this.#land(id, at);
    this.#glide(before, id, at);
    this.landed(moved ?? id);
  }

  /** The rows' order and places as the move lands; the landed row stands where its slot stood. */
  #places(id) {
    const rows = [...(this.#list?.querySelectorAll(':scope > [data-drag-id]') ?? [])];
    const rects = new Map(rows.map((r) => [r.dataset.dragId, r.getBoundingClientRect()]));
    const slot = this.#list?.querySelector(':scope > .row-drag-slot, :scope > .row-drag-slot-row');
    if (slot) rects.set(id, slot.getBoundingClientRect());
    return { ids: rows.map((r) => r.dataset.dragId), rects };
  }

  /** The rows glide to their new order: the row at each place now is the one the move put there, from wherever it stood before. */
  async #glide(before, id, at) {
    const list = this.#list;
    await tick();
    if (!list || still()) return;
    const order = reorderRows(before.ids, (x) => x, id, at);
    const rows = [...list.querySelectorAll(':scope > [data-drag-id]')];
    if (rows.length !== order.length) return;
    rows.forEach((el, k) => {
      const from = before.rects.get(order[k]);
      if (from) glide(el, from);
    });
  }
}
