<script>
  /* The settings that stand in the element menu's Pinned rows, told to the rows inside (lib/rows/Setting.svelte), so a pinned setting is drawn once: in Pinned at the top, not again in its own area (0.7.30.3).
     The search's copy of the menu has none, so a setting is found where it belongs. */
  import { setContext } from 'svelte';
  /** `away` returns the ids of the settings drawn in Pinned now; `pins` is false where no Pinned rows are drawn at all («Top of the menu» as the search or the chips), so the pins beside the settings step aside. */
  let { away, pins = true, children } = $props();
  setContext('menu-pinned', () => away());
  setContext('menu-pins-shown', () => pins);
</script>

{@render children()}
