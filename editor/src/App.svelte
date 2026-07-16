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

  let store = null;
  let bridge = null;

  const pageEntry = () => site.pages.find((p) => p.id === pageId);

  async function init() {
    site = await (await fetch('/content/site.json')).json();
    await selectPage(new URLSearchParams(location.search).get('page') ?? site.pages[0].id);
    await checkAuth();
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
    dirty = store.hasDraft();
    status = '';
    // Iframen bytter src via pageId; utkastet pushes i onIframeLoad.
  }

  function onIframeLoad() {
    bridge?.destroy();
    bridge = createPreviewBridge(iframeEl, {
      onEdit: handleEdit,
      onMove: handleMove,
      onDelete: handleDelete,
    });
    if (dirty) bridge.sendPage(pageId, store.data);
  }

  /** Klikk-og-skriv-endring fra iframen: oppdater utkastet. Iframen viser
   *  allerede endringen, så vi pusher ikke tilbake (det ville ødelagt fokus). */
  function handleEdit(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    const block = section?.blocks.find((b) => b.id === msg.blockId);
    if (!block) return;
    block.props = msg.props;
    store.save();
    dirty = store.hasDraft();
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
    dirty = store.hasDraft();
  }

  /** Sletting: fjern fra utkastet og rerender seksjonen i iframen. */
  function handleDelete(msg) {
    const section = store.data.sections.find((s) => s.id === msg.sectionId);
    if (!section) return;
    section.blocks = section.blocks.filter((b) => b.id !== msg.blockId);
    store.save();
    dirty = store.hasDraft();
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
    dirty = store.hasDraft();
    bridge?.sendSection(pageId, section);
  }

  function discard() {
    const fresh = store.reset();
    dirty = false;
    status = '';
    bridge?.sendPage(pageId, fresh);
  }

  async function publish() {
    status = 'Publiserer…';
    const entry = pageEntry();
    const body = {
      message: `Oppdater ${entry.title}`,
      files: [{
        path: entry.file,
        content: JSON.stringify(store.data, null, 2) + '\n',
        encoding: 'utf-8',
      }],
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
      localStorage.removeItem(`urd-draft-${pageId}`);
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
