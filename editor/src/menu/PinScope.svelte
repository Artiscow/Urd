<script>
  /* The settings that stand in the element menu's Pinned rows, told to the rows inside (lib/rows/Setting.svelte), so a pinned setting is drawn once: in Pinned at the top, not again in its own area (0.7.30.3).
     The search's copy of the menu has none, so a setting is found where it belongs. */
  import { setContext } from 'svelte';
  /** `away` returns the ids of the settings drawn in Pinned now. */
  let { away, children } = $props();
  setContext('menu-pinned', () => away());
</script>

{@render children()}
