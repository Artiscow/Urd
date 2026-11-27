<script>
  /* Adds a capability to the selected block (ADR-0031) in the form «Adding extras» chooses: the head's «+», a button, chips, a column or icons. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS, CAP_ICONS } from '../lib/icons.js';
  import { dismiss } from '../lib/dismiss.js';
  import { menuMotion, rowMotion } from '../lib/motion.svelte.js';
  import Capability from '../lib/rows/Capability.svelte';
  import { quickIds } from '../lib/quick-row.js';
  import { historyState } from '../state/history.svelte.js';
  import { CAPABILITIES, carries } from './capabilities.js';
  import { isAdded, keepCapability } from './capabilities.svelte.js';
  import { folds } from '../lib/folds.svelte.js';
  import { menu, quickChoice } from './state.svelte.js';
  const ed = getContext('urd-editor');
  /** The form this copy draws, the area for the forms in an area, and `cards`, the cards added from the area's foot this session by capability id. */
  let { form = 'head', area = null, cards = null } = $props();
  const AREAS = ['content', 'style', 'placement'];
  const AREA_WORDS = { content: 'props.tabContent', style: 'props.tabStyle', placement: 'props.tabPlacement' };

  const block = $derived(ed.selectedBlock);
  /** Whether a capability's settings all stand in Pinned now, as the menu draws it. */
  function heldInPinned(cap) {
    if (!cap.pins.length || !(menu.shortcutsPref === 'pinned' || menu.shortcutsPref === 'tiles')) return false;
    const ids = quickIds(block.type, quickChoice(block.type), new Set(cap.pins));
    return cap.pins.every((pin) => ids.includes(pin));
  }
  /** Whether this form is the one chosen, so this copy draws. */
  const shown = $derived(menu.capAddPref === form);
  /** The areas this copy offers: every area from the head, its own at an area's foot. */
  const areas = $derived(area ? [area] : AREAS);
  /** What the block can take now, by area, in the catalogue's order. */
  const offered = $derived.by(() => {
    if (!block || !shown) return [];
    const caps = CAPABILITIES.filter((cap) => carries(cap, block, ed) && !cap.inUse(block, ed) && !isAdded(block.blockId, cap.id) && !heldInPinned(cap));
    return areas.map((one) => [one, caps.filter((cap) => cap.area === one)]).filter(([, list]) => list.length);
  });
  /** The folded column: each capability of the area in the catalogue's order, as its name while offered, or as its card where it was added here. */
  const column = $derived.by(() => {
    if (form !== 'folded' || !area || !block || !shown) return [];
    const named = new Set((offered[0]?.[1] ?? []).map((cap) => cap.id));
    return CAPABILITIES.filter((cap) => cap.area === area && (named.has(cap.id) || cards?.has(cap.id))).map((cap) => [cap, cards?.get(cap.id) ?? null]);
  });
  /** What the block has already, for the list's foot, so the whole set is seen. */
  const taken = $derived(block && shown ? CAPABILITIES.filter((cap) => areas.includes(cap.area) && carries(cap, block, ed) && (cap.inUse(block, ed) || isAdded(block.blockId, cap.id)) && !heldInPinned(cap)) : []);
  /** Every capability of the area the block can carry, lit where it uses it or took it, for the drawings in the area's heading. */
  const all = $derived(block && shown && form === 'icons'
    ? CAPABILITIES.filter((cap) => cap.area === area && carries(cap, block, ed) && !heldInPinned(cap)).map((cap) => [cap, cap.inUse(block, ed) || isAdded(block.blockId, cap.id)])
    : []);
  /** A lit drawing's card, brought into view with the focus on its first setting (never its bin), at once under reduced motion. */
  function toCard(cap, event) {
    const home = event.currentTarget.closest('.block-menu, aside.panel') ?? document;
    const card = home.querySelector(`.emenu-area [data-cap="${cap.id}"]`);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    card?.scrollIntoView({ block: 'nearest', behavior: still ? 'auto' : 'smooth' });
    (card?.querySelector('.cap-body :is(input, button, select, textarea, [tabindex="0"])') ?? card?.querySelector('.cap-chip, .cap-fold'))?.focus({ preventScroll: true });
  }
  /** The words of an area's add button and list: «Add to Style». */
  const addWords = $derived(area ? ta('cap.addTo', { area: ta(AREA_WORDS[area]) }) : ta('cap.add'));
  const tiles = $derived(menu.capListPref === 'tiles');
  let open = $state(false);
  let opener = $state(null);
  let pop = $state(null);

  let hoverTimer = null;
  let openedByHover = false;
  // A timer still running as the «+» goes away does nothing.
  $effect(() => () => clearTimeout(hoverTimer));
  function hoverIn(event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer);
    if (open) return;
    hoverTimer = setTimeout(() => {
      if (!offered.length) return;
      open = true;
      openedByHover = true;
    }, 120);
  }
  function hoverOut(event) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer);
    if (!openedByHover) return;
    hoverTimer = setTimeout(() => {
      if (pop?.contains(document.activeElement)) return;
      open = false;
      openedByHover = false;
    }, 250);
  }

  /** A press on the «+» opens the list, its first capability focused, or focuses a list the mouse opened; a press closes a list a press opened. */
  async function toggle() {
    clearTimeout(hoverTimer);
    if (open && !openedByHover) {
      open = false;
      return;
    }
    open = true;
    openedByHover = false;
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

  /** The list in the top layer under its opener, kept inside the window; it opens upward when it does not fit below and there is more room above. */
  function placePop(node) {
    if (typeof node.showPopover === 'function') node.showPopover();
    const place = () => {
      const r = opener.getBoundingClientRect();
      if (form === 'button') node.style.width = `${r.width}px`;
      const w = node.offsetWidth;
      const left = form === 'head' ? r.right - w : r.left;
      node.style.left = `${Math.max(8, Math.min(left, window.innerWidth - w - 8))}px`;
      // The list's own height, at most what its style allows, before the room decides where it stands; it is never taller than its style allows, nor than the room.
      node.style.maxHeight = '';
      const wanted = node.offsetHeight;
      const below = window.innerHeight - r.bottom - 12;
      const above = r.top - 12;
      const up = wanted > below && above > below;
      const room = Math.max(120, up ? above : below);
      node.style.maxHeight = `min(64vh, 30rem, ${room}px)`;
      node.style.top = `${up ? r.top - 4 - node.offsetHeight : r.bottom + 4}px`;
    };
    place();
    // The opener can move under a list that stays open: the window changes, or the menu it stands in scrolls (an area's add button).
    const away = (event) => { if (!node.contains(event.target)) place(); };
    window.addEventListener('resize', place);
    window.addEventListener('scroll', away, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', away, true);
    };
  }

  /** A capability taken: what it starts with, its card kept on the block, and its area in view where the menu shows one area at a time. */
  function pick(cap) {
    const taken = block;
    open = false;
    openedByHover = false;
    if (cap.add) historyState.asOwnStep(() => cap.add(ed, taken));
    if (menu.tab !== cap.area) menu.tab = cap.area;
    // A card added stands open, also where the cards fold.
    folds.set('cap-folded', cap.id, false);
    keepCapability(taken.blockId, cap.id, { fresh: true });
  }
</script>

{#snippet list()}
  <!-- An empty title, so the head's tooltip does not reach into the list -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="cap-pop" class:cap-tiles={tiles} popover="manual" title="" role="group" aria-label={addWords} bind:this={pop} use:dismiss={{ close: () => { open = false; openedByHover = false; }, opener }} onkeydown={keys} onpointerenter={hoverIn} onpointerleave={hoverOut} {@attach placePop} transition:menuMotion>
    <p class="cap-pop-title">{addWords}</p>
    {#each offered as [one, caps] (one)}
      {#if !area}<p class="mini-label">{ta(AREA_WORDS[one])}</p>{/if}
      <div class="cap-opts" role="group" aria-label={ta(AREA_WORDS[one])}>
        {#each caps as cap (cap.id)}
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
{/snippet}

{#if offered.length && form === 'head'}
  <span class="cap-add-wrap">
    <button type="button" class="icon-btn cap-add-head" bind:this={opener} aria-expanded={open}
      title="" aria-label={ta('cap.add')} onclick={toggle} onpointerenter={hoverIn} onpointerleave={hoverOut}>{@html ICONS.plus}</button>
    {#if open}{@render list()}{/if}
  </span>
{:else if offered.length && form === 'button'}
  <!-- One dashed line at the area's foot that opens the list of what this area can take -->
  <div class="cap-add-line">
    <button type="button" class="cap-add-btn" bind:this={opener} aria-expanded={open}
      onclick={toggle} onpointerenter={hoverIn} onpointerleave={hoverOut}>{@html ICONS.plus}<span>{addWords}</span></button>
    {#if open}{@render list()}{/if}
  </div>
{:else if column.length && form === 'folded'}
  <!-- What this area can take, as a quiet column of names, each added at a press and standing as its card in its name's place -->
  <div class="cap-names">
    {#each column as [cap, card] (cap.id)}
      {#if card}
        <div class="cap-placed" transition:rowMotion><Capability id={cap.id} group={card.group} children={card.children} atFoot /></div>
      {:else}
        <button type="button" class="cap-add-name" data-cap-add={cap.id} title={ta(`cap.about.${cap.id}`)} aria-label={ta('cap.addNamed', { name: ta(`cap.${cap.id}`) })} onclick={() => pick(cap)}>{@html ICONS.plus}<span>{ta(`cap.${cap.id}`)}</span></button>
      {/if}
    {/each}
  </div>
{:else if all.length && form === 'icons'}
  <!-- Each capability of the area as its drawing in the heading: dashed until the block uses it, lit while it does -->
  <span class="cap-icons" role="group" aria-label={addWords}>
    {#each all as [cap, lit] (cap.id)}
      <button type="button" class="cap-icon-btn" class:lit data-cap-add={lit ? undefined : cap.id}
        title={lit ? ta(`cap.${cap.id}`) : `${ta('cap.addNamed', { name: ta(`cap.${cap.id}`) })}: ${ta(`cap.about.${cap.id}`)}`}
        aria-label={lit ? ta('cap.goTo', { name: ta(`cap.${cap.id}`) }) : ta('cap.addNamed', { name: ta(`cap.${cap.id}`) })}
        onclick={(e) => (lit ? toCard(cap, e) : pick(cap))}>{@html CAP_ICONS[cap.icon] ?? ''}</button>
    {/each}
  </span>
{:else if offered.length && form === 'chips'}
  <!-- What this area can take, named, each added at a press -->
  <div class="cap-adds">
    <p class="mini-label">{ta('cap.add')}</p>
    <div class="cap-chips" role="group" aria-label={addWords}>
      {#each offered[0][1] as cap (cap.id)}
        <button type="button" class="cap-add-chip" data-cap-add={cap.id} title={ta(`cap.about.${cap.id}`)} onclick={() => pick(cap)}>{@html ICONS.plus}<span>{ta(`cap.${cap.id}`)}</span></button>
      {/each}
    </div>
  </div>
{/if}
