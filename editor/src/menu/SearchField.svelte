<script>
  /* The element menu's search field: in the floating menu's head and over the
     menu in the Properties panel. It narrows the menu to the settings whose
     label or tooltip holds the words. Escape empties a field with words in
     it; in an empty field it goes on and closes the menu. */
  import { ta } from '$engine/i18n.js';
  let { get, set } = $props();
</script>

<input type="search" class="menu-search" placeholder={ta('menu.search')} aria-label={ta('menu.search')} title={ta('tip.menu.search')}
  bind:value={get, set}
  onkeydown={(e) => { if (e.key === 'Escape' && get()) { e.stopPropagation(); set(''); } }} />
