/**
 * Kjerneblokk: tekst. Rik tekst (HTML skrevet av sideeieren via editoren)
 * med justering. Innholdet er eierens eget og regnes som betrodd; det er
 * samme tillitsmodell som at eieren kan redigere filene i repoet direkte.
 */
export const textBlock = {
  version: 1,
  label: 'Tekst',
  defaults: () => ({ html: '<p>Ny tekst</p>', align: 'left' }),
  migrations: {},
  /**
   * @param {HTMLElement} el Blokk-elementet (posisjonert av render.js)
   * @param {{html: string, align: string}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    el.classList.add('urd-text');
    el.style.textAlign = props.align;
    el.innerHTML = props.html;

    // Klikk-og-skriv: i preview-modus (inne i editorens iframe) er teksten
    // direkte redigerbar, og hver endring meldes til editoren, som eier
    // utkastet. Blokk-id ligger på elementet (satt av render.js).
    if (ctx.preview) {
      el.contentEditable = 'true';
      el.addEventListener('input', () => {
        window.parent?.postMessage({
          type: 'urd-edit',
          sectionId: ctx.section.id,
          blockId: el.dataset.blockId,
          props: { ...props, html: el.innerHTML },
        }, location.origin);
      });
    }
  },
};
