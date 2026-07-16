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
        const post = (msg) => window.parent?.postMessage(msg, location.origin);

        // Voks med innholdet: blir teksten høyere enn framen, utvides
        // framen (og seksjonen om nødvendig) så ingenting klippes eller
        // overlapper. Meldes som en samlbar flytting (coalesce), slik at
        // veksten hører til samme angre-steg som skrivingen.
        if (el.scrollHeight > el.clientHeight) {
          const block = ctx.section.blocks.find((b) => b.id === el.dataset.blockId);
          if (block) {
            const rowHeight = ctx.grid?.rowHeight ?? 8;
            const newH = Math.ceil(el.scrollHeight / rowHeight) * rowHeight;
            block.frames.desktop = { ...block.frames.desktop, h: newH };
            el.style.height = `${newH}px`;
            const host = el.closest('.urd-section');
            const needed = block.frames.desktop.y + newH;
            if (host && needed > host.getBoundingClientRect().height) {
              host.style.minHeight = `${needed}px`;
            }
            post({ type: 'urd-move', sectionId: ctx.section.id, blockId: block.id, frame: block.frames.desktop, coalesce: true });
          }
        }

        post({
          type: 'urd-edit',
          sectionId: ctx.section.id,
          blockId: el.dataset.blockId,
          props: { ...props, html: el.innerHTML },
        });
      });
    }
  },
};
