<script>
  /* One area of the element menu (Content, Style or Placement): its heading
     and the groups under it. Wide, the area is a column; narrow, the three
     areas stand under each other and the heading sticks to the top while the
     area scrolls, saying how many groups it holds and how many stand changed
     (the groups report in through the menu-area context). The Placement
     heading carries the «?» chip of the layout help. */
  import { setContext } from 'svelte';
  import { SvelteMap } from 'svelte/reactivity';
  import { ta } from '$engine/i18n.js';
  let { title, counts = false, chip = null, children } = $props();
  /** The groups in the area, each with a reader of whether it stands changed. */
  const groups = new SvelteMap();
  setContext('menu-area', {
    register: (id, changed) => groups.set(id, changed),
    unregister: (id) => groups.delete(id),
  });
  const total = $derived(groups.size);
  const changed = $derived([...groups.values()].filter((isChanged) => isChanged()).length);
</script>

<section class="emenu-col emenu-area">
  <header class="emenu-head">
    <span class="emenu-head-title"><span class="panel-strong">{title}</span>{#if chip}{@render chip()}{/if}</span>
    {#if counts && total}
      <span class="emenu-head-meta">{total === 1 ? ta('menu.areaGroups.one') : ta('menu.areaGroups.other', { n: total })}{#if changed} · {ta('menu.areaChanged', { n: changed })}{/if}</span>
    {/if}
  </header>
  {@render children()}
</section>
