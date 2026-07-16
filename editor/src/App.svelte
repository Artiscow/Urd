<script>
  // Editor-skallet for v0.2 «tynn skive»: preview-iframe med den ekte
  // siden, klikk-og-skriv på tekstblokker, utkast i localStorage og
  // publiseringsknapp mot /api/github/commit.
  import { createDraftStore } from './lib/draftStore.js';
  import { createPreviewBridge } from './lib/previewBridge.js';
  // Editoren deler migreringskoden med motoren (samme fil, bundles inn).
  import { liftPageFile } from '../../template/assets/engine/migrate.js';
  import { compressToWebp, slugify, contentHash, WARN_BYTES } from './lib/imageTools.js';

  let site = $state(null);
  let pageId = $state(null);
  let dirty = $state(false);
  let status = $state('');
  let iframeEl = $state(null);
  /** null = publiseringslag utilgjengelig (f.eks. enkel lokalserver uten functions) */
  let auth = $state(null);
  /** Speil av site-utkastets grid for inputfeltene */
  let grid = $state({ columns: 24, rowHeight: 8, snap: true });

  /** Ren forhåndsvisning: skjuler alle editeringshåndtak i iframen */
  let chromeVisible = $state(true);

  let store = null;
  let siteStore = null;
  let bridge = null;

  const pageEntry = () => site.pages.find((p) => p.id === pageId);

  function updateDirty() {
    dirty = store?.hasDraft() || siteStore?.hasDraft() || false;
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
    store.save();
    siteStore.save();
    grid = { snap: true, ...siteStore.data.grid };
    updateDirty();
    bridge?.sendSite(siteStore.data);
    bridge?.sendPage(pageId, store.data);
  }

  function undo() {
    if (!history.length) return;
    redoStack.push(snapshot());
    restore(history.pop());
    lastHistoryKey = null;
    status = 'Angret';
  }

  function redo() {
    if (!redoStack.length) return;
    history.push(snapshot());
    restore(redoStack.pop());
    lastHistoryKey = null;
    status = 'Gjentatt';
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
    site = await (await fetch('/content/site.json')).json();
    siteStore = createDraftStore('urd-draft-site', () => site);
    grid = { snap: true, ...siteStore.data.grid };
    await selectPage(new URLSearchParams(location.search).get('page') ?? site.pages[0].id);
    await checkAuth();
  }

  /** Om grid-menyen er åpen (gridet vises da i forhåndsvisningen). */
  let gridMenuOpen = $state(false);

  /** Grid-kontrollene: endringer lagres i site-utkastet og pushes live.
   *  Gridet er kun et snappeverktøy; å endre det flytter aldri innhold. */
  function setGrid(field, value) {
    pushHistory('grid');
    grid = { ...grid, [field]: value };
    siteStore.data.grid = { ...siteStore.data.grid, [field]: value };
    siteStore.save();
    updateDirty();
    bridge?.sendSite(siteStore.data);
    // sendSite rerendrer siden; slå grid-visningen på igjen etterpå
    // (postMessage er ordnet, så dette ankommer etter rerenderingen).
    if (gridMenuOpen) bridge?.sendShowGrid(true);
  }

  function onGridMenuToggle(event) {
    gridMenuOpen = event.target.open;
    bridge?.sendShowGrid(gridMenuOpen);
  }

  async function checkAuth() {
    try {
      const res = await fetch('/api/github/me');
      auth = res.ok ? await res.json() : null;
    } catch {
      auth = null;
    }
  }

  async function selectPage(id) {
    pageId = id;
    const entry = pageEntry();
    const raw = await (await fetch(`/${entry.file}`)).json();
    // Eldre sidefiler løftes til gjeldende format før redigering, slik at
    // utkast og publisering alltid er på nyeste schemaVersion.
    const published = liftPageFile(raw, siteStore.data);
    store = createDraftStore(`urd-draft-${id}`, () => published);
    history.length = 0;
    redoStack.length = 0;
    lastHistoryKey = null;
    updateDirty();
    status = '';
    // Iframen bytter src via pageId; utkastet pushes i onIframeLoad.
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
    });
    if (siteStore.hasDraft()) bridge.sendSite(siteStore.data);
    if (store.hasDraft()) bridge.sendPage(pageId, store.data);
    if (!chromeVisible) bridge.sendChrome(false);
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
    block.frames.desktop = msg.frame;
    store.save();
    updateDirty();
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
    store.save();
    updateDirty();
  }

  /** Sletting: fjern fra utkastet og rerender seksjonen i iframen. */
  function handleDelete(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    pushHistory('delete-block');
    section.blocks = section.blocks.filter((b) => b.id !== msg.blockId);
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** Blokkpaletten: ny blokk nederst i første seksjon, klar til å dras dit
   *  den skal. (Seksjonvalg og «+ Ny seksjon» kommer senere i v0.3.) */
  /** w i prosent av seksjonsbredden, h i px (fysiske enheter). */
  const BLOCK_DEFAULTS = {
    text: { type: 'text', props: { html: '<p>Ny tekst</p>', align: 'left' }, w: 33, h: 28 },
    button: { type: 'button', props: { label: 'Ny knapp', page: null, href: '#', style: 'primary' }, w: 20, h: 36 },
    'shape-line': { type: 'shape', props: { kind: 'line', color: 'accent', thickness: 2, fill: null }, w: 25, h: 8 },
    'shape-arrow': { type: 'shape', props: { kind: 'arrow', color: 'accent', thickness: 2, fill: null }, w: 25, h: 16 },
    'shape-circle': { type: 'shape', props: { kind: 'circle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
    'shape-rect': { type: 'shape', props: { kind: 'rect', color: 'accent', thickness: 2, fill: null }, w: 20, h: 110 },
    'shape-triangle': { type: 'shape', props: { kind: 'triangle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
  };

  function addBlock(kind, event) {
    pushHistory('add-block');
    const section = store.data.sections[0];
    const d = BLOCK_DEFAULTS[kind];
    const maxBottom = Math.max(0, ...section.blocks.map((b) => b.frames.desktop.y + b.frames.desktop.h));
    section.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: d.type,
      version: 1,
      props: structuredClone(d.props),
      animation: null,
      frames: { desktop: { x: 4, y: maxBottom + 8, w: d.w, h: d.h, z: 1, rot: 0 }, mobile: null },
    });
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    event?.target.closest('details')?.removeAttribute('open');
  }

  /** + Bilde: komprimer til webp og legg i utkastet som data-URL.
   *  Ved publisering materialiseres den til en fil i media/. */
  async function addImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    status = 'Komprimerer bildet…';
    let img;
    try {
      img = await compressToWebp(file);
    } catch {
      status = 'Kunne ikke lese bildet (prøv jpg/png/webp).';
      return;
    }

    pushHistory('add-block');
    const section = store.data.sections[0];
    const maxBottom = Math.max(0, ...section.blocks.map((b) => b.frames.desktop.y + b.frames.desktop.h));
    // Startbredde 30 % av seksjonen; høyden følger bildets sideforhold
    // med en antatt seksjonsbredde (justeres uansett fritt etterpå).
    const height = Math.round((img.height / img.width) * 0.3 * (iframeEl?.clientWidth ?? 1280));
    section.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type: 'image',
      version: 1,
      props: { src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), fit: 'cover', radius: 'md', href: null },
      animation: null,
      frames: { desktop: { x: 4, y: maxBottom + 8, w: 30, h: Math.max(40, height), z: 1, rot: 0 }, mobile: null },
    });
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
    status = img.bytes > WARN_BYTES
      ? `Bildet er stort (${Math.round(img.bytes / 1024)} kB) - vurder et mindre utsnitt.`
      : '';
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
    const freshSite = siteStore.reset();
    grid = { snap: true, ...freshSite.grid };
    updateDirty();
    status = '';
    bridge?.sendSite(freshSite);
    bridge?.sendPage(pageId, freshPage);
  }

  async function publish() {
    status = 'Publiserer…';
    const entry = pageEntry();
    const files = [];
    if (store.hasDraft()) {
      // Upubliserte bilder blir egne filer i media/ i samme commit.
      files.push(...materializeImages(store.data));
      store.save();
      files.push({ path: entry.file, content: JSON.stringify(store.data, null, 2) + '\n', encoding: 'utf-8' });
    }
    if (siteStore.hasDraft()) {
      files.push({ path: 'content/site.json', content: JSON.stringify(siteStore.data, null, 2) + '\n', encoding: 'utf-8' });
    }
    const body = { message: `Oppdater ${entry.title} via Urd-admin`, files };
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
      localStorage.removeItem(`urd-draft-${pageId}`);
      localStorage.removeItem('urd-draft-site');
      status = 'Publisert! Hosten bygger siden på nytt (typisk under ett minutt).';
      dirty = false;
    } else if (res?.status === 401) {
      status = 'Du må logge inn med GitHub for å publisere.';
      await checkAuth();
    } else if (res?.status === 403) {
      status = (await res.json().catch(() => null))?.error ?? 'Du har ikke publiseringstilgang.';
    } else if (res) {
      status = (await res.json().catch(() => null))?.error
        ?? 'Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).';
    } else {
      status = 'Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).';
    }
  }

  init();
</script>

<svelte:window onkeydown={onKeydown} />

<div class="editor">
  {#if !chromeVisible}
    <!-- Ren visning: topplinjen er skjult så siden får full høyde -->
    <button class="chrome-restore" onclick={toggleChrome} title="Tilbake til redigering">✏ Rediger</button>
  {/if}
  <header class="topbar" class:hidden={!chromeVisible}>
    <strong class="brand">Urd</strong>

    {#if site}
      <select value={pageId} onchange={(e) => selectPage(e.target.value)}>
        {#each site.pages as p}
          <option value={p.id}>{p.title}</option>
        {/each}
      </select>
    {/if}

    {#if site}
      <span class="palette">
        <button class="ghost" onclick={() => addBlock('text')} title="Ny tekstblokk">+ Tekst</button>
        <button class="ghost" onclick={() => addBlock('button')} title="Ny knapp">+ Knapp</button>
        <label class="ghost filepick" title="Nytt bilde (komprimeres automatisk til webp)">
          + Bilde
          <input type="file" accept="image/*" onchange={addImage} />
        </label>
        <details class="gridmenu">
          <summary title="Ny form">+ Form</summary>
          <div class="gridmenu-body formmenu">
            <button class="ghost" onclick={(e) => addBlock('shape-line', e)}>─ Strek</button>
            <button class="ghost" onclick={(e) => addBlock('shape-arrow', e)}>→ Pil</button>
            <button class="ghost" onclick={(e) => addBlock('shape-circle', e)}>○ Sirkel</button>
            <button class="ghost" onclick={(e) => addBlock('shape-rect', e)}>▭ Rektangel</button>
            <button class="ghost" onclick={(e) => addBlock('shape-triangle', e)}>△ Trekant</button>
          </div>
        </details>
      </span>

      <details class="gridmenu" ontoggle={onGridMenuToggle}>
        <summary title="Grid-innstillinger (hjelpelinjer for plassering)">⌗ Grid</summary>
        <div class="gridmenu-body">
          <label>
            Kolonner (bredden)
            <input type="number" min="4" max="100" value={grid.columns}
              onchange={(e) => setGrid('columns', Math.max(4, Math.min(100, Number(e.target.value) || 24)))} />
          </label>
          <label>
            Radhøyde i px (høyden)
            <input type="number" min="2" max="64" value={grid.rowHeight}
              onchange={(e) => setGrid('rowHeight', Math.max(2, Math.min(64, Number(e.target.value) || 8)))} />
          </label>
          <label class="gridmenu-snap">
            <input type="checkbox" checked={grid.snap !== false}
              onchange={(e) => setGrid('snap', e.target.checked)} />
            Snap til grid
          </label>
          <p class="gridmenu-hint">
            Gridet er kun hjelpelinjer: det styrer hva blokker snapper til når du
            drar, og å endre det flytter ALDRI noe som allerede står på siden.
            Bredden deles i kolonner (flere = finere sideveis), høyden går i rader
            på et fast antall piksler (lavere = finere opp/ned). Én rute er nå ca.
            {Math.round((iframeEl?.clientWidth ?? 1280) / grid.columns)} × {grid.rowHeight} px.
          </p>
        </div>
      </details>
    {/if}

    {#if dirty}
      <span class="badge">Upubliserte endringer</span>
    {/if}

    <span class="status">{status}</span>

    <span class="spacer"></span>

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
  </header>

  {#if site}
    <iframe
      bind:this={iframeEl}
      title="Forhåndsvisning"
      src={`/?page=${pageId}&preview=1`}
      onload={onIframeLoad}
    ></iframe>
  {:else}
    <p class="loading">Laster…</p>
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
    top: 10px;
    right: 10px;
    z-index: 200;
    font: inherit;
    color: #fff;
    background: var(--urd-color-accent, #7c5cff);
    border: 0;
    border-radius: 999px;
    padding: 0.4em 1em;
    cursor: pointer;
    opacity: 0.85;
  }

  .chrome-restore:hover {
    opacity: 1;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    background: var(--urd-color-surface, #151a23);
    border-bottom: 1px solid rgb(255 255 255 / 8%);
    font-size: 0.9rem;
  }

  .brand {
    font-size: 1.05rem;
  }

  .spacer {
    flex: 1;
  }

  .badge {
    background: var(--urd-color-accent, #7c5cff);
    color: #fff;
    border-radius: 999px;
    padding: 0.15em 0.7em;
    font-size: 0.78rem;
  }

  .status {
    opacity: 0.8;
    font-size: 0.82rem;
  }

  .who {
    opacity: 0.7;
    font-size: 0.82rem;
  }

  .palette {
    display: flex;
    gap: 0.35rem;
  }

  .gridmenu {
    position: relative;
  }

  .gridmenu summary {
    list-style: none;
    cursor: pointer;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.35em 0.8em;
    user-select: none;
  }

  .gridmenu[open] summary {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .gridmenu-body {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 50;
    display: grid;
    gap: 0.6rem;
    width: 15rem;
    padding: 0.8rem;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgb(0 0 0 / 40%);
  }

  .gridmenu-body label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    font-size: 0.85rem;
  }

  .gridmenu-body input[type='number'] {
    width: 4.5rem;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.25em 0.4em;
  }

  .gridmenu-snap {
    justify-content: flex-start;
  }

  .gridmenu-hint {
    margin: 0;
    font-size: 0.75rem;
    opacity: 0.65;
  }

  .formmenu {
    width: auto;
    min-width: 8rem;
  }

  .filepick {
    cursor: pointer;
  }

  .filepick input {
    display: none;
  }

  .formmenu button {
    text-align: left;
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

  button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .primary {
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
    color: #fff;
  }

  iframe {
    flex: 1;
    width: 100%;
    border: 0;
    background: #fff;
  }

  .loading {
    padding: 2rem;
    text-align: center;
  }
</style>
