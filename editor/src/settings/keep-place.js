/**
 * Where the Urd settings were left, in sessionStorage: each form's scroll, as the row at its top and how far past it, and the dialog list's open entries.
 */

const KEY = 'urd-settings-left';

function readAll() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

/** Keeps `value` under `name`, or forgets it when it is null; without storage the window opens at the top. */
export function remember(name, value) {
  try {
    const all = readAll();
    if (value == null) delete all[name];
    else all[name] = value;
    sessionStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* The storage is blocked or full: nothing is kept. */
  }
}

/** What is kept under `name`, or null. */
export const recall = (name) => readAll()[name] ?? null;

/** The first row whose foot stands below the scroll's top, and how far the scroll's top stands past that row's top. */
function placeOf(scroller) {
  const top = scroller.getBoundingClientRect().top;
  const at = Math.round(scroller.scrollTop);
  for (const row of scroller.querySelectorAll('.st-row[data-st-row]')) {
    const box = row.getBoundingClientRect();
    if (box.bottom > top) return { row: row.dataset.stRow, past: Math.round(top - box.top), at };
  }
  return { at };
}

/**
 * An attachment that scrolls a settings form back to the place kept under `name` before it is drawn and keeps the place as it scrolls; a search clears it.
 * @param {string} name
 * @param {string} [query]
 * @param {(el: HTMLElement) => HTMLElement | null} [scrollerOf]
 */
export function keepPlace(name, query = '', scrollerOf = (el) => el) {
  return (el) => {
    const scroller = scrollerOf(el);
    if (!scroller) return;
    if (query.trim()) {
      remember(name, null);
      return;
    }
    let restoring = requestAnimationFrame(() => {
      restoring = 0;
      const place = recall(name);
      if (!place) return;
      const row = place.row ? scroller.querySelector(`.st-row[data-st-row="${CSS.escape(place.row)}"]`) : null;
      scroller.scrollTop = row ? scroller.scrollTop + row.getBoundingClientRect().top - scroller.getBoundingClientRect().top + place.past : place.at;
    });
    let saving = 0;
    const onScroll = () => {
      if (restoring || saving) return;
      saving = requestAnimationFrame(() => {
        saving = 0;
        remember(name, scroller.scrollTop > 0 ? placeOf(scroller) : null);
      });
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(restoring);
      cancelAnimationFrame(saving);
      scroller.removeEventListener('scroll', onScroll);
    };
  };
}
