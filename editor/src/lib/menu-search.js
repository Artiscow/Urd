/**
 * The element menu's search (ADR-0016): narrows a copy of the menu's areas, as drawn, to the settings whose words or tooltips match, their groups open.
 */

/**
 * A part of the menu as the search reads it: a row, a heading over the parts after it, a rule, or a group with its own parts.
 * @typedef {{kind: 'row'|'heading'|'rule'|'group', text: string, children?: MenuPart[], el?: Element}} MenuPart
 */

/**
 * The parts a query shows: each row whose words match with the titles it stands under, and the groups, headings and wordless rows around a row shown.
 * @param {MenuPart[]} parts
 * @param {(text: string) => boolean} match
 * @param {string} [context] The titles the parts stand under
 * @param {Set<MenuPart>} [shown]
 * @returns {Set<MenuPart>}
 */
export function searchParts(parts, match, context = '', shown = new Set()) {
  let heading = null;
  for (const part of parts ?? []) {
    if (part.kind === 'rule') {
      heading = null;
      continue;
    }
    if (part.kind === 'heading') {
      heading = part;
      continue;
    }
    const where = heading ? `${context} ${heading.text}` : context;
    const before = shown.size;
    if (part.kind === 'group') {
      searchParts(part.children, match, `${where} ${part.text}`, shown);
      if (shown.size > before) {
        shown.add(part);
        for (const child of part.children ?? []) if (child.kind === 'row' && !child.text.trim()) shown.add(child);
      }
    } else if (match(`${where} ${part.text}`)) {
      shown.add(part);
    }
    if (heading && shown.size > before) shown.add(heading);
  }
  return shown;
}

/** Inside a part, the text of these is a value or a control, not the setting's name. */
const VALUE_TEXT = 'button, select, textarea, svg, [popover], .dd, .gridmenu-value, .menu-group-value';
/** Tooltips that name a tool on many rows (a row's small icon buttons, a colour's bin), or a choice inside a picker, not the setting. */
const TOOL_TITLE = '.icon-btn.sm, .cp-remove, [popover] *';

/**
 * The words a part is found by: its visible text without the values its controls show, and its tooltips.
 * @param {Element} el
 * @returns {string}
 */
export function partText(el) {
  const words = [];
  const walk = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === 3) words.push(child.data);
      else if (child.nodeType === 1 && !child.matches(VALUE_TEXT)) walk(child);
    }
  };
  walk(el);
  // A title set aside while a mouse stands on its row's room (lib/tip-scope.js) is read where it is kept.
  const tipOf = (node) => node.dataset?.urdTip || node.getAttribute('title');
  const own = tipOf(el);
  if (own) words.push(own);
  for (const tip of el.querySelectorAll('[title]')) {
    if (!tip.matches(TOOL_TITLE)) words.push(tipOf(tip));
  }
  return words.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * The parts of one container of the drawn menu: an area, or a group's body.
 * @param {Element} container
 * @param {string} [skip] A selector for children that are not parts
 * @returns {MenuPart[]}
 */
export function readParts(container, skip = '') {
  const parts = [];
  for (const el of container.children) {
    if (skip && el.matches(skip)) continue;
    // A card at its area's foot and the looks' buttons stand in wrappers of their own, which are no parts.
    if (el.matches('.cap-placed, .look-rows')) {
      parts.push(...readParts(el));
      continue;
    }
    if (el.tagName === 'DETAILS') {
      const summary = el.querySelector(':scope > summary');
      const body = el.querySelector(':scope > .group-items') ?? el;
      parts.push({ kind: 'group', el, text: summary ? partText(summary) : '', children: readParts(body, 'summary') });
    } else if (el.matches('.cap-card')) {
      // A capability's card is a group: its head names it, and its settings are its rows (lib/rows/Capability.svelte).
      const head = el.querySelector(':scope > .cap-head');
      const body = el.querySelector(':scope > .cap-body') ?? el;
      parts.push({ kind: 'group', el, text: head ? partText(head) : '', children: readParts(body) });
    } else if (el.tagName === 'HR') {
      parts.push({ kind: 'rule', el, text: '' });
    } else if (el.matches('.row-sub, .mini-label')) {
      parts.push({ kind: 'heading', el, text: partText(el) });
    } else {
      parts.push({ kind: 'row', el, text: partText(el) });
    }
  }
  return parts;
}

/**
 * Narrows the search's copy of the areas: a part not shown gets `menu-miss`, a group shown is opened, and an area with nothing left gets `menu-empty`.
 * @param {Element} root The search's copy of the areas, each a `.emenu-col`, in a column of its own when wide
 * @param {(text: string) => boolean} match
 */
export function narrowMenu(root, match) {
  for (const area of root.querySelectorAll('.emenu-col')) {
    const parts = readParts(area, '.emenu-title, .emenu-none');
    const shown = searchParts(parts, match);
    const mark = (list) => {
      for (const part of list) {
        part.el.classList.toggle('menu-miss', !shown.has(part));
        if (part.kind !== 'group') continue;
        if (shown.has(part)) part.el.open = true;
        mark(part.children);
      }
    };
    mark(parts);
    area.classList.toggle('menu-empty', !parts.some((part) => shown.has(part)));
  }
}

/**
 * The search as a Svelte attachment on its copy of the areas, narrowed for each query and again whenever the copy changes.
 * @param {string} query
 * @param {(text: string, query: string) => boolean} match
 * @returns {(root: Element) => () => void}
 */
export function menuSearch(query, match) {
  return (root) => {
    const run = () => narrowMenu(root, (text) => match(text, query));
    run();
    // The marks are classes and `open`, which the observer does not watch.
    const observer = new MutationObserver(run);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  };
}
