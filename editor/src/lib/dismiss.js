/**
 * A Svelte action, `use:dismiss={{ close, opener }}`, for a menu card open in a panel: a press outside the card and its opener, or Escape in it, closes it.
 */
export function dismiss(node, params) {
  let { close, opener } = params ?? {};
  const onDown = (event) => {
    const target = event.target;
    if (node.contains(target) || opener?.contains?.(target)) return;
    close?.();
  };
  const onKey = (event) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    close?.();
    opener?.focus?.();
  };
  document.addEventListener('pointerdown', onDown, true);
  node.addEventListener('keydown', onKey);
  return {
    update(next) {
      ({ close, opener } = next ?? {});
    },
    destroy() {
      document.removeEventListener('pointerdown', onDown, true);
      node.removeEventListener('keydown', onKey);
    },
  };
}
