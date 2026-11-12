<script>
  /* The way to add a capability to the selected block (ADR-0031, menu/capabilities.js), in the form Urd settings «Adding extras» chooses (`menu.capAddPref`); each form is drawn where it stands and only while it is the one chosen.
     `head` is the «+» in the menu's head (B5), which lists every capability the block can take, under its area's name, each with its drawing and one line on what it does.
     `button` is one dashed «+ Add to Style» at the foot of an area (`area`, B2), which opens the same list of that area's capabilities; `chips` names that area's capabilities as dashed chips at its foot (B1), each added at a press, its line in its tooltip.
     `folded` names them as one quiet line of «+ Name» at the area's foot (B3), with the cards folding (lib/rows/Capability.svelte); `icons` draws each of the area's capabilities in the area's heading (B4), in a box of the admin's accent, dashed while the block does not use it and lit while it does: a press on a dashed one adds it, on a lit one brings its card into view.
     Urd settings «The add list» draws a list as a list, with what the block already has dimmed at its foot, or as tiles in two columns.
     A pick sets what the capability starts with (a switch it is), keeps its card on the block for the session, and gives the card the focus (lib/rows/Capability.svelte); with nothing left to add the «+» is not drawn.
     A capability whose settings all stand in Pinned is not offered, since Pinned holds it.
     The list stands in the top layer (the Popover API, ADR-0011), so no panel's edge clips it, placed under the «+» with its right edge at the «+»'s and kept inside the window; without the API it stands fixed in the same place.
     The «+» opens the list at a press, and under a mouse as the pointer rests on it or on the list, closing a moment after the pointer leaves both; a touch is no hover (AGENTS.md, hybrid devices). As a menu that opens on hover, the «+» has its name for a screen reader and no tooltip, its empty title keeping the head's own from reaching it. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS, CAP_ICONS } from '../lib/icons.js';
  import { dismiss } from '../lib/dismiss.js';
  import { menuMotion } from '../lib/motion.svelte.js';
  import { quickIds } from '../lib/quick-row.js';
  import { historyState } from '../state/history.svelte.js';
  import { CAPABILITIES, carries } from './capabilities.js';
  import { isAdded, keepCapability } from './capabilities.svelte.js';
  import { folds } from '../lib/folds.svelte.js';
  import { menu, quickChoice } from './state.svelte.js';
  const ed = getContext('urd-editor');
  /** The form this copy draws, and for the forms at an area's foot, the area. */
  let { form = 'head', area = null } = $props();
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
  /** What the block has already, for the list's foot, so the whole set is seen. */
  const taken = $derived(block && shown ? CAPABILITIES.filter((cap) => areas.includes(cap.area) && carries(cap, block, ed) && (cap.inUse(block, ed) || isAdded(block.blockId, cap.id)) && !heldInPinned(cap)) : []);
  /** Every capability of the area the block can carry, lit where it uses it or took it, for the drawings in the area's heading. */
  const all = $derived(block && shown && form === 'icons'
    ? CAPABILITIES.filter((cap) => cap.area === area && carries(cap, block, ed) && !heldInPinned(cap)).map((cap) => [cap, cap.inUse(block, ed) || isAdded(block.blockId, cap.id)])
    : []);
  /** A lit drawing's card, in the copy of the menu the drawing stands in, brought into view with the focus on its first setting (never its bin), at once under reduced motion. */
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

  /** A press on the «+» opens the list with the focus on its first capability, or brings the focus into a list the mouse opened; a press on the «+» closes a list a press opened. */
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

  /** The list in the top layer, under the «+» with its right edge at the «+»'s, or under an area's add button as wide as the button and so as its area, kept inside the window as the window changes.
      Where the window has more room above its opener than below and the list does not fit below, it opens upward; a list that fits neither way whole scrolls in the larger room. */
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
{:else if offered.length && form === 'folded'}
  <!-- What this area can take, as one quiet line of names, each added at a press -->
  <div class="cap-names" role="group" aria-label={addWords}>
    {#each offered[0][1] as cap (cap.id)}
      <button type="button" class="cap-add-name" data-cap-add={cap.id} title={ta(`cap.about.${cap.id}`)} onclick={() => pick(cap)}>{@html ICONS.plus}<span>{ta(`cap.${cap.id}`)}</span></button>
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
