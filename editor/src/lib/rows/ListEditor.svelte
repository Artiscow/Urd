<script>
  /* A list whose rows are moved, removed and added, in the row kit (0.7.30.2): a grip on each row to drag it by, Alt and the arrow keys to move the row the focus is in, a cross to remove it, and the add button at the list's foot.
     `row` draws a row's own fields; `key` gives each row a lasting key, so a row keeps the focus while it moves; `onmove(from, to)` gets the row's index before and after the move. */
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../icons.js';
  import IconButton from './IconButton.svelte';
  import { rowDropAt, reorderRows } from '../row-drag.js';
  let { items, row, label, key = (item, i) => item?.id ?? i, onmove, onremove = undefined, onadd = undefined, addLabel = '' } = $props();

  /** The dragged row's index, and where it would land: before or after a row, by its index. */
  let drag = $state(null);
  let drop = $state(null);
  let listEl = $state();

  function onDragOver(e) {
    if (drag === null) return;
    const boxes = [...listEl.querySelectorAll(':scope > .row-list-item')].map((el) => {
      const b = el.getBoundingClientRect();
      return { id: el.dataset.i, top: b.top, bottom: b.bottom };
    });
    const at = rowDropAt(boxes, String(drag), e.clientY);
    if (!at) { drop = null; return; }
    e.preventDefault();
    if (drop?.id !== at.id || drop?.pos !== at.pos) drop = at;
  }

  /** The drop: the row leaves its place and lands where the faint row stood. */
  function land(e) {
    e?.preventDefault();
    if (drag !== null && drop) {
      const order = reorderRows(items.map((_, i) => String(i)), (id) => id, String(drag), drop);
      const to = order.indexOf(String(drag));
      if (to !== drag) onmove(drag, to);
    }
    drag = null;
    drop = null;
  }

  function moveKeys(e, i) {
    if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    const to = i + (e.key === 'ArrowUp' ? -1 : 1);
    if (to < 0 || to >= items.length) return;
    e.preventDefault();
    onmove(i, to);
  }

  const GRIP = '<svg width="10" height="16" viewBox="0 0 12 18" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.6"/><circle cx="9" cy="3" r="1.6"/><circle cx="3" cy="9" r="1.6"/><circle cx="9" cy="9" r="1.6"/><circle cx="3" cy="15" r="1.6"/><circle cx="9" cy="15" r="1.6"/></svg>';
</script>

{#snippet ghost()}<div class="row-list-ghost" aria-hidden="true"></div>{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="row-list" role="list" aria-label={label} bind:this={listEl} ondragover={onDragOver} ondrop={land}>
  {#each items as item, i (key(item, i))}
    {#if drag !== null && drop?.id === String(i) && drop.pos === 'before'}{@render ghost()}{/if}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div class="row-list-item" class:dragging={drag === i} data-i={i} role="listitem" aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown" onkeydown={(e) => moveKeys(e, i)}>
      <span class="row-list-grip" draggable="true" title={ta('tip.list.move')} role="presentation"
        ondragstart={(e) => { drag = i; e.dataTransfer?.setData('text/plain', String(i)); }}
        ondragend={() => { drag = null; drop = null; }}>{@html GRIP}</span>
      <div class="row-list-body">{@render row(item, i)}</div>
      {#if onremove}
        <IconButton icon={ICONS.cross} label={ta('ui.remove')} onclick={() => onremove(i)} />
      {/if}
    </div>
    {#if drag !== null && drop?.id === String(i) && drop.pos === 'after'}{@render ghost()}{/if}
  {/each}
  {#if onadd}
    <button type="button" class="ghost action row-list-add" onclick={onadd}>{@html ICONS.plus}{addLabel}</button>
  {/if}
</div>

<style>
  .row-list {
    display: grid;
    gap: 6px;
  }

  .row-list-item {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .row-list-item.dragging {
    opacity: 0.45;
  }

  .row-list-grip {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 1rem;
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

  .row-list-ghost {
    height: 2rem;
    border: 1px dashed var(--urd-color-accent);
    border-radius: 6px;
    opacity: 0.7;
  }

  .row-list-add {
    gap: 0.4rem;
  }
</style>
