<script>
  /**
   * The design picker (0.7.19.22): every design of a choice with its picture, grouped by family, over the editor.
   * What it shows comes from a source (design-sources.js): the calendar's designs, its phone and card designs, or another block's designs (block-designs.js).
   * The pictures are the engine's own drawings of each design (template/admin/designs/, made by scripts/design-pictures.mjs), each the design's own box, shown whole and centred on the tile's dark surface; a design without one shows its schematic thumbnail where the source has one.
   * The marked design is drawn live in a preview iframe of its own, in the site's theme and language, so the owner sees it before it is applied; under the preview it is described, with what the owner can change on it where the source says.
   * The preview frame is told the site, the enabled plugins and the draft collections, as the editor's own preview is, so a plugin block and a collection block draw there too.
   * `onpick(id)` applies, `onclose` leaves.
   */
  import { ta } from '$engine/i18n.js';

  let { source, site = null, page = null, plugins = [], collections = null, onpick, onclose } = $props();

  let query = $state('');
  let view = $state('');
  let chosen = $state(source.initial);
  let broken = $state(new Set());
  let iframeEl = $state(null);
  let paneW = $state(0);
  let previewReady = $state(false);
  let previewH = $state(600);
  let searchEl = $state(null);
  let dialogEl = $state(null);

  const matches = (d) => (!source.filters || !view || source.filters.match(d, view)) && (!query.trim() || source.searchText(d).toLowerCase().includes(query.trim().toLowerCase()));
  const families = $derived(source.families().map((f) => ({ ...f, designs: f.designs.filter(matches) })).filter((f) => f.designs.length));
  const count = $derived(families.reduce((n, f) => n + f.designs.length, 0));
  const chosenDef = $derived(source.def(chosen));
  const scale = $derived(paneW ? Math.min(1, paneW / source.previewWidth) : 0.4);

  // A native modal dialog (ADR-0011): the top layer places it over the whole editor whatever the panel it was opened from is transformed by, and Escape is its own cancel.
  $effect(() => {
    if (dialogEl && !dialogEl.open) dialogEl.showModal();
    searchEl?.focus();
  });

  const post = (msg) => iframeEl?.contentWindow?.postMessage(msg, location.origin);

  /** The preview's height follows the drawn block: its bottom (or what the source draws below it, an open card), read whenever the block changes size (sample data arrives after the first draw and the block grows with it). */
  /** The element the preview is measured by and watched for: the drawn block, or what the source points at (the footer). */
  const drawn = (doc) => (doc ? (source.findEl ? source.findEl(doc) : doc.querySelector(`.urd-block[data-block-id="${source.blockId}"]`)) : null);

  function measure() {
    const doc = iframeEl?.contentDocument;
    const block = drawn(doc);
    if (!block) return;
    const bottom = Math.max(block.getBoundingClientRect().bottom, source.extraBottom?.(doc) ?? 0) + (doc.defaultView?.scrollY ?? 0);
    const next = Math.max(160, Math.ceil(bottom + 24));
    if (next !== previewH) previewH = next;
  }

  let watcher = null;
  let watched = null;
  /** The block drawn for the choice is watched for its size by the preview window's own observer; each draw makes a new block, found as soon as it stands. */
  function watchPreview() {
    watcher?.disconnect();
    watcher = null;
    const win = iframeEl?.contentWindow;
    if (!win?.ResizeObserver) return;
    let tries = 0;
    const find = () => {
      const block = drawn(win.document);
      if (block && block !== watched) {
        watched = block;
        watcher = new win.ResizeObserver(measure);
        watcher.observe(block);
        measure();
        source.afterDraw?.(win, block, (el) => {
          watcher?.observe(el);
          measure();
        });
      } else if (tries++ < 300) {
        win.requestAnimationFrame(find);
      }
    };
    find();
  }

  function sendPreview() {
    // A source whose design is the site's (the footer) sends the site anew with the choice.
    if (source.siteVaries && site) post({ type: 'urd-site', site: source.previewSite(site, chosen) });
    post({ type: 'urd-preview-full', pageId: 'design-picker', page: source.previewPage(chosen, page, site) });
    watchPreview();
  }

  /** The preview's handshake, from this picker's own iframe alone (the editor's bridge hears only its own). */
  function onMessage(event) {
    if (event.origin !== location.origin || event.source !== iframeEl?.contentWindow) return;
    if (event.data?.type !== 'urd-ready') return;
    // The preview shows the design alone: the site's header, announcement strip, footer and scroll-top button stay out of it, unless the footer is what the source shows.
    // The frame is as tall as the drawn block (measure) and as wide as the view it shows, so the page in it never scrolls.
    const doc = iframeEl?.contentDocument;
    if (doc && !doc.getElementById('design-picker-style')) {
      const style = doc.createElement('style');
      style.id = 'design-picker-style';
      style.textContent = `.urd-nav, #urd-announce, .urd-nav-announce, .urd-totop${source.showsFooter ? '' : ', #urd-footer'} { display: none !important; } html { overflow: hidden !important; }`;
      doc.head.appendChild(style);
    }
    if (site) post({ type: 'urd-site', site: source.previewSite(site, chosen) });
    if (plugins.length) post({ type: 'urd-plugins', enabled: plugins });
    if (collections) post({ type: 'urd-collections', collections });
    post({ type: 'urd-viewport', mode: source.viewport });
    post({ type: 'urd-chrome', visible: false });
    // The effect below sends the page once the preview is ready, and again at every choice.
    previewReady = true;
  }

  $effect(() => {
    chosen;
    if (previewReady) sendPreview();
  });

  $effect(() => () => watcher?.disconnect());

  /** The dialog closing on its own (Escape, or a close the browser forces) leaves the picker too. */
  function onClosed() {
    onclose?.();
  }

  function pictureFailed(id) {
    broken = new Set([...broken, id]);
  }
</script>

<svelte:window onmessage={onMessage} />

<dialog class="dp-overlay" bind:this={dialogEl} aria-label={source.label} onclose={onClosed}>
  <div class="dp-card" class:nofilters={!source.filters}>
    <div class="dp-head">
      <h2>{source.title}</h2>
      <input class="dp-search" type="search" bind:this={searchEl} bind:value={query} placeholder={source.searchLabel} aria-label={source.searchLabel} />
      <span class="dp-count">{source.countText(count)}</span>
      <button type="button" class="dp-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={() => onclose?.()}>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg>
      </button>
    </div>
    {#if source.filters}
    <div class="dp-views" role="group">
      <button type="button" class:on={view === ''} aria-pressed={view === ''} onclick={() => (view = '')}>{source.filters.allLabel}</button>
      {#each source.filters.items as [v, label] (v)}
        <button type="button" class:on={view === v} aria-pressed={view === v} onclick={() => (view = v)}>{label}</button>
      {/each}
    </div>
    {/if}
    <div class="dp-body">
      <div class="dp-list">
        {#each families as family (family.family)}
          <section class="dp-family">
            <h3>{family.label ?? ta(family.labelKey)}</h3>
            <div class="dp-grid">
              {#each family.designs as d (d.id)}
                <button type="button" class="dp-tile" class:on={d.id === chosen} class:current={source.current !== null && d.id === source.current} aria-pressed={d.id === chosen}
                  title={source.name(d)} onclick={() => (chosen = d.id)} ondblclick={() => onpick?.(d.id)}>
                  <span class="dp-pic">
                    {#if broken.has(d.id) || !source.picture(d.id)}
                      {@html source.thumb(d.id)}
                    {:else}
                      <img src={source.picture(d.id)} alt="" loading="lazy" decoding="async" onerror={() => pictureFailed(d.id)} />
                    {/if}
                  </span>
                  <span class="dp-name">{source.name(d)}</span>
                  {#if source.current !== null && d.id === source.current}
                    <span class="dp-mark">{source.currentText}</span>
                  {/if}
                </button>
              {/each}
            </div>
          </section>
        {/each}
        {#if !families.length}
          <p class="dp-none">{source.noneText}</p>
        {/if}
      </div>
      <aside class="dp-side">
        <div class="dp-side-head">
          <strong>{source.name(chosenDef)}</strong>
          {#if source.sideTag(chosenDef)}
            <span class="dp-side-view">{source.sideTag(chosenDef)}</span>
          {/if}
        </div>
        <div class="dp-preview" bind:clientWidth={paneW}>
          <div class="dp-stage" style="width:{source.previewWidth * scale}px; height:{previewH * scale}px">
            <iframe bind:this={iframeEl} title={source.previewTitle(source.name(chosenDef))} src="/?preview=1"
              style="width:{source.previewWidth}px; height:{previewH}px; transform:scale({scale}); transform-origin:top left"></iframe>
          </div>
        </div>
        <div class="dp-info">
          <section>
            <h3>{source.aboutHead}</h3>
            <p>{source.about(chosenDef)}</p>
          </section>
          {#if source.yours(chosenDef).length}
            <section>
              <h3>{source.yoursHead}</h3>
              <dl>
                {#each source.yours(chosenDef) as [label, lines] (label)}
                  <dt>{label}</dt>
                  <dd>{#each lines as line, i (i)}<span>{line}</span>{/each}</dd>
                {/each}
              </dl>
            </section>
          {/if}
        </div>
        <button type="button" class="dp-use" onclick={() => onpick?.(chosen)}>{source.useLabel}</button>
      </aside>
    </div>
  </div>
</dialog>

<style>
  .dp-overlay {
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

  .dp-overlay[open] {
    display: grid;
    grid-template-rows: minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
    place-items: center;
  }

  .dp-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  .dp-card {
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr);
    gap: 0.7rem;
    width: min(1180px, 100%);
    height: min(860px, 100%);
    min-height: 0;
    padding: 1rem 1.1rem 1.1rem;
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  /* Without the filter row the body takes the second row, which holds the rest of the card's height. */
  .dp-card.nofilters {
    grid-template-rows: auto minmax(0, 1fr);
  }

  .dp-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem;
  }

  .dp-head h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .dp-search {
    flex: 1 1 12rem;
    min-width: 8rem;
    padding: 0.45rem 0.7rem;
    font: inherit;
    color: inherit;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 999px;
  }

  .dp-count {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .dp-close {
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

  .dp-views {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .dp-views button {
    padding: 0.3rem 0.75rem;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 999px;
  }

  .dp-views button.on {
    color: var(--urd-color-accent-text, #fff);
    background: var(--urd-color-accent, #7c5cff);
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .dp-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 24rem);
    gap: 1rem;
    min-height: 0;
  }

  .dp-list {
    display: grid;
    gap: 1rem;
    align-content: start;
    min-height: 0;
    padding-right: 0.3rem;
    overflow-y: auto;
  }

  .dp-family h3 {
    margin: 0 0 0.5rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.75;
  }

  .dp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.6rem;
  }

  .dp-tile {
    position: relative;
    display: grid;
    gap: 0.35rem;
    padding: 0.35rem;
    font: inherit;
    color: inherit;
    text-align: center;
    cursor: pointer;
    background: transparent;
    border: 1.5px solid rgb(255 255 255 / 12%);
    border-radius: 0.6rem;
  }

  .dp-tile:hover,
  .dp-tile.on {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .dp-tile.on {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--urd-color-accent, #7c5cff) 45%, transparent);
  }

  .dp-pic {
    display: block;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #0e1512;
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 0.4rem;
  }

  .dp-pic img,
  .dp-pic :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* The picture is the design's own box: shown whole, in its proportions, centred on the dark surface */
  .dp-pic img {
    object-fit: contain;
    object-position: center;
  }

  /* The schematic thumbnail is drawn to the tile */
  .dp-pic :global(svg) {
    object-fit: cover;
    object-position: top;
  }

  .dp-name {
    font-size: 0.74rem;
    font-weight: 600;
  }

  .dp-mark {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.1rem 0.45rem;
    font-size: 0.66rem;
    font-weight: 700;
    color: var(--urd-color-accent-text, #fff);
    background: var(--urd-color-accent, #7c5cff);
    border-radius: 999px;
  }

  .dp-none {
    margin: 1rem 0;
    opacity: 0.7;
  }

  /* The words under the preview are always shown whole: the preview gives way to them and scrolls, so the button stays in view. */
  .dp-side {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    min-height: 0;
  }

  .dp-side > .dp-preview {
    flex: 0 1 auto;
    align-self: stretch;
    min-height: 8rem;
  }

  .dp-info {
    display: grid;
    flex: none;
    gap: 0.8rem;
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .dp-info section {
    display: grid;
    gap: 0.3rem;
  }

  .dp-info h3 {
    margin: 0;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .dp-info p {
    margin: 0;
  }

  .dp-info dl {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.35rem 0.8rem;
    margin: 0;
  }

  .dp-info dt {
    font-weight: 700;
  }

  .dp-info dd {
    display: grid;
    gap: 0.2rem;
    margin: 0;
  }

  .dp-use {
    flex: none;
  }

  .dp-side-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.6rem;
  }

  .dp-side-view {
    font-size: 0.78rem;
    opacity: 0.7;
  }

  /* The preview scrolls down when it is taller than its room, never sideways: the stage is scaled to the pane's width, and the scrollbar's room is kept, so its coming never narrows the pane under the stage. */
  .dp-preview {
    align-self: start;
    min-height: 0;
    max-height: 100%;
    overflow: hidden auto;
    scrollbar-gutter: stable;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 0.6rem;
  }

  .dp-stage {
    position: relative;
    overflow: hidden;
    transition: height 120ms ease-out;
  }

  .dp-stage iframe {
    display: block;
    border: 0;
    pointer-events: none;
  }

  .dp-use {
    padding: 0.6rem 1rem;
    font: inherit;
    font-weight: 700;
    color: var(--urd-color-accent-text, #fff);
    cursor: pointer;
    background: var(--urd-color-accent, #7c5cff);
    border: 0;
    border-radius: 999px;
  }

  @media (width <= 820px) {
    .dp-body {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
    }

    .dp-side {
      grid-template-rows: auto auto;
    }

    .dp-preview {
      display: none;
    }
  }
</style>
