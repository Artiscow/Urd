/**
 * Which folds stand open in each surface of the admin, kept for the tab's life.
 * It also keeps the rows a fold's «Add a setting» has shown, in the order added.
 */
import { SvelteSet } from 'svelte/reactivity';

const KEY = 'urd-admin-folds';

/** The folds kept before a reload, open and seen, each a list of keys; none without storage. */
function keptFolds() {
  const list = (value) => (Array.isArray(value) ? value.filter((key) => typeof key === 'string') : []);
  try {
    const kept = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
    return { open: list(kept?.open), seen: list(kept?.seen) };
  } catch {
    return { open: [], seen: [] };
  }
}

const kept = keptFolds();
const open = new SvelteSet(kept.open);
/** The folds that have had their first showing this tab, by what asked: a fold that starts open does so once, and is then left as the owner leaves it. */
const seen = new Set(kept.seen);
/** Counts the first showings forgotten, read where a fold asks for its first showing, so a fold drawn asks again. */
let forgotten = $state(0);
/** Whether «Expand all» stands every fold open at once, lifting «One at a time» until the folds are collapsed again. */
let spread = $state(false);

// The folds are written as the admin is left (a reload or a closed tab), not at every fold.
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ open: [...open], seen: [...seen] }));
    } catch {
      /* The storage is blocked or full: the folds start as they are drawn. */
    }
  });
}

const keyOf = (surface, id) => `${surface}:${id}`;
/** The rows shown from a fold's «Add a setting», by the fold's key and the row's name. */
const revealed = new Set();
/** The rows the owner added from the list, in the order added. */
const added = [];

export const folds = {
  get spread() { return spread; },
  set spread(on) { spread = on; },
  /** Whether the fold stands open. */
  isOpen: (surface, id) => open.has(keyOf(surface, id)),
  /** Opens or closes the fold. */
  set(surface, id, on) {
    if (on) open.add(keyOf(surface, id));
    else open.delete(keyOf(surface, id));
  },
  /** Opens the fold on its first showing only; `tag` names what asked («All open»), whose first showings `forget` takes back. */
  openOnce(surface, id, tag = '') {
    void forgotten;
    const key = keyOf(surface, id);
    const mark = `${tag}:${key}`;
    if (seen.has(mark)) return;
    seen.add(mark);
    open.add(key);
  },
  /** Forgets the first showings `tag` asked for, so every fold drawn and every fold drawn later opens again for it: «All open» chosen again. */
  forget(tag) {
    for (const mark of [...seen]) if (mark.startsWith(`${tag}:`)) seen.delete(mark);
    forgotten += 1;
  },
  /** Whether a row of the fold has been shown from its «Add a setting», or kept once it held a value of its own. */
  isShown: (surface, id, row) => revealed.has(`${keyOf(surface, id)}:${row}`),
  /** Keeps a row of the fold shown until the admin is loaded again; `added` where the owner added it from the list. */
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
  /** The names of the rows the owner added to the fold from its list, in the order added. */
  addedIn(surface, id) {
    const prefix = `${keyOf(surface, id)}:`;
    return added.filter((key) => key.startsWith(prefix)).map((key) => key.slice(prefix.length));
  },
};
