<script>
  /* The floating menu: a block's settings next to the block, from the gear on its bar, or a section's beside the section (`pos.section`, section/SectionMenu.svelte).
     The same menus as the Settings panel draws, so the two never diverge; the Urd settings' «Element menu» chooses the form a menu opens in (menu/state.svelte.js menuLayout), and «Shortcuts» set to the search puts the field over the menu's body instead of in its head.
     A tool of the bar opens it small, with one group alone (`pos.only`, lib/only-group.js) under the tool's name (`pos.title`), with no search and no width to switch. */
  import { menuMotion } from '../lib/motion.svelte.js';
  import { getContext, onMount } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import { menu, menuLayout, MENU_WIDE_W } from './state.svelte.js';
  import ElementMenu from './ElementMenu.svelte';
  import SectionMenu from '../section/SectionMenu.svelte';
  import SearchField from '../lib/rows/SearchField.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  /** Where the menu stands, in editor coordinates, and what closes it. */
  let { pos, onclose } = $props();
  const { moveBlockMenu, menuBackToBlock } = ed;
  const layout = $derived(menuLayout());
  const only = $derived(pos.only ?? null);
  const searchFirst = $derived(!only && menu.shortcutsPref === 'search');
  /** The small panel's name: the tool's own, as the bar sent it. */
  const onlyTitle = $derived(pos.title ?? '');

  /* The head is the handle (0.7.20.6, proposal K): a drag moves the whole
     menu, the place is kept for the session, and the button in the head
     puts the menu back beside the block. A press on a control in the head
     is that control's, never a drag. */
  let dragging = $state(false);
  /** The menu opens ready to type in: the focus goes to the search field, where 1, 2 and 3 still choose the areas. */
  let rootEl;
  onMount(() => rootEl?.querySelector('.menu-search')?.focus());
  function dragHead(event) {
    if (event.button !== 0 || event.target.closest('button, input, label')) return;
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
  const GRIP_ICON = '<svg width="10" height="16" viewBox="0 0 12 18" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.6"/><circle cx="9" cy="3" r="1.6"/><circle cx="3" cy="9" r="1.6"/><circle cx="9" cy="9" r="1.6"/><circle cx="3" cy="15" r="1.6"/><circle cx="9" cy="15" r="1.6"/></svg>';
  const BACK_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>';
  const MENU_WIDE_ICON = '<svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4L2 9l4 5M12 4l4 5-4 5"/></svg>';
  const MENU_NARROW_ICON = '<svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4l4 5-4 5M16 4l-4 5 4 5"/></svg>';
</script>

<div class="block-menu" transition:menuMotion|global bind:this={rootEl} class:wide={!only && layout === 'wide'} class:small={Boolean(only)} class:dragging style="--menu-left: {pos.left}px; --menu-top: {pos.top}px; --menu-min: {menu.min}px">
  <header class="block-menu-head" title={ta('tip.menu.dragHead')} onpointerdown={dragHead}>
    <span class="block-menu-grip" aria-hidden="true">{@html GRIP_ICON}</span>
    <span class="block-menu-title">{only ? onlyTitle : pos.section ? ta('lbl.section') : ta('blocks.suffix', { label: ed.blockLabel(selectedBlock.type) })}</span>
    {#if !only && !searchFirst}<SearchField get={() => menu.menuQuery} set={(v) => (menu.menuQuery = v)} />{/if}
    {#if menu.place}
      <IconButton icon={BACK_ICON} label={ta(pos.section ? 'menu.backToSection' : 'menu.backToBlock')} onclick={menuBackToBlock} />
    {/if}
    <!-- The head button follows the form drawn: from wide to the chosen form, and back to wide, also where the wide menu gave way to one column beside its block; where the window has no room for the wide form, it has nothing to switch and is not drawn -->
    {#if !only && menu.room >= MENU_WIDE_W}<IconButton class="menu-width" icon={layout === 'wide' ? MENU_NARROW_ICON : MENU_WIDE_ICON} label={layout === 'wide' ? ta(menu.formPref === 'tabs' ? 'menu.toTabs' : 'menu.toNarrow') : ta('menu.toWide')}
      onclick={() => { if (layout === 'wide') menu.wide = false; else if (menu.cramped) menu.cramped = false; else menu.wide = true; }} />{/if}
    <IconButton icon={ICONS.cross} label={ta('tip.closeEsc')} onclick={onclose} />
  </header>
  <div class="panel-body block-menu-body">
    {#if searchFirst}<div class="menu-search-first"><SearchField get={() => menu.menuQuery} set={(v) => (menu.menuQuery = v)} /></div>{/if}
    {#if pos.section}
      <SectionMenu wide={!only && layout === 'wide'} query={only ? '' : menu.menuQuery} {only} />
    {:else}
      <ElementMenu layout={only ? 'narrow' : layout} query={only ? '' : menu.menuQuery} {only} />
    {/if}
  </div>
</div>
