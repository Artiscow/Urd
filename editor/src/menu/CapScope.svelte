<script>
  /* Where the element menu draws every capability as a card (ADR-0031, lib/rows/Capability.svelte): the search's copy, so a setting is found where it stands, and a tool's small panel, for the capability the tool opens whether the block uses it or not. */
  import { setContext } from 'svelte';
  /** `forced` tells, by a capability's id, whether its card stands here whatever the block holds. */
  let { forced, children } = $props();
  setContext('menu-capabilities', { forced: (id) => forced(id) });
</script>

{@render children()}
