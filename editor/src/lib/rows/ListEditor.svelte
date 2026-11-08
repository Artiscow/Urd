<script>
  /* A list whose rows are moved, removed and added, in the row kit (0.7.30.2): a row is pressed, held and dragged anywhere outside its fields (the row kit's drag, row-drag.svelte.js, the grip its sign), Alt and the arrow keys move the row the focus is in, a cross removes it, and the add button stands at the list's foot.
     `row` draws a row's own fields; `card(item, i)` gives the dragged row's card (its name, detail and sign), read from the row's first field without it; `key` gives each row a lasting key, so a row keeps the focus while it moves; `onmove(from, to)` gets the row's index before and after the move. */
  import { tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../icons.js';
  import IconButton from './IconButton.svelte';
  import { reorderRows } from '../row-drag.js';
  import { RowDrag, slotOut } from './row-drag.svelte.js';
  let { items, row, label, key = (item, i) => item?.id ?? i, card = null, onmove, onremove = undefined, onadd = undefined, addLabel = '' } = $props();

  let listEl = $state();
  /** The drag, the row kit's own (row-drag.svelte.js): the rows go by their index, so the landed row's id is its new index. */
  const drag = new RowDrag((from, at) => {
    const order = reorderRows(items.map((_, i) => String(i)), (id) => id, from, at);
    const to = order.indexOf(from);
    if (to !== Number(from)) onmove(Number(from), to);
    return String(to);
  }, (id) => (card ? card(items[Number(id)], Number(id)) : null));

  /** Alt and an arrow move the row the focus is in; the focus follows it, to the same field in the row's new place. */
  async function moveKeys(e, i) {
    if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    const to = i + (e.key === 'ArrowUp' ? -1 : 1);
    if (to < 0 || to >= items.length) return;
    e.preventDefault();
    const at = [...e.currentTarget.querySelectorAll(FOCUSABLE)].indexOf(document.activeElement);
    onmove(i, to);
    await tick();
    const row = listEl?.querySelectorAll(':scope > .row-list-item')[to];
    const fields = [...(row?.querySelectorAll(FOCUSABLE) ?? [])];
    (fields[at] ?? fields[0])?.focus();
    drag.landed(String(to));
  }
  const FOCUSABLE = 'input, select, textarea, button, [tabindex="0"]';

  const GRIP = '<svg width="10" height="16" viewBox="0 0 12 18" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.6"/><circle cx="9" cy="3" r="1.6"/><circle cx="3" cy="9" r="1.6"/><circle cx="9" cy="9" r="1.6"/><circle cx="3" cy="15" r="1.6"/><circle cx="9" cy="15" r="1.6"/></svg>';
</script>

{#snippet slot()}<div class="row-drag-slot" {@attach drag.slot} out:slotOut></div>{/snippet}

<div class="row-list" role="list" aria-label={label} bind:this={listEl} {@attach drag.list}>
  {#each items as item, i (key(item, i))}
    {#if drag.at(i, 'before')}{@render slot()}{/if}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div class="row-list-item" data-drag-id={i} role="listitem" aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown" {@attach drag.handle(i)} onkeydown={(e) => moveKeys(e, i)}>
      <span class="row-list-grip" title={ta('tip.list.move')} aria-hidden="true">{@html GRIP}</span>
      <div class="row-list-body">{@render row(item, i)}</div>
      {#if onremove}
        <IconButton icon={ICONS.cross} label={ta('ui.remove')} onclick={() => onremove(i)} />
      {/if}
    </div>
    {#if drag.at(i, 'after')}{@render slot()}{/if}
  {/each}
  {#if onadd}
    <!-- The button draws its own plus, so the words go without theirs -->
    <button type="button" class="ghost action row-list-add" onclick={onadd}>{@html ICONS.plus}{addLabel.replace(/^\+\s*/, '')}</button>
  {/if}
</div>

<style>
  .row-list {
    display: grid;
    gap: 6px;
  }

  /* A row's grip and cross stand beside its first line, so they stay by a row that grows open under it (a background's layer) */
  .row-list-item {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    min-width: 0;
    border-radius: 6px;
  }

  .row-list-grip {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 1rem;
    height: 2.2rem;
    opacity: 0.5;
    cursor: grab;
  }

  .row-list-grip:hover {
    opacity: 0.9;
  }

  .row-list-body {
    flex: 1;
    min-width: 0;
  }

  .row-list-add {
    gap: 0.4rem;
  }
</style>
