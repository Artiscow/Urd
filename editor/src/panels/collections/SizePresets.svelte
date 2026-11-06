<script>
  /* The Sizes label with «Presets» beside it, and the card of plain buttons and fields it opens, which adds a set of sizes in one press (lib/size-presets.js), each size once and in one undo step.
     The sets other products of the shop use, named by the product they come from; the common sets; and a numbered set whose wording the owner writes, where «#» stands for each number, with the sizes it gives shown before they are added.
     The card floats against the button, below it or above it where the window has no room below, so the panel's scroll never clips it (ADR-0011): a popover placed by CSS anchoring where the browser has it, else measured and placed fixed, as the dropdowns are (anchored.js). */
  import { lingering, menuMotion } from '../../lib/motion.svelte.js';
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { nativeAnchoring, anchorName } from '$engine/anchored.js';
  import { dismiss } from '../../lib/dismiss.js';
  import { COMMON_SETS, shopSizeSets, wordedSet, numberedSet, withSizes } from '../../lib/size-presets.js';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  let { id, entry, label, tip } = $props();
  const act = collectionActions(ed);

  const native = nativeAnchoring();
  const anchor = anchorName('urd-sp');
  const popId = anchor.slice(2);
  /** The card's width, which the measuring branch places by. */
  const CARD_W = 320;

  let open = $state(false);
  /** The sets stay drawn while the closing pop-up fades out (app.css). */
  const drawn = lingering(() => open);
  let opener = $state(null);
  let card = $state(null);
  let pos = $state({ top: 0, left: 0 });
  let numbers = $state('2, 4, 6');
  let wording = $state('');

  const shopSets = $derived(shopSizeSets(ed.collectionsView, entry.id, ed.plainTitle));
  const commonSets = $derived([...COMMON_SETS, wordedSet(ta('seed.sizeSetWords'))]);
  const numbered = $derived(numberedSet(numbers, wording));
  const CARET = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  function close() {
    if (native && card?.matches(':popover-open')) card.hidePopover();
    open = false;
  }

  /** The measuring branch: below the button where the card fits under it in the window, else above it, its right edge at the button's. */
  function place() {
    if (!opener) return;
    const r = opener.getBoundingClientRect();
    const h = card?.offsetHeight || 360;
    const below = r.bottom + h + 8 <= window.innerHeight;
    pos = {
      top: below ? r.bottom + 4 : Math.max(8, r.top - h - 4),
      left: Math.max(8, Math.min(r.right - CARD_W, window.innerWidth - CARD_W - 8)),
    };
  }

  /** The card opening: the numbered set's wording starts from the admin's own words for a pack, written once as seed text, and the first set takes the focus. */
  function opened() {
    if (!wording) wording = ta('seed.sizeSetPattern');
    open = true;
    tick().then(() => {
      if (!native) place();
      card?.querySelector('button')?.focus();
    });
  }

  function toggle() {
    if (open) close();
    else opened();
  }

  // The measuring branch follows the button while the panel scrolls, and a click in the preview (a window blur) closes the card in both branches.
  $effect(() => {
    if (!open) return;
    const onBlur = () => close();
    const onScroll = () => { if (!native) place(); };
    window.addEventListener('blur', onBlur);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('scroll', onScroll, true);
    };
  });

  function apply(sizes) {
    if (!sizes.length) return;
    act.setEntryField(id, entry.id, 'sizes', withSizes(entry.sizes, sizes));
    close();
    opener?.focus();
  }
</script>

{#snippet sets()}
  {#if shopSets.length}
    <span class="sp-head">{ta('collections.presetsInShop')}</span>
    {#each shopSets as set (set.sizes.join('|'))}
      <button type="button" class="sp-item" title={ta('tip.entry.sizePresets')} onclick={() => apply(set.sizes)}>
        <span class="sp-sizes">{set.sizes.join(', ')}</span><span class="sp-from">{set.from}</span></button>
    {/each}
    <hr />
  {/if}
  <span class="sp-head">{ta('collections.presetsCommon')}</span>
  {#each commonSets as set (set.join('|'))}
    <button type="button" class="sp-item" title={ta('tip.entry.sizePresets')} onclick={() => apply(set)}><span class="sp-sizes">{set.join(', ')}</span></button>
  {/each}
  <hr />
  <!-- The numbered set: the numbers and the owner's own wording, «#» standing for each number -->
  <span class="sp-head">{ta('collections.presetsNumbered')}</span>
  <span class="sp-fields">
    <label title={ta('tip.entry.presetNumbers')}>{ta('lbl.presetNumbers')}
      <input type="text" bind:value={numbers} inputmode="decimal" /></label>
    <label title={ta('tip.entry.presetWording')}>{ta('lbl.presetWording')}
      <input type="text" bind:value={wording} /></label>
  </span>
  {#if numbered.length}
    <span class="sp-preview" aria-live="polite">{#each numbered as size (size)}<span class="sp-chip">{size}</span>{/each}</span>
  {/if}
  <button type="button" class="sp-add" disabled={!numbered.length} onclick={() => apply(numbered)}>{ta('ui.addSizes', { n: String(numbered.length) })}</button>
{/snippet}

<span class="sp-row">
  <span class="nav-body-label" title={tip}>{label}</span>
  {#if native}
    <button type="button" class="sp-btn" bind:this={opener} aria-expanded={open} title={ta('tip.entry.sizePresets')} popovertarget={popId} style="anchor-name: {anchor}">{ta('ui.presets')}{@html CARET}</button>
  {:else}
    <button type="button" class="sp-btn" bind:this={opener} aria-expanded={open} title={ta('tip.entry.sizePresets')} onclick={toggle}>{ta('ui.presets')}{@html CARET}</button>
  {/if}
</span>
{#if native}
  <!-- The popover's light dismiss closes it on Escape and a press outside -->
  <!-- Escape closes it with the focus back on the button, as the measured card's dismiss does; a press outside is the popover's own light dismiss -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="sp-card sp-anchored" id={popId} popover="auto" role="group" aria-label={ta('ui.presets')} bind:this={card}
    style="position-anchor: {anchor}" ontoggle={(e) => { if (e.newState === 'open') opened(); else open = false; }}
    onkeydown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); opener?.focus(); } }}>
    {#if drawn.shown}{@render sets()}{/if}
  </div>
{:else if open}
  <div class="sp-card sp-fixed" role="group" aria-label={ta('ui.presets')} bind:this={card} use:dismiss={{ close, opener }} transition:menuMotion
    style="top: {pos.top}px; left: {pos.left}px">
    {@render sets()}
  </div>
{/if}

<style>
  .sp-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 4px;
  }

  .sp-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    height: 1.6rem;
    padding: 0 0.5rem;
    font: inherit;
    font-size: 0.75rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .sp-btn[aria-expanded='true'] {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .sp-card {
    display: grid;
    gap: 2px;
    box-sizing: border-box;
    width: 320px;
    max-height: calc(100vh - 16px);
    padding: 6px;
    overflow-y: auto;
    font-size: 0.85rem;
    color: var(--urd-color-text, #e8eaf0);
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 10px;
    box-shadow: 0 14px 40px rgb(0 0 0 / 55%);
  }

  .sp-fixed {
    position: fixed;
    z-index: 100003;
  }

  /* The anchored branch: the card under the button with its right edge at the button's, turned above the button by the browser where the window has no room below */
  @supports (anchor-name: --a) {
    .sp-anchored {
      inset: auto;
      margin: 4px 0;
      position-area: block-end span-inline-start;
    }

    .sp-anchored:not(:popover-open) {
      display: none;
    }

    @supports (position-try-fallbacks: flip-block) {
      .sp-anchored {
        position-try-fallbacks: flip-block;
      }
    }
  }

  .sp-card > .sp-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.4rem 0.6rem;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;
  }

  .sp-card > .sp-item:hover,
  .sp-card > .sp-item:focus-visible {
    background: rgb(255 255 255 / 8%);
    outline: none;
  }

  .sp-sizes {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .sp-from {
    flex: none;
    font-size: 0.72rem;
    opacity: 0.6;
  }

  .sp-head {
    padding: 0.35rem 0.6rem 0.1rem;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .sp-card hr {
    width: 100%;
    height: 1px;
    margin: 3px 0;
    border: 0;
    background: rgb(255 255 255 / 10%);
  }

  .sp-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    padding: 0 0.3rem;
  }

  .sp-fields label {
    display: grid;
    gap: 0.2rem;
    font-size: 0.72rem;
    opacity: 0.85;
  }

  .sp-fields input {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    height: 1.9rem;
    padding: 0 0.45rem;
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 6px;
  }

  .sp-fields input:focus {
    border-color: var(--urd-color-accent, #7c5cff);
    outline: none;
  }

  .sp-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 0.3rem 0.3rem 0;
  }

  .sp-chip {
    padding: 1px 8px;
    font-size: 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .sp-add {
    margin: 0.3rem 0.3rem 0.1rem;
    min-height: 1.9rem;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--urd-color-bg, #0f1218);
    cursor: pointer;
    background: var(--urd-color-accent, #7c5cff);
    border: 0;
    border-radius: 6px;
  }

  .sp-add:disabled {
    opacity: 0.45;
    cursor: default;
  }
</style>
