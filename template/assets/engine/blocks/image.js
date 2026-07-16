/**
 * Kjerneblokk: bilde. Viser en fil fra media/ (eller en data-URL for
 * upubliserte opplastinger i utkast). Med href blir bildet en lenke,
 * som også dekker logo-bruk.
 */
export const imageBlock = {
  version: 1,
  label: 'Bilde',
  defaults: () => ({ src: '', alt: '', fit: 'cover', radius: 'md', href: null }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{src: string, alt: string, fit: 'cover'|'contain', radius: string|null, href: string|null}} props
   * @param {object} ctx
   */
  render(el, props, ctx) {
    const img = document.createElement('img');
    img.src = props.src;
    img.alt = props.alt ?? '';
    img.draggable = false;
    img.style.cssText = 'width:100%;height:100%;display:block;';
    img.style.objectFit = props.fit ?? 'cover';
    if (props.radius) img.style.borderRadius = `var(--urd-radius-${props.radius})`;

    if (props.href && !ctx.preview) {
      const a = document.createElement('a');
      a.href = props.href;
      a.appendChild(img);
      el.appendChild(a);
    } else {
      el.appendChild(img);
    }
  },
};
