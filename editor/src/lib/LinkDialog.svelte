<script>
  /* The link editor (0.7.27.4): one dialog for every link the editor stores, opened through state/link.svelte.js.
     The kind of link is a choice of four, Page, Web address, Email and Phone, or pages alone for a host that takes nothing else.
     A page is found by searching the register, and a spot on it can then be chosen: the top, each section by its number and first words, and each named block (pageSpots in anchor-model.js); another page's spots are read from its draft or its published file.
     A link to a page or the web can open in a new tab, and a link to the web can carry the rel words; a host that keeps one address gets neither, and a host that takes pages only gets no new tab.
     A spot on the host's own page (`here`) is written without the page (writeLink), so a copy of the host follows the spot's copy.
     It is a native modal dialog (ADR-0011): Escape, the cross, Cancel and a press on the backdrop close it, and focus goes back to the field that opened it. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { matchWords } from '$engine/palette-search.js';
  import { pageSpots } from '$engine/anchor-model.js';
  import { LINK_RELS } from '$engine/nav-model.js';
  import Choice from './Choice.svelte';
  import { ICONS } from './icons.js';
  import { LINK_KINDS, readLink, writeLink, linkReady, webHref, hasLink } from './link-edit.js';
  const ed = getContext('urd-editor');
  /** request: the value to start from, `shape`, `pagesOnly`, `here` and `apply` (state/link.svelte.js); onclose: leaves. */
  let { request, onclose } = $props();

  // The dialog is drawn anew for every request (App.svelte keys it), so the request is read once.
  // svelte-ignore state_referenced_locally
  const shape = request.shape ?? 'link';
  // svelte-ignore state_referenced_locally
  const here = request.here ?? null;
  // svelte-ignore state_referenced_locally
  const offerNewTab = shape === 'link' && !request.pagesOnly;
  // svelte-ignore state_referenced_locally
  const removable = request.removable !== false && hasLink(request.value);
  const pages = $derived(ed.siteDraft?.pages ?? []);
  // svelte-ignore state_referenced_locally
  let link = $state(readLink(request.value, { pages: ed.siteDraft?.pages ?? [], here }));
  // svelte-ignore state_referenced_locally
  if (request.pagesOnly) link.kind = 'page';
  let query = $state('');
  /** The chosen page's spots, null while they are read. */
  let spots = $state(null);
  let dialogEl = $state(null);
  let downOnBackdrop = false;

  const KIND_KEYS = { page: 'link.kind.page', web: 'link.kind.web', email: 'link.kind.email', phone: 'link.kind.phone' };
  const REL_KEYS = { nofollow: ['link.nofollow', 'tip.link.nofollow'], sponsored: ['link.sponsored', 'tip.link.sponsored'] };
  const shownPages = $derived(pages.filter((p) => matchWords(`${p.title} ${p.path}`, query)));
  const leavesForWeb = $derived(link.kind === 'web' && /^https?:\/\//i.test(webHref(link.url)));

  $effect(() => {
    if (!dialogEl || dialogEl.open) return;
    dialogEl.showModal();
    // The first field rather than the cross: the page search, or the address.
    dialogEl.querySelector('.ld-body input')?.focus();
  });

  /** Closes through the dialog itself, so the browser gives focus back to the field that opened it; the close event leaves. */
  function leave() {
    if (dialogEl?.open) dialogEl.close();
    else onclose();
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

  /** The words a spot is listed by: a section's number and first words, a block's words or its name. */
  const spotText = (spot) => (spot.kind === 'section'
    ? `${ta('link.section', { n: spot.n })}${spot.words ? ` · ${spot.words}` : ''}`
    : spot.words || spot.name);

  function choosePage(id) {
    if (id !== link.page) link.target = '';
    link.page = id;
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

<!-- A press that starts and ends on the backdrop cancels; Escape is the keyboard's way, and the Cancel button the focusable one -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="ld-overlay" bind:this={dialogEl} aria-labelledby="ld-title" onclose={() => onclose()}
  onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
  onclick={(e) => downOnBackdrop && e.target === e.currentTarget && leave()}>
  <form class="ld-card" onsubmit={(e) => { e.preventDefault(); use(); }}>
    <div class="ld-head">
      <h2 id="ld-title">{ta('link.title')}</h2>
      <button type="button" class="ld-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={leave}>{@html ICONS.cross}</button>
    </div>
    {#if !request.pagesOnly}
      <Choice label={ta('lbl.goesTo')} value={link.kind} options={LINK_KINDS.map((kind) => [kind, ta(KIND_KEYS[kind])])} onchange={(v) => (link.kind = v)} />
    {/if}
    <div class="ld-body panel-body">
      {#if link.kind === 'page'}
        <input class="ld-search" type="search" bind:value={query} placeholder={ta('link.searchPages')} aria-label={ta('link.searchPages')} />
        <div class="ld-list" role="group" aria-label={ta('link.kind.page')}>
          {#each shownPages as page (page.id)}
            <button type="button" class="ld-row" class:on={page.id === link.page} aria-pressed={page.id === link.page} onclick={() => choosePage(page.id)}>
              <span class="ld-text">{page.title}</span><span class="ld-aside">{page.path}</span>
            </button>
          {:else}
            <p class="ld-none">{ta('link.noPages')}</p>
          {/each}
        </div>
        {#if link.page}
          <p class="ld-label" title={ta('tip.link.spot')}>{ta('link.spot')}</p>
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
        {/if}
      {:else if link.kind === 'web'}
        <label class="field-stack" title={ta('tip.link.web')}>{ta('link.url')}
          <input bind:value={link.url} placeholder="https://" spellcheck="false" autocomplete="off" /></label>
      {:else if link.kind === 'email'}
        <label class="field-stack">{ta('link.email')}
          <input type="email" bind:value={link.email} spellcheck="false" autocomplete="off" /></label>
        <label class="field-stack" title={ta('tip.link.subject')}>{ta('link.subject')}
          <input bind:value={link.subject} /></label>
      {:else if link.kind === 'phone'}
        <label class="field-stack">{ta('link.phone')}
          <input type="tel" bind:value={link.phone} spellcheck="false" autocomplete="off" /></label>
      {/if}
      {#if offerNewTab && (link.kind === 'page' || link.kind === 'web')}
        <label class="gridmenu-snap" title={ta('tip.link.newTab')}>
          <input type="checkbox" bind:checked={link.newTab} />
          {ta('link.newTab')}
        </label>
      {/if}
      <!-- The rel words only for a link to the web: a search engine reads them there and nowhere else -->
      {#if shape === 'link' && leavesForWeb}
        {#each LINK_RELS as word (word)}
          <label class="gridmenu-snap" title={ta(REL_KEYS[word][1])}>
            <input type="checkbox" checked={link.rel.includes(word)} onchange={(e) => toggleRel(word, e.target.checked)} />
            {ta(REL_KEYS[word][0])}
          </label>
        {/each}
      {/if}
    </div>
    <div class="ld-actions">
      {#if removable}
        <button type="button" class="ghost" onclick={remove}>{ta('link.remove')}</button>
      {/if}
      <span class="ld-gap"></span>
      <button type="button" class="ghost" onclick={leave}>{ta('confirm.cancel')}</button>
      <button type="submit" class="primary" disabled={!linkReady(link)}>{ta('link.use')}</button>
    </div>
  </form>
</dialog>

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

  .ld-card {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    width: min(34rem, 100%);
    max-height: min(44rem, 100%);
    padding: 1rem 1.1rem 1.1rem;
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  .ld-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.7rem;
  }

  .ld-head h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .ld-close {
    display: grid;
    place-items: center;
    width: 2.2rem;
    height: 2.2rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 999px;
  }

  .ld-body {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    min-height: 0;
    overflow: auto;
  }

  .ld-search {
    padding: 0.45rem 0.7rem;
    font: inherit;
    color: inherit;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 8px;
  }

  .ld-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 13rem;
    overflow: auto;
  }

  .ld-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.8rem;
    padding: 0.45rem 0.6rem;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;
  }

  .ld-row:hover {
    background: rgb(255 255 255 / 6%);
  }

  .ld-row.on {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .ld-sub {
    padding-left: 1.6rem;
  }

  .ld-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ld-aside {
    flex: none;
    font-size: 0.8rem;
    opacity: 0.65;
  }

  .ld-label {
    margin: 0.2rem 0 0;
    font-size: 0.8rem;
    font-weight: 600;
    opacity: 0.8;
  }

  .ld-none {
    margin: 0;
    padding: 0.45rem 0.6rem;
    font-size: 0.85rem;
    opacity: 0.65;
  }

  .ld-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ld-gap {
    flex: 1;
  }
</style>
