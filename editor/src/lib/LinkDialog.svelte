<script>
  /* The link editor (0.7.27.4): one editor for every link the editor stores, opened through state/link.svelte.js.
     The kind of link is a choice of five, Page, Web address, Email, Phone and File, or pages alone for a host that takes nothing else.
     File lists the files in media/ the site's content uses (siteFiles), and takes a PDF from the computer, held in the draft until it is published (file-links.js); a host whose link cannot hold one (words in a text) is offered the listed files only.
     A page is found by searching the register, and a spot on it can then be chosen: the top, each section by its number and first words, and each named block (pageSpots in anchor-model.js); another page's spots are read from its draft or its published file.
     A link to a page, the web or a file can open in a new tab, a link to the web can carry the rel words, and a link to a file can be saved rather than opened; a host that keeps one address gets none of these, and a host that takes pages only gets no new tab.
     A spot on the host's own page (`here`) is written without the page (writeLink), so a copy of the host follows the spot's copy.
     Two forms, chosen in the admin settings (linkEditorPref): a native modal dialog (ADR-0011: Escape, Cancel and a press on the backdrop close it, and focus goes back to the field that opened it) with the pages and the spots side by side and the actions in its header; or, for a request that names the field it came from, a small non-modal dialog placed beside that field, with one search over pages and spots and the chosen page's spots unfolding under the results, closed by a click outside, Escape, or the focus leaving for the preview. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { matchWords } from '$engine/palette-search.js';
  import { pageSpots } from '$engine/anchor-model.js';
  import { LINK_RELS } from '$engine/nav-model.js';
  import Choice from './Choice.svelte';
  import { PDF_MAX_BYTES, PDF_WARN_BYTES } from '$engine/imageTools.js';
  import { LINK_KINDS, readLink, writeLink, linkReady, webHref, hasLink } from './link-edit.js';
  import { siteFiles, heldPdf, heldName, fileLabel } from './file-links.js';
  const ed = getContext('urd-editor');
  /** request: the value to start from, `shape`, `pagesOnly`, `here`, `anchor` (the field, for the editor beside it) and `apply` (state/link.svelte.js); onclose: leaves. */
  let { request, onclose } = $props();

  // The editor is drawn anew for every request (App.svelte keys it), so the request is read once.
  // svelte-ignore state_referenced_locally
  const shape = request.shape ?? 'link';
  // svelte-ignore state_referenced_locally
  const here = request.here ?? null;
  // svelte-ignore state_referenced_locally
  const offerNewTab = shape === 'link' && !request.pagesOnly;
  // svelte-ignore state_referenced_locally
  const offerUpload = request.upload !== false;
  // svelte-ignore state_referenced_locally
  const removable = request.removable !== false && hasLink(request.value);
  // Beside the field only when the setting says so and the request came from a field; the text toolbar and the block menu have no field to stand beside.
  // svelte-ignore state_referenced_locally
  const anchor = request.anchor instanceof HTMLElement ? request.anchor : null;
  const beside = ed.linkEditorPref === 'popover' && !!anchor;
  const pages = $derived(ed.siteDraft?.pages ?? []);
  // svelte-ignore state_referenced_locally
  let link = $state(readLink(request.value, { pages: ed.siteDraft?.pages ?? [], here }));
  // svelte-ignore state_referenced_locally
  if (request.pagesOnly) link.kind = 'page';
  let query = $state('');
  /** The chosen page's spots, null while they are read. */
  let spots = $state(null);
  /** Every page's spots for the search beside the field, by page id; null while they are read. */
  let allSpots = $state(null);
  let fileQuery = $state('');
  /** The files the site's content uses, null while the pages are read. */
  let files = $state(null);
  /** What the editor says about the PDF just taken: a refusal, or a warning that it is large. */
  let fileNote = $state(null);
  let dialogEl = $state(null);
  let downOnBackdrop = false;
  const uid = Math.random().toString(36).slice(2, 8);
  /** Where the editor stands beside its field. */
  let pos = $state({ top: 0, left: 0 });
  const POP_WIDTH = 320;
  const POP_HEIGHT = 440;

  const KIND_KEYS = { page: 'link.kind.page', web: 'link.kind.web', email: 'link.kind.email', phone: 'link.kind.phone', file: 'link.kind.file' };
  const REL_KEYS = { nofollow: ['link.nofollow', 'tip.link.nofollow'], sponsored: ['link.sponsored', 'tip.link.sponsored'] };
  const shownPages = $derived(pages.filter((p) => matchWords(`${p.title} ${p.path}`, query)));
  const leavesForWeb = $derived(link.kind === 'web' && /^https?:\/\//i.test(webHref(link.url)));
  const shownFiles = $derived((files ?? []).filter((path) => matchWords(fileLabel(path), fileQuery)));
  const chosenPage = $derived(pages.find((p) => p.id === link.page) ?? null);

  /** The words a spot is listed by: a section's number and first words, a block's words or its name. */
  const spotText = (spot) => (spot.kind === 'section'
    ? `${ta('link.section', { n: spot.n })}${spot.words ? ` · ${spot.words}` : ''}`
    : spot.words || spot.name);

  /** The rows the search beside the field offers: the pages that match, then, for a typed search, the spots on any page that match, at most eight in all. */
  const found = $derived.by(() => {
    const rows = shownPages.map((p) => ({ key: `p:${p.id}`, page: p, spot: null }));
    if (query.trim() && allSpots) {
      for (const p of pages) {
        for (const spot of allSpots[p.id] ?? []) {
          if (matchWords(`${p.title} ${spotText(spot)} ${spot.name ? `#${spot.name}` : ''}`, query)) rows.push({ key: `s:${p.id}:${spot.id}`, page: p, spot });
        }
      }
    }
    return rows.slice(0, 8);
  });

  $effect(() => {
    if (!dialogEl || dialogEl.open) return;
    if (beside) {
      place();
      dialogEl.show();
    } else {
      dialogEl.showModal();
    }
    // The first field rather than a button: the search, or the address.
    dialogEl.querySelector('.ld-body input')?.focus();
  });

  /** Places the editor under its field, or above it when the field stands low, inside the window's edges. */
  function place() {
    const r = anchor.getBoundingClientRect();
    const below = r.bottom + POP_HEIGHT + 8 <= window.innerHeight;
    pos = {
      top: below ? r.bottom + 4 : Math.max(8, r.top - POP_HEIGHT - 4),
      left: Math.max(8, Math.min(r.left, window.innerWidth - POP_WIDTH - 8)),
    };
  }

  // Beside the field the dialog is not modal, so the ways out are its own: a press outside, Escape, the focus leaving for the preview; a scroll elsewhere moves it along with its field.
  $effect(() => {
    if (!beside || !dialogEl) return;
    const onDown = (e) => {
      if (!dialogEl.contains(e.target)) leave();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        leave();
      }
    };
    const onBlur = () => leave();
    const onScroll = (e) => {
      if (e.target instanceof Node && !dialogEl.contains(e.target)) place();
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('blur', onBlur);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('scroll', onScroll, true);
    };
  });

  /** Closes through the dialog itself, so the browser gives focus back to the field that opened a modal one; beside the field the focus is handed back by hand. */
  function leave() {
    if (dialogEl?.open) dialogEl.close();
    else onclose();
    if (beside) anchor.focus();
  }

  // The chosen page's spots: the page being edited from the editor's own data, another page from its draft or published file.
  $effect(() => {
    const id = link.page;
    spots = null;
    if (!id) return;
    let live = true;
    const entry = pages.find((p) => p.id === id);
    const read = id === ed.pageId ? Promise.resolve($state.snapshot(ed.store?.data)) : entry ? ed.readPageDraft(entry) : Promise.resolve(null);
    read.then((page) => {
      if (!live) return;
      spots = pageSpots(page);
      // A spot written by its name (a typed /kaker#priser) is matched to the spot's id, which is what a link stores.
      const named = spots.find((spot) => spot.name && spot.name === link.target);
      if (named) link.target = named.id;
    }).catch(() => {
      if (live) spots = [];
    });
    return () => {
      live = false;
    };
  });

  // Beside the field one search covers every page's spots, so they are all read once.
  $effect(() => {
    if (!beside || allSpots !== null) return;
    let live = true;
    const reads = pages.map((entry) => (entry.id === ed.pageId ? Promise.resolve($state.snapshot(ed.store?.data)) : ed.readPageDraft(entry).catch(() => null)));
    Promise.all(reads).then((read) => {
      if (!live) return;
      allSpots = Object.fromEntries(pages.map((entry, i) => [entry.id, read[i] ? pageSpots(read[i]) : []]));
    });
    return () => {
      live = false;
    };
  });

  // The site's files, read once the File kind is chosen: from the site, the page being edited, and every other page's draft or published file.
  $effect(() => {
    if (link.kind !== 'file' || files !== null) return;
    let live = true;
    const others = pages.filter((p) => p.id !== ed.pageId).map((entry) => ed.readPageDraft(entry).catch(() => null));
    Promise.all(others).then((read) => {
      if (live) files = siteFiles($state.snapshot(ed.siteDraft), $state.snapshot(ed.store?.data), read);
    });
    return () => {
      live = false;
    };
  });

  /** A PDF from the computer: read into the draft with its name, refused when it is too large or not a PDF, with the reason said in the editor (a toast lies under the modal). */
  function takePdf(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    fileNote = null;
    if (!file) return;
    const mb = (bytes) => (bytes / 1_000_000).toFixed(1);
    if (file.size > PDF_MAX_BYTES) {
      fileNote = { error: true, text: ta('status.pdfTooLarge', { name: file.name, mb: mb(file.size), max: mb(PDF_MAX_BYTES) }) };
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const held = heldPdf(String(reader.result ?? ''), file.name);
      // The publishing guard takes a file in media/ named .pdf only when it starts as a PDF does (%PDF-).
      if (!held.split(',', 2)[1]?.startsWith('JVBERi0')) {
        fileNote = { error: true, text: ta('status.notPdf', { name: file.name }) };
        return;
      }
      link.file = held;
      if (file.size > PDF_WARN_BYTES) fileNote = { error: false, text: ta('status.pdfLarge', { name: file.name, mb: mb(file.size) }) };
    };
    reader.onerror = () => {
      fileNote = { error: true, text: ta('status.fileReadError', { name: file.name }) };
    };
    reader.readAsDataURL(file);
  }

  function choosePage(id) {
    if (id !== link.page) link.target = '';
    link.page = id;
  }

  /** A row of the search beside the field: a page, or a spot on one. */
  function chooseFound(row) {
    link.page = row.page.id;
    link.target = row.spot ? row.spot.id : '';
  }

  function toggleRel(word, on) {
    link.rel = LINK_RELS.filter((w) => (w === word ? on : link.rel.includes(w)));
  }

  function use() {
    if (!linkReady(link)) return;
    request.apply(writeLink($state.snapshot(link), { shape, pages: $state.snapshot(pages), here }));
    leave();
  }

  function remove() {
    request.apply(null);
    leave();
  }
</script>

{#snippet newTab()}
  <!-- An email or phone link opens the visitor's own app, so the choice stands greyed there, with the reason as its tooltip -->
  {#if offerNewTab}
    {@const noTab = !['page', 'web', 'file'].includes(link.kind)}
    <label class="ld-check" class:ld-off={noTab} title={noTab ? ta('tip.link.newTabNone') : ta('tip.link.newTab')}>
      <input type="checkbox" bind:checked={link.newTab} disabled={noTab} />
      {ta('link.newTab')}
    </label>
  {/if}
{/snippet}

{#snippet spotList()}
  <div class="ld-list" role="group" aria-label={ta('link.spot')}>
    <button type="button" class="ld-row" class:on={!link.target} aria-pressed={!link.target} onclick={() => (link.target = '')}>
      <span class="ld-text">{ta('link.spotTop')}</span>
    </button>
    {#if spots === null}
      <p class="ld-none">{ta('link.spotsLoading')}</p>
    {:else}
      {#each spots as spot (spot.id)}
        <button type="button" class="ld-row" class:ld-sub={spot.kind === 'block'} class:on={link.target === spot.id} aria-pressed={link.target === spot.id}
          onclick={() => (link.target = spot.id)}>
          <span class="ld-text">{spotText(spot)}</span>{#if spot.name}<span class="ld-aside">#{spot.name}</span>{/if}
        </button>
      {/each}
    {/if}
  </div>
{/snippet}

{#snippet otherKinds()}
  {#if link.kind === 'web'}
    <label class="field-stack" title={ta('tip.link.web')}>{ta('link.url')}
      <input bind:value={link.url} placeholder="https://" spellcheck="false" autocomplete="off" /></label>
  {:else if link.kind === 'email'}
    <label title={ta('tip.link.email')} class="field-stack">{ta('link.email')}
      <input type="email" bind:value={link.email} spellcheck="false" autocomplete="off" /></label>
    <label class="field-stack" title={ta('tip.link.subject')}>{ta('link.subject')}
      <input bind:value={link.subject} /></label>
  {:else if link.kind === 'phone'}
    <label title={ta('tip.link.phone')} class="field-stack">{ta('link.phone')}
      <input type="tel" bind:value={link.phone} spellcheck="false" autocomplete="off" /></label>
  {:else if link.kind === 'file'}
    <input class="ld-search" type="search" bind:value={fileQuery} placeholder={ta('link.searchFiles')} aria-label={ta('link.searchFiles')} />
    <div class="ld-list" role="group" aria-label={ta('link.kind.file')}>
      <!-- A PDF taken from the computer stands first until it is published -->
      {#if heldName(link.file)}
        <button type="button" class="ld-row on" aria-pressed="true">
          <span class="ld-text">{fileLabel(link.file)}</span><span class="ld-aside">{ta('link.fileHeld')}</span>
        </button>
      {/if}
      {#each shownFiles as path (path)}
        <button type="button" class="ld-row" class:on={link.file === path} aria-pressed={link.file === path} onclick={() => (link.file = path)}>
          <span class="ld-text">{fileLabel(path)}</span>
        </button>
      {:else}
        {#if !heldName(link.file)}
          <p class="ld-none">{files === null ? ta('link.filesLoading') : ta('link.noFiles')}</p>
        {/if}
      {/each}
    </div>
    {#if offerUpload}
      <label class="ghost filepick" title={ta('tip.link.upload')}>
        {ta('link.upload')}
        <input type="file" accept="application/pdf,.pdf" onchange={takePdf} />
      </label>
      {#if fileNote}
        <p class="ld-note" class:place-error={fileNote.error} role={fileNote.error ? 'alert' : 'status'}>{fileNote.text}</p>
      {/if}
    {/if}
    {#if shape === 'link'}
      <label class="ld-check" title={ta('tip.link.download')}>
        <input type="checkbox" bind:checked={link.download} />
        {ta('link.download')}
      </label>
    {/if}
  {/if}
  <!-- The rel words only for a link to the web: a search engine reads them there and nowhere else -->
  {#if shape === 'link' && leavesForWeb}
    {#each LINK_RELS as word (word)}
      <label class="ld-check" title={ta(REL_KEYS[word][1])}>
        <input type="checkbox" checked={link.rel.includes(word)} onchange={(e) => toggleRel(word, e.target.checked)} />
        {ta(REL_KEYS[word][0])}
      </label>
    {/each}
  {/if}
{/snippet}

{#if beside}
  <!-- Beside the field: not modal, placed by measuring, closed by the ways the effect above wires -->
  <dialog class="ld-pop" bind:this={dialogEl} aria-label={ta('link.title')} style="top: {pos.top}px; left: {pos.left}px; width: {POP_WIDTH}px" onclose={() => onclose()}>
    <form class="ld-card ld-card-pop" onsubmit={(e) => { e.preventDefault(); use(); }}>
      {#if !request.pagesOnly}
        <Choice label={ta('lbl.goesTo')} title={ta('tip.link.field')} value={link.kind} options={LINK_KINDS.map((kind) => [kind, ta(KIND_KEYS[kind])])} onchange={(v) => (link.kind = v)} />
      {/if}
      <div class="ld-body panel-body">
        {#if link.kind === 'page'}
          <input class="ld-search" type="search" bind:value={query} placeholder={ta('link.searchAll')} aria-label={ta('link.searchAll')} />
          <div class="ld-list" role="group" aria-label={ta('link.kind.page')}>
            {#each found as row (row.key)}
              <button type="button" class="ld-row" class:on={row.page.id === link.page && (row.spot ? link.target === row.spot.id : !link.target)}
                aria-pressed={row.page.id === link.page && (row.spot ? link.target === row.spot.id : !link.target)} onclick={() => chooseFound(row)}>
                <span class="ld-text">{row.page.title}{#if row.spot}<span class="ld-dim">›</span>{spotText(row.spot)}{/if}</span>
                <span class="ld-aside">{row.page.path}{#if row.spot?.name}#{row.spot.name}{/if}</span>
              </button>
            {:else}
              <p class="ld-none">{ta('link.noPages')}</p>
            {/each}
          </div>
          <!-- The chosen page's spots unfold under the results -->
          {#if chosenPage}
            <p class="ld-label">{ta('link.onPage', { page: chosenPage.title })}</p>
            {@render spotList()}
          {/if}
        {:else}
          {@render otherKinds()}
        {/if}
      </div>
      <div class="ld-actions">
        {@render newTab()}
        {#if removable}
          <button type="button" class="ghost ld-small" onclick={remove}>{ta('link.remove')}</button>
        {/if}
        <span class="ld-gap"></span>
        <button type="button" class="ghost ld-small" onclick={leave}>{ta('confirm.cancel')}</button>
        <button type="submit" class="primary ld-small" disabled={!linkReady(link)}>{ta('link.useShort')}</button>
      </div>
    </form>
  </dialog>
{:else}
  <!-- A press that starts and ends on the backdrop cancels; Escape is the keyboard's way, and the Cancel button the focusable one -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <dialog class="ld-overlay" bind:this={dialogEl} aria-labelledby="ld-title" onclose={() => onclose()}
    onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
    onclick={(e) => downOnBackdrop && e.target === e.currentTarget && leave()}>
    <form class="ld-card" class:ld-railed={!request.pagesOnly} onsubmit={(e) => { e.preventDefault(); use(); }}>
      <!-- The kinds as a radio list on the left: one choice in sight, the picked row running into the fields it opens -->
      {#if !request.pagesOnly}
        <div class="ld-rail" role="radiogroup" aria-label={ta('lbl.goesTo')}>
          <span class="ld-rail-head">{ta('lbl.goesTo')}</span>
          {#each LINK_KINDS as kind (kind)}
            <label title={ta(`tip.link.kind.${kind}`)} class="ld-kind" class:on={link.kind === kind}>
              <input type="radio" name="ld-kind-{uid}" value={kind} checked={link.kind === kind} onchange={() => (link.kind = kind)} />
              {ta(KIND_KEYS[kind])}
            </label>
          {/each}
        </div>
      {/if}
      <div class="ld-main">
      <!-- The header carries the new tab choice and the actions, so the box ends where its fields end -->
      <div class="ld-head">
        <h2 id="ld-title">{ta('link.title')}</h2>
        <span class="ld-gap"></span>
        {@render newTab()}
        {#if removable}
          <button type="button" class="ghost ld-small" onclick={remove}>{ta('link.remove')}</button>
        {/if}
        <button type="button" class="ghost ld-small" onclick={leave}>{ta('confirm.cancel')}</button>
        <button type="submit" class="primary ld-small" disabled={!linkReady(link)}>{ta('link.use')}</button>
      </div>
      <div class="ld-body panel-body">
        {#if link.kind === 'page'}
          <!-- The pages on the left, the chosen page's spots on the right -->
          <div class="ld-cols">
            <div class="ld-col">
              <input class="ld-search" type="search" bind:value={query} placeholder={ta('link.searchPages')} aria-label={ta('link.searchPages')} />
              <div class="ld-list ld-tall" role="group" aria-label={ta('link.kind.page')}>
                {#each shownPages as page (page.id)}
                  <button type="button" class="ld-row" class:on={page.id === link.page} aria-pressed={page.id === link.page} onclick={() => choosePage(page.id)}>
                    <span class="ld-text">{page.title}</span><span class="ld-aside">{page.path}</span>
                  </button>
                {:else}
                  <p class="ld-none">{ta('link.noPages')}</p>
                {/each}
              </div>
            </div>
            <div class="ld-col">
              {#if chosenPage}
                <p class="ld-label" title={ta('tip.link.spot')}>{ta('link.spotOn', { page: chosenPage.title })}</p>
                <div class="ld-list ld-tall" role="group" aria-label={ta('link.spot')}>
                  <button type="button" class="ld-row" class:on={!link.target} aria-pressed={!link.target} onclick={() => (link.target = '')}>
                    <span class="ld-text">{ta('link.spotTop')}</span>
                  </button>
                  {#if spots === null}
                    <p class="ld-none">{ta('link.spotsLoading')}</p>
                  {:else}
                    {#each spots as spot (spot.id)}
                      <button type="button" class="ld-row" class:ld-sub={spot.kind === 'block'} class:on={link.target === spot.id} aria-pressed={link.target === spot.id}
                        onclick={() => (link.target = spot.id)}>
                        <span class="ld-text">{spotText(spot)}</span>{#if spot.name}<span class="ld-aside">#{spot.name}</span>{/if}
                      </button>
                    {/each}
                  {/if}
                </div>
              {:else}
                <p class="ld-label" title={ta('tip.link.spot')}>{ta('link.spot')}</p>
                <p class="ld-none">{ta('link.choosePage')}</p>
              {/if}
            </div>
          </div>
        {:else}
          {@render otherKinds()}
        {/if}
      </div>
      </div>
    </form>
  </dialog>
{/if}

<style>
  .ld-overlay {
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    width: 100vw;
    max-width: none;
    height: 100vh;
    max-height: none;
    margin: 0;
    padding: 1rem;
    color: var(--urd-color-text, #e8eaf0);
    background: transparent;
    border: 0;
  }

  .ld-overlay[open] {
    display: grid;
    place-items: center;
  }

  .ld-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  /* Beside the field: a small box placed by measuring (place), no backdrop, the panel's own look */
  .ld-pop {
    position: fixed;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: var(--urd-color-text, #e8eaf0);
    background: transparent;
    border: 0;
    z-index: 100010;
  }

  .ld-card {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: min(42rem, 100%);
    max-height: min(34rem, 100%);
    padding: 0.8rem 1rem 1rem;
    overflow: hidden;
    font-size: 0.9rem;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  /* The dialog with the rail: the kinds on the left on a darker ground, the
     picked row in the surface's own colour so it runs into the fields;
     the box is as tall as the picked kind's fields. */
  .ld-railed {
    display: grid;
    grid-template-columns: 9.5rem minmax(0, 1fr);
    gap: 0;
    padding: 0;
  }

  .ld-rail {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0.8rem 0 0.8rem 0.6rem;
    background: color-mix(in srgb, var(--urd-color-surface, #151a23) 70%, black);
  }

  .ld-rail-head {
    padding: 0.1rem 0.7rem 0.4rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .ld-kind {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.45rem 0.7rem;
    font-size: 0.85rem;
    cursor: pointer;
    border-radius: 7px 0 0 7px;
    opacity: 0.85;
  }

  .ld-kind input {
    margin: 0;
    width: 0.95rem;
    height: 0.95rem;
    accent-color: var(--urd-admin-accent, var(--urd-color-accent, #7c5cff));
  }

  .ld-kind.on {
    font-weight: 600;
    opacity: 1;
    background: var(--urd-color-surface, #151a23);
  }

  .ld-main {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    min-width: 0;
    min-height: 0;
  }

  .ld-railed .ld-main {
    padding: 0.8rem 1rem 1rem;
  }

  .ld-card-pop {
    width: 100%;
    max-height: 27.5rem;
    padding: 0.6rem 0.7rem 0.7rem;
    gap: 0.5rem;
    font-size: 0.85rem;
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .ld-head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ld-head h2 {
    margin: 0;
    font-size: 1.05rem;
  }

  .ld-small {
    padding: 0.35rem 0.7rem;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .ld-check,
  .ld-body .ld-check {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.45rem;
    width: auto;
    align-self: flex-start;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .ld-check.ld-off {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .ld-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 0;
    overflow: auto;
  }

  /* The two columns of the dialog's page kind */
  .ld-cols {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem;
    min-height: 0;
  }

  .ld-col {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 0;
    min-height: 0;
  }

  .ld-search {
    padding: 0.4rem 0.6rem;
    font: inherit;
    color: inherit;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 7px;
  }

  .ld-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    max-height: 11rem;
    overflow: auto;
  }

  .ld-tall {
    max-height: 17rem;
  }

  .ld-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.7rem;
    padding: 0.3rem 0.55rem;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 7px;
  }

  .ld-row:hover {
    background: rgb(255 255 255 / 6%);
  }

  .ld-row.on {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .ld-sub {
    padding-left: 1.4rem;
  }

  .ld-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ld-dim {
    margin: 0 0.35em;
    opacity: 0.6;
  }

  .ld-aside {
    flex: none;
    font-size: 0.78rem;
    opacity: 0.65;
  }

  .ld-label {
    margin: 0;
    padding: 0.4rem 0 0;
    font-size: 0.78rem;
    font-weight: 600;
    opacity: 0.8;
  }

  .ld-note {
    margin: 0;
    font-size: 0.85rem;
  }

  .ld-note.place-error {
    color: #e05252;
  }

  .ld-none {
    margin: 0;
    padding: 0.35rem 0.55rem;
    font-size: 0.82rem;
    opacity: 0.65;
  }

  .ld-actions {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .ld-gap {
    flex: 1;
  }
</style>
