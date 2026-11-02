<script>
  /* The bar for the selected entries, under the search: the cross that clears the selection, how many are selected and how many the search hides, Duplicate, and Delete apart at the right.
     What else acts on the selection (set a field, move, copy, export) stands in the collection's ⋮ menu (CollectionMenu.svelte), greyed there while none is selected.
     Each change is one undo step, offered again as «Undo» in the status line (state/collections.svelte.js). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { hiddenTicks } from '../../lib/collection-bulk.js';

  const ed = getContext('urd-editor');
  let { id, ticks, shownIds, onticks } = $props();

  const hidden = $derived(hiddenTicks(ticks, shownIds));

  function duplicate() {
    const copies = ed.duplicateEntries(id, ticks);
    onticks(copies);
  }

  function remove() {
    ed.removeEntries(id, ticks);
    onticks([]);
  }
</script>

<div class="sb">
  <button type="button" class="sb-icon" title={ta('tip.collections.clearTicks')} aria-label={ta('tip.collections.clearTicks')} onclick={() => onticks([])}>{@html ICONS.cross}</button>
  <span class="sb-count" aria-live="polite">
    <span>{ta('collections.ticked', { n: String(ticks.length) })}</span>
    {#if hidden}<span class="sb-hidden">{ta('collections.tickedHidden', { n: String(hidden) })}</span>{/if}
  </span>
  <button type="button" class="sb-icon" title={ta('tip.collections.duplicateTicked')} aria-label={ta('tip.collections.duplicateTicked')} onclick={duplicate}>{@html ICONS.copy}</button>
  <span class="sb-divider" aria-hidden="true"></span>
  <button type="button" class="sb-icon sb-danger" title={ta('tip.collections.deleteTicked')} aria-label={ta('tip.collections.deleteTicked')} onclick={remove}>{@html ICONS.cross}</button>
</div>

<style>
  .sb {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.35rem 0.3rem 0.25rem;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 14%, transparent);
    border: 1px solid var(--urd-color-accent, #7c5cff);
    border-radius: 8px;
  }

  .sb-count {
    display: grid;
    flex: 1;
    min-width: 0;
    font-size: 0.82rem;
    line-height: 1.2;
  }

  .sb-hidden {
    font-size: 0.72rem;
    opacity: 0.75;
  }

  .sb-icon {
    display: inline-grid;
    flex: none;
    place-items: center;
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .sb > .sb-icon:first-child {
    border-color: transparent;
  }

  .sb-danger {
    color: #f08a8a;
    border-color: rgb(224 82 82 / 50%);
  }

  .sb-divider {
    flex: none;
    width: 1px;
    height: 1.2rem;
    background: rgb(255 255 255 / 20%);
  }
</style>
