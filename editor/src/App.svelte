<script>
  // Editor-skallet for v0.2 «tynn skive»: preview-iframe med den ekte
  // siden, klikk-og-skriv på tekstblokker, utkast i localStorage og
  // publiseringsknapp mot /api/github/commit.
  import { createDraftStore } from './lib/draftStore.js';
  import { createPreviewBridge } from './lib/previewBridge.js';

  let site = $state(null);
  let pageId = $state(null);
  let dirty = $state(false);
  let status = $state('');
  let iframeEl = $state(null);
  /** null = publiseringslag utilgjengelig (f.eks. enkel lokalserver uten functions) */
  let auth = $state(null);
  /** Speil av site-utkastets grid for inputfeltene */
  let grid = $state({ columns: 24, rowHeight: 8, snap: true });

  let store = null;
  let siteStore = null;
  let bridge = null;

  const pageEntry = () => site.pages.find((p) => p.id === pageId);

  function updateDirty() {
    dirty = store?.hasDraft() || siteStore?.hasDraft() || false;
  }

  async function init() {
    site = await (await fetch('/content/site.json')).json();
    siteStore = createDraftStore('urd-draft-site', () => site);
    grid = { snap: true, ...siteStore.data.grid };
    await selectPage(new URLSearchParams(location.search).get('page') ?? site.pages[0].id);
    await checkAuth();
  }

  /** Grid-kontrollene: endringer lagres i site-utkastet og pushes live. */
  function setGrid(field, value) {
    grid = { ...grid, [field]: value };
    siteStore.data.grid = { ...siteStore.data.grid, [field]: value };
    siteStore.save();
    updateDirty();
    bridge?.sendSite(siteStore.data);
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
    const published = await (await fetch(`/${entry.file}`)).json();
    store = createDraftStore(`urd-draft-${id}`, () => published);
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
    });
    if (siteStore.hasDraft()) bridge.sendSite(siteStore.data);
    if (store.hasDraft()) bridge.sendPage(pageId, store.data);
  }

  /** Klikk-og-skriv-endring fra iframen: oppdater utkastet. Iframen viser
   *  allerede endringen, så vi pusher ikke tilbake (det ville ødelagt fokus). */
  function handleEdit(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
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
    block.frames.desktop = msg.frame;
    store.save();
    updateDirty();
  }

  /** Ny seksjon fra «+ Ny seksjon» i iframen (seksjonen er allerede
   *  bygget av presetens create() der inne). */
  function handleAddSection(msg) {
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
    [s[i], s[j]] = [s[j], s[i]];
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
  }

  function handleDeleteSection(msg) {
    store.data.sections = store.data.sections.filter((x) => x.id !== msg.sectionId);
    store.save();
    updateDirty();
    bridge?.sendPage(pageId, store.data);
  }

  /** Sletting: fjern fra utkastet og rerender seksjonen i iframen. */
  function handleDelete(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    section.blocks = section.blocks.filter((b) => b.id !== msg.blockId);
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  /** Blokkpaletten: ny blokk nederst i første seksjon, klar til å dras dit
   *  den skal. (Seksjonvalg og «+ Ny seksjon» kommer senere i v0.3.) */
  const BLOCK_DEFAULTS = {
    text: { props: { html: '<p>Ny tekst</p>', align: 'left' }, w: 8, h: 3 },
    button: { props: { label: 'Ny knapp', page: null, href: '#', style: 'primary' }, w: 5, h: 2 },
    shape: { props: { kind: 'line', color: 'accent', thickness: 2, fill: null }, w: 6, h: 1 },
  };

  function addBlock(type) {
    const section = store.data.sections[0];
    const d = BLOCK_DEFAULTS[type];
    const maxRow = Math.max(0, ...section.blocks.map((b) => b.frames.desktop.y + b.frames.desktop.h));
    section.blocks.push({
      id: `blk-${crypto.randomUUID().slice(0, 8)}`,
      type,
      version: 1,
      props: structuredClone(d.props),
      animation: null,
      frames: { desktop: { x: 1, y: maxRow + 1, w: d.w, h: d.h, z: 1, rot: 0 }, mobile: null },
    });
    store.save();
    updateDirty();
    bridge?.sendSection(pageId, section);
  }

  function discard() {
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

<div class="editor">
  <header class="topbar">
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
        <button class="ghost" onclick={() => addBlock('shape')} title="Ny strek/form">+ Form</button>
      </span>

      <details class="gridmenu">
        <summary title="Grid-innstillinger (gjelder hele nettstedet, publiseres med site.json)">⌗ Grid</summary>
        <div class="gridmenu-body">
          <label>
            Kolonner
            <input type="number" min="4" max="100" value={grid.columns}
              onchange={(e) => setGrid('columns', Math.max(4, Math.min(100, Number(e.target.value) || 24)))} />
          </label>
          <label>
            Radhøyde (px)
            <input type="number" min="2" max="64" value={grid.rowHeight}
              onchange={(e) => setGrid('rowHeight', Math.max(2, Math.min(64, Number(e.target.value) || 8)))} />
          </label>
          <label class="gridmenu-snap">
            <input type="checkbox" checked={grid.snap !== false}
              onchange={(e) => setGrid('snap', e.target.checked)} />
            Snap til grid
          </label>
          <p class="gridmenu-hint">Gridet vises mens du drar. Flere kolonner og lavere radhøyde gir finere plassering.</p>
        </div>
      </details>
    {/if}

    {#if dirty}
      <span class="badge">Upubliserte endringer</span>
    {/if}

    <span class="status">{status}</span>

    <span class="spacer"></span>

    {#if site}
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
