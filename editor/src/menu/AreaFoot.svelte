<script>
  /* An area's own closing control, drawn at the foot of its area above the add list; outside an area it stands where it is written. */
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
