<script>
  /* The floating menu: a block's settings next to the block, from the gear on its bar, or a section's beside the section (`pos.section`, section/SectionMenu.svelte).
     The same menus as the Settings panel draws, so the two never diverge; the Urd settings' «Element menu» chooses the form a menu opens in (menu/state.svelte.js menuLayout), and «Shortcuts» set to the search puts the field over the menu's body instead of in its head.
     A tool of the bar opens it small, with one group alone (`pos.only`, lib/only-group.js) under the tool's drawing and name (`pos.icon`, `pos.title`), with no search and no width to switch.
     The small window's head holds the group's way back while the group holds a value of its own, offered by the group itself (Fold.svelte, Setting.svelte, lib/rows/Capability.svelte), and the way to the full menu, open at the same group. */
  import { menuMotion } from '../lib/motion.svelte.js';
  import { getContext, setContext, onMount } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { BAR_ICONS } from '$engine/bar-tools.js';
  import { ICONS } from '../lib/icons.js';
  import { historyState } from '../state/history.svelte.js';
  import { menu, menuLayout, MENU_WIDE_W } from './state.svelte.js';
  import ElementMenu from './ElementMenu.svelte';
  import CapabilityAdd from './CapabilityAdd.svelte';
  import BlockActions from './BlockActions.svelte';
  import SectionMenu from '../section/SectionMenu.svelte';
  import SearchField from '../lib/rows/SearchField.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  /** Where the menu stands, in editor coordinates; a press outside it or Escape closes it (state/shell.svelte.js). */
  let { pos } = $props();
  const { moveBlockMenu, menuBackToBlock } = ed;
  const layout = $derived(menuLayout());
  const only = $derived(pos.only ?? null);
  const searchFirst = $derived(!only && menu.shortcutsPref === 'search');
  /** The block's actions step down to a line of their own under the head where the search field stands in a narrow head with them. */
  const actionsBelow = $derived(!only && !searchFirst && layout !== 'wide');
  /** The small panel's name and drawing: the tool's own, as the bar sent them (the drawing by its name in the bar's own list). */
  const onlyTitle = $derived(pos.title ?? '');
  const onlyIcon = $derived(only && pos.icon ? (BAR_ICONS[pos.icon] ?? '') : '');
  /** The way back of the group the small window holds, while it holds a value of its own, kept with the group that offered it, which alone takes it back. */
  let headOffer = $state.raw(null);
  const headReset = $derived(headOffer?.fn ?? null);
  setContext('menu-head', {
    get only() { return only; },
    offer: (owner, fn) => {
      if (fn) headOffer = { owner, fn };
      else if (headOffer?.owner === owner) headOffer = null;
    },
    withdraw: (owner) => {
      if (headOffer?.owner === owner) headOffer = null;
    },
  });

  /* The head is the handle (0.7.20.6, proposal K): a press held on it and moved moves the whole menu, the place is kept for the session, and the button in the head puts the menu back beside the block.
     A press on a control in the head, or in the add list that opens from it, is that control's, never a drag. */
  let dragging = $state(false);
  /** The menu opens ready to type in: the focus goes to the search field, where 1, 2 and 3 still choose the areas. */
  let rootEl;
  onMount(() => rootEl?.querySelector('.menu-search')?.focus());
  /* A small panel is placed by its own size, not the full menu's: measured as each panel opens (`opened`, a number that changes only then) and as it grows or shrinks (fitSmallMenu in state/page.svelte.js). */
  const opened = $derived(pos.opened);
  $effect(() => {
    if (!only || !rootEl) return;
    void opened;
    let first = true;
    const observer = new ResizeObserver(() => {
      ed.fitSmallMenu({ w: rootEl.offsetWidth, h: rootEl.offsetHeight }, first);
      first = false;
    });
    observer.observe(rootEl);
    return () => observer.disconnect();
  });
  function dragHead(event) {
    if (event.button !== 0 || event.target.closest('button, input, label, .cap-pop')) return;
    event.preventDefault();
    const head = event.currentTarget;
    const box = head.closest('.block-menu');
    const size = { w: box.offsetWidth, h: box.offsetHeight };
    const start = { x: event.clientX, y: event.clientY, left: pos.left, top: pos.top };
    head.setPointerCapture(event.pointerId);
    dragging = true;
    const move = (e) => moveBlockMenu({ left: start.left + (e.clientX - start.x), top: start.top + (e.clientY - start.y) }, size);
    const end = () => {
      head.removeEventListener('pointermove', move);
      head.removeEventListener('pointerup', end);
      head.removeEventListener('pointercancel', end);
      dragging = false;
    };
    head.addEventListener('pointermove', move);
    head.addEventListener('pointerup', end);
    head.addEventListener('pointercancel', end);
  }
  const BACK_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>';
  const MENU_WIDE_ICON = '<svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4L2 9l4 5M12 4l4 5-4 5"/></svg>';
  const MENU_NARROW_ICON = '<svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4l4 5-4 5M16 4l-4 5 4 5"/></svg>';
</script>

<div class="block-menu" transition:menuMotion|global bind:this={rootEl} class:wide={!only && layout === 'wide'} class:small={Boolean(only)} class:dragging style="--menu-left: {pos.left}px; --menu-top: {pos.top}px; --menu-min: {menu.min}px{only && pos.h ? `; --menu-h: ${pos.h}px` : ''}{only && pos.w ? `; --menu-fit-w: ${pos.w}px` : ''}">
  <header class="block-menu-head" title={ta('tip.menu.dragHead')} onpointerdown={dragHead}>
    {#if onlyIcon}<span class="block-menu-icon" aria-hidden="true">{@html onlyIcon}</span>{/if}
    <span class="block-menu-title">{only ? onlyTitle : pos.section ? ta('lbl.section') : ta('blocks.suffix', { label: ed.blockLabel(selectedBlock.type) })}</span>
    <!-- The small window's way back for its group, and its way to the full menu at the same group -->
    {#if only && headReset}<IconButton class="menu-head-reset" icon={ICONS.reset} label={ta('menu.reset')} onclick={() => historyState.asOwnStep(headReset)} />{/if}
    {#if only}<IconButton class="menu-full" icon={ICONS.expand} label={ta('menu.openFull')} onclick={ed.openFullMenu} />{/if}
    {#if !only && !searchFirst}<SearchField get={() => menu.menuQuery} set={(v) => (menu.menuQuery = v)} />{/if}
    <!-- The block's actions at the right, where the head has room for them beside the search field (BlockActions.svelte) -->
    {#if !only && !pos.section && !actionsBelow}<BlockActions />{/if}
    <!-- What the block can take that it has not (ADR-0031), before the buttons: not in a small panel, a section's menu or a search, which draws every capability -->
    {#if !only && !pos.section && !menu.menuQuery.trim()}<CapabilityAdd />{/if}
    {#if menu.place}
      <IconButton icon={BACK_ICON} label={ta(pos.section ? 'menu.backToSection' : 'menu.backToBlock')} onclick={menuBackToBlock} />
    {/if}
    <!-- The head button follows the form drawn: from wide to the chosen form, and back to wide, also where the wide menu gave way to one column beside its block; where the window has no room for the wide form, it has nothing to switch and is not drawn -->
    {#if !only && menu.room >= MENU_WIDE_W}<IconButton class="menu-width" icon={layout === 'wide' ? MENU_NARROW_ICON : MENU_WIDE_ICON} label={layout === 'wide' ? ta(menu.formPref === 'tabs' ? 'menu.toTabs' : 'menu.toNarrow') : ta('menu.toWide')}
      onclick={() => { if (layout === 'wide') menu.wide = false; else if (menu.cramped) menu.cramped = false; else menu.wide = true; ed.placeMenuAgain(); }} />{/if}
  </header>
  {#if !only && !pos.section && actionsBelow}<div class="block-menu-actions"><BlockActions /></div>{/if}
  <div class="panel-body block-menu-body">
    {#if searchFirst}<div class="menu-search-first"><SearchField get={() => menu.menuQuery} set={(v) => (menu.menuQuery = v)} /></div>{/if}
    {#if pos.section}
      <SectionMenu wide={!only && layout === 'wide'} query={only ? '' : menu.menuQuery} {only} />
    {:else}
      <ElementMenu layout={only ? 'narrow' : layout} query={only ? '' : menu.menuQuery} {only} />
    {/if}
  </div>
</div>
