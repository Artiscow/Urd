/**
 * Lightbox: fullskjermvisning av bilder hos besøkende (og i editorens Ren
 * visning). Lastes kun via dynamic import ved første klikk, så besøkende
 * som aldri klikker et bilde laster den aldri.
 *
 * Ett overlegg på document.body: mørk bakgrunn, sentrert bilde, forrige/
 * neste (skjult ved ett bilde), lukkeknapp og alt-teksten som bildetekst.
 * Esc lukker, piltastene stepper, bakgrunnsklikk lukker. Body-scroll låses
 * mens den er åpen, og fokus går tilbake dit det kom fra ved lukking.
 */
import { stepIndex } from './galleri-model.js';

let overlay = null;
let teardown = null;

export function closeLightbox() {
  teardown?.();
  overlay?.remove();
  overlay = null;
  teardown = null;
}

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

/** De ikke-destruktive fargejusteringene følger med inn i fullvisningen;
 *  utsnitt (fit/fokus/zoom) gjør det ikke: lightboxen viser hele bildet. */
function filterCss(style) {
  const filters = [];
  if (style?.brightness != null && style.brightness !== 1) filters.push(`brightness(${Number(style.brightness) || 1})`);
  if (style?.contrast != null && style.contrast !== 1) filters.push(`contrast(${Number(style.contrast) || 1})`);
  if (style?.saturate != null && style.saturate !== 1) filters.push(`saturate(${Number(style.saturate) || 1})`);
  return filters.join(' ');
}

/**
 * @param {Array<{src: string, alt?: string, style?: object}>} images
 * @param {number} [startIndex]
 */
export function openLightbox(images, startIndex = 0) {
  const list = (images ?? []).filter((img) => img?.src);
  if (!list.length) return;
  closeLightbox();

  const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  let index = Math.min(Math.max(startIndex, 0), list.length - 1);

  overlay = el2('div', 'urd-lightbox');
  const figure = el2('figure', 'urd-lightbox-figure');
  const image = document.createElement('img');
  image.className = 'urd-lightbox-img';
  const caption = el2('figcaption', 'urd-lightbox-caption');
  figure.append(image, caption);
  overlay.appendChild(figure);

  const show = (i) => {
    index = i;
    const entry = list[index];
    image.src = entry.src;
    image.alt = entry.alt ?? '';
    image.style.filter = filterCss(entry.style);
    caption.textContent = entry.alt ?? '';
    caption.style.display = entry.alt ? '' : 'none';
    // Nabobildene forhåndslastes, så blaingen føles umiddelbar.
    for (const delta of [1, -1]) {
      const probe = new Image();
      probe.src = list[stepIndex(index, delta, list.length)].src;
    }
  };

  const step = (delta) => show(stepIndex(index, delta, list.length));

  const navButton = (dir, label, delta) => {
    const btn = el2('button', `urd-lightbox-nav urd-lightbox-${dir}`);
    btn.type = 'button';
    btn.setAttribute('aria-label', label);
    btn.innerHTML = dir === 'prev'
      ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>'
      : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      step(delta);
    });
    return btn;
  };
  if (list.length > 1) {
    overlay.append(navButton('prev', 'Forrige bilde', -1), navButton('next', 'Neste bilde', 1));
  }

  const close = el2('button', 'urd-lightbox-close');
  close.type = 'button';
  close.setAttribute('aria-label', 'Lukk');
  close.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 5l14 14"/><path d="M19 5L5 19"/></svg>';
  close.addEventListener('click', closeLightbox);
  overlay.appendChild(close);

  // Bakgrunnsklikk lukker; klikk på bildet og knappene gjør det ikke.
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === figure) closeLightbox();
  });

  const onKey = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      closeLightbox();
    } else if (event.key === 'ArrowRight') {
      step(1);
    } else if (event.key === 'ArrowLeft') {
      step(-1);
    }
  };
  document.addEventListener('keydown', onKey, true);

  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  teardown = () => {
    document.removeEventListener('keydown', onKey, true);
    document.body.style.overflow = prevOverflow;
    opener?.focus?.();
  };

  show(index);
  document.body.appendChild(overlay);
  close.focus();
}
