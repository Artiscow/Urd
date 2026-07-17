/**
 * Bakgrunnslag: bilde. Viser en fil fra media/ (eller en data-URL for
 * upubliserte opplastinger i utkast; publisering materialiserer den til
 * en fil, samme flyt som bildeblokken).
 */
export const imageLayer = {
  version: 1,
  label: 'Bilde',
  defaults: () => ({ src: '', fit: 'cover', opacity: 1 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{src: string, fit: 'cover'|'contain', opacity: number}} props
   */
  render(el, props) {
    if (!props.src) return;
    el.style.backgroundImage = `url("${props.src}")`;
    el.style.backgroundSize = props.fit === 'contain' ? 'contain' : 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.opacity = String(props.opacity ?? 1);
  },
};
