/**
 * Kjerneblokk: bilde. Viser en fil fra media/ (eller en data-URL for
 * upubliserte opplastinger i utkast). Med href blir bildet en lenke,
 * som også dekker logo-bruk.
 */
export const imageBlock = {
  version: 1,
  label: 'Bilde',
  defaults: () => ({
    src: '', alt: '', fit: 'cover', radius: 'md', href: null,
    // Additive felt fra v0.5: fokuspunkt (0..1) og ikke-destruktive
    // CSS-justeringer (1 = nøytral).
    x: 0.5, y: 0.5, brightness: 1, contrast: 1, saturate: 1,
  }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{src: string, alt: string, fit: 'cover'|'contain', radius: string|null, href: string|null}} props
   * @param {object} ctx
   */
  render(el, props, ctx) {
    // Uten bilde: rolig plassholder i editoren; besøkende ser ingenting.
    if (!props.src) {
      if (ctx.preview) {
        const empty = document.createElement('div');
        empty.className = 'urd-image-empty';
        empty.textContent = 'Velg bilde i Egenskaper';
        el.appendChild(empty);
      }
      return;
    }
    const img = document.createElement('img');
    img.src = props.src;
    img.alt = props.alt ?? '';
    img.draggable = false;
    img.style.cssText = 'width:100%;height:100%;display:block;';
    // Store bilder dekodes stripevis mens de laster (ser ut som en
    // gradvis «inntoning» ovenfra): hold bildet usynlig til det er
    // FERDIG, og vis det komplett med en gang. Cachede bilder berøres ikke.
    if (!img.complete) {
      img.style.visibility = 'hidden';
      img.addEventListener('load', () => { img.style.visibility = ''; }, { once: true });
      img.addEventListener('error', () => { img.style.visibility = ''; }, { once: true });
    }
    img.style.objectFit = props.fit ?? 'cover';
    // Fokuspunkt: hvilken del av bildet som beholdes ved beskjæring.
    img.style.objectPosition = `${(props.x ?? 0.5) * 100}% ${(props.y ?? 0.5) * 100}%`;
    // Ikke-destruktive justeringer (CSS-filter; 1 = nøytral).
    const filters = [];
    if (props.brightness != null && props.brightness !== 1) filters.push(`brightness(${props.brightness})`);
    if (props.contrast != null && props.contrast !== 1) filters.push(`contrast(${props.contrast})`);
    if (props.saturate != null && props.saturate !== 1) filters.push(`saturate(${props.saturate})`);
    if (filters.length) img.style.filter = filters.join(' ');
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
