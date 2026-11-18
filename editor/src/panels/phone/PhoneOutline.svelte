<script>
  /* The page as it reads on the phone, in the Phone panel's column at the stage's right edge (PhoneDock.svelte): every section under a heading of its own, with its blocks in their order (PhoneOrder.svelte), as an image editor lists its layers in their groups.
     Every section stands open at first, its arrow saying so; a fold is kept for the session (lib/folds.svelte.js), and the button in the column's head folds or opens them all.
     A press on a heading folds or opens its section, and the mouse on a heading lights its section on the canvas. The heading of the section at work, picked on the canvas or in the panel, is marked, ringed in boxes and filled in the two other looks, and carries the gear that opens the section's settings, which the other headings show under the pointer, and always on a screen without one. A section flagged for a look on the phone carries the mark the top bar counts, also while folded.
     Urd settings «Column look» (lib/phone-panel.js) draws it as a table, the standard, flat, or in boxes; the looks differ in how the headings and the rows are drawn, never in what they do.
     The column follows what is selected, never the page's scroll: a block selected on the canvas opens its section and brings its row into view, and a section picked there brings its heading into view. The heading of the section in sight stays at the column's top while its rows scroll. */
  import { getContext, onDestroy, tick, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { sectionWords } from '$engine/anchor-model.js';
  import { folds } from '../../lib/folds.svelte.js';
  import { rowMotion } from '../../lib/motion.svelte.js';
  import { ICONS } from '../../lib/icons.js';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import EmptyState from '../../lib/rows/EmptyState.svelte';
  import PhoneOrder from './PhoneOrder.svelte';
  const ed = getContext('urd-editor');
  /** `onfold` folds the column to its tab. */
  let { onfold } = $props();
  /** The folds' surface in the store of what stands open. */
  const SURFACE = 'phone-outline';

  /** The open page's sections, read again after every change, every undo and every page loaded, since the page's data is no state of its own: each with its place on the page, its first words, its count of blocks and whether it waits for a look on the phone. */
  const sections = $derived.by(() => {
    void ed.pageId;
    void ed.edits;
    void ed.restores;
    void ed.attentionCount;
    return ed.sections.map((s, i) => ({ id: s.id, n: i + 1, words: sectionWords(s), count: s.blocks.length, review: s.responsive?.mobile?.attention?.needed === true }));
  });
  // Before the headings are drawn, so a section is drawn open on its first showing; afterwards it is left as the owner leaves it.
  $effect.pre(() => {
    for (const s of sections) folds.openOnce(SURFACE, s.id);
  });
  const isOpen = (id) => folds.isOpen(SURFACE, id);
  const allOpen = $derived(sections.length > 0 && sections.every((s) => isOpen(s.id)));
  function toggleAll() {
    const open = !allOpen;
    for (const s of sections) folds.set(SURFACE, s.id, open);
  }

  /** The heading under the mouse, whose section stands lit on the canvas. */
  let lit = null;
  /** The section a heading stands for, lit on the canvas while the mouse is on the heading. */
  function light(e, id) {
    if (e.pointerType !== 'mouse') return;
    lit = id;
    ed.bridge?.sendLight([], id);
  }
  function unlight() {
    lit = null;
    ed.bridge?.sendLight([]);
  }
  /** A heading pressed: its section folds or opens, and its light, which the folded list's going takes away, stands again while the mouse stays. */
  async function toggle(id) {
    folds.set(SURFACE, id, !isOpen(id));
    await tick();
    if (lit === id) ed.bridge?.sendLight([], id);
  }
  // The light goes with the column.
  onDestroy(() => ed.bridge?.sendLight([]));

  let scroller = $state(null);
  /** The block selected on the canvas and the section it stands in, by their ids alone, so a change to the block's own settings moves nothing here. */
  const selectedId = $derived(ed.selectedBlock?.blockId ?? null);
  const selectedIn = $derived(ed.selectedBlock?.sectionId ?? null);
  const atWork = $derived(ed.activeSectionId);
  /** The selected block's row brought into view where it stands in the section at work, else that section's heading. */
  function reveal() {
    const blockId = selectedId && selectedIn === atWork ? selectedId : null;
    if (!atWork) return;
    const target = blockId
      ? scroller?.querySelector(`[data-block-id="${CSS.escape(blockId)}"]`)
      : scroller?.querySelector(`[data-section-head="${CSS.escape(atWork)}"]`);
    target?.scrollIntoView({ block: 'nearest' });
  }
  /** The section the selection opened, whose rows are brought into view again once they stand at their full height. */
  let opening = null;
  // The column follows the selection: the selected block's section opened and its row brought into view, else the heading of the section at work.
  $effect(() => {
    const blockId = selectedId && selectedIn === atWork ? selectedId : null;
    const sectionId = atWork;
    if (!sectionId) return;
    untrack(() => {
      if (!blockId || isOpen(sectionId)) return;
      folds.set(SURFACE, sectionId, true);
      opening = sectionId;
    });
    tick().then(reveal);
  });
  function opened(id) {
    if (opening !== id) return;
    opening = null;
    reveal();
  }
</script>

<div class="pc-head">
  <h2>{ta('lbl.phoneBlocks')}</h2>
  <span class="pc-tools">
    {#if sections.length > 1}
      <button type="button" class="fold-all fold-toggle" class:collapse={allOpen} title={ta(allOpen ? 'phone.foldAll' : 'phone.openAll')} aria-label={ta(allOpen ? 'phone.foldAll' : 'phone.openAll')} onclick={toggleAll}>{@html ICONS.foldToggle}</button>
    {/if}
    <button type="button" class="pc-away" title={ta('phone.dockFold')} aria-label={ta('phone.dockFold')} onclick={onfold}>{@html ICONS.foldRight}</button>
  </span>
</div>
<div class="pc-scroll" class:pc-table={ed.phoneColumnPref === 'table'} class:pc-flat={ed.phoneColumnPref === 'flat'} bind:this={scroller}>
  {#each sections as s (s.id)}
    {@const open = isOpen(s.id)}
    <!-- A section's heading and rows in a box of their own, which the heading sticks inside while its rows scroll -->
    <div class="pc-group">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="pc-sec" class:pc-at={s.id === atWork} data-section-head={s.id} onpointerenter={(e) => light(e, s.id)} onpointerleave={unlight}>
      <button type="button" class="pc-name" title={s.words || undefined} aria-expanded={open} aria-current={s.id === atWork ? 'true' : undefined} onclick={() => toggle(s.id)}>
        <span class="pc-chev" aria-hidden="true">{@html open ? ICONS.chevronDown : ICONS.chevronRight}</span>
        {#if s.words}<span class="pc-n">{s.n}</span><span class="pc-words">{s.words}</span>{:else}<span class="pc-words">{ta('diff.section', { n: s.n })}</span>{/if}
      </button>
      {#if !open}<span class="pc-count" aria-hidden="true">{s.count}</span><span class="sr-only">{ta('phone.blocks', { n: s.count })}</span>{/if}
      {#if s.review}<span class="pc-review" role="img" title={ta('phone.needsReview')} aria-label={ta('phone.needsReview')}>{@html ICONS.phone}</span>{/if}
      <!-- The gear opens the section's menu and closes it at a second press, as the gear on the section's bar does -->
      <span class="pc-gear" data-opens-menu><IconButton size="sm" quiet icon={ICONS.gear} label={ta('phone.sectionSettings')} onclick={() => ed.bridge?.sendSectionSettings(s.id)} /></span>
    </div>
    {#if open}
      <div class="pc-rows" transition:rowMotion onintroend={() => opened(s.id)}><PhoneOrder sectionId={s.id} /></div>
    {/if}
    </div>
  {:else}
    <EmptyState text={ta('phone.noSection')} />
  {/each}
</div>

<style>
  .pc-head {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.9rem 0.9rem 0.7rem;
  }

  .pc-head h2 {
    margin: 0;
    font-size: 0.95rem;
  }

  .pc-tools {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .pc-away {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.55rem;
    padding: 0;
    line-height: 0;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;
    opacity: 0.7;
  }

  .pc-away:hover,
  .pc-away:focus-visible {
    background: rgb(255 255 255 / 8%);
    opacity: 1;
  }

  /* The list scrolls under the column's head, the headings sticking at its top */
  .pc-scroll {
    flex: 1;
    min-height: 0;
    padding: 0 0.6rem 0.9rem 0.9rem;
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }

  /* A section's heading: its fold, its name, and what it carries; on the column's own surface, so the rows scroll under it. As written here it is the look in boxes, which the two other looks draw over below.
     The headings and the room between them are whole pixels in steps of four, so every heading and every gap is drawn alike at the common screen scalings. */
  .pc-sec {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.15rem;
    box-sizing: border-box;
    height: 36px;
    padding: 0 0.2rem;
    background: color-mix(in srgb, var(--urd-color-text, #e8eaf0) 7%, var(--urd-color-surface, #151a23));
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 7px;
  }

  .pc-group + .pc-group {
    margin-top: 4px;
  }

  /* The section at work */
  .pc-sec.pc-at {
    border-color: var(--urd-color-accent);
  }

  /* The arrow says whether the section stands open; a press on the heading's name, its arrow and number included, folds or opens it */
  .pc-chev {
    display: grid;
    flex: none;
    place-items: center;
    width: 1.3rem;
    opacity: 0.6;
    pointer-events: none;
  }

  .pc-name {
    display: flex;
    flex: 1;
    align-items: baseline;
    justify-content: flex-start;
    gap: 0.4rem;
    min-width: 0;
    padding: 0.35rem 0.15rem;
    font: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 5px;
  }

  /* The name draws no box of its own, nor the admin's button fill under the pointer: the pointer and the keyboard's focus light the whole heading, evenly from edge to edge (the ::before below) */
  .pc-sec > .pc-name:not(:disabled),
  .pc-sec > .pc-name:hover:not(:disabled) {
    align-self: stretch;
    align-items: center;
    background: transparent;
    border-color: transparent;
    outline: none;
  }

  .pc-sec::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: currentColor;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s ease;
  }

  .pc-sec:has(> .pc-name:hover)::before {
    opacity: 0.06;
  }

  .pc-sec:has(> .pc-name:focus-visible) {
    outline: 2px solid var(--urd-color-accent);
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .pc-sec::before {
      transition: none;
    }
  }

  .pc-n,
  .pc-count {
    flex: none;
    font-size: 0.72rem;
    font-weight: 400;
    font-variant-numeric: tabular-nums;
    opacity: 0.6;
  }

  .pc-count {
    padding: 0 0.25rem;
  }

  /* The name on one line, ending in an ellipsis where it is longer than the heading; its tooltip says it whole */
  .pc-words {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* A section that waits for a look on the phone, in the colour of the top bar's count */
  .pc-review {
    display: grid;
    flex: none;
    place-items: center;
    width: 1.3rem;
    color: #e2b84a;
  }

  /* The gear of a section that is not at work is out of reach as well as out of sight, so a press where it would stand opens nothing */
  .pc-gear {
    display: flex;
    flex: none;
    visibility: hidden;
  }

  .pc-sec.pc-at .pc-gear,
  .pc-sec:hover .pc-gear {
    visibility: visible;
  }

  @media (hover: none) {
    .pc-gear {
      visibility: visible;
    }
  }

  .pc-rows {
    padding: 4px 0 0 8px;
  }

  /* The table: each heading a band from the column's one edge to its other, a hairline between two of them, and the rows lines with a fainter hairline over each; nothing is rounded and nothing has room around it.
     The scrollbar takes its room only while the list scrolls, so the bands reach the edge. */
  .pc-scroll.pc-table {
    padding: 0 0 0.9rem;
    scrollbar-gutter: auto;
  }

  .pc-table .pc-group + .pc-group {
    margin-top: 0;
  }

  .pc-table .pc-sec {
    padding: 0 0.5rem 0 0.6rem;
    border: 0;
    border-radius: 0;
  }

  .pc-table .pc-group + .pc-group .pc-sec {
    box-shadow: inset 0 1px 0 color-mix(in srgb, currentColor 14%, transparent);
  }

  .pc-table .pc-sec.pc-at {
    background: color-mix(in srgb, var(--urd-color-accent) 24%, var(--urd-color-surface, #151a23));
  }

  .pc-table .pc-rows {
    padding: 0;
  }

  .pc-table :global(:is(.pp-list, .pp-lists)),
  .pc-flat :global(:is(.pp-list, .pp-lists)) {
    gap: 0;
  }

  .pc-table :global(.pp-order),
  .pc-flat :global(.pp-order) {
    padding-bottom: 0;
  }

  .pc-table :global(.pp-row) {
    padding-left: 1.2rem;
    background: transparent;
    border-radius: 0;
    box-shadow: inset 0 1px 0 color-mix(in srgb, currentColor 7%, transparent);
  }

  .pc-table :global(.pp-row.pp-stack-head) {
    background: color-mix(in srgb, var(--urd-color-accent) 8%, transparent);
  }

  /* A stack's block keeps its step in, and its line the column's whole width */
  .pc-table :global(.pp-row.pp-member) {
    margin-left: 0;
    padding-left: 2.5rem;
    background: color-mix(in srgb, var(--urd-color-accent) 5%, transparent);
  }

  .pc-table :global(.pp-row:hover),
  .pc-flat :global(.pp-row:hover) {
    background: color-mix(in srgb, var(--urd-color-accent) 10%, transparent);
  }

  .pc-table :global(.pp-row.pp-hovered) {
    background: color-mix(in srgb, var(--urd-color-accent) 16%, transparent);
  }

  /* The selected block: a fill across the whole width */
  .pc-table :global(.pp-row.pp-selected) {
    background: color-mix(in srgb, var(--urd-color-accent) 26%, transparent);
  }

  /* Flat: a heading is a line of bold words and a row a plain line, as the layers of an image editor, with one hairline between two sections; the section at work and the selected block are fills in the accent. */
  .pc-flat .pc-group + .pc-group {
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent);
  }

  .pc-flat .pc-sec {
    height: 32px;
    background: var(--urd-color-surface, #151a23);
    border: 0;
    border-radius: 6px;
  }

  .pc-flat .pc-sec.pc-at {
    background: color-mix(in srgb, var(--urd-color-accent) 20%, var(--urd-color-surface, #151a23));
  }

  .pc-flat .pc-rows {
    padding: 0 0 4px 16px;
  }

  .pc-flat :global(.pp-row) {
    min-height: 28px;
    background: transparent;
    border-radius: 6px;
  }

  .pc-flat :global(.pp-row.pp-hovered) {
    background: color-mix(in srgb, var(--urd-color-accent) 16%, transparent);
    box-shadow: none;
  }

  .pc-flat :global(.pp-row.pp-selected) {
    background: color-mix(in srgb, var(--urd-color-accent) 26%, transparent);
    box-shadow: none;
  }

  /* The row a dragged row would join keeps its fill in both looks */
  .pc-table :global(.pp-row.drop-target),
  .pc-flat :global(.pp-row.drop-target) {
    background: color-mix(in srgb, var(--urd-color-accent) 18%, transparent);
  }
</style>
