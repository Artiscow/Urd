<script>
  /* One area of the element menu (Content, Style or Placement): its heading, its groups, the cards added to it, its closing controls and its add list. */
  import { setContext } from 'svelte';
  import { SvelteMap } from 'svelte/reactivity';
  import { ta } from '$engine/i18n.js';
  import CapabilityAdd from './CapabilityAdd.svelte';
  import Capability from '../lib/rows/Capability.svelte';
  import { rowMotion } from '../lib/motion.svelte.js';
  import { menu } from './state.svelte.js';
  /** `area` names the area ('content', 'style' or 'placement') for the keys that reach it and the split of the wide menu. */
  let { area, title, counts = false, adds = false, children } = $props();
  /** The groups in the area, by their ids. */
  const groups = new SvelteMap();
  /** The cards added from the add list, by the capability's id: its place among them, its group and its settings, as the family writes them. */
  const placed = new SvelteMap();
  /** The area's own closing controls, each a snippet. */
  const feet = new SvelteMap();
  /** The name this area's folds share while they open one at a time, its own to each copy of the menu. */
  const uid = Math.random().toString(36).slice(2, 8);
  setContext('menu-area', {
    get area() { return area; },
    get group() { return `menu-${area}-${uid}`; },
    register: (id) => groups.set(id, true),
    unregister: (id) => groups.delete(id),
    place: (id, card) => placed.set(id, card),
    unplace: (id) => placed.delete(id),
    foot: (key, snippet) => feet.set(key, snippet),
    unfoot: (key) => feet.delete(key),
  });
  const total = $derived(groups.size);
  const placedCards = $derived([...placed].sort(([, a], [, b]) => a.at - b.at));
  /** Whether the column of names at the foot draws the added cards (Urd settings «Adding extras» on folded cards). */
  const inColumn = $derived(adds && menu.capAddPref === 'folded');
</script>

<section class="emenu-col emenu-area" data-area={area}>
  <header class="emenu-head">
    <span class="emenu-head-title"><span class="emenu-head-name">{title}</span></span>
    {#if adds}<CapabilityAdd form="icons" {area} />{/if}
    {#if counts && total}
      <span class="emenu-head-meta">{total === 1 ? ta('menu.areaGroups.one') : ta('menu.areaGroups.other', { n: total })}</span>
    {/if}
  </header>
  {@render children()}
  {#if !inColumn}
    {#each placedCards as [id, card] (id)}
      <!-- The card slides in as it is added and out as it is taken away -->
      <div class="cap-placed" transition:rowMotion><Capability {id} group={card.group} children={card.children} atFoot /></div>
    {/each}
  {/if}
  {#each [...feet.values()] as foot}{@render foot()}{/each}
  {#if adds}
    <CapabilityAdd form="chips" {area} />
    <CapabilityAdd form="button" {area} />
    <CapabilityAdd form="folded" {area} cards={placed} />
  {/if}
</section>
