/**
 * Kjerneblokk: lyd. Native `<audio controls>` med git-eid fil fra media/
 * (CSP-ens default-src 'self' dekker avspillingen; ingen tredjepart, ingen
 * sporing). Valgfri tittel over spilleren; preload="metadata" så bare
 * varigheten hentes før avspilling.
 */
// Kun kalt i preview (etter at admin-ordboka er lastet): aldri på modulnivå.
import { ta, adminLocaleReady } from '../i18n.js';

export const audioBlock = {
  version: 1,
  // Naturlig høyde i mobil-radnettet (spillerens høyde er nettleserens).
  autoGrow: true,
  label: 'Lyd',
  labelKey: 'blocks.audio',
  defaults: () => ({ src: '', title: '', loop: false }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{src?: string, title?: string, loop?: boolean}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
    // Uten fil: rolig plassholder i editoren; besøkende ser ingenting.
    if (!props.src) {
      if (ctx.preview) {
        const empty = document.createElement('div');
        empty.className = 'urd-audio-empty';
        adminLocaleReady.then(() => {
          if (empty.isConnected) empty.textContent = ta('canvas.audioEmpty');
        });
        el.appendChild(empty);
      }
      return;
    }

    const host = document.createElement('div');
    host.className = 'urd-audio';
    el.appendChild(host);

    if (props.title) {
      const title = document.createElement('div');
      title.className = 'urd-audio-tittel';
      title.textContent = props.title;
      host.appendChild(title);
      if (editable) {
        try {
          title.contentEditable = 'plaintext-only';
        } catch {
          title.contentEditable = 'true';
        }
        title.addEventListener('input', () => {
          window.parent?.postMessage({
            type: 'urd-edit',
            sectionId: ctx.section.id,
            blockId: el.dataset.blockId,
            props: { ...props, title: title.textContent ?? '' },
          }, location.origin);
        });
      }
    }

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.preload = 'metadata';
    if (props.loop) audio.loop = true;
    audio.src = props.src;
    host.appendChild(audio);

    if (editable) {
      // Hjelpechipen (ADR-0008): filvalg og størrelseshensyn trenger forklaring.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintAudio.title'),
          lines: [ta('hintAudio.l1'), ta('hintAudio.l2'), ta('hintAudio.l3')],
        });
      });
    }
  },
};
