<script>
  /* The block menu: all block settings in a floating menu next to the block
     (the calendar pattern; opened from the gear on the block's toolbar). The
     same ElementMenu as the Properties panel, so the two never diverge. Wide
     shows the three areas as columns, narrow as tabs; the admin setting
     chooses which a menu opens in. */
  import { getContext, onMount } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import { menu, menuIsWide } from './state.svelte.js';
  import ElementMenu from './ElementMenu.svelte';
  import SearchField from './SearchField.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  /** Where the menu stands, in editor coordinates, and what closes it. */
  let { pos, onclose } = $props();
  const { moveBlockMenu, menuBackToBlock } = ed;

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

<div class="block-menu" bind:this={rootEl} class:wide={menuIsWide()} class:dragging style="--menu-left: {pos.left}px; --menu-top: {pos.top}px; --menu-min: {menu.min}px">
  <header class="block-menu-head" title={ta('tip.menu.dragHead')} onpointerdown={dragHead}>
    <span class="block-menu-grip" aria-hidden="true">{@html GRIP_ICON}</span>
    <span class="block-menu-title">{ta('blocks.suffix', { label: ed.blockLabel(selectedBlock.type) })}</span>
    <SearchField get={() => menu.menuQuery} set={(v) => (menu.menuQuery = v)} />
    {#if menu.place}
      <button class="ghost row-tool" title={ta('menu.backToBlock')} aria-label={ta('menu.backToBlock')} onclick={menuBackToBlock}>{@html BACK_ICON}</button>
    {/if}
    <button class="ghost row-tool menu-width" title={menu.wide ? ta('menu.toNarrow') : ta('menu.toWide')} aria-label={menu.wide ? ta('menu.toNarrow') : ta('menu.toWide')}
      onclick={() => (menu.wide = !menu.wide)}>{@html menu.wide ? MENU_NARROW_ICON : MENU_WIDE_ICON}</button>
    <button class="ghost row-tool" title={ta('tip.closeEsc')} onclick={onclose}>{@html ICONS.cross}</button>
  </header>
  <div class="panel-body block-menu-body">
    <ElementMenu wide={menuIsWide()} query={menu.menuQuery} />
  </div>
</div>
