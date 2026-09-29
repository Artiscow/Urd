<script>
  /**
   * The mark picker for a launcher shortcut: one menu that holds both the
   * drawn icons and the owner's own images, so an image is a choice in the
   * icon menu rather than a button of its own. Two tabs: Icons (searchable
   * over the whole library) and Images (an upload tile plus the marks
   * already in use on the site, reusable across shortcuts). The tab that
   * opens is the one the mark is from, so an image mark lands in Images.
   *
   * Two branches (ADR-0011 addendum, anchored.js decides): in the top layer,
   * anchored under the trigger with the browser flipping it away from the
   * viewport edge and light dismiss; otherwise position: fixed (the panels
   * clip absolute content), placed by measuring and closed on a click
   * outside, Escape or a scroll outside. The same pattern as GlyphPicker.
   *
   * The trigger is whatever the caller puts inside, so the same picker can
   * be a tile preview and a text button on the same row. A choice does not
   * close the menu: the mark is applied at once and the menu stays for the
   * next try, until Escape, a click outside or the trigger closes it.
   */
  import { nativeAnchoring, anchorName, namePane } from '$engine/anchored.js';
  import { ICON_CATEGORIES, ICON_LIBRARY, iconSvg } from '$engine/icons.js';
  import { ta } from '$engine/i18n.js';

  let { icon = '', image = '', images = [], label = ta('mp.pickMark'), noneLabel = ta('common.none'), klass = '', onpick, onfile, children } = $props();

  const native = nativeAnchoring();
  const anchor = anchorName('urd-mp');
  const popId = anchor.slice(2);

  let rootEl = $state(null);
  let popEl = $state(null);
  let fileEl = $state(null);
  let open = $state(false);
  let tab = $state('icons');
  let query = $state('');
  let pos = $state({ top: 0, left: 0 });

  /** Every icon with its translated name, for the search. */
  const allIcons = ICON_CATEGORIES.flatMap(([cat, ids]) => ids.map((id) => ({ id, cat })));

  const hits = $derived.by(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allIcons;
    return allIcons.filter(({ id }) => {
      const name = ta(ICON_LIBRARY[id].labelKey) || ICON_LIBRARY[id].label;
      return id.includes(q) || name.toLowerCase().includes(q);
    });
  });

  /** The images already in use, without repeats: one mark can serve several shortcuts. */
  const ownImages = $derived([...new Set(images.filter(Boolean))]);

  function onOpen() {
    query = '';
    // An image mark opens where it lives; everything else starts in the icons.
    tab = image ? 'images' : 'icons';
  }

  function onToggle(e) {
    open = e.newState === 'open';
    namePane(rootEl, open);
    if (open) onOpen();
  }

  function closePicker() {
    if (native) popEl?.hidePopover();
    open = false;
  }

  function openPicker() {
    onOpen();
    const r = rootEl.getBoundingClientRect();
    const W = 286;
    const H = 332;
    pos = {
      left: Math.max(8, Math.min(r.left, window.innerWidth - W - 8)),
      top: r.bottom + H + 8 > window.innerHeight ? Math.max(8, r.top - H - 8) : r.bottom + 6,
    };
    open = true;
  }

  // Choosing a mark leaves the menu open: the tile and the preview show the
  // choice at once, so several marks can be tried in a row. It closes the
  // way every other menu does - Escape, a click outside, or the trigger.
  function pickIcon(id) {
    onpick?.({ icon: id, image: '' });
  }

  function pickImage(src) {
    onpick?.({ image: src });
  }

  function clearMark() {
    onpick?.({ icon: '', image: '' });
  }

  function chooseFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    onfile?.(file);
  }

  // A click in the preview iframe never reaches this document, so a window
  // blur closes the picker in both branches.
  $effect(() => {
    if (!open) return;
    const onBlur = () => closePicker();
    window.addEventListener('blur', onBlur);
    if (native) return () => window.removeEventListener('blur', onBlur);
    const onDown = (e) => {
      if (rootEl && !rootEl.contains(e.target)) open = false;
    };
    const onKey = (e) => {
      if (e.key === 'Escape') open = false;
    };
    const onScroll = (e) => {
      if (rootEl && e.target instanceof Node && !rootEl.contains(e.target)) open = false;
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  });
</script>

<span class="mp" bind:this={rootEl}>
  <button type="button" class="mp-trigger {klass}" title={label} aria-label={label}
    popovertarget={native ? popId : undefined} style={native ? `anchor-name: ${anchor}` : undefined}
    onclick={native ? undefined : () => (open ? (open = false) : openPicker())}>
    {#if children}{@render children()}
    {:else if image}<img class="mp-own" src={image} alt="" />
    {:else if icon && ICON_LIBRARY[icon]}<span class="mp-svg">{@html iconSvg(icon)}</span>
    {:else}<span class="mp-empty" aria-hidden="true">+</span>{/if}
  </button>
  {#if native}
    <div class="mp-pop mp-anchored" id={popId} popover="auto" bind:this={popEl}
      style="position-anchor: {anchor}" ontoggle={onToggle}>
      {#if open}{@render body()}{/if}
    </div>
  {:else if open}
    <div class="mp-pop" style="top: {pos.top}px; left: {pos.left}px">
      {@render body()}
    </div>
  {/if}
</span>

{#snippet body()}
  <div class="mp-tabs" role="group" aria-label={label}>
    <button type="button" class="mp-tab" class:on={tab === 'icons'} aria-pressed={tab === 'icons'}
      onclick={() => (tab = 'icons')}>{ta('mp.icons')}</button>
    <button type="button" class="mp-tab" class:on={tab === 'images'} aria-pressed={tab === 'images'}
      onclick={() => (tab = 'images')}>{ta('mp.images')}{#if ownImages.length}<span class="mp-count">{ownImages.length}</span>{/if}</button>
  </div>
  {#if tab === 'icons'}
    <input class="mp-search" type="search" placeholder={ta('mp.search')} aria-label={ta('mp.search')} bind:value={query} />
    <div class="mp-scroll">
      <div class="mp-grid">
        <button type="button" class="mp-cell mp-none" class:active={!icon && !image} title={noneLabel}
          aria-label={noneLabel} onclick={clearMark}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M6 18L18 6"/></svg>
        </button>
        {#each hits as { id } (id)}
          <button type="button" class="mp-cell" class:active={id === icon && !image}
            title={ta(ICON_LIBRARY[id].labelKey)} aria-label={ta(ICON_LIBRARY[id].labelKey)}
            onclick={() => pickIcon(id)}><span class="mp-svg">{@html iconSvg(id)}</span></button>
        {/each}
      </div>
      {#if !hits.length}<p class="mp-hint">{ta('mp.noHits')}</p>{/if}
    </div>
  {:else}
    <div class="mp-scroll">
      <div class="mp-grid mp-grid-img">
        <button type="button" class="mp-cell mp-upload" onclick={() => fileEl.click()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          <span>{ta('mp.upload')}</span>
        </button>
        {#each ownImages as src (src)}
          <button type="button" class="mp-cell mp-img" class:active={src === image}
            onclick={() => pickImage(src)}><img src={src} alt="" /></button>
        {/each}
      </div>
      <p class="mp-hint">{ta('mp.imagesHint')}</p>
    </div>
    <input type="file" accept="image/*" hidden bind:this={fileEl} onchange={chooseFile} />
  {/if}
{/snippet}

<style>
  .mp {
    position: relative;
    display: inline-flex;
    min-width: 0;
  }

  /* The trigger carries no look of its own: the caller's content decides,
     so the same picker is a tile preview on one row and a text button on
     the next. */
  .mp-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  .mp-own,
  .mp-svg {
    width: 1.1rem;
    height: 1.1rem;
    display: inline-flex;
  }

  .mp-own { object-fit: cover; border-radius: 4px; }
  .mp-svg :global(svg) { width: 100%; height: 100%; }
  .mp-empty { opacity: 0.6; }

  .mp-pop {
    position: fixed;
    z-index: 100050;
    width: 286px;
    padding: 8px;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 10px;
    background: var(--urd-admin-surface, #151a23);
    box-shadow: 0 16px 40px rgb(0 0 0 / 55%);
  }

  /* The anchored branch: the top layer needs no coordinates, CSS places the
     card under the trigger and flips it away from the viewport edge. */
  .mp-pop.mp-anchored {
    position: absolute;
    inset: auto;
    margin: 0;
  }

  @supports (anchor-name: --a) {
    .mp-pop.mp-anchored[popover] {
      position: fixed;
      margin: 6px 0 0;
      position-area: block-end span-inline-end;
    }

    .mp-pop.mp-anchored[popover]:not(:popover-open) {
      display: none;
    }

    @supports (position-try-fallbacks: flip-block) {
      .mp-pop.mp-anchored[popover] {
        position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
      }
    }
  }

  .mp-tabs {
    display: flex;
    gap: 3px;
    padding: 3px;
    margin-bottom: 8px;
    border-radius: 8px;
    background: rgb(255 255 255 / 6%);
  }

  .mp-tab {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px;
    border: 0;
    border-radius: 6px;
    background: none;
    color: inherit;
    font: inherit;
    font-size: 0.8rem;
    opacity: 0.7;
    cursor: pointer;
  }

  .mp-tab.on {
    background: var(--urd-admin-accent, #6c5ce7);
    color: var(--urd-admin-accent-text, #fff);
    opacity: 1;
    font-weight: 600;
  }

  .mp-count {
    font-size: 0.7rem;
    opacity: 0.75;
  }

  .mp-search {
    width: 100%;
    margin-bottom: 8px;
    padding: 6px 9px;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 7px;
    background: rgb(255 255 255 / 6%);
    color: inherit;
    font: inherit;
    font-size: 0.82rem;
  }

  .mp-scroll {
    max-height: 232px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .mp-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 4px;
  }

  .mp-grid-img {
    grid-template-columns: repeat(4, 1fr);
  }

  .mp-cell {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 7px;
    background: rgb(255 255 255 / 7%);
    color: inherit;
    cursor: pointer;
    overflow: hidden;
  }

  .mp-cell:hover,
  .mp-cell:focus-visible {
    border-color: var(--urd-admin-accent, #6c5ce7);
  }

  .mp-cell.active {
    border-color: var(--urd-admin-accent, #6c5ce7);
    background: color-mix(in srgb, var(--urd-admin-accent, #6c5ce7) 30%, transparent);
  }

  .mp-cell .mp-svg {
    width: 1.05rem;
    height: 1.05rem;
  }

  .mp-cell svg {
    width: 1.05rem;
    height: 1.05rem;
  }

  .mp-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mp-none,
  .mp-upload {
    border: 1px dashed rgb(255 255 255 / 22%);
    background: none;
    opacity: 0.8;
  }

  .mp-upload {
    grid-column: span 2;
    aspect-ratio: auto;
    grid-auto-flow: column;
    gap: 5px;
    padding: 8px 4px;
    font-size: 0.75rem;
  }

  .mp-upload svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  .mp-none:hover,
  .mp-upload:hover {
    opacity: 1;
  }

  .mp-hint {
    margin: 8px 0 0;
    font-size: 0.72rem;
    opacity: 0.6;
  }
</style>
