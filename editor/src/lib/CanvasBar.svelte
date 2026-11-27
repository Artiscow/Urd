<script>
  /* The phone view's bars and menus: beside the phone, level with the section, block or site menu they act on, using the page's own tools. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { sectionWords, blockWords } from '$engine/anchor-model.js';
  import { placeTextBar, placeClearOf, clampPlace } from './menu-place.js';
  import { phoneSizes, phoneStep } from './nav-size.js';
  import { navActions } from '../panels/nav/nav-actions.js';
  import { canvasBarState as cb } from '../state/canvas-bar.svelte.js';
  import { historyState } from '../state/history.svelte.js';
  import { menuMotion } from './motion.svelte.js';
  import { ICONS } from './icons.js';

  const ed = getContext('urd-editor');

  /** Each bar's ⋮, which a menu it opened hangs from. */
  const moreEls = $state({ block: null, section: null });
  let menuEl = $state(null);
  let bw = $state(0);
  let bh = $state(0);
  let sw = $state(0);
  let sh = $state(0);
  let mw = $state(0);
  let mh = $state(0);
  let nw = $state(0);
  let nh = $state(0);
  /** Counted up when the window or the stage changes size, or the stage is panned, so the places are reckoned again. */
  let resized = $state(0);
  /** The row whose removal waits for its second press, by its action's place. */
  let armed = $state(null);
  /** Whether the mouse is on the menu, and which bar's ⋮ it is on ('block', 'section' or null). */
  let overMenu = $state(false);
  let overMore = $state(null);

  const shown = $derived(ed.viewMode === 'mobile' && ed.chromeVisible && !ed.looking);
  const menuOpen = $derived(Boolean(cb.menu && shown));

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

  /** The canvas as it stands in sight in the stage, and the stage, in window px; null without a canvas. */
  function frameOf() {
    void resized;
    const frame = ed.iframeEl;
    const wrap = ed.frameWrapEl;
    if (!frame || !wrap) return null;
    const ir = frame.getBoundingClientRect();
    const stage = wrap.getBoundingClientRect();
    return { stage, canvas: { left: Math.max(ir.left, stage.left), right: Math.min(ir.right, stage.right), top: Math.max(ir.top, stage.top), bottom: Math.min(ir.bottom, stage.bottom) } };
  }

  /** With «Bars in the phone view» set to both places, the page draws its own bars over the canvas and the editor's stand only beside the phone. */
  const besideOnly = $derived(ed.toolbarPhonePlacePref === 'both');
  const beside = (place) => (place && besideOnly && place.side !== 'left' && place.side !== 'right' ? null : place);

  /** What the bars act on, named as the order's column names it: the section by its first words, or its place on the page where it has none. */
  const sectionName = $derived.by(() => {
    void ed.edits;
    void ed.restores;
    const i = ed.sections.findIndex((s) => s.id === cb.section.id);
    if (i < 0) return ta('lbl.section');
    return sectionWords(ed.sections[i]) || ta('diff.section', { n: i + 1 });
  });
  /** The block by its kind and its first words. */
  const blockName = $derived.by(() => {
    void ed.edits;
    void ed.restores;
    const block = ed.sections.flatMap((s) => s.blocks).find((b) => b.id === cb.block.id);
    if (!block) return '';
    const words = blockWords(block);
    return words ? `${ed.blockLabel(block.type)}: ${words}` : ed.blockLabel(block.type);
  });

  /** The section's bar beside the phone, level with the section's top or the canvas top; none while out of sight. */
  const sectionAt = $derived.by(() => {
    const f = frameOf();
    if (!f || !shown || !cb.section.id || !cb.section.rect || !cb.section.tools.length) return null;
    const box = toWindow(cb.section.rect);
    if (box.bottom <= f.canvas.top || box.top >= f.canvas.bottom) return null;
    return placeTextBar({ ...box, top: Math.max(box.top, f.canvas.top) }, { w: sw || 200, h: sh || 34 }, f.canvas, f.stage);
  });
  /** The section's bar where it is shown. */
  const sectionPlace = $derived(beside(sectionAt));

  /** The block's bar beside the phone level with the block, else above or below it clear of the section's bar; none while out of sight. */
  const blockAt = $derived.by(() => {
    const f = frameOf();
    if (!f || !shown || !cb.block.id || !cb.block.rect || !cb.block.tools.length) return null;
    const box = toWindow(cb.block.rect);
    if (box.bottom <= f.canvas.top || box.top >= f.canvas.bottom) return null;
    const held = sectionPlace ? { left: sectionPlace.left, top: sectionPlace.top, w: sw || 200, h: sh || 34 } : null;
    return placeClearOf(box, { w: bw || 260, h: bh || 34 }, f.canvas, f.stage, [held]);
  });
  /** The block's bar where it is shown. */
  const blockPlace = $derived(beside(blockAt));

  const { setNavMobile, setNavLogo } = navActions(ed);
  /** The sizes the menu's bar steps, as the phone draws them now. */
  const navSizes = $derived(ed.siteDraft?.nav ? phoneSizes(ed.siteDraft.nav) : null);
  const navSteps = $derived(navSizes ? [
    navSizes.padY != null && { what: 'padY', value: navSizes.padY, icon: ICONS.navThickness, name: ta('canvas.navThickness') },
    navSizes.logo && { what: 'logo', value: navSizes.logoSize, icon: ICONS.navLogo, name: ta('canvas.navLogoSize') },
    { what: 'textSize', value: navSizes.textSize, icon: ICONS.navText, name: ta('canvas.navTextSize') },
  ].filter(Boolean) : []);

  /** The site menu's bar beside the phone level with the menu, clear of the other bars; none while out of sight. */
  const navPlace = $derived.by(() => {
    const f = frameOf();
    if (!f || !shown || !cb.nav?.rect || !navSizes) return null;
    const box = toWindow(cb.nav.rect);
    if (box.bottom <= f.canvas.top || box.top >= f.canvas.bottom) return null;
    const held = [
      sectionPlace ? { left: sectionPlace.left, top: sectionPlace.top, w: sw || 200, h: sh || 34 } : null,
      blockPlace ? { left: blockPlace.left, top: blockPlace.top, w: bw || 260, h: bh || 34 } : null,
    ];
    return placeClearOf({ ...box, top: Math.max(box.top, f.canvas.top) }, { w: nw || 130, h: nh || 128 }, f.canvas, f.stage, held);
  });

  /** One step of a size, written as the phone's own value, an undo step of its own; a step past its bound does nothing. */
  function navStep(what, dir) {
    const step = phoneStep(ed.siteDraft.nav, what, dir);
    if (!step) return;
    historyState.asOwnStep(() => {
      if (step.on === 'logo') setNavLogo(step.key, step.value);
      else setNavMobile(step.key, step.value);
    });
  }

  /** The menu's settings for the phone: the Phone panel's fold of them while that panel stands, else the Nav panel's. */
  function navSettings() {
    if (ed.activePanel === 'phone') ed.showFold('phone', 'nav-phone-bar');
    else ed.showFold('nav', 'mobile');
  }

  // Where the bars stand, for the text bar and the review cards to stand clear of them beside the phone.
  $effect(() => {
    cb.placed = blockPlace ? { blockId: cb.block.id, left: blockPlace.left, top: blockPlace.top, w: bw, h: bh, side: blockPlace.side } : null;
  });
  $effect(() => {
    cb.navPlaced = navPlace ? { left: navPlace.left, top: navPlace.top, w: nw, h: nh, side: navPlace.side } : null;
  });
  $effect(() => {
    cb.sectionPlaced = sectionPlace ? { sectionId: cb.section.id, left: sectionPlace.left, top: sectionPlace.top, w: sw, h: sh, side: sectionPlace.side } : null;
  });

  /** The menu's place: under the ⋮ that opened it, away from the phone, else where it was opened; inside the window, left of a docked phone column. */
  const menuPlace = $derived.by(() => {
    void resized;
    const m = cb.menu;
    if (!menuOpen || !m) return null;
    const view = { w: Math.min(window.innerWidth, ed.frameWrapEl?.getBoundingClientRect().right ?? Infinity), h: window.innerHeight };
    const size = { w: mw || 220, h: mh || 240 };
    const more = m.editor ? moreEls[m.editor] : null;
    if (more) {
      const r = more.getBoundingClientRect();
      const side = (m.editor === 'section' ? sectionPlace : blockPlace)?.side;
      return clampPlace({ left: side === 'left' ? r.right - size.w : r.left, top: r.bottom + 4 }, size, view);
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
  // A new menu starts with the mouse counted off it.
  $effect(() => {
    const m = cb.menu;
    armed = null;
    overMenu = false;
    if (!m || m.rest) return;
    tick().then(() => menuEl?.querySelector('[role="menuitem"]:not([aria-disabled="true"])')?.focus());
  });

  // A menu a rest opened closes a moment after the mouse has left it and the ⋮ that opened it.
  $effect(() => {
    if (!cb.menu?.rest || overMenu || (overMore && overMore === cb.menu.editor) || cb.pageHover) return;
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

  // A press in the editor outside the menu and the bars' ⋮ closes it.
  $effect(() => {
    if (!cb.menu) return;
    const press = (event) => {
      const target = event.target instanceof Node ? event.target : null;
      if (!target || menuEl?.contains(target) || moreEls.block?.contains(target) || moreEls.section?.contains(target)) return;
      cb.close();
    };
    document.addEventListener('pointerdown', press, true);
    return () => document.removeEventListener('pointerdown', press, true);
  });

  let restTimer = 0;

  /** A mouse resting on a bar's ⋮ opens its menu without taking the focus, replacing one the other ⋮ opened; a touch opens it at its press. */
  function moreEnter(event, kind, index) {
    if (event.pointerType !== 'mouse' || event.buttons) return;
    overMore = kind;
    if (cb.menu?.editor === kind) return;
    clearTimeout(restTimer);
    restTimer = setTimeout(() => {
      if (overMore === kind && (!cb.menu || (cb.menu.rest && cb.menu.editor !== kind))) cb.press(kind, index, true);
    }, 180);
  }

  function moreLeave(event) {
    if (event.pointerType !== 'mouse') return;
    overMore = null;
    clearTimeout(restTimer);
  }

  /** A press on a ⋮: it opens its menu, holds one a rest opened, and closes one it opened. */
  function morePress(kind, index) {
    clearTimeout(restTimer);
    if (cb.menu?.editor === kind && !cb.menu.rest) cb.close();
    else cb.press(kind, index);
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

  /** A press on a bar leaves the focus where it is, on the page, so its keys go on working there. */
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

{#snippet tools(kind, list)}
  {#each list as tool, i (i)}
    {#if tool.tag}
      <span class="cb-tag" title={tool.tip || undefined}>{tool.text}</span>
    {:else if tool.more}
      <button type="button" class="cb-tool" aria-label={tool.label} aria-haspopup="menu" aria-expanded={cb.menu?.editor === kind} bind:this={moreEls[kind]}
        onpointerenter={(e) => moreEnter(e, kind, i)} onpointerleave={moreLeave} onclick={() => morePress(kind, i)}>{@html tool.html}</button>
    {:else}
      <button type="button" class="cb-tool" class:on={tool.pressed} class:danger={tool.danger} class:word={!tool.html} title={tool.tip || undefined} aria-label={tool.label}
        aria-pressed={tool.pressed === null ? undefined : tool.pressed} disabled={tool.disabled} data-opens-menu={tool.opensMenu ? '' : undefined} data-page-pop={tool.pagePop ? '' : undefined} onclick={() => cb.press(kind, i)}>{#if tool.html}{@html tool.html}{:else}{tool.text}{/if}</button>
    {/if}
  {/each}
{/snippet}

<!-- The bars hold the mouse's press so the page keeps the focus; their tools are buttons of their own -->
{#if sectionAt}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="canvas-bar" class:cb-off={!sectionPlace} role="toolbar" tabindex="-1" aria-label={ta('canvas.sectionTools')} aria-hidden={sectionPlace ? undefined : 'true'} inert={!sectionPlace} data-canvas-tool bind:offsetWidth={sw} bind:offsetHeight={sh}
    style="left: {sectionAt.left}px; top: {sectionAt.top}px" onmousedown={keepFocus} transition:menuMotion>
    <span class="cb-name" title={sectionName}>{sectionName}</span>
    {@render tools('section', cb.section.tools)}
  </div>
{/if}

{#if navPlace}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="canvas-bar cb-nav" role="toolbar" tabindex="-1" aria-label={ta('canvas.navTools')} data-canvas-tool bind:offsetWidth={nw} bind:offsetHeight={nh}
    style="left: {navPlace.left}px; top: {navPlace.top}px" onmousedown={keepFocus} transition:menuMotion>
    <span class="cb-nav-head">
      <span class="cb-name">{ta('canvas.navBarName')}</span>
      <button type="button" class="cb-tool" title={ta('canvas.navSettings')} aria-label={ta('canvas.navSettings')} onclick={navSettings}>{@html ICONS.gear}</button>
    </span>
    {#each navSteps as step (step.what)}
      <span class="cb-step" role="group" aria-label={step.name} title={step.name}>
        <span class="cb-step-mark" aria-hidden="true">{@html step.icon}</span>
        <button type="button" class="cb-tool" aria-label={ta('canvas.navSmaller', { name: step.name })} disabled={!phoneStep(ed.siteDraft.nav, step.what, -1)} onclick={() => navStep(step.what, -1)}>{@html ICONS.minus}</button>
        <span class="cb-step-value">{step.value}</span>
        <button type="button" class="cb-tool" aria-label={ta('canvas.navLarger', { name: step.name })} disabled={!phoneStep(ed.siteDraft.nav, step.what, 1)} onclick={() => navStep(step.what, 1)}>{@html ICONS.plus}</button>
      </span>
    {/each}
  </div>
{/if}

{#if blockAt}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="canvas-bar" class:cb-off={!blockPlace} role="toolbar" tabindex="-1" aria-label={ta(cb.block.set ? 'canvas.setTools' : 'canvas.blockTools')} aria-hidden={blockPlace ? undefined : 'true'} inert={!blockPlace} data-canvas-tool bind:offsetWidth={bw} bind:offsetHeight={bh}
    style="left: {blockAt.left}px; top: {blockAt.top}px" onmousedown={keepFocus} transition:menuMotion>
    <!-- A set's bar is named by its count, the first of its tools -->
    {#if blockName && !cb.block.set}<span class="cb-name" title={blockName}>{blockName}</span>{/if}
    {@render tools('block', cb.block.tools)}
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

  /* The section's link name, as its bar on the page shows it */
  .cb-tag {
    padding: 0 6px;
    font-weight: 500;
    opacity: 0.8;
  }

  /* A bar drawn unseen, kept for its measure (the bars in both places, where it stands over the page): it fades out and takes no pointer */
  .canvas-bar.cb-off {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }

  /* The menu's bar names what it is for, faint, beside its gear */
  .cb-name {
    padding: 0 6px 0 4px;
    font-weight: 600;
    opacity: 0.6;
  }

  /* The section's and the block's bars name what they act on in one line above the tools, cut short with an ellipsis */
  .canvas-bar > .cb-name {
    flex: 1 0 100%;
    box-sizing: border-box;
    contain: inline-size;
    padding: 2px 6px 3px;
    overflow: hidden;
    font-size: 11px;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.75;
  }

  /* The menu's bar: its name and its gear, then a size on each line, so it is narrow enough to stand beside the phone on a small window */
  .cb-nav {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
  }

  .cb-nav-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* A size on the menu's bar: its mark, a step down, its value in px and a step up */
  .cb-step {
    display: flex;
    align-items: center;
    gap: 2px;
    padding-left: 4px;
  }

  .cb-step-mark {
    margin-right: auto;
  }

  .cb-step-mark {
    display: inline-flex;
    opacity: 0.6;
  }

  .cb-step-value {
    min-width: 2ch;
    font-variant-numeric: tabular-nums;
    text-align: center;
  }

  .cb-tool:disabled {
    cursor: default;
    opacity: 0.35;
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
