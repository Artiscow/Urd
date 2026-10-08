<script>
  /**
   * The design picker (0.7.19.22): every calendar design with its picture, grouped by family, over the editor.
   * The pictures are the engine's own drawings of each design with the sample events (template/admin/designs/<id>.webp, made by scripts/design-pictures.mjs); a design without one shows its schematic thumbnail.
   * The marked design is drawn live in a preview iframe of its own, in the site's theme and language, so the owner sees it before it is applied.
   * `mode` 'set' changes the selected calendar's design, 'add' adds a calendar in the chosen one; `onpick(id)` applies, `onclose` leaves.
   */
  import { ta } from '$engine/i18n.js';
  import { CAL_VIEWS, calDesign, calDesignFamilies } from '$engine/calendar-designs.js';
  import { calendarThumb } from '$engine/calendar-thumb.js';

  let { current = 'plain', mode = 'set', site = null, page = null, onpick, onclose } = $props();

  const VIEW_KEYS = { list: 'calendar.viewList', cards: 'calendar.viewCards', month: 'calendar.viewMonth', agenda: 'calendar.viewAgenda', next: 'calendar.viewNext', week: 'calendar.viewWeek', day: 'calendar.viewDay', year: 'calendar.viewYear' };
  /** The preview page's width in CSS px; the iframe is scaled to the pane, and its height follows the drawn calendar. */
  const PREVIEW_W = 1040;

  let query = $state('');
  let view = $state('');
  let chosen = $state(current);
  let broken = $state(new Set());
  let iframeEl = $state(null);
  let paneW = $state(0);
  let previewReady = $state(false);
  let previewH = $state(600);
  let searchEl = $state(null);
  let dialogEl = $state(null);

  /** The plain design follows the block's view, so it stands in every view's filter. */
  const inView = (d) => !view || d.view === null || d.view === view;
  const matches = (d) => inView(d) && (!query.trim() || ta(d.labelKey).toLowerCase().includes(query.trim().toLowerCase()));
  const families = $derived(calDesignFamilies().map((f) => ({ ...f, designs: f.designs.filter(matches) })).filter((f) => f.designs.length));
  const count = $derived(families.reduce((n, f) => n + f.designs.length, 0));
  const chosenDef = $derived(calDesign(chosen));
  const scale = $derived(paneW ? Math.min(1, paneW / PREVIEW_W) : 0.4);

  // A native modal dialog (ADR-0011): the top layer places it over the whole editor whatever the panel it was opened from is transformed by, and Escape is its own cancel.
  $effect(() => {
    if (dialogEl && !dialogEl.open) dialogEl.showModal();
    searchEl?.focus();
  });

  /** One calendar in the chosen design on an otherwise empty page, drawn by the preview with its sample events. */
  function previewPage(id) {
    const def = calDesign(id);
    const block = {
      id: 'design-picker-cal', type: 'calendar', version: 1, decor: false, hideMobile: false, animation: null,
      props: { sources: [], limit: 4, view: def.view ?? 'list', ...(def.id === 'plain' ? {} : { design: def.id }), ...(def.view === 'next' ? { nextCount: 3, laterCount: 3 } : {}) },
      frames: { desktop: { x: 3, y: 24, w: 94, h: 600 }, mobile: null },
    };
    const section = { id: 'design-picker-sec', version: 1, size: { minHeight: '200px' }, grid: null, background: { version: 1, layers: [] }, blocks: [block] };
    return { ...(page ?? {}), sections: [section] };
  }

  const post = (msg) => iframeEl?.contentWindow?.postMessage(msg, location.origin);

  /** The preview's height follows the drawn calendar: the block's bottom, read whenever the preview page's body changes size (the sample events arrive after the first draw and the block grows with them). */
  function measure() {
    const doc = iframeEl?.contentDocument;
    const block = doc?.querySelector('.urd-block[data-block-id="design-picker-cal"]');
    if (!block) return;
    const bottom = block.getBoundingClientRect().bottom + (doc.defaultView?.scrollY ?? 0);
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
      const block = win.document.querySelector('.urd-block[data-block-id="design-picker-cal"]');
      if (block && block !== watched) {
        watched = block;
        watcher = new win.ResizeObserver(measure);
        watcher.observe(block);
        measure();
      } else if (tries++ < 300) {
        win.requestAnimationFrame(find);
      }
    };
    find();
  }

  function sendPreview() {
    post({ type: 'urd-preview-full', pageId: 'design-picker', page: previewPage(chosen) });
    watchPreview();
  }

  /** The preview's handshake, from this picker's own iframe alone (the editor's bridge hears only its own). */
  function onMessage(event) {
    if (event.origin !== location.origin || event.source !== iframeEl?.contentWindow) return;
    if (event.data?.type !== 'urd-ready') return;
    previewReady = true;
    // The preview shows the design alone: the site's header, announcement strip, footer and scroll-top button stay out of it.
    const doc = iframeEl?.contentDocument;
    if (doc && !doc.getElementById('design-picker-style')) {
      const style = doc.createElement('style');
      style.id = 'design-picker-style';
      style.textContent = '.urd-nav, #urd-announce, .urd-nav-announce, #urd-footer, .urd-totop { display: none !important; }';
      doc.head.appendChild(style);
    }
    if (site) post({ type: 'urd-site', site });
    post({ type: 'urd-viewport', mode: 'desktop' });
    post({ type: 'urd-chrome', visible: false });
    sendPreview();
  }

  $effect(() => {
    chosen;
    if (previewReady) sendPreview();
  });

  $effect(() => () => watcher?.disconnect());

  function onCancel(event) {
    event.preventDefault();
    onclose?.();
  }

  function pictureFailed(id) {
    broken = new Set([...broken, id]);
  }
</script>

<svelte:window onmessage={onMessage} />

<dialog class="dp-overlay" bind:this={dialogEl} aria-label={ta('calendar.picker.title')} oncancel={onCancel}>
  <div class="dp-card">
    <div class="dp-head">
      <h2>{ta('calendar.picker.title')}</h2>
      <input class="dp-search" type="search" bind:this={searchEl} bind:value={query} placeholder={ta('calendar.picker.search')} aria-label={ta('calendar.picker.search')} />
      <span class="dp-count">{ta('calendar.picker.count', { n: count })}</span>
      <button type="button" class="dp-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={() => onclose?.()}>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg>
      </button>
    </div>
    <div class="dp-views" role="group" aria-label={ta('calendar.picker.title')}>
      <button type="button" class:on={view === ''} aria-pressed={view === ''} onclick={() => (view = '')}>{ta('calendar.picker.all')}</button>
      {#each CAL_VIEWS as v (v)}
        <button type="button" class:on={view === v} aria-pressed={view === v} onclick={() => (view = v)}>{ta(VIEW_KEYS[v])}</button>
      {/each}
    </div>
    <div class="dp-body">
      <div class="dp-list">
        {#each families as family (family.family)}
          <section class="dp-family">
            <h3>{ta(family.labelKey)}</h3>
            <div class="dp-grid">
              {#each family.designs as d (d.id)}
                <button type="button" class="dp-tile" class:on={d.id === chosen} class:current={d.id === current} aria-pressed={d.id === chosen}
                  title={ta(d.labelKey)} onclick={() => (chosen = d.id)} ondblclick={() => onpick?.(d.id)}>
                  <span class="dp-pic">
                    {#if broken.has(d.id)}
                      {@html calendarThumb(d.id)}
                    {:else}
                      <img src={`/admin/designs/${d.id}.webp`} alt="" loading="lazy" decoding="async" onerror={() => pictureFailed(d.id)} />
                    {/if}
                  </span>
                  <span class="dp-name">{ta(d.labelKey)}</span>
                  {#if d.id === current}
                    <span class="dp-mark">{ta('calendar.picker.current')}</span>
                  {/if}
                </button>
              {/each}
            </div>
          </section>
        {/each}
        {#if !families.length}
          <p class="dp-none">{ta('calendar.picker.none')}</p>
        {/if}
      </div>
      <aside class="dp-side">
        <div class="dp-side-head">
          <strong>{ta(chosenDef.labelKey)}</strong>
          {#if chosenDef.view}
            <span class="dp-side-view">{ta(VIEW_KEYS[chosenDef.view])}</span>
          {/if}
        </div>
        <div class="dp-preview" bind:clientWidth={paneW} aria-label={ta('calendar.picker.preview', { name: ta(chosenDef.labelKey) })}>
          <div class="dp-stage" style="width:{PREVIEW_W * scale}px; height:{previewH * scale}px">
            <iframe bind:this={iframeEl} title={ta('calendar.picker.preview', { name: ta(chosenDef.labelKey) })} src="/?preview=1"
              style="width:{PREVIEW_W}px; height:{previewH}px; transform:scale({scale}); transform-origin:top left"></iframe>
          </div>
        </div>
        <button type="button" class="dp-use" onclick={() => onpick?.(chosen)}>{mode === 'add' ? ta('calendar.picker.add') : ta('calendar.picker.use')}</button>
      </aside>
    </div>
  </div>
</dialog>

<style>
  .dp-overlay {
    position: fixed;
    inset: 0;
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

  .dp-side {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 0.6rem;
    min-height: 0;
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

  .dp-preview {
    align-self: start;
    min-height: 0;
    max-height: 100%;
    overflow: auto;
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
