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
import { liftPageFile, liftSiteFile } from './migrate.js';
import { applyTheme } from './theme.js';
import { renderPage, renderSection } from './render.js';
import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { textBlock } from './blocks/text.js';
import { imageBlock } from './blocks/image.js';
import { buttonBlock } from './blocks/button.js';
import { shapeBlock } from './blocks/shape.js';
import { videoBlock } from './blocks/video.js';
import { iconBlock } from './blocks/icon.js';
import { samlingBlock } from './blocks/samling.js';
import { colorLayer } from './backgrounds/color.js';
import { gradientLayer } from './backgrounds/gradient.js';
import { glowLayer } from './backgrounds/glow.js';
import { grainLayer } from './backgrounds/grain.js';
import { imageLayer } from './backgrounds/image.js';
import { coreAnimations } from './animations/core.js';
import { registerSectionPresets } from './sections/presets.js';
import { loadPlugins, loadPluginList } from './plugins.js';
import { setCollectionsDraft } from './samlinger.js';

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
  Urd.blocks.define('video', videoBlock);
  Urd.blocks.define('icon', iconBlock);
  Urd.blocks.define('samling', samlingBlock);
  Urd.backgrounds.define('color', colorLayer);
  Urd.backgrounds.define('gradient', gradientLayer);
  Urd.backgrounds.define('glow', glowLayer);
  Urd.backgrounds.define('grain', grainLayer);
  Urd.backgrounds.define('image', imageLayer);
  for (const [id, def] of Object.entries(coreAnimations)) Urd.animations.define(id, def);
  registerSectionPresets(Urd);
}

/**
 * Motorversjonen fra urd.json: grunnlaget for pluginenes requiresEngine-sjekk.
 * Utilgjengelig manifest gir '0.0.0', som avviser versjonskravene i stedet for å laste i blinde.
 */
async function engineVersion() {
  try {
    return (await (await fetch('/urd.json')).json()).engine ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

/**
 * «Til toppen»-pil: dukker opp nede til høyre etter et stykke scrolling.
 */
function mountToTop() {
  const btn = document.createElement('button');
  btn.className = 'urd-totop';
  btn.textContent = '↑';
  btn.title = 'Til toppen';
  btn.setAttribute('aria-label', 'Til toppen av siden');
  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  document.body.appendChild(btn);
  const toggle = () => btn.classList.toggle('vis', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

/**
 * Nettstedsikonet (favicon) fra site.json: overstyrer standard-ikonet i
 * index.html. Additivt felt; uten ikon beholdes Urd-merket.
 */
function applyFavicon(href) {
  if (!href) return;
  // Kun kjente ikonformer (data:image base64 eller site-relativ sti); samme ankrede regex-vokter som admin, jf. CodeQL-funnene på favicon-flyten.
  if (typeof href !== 'string') return;
  if (!/^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/.test(href)) return;
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = href;
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

/**
 * Kobler på postMessage-lytting og høyderapportering i preview-modus.
 * state = { page, site, viewport } deles med boot, slik at breakpoint-
 * bytte og editor-meldinger alltid jobber på samme data.
 */
function enablePreview(state, opts) {
  const root = opts.root;
  const vp = () => ({ preview: true, viewport: state.viewport });
  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin) return; // kun editoren på samme site
    const msg = event.data;
    if (msg?.type === 'urd-preview' && msg.section) {
      const host = root.querySelector(`[data-section-id="${msg.section.id}"]`);
      if (host) renderSection(msg.section, state.site, host, vp());
      const i = state.page.sections.findIndex((s) => s.id === msg.section.id);
      if (i >= 0) state.page.sections[i] = msg.section;
    } else if (msg?.type === 'urd-preview-full' && msg.page) {
      state.page = msg.page;
      renderPage(state.page, state.site, root, vp());
    } else if (msg?.type === 'urd-chrome') {
      // Ren visning: skjul/vis editeringshåndtakene (kun CSS, se base.css).
      document.body.classList.toggle('urd-chrome-off', !msg.visible);
    } else if (msg?.type === 'urd-show-grid') {
      // Grid-menyen i editoren er åpen: vis gridet i alle seksjoner.
      window.UrdPreviewEdit?.toggleGridOverlays(msg.visible, state.page, state.site);
    } else if (msg?.type === 'urd-place-block' && msg.block) {
      // Paletten: finn plassering midt i synsfeltet og meld tilbake.
      window.UrdPreviewEdit?.placeBlock(msg.block, root);
    } else if (msg?.type === 'urd-demo-anim' && msg.sectionId) {
      // Editoren endret en animasjon: spill den én gang som demo.
      const host = root.querySelector(`[data-section-id="${msg.sectionId}"]`);
      const el = msg.blockId ? host?.querySelector(`[data-block-id="${msg.blockId}"]`) : host;
      window.UrdPreviewEdit?.demoAnimation(el);
    } else if (msg?.type === 'urd-attention' && msg.sectionId) {
      // Editoren oppdaget desktop-drift i en manuell seksjon: marker live.
      root.querySelector(`[data-section-id="${msg.sectionId}"]`)
        ?.classList.toggle('urd-attention', msg.needed !== false);
    } else if (msg?.type === 'urd-collections' && msg.collections) {
      // Samlingsutkast fra editoren: brukes i stedet for serverfilene, og alt som viser samlinger rendres på nytt.
      setCollectionsDraft(msg.collections);
      renderPage(state.page, state.site, root, vp());
    } else if (msg?.type === 'urd-close-menus') {
      // Eieren klikket i admin-panelene: lukk åpne menyer (preset-galleri, blokkmeny).
      window.UrdPreviewEdit?.closeMenus();
    } else if (msg?.type === 'urd-duplicate') {
      // Ctrl+D med fokus i admin-panelene: dupliser markert blokk i previewen.
      window.UrdPreviewEdit?.duplicateSelected();
    } else if (msg?.type === 'urd-plugins') {
      // Editorens plugin-utkast: last de aktiverte pluginene (filene ligger alt i repoet)
      // og rerendr, så plugins virker i forhåndsvisningen FØR publisering.
      loadPluginList(Urd, state.engine, msg.enabled).then(() => {
        renderPage(state.page, state.site, root, vp());
        // Meld plugin-blokkene tilbake (type, label, defaults), så Blokker-
        // panelet i admin kan vise dem i sin egen «Fra plugins»-seksjon.
        const blocks = [];
        for (const type of Urd.blocks.ids()) {
          const def = Urd.blocks.get(type);
          if (!def?.fromPlugin) continue;
          blocks.push({
            type,
            label: def.label ?? type,
            version: def.version ?? 1,
            plugin: def.fromPlugin,
            defaults: def.defaults ? def.defaults() : {},
            variants: Array.isArray(def.variants)
              ? def.variants.map((v) => ({ label: v.label, props: v.props ?? {} }))
              : [],
          });
        }
        window.parent?.postMessage({ type: 'urd-plugin-blocks', blocks }, location.origin);
      });
    } else if (msg?.type === 'urd-viewport' && (msg.mode === 'desktop' || msg.mode === 'mobile')) {
      // Forhåndsvisningen følger editorens visningsvalg, aldri iframe-bredden:
      // et smalt admin-vindu skal ikke vippe previewen til mobil og gjemme strukturverktøyene.
      state.viewport = msg.mode;
      document.body.classList.toggle('urd-mobile', state.viewport === 'mobile');
      renderPage(state.page, state.site, root, vp());
    } else if (msg?.type === 'urd-site' && msg.site) {
      // Site-utkast fra editoren (grid, tema, nav): alt som avhenger av
      // site.json rendres på nytt. Samme amputert-vern som i boot(): et
      // utkast uten disse delene skal aldri kaste og fryse previewen.
      state.site = msg.site;
      state.site.site ??= { title: '', lang: 'no' };
      state.site.pages ??= [];
      state.site.theme ??= { version: 1, tokens: {} };
      state.site.nav ??= { version: 1, items: [] };
      applyTheme(state.site.theme);
      applyFavicon(state.site.site?.icon);
      if (opts.nav) renderNav(state.site, opts.nav);
      if (opts.footer) renderFooter(state.site, opts.footer);
      renderPage(state.page, state.site, root, vp());
    }
  });

  // Meld fra til editoren at lytteren er koblet på: utkast som sendes
  // før dette punktet ville gått tapt (iframe-load skjer før boot er ferdig).
  // (Den gamle urd-preview-height-kanalen er fjernet: ingen lyttet på den,
  // og iframen er CSS-dimensjonert i editoren.)
  window.parent?.postMessage({ type: 'urd-ready' }, location.origin);
}

/**
 * Starter motoren.
 * @param {{root: HTMLElement, nav?: HTMLElement}} opts
 */
export async function boot(opts) {
  registerCore();

  // Råfilen beholdes som migreringskontekst: v1-sideløftet trenger det
  // OPPRINNELIGE gridet (columns/rowHeight), som det løftede sitet har mistet.
  const rawSite = await (await fetch('/content/site.json')).json();
  const site = liftSiteFile(rawSite);
  const preview = new URLSearchParams(location.search).get('preview') === '1';
  // Motoren tåler amputert site.json: manglende deler får tomme standarder i stedet for krasj (siden dør aldri av dårlig data).
  site.site ??= { title: '', lang: 'no' };
  site.pages ??= [];
  site.theme ??= { version: 1, tokens: {} };
  site.nav ??= { version: 1, items: [] };
  applyTheme(site.theme);
  applyFavicon(site.site.icon);
  const engine = await engineVersion();
  // I preview eier EDITOREN plugin-listen (utkastet i plugins.json): boot laster ingenting,
  // og urd-plugins-meldingen laster utkastets aktive plugins så de virker før publisering.
  if (!preview) await loadPlugins(Urd, engine);

  if (opts.nav) renderNav(site, opts.nav);
  // Delt footer: eget element rett etter hovedinnholdet (index.html er
  // Urd-eid og kan ikke endres av publisering, så elementet lages her).
  opts.footer = document.createElement('footer');
  opts.footer.id = 'urd-footer';
  opts.root.insertAdjacentElement('afterend', opts.footer);
  renderFooter(site, opts.footer);
  mountToTop();

  // Tomt sideregister (håndredigert site.json) gir en tom side, ikke krasj.
  const entry = resolvePage(site) ?? { id: 'tom', title: '', file: 'content/pages/finnes-ikke.json' };
  // Versjonsløfting på filnivå: eldre sidefiler løftes til gjeldende
  // format i minnet (disk skrives først ved neste publisering).
  // Mangler sidefilen (halvferdig deploy, håndredigert register), vises
  // en tom side i stedet for krasj - siden dør aldri av dårlig data.
  let page;
  try {
    page = liftPageFile(await (await fetch(`/${entry.file}`)).json(), rawSite);
  } catch {
    console.warn(`Urd: fant ikke sidefilen '${entry.file}' - viser tom side`);
    page = { schemaVersion: 3, meta: { id: entry.id, title: entry.title }, sections: [] };
  }
  document.title = `${page.meta?.title ?? entry.title ?? ''} - ${site.site.title}`;

  if (preview) {
    // Editeringslaget lastes dynamisk KUN i preview - besøkende henter
    // aldri denne koden. Må være på plass før første rendering.
    window.UrdPreviewEdit = await import('./preview-edit.js');
    document.body.classList.add('urd-preview');
  }

  // Responsivt: viewporten følger skjermbredden (også i editorens
  // preview, der iframen smales til mobilbredde). Ved kryssing av
  // breakpointet rendres siden på nytt i riktig modus.
  const mq = window.matchMedia(`(max-width: ${site.breakpoints?.mobile ?? 640}px)`);
  // I preview eier editoren viewporten (urd-viewport-meldingen); hos besøkende følger den skjermbredden.
  const state = { page, site, engine, viewport: preview ? 'desktop' : (mq.matches ? 'mobile' : 'desktop') };
  document.body.classList.toggle('urd-mobile', state.viewport === 'mobile');

  renderPage(state.page, state.site, opts.root, { preview, viewport: state.viewport });

  if (!preview) {
    mq.addEventListener('change', (event) => {
      state.viewport = event.matches ? 'mobile' : 'desktop';
      document.body.classList.toggle('urd-mobile', state.viewport === 'mobile');
      renderPage(state.page, state.site, opts.root, { preview, viewport: state.viewport });
    });
  }

  if (preview) enablePreview(state, opts);
}
