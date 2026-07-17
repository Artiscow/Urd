<script>
  // Editor-skallet for v0.2 «tynn skive»: preview-iframe med den ekte
  // siden, klikk-og-skriv på tekstblokker, utkast i localStorage og
  // publiseringsknapp mot /api/github/commit.
  import { createDraftStore } from './lib/draftStore.js';
  import { createPreviewBridge } from './lib/previewBridge.js';
  // Editoren deler migreringskoden med motoren (samme fil, bundles inn).
  import { liftPageFile, liftSiteFile } from '../../template/assets/engine/migrate.js';
  import { compressToWebp, slugify, contentHash, WARN_BYTES } from './lib/imageTools.js';

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
    dirty = anyPageDraft
      || (store?.hasDraft() && !pendingPublished.has(pageId))
      || siteStore?.hasDraft() || false;
  }

  /**
   * Angre/gjenta: snapshot-basert historikk over BÅDE side- og site-utkastet.
   * pushHistory kalles FØR hver mutasjon; tastene brukes til å slå sammen
   * skurer av samme handling (hvert tastetrykk i en tekstblokk skal ikke
   * bli hvert sitt angre-steg).
   */
  const history = [];
  const redoStack = [];
  let lastHistoryKey = null;

  function snapshot() {
    return JSON.stringify({ page: store.data, site: siteStore.data });
  }

  function pushHistory(key) {
    if (key === lastHistoryKey && (key.startsWith('edit:') || key === 'grid')) return;
    history.push(snapshot());
    if (history.length > 50) history.shift();
    redoStack.length = 0;
    lastHistoryKey = key;
  }

  function restore(snap) {
    const { page, site: siteSnap } = JSON.parse(snap);
    store.replace(page);
    siteStore.replace(siteSnap);
    linkSiteDraft();
    store.save();
    siteStore.save();
    grid = { snap: true, ...siteDraft.grid };
    updateDirty();
    updateAttention();
    pushSiteToPreview();
    // Angring kan fjerne siden man står på (angret sideopprettelse):
    // da byttes det til forsiden i stedet for å bli stående i løse luften.
    if (!siteDraft.pages.some((p) => p.id === pageId)) {
      selectPage(siteDraft.pages[0].id);
    } else {
      bridge?.sendPage(pageId, store.data);
    }
  }

  function undo() {
    if (!history.length) return;
    redoStack.push(snapshot());
    restore(history.pop());
    lastHistoryKey = null;
    setStatus('Angret');
  }

  function redo() {
    if (!redoStack.length) return;
    history.push(snapshot());
    restore(redoStack.pop());
    lastHistoryKey = null;
    setStatus('Gjentatt');
  }

  function onKeydown(e) {
    if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'z') return;
    const t = e.target;
    // Fritekstfelter beholder nettleserens egen angring; alt annet
    // (inkl. tallfeltene i grid-menyen) bruker editorens historikk.
    const nativeUndo = t instanceof HTMLElement
      && (t.isContentEditable || t.tagName === 'TEXTAREA'
        || (t.tagName === 'INPUT' && !['number', 'checkbox', 'range'].includes(t.type)));
    if (nativeUndo) return;
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  }

  async function init() {
    site = liftSiteFile(await (await fetch('/content/site.json')).json());
    siteStore = createDraftStore('urd-draft-site', () => site);
    // Utkast fra før grid-omleggingen kan ligge i localStorage: løft dem.
    siteStore.replace(liftSiteFile(siteStore.data));
    siteStore.save();
    linkSiteDraft();
    grid = { snap: true, ...siteDraft.grid };
    await selectPage(new URLSearchParams(location.search).get('page') ?? siteDraft.pages[0].id);
    await checkAuth();
  }

  /** Aktivt panel i venstre panelvelger (null = lukket) */
  let activePanel = $state(null);
  const PANELS = ['Sider', 'Blokker', 'Egenskaper', 'Tema', 'Nav', 'Grid', 'Historikk'];

  function togglePanel(name) {
    activePanel = activePanel === name ? null : name;
    // Gridet vises i forhåndsvisningen så lenge Grid-panelet er åpent.
    bridge?.sendShowGrid(activePanel === 'Grid');
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
    };
  }

  function onSelectBlock(msg) {
    if (!msg.blockId) {
      selectedBlock = null;
      return;
    }
    selectedBlock = { sectionId: msg.sectionId, blockId: msg.blockId };
    syncSelectedBlock();
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
    mutateBlock(`edit:${selectedBlock.blockId}`, (b) => { b.props[name] = value; });
  }

  function setBlockFrame(field, value) {
    if (!Number.isFinite(value)) return;
    mutateBlock(`edit:frame-${selectedBlock.blockId}`, (b) => {
      b.frames.desktop = { ...b.frames.desktop, [field]: value };
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
      const img = await compressToWebp(file);
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.props.src = img.dataUrl;
        b.props.alt = b.props.alt || slugify(file.name).replaceAll('-', ' ');
      });
    } catch {
      setStatus('Kunne ikke lese bildet (prøv jpg/png/webp)', 'error');
    }
  }

  /** Navn på blokktypene i panelet. */
  const BLOCK_LABELS = { text: 'Tekst', button: 'Knapp', image: 'Bilde', shape: 'Form' };
  const SHAPE_KINDS = [
    ['line', 'Strek'], ['arrow', 'Pil'], ['circle', 'Sirkel'],
    ['rect', 'Rektangel'], ['triangle', 'Trekant'],
  ];
  const COLOR_TOKENS = [
    ['accent', 'Aksent'], ['text', 'Tekst'], ['surface', 'Flate'], ['bg', 'Bakgrunn'],
  ];

  /** Sist klikkede seksjon i forhåndsvisningen: paletten legger nye
   *  blokker her, og grid-menyen kan gi den eget grid. */
  let activeSectionId = $state(null);
  /** Speil av den aktive seksjonens grid-overstyring (null = arver) */
  let sectionGrid = $state(null);
  /** Speil av den aktive seksjonens minstehøyde (for Egenskaper-panelet) */
  let sectionMinHeight = $state('');

  function onSelectSection(msg) {
    activeSectionId = msg.sectionId;
    const section = store?.data.sections.find((s) => s.id === msg.sectionId);
    sectionGrid = section?.grid ? { ...section.grid } : null;
    sectionMinHeight = section?.size?.minHeight ?? '';
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
    pushHistory('grid');
    section.grid = on ? { ...siteStore.data.grid } : null;
    sectionGrid = section.grid ? { ...section.grid } : null;
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    if (activePanel === 'Grid') bridge?.sendShowGrid(true);
  }

  function setSectionGrid(field, value) {
    const section = store.data.sections.find((s) => s.id === activeSectionId);
    if (!section?.grid) return;
    pushHistory('grid');
    section.grid = { ...section.grid, [field]: value };
    sectionGrid = { ...section.grid };
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    if (activePanel === 'Grid') bridge?.sendShowGrid(true);
  }

  /** Grid-kontrollene: endringer lagres i site-utkastet og pushes live.
   *  Gridet er kun et snappeverktøy; å endre det flytter aldri innhold. */
  function setGrid(field, value) {
    pushHistory('grid');
    grid = { ...grid, [field]: value };
    siteStore.data.grid = { ...siteStore.data.grid, [field]: value };
    siteStore.save();
    updateDirty();
    pushSiteToPreview();
    // sendSite rerendrer siden; slå grid-visningen på igjen etterpå
    // (postMessage er ordnet, så dette ankommer etter rerenderingen).
    if (activePanel === 'Grid') bridge?.sendShowGrid(true);
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

  /** Løper mens en sides data lastes; urd-ready venter på denne. */
  let pageLoading = null;

  /** Tom side for nyopprettede sider (må validere mot page-skjemaet). */
  function blankPage(entry) {
    return {
      schemaVersion: 3,
      meta: { id: entry.id, title: entry.title },
      sections: [{
        id: `sec-${crypto.randomUUID().slice(0, 8)}`,
        version: 1,
        preset: 'tom',
        size: { minHeight: '40vh' },
        grid: null,
        background: { version: 1, layers: [{ type: 'color', version: 1, props: { value: 'bg' } }] },
        blocks: [],
      }],
    };
  }

  async function selectPage(id) {
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
      store = createDraftStore(`urd-draft-${id}`, () => published);
      store.replace(liftPageFile(store.data, siteStore.data));
      store.save();
      history.length = 0;
      redoStack.length = 0;
      lastHistoryKey = null;
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
    bridge = createPreviewBridge(iframeEl, {
      onEdit: handleEdit,
      onMove: handleMove,
      onDelete: handleDelete,
      onAddSection: handleAddSection,
      onMoveSection: handleMoveSection,
      onDeleteSection: handleDeleteSection,
      onSectionSize: handleSectionSize,
      onUndo: (msg) => (msg.redo ? redo() : undo()),
      onSelectSection,
      onSelectBlock,
      onReady,
      onNavigate,
      onAddBlock: (msg) => insertBlock(msg.sectionId, msg.block),
      onMobileManual: handleMobileManual,
      onMobileAuto: handleMobileAuto,
      onReviewDone: handleReviewDone,
      onBlockFlag: handleBlockFlag,
    });
  }

  /** Motoren i iframen lytter nå: send utkast og gjeldende editor-tilstand. */
  async function onReady() {
    await pageLoading;
    if (siteStore.hasDraft()) pushSiteToPreview();
    // Upubliserte sider finnes ikke på serveren (iframen faller tilbake
    // til forsiden): editorens data er kilden og må alltid sendes.
    const unpublished = !site.pages.some((p) => p.id === pageId);
    if (store.hasDraft() || unpublished) bridge?.sendPage(pageId, store.data);
    if (!chromeVisible) bridge?.sendChrome(false);
    if (activePanel === 'Grid') bridge?.sendShowGrid(true);
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
    if (!slug) return 'Siden trenger et navn';
    if (RESERVED_SLUGS.includes(slug)) return `«${slug}» er et reservert navn`;
    if (siteDraft.pages.some((p) => p.id !== ignoreId && (p.path === `/${slug}` || p.id === slug))) {
      return 'Det finnes allerede en side med dette navnet';
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
    localStorage.setItem(`urd-draft-${slug}`, JSON.stringify(blankPage({ id: slug, title })));
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
    localStorage.setItem(key, JSON.stringify(page));
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
      siteDraft.nav.items = siteDraft.nav.items.filter((i) => i.page !== entry.id);
    });
    // Sidens eget utkast beholdes: Ctrl+Z gjenoppretter alt.
    if (entry.id === pageId) selectPage(siteDraft.pages[0].id);
    setStatus('Siden fjernes ved neste publisering (Ctrl+Z angrer)');
  }

  /* ---------- Nav-panelet ---------- */

  function setLogo(patch) {
    siteMutate('edit:nav-logo', () => {
      siteDraft.nav.logo = { type: 'text', value: '', ...siteDraft.nav.logo, ...patch };
    });
  }

  function setNavLabel(i, value) {
    siteMutate(`edit:nav-label-${i}`, () => { siteDraft.nav.items[i].label = value; });
  }

  /** Mål: en side fra registeret, eller '__href' = ekstern lenke.
   *  Skjemaet tillater kun ett av feltene page/href, så det andre fjernes. */
  function setNavTarget(i, value) {
    siteMutate('nav', () => {
      const item = siteDraft.nav.items[i];
      if (value === '__href') {
        delete item.page;
        item.href = item.href ?? 'https://';
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
      siteDraft.nav.items.push({ label: 'Lenke', page: siteDraft.pages[0].id });
    });
  }

  /* ---------- Tema-panelet ---------- */

  const FONT_STACKS = [
    ['System', 'system-ui, sans-serif'],
    ['Arial', 'Arial, Helvetica, sans-serif'],
    ['Verdana', 'Verdana, Geneva, sans-serif'],
    ['Trebuchet', "'Trebuchet MS', sans-serif"],
    ['Georgia (serif)', "Georgia, 'Times New Roman', serif"],
    ['Palatino (serif)', "'Palatino Linotype', Palatino, serif"],
    ['Courier (skrivemaskin)', "'Courier New', monospace"],
  ];

  function setColorToken(name, value) {
    siteMutate(`edit:theme-color-${name}`, () => { siteDraft.theme.tokens.color[name] = value; });
  }

  function setFontToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.font[name] = value; });
  }

  function setRadiusToken(name, value) {
    siteMutate('theme', () => { siteDraft.theme.tokens.radius[name] = value; });
  }

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
    status = '';
  }

  /** Dra/resize fra iframen: iframen viser allerede den snappede
   *  posisjonen, så vi bare bokfører den i utkastet. */
  function handleMove(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    // coalesce: automatisk vekst under skriving hører til samme
    // angre-steg som selve skrivingen.
    pushHistory(msg.coalesce ? `edit:${msg.blockId}` : 'move-block');
    const key = msg.frameKey === 'mobile' ? 'mobile' : 'desktop';
    block.frames[key] = msg.frame;
    if (key === 'desktop') markDesktopChange(section, 'desktop-endret-etter-mobil');
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
    store.data.sections.splice(msg.index, 0, msg.section);
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
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
    if (msg.sectionId === activeSectionId) sectionMinHeight = msg.minHeight;
    store.save();
    updateDirty();
  }

  /** Sletting: fjern fra utkastet og rerender seksjonen i iframen. */
  function handleDelete(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    pushHistory('delete-block');
    section.blocks = section.blocks.filter((b) => b.id !== msg.blockId);
    if (selectedBlock?.blockId === msg.blockId) selectedBlock = null;
    markDesktopChange(section, 'blokk-slettet');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** Blokkpaletten: ny blokk nederst i første seksjon, klar til å dras dit
   *  den skal. (Seksjonvalg og «+ Ny seksjon» kommer senere i v0.3.) */
  /** w i prosent av seksjonsbredden, h i px (fysiske enheter). */
  const BLOCK_DEFAULTS = {
    text: { type: 'text', props: { html: '<p>Ny tekst</p>', align: 'left' }, w: 33, h: 28 },
    'text-box': { type: 'text', props: { html: '<h3>Overskrift</h3><p>Skriv innholdet her.</p>', align: 'left', box: true }, w: 30, h: 150 },
    button: { type: 'button', props: { label: 'Ny knapp', page: null, href: null, style: 'primary' }, w: 20, h: 36 },
    'shape-line': { type: 'shape', decor: true, props: { kind: 'line', color: 'accent', thickness: 2, fill: null }, w: 25, h: 8 },
    'shape-arrow': { type: 'shape', decor: true, props: { kind: 'arrow', color: 'accent', thickness: 2, fill: null }, w: 25, h: 16 },
    'shape-circle': { type: 'shape', decor: true, props: { kind: 'circle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
    'shape-rect': { type: 'shape', decor: true, props: { kind: 'rect', color: 'accent', thickness: 2, fill: null }, w: 20, h: 110 },
    'shape-triangle': { type: 'shape', decor: true, props: { kind: 'triangle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
  };

  function buildBlock(kind) {
    const d = BLOCK_DEFAULTS[kind];
    return {
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: d.type,
      version: 1,
      // Former er dekor som standard: de utelates fra auto-avledet
      // mobil-layout (kan skrus av per blokk med ✦-togglen).
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
    section.blocks.push(block);
    markDesktopChange(section, 'blokk-lagt-til');
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  function addBlock(kind) {
    requestPlacement(buildBlock(kind));
  }

  /** + Bilde: komprimer til webp og legg i utkastet som data-URL.
   *  Ved publisering materialiseres den til en fil i media/. */
  async function addImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setStatus('Komprimerer bildet…');
    let img;
    try {
      img = await compressToWebp(file);
    } catch {
      setStatus('Kunne ikke lese bildet (prøv jpg/png/webp)', 'error');
      return;
    }

    // Startbredde 30 % av seksjonen; høyden følger bildets sideforhold
    // med en antatt seksjonsbredde (justeres uansett fritt etterpå).
    const height = Math.round((img.height / img.width) * 0.3 * (iframeEl?.clientWidth ?? 1280));
    requestPlacement({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: 'image',
      version: 1,
      props: { src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), fit: 'cover', radius: 'md', href: null },
      animation: null,
      frames: { desktop: { x: 4, y: 8, w: 30, h: Math.max(40, height), z: 1, rot: 0 }, mobile: null },
    });
    if (img.bytes > WARN_BYTES) {
      setStatus(`Bildet er stort (${Math.round(img.bytes / 1024)} kB) - vurder et mindre utsnitt`, 'error');
    } else {
      setStatus('');
    }
  }

  /**
   * Gjør upubliserte bilder (data-URL-er i utkastet) om til filer i
   * media/, og bytter src til stien. Returnerer fillisten for commiten.
   * Samme bildeinnhold gir samme filnavn (deterministisk hash), så
   * republisering aldri dupliserer filer.
   */
  function materializeImages(page) {
    const files = [];
    for (const section of page.sections) {
      for (const block of section.blocks) {
        if (block.type !== 'image' || !block.props.src?.startsWith('data:image/')) continue;
        const base64 = block.props.src.split(',', 2)[1];
        const path = `media/${slugify(block.props.alt || 'bilde')}-${contentHash(base64)}.webp`;
        files.push({ path, content: base64, encoding: 'base64' });
        block.props.src = `/${path}`;
      }
    }
    return files;
  }

  function discard() {
    pushHistory('discard');
    const freshPage = store.reset();
    siteStore.reset();
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
    setStatus('Publiserer…');
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
      // Upubliserte bilder blir egne filer i media/ i samme commit.
      files.push(...materializeImages(page));
      files.push({ path: entry.file, content: JSON.stringify(page, null, 2) + '\n', encoding: 'utf-8' });
      publishedTitles.push(entry.title);
      // Nye sider finnes ikke på serveren før deployen er ferdig: utkastet
      // beholdes som kilde til da, og ryddes automatisk ved neste besøk.
      if (isNew) newPageIds.push(entry.id);
      else draftKeys.push(key);
    }
    if (store.hasDraft()) store.save();

    if (siteStore.hasDraft()) {
      files.push({ path: 'content/site.json', content: JSON.stringify(siteDraft, null, 2) + '\n', encoding: 'utf-8' });
      draftKeys.push('urd-draft-site');
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
    for (const p of site.pages) {
      const still = siteDraft.pages.find((q) => q.id === p.id);
      if (!still) {
        files.push({ path: p.file, delete: true });
        if (p.path !== '/') files.push({ path: `${p.path.slice(1)}/index.html`, delete: true });
      } else if (still.path !== p.path && p.path !== '/') {
        files.push({ path: `${p.path.slice(1)}/index.html`, delete: true });
      }
    }

    const body = {
      message: `Oppdater ${publishedTitles.join(', ') || 'innstillinger'} via Urd-admin`,
      files,
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
      // Utkastene ER nå det publiserte; behold dataene i minnet (serveren
      // serverer gammel JSON til deployen er ferdig) og fjern bare merkene.
      for (const key of draftKeys) localStorage.removeItem(key);
      for (const id of newPageIds) pendingPublished.add(id);
      // Publisert grunnlag = utkastet: bygg store-baselines på nytt, så
      // «Forkast utkast» aldri ruller tilbake forbi denne publiseringen.
      site = JSON.parse(JSON.stringify(siteDraft));
      siteStore = createDraftStore('urd-draft-site', () => site);
      linkSiteDraft();
      grid = { snap: true, ...siteDraft.grid };
      const pageSnap = JSON.parse(JSON.stringify(store.data));
      store = createDraftStore(`urd-draft-${pageId}`, () => pageSnap);
      if (pendingPublished.has(pageId)) {
        // Ny side: utkastet er kilden til deployen er ferdig - behold det.
        localStorage.setItem(`urd-draft-${pageId}`, JSON.stringify(pageSnap));
      }
      updateDirty();
      setStatus('✓ Publisert! Siden bygges på nytt (~1 min)', 'ok');
    } else if (res?.status === 401) {
      const detail = (await res.json().catch(() => null))?.error;
      setStatus(detail === 'Ugyldig eller utløpt innlogging'
        ? 'GitHub avviste innloggingen (utløpt token?) - logg inn på nytt'
        : `Du må logge inn med GitHub for å publisere (${detail ?? 'ukjent årsak'})`, 'error');
      await checkAuth();
    } else if (res?.status === 403) {
      setStatus((await res.json().catch(() => null))?.error ?? 'Du har ikke publiseringstilgang', 'error');
    } else if (res) {
      setStatus((await res.json().catch(() => null))?.error
        ?? 'Publisering feilet (er publiseringslaget satt opp?)', 'error');
    } else {
      setStatus('Publisering er ikke tilgjengelig her (krever host med functions)', 'error');
    }
  }

  init();
</script>

<svelte:window onkeydown={onKeydown} />

<div class="editor">
  {#if !chromeVisible}
    <!-- Ren visning: alt editor-UI er skjult så siden får full flate -->
    <button class="chrome-restore" onclick={toggleChrome} title="Tilbake til redigering">✏ Rediger</button>
  {/if}

  <header class="topbar" class:hidden={!chromeVisible}>
    <span class="topbar-group">
      <strong class="brand">Urd</strong>

      {#if site}
        <select value={pageId} onchange={(e) => selectPage(e.target.value)}>
          {#each siteDraft.pages as p (p.id)}
            <option value={p.id}>{p.title}</option>
          {/each}
        </select>

        <span class="viewswitch">
          <button class="ghost" class:active={viewMode === 'desktop'}
            onclick={() => (viewMode = 'desktop')} title="Desktop-visning">💻</button>
          <button class="ghost" class:active={viewMode === 'mobile'}
            onclick={() => (viewMode = 'mobile')} title="Mobilvisning (390px)">📱</button>
        </span>
      {/if}

      {#if attentionCount > 0}
        <button class="badge attention" onclick={() => (viewMode = 'mobile')}
          title="Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over">
          📱 {attentionCount} {attentionCount === 1 ? 'seksjon' : 'seksjoner'} trenger mobil-tilsyn
        </button>
      {/if}

      {#if dirty}
        <span class="badge">Upubliserte endringer</span>
      {/if}
    </span>

    <span class="topbar-group topbar-right">
    {#if site}
      <button
        class="ghost"
        onclick={toggleChrome}
        title={chromeVisible ? 'Skjul editeringshåndtakene og se siden som besøkende gjør' : 'Vis editeringshåndtakene igjen'}
      >{chromeVisible ? '👁 Ren visning' : '✏ Rediger'}</button>
      {#if auth?.loggedIn}
        <span class="who" title={auth.allowed ? 'Har publiseringstilgang' : 'Mangler publiseringstilgang (ALLOWED_LOGINS)'}>
          {auth.allowed ? '' : '⚠ '}{auth.login}
        </span>
      {:else if auth}
        <a class="ghost" href="/api/github/login">Logg inn med GitHub</a>
      {/if}
      <a class="ghost" href={pageEntry().path} target="_blank" rel="noopener">Se siden ↗</a>
      <button class="ghost" onclick={discard} disabled={!dirty}>Forkast utkast</button>
      <button class="primary" onclick={publish} disabled={!dirty}>Publiser</button>
    {/if}
    </span>
  </header>

  {#if site}
    <div class="workspace">
      {#if chromeVisible}
        <nav class="rail">
          {#each PANELS as name}
            <button class:active={activePanel === name} onclick={() => togglePanel(name)}>{name}</button>
          {/each}
        </nav>

        {#if activePanel}
          <aside class="panel">
            <h2>{activePanel}</h2>

            {#if activePanel === 'Sider'}
              <div class="panel-body">
                <p class="panel-hint">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p>
                {#each siteDraft.pages as p (p.id)}
                  <div class="page-row" class:current={p.id === pageId}>
                    <input class="page-title" value={p.title} title="Sidens navn"
                      onchange={(e) => renamePage(p, e.target.value)} />
                    {#if p.path === '/'}
                      <span class="page-path" title="Forsiden kan ikke flyttes eller slettes">/</span>
                    {:else}
                      <input class="page-slug" value={p.path.slice(1)} title="Adressen (dinside.no/…)"
                        onchange={(e) => setPageSlug(p, e.target.value)} />
                    {/if}
                    <span class="row-tools">
                      <button class="ghost row-tool" title="Åpne siden i editoren"
                        disabled={p.id === pageId} onclick={() => selectPage(p.id)}>→</button>
                      {#if p.path !== '/'}
                        <button class="ghost row-tool" title="Slett siden (Ctrl+Z angrer)"
                          onclick={() => deletePage(p)}>×</button>
                      {/if}
                    </span>
                  </div>
                {/each}
                <hr class="gridmenu-divider" />
                <input placeholder="Navn på ny side" bind:value={newPageTitle}
                  onkeydown={(e) => e.key === 'Enter' && addPage()} />
                <button class="ghost" onclick={addPage} disabled={!newPageTitle.trim()}>+ Opprett side</button>
                <p class="panel-hint">Nye sider legges automatisk i menyen og starter tomme.</p>
              </div>
            {:else if activePanel === 'Nav'}
              <div class="panel-body">
                <p class="panel-hint">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p>
                <label>
                  Logo
                  <select value={siteDraft.nav.logo?.type ?? 'text'}
                    onchange={(e) => setLogo({ type: e.target.value })}>
                    <option value="text">Tekst</option>
                    <option value="image">Bilde (URL)</option>
                  </select>
                </label>
                <input value={siteDraft.nav.logo?.value ?? ''}
                  placeholder={siteDraft.nav.logo?.type === 'image' ? '/media/logo.webp' : 'Navnet i menyen'}
                  oninput={(e) => setLogo({ value: e.target.value })} />
                <hr class="gridmenu-divider" />
                {#each siteDraft.nav.items as item, i}
                  <div class="nav-row">
                    <span class="nav-line">
                      <input value={item.label} title="Teksten i menyen"
                        oninput={(e) => setNavLabel(i, e.target.value)} />
                      <span class="row-tools">
                        <button class="ghost row-tool" onclick={() => moveNavItem(i, -1)} disabled={i === 0}>↑</button>
                        <button class="ghost row-tool" onclick={() => moveNavItem(i, 1)}
                          disabled={i === siteDraft.nav.items.length - 1}>↓</button>
                        <button class="ghost row-tool" title="Fjern fra menyen (siden består)"
                          onclick={() => removeNavItem(i)}>×</button>
                      </span>
                    </span>
                    <select value={item.page ?? '__href'} title="Hvor lenken går"
                      onchange={(e) => setNavTarget(i, e.target.value)}>
                      {#each siteDraft.pages as p (p.id)}
                        <option value={p.id}>{p.title}</option>
                      {/each}
                      <option value="__href">Ekstern lenke</option>
                    </select>
                    {#if !item.page}
                      <input value={item.href ?? ''} placeholder="https://…"
                        onchange={(e) => setNavHref(i, e.target.value)} />
                    {/if}
                  </div>
                {/each}
                <button class="ghost" onclick={addNavItem}>+ Nytt menypunkt</button>
              </div>
            {:else if activePanel === 'Tema'}
              <div class="panel-body">
                <p class="panel-hint">Fargene og fontene hele siden bygger på. Endringer vises live.</p>
                <label>Bakgrunn
                  <input type="color" value={siteDraft.theme.tokens.color.bg}
                    oninput={(e) => setColorToken('bg', e.target.value)} /></label>
                <label>Flater
                  <input type="color" value={siteDraft.theme.tokens.color.surface}
                    oninput={(e) => setColorToken('surface', e.target.value)} /></label>
                <label>Tekst
                  <input type="color" value={siteDraft.theme.tokens.color.text}
                    oninput={(e) => setColorToken('text', e.target.value)} /></label>
                <label>Aksent
                  <input type="color" value={siteDraft.theme.tokens.color.accent}
                    oninput={(e) => setColorToken('accent', e.target.value)} /></label>
                <hr class="gridmenu-divider" />
                <label>Overskrifter
                  <select value={siteDraft.theme.tokens.font.heading}
                    onchange={(e) => setFontToken('heading', e.target.value)}>
                    {#if !FONT_STACKS.some(([, v]) => v === siteDraft.theme.tokens.font.heading)}
                      <option value={siteDraft.theme.tokens.font.heading}>Egendefinert</option>
                    {/if}
                    {#each FONT_STACKS as [name, value] (value)}
                      <option {value}>{name}</option>
                    {/each}
                  </select></label>
                <label>Brødtekst
                  <select value={siteDraft.theme.tokens.font.body}
                    onchange={(e) => setFontToken('body', e.target.value)}>
                    {#if !FONT_STACKS.some(([, v]) => v === siteDraft.theme.tokens.font.body)}
                      <option value={siteDraft.theme.tokens.font.body}>Egendefinert</option>
                    {/if}
                    {#each FONT_STACKS as [name, value] (value)}
                      <option {value}>{name}</option>
                    {/each}
                  </select></label>
                <hr class="gridmenu-divider" />
                <label>Avrunding, liten
                  <input class="token-input" value={siteDraft.theme.tokens.radius.sm}
                    onchange={(e) => setRadiusToken('sm', e.target.value)} /></label>
                <label>Avrunding, stor
                  <input class="token-input" value={siteDraft.theme.tokens.radius.md}
                    onchange={(e) => setRadiusToken('md', e.target.value)} /></label>
              </div>
            {:else if activePanel === 'Blokker'}
              <div class="panel-body" class:locked={viewMode === 'mobile'}
                title={viewMode === 'mobile' ? 'Bytt til desktop-visning for å legge til innhold' : undefined}>
                <p class="panel-hint">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p>
                <details class="group">
                  <summary>Tekst</summary>
                  <div class="group-items">
                    <button class="ghost" onclick={() => addBlock('text')}>Tekst</button>
                    <button class="ghost" onclick={() => addBlock('text-box')}
                      title="Tekst i et kort med bakgrunn og avrundede hjørner">Tekstboks</button>
                  </div>
                </details>
                <button class="ghost" onclick={() => addBlock('button')}>Knapp</button>
                <label class="ghost filepick" title="Komprimeres automatisk til webp">
                  Bilde
                  <input type="file" accept="image/*" onchange={addImage} />
                </label>
                <details class="group">
                  <summary>Former</summary>
                  <div class="group-items">
                    <button class="ghost" onclick={() => addBlock('shape-line')}>Strek</button>
                    <button class="ghost" onclick={() => addBlock('shape-arrow')}>Pil</button>
                    <button class="ghost" onclick={() => addBlock('shape-circle')}>Sirkel</button>
                    <button class="ghost" onclick={() => addBlock('shape-rect')}>Rektangel</button>
                    <button class="ghost" onclick={() => addBlock('shape-triangle')}>Trekant</button>
                  </div>
                </details>
              </div>
            {:else if activePanel === 'Grid'}
              <div class="panel-body">
                <p class="panel-hint">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p>
                <label>
                  Rutestørrelse
                  <span class="gridmenu-value">{grid.size} px</span>
                </label>
                <input type="range" min="4" max="96" step="2" value={grid.size}
                  oninput={(e) => setGrid('size', Number(e.target.value))} />
                <label class="gridmenu-snap">
                  <input type="checkbox" checked={grid.snap !== false}
                    onchange={(e) => setGrid('snap', e.target.checked)} />
                  Snap til grid
                </label>

                <p class="panel-hint">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p>
              </div>
            {:else if activePanel === 'Egenskaper'}
              <div class="panel-body">
                {#if selectedBlock}
                  <p class="panel-strong">{BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type}-blokk</p>

                  {#if viewMode === 'desktop'}
                    <div class="frame-grid">
                      <label>X %<input type="number" step="0.5" value={selectedBlock.frame.x}
                        onchange={(e) => setBlockFrame('x', Number(e.target.value))} /></label>
                      <label>Y px<input type="number" step="1" value={selectedBlock.frame.y}
                        onchange={(e) => setBlockFrame('y', Number(e.target.value))} /></label>
                      <label>Bredde %<input type="number" step="0.5" min="1" value={selectedBlock.frame.w}
                        onchange={(e) => setBlockFrame('w', Number(e.target.value))} /></label>
                      <label>Høyde px<input type="number" step="1" min="1" value={selectedBlock.frame.h}
                        onchange={(e) => setBlockFrame('h', Number(e.target.value))} /></label>
                      <label>Lag (z)<input type="number" step="1" value={selectedBlock.frame.z ?? 1}
                        onchange={(e) => setBlockFrame('z', Number(e.target.value))} /></label>
                      <label>Rotasjon °<input type="number" step="1" value={selectedBlock.frame.rot ?? 0}
                        onchange={(e) => setBlockFrame('rot', Number(e.target.value))} /></label>
                    </div>
                  {/if}

                  <label class="gridmenu-snap" title="Gjelder kun automatisk mobil-layout">
                    <input type="checkbox" checked={selectedBlock.decor}
                      onchange={(e) => setBlockDecor(e.target.checked)} />
                    📵 Skjul i automatisk mobil-layout (pynt)
                  </label>
                  <hr class="gridmenu-divider" />

                  {#if selectedBlock.type === 'text'}
                    <label>Justering
                      <select value={selectedBlock.props.align ?? 'left'}
                        onchange={(e) => setBlockProp('align', e.target.value)}>
                        <option value="left">Venstre</option>
                        <option value="center">Midtstilt</option>
                        <option value="right">Høyre</option>
                      </select></label>
                    <label class="gridmenu-snap">
                      <input type="checkbox" checked={Boolean(selectedBlock.props.box)}
                        onchange={(e) => setBlockProp('box', e.target.checked)} />
                      Tekstboks (kort med bakgrunn)
                    </label>
                    <p class="panel-hint">Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>
                  {:else if selectedBlock.type === 'button'}
                    <label>Tekst
                      <input value={selectedBlock.props.label}
                        onchange={(e) => setBlockProp('label', e.target.value)} /></label>
                    <label>Går til
                      <select value={selectedBlock.props.page ?? '__href'}
                        onchange={(e) => {
                          const page = e.target.value === '__href' ? null : e.target.value;
                          mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
                            b.props.page = page;
                            if (page) b.props.href = null;
                          });
                        }}>
                        {#each siteDraft.pages as p (p.id)}
                          <option value={p.id}>{p.title}</option>
                        {/each}
                        <option value="__href">Ekstern lenke</option>
                      </select></label>
                    {#if !selectedBlock.props.page}
                      <input placeholder="https://…"
                        value={selectedBlock.props.href === '#' ? '' : selectedBlock.props.href ?? ''}
                        onchange={(e) => setBlockProp('href', e.target.value || null)} />
                    {/if}
                    <label>Stil
                      <select value={selectedBlock.props.style}
                        onchange={(e) => setBlockProp('style', e.target.value)}>
                        <option value="primary">Fylt (aksentfarge)</option>
                        <option value="secondary">Kantlinje</option>
                      </select></label>
                  {:else if selectedBlock.type === 'image'}
                    <label class="ghost filepick">
                      Bytt bilde
                      <input type="file" accept="image/*" onchange={replaceImage} />
                    </label>
                    <label>Alt-tekst
                      <input value={selectedBlock.props.alt ?? ''} placeholder="Beskriv bildet"
                        onchange={(e) => setBlockProp('alt', e.target.value)} /></label>
                    <label>Tilpasning
                      <select value={selectedBlock.props.fit ?? 'cover'}
                        onchange={(e) => setBlockProp('fit', e.target.value)}>
                        <option value="cover">Fyll rammen (beskjæres)</option>
                        <option value="contain">Vis hele bildet</option>
                      </select></label>
                    <label>Avrunding
                      <select value={selectedBlock.props.radius ?? ''}
                        onchange={(e) => setBlockProp('radius', e.target.value || null)}>
                        <option value="">Ingen</option>
                        <option value="sm">Liten</option>
                        <option value="md">Stor</option>
                      </select></label>
                    <label>Lenke
                      <input value={selectedBlock.props.href ?? ''} placeholder="Valgfri (gjør bildet klikkbart)"
                        onchange={(e) => setBlockProp('href', e.target.value || null)} /></label>
                  {:else if selectedBlock.type === 'shape'}
                    <label>Form
                      <select value={selectedBlock.props.kind}
                        onchange={(e) => setBlockProp('kind', e.target.value)}>
                        {#each SHAPE_KINDS as [value, name] (value)}
                          <option {value}>{name}</option>
                        {/each}
                      </select></label>
                    <label>Farge
                      <select value={selectedBlock.props.color}
                        onchange={(e) => setBlockProp('color', e.target.value)}>
                        {#each COLOR_TOKENS as [value, name] (value)}
                          <option {value}>{name}</option>
                        {/each}
                      </select></label>
                    <label>Tykkelse
                      <input type="number" min="1" max="40" value={selectedBlock.props.thickness}
                        onchange={(e) => setBlockProp('thickness', Number(e.target.value))} /></label>
                    <label class="gridmenu-snap" title="Fylte former bruker fargen som flate i stedet for kantlinje">
                      <input type="checkbox" checked={Boolean(selectedBlock.props.fill)}
                        onchange={(e) => setBlockProp('fill', e.target.checked ? selectedBlock.props.color : null)} />
                      Fylt
                    </label>
                  {/if}
                {:else if activeSectionId}
                  <p class="panel-strong">Seksjon</p>
                  <label>Minstehøyde
                    <input class="token-input" value={sectionMinHeight} placeholder="f.eks. 400px"
                      onchange={(e) => setSectionHeight(e.target.value)} /></label>
                  <p class="panel-hint">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p>
                  <hr class="gridmenu-divider" />
                  <label class="gridmenu-snap">
                    <input type="checkbox" checked={sectionGrid !== null}
                      onchange={(e) => toggleSectionGrid(e.target.checked)} />
                    Eget grid i seksjonen
                  </label>
                  {#if sectionGrid}
                    <label>
                      Rutestørrelse
                      <span class="gridmenu-value">{sectionGrid.size} px</span>
                    </label>
                    <input type="range" min="4" max="96" step="2" value={sectionGrid.size}
                      oninput={(e) => setSectionGrid('size', Number(e.target.value))} />
                  {/if}
                  <p class="panel-hint">Bakgrunn og animasjoner kommer i neste steg av v0.5.</p>
                {:else}
                  <p class="panel-hint">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>
                {/if}
              </div>
            {:else}
              <div class="panel-body">
                <p class="panel-hint">{activePanel}-panelet kommer i en senere del av v0.5.</p>
              </div>
            {/if}
          </aside>
        {/if}
      {/if}

      <div class="frame-wrap" class:mobile={viewMode === 'mobile'}>
        <iframe
          bind:this={iframeEl}
          title="Forhåndsvisning"
          src={`/?page=${pageId}&preview=1`}
          onload={onIframeLoad}
        ></iframe>
      </div>
    </div>
  {:else}
    <p class="loading">Laster…</p>
  {/if}

  {#if status}
    <div class="toast" class:ok={statusKind === 'ok'} class:error={statusKind === 'error'}>
      <span>{status}</span>
      <button class="toast-x" onclick={() => setStatus('')} title="Lukk">×</button>
    </div>
  {/if}
</div>

<style>
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
    font-size: 1.05rem;
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

  .rail button.active {
    opacity: 1;
    background: rgb(124 92 255 / 15%);
    border-color: var(--urd-color-accent, #7c5cff);
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

  /* Alle «rad-knappene» i panelet (blokker, grupper, filvelger) deler
     samme høyde og utlegg, så listen ser jevn ut */
  .panel-body .ghost,
  .group summary {
    display: flex;
    align-items: center;
    min-height: 2.4rem;
    padding: 0.35em 0.8em;
    box-sizing: border-box;
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

  .panel-body input[type='text'],
  .panel-body input:not([type]),
  .panel-body input[type='number'],
  .panel-body input[type='color'] {
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.3em 0.5em;
    min-width: 0;
  }

  .panel-body input[type='color'] {
    padding: 2px;
    width: 3rem;
    height: 1.8rem;
    cursor: pointer;
  }

  /* Sider- og nav-radene: tittel/etikett tar plassen, verktøyene er smale */
  .page-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .page-row.current {
    border-left: 2px solid var(--urd-color-accent, #7c5cff);
    padding-left: 0.4rem;
  }

  .nav-row {
    display: grid;
    /* Samme klemme som .panel-body: aldri bredere enn panelet */
    grid-template-columns: minmax(0, 1fr);
    gap: 0.3rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .nav-row select,
  .nav-row input {
    min-width: 0;
    max-width: 100%;
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
  }

  .row-tool {
    padding: 0.2em 0.5em;
    font-size: 0.8rem;
  }

  .token-input {
    width: 5rem;
    text-align: right;
  }

  .panel-strong {
    margin: 0;
    font-weight: 600;
  }

  /* Posisjon/størrelse-feltene i Egenskaper: to kolonner med smale felt */
  .frame-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
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

  .group-items {
    display: grid;
    gap: 0.4rem;
    margin-top: 0.4rem;
    padding-left: 0.8rem;
  }

  .panel-hint {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.65;
  }

  .gridmenu-snap {
    justify-content: flex-start;
  }

  .gridmenu-value {
    font-variant-numeric: tabular-nums;
    opacity: 0.75;
  }

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

  /* Nedtrekkslisten følger mørkt tema (nettleser-standarden er hvit) */
  select {
    color-scheme: dark;
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

  .frame-wrap {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  iframe {
    flex: 1;
    width: 100%;
    height: 100%;
    border: 0;
    background: #fff;
  }

  /* Mobilvisning: iframen smales til mobilbredde; motorens matchMedia
     bytter til mobil-rendering av seg selv */
  .frame-wrap.mobile {
    justify-content: center;
    background: #08090d;
    padding: 12px 0;
  }

  .frame-wrap.mobile iframe {
    flex: 0 0 390px;
    width: 390px;
    border-radius: 12px;
  }

  .viewswitch {
    display: flex;
    gap: 2px;
  }

  .viewswitch .active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: rgb(124 92 255 / 15%);
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
