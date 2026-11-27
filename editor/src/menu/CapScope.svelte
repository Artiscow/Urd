<script>
  /* Where the element menu draws every capability as a card (ADR-0031): the search's copy, and a tool's small panel. */
  import { setContext } from 'svelte';
  /** `forced` tells, by a capability's id, whether its card stands here whatever the block holds. */
  let { forced, children } = $props();
  setContext('menu-capabilities', { forced: (id) => forced(id) });
</script>

{@render children()}
