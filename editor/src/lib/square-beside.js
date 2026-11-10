/**
 * An attachment that keeps a thumbnail square at the height of the column beside it (the element after it), measured again as the column changes size.
 * The picture rows use it (the menu's logo, the footer's brand), so the picture stands as tall as its picker and the file's tools together.
 * @param {HTMLElement} node The thumbnail
 * @returns {(() => void) | undefined} The teardown
 */
export function squareBeside(node) {
  const column = node.nextElementSibling;
  if (!(column instanceof HTMLElement)) return undefined;
  const fit = () => {
    const h = column.offsetHeight;
    node.style.width = h ? `${h}px` : '';
    node.style.height = h ? `${h}px` : '';
  };
  const watch = new ResizeObserver(fit);
  watch.observe(column);
  fit();
  return () => watch.disconnect();
}
