<script>
  /* The phone view's block bar and its menus (0.7.3.19.2): drawn over the stage, free of the page's edges and clear of the page, the bar beside the phone level with the selected block (placeTextBar in menu-place.js), a menu at the point it was opened at or under the bar's ⋮.
     The tools and the rows are the page's own (state/canvas-bar.svelte.js): a press here is pressed there, so each acts as it does on the page. The block keeps its handles and its drag on the page, and a press on the bar leaves the keyboard's focus there. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { placeTextBar, clampPlace } from './menu-place.js';
  import { canvasBarState as cb } from '../state/canvas-bar.svelte.js';
  import { menuMotion } from './motion.svelte.js';
  import { ICONS } from './icons.js';

  const ed = getContext('urd-editor');

  let moreEl = $state(null);
  let menuEl = $state(null);
  let w = $state(0);
  let h = $state(0);
  let mw = $state(0);
  let mh = $state(0);
  /** Counted up when the window or the stage changes size, or the stage is panned, so the places are reckoned again. */
  let resized = $state(0);
  /** The row whose removal waits for its second press, by its action's place. */
  let armed = $state(null);
  /** Whether the mouse is on the menu, and on the bar's ⋮. */
  let overMenu = $state(false);
  let overMore = $state(false);

  const open = $derived(Boolean(cb.blockId && cb.rect && cb.tools.length && ed.viewMode === 'mobile' && ed.chromeVisible && !ed.looking));
  const menuOpen = $derived(Boolean(cb.menu && ed.viewMode === 'mobile' && ed.chromeVisible && !ed.looking));

  // A menu of the phone view goes with the view.
  $effect(() => {
    if (ed.viewMode !== 'mobile' && cb.menu) cb.close();
  });

  /** A box in the canvas's own px as it stands in the window: through the canvas's place and zoom. */
  function toWindow(r) {
    const frame = ed.iframeEl;
    if (!frame) return null;
    const ir = frame.getBoundingClientRect();
    const s = ed.scale || 1;
    return { left: ir.left + s * r.left, top: ir.top + s * r.top, right: ir.left + s * r.right, bottom: ir.top + s * r.bottom };
  }

  /** The bar's place: beside the phone, level with the block, where the stage has room, else above the block or below it; none while the block stands outside the part of the canvas in sight. */
  const place = $derived.by(() => {
    void resized;
    const frame = ed.iframeEl;
    const wrap = ed.frameWrapEl;
    if (!open || !frame || !wrap) return null;
    const ir = frame.getBoundingClientRect();
    const stage = wrap.getBoundingClientRect();
    const block = toWindow(cb.rect);
    if (block.bottom <= Math.max(ir.top, stage.top) || block.top >= Math.min(ir.bottom, stage.bottom)) return null;
    const canvas = { left: Math.max(ir.left, stage.left), right: Math.min(ir.right, stage.right) };
    return placeTextBar(block, { w: w || 260, h: h || 34 }, canvas, stage);
  });

  // Where the bar stands, for the text bar to stand under it beside the phone.
  $effect(() => {
    cb.placed = place ? { blockId: cb.blockId, left: place.left, top: place.top, w, h, side: place.side } : null;
  });

  /** The menu's place: under the bar's ⋮ where that opened it, reaching away from the phone, else at the point it was opened at on the page; inside the window. */
  const menuPlace = $derived.by(() => {
    void resized;
    const m = cb.menu;
    if (!menuOpen || !m) return null;
    const view = { w: window.innerWidth, h: window.innerHeight };
    const size = { w: mw || 220, h: mh || 240 };
    if (m.editor && moreEl) {
      const r = moreEl.getBoundingClientRect();
      return clampPlace({ left: place?.side === 'left' ? r.right - size.w : r.left, top: r.bottom + 4 }, size, view);
    }
    const at = toWindow({ left: m.at.x, top: m.at.y, right: m.at.x, bottom: m.at.y });
    return at ? clampPlace({ left: at.left, top: at.top }, size, view) : null;
  });

  $effect(() => {
    const wrap = ed.frameWrapEl;
    const onMove = () => { resized += 1; };
    window.addEventListener('resize', onMove);
    wrap?.addEventListener('scroll', onMove, { passive: true });
    const ro = wrap ? new ResizeObserver(onMove) : null;
    ro?.observe(wrap);
    return () => {
      window.removeEventListener('resize', onMove);
      wrap?.removeEventListener('scroll', onMove);
      ro?.disconnect();
    };
  });

  // A menu held open takes the focus on its first row; one a rest opened leaves it where it is.
  // A menu taken away under the mouse tells no leave, so the mouse counts as off a menu as another stands.
  $effect(() => {
    const m = cb.menu;
    armed = null;
    overMenu = false;
    if (!m || m.rest) return;
    tick().then(() => menuEl?.querySelector('[role="menuitem"]:not([aria-disabled="true"])')?.focus());
  });

  // A menu a rest opened closes a moment after the mouse has left it and the ⋮ that opened it.
  $effect(() => {
    if (!cb.menu?.rest || overMenu || overMore || cb.pageHover) return;
    const timer = setTimeout(() => cb.close(), 280);
    return () => clearTimeout(timer);
  });

  // Escape anywhere closes a menu a rest opened, which holds no focus, as the page's own does.
  $effect(() => {
    if (!cb.menu?.rest) return;
    const key = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      cb.close();
    };
    window.addEventListener('keydown', key, true);
    return () => window.removeEventListener('keydown', key, true);
  });

  // A press in the editor outside the menu and the bar's ⋮ closes it.
  $effect(() => {
    if (!cb.menu) return;
    const press = (event) => {
      const target = event.target instanceof Node ? event.target : null;
      if (!target || menuEl?.contains(target) || moreEl?.contains(target)) return;
      cb.close();
    };
    document.addEventListener('pointerdown', press, true);
    return () => document.removeEventListener('pointerdown', press, true);
  });

  let restTimer = 0;

  /** The mouse resting on the ⋮ opens the menu without the focus, as on the page's bars; a touch opens it at its press. */
  function moreEnter(event, index) {
    if (event.pointerType !== 'mouse' || event.buttons) return;
    overMore = true;
    if (cb.menu?.editor) return;
    clearTimeout(restTimer);
    restTimer = setTimeout(() => {
      if (overMore && !cb.menu) cb.press(index, true);
    }, 180);
  }

  function moreLeave(event) {
    if (event.pointerType !== 'mouse') return;
    overMore = false;
    clearTimeout(restTimer);
  }

  /** A press on the ⋮: it opens the menu, holds one a rest opened, and closes one it opened. */
  function morePress(index) {
    clearTimeout(restTimer);
    if (cb.menu?.editor && !cb.menu.rest) cb.close();
    else cb.press(index);
  }

  /** A row chosen: a removal asks for a second press, a greyed row does nothing. */
  function choose(row) {
    if (row.disabled) return;
    if (row.arm && armed !== row.run) {
      armed = row.run;
      return;
    }
    cb.run(row.run);
  }

  /** The keys in the menu: the arrows walk the rows and wrap, Home and End jump, Escape and Tab close it. */
  function menuKey(event) {
    const rows = [...(menuEl?.querySelectorAll('[role="menuitem"]') ?? [])];
    const i = rows.indexOf(document.activeElement);
    const focusAt = (n) => rows[(n + rows.length) % rows.length]?.focus();
    if (event.key === 'ArrowDown') { event.preventDefault(); focusAt(i + 1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); focusAt(i - 1); }
    else if (event.key === 'Home') { event.preventDefault(); focusAt(0); }
    else if (event.key === 'End') { event.preventDefault(); focusAt(-1); }
    else if (event.key === 'Escape' || event.key === 'Tab') { event.preventDefault(); cb.close(true); }
  }

  /** A press on the bar leaves the focus where it is, on the page's block, so its keys go on working there. */
  function keepFocus(event) {
    event.preventDefault();
  }

  function menuEnter(event) {
    if (event.pointerType === 'mouse') overMenu = true;
  }

  function menuLeave(event) {
    if (event.pointerType === 'mouse') overMenu = false;
  }
</script>

{#if open && place}
  <!-- The bar holds the mouse's press so the page's block keeps the focus; its tools are buttons of their own -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="canvas-bar" role="toolbar" tabindex="-1" aria-label={ta('canvas.blockTools')} data-canvas-tool bind:offsetWidth={w} bind:offsetHeight={h}
    style="left: {place.left}px; top: {place.top}px" onmousedown={keepFocus} transition:menuMotion>
    {#each cb.tools as tool, i (i)}
      {#if tool.more}
        <button type="button" class="cb-tool" aria-label={tool.label} aria-haspopup="menu" aria-expanded={Boolean(cb.menu?.editor)} bind:this={moreEl}
          onpointerenter={(e) => moreEnter(e, i)} onpointerleave={moreLeave} onclick={() => morePress(i)}>{@html tool.html}</button>
      {:else}
        <button type="button" class="cb-tool" class:on={tool.pressed} class:danger={tool.danger} class:word={!tool.html} title={tool.tip || undefined} aria-label={tool.label}
          aria-pressed={tool.pressed === null ? undefined : tool.pressed} data-opens-menu={tool.opensMenu ? '' : undefined} onclick={() => cb.press(i)}>{#if tool.html}{@html tool.html}{:else}{tool.text}{/if}</button>
      {/if}
    {/each}
  </div>
{/if}

{#if menuOpen && menuPlace}
  <div class="canvas-menu" role="menu" aria-label={cb.menu.label} tabindex="-1" data-canvas-tool bind:this={menuEl} bind:offsetWidth={mw} bind:offsetHeight={mh}
    style="left: {menuPlace.left}px; top: {menuPlace.top}px" onkeydown={menuKey} onpointerenter={menuEnter} onpointerleave={menuLeave} transition:menuMotion>
    {#each cb.menu.rows as row, i (i)}
      {#if row.sep}
        <div class="cm-sep" role="separator"></div>
      {:else}
        <button type="button" role="menuitem" tabindex="-1" class="cm-row" class:first={row.first} class:danger={row.danger} class:armed={armed === row.run}
          aria-disabled={row.disabled ? 'true' : undefined} onclick={() => choose(row)}>
          {#if row.danger}{@html ICONS.bin}{/if}
          <span>{armed === row.run ? row.arm : row.text}</span>
          {#if row.key}<kbd>{row.key}</kbd>{/if}
        </button>
      {/if}
    {/each}
  </div>
{/if}

<style>
  .canvas-bar {
    position: fixed;
    z-index: 316;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px;
    box-sizing: border-box;
    width: max-content;
    max-width: calc(100vw - 16px);
    padding: 4px;
    background: var(--urd-color-surface, #151a23);
    color: var(--urd-color-text, #e8eaf0);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgb(0 0 0 / 45%);
    font: 600 12px/1 system-ui, sans-serif;
  }

  .cb-tool {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding: 0 6px;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }

  .cb-tool:hover,
  .cb-tool:focus-visible {
    background: color-mix(in srgb, currentColor 12%, transparent);
  }

  /* A tool that stands pressed (a calendar's example events): the admin's accent rings it */
  .cb-tool.on {
    background: color-mix(in srgb, var(--urd-color-accent, #5f6a75) 18%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--urd-color-accent, #5f6a75) 75%, currentColor);
  }

  /* A tool of words, the «Settings» of the bar with small panels */
  .cb-tool.word {
    padding: 0 9px;
  }

  /* The block's bin: on the dark red of every removal, lighter under the pointer */
  .cb-tool.danger {
    color: #ffd4d4;
    background: #5e1c22;
  }

  .cb-tool.danger:is(:hover, :focus-visible) {
    background: #7a222a;
  }

  .canvas-menu {
    position: fixed;
    z-index: 317;
    min-width: 214px;
    padding: 6px;
    box-sizing: border-box;
    background: var(--urd-color-surface, #1b2030);
    color: var(--urd-color-text, #e9ebf2);
    border: 1px solid color-mix(in srgb, var(--urd-color-text, #e8eaf0) 20%, transparent);
    border-radius: 10px;
    box-shadow: 0 14px 34px rgb(0 0 0 / 55%);
    font: 500 13px/1.3 system-ui, sans-serif;
  }

  .cm-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    min-height: 32px;
    padding: 0 8px;
    box-sizing: border-box;
    background: transparent;
    border: 0;
    border-radius: 6px;
    color: inherit;
    font: inherit;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
  }

  .cm-row kbd {
    margin-left: auto;
    padding-left: 16px;
    font: inherit;
    font-size: 11px;
    opacity: 0.65;
  }

  .cm-row:hover,
  .cm-row:focus-visible {
    background: var(--urd-color-accent, #5f6a75);
    color: var(--urd-color-accent-text, #fff);
    outline: none;
  }

  .cm-row.first {
    font-weight: 700;
  }

  .cm-row[aria-disabled='true'] {
    opacity: 0.45;
    cursor: default;
  }

  .cm-row[aria-disabled='true']:hover {
    background: transparent;
    color: inherit;
  }

  /* A removal: the bin and its words on the dark red, lighter under the pointer, brightest while a second press waits */
  .cm-row.danger {
    color: #ffd4d4;
    background: #5e1c22;
  }

  .cm-row.danger:is(:hover, :focus-visible) {
    color: #ffd4d4;
    background: #7a222a;
  }

  .cm-row.danger.armed {
    color: #fff;
    background: #c62828;
    font-weight: 700;
  }

  .cm-row :global(svg) {
    flex: none;
  }

  .cm-sep {
    height: 1px;
    margin: 4px 6px;
    background: color-mix(in srgb, currentColor 12%, transparent);
  }
</style>
