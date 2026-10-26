<script>
  /* A collapsible group of the element menu: the title, the current value
     while closed, the controls inside. A group that differs from the defaults
     is handed its reset: it carries a mark, and the reset stands under its
     controls. In the search's copy of the menu a group opens where it holds a
     match, and what is kept open stays as it was left. A group that is the
     only one in its area starts open (defaultOpen): the heading is still a
     menu, but the settings are one step nearer. */
  import { setContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { menuOpen, menuSeen } from './state.svelte.js';
  /* `group` (groupOf in groups.js) carries the defaults as well as the reset,
     so the Setting rows inside can mark the block's own values (0.7.20.7). */
  let { id, title, value, reset = null, group = null, defaultOpen = false, children } = $props();
  if (defaultOpen && !menuSeen.has(id)) {
    menuSeen.add(id);
    menuOpen.add(id);
  }
  const groupReset = $derived(group ? group.reset : reset);
  setContext('menu-group', {
    own: (key) => Boolean(group?.own(key)),
    resetKey: (key) => group?.resetKey(key),
  });
</script>

<details class="group menu-group" open={menuOpen.has(id)}
  ontoggle={(e) => {
    if (e.currentTarget.closest('.emenu-search')) return;
    if (e.currentTarget.open) menuOpen.add(id); else menuOpen.delete(id);
  }}>
  <summary><span class="menu-group-title">{title}{#if groupReset}<i class="menu-group-dot" aria-hidden="true"></i>{/if}</span><span class="menu-group-value">{value}</span></summary>
  <div class="group-items">
    {@render children()}
    {#if groupReset}
      <button type="button" class="linkish menu-group-reset" onclick={groupReset}>{ta('menu.reset')}</button>
    {/if}
  </div>
</details>
