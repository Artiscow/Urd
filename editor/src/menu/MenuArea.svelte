<script>
  /* One area of the element menu (Content, Style or Placement): its heading and the groups under it.
     Wide, the areas pour through two columns with the heading where its area starts; narrow, the three areas stand under each other and the heading sticks to the top while the area scrolls, saying how many groups it holds (the groups report in through the menu-area context). */
  import { setContext } from 'svelte';
  import { SvelteMap } from 'svelte/reactivity';
  import { ta } from '$engine/i18n.js';
  /** `area` names the area ('content', 'style' or 'placement') for the keys that reach it and the split of the wide menu. */
  let { area, title, counts = false, children } = $props();
  /** The groups in the area, by their ids. */
  const groups = new SvelteMap();
  /** The name this area's folds share while they open one at a time: one of its own, so another copy of the menu standing at the same time (the Settings panel beside the floating menu) is never in the same group. */
  const uid = Math.random().toString(36).slice(2, 8);
  setContext('menu-area', {
    get area() { return area; },
    get group() { return `menu-${area}-${uid}`; },
    register: (id) => groups.set(id, true),
    unregister: (id) => groups.delete(id),
  });
  const total = $derived(groups.size);
</script>

<section class="emenu-col emenu-area" data-area={area}>
  <header class="emenu-head">
    <span class="emenu-head-title"><span class="emenu-head-name">{title}</span></span>
    {#if counts && total}
      <span class="emenu-head-meta">{total === 1 ? ta('menu.areaGroups.one') : ta('menu.areaGroups.other', { n: total })}</span>
    {/if}
  </header>
  {@render children()}
</section>
