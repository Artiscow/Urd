<script>
  /* An area's own closing control (the calendar's «Reset texts»): drawn at the foot of its area, under the cards added from the add list and above the add list (MenuArea.svelte), so the eye, the Tab key and a screen reader meet it in the same place.
     Outside an area it stands where it is written. */
  import { getContext } from 'svelte';
  let { children } = $props();
  const area = getContext('menu-area');
  const key = Symbol('area-foot');
  $effect(() => {
    if (!area?.foot) return;
    area.foot(key, children);
    return () => area.unfoot(key);
  });
</script>

{#if !area?.foot}{@render children()}{/if}
