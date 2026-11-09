<script>
  /* The way to add a capability to the selected block (ADR-0031, menu/capabilities.js): the «+» in the menu's head, which lists every capability the block can take, under its area's name, each with its drawing and one line on what it does.
     Urd settings «The add list» draws them as a list, with what the block already has dimmed at its foot, or as tiles in two columns.
     A pick sets what the capability starts with (a switch it is), keeps its card on the block for the session, and gives the card the focus (lib/rows/Capability.svelte); with nothing left to add the «+» is not drawn.
     A capability whose settings all stand in Pinned is not offered, since Pinned holds it.
     The list stands in the top layer (the Popover API, ADR-0011), so no panel's edge clips it, placed under the «+» with its right edge at the «+»'s and kept inside the window; without the API it stands fixed in the same place. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS, CAP_ICONS } from '../lib/icons.js';
  import { dismiss } from '../lib/dismiss.js';
  import { menuMotion } from '../lib/motion.svelte.js';
  import { quickIds } from '../lib/quick-row.js';
  import { historyState } from '../state/history.svelte.js';
  import { CAPABILITIES, carries } from './capabilities.js';
  import { isAdded, keepCapability } from './capabilities.svelte.js';
  import { menu, quickChoice } from './state.svelte.js';
  const ed = getContext('urd-editor');
  const AREAS = ['content', 'style', 'placement'];
  const AREA_WORDS = { content: 'props.tabContent', style: 'props.tabStyle', placement: 'props.tabPlacement' };

  const block = $derived(ed.selectedBlock);
  /** Whether a capability's settings all stand in Pinned now, as the menu draws it. */
  function heldInPinned(cap) {
    if (!cap.pins.length || !(menu.shortcutsPref === 'pinned' || menu.shortcutsPref === 'tiles')) return false;
    const ids = quickIds(block.type, quickChoice(block.type), new Set(cap.pins));
    return cap.pins.every((pin) => ids.includes(pin));
  }
  /** What the block can take now, by area, in the catalogue's order. */
  const offered = $derived.by(() => {
    if (!block) return [];
    const caps = CAPABILITIES.filter((cap) => carries(cap, block, ed) && !cap.inUse(block, ed) && !isAdded(block.blockId, cap.id) && !heldInPinned(cap));
    return AREAS.map((area) => [area, caps.filter((cap) => cap.area === area)]).filter(([, list]) => list.length);
  });
  /** What the block has already, for the list's foot, so the whole set is seen. */
  const taken = $derived(block ? CAPABILITIES.filter((cap) => carries(cap, block, ed) && (cap.inUse(block, ed) || isAdded(block.blockId, cap.id)) && !heldInPinned(cap)) : []);
  const tiles = $derived(menu.capListPref === 'tiles');
  let open = $state(false);
  let opener = $state(null);
  let pop = $state(null);

  async function toggle() {
    open = !open;
    if (!open) return;
    await tick();
    pop?.querySelector('button')?.focus();
  }

  function keys(event) {
    const items = [...(pop?.querySelectorAll('button') ?? [])];
    const at = items.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      items[(at + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
    }
  }

  /** The list in the top layer, under the «+», kept inside the window as the window changes. */
  function placePop(node) {
    if (typeof node.showPopover === 'function') node.showPopover();
    const place = () => {
      const r = opener.getBoundingClientRect();
      const w = node.offsetWidth;
      const top = r.bottom + 4;
      node.style.left = `${Math.max(8, Math.min(r.right - w, window.innerWidth - w - 8))}px`;
      node.style.top = `${top}px`;
      node.style.maxHeight = `min(64vh, 30rem, ${Math.max(160, window.innerHeight - top - 8)}px)`;
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }

  /** A capability taken: what it starts with, its card kept on the block, and its area in view where the menu shows one area at a time. */
  function pick(cap) {
    const taken = block;
    open = false;
    if (cap.add) historyState.asOwnStep(() => cap.add(ed, taken));
    if (menu.tab !== cap.area) menu.tab = cap.area;
    keepCapability(taken.blockId, cap.id, { fresh: true });
  }
</script>

{#if offered.length}
  <span class="cap-add-wrap">
    <button type="button" class="icon-btn cap-add-head" bind:this={opener} aria-expanded={open}
      title={ta('cap.add')} aria-label={ta('cap.add')} onclick={toggle}>{@html ICONS.plus}</button>
    {#if open}
      <!-- An empty title, so the head's tooltip does not reach into the list -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="cap-pop" class:cap-tiles={tiles} popover="manual" title="" role="group" aria-label={ta('cap.add')} bind:this={pop} use:dismiss={{ close: () => (open = false), opener }} onkeydown={keys} {@attach placePop} transition:menuMotion>
        <p class="cap-pop-title">{ta('cap.add')}</p>
        {#each offered as [area, list] (area)}
          <p class="mini-label">{ta(AREA_WORDS[area])}</p>
          <div class="cap-opts" role="group" aria-label={ta(AREA_WORDS[area])}>
            {#each list as cap (cap.id)}
              <button type="button" class="cap-opt" data-cap-add={cap.id} onclick={() => pick(cap)}>
                <span class="cap-tile" aria-hidden="true">{@html CAP_ICONS[cap.icon] ?? ''}</span>
                <span class="cap-opt-words"><span class="cap-opt-name">{ta(`cap.${cap.id}`)}</span><span class="cap-opt-about">{ta(`cap.about.${cap.id}`)}</span></span>
              </button>
            {/each}
          </div>
        {/each}
        {#if !tiles && taken.length}
          <!-- What the block has already, dimmed, so the whole set is seen -->
          <p class="mini-label">{ta('cap.taken')}</p>
          {#each taken as cap (cap.id)}
            <span class="cap-opt cap-opt-taken">
              <span class="cap-tile" aria-hidden="true">{@html CAP_ICONS[cap.icon] ?? ''}</span>
              <span class="cap-opt-words"><span class="cap-opt-name">{ta(`cap.${cap.id}`)}</span></span>
            </span>
          {/each}
        {/if}
      </div>
    {/if}
  </span>
{/if}
