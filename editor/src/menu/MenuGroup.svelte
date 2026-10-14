<script>
  /* A collapsible group of the element menu: the title, the current value
     while closed, the controls inside. A group that differs from the defaults
     is handed its reset: it carries a mark, and the reset stands under its
     controls. In the search's copy of the menu a group opens where it holds a
     match, and what is kept open stays as it was left. */
  import { ta } from '$engine/i18n.js';
  import { menuOpen } from './state.svelte.js';
  let { id, title, value, reset = null, children } = $props();
</script>

<details class="group menu-group" open={menuOpen.has(id)}
  ontoggle={(e) => {
    if (e.currentTarget.closest('.emenu-search')) return;
    if (e.currentTarget.open) menuOpen.add(id); else menuOpen.delete(id);
  }}>
  <summary>{#if reset}<i class="menu-group-dot" aria-hidden="true"></i>{/if}<span class="menu-group-title">{title}</span><span class="menu-group-value">{value}</span></summary>
  <div class="group-items">
    {@render children()}
    {#if reset}
      <button type="button" class="linkish menu-group-reset" onclick={reset}>{ta('menu.reset')}</button>
    {/if}
  </div>
</details>
