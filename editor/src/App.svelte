<script>
  // Editor-skallet for v0.2 «tynn skive»: preview-iframe med den ekte
  // siden, klikk-og-skriv på tekstblokker, utkast i localStorage og
  // publiseringsknapp mot /api/github/commit.
  import { createDraftStore } from './lib/draftStore.js';
  import ColorPicker from './lib/ColorPicker.svelte';
  import GlyphPicker from './lib/GlyphPicker.svelte';
  import { createPreviewBridge } from './lib/previewBridge.js';
  import { previewScale } from './lib/preview-scale.js';
  import Dropdown from './lib/Dropdown.svelte';
  import IconEditor from './lib/IconEditor.svelte';
  // Editoren deler migreringskoden med motoren (samme fil, bundles inn).
  import { lift, liftPageFile, liftSiteFile } from '../../template/assets/engine/migrate.js';
  import { ta, adminLang as currentAdminLang } from '../../template/assets/engine/i18n.js';
  import { validateManifest, satisfiesEngine } from '../../template/assets/engine/plugins.js';
  import { makeId } from '../../template/assets/engine/sections/presets.js';
  // Bakgrunns- og animasjonsdefinisjonene gjenbrukes for etiketter og
  // standardverdier, så editor og motor aldri drifter fra hverandre.
  import { colorLayer } from '../../template/assets/engine/backgrounds/color.js';
  import { gradientLayer } from '../../template/assets/engine/backgrounds/gradient.js';
  import { glowLayer } from '../../template/assets/engine/backgrounds/glow.js';
  import { grainLayer } from '../../template/assets/engine/backgrounds/grain.js';
  import { imageLayer } from '../../template/assets/engine/backgrounds/image.js';
  import { bildegalleriLayer } from '../../template/assets/engine/backgrounds/bildegalleri.js';
  import { footerThumb } from '../../template/assets/engine/footer-thumb.js';
  import { coreAnimations } from '../../template/assets/engine/animations/core.js';
  import { SECTION_THEME_LABELS, contrastRatio, relativeLuminance, buildThemeCss } from '../../template/assets/engine/theme.js';
  import { compressToWebp, svgToDataUrl, tightSvgViewBox, svgViewBox, slugify, contentHash, mediaExtension, WARN_BYTES } from '../../template/assets/engine/imageTools.js';
  import { FONT_STACKS } from '../../template/assets/engine/fonts.js';
  import { frameAtPoint } from '../../template/assets/engine/place.js';
  import { iconSvg, ICON_CATEGORIES, ICON_LIBRARY } from '../../template/assets/engine/icons.js';

  /** Bakgrunnslagtypene i den rekkefølgen de tilbys i panelet. */
  const BG_TYPES = [
    ['color', colorLayer],
    ['gradient', gradientLayer],
    ['glow', glowLayer],
    ['image', imageLayer],
    ['bildegalleri', bildegalleriLayer],
    ['grain', grainLayer],
  ];
  const BG_DEFS = Object.fromEntries(BG_TYPES);

  /** Tegnede SVG-ikoner (strek-stil, currentColor) - aldri emoji. */
  const ICONS = {
    desktop: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/></svg>',
    copy: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8" y="3" width="8" height="18" rx="2"/><path d="M11 17.5h2"/></svg>',
    pencil: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z"/></svg>',
    eye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    warn: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L2 20h20L12 3z"/><path d="M12 10v4"/><path d="M12 17.2h.01"/></svg>',
    up: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V4"/><path d="M5 11l7-7 7 7"/></svg>',
    down: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="M5 13l7 7 7-7"/></svg>',
    right: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
    cross: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 5l14 14"/><path d="M19 5L5 19"/></svg>',
    plus: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
    minus: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    gear: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    guides: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17"/></svg>',
    fit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4"/></svg>',
  };

  /**
   * Adminens eget fargetema (KUN editoren - nettsidens tema styres av
   * brukeren i Tema-panelet). Velges i topplinjen, lagres per nettleser.
   * Palettene er definert som CSS-variabler i stilblokken under.
   */
  const ADMIN_THEMES = [
    ['lilla', ta('adminTheme.lilla')],
    ['bronn', ta('adminTheme.bronn')],
    ['gull', ta('adminTheme.gull')],
    ['graa', ta('adminTheme.graa')],
    ['nordlys', ta('adminTheme.nordlys')],
    ['skumring', ta('adminTheme.skumring')],
    ['glo', ta('adminTheme.glo')],
  ];
  let adminTheme = $state(localStorage.getItem('urd-admin-theme') ?? 'graa');

  $effect(() => {
    document.documentElement.dataset.adminTheme = adminTheme;
    localStorage.setItem('urd-admin-theme', adminTheme);
    sendAdminTheme();
  });

  /** Melder adminens temafarger til previewen: editor-menyene der inne
   *  (blokkmenyen, seksjonsgalleriet) følger admin, ikke siden. Leses
   *  fra dokumentets faktiske variabler, så palettene bor ett sted. */
  function sendAdminTheme() {
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue('--urd-color-accent').trim();
    bridge?.sendAdminTheme({
      bg: style.getPropertyValue('--urd-color-bg').trim(),
      surface: style.getPropertyValue('--urd-color-surface').trim(),
      accent,
      text: style.getPropertyValue('--urd-color-text').trim(),
      // Lesbar tekst PÅ admin-aksenten: chromen brukte hardkodet hvit, som ga
      // lav kontrast på lyse admin-aksenter (Gull/Glo). Velg svart/hvit etter
      // aksentens luminans, så «hvit på lys» aldri oppstår.
      'accent-text': readableOn(accent),
    });
  }

  /** Svart eller hvit tekst - det som har best WCAG-kontrast mot bakgrunnen. */
  function readableOn(bg) {
    const l = relativeLuminance(bg);
    if (l == null) return '#ffffff';
    return (contrastRatio(bg, '#ffffff') ?? 0) >= (contrastRatio(bg, '#0b0e14') ?? 0) ? '#ffffff' : '#0b0e14';
  }

  let site = $state(null);
  let pageId = $state(null);
  let dirty = $state(false);
  let status = $state('');
  /** 'info' | 'ok' | 'error' - styrer fargen på status-chipen */
  let statusKind = $state('info');
  let statusSeq = 0;

  /** Sett statusmeldingen; 'ok'-meldinger rydder seg selv etter 8 s. */
  function setStatus(msg, kind = 'info') {
    status = msg;
    statusKind = kind;
    const mine = ++statusSeq;
    if (kind === 'ok') {
      setTimeout(() => {
        if (statusSeq === mine) {
          status = '';
          statusKind = 'info';
        }
      }, 8000);
    }
  }
  /** Felles feilmelding når et utkast ikke får plass i localStorage (delt av alle draftStores). */
  function draftSaveError() {
    setStatus(ta('status.storageFull'), 'error');
  }

  /** Direkte utkast-skriving (utenom draftStore) med samme kvotevern. */
  function writeDraftKey(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      draftSaveError();
    }
  }

  let iframeEl = $state(null);
  /** null = publiseringslag utilgjengelig (f.eks. enkel lokalserver uten functions) */
  let auth = $state(null);
  /** Speil av site-utkastets grid: kvadratiske ruter, én størrelse */
  let grid = $state({ size: 16, snap: true });

  /** Ren forhåndsvisning: skjuler alle editeringshåndtak i iframen */
  let chromeVisible = $state(true);

  /** Editorens visning: 'desktop' eller 'mobile' (iframe smales til
   *  mobilbredde; motorens matchMedia bytter modus selv). */
  let viewMode = $state('desktop');

  // Skalert lerret: iframen rendrer siden i full vindus-viewport (samme som en
  // besøkende med fullt vindu) og skaleres ned for å passe .frame-wrap, i stedet
  // for å reflowe inn i restplassen etter chromen. Da er render-en identisk med
  // publisert; kun visningsstørrelsen (zoom) endres. Se lib/preview-scale.js.
  const MOBILE_W = 390;
  let frameWrapEl = $state(null);
  let frameW = $state(0);            // .frame-wrap sin målte innerflate (px)
  let frameH = $state(0);
  let winW = $state(typeof window !== 'undefined' ? window.innerWidth : 1280);
  /** Zoom for redigerings-lerretet: 'fit' tilpasser vinduet, 'full' = ekte 1:1. */
  let zoomMode = $state('fit'); // 'fit' | 'manual' (steppes med +/-)
  let manualZoom = $state(1);
  let targetW = $derived(viewMode === 'mobile' ? MOBILE_W : winW);
  // Skalaen er BREDDE-drevet: siden rendrer i full målbredde og skaleres til
  // rammebredden. Iframen gjøres tilsvarende høyere (frameH/scale), så den
  // SKALERTE høyden fyller .frame-wrap - ingen topp/bunn-barer; siden scroller
  // inni iframen som en ekte side.
  let scale = $derived(zoomMode === 'manual' ? manualZoom : previewScale(frameW, targetW, 'fit'));

  /** Zoom-stepperne: 10 %-poengs trinn fra gjeldende visning, klemt 10-400 %. */
  function stepZoom(dir) {
    const next = Math.min(400, Math.max(10, (Math.round(Math.round(scale * 100) / 10) + dir) * 10));
    manualZoom = next / 100;
    zoomMode = 'manual';
  }
  let iframeH = $derived(scale > 0 ? frameH / scale : frameH);
  let stageW = $derived(targetW * scale);
  let stageH = $derived(frameH);

  // Klikk hvor som helst i admin (paneler, topplinje) lukker åpne menyer i forhåndsvisningen;
  // iframens egne utenfor-klikk-lyttere ser aldri disse klikkene.
  $effect(() => {
    const closeMenus = () => bridge?.sendCloseMenus();
    document.addEventListener('pointerdown', closeMenus, true);
    return () => document.removeEventListener('pointerdown', closeMenus, true);
  });

  // Forhåndsvisningens viewport følger visningsvalget, ikke iframe-bredden:
  // et smalt admin-vindu skal aldri vippe previewen til mobil og gjemme strukturverktøyene.
  $effect(() => {
    const mode = viewMode;
    bridge?.sendViewport(mode);
  });

  // Målviewporten følger det levende vinduets indre mål.
  $effect(() => {
    const onResize = () => { winW = window.innerWidth; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  // .frame-wrap endrer størrelse ved panel/skinne åpne-lukke OG vindus-resize;
  // mål den så skalaen alltid passer den faktiske lerretsflaten.
  $effect(() => {
    const el = frameWrapEl;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      frameW = r.width; frameH = r.height;
    };
    measure(); // umiddelbart, så første ramme ikke blinker på scale 1
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  });
  /** Antall seksjoner på siden som trenger mobil-tilsyn */
  let attentionCount = $state(0);

  function updateAttention() {
    attentionCount = store?.data.sections
      .filter((s) => s.responsive?.mobile?.attention?.needed).length ?? 0;
  }

  /**
   * Desktop-strukturendring i en manuelt mobil-tilpasset seksjon:
   * flagg seksjonen for mobil-tilsyn (regler i docs/SKJEMA.md#mobil-tilsyn).
   */
  function markDesktopChange(section, reason) {
    if (!section || section.responsive?.mobile?.mode !== 'manual') return;
    if (section.responsive.mobile.attention?.needed) return;
    section.responsive.mobile.attention = {
      needed: true,
      reason,
      since: new Date().toISOString(),
    };
    updateAttention();
    bridge?.sendAttention(section.id, true);
  }

  let store = null;
  let siteStore = null;
  let bridge = null;

  /**
   * Reaktivt speil av site-UTKASTET (sider, nav, tema): panelene leser og
   * muterer dette. `site` er den PUBLISERTE tilstanden og brukes kun som
   * diff-grunnlag ved publisering (slettede/flyttede sider).
   */
  let siteDraft = $state(null);

  /** Kobler siteDraft og siteStore til samme objekt (via Svelte-proxyen). */
  function linkSiteDraft() {
    siteDraft = siteStore.data;
    siteStore.replace(siteDraft);
  }

  /**
   * Site-utkastet til forhåndsvisningen. ALLTID via denne: siteDraft er
   * en Svelte-proxy, og postMessage (structured clone) kaster
   * DataCloneError på proxier - $state.snapshot gir et rent objekt.
   */
  function pushSiteToPreview() {
    bridge?.sendSite($state.snapshot(siteDraft));
  }

  /**
   * Nypubliserte sider som ennå ikke finnes på serveren: utkastet beholdes
   * som kilde til deployen er ferdig, men skal ikke telle som «upublisert».
   * Ryddes automatisk når siden lastes fra serveren første gang.
   */
  const pendingPublished = new Set();

  const pageEntry = () => siteDraft.pages.find((p) => p.id === pageId);

  function updateDirty() {
    // Utkast på ALLE sider teller, ikke bare den man står på - men ikke
    // nypubliserte som bare venter på deploy.
    const anyPageDraft = siteDraft?.pages?.some((p) =>
      !pendingPublished.has(p.id) && localStorage.getItem(`urd-draft-${p.id}`) !== null) ?? false;
    const anySamlingDraft = samlingerIndexStore?.hasDraft()
      || Object.values(samlingStores).some((st) => st.hasDraft());
    dirty = anyPageDraft
      || (store?.hasDraft() && !pendingPublished.has(pageId))
      || siteStore?.hasDraft() || pluginsStore?.hasDraft() || anySamlingDraft || false;
  }

  /**
   * Angre/gjenta: snapshot-basert historikk over side-, site-, samling- og
   * plugin-utkastene. pushHistory kalles FØR hver mutasjon; tastene brukes
   * til å slå sammen skurer av samme handling (hvert tastetrykk i en
   * tekstblokk skal ikke bli hvert sitt angre-steg).
   */
  const history = [];
  const redoStack = [];
  let lastHistoryKey = null;

  function snapshot() {
    // pageId følger med: angring på tvers av sidebytter må legge sideinnholdet tilbake på SIDEN det kom fra, ikke i gjeldende sides utkast.
    // Samlinger/plugins er null til init-flyten deres er FERDIG (samlingerReady-flagget, ikke bare at indeks-storen finnes: stores fylles asynkront etterpå, og et snapshot fra det vinduet ville manglet samlinger som en angring så ville slettet); restore hopper over null-delene.
    return JSON.stringify({
      pageId,
      page: store.data,
      site: siteStore.data,
      samlingerIndex: samlingerReady ? samlingerIndexStore.data : null,
      samlinger: samlingerReady
        ? Object.fromEntries(Object.entries(samlingStores).map(([id, st]) => [id, st.data]))
        : {},
      plugins: pluginsStore?.data ?? null,
    });
  }

  function pushHistory(key) {
    if (key === lastHistoryKey && (key.startsWith('edit:') || key.startsWith('grid:'))) return;
    history.push(snapshot());
    if (history.length > 50) history.shift();
    redoStack.length = 0;
    lastHistoryKey = key;
  }

  function restore(snap) {
    const { pageId: snapPageId, page, site: siteSnap, samlingerIndex, samlinger, plugins } = JSON.parse(snap);
    siteStore.replace(siteSnap);
    linkSiteDraft();
    siteStore.save();
    grid = { snap: true, ...siteDraft.grid };
    pushSiteToPreview();
    // Samlinger/plugins gjenopprettes FØR sidebytte-grenen under, ellers ville kryss-side-angring miste de delene av snapshotet.
    restoreSamlinger(samlingerIndex, samlinger ?? {});
    restorePlugins(plugins);

    // Snapshotet hører til en annen side (angring over et sidebytte): legg sideinnholdet tilbake som utkast DER, og bytt dit.
    if (snapPageId && snapPageId !== pageId && siteDraft.pages.some((p) => p.id === snapPageId)) {
      writeDraftKey(`urd-draft-${snapPageId}`, JSON.stringify(page));
      selectPage(snapPageId, { keepHistory: true });
      updateDirty();
      return;
    }

    store.replace(page);
    store.save();
    updateDirty();
    updateAttention();
    // Panel-speilene må følge de gjenopprettede dataene, ellers viser
    // Egenskaper/seksjonspanelet gamle verdier og angringen ser død ut.
    syncSelectedBlock();
    syncSectionMirrors(store.data.sections.find((s) => s.id === activeSectionId));
    // Angring kan fjerne siden man står på (angret sideopprettelse):
    // da byttes det til forsiden i stedet for å bli stående i løse luften.
    if (!siteDraft.pages.some((p) => p.id === pageId)) {
      selectPage(siteDraft.pages[0].id, { keepHistory: true });
    } else {
      bridge?.sendPage(pageId, store.data);
    }
  }

  /** Gjenopprett samlingsutkastene fra et snapshot (null = tatt før init, hopp over).
   *  Stores som mangler gjenskapes mot publisert baseline; stores utenfor snapshotet fjernes. */
  function restoreSamlinger(indexSnap, samlingerSnap) {
    if (!samlingerIndexStore || !indexSnap) return;
    const current = JSON.stringify({
      index: samlingerIndexStore.data,
      samlinger: Object.fromEntries(Object.entries(samlingStores).map(([id, st]) => [id, st.data])),
    });
    if (current === JSON.stringify({ index: indexSnap, samlinger: samlingerSnap })) return;
    samlingerIndexStore.replace(indexSnap);
    samlingerIndexStore.save();
    for (const id of Object.keys(samlingStores)) {
      if (!(id in samlingerSnap)) {
        localStorage.removeItem(`urd-draft-samling-${id}`);
        delete samlingStores[id];
      }
    }
    for (const [id, data] of Object.entries(samlingerSnap)) {
      if (!samlingStores[id]) {
        // Angret sletting: baseline er publisert tilstand, eller fresh-tom for en samling som aldri rakk å publiseres (speiler addSamling).
        const baseline = publishedSamlinger[id]
          ?? { schemaVersion: 1, id, name: data.name ?? id, kind: data.kind ?? 'custom', entries: [] };
        samlingStores[id] = createDraftStore(`urd-draft-samling-${id}`, () => baseline, draftSaveError);
      }
      samlingStores[id].replace(data);
      samlingStores[id].save();
    }
    samlingerIds = [...(indexSnap.samlinger ?? [])];
    if (activeSamling && !samlingerIds.includes(activeSamling)) activeSamling = null;
    syncSamlingerView();
  }

  /** Gjenopprett plugin-utkastet fra et snapshot (null = tatt før init, hopp over).
   *  Diff-vaktet: kun en reell plugin-endring skal koste en preview-reboot. */
  function restorePlugins(pluginsSnap) {
    if (!pluginsStore || !pluginsSnap) return;
    if (JSON.stringify(pluginsStore.data) === JSON.stringify(pluginsSnap)) return;
    pluginsStore.replace(pluginsSnap);
    pluginsStore.save();
    syncPluginsView();
    reloadPreview();
  }

  function undo() {
    if (!history.length) return;
    redoStack.push(snapshot());
    restore(history.pop());
    lastHistoryKey = null;
    setStatus(ta('status.undone'));
  }

  function redo() {
    if (!redoStack.length) return;
    history.push(snapshot());
    restore(redoStack.pop());
    lastHistoryKey = null;
    setStatus(ta('status.redone'));
  }

  // Klikk hvor som helst i admin utenfor blokkmenyen lukker den (klikk i
  // previewen håndteres via onSelectBlock; iframe-klikk når ikke hit).
  function onPointerdownWindow(e) {
    if (!blockMenu) return;
    if (e.target instanceof Element && e.target.closest('.block-menu')) return;
    blockMenu = null;
  }

  function onKeydown(e) {
    if (e.key === 'Escape' && blockMenu) {
      blockMenu = null;
      return;
    }
    if (!(e.ctrlKey || e.metaKey)) return;
    const key = e.key.toLowerCase();
    // Ctrl+D med fokus i admin-panelene: dupliser markert blokk i previewen
    // (ellers går snarveien til nettleserens bokmerke-dialog). Kun ekte
    // SKRIVEFELT beholder nettleserens snarvei; tall, brytere og slidere
    // (der fokus blir stående etter et panelvalg) skal ikke sluke Ctrl+D.
    if (key === 'd') {
      const t = e.target;
      const inTextField = t instanceof HTMLElement
        && (t.isContentEditable || t.tagName === 'TEXTAREA'
          || (t.tagName === 'INPUT' && !['number', 'checkbox', 'range', 'color'].includes(t.type)));
      if (inTextField || !selectedBlock || viewMode === 'mobile') return;
      e.preventDefault();
      bridge?.sendDuplicate();
      return;
    }
    if (key !== 'z' && key !== 'y') return;
    const t = e.target;
    // Fritekstfelter beholder nettleserens egen angring; alt annet
    // (tall, brytere, glidere, FARGEVELGERE - fokus blir stående i dem
    // etter valg) bruker editorens historikk.
    const nativeUndo = t instanceof HTMLElement
      && (t.isContentEditable || t.tagName === 'TEXTAREA'
        || (t.tagName === 'INPUT' && !['number', 'checkbox', 'range', 'color'].includes(t.type)));
    if (nativeUndo) return;
    e.preventDefault();
    if (key === 'y' || e.shiftKey) redo();
    else undo();
  }

  async function init() {
    site = liftSiteFile(await (await fetch('/content/site.json')).json());
    siteStore = createDraftStore('urd-draft-site', () => site, draftSaveError);
    // Utkast fra før grid-omleggingen kan ligge i localStorage: løft dem.
    siteStore.replace(liftSiteFile(siteStore.data));
    siteStore.save();
    linkSiteDraft();
    grid = { snap: true, ...siteDraft.grid };
    await selectPage(new URLSearchParams(location.search).get('page') ?? siteDraft.pages[0].id);
    await initPlugins();
    await initSamlinger();
    await checkAuth();
    // Publiseringsgrunnlaget krever innlogging: uinnlogget ville kallet
    // bare gitt 401-støy i konsollen. Etter innlogging (OAuth-redirect)
    // lastes siden på nytt, så grunnlaget hentes da her.
    if (auth) refreshBaseSha();
    // Oppsettsveiviseren: første besøk på en fersk klon (malens standard-
    // navn står fortsatt) og ikke avvist tidligere.
    // Eksplisitt signal (site.setup fra malen) med den gamle navnematchingen som fallback for eldre kloner.
    if ((siteDraft.site.setup === true || siteDraft.site.title === 'Min forening') && !localStorage.getItem('urd-setup-done')) {
      setupName = siteDraft.site.title;
      setupAccent = siteDraft.theme.tokens.color.accent;
      setupBg = siteDraft.theme.tokens.color.bg;
      showSetup = true;
    }
  }

  /* ---------- Bekreftelsesdialogen ---------- */

  // Editorens egen erstatning for confirm(): promise-basert modal i samme stil som oppsettsveiviseren.
  // Kun én om gangen (publisering og angring er sekvensielle flyter).
  let confirmBox = $state(null);

  function askConfirm({ title, lines = [], okLabel = ta('confirm.ok'), cancelLabel = ta('confirm.cancel') }) {
    return new Promise((resolve) => {
      confirmBox = { title, lines, okLabel, cancelLabel, resolve };
    });
  }

  function answerConfirm(ok) {
    confirmBox?.resolve(ok);
    confirmBox = null;
  }

  /* ---------- Oppsettsveiviseren ---------- */

  let showSetup = $state(false);
  let setupName = $state('');
  let setupAccent = $state('#7c5cff');
  let setupBg = $state('#0b0e14');

  function closeSetup() {
    localStorage.setItem('urd-setup-done', '1');
    showSetup = false;
  }

  function applySetup() {
    const name = setupName.trim();
    if (!name) return;
    siteMutate('setup', () => {
      siteDraft.site.title = name;
      siteDraft.nav.logo = { type: 'text', value: name };
      siteDraft.theme.tokens.color.accent = setupAccent;
      siteDraft.theme.tokens.color.bg = setupBg;
      // Signalet er brukt: neste publisering fjerner det fra site.json, så veiviseren aldri går igjen for andre redaktører.
      delete siteDraft.site.setup;
    });
    closeSetup();
    setStatus(ta('status.setupDone'), 'ok');
  }

  /** Aktivt panel i venstre panelvelger (null = lukket) */
  let activePanel = $state(null);
  /** Panelene gruppert etter arbeidsflyt: bygge siden, style nettstedet,
   *  verktøy. Vises med skillelinjer i panelvelgeren. Id-ene er stabile
   *  engelske identifikatorer (aldri visningstekst, 0.6.8.2);
   *  PANEL_LABELS eier det brukeren ser. */
  const PANEL_GROUPS = [
    ['pages', 'blocks', 'properties', 'grid'],
    ['site', 'theme', 'nav', 'footer', 'collections', 'plugins'],
    ['history'],
  ];
  const PANEL_LABELS = Object.fromEntries(PANEL_GROUPS.flat().map((id) => [id, ta(`panel.${id}`)]));

  /** Admin-språkvelgeren: språkene med sine EGNE navn (endonymer, aldri
   *  oversatt, aldri flagg); «Automatisk» følger enhetsspråket og er
   *  standarden - et valg huskes per nettleser (urd-admin-lang). */
  const LANG_OPTIONS = [
    ['se', 'Davvisámegiella'],
    ['en-GB', 'English (UK)'],
    ['nb', 'Norsk bokmål'],
    ['nn', 'Norsk nynorsk'],
    ['tr', 'Türkçe'],
  ];
  const adminLangChoice = localStorage.getItem('urd-admin-lang') ?? 'auto';
  function setAdminLang(v) {
    if (v === adminLangChoice) return;
    if (v === 'auto') localStorage.removeItem('urd-admin-lang');
    else localStorage.setItem('urd-admin-lang', v);
    // Språkbytte er en omlasting (Publii-modellen): ordbøkene leses ved
    // oppstart, og iframen følger med.
    location.reload();
  }

  function togglePanel(name) {
    activePanel = activePanel === name ? null : name;
    // Gridet vises i forhåndsvisningen så lenge Grid-panelet er åpent.
    bridge?.sendShowGrid(activePanel === 'grid');
    if (activePanel === 'history') loadHistory();
  }

  /**
   * Markert blokk i forhåndsvisningen, som reaktiv KOPI for Egenskaper-
   * panelet (utkastdataene selv er ikke reaktive). Synkes fra utkastet
   * ved valg, ved panel-endringer og ved endringer gjort i iframen.
   */
  let selectedBlock = $state(null);

  function readBlock(sectionId, blockId) {
    const section = store?.data.sections.find((s) => s.id === sectionId);
    const block = section?.blocks.find((b) => b.id === blockId);
    return { section, block };
  }

  function syncSelectedBlock() {
    if (!selectedBlock) return;
    const { block } = readBlock(selectedBlock.sectionId, selectedBlock.blockId);
    if (!block) {
      selectedBlock = null;
      return;
    }
    selectedBlock = {
      sectionId: selectedBlock.sectionId,
      blockId: selectedBlock.blockId,
      type: block.type,
      decor: Boolean(block.decor),
      props: JSON.parse(JSON.stringify(block.props)),
      frame: { ...block.frames.desktop },
      animation: block.animation ? JSON.parse(JSON.stringify(block.animation)) : null,
      hover: block.hover ? JSON.parse(JSON.stringify(block.hover)) : null,
      sticky: block.sticky ? JSON.parse(JSON.stringify(block.sticky)) : null,
    };
  }

  function onSelectBlock(msg) {
    // Klikk i previewen (blokk eller lerret) lukker blokkmenyen. onBlockMenu
    // kaller denne FØR den åpner menyen, så gjenåpning virker.
    blockMenu = null;
    if (!msg.blockId) {
      selectedBlock = null;
      return;
    }
    selectedBlock = { sectionId: msg.sectionId, blockId: msg.blockId };
    // Blokkens seksjon blir palett-målet (blokk-gester poster ikke lenger
    // urd-select-section, så Egenskaper ikke rives fra blokken til seksjonen).
    if (msg.sectionId) activeSectionId = msg.sectionId;
    syncSelectedBlock();
    // (Auto-åpning av Egenskaper ved blokk-klikk ble prøvd og reversert
    // etter testrunde; kun NY SEKSJON åpner panelet automatisk.)
  }

  /** Blokkmenyen (tannhjulet på blokkens verktøylinje): posisjon i
   *  editor-koordinater, null = lukket. Innholdet er samme snippet som
   *  Egenskaper-panelet. */
  let blockMenu = $state(null);

  /** «Slipp taket»-valgene for sticky: kun seksjonene ETTER blokkens
   *  egen (festing bakover gir ikke mening; innstillinger vises kun
   *  når de er relevante). */
  function stickyUntilOptions() {
    const sections = store?.data.sections ?? [];
    const idx = sections.findIndex((s) => s.id === selectedBlock?.sectionId);
    return [
      ['', ta('opt.sticky.ownSection')],
      ...sections.slice(idx + 1).map((s, i) => [s.id, ta('opt.sticky.atSection', { n: idx + 2 + i })]),
    ];
  }

  function onBlockMenu(msg) {
    onSelectBlock(msg);
    if (!selectedBlock) return;
    const MENU_W = 300;
    const ir = iframeEl?.getBoundingClientRect();
    if (!ir) return;
    // Ved siden av blokken: til høyre om det er plass, ellers til venstre,
    // klemt innenfor vinduet (menyen selv scroller ved lite høyde).
    // ir er den SKALERTE iframe-rekta; msg.rect er blokka i iframens EGNE
    // (uskalerte) koordinater, så indre punkt må ganges med scale før de legges
    // til iframens vindusposisjon (visuelt = ir + scale * indre).
    let left = ir.left + scale * msg.rect.right + 12;
    if (left + MENU_W > window.innerWidth - 8) {
      left = Math.max(8, ir.left + scale * msg.rect.left - MENU_W - 12);
    }
    const maxTop = window.innerHeight - Math.min(window.innerHeight * 0.7, 560) - 8;
    const top = Math.min(Math.max(8, ir.top + scale * msg.rect.top), Math.max(8, maxTop));
    blockMenu = { left, top };
  }

  /** Felles flyt for blokk-endringer fra Egenskaper-panelet. */
  function mutateBlock(key, fn) {
    const { section, block } = readBlock(selectedBlock?.sectionId, selectedBlock?.blockId);
    if (!block) return;
    pushHistory(key);
    fn(block, section);
    markDesktopChange(section, 'blokk-endret');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    syncSelectedBlock();
  }

  function setBlockProp(name, value) {
    // Nøkkelen inkluderer egenskapsnavnet: endring av etikett og deretter stil skal være TO angre-steg, mens en skur i samme felt koalesceres.
    mutateBlock(`edit:${selectedBlock.blockId}:${name}`, (b) => { b.props[name] = value; });
  }

  function setBlockFrame(field, value) {
    if (!Number.isFinite(value)) return;
    mutateBlock(`edit:frame-${selectedBlock.blockId}:${field}`, (b) => {
      b.frames.desktop = { ...b.frames.desktop, [field]: value };
    });
  }

  /** Kortstilen (boxStyle, additiv): null-verdier i patchen fjerner feltet,
   *  og et tomt objekt fjernes helt (= basisstilen). */
  function setBoxStyle(patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:boxStyle`, (b) => {
      const next = { ...(b.props.boxStyle ?? {}), ...patch };
      for (const k of Object.keys(next)) {
        if (next[k] == null) delete next[k];
      }
      if (Object.keys(next).length) b.props.boxStyle = next;
      else delete b.props.boxStyle;
    });
  }

  /* FAQ-blokken: spørsmålslisten redigeres her; tekstene også rett i preview. */

  function setFaqItem(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:faq${i}`, (b) => {
      b.props.items[i] = { ...b.props.items[i], ...patch };
    });
  }

  function addFaqItem() {
    mutateBlock('faq-item', (b) => {
      (b.props.items ??= []).push({ q: ta('seed.faq.newQ'), a: ta('seed.faq.answer') });
    });
  }

  function removeFaqItem(i) {
    mutateBlock('faq-item', (b) => { b.props.items.splice(i, 1); });
  }

  function moveFaqItem(i, dir) {
    const j = i + dir;
    mutateBlock('faq-item', (b) => {
      if (j < 0 || j >= b.props.items.length) return;
      [b.props.items[i], b.props.items[j]] = [b.props.items[j], b.props.items[i]];
    });
  }

  function setBlockDecor(on) {
    mutateBlock('decor', (b) => { b.decor = on; });
  }

  /** Bytt bilde i en bildeblokk (samme webp-flyt som + Bilde). */
  async function replaceImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.props.src = img.dataUrl;
        b.props.alt = b.props.alt || slugify(file.name).replaceAll('-', ' ');
      });
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
    }
  }

  // FONT_STACKS bor i motorens fonts.js (deles med teksteditor-linjens
  // typografirad).

  /** Navn på blokktypene i panelet. */
  const BLOCK_LABELS = { text: ta('blocks.text'), button: ta('blocks.button'), image: ta('blocks.image'), shape: ta('blocks.shape'), video: ta('blocks.video'), icon: ta('blocks.icon'), galleri: ta('blocks.galleri'), faq: ta('blocks.faq') };
  const SHAPE_KINDS = [
    ['line', ta('shape.line')], ['arrow', ta('shape.arrow')], ['circle', ta('shape.circle')],
    ['rect', ta('shape.rect')], ['triangle', ta('shape.triangle')],
  ];
  const COLOR_TOKENS = [
    ['accent', ta('color.accent')], ['text', ta('color.text')], ['surface', ta('color.surface')], ['bg', ta('color.bg')],
  ];

  /** Sist klikkede seksjon i forhåndsvisningen: paletten legger nye
   *  blokker her, og grid-menyen kan gi den eget grid. */
  let activeSectionId = $state(null);
  /** Speil av den aktive seksjonens grid-overstyring (null = arver) */
  let sectionGrid = $state(null);
  /** Speil av den aktive seksjonens minstehøyde (for Egenskaper-panelet) */
  let sectionMinHeight = $state('');
  /** Speil av den aktive seksjonens bakgrunnslag og animasjon */
  let sectionBg = $state([]);
  let sectionAnim = $state(null);
  let sectionHover = $state(null);
  /** Speil av den aktive seksjonens rollesett (seksjonstema), '' = Standard */
  let sectionTheme = $state('');

  function syncSectionMirrors(section) {
    sectionGrid = section?.grid ? { ...section.grid } : null;
    sectionMinHeight = section?.size?.minHeight ?? '';
    sectionBg = JSON.parse(JSON.stringify(section?.background?.layers ?? []));
    sectionAnim = section?.animation ? JSON.parse(JSON.stringify(section.animation)) : null;
    sectionHover = section?.hover ? JSON.parse(JSON.stringify(section.hover)) : null;
    sectionTheme = section?.theme ?? '';
  }

  /* Mål for «Dekk»/«Vis hele»-knappene på bilde-bakgrunnslag: seksjonsboksen (målt
     i preview-iframen, samme-origin) og bildets naturlige mål lar oss regne ut
     skalaen som akkurat fyller/viser hele bildet. */
  let secBox = $state(null);            // { w, h } for den valgte seksjonen
  const imgNat = $state({});            // src -> { w, h } (naturlige bildemål)

  function measureSecBox() {
    try {
      const doc = iframeEl?.contentDocument;
      const el = doc?.querySelector(`.urd-section[data-section-id="${activeSectionId}"]`);
      const r = el?.getBoundingClientRect();
      secBox = r && r.width ? { w: r.width, h: r.height } : null;
    } catch { secBox = null; }
  }

  // Mål på nytt når valgt seksjon endres (etter at preview har rendret) og når
  // preview-iframen endrer størrelse.
  $effect(() => {
    activeSectionId; sectionBg;
    requestAnimationFrame(() => requestAnimationFrame(measureSecBox));
  });
  $effect(() => {
    const el = iframeEl;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measureSecBox());
    ro.observe(el);
    return () => ro.disconnect();
  });
  // Last bildenes naturlige mål (for rom-utregningen).
  $effect(() => {
    for (const l of sectionBg) {
      const src = l?.props?.src;
      if (l?.type === 'image' && src && !imgNat[src]) {
        const im = new Image();
        im.onload = () => { imgNat[src] = { w: im.naturalWidth, h: im.naturalHeight }; };
        im.src = src;
      }
    }
  });

  /** Ferdig seksjonstema (rollesett): presentasjon, ingen mobil-invalidering. */
  function setSectionTheme(role) {
    mutateSection('section-theme', (s) => {
      if (role) s.theme = role; else delete s.theme;
    });
  }

  function onSelectSection(msg) {
    activeSectionId = msg.sectionId;
    syncSectionMirrors(store?.data.sections.find((s) => s.id === msg.sectionId));
  }

  /** Felles flyt for seksjons-endringer fra Egenskaper-panelet. */
  function mutateSection(key, fn) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section) return;
    pushHistory(key);
    fn(section);
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    syncSectionMirrors(section);
  }

  /* ---------- Bakgrunnseditoren ---------- */

  /** Valgt lagtype for «+ Legg til lag» */
  let newBgType = $state('color');

  /* Bakgrunnseditoren er delt mellom seksjon, nav og footer via en snippet
     (backgroundLayers) som deler denne komponentens scoped stiler. Hver
     handler tar en `bg`-kontekst {mutate, keyPrefix, keyId}: `mutate(key, fn)`
     der fn(target) muterer target.background (seksjon / nav.style / footer),
     keyPrefix/keyId gir stabile history-koalescerings-nøkler per mål. */

  function addBgLayer(bg, type) {
    bg.mutate(bg.keyPrefix, (t) => {
      t.background ??= { version: 1, layers: [] };
      t.background.layers.push({ type, version: BG_DEFS[type].version ?? 1, props: BG_DEFS[type].defaults() });
    });
  }

  function removeBgLayer(bg, i) {
    bg.mutate(bg.keyPrefix, (t) => {
      t.background.layers.splice(i, 1);
      // Tom lagliste rydder background helt, så mål uten bakgrunn ikke bærer
      // et tomt {version,layers}-objekt (og nav/footer faller tilbake til flat).
      if (!t.background.layers.length) delete t.background;
    });
  }

  function moveBgLayer(bg, i, dir) {
    const j = i + dir;
    bg.mutate(bg.keyPrefix, (t) => {
      const layers = t.background.layers;
      if (j < 0 || j >= layers.length) return;
      [layers[i], layers[j]] = [layers[j], layers[i]];
    });
  }

  function setBgProp(bg, i, name, value) {
    bg.mutate(`edit:${bg.keyPrefix}-${bg.keyId}-${i}-${name}`, (t) => {
      t.background.layers[i].props[name] = value;
    });
  }

  /* Fokuspunkt-dra på bilde-bakgrunnslaget: en liten forhåndsvisningsboks der man
     drar et punkt for å sette x/y (0..1) samtidig. Samme fokus-idé som bildeeditoren. */
  function startFocalDrag(event, bg, i, axes = 'xy') {
    event.preventDefault();
    const pad = event.currentTarget;
    // Pekerfangst på pad-elementet: da får det ALLE pekerhendelser til knappen
    // slippes, også når musen drar over preview-iframen (som ellers spiser dem,
    // så draget «henger igjen» etter at man slipper utenfor).
    pad.setPointerCapture?.(event.pointerId);
    const move = (e) => {
      const r = pad.getBoundingClientRect();
      if (axes.includes('x')) {
        const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        setBgProp(bg, i, 'x', Math.round(x * 100) / 100);
      }
      if (axes.includes('y')) {
        const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        setBgProp(bg, i, 'y', Math.round(y * 100) / 100);
      }
    };
    move(event);
    const up = () => {
      pad.removeEventListener('pointermove', move);
      pad.removeEventListener('pointerup', up);
      pad.removeEventListener('pointercancel', up);
    };
    pad.addEventListener('pointermove', move);
    pad.addEventListener('pointerup', up);
    pad.addEventListener('pointercancel', up);
  }

  /* Størrelse (Egen størrelse-modus): stepper/tallfelt skriver `size` som brøk,
     klemt til 10-400 %. */
  const clampBgSize = (v) => Math.min(4, Math.max(0.1, v));
  function stepBgSize(bg, i, cur, delta) {
    setBgProp(bg, i, 'size', clampBgSize(Math.round((cur + delta) * 100) / 100));
  }
  function setBgSizePct(bg, i, pct) {
    const n = Number(pct);
    if (Number.isFinite(n)) setBgProp(bg, i, 'size', clampBgSize(n / 100));
  }
  /* «Dekk»/«Vis hele»: regn ut skalaen fra bilde- og seksjonsmål og sett den, så
     Fyll/Vis-hele blir forhåndsvalg man kan finjustere videre (ikke egne moduser).
     r = høyde/bredde-forholdet mellom seksjon og bilde ved 100 % bredde. */
  function setBgFillSize(bg, i, layer, mode) {
    const nat = imgNat[layer.props.src];
    if (!nat?.w || !nat?.h || !secBox?.w || !secBox?.h) return;
    const r = (secBox.h * nat.w) / (secBox.w * nat.h);
    const size = mode === 'cover' ? Math.max(1, r) : Math.min(1, r);
    if (layer.props.fit === 'flislegg' || layer.props.fit === 'repeat') setBgProp(bg, i, 'fit', 'vanlig');
    setBgProp(bg, i, 'size', clampBgSize(Math.round(size * 100) / 100));
  }

  /* Gradient-editoren (lag-versjon 2: frie stopp + lineær/radiell).
     Eldre lag (v1, rene fargestrenger) løftes for visning uten å røre
     utkastet, og løftes I utkastet ved første gradient-endring. */

  function gradientProps(layer) {
    if ((layer.version ?? 1) >= gradientLayer.version) return layer.props;
    // Snapshot før lift: migreringssteget structuredCloner props, som
    // kaster på en $state-proxy (samme felle som postMessage).
    const raw = $state.snapshot(layer);
    return lift({ type: 'gradient', version: raw.version ?? 1, props: raw.props }, gradientLayer).props;
  }

  function mutateGradient(bg, i, key, fn) {
    bg.mutate(key, (t) => {
      const layer = t.background.layers[i];
      if ((layer.version ?? 1) < gradientLayer.version) {
        const res = lift({ type: 'gradient', version: layer.version ?? 1, props: $state.snapshot(layer.props) }, gradientLayer);
        if (!res.ok) return;
        layer.props = res.props;
        layer.version = res.version;
      }
      fn(layer.props);
    });
  }

  function setGradProp(bg, i, name, value) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-${name}`, (p) => { p[name] = value; });
  }

  /** Formbytte nullstiller animasjonen om den ikke finnes for den nye formen. */
  const GRAD_ANIMATIONS = {
    linear: [['none', ta('common.none')], ['pan', ta('opt.gradAnim.pan')], ['pan-loop', ta('opt.gradAnim.panLoop')], ['rotate', ta('opt.gradAnim.rotate')]],
    radial: [['none', ta('common.none')], ['pulse', ta('opt.gradAnim.pulse')], ['orbit', ta('opt.gradAnim.orbit')]],
  };

  function setGradKind(bg, i, kind) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      p.kind = kind;
      if (!GRAD_ANIMATIONS[kind].some(([id]) => id === (p.animation ?? 'none'))) p.animation = 'none';
    });
  }

  function setGradStop(bg, i, si, patch) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-stop${si}`, (p) => {
      p.stops[si] = { ...p.stops[si], ...patch };
    });
  }

  /** Ny farge nederst i listen, med plass som en gjennomsnittsfarge. */
  function addGradStop(bg, i) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      const avg = Math.round(p.stops.reduce((a, s) => a + (Number(s.share) || 0), 0) / p.stops.length) || 50;
      p.stops.push({ color: p.stops[p.stops.length - 1]?.color ?? '#ffffff', share: avg });
    });
  }

  function removeGradStop(bg, i, si) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      if (p.stops.length > 2) p.stops.splice(si, 1);
    });
  }

  function reorderGradStop(bg, i, from, to) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      const [moved] = p.stops.splice(from, 1);
      p.stops.splice(to, 0, moved);
    });
  }

  /** Pågående dra-omsortering av gradientfarger: {layer, from, insert}
   *  eller null. insert er innsettingsplassen (0..antall), tegnet som en
   *  strek over raden (eller under den siste). */
  let stopDrag = $state(null);

  /** Pekerbasert dra (ikke HTML5-dnd: den ga verken visuell indikator
   *  eller pålitelig slipp på naboraden). Raden man drar dempes, og
   *  innsettingsstreken følger pekeren; slipp utfører ETT angre-steg. */
  function startStopDrag(bg, event, layerI, si) {
    if (event.button !== 0) return;
    event.preventDefault();
    const container = event.currentTarget.closest('.bg-layer');
    const row = event.currentTarget.closest('.grad-stop');
    stopDrag = { layer: layerI, from: si, insert: si };

    // Spøkelsesrad: en kopi av hele raden (med fargen) følger pekeren,
    // så man ser HVA man drar, ikke bare hvor det lander. Inline-stil,
    // siden kopien bor på document.body utenfor komponent-treet.
    const rect = row.getBoundingClientRect();
    const grabY = event.clientY - rect.top;
    const ghost = row.cloneNode(true);
    ghost.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;`
      + `width:${rect.width}px;display:flex;align-items:center;gap:0.4rem;`
      + 'pointer-events:none;z-index:1000;opacity:0.92;padding:2px 4px;'
      + 'background:var(--urd-color-surface);border:1px solid var(--urd-color-accent);border-radius:6px;';
    document.body.appendChild(ghost);

    const move = (ev) => {
      ghost.style.top = `${ev.clientY - grabY}px`;
      const rects = [...container.querySelectorAll('.grad-stop')].map((r) => r.getBoundingClientRect());
      let insert = rects.length;
      for (let k = 0; k < rects.length; k++) {
        if (ev.clientY < rects[k].top + rects[k].height / 2) {
          insert = k;
          break;
        }
      }
      stopDrag = { ...stopDrag, insert };
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      ghost.remove();
      const drag = stopDrag;
      stopDrag = null;
      if (!drag) return;
      const to = drag.insert > drag.from ? drag.insert - 1 : drag.insert;
      if (to !== drag.from) reorderGradStop(bg, drag.layer, drag.from, to);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /** Bytt lagtype i etterkant (laget beholder plassen, props nullstilles). */
  function changeBgLayerType(bg, i, type) {
    bg.mutate(bg.keyPrefix, (t) => {
      if (t.background.layers[i].type === type) return;
      t.background.layers[i] = { type, version: BG_DEFS[type].version ?? 1, props: BG_DEFS[type].defaults() };
    });
  }

  /** Bakgrunnsbilde: samme webp-flyt som bildeblokken. */
  /* Måler motivets omfang i en SVG via canvas-piksler (SVG rendret som BILDE,
     ikke live-DOM - trygt: ingen skript-kjøring, og svgToDataUrl har alt avvist
     skript-SVG-er). Returnerer bounding-boksen i SVG-ens brukerkoordinater. */
  async function svgContentBBox(dataUrl, vb) {
    try {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = dataUrl; });
      const W = 320;
      const H = Math.max(1, Math.round((W * vb[3]) / vb[2]));
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;
      let minx = W, miny = H, maxx = -1, maxy = -1;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (data[(y * W + x) * 4 + 3] > 8) {
            if (x < minx) minx = x; if (x > maxx) maxx = x;
            if (y < miny) miny = y; if (y > maxy) maxy = y;
          }
        }
      }
      if (maxx < minx) return null;
      const sx = vb[2] / W, sy = vb[3] / H;
      return { x: vb[0] + minx * sx, y: vb[1] + miny * sy, width: (maxx - minx + 1) * sx, height: (maxy - miny + 1) * sy };
    } catch { return null; }
  }

  /* Opplastet SVG: valider + auto-trim (stram viewBox til motivet, fjern død plass)
     så Dekk/skala/posisjon oppfører seg rundt selve logoen. Faller pent tilbake til
     den utrimmede SVG-en hvis noe ikke lar seg måle. */
  async function svgAutoTrim(file) {
    const text = await file.text();
    const first = svgToDataUrl(text); // validerer (kaster på skript-SVG) + encoder
    const vb = svgViewBox(text);
    if (!vb) return first;
    const bbox = await svgContentBBox(first.dataUrl, vb);
    if (!bbox) return first;
    const trimmed = tightSvgViewBox(text, bbox);
    if (trimmed === text) return first;
    try { return svgToDataUrl(trimmed); } catch { return first; }
  }

  /* SVG-er auto-trimmes (stram viewBox til motivet); raster komprimeres til webp.
     Felles inngang for alle bilde-opplastinger, så en SVG-logo/-ikon fyller plassen. */
  async function compressOrTrim(file) {
    const isSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name || '');
    return isSvg ? svgAutoTrim(file) : compressToWebp(file);
  }

  async function setBgImage(bg, i, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      setBgProp(bg, i, 'src', img.dataUrl);
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
    }
  }

  /* Bildegalleri-laget: bildelisten redigeres som bakgrunnslagene ellers,
     men med flervalgs-opplasting (hele bunken i ETT angre-steg). */

  async function addBgGalleryImages(bg, i, event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (images.length) {
      bg.mutate(bg.keyPrefix, (t) => {
        const props = t.background.layers[i].props;
        props.images ??= [];
        props.images.push(...images.map(({ src }) => ({ src, x: 0.5, y: 0.5 })));
      });
    }
    reportUpload(images.length, failed, big);
  }

  function moveBgGalleryImage(bg, i, j, dir) {
    bg.mutate(bg.keyPrefix, (t) => {
      const arr = t.background.layers[i].props.images;
      const k = j + dir;
      if (k < 0 || k >= arr.length) return;
      [arr[j], arr[k]] = [arr[k], arr[j]];
    });
  }

  function removeBgGalleryImage(bg, i, j) {
    bg.mutate(bg.keyPrefix, (t) => { t.background.layers[i].props.images.splice(j, 1); });
  }

  function setBgGalleryImageProp(bg, i, j, name, value) {
    bg.mutate(`edit:${bg.keyPrefix}g-${bg.keyId}-${i}-${j}-${name}`, (t) => {
      t.background.layers[i].props.images[j][name] = value;
    });
  }

  /** bg-kontekstene for de tre målene (seksjon/nav/footer). Seksjonen bruker
   *  mirror-speilet sectionBg; nav/footer leser reaktivt fra siteDraft. */
  function navBgMutate(key, fn) {
    siteMutate(key, () => { siteDraft.nav.style ??= {}; fn(siteDraft.nav.style); });
  }
  const sectionBgCtx = $derived({ mutate: mutateSection, keyPrefix: 'bg', keyId: activeSectionId });
  const navBgCtx = { mutate: navBgMutate, keyPrefix: 'navbg', keyId: 'nav' };
  const footerBgCtx = { mutate: footerMutate, keyPrefix: 'footerbg', keyId: 'footer' };

  /** Temafargene som hurtigvalg i fargevelgeren (velgeren løser opp
   *  token-navn selv, så ingen hexFor-omregning trengs lenger). */
  const themeSwatches = () => Object.entries(siteDraft?.theme.tokens.color ?? {}).map(([n, hex]) => [n, hex]);

  /** Tema-panelets avledede tilstand (Farger-området). */
  const PALETTE_KEYS = [['bg', ta('palette.bg'), ta('palette.bgShort')], ['surface', ta('palette.surface'), ta('palette.surfaceShort')], ['text', ta('palette.text'), ta('palette.textShort')], ['accent', ta('palette.accent'), ta('palette.accentShort')], ['accent-text', ta('palette.accentText'), ta('palette.accentTextShort')]];
  const dualMode = $derived(!!siteDraft?.theme.alt);
  const altAuto = $derived(siteDraft?.theme.alt?.auto === true);
  const stdMode = $derived(siteDraft?.theme.scheme === 'dark' ? 'dark' : 'light');
  const lightPal = $derived(siteDraft?.theme.tokens.color ?? {});
  const darkPal = $derived({ ...(siteDraft?.theme.tokens.color ?? {}), ...(siteDraft?.theme.alt?.tokens?.color ?? {}) });

  /* ---------- Animasjoner ---------- */

  function animObj(type) {
    return { type, version: coreAnimations[type].version, props: coreAnimations[type].defaults() };
  }

  /** Inn-animasjon og pekereffekt er uavhengige felt (animation/hover) og
   *  kan kombineres. Eldre sider kan ha en pekereffekt lagret i animation
   *  (feltene var ett til 0.6.30): normaliseres til hover ved neste edit. */
  const isEntrance = (anim) => Boolean(anim && coreAnimations[anim.type]?.entrance);
  const ENTRANCE_OPTIONS = [['', ta('common.none')],
    ...Object.entries(coreAnimations).filter(([, def]) => def.entrance).map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])];
  const HOVER_OPTIONS = [['', ta('common.none')],
    ...Object.entries(coreAnimations).filter(([, def]) => !def.entrance).map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])];

  function normalizeAnim(target) {
    if (target.animation && !isEntrance(target.animation)) {
      target.hover ??= target.animation;
      target.animation = null;
    }
  }

  function setBlockAnimation(type) {
    mutateBlock(`edit:anim-${selectedBlock.blockId}`, (b) => {
      normalizeAnim(b);
      b.animation = type ? animObj(type) : null;
    });
    // Spill animasjonen én gang som demo (etter rerenderingen; postMessage er ordnet).
    if (selectedBlock) bridge?.sendDemoAnim(selectedBlock.sectionId, selectedBlock.blockId);
  }

  function setBlockHover(type) {
    mutateBlock(`edit:hover-${selectedBlock.blockId}`, (b) => {
      normalizeAnim(b);
      b.hover = type ? animObj(type) : null;
    });
  }

  function setBlockAnimProp(name, value) {
    if (!Number.isFinite(value)) return;
    mutateBlock(`edit:anim-${selectedBlock.blockId}:${name}`, (b) => {
      if (b.animation) b.animation.props[name] = value;
    });
    if (selectedBlock) bridge?.sendDemoAnim(selectedBlock.sectionId, selectedBlock.blockId);
  }

  function setSectionAnimation(type) {
    mutateSection('section-anim', (s) => {
      normalizeAnim(s);
      s.animation = type ? animObj(type) : null;
    });
    bridge?.sendDemoAnim(activeSectionId);
  }

  function setSectionHover(type) {
    mutateSection('section-hover', (s) => {
      normalizeAnim(s);
      s.hover = type ? animObj(type) : null;
    });
  }

  function setSectionAnimProp(name, value) {
    if (!Number.isFinite(value)) return;
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props[name] = value;
    });
    bridge?.sendDemoAnim(activeSectionId);
  }

  /** Streng-prop på seksjonsanimasjonen (stagger-mønster). */
  function setSectionAnimPattern(pattern) {
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props.pattern = pattern;
    });
    bridge?.sendDemoAnim(activeSectionId);
  }

  /** Høyde fra Egenskaper-panelet: px-tall eller CSS-verdi (40vh, 50%). */
  function setSectionHeight(raw) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section) return;
    const value = raw.trim();
    if (!value) return;
    const minHeight = /^\d+$/.test(value) ? `${value}px` : value;
    pushHistory('section-size');
    section.size = { ...section.size, minHeight };
    sectionMinHeight = minHeight;
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  function targetSection() {
    return store.data.sections.find((s) => s.id === activeSectionId) ?? store.data.sections[0];
  }

  function toggleSectionGrid(on) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section) return;
    pushHistory('grid:section');
    section.grid = on ? { ...siteStore.data.grid } : null;
    sectionGrid = section.grid ? { ...section.grid } : null;
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    if (activePanel === 'grid') bridge?.sendShowGrid(true);
  }

  function setSectionGrid(field, value) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section?.grid) return;
    pushHistory('grid:section');
    section.grid = { ...section.grid, [field]: value };
    sectionGrid = { ...section.grid };
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    if (activePanel === 'grid') bridge?.sendShowGrid(true);
  }

  /** Grid-kontrollene: endringer lagres i site-utkastet og pushes live.
   *  Gridet er kun et snappeverktøy; å endre det flytter aldri innhold. */
  function setGrid(field, value) {
    pushHistory('grid:site');
    grid = { ...grid, [field]: value };
    siteStore.data.grid = { ...siteStore.data.grid, [field]: value };
    siteStore.save();
    updateDirty();
    pushSiteToPreview();
    // sendSite rerendrer siden; slå grid-visningen på igjen etterpå
    // (postMessage er ordnet, så dette ankommer etter rerenderingen).
    if (activePanel === 'grid') bridge?.sendShowGrid(true);
  }

  async function checkAuth() {
    try {
      const res = await fetch('/api/github/me');
      if (res.ok) {
        auth = await res.json();
      } else if (res.status !== 503) {
        auth = null;
      }
      // 503 = GitHub er nede i øyeblikket: behold innloggingsstatusen vi har.
    } catch {
      auth = null;
    }
  }

  /**
   * HEAD-commiten da editoren lastet (eller sist publiserte): grunnlaget
   * for konfliktvarselet. null = ukjent (ikke innlogget / lokal server),
   * da hoppes sjekken stille over.
   */
  let baseSha = null;

  async function refreshBaseSha() {
    try {
      const res = await fetch('/api/github/latest');
      if (res.ok) baseSha = (await res.json()).head ?? null;
    } catch { /* publiseringslag utilgjengelig */ }
  }

  /**
   * Konfliktsjekk før publisering: har noen andre publisert siden vi
   * lastet, og rører vi de samme filene? Returnerer {ok, head}: ok=false
   * betyr at redaktøren avbrøt; head er HEAD-en vi observerte og sendes
   * som expect til commit-endepunktet (tetter vinduet mellom sjekk og
   * commit server-side).
   */
  async function confirmNoConflict(files) {
    if (!baseSha) {
      // Grunnlaget glapp ved innlasting (GitHub nede): hent HEAD nå, så expect i det minste tetter commit-vinduet.
      // Uten opprinnelig grunnlag kan vi ikke diffe, så redaktøren må ta valget eksplisitt i stedet for at vernet hoppes stille over.
      await refreshBaseSha();
      const ok = await askConfirm({
        title: ta('confirm.conflictUnknown.title'),
        lines: [
          ta('confirm.conflictUnknown.body'),
          ta('confirm.conflictUnknown.warning'),
        ],
        okLabel: ta('confirm.publishAnyway'),
        cancelLabel: ta('confirm.cancel'),
      });
      return { ok, head: baseSha };
    }
    let data = null;
    try {
      const res = await fetch(`/api/github/latest?base=${baseSha}`);
      if (res.ok) data = await res.json().catch(() => null);
    } catch { /* utilgjengelig: vi stopper ikke publiseringen på det */ }
    if (!data?.head) return { ok: true, head: null };

    const head = data.head;
    if (head === baseSha) return { ok: true, head };

    const mine = new Set(files.map((f) => f.path));
    // Avkortet diff (svært store endringer): vi VET ikke om det er
    // overlapp, så redaktøren må ta valget.
    const overlap = data.truncated
      ? [ta('confirm.conflict.truncated')]
      : (data.changedFiles ?? []).filter((p) => mine.has(p));
    if (overlap.length === 0) return { ok: true, head };

    const ok = await askConfirm({
      title: ta('confirm.conflict.title'),
      lines: [
        ta('confirm.conflict.intro'),
        ...overlap.map((p) => `• ${p}`),
        ta('confirm.conflict.warning'),
      ],
      okLabel: ta('confirm.publishAnyway'),
      cancelLabel: ta('confirm.cancel'),
    });
    return { ok, head };
  }

  /* ---------- Historikk-panelet ---------- */

  /** null = ikke lastet ennå; [] = lastet og tomt */
  let historyList = $state(null);
  let historyError = $state('');
  let historyBusy = $state(false);

  async function loadHistory() {
    historyError = '';
    try {
      const res = await fetch('/api/github/history');
      if (res.ok) {
        historyList = (await res.json()).commits;
      } else if (res.status === 401) {
        historyList = [];
        historyError = ta('status.historyLoginRequired');
      } else {
        historyList = [];
        historyError = (await res.json().catch(() => null))?.error ?? ta('status.historyFetchFailed');
      }
    } catch {
      historyList = [];
      historyError = ta('status.historyUnavailable');
    }
  }

  // Historikk-datoene følger admin-språket (Intl har alle de støttede).
  const historyDate = new Intl.DateTimeFormat(currentAdminLang(), { dateStyle: 'short', timeStyle: 'short' });

  /**
   * Etter en angring viser editoren fortsatt innholdet fra FØR angringen
   * (den gjenopprettede versjonen finnes først på serveren etter deploy).
   * Å publisere fra den tilstanden ville stille gjeninnført det som ble
   * angret - derfor sperres publisering til admin er lastet på nytt.
   */
  let revertedSinceLoad = false;

  async function revertLast() {
    const last = historyList?.[0];
    if (!last || historyBusy) return;
    const ok = await askConfirm({
      title: ta('confirm.revert.title'),
      lines: [
        `«${last.message}»`,
        ta('confirm.revert.body'),
      ],
      okLabel: ta('confirm.revert.ok'),
      cancelLabel: ta('confirm.cancel'),
    });
    if (!ok) return;
    historyBusy = true;
    setStatus(ta('status.reverting'));
    try {
      const res = await fetch('/api/github/revert', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ expect: last.sha }),
      });
      if (res.ok) {
        const { sha } = await res.json().catch(() => ({}));
        if (sha) baseSha = sha;
        else refreshBaseSha();
        revertedSinceLoad = true;
        setStatus(ta('status.revertDone'), 'ok');
        awaitRevertDeploy();
      } else if (res.status === 409) {
        setStatus(ta('status.revertConflict'), 'error');
      } else {
        setStatus((await res.json().catch(() => null))?.error ?? ta('status.revertFailed'), 'error');
      }
    } catch {
      setStatus(ta('status.publishLayerUnreachable'), 'error');
    }
    historyBusy = false;
    loadHistory();
  }

  /**
   * Etter angring: poll de serverte innholdsfilene til deployen faktisk er
   * ute, forkast utkastene (serveren er nå fasiten) og last admin på nytt
   * automatisk - i stedet for å be eieren laste på nytt selv. Endrer ingen
   * av filene seg innen fristen (treg utrulling, eller en publisering som
   * bare rørte filer vi ikke poller), beholdes dagens sperre og melding.
   */
  async function awaitRevertDeploy() {
    const paths = ['/content/site.json', ...siteDraft.pages.map((p) => `/${p.file}`)];
    const snap = async () => {
      const out = {};
      for (const path of paths) {
        try {
          out[path] = await (await fetch(path, { cache: 'no-store' })).text();
        } catch {
          out[path] = null;
        }
      }
      return out;
    };
    const before = await snap();
    for (let attempt = 0; attempt < 18; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      const now = await snap();
      if (paths.some((path) => now[path] !== null && before[path] !== null && now[path] !== before[path])) {
        setStatus(ta('status.revertDeployed'), 'ok');
        // Utkastene beskriver tilstanden fra FØR angringen; serveren er fasiten nå.
        for (const key of Object.keys(localStorage).filter((k) => k.startsWith('urd-draft-'))) {
          localStorage.removeItem(key);
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        location.reload();
        return;
      }
    }
    setStatus(ta('status.revertDeployTimeout'), 'error');
  }

  /** Løper mens en sides data lastes; urd-ready venter på denne. */
  let pageLoading = null;

  /** Tom side for nyopprettede sider (må validere mot page-skjemaet). */
  function blankPage(entry) {
    return {
      schemaVersion: 3,
      meta: { id: entry.id, title: entry.title },
      sections: [{
        id: makeId('sec'),
        version: 1,
        preset: 'tom',
        size: { minHeight: '40vh' },
        grid: null,
        background: { version: 1, layers: [{ type: 'color', version: 1, props: { value: 'bg' } }] },
        blocks: [],
      }],
    };
  }

  async function selectPage(id, { keepHistory = false } = {}) {
    pageId = id;
    pageLoading = (async () => {
      const entry = pageEntry();
      // Nye sider finnes ikke på serveren ennå: 404, eller SPA-fallback
      // som svarer 200 med HTML (json() kaster). Da er en blank side
      // grunnlaget, og et eventuelt utkast i localStorage vinner uansett.
      let published = null;
      try {
        const res = await fetch(`/${entry.file}`);
        // Eldre sidefiler løftes til gjeldende format før redigering, slik at
        // utkast og publisering alltid er på nyeste schemaVersion. Gamle
        // utkast i localStorage løftes også.
        if (res.ok) published = liftPageFile(await res.json(), siteStore.data);
      } catch { /* ny, upublisert side */ }
      if (published) {
        // Siden er ute på serveren: en eventuell vente-på-deploy-markering
        // er ferdig (store.save() under rydder utkastet om det er likt).
        pendingPublished.delete(id);
      } else {
        published = blankPage(entry);
      }
      store = createDraftStore(`urd-draft-${id}`, () => published, draftSaveError);
      store.replace(liftPageFile(store.data, siteStore.data));
      store.save();
      // Angre-historikken overlever sidebytter: snapshots bærer pageId, og restore bytter tilbake til riktig side.
      // Uten keepHistory nulles bare koalesce-nøkkelen, så neste endring alltid får eget steg.
      if (!keepHistory) lastHistoryKey = null;
      activeSectionId = null;
      sectionGrid = null;
      updateDirty();
      updateAttention();
      status = '';
    })();
    await pageLoading;
    // Iframen bytter src via pageId; utkastet pushes når motoren melder
    // seg klar (urd-ready), aldri på iframe-load (da lytter ingen ennå).
  }

  function onIframeLoad() {
    bridge?.destroy();
    // Klikk i previewen (blokk, tekstfelt, lerret) lukker blokkmenyen. Iframen
    // er samme opprinnelse, så vi lytter direkte; tannhjul-klikket lukker først
    // og gjenåpner via urd-block-menu-meldingen etterpå (den kommer senere).
    iframeEl?.contentDocument?.addEventListener('pointerdown', () => {
      if (blockMenu) blockMenu = null;
    }, true);
    bridge = createPreviewBridge(iframeEl, {
      onEdit: handleEdit,
      onMove: handleMove,
      onGrow: handleGrow,
      onDelete: handleDelete,
      onAddSection: handleAddSection,
      onMoveSection: handleMoveSection,
      onDeleteSection: handleDeleteSection,
      onSectionSize: handleSectionSize,
      onUndo: (msg) => (msg.redo ? redo() : undo()),
      onSelectSection,
      onSelectBlock,
      onBlockMenu,
      onReady,
      onNavigate,
      onAddBlock: (msg) => insertBlock(msg.sectionId, msg.block),
      onAddBlocks: (msg) => insertBlocks(msg.sectionId, msg.blocks, msg.minBottom, msg.moves),
      onRequestBlock: handleRequestBlock,
      onMoveBlockSection: handleMoveBlockSection,
      onMobileManual: handleMobileManual,
      onMobileAuto: handleMobileAuto,
      onReviewDone: handleReviewDone,
      onBlockFlag: handleBlockFlag,
      onCollectionEdit: handleCollectionEdit,
      onPluginBlocks: (msg) => { pluginBlocks = msg.blocks ?? []; },
      // Sidestilt kolonnebredde dratt i preview: skurer i samme dra
      // koalesceres til ETT angre-steg (edit:-prefikset).
      onNavWidth: (msg) => siteMutate('edit:nav-width', () => {
        siteDraft.nav.style ??= {};
        siteDraft.nav.style.width = msg.width;
      }),
    });
  }

  /** Motoren i iframen lytter nå: send utkast og gjeldende editor-tilstand. */
  async function onReady() {
    await pageLoading;
    await pluginsReady;
    // Plugin-utkastets aktive liste og visningsvalget: previewen laster plugins fra UTKASTET,
    // og viewporten følger editorens valg (ikke iframe-bredden).
    bridge?.sendPlugins($state.snapshot(pluginsView)?.enabled ?? []);
    bridge?.sendViewport(viewMode);
    pushCollectionsToPreview();
    if (siteStore.hasDraft()) pushSiteToPreview();
    // Upubliserte sider finnes ikke på serveren (iframen faller tilbake
    // til forsiden): editorens data er kilden og må alltid sendes.
    const unpublished = !site.pages.some((p) => p.id === pageId);
    if (store.hasDraft() || unpublished) bridge?.sendPage(pageId, store.data);
    if (!chromeVisible) bridge?.sendChrome(false);
    if (activePanel === 'grid') bridge?.sendShowGrid(true);
    if (guidesOn) bridge?.sendShowGuides(true);
    sendAdminTheme();
  }

  /** Hjelpelinjer på/av: personlig arbeidsflate-preferanse, huskes i
   *  localStorage (ikke sidedata) og gjenetableres i onReady. */
  let guidesOn = $state(localStorage.getItem('urd-guides') === '1');

  /* Urd-innstillingene (admin-tema + språk) bor i en popover nede i railen,
     ikke i topbaren. Lukkes ved klikk utenfor og Escape. */
  let settingsOpen = $state(false);
  let settingsEl = $state(null);
  $effect(() => {
    if (!settingsOpen) return;
    const onDown = (e) => { if (!settingsEl?.contains(e.target)) settingsOpen = false; };
    const onKey = (e) => { if (e.key === 'Escape') settingsOpen = false; };
    // Klikk i forhåndsvisnings-iframen når aldri editorens document; iframen
    // tar fokus og admin-vinduet blurres - samme lukkemønster som ColorPicker.
    const onBlur = () => { settingsOpen = false; };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  });

  function toggleGuides() {
    guidesOn = !guidesOn;
    localStorage.setItem('urd-guides', guidesOn ? '1' : '0');
    bridge?.sendShowGuides(guidesOn);
  }

  /** Intern lenke klikket i forhåndsvisningen: bytt side ordentlig. */
  function onNavigate(msg) {
    const path = msg.path.replace(/\/$/, '') || '/';
    const entry = siteDraft.pages.find((p) => p.path === path);
    if (entry && entry.id !== pageId) selectPage(entry.id);
  }

  /**
   * Felles flyt for alle site-endringer fra panelene (sider, nav, tema):
   * historikk FØR mutasjonen, så lagre, merk og push live til preview.
   * Nøkler med edit:-prefiks slås sammen i angre-historikken (skurer av
   * tastetrykk/fargedrag blir ett angre-steg).
   */
  function siteMutate(key, fn) {
    pushHistory(key);
    fn();
    siteStore.save();
    updateDirty();
    pushSiteToPreview();
  }

  /* ---------- Sider-panelet ---------- */

  let newPageTitle = $state('');

  /** Speiler guard.js: mapper som aldri kan bli sider. */
  const RESERVED_SLUGS = ['admin', 'api', 'assets', 'content', 'media', 'plugins', 'functions'];

  function pageSlugError(slug, ignoreId = null) {
    if (!slug) return ta('error.pageNeedsName');
    if (RESERVED_SLUGS.includes(slug)) return ta('error.reservedName', { slug });
    if (siteDraft.pages.some((p) => p.id !== ignoreId && (p.path === `/${slug}` || p.id === slug))) {
      return ta('error.pageExists');
    }
    return null;
  }

  function addPage() {
    const title = newPageTitle.trim();
    const slug = slugify(title);
    const err = pageSlugError(slug);
    if (err) {
      setStatus(err, 'error');
      return;
    }
    siteMutate('pages', () => {
      siteDraft.pages.push({ id: slug, title, path: `/${slug}`, file: `content/pages/${slug}.json` });
      // Nye sider legges rett i menyen; Nav-panelet kan fjerne dem.
      siteDraft.nav.items.push({ label: title, page: slug });
    });
    // Sidens eget utkast: en blank side, klar til publisering.
    writeDraftKey(`urd-draft-${slug}`, JSON.stringify(blankPage({ id: slug, title })));
    updateDirty();
    newPageTitle = '';
    selectPage(slug);
  }

  function renamePage(entry, rawTitle) {
    const title = rawTitle.trim();
    if (!title || title === entry.title) return;
    const old = entry.title;
    siteMutate('pages', () => {
      entry.title = title;
      // Menypunkter som fortsatt het det gamle følger med.
      for (const item of siteDraft.nav.items) {
        if (item.page === entry.id && item.label === old) item.label = title;
      }
    });
    // Sidefilens meta.title holdes i takt (den styrer fanetittelen).
    if (entry.id === pageId) {
      store.data.meta.title = title;
      store.save();
      updateDirty();
      bridge?.sendPage(pageId, store.data);
    } else {
      patchPageDraft(entry, (p) => { p.meta.title = title; });
    }
  }

  /** Endrer en annen sides utkast (lager utkast fra publisert ved behov). */
  async function patchPageDraft(entry, fn) {
    const key = `urd-draft-${entry.id}`;
    let page = null;
    const raw = localStorage.getItem(key);
    if (raw) {
      try { page = JSON.parse(raw); } catch { /* korrupt: hentes på nytt */ }
    }
    if (!page) {
      try {
        const res = await fetch(`/${entry.file}`);
        if (res.ok) page = liftPageFile(await res.json(), siteStore.data);
      } catch { /* upublisert side uten utkast */ }
    }
    if (!page) page = blankPage(entry);
    fn(page);
    writeDraftKey(key, JSON.stringify(page));
    updateDirty();
  }

  function setPageSlug(entry, rawSlug) {
    const slug = slugify(rawSlug);
    if (entry.path === '/' || `/${slug}` === entry.path) return;
    const err = pageSlugError(slug, entry.id);
    if (err) {
      setStatus(err, 'error');
      return;
    }
    // Kun adressen endres; id (og dermed utkastnøkkel og filnavn) består,
    // så interne referanser (nav) aldri ryker. Publisering rydder den
    // gamle adressens index.html via diffen mot publisert site.json.
    siteMutate('pages', () => {
      entry.path = `/${slug}`;
    });
  }

  function deletePage(entry) {
    if (entry.path === '/') return; // forsiden kan aldri slettes
    siteMutate('pages', () => {
      siteDraft.pages = siteDraft.pages.filter((p) => p.id !== entry.id);
      // Punkter med undermeny overlever at egen side slettes: målet fjernes
      // og punktet blir en ren åpner, så barna (som kan peke på levende
      // sider) ikke forsvinner stille. Undermenypunkter som pekte på siden
      // ryddes; punkter uten både mål og barn til slutt fjernes helt.
      siteDraft.nav.items = siteDraft.nav.items.filter((i) => i.page !== entry.id || i.children);
      for (const item of siteDraft.nav.items) {
        if (item.page === entry.id) delete item.page;
        if (!item.children) continue;
        item.children = item.children.filter((c) => c.page !== entry.id);
        if (item.children.length === 0) delete item.children;
      }
      siteDraft.nav.items = siteDraft.nav.items.filter((i) => i.page || i.href || i.children);
    });
    // Sidens eget utkast beholdes: Ctrl+Z gjenoppretter alt.
    if (entry.id === pageId) selectPage(siteDraft.pages[0].id);
    setStatus(ta('status.pageRemoved'));
  }

  /* ---------- Nav-panelet ---------- */

  function setLogo(patch) {
    siteMutate('edit:nav-logo', () => {
      siteDraft.nav.logo = { type: 'text', value: '', ...siteDraft.nav.logo, ...patch };
    });
  }

  /**
   * Logotype-bytte. value betyr tekst (text/both) eller bilde-URL (image),
   * så feltene flyttes med når betydningen skifter.
   */
  function setLogoType(type) {
    siteMutate('nav', () => {
      siteDraft.nav.logo ??= { type: 'text', value: siteDraft.site.title };
      const logo = siteDraft.nav.logo;
      const imageInValue = logo.type === 'image';
      if (type === 'both') {
        if (imageInValue) {
          logo.image = logo.value;
          logo.value = siteDraft.site.title;
        }
        logo.image ??= '';
        logo.size ??= 32;
      } else if (type === 'image') {
        if (!imageInValue) logo.value = logo.image ?? '';
        delete logo.image;
        logo.size ??= 32;
      } else {
        if (imageInValue) logo.value = siteDraft.site.title;
        delete logo.image;
      }
      logo.type = type;
    });
  }

  /** Logobilde: samme webp-flyt som bildeblokken (materialiseres ved publisering). */
  async function uploadLogoImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      siteMutate('nav', () => {
        const logo = siteDraft.nav.logo;
        if (logo.type === 'both') logo.image = img.dataUrl;
        else logo.value = img.dataUrl;
      });
    } catch {
      setStatus(ta('status.imageReadErrorSvg'), 'error');
    }
  }

  /** Nettstedsikon (favicon): lite webp, materialiseres ved publisering. */
  // Ikon-editoren (IconEditor): kilden som redigeres. null = lukket.
  let iconEditorImage = $state(null);

  async function uploadSiteIcon(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const isSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name || '');
    if (isSvg) {
      // SVG auto-trimmes (stram viewBox til motivet) FØR ikon-editoren, så det
      // rasteriserte faviconet fylles tett av merket. Faviconet forblir raster:
      // universell støtte (Safari bruker ikke SVG-favicon).
      try {
        const img = await svgAutoTrim(file);
        iconEditorImage = img.dataUrl;
      } catch {
        setStatus(ta('status.imageReadErrorSvg'), 'error');
      }
      return;
    }
    // Les rå fil i full oppløsning, så editoren har noe å beskjære og zoome i.
    const reader = new FileReader();
    reader.onload = () => { iconEditorImage = String(reader.result); };
    reader.onerror = () => setStatus(ta('status.imageReadError'), 'error');
    reader.readAsDataURL(file);
  }

  function applyIcon(dataUrl) {
    siteMutate('edit:site-icon', () => { siteDraft.site.icon = dataUrl; });
    iconEditorImage = null;
  }

  function removeSiteIcon() {
    siteMutate('edit:site-icon', () => { delete siteDraft.site.icon; });
  }

  /** Nettstedsnavnet (site.title): halve fanetittelen (`<side> - <navn>`) og
   *  standardteksten i menylogoen. edit:-nøkkel så en skriveøkt blir ett angre-steg. */
  function setSiteName(value) {
    siteMutate('edit:site-title', () => { siteDraft.site.title = value; });
  }

  /** Nettstedsbeskrivelsen (site.description): brukt av søkemotorer og ved deling. */
  function setSiteDescription(value) {
    siteMutate('edit:site-desc', () => { siteDraft.site.description = value; });
  }

  /** Besøkende-språket (site.lang, ADR-0012): den historiske verdien 'no'
   *  vises som bokmål; en håndredigert verdi utenfor lista bevares som
   *  eget alternativ øverst så ingenting ødelegges av å åpne panelet. */
  function siteLangValue() {
    const cur = siteDraft.site.lang ?? 'no';
    return cur === 'no' ? 'nb' : cur;
  }
  function siteLangOptions() {
    const cur = siteLangValue();
    const known = LANG_OPTIONS.some(([code]) => code === cur);
    return [...(known ? [] : [[cur, cur]]), ...LANG_OPTIONS];
  }
  function setSiteLang(v) {
    siteMutate('site', () => { siteDraft.site.lang = v; });
  }

  // Admin-fanen viser nettstedsikonet når det finnes, ellers Urd-merket (samme SVG som i admin/index.html; kan ikke leses fra link-elementet, for favicon-boot.js kan alt ha byttet det).
  // Kun kjente ikonformer slippes gjennom (data:image eller site-relativ sti), så utkastdata aldri kan bli en aktiv URL (CodeQL-funn #1-3).
  const URD_MARK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
  // Anket regex i stedet for startsWith: CodeQL gjenkjenner RegExp.test som barriere, så varslene på denne flyten lukkes.
  const SAFE_ICON_RE = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
  $effect(() => {
    // Før utkastet er lastet styrer favicon-boot.js fanen; å røre den her ville gjeninnført ikonblinket.
    if (!siteDraft?.site) return;
    const href = siteDraft.site.icon;
    const link = document.querySelector('link[rel="icon"]');
    if (!link) return;
    if (typeof href !== 'string' || !href) {
      link.href = URD_MARK_ICON;
      return;
    }
    if (!SAFE_ICON_RE.test(href)) return;
    link.href = href;
  });

  function setNavLayout(value) {
    siteMutate('nav', () => { siteDraft.nav.layout = value; });
  }

  function setNavStyle(name, value) {
    siteMutate(`edit:nav-style-${name}`, () => {
      siteDraft.nav.style ??= {};
      // Standardverdier lagres ikke i fila (kall med undefined fjerner feltet).
      if (value === undefined) delete siteDraft.nav.style[name];
      else siteDraft.nav.style[name] = value;
    });
  }

  /** Variant-avledninger for panelet: sidestilt og flytende viser egne valg. */
  const sideVariant = $derived(siteDraft?.nav?.variant === 'side-left' || siteDraft?.nav?.variant === 'side-right');
  const floatingVariant = $derived(['floating', 'floating-square', 'floating-tab'].includes(siteDraft?.nav?.variant));

  /** Effektfargen ved hover: kun der stilen har en effekt, med etikett som
      sier hva fargen faktisk styrer i den valgte stilen. */
  const HOVER_COLOR_LABELS = {
    underline: [ta('hoverColor.underline.label'), ta('hoverColor.underline.title')],
    pill: [ta('hoverColor.pill.label'), ta('hoverColor.pill.title')],
    lift: [ta('hoverColor.lift.label'), ta('hoverColor.lift.title')],
  };
  const hoverColorLabel = $derived(HOVER_COLOR_LABELS[siteDraft?.nav?.style?.hover] ?? null);

  /** Variant (additivt fra v0.6): standarden (bar) lagres ikke i fila. */
  function setNavVariant(value) {
    siteMutate('nav', () => {
      if (value === 'bar') delete siteDraft.nav.variant;
      else siteDraft.nav.variant = value;
    });
  }

  /** Glød rundt den flytende pillen: av er standard og lagres ikke i fila. */
  function setNavGlow(on) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (on) siteDraft.nav.style.glow = true;
      else delete siteDraft.nav.style.glow;
    });
  }

  /** Luft over pillen: på er standard og lagres ikke i fila. */
  function setNavTopGap(on) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (on) delete siteDraft.nav.style.topGap;
      else siteDraft.nav.style.topGap = false;
    });
  }

  /** Hover-stil (additivt fra v0.6): standarden lagres ikke i fila. */
  function setNavHover(value) {
    siteMutate('nav', () => {
      siteDraft.nav.style ??= {};
      if (value === 'standard') delete siteDraft.nav.style.hover;
      else siteDraft.nav.style.hover = value;
    });
  }

  /* ---------- Samlinger-panelet (ADR-0007) ---------- */

  // Samlinger er delt nettstedsdata (som nav/footer): indeksfil + én fil per samling,
  // hver med egen draftStore. Redigering går gjennom Ctrl+Z-historikken (som sider/site).
  let samlingerIndexStore = null;
  let samlingStores = {};
  /** Publisert baseline per samling-id: brukes når angring gjenskaper en slettet samlings store. */
  let publishedSamlinger = {};
  /** Sant først når initSamlinger har fylt ALLE stores; snapshot() tar med samlinger først da. */
  let samlingerReady = false;
  let samlingerIds = $state([]);
  let samlingerView = $state({});
  let activeSamling = $state(null);
  let newSamlingName = $state('');
  let newSamlingKind = $state('news');

  const SAMLING_KINDS = [
    ['news', ta('collectionKind.news')],
    ['notices', ta('collectionKind.notices')],
    ['publications', ta('collectionKind.publications')],
    ['custom', ta('collectionKind.custom')],
  ];

  async function initSamlinger() {
    let index = { version: 1, samlinger: [] };
    try {
      index = await (await fetch('/content/samlinger.json')).json();
    } catch { /* ingen indeks er helt greit */ }
    samlingerIndexStore = createDraftStore('urd-draft-samlinger', () => index, draftSaveError);
    samlingerIds = [...(samlingerIndexStore.data.samlinger ?? [])];
    for (const id of samlingerIds) {
      let published = null;
      try {
        published = await (await fetch(`/content/samlinger/${id}.json`)).json();
      } catch { /* ny, upublisert samling */ }
      published ??= { schemaVersion: 1, id, name: id, kind: 'custom', entries: [] };
      publishedSamlinger[id] = published;
      samlingStores[id] = createDraftStore(`urd-draft-samling-${id}`, () => published, draftSaveError);
    }
    samlingerReady = true;
    syncSamlingerView();
  }

  function syncSamlingerView(pushPreview = true) {
    const view = {};
    for (const id of samlingerIds) {
      if (samlingStores[id]) view[id] = JSON.parse(JSON.stringify(samlingStores[id].data));
    }
    samlingerView = view;
    // Ved klikk-og-skriv i selve blokken hoppes preview-dyttet over: iframen viser alt teksten, og et rerender midt i skrivingen ville mistet skrivemarkøren.
    if (pushPreview) pushCollectionsToPreview();
  }

  /** Send samlingsutkastene til previewen (rene kopier; $state-proxier kan aldri postMessages). */
  function pushCollectionsToPreview() {
    bridge?.sendCollections($state.snapshot(samlingerView) ?? {});
  }

  /** Felles flyt for samlingsendringer: historikk, muter, lagre, oppdater speil og preview.
   *  key er angre-nøkkelen (edit:-prefiks koalescerer skurer av samme handling). */
  function mutateSamling(id, key, fn, pushPreview = true) {
    const store = samlingStores[id];
    if (!store) return;
    pushHistory(key);
    fn(store.data);
    store.save();
    updateDirty();
    syncSamlingerView(pushPreview);
  }

  /** Klikk-og-skriv/bildebytte i samling-blokken (urd-collection-edit fra iframen). */
  function handleCollectionEdit(msg) {
    const { collection, entryId, field, value } = msg;
    if (!['title', 'text', 'image', 'imageAlt', 'imageStyle'].includes(field)) return;
    // Tom tittel beholdes ikke (skjemaet krever tittel); gammel tittel består til noe skrives.
    // Tittelen er rik tekst, så tomhet vurderes uten markup.
    if (field === 'title' && !String(value ?? '').replace(/<[^>]*>/g, '').trim()) return;
    mutateSamling(collection, `edit:samling:${collection}:${entryId}:${field}`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      if (value === '' && field !== 'title') delete entry[field];
      else entry[field] = value;
    }, field === 'image');
  }

  function addSamling() {
    const name = newSamlingName.trim();
    if (!name) return;
    const id = slugify(name);
    if (!id || samlingerIds.includes(id)) {
      setStatus(id ? ta('status.collectionExists') : ta('status.invalidName'), 'error');
      return;
    }
    pushHistory('samlinger');
    const fresh = { schemaVersion: 1, id, name, kind: newSamlingKind, entries: [] };
    publishedSamlinger[id] = { ...fresh, entries: [] };
    samlingStores[id] = createDraftStore(`urd-draft-samling-${id}`, () => ({ ...fresh, entries: [] }), draftSaveError);
    samlingStores[id].replace(fresh);
    samlingStores[id].save();
    samlingerIndexStore.data.samlinger = [...samlingerIds, id];
    samlingerIndexStore.save();
    samlingerIds = [...samlingerIds, id];
    activeSamling = id;
    newSamlingName = '';
    updateDirty();
    syncSamlingerView();
  }

  function removeSamling(id) {
    pushHistory('samlinger');
    localStorage.removeItem(`urd-draft-samling-${id}`);
    delete samlingStores[id];
    samlingerIndexStore.data.samlinger = samlingerIds.filter((x) => x !== id);
    samlingerIndexStore.save();
    samlingerIds = samlingerIds.filter((x) => x !== id);
    if (activeSamling === id) activeSamling = null;
    updateDirty();
    syncSamlingerView();
  }

  function addSamlingEntry(id) {
    mutateSamling(id, `samling:${id}:add-entry`, (data) => {
      data.entries.unshift({
        id: makeId('innslag'),
        title: ta('seed.newEntry'),
        date: new Date().toISOString().slice(0, 10),
        text: '',
      });
    });
  }

  function setEntryField(id, entryId, field, value) {
    mutateSamling(id, `edit:samling:${id}:${entryId}:${field}`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      if (value === '' && field !== 'title') delete entry[field];
      else entry[field] = value;
    });
  }

  function moveEntry(id, index, dir) {
    mutateSamling(id, `samling:${id}:move-entry`, (data) => {
      const j = index + dir;
      if (j < 0 || j >= data.entries.length) return;
      [data.entries[index], data.entries[j]] = [data.entries[j], data.entries[index]];
    });
  }

  function removeEntry(id, entryId) {
    mutateSamling(id, `samling:${id}:remove-entry`, (data) => {
      data.entries = data.entries.filter((e) => e.id !== entryId);
    });
  }

  /** Innslagsbilde: samme webp-flyt som blokkbilder; materialiseres ved publisering. */
  async function setEntryImage(id, entryId, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const img = await compressOrTrim(file);
    setEntryField(id, entryId, 'image', img.dataUrl);
  }

  /* ---------- Plugins-panelet ---------- */

  // plugins.json gjennom samme utkastflyt som resten: endringer er utkast til de publiseres.
  // Merk: forhåndsvisningen laster plugins fra SERVEREN ved boot, så aktivering vises først etter publisering og deploy.
  let pluginsStore = null;
  /** Eksplisitt løfte som finnes fra første øyeblikk: onReady venter ALLTID på det, så en rask iframe aldri kan få tom plugin-liste (kappløpet var tydeligst på lokal server). */
  let resolvePluginsReady;
  const pluginsReady = new Promise((resolve) => { resolvePluginsReady = resolve; });
  let pluginsView = $state(null);
  let pluginInfo = $state({});
  let pluginEngine = $state('0.0.0');
  let newPluginId = $state('');
  let pluginError = $state('');
  /** Plugin-mapper funnet i repoet (via publiseringslaget) som ikke står i plugins.json ennå. */
  let pluginsFound = $state([]);
  /** 'pending' | 'ok' | 'unavailable': skriv-inn-navn-feltet er kun reserveløsning når oppdagelsen ikke virker. */
  let pluginDiscovery = $state('pending');

  /** Alle plugin-idene panelet kjenner: aktive + deaktiverte (mappene består i repoet). */
  const knownPlugins = () => [...new Set([...(pluginsView?.enabled ?? []), ...(pluginsView?.disabled ?? [])])];

  function syncPluginsView() {
    pluginsView = JSON.parse(JSON.stringify(pluginsStore.data));
  }

  async function initPlugins() {
    let published = { version: 1, enabled: [] };
    try {
      published = await (await fetch('/plugins/plugins.json')).json();
    } catch { /* ingen plugin-indeks er helt greit */ }
    pluginsStore = createDraftStore('urd-draft-plugins', () => published, draftSaveError);
    syncPluginsView();
    try {
      pluginEngine = (await (await fetch('/urd.json')).json()).engine ?? '0.0.0';
    } catch { /* uten manifest vises versjonskrav uten vurdering */ }
    for (const id of knownPlugins()) loadPluginInfo(id);
    discoverPlugins();
    resolvePluginsReady();
    // Belte og bukseseler mot klar-kappløpet: har iframen alt meldt seg, dyttes listen nå.
    bridge?.sendPlugins($state.snapshot(pluginsView)?.enabled ?? []);
  }

  /** Spør publiseringslaget om plugin-mappene i repoet (statisk hosting kan ikke liste mapper).
   *  Utilgjengelig endepunkt (lokal server, ikke innlogget) er helt greit: da gjelder skriv-inn-navn-flyten. */
  async function discoverPlugins() {
    try {
      const res = await fetch('/api/github/plugins');
      if (!res.ok) {
        useCachedDiscovery();
        return;
      }
      const { plugins } = await res.json();
      localStorage.setItem('urd-plugins-found', JSON.stringify(plugins ?? []));
      pluginsFound = (plugins ?? []).filter((id) => !knownPlugins().includes(id));
      for (const id of pluginsFound) loadPluginInfo(id);
      pluginDiscovery = 'ok';
    } catch {
      useCachedDiscovery();
    }
  }

  /** Ratebegrenset/utilgjengelig endepunkt: vis sist kjente funnliste fra lokal buffer i stedet for ingenting. */
  function useCachedDiscovery() {
    try {
      const cached = JSON.parse(localStorage.getItem('urd-plugins-found') ?? '[]');
      if (Array.isArray(cached) && cached.length) {
        pluginsFound = cached.filter((id) => !knownPlugins().includes(id));
        for (const id of pluginsFound) loadPluginInfo(id);
        pluginDiscovery = 'ok';
        return;
      }
    } catch { /* korrupt buffer ignoreres */ }
    pluginDiscovery = 'unavailable';
  }

  /** Henter og vurderer manifestet til én plugin (navn, versjon, krav, provides, csp). */
  async function loadPluginInfo(id) {
    try {
      const manifest = await (await fetch(`/plugins/${id}/plugin.json`)).json();
      const errors = validateManifest(manifest);
      pluginInfo[id] = {
        ...manifest,
        errors,
        satisfied: errors.length === 0 && satisfiesEngine(pluginEngine, manifest.requiresEngine),
      };
    } catch {
      pluginInfo[id] = { name: id, errors: [ta('plugin.manifestNotFound', { id })], satisfied: false };
    }
  }

  function setPluginEnabled(id, on) {
    pushHistory('plugins');
    const d = pluginsStore.data;
    d.enabled = (d.enabled ?? []).filter((x) => x !== id);
    d.disabled = (d.disabled ?? []).filter((x) => x !== id);
    if (on) d.enabled.push(id);
    else d.disabled.push(id);
    pluginsStore.save();
    updateDirty();
    syncPluginsView();
    reloadPreview();
  }

  /** Plugin-endringer krever fersk boot i previewen (import kan ikke angres); onReady sender ny liste. */
  function reloadPreview() {
    if (iframeEl) iframeEl.src = iframeEl.src;
  }

  /** Fjerner pluginen fra begge listene; selve mappen i plugins/ består i repoet. */
  function removePlugin(id) {
    pushHistory('plugins');
    const d = pluginsStore.data;
    d.enabled = (d.enabled ?? []).filter((x) => x !== id);
    d.disabled = (d.disabled ?? []).filter((x) => x !== id);
    pluginsStore.save();
    updateDirty();
    syncPluginsView();
    reloadPreview();
  }

  async function addPlugin() {
    pluginError = '';
    const id = newPluginId.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) {
      pluginError = ta('plugin.invalidId');
      return;
    }
    if (knownPlugins().includes(id)) {
      pluginError = ta('plugin.alreadyListed');
      return;
    }
    await loadPluginInfo(id);
    if (pluginInfo[id].errors.length) {
      pluginError = ta('plugin.invalidManifest', { errors: pluginInfo[id].errors.join('; ') });
      return;
    }
    setPluginEnabled(id, true);
    newPluginId = '';
  }

  function addFoundPlugin(id) {
    pluginsFound = pluginsFound.filter((x) => x !== id);
    setPluginEnabled(id, true);
  }

  /* ---------- Footer-panelet ---------- */

  function footerMutate(key, fn) {
    siteMutate(key, () => {
      siteDraft.footer ??= { version: 1, show: false, text: '', align: 'center' };
      fn(siteDraft.footer);
    });
  }

  /* Rik footer (additiv fra v0.6): merkevare, kolonner, sosiale lenker,
   * bunnlinje og bakgrunn. Speiler nav-handlerne, men gjennom footerMutate. */

  function setFooterBrand(field, value) {
    footerMutate(`edit:footer-brand-${field}`, (f) => {
      f.brand ??= {};
      if (value.trim()) f.brand[field] = value; else delete f.brand[field];
      if (!f.brand.title && !f.brand.tagline && !f.brand.logo) delete f.brand;
    });
  }

  /* Footer-logo (tekst/logo/begge, speiler nav-logoen): opplasting til webp,
     materialiseres til media/ ved publisering. */
  function setFooterBrandMode(value) {
    footerMutate('footer', (f) => {
      f.brand ??= {};
      if (value === 'image' || value === 'both') f.brand.mode = value; else delete f.brand.mode;
    });
  }
  async function uploadFooterLogo(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      footerMutate('footer', (f) => { f.brand ??= {}; f.brand.logo = img.dataUrl; if (!f.brand.mode) f.brand.mode = 'both'; });
    } catch {
      setStatus(ta('status.imageReadErrorSvg'), 'error');
    }
  }
  function removeFooterLogo() {
    footerMutate('footer', (f) => {
      if (!f.brand) return;
      delete f.brand.logo; delete f.brand.mode; delete f.brand.logoHeight;
      if (!f.brand.title && !f.brand.tagline) delete f.brand;
    });
  }
  function setFooterLogoHeight(value) {
    footerMutate('edit:footer-logo-height', (f) => {
      f.brand ??= {};
      const n = Number(value);
      if (Number.isFinite(n)) f.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n)));
    });
  }

  function setFooterCopyright(value) {
    footerMutate('edit:footer-copyright', (f) => {
      if (value.trim()) f.copyright = value; else delete f.copyright;
    });
  }

  /* Footer-maler: åtte research-baserte startoppsett, bygget fra sidens egne
     sider og tittel. Fyller footeren; alt redigeres videre. Hver har en liten
     thumb-beskrivelse til den visuelle mal-velgeren (footerThumb). */
  const FOOTER_TEMPLATES = [
    { id: 'minimal', label: ta('footerTemplate.minimal'), thumb: { center: true, social: 2, baselineLinks: 1 } },
    { id: 'sentrert', label: ta('footerTemplate.sentrert'), thumb: { center: true, row: true, social: 3 } },
    { id: 'kolonner', label: ta('footerTemplate.kolonner'), thumb: { tag: true, cols: 3, social: 3, baselineLinks: 2 } },
    { id: 'sitemap', label: ta('footerTemplate.sitemap'), thumb: { tag: true, fat: true, cols: 4, social: 4, baselineLinks: 3 } },
    { id: 'nyhetsbrev', label: ta('footerTemplate.nyhetsbrev'), thumb: { tag: true, cta: true, cols: 2, social: 2, baselineLinks: 1 } },
    { id: 'storcta', label: ta('footerTemplate.storcta'), thumb: { center: true, bigcta: true, baselineLinks: 2 } },
    { id: 'kontakt', label: ta('footerTemplate.kontakt'), thumb: { tag: true, cols: 3, social: 2, baselineLinks: 1 } },
    { id: 'mega', label: ta('footerTemplate.mega'), thumb: { tag: true, mega: true, cols: 2, social: 4, baselineLinks: 2 } },
  ];

  function footerTemplateConfig(name) {
    // ALLTID nøytral plassholder, ALDRI sidetittelen: sidetittelen kan inneholde
    // hva som helst (f.eks. et versjonsnummer på en testside), og eksempeltekst
    // skal aldri ha versjonsnummer. Eieren skriver inn sitt eget navn.
    const title = ta('seed.orgName');
    const pages = siteDraft.pages ?? [];
    const pageLinks = (n) => pages.slice(0, n).map((p) => ({ label: p.title || p.id, page: p.id }));
    const soc = (ids) => ids.map((icon) => ({ icon, url: `https://${icon}.com` }));
    const ext = (label, href) => ({ label, href });
    const copyright = `© ${title}`;
    if (name === 'minimal') {
      return { align: 'center', brand: { title }, social: soc(['facebook', 'instagram']),
        copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    if (name === 'sentrert') {
      return { align: 'center', brand: { title }, linkRow: pageLinks(5),
        social: soc(['facebook', 'instagram', 'x']), copyright: `${copyright} · ${ta('seed.footer.madeWith')}` };
    }
    if (name === 'kolonner') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline1') },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
          { title: ta('seed.footer.colCompany'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.join'), '#'), ext(ta('seed.footer.press'), '#')] },
          { title: ta('seed.footer.colResources'), links: [ext(ta('seed.footer.bylaws'), '#'), ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.contact'), '#')] },
        ],
        social: soc(['facebook', 'instagram', 'linkedin']), copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#')] };
    }
    if (name === 'sitemap') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline2') },
        columns: [
          { title: ta('seed.footer.colExplore'), links: [ext(ta('seed.footer.home'), '#'), ext(ta('seed.footer.events'), '#'), ext(ta('seed.footer.gallery'), '#'), ext(ta('seed.footer.blog'), '#')] },
          { title: ta('seed.footer.colCompany'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.history'), '#'), ext(ta('seed.footer.press'), '#'), ext(ta('seed.footer.contact'), '#')] },
          { title: ta('seed.footer.colSupport'), links: [ext(ta('seed.join'), '#'), ext(ta('seed.footer.faq'), '#'), ext(ta('seed.footer.help'), '#')] },
          { title: ta('seed.footer.colLegal'), links: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#'), ext(ta('seed.footer.bylaws'), '#')] },
        ],
        social: soc(['facebook', 'instagram', 'linkedin', 'youtube']), copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#'), ext(ta('seed.footer.cookies'), '#')] };
    }
    if (name === 'nyhetsbrev') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline3') },
        cta: { kind: 'newsletter', heading: ta('seed.footer.newsletterHeading'), label: ta('seed.footer.newsletterButton'), recipient: ta('seed.email'), success: ta('seed.footer.newsletterSuccess') },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
          { title: ta('seed.footer.colMore'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.contact'), '#'), ext(ta('seed.footer.privacy'), '#')] },
        ],
        social: soc(['facebook', 'instagram']), copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    if (name === 'storcta') {
      return { align: 'center',
        cta: { kind: 'button', big: true, heading: ta('seed.footer.ctaHeading'), sub: ta('seed.footer.ctaSub'), label: ta('seed.join'), href: '#' },
        linkRow: pageLinks(4), social: soc(['facebook', 'instagram', 'x']), copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#')] };
    }
    if (name === 'kontakt') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline4') },
        columns: [
          { title: ta('seed.footer.colVisit'), links: [ext(ta('seed.footer.address'), '#'), ext(ta('seed.email'), 'mailto:post@dinforening.no'), ext('+47 22 00 00 00', 'tel:+4722000000')] },
          { title: ta('seed.footer.colHours'), links: [ext(ta('seed.footer.hours1'), '#'), ext(ta('seed.footer.hours2'), '#')] },
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
        ],
        social: soc(['facebook', 'instagram']), copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    // mega: kolonner + bakgrunnslag (glød + korn).
    return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline5') },
      columns: [
        { title: ta('seed.footer.colExplore'), links: pageLinks(4) },
        { title: ta('seed.footer.colFollow'), links: [ext(ta('seed.footer.newsletter'), '#'), ext(ta('seed.email'), 'mailto:post@dinforening.no')] },
      ],
      social: soc(['facebook', 'instagram', 'linkedin', 'youtube']), copyright,
      baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.madeWith'), '#')],
      background: { version: 1, layers: [
        { type: 'glow', version: glowLayer.version ?? 1, props: { ...glowLayer.defaults(), color: 'accent', x: 0.12, y: 0, radius: 0.6, opacity: 0.45 } },
        { type: 'grain', version: grainLayer.version ?? 1, props: { ...grainLayer.defaults(), opacity: 0.08 } },
      ] } };
  }

  /** Bruk et footer-oppsett: erstatter innholds-feltene og skrur footeren på. */
  function applyFooterTemplate(name) {
    footerMutate('footer-template', (f) => {
      const t = footerTemplateConfig(name);
      f.show = true;
      delete f.text; // «Enkel tekst» er den gamle formen; malene bruker rik footer.
      for (const k of ['align', 'brand', 'columns', 'social', 'copyright', 'baseline', 'linkRow', 'cta', 'columnsAlign', 'background']) {
        if (t[k] !== undefined) f[k] = t[k]; else delete f[k];
      }
    });
  }

  /* Generiske lenkeliste-handlere for bunnlinje-lenker (baseline) og doormat-
     raden (linkRow) - samme form som kolonne-lenkene, men på en flat liste. */
  function addFooterListLink(field) {
    footerMutate('footer', (f) => {
      f[field] ??= [];
      f[field].push(siteDraft.pages[0] ? { label: ta('seed.link'), page: siteDraft.pages[0].id } : { label: ta('seed.link'), href: 'https://' });
    });
  }
  function removeFooterListLink(field, i) {
    footerMutate('footer', (f) => { f[field].splice(i, 1); if (!f[field].length) delete f[field]; });
  }
  function moveFooterListLink(field, i, dir) {
    footerMutate('footer', (f) => {
      const a = f[field]; const j = i + dir;
      if (j < 0 || j >= a.length) return;
      [a[i], a[j]] = [a[j], a[i]];
    });
  }
  function setFooterListLinkLabel(field, i, value) {
    footerMutate(`edit:footer-${field}-label-${i}`, (f) => { f[field][i].label = value; });
  }
  function setFooterListLinkTarget(field, i, value) {
    footerMutate('footer', (f) => {
      const link = f[field][i];
      if (value === '__href') { delete link.page; link.href = link.href ?? 'https://'; }
      else { link.page = value; delete link.href; }
    });
  }
  function setFooterListLinkHref(field, i, value) {
    footerMutate(`edit:footer-${field}-href-${i}`, (f) => { f[field][i].href = value; });
  }

  /** Kolonne-justering: overskriften til en bred (todelt) kolonne. */
  function setFooterColumnsAlign(value) {
    footerMutate('footer', (f) => { if (value === 'center') f.columnsAlign = 'center'; else delete f.columnsAlign; });
  }

  /* Handlingsoppfordring (CTA): knapp (lenke) eller nyhetsbrev (e-postfelt). */
  function enableFooterCta(on) {
    footerMutate('footer', (f) => { if (on) f.cta ??= { kind: 'button', label: ta('seed.join') }; else delete f.cta; });
  }
  function setFooterCtaField(field, value) {
    footerMutate(`edit:footer-cta-${field}`, (f) => {
      f.cta ??= {};
      if (value === '' || value == null || value === false) delete f.cta[field];
      else f.cta[field] = value;
    });
  }
  function setFooterCtaTarget(value) {
    footerMutate('footer', (f) => {
      f.cta ??= {};
      if (value === '__href') { delete f.cta.page; f.cta.href = f.cta.href ?? 'https://'; }
      else { f.cta.page = value; delete f.cta.href; }
    });
  }

  /** Per-side synlighet: footeren vises på alle sider unntatt de i hideOn. */
  function toggleFooterOnPage(pageId, show) {
    footerMutate('footer', (f) => {
      const hide = new Set(f.hideOn ?? []);
      if (show) hide.delete(pageId); else hide.add(pageId);
      if (hide.size) f.hideOn = [...hide]; else delete f.hideOn;
    });
  }


  function addFooterColumn() {
    footerMutate('footer', (f) => {
      f.columns ??= [];
      f.columns.push({ title: ta('seed.column'), links: [{ label: ta('seed.link'), page: siteDraft.pages[0].id }] });
    });
  }

  function removeFooterColumn(ci) {
    footerMutate('footer', (f) => { f.columns.splice(ci, 1); if (!f.columns.length) delete f.columns; });
  }

  function moveFooterColumn(ci, dir) {
    footerMutate('footer', (f) => {
      const j = ci + dir;
      if (j < 0 || j >= f.columns.length) return;
      [f.columns[ci], f.columns[j]] = [f.columns[j], f.columns[ci]];
    });
  }

  function setFooterColumnTitle(ci, value) {
    footerMutate(`edit:footer-col-title-${ci}`, (f) => { f.columns[ci].title = value; });
  }

  function addFooterLink(ci) {
    footerMutate('footer', (f) => {
      f.columns[ci].links ??= [];
      f.columns[ci].links.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  function removeFooterLink(ci, li) {
    footerMutate('footer', (f) => { f.columns[ci].links.splice(li, 1); });
  }

  function moveFooterLink(ci, li, dir) {
    footerMutate('footer', (f) => {
      const links = f.columns[ci].links;
      const j = li + dir;
      if (j < 0 || j >= links.length) return;
      [links[li], links[j]] = [links[j], links[li]];
    });
  }

  function setFooterLinkLabel(ci, li, value) {
    footerMutate(`edit:footer-link-label-${ci}-${li}`, (f) => { f.columns[ci].links[li].label = value; });
  }

  function setFooterLinkTarget(ci, li, value) {
    footerMutate('footer', (f) => {
      const link = f.columns[ci].links[li];
      if (value === '__href') { delete link.page; link.href = link.href ?? 'https://'; }
      else { link.page = value; delete link.href; }
    });
  }

  function setFooterLinkHref(ci, li, value) {
    footerMutate(`edit:footer-link-href-${ci}-${li}`, (f) => { f.columns[ci].links[li].href = value; });
  }

  function addFooterSocial() {
    footerMutate('footer', (f) => { f.social ??= []; f.social.push({ icon: 'facebook', url: 'https://' }); });
  }

  function removeFooterSocial(si) {
    footerMutate('footer', (f) => { f.social.splice(si, 1); if (!f.social.length) delete f.social; });
  }

  function moveFooterSocial(si, dir) {
    footerMutate('footer', (f) => {
      const j = si + dir;
      if (j < 0 || j >= f.social.length) return;
      [f.social[si], f.social[j]] = [f.social[j], f.social[si]];
    });
  }

  function setFooterSocialIcon(si, id) {
    footerMutate('footer', (f) => { f.social[si].icon = id; });
  }

  function setFooterSocialUrl(si, value) {
    footerMutate(`edit:footer-social-url-${si}`, (f) => { f.social[si].url = value; });
  }

  // Sosial-ikonene i nedtrekket: de sosiale og kommunikasjonskategoriene fra ikonbiblioteket.
  const SOCIAL_ICON_OPTIONS = ICON_CATEGORIES
    .filter(([cat]) => cat === 'iconCat.social' || cat === 'iconCat.communication')
    .flatMap(([, ids]) => ids.map((id) => [id, ICON_LIBRARY[id].label]));

  function setNavLabel(i, value) {
    siteMutate(`edit:nav-label-${i}`, () => { siteDraft.nav.items[i].label = value; });
  }

  /** Mål: en side fra registeret, '__href' = ekstern lenke, eller '__none' =
   *  ren åpner for undermenyen (tilbys kun for punkter med undermeny).
   *  Skjemaet tillater kun ett av feltene page/href, så resten fjernes. */
  function setNavTarget(i, value) {
    siteMutate('nav', () => {
      const item = siteDraft.nav.items[i];
      if (value === '__href') {
        delete item.page;
        item.href = item.href ?? 'https://';
      } else if (value === '__none') {
        delete item.page;
        delete item.href;
      } else {
        item.page = value;
        delete item.href;
      }
    });
  }

  function setNavHref(i, value) {
    siteMutate(`edit:nav-href-${i}`, () => { siteDraft.nav.items[i].href = value; });
  }

  function moveNavItem(i, dir) {
    const j = i + dir;
    const items = siteDraft.nav.items;
    if (j < 0 || j >= items.length) return;
    siteMutate('nav', () => { [items[i], items[j]] = [items[j], items[i]]; });
  }

  function removeNavItem(i) {
    siteMutate('nav', () => { siteDraft.nav.items.splice(i, 1); });
  }

  function addNavItem() {
    siteMutate('nav', () => {
      siteDraft.nav.items.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  /* Undermeny (ett nivå, additivt fra v0.6): barna har alltid eget mål;
   * forelderen kan i tillegg være ren åpner ('__none' i setNavTarget). */

  function addNavChild(i) {
    siteMutate('nav', () => {
      const item = siteDraft.nav.items[i];
      item.children ??= [];
      item.children.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  function setNavChildLabel(i, j, value) {
    siteMutate(`edit:nav-child-label-${i}-${j}`, () => { siteDraft.nav.items[i].children[j].label = value; });
  }

  function setNavChildTarget(i, j, value) {
    siteMutate('nav', () => {
      const child = siteDraft.nav.items[i].children[j];
      if (value === '__href') {
        delete child.page;
        child.href = child.href ?? 'https://';
      } else {
        child.page = value;
        delete child.href;
      }
    });
  }

  function setNavChildHref(i, j, value) {
    siteMutate(`edit:nav-child-href-${i}-${j}`, () => { siteDraft.nav.items[i].children[j].href = value; });
  }

  function moveNavChild(i, j, dir) {
    const k = j + dir;
    const children = siteDraft.nav.items[i].children;
    if (k < 0 || k >= children.length) return;
    siteMutate('nav', () => { [children[j], children[k]] = [children[k], children[j]]; });
  }

  function removeNavChild(i, j) {
    siteMutate('nav', () => {
      const item = siteDraft.nav.items[i];
      item.children.splice(j, 1);
      if (item.children.length === 0) {
        // Tom undermeny fjernes fra fila; en ren åpner uten barn har ikke
        // lenger noe mål og får forsiden, så punktet forblir gyldig.
        delete item.children;
        if (!item.page && !item.href) item.page = siteDraft.pages[0].id;
      }
    });
  }

  /* ---------- Tema-panelet ---------- */

  function setColorToken(name, value) {
    siteMutate(`edit:theme-color-${name}`, () => {
      siteDraft.theme.tokens.color[name] = value;
      // Auto-avledet mørkt tema følger de lyse fargene automatisk.
      if (siteDraft.theme.alt?.auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  function setFontToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.font[name] = value; });
  }

  function setRadiusToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.radius[name] = value; });
  }

  /* ---------- Lys/mørk-bryteren (alternativt tema) ---------- */

  /** Inverterer lysheten til en #rrggbb-farge (HSL: L -> 1-L); annet passerer urørt.
   *  Brukes som FORSLAG til alt-temaet - eieren justerer selv etterpå. */
  function invertLightness(hex) {
    const m = /^#([0-9a-f]{6})$/i.exec(hex ?? '');
    if (!m) return hex;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const l = (max + min) / 2;
    const d = max - min;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h = (h * 60 + 360) % 360;
    }
    const li = 1 - l;
    const c = (1 - Math.abs(2 * li - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const mm = li - c / 2;
    const [rr, gg, bb] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
      : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    const toHex = (v) => Math.round((v + mm) * 255).toString(16).padStart(2, '0');
    return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
  }

  function suggestAltColors() {
    return Object.fromEntries(
      Object.entries(siteDraft.theme.tokens.color).map(([name, value]) => [name, invertLightness(value)]),
    );
  }

  function createAltTheme() {
    siteMutate('theme', () => {
      siteDraft.theme.alt = { tokens: { color: suggestAltColors() } };
    });
  }

  function reSuggestAltTheme() {
    siteMutate('theme', () => {
      siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  function removeAltTheme() {
    siteMutate('theme', () => { delete siteDraft.theme.alt; });
  }

  function setAltColorToken(name, value) {
    siteMutate(`edit:theme-alt-${name}`, () => {
      siteDraft.theme.alt.tokens.color[name] = value;
      // Å styre en mørk farge selv slår av auto-avledningen.
      siteDraft.theme.alt.auto = false;
    });
  }

  function setThemeScheme(value) {
    siteMutate('theme', () => {
      if (value === 'light') delete siteDraft.theme.scheme;
      else siteDraft.theme.scheme = value;
    });
  }

  /** Lys og mørk modus av/på: oppretter (auto-avledet) eller fjerner alt-temaet. */
  function setDualMode(on) {
    siteMutate('theme', () => {
      if (on) siteDraft.theme.alt = { auto: true, tokens: { color: suggestAltColors() } };
      else delete siteDraft.theme.alt;
    });
  }

  /** Mørke farger: Auto (avledet fra de lyse) eller Egne (styres selv). */
  function setAltAuto(auto) {
    siteMutate('theme', () => {
      siteDraft.theme.alt ??= { tokens: { color: suggestAltColors() } };
      siteDraft.theme.alt.auto = auto;
      if (auto) siteDraft.theme.alt.tokens.color = suggestAltColors();
    });
  }

  /** Font-nedtrekkets valg: kjente stabler + evt. gjeldende egendefinerte. */
  function fontOptions(which) {
    const cur = siteDraft.theme.tokens.font[which];
    return [
      ...(FONT_STACKS.some(([, v]) => v === cur) ? [] : [[cur, ta('opt.customFont')]]),
      ...FONT_STACKS.map(([name, value]) => [value, ta(name)]),
    ];
  }

  /** Hjørne-radius fra glidebryter (px). */
  const radiusNum = (v) => parseInt(v, 10) || 0;
  function setRadiusPx(name, n) { setRadiusToken(name, `${n}px`); }

  /** Løser en token-verdi til hex for forhåndsvisning (token-navn slås opp i paletten). */
  const themeHex = (v, pal) => (v && pal && pal[v]) ? pal[v] : v;

  /* Ferdige tema-forslag: fyller alle fargetokens + lys/mørk i ett klikk, så
     finjusterer eieren fritt (startpunkt, som seksjonstemaene). Fonter/avrunding
     røres ikke. Natt er mørk-først (scheme dark); resten lyse med mørkt alt. */
  const THEME_PRESET_KEYS = ['bg', 'surface', 'text', 'accent', 'accent-text'];
  const THEME_PRESETS = [
    { id: 'bronn', name: ta('themePreset.bronn.name'), note: ta('themePreset.bronn.note'),
      light: { bg: '#f6faf8', surface: '#ffffff', text: '#16211d', accent: '#15b39a', 'accent-text': '#04241d' },
      dark: { bg: '#0e1512', surface: '#17211d', text: '#eaf1ed', accent: '#22c3a8', 'accent-text': '#04241d' } },
    { id: 'stein', name: ta('themePreset.stein.name'), note: ta('themePreset.stein.note'),
      light: { bg: '#f4f2ed', surface: '#ffffff', text: '#262019', accent: '#8a5a41', 'accent-text': '#ffffff' },
      dark: { bg: '#17130e', surface: '#221c15', text: '#efe8dd', accent: '#c0906f', 'accent-text': '#1a1109' } },
    { id: 'plomme', name: ta('themePreset.plomme.name'), note: ta('themePreset.plomme.note'),
      light: { bg: '#faf5ff', surface: '#ffffff', text: '#2a1546', accent: '#7c3aed', 'accent-text': '#ffffff' },
      dark: { bg: '#140f20', surface: '#1f1733', text: '#ece5f8', accent: '#a97cf6', 'accent-text': '#170a2c' } },
    { id: 'rose', name: ta('themePreset.rose.name'), note: ta('themePreset.rose.note'),
      light: { bg: '#faf5f6', surface: '#ffffff', text: '#241a1d', accent: '#b04a63', 'accent-text': '#ffffff' },
      dark: { bg: '#171015', surface: '#22181c', text: '#f1e6ea', accent: '#d98098', 'accent-text': '#2a0f18' } },
    { id: 'hav', name: ta('themePreset.hav.name'), note: ta('themePreset.hav.note'),
      light: { bg: '#f1f6fb', surface: '#ffffff', text: '#13202b', accent: '#1a6fa8', 'accent-text': '#ffffff' },
      dark: { bg: '#0a1420', surface: '#12202f', text: '#e2edf5', accent: '#47a6df', 'accent-text': '#06131f' } },
    { id: 'natt', name: ta('themePreset.natt.name'), note: ta('themePreset.natt.note'), scheme: 'dark',
      light: { bg: '#f5f6fb', surface: '#ffffff', text: '#171a2b', accent: '#4f5ed6', 'accent-text': '#ffffff' },
      dark: { bg: '#0d0f1a', surface: '#171b2e', text: '#e7e9f5', accent: '#8091ff', 'accent-text': '#0a0c18' } },
  ];

  /** Anvend et tema-forslag: hovedmodus + alt-modus fylles fra paletten. */
  function applyThemePreset(pr) {
    siteMutate('theme', () => {
      const dark = pr.scheme === 'dark';
      const main = dark ? pr.dark : pr.light;
      const other = dark ? pr.light : pr.dark;
      for (const k of THEME_PRESET_KEYS) siteDraft.theme.tokens.color[k] = main[k];
      if (dark) siteDraft.theme.scheme = 'dark'; else delete siteDraft.theme.scheme;
      siteDraft.theme.alt = { tokens: { color: { ...other } } };
    });
  }

  /** Hvilket forslag som matcher gjeldende palett (for markering); null når eieren har finjustert. */
  const activeThemePreset = $derived.by(() => {
    if (!siteDraft) return null;
    const cur = siteDraft.theme.tokens.color;
    const alt = siteDraft.theme.alt?.tokens?.color ?? {};
    const dark = siteDraft.theme.scheme === 'dark';
    return THEME_PRESETS.find((pr) => {
      const main = dark ? pr.dark : pr.light;
      const other = dark ? pr.light : pr.dark;
      return THEME_PRESET_KEYS.every((k) => cur[k] === main[k] && alt[k] === other[k]);
    })?.id ?? null;
  });

  function toggleChrome() {
    chromeVisible = !chromeVisible;
    bridge?.sendChrome(chromeVisible);
  }

  /** Klikk-og-skriv-endring fra iframen: oppdater utkastet. Iframen viser
   *  allerede endringen, så vi pusher ikke tilbake (det ville ødelagt fokus). */
  function handleEdit(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    pushHistory(`edit:${msg.blockId}`);
    block.props = msg.props;
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
    // Bildeeditoren ber om rerender ved bildebytte (tomme blokker har ingen img å oppdatere live);
    // tekst-redigering gjør det aldri (ekko midt i skrivingen ville mistet skrivemarkøren).
    if (msg.rerender) bridge?.sendSection(pageId, section);
    status = '';
  }

  /** Dra/resize fra iframen: iframen viser allerede den snappede
   *  posisjonen, så vi bare bokfører den i utkastet. */
  function handleMove(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    // coalesce: automatisk vekst under skriving hører til samme angre-steg som selve skrivingen.
    // groupKey (fra z-omordningen) samler flytting av FLERE blokker i ett steg.
    pushHistory(msg.coalesce ? `edit:${msg.groupKey ?? msg.blockId}` : 'move-block');
    const key = msg.frameKey === 'mobile' ? 'mobile' : 'desktop';
    block.frames[key] = msg.frame;
    if (key === 'desktop') markDesktopChange(section, 'desktop-endret-etter-mobil');
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
  }

  /** Automatisk høydevekst for datablokker (samling/kalender/skjema/kart):
   *  KUN h endres, aldri x/y, så en dratt blokk aldri teleporteres tilbake.
   *  Coalesces med blokkens redigering (samme angre-steg). */
  function handleGrow(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block?.frames?.desktop || block.frames.desktop.h === msg.h) return;
    // Autovekst er en MÅLING, ikke en redigering: datablokker melder
    // høyden sin ved HVER rendering, og målingen varierer med innhold,
    // feed-svar og vindu. Målingen bokføres derfor i BÅDE utkastet og
    // sammenligningsgrunnlaget, så den aldri alene utgjør «upubliserte
    // endringer» (testfunn 23. juli 2026: merket dukket opp av seg
    // selv ved lasting, kom tilbake etter Forkast utkast, og ble stående
    // etter at alt var angret - målte høyder skilte utkast fra publisert).
    store.amendBaseline((base) => {
      const s = base.sections.find((x) => x.id === msg.sectionId);
      const b = s?.blocks.find((x) => x.id === msg.blockId);
      if (b?.frames?.desktop) b.frames.desktop.h = msg.h;
    });
    if (store.hasDraft()) pushHistory(`edit:${msg.blockId}`);
    block.frames.desktop.h = msg.h;
    // save() rydder utkastnøkkelen når målingen var eneste forskjell.
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
  }

  /** Seksjon materialisert i mobilvisning: manuell modus + alle frames. */
  function handleMobileManual(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    pushHistory('mobile-manual');
    for (const { blockId, frame } of msg.frames) {
      const block = section.blocks.find((b) => b.id === blockId);
      if (block) block.frames.mobile = frame;
    }
    section.responsive = {
      ...(section.responsive ?? {}),
      mobile: { mode: 'manual', attention: section.responsive?.mobile?.attention ?? null },
    };
    store.save();
    updateDirty();
    // Ingen sendSection: iframen har allerede konvertert seg selv.
  }

  /** ↺ i mobilvisning: tilbake til auto-avledet layout. */
  function handleMobileAuto(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    pushHistory('mobile-auto');
    for (const block of section.blocks) block.frames.mobile = null;
    section.responsive = { ...(section.responsive ?? {}), mobile: { mode: 'auto', attention: null } };
    store.save();
    updateDirty();
    updateAttention();
    bridge?.sendSection(pageId, section);
  }

  /** ✓ i mobilvisning: mobil-layouten er gjennomgått. */
  function handleReviewDone(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section?.responsive?.mobile) return;
    pushHistory('review-done');
    section.responsive.mobile.attention = null;
    store.save();
    updateDirty();
    updateAttention();
  }

  /** Dekor-flagget: blokken utelates fra auto-avledet mobil-layout. */
  function handleBlockFlag(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    pushHistory('decor');
    block.decor = msg.decor;
    store.save();
    updateDirty();
    if (selectedBlock?.blockId === msg.blockId) syncSelectedBlock();
  }

  /** Ny seksjon fra «+ Ny seksjon» i iframen (seksjonen er allerede
   *  bygget av presetens create() der inne). */
  function handleAddSection(msg) {
    pushHistory('add-section');
    // Vern: en seksjon MÅ ha id (skjemaet krever det). Kjernepresetene setter
    // den selv, men en plugin-preset kan glemme den, og en id-løs seksjon ville
    // gjort sidefilen ugyldig ved publisering. Tildel en her om den mangler.
    if (!msg.section.id) msg.section.id = makeId('sec');
    store.data.sections.splice(msg.index, 0, msg.section);
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
    // Ny seksjon markeres og Egenskaper åpnes, klar til justering.
    activeSectionId = msg.section.id;
    syncSectionMirrors(msg.section);
    if (activePanel !== 'properties') {
      activePanel = 'properties';
      bridge?.sendShowGrid(false);
    }
  }

  function handleMoveSection(msg) {
    const s = store.data.sections;
    const i = s.findIndex((x) => x.id === msg.sectionId);
    const j = i + msg.dir;
    if (i < 0 || j < 0 || j >= s.length) return;
    pushHistory('move-section');
    [s[i], s[j]] = [s[j], s[i]];
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
  }

  function handleDeleteSection(msg) {
    pushHistory('delete-section');
    if (msg.sectionId === activeSectionId) {
      activeSectionId = null;
      sectionGrid = null;
    }
    // En markert blokk i den slettede seksjonen skal ikke bli stående i Egenskaper-panelet.
    if (selectedBlock?.sectionId === msg.sectionId) selectedBlock = null;
    store.data.sections = store.data.sections.filter((x) => x.id !== msg.sectionId);
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
  }

  /** Høyde-dra i iframen: iframen viser allerede den nye høyden,
   *  så vi bare bokfører den. */
  function handleSectionSize(msg) {
    const section = store.data.sections.find((x) => x.id === msg.sectionId);
    if (!section) return;
    pushHistory('section-size');
    section.size = { ...section.size, minHeight: msg.minHeight };
    // Toppkant-håndtaket: seksjonen vokste/krympet i toppen, og alle
    // blokkene forskyves i SAMME angre-steg (innholdet sto visuelt
    // stille i previewen; her bokføres de nye y-ene).
    for (const move of msg.moves ?? []) {
      const block = section.blocks.find((b) => b.id === move.blockId);
      if (!block) continue;
      block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
    }
    if (msg.moves?.length) {
      markDesktopChange(section, 'seksjonshøyde');
      if (selectedBlock?.sectionId === msg.sectionId) syncSelectedBlock();
    }
    if (msg.sectionId === activeSectionId) sectionMinHeight = msg.minHeight;
    store.save();
    updateDirty();
  }

  /** Blokk sluppet i en annen seksjon: flytt den dit i utkastet. */
  function handleMoveBlockSection(msg) {
    const from = store.data.sections.find((s) => s.id === msg.fromSectionId);
    const to = store.data.sections.find((s) => s.id === msg.toSectionId);
    const block = from?.blocks.find((b) => b.id === msg.blockId);
    if (!from || !to || !block) return;
    pushHistory('move-block');
    from.blocks = from.blocks.filter((b) => b.id !== msg.blockId);
    block.frames.desktop = msg.frame;
    // Mobil-layouten avledes på nytt i den nye seksjonen.
    block.frames.mobile = null;
    to.blocks.push(block);
    markDesktopChange(from, 'blokk-flyttet');
    markDesktopChange(to, 'blokk-flyttet');
    store.save();
    updateDirty();
    updateAttention();
    bridge?.sendPage(pageId, store.data);
    if (selectedBlock?.blockId === msg.blockId) {
      selectedBlock = { ...selectedBlock, sectionId: msg.toSectionId };
      syncSelectedBlock();
    }
  }

  /** Sletting: fjern fra utkastet og rerender seksjonen i iframen. */
  function handleDelete(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    // blockIds (multimarkering): hele utvalget slettes som ETT angre-steg.
    const ids = msg.blockIds ?? [msg.blockId];
    pushHistory('delete-block');
    section.blocks = section.blocks.filter((b) => !ids.includes(b.id));
    if (ids.includes(selectedBlock?.blockId)) selectedBlock = null;
    markDesktopChange(section, 'blokk-slettet');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** Blokkpaletten: ny blokk nederst i første seksjon, klar til å dras dit
   *  den skal. (Seksjonvalg og «+ Ny seksjon» kommer senere i v0.3.) */
  /** w i prosent av seksjonsbredden, h i px (fysiske enheter). */
  const BLOCK_DEFAULTS = {
    text: { type: 'text', props: { html: ta('seed.text'), align: 'left' }, w: 33, h: 28 },
    'text-box': { type: 'text', props: { html: ta('seed.textBox'), align: 'left', box: true }, w: 30, h: 150 },
    button: { type: 'button', props: { label: ta('seed.newButton'), page: null, href: null, style: 'primary' }, w: 20, h: 36 },
    'shape-line': { type: 'shape', decor: true, props: { kind: 'line', color: 'accent', thickness: 2, fill: null }, w: 25, h: 8 },
    'shape-arrow': { type: 'shape', decor: true, props: { kind: 'arrow', color: 'accent', thickness: 2, fill: null }, w: 25, h: 16 },
    'shape-circle': { type: 'shape', decor: true, props: { kind: 'circle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
    'shape-rect': { type: 'shape', decor: true, props: { kind: 'rect', color: 'accent', thickness: 2, fill: null }, w: 20, h: 110 },
    'shape-triangle': { type: 'shape', decor: true, props: { kind: 'triangle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
    image: { type: 'image', props: { src: '', alt: '', fit: 'cover', radius: 'md', href: null }, w: 30, h: 220 },
    video: { type: 'video', props: { url: '', title: 'Video' }, w: 45, h: 300 },
    icon: { type: 'icon', decor: true, props: { glyph: '★', color: 'accent', size: 48 }, w: 8, h: 64 },
    samling: { type: 'samling', props: { collection: null, view: 'cards', limit: 6, newestFirst: true }, w: 90, h: 200 },
    galleri: { type: 'galleri', props: { images: [], view: 'grid', columns: 3, gap: 12, radius: 'md', lightbox: true, interval: 5 }, w: 90, h: 320 },
    faq: {
      type: 'faq',
      props: {
        items: [
          { q: ta('seed.faq.q1'), a: ta('seed.faq.answer') },
          { q: ta('seed.faq.q2'), a: ta('seed.faq.answer') },
          { q: ta('seed.faq.q3'), a: ta('seed.faq.answer') },
        ],
        multi: false,
      },
      w: 50, h: 220,
    },
  };

  function buildBlock(kind) {
    const d = BLOCK_DEFAULTS[kind];
    if (!d) return null;
    return {
      id: makeId('blk'),
      type: d.type,
      version: 1,
      // Former er dekor som standard: de utelates fra auto-avledet
      // mobil-layout (kan skrus av per blokk med telefon-togglen).
      decor: Boolean(d.decor),
      props: structuredClone(d.props),
      animation: null,
      frames: { desktop: { x: 4, y: 8, w: d.w, h: d.h, z: 1, rot: 0 }, mobile: null },
    };
  }

  /** Iframen plasserer blokken midt i synsfeltet (den vet hvor brukeren
   *  har scrollet) og melder tilbake via urd-add-block → insertBlock. */
  function requestPlacement(block) {
    if (bridge) {
      bridge.sendPlaceBlock(block);
    } else {
      insertBlock(targetSection()?.id, block);
    }
  }

  function insertBlock(sectionId, block) {
    const section = store.data.sections.find((s) => s.id === sectionId) ?? store.data.sections[0];
    if (!section) return;
    pushHistory('add-block');
    // Nye og dupliserte blokker legges ØVERST i lagrekkefølgen, så de aldri
    // gjemmer seg bak det som alt står i seksjonen (valgt 19. juli 2026).
    const topZ = Math.max(0, ...section.blocks.map((b) => b.frames?.desktop?.z ?? 1)) + 1;
    if (block.frames?.desktop) block.frames.desktop = { ...block.frames.desktop, z: topZ };
    section.blocks.push(block);
    markDesktopChange(section, 'blokk-lagt-til');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** «+ kort/rad»-knappen på en seksjon: preset-elementet kommer som en gruppe blokker i ETT angre-steg.
   *  moves flytter eksisterende blokker samtidig (FAQ skyver avslutningslinjen ned), i samme steg.
   *  Seksjonen vokser til minBottom når minstehøyden er i px (item-presetene bruker alltid px). */
  function insertBlocks(sectionId, blocks, minBottom, moves) {
    const section = store.data.sections.find((s) => s.id === sectionId);
    if (!section || !blocks?.length) return;
    pushHistory('add-blocks');
    for (const move of moves ?? []) {
      const block = section.blocks.find((b) => b.id === move.blockId);
      if (block && typeof move.dy === 'number') {
        block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
      }
    }
    section.blocks.push(...blocks);
    const current = String(section.size?.minHeight ?? '');
    if (minBottom && current.endsWith('px') && Number.parseFloat(current) < minBottom) {
      section.size = { ...section.size, minHeight: `${minBottom}px` };
    }
    markDesktopChange(section, 'blokk-lagt-til');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  function addBlock(kind) {
    requestPlacement(buildBlock(kind));
  }

  /** Plugin-blokkene i Blokker-panelet: previewen meldte type/label/defaults
   *  ved plugin-lasting (urd-plugin-blocks), så blokken kan bygges her. */
  let pluginBlocks = $state([]);

  function addPluginBlock(entry, extraProps = {}) {
    requestPlacement({
      id: makeId('blk'),
      type: entry.type,
      version: entry.version ?? 1,
      decor: false,
      props: { ...structuredClone(entry.defaults ?? {}), ...structuredClone(extraProps) },
      animation: null,
      frames: { desktop: { x: 25, y: 40, w: 50, h: 260, z: 1, rot: 0 }, mobile: null },
    });
  }

  /** «+ Legg til blokk» i en seksjon: bygg blokken og legg den der.
   *  Med klikkpunkt (msg.at, fra dobbeltklikk på seksjonsflaten) lander
   *  blokken sentrert på punktet, klemt og snappet (frameAtPoint);
   *  uten sentreres den vannrett som før. Bilde starter tomt (velges i
   *  Egenskaper - fildialog kan ikke åpnes fra en postMessage). */
  function handleRequestBlock(msg) {
    const block = buildBlock(msg.kind);
    if (!block) return;
    if (msg.at && typeof msg.at.x === 'number' && typeof msg.at.y === 'number') {
      const section = store.data.sections.find((s) => s.id === msg.sectionId);
      const grid = section?.grid ?? siteDraft.grid;
      const pos = frameAtPoint({
        x: msg.at.x,
        y: msg.at.y,
        w: block.frames.desktop.w,
        h: block.frames.desktop.h,
        grid,
      });
      block.frames.desktop.x = pos.x;
      block.frames.desktop.y = pos.y;
    } else {
      block.frames.desktop.x = Math.round(((100 - block.frames.desktop.w) / 2) * 100) / 100;
      block.frames.desktop.y = 40;
    }
    insertBlock(msg.sectionId, block);
    // Den nye blokken markeres (previewen kjenner ikke id-en før
    // rerendringen; selectById svarer med urd-select-block, så
    // Egenskaper-panelet følger etter). Samme UX som paletten.
    bridge?.sendSelect(block.id);
    if (msg.kind === 'image') setStatus(ta('status.imageBlockAdded'));
    if (msg.kind === 'galleri') setStatus(ta('status.galleryBlockAdded'));
  }

  /** + Bilde: komprimer til webp og legg i utkastet som data-URL.
   *  Ved publisering materialiseres den til en fil i media/. */
  async function addImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setStatus(ta('status.compressingImage'));
    let img;
    try {
      img = await compressOrTrim(file);
    } catch {
      setStatus(ta('status.imageReadError'), 'error');
      return;
    }

    // Startbredde 30 % av seksjonen; høyden følger bildets sideforhold
    // med en antatt seksjonsbredde (justeres uansett fritt etterpå).
    const height = Math.round((img.height / img.width) * 0.3 * (iframeEl?.clientWidth ?? 1280));
    requestPlacement({
      id: makeId('blk'),
      type: 'image',
      version: 1,
      props: { src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), fit: 'cover', radius: 'md', href: null },
      animation: null,
      frames: { desktop: { x: 4, y: 8, w: 30, h: Math.max(40, height), z: 1, rot: 0 }, mobile: null },
    });
    if (img.bytes > WARN_BYTES) {
      setStatus(ta('status.imageLarge', { kb: Math.round(img.bytes / 1024) }), 'error');
    } else {
      setStatus('');
    }
  }

  /** Flere bilder i én opplasting (galleriene): komprimer alle;
   *  ett uleselig bilde stopper ikke resten av bunken. */
  async function compressMany(fileList) {
    const images = [];
    let failed = 0;
    let big = 0;
    for (const file of fileList) {
      try {
        const img = await compressOrTrim(file);
        if (img.bytes > WARN_BYTES) big += 1;
        images.push({ src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), href: null, style: {} });
      } catch {
        failed += 1;
      }
    }
    return { images, failed, big };
  }

  function reportUpload(ok, failed, big) {
    if (failed) setStatus(ta('status.imagesReadFailed', { n: failed }), 'error');
    else if (big) setStatus(ta('status.imagesLarge', { n: big }), 'error');
    else setStatus(ok ? '' : ta('status.noImagesAdded'));
  }

  /** + Legg til bilder i en markert galleri-blokk: hele bunken i ETT angre-steg. */
  async function addGalleryImages(event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (images.length) mutateBlock('galleri-add', (b) => { b.props.images.push(...images); });
    reportUpload(images.length, failed, big);
  }

  /** «Galleri med bilder» i paletten: bygg blokken ferdig fylt. */
  async function addGalleryBlock(event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (!images.length) {
      reportUpload(0, failed, big);
      return;
    }
    const block = buildBlock('galleri');
    block.props.images = images;
    requestPlacement(block);
    reportUpload(images.length, failed, big);
  }

  function moveGalleryImage(i, dir) {
    mutateBlock('galleri-move', (b) => {
      const j = i + dir;
      if (j < 0 || j >= b.props.images.length) return;
      [b.props.images[i], b.props.images[j]] = [b.props.images[j], b.props.images[i]];
    });
  }

  function removeGalleryImage(i) {
    mutateBlock('galleri-remove', (b) => { b.props.images.splice(i, 1); });
  }

  function setGalleryImageField(i, field, value) {
    mutateBlock(`edit:${selectedBlock.blockId}:img${i}-${field}`, (b) => { b.props.images[i][field] = value; });
  }

  /**
   * Gjør upubliserte bilder (data-URL-er i utkastet) om til filer i
   * media/, og bytter src til stien. Returnerer fillisten for commiten.
   * Samme bildeinnhold gir samme filnavn (deterministisk hash), så
   * republisering aldri dupliserer filer.
   */
  /** Gjør en data-URL i obj[field] om til media-fil; muterer obj. */
  function materializeField(obj, field, name, files) {
    const src = obj?.[field];
    if (!src?.startsWith('data:image/')) return;
    const base64 = src.split(',', 2)[1];
    const path = `media/${slugify(name || 'bilde')}-${contentHash(base64)}.${mediaExtension(src)}`;
    files.push({ path, content: base64, encoding: 'base64' });
    obj[field] = `/${path}`;
  }

  /** Bakgrunnslagenes bilder (image + bildegalleri) - delt av seksjon, nav og footer. */
  function materializeBackground(background, files) {
    for (const layer of background?.layers ?? []) {
      if (layer.type === 'image') materializeField(layer.props, 'src', 'bakgrunn', files);
      if (layer.type === 'bildegalleri') {
        for (const img of layer.props.images ?? []) materializeField(img, 'src', 'bakgrunn', files);
      }
    }
  }

  function materializeImages(page) {
    const files = [];
    for (const section of page.sections) {
      // Bakgrunnsbilder følger samme flyt som bildeblokker.
      materializeBackground(section.background, files);
      for (const block of section.blocks) {
        if (block.type === 'image') materializeField(block.props, 'src', block.props.alt, files);
        // Ikon-blokkens eget opplastede ikon publiseres som media-fil på samme måte.
        if (block.type === 'icon') materializeField(block.props, 'image', 'ikon', files);
        if (block.type === 'galleri') {
          for (const img of block.props.images ?? []) materializeField(img, 'src', img.alt || 'galleri', files);
        }
      }
    }
    return files;
  }

  /** Logo-opplastinger i site-utkastet (nav.logo) materialiseres likt. */
  function materializeSiteImages(site) {
    const files = [];
    const logo = site.nav?.logo;
    if (logo?.type === 'image') materializeField(logo, 'value', 'logo', files);
    if (logo?.type === 'both') materializeField(logo, 'image', 'logo', files);
    // Gammelt enkelt nav-bakgrunnsbilde (bakoverkompat) + de nye lag-bakgrunnene
    // på nav og footer.
    if (site.nav?.style) materializeField(site.nav.style, 'image', 'meny', files);
    materializeBackground(site.nav?.style?.background, files);
    materializeBackground(site.footer?.background, files);
    if (site.footer?.brand) materializeField(site.footer.brand, 'logo', 'footer-logo', files);
    materializeField(site.site, 'icon', 'ikon', files);
    return files;
  }

  // «Forkast utkast» krever to klikk: første klikk væpner knappen (rød,
  // «Sikker?»), andre klikk forkaster. Klikk hvor som helst ellers,
  // Escape eller fokus inn i forhåndsvisningen avvæpner.
  let discardArmed = $state(false);

  function requestDiscard() {
    if (!discardArmed) {
      discardArmed = true;
      return;
    }
    discardArmed = false;
    discard();
  }

  $effect(() => {
    if (!discardArmed) return;
    const disarm = (e) => {
      if (!e.target?.closest?.('.discard-btn')) discardArmed = false;
    };
    const onKey = (e) => {
      if (e.key === 'Escape') discardArmed = false;
    };
    // Klikk i forhåndsvisningen (iframen) når aldri dette dokumentet,
    // men flytter fokus ut av vinduet - window-blur dekker det.
    const onBlur = () => (discardArmed = false);
    window.addEventListener('pointerdown', disarm, true);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointerdown', disarm, true);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('blur', onBlur);
    };
  });

  function discard() {
    pushHistory('discard');
    for (const p of siteDraft.pages) {
      if (p.id !== pageId && !pendingPublished.has(p.id)) localStorage.removeItem(`urd-draft-${p.id}`);
    }
    const freshPage = store.reset();
    siteStore.reset();
    if (pluginsStore) {
      pluginsStore.reset();
      syncPluginsView();
    }
    if (samlingerIndexStore) {
      samlingerIndexStore.reset();
      samlingerIds = [...(samlingerIndexStore.data.samlinger ?? [])];
      for (const id of Object.keys(samlingStores)) {
        if (samlingerIds.includes(id)) samlingStores[id].reset();
        else delete samlingStores[id];
      }
      syncSamlingerView();
    }
    linkSiteDraft();
    grid = { snap: true, ...siteDraft.grid };
    updateDirty();
    status = '';
    pushSiteToPreview();
    // Forkasting kan fjerne siden man står på (upublisert ny side).
    if (!siteDraft.pages.some((p) => p.id === pageId)) {
      selectPage(siteDraft.pages[0].id);
    } else {
      bridge?.sendPage(pageId, freshPage);
    }
  }

  async function publish() {
    if (revertedSinceLoad) {
      setStatus(ta('status.revertReloadBeforePublish'), 'error');
      return;
    }
    setStatus(ta('status.publishing'));
    const files = [];
    const publishedTitles = [];
    const draftKeys = [];
    const newPageIds = [];

    // ALLE sider med utkast publiseres, ikke bare den man står på.
    for (const entry of siteDraft.pages) {
      const key = `urd-draft-${entry.id}`;
      const isNew = pendingPublished.has(entry.id) || !site.pages.some((p) => p.id === entry.id);
      let page = null;
      if (entry.id === pageId && (store.hasDraft() || isNew)) {
        page = store.data;
      } else if (entry.id !== pageId) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            page = liftPageFile(JSON.parse(raw), siteStore.data);
          } catch { /* korrupt utkast hoppes over */ }
        }
      }
      // En ny side skal ALDRI publiseres uten sidefil (besøkende ville
      // fått en død adresse): mangler utkastet, publiseres en blank side.
      if (!page && isNew) page = blankPage(entry);
      if (!page) continue;
      // Klon før materialisering: utkastene i minnet røres ikke før
      // commiten faktisk lykkes (en avbrutt publisering skal aldri
      // etterlate bildereferanser til filer som ikke finnes).
      const out = JSON.parse(JSON.stringify(page));
      // Upubliserte bilder blir egne filer i media/ i samme commit.
      files.push(...materializeImages(out));
      files.push({ path: entry.file, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
      publishedTitles.push(entry.title);
      // Nye sider finnes ikke på serveren før deployen er ferdig: utkastet
      // beholdes som kilde til da, og ryddes automatisk ved neste besøk.
      if (isNew) newPageIds.push(entry.id);
      else draftKeys.push(key);
    }

    if (siteStore.hasDraft()) {
      // Klon også her: logo-opplastinger materialiseres uten å røre
      // utkastet i minnet før commiten er trygt inne.
      const siteOut = JSON.parse(JSON.stringify(siteDraft));
      files.push(...materializeSiteImages(siteOut));
      files.push({ path: 'content/site.json', content: JSON.stringify(siteOut, null, 2) + '\n', encoding: 'utf-8' });
      // Materialiser temaet som render-blokkerende light-dark()-CSS (FOUC-fri
      // første paint). Én fil dekker alle sider; index.html-kopiene lenker til den.
      files.push({ path: 'content/theme.css', content: buildThemeCss(siteOut.theme), encoding: 'utf-8' });
      draftKeys.push('urd-draft-site');
      // Navngi HVA i nettstedsoppsettet som endret seg (til historikken).
      const eq = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
      if (!eq(site.theme, siteDraft.theme)) publishedTitles.push('tema');
      if (!eq(site.nav, siteDraft.nav)) publishedTitles.push('menyen');
      if (!eq(site.footer, siteDraft.footer)) publishedTitles.push('footeren');
      if (!eq(site.pages, siteDraft.pages)) publishedTitles.push('sideregisteret');
      if (!eq(site.grid, siteDraft.grid)) publishedTitles.push('gridet');
      if ((site.site.icon ?? null) !== (siteDraft.site.icon ?? null)) publishedTitles.push('nettstedsikonet');
      const { icon: a, ...restA } = site.site;
      const { icon: b, ...restB } = siteDraft.site;
      if (!eq(restA, restB)) publishedTitles.push('nettstedsinfo');
    }

    // Samlinger: endrede filer, indeksfilen og slettinger (diff mot publisert indeks).
    const changedSamlinger = Object.entries(samlingStores).filter(([, st]) => st.hasDraft());
    if (changedSamlinger.length || samlingerIndexStore?.hasDraft()) {
      for (const [id, st] of changedSamlinger) {
        const out = JSON.parse(JSON.stringify(st.data));
        for (const entry of out.entries) materializeField(entry, 'image', entry.title, files);
        files.push({ path: `content/samlinger/${id}.json`, content: JSON.stringify(out, null, 2) + '\n', encoding: 'utf-8' });
        draftKeys.push(`urd-draft-samling-${id}`);
      }
      if (samlingerIndexStore?.hasDraft()) {
        files.push({ path: 'content/samlinger.json', content: JSON.stringify(samlingerIndexStore.data, null, 2) + '\n', encoding: 'utf-8' });
        draftKeys.push('urd-draft-samlinger');
        // Samlinger fjernet fra indeksen slettes fra repoet (opprettes de også i samme publisering, vinner create-listen over).
        let publishedIndex = { samlinger: [] };
        try {
          publishedIndex = await (await fetch('/content/samlinger.json')).json();
        } catch { /* ingen publisert indeks ennå */ }
        const created = new Set(files.map((f) => f.path));
        for (const id of publishedIndex.samlinger ?? []) {
          const path = `content/samlinger/${id}.json`;
          if (!samlingerIds.includes(id) && !created.has(path)) files.push({ path, delete: true });
        }
      }
      publishedTitles.push('samlinger');
    }

    // Plugin-endringer (aktivert/deaktivert/lagt til) publiseres som plugins.json.
    if (pluginsStore?.hasDraft()) {
      files.push({ path: 'plugins/plugins.json', content: JSON.stringify(pluginsStore.data, null, 2) + '\n', encoding: 'utf-8' });
      draftKeys.push('urd-draft-plugins');
      publishedTitles.push('plugins');
    }

    // Sideruting på alle statiske hoster: hver side utenom forsiden får
    // sin egen <sti>/index.html (kopi av rot-index.html; motoren ruter på
    // pathname). Genereres ved hver publisering - uendrede kopier gir
    // identiske blobber og dermed ingen diff i commiten.
    try {
      const html = await (await fetch('/index.html')).text();
      for (const p of siteDraft.pages) {
        if (p.path !== '/') {
          files.push({ path: `${p.path.slice(1)}/index.html`, content: html, encoding: 'utf-8' });
        }
      }
    } catch { /* uten index-kopiene virker siden fortsatt på SPA-hoster */ }

    // Slettede og flyttede sider: diff mot publisert site.json. Serveren
    // hopper stille over stier som alt er borte fra repoet.
    // En sti som OGSÅ opprettes i samme commit (to sider som bytter adresse) må ikke slettes: siste innslag med samme sti vinner i Git-treet, så en slik sletting ville fjernet den nye kopien.
    const created = new Set(files.map((f) => f.path));
    const del = (path) => { if (!created.has(path)) files.push({ path, delete: true }); };
    for (const p of site.pages) {
      const still = siteDraft.pages.find((q) => q.id === p.id);
      if (!still) {
        del(p.file);
        if (p.path !== '/') del(`${p.path.slice(1)}/index.html`);
      } else if (still.path !== p.path && p.path !== '/') {
        del(`${p.path.slice(1)}/index.html`);
      }
    }

    // Konfliktvarsel: har noen andre publisert siden vi lastet, og rører
    // de samme filene, må redaktøren aktivt velge å publisere likevel.
    const conflict = await confirmNoConflict(files);
    if (!conflict.ok) {
      setStatus(ta('status.publishAborted'), 'error');
      return;
    }

    const body = {
      message: `Oppdater ${publishedTitles.join(', ') || 'nettstedet'} via Urd-admin`,
      files,
      // HEAD-en konfliktsjekken så: serveren avviser med 409 om noen
      // rekker å publisere i selve commit-vinduet.
      ...(conflict.head ? { expect: conflict.head } : {}),
    };
    let res = null;
    try {
      res = await fetch('/api/github/commit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch { /* nettverksfeil håndteres under */ }

    if (res?.ok) {
      // Ny HEAD = vår commit: konfliktgrunnlaget flyttes frem.
      const { sha } = await res.json().catch(() => ({}));
      if (sha) baseSha = sha;
      else refreshBaseSha();
      // Speil materialiseringen inn i minnet nå som commiten er trygt
      // inne (samme deterministiske stier som klonene fikk).
      materializeImages(store.data);
      materializeSiteImages(siteDraft);
      // Utkastene ER nå det publiserte; behold dataene i minnet (serveren
      // serverer gammel JSON til deployen er ferdig) og fjern bare merkene.
      for (const key of draftKeys) localStorage.removeItem(key);
      for (const id of newPageIds) pendingPublished.add(id);
      // Publisert grunnlag = utkastet: bygg store-baselines på nytt, så
      // «Forkast utkast» aldri ruller tilbake forbi denne publiseringen.
      site = JSON.parse(JSON.stringify(siteDraft));
      siteStore = createDraftStore('urd-draft-site', () => site, draftSaveError);
      linkSiteDraft();
      if (pluginsStore) {
        const publishedPlugins = JSON.parse(JSON.stringify(pluginsStore.data));
        pluginsStore = createDraftStore('urd-draft-plugins', () => publishedPlugins, draftSaveError);
        syncPluginsView();
      }
      if (samlingerIndexStore) {
        // Speil materialiseringen inn i minnet (samme deterministiske stier som klonene fikk).
        for (const st of Object.values(samlingStores)) {
          for (const entry of st.data.entries) materializeField(entry, 'image', entry.title, []);
        }
        const publishedIndex = JSON.parse(JSON.stringify(samlingerIndexStore.data));
        samlingerIndexStore = createDraftStore('urd-draft-samlinger', () => publishedIndex, draftSaveError);
        publishedSamlinger = {};
        for (const id of samlingerIds) {
          if (!samlingStores[id]) continue;
          const publishedSamling = JSON.parse(JSON.stringify(samlingStores[id].data));
          publishedSamlinger[id] = publishedSamling;
          samlingStores[id] = createDraftStore(`urd-draft-samling-${id}`, () => publishedSamling, draftSaveError);
        }
        syncSamlingerView();
      }
      grid = { snap: true, ...siteDraft.grid };
      const pageSnap = JSON.parse(JSON.stringify(store.data));
      store = createDraftStore(`urd-draft-${pageId}`, () => pageSnap, draftSaveError);
      if (pendingPublished.has(pageId)) {
        // Ny side: utkastet er kilden til deployen er ferdig - behold det.
        writeDraftKey(`urd-draft-${pageId}`, JSON.stringify(pageSnap));
      }
      updateDirty();
      setStatus(ta('status.published'), 'ok');
    } else if (res?.status === 401) {
      const detail = (await res.json().catch(() => null))?.error;
      setStatus(detail === 'Ugyldig eller utløpt innlogging'
        ? ta('status.loginExpired')
        : ta('status.loginRequired', { reason: detail ?? ta('status.unknownReason') }), 'error');
      await checkAuth();
    } else if (res?.status === 403) {
      setStatus((await res.json().catch(() => null))?.error ?? ta('status.noPublishAccess'), 'error');
    } else if (res?.status === 409) {
      // Noen rakk å publisere i selve commit-vinduet: utkastene er urørt,
      // og baseSha står stille, så et nytt forsøk kjører konfliktsjekken
      // på nytt og fanger opp de ferske endringene.
      setStatus(ta('status.publishRace'), 'error');
    } else if (res) {
      setStatus((await res.json().catch(() => null))?.error
        ?? ta('status.publishFailed'), 'error');
    } else {
      setStatus(ta('status.publishUnavailable'), 'error');
    }
  }

  init();
</script>

<svelte:window onkeydown={onKeydown} onpointerdown={onPointerdownWindow} />

<div class="editor">
  {#if !chromeVisible}
    <!-- Ren visning: alt editor-UI er skjult så siden får full flate -->
    <button class="chrome-restore" onclick={toggleChrome} title={ta('tip.backToEdit')}>{@html ICONS.pencil} {ta('ui.edit')}</button>
  {/if}

  <header class="topbar" class:hidden={!chromeVisible}>
    <span class="topbar-group">
      <span class="brand" title="Urd">
        <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M12 32V10l16 6.5V32" fill="none" stroke="var(--urd-brand)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <span class="brand-word">Urd</span>
      </span>

      {#if site}
        <!-- Gjeldende side: klikk åpner Sider-panelet (nedtrekket ble
             overflødig da panelet kom, men siden man står på må synes) -->
        <button class="ghost" title={ta('tip.switchPage')}
          onclick={() => togglePanel('pages')}>{pageEntry()?.title ?? ''}</button>

        <span class="viewswitch">
          <button class="ghost" class:active={viewMode === 'desktop'}
            onclick={() => (viewMode = 'desktop')} title={ta('tip.desktopView')}>{@html ICONS.desktop}</button>
          <button class="ghost" class:active={viewMode === 'mobile'}
            onclick={() => (viewMode = 'mobile')} title={ta('tip.mobileView')}>{@html ICONS.phone}</button>
        </span>
        <span class="zoomswitch">
          <button class="ghost" class:active={zoomMode === 'fit'}
            onclick={() => (zoomMode = 'fit')} title={ta('tip.zoomFit')}>{@html ICONS.fit}</button>
          <button class="ghost" onclick={() => stepZoom(-1)} title={ta('tip.zoomOut')}>{@html ICONS.minus}</button>
          <span class="zoom-readout" title={ta('tip.zoomCurrent')}>{Math.round(scale * 100)}%</span>
          <button class="ghost" onclick={() => stepZoom(1)} title={ta('tip.zoomIn')}>{@html ICONS.plus}</button>
        </span>
        <button class="ghost guides-btn" class:active={guidesOn} onclick={toggleGuides}
          title={ta('tip.guides')}>{@html ICONS.guides}</button>
      {/if}

      {#if attentionCount > 0}
        <button class="badge attention" onclick={() => (viewMode = 'mobile')}
          title={ta('tip.attention')}>
          {@html ICONS.phone} {ta(attentionCount === 1 ? 'ui.attentionOne' : 'ui.attentionMany', { n: attentionCount })}
        </button>
      {/if}

      {#if dirty}
        <span class="badge">{ta('ui.unpublished')}</span>
        <button class="ghost discard-btn" class:armed={discardArmed} onclick={requestDiscard}
          title={discardArmed ? ta('tip.discardArmed') : ta('tip.discard')}
        >{discardArmed ? ta('ui.discardConfirm') : ta('ui.discard')}</button>
      {/if}
    </span>

    <span class="topbar-group topbar-right">
    {#if site}
      <button
        class="ghost"
        onclick={toggleChrome}
        title={chromeVisible ? ta('tip.chromeHide') : ta('tip.chromeShow')}
      >{#if chromeVisible}{@html ICONS.eye} {ta('ui.cleanView')}{:else}{@html ICONS.pencil} {ta('ui.edit')}{/if}</button>
      {#if auth?.loggedIn}
        <span class="who" title={auth.allowed ? ta('tip.hasPublishAccess') : ta('tip.noPublishAccess')}>
          {#if !auth.allowed}{@html ICONS.warn}{/if}{auth.login}
        </span>
      {:else if auth}
        <a class="ghost" href="/api/github/login">{ta('ui.loginGitHub')}</a>
      {/if}
      <a class="ghost" href={pageEntry()?.path ?? '/'} target="_blank" rel="noopener">{ta('ui.viewSite')}</a>
      <button class="primary" onclick={publish} disabled={!dirty}>{ta('ui.publish')}</button>
    {/if}
    </span>
  </header>

  {#if site}
    <div class="workspace">
      {#if chromeVisible}
        <nav class="rail">
          {#each PANEL_GROUPS as group, gi (gi)}
            {#if gi > 0}
              <hr class="rail-sep" />
            {/if}
            {#each group as name (name)}
              <button class:active={activePanel === name} onclick={() => togglePanel(name)}>{PANEL_LABELS[name]}</button>
            {/each}
          {/each}
          <span class="rail-settings" bind:this={settingsEl}>
            <button class="rail-gear" class:active={settingsOpen} title={ta('settings.title')}
              onclick={() => (settingsOpen = !settingsOpen)}>{@html ICONS.gear}</button>
            {#if settingsOpen}
              <div class="settings-pop">
                <p class="panel-strong">{ta('settings.title')}</p>
                <label title={ta('topbar.adminTheme.title')}>{ta('settings.theme')}
                  <Dropdown value={adminTheme} options={ADMIN_THEMES} onchange={(v) => (adminTheme = v)} /></label>
                <label title={ta('topbar.language.title')}>{ta('settings.language')}
                  <Dropdown value={adminLangChoice} options={[['auto', ta('lang.auto')], ...LANG_OPTIONS]} onchange={setAdminLang} /></label>
              </div>
            {/if}
          </span>
        </nav>

        {#if activePanel}
          <aside class="panel">
            <h2>{PANEL_LABELS[activePanel]}</h2>

            {#if activePanel === 'pages'}
              <div class="panel-body">
                <p class="panel-hint">{ta('hint.pages.drafts')}</p>
                {#each siteDraft.pages as p (p.id)}
                  <div class="page-row" class:current={p.id === pageId}>
                    <input class="page-title" value={p.title} title={ta('tip.pages.title')}
                      onchange={(e) => renamePage(p, e.target.value)} />
                    {#if p.path === '/'}
                      <span class="page-path" title={ta('tip.pages.homeLocked')}>/</span>
                    {:else}
                      <input class="page-slug" value={p.path.slice(1)} title={ta('tip.pages.slug')}
                        onchange={(e) => setPageSlug(p, e.target.value)} />
                    {/if}
                    <span class="row-tools">
                      <button class="ghost row-tool" title={ta('tip.pages.open')}
                        disabled={p.id === pageId} onclick={() => selectPage(p.id)}>{@html ICONS.right}</button>
                      {#if p.path !== '/'}
                        <button class="ghost row-tool" title={ta('tip.pages.delete')}
                          onclick={() => deletePage(p)}>{@html ICONS.cross}</button>
                      {/if}
                    </span>
                  </div>
                {/each}
                <hr class="gridmenu-divider" />
                <input placeholder={ta('ph.newPageName')} bind:value={newPageTitle}
                  onkeydown={(e) => e.key === 'Enter' && addPage()} />
                <button class="ghost action" onclick={addPage} disabled={!newPageTitle.trim()}>{ta('ui.createPage')}</button>
                <p class="panel-hint">{ta('hint.pages.autoMenu')}</p>
              </div>
            {:else if activePanel === 'nav'}
              <div class="panel-body">
                <p class="panel-hint">{ta('hint.nav.intro')}</p>
                <details class="group">
                  <summary>{ta('group.logo')}</summary>
                  <div class="group-items">
                    <label>{ta('common.type')}
                      <Dropdown value={siteDraft.nav.logo?.type ?? 'text'}
                        options={[['text', ta('blocks.text')], ['image', ta('blocks.image')], ['both', ta('opt.logo.both')]]}
                        onchange={(v) => setLogoType(v)} />
                    </label>
                    {#if (siteDraft.nav.logo?.type ?? 'text') !== 'image'}
                      <input value={siteDraft.nav.logo?.value ?? ''} placeholder={ta('ph.nav.logoName')}
                        oninput={(e) => setLogo({ value: e.target.value })} />
                      <!-- Stilrad à la tekstbehandler: font | px | F K -->
                      <span class="toolbar-row">
                        <Dropdown title={ta('tip.nav.logoFont')}
                          value={siteDraft.nav.logo?.font ?? ''}
                          options={[['', ta('common.inherit')], ...FONT_STACKS.map(([name, value]) => [value, ta(name)])]}
                          onchange={(v) => setLogo({ font: v || undefined })} />
                        <input type="number" class="tb-num" min="8" max="96" placeholder="px"
                          title={ta('tip.nav.textSize')}
                          value={siteDraft.nav.logo?.textSize ?? ''}
                          onchange={(e) => setLogo({ textSize: e.target.value ? Number(e.target.value) : undefined })} />
                        <button class="tbtn" title={ta('format.bold')} class:active={siteDraft.nav.logo?.bold !== false}
                          onclick={() => setLogo({ bold: siteDraft.nav.logo?.bold === false })}><b>{ta('format.boldLetter')}</b></button>
                        <button class="tbtn" title={ta('format.italic')} class:active={Boolean(siteDraft.nav.logo?.italic)}
                          onclick={() => setLogo({ italic: !siteDraft.nav.logo?.italic })}><i>{ta('format.italicLetter')}</i></button>
                      </span>
                    {/if}
                    {#if (siteDraft.nav.logo?.type ?? 'text') !== 'text'}
                      <span class="toolbar-row">
                        <label class="ghost filepick tb-grow" title={ta('tip.webpAuto')}>
                          {(siteDraft.nav.logo?.type === 'image' ? siteDraft.nav.logo?.value : siteDraft.nav.logo?.image)
                            ? ta('ui.changeImage') : ta('ui.chooseImage')}
                          <input type="file" accept="image/*" onchange={uploadLogoImage} />
                        </label>
                        <input type="number" class="tb-num" min="12" max="128" title={ta('tip.nav.logoHeight')}
                          value={siteDraft.nav.logo?.size ?? 32}
                          onchange={(e) => setLogo({ size: Number(e.target.value) })} />
                        <input type="number" class="tb-num" min="0" max="64" title={ta('tip.nav.logoRadius')}
                          value={siteDraft.nav.logo?.radius ?? 0}
                          onchange={(e) => setLogo({ radius: Number(e.target.value) })} />
                      </span>
                      <p class="panel-hint">{ta('hint.nav.logoFields')}</p>
                    {/if}
                    {#if siteDraft.nav.logo?.type === 'both'}
                      <label>{ta('lbl.order')}
                        <Dropdown value={siteDraft.nav.logo?.order ?? 'image-first'}
                          options={[['image-first', ta('opt.logo.imageFirst')], ['text-first', ta('opt.logo.textFirst')]]}
                          onchange={(v) => setLogo({ order: v })} /></label>
                    {/if}
                    <p class="panel-hint">{ta('hint.nav.logoHome')}</p>
                  </div>
                </details>
                <details class="group">
                  <summary>{ta('group.appearance')}</summary>
                  <div class="group-items">
                    <label title={ta('tip.nav.variant')}>{ta('lbl.navVariant')}
                      <Dropdown value={siteDraft.nav.variant ?? 'bar'}
                        options={[['bar', ta('opt.navVariant.bar')], ['floating', ta('opt.navVariant.floating')], ['floating-square', ta('opt.navVariant.floatingSquare')],
                          ['floating-tab', ta('opt.navVariant.floatingTab')], ['side-left', ta('opt.navVariant.sideLeft')], ['side-right', ta('opt.navVariant.sideRight')]]}
                        onchange={(v) => setNavVariant(v)} /></label>
                    {#if floatingVariant}
                      <label class="gridmenu-snap" title={ta('tip.nav.glow')}>
                        <input type="checkbox" checked={siteDraft.nav.style?.glow === true}
                          onchange={(e) => setNavGlow(e.target.checked)} />
                        {ta('lbl.navGlow')}
                      </label>
                      <label class="gridmenu-snap" title={ta('tip.nav.topGap')}>
                        <input type="checkbox" checked={siteDraft.nav.style?.topGap !== false}
                          onchange={(e) => setNavTopGap(e.target.checked)} />
                        {ta('lbl.navTopGap')}
                      </label>
                    {/if}
                    {#if !floatingVariant && !sideVariant}
                      <label class="gridmenu-snap" title={ta('tip.nav.overlay')}>
                        <input type="checkbox" checked={siteDraft.nav.overlay === true}
                          onchange={(e) => siteMutate('nav', () => { if (e.target.checked) siteDraft.nav.overlay = true; else delete siteDraft.nav.overlay; })} />
                        {ta('lbl.navOverlay')}
                      </label>
                    {/if}
                    {#if sideVariant}
                      <label title={ta('tip.nav.sideAlign')}>{ta('lbl.textAlign')}
                        <Dropdown value={siteDraft.nav.style?.sideAlign ?? 'left'}
                          options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
                          onchange={(v) => setNavStyle('sideAlign', v === 'left' ? undefined : v)} /></label>
                    {/if}
                    <label class="gridmenu-snap" title={ta('tip.nav.blur')}>
                      <input type="checkbox" checked={siteDraft.nav.style?.blur !== false}
                        onchange={(e) => setNavStyle('blur', e.target.checked)} />
                      {ta('lbl.navBlur')}
                    </label>
                    <label>{ta('lbl.size')}
                      <Dropdown value={siteDraft.nav.style?.size ?? 'md'}
                        options={[['sm', ta('opt.size.sm')], ['md', ta('opt.size.md')], ['lg', ta('opt.size.lg')], ['xl', ta('opt.size.xl')]]}
                        onchange={(v) => setNavStyle('size', v === 'md' ? undefined : v)} /></label>
                    <label>{ta('lbl.navPlacement')}
                      {#if sideVariant}
                        <Dropdown value={siteDraft.nav.style?.sidePlacement ?? 'top'}
                          options={[['top', ta('opt.place.top')], ['middle', ta('opt.place.middle')], ['bottom', ta('opt.place.bottom')]]}
                          onchange={(v) => setNavStyle('sidePlacement', v === 'top' ? undefined : v)} />
                      {:else}
                        <Dropdown value={siteDraft.nav.layout ?? 'right'}
                          options={[['right', ta('common.right')], ['center', ta('common.center')], ['left', ta('opt.layout.leftAfterLogo')]]}
                          onchange={(v) => setNavLayout(v)} />
                      {/if}</label>
                    {#if !sideVariant}
                      <label class="gridmenu-snap" title={ta('tip.nav.sticky')}>
                        <input type="checkbox" checked={siteDraft.nav.sticky !== false}
                          onchange={(e) => siteMutate('nav', () => { siteDraft.nav.sticky = e.target.checked; })} />
                        {ta('lbl.navSticky')}
                      </label>
                      {#if siteDraft.nav.sticky !== false}
                        <label title={ta('tip.nav.scroll')}>{ta('lbl.navScroll')}
                          <Dropdown value={siteDraft.nav.scroll ?? 'none'}
                            options={[['none', ta('opt.scroll.none')], ['shrink', ta('opt.scroll.shrink')], ['hide', ta('opt.scroll.hide')]]}
                            onchange={(v) => siteMutate('nav', () => {
                              if (v === 'none') delete siteDraft.nav.scroll; else siteDraft.nav.scroll = v;
                            })} /></label>
                      {/if}
                    {/if}
                    <label>{ta('lbl.navHover')}
                      <Dropdown value={siteDraft.nav.style?.hover ?? 'standard'}
                        options={[['standard', ta('opt.hover.standard')], ['underline', ta('opt.hover.underline')], ['pill', ta('opt.hover.pill')], ['lift-plain', ta('opt.hover.liftPlain')], ['lift', ta('opt.hover.lift')]]}
                        onchange={(v) => setNavHover(v)} /></label>
                    {#if siteDraft.nav.style?.hover === 'lift'}
                      <label title={ta('tip.nav.hoverGlow')}>{ta('lbl.glowStrength')}
                        <span class="gridmenu-value">{Math.round((siteDraft.nav.style?.hoverGlow ?? 0.6) * 100)}%</span></label>
                      <input type="range" min="0.1" max="1" step="0.01"
                        value={siteDraft.nav.style?.hoverGlow ?? 0.6}
                        oninput={(e) => setNavStyle('hoverGlow', Number(e.target.value))} />
                    {/if}
                    {#if hoverColorLabel}
                      <label title={hoverColorLabel[1]}>{hoverColorLabel[0]}
                        <ColorPicker value={siteDraft.nav.style?.hoverColor ?? 'accent'} tokens={themeSwatches()}
                          label={hoverColorLabel[1]} onchange={(hex) => setNavStyle('hoverColor', hex)} /></label>
                    {/if}
                    <label title={ta('tip.nav.hoverTextColor')}>{ta('lbl.hoverTextColor')}
                      <ColorPicker value={siteDraft.nav.style?.hoverTextColor ?? 'accent'} tokens={themeSwatches()}
                        label={ta('tip.nav.hoverTextColorPick')} onchange={(hex) => setNavStyle('hoverTextColor', hex)} /></label>
                    <label>{ta('lbl.textColor')}
                      <ColorPicker value={siteDraft.nav.style?.textColor ?? 'text'} tokens={themeSwatches()}
                        label={ta('tip.nav.textColorPick')} onchange={(hex) => setNavStyle('textColor', hex)} /></label>
                    <hr class="gridmenu-divider" />
                    <p class="panel-strong">{ta('lbl.background')}</p>
                    {@render backgroundLayers(navBgCtx, siteDraft.nav?.style?.background?.layers ?? [])}
                  </div>
                </details>
                <details class="group">
                  <summary>{ta('group.submenu')}</summary>
                  <div class="group-items">
                    <!-- Sidestilt: undermenyene er trekkspill i kolonnen, så
                         kort-rammen, ren flate og utfall gir ingen mening der -->
                    <label>{ta('lbl.design')}
                      <Dropdown value={siteDraft.nav.style?.subStyle ?? 'card'}
                        options={sideVariant
                          ? [['card', ta('common.standard')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')]]
                          : [['card', ta('opt.sub.card')], ['flat', ta('opt.sub.flat')], ['pills', ta('opt.sub.pills')], ['lines', ta('opt.sub.lines')], ['flyout', ta('opt.sub.flyout')]]}
                        onchange={(v) => setNavStyle('subStyle', v === 'card' ? undefined : v)} /></label>
                    {#if siteDraft.nav.style?.subStyle === 'pills'}
                      <label title={ta('tip.nav.subPillColor')}>{ta('lbl.subPillColor')}
                        <ColorPicker value={siteDraft.nav.style?.subPillColor ?? 'surface'} tokens={themeSwatches()}
                          label={ta('tip.nav.subPillColorPick')} onchange={(hex) => setNavStyle('subPillColor', hex)} /></label>
                    {/if}
                    <label title={ta('tip.nav.subColumns')}>{ta('lbl.columns')}
                      <input type="number" min="1" max="4" value={siteDraft.nav.style?.subColumns ?? 1}
                        onchange={(e) => setNavStyle('subColumns', Number(e.target.value) > 1 ? Number(e.target.value) : undefined)} /></label>
                  </div>
                </details>
                <details class="group" open>
                  <summary>{ta('group.menuItems')}</summary>
                  <div class="group-items">
                {#each siteDraft.nav.items as item, i}
                  <div class="nav-row">
                    <input value={item.label} title={ta('tip.nav.itemLabel')}
                      oninput={(e) => setNavLabel(i, e.target.value)} />
                    <span class="row-tools">
                      <button class="ghost row-tool" title={ta('tip.nav.addChild')}
                        onclick={() => addNavChild(i)}>{@html ICONS.plus}</button>
                      <button class="ghost row-tool" onclick={() => moveNavItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
                      <button class="ghost row-tool" onclick={() => moveNavItem(i, 1)}
                        disabled={i === siteDraft.nav.items.length - 1}>{@html ICONS.down}</button>
                      <button class="ghost row-tool" title={ta('tip.nav.removeItem')}
                        onclick={() => removeNavItem(i)}>{@html ICONS.cross}</button>
                    </span>
                    <!-- Wrapper-span beholder grid-plasseringen (.nav-row .nav-target) -->
                    <span class="nav-target">
                      <Dropdown value={item.page ?? (item.href != null ? '__href' : '__none')} title={ta('tip.linkTarget')}
                        options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')],
                          ...(item.children ? [['__none', ta('opt.noLink')]] : [])]}
                        onchange={(v) => setNavTarget(i, v)} />
                    </span>
                    {#if !item.page && item.href != null}
                      <input class="nav-target" value={item.href} placeholder={ta('ph.hrefAnchor')}
                        title={ta('tip.hrefAnchor')}
                        onchange={(e) => setNavHref(i, e.target.value)} />
                    {/if}
                  </div>
                  {#each item.children ?? [] as child, j}
                    <div class="nav-row nav-sub-row">
                      <input value={child.label} title={ta('tip.nav.childLabel')}
                        oninput={(e) => setNavChildLabel(i, j, e.target.value)} />
                      <span class="row-tools">
                        <button class="ghost row-tool" onclick={() => moveNavChild(i, j, -1)} disabled={j === 0}>{@html ICONS.up}</button>
                        <button class="ghost row-tool" onclick={() => moveNavChild(i, j, 1)}
                          disabled={j === item.children.length - 1}>{@html ICONS.down}</button>
                        <button class="ghost row-tool" title={ta('tip.nav.removeChild')}
                          onclick={() => removeNavChild(i, j)}>{@html ICONS.cross}</button>
                      </span>
                      <span class="nav-target">
                        <Dropdown value={child.page ?? '__href'} title={ta('tip.linkTarget')}
                          options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')]]}
                          onchange={(v) => setNavChildTarget(i, j, v)} />
                      </span>
                      {#if !child.page}
                        <input class="nav-target" value={child.href ?? ''} placeholder={ta('ph.hrefAnchor')}
                          title={ta('tip.hrefAnchor')}
                          onchange={(e) => setNavChildHref(i, j, e.target.value)} />
                      {/if}
                    </div>
                  {/each}
                {/each}
                    <button class="ghost action" onclick={addNavItem}>{ta('ui.addMenuItem')}</button>
                    <p class="panel-hint">{ta('hint.nav.submenu')}</p>
                  </div>
                </details>
              </div>
            {:else if activePanel === 'site'}
              <div class="panel-body">
                <label title={ta('tip.site.name')}>{ta('lbl.name')}
                  <input value={siteDraft.site.title ?? ''} placeholder={ta('ph.site.name')}
                    oninput={(e) => setSiteName(e.target.value)} />
                </label>
                <label title={ta('tip.site.description')}>{ta('lbl.description')}
                  <input value={siteDraft.site.description ?? ''} placeholder={ta('ph.site.description')}
                    oninput={(e) => setSiteDescription(e.target.value)} />
                </label>
                <label title={ta('site.langTitle')}>{ta('site.langLabel')}
                  <Dropdown value={siteLangValue()} options={siteLangOptions()}
                    onchange={(v) => setSiteLang(v)} /></label>
                <hr class="gridmenu-divider" />
                <label>{ta('lbl.siteIcon')}
                  {#if siteDraft.site.icon}
                    <img class="site-icon-preview" src={siteDraft.site.icon} alt={ta('lbl.siteIcon')} />
                  {/if}
                </label>
                <span class="toolbar-row">
                  <label class="ghost filepick tb-grow" title={ta('tip.site.icon')}>
                    {siteDraft.site.icon ? ta('ui.changeIcon') : ta('ui.chooseIcon')}
                    <input type="file" accept="image/*" onchange={uploadSiteIcon} />
                  </label>
                  {#if siteDraft.site.icon}
                    <button class="ghost row-tool" title={ta('tip.site.editIcon')}
                      onclick={() => (iconEditorImage = siteDraft.site.icon)}>{@html ICONS.pencil ?? '✎'}</button>
                    <button class="ghost row-tool" title={ta('tip.site.removeIcon')}
                      onclick={removeSiteIcon}>{@html ICONS.cross}</button>
                  {/if}
                </span>
              </div>
            {:else if activePanel === 'theme'}
              <div class="panel-body">
                {#snippet themePreview(pal, cap)}
                  <div class="theme-pvw">
                    {#if cap}<div class="tpv-cap">{cap}</div>{/if}
                    <div class="tpv-demo" style="--tv-bg:{themeHex(pal.bg, pal)};--tv-surface:{themeHex(pal.surface, pal)};--tv-text:{themeHex(pal.text, pal)};--tv-accent:{themeHex(pal.accent, pal)};--tv-accent-ink:{themeHex(pal['accent-text'] ?? pal.bg, pal)}">
                      <div class="tpv-h">{ta('preview.heading')}</div>
                      <div class="tpv-card">{ta('preview.cardBody')}</div>
                      <div class="tpv-row"><span class="tpv-btn">{ta('preview.button')}</span><span class="tpv-lnk">{ta('preview.link')}</span></div>
                    </div>
                  </div>
                {/snippet}
                <p class="panel-strong">{ta('lbl.themePresets')}</p>
                <div class="theme-presets">
                  {#each THEME_PRESETS as pr (pr.id)}
                    <button type="button" class="theme-preset" class:sel={activeThemePreset === pr.id}
                      title={`${pr.name} - ${pr.note}`} onclick={() => applyThemePreset(pr)}>
                      <span class="tp-band">
                        <i style="background:{pr.light.bg}"></i><i style="background:{pr.light.surface}"></i><i style="background:{pr.light.accent}"></i><i style="background:{pr.light.text}"></i>
                      </span>
                      <small>{pr.name}</small>
                    </button>
                  {/each}
                </div>
                <p class="panel-strong">{ta('lbl.colors')}</p>
                <label class="gridmenu-snap" title={ta('tip.theme.dualMode')}>
                  <input type="checkbox" checked={dualMode}
                    onchange={(e) => setDualMode(e.target.checked)} />
                  {ta('lbl.dualMode')}
                </label>
                {#if dualMode}
                  <div class="autorow">
                    <span class="autolbl">{ta('lbl.darkColors')}</span>
                    <span class="seg">
                      <button type="button" class:on={altAuto} onclick={() => setAltAuto(true)}>{ta('opt.auto')}</button>
                      <button type="button" class:on={!altAuto} onclick={() => setAltAuto(false)}>{ta('opt.custom')}</button>
                    </span>
                  </div>
                {/if}

                <div class="palhead">
                  {#if dualMode}<span class="palname">{ta('lbl.light')}</span>{/if}
                  <button type="button" class="stdtag" class:ghost={stdMode !== 'light'}
                    title={ta('tip.theme.defaultScheme')} onclick={() => setThemeScheme('light')}>{ta('common.standard')}</button>
                </div>
                <div class="palcells">
                  {#each PALETTE_KEYS as [key, full, short] (key)}
                    <div class="palcol">
                      <ColorPicker value={siteDraft.theme.tokens.color[key] ?? siteDraft.theme.tokens.color.bg}
                        tokens={themeSwatches()} label={full} onchange={(hex) => setColorToken(key, hex)} />
                      <span class="palcap">{short}</span>
                      <b class="palhex">{themeHex(siteDraft.theme.tokens.color[key] ?? siteDraft.theme.tokens.color.bg, lightPal)}</b>
                    </div>
                  {/each}
                </div>

                {#if dualMode}
                  <div class="palhead">
                    <span class="palname">{ta('lbl.dark')}</span>
                    <button type="button" class="stdtag" class:ghost={stdMode !== 'dark'}
                      title={ta('tip.theme.darkDefault')} onclick={() => setThemeScheme('dark')}>{ta('common.standard')}</button>
                  </div>
                  <div class="palcells" class:autopal={altAuto}>
                    {#each PALETTE_KEYS as [key, full, short] (key)}
                      <div class="palcol">
                        <ColorPicker value={siteDraft.theme.alt.tokens.color[key] ?? darkPal[key] ?? siteDraft.theme.tokens.color.bg}
                          tokens={themeSwatches()} label={ta('theme.darkColorLabel', { name: full })} onchange={(hex) => setAltColorToken(key, hex)} />
                        <span class="palcap">{short}</span>
                        <b class="palhex">{themeHex(siteDraft.theme.alt.tokens.color[key] ?? darkPal[key], darkPal)}</b>
                      </div>
                    {/each}
                  </div>
                  {#if altAuto}
                    <p class="panel-hint">{ta('hint.theme.autoDark')}</p>
                  {/if}
                {/if}

                <div class="theme-previews">
                  {@render themePreview(lightPal, dualMode ? ta('lbl.light') : '')}
                  {#if dualMode}{@render themePreview(darkPal, ta('lbl.dark'))}{/if}
                </div>

                <details class="group">
                  <summary>{ta('group.typography')}</summary>
                  <div class="group-items">
                    <label>{ta('lbl.headings')}
                      <Dropdown value={siteDraft.theme.tokens.font.heading} options={fontOptions('heading')}
                        onchange={(v) => setFontToken('heading', v)} /></label>
                    <label>{ta('lbl.bodyText')}
                      <Dropdown value={siteDraft.theme.tokens.font.body} options={fontOptions('body')}
                        onchange={(v) => setFontToken('body', v)} /></label>
                    <div class="typo-sample">
                      <div class="ts-h" style="font-family:{siteDraft.theme.tokens.font.heading}">{ta('preview.heading')}</div>
                      <div class="ts-b" style="font-family:{siteDraft.theme.tokens.font.body}">{ta('preview.bodySample')}</div>
                    </div>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.shape')}</summary>
                  <div class="group-items">
                    <div class="form-prev" style="--r-sm:{siteDraft.theme.tokens.radius.sm};--r-md:{siteDraft.theme.tokens.radius.md}">
                      <span class="fp-btn">{ta('preview.button')}</span>
                      <span class="fp-card">{ta('preview.card')}</span>
                    </div>
                    <label class="rng-lab">{ta('lbl.smallCorners')}<span class="gridmenu-value">{siteDraft.theme.tokens.radius.sm}</span></label>
                    <input type="range" min="0" max="24" step="1" value={radiusNum(siteDraft.theme.tokens.radius.sm)}
                      oninput={(e) => setRadiusPx('sm', Number(e.target.value))} />
                    <label class="rng-lab">{ta('lbl.largeCorners')}<span class="gridmenu-value">{siteDraft.theme.tokens.radius.md}</span></label>
                    <input type="range" min="0" max="40" step="1" value={radiusNum(siteDraft.theme.tokens.radius.md)}
                      oninput={(e) => setRadiusPx('md', Number(e.target.value))} /></div>
                </details>
              </div>
            {:else if activePanel === 'blocks'}
              <div class="panel-body" class:locked={viewMode === 'mobile'}
                title={viewMode === 'mobile' ? ta('tip.blocks.mobileLocked') : undefined}>
                <p class="panel-hint">{ta('hint.blocks.intro')}</p>
                <details class="group">
                  <summary>{ta('blocks.text')}</summary>
                  <div class="group-items">
                    <button class="ghost" onclick={() => addBlock('text')}>{ta('blocks.text')}</button>
                    <button class="ghost" onclick={() => addBlock('text-box')}
                      title={ta('tip.blocks.textBox')}>{ta('ui.textBox')}</button>
                  </div>
                </details>
                <button class="ghost" onclick={() => addBlock('button')}>{ta('blocks.button')}</button>
                <label class="ghost filepick" title={ta('tip.webpAuto')}>
                  {ta('blocks.image')}
                  <input type="file" accept="image/*" onchange={addImage} />
                </label>
                <button class="ghost" title={ta('tip.blocks.video')}
                  onclick={() => addBlock('video')}>{ta('blocks.video')}</button>
                <button class="ghost" title={ta('tip.blocks.icon')}
                  onclick={() => addBlock('icon')}>{ta('blocks.icon')}</button>
                <button class="ghost" title={ta('tip.blocks.samling')}
                  onclick={() => addBlock('samling')}>{ta('blocks.samling')}</button>
                <button class="ghost" title={ta('tip.blocks.faq')}
                  onclick={() => addBlock('faq')}>{ta('blocks.faq')}</button>
                <details class="group">
                  <summary>{ta('blocks.galleri')}</summary>
                  <div class="group-items">
                    <button class="ghost" title={ta('tip.blocks.gallery')}
                      onclick={() => addBlock('galleri')}>{ta('ui.emptyGallery')}</button>
                    <label class="ghost filepick" title={ta('tip.blocks.galleryImages')}>
                      {ta('ui.galleryWithImages')}
                      <input type="file" accept="image/*" multiple onchange={addGalleryBlock} />
                    </label>
                  </div>
                </details>
                <details class="group">
                  <summary>{ta('group.shapes')}</summary>
                  <div class="group-items">
                    <button class="ghost" onclick={() => addBlock('shape-line')}>{ta('shape.line')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-arrow')}>{ta('shape.arrow')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-circle')}>{ta('shape.circle')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-rect')}>{ta('shape.rect')}</button>
                    <button class="ghost" onclick={() => addBlock('shape-triangle')}>{ta('shape.triangle')}</button>
                  </div>
                </details>
                {#if pluginBlocks.length}
                  <details class="group">
                    <summary>{ta('panel.plugins')}</summary>
                    <div class="group-items">
                      {#each pluginBlocks as entry (entry.type)}
                        {#if entry.variants?.length}
                          <details class="group">
                            <summary>{entry.label}</summary>
                            <div class="group-items">
                              {#each entry.variants as variant (variant.label)}
                                <button class="ghost" title={ta('tip.blocks.fromPlugin', { plugin: entry.plugin })}
                                  onclick={() => addPluginBlock(entry, variant.props)}>{variant.label}</button>
                              {/each}
                            </div>
                          </details>
                        {:else}
                          <button class="ghost" title={ta('tip.blocks.fromPlugin', { plugin: entry.plugin })}
                            onclick={() => addPluginBlock(entry)}>{entry.label}</button>
                        {/if}
                      {/each}
                    </div>
                  </details>
                {/if}
              </div>
            {:else if activePanel === 'grid'}
              <div class="panel-body">
                <p class="panel-hint">{ta('hint.grid.intro')}</p>
                <label>
                  {ta('lbl.gridSize')}
                  <span class="gridmenu-value">{grid.size} px</span>
                </label>
                <input type="range" min="4" max="96" step="2" value={grid.size}
                  oninput={(e) => setGrid('size', Number(e.target.value))} />
                <label class="gridmenu-snap">
                  <input type="checkbox" checked={grid.snap !== false}
                    onchange={(e) => setGrid('snap', e.target.checked)} />
                  {ta('lbl.gridSnap')}
                </label>

                <p class="panel-hint">{ta('hint.grid.section')}</p>
              </div>
            {:else if activePanel === 'properties'}
              <div class="panel-body">
                {#if selectedBlock}
                  <p class="panel-strong">{ta('blocks.suffix', { label: BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type })}</p>
                  {@render blockPropsUI()}
                {:else if activeSectionId}
                  <p class="panel-strong">{ta('lbl.section')}</p>
                  <label>{ta('lbl.minHeight')}
                    <input class="token-input" value={sectionMinHeight} placeholder={ta('ph.minHeight')}
                      onchange={(e) => setSectionHeight(e.target.value)} /></label>
                  <p class="panel-hint">{ta('hint.props.minHeight')}</p>
                  <hr class="gridmenu-divider" />
                  <label class="gridmenu-snap">
                    <input type="checkbox" checked={sectionGrid !== null}
                      onchange={(e) => toggleSectionGrid(e.target.checked)} />
                    {ta('lbl.sectionGrid')}
                  </label>
                  {#if sectionGrid}
                    <label>
                      {ta('lbl.gridSize')}
                      <span class="gridmenu-value">{sectionGrid.size} px</span>
                    </label>
                    <input type="range" min="4" max="96" step="2" value={sectionGrid.size}
                      oninput={(e) => setSectionGrid('size', Number(e.target.value))} />
                  {/if}

                  <hr class="gridmenu-divider" />
                  <label title={ta('tip.props.sectionTheme')}>{ta('lbl.sectionTheme')}
                    <Dropdown value={sectionTheme}
                      options={[['', ta('common.standard')], ...Object.entries(SECTION_THEME_LABELS).map(([id, key]) => [id, ta(key)])]}
                      onchange={(v) => setSectionTheme(v)} /></label>
                  <label title={ta('tip.props.anchor')}>{ta('lbl.anchor')}
                    <span class="row-tools">
                      <span class="gridmenu-value">#{activeSectionId}</span>
                      <button class="ghost row-tool" title={ta('tip.props.copyAnchor')}
                        onclick={() => navigator.clipboard?.writeText(`#${activeSectionId}`)}>{@html ICONS.copy}</button>
                    </span></label>

                  <hr class="gridmenu-divider" />
                  <p class="panel-strong">{ta('lbl.background')}</p>
                  {@render backgroundLayers(sectionBgCtx, sectionBg)}

                  <hr class="gridmenu-divider" />
                  <label title={ta('tip.props.sectionAnim')}>{ta('lbl.animIn')}
                    <Dropdown value={isEntrance(sectionAnim) ? sectionAnim.type : ''}
                      options={ENTRANCE_OPTIONS}
                      onchange={(v) => setSectionAnimation(v || null)} /></label>
                  {#if isEntrance(sectionAnim)}
                    <label>{ta('lbl.durationMs')}
                      <input type="number" min="100" max="4000" step="100" value={sectionAnim.props.duration}
                        onchange={(e) => setSectionAnimProp('duration', Number(e.target.value))} /></label>
                    {#if sectionAnim.type === 'stagger'}
                      <label title={ta('tip.props.staggerStep')}>{ta('lbl.stepMs')}
                        <input type="number" min="0" max="1000" step="10" value={sectionAnim.props.step ?? 90}
                          onchange={(e) => setSectionAnimProp('step', Number(e.target.value))} /></label>
                      <label title={ta('tip.props.staggerPattern')}>{ta('lbl.pattern')}
                        <Dropdown value={sectionAnim.props.pattern ?? 'sequence'}
                          options={[['sequence', ta('opt.stagger.sequence')], ['columns', ta('opt.stagger.columns')]]}
                          onchange={(v) => setSectionAnimPattern(v)} /></label>
                    {:else}
                      <label>{ta('lbl.delayMs')}
                        <input type="number" min="0" max="4000" step="100" value={sectionAnim.props.delay}
                          onchange={(e) => setSectionAnimProp('delay', Number(e.target.value))} /></label>
                    {/if}
                  {/if}
                  <label title={ta('tip.props.sectionHover')}>{ta('lbl.onHover')}
                    <Dropdown value={sectionHover?.type ?? (sectionAnim && !isEntrance(sectionAnim) ? sectionAnim.type : '')}
                      options={HOVER_OPTIONS}
                      onchange={(v) => setSectionHover(v || null)} /></label>
                {:else}
                  <p class="panel-hint">{ta('hint.props.empty')}</p>
                {/if}
              </div>
            {:else if activePanel === 'footer'}
              <div class="panel-body">
                <label class="gridmenu-snap" title={ta('tip.footer.show')}>
                  <input type="checkbox" checked={Boolean(siteDraft.footer?.show)}
                    onchange={(e) => footerMutate('footer', (f) => { f.show = e.target.checked; })} />
                  {ta('lbl.showFooter')}
                </label>

                {#if siteDraft.footer?.show}
                  <details class="group">
                    <summary>{ta('group.showOnPages')}</summary>
                    <div class="group-items">
                      {#each siteDraft.pages ?? [] as pg (pg.id)}
                        <label class="gridmenu-snap" title={ta('tip.footer.hideOnPage')}>
                          <input type="checkbox"
                            checked={!(siteDraft.footer?.hideOn ?? []).includes(pg.id)}
                            onchange={(e) => toggleFooterOnPage(pg.id, e.target.checked)} />
                          {pg.title || pg.id}
                        </label>
                      {/each}
                    </div>
                  </details>
                {/if}

                <details class="group">
                  <summary>{ta('group.startpoint')}</summary>
                  <div class="group-items">
                    <div class="footer-tpick">
                      {#each FOOTER_TEMPLATES as t (t.id)}
                        <button class="footer-tp" title={ta('tip.footer.template', { label: t.label })}
                          onclick={() => applyFooterTemplate(t.id)}>
                          <span class="footer-tp-thumb">{@html footerThumb(t.thumb)}</span>
                          <span class="footer-tp-name">{t.label}</span>
                        </button>
                      {/each}
                    </div>
                  </div>
                </details>

                <details class="group" open>
                  <summary>{ta('group.brand')}</summary>
                  <div class="group-items">
                    <label title={ta('tip.footer.brandTitle')}>{ta('lbl.title')}
                      <input value={siteDraft.footer?.brand?.title ?? ''} placeholder={ta('ph.footer.brandTitle')}
                        oninput={(e) => setFooterBrand('title', e.target.value)} /></label>
                    <label title={ta('tip.footer.tagline')}>{ta('lbl.tagline')}
                      <input value={siteDraft.footer?.brand?.tagline ?? ''}
                        oninput={(e) => setFooterBrand('tagline', e.target.value)} /></label>
                    <label title={ta('tip.footer.brandMode')}>{ta('lbl.brandMode')}
                      <Dropdown value={siteDraft.footer?.brand?.mode ?? 'text'}
                        options={[['text', ta('blocks.text')], ['image', ta('opt.brand.image')], ['both', ta('opt.brand.both')]]}
                        onchange={(v) => setFooterBrandMode(v)} /></label>
                    {#if (siteDraft.footer?.brand?.mode ?? 'text') !== 'text'}
                      <span class="toolbar-row">
                        <label class="ghost filepick tb-grow" title={ta('tip.webpAutoPublish')}>
                          {siteDraft.footer?.brand?.logo ? ta('ui.changeLogo') : ta('ui.uploadLogo')}
                          <input type="file" accept="image/*" onchange={uploadFooterLogo} />
                        </label>
                        {#if siteDraft.footer?.brand?.logo}
                          <button class="ghost row-tool" title={ta('tip.footer.removeLogo')}
                            onclick={removeFooterLogo}>{@html ICONS.cross}</button>
                        {/if}
                      </span>
                      {#if siteDraft.footer?.brand?.logo}
                        <label>{ta('lbl.logoHeight')}
                          <span class="gridmenu-value">{siteDraft.footer?.brand?.logoHeight ?? 40} px</span></label>
                        <input type="range" min="16" max="160" step="2" value={siteDraft.footer?.brand?.logoHeight ?? 40}
                          oninput={(e) => setFooterLogoHeight(e.target.value)} />
                      {/if}
                    {/if}
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.columns')}</summary>
                  <div class="group-items">
                    {#each siteDraft.footer?.columns ?? [] as col, ci}
                      <div class="nav-row">
                        <input value={col.title} title={ta('tip.footer.columnTitle')}
                          oninput={(e) => setFooterColumnTitle(ci, e.target.value)} />
                        <span class="row-tools">
                          <button class="ghost row-tool" title={ta('tip.footer.addLink')}
                            onclick={() => addFooterLink(ci)}>{@html ICONS.plus}</button>
                          <button class="ghost row-tool" onclick={() => moveFooterColumn(ci, -1)} disabled={ci === 0}>{@html ICONS.up}</button>
                          <button class="ghost row-tool" onclick={() => moveFooterColumn(ci, 1)}
                            disabled={ci === siteDraft.footer.columns.length - 1}>{@html ICONS.down}</button>
                          <button class="ghost row-tool" title={ta('tip.footer.removeColumn')}
                            onclick={() => removeFooterColumn(ci)}>{@html ICONS.cross}</button>
                        </span>
                      </div>
                      {#each col.links ?? [] as link, li}
                        <div class="nav-row nav-sub-row">
                          <input value={link.label} title={ta('tip.linkLabel')}
                            oninput={(e) => setFooterLinkLabel(ci, li, e.target.value)} />
                          <span class="row-tools">
                            <button class="ghost row-tool" onclick={() => moveFooterLink(ci, li, -1)} disabled={li === 0}>{@html ICONS.up}</button>
                            <button class="ghost row-tool" onclick={() => moveFooterLink(ci, li, 1)}
                              disabled={li === col.links.length - 1}>{@html ICONS.down}</button>
                            <button class="ghost row-tool" title={ta('tip.removeLink')}
                              onclick={() => removeFooterLink(ci, li)}>{@html ICONS.cross}</button>
                          </span>
                          <span class="nav-target">
                            <Dropdown value={link.page ?? '__href'} title={ta('tip.linkTarget')}
                              options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')]]}
                              onchange={(v) => setFooterLinkTarget(ci, li, v)} />
                          </span>
                          {#if !link.page}
                            <input class="nav-target" value={link.href ?? ''} placeholder={ta('ph.hrefAnchor')}
                              title={ta('tip.hrefAnchor')}
                              onchange={(e) => setFooterLinkHref(ci, li, e.target.value)} />
                          {/if}
                        </div>
                      {/each}
                    {/each}
                    <button class="ghost action" onclick={addFooterColumn}>{ta('ui.addColumn')}</button>
                    <label title={ta('tip.footer.columnsAlign')}>{ta('lbl.splitColumnAlign')}
                      <Dropdown value={siteDraft.footer?.columnsAlign ?? 'left'}
                        options={[['left', ta('common.left')], ['center', ta('common.center')]]}
                        onchange={(v) => setFooterColumnsAlign(v)} /></label>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.social')}</summary>
                  <div class="group-items">
                    {#each siteDraft.footer?.social ?? [] as soc, si}
                      <div class="nav-row">
                        <span class="nav-line">
                          <span class="footer-soc-preview" aria-hidden="true">{@html iconSvg(soc.icon) || ''}</span>
                          <Dropdown value={soc.icon} title={ta('blocks.icon')} options={SOCIAL_ICON_OPTIONS}
                            onchange={(v) => setFooterSocialIcon(si, v)} />
                        </span>
                        <span class="row-tools">
                          <button class="ghost row-tool" onclick={() => moveFooterSocial(si, -1)} disabled={si === 0}>{@html ICONS.up}</button>
                          <button class="ghost row-tool" onclick={() => moveFooterSocial(si, 1)}
                            disabled={si === siteDraft.footer.social.length - 1}>{@html ICONS.down}</button>
                          <button class="ghost row-tool" title={ta('tip.removeLink')}
                            onclick={() => removeFooterSocial(si)}>{@html ICONS.cross}</button>
                        </span>
                        <input class="nav-target" value={soc.url} placeholder={ta('ph.hrefMailto')}
                          onchange={(e) => setFooterSocialUrl(si, e.target.value)} />
                      </div>
                    {/each}
                    <button class="ghost action" onclick={addFooterSocial}>{ta('ui.addSocial')}</button>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.cta')}</summary>
                  <div class="group-items">
                    <label class="gridmenu-snap" title={ta('tip.footer.cta')}>
                      <input type="checkbox" checked={Boolean(siteDraft.footer?.cta)}
                        onchange={(e) => enableFooterCta(e.target.checked)} />
                      {ta('lbl.showCta')}
                    </label>
                    {#if siteDraft.footer?.cta}
                      {@const cta = siteDraft.footer.cta}
                      <label title={ta('tip.footer.ctaKind')}>{ta('common.type')}
                        <Dropdown value={cta.kind ?? 'button'}
                          options={[['button', ta('opt.cta.button')], ['newsletter', ta('opt.cta.newsletter')]]}
                          onchange={(v) => setFooterCtaField('kind', v)} /></label>
                      <label class="gridmenu-snap" title={ta('tip.footer.ctaBig')}>
                        <input type="checkbox" checked={cta.big === true}
                          onchange={(e) => setFooterCtaField('big', e.target.checked)} />
                        {ta('lbl.bigCentered')}
                      </label>
                      <label title={ta('tip.footer.ctaHeading')}>{ta('lbl.heading')}
                        <input value={cta.heading ?? ''} placeholder={ta('ph.footer.ctaHeading')}
                          oninput={(e) => setFooterCtaField('heading', e.target.value)} /></label>
                      <label title={ta('tip.footer.ctaSub')}>{ta('lbl.subText')}
                        <input value={cta.sub ?? ''}
                          oninput={(e) => setFooterCtaField('sub', e.target.value)} /></label>
                      <label title={ta('tip.footer.ctaLabel')}>{ta('lbl.buttonText')}
                        <input value={cta.label ?? ''} placeholder={ta('ph.footer.ctaLabel')}
                          oninput={(e) => setFooterCtaField('label', e.target.value)} /></label>
                      {#if (cta.kind ?? 'button') === 'button'}
                        <label title={ta('tip.footer.ctaTarget')}>{ta('lbl.buttonTarget')}
                          <Dropdown value={cta.page ?? '__href'}
                            options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHrefMailto')]]}
                            onchange={(v) => setFooterCtaTarget(v)} /></label>
                        {#if !cta.page}
                          <input value={cta.href ?? ''} placeholder={ta('ph.hrefMailtoAnchor')}
                            title={ta('tip.hrefAnchor')}
                            onchange={(e) => setFooterCtaField('href', e.target.value)} />
                        {/if}
                      {:else}
                        <label title={ta('tip.footer.ctaEndpoint')}>{ta('lbl.newsletterEndpoint')}
                          <input value={cta.endpoint ?? ''} placeholder={ta('ph.endpoint')}
                            onchange={(e) => setFooterCtaField('endpoint', e.target.value)} /></label>
                        <label title={ta('tip.footer.ctaRecipient')}>{ta('lbl.recipientFallback')}
                          <input value={cta.recipient ?? ''} placeholder={ta('ph.email')}
                            onchange={(e) => setFooterCtaField('recipient', e.target.value)} /></label>
                        <label title={ta('tip.footer.ctaSuccess')}>{ta('lbl.confirmation')}
                          <input value={cta.success ?? ''} placeholder={ta('ph.footer.ctaSuccess')}
                            oninput={(e) => setFooterCtaField('success', e.target.value)} /></label>
                      {/if}
                    {/if}
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.linkRow')}</summary>
                  <div class="group-items">
                    {@render footerLinkList('linkRow', siteDraft.footer?.linkRow ?? [])}
                    <button class="ghost action" onclick={() => addFooterListLink('linkRow')}>{ta('ui.addRowLink')}</button>
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.appearance')}</summary>
                  <div class="group-items">
                    {#if siteDraft.footer?.cta?.big !== true}
                      <label title={ta('tip.footer.align')}>{ta('lbl.align')}
                        <Dropdown value={siteDraft.footer?.align ?? 'left'}
                          options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
                          onchange={(v) => footerMutate('footer', (f) => { f.align = v; })} /></label>
                      <hr class="gridmenu-divider" />
                    {/if}
                    <p class="panel-strong">{ta('lbl.background')}</p>
                    {@render backgroundLayers(footerBgCtx, siteDraft.footer?.background?.layers ?? [])}
                  </div>
                </details>

                <details class="group">
                  <summary>{ta('group.baseline')}</summary>
                  <div class="group-items">
                    <label title={ta('tip.footer.copyright')}>{ta('lbl.copyright')}
                      <input value={siteDraft.footer?.copyright ?? ''} placeholder={ta('ph.footer.copyright')}
                        oninput={(e) => setFooterCopyright(e.target.value)} /></label>
                    <p class="panel-strong">{ta('lbl.baselineLinks')}</p>
                    {@render footerLinkList('baseline', siteDraft.footer?.baseline ?? [])}
                    <button class="ghost action" onclick={() => addFooterListLink('baseline')}>{ta('ui.addBaselineLink')}</button>
                  </div>
                </details>
              </div>
            {:else if activePanel === 'collections'}
              <div class="panel-body">
                <p class="panel-hint">{ta('hint.collections.intro')}</p>
                {#if samlingerIds.length}
                  <label>{ta('blocks.samling')}
                    <Dropdown value={activeSamling ?? ''}
                      options={[['', ta('common.choose')], ...samlingerIds.map((id) => [id, samlingerView[id]?.name ?? id])]}
                      onchange={(v) => (activeSamling = v || null)} /></label>
                {/if}
                {#if activeSamling && samlingerView[activeSamling]}
                  {@const samling = samlingerView[activeSamling]}
                  <span class="toolbar-row">
                    <button class="ghost action" onclick={() => addSamlingEntry(activeSamling)}>{ta('ui.addEntry')}</button>
                    <button class="ghost row-tool" title={ta('tip.collections.deleteCollection')}
                      onclick={() => removeSamling(activeSamling)}>{@html ICONS.cross}</button>
                  </span>
                  {#each samling.entries as entry, i (entry.id)}
                    <!-- Sammenleggbart innslag: tittel + dato i summary, feltene inni (plassbruk i panelet) -->
                    <details class="group samling-entry">
                      <summary>{entry.title.replace(/<[^>]*>/g, '')}{entry.date ? ` · ${entry.date}` : ''}</summary>
                      <div class="group-items">
                        <span class="toolbar-row">
                          <input value={entry.title} title={ta('lbl.title')}
                            onchange={(e) => setEntryField(activeSamling, entry.id, 'title', e.target.value || 'Uten tittel')} />
                          <span class="row-tools">
                            <button class="ghost row-tool" onclick={() => moveEntry(activeSamling, i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
                            <button class="ghost row-tool" onclick={() => moveEntry(activeSamling, i, 1)}
                              disabled={i === samling.entries.length - 1}>{@html ICONS.down}</button>
                            <button class="ghost row-tool" title={ta('tip.collections.deleteEntry')}
                              onclick={() => removeEntry(activeSamling, entry.id)}>{@html ICONS.cross}</button>
                          </span>
                        </span>
                        <label>{ta('lbl.date')}
                          <input type="date" value={entry.date ?? ''}
                            onchange={(e) => setEntryField(activeSamling, entry.id, 'date', e.target.value)} /></label>
                        <textarea rows="3" placeholder={ta('ph.collections.text')}
                          value={entry.text ?? ''}
                          onchange={(e) => setEntryField(activeSamling, entry.id, 'text', e.target.value)}></textarea>
                        <label>{ta('lbl.link')}
                          <input value={entry.href ?? ''} placeholder={ta('ph.collections.href')}
                            onchange={(e) => setEntryField(activeSamling, entry.id, 'href', e.target.value)} /></label>
                        <span class="toolbar-row">
                          <label class="ghost filepick">
                            {entry.image ? ta('ui.changeImage') : ta('ui.addImage')}
                            <input type="file" accept="image/*" onchange={(e) => setEntryImage(activeSamling, entry.id, e)} />
                          </label>
                          {#if entry.image}
                            <img class="site-icon-preview" src={entry.image} alt="" />
                            <button class="ghost row-tool" title={ta('tip.removeImage')}
                              onclick={() => setEntryField(activeSamling, entry.id, 'image', '')}>{@html ICONS.cross}</button>
                          {/if}
                        </span>
                      </div>
                    </details>
                  {/each}
                  {#if !samling.entries.length}
                    <p class="panel-hint">{ta('hint.collections.empty')}</p>
                  {/if}
                  <hr class="gridmenu-divider" />
                {/if}
                <label>{ta('lbl.newCollectionName')}
                  <input bind:value={newSamlingName} placeholder={ta('ph.collections.name')}
                    onkeydown={(e) => e.key === 'Enter' && addSamling()} /></label>
                <label>{ta('common.type')}
                  <Dropdown value={newSamlingKind}
                    options={SAMLING_KINDS}
                    onchange={(v) => (newSamlingKind = v)} /></label>
                <button class="ghost action" onclick={addSamling} disabled={!newSamlingName.trim()}>{ta('ui.createCollection')}</button>
              </div>
            {:else if activePanel === 'plugins'}
              <div class="panel-body">
                <p class="panel-hint">{ta('hint.plugins.intro')}</p>
                {#if !knownPlugins().length}
                  <p class="panel-hint">{ta('hint.plugins.empty')}</p>
                {/if}
                {#each knownPlugins() as id (id)}
                  {@const info = pluginInfo[id]}
                  {@const enabled = (pluginsView?.enabled ?? []).includes(id)}
                  <div class="plugin-row" class:plugin-broken={info?.errors?.length}>
                    <span class="plugin-head">
                      <span class="plugin-name">{info?.names?.[currentAdminLang()] ?? info?.name ?? id}</span>
                      {#if info?.version}<span class="plugin-meta">v{info.version}</span>{/if}
                      <span class="row-tools">
                        <label class="gridmenu-snap plugin-toggle" title={enabled ? ta('tip.plugins.on') : ta('tip.plugins.off')}>
                          <input type="checkbox" checked={enabled} disabled={Boolean(info?.errors?.length)}
                            onchange={(e) => setPluginEnabled(id, e.target.checked)} />
                          {enabled ? ta('ui.on') : ta('ui.off')}
                        </label>
                        <button class="ghost row-tool" title={ta('tip.plugins.remove')}
                          onclick={() => removePlugin(id)}>{@html ICONS.cross}</button>
                      </span>
                    </span>
                    {#if info?.errors?.length}
                      <p class="panel-hint plugin-warn">{info.errors.join('; ')}</p>
                    {:else if info && !info.satisfied}
                      <p class="panel-hint plugin-warn">{ta('plugin.engineMismatch', { required: info.requiresEngine, current: pluginEngine })}</p>
                    {:else if info?.csp}
                      <p class="panel-hint plugin-warn">{ta('plugin.cspNeeded', { list: [...(info.csp.connectSrc ?? []).map((d) => `connect-src ${d}`), ...(info.csp.frameSrc ?? []).map((d) => `frame-src ${d}`)].join(', ') })}</p>
                    {/if}
                  </div>
                {/each}
                {#if pluginsFound.length}
                  <hr class="gridmenu-divider" />
                  <p class="panel-hint">{ta('hint.plugins.found')}</p>
                  {#each pluginsFound as id (id)}
                    <div class="plugin-row">
                      <span class="plugin-head">
                        <span class="plugin-name">{pluginInfo[id]?.names?.[currentAdminLang()] ?? pluginInfo[id]?.name ?? id}</span>
                        {#if pluginInfo[id]?.version}<span class="plugin-meta">v{pluginInfo[id].version}</span>{/if}
                        <span class="row-tools">
                          <button class="ghost row-tool" title={ta('tip.plugins.addFound')}
                            onclick={() => addFoundPlugin(id)}>{@html ICONS.right}</button>
                        </span>
                      </span>
                    </div>
                  {/each}
                {/if}
                {#if pluginDiscovery === 'ok'}
                  {#if !pluginsFound.length}
                    <p class="panel-hint">{ta('hint.plugins.autoDiscover')}</p>
                  {/if}
                {:else}
                  <!-- Reserveløsning når repo-oppdagelsen er utilgjengelig (lokal server / ikke innlogget) -->
                  <hr class="gridmenu-divider" />
                  <input placeholder={ta('ph.plugins.folder')} bind:value={newPluginId}
                    onkeydown={(e) => e.key === 'Enter' && addPlugin()} />
                  <button class="ghost action" onclick={addPlugin} disabled={!newPluginId.trim()}>{ta('ui.addPlugin')}</button>
                  {#if pluginError}
                    <p class="panel-hint plugin-warn">{pluginError}</p>
                  {/if}
                {/if}
              </div>
            {:else if activePanel === 'history'}
              <div class="panel-body">
                <p class="panel-hint">{ta('hint.history.intro')}</p>
                {#if historyList === null}
                  <p class="panel-hint">{ta('hint.history.loading')}</p>
                {:else}
                  {#if historyError}
                    <p class="panel-hint">{historyError}</p>
                  {/if}
                  {#if historyList.length > 0}
                    <button class="ghost" onclick={revertLast}
                      disabled={historyBusy || !auth?.allowed}
                      title={auth?.allowed ? ta('tip.history.revert') : ta('tip.history.needsAccess')}>
                      {ta('ui.revertLast')}
                    </button>
                    {#each historyList as c, i (c.sha)}
                      <div class="history-row" class:head={i === 0}>
                        <span class="history-msg" title={c.sha}>{c.message}</span>
                        <span class="history-meta">
                          {c.author}{c.date ? ` · ${historyDate.format(new Date(c.date))}` : ''}
                        </span>
                      </div>
                    {/each}
                  {/if}
                {/if}
              </div>
            {/if}
          </aside>
        {/if}
      {/if}

      <div class="frame-wrap" class:mobile={viewMode === 'mobile'} bind:this={frameWrapEl}>
        <!-- .stage har den SKALERTE størrelsen, så scroll/sentrering får en ekte
             boks (en transformert iframe alene utvider ikke forelderens scroll). -->
        <div class="stage" style="width:{stageW}px; height:{stageH}px">
          <iframe
            bind:this={iframeEl}
            title={ta('ui.previewTitle')}
            src={`/?page=${pageId}&preview=1`}
            onload={onIframeLoad}
            style="width:{targetW}px; height:{iframeH}px; transform:scale({scale}); transform-origin:top left"
          ></iframe>
        </div>
      </div>
    </div>
  {:else}
    <p class="loading">{ta('ui.loading')}</p>
  {/if}

  {#if iconEditorImage}
    <IconEditor image={iconEditorImage} onapply={applyIcon} oncancel={() => (iconEditorImage = null)} />
  {/if}

  {#if confirmBox}
    <div class="setup-overlay">
      <div class="setup-card">
        <h2>{confirmBox.title}</h2>
        {#each confirmBox.lines as line (line)}
          <p class="panel-hint confirm-line">{line}</p>
        {/each}
        <span class="setup-actions">
          <button class="ghost" onclick={() => answerConfirm(false)}>{confirmBox.cancelLabel}</button>
          <button class="primary" onclick={() => answerConfirm(true)}>{confirmBox.okLabel}</button>
        </span>
      </div>
    </div>
  {/if}

  {#if showSetup}
    <!-- Oppsettsveiviser: første besøk på en fersk klon -->
    <div class="setup-overlay">
      <div class="setup-card">
        <h2>{ta('setup.title')}</h2>
        <p class="panel-hint">{ta('setup.intro')}</p>
        <label>{ta('setup.nameLabel')}
          <input bind:value={setupName} placeholder={ta('ph.setup.name')}
            onkeydown={(e) => e.key === 'Enter' && applySetup()} /></label>
        <label>{ta('setup.accentLabel')}
          <ColorPicker value={setupAccent} label={ta('setup.accentPick')} onchange={(hex) => (setupAccent = hex)} /></label>
        <label>{ta('setup.bgLabel')}
          <ColorPicker value={setupBg} label={ta('setup.bgLabel')} onchange={(hex) => (setupBg = hex)} /></label>
        <p class="panel-hint">{ta('setup.outro')}</p>
        <span class="setup-actions">
          <button class="ghost" onclick={closeSetup}>{ta('setup.skip')}</button>
          <button class="primary" onclick={applySetup} disabled={!setupName.trim()}>{ta('setup.start')}</button>
        </span>
      </div>
    </div>
  {/if}

  {#if status}
    <div class="toast" class:ok={statusKind === 'ok'} class:error={statusKind === 'error'}>
      <span>{status}</span>
      <button class="toast-x" onclick={() => setStatus('')} title={ta('ui.close')}>×</button>
    </div>
  {/if}
</div>

{#snippet backgroundLayers(bg, layers)}
  <p class="panel-hint">{ta('hint.bg.order')}</p>
  {#each layers as layer, i (i)}
    <div class="bg-layer">
      <span class="nav-line">
        <Dropdown value={layer.type} title={ta('tip.bg.changeType')}
          options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
          onchange={(v) => changeBgLayerType(bg, i, v)} />
        <span class="row-tools">
          <button class="ghost row-tool" onclick={() => moveBgLayer(bg, i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
          <button class="ghost row-tool" onclick={() => moveBgLayer(bg, i, 1)}
            disabled={i === layers.length - 1}>{@html ICONS.down}</button>
          <button class="ghost row-tool" title={ta('tip.bg.removeLayer')} onclick={() => removeBgLayer(bg, i)}>{@html ICONS.cross}</button>
        </span>
      </span>
      {#if layer.type === 'color'}
        <label>{ta('lbl.color')}
          <ColorPicker value={layer.props.value} tokens={themeSwatches()}
            label={ta('tip.bg.layerColor')} onchange={(hex) => setBgProp(bg, i, 'value', hex)} /></label>
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'gradient'}
        {@const g = gradientProps(layer)}
        {@const shareSum = g.stops.reduce((a, s) => a + Math.max(0, Number(s.share) || 0), 0)}
        <label>{ta('blocks.shape')}
          <Dropdown value={g.kind ?? 'linear'}
            options={[['linear', ta('opt.grad.linear')], ['radial', ta('opt.grad.radial')]]}
            onchange={(v) => setGradKind(bg, i, v)} /></label>
        {#each g.stops as stop, si (si)}
          <span class="nav-line grad-stop"
            class:dragging={stopDrag?.layer === i && stopDrag.from === si}
            class:drop-above={stopDrag?.layer === i && stopDrag.insert === si}
            class:drop-below={stopDrag?.layer === i && stopDrag.insert === g.stops.length && si === g.stops.length - 1}>
            <span class="grad-grip" title={ta('tip.bg.dragStop')}
              onpointerdown={(e) => startStopDrag(bg, e, i, si)}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><circle cx="5" cy="3" r="1.4"/><circle cx="11" cy="3" r="1.4"/><circle cx="5" cy="8" r="1.4"/><circle cx="11" cy="8" r="1.4"/><circle cx="5" cy="13" r="1.4"/><circle cx="11" cy="13" r="1.4"/></svg>
            </span>
            <ColorPicker value={stop.color} tokens={themeSwatches()}
              label={ta('tip.bg.stopColor')} onchange={(hex) => setGradStop(bg, i, si, { color: hex })} />
            <input type="range" class="tb-grow" min="0" max="100" step="1" value={stop.share ?? 50}
              title={ta('tip.bg.stopShare')}
              oninput={(e) => setGradStop(bg, i, si, { share: Number(e.target.value) })} />
            <span class="gridmenu-value">{shareSum > 0 ? Math.round((Math.max(0, Number(stop.share) || 0) / shareSum) * 100) : Math.round(100 / g.stops.length)}%</span>
            {#if g.stops.length > 2}
              <button class="ghost row-tool" title={ta('tip.bg.removeStop')}
                onclick={() => removeGradStop(bg, i, si)}>{@html ICONS.cross}</button>
            {/if}
          </span>
        {/each}
        <button class="ghost action" title={ta('tip.bg.addStop')}
          onclick={() => addGradStop(bg, i)}>{ta('ui.addStop')}</button>
        {#if (g.kind ?? 'linear') === 'radial'}
          <label>{ta('lbl.centerX')}
            <span class="gridmenu-value">{Math.round((g.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={g.x ?? 0.5}
            oninput={(e) => setGradProp(bg, i, 'x', Number(e.target.value))} />
          <label>{ta('lbl.centerY')}
            <span class="gridmenu-value">{Math.round((g.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={g.y ?? 0.5}
            oninput={(e) => setGradProp(bg, i, 'y', Number(e.target.value))} />
        {:else}
          <label>{ta('lbl.angle')}
            <span class="gridmenu-value">{g.angle}°</span></label>
          <input type="range" min="0" max="360" step="5" value={g.angle}
            oninput={(e) => setGradProp(bg, i, 'angle', Number(e.target.value))} />
        {/if}
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((g.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={g.opacity ?? 1}
          oninput={(e) => setGradProp(bg, i, 'opacity', Number(e.target.value))} />
        <label title={ta('tip.bg.motion')}>{ta('lbl.motion')}
          <Dropdown value={g.animation ?? 'none'}
            options={GRAD_ANIMATIONS[(g.kind ?? 'linear') === 'radial' ? 'radial' : 'linear']}
            onchange={(v) => setGradProp(bg, i, 'animation', v)} /></label>
      {:else if layer.type === 'glow'}
        <label>{ta('lbl.color')}
          <ColorPicker value={layer.props.color} tokens={themeSwatches()}
            label={ta('tip.bg.glowColor')} onchange={(hex) => setBgProp(bg, i, 'color', hex)} /></label>
        <label>{ta('lbl.posX')}
          <span class="gridmenu-value">{Math.round(layer.props.x * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.x}
          oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
        <label>{ta('lbl.posY')}
          <span class="gridmenu-value">{Math.round(layer.props.y * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.y}
          oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        <label>{ta('lbl.size')}
          <span class="gridmenu-value">{Math.round(layer.props.radius * 100)}%</span></label>
        <input type="range" min="0.1" max="1" step="0.01" value={layer.props.radius}
          oninput={(e) => setBgProp(bg, i, 'radius', Number(e.target.value))} />
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round(layer.props.opacity * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'grain'}
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round(layer.props.opacity * 100)}%</span></label>
        <input type="range" min="0.01" max="0.3" step="0.01" value={layer.props.opacity}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'image'}
        <label class="ghost filepick" title={ta('tip.webpAuto')}>
          {layer.props.src ? ta('ui.changeImage') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={(e) => setBgImage(bg, i, e)} />
        </label>
        {@const isTile = layer.props.fit === 'flislegg' || layer.props.fit === 'repeat'}
        <label title={ta('tip.bg.fit')}>{ta('lbl.fit')}
          <Dropdown value={isTile ? 'flislegg' : 'vanlig'}
            options={[['vanlig', ta('opt.img.plain')], ['flislegg', ta('opt.img.tile')]]}
            onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
        <label title={ta('tip.bg.size')}>{ta('lbl.size')}</label>
        <div class="sizestep">
          <button type="button" title={ta('tip.smaller')} onclick={() => stepBgSize(bg, i, layer.props.size ?? 1, -0.05)}>−</button>
          <input type="number" min="10" max="400" value={Math.round((layer.props.size ?? 1) * 100)}
            onchange={(e) => setBgSizePct(bg, i, e.target.value)} />
          <span class="sizeunit">%</span>
          <button type="button" title={ta('tip.larger')} onclick={() => stepBgSize(bg, i, layer.props.size ?? 1, 0.05)}>+</button>
        </div>
        {#if !isTile}
          <div class="sizefill">
            <button type="button" class="ghost" title={ta('tip.bg.cover')} onclick={() => setBgFillSize(bg, i, layer, 'cover')}>{ta('ui.cover')}</button>
            <button type="button" class="ghost" title={ta('opt.fitFrame.contain')} onclick={() => setBgFillSize(bg, i, layer, 'contain')}>{ta('opt.fit.contain')}</button>
          </div>
          <label title={ta('tip.bg.position')}>{ta('lbl.position')}</label>
          <div class="focalpad" onpointerdown={(e) => startFocalDrag(e, bg, i, 'xy')}
            style="--fx:{Math.max(0, Math.min(1, layer.props.x ?? 0.5)) * 100}%; --fy:{Math.max(0, Math.min(1, layer.props.y ?? 0.5)) * 100}%">
            <span class="focaldot"></span>
          </div>
          <label class="sub">{ta('lbl.horizontal')}
            <span class="gridmenu-value">{Math.round((layer.props.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="-0.5" max="1.5" step="0.01" value={layer.props.x ?? 0.5}
            oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
          <label class="sub">{ta('lbl.vertical')}
            <span class="gridmenu-value">{Math.round((layer.props.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="-0.5" max="1.5" step="0.01" value={layer.props.y ?? 0.5}
            oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        {/if}
        <label>{ta('lbl.blur')}
          <span class="gridmenu-value">{layer.props.blur ?? 0} px</span></label>
        <input type="range" min="0" max="20" step="1" value={layer.props.blur ?? 0}
          oninput={(e) => setBgProp(bg, i, 'blur', Number(e.target.value))} />
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        <label class="gridmenu-snap" title={ta('tip.bg.parallax')}>
          <input type="checkbox" checked={(layer.props.parallax ?? 0) > 0}
            onchange={(e) => setBgProp(bg, i, 'parallax', e.target.checked ? 0.3 : 0)} />
          {ta('lbl.parallax')}
        </label>
        {#if (layer.props.parallax ?? 0) > 0}
          <label>{ta('lbl.parallaxStrength')}
            <span class="gridmenu-value">{Math.round((layer.props.parallax ?? 0) * 100)}%</span></label>
          <input type="range" min="0.1" max="1" step="0.01" value={layer.props.parallax ?? 0.3}
            oninput={(e) => setBgProp(bg, i, 'parallax', Number(e.target.value))} />
          <label title={ta('tip.bg.bleed')}>{ta('lbl.bleed')}
            <Dropdown value={layer.props.bleed ?? 'none'}
              options={[['none', ta('common.none')], ['up', ta('opt.bleed.up')], ['down', ta('opt.bleed.down')], ['both', ta('opt.brand.both')]]}
              onchange={(v) => setBgProp(bg, i, 'bleed', v)} /></label>
        {/if}
      {:else if layer.type === 'bildegalleri'}
        <label class="ghost filepick" title={ta('tip.bg.addImages')}>
          {ta('ui.addImages')}
          <input type="file" accept="image/*" multiple onchange={(e) => addBgGalleryImages(bg, i, e)} />
        </label>
        {#each layer.props.images ?? [] as img, j (j)}
          <span class="toolbar-row">
            <img class="site-icon-preview" src={img.src} alt="" />
            <span class="row-tools">
              <button class="ghost row-tool" onclick={() => moveBgGalleryImage(bg, i, j, -1)} disabled={j === 0}>{@html ICONS.up}</button>
              <button class="ghost row-tool" onclick={() => moveBgGalleryImage(bg, i, j, 1)}
                disabled={j === layer.props.images.length - 1}>{@html ICONS.down}</button>
              <button class="ghost row-tool" title={ta('tip.removeImage')}
                onclick={() => removeBgGalleryImage(bg, i, j)}>{@html ICONS.cross}</button>
            </span>
          </span>
          <label>{ta('lbl.focusX')}
            <span class="gridmenu-value">{Math.round((img.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={img.x ?? 0.5}
            oninput={(e) => setBgGalleryImageProp(bg, i, j, 'x', Number(e.target.value))} />
          <label>{ta('lbl.focusY')}
            <span class="gridmenu-value">{Math.round((img.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={img.y ?? 0.5}
            oninput={(e) => setBgGalleryImageProp(bg, i, j, 'y', Number(e.target.value))} />
        {/each}
        <label>{ta('lbl.fit')}
          <Dropdown value={layer.props.fit ?? 'cover'}
            options={[['cover', ta('opt.fit.cover')], ['contain', ta('opt.fit.contain')]]}
            onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
        <label>{ta('lbl.secondsPerImage')}
          <input type="number" min="2" max="120" value={layer.props.interval ?? 6}
            onchange={(e) => setBgProp(bg, i, 'interval', Number(e.target.value))} /></label>
        <label>{ta('lbl.transition')}
          <span class="gridmenu-value">{(layer.props.fade ?? 1.5).toFixed(1)} s</span></label>
        <input type="range" min="0" max="5" step="0.1" value={layer.props.fade ?? 1.5}
          oninput={(e) => setBgProp(bg, i, 'fade', Number(e.target.value))} />
        <label>{ta('lbl.blur')}
          <span class="gridmenu-value">{layer.props.blur ?? 0} px</span></label>
        <input type="range" min="0" max="20" step="1" value={layer.props.blur ?? 0}
          oninput={(e) => setBgProp(bg, i, 'blur', Number(e.target.value))} />
        <label>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        <p class="panel-hint">{ta('hint.bg.gallery')}</p>
      {/if}
    </div>
  {/each}
  <label>{ta('lbl.newLayer')}
    <Dropdown value={newBgType}
      options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
      onchange={(v) => (newBgType = v)} /></label>
  <button class="ghost action" onclick={() => addBgLayer(bg, newBgType)}>{ta('ui.addLayer')}</button>
{/snippet}

{#snippet footerLinkList(field, links)}
  {#each links as link, li}
    <div class="nav-row nav-sub-row">
      <input value={link.label} title={ta('tip.linkLabel')}
        oninput={(e) => setFooterListLinkLabel(field, li, e.target.value)} />
      <span class="row-tools">
        <button class="ghost row-tool" onclick={() => moveFooterListLink(field, li, -1)} disabled={li === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" onclick={() => moveFooterListLink(field, li, 1)}
          disabled={li === links.length - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('tip.removeLink')}
          onclick={() => removeFooterListLink(field, li)}>{@html ICONS.cross}</button>
      </span>
      <span class="nav-target">
        <Dropdown value={link.page ?? '__href'} title={ta('tip.linkTarget')}
          options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.linkHref')]]}
          onchange={(v) => setFooterListLinkTarget(field, li, v)} />
      </span>
      {#if !link.page}
        <input class="nav-target" value={link.href ?? ''} placeholder={ta('ph.hrefAnchor')}
          title={ta('tip.hrefAnchor')}
          onchange={(e) => setFooterListLinkHref(field, li, e.target.value)} />
      {/if}
    </div>
  {/each}
{/snippet}

{#snippet kortstilUI()}
  {@const bs = selectedBlock.props.boxStyle ?? {}}
  <label>{ta('lbl.blockColor')}
    <ColorPicker value={bs.bg ?? ''} tokens={themeSwatches()} allowClear
      label={ta('tip.box.bg')}
      onchange={(hex) => setBoxStyle({ bg: hex || null })} /></label>
  <label>{ta('lbl.shadow')}
    <Dropdown value={bs.shadow ?? ''}
      options={[['', ta('common.none')], ['soft', ta('opt.shadow.soft')], ['strong', ta('opt.shadow.strong')]]}
      onchange={(v) => setBoxStyle({ shadow: v || null })} /></label>
  {#if bs.shadow}
    <label>{ta('lbl.shadowColor')}
      <ColorPicker value={bs.shadowColor ?? ''} tokens={themeSwatches()} allowClear
        label={ta('tip.box.shadowColor')}
        onchange={(hex) => setBoxStyle({ shadowColor: hex || null })} /></label>
  {/if}
  <label>{ta('lbl.border')}
    <Dropdown value={bs.border === 'none' ? 'none' : bs.border ? 'custom' : ''}
      options={[['', ta('opt.border.theme')], ['none', ta('common.none')], ['custom', ta('opt.border.custom')]]}
      onchange={(v) => setBoxStyle({ border: v === 'custom' ? { color: 'accent', width: 1 } : v || null })} /></label>
  {#if bs.border !== 'none'}
    <!-- Kantfarge/Tykkelse vises OGSÅ for «Temaets (tynn)»: å velge en farge
         gjør den til en egen (fargbar) kantlinje. -->
    {@const bd = typeof bs.border === 'object' ? bs.border : { color: 'text', width: 1 }}
    <label>{ta('lbl.borderColor')}
      <ColorPicker value={bd.color} tokens={themeSwatches()}
        label={ta('tip.box.borderColor')} onchange={(hex) => setBoxStyle({ border: { ...bd, color: hex } })} /></label>
    <label>{ta('lbl.thicknessPx')}
      <span class="num-stepper">
        <button type="button" title={ta('tip.thinner')} aria-label={ta('tip.thinner')}
          onclick={() => setBoxStyle({ border: { ...bd, width: Math.max(1, bd.width - 1) } })}>−</button>
        <input type="number" min="1" max="12" step="1" value={bd.width}
          onchange={(e) => setBoxStyle({ border: { ...bd, width: Math.min(12, Math.max(1, Number(e.target.value) || 1)) } })} />
        <button type="button" title={ta('tip.thicker')} aria-label={ta('tip.thicker')}
          onclick={() => setBoxStyle({ border: { ...bd, width: Math.min(12, bd.width + 1) } })}>+</button>
      </span></label>
  {/if}
  <label class="gridmenu-snap" title={ta('tip.box.glass')}>
    <input type="checkbox" checked={Boolean(bs.glass)}
      onchange={(e) => setBoxStyle({ glass: e.target.checked || null })} />
    {ta('lbl.glass')}
  </label>
{/snippet}

{#snippet blockPropsUI()}

  {#if selectedBlock.type === 'text'}
    <label>{ta('lbl.align')}
      <Dropdown value={selectedBlock.props.align ?? 'left'}
        options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
        onchange={(v) => setBlockProp('align', v)} /></label>
    <label class="gridmenu-snap">
      <input type="checkbox" checked={Boolean(selectedBlock.props.box)}
        onchange={(e) => setBlockProp('box', e.target.checked)} />
      {ta('lbl.textBoxToggle')}
    </label>
    {#if selectedBlock.props.box}
      {@render kortstilUI()}
    {/if}
    <!-- Font, størrelse, linje- og bokstavavstand settes i tekst-editorens
         verktøylinje (gjelder markert tekst), ikke her. -->
  {:else if selectedBlock.type === 'faq'}
    <label class="gridmenu-snap" title={ta('tip.faq.multi')}>
      <input type="checkbox" checked={Boolean(selectedBlock.props.multi)}
        onchange={(e) => setBlockProp('multi', e.target.checked)} />
      {ta('lbl.faqMulti')}
    </label>
    <p class="panel-strong">{ta('lbl.questions')}</p>
    {#each selectedBlock.props.items ?? [] as item, i (i)}
      <span class="nav-line">
        <input value={item.q} title={ta('tip.faq.question')}
          onchange={(e) => setFaqItem(i, { q: e.target.value })} />
        <span class="row-tools">
          <button class="ghost row-tool" onclick={() => moveFaqItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
          <button class="ghost row-tool" onclick={() => moveFaqItem(i, 1)}
            disabled={i === (selectedBlock.props.items?.length ?? 0) - 1}>{@html ICONS.down}</button>
          <button class="ghost row-tool" title={ta('tip.faq.remove')} onclick={() => removeFaqItem(i)}>{@html ICONS.cross}</button>
        </span>
      </span>
    {/each}
    <button class="ghost action" onclick={addFaqItem}>{ta('ui.addQuestion')}</button>
    <p class="panel-strong">{ta('lbl.cardStyle')}</p>
    {@render kortstilUI()}
  {:else if selectedBlock.type === 'button'}
    <label>{ta('blocks.text')}
      <input value={selectedBlock.props.label}
        onchange={(e) => setBlockProp('label', e.target.value)} /></label>
    <label>{ta('lbl.goesTo')}
      <Dropdown value={selectedBlock.props.page ?? '__href'}
        options={[...siteDraft.pages.map((p) => [p.id, p.title]), ['__href', ta('opt.externalLink')]]}
        onchange={(v) => {
          const page = v === '__href' ? null : v;
          mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.props.page = page;
            if (page) b.props.href = null;
          });
        }} /></label>
    {#if !selectedBlock.props.page}
      <input placeholder={ta('ph.url')}
        value={selectedBlock.props.href === '#' ? '' : selectedBlock.props.href ?? ''}
        onchange={(e) => setBlockProp('href', e.target.value || null)} />
    {/if}
    <label>{ta('lbl.style')}
      <Dropdown value={selectedBlock.props.style}
        options={[['primary', ta('opt.btn.primary')], ['secondary', ta('opt.btn.secondary')]]}
        onchange={(v) => setBlockProp('style', v)} /></label>
  {:else if selectedBlock.type === 'image'}
    <label class="ghost filepick">
      {ta('ui.changeImage')}
      <input type="file" accept="image/*" onchange={replaceImage} />
    </label>
    <label>{ta('lbl.description')}
      <input value={selectedBlock.props.alt ?? ''} placeholder={ta('ph.altText')}
        onchange={(e) => setBlockProp('alt', e.target.value)} /></label>
    <label>{ta('lbl.fit')}
      <Dropdown value={selectedBlock.props.fit ?? 'cover'}
        options={[['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]]}
        onchange={(v) => setBlockProp('fit', v)} /></label>
    <label>{ta('lbl.radius')}
      <Dropdown value={selectedBlock.props.radius ?? ''}
        options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
        onchange={(v) => setBlockProp('radius', v || null)} /></label>
    <label>{ta('lbl.link')}
      <input value={selectedBlock.props.href ?? ''} placeholder={ta('ph.optionalImageLink')}
        onchange={(e) => setBlockProp('href', e.target.value || null)} /></label>
    {#if !selectedBlock.props.href}
      <label class="gridmenu-snap" title={ta('tip.lightbox')}>
        <input type="checkbox" checked={Boolean(selectedBlock.props.lightbox)}
          onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
        {ta('lbl.lightbox')}
      </label>
    {/if}
    <label>{ta('lbl.focusX')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.x ?? 0.5) * 100)}%</span></label>
    <input type="range" min="0" max="1" step="0.01" value={selectedBlock.props.x ?? 0.5}
      oninput={(e) => setBlockProp('x', Number(e.target.value))} />
    <label>{ta('lbl.focusY')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.y ?? 0.5) * 100)}%</span></label>
    <input type="range" min="0" max="1" step="0.01" value={selectedBlock.props.y ?? 0.5}
      oninput={(e) => setBlockProp('y', Number(e.target.value))} />
    <label title={ta('tip.zoomCrop')}>{ta('lbl.zoom')}
      <span class="gridmenu-value">{(selectedBlock.props.zoom ?? 1).toFixed(2)}x</span></label>
    <input type="range" min="1" max="3" step="0.01" value={selectedBlock.props.zoom ?? 1}
      oninput={(e) => setBlockProp('zoom', Number(e.target.value))} />
    <label>{ta('lbl.brightness')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.brightness ?? 1) * 100)}%</span></label>
    <input type="range" min="0.2" max="2" step="0.01" value={selectedBlock.props.brightness ?? 1}
      oninput={(e) => setBlockProp('brightness', Number(e.target.value))} />
    <label>{ta('lbl.contrast')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.contrast ?? 1) * 100)}%</span></label>
    <input type="range" min="0.2" max="2" step="0.01" value={selectedBlock.props.contrast ?? 1}
      oninput={(e) => setBlockProp('contrast', Number(e.target.value))} />
    <label>{ta('lbl.saturate')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.saturate ?? 1) * 100)}%</span></label>
    <input type="range" min="0" max="2" step="0.01" value={selectedBlock.props.saturate ?? 1}
      oninput={(e) => setBlockProp('saturate', Number(e.target.value))} />
    <button class="ghost action" title={ta('tip.resetAdjust')}
      onclick={() => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.props.brightness = 1; b.props.contrast = 1; b.props.saturate = 1;
      })}>{ta('ui.resetAdjust')}</button>
  {:else if selectedBlock.type === 'video'}
    <label>{ta('lbl.videoUrl')}</label>
    <input value={selectedBlock.props.url ?? ''} placeholder={ta('ph.videoUrl')}
      onchange={(e) => setBlockProp('url', e.target.value)} />
    <label>{ta('lbl.videoTitle')}
      <input value={selectedBlock.props.title ?? ''}
        onchange={(e) => setBlockProp('title', e.target.value)} /></label>
    <p class="panel-hint">{ta('hint.video')}</p>
  {:else if selectedBlock.type === 'icon'}
    <label>{ta('blocks.icon')}
      <span class="toolbar-row">
        <GlyphPicker value={selectedBlock.props.glyph ?? '★'}
          icon={selectedBlock.props.icon ?? null}
          image={selectedBlock.props.image ?? null}
          onpick={(glyph) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.props.glyph = glyph;
            b.props.icon = null;
            b.props.image = null;
          })}
          onicon={(id) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.props.icon = id;
            b.props.image = null;
          })}
          onimage={(dataUrl) => setBlockProp('image', dataUrl)} />
        {#if !selectedBlock.props.icon}
          <input class="token-input" value={selectedBlock.props.glyph ?? ''} maxlength="4"
            title={ta('tip.icon.typeGlyph')}
            onchange={(e) => setBlockProp('glyph', e.target.value || '★')} />
        {:else}
          <button class="ghost" title={ta('tip.icon.backToGlyph')}
            onclick={() => setBlockProp('icon', null)}>{ta('ui.removeDrawnIcon')}</button>
        {/if}
      </span></label>
    {#if selectedBlock.props.image}
      <span class="toolbar-row">
        <img class="site-icon-preview" src={selectedBlock.props.image} alt={ta('gp.ownIcon')} />
        <button class="ghost" onclick={() => setBlockProp('image', null)}>{ta('ui.removeOwnIcon')}</button>
      </span>
      <p class="panel-hint">{ta('hint.icon.ownImage')}</p>
    {/if}
    <label>{ta('lbl.sizePx')}
      <input type="number" min="8" max="400" value={selectedBlock.props.size ?? 48}
        onchange={(e) => setBlockProp('size', Number(e.target.value))} /></label>
    <label>{ta('lbl.color')}
      <ColorPicker value={selectedBlock.props.color ?? 'accent'} tokens={themeSwatches()}
        onchange={(v) => setBlockProp('color', v)} /></label>
    <p class="panel-hint">{ta('hint.icon.color')}</p>
  {:else if selectedBlock.type === 'samling'}
    <label>{ta('blocks.samling')}
      <Dropdown value={selectedBlock.props.collection ?? ''}
        options={[['', ta('common.choose')], ...samlingerIds.map((id) => [id, samlingerView[id]?.name ?? id])]}
        onchange={(v) => setBlockProp('collection', v || null)} /></label>
    <label>{ta('lbl.view')}
      <Dropdown value={selectedBlock.props.view ?? 'cards'}
        options={[['cards', ta('opt.collectionView.cards')], ['list', ta('opt.collectionView.list')], ['archive', ta('opt.collectionView.archive')]]}
        onchange={(v) => setBlockProp('view', v)} /></label>
    <label>{ta('lbl.maxCount')}
      <input type="number" min="0" max="100" value={selectedBlock.props.limit ?? 6}
        onchange={(e) => setBlockProp('limit', Number(e.target.value))} /></label>
    <label class="gridmenu-snap">
      <input type="checkbox" checked={selectedBlock.props.newestFirst !== false}
        onchange={(e) => setBlockProp('newestFirst', e.target.checked)} />
      {ta('lbl.newestFirst')}
    </label>
    <p class="panel-hint">{ta('hint.samling')}</p>
  {:else if selectedBlock.type === 'galleri'}
    <label>{ta('lbl.view')}
      <Dropdown value={selectedBlock.props.view ?? 'grid'}
        options={[['grid', ta('opt.galleryView.grid')], ['carousel', ta('opt.galleryView.carousel')], ['slides', ta('opt.galleryView.slides')]]}
        onchange={(v) => setBlockProp('view', v)} /></label>
    {#if (selectedBlock.props.view ?? 'grid') === 'grid'}
      <label>{ta('lbl.columns')}
        <input type="number" min="1" max="6" value={selectedBlock.props.columns ?? 3}
          onchange={(e) => setBlockProp('columns', Number(e.target.value))} /></label>
      <label>{ta('lbl.imageGap')}
        <span class="gridmenu-value">{selectedBlock.props.gap ?? 12} px</span></label>
      <input type="range" min="0" max="32" step="2" value={selectedBlock.props.gap ?? 12}
        oninput={(e) => setBlockProp('gap', Number(e.target.value))} />
    {/if}
    {#if selectedBlock.props.view === 'slides'}
      <label>{ta('lbl.secondsPerImage')}
        <input type="number" min="2" max="60" value={selectedBlock.props.interval ?? 5}
          onchange={(e) => setBlockProp('interval', Number(e.target.value))} /></label>
    {/if}
    <label>{ta('lbl.radius')}
      <Dropdown value={selectedBlock.props.radius ?? ''}
        options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
        onchange={(v) => setBlockProp('radius', v || null)} /></label>
    <label class="gridmenu-snap" title={ta('tip.lightbox')}>
      <input type="checkbox" checked={selectedBlock.props.lightbox !== false}
        onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
      {ta('lbl.lightbox')}
    </label>
    <hr class="gridmenu-divider" />
    <label class="ghost filepick" title={ta('tip.gallery.addImages')}>
      {ta('ui.addImages')}
      <input type="file" accept="image/*" multiple onchange={addGalleryImages} />
    </label>
    {#each selectedBlock.props.images ?? [] as img, i (i)}
      <div class="bg-layer">
        <span class="toolbar-row">
          <img class="site-icon-preview" src={img.src} alt="" />
          <span class="row-tools">
            <button class="ghost row-tool" onclick={() => moveGalleryImage(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
            <button class="ghost row-tool" onclick={() => moveGalleryImage(i, 1)}
              disabled={i === selectedBlock.props.images.length - 1}>{@html ICONS.down}</button>
            <button class="ghost row-tool" title={ta('tip.removeImage')} onclick={() => removeGalleryImage(i)}>{@html ICONS.cross}</button>
          </span>
        </span>
        <label>{ta('lbl.description')}
          <input value={img.alt ?? ''} placeholder={ta('ph.altShort')}
            onchange={(e) => setGalleryImageField(i, 'alt', e.target.value)} /></label>
        <label>{ta('lbl.link')}
          <input value={img.href ?? ''} placeholder={ta('ph.galleryHref')}
            onchange={(e) => setGalleryImageField(i, 'href', e.target.value || null)} /></label>
      </div>
    {/each}
    <p class="panel-hint">{ta('hint.gallery')}</p>
  {:else if selectedBlock.type === 'shape'}
    <label>{ta('blocks.shape')}
      <Dropdown value={selectedBlock.props.kind}
        options={SHAPE_KINDS}
        onchange={(v) => setBlockProp('kind', v)} /></label>
    <label>{ta('lbl.color')}
      <Dropdown value={selectedBlock.props.color}
        options={COLOR_TOKENS}
        onchange={(v) => setBlockProp('color', v)} /></label>
    <label>{ta('lbl.thickness')}
      <input type="number" min="1" max="40" value={selectedBlock.props.thickness}
        onchange={(e) => setBlockProp('thickness', Number(e.target.value))} /></label>
    <label class="gridmenu-snap" title={ta('tip.shape.fill')}>
      <input type="checkbox" checked={Boolean(selectedBlock.props.fill)}
        onchange={(e) => setBlockProp('fill', e.target.checked ? selectedBlock.props.color : null)} />
      {ta('lbl.filled')}
    </label>
  {:else}
    <!-- Plugin-blokker (kalender/kart/skjema): innstillingene bor i pluginens
         eget config-panel i forhåndsvisningen. Knappen åpner det; den gamle
         flytende «Kilder»/«Sted»-pillen er fjernet. -->
    <button class="ghost" onclick={() => bridge?.sendOpenConfig(selectedBlock.blockId)}>{ta('ui.settings')}</button>
    <p class="panel-hint">{ta('hint.pluginBlock')}</p>
  {/if}

  <hr class="gridmenu-divider" />
  <label title={ta('tip.props.blockAnim')}>{ta('lbl.animIn')}
    <Dropdown value={isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : ''}
      options={ENTRANCE_OPTIONS}
      onchange={(v) => setBlockAnimation(v || null)} /></label>
  {#if isEntrance(selectedBlock.animation)}
    <label>{ta('lbl.durationMs')}
      <input type="number" min="100" max="4000" step="100"
        value={selectedBlock.animation.props.duration}
        onchange={(e) => setBlockAnimProp('duration', Number(e.target.value))} /></label>
    <label>{ta('lbl.delayMs')}
      <input type="number" min="0" max="4000" step="100"
        value={selectedBlock.animation.props.delay}
        onchange={(e) => setBlockAnimProp('delay', Number(e.target.value))} /></label>
  {/if}
  <label title={ta('tip.props.blockHover')}>{ta('lbl.onHover')}
    <Dropdown value={selectedBlock.hover?.type ?? (selectedBlock.animation && !isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : '')}
      options={HOVER_OPTIONS}
      onchange={(v) => setBlockHover(v || null)} /></label>

  {#if viewMode === 'desktop'}
    <hr class="gridmenu-divider" />
    <label class="gridmenu-snap" title={ta('tip.sticky')}>
      <input type="checkbox" checked={Boolean(selectedBlock.sticky)}
        onchange={(e) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
          b.sticky = e.target.checked ? { offset: 16, until: null } : null;
        })} />
      {ta('lbl.sticky')}
    </label>
    {#if selectedBlock.sticky}
      <label title={ta('tip.stickyOffset')}>{ta('lbl.stickyOffset')}
        <input type="number" min="0" max="400" value={selectedBlock.sticky.offset ?? 16}
          onchange={(e) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.sticky = { ...b.sticky, offset: Math.max(0, Number(e.target.value) || 0) };
          })} /></label>
      <label title={ta('tip.stickyUntil')}>{ta('lbl.stickyUntil')}
        <Dropdown value={selectedBlock.sticky.until ?? ''}
          options={stickyUntilOptions()}
          onchange={(v) => mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
            b.sticky = { ...b.sticky, until: v || null };
          })} /></label>
    {/if}
  {/if}

  <hr class="gridmenu-divider" />
  <details class="group frame-group">
    <summary>{ta('group.placement')}</summary>
    <div class="group-items">
      <p class="panel-hint">{ta('hint.placement')}</p>
      {#if viewMode === 'desktop'}
        <div class="frame-grid">
          <label>{ta('frame.x')}<input type="number" step="0.5" value={selectedBlock.frame.x}
            onchange={(e) => setBlockFrame('x', Number(e.target.value))} /></label>
          <label>{ta('frame.y')}<input type="number" step="1" value={selectedBlock.frame.y}
            onchange={(e) => setBlockFrame('y', Number(e.target.value))} /></label>
          <label>{ta('frame.w')}<input type="number" step="0.5" min="1" value={selectedBlock.frame.w}
            onchange={(e) => setBlockFrame('w', Number(e.target.value))} /></label>
          <label>{ta('frame.h')}<input type="number" step="1" min="1" value={selectedBlock.frame.h}
            onchange={(e) => setBlockFrame('h', Number(e.target.value))} /></label>
          <label title={ta('tip.frameZ')}>
            {ta('frame.z')}<input type="number" step="1" value={selectedBlock.frame.z ?? 1}
            onchange={(e) => setBlockFrame('z', Number(e.target.value))} /></label>
          <label>{ta('frame.rot')}<input type="number" step="1" value={selectedBlock.frame.rot ?? 0}
            onchange={(e) => setBlockFrame('rot', Number(e.target.value))} /></label>
        </div>
      {/if}
      <label class="gridmenu-snap" title={ta('tip.decor')}>
        <input type="checkbox" checked={selectedBlock.decor}
          onchange={(e) => setBlockDecor(e.target.checked)} />
        {ta('lbl.decor')}
      </label>
    </div>
  </details>
{/snippet}

<!-- Blokkmenyen: alle blokk-innstillingene i en flytende meny ved blokken
     (kalender-mønsteret; åpnes fra tannhjulet på blokkens verktøylinje).
     Samme snippet som Egenskaper-panelet, så de to aldri divergerer. -->
{#if blockMenu && selectedBlock}
  <div class="block-menu" style="left: {blockMenu.left}px; top: {blockMenu.top}px">
    <header class="block-menu-head">
      <span>{ta('blocks.suffix', { label: BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type })}</span>
      <button class="ghost row-tool" title={ta('tip.closeEsc')} onclick={() => (blockMenu = null)}>{@html ICONS.cross}</button>
    </header>
    <div class="panel-body block-menu-body">
      {@render blockPropsUI()}
    </div>
  </div>
{/if}

<style>
  /* Adminens fargetemaer: overstyrer motorens standardvariabler KUN i
     admin-dokumentet (forhåndsvisningens iframe har sitt eget dokument
     og følger brukerens tema). Velges i topplinjen. */
  /* Urd-merkevarepalett (logo/merke): brønn-turkis primær, med alle
     fargevariantene bevart. Fast merkevarefarge, uavhengig av admin-temaet. */
  :global(:root) {
    --urd-brand: #15b39a;         /* brønn-turkis (primær, Urds brønn + Yggdrasil) */
    --urd-brand-bronze: #c9a227;  /* runestein-bronse */
    --urd-brand-indigo: #7c5cff;  /* skjebne-indigo */
    --urd-brand-mono: #eaf1ed;    /* monokrom (off-white) */
  }

  :global(:root[data-admin-theme='lilla']) {
    --urd-color-bg: #0b0e17;
    --urd-color-surface: #151a2b;
    --urd-color-accent: #7c5cff;
    --urd-color-text: #e8eaf0;
  }

  :global(:root[data-admin-theme='bronn']) {
    --urd-color-bg: #0b1418;
    --urd-color-surface: #13232a;
    --urd-color-accent: #2ec8b5;
    --urd-color-text: #e4eef0;
  }

  :global(:root[data-admin-theme='gull']) {
    --urd-color-bg: #100e0a;
    --urd-color-surface: #1c1812;
    --urd-color-accent: #d9a441;
    --urd-color-text: #ede8dc;
  }

  :global(:root[data-admin-theme='graa']) {
    --urd-color-bg: #0e0f11;
    --urd-color-surface: #191b1e;
    --urd-color-accent: #5f6a75;
    --urd-color-text: #e6e8ea;
  }

  /* Nordlys: Nord-paletten (arktisk, lav metning) */
  :global(:root[data-admin-theme='nordlys']) {
    --urd-color-bg: #232831;
    --urd-color-surface: #2e3440;
    --urd-color-accent: #5e81ac;
    --urd-color-text: #eceff4;
  }

  /* Skumring: Tokyo Night (neon-natt, blå) */
  :global(:root[data-admin-theme='skumring']) {
    --urd-color-bg: #16161e;
    --urd-color-surface: #1a1b26;
    --urd-color-accent: #3d59a1;
    --urd-color-text: #c0caf5;
  }

  /* Glo: Gruvbox (varm, glødende oransje) */
  :global(:root[data-admin-theme='glo']) {
    --urd-color-bg: #1d2021;
    --urd-color-surface: #282828;
    --urd-color-accent: #d65d0e;
    --urd-color-text: #ebdbb2;
  }

  /* Egen slank, mørk scrollbar i hele admin, så den ikke stikker seg ut */
  :global(*) {
    scrollbar-width: thin;
    scrollbar-color: rgb(255 255 255 / 22%) transparent;
  }

  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: rgb(255 255 255 / 22%);
    border-radius: 999px;
  }

  :global(::-webkit-scrollbar-track) {
    background: transparent;
  }

  .editor {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .topbar.hidden {
    display: none;
  }

  .chrome-restore {
    position: fixed;
    /* Under nettsidens egen topplinje, klar av både nav og scrollbar */
    top: 64px;
    right: 28px;
    z-index: 200;
    font: inherit;
    color: #fff;
    background: var(--urd-color-accent, #7c5cff);
    border: 0;
    border-radius: 999px;
    padding: 0.4em 1em;
    cursor: pointer;
    opacity: 0.55;
  }

  .chrome-restore:hover {
    opacity: 1;
  }

  .topbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem 0.75rem;
    padding: 0.6rem 1rem;
    background: var(--urd-color-surface, #151a23);
    border-bottom: 1px solid rgb(255 255 255 / 8%);
    font-size: 0.9rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1.05rem;
    font-weight: 700;
  }
  .brand-mark {
    width: 1.4rem;
    height: 1.4rem;
    flex: none;
  }
  .brand-word {
    letter-spacing: 0.01em;
  }

  /* To grupper som bryter hver for seg: venstre (verktøy) og høyre
     (visning/publisering). Ser ryddig ut på alle bredder. */
  .topbar-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    min-width: 0;
  }

  .topbar-right {
    margin-left: auto;
    justify-content: flex-end;
  }

  /* Knapper med SVG-ikon: ikon og tekst på linje, loddrett sentrert */
  .topbar .ghost,
  .chrome-restore,
  .badge.attention {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .badge {
    background: var(--urd-color-accent, #7c5cff);
    color: #fff;
    border-radius: 999px;
    padding: 0.15em 0.7em;
    font-size: 0.78rem;
  }

  /* Statusmeldinger som toast nederst til høyre: forstyrrer ikke
     topplinjen og kan leses uansett hvor man jobber */
  .toast {
    position: fixed;
    bottom: 22px;
    /* Klar av forhåndsvisningens scrollbar og høyrekanten */
    right: 34px;
    z-index: 300;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    max-width: 44ch;
    padding: 0.6em 0.9em;
    font-size: 0.85rem;
    border-radius: 10px;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    box-shadow: 0 8px 24px rgb(0 0 0 / 45%);
  }

  .toast.ok {
    border-color: rgb(46 204 113 / 45%);
    color: #7ee2a8;
  }

  .toast.error {
    border-color: rgb(231 76 60 / 45%);
    color: #f5a09a;
  }

  .toast-x {
    border: 0;
    padding: 0 0.2em;
    font-size: 1rem;
    line-height: 1;
    opacity: 0.6;
  }

  .toast-x:hover {
    opacity: 1;
  }

  .who {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    opacity: 0.7;
    font-size: 0.82rem;
  }

  /* Arbeidsflaten: panelvelger-linje | panel (valgfritt) | forhåndsvisning */
  .workspace {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  .rail {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 6px;
    background: var(--urd-color-surface, #151a23);
    border-right: 1px solid rgb(255 255 255 / 8%);
    overflow-y: auto;
  }

  .rail button {
    border: 1px solid transparent;
    background: transparent;
    font-size: 0.82rem;
    padding: 0.5em 0.7em;
    text-align: left;
    border-radius: 8px;
    opacity: 0.8;
  }

  .rail button:hover {
    opacity: 1;
    background: rgb(255 255 255 / 6%);
  }

  /* Aktiv markeres av bakgrunn + kant alene: font-vekt endres IKKE, ellers
     flytter teksten seg bittelitt ved hvert valg (observasjon fra testrundene). */
  /* Innstillings-tannhjulet nederst i railen + popoveren over det.
     position: fixed klippes ikke av railens overflow. */
  .rail-settings {
    margin-top: auto;
    padding-top: 8px;
    display: flex;
  }

  .rail-gear {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 0 !important;
  }

  .rail-gear.active {
    border-color: var(--urd-color-accent, #7c5cff) !important;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent) !important;
  }

  .settings-pop {
    position: fixed;
    left: 10px;
    bottom: 52px;
    z-index: 100002;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 178px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgb(255 255 255 / 12%);
    background: var(--urd-color-surface, #151a23);
    box-shadow: 0 10px 30px rgb(0 0 0 / 35%);
  }

  .settings-pop label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.8rem;
  }

  .rail button.active {
    opacity: 1;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 28%, transparent);
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .rail-sep {
    border: 0;
    border-top: 1px solid rgb(255 255 255 / 10%);
    margin: 0.3rem 0.4rem;
  }

  .panel {
    width: 300px;
    flex-shrink: 0;
    padding: 0.9rem;
    background: var(--urd-color-surface, #151a23);
    border-right: 1px solid rgb(255 255 255 / 8%);
    overflow-y: auto;
    font-size: 0.88rem;
  }

  .panel h2 {
    margin: 0 0 0.8rem;
    font-size: 0.95rem;
  }

  .panel-body {
    display: grid;
    /* minmax(0, 1fr): kolonnen kan aldri bli bredere enn panelet, så
       radene klemmes i stedet for å gi horisontal scrolling */
    grid-template-columns: minmax(0, 1fr);
    gap: 0.6rem;
  }

  /* Blokkmenyen: flytende utgave av Egenskaper-innholdet ved blokken */
  .block-menu {
    position: fixed;
    z-index: 320;
    width: 300px;
    max-height: min(70vh, 560px);
    display: flex;
    flex-direction: column;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 10px;
    box-shadow: 0 12px 32px rgb(0 0 0 / 50%);
  }

  .block-menu-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.55rem 0.8rem;
    font-weight: 600;
    font-size: 0.85rem;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
  }

  .block-menu-body {
    padding: 0.7rem 0.8rem 0.9rem;
    overflow-y: auto;
    min-height: 0;
  }

  /* Avhukingsbokser som moderne brytere: pille med knott som glir */
  input[type='checkbox'] {
    appearance: none;
    width: 2.1rem;
    height: 1.2rem;
    flex-shrink: 0;
    position: relative;
    border: 1px solid rgb(255 255 255 / 25%);
    border-radius: 999px;
    background: rgb(255 255 255 / 10%);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  input[type='checkbox']::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(1.2rem - 6px);
    height: calc(1.2rem - 6px);
    border-radius: 50%;
    background: #e8eaf0;
    transition: transform 0.15s ease;
  }

  input[type='checkbox']:checked {
    background: var(--urd-color-accent, #7c5cff);
    border-color: var(--urd-color-accent, #7c5cff);
  }

  input[type='checkbox']:checked::after {
    transform: translateX(0.9rem);
  }

  /* Alle «rad-knappene» i panelet (blokker, grupper, filvelger) deler
     samme høyde og utlegg, så listen ser jevn ut */
  .panel-body .ghost,
  .group summary {
    display: flex;
    align-items: center;
    min-height: 2.2rem;
    padding: 0.35em 0.8em;
    box-sizing: border-box;
  }

  /* Listeknapper i panelene er venstrestilte (radene skal kunne leses
     som en liste), selv om knapper ellers sentrerer innholdet.
     Handlingsknapper (.action: «+ Opprett side», «+ Legg til lag» osv.) sentreres som vanlige knapper. */
  .panel-body .ghost {
    justify-content: flex-start;
  }

  .panel-body .ghost.action {
    justify-content: center;
    text-align: center;
  }

  .panel-body label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    font-size: 0.85rem;
  }

  .panel-body input[type='range'] {
    width: 100%;
    accent-color: var(--urd-color-accent, #7c5cff);
  }

  .panel-body button,
  .panel-body .filepick {
    text-align: left;
  }

  .panel-body.locked {
    opacity: 0.35;
    pointer-events: none;
  }

  /* Felles kontrollhøyde (2.2rem) og -størrelse i panelene: felt,
     nedtrekk og knapper skal flukte uansett hvor de står */
  .panel-body input[type='text'],
  .panel-body input:not([type]),
  .panel-body input[type='number'],
  .panel-body input[type='color'] {
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    height: 2.2rem;
    padding: 0 0.5em;
    min-width: 0;
  }

  .panel-body input[type='color'] {
    padding: 2px;
    width: 3rem;
    cursor: pointer;
  }

  /* Tall-stepper (−/[tall]/+), som størrelsesfeltet i teksteditoren. */
  .num-stepper {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .num-stepper input[type='number'] {
    width: 3.4rem;
    text-align: center;
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .num-stepper input[type='number']::-webkit-outer-spin-button,
  .num-stepper input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .num-stepper button {
    width: 2.2rem;
    height: 2.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    cursor: pointer;
  }

  .num-stepper button:hover {
    background: rgb(255 255 255 / 10%);
  }

  /* Sider- og nav-radene: tittel/etikett tar plassen, verktøyene er smale */
  .page-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .samling-entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.35rem;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
  }

  .plugin-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.2rem;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
  }

  .plugin-row.plugin-broken {
    border-color: color-mix(in srgb, #e05252 55%, transparent);
  }

  .plugin-head {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 0;
  }

  .plugin-name {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plugin-meta {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .plugin-head .row-tools {
    margin-left: auto;
    align-items: center;
  }

  .plugin-toggle {
    font-size: 0.8rem;
  }

  .plugin-warn {
    color: #e2b84a;
  }

  .page-row.current {
    border-left: 2px solid var(--urd-color-accent, #7c5cff);
    padding-left: 0.4rem;
  }

  /* To kolonner: felt | verktøy. Mål- og lenkefeltene ligger i samme
     kolonne som navnefeltet, så alle slutter på samme høyrekant. */
  .nav-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.3rem 0.35rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .nav-row select,
  .nav-row input {
    min-width: 0;
    max-width: 100%;
  }

  .nav-row .nav-target {
    grid-column: 1;
  }

  /* Sosial-ikonets forhåndsvisning i Footer-panelet */
  .footer-soc-preview {
    flex: 0 0 1.15rem;
    width: 1.15rem;
    height: 1.15rem;
    color: inherit;
    opacity: 0.85;
  }
  .footer-soc-preview :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Visuell footer-mal-velger: miniatyr-rutenett (footerThumb-SVG). */
  .footer-tpick {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }
  .footer-tp {
    display: grid;
    gap: 0.3rem;
    padding: 0.35rem;
    border: 1.5px solid rgb(255 255 255 / 12%);
    border-radius: 0.5rem;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .footer-tp:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }
  .footer-tp-thumb {
    display: block;
    border-radius: 0.35rem;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 10%);
    aspect-ratio: 16 / 8;
  }
  .footer-tp-thumb :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }
  .footer-tp-name {
    font-size: 0.72rem;
    font-weight: 600;
    text-align: center;
  }

  /* Undermenyrader: innrykket under forelderpunktet, med markert kant */
  .nav-sub-row {
    margin-left: 0.8rem;
    padding-left: 0.5rem;
    border-left: 2px solid rgb(255 255 255 / 12%);
  }

  .nav-line {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    min-width: 0;
  }

  .page-title,
  .nav-line input {
    flex: 1 1 0;
    min-width: 0;
  }

  .page-slug {
    flex: 0 0 5.5rem;
    min-width: 0;
    opacity: 0.8;
  }

  .page-path {
    opacity: 0.6;
    padding: 0 0.4rem;
  }

  .row-tools {
    display: flex;
    gap: 0.2rem;
    flex-shrink: 0;
    /* Strekk til radens høyde, så knappene blir like høye som feltet */
    align-self: stretch;
  }

  /* Gradientfargenes dra-håndtak: rekkefølgen dras med pekeren
     (startStopDrag); raden dempes og innsettingsstreken følger med */
  .grad-grip {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    cursor: grab;
    opacity: 0.55;
    touch-action: none;
  }

  .grad-grip:hover {
    opacity: 1;
  }

  .grad-stop {
    align-items: center;
    gap: 0.4rem;
  }

  .grad-stop.dragging {
    opacity: 0.45;
  }

  .grad-stop.drop-above {
    box-shadow: 0 -2px 0 0 var(--urd-color-accent);
  }

  .grad-stop.drop-below {
    box-shadow: 0 2px 0 0 var(--urd-color-accent);
  }

  /* Kompakte fargeknapper i gradientradene (samme høyde som radknappene) */
  .grad-stop :global(.cp-swatch) {
    width: 1.7rem;
    height: 1.7rem;
  }

  .row-tool {
    padding: 0.2em 0.5em;
    font-size: 0.8rem;
  }

  /* Radknapper (piler/kryss): fast kvadratisk bredde og sentrert glyf,
     følger feltets høyde - ikke blokk-knappenes minhøyde eller
     panellistens venstrestilling */
  .panel-body .row-tool {
    min-height: 0;
    height: 100%;
    width: 2.1rem;
    padding: 0;
    justify-content: center;
  }

  .token-input {
    width: 5rem;
    text-align: right;
  }

  .panel-strong {
    margin: 0;
    font-weight: 600;
  }

  .site-icon-preview {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 4px;
    object-fit: cover;
  }

  /* Bakgrunnslagene i seksjonsegenskapene */
  .bg-layer {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.4rem;
    padding: 0.4rem 0 0.5rem 0.5rem;
    border-left: 2px solid rgb(255 255 255 / 12%);
  }

  .bg-type {
    flex: 1 1 0;
    min-width: 0;
  }

  /* Kompakte verktøyrader (à la tekstbehandler) i panelene */
  .toolbar-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 0;
  }

  .toolbar-row > select {
    flex: 1 1 0;
    min-width: 0;
  }

  .panel-body .toolbar-row .tb-num {
    width: 3.4rem;
    flex: 0 0 auto;
    padding: 0 0.3em;
    text-align: center;
  }

  .panel-body .toolbar-row .tbtn {
    flex: 0 0 auto;
    width: 2.2rem;
    min-height: 0;
    height: 2.2rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .toolbar-row .tbtn.active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .panel-body .toolbar-row .tb-grow {
    flex: 1 1 0;
    min-width: 0;
  }

  /* Historikk-panelet */
  .history-row {
    display: grid;
    gap: 0.15rem;
    padding: 0.35rem 0 0.4rem 0.5rem;
    border-left: 2px solid rgb(255 255 255 / 12%);
    font-size: 0.83rem;
  }

  .history-row.head {
    border-left-color: var(--urd-color-accent, #7c5cff);
  }

  .history-msg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .history-meta {
    opacity: 0.55;
    font-size: 0.76rem;
  }

  /* Oppsettsveiviseren */
  .confirm-line {
    opacity: 0.9;
    margin: 0;
  }

  .setup-overlay {
    position: fixed;
    inset: 0;
    z-index: 400;
    display: grid;
    place-items: center;
    background: rgb(0 0 0 / 55%);
  }

  .setup-card {
    display: grid;
    gap: 0.8rem;
    width: min(26rem, calc(100vw - 2rem));
    padding: 1.4rem;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  .setup-card h2 {
    margin: 0;
    font-size: 1.15rem;
  }

  .setup-card label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    font-size: 0.88rem;
  }

  .setup-card input:not([type='color']) {
    flex: 1 1 55%;
    min-width: 0;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    height: 2.2rem;
    padding: 0 0.6em;
  }

  .setup-card input[type='color'] {
    height: 2.2rem;
    width: 3rem;
    padding: 2px;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    cursor: pointer;
  }

  .setup-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
  }

  /* Nedtrekk og felt inni panel-etiketter skal aldri sprenge bredden */
  .panel-body select,
  .panel-body label > select,
  .panel-body label > input {
    min-width: 0;
    max-width: 100%;
  }

  .panel-body textarea {
    font: inherit;
    font-size: 0.85rem;
    line-height: 1.4;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.4em 0.5em;
    min-width: 0;
    resize: vertical;
  }

  /* Samme innvendige marg og høyde som tekstfeltene, så teksten
     linjerer (pilen trenger fortsatt plass til høyre) */
  .panel-body select {
    font-size: 0.85rem;
    height: 2.2rem;
    padding: 0 2.1em 0 0.5em;
  }

  /* Posisjon/størrelse-feltene i Egenskaper: to kolonner med smale felt */
  .frame-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 0.4rem 0.6rem;
  }

  .frame-grid input {
    width: 4.2rem;
  }

  /* Grupper i panelet (Tekst, Former): ser ut som blokk-knappene, men med
     pil - åpnes til en vertikal liste av blokker under */
  .group summary {
    list-style: none;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .group summary::after {
    content: '▸';
    opacity: 0.6;
  }

  .group[open] summary::after {
    content: '▾';
  }

  .group[open] summary {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  /* «Plassering, lag og rotasjon» er en SEKSJONS-foldemeny, ikke en chip:
     dropp pille-rammen, la den lese som en enkel overskriftsrad. */
  .frame-group summary {
    border: 0;
    border-radius: 0;
    padding-left: 0.1em;
    font-weight: 600;
    opacity: 0.9;
  }

  .frame-group[open] summary {
    border-color: transparent;
  }

  /* Grupper er grid-elementer: uten min-width 0 nekter de å krympe til
     panelbredden, og innholdet (fargevelgere, brytere) kuttes i kanten */
  .group {
    min-width: 0;
  }

  .group-items {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.4rem;
    margin-top: 0.4rem;
    padding-left: 0.8rem;
  }

  .panel-hint {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.65;
  }

  /* Kontrast-varsel: lav aksent/tekst-kontrast. Tydeligere enn en vanlig hint. */
  .contrast-warn {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    opacity: 1;
    color: #d98324;
  }
  .contrast-warn :global(svg) { flex: none; margin-top: 2px; }

  /* Tema-forslag: rad med palett-miniatyrer (alle på én rad) */
  .theme-presets { display: flex; gap: 6px; margin: 6px 0 12px; }
  .theme-preset {
    flex: 1; min-width: 0; padding: 0; cursor: pointer; color: inherit; background: transparent;
    display: flex; flex-direction: column; align-items: stretch;
    border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 9px; overflow: hidden;
  }
  .theme-preset:hover { border-color: var(--urd-color-accent); }
  .theme-preset.sel { outline: 2px solid var(--urd-color-accent); outline-offset: 1px; }
  .theme-preset .tp-band { display: flex; height: 22px; }
  .theme-preset .tp-band i { flex: 1; }
  .theme-preset small { display: block; text-align: center; font-size: 9px; padding: 2px 0 3px; opacity: 0.8; }

  /* Palett-forhåndsvisning av gjeldende tema */
  .theme-palette { display: flex; gap: 8px; margin: 0 0 14px; }
  .theme-palette .tp-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px; }
  .theme-palette .tp-col i { display: block; height: 38px; border-radius: 8px; border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
  .theme-palette .tp-col span { text-align: center; font-size: 10px; opacity: 0.7; }

  /* Farger: Auto/Egne, palett-rader (Lys+Mørk), Standard-tag */
  .autorow { display: flex; align-items: center; justify-content: space-between; margin: 8px 0 2px; }
  .autorow .autolbl { font-size: 0.85rem; opacity: 0.75; }
  .seg { display: inline-flex; border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 999px; overflow: hidden; }
  .seg button { border: 0; background: transparent; color: inherit; font: 600 11px system-ui, sans-serif; padding: 3px 11px; cursor: pointer; }
  .seg button.on { background: var(--urd-color-accent); color: var(--urd-color-bg); }
  .palhead { display: flex; align-items: center; justify-content: space-between; margin: 13px 0 6px; }
  .palname { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }
  .stdtag { border: 1px solid var(--urd-color-accent); background: color-mix(in srgb, var(--urd-color-accent) 20%, transparent); color: inherit; font: 600 9.5px system-ui, sans-serif; padding: 2px 9px; border-radius: 999px; cursor: pointer; }
  .stdtag.ghost { border-color: color-mix(in srgb, currentColor 18%, transparent); background: transparent; opacity: 0.6; }
  .palcells { display: flex; gap: 6px; }
  .palcells .palcol { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: stretch; gap: 4px; }
  .palcells :global(.cp) { display: block; width: 100%; }
  .palcells :global(.cp-swatch) { width: 100%; height: 32px; }
  .palcells .palcap { text-align: center; font-size: 9px; opacity: 0.6; }
  .palcells .palhex { text-align: center; font: 400 9px ui-monospace, monospace; opacity: 0.7; letter-spacing: -0.02em; }
  .palcells.autopal .palcol { opacity: 0.7; }

  /* Forhåndsvisning: hvordan hver farge påvirker siden (lys + mørk ved dual) */
  .theme-previews { display: flex; gap: 10px; margin-top: 13px; }
  .theme-pvw { flex: 1; min-width: 0; }
  .tpv-cap { font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.5; margin-bottom: 5px; }
  .tpv-demo { border-radius: 9px; border: 1px solid color-mix(in srgb, currentColor 12%, transparent); background: var(--tv-bg); color: var(--tv-text); padding: 9px 10px 10px; }
  .tpv-h { font-weight: 700; font-size: 12px; margin-bottom: 5px; }
  .tpv-card { background: var(--tv-surface); border: 1px solid color-mix(in srgb, var(--tv-text) 12%, transparent); border-radius: 7px; padding: 6px 8px; font-size: 10px; color: color-mix(in srgb, var(--tv-text) 62%, transparent); margin-bottom: 8px; }
  .tpv-row { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
  .tpv-btn { background: var(--tv-accent); color: var(--tv-accent-ink); font: 600 10.5px system-ui, sans-serif; padding: 5px 11px; border-radius: 999px; }
  .tpv-lnk { color: var(--tv-accent); font: 600 10.5px system-ui, sans-serif; border-bottom: 1.5px solid currentColor; }

  /* Typografi-prøve + Form-hjørneprøve */
  .typo-sample { margin-top: 10px; padding: 11px 12px; background: color-mix(in srgb, currentColor 5%, transparent); border: 1px solid color-mix(in srgb, currentColor 12%, transparent); border-radius: 9px; }
  .typo-sample .ts-h { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
  .typo-sample .ts-b { font-size: 12.5px; opacity: 0.7; line-height: 1.5; }
  .form-prev { display: flex; align-items: center; gap: 12px; padding: 12px; background: color-mix(in srgb, currentColor 5%, transparent); border: 1px solid color-mix(in srgb, currentColor 12%, transparent); border-radius: 9px; margin-bottom: 10px; }
  .form-prev .fp-btn { background: var(--urd-color-accent); color: var(--urd-color-bg); font: 600 12px system-ui, sans-serif; padding: 8px 15px; border-radius: var(--r-sm); }
  .form-prev .fp-card { flex: 1; height: 42px; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); border-radius: var(--r-md); display: grid; place-items: center; font-size: 11px; opacity: 0.7; }
  .rng-lab { display: flex; align-items: center; justify-content: space-between; }

  /* Bryterrader som moderne innstillinger: tekst til venstre, bryter
     ytterst til høyre (markupen har input først; row-reverse snur) */
  .gridmenu-snap {
    flex-direction: row-reverse;
    justify-content: space-between;
    text-align: left;
  }

  .gridmenu-value {
    font-variant-numeric: tabular-nums;
    opacity: 0.75;
  }

  /* Bilde-bakgrunnslag: fokuspunkt-pad (dra), under-sliders og størrelse-stepper */
  .focalpad {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 4px 0 6px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 8px;
    background: color-mix(in srgb, currentColor 7%, transparent);
    cursor: crosshair;
    touch-action: none;
  }
  .focaldot {
    position: absolute;
    left: var(--fx, 50%);
    top: var(--fy, 50%);
    width: 14px;
    height: 14px;
    transform: translate(-50%, -50%);
    border: 2px solid var(--urd-color-accent, #15b39a);
    border-radius: 50%;
    background: color-mix(in srgb, var(--urd-color-accent, #15b39a) 30%, transparent);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 45%);
    pointer-events: none;
  }
  label.sub {
    font-size: 0.85em;
    opacity: 0.8;
  }
  .sizestep {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 2px 0 6px;
  }
  .sizestep button {
    width: 28px;
    height: 28px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 7px;
    background: transparent;
    color: inherit;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
  }
  .sizestep button:hover { border-color: var(--urd-color-accent); }
  .sizestep input {
    width: 60px;
    text-align: center;
    padding: 5px 4px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 7px;
    background: transparent;
    color: inherit;
    font-variant-numeric: tabular-nums;
  }
  .sizeunit { opacity: 0.6; }
  /* «Dekk» / «Vis hele»-hurtigknapper for Størrelse */
  .sizefill { display: flex; gap: 6px; margin: 0 0 8px; }
  .sizefill button {
    flex: 1;
    padding: 5px 8px;
    border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 7px;
    background: transparent;
    color: inherit;
    font-size: 0.85em;
    cursor: pointer;
  }
  .sizefill button:hover { border-color: var(--urd-color-accent); }

  .gridmenu-divider {
    border: 0;
    border-top: 1px solid rgb(255 255 255 / 12%);
    margin: 0.2rem 0;
  }

  .filepick {
    cursor: pointer;
  }

  .filepick input {
    display: none;
  }

  select,
  button,
  .ghost {
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.35em 0.8em;
    cursor: pointer;
    text-decoration: none;
  }

  /* Knapper skal SE UT som knapper: fylt flate, tydelig hover og et
     lite trykk ved klikk. Felt (input/select) forblir flate. */
  button,
  .ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4em;
    background: rgb(255 255 255 / 7%);
    transition: background 0.12s ease, border-color 0.12s ease, transform 0.05s ease;
  }

  button:hover:not(:disabled),
  .ghost:hover {
    background: rgb(255 255 255 / 13%);
    border-color: rgb(255 255 255 / 38%);
  }

  button:active:not(:disabled) {
    transform: translateY(1px);
  }

  /* Kontroller skal ikke arve sidens luftige line-height (1.6 fra
     base.css via font: inherit): stram linjeboks gir jevn sentrering */
  select,
  button,
  .ghost,
  input {
    line-height: 1.3;
  }

  /* Nedtrekkslisten følger mørkt tema (nettleser-standarden er hvit).
     Egen pil (appearance: none): nettleserens pil sitter klistret mot
     høyrekanten og gir teksten en ekstra innrykk. */
  select {
    color-scheme: dark;
    appearance: none;
    padding-right: 2.1em;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%23e8eaf0' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7em center;
    background-size: 0.85em;
  }

  select option {
    background: var(--urd-color-surface, #151a23);
    color: var(--urd-color-text, #e8eaf0);
  }

  button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .primary {
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
    color: #fff;
  }

  /* Væpnet «Forkast utkast»: rød og «Sikker?» til man klikker et annet
     sted. Fast bredde så topplinjen ikke hopper når teksten byttes. */
  .discard-btn {
    min-width: 9.5em;
  }

  .discard-btn.armed {
    background: #c22f2f;
    border-color: #e05252;
    color: #fff;
  }

  .discard-btn.armed:hover:not(:disabled) {
    background: #d63a3a;
    border-color: #e05252;
  }

  .frame-wrap {
    flex: 1;
    min-height: 0;
    overflow: auto;
    display: flex;
    /* 'safe' hindrer at topp/venstre klippes bort når lerretet er større enn
       flaten (100%-modus): da forankres det i stedet for å sentreres vekk. */
    justify-content: safe center;
    align-items: safe center;
    background: #08090d;            /* letterbox-flate rundt lerretet */
  }

  /* Lerretsboksen har den SKALERTE størrelsen; iframen inni står i full
     målviewport og skaleres med transform (se markup), så render-en er
     identisk med publisert - kun visningsstørrelsen endres. */
  .stage {
    flex: 0 0 auto;
    position: relative;
  }

  iframe {
    border: 0;
    background: #fff;
    display: block;
  }

  /* Mobilvisning: iframen står i 390px (motorens matchMedia styres av
     urd-viewport, ikke bredden) og skaleres for å passe; mørk backdrop. */
  .frame-wrap.mobile {
    background: #08090d;
  }

  .frame-wrap.mobile .stage {
    border-radius: 12px;
    overflow: hidden;
  }

  .viewswitch,
  .zoomswitch {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .viewswitch .active,
  .zoomswitch .active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 15%, transparent);
  }

  /* Hjelpelinje-knappen står alene i topbaren og trenger sin egen,
     tydelige på-tilstand (aktiv-stilene over er container-avgrenset). */
  .guides-btn.active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 22%, transparent);
    color: var(--urd-color-accent, #7c5cff);
  }

  .zoom-readout {
    font-size: 0.8rem;
    opacity: 0.7;
    padding: 0 0.3em;
    min-width: 3.2em;
    text-align: right;
  }

  .badge.attention {
    background: rgb(226 184 74 / 20%);
    color: #e2b84a;
    border: 0;
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
  }

  .loading {
    padding: 2rem;
    text-align: center;
  }
</style>
