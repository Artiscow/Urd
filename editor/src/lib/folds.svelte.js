/**
 * Which folds stand open, in every surface of the admin (the row kit, 0.7.30.2): one store, keyed by the surface and the fold's id, so a fold stays as it was left when the surface is drawn again (another block selected, a panel reopened).
 * The element menu's surface is 'menu'; a panel's is its name.
 */
import { SvelteSet } from 'svelte/reactivity';

const open = new SvelteSet();
/** The folds that have had their first showing this session: a fold that starts open does so once, and is then left as the owner leaves it. */
const seen = new Set();
const keyOf = (surface, id) => `${surface}:${id}`;

export const folds = {
  /** Whether the fold stands open. */
  isOpen: (surface, id) => open.has(keyOf(surface, id)),
  /** Opens or closes the fold. */
  set(surface, id, on) {
    if (on) open.add(keyOf(surface, id));
    else open.delete(keyOf(surface, id));
  },
  /** Opens the fold on its first showing only, so a fold that starts open is afterwards left as the owner leaves it. */
  openOnce(surface, id) {
    const key = keyOf(surface, id);
    if (seen.has(key)) return;
    seen.add(key);
    open.add(key);
  },
};
