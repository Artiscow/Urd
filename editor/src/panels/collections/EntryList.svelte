<script>
  /* A collection's entries as rows, in the order the page shows them: each with its picture, its title and its date or price, the chosen one marked.
     An entry that moves is dragged by its row, with a faint clone where it lands (row-drag.js), or stepped with its arrows; a dated entry stands by its date, as on the page.
     While a search narrows the rows, nothing moves, since the neighbours an entry would pass are hidden. */
  import { getContext } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { sortEntries } from '$engine/collections.js';
  import { rowDropAt, reorderRows } from '../../lib/row-drag.js';
  import { movable, entryMatches } from '../../lib/collection-layout.js';
  import { ICONS } from '../../lib/icons.js';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  let { id, view, query = '', selected = null, onselect, chevron = true } = $props();
  const act = collectionActions(ed);

  const GRIP_ICON = '<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.3"/><circle cx="7" cy="3" r="1.3"/><circle cx="3" cy="8" r="1.3"/><circle cx="7" cy="8" r="1.3"/><circle cx="3" cy="13" r="1.3"/><circle cx="7" cy="13" r="1.3"/></svg>';
  const NEXT_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  const ENTRY_DRAG_TYPE = 'application/x-urd-collection-entry';

  /** The entries in the order the page shows them: products as stored; other kinds with the dated ones newest first and the undated after them in their stored order. */
  const shown = $derived(view.kind === 'products' ? view.entries : sortEntries(view.entries, true));
  const searching = $derived(Boolean(query.trim()));
  const rows = $derived(searching ? shown.filter((en) => entryMatches(en, query, ed.plainTitle)) : shown);
  const movables = $derived(shown.filter((en) => movable(view.kind, en)));

  let drag = $state(null);
  let drop = $state(null);

  /** What a row says under its title: the date in the admin's language, or a product's price and sizes. */
  function meta(entry) {
    if (view.kind === 'products') return [entry.price != null ? String(entry.price) : '', (entry.sizes ?? []).join(', ')].filter(Boolean).join(' · ');
    if (!entry.date) return '';
    try {
      return new Intl.DateTimeFormat(adminLang(), { dateStyle: 'medium' }).format(new Date(`${entry.date}T00:00:00`));
    } catch {
      return entry.date;
    }
  }

  /** The drag over the list: the clone's place follows the pointer, among the entries that move. */
  function onDragOver(e) {
    if (!drag) return;
    const boxes = [...e.currentTarget.querySelectorAll('.nav-item[data-movable]:not(.ghost)')].map((r) => { const b = r.getBoundingClientRect(); return { id: r.dataset.entryId, top: b.top, bottom: b.bottom }; });
    const at = rowDropAt(boxes, drag, e.clientY);
    if (!at) { drop = null; return; }
    e.preventDefault();
    if (drop?.id !== at.id || drop?.pos !== at.pos) drop = at;
  }

  /** The drop, in one undo step: the entry leaves its place and lands before or after the target. */
  function land() {
    const from = drag; const to = drop;
    drag = null; drop = null;
    if (!from || !to) return;
    ed.mutateCollection(id, `collection:${id}:move-entry`, (data) => {
      data.entries = reorderRows(data.entries, (en) => en.id, from, to);
    });
  }

  /** The end of a drag: a release outside the list still lands the entry where the clone last stood; a drag cancelled with Escape moves nothing. */
  function endDrag(e) {
    if (drop && e?.dataTransfer?.dropEffect !== 'none') land();
    drag = null; drop = null;
  }

  // While an entry is dragged the whole admin document accepts the drop, so a release beside the list is a drop and Escape is the only cancel.
  $effect(() => {
    if (!drag) return;
    const accept = (e) => e.preventDefault();
    window.addEventListener('dragover', accept);
    window.addEventListener('drop', accept);
    return () => {
      window.removeEventListener('dragover', accept);
      window.removeEventListener('drop', accept);
    };
  });
</script>

{#snippet thumb(entry)}
  <span class="cl-thumb" class:empty={!entry.image} aria-hidden="true">{#if entry.image}<img src={entry.image} alt="" />{:else}{@html ICONS.image}{/if}</span>
{/snippet}

{#snippet ghost()}
  {@const dragged = view.entries.find((en) => en.id === drag)}
  <!-- The faint clone at the landing place -->
  <div class="nav-item ghost" aria-hidden="true">
    <div class="nav-head cl-head">
      <span class="nav-grip">{@html GRIP_ICON}</span>
      {#if dragged}{@render thumb(dragged)}{/if}
      <span class="cl-words"><span class="nav-head-name ghost-name">{dragged ? ed.plainTitle(dragged.title) : ''}</span></span>
    </div>
  </div>
{/snippet}

<div class="nav-list entries-list cl-list" role="list" ondragover={onDragOver} ondrop={(e) => { e.preventDefault(); land(); }}>
  {#each rows as entry (entry.id)}
    {@const canMove = !searching && movable(view.kind, entry)}
    {@const at = movables.indexOf(entry)}
    {#if drag && drop?.id === entry.id && drop.pos === 'before'}{@render ghost()}{/if}
    <div class="nav-item cl-row" class:selected={selected === entry.id} class:dragging={drag === entry.id}
      data-entry-id={entry.id} data-movable={canMove || undefined} role="listitem">
      <!-- The head opens the entry and is its drag handle; the arrows stand beside it, so no button sits inside another -->
      <div class="cl-line">
      <div class="nav-head cl-head" draggable={canMove ? 'true' : undefined} role="button" tabindex="0"
        title={canMove ? ta('tip.collections.dragEntry') : searching ? ta('tip.collections.openEntry') : ta('tip.collections.datedOrder')} aria-current={selected === entry.id ? 'true' : undefined}
        onclick={() => onselect?.(entry.id)}
        onkeydown={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onselect?.(entry.id); } }}
        ondragstart={(e) => { if (!canMove) { e.preventDefault(); return; } drag = entry.id; e.dataTransfer?.setData(ENTRY_DRAG_TYPE, entry.id); }}
        ondragend={endDrag}>
        <span class="nav-grip" class:nav-grip-off={!canMove}>{@html GRIP_ICON}</span>
        {@render thumb(entry)}
        <span class="cl-words">
          <span class="nav-head-name">{ed.plainTitle(entry.title)}</span>
          {#if meta(entry)}<span class="cl-meta">{meta(entry)}</span>{/if}
        </span>
        {#if chevron}<span class="cl-next" aria-hidden="true">{@html NEXT_ICON}</span>{/if}
      </div>
      {#if canMove}
        <span class="nav-head-tools cl-tools">
          <button class="ghost nav-act" title={ta('tip.moveUp')} aria-label={ta('tip.moveUp')} disabled={at === 0} onclick={() => act.moveEntry(id, entry.id, -1)}>{@html ICONS.up}</button>
          <button class="ghost nav-act" title={ta('tip.moveDown')} aria-label={ta('tip.moveDown')} disabled={at === movables.length - 1} onclick={() => act.moveEntry(id, entry.id, 1)}>{@html ICONS.down}</button>
        </span>
      {/if}
      </div>
    </div>
    {#if drag && drop?.id === entry.id && drop.pos === 'after'}{@render ghost()}{/if}
  {/each}
</div>
{#if !view.entries.length}
  <p class="panel-hint">{ta('hint.collections.empty')}</p>
{:else if !rows.length}
  <p class="panel-hint">{ta('collections.noMatch')}</p>
{/if}

<style>
  .cl-line {
    display: flex;
    align-items: center;
  }

  .cl-head {
    flex: 1 1 auto;
    gap: 0.5rem;
    min-width: 0;
  }

  .cl-tools {
    flex: none;
    padding-right: 0.3rem;
  }

  /* The entry's picture, small and square, or the image mark where it has none */
  .cl-thumb {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.2rem;
    height: 2.2rem;
    overflow: hidden;
    border-radius: 6px;
    background: color-mix(in srgb, currentColor 6%, transparent);
  }

  .cl-thumb.empty {
    border: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
    opacity: 0.6;
  }

  .cl-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cl-words {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .cl-meta {
    overflow: hidden;
    font-size: 0.74rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.65;
  }

  .cl-next {
    display: inline-flex;
    flex: none;
    opacity: 0.6;
  }

  /* The chosen entry: a faint accent surface and border, never a line at the edge */
  .cl-row.selected {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 14%, transparent);
  }

  .cl-head:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: -2px;
    border-radius: 7px;
  }
</style>
