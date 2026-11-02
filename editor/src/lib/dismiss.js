/**
 * A Svelte action for a menu card that stands open in a panel (the collection's menu, the size presets' measured card): a press outside the card and its own opener, or Escape inside it, closes it.
 * Escape stops at the card, so it never reaches the panel or the page behind it.
 * Usage: `<div use:dismiss={{ close, opener }}>`, where opener is the button that opened the card.
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
