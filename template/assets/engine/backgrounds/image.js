/**
 * Bakgrunnslag: bilde. Viser en fil fra media/ (eller en data-URL for
 * upubliserte opplastinger i utkast; publisering materialiserer den til
 * en fil, samme flyt som bildeblokken).
 *
 * x/y (0..1) er fokuspunktet (background-position), blur i px lar bildet
 * fungere som stemningsbakgrunn bak tekst. Alle felt utover src er
 * additive med trygge standarder.
 */
export const imageLayer = {
  version: 1,
  label: 'Bilde',
  defaults: () => ({ src: '', fit: 'cover', x: 0.5, y: 0.5, opacity: 1, blur: 0 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{src: string, fit: 'cover'|'contain'|'repeat', x?: number, y?: number, opacity?: number, blur?: number}} props
   */
  render(el, props) {
    if (!props.src) return;
    el.style.backgroundImage = `url("${props.src}")`;
    if (props.fit === 'repeat') {
      el.style.backgroundSize = 'auto';
      el.style.backgroundRepeat = 'repeat';
    } else {
      el.style.backgroundSize = props.fit === 'contain' ? 'contain' : 'cover';
      el.style.backgroundRepeat = 'no-repeat';
    }
    el.style.backgroundPosition = `${(props.x ?? 0.5) * 100}% ${(props.y ?? 0.5) * 100}%`;
    el.style.opacity = String(props.opacity ?? 1);
    // Litt overskalering ved blur, så kantene ikke "blør" transparent.
    if (props.blur > 0) {
      el.style.filter = `blur(${props.blur}px)`;
      el.style.inset = `-${props.blur * 2}px`;
    }
  },
};
