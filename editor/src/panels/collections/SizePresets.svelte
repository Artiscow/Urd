<script>
  /* The Sizes label with «Presets» beside it, and under them, while open, a card of plain buttons and fields in the form's flow that adds a set of sizes in one press (lib/size-presets.js), each size once and in one undo step.
     The sets other products of the shop use, named by the product they come from; the common sets; and a numbered set whose wording the owner writes, where «#» stands for each number, with the sizes it gives shown before they are added. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { dismiss } from '../../lib/dismiss.js';
  import { COMMON_SETS, shopSizeSets, wordedSet, numberedSet, withSizes } from '../../lib/size-presets.js';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  let { id, entry, label, tip } = $props();
  const act = collectionActions(ed);

  let open = $state(false);
  let opener = $state(null);
  let card = $state(null);
  let numbers = $state('2, 4, 6');
  let wording = $state('');

  const shopSets = $derived(shopSizeSets(ed.collectionsView, entry.id, ed.plainTitle));
  const commonSets = $derived([...COMMON_SETS, wordedSet(ta('seed.sizeSetWords'))]);
  const numbered = $derived(numberedSet(numbers, wording));
  const CARET = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  function close() {
    open = false;
  }

  function toggle() {
    if (open) { close(); return; }
    // The numbered set's wording starts from the admin's own words for a pack, written once as seed text.
    if (!wording) wording = ta('seed.sizeSetPattern');
    open = true;
    tick().then(() => card?.querySelector('button')?.focus());
  }

  function apply(sizes) {
    if (!sizes.length) return;
    act.setEntryField(id, entry.id, 'sizes', withSizes(entry.sizes, sizes));
    close();
    opener?.focus();
  }
</script>

<span class="sp-row">
  <span class="nav-body-label" title={tip}>{label}</span>
  <button type="button" class="sp-btn" bind:this={opener} aria-expanded={open} title={ta('tip.entry.sizePresets')} onclick={toggle}>{ta('ui.presets')}{@html CARET}</button>
</span>
{#if open}
  <div class="sp-card" role="group" aria-label={ta('ui.presets')} bind:this={card} use:dismiss={{ close, opener }}>
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
    padding: 6px;
    font-size: 0.85rem;
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 10px;
    box-shadow: 0 14px 40px rgb(0 0 0 / 55%);
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
