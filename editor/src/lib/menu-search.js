/**
 * The element menu's search (ADR-0016 addendum, decision 6): a field in the
 * menu's head narrows the menu to the settings whose label or tooltip holds
 * the words, with the groups that hold them open. It reads the menu as it is
 * drawn, so every block type has it without a list kept beside the markup:
 * a setting is found by the words the owner sees on it and in its tooltip.
 *
 * The search draws its own copy of the areas, so emptying the field brings
 * back the menu as it was, with the groups open and closed as they were left
 * and the same tab. The parts a query shows are pure (searchParts,
 * node-tested); reading and marking the drawn menu needs a DOM.
 */

/**
 * A part of the menu as the search reads it: a row (a setting, a button or a
 * line), a heading over the parts after it until the next heading or rule, a
 * rule, or a group with its own parts.
 * @typedef {{kind: 'row'|'heading'|'rule'|'group', text: string, children?: MenuPart[], el?: Element}} MenuPart
 */

/**
 * The parts a query shows. A row is shown when its own words, with the titles
 * of the groups and the heading it stands under, match: a query naming a
 * group shows the whole group, and «colours text» finds «Text» in the group
 * «Colours». A group is shown when a part inside it is, together with the
 * controls in it that have no words of their own (the picker of the field a
 * group styles, which the words around it name); a heading is shown when a
 * part under it is, and a rule never.
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
/** Tooltips that name a tool on many rows, or a choice inside a picker, not the setting. */
const TOOL_TITLE = '.row-tool, .cp-clear, [popover] *';

/**
 * The words a part is found by: its visible text without the values its
 * controls show, and its tooltips.
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
  const own = el.getAttribute('title');
  if (own) words.push(own);
  for (const tip of el.querySelectorAll('[title]')) {
    if (!tip.matches(TOOL_TITLE)) words.push(tip.getAttribute('title'));
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
    if (el.tagName === 'DETAILS') {
      const summary = el.querySelector(':scope > summary');
      const body = el.querySelector(':scope > .group-items') ?? el;
      parts.push({ kind: 'group', el, text: summary ? partText(summary) : '', children: readParts(body, 'summary') });
    } else if (el.tagName === 'HR') {
      parts.push({ kind: 'rule', el, text: '' });
    } else if (el.matches('.panel-strong, .mini-label')) {
      parts.push({ kind: 'heading', el, text: partText(el) });
    } else {
      parts.push({ kind: 'row', el, text: partText(el) });
    }
  }
  return parts;
}

/**
 * Narrows the search's copy of the areas: a part the query does not show gets
 * `menu-miss`, a group it shows is opened, and an area with nothing left gets
 * `menu-empty`. The area's title and its «No match» line are not parts.
 * @param {Element} root The search's copy of the areas, one child per area
 * @param {(text: string) => boolean} match
 */
export function narrowMenu(root, match) {
  for (const area of root.children) {
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
 * The search as a Svelte attachment on its copy of the areas: narrowed when it
 * is drawn and for every new query, and again whenever the copy changes (a
 * setting that shows or hides others), so it stays narrowed while the owner
 * works in it. Marking the parts changes no child or text, so it never sets
 * the observer off.
 * @param {string} query
 * @param {(text: string, query: string) => boolean} match
 * @returns {(root: Element) => () => void}
 */
export function menuSearch(query, match) {
  return (root) => {
    const run = () => narrowMenu(root, (text) => match(text, query));
    run();
    const observer = new MutationObserver(run);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  };
}
