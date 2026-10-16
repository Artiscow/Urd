<script>
  /**
   * The design picker (0.7.19.22): every calendar design with its picture, grouped by family, over the editor.
   * The pictures are the engine's own drawings of each design with the sample events (template/admin/designs/<id>.webp, made by scripts/design-pictures.mjs), each the design's own box, shown whole and centred on the tile's dark surface; a design without one shows its schematic thumbnail.
   * The marked design is drawn live in a preview iframe of its own, in the site's theme and language, so the owner sees it before it is applied.
   * `mode` 'set' changes the selected calendar's design, 'add' adds a calendar in the chosen one, 'phone' chooses the phone design the selected calendar draws on a phone (calPhoneCandidates: the neutral list, every design that reads on a phone, and the phone designs designs lend; pictures under phone-<id>.webp and the preview at a phone's width in the calendar's own design, `design`), and 'card' the card design its card wears (calCardCandidates: the neutral card, every design's card, and the card designs designs lend; pictures under card-<id>.webp, the preview with the card open); `onpick(id)` applies, `onclose` leaves.
   * Under the preview the marked entry is described, and what the owner can change on it is said in plain sentences under three headings: Colours (what its colours paint, `<design labelKey>.colors`, or for another design's phone view or card that it keeps its own), Text (its words) and Options (its settings, `calendar.opt.<key>.phrase`, and its rewriting); a heading with nothing under it is left out.
   */
  import { ta, adminLang } from '$engine/i18n.js';
  import { CAL_VIEWS, calDesign, calDesignFamilies, calOptionDefs, calPhoneDesignDef, calPhoneFamilies, calCardDesignDef, calCardFamilies } from '$engine/calendar-designs.js';
  import { calendarThumb } from '$engine/calendar-thumb.js';

  let { current = null, mode = 'set', design = 'plain', props = {}, site = null, page = null, onpick, onclose } = $props();
  const phone = mode === 'phone';
  const card = mode === 'card';
  /** The lists other than the design's own: pictures and preview follow the calendar's own design. */
  const lent = phone || card;
  const PIC_PREFIX = phone ? 'phone-' : card ? 'card-' : '';

  const VIEW_KEYS = { list: 'calendar.viewList', cards: 'calendar.viewCards', month: 'calendar.viewMonth', agenda: 'calendar.viewAgenda', next: 'calendar.viewNext', week: 'calendar.viewWeek', day: 'calendar.viewDay', year: 'calendar.viewYear' };
  /** The preview page's width in CSS px (a phone's for the phone designs); the iframe is scaled to the pane, and its height follows the drawn calendar. */
  const PREVIEW_W = phone ? 390 : 1040;

  let query = $state('');
  let view = $state('');
  let chosen = $state(current ?? (phone ? 'agenda' : card ? 'neutral' : 'plain'));
  let broken = $state(new Set());
  let iframeEl = $state(null);
  let paneW = $state(0);
  let previewReady = $state(false);
  let previewH = $state(600);
  let searchEl = $state(null);
  let dialogEl = $state(null);

  /** The plain design follows the block's view, so it stands in every view's filter; the lent lists have no view filter. */
  const inView = (d) => lent || !view || d.view === null || d.view === view;
  /** A card several designs share is named for its colour set and the first designs that share it; the search finds it by any of their names. */
  function nameOf(d) {
    if (!d.setCard) return ta(d.labelKey);
    const names = d.designs.map((id) => ta(calDesign(id).labelKey));
    const set = ta(d.labelKey);
    return names.length > 3 ? ta('calendar.picker.setNameMore', { set, designs: names.slice(0, 3).join(', '), n: names.length - 3 }) : ta('calendar.picker.setName', { set, designs: joined(names) });
  }
  const searchText = (d) => (d.setCard ? [nameOf(d), ...d.designs.map((id) => ta(calDesign(id).labelKey))].join(' ') : ta(d.labelKey));
  const matches = (d) => inView(d) && (!query.trim() || searchText(d).toLowerCase().includes(query.trim().toLowerCase()));
  const families = $derived((phone ? calPhoneFamilies(props) : card ? calCardFamilies() : calDesignFamilies()).map((f) => ({ ...f, designs: f.designs.filter(matches) })).filter((f) => f.designs.length));
  const count = $derived(families.reduce((n, f) => n + f.designs.length, 0));
  const chosenDef = $derived(phone ? calPhoneDesignDef(chosen, props) : card ? calCardDesignDef(chosen) : calDesign(chosen));
  const scale = $derived(paneW ? Math.min(1, paneW / PREVIEW_W) : 0.4);

  /** What the marked entry is: a design's own description, a lent or neutral entry's own, or for a design's card the card as that design draws it. */
  function aboutText(def) {
    if (def.setCard) return ta('calendar.picker.setAbout', { designs: joined(def.designs.map((id) => ta(calDesign(id).labelKey))) });
    if (card && def.desktop) return ta('calendar.picker.cardOf', { name: ta(def.labelKey) });
    return ta(`${def.labelKey}.about`);
  }
  /** Phrases joined as the admin language joins a list («a, b og c»), with commas where the language has no rules for it. */
  function joined(parts) {
    try {
      return new Intl.ListFormat(adminLang(), { type: 'conjunction' }).format(parts);
    } catch {
      return parts.join(', ');
    }
  }
  /**
   * What the owner can change on the marked entry, as [heading, sentences] rows under Colours, Text and Options; a row with no sentence is left out.
   * A design: what its colours paint, its words, its settings and its rewriting. A phone view or card: the calendar's colours for a neutral one, what the colours paint for the calendar's own design, or that another design keeps its own; then what follows the calendar.
   */
  function yours(def) {
    const look = def.look ? calDesign(def.look) : null;
    let colours;
    let text;
    let options;
    if (phone || card) {
      if (def.setCard) colours = [calDesign(design).set === def.set ? ta('calendar.picker.c.cardOwn') : ta('calendar.picker.c.setOther')];
      else if (!look) colours = [ta(phone ? 'calendar.picker.c.phoneNeutral' : 'calendar.picker.c.cardNeutral')];
      else if (look.id === design) colours = [card ? ta('calendar.picker.c.cardOwn') : ta(`${look.labelKey}.colors`)];
      else colours = [ta('calendar.picker.c.other', { name: ta(look.labelKey) })];
      text = [ta(phone ? 'calendar.picker.c.phoneWords' : 'calendar.picker.c.cardText')];
      options = [ta(phone ? 'calendar.picker.c.phoneOptions' : 'calendar.picker.c.cardOptions')];
    } else {
      colours = [ta(`${def.labelKey}.colors`)];
      text = [ta('calendar.picker.c.words'), ...(def.theme?.length ? [ta('calendar.picker.c.theme')] : [])];
      const settings = calOptionDefs(def.id).filter((o) => !o.tipKey).map((o) => ta(`${o.labelKey}.phrase`));
      options = [...(settings.length ? [ta('calendar.picker.c.settings', { settings: joined(settings) })] : []), ...(def.rewrites ? [ta('calendar.picker.c.rewrite')] : [])];
    }
    return [['calendar.picker.h.colours', colours], ['calendar.picker.h.text', text], ['calendar.picker.h.options', options]].filter(([, lines]) => lines.length).map(([key, lines]) => [ta(key), lines]);
  }

  // A native modal dialog (ADR-0011): the top layer places it over the whole editor whatever the panel it was opened from is transformed by, and Escape is its own cancel.
  $effect(() => {
    if (dialogEl && !dialogEl.open) dialogEl.showModal();
    searchEl?.focus();
  });

  /** One calendar in the chosen design on an otherwise empty page, drawn by the preview with its sample events; for a phone or card design, the calendar's own design with that phone or card design, at a phone's width for the phone. */
  function previewPage(id) {
    const def = calDesign(lent ? design : id);
    const block = {
      id: 'design-picker-cal', type: 'calendar', version: 1, decor: false, hideMobile: false, animation: null,
      props: { sources: [], limit: 4, view: def.view ?? 'list', ...(def.id === 'plain' ? {} : { design: def.id }), ...(def.view === 'next' ? { nextCount: 3, laterCount: 3 } : {}), ...(phone ? { phoneView: id } : {}), ...(card ? { card: id } : {}) },
      frames: { desktop: { x: 3, y: 24, w: 94, h: 600 }, mobile: null },
    };
    const section = { id: 'design-picker-sec', version: 1, size: { minHeight: '200px' }, grid: null, background: { version: 1, layers: [] }, blocks: [block] };
    return { ...(page ?? {}), sections: [section] };
  }

  const post = (msg) => iframeEl?.contentWindow?.postMessage(msg, location.origin);

  /** The preview's height follows the drawn calendar: the block's bottom (or the open card's, when it reaches lower), read whenever the preview page's body changes size (the sample events arrive after the first draw and the block grows with them). */
  function measure() {
    const doc = iframeEl?.contentDocument;
    const block = doc?.querySelector('.urd-block[data-block-id="design-picker-cal"]');
    if (!block) return;
    const open = doc.querySelector('dialog.urd-cal-dialog[open]');
    const bottom = Math.max(block.getBoundingClientRect().bottom, open?.getBoundingClientRect().bottom ?? 0) + (doc.defaultView?.scrollY ?? 0);
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
        // For a card design the preview shows the card itself: the first event is opened once the events are drawn, and the card is watched too.
        if (card) openPreviewCard(win, block, 0);
      } else if (tries++ < 300) {
        win.requestAnimationFrame(find);
      }
    };
    find();
  }

  /** Opens the first event's card in the preview, once an event stands, and watches the card's size as well. */
  function openPreviewCard(win, block, tries) {
    const event = block.querySelector('.urd-cal-event');
    if (!event) {
      if (tries < 300) win.requestAnimationFrame(() => openPreviewCard(win, block, tries + 1));
      return;
    }
    event.click();
    const dialog = win.document.querySelector('dialog.urd-cal-dialog[open]');
    if (dialog && watcher) {
      watcher.observe(dialog);
      measure();
    }
  }

  function sendPreview() {
    post({ type: 'urd-preview-full', pageId: 'design-picker', page: previewPage(chosen) });
    watchPreview();
  }

  /** The preview's handshake, from this picker's own iframe alone (the editor's bridge hears only its own). */
  function onMessage(event) {
    if (event.origin !== location.origin || event.source !== iframeEl?.contentWindow) return;
    if (event.data?.type !== 'urd-ready') return;
    // The preview shows the design alone: the site's header, announcement strip, footer and scroll-top button stay out of it.
    // The frame is as tall as the drawn calendar (measure) and as wide as the view it shows, so the page in it never scrolls.
    const doc = iframeEl?.contentDocument;
    if (doc && !doc.getElementById('design-picker-style')) {
      const style = doc.createElement('style');
      style.id = 'design-picker-style';
      style.textContent = '.urd-nav, #urd-announce, .urd-nav-announce, #urd-footer, .urd-totop { display: none !important; } html { overflow: hidden !important; }';
      doc.head.appendChild(style);
    }
    if (site) post({ type: 'urd-site', site });
    // A phone design is shown on the page's phone layout, at a phone's width; the others on the desktop layout.
    post({ type: 'urd-viewport', mode: phone ? 'mobile' : 'desktop' });
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

<dialog class="dp-overlay" bind:this={dialogEl} aria-label={ta('calendar.picker.title')} onclose={onClosed}>
  <div class="dp-card">
    <div class="dp-head">
      <h2>{ta(phone ? 'calendar.picker.phoneTitle' : card ? 'calendar.picker.cardTitle' : 'calendar.picker.title')}</h2>
      <input class="dp-search" type="search" bind:this={searchEl} bind:value={query} placeholder={ta('calendar.picker.search')} aria-label={ta('calendar.picker.search')} />
      <span class="dp-count">{ta('calendar.picker.count', { n: count })}</span>
      <button type="button" class="dp-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={() => onclose?.()}>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg>
      </button>
    </div>
    {#if !lent}
    <div class="dp-views" role="group">
      <button type="button" class:on={view === ''} aria-pressed={view === ''} onclick={() => (view = '')}>{ta('calendar.picker.all')}</button>
      {#each CAL_VIEWS as v (v)}
        <button type="button" class:on={view === v} aria-pressed={view === v} onclick={() => (view = v)}>{ta(VIEW_KEYS[v])}</button>
      {/each}
    </div>
    {/if}
    <div class="dp-body">
      <div class="dp-list">
        {#each families as family (family.family)}
          <section class="dp-family">
            <h3>{ta(family.labelKey)}</h3>
            <div class="dp-grid">
              {#each family.designs as d (d.id)}
                <button type="button" class="dp-tile" class:on={d.id === chosen} class:current={current !== null && d.id === current} aria-pressed={d.id === chosen}
                  title={nameOf(d)} onclick={() => (chosen = d.id)} ondblclick={() => onpick?.(d.id)}>
                  <span class="dp-pic">
                    {#if broken.has(d.id)}
                      {@html calendarThumb(d.id)}
                    {:else}
                      <img src={`/admin/designs/${PIC_PREFIX}${d.id}.webp`} alt="" loading="lazy" decoding="async" onerror={() => pictureFailed(d.id)} />
                    {/if}
                  </span>
                  <span class="dp-name">{nameOf(d)}</span>
                  {#if current !== null && d.id === current}
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
          <strong>{nameOf(chosenDef)}</strong>
          {#if !lent && chosenDef.view}
            <span class="dp-side-view">{ta(VIEW_KEYS[chosenDef.view])}</span>
          {/if}
        </div>
        <div class="dp-preview" bind:clientWidth={paneW}>
          <div class="dp-stage" style="width:{PREVIEW_W * scale}px; height:{previewH * scale}px">
            <iframe bind:this={iframeEl} title={ta('calendar.picker.preview', { name: nameOf(chosenDef) })} src="/?preview=1"
              style="width:{PREVIEW_W}px; height:{previewH}px; transform:scale({scale}); transform-origin:top left"></iframe>
          </div>
        </div>
        <div class="dp-info">
          <section>
            <h3>{ta('calendar.picker.aboutHead')}</h3>
            <p>{aboutText(chosenDef)}</p>
          </section>
          <section>
            <h3>{ta('calendar.picker.yoursHead')}</h3>
            <dl>
              {#each yours(chosenDef) as [label, lines] (label)}
                <dt>{label}</dt>
                <dd>{#each lines as line, i (i)}<span>{line}</span>{/each}</dd>
              {/each}
            </dl>
          </section>
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
