/**
 * A textarea that grows downwards with its text (ADR-0011: native first).
 * Where the browser has CSS `field-sizing: content` (the class `field-grow` in app.css sets it), the action does nothing.
 * Elsewhere the height follows the content on every input, when the value changes from outside (undo, another tab) and when the panel's width changes the wrapping.
 */

const native = typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('field-sizing', 'content');

/**
 * Svelte action: `use:autogrow={value}`, the value passed so an outside change refits the height.
 * @param {HTMLTextAreaElement} node
 */
export function autogrow(node) {
  if (native) return {};
  const fit = () => {
    node.style.height = 'auto';
    node.style.height = `${node.scrollHeight + node.offsetHeight - node.clientHeight}px`;
  };
  fit();
  queueMicrotask(fit);
  node.addEventListener('input', fit);
  // Only a new width changes the wrapping; refitting on the height the fit itself sets would loop.
  let width = node.clientWidth;
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(() => {
    if (node.clientWidth === width) return;
    width = node.clientWidth;
    fit();
  }) : null;
  observer?.observe(node);
  return {
    // Svelte calls update before it writes the new value, so the fit waits a microtask.
    update: () => queueMicrotask(fit),
    destroy() {
      node.removeEventListener('input', fit);
      observer?.disconnect();
    },
  };
}
