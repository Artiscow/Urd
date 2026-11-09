/**
 * One group alone in a menu (a tool of the bar with small panels, preview-edit.js and bar-tools.js): an attachment for the menu's areas that hides everything but what `only` names.
 * `fold:<id>` keeps the group whose fold carries that id, its heading left out since the panel's title names it; `loose:<area>` keeps the rows of an area that stand in no group, a group drawn bare being a tool of its own; `area:<area>` keeps the area whole;
 * `look:design` keeps the block's design, the setting row that carries its pin (lib/rows/LookChoice.svelte), its small heading left out as well.
 * The areas' own headings are left out, and an area with nothing kept is hidden; rows that come or go are read again.
 * @param {string} only
 */
export function onlyGroup(only) {
  const [kind, id] = String(only).split(':');
  const HIDE = 'data-only-hidden';
  return (node) => {
    node.dataset.onlyKind = kind;
    const keeps = (child, area) => {
      if (child.matches('.emenu-head, .emenu-title')) return false;
      if (kind === 'fold') return child.matches(`[data-fold="${id}"]`) || Boolean(child.querySelector(`[data-fold="${id}"]`));
      if (kind === 'look') return child.matches(`[data-pin="${id}"]`);
      if (kind === 'loose') return area === id && !child.matches('details.menu-group');
      return area === id;
    };
    const apply = () => {
      for (const col of node.querySelectorAll('[data-area]')) {
        let any = false;
        for (const child of col.children) {
          const keep = keeps(child, col.dataset.area);
          child.toggleAttribute(HIDE, !keep);
          any ||= keep;
        }
        col.toggleAttribute(HIDE, !any);
      }
    };
    apply();
    // The attributes set here are not watched, so the pass never calls itself.
    const watcher = new MutationObserver(apply);
    watcher.observe(node, { childList: true, subtree: true });
    return () => watcher.disconnect();
  };
}

/** The `only` a tool may ask for, `motion` and `placement` (the names the bar of small panels sends) read as the motion's group and the Placement area. */
export function onlyOf(raw) {
  if (raw === 'motion') return 'fold:motion';
  if (raw === 'placement') return 'area:placement';
  return typeof raw === 'string' && /^(fold:[a-z0-9-]+|loose:(content|style)|area:(content|style|placement)|look:design)$/.test(raw) ? raw : null;
}
