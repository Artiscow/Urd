<script>
  /* The element menu's search field: in the floating menu's head and over the
     menu in the Properties panel. It narrows the menu to the settings whose
     label or tooltip holds the words. Escape empties a field with words in
     it; in an empty field it goes on and closes the menu. The dimmed / at the
     field's end is the key that brings the focus here (ElementMenu's keys),
     shown while the field is empty. */
  import { ta } from '$engine/i18n.js';
  import { chooseArea, MENU_AREAS } from './state.svelte.js';
  let { get, set } = $props();

  /** Escape empties a field with words; 1, 2 and 3 in an empty field choose the area, so the keys work the moment a menu opens with the focus here. */
  function keys(e) {
    if (e.key === 'Escape' && get()) { e.stopPropagation(); set(''); return; }
    if (!get() && ['1', '2', '3'].includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      chooseArea(MENU_AREAS[Number(e.key) - 1], e.currentTarget.closest('.block-menu') ?? e.currentTarget.closest('.panel-body'));
    }
  }
</script>

<span class="menu-search-wrap" class:filled={Boolean(get())}>
  <input type="search" class="menu-search" placeholder={ta('menu.search')} aria-label={ta('menu.search')} title={ta('tip.menu.search')}
    bind:value={get, set}
    onkeydown={keys} />
  <span class="menu-search-key" aria-hidden="true">/</span>
</span>
