/**
 * Which folds stand open, in every surface of the admin (the row kit, 0.7.30.2): one store, keyed by the surface and the fold's id, so a fold stays as it was left when the surface is drawn again (another block selected, a panel reopened).
 * The element menu's surface is 'menu'; a panel's is its name.
 * It also keeps, for the session, which rows a fold's «Add a setting» has shown («Extra settings» as a menu, lib/rows/Fold.svelte), by the fold and the row's own name, and the order the owner added them in, so they stand at the foot of their fold in that order.
 */
import { SvelteSet } from 'svelte/reactivity';

const open = new SvelteSet();
/** The folds that have had their first showing this session: a fold that starts open does so once, and is then left as the owner leaves it. */
const seen = new Set();
const keyOf = (surface, id) => `${surface}:${id}`;
/** The rows shown from a fold's «Add a setting», by the fold's key and the row's name. */
const revealed = new Set();
/** The rows the owner added from the list, in the order added. */
const added = [];

export const folds = {
  /** Whether the fold stands open. */
  isOpen: (surface, id) => open.has(keyOf(surface, id)),
  /** Opens or closes the fold. */
  set(surface, id, on) {
    if (on) open.add(keyOf(surface, id));
    else open.delete(keyOf(surface, id));
  },
  /** Opens the fold on its first showing only, so a fold that starts open is afterwards left as the owner leaves it; `tag` names what asked (each choice of «All open»), so the same fold opens again when it is chosen again. */
  openOnce(surface, id, tag = '') {
    const key = keyOf(surface, id);
    const mark = `${tag}:${key}`;
    if (seen.has(mark)) return;
    seen.add(mark);
    open.add(key);
  },
  /** Whether a row of the fold has been shown from its «Add a setting», or kept once it held a value of its own. */
  isShown: (surface, id, row) => revealed.has(`${keyOf(surface, id)}:${row}`),
  /** Keeps a row of the fold shown for the session; `added` where the owner added it from the list. */
  show(surface, id, row, { added: byOwner = false } = {}) {
    const key = `${keyOf(surface, id)}:${row}`;
    revealed.add(key);
    if (byOwner && !added.includes(key)) added.push(key);
  },
  /** Hides a row of the fold again, as the list it was shown from takes it away. */
  hide(surface, id, row) {
    const key = `${keyOf(surface, id)}:${row}`;
    revealed.delete(key);
    const at = added.indexOf(key);
    if (at >= 0) added.splice(at, 1);
  },
  /** Where among the rows the owner added a row stands, or -1 for a row not added from the list. */
  addedAt: (surface, id, row) => added.indexOf(`${keyOf(surface, id)}:${row}`),
};
