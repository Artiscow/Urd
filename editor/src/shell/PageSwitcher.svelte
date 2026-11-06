<script>
  /* The page switcher at the top bar's left end: the open page's name on a button, and under it the site's pages to switch to, found by a search, each with its address and a gear to its own settings; at the foot the open page's settings and a new page.
     The pages stand in the Pages panel's order, the open one marked, the front page with a house, a page hidden from visitors with an amber crossed eye, one hidden from search with a crossed magnifier, and a page with unpublished changes with a dot.
     A tool menu as the top bar's others (ed.toolMenu 'page'): a press outside, Escape and the window's blur close it; the arrows walk the found pages and Enter opens the marked one. */
  import { menuMotion } from '../lib/motion.svelte.js';
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';

  const ed = getContext('urd-editor');
  let query = $state('');
  let marked = $state(0);
  let buttonEl = $state(null);
  let searchEl = $state(null);
  let listEl = $state(null);

  const open = $derived(ed.toolMenu === 'page');
  const pages = $derived(ed.siteDraft?.pages ?? []);
  const current = $derived(pages.find((p) => p.id === ed.pageId) ?? null);
  /** The pages the search finds, by name or address. */
  const shown = $derived.by(() => {
    const words = query.trim().toLowerCase();
    if (!words) return pages;
    return pages.filter((p) => (p.title ?? '').toLowerCase().includes(words) || (p.path ?? '').toLowerCase().includes(words));
  });
  /** The pages with unpublished changes, read again after every change. */
  const drafted = $derived.by(() => {
    void ed.edits;
    return new Set(pages.filter((p) => localStorage.getItem(`urd-draft-${p.id}`) !== null).map((p) => p.id));
  });

  async function toggle() {
    if (open) {
      ed.toolMenu = null;
      return;
    }
    query = '';
    marked = Math.max(0, pages.findIndex((p) => p.id === ed.pageId));
    ed.toolMenu = 'page';
    await tick();
    searchEl?.focus();
  }

  function close() {
    ed.toolMenu = null;
    buttonEl?.focus();
  }

  function openPage(page) {
    ed.toolMenu = null;
    if (page.id !== ed.pageId) ed.selectPage(page.id);
  }

  function settings(id) {
    ed.toolMenu = null;
    ed.openPageSettings(id);
  }

  /** A new page: the Pages panel opens with its name field ready. */
  async function newPage() {
    ed.toolMenu = null;
    ed.activePanel = 'pages';
    ed.panelFolded = false;
    await tick();
    document.querySelector('input[data-new-page]')?.focus();
  }

  function onSearchKey(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!shown.length) return;
      marked = (marked + (e.key === 'ArrowDown' ? 1 : shown.length - 1)) % shown.length;
      listEl?.querySelector(`[data-index="${marked}"]`)?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const page = shown[Math.min(marked, shown.length - 1)];
      if (page) openPage(page);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  }
</script>

<span class="toolmenu page-switch">
  <button type="button" class="ghost page-btn" class:open bind:this={buttonEl} title={ta('tip.switchPage')} aria-haspopup="true" aria-expanded={open}
    onclick={toggle}><span class="page-btn-name">{current?.title ?? ''}</span>{@html ICONS.caret}</button>
  {#if open}
    <div class="tool-pop page-pop" transition:menuMotion role="dialog" aria-label={ta('tip.switchPage')}>
      <label class="page-find" title={ta('ph.findPage')}>
        {@html ICONS.search}
        <input type="text" bind:this={searchEl} bind:value={() => query, (v) => { query = v; marked = 0; }} placeholder={ta('ph.findPage')} aria-label={ta('ph.findPage')} onkeydown={onSearchKey} />
      </label>
      <div class="page-list" bind:this={listEl}>
        {#each shown as p, i (p.id)}
          <!-- The row carries the one highlight, marked by the pointer moving over it and by the arrow keys alike -->
          <div class="page-row-sw" class:current={p.id === ed.pageId} class:marked={i === marked} data-index={i} onpointermove={() => { if (marked !== i) marked = i; }}>
            <button type="button" class="ghost page-open" title={ta('tip.openPage', { page: p.title || p.id })} onclick={() => openPage(p)}>
              <span class="page-name">{p.title || p.id}</span>
              {#if p.path === '/'}<span class="page-mark" title={ta('tip.pages.isFront')}>{@html ICONS.home}</span>{/if}
              {#if p.hidden}<span class="page-mark page-hidden" title={ta('tip.pages.hiddenMark')}>{@html ICONS.eyeOff}</span>{/if}
              {#if p.noindex}<span class="page-mark" title={ta('lbl.hideFromSearch')}>{@html ICONS.searchOff}</span>{/if}
              {#if drafted.has(p.id)}<span class="page-dot" title={ta('tip.pageDraft')}></span>{/if}
              <span class="page-path">{p.path}</span>
            </button>
            <button type="button" class="ghost page-gear" title={ta('tip.pageSettingsOf', { page: p.title || p.id })} aria-label={ta('tip.pageSettingsOf', { page: p.title || p.id })} onclick={() => settings(p.id)}>{@html ICONS.gear}</button>
          </div>
        {:else}
          <span class="page-none">{ta('page.noneFound')}</span>
        {/each}
      </div>
      <span class="page-sep" aria-hidden="true"></span>
      <button type="button" class="ghost page-act" title={ta('tip.pageSettingsOf', { page: current?.title ?? '' })} onclick={() => settings(ed.pageId)}>{@html ICONS.gear}<span>{ta('ui.pageSettingsFor', { page: current?.title ?? '' })}</span></button>
      <button type="button" class="ghost page-act" title={ta('tip.newPage')} onclick={newPage}>{@html ICONS.plus}<span>{ta('ui.newPage')}</span></button>
    </div>
  {/if}
</span>

<style>
  .page-switch {
    min-width: 0;
    flex: 0 1 auto;
  }

  /* The name and its arrow in one button; the name is the part that shrinks */
  .page-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
    min-width: 3rem;
    max-width: 14rem;
  }

  .page-btn.open {
    border-color: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 60%, transparent);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 12%, transparent);
  }

  .page-btn-name {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .page-btn :global(svg) {
    flex: none;
    opacity: 0.7;
  }

  .page-pop {
    width: 21rem;
    max-width: calc(100vw - 2rem);
  }

  .page-find {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin: 0.1rem 0.1rem 0.3rem;
    padding: 0 0.55rem;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 7px;
    opacity: 0.95;
  }

  .page-find input {
    flex: 1;
    min-width: 0;
    height: 2rem;
    padding: 0;
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    background: transparent;
    border: 0;
    outline: none;
  }

  .page-list {
    display: grid;
    gap: 2px;
    max-height: min(22rem, 60vh);
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .page-row-sw {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    /* The gear as far in from the right as the name is from the left */
    padding-right: 0.45rem;
    border-radius: 6px;
  }

  .page-row-sw.marked {
    background: rgb(255 255 255 / 6%);
  }

  /* The open page: its name on a faint accent surface, never a line at the edge */
  .page-row-sw.current {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .page-row-sw.current.marked {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 26%, transparent);
  }

  .page-open {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
    padding: 0.4rem 0.55rem;
    text-align: left;
    border-color: transparent;
    background: transparent;
  }

  /* The page's button keeps none of the shell's button hover: the row's mark is the one highlight */
  .page-open:hover {
    background: transparent;
    border-color: transparent;
  }

  .page-row-sw.current .page-name {
    font-weight: 600;
  }

  .page-name {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .page-mark {
    display: inline-flex;
    opacity: 0.6;
  }

  /* A page hidden from visitors: its crossed eye in amber */
  .page-mark.page-hidden {
    color: #d9b44a;
    opacity: 1;
  }

  .page-mark :global(svg) {
    width: 12px;
    height: 12px;
  }

  .page-dot {
    width: 6px;
    height: 6px;
    flex: none;
    border-radius: 50%;
    background: #d9b44a;
  }

  .page-path {
    margin-left: auto;
    padding-left: 0.6rem;
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0.55;
  }

  .page-gear {
    display: grid;
    place-items: center;
    width: 1.9rem;
    height: 1.9rem;
    padding: 0;
    background: transparent;
    border-color: transparent;
    opacity: 0.7;
  }

  .page-gear:hover {
    opacity: 1;
  }

  .page-none {
    padding: 0.5rem 0.6rem;
    font-size: 0.82rem;
    opacity: 0.6;
  }

  .page-sep {
    height: 1px;
    margin: 0.25rem 0.2rem;
    background: rgb(255 255 255 / 10%);
  }

  .page-act {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
  }

  .page-act:hover,
  .page-gear:hover {
    background: rgb(255 255 255 / 7%);
    border-color: transparent;
  }

  .page-act :global(svg) {
    opacity: 0.7;
  }
</style>
