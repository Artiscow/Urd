/**
 * Render-løkka: side → seksjoner → bakgrunnslag + blokker.
 *
 * All data løftes via migrate.lift() før rendering. Ukjente typer og
 * render-feil gir nøytrale plassholdere (blokker) eller hoppes over
 * (bakgrunnslag er dekorative) - siden krasjer aldri av dårlig data.
 *
 * v0.2 rendrer kun desktop-layouten. Mobil (auto-avledet stabling og
 * manuelle mobil-frames) kommer i v0.4.
 */
import { lift } from './migrate.js';

/**
 * Oversetter en frame til CSS-posisjonering.
 * Ren funksjon (ingen DOM), testet i tests/render.test.mjs.
 *
 * Frames er i FYSISKE enheter (schemaVersion 2): x/w i prosent av
 * seksjonsbredden (flyter med skjermen), y/h i px. Gridet er kun et
 * snappeverktøy ved redigering og påvirker aldri plasseringen.
 *
 * @param {{x: number, y: number, w: number, h: number, z?: number, rot?: number}} frame
 * @returns {{left: string, top: string, width: string, height: string, zIndex: string, transform: string}}
 */
export function frameToCss(frame) {
  return {
    left: `${frame.x}%`,
    top: `${frame.y}px`,
    width: `${frame.w}%`,
    height: `${frame.h}px`,
    zIndex: String(frame.z ?? 1),
    transform: frame.rot ? `rotate(${frame.rot}deg)` : '',
  };
}

/**
 * Render en hel side inn i root. Hver seksjon får sitt eget <section>-
 * element, slik at renderSection kan rerendre én seksjon alene senere.
 *
 * @param {object} page Sidefil (content/pages/*.json), allerede parset
 * @param {object} site site.json
 * @param {HTMLElement} root
 * @param {{preview?: boolean}} [opts]
 */
export function renderPage(page, site, root, opts = {}) {
  root.replaceChildren();
  for (const section of page.sections) {
    const host = document.createElement('section');
    root.appendChild(host);
    renderSection(section, site, host, opts);
  }
  // «+ Ny seksjon»-barene mellom seksjonene (kun i preview).
  if (opts.preview) window.UrdPreviewEdit?.enhancePage(root, page, site);
}

/**
 * Render (eller rerender) én seksjon - grunnlaget for inkrementell preview.
 *
 * @param {object} section Seksjonsdata
 * @param {object} site site.json
 * @param {HTMLElement} host Seksjonselementet (tømmes og bygges på nytt)
 * @param {{preview?: boolean}} [opts]
 */
export function renderSection(section, site, host, opts = {}) {
  const Urd = window.Urd;
  const grid = section.grid ?? site.grid;
  const ctx = { site, section, grid, preview: Boolean(opts.preview) };

  host.className = 'urd-section';
  host.dataset.sectionId = section.id;
  host.replaceChildren();

  for (const layer of section.background?.layers ?? []) {
    const el = document.createElement('div');
    el.className = 'urd-bg-layer';
    const lifted = lift(layer, Urd.backgrounds.get(layer.type));
    if (!lifted.ok) {
      console.warn(`Urd: hopper over bakgrunnslag '${layer.type}' (${lifted.placeholder})`);
      continue;
    }
    try {
      Urd.backgrounds.get(layer.type).render(el, lifted.props);
      host.appendChild(el);
    } catch (err) {
      console.warn(`Urd: bakgrunnslag '${layer.type}' feilet under render`, err);
    }
  }

  let maxBottomPx = 0;
  for (const block of section.blocks) {
    const el = document.createElement('div');
    el.className = 'urd-block';
    el.dataset.blockId = block.id;
    const frame = block.frames.desktop;
    Object.assign(el.style, frameToCss(frame));
    maxBottomPx = Math.max(maxBottomPx, frame.y + frame.h);

    const lifted = lift(block, Urd.blocks.get(block.type));
    if (lifted.ok) {
      try {
        Urd.blocks.get(block.type).render(el, lifted.props, ctx);
      } catch (err) {
        console.warn(`Urd: blokk '${block.type}' feilet under render`, err);
        renderPlaceholder(el, block.type);
      }
    } else {
      renderPlaceholder(el, block.type);
    }
    host.appendChild(el);
  }

  // Seksjonen må være høy nok for blokkene sine; brukerens minHeight
  // (f.eks. '85vh') vinner når den er større.
  const neededPx = maxBottomPx;
  const wanted = section.size?.minHeight;
  host.style.minHeight = wanted ? `max(${wanted}, ${neededPx}px)` : `${neededPx}px`;

  // I preview-modus kobles editeringslaget (dra/resize/slett) på etter
  // hver rendering. Satt av urd.js; finnes aldri hos besøkende.
  if (ctx.preview) window.UrdPreviewEdit?.enhanceSection(host, section, grid);
}

/**
 * Nøytral plassholder for ukjente/feilende blokker. Dataene bak er
 * urørt; dette er kun visning (se løfte 2 og ADR-0005).
 * @param {HTMLElement} el
 * @param {string} type
 */
function renderPlaceholder(el, type) {
  el.classList.add('urd-placeholder');
  el.textContent = type;
  el.title = `Blokktypen '${type}' er ikke tilgjengelig (mangler plugin eller nyere Urd?)`;
}
