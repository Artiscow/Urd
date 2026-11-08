<script>
  /* The search field of the row kit: in the element menu's head and over the menu in the Properties panel, where it narrows the menu to the settings whose label or tooltip holds the words, and over a panel's list (the Blocks panel's palette).
     Escape empties a field with words in it; in an empty field it goes on and closes the menu. The dimmed / at the field's end is the key that brings the focus to the menu's field (ElementMenu's keys), shown while the field is empty.
     `menu={false}` is a panel's field: it names itself with `label`, and has neither the / mark nor the area keys. */
  import { ta } from '$engine/i18n.js';
  import { chooseArea, MENU_AREAS } from '../../menu/state.svelte.js';
  let { get, set, menu = true, label = undefined, title = undefined } = $props();

  /** Escape empties a field with words; Enter in a field with words moves the focus to the first setting the words left standing; 1, 2 and 3 in an empty field choose the area, so the keys work the moment a menu opens with the focus here. */
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
