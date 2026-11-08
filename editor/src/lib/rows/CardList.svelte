<script>
  /* A list of cards in the row kit, drawn as the Nav tab draws its items: closed, a card is one line with its grip, its sign, its name and its detail; open, it holds its own settings, with the cross that removes it at its foot.
     A card is moved by pressing, holding and dragging its head (the row kit's drag, row-drag.svelte.js) or by Alt and the arrow keys on its head, and a press on the head opens or closes it.
     `card(item, i)` gives the head's sign (`src` for a picture, `swatch` for a colour, `icon` for an icon), name and detail, and the dragged card the same; `body(item, i)` draws an open card's settings.
     `isOpen(i)` and `ontoggle(i)` keep which cards stand open with the list's owner; `onmove(from, to)` gets a card's index before and after a move. */
  import { tick } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../icons.js';
  import IconButton from './IconButton.svelte';
  import { reorderRows } from '../row-drag.js';
  import { RowDrag, slotOut } from './row-drag.svelte.js';
  let { items, card, body, label, key = (item, i) => item?.id ?? i, isOpen, ontoggle, onmove, onremove = undefined, removeLabel = '' } = $props();

  let listEl = $state();
  /** The drag: the cards go by their index, so the landed card's id is its new index. */
  const drag = new RowDrag((from, at) => {
    const order = reorderRows(items.map((_, i) => String(i)), (id) => id, from, at);
    const to = order.indexOf(from);
    if (to !== Number(from)) onmove(Number(from), to);
    return String(to);
  }, (id) => card(items[Number(id)], Number(id)));

  /** The card's closing: its fold shrinks its one grid row to nothing, the mirror of the opening animation in app.css. */
  function foldShut() {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { duration: still ? 0 : 160, easing: cubicOut, css: (t) => `grid-template-rows: ${t}fr` };
  }

  /** Enter or Space on a head opens or closes its card; Alt and an arrow move the card, the focus going with it. */
  async function headKeys(e, i) {
    if (e.target !== e.currentTarget) return;
    if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      const to = i + (e.key === 'ArrowUp' ? -1 : 1);
      if (to < 0 || to >= items.length) return;
      onmove(i, to);
      await tick();
      listEl?.querySelectorAll(':scope > .card-list-item')[to]?.querySelector('.nav-head')?.focus();
      drag.landed(String(to));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      ontoggle(i);
    }
  }

  const GRIP = '<svg width="10" height="16" viewBox="0 0 12 18" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.6"/><circle cx="9" cy="3" r="1.6"/><circle cx="3" cy="9" r="1.6"/><circle cx="9" cy="9" r="1.6"/><circle cx="3" cy="15" r="1.6"/><circle cx="9" cy="15" r="1.6"/></svg>';
  const CHEV = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
</script>

{#snippet slot()}<div class="row-drag-slot" {@attach drag.slot} out:slotOut></div>{/snippet}

<div class="nav-list card-list" role="list" aria-label={label} bind:this={listEl} {@attach drag.list}>
  {#each items as item, i (key(item, i))}
    {@const c = card(item, i)}
    {@const open = isOpen(i)}
    {#if drag.at(i, 'before')}{@render slot()}{/if}
    <div class="nav-item card-list-item" class:open data-drag-id={i} role="listitem">
      <div class="nav-head" role="button" tabindex="0" aria-expanded={open} aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown" title={ta('tip.list.card')}
        {@attach drag.handle(i)} onclick={() => ontoggle(i)} onkeydown={(e) => headKeys(e, i)}>
        <span class="nav-grip">{@html GRIP}</span>
        {#if c.src}
          <img class="card-list-sign" src={c.src} alt="" draggable="false" />
        {:else if c.swatch}
          <span class="card-list-sign" style:background={c.swatch}></span>
        {:else if c.icon}
          <span class="card-list-sign card-list-icon">{@html c.icon}</span>
        {/if}
        <span class="nav-head-name">{c.name}</span>
        {#if c.detail}<span class="nav-head-link">{c.detail}</span>{/if}
        <span class="nav-chev" aria-hidden="true">{@html CHEV}</span>
      </div>
      {#if open}
        <!-- The fold grows from nothing as the card opens (the CSS animation of .nav-fold in app.css) and shrinks back as it closes -->
        <div class="nav-fold" out:foldShut>
          <div class="card-list-body">
            {@render body(item, i)}
            {#if onremove}
              <div class="nav-body-actions">
                <span class="nav-body-spacer"></span>
                <IconButton icon={ICONS.cross} label={removeLabel || ta('ui.remove')} onclick={() => onremove(i)} />
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
    {#if drag.at(i, 'after')}{@render slot()}{/if}
  {/each}
</div>

<style>
  .card-list {
    padding-bottom: 0;
  }

  .card-list-sign {
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5px;
    object-fit: cover;
  }

  .card-list-icon {
    display: inline-grid;
    place-items: center;
    background: rgb(255 255 255 / 5%);
    border: 1px solid rgb(255 255 255 / 12%);
  }

  .card-list-icon > :global(svg) {
    max-width: 62%;
    max-height: 62%;
  }

  /* The name keeps its words before the detail does: the detail takes the room left and ends in an ellipsis */
  .card-list-item :global(.nav-head-name) {
    flex: 0 1 auto;
  }

  .card-list-item :global(.nav-head-link) {
    flex: 1 1 0;
    max-width: none;
    text-align: right;
  }

  .nav-chev {
    display: inline-flex;
    flex: none;
    padding: 0 0.25rem;
    opacity: 0.7;
  }

  /* The open card's settings under each other, clipped while its fold grows and shrinks */
  .card-list-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.4rem;
    min-height: 0;
    overflow: hidden;
    padding: 2px 8px 9px;
  }
</style>
