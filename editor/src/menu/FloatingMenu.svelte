<script>
  /* The block menu: all block settings in a floating menu next to the block
     (the calendar pattern; opened from the gear on the block's toolbar). The
     same ElementMenu as the Properties panel, so the two never diverge. Wide
     shows the three areas as columns, narrow as tabs; the admin setting
     chooses which a menu opens in. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import { menu, menuIsWide } from './state.svelte.js';
  import ElementMenu from './ElementMenu.svelte';
  import SearchField from './SearchField.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  /** Where the menu stands, in editor coordinates, and what closes it. */
  let { pos, onclose } = $props();
  const MENU_WIDE_ICON = '<svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4L2 9l4 5M12 4l4 5-4 5"/></svg>';
  const MENU_NARROW_ICON = '<svg viewBox="0 0 18 18" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4l4 5-4 5M16 4l-4 5 4 5"/></svg>';
</script>

<div class="block-menu" class:wide={menuIsWide()} style="--menu-left: {pos.left}px; --menu-top: {pos.top}px; --menu-min: {menu.min}px">
  <header class="block-menu-head">
    <span class="block-menu-title">{ta('blocks.suffix', { label: ed.blockLabel(selectedBlock.type) })}</span>
    <SearchField get={() => menu.menuQuery} set={(v) => (menu.menuQuery = v)} />
    <button class="ghost row-tool menu-width" title={menu.wide ? ta('menu.toNarrow') : ta('menu.toWide')} aria-label={menu.wide ? ta('menu.toNarrow') : ta('menu.toWide')}
      onclick={() => (menu.wide = !menu.wide)}>{@html menu.wide ? MENU_NARROW_ICON : MENU_WIDE_ICON}</button>
    <button class="ghost row-tool" title={ta('tip.closeEsc')} onclick={onclose}>{@html ICONS.cross}</button>
  </header>
  <div class="panel-body block-menu-body">
    <ElementMenu wide={menuIsWide()} query={menu.menuQuery} />
  </div>
</div>
