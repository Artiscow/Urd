<script>
  /* The row kit's search field, narrowing a menu or a panel's list to what holds the words; `menu={false}` is a panel's field, named by `label`. */
  import { ta } from '$engine/i18n.js';
  import { chooseArea, MENU_AREAS } from '../../menu/state.svelte.js';
  let { get, set, menu = true, label = undefined, title = undefined } = $props();

  /** Escape empties the field; Enter goes to the first setting the words leave; 1, 2 and 3 in an empty field choose the area. */
  function keys(e) {
    if (e.key === 'Escape' && get()) { e.stopPropagation(); set(''); return; }
    if (e.key === 'Enter' && get()) {
      e.preventDefault();
      const root = e.currentTarget.closest('.block-menu') ?? e.currentTarget.closest('.panel-body');
      const field = e.currentTarget;
      const next = [...(root?.querySelectorAll('input, button, textarea, [tabindex="0"]') ?? [])]
        .find((el) => el !== field && el.offsetParent !== null && !el.disabled && (field.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING));
      next?.focus();
      return;
    }
    if (menu && !get() && ['1', '2', '3'].includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      chooseArea(MENU_AREAS[Number(e.key) - 1], e.currentTarget.closest('.block-menu') ?? e.currentTarget.closest('.panel-body'));
    }
  }
</script>

<span class="menu-search-wrap" class:filled={Boolean(get())}>
  <input type="search" class="menu-search" placeholder={label ?? ta('menu.search')} aria-label={label ?? ta('menu.search')} title={title ?? (menu ? ta('tip.menu.search') : undefined)}
    bind:value={get, set}
    onkeydown={keys} />
  {#if menu}<span class="menu-search-key" aria-hidden="true">/</span>{/if}
</span>
