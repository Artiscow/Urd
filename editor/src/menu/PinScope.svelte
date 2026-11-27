<script>
  /* The settings in the element menu's Pinned rows, told to the rows inside (lib/rows/Setting.svelte), so a pinned setting is drawn once. */
  import { setContext } from 'svelte';
  /** `away` returns the ids drawn in Pinned now; `pins` is false where no Pinned rows are drawn, so the pins beside the settings step aside. */
  let { away, pins = true, children } = $props();
  setContext('menu-pinned', () => away());
  setContext('menu-pins-shown', () => pins);
</script>

{@render children()}
