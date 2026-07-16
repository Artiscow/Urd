/**
 * Urd-motoren - inngangspunkt.
 *
 * Kjøres av template/index.html. Oppretter det globale Urd-objektet med
 * registrene, registrerer kjernetypene og plugins, finner riktig side fra
 * sideregisteret, og rendrer. All data versjonsløftes ved lasting
 * (migrate.js) - se docs/SKJEMA.md.
 *
 * I preview-modus (?preview=1) lytter motoren i tillegg på postMessage-
 * utkast fra editoren og rerendrer inkrementelt.
 */
import { createRegistry } from './registry.js';
import { applyTheme } from './theme.js';
import { renderPage, renderSection } from './render.js';
import { renderNav } from './nav.js';
import { textBlock } from './blocks/text.js';
import { imageBlock } from './blocks/image.js';
import { buttonBlock } from './blocks/button.js';
import { shapeBlock } from './blocks/shape.js';
import { colorLayer } from './backgrounds/color.js';
import { gradientLayer } from './backgrounds/gradient.js';
import { glowLayer } from './backgrounds/glow.js';
import { grainLayer } from './backgrounds/grain.js';

export const Urd = {
  blocks: createRegistry('blocks'),
  sections: createRegistry('sections'),
  backgrounds: createRegistry('backgrounds'),
  animations: createRegistry('animations'),
};

// Globalt tilgjengelig for plugins (register(Urd)) og editorens preview-bro.
window.Urd = Urd;

function registerCore() {
  Urd.blocks.define('text', textBlock);
  Urd.blocks.define('image', imageBlock);
  Urd.blocks.define('button', buttonBlock);
  Urd.blocks.define('shape', shapeBlock);
  Urd.backgrounds.define('color', colorLayer);
  Urd.backgrounds.define('gradient', gradientLayer);
  Urd.backgrounds.define('glow', glowLayer);
  Urd.backgrounds.define('grain', grainLayer);
}

/**
 * Laster aktive plugins fra plugins/plugins.json. En plugin som feiler
 * stopper aldri siden; dens blokker rendres som plassholdere.
 */
async function loadPlugins() {
  let index;
  try {
    index = await (await fetch('/plugins/plugins.json')).json();
  } catch {
    return; // ingen plugin-indeks er helt greit
  }
  for (const id of index.enabled ?? []) {
    try {
      const manifest = await (await fetch(`/plugins/${id}/plugin.json`)).json();
      // TODO v0.6: valider manifest.requiresEngine mot motorversjonen.
      const mod = await import(`/plugins/${id}/${manifest.entry}`);
      mod.register(Urd);
    } catch (err) {
      console.warn(`Urd: plugin '${id}' kunne ikke lastes`, err);
    }
  }
}

/**
 * Finner siden for gjeldende URL i sideregisteret.
 * ?page=<id> overstyrer (nyttig lokalt, der enkle filservere ikke
 * ruter path-ene); ellers matches location.pathname; fallback er
 * første side i registeret.
 */
function resolvePage(site) {
  const params = new URLSearchParams(location.search);
  const wanted = params.get('page');
  if (wanted) {
    const byId = site.pages.find((p) => p.id === wanted);
    if (byId) return byId;
  }
  const path = location.pathname.replace(/\/$/, '') || '/';
  return site.pages.find((p) => p.path === path) ?? site.pages[0];
}

/** Kobler på postMessage-lytting og høyderapportering i preview-modus. */
function enablePreview(page, site, root) {
  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin) return; // kun editoren på samme site
    const msg = event.data;
    if (msg?.type === 'urd-preview' && msg.section) {
      const host = root.querySelector(`[data-section-id="${msg.section.id}"]`);
      if (host) renderSection(msg.section, site, host, { preview: true });
      const i = page.sections.findIndex((s) => s.id === msg.section.id);
      if (i >= 0) page.sections[i] = msg.section;
    } else if (msg?.type === 'urd-preview-full' && msg.page) {
      renderPage(msg.page, site, root, { preview: true });
    }
    reportHeight();
  });
  const reportHeight = () => {
    window.parent?.postMessage({ type: 'urd-preview-height', px: document.body.scrollHeight }, '*');
  };
  reportHeight();
}

/**
 * Starter motoren.
 * @param {{root: HTMLElement, nav?: HTMLElement}} opts
 */
export async function boot(opts) {
  registerCore();

  const site = await (await fetch('/content/site.json')).json();
  applyTheme(site.theme);
  await loadPlugins();

  if (opts.nav) renderNav(site, opts.nav);

  const entry = resolvePage(site);
  const page = await (await fetch(`/${entry.file}`)).json();
  document.title = `${page.meta.title} - ${site.site.title}`;

  const preview = new URLSearchParams(location.search).get('preview') === '1';
  if (preview) {
    // Editeringslaget lastes dynamisk KUN i preview - besøkende henter
    // aldri denne koden. Må være på plass før første rendering.
    window.UrdPreviewEdit = await import('./preview-edit.js');
    document.body.classList.add('urd-preview');
  }
  renderPage(page, site, opts.root, { preview });
  if (preview) enablePreview(page, site, opts.root);
}
