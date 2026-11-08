<script>
  /* The open collection as a table over the page («Table over the page» under Collections editor): the entries as rows with a column per field the kind has (lib/collection-layout.js), and the chosen entry's fields in a drawer at the right.
     It stands over the stage while the Collections panel lists the collections, so the preview stays as it is underneath; the close button and Escape go back to the page.
     A tick column with «select all» in its head ticks entries for the bar under the head (SelectionBar.svelte); Shift takes a run, Ctrl+A ticks every row shown, and Escape clears the ticks before it closes the table.
     An entry that moves is dragged by its row, the row kit's drag (lib/rows/row-drag.svelte.js), or stepped with Alt and the arrow keys on its title, as in the list; a dated entry stands by its date, and nothing moves while a search narrows the rows. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { sortEntries } from '$engine/collections.js';
  import { ICONS } from '../../lib/icons.js';
  import { movable, entryMatches, entryPosition, afterRemoval, tableColumns, cellText } from '../../lib/collection-layout.js';
  import { liveTicks, tickRun, withTicks } from '../../lib/collection-bulk.js';
  import { reorderRows } from '../../lib/row-drag.js';
  import { RowDrag, slotOut } from '../../lib/rows/row-drag.svelte.js';
  import CollectionMenu from './CollectionMenu.svelte';
  import SelectionBar from './SelectionBar.svelte';
  import EntryFields from './EntryFields.svelte';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  const act = collectionActions(ed);
  let query = $state('');

  const id = $derived(ed.panelCollection);
  const view = $derived(ed.collectionsView[id]);
  const shown = $derived(view ? (view.kind === 'products' ? view.entries : sortEntries(view.entries, true)) : []);
  const searching = $derived(Boolean(query.trim()));
  const rows = $derived(searching ? shown.filter((en) => entryMatches(en, query, ed.plainTitle)) : shown);
  const columns = $derived(tableColumns(view?.kind));
  const entry = $derived(ed.panelEntry ? shown.find((en) => en.id === ed.panelEntry) ?? null : null);
  const movables = $derived(shown.filter((en) => movable(view?.kind, en)));
  const at = $derived(entry ? movables.indexOf(entry) : -1);
  const ticks = $derived(view ? liveTicks(ed.panelTicks, view.entries) : []);
  const rowIds = $derived(rows.map((en) => en.id));
  const allShown = $derived(rowIds.length > 0 && rowIds.every((r) => ticks.includes(r)));
  const setTicks = (next) => { ed.panelTicks = next; };
  /** The row ticked last, where a run with Shift starts. */
  let anchor = null;
  let headTick = $state(null);

  // The head's box shows «some ticked» between none and all.
  $effect(() => {
    if (headTick) headTick.indeterminate = ticks.length > 0 && !allShown;
  });

  function tickRow(entryId, event) {
    const on = !ticks.includes(entryId);
    const run = event?.shiftKey && anchor ? tickRun(rowIds, anchor, entryId) : [entryId];
    setTicks(withTicks(ticks, run, on));
    anchor = entryId;
  }

  /** A copy of the chosen entry under it, chosen at once with its title ready to type over. */
  function duplicateEntry() {
    const [copy] = ed.duplicateEntries(id, [entry.id]);
    if (!copy) return;
    ed.panelEntry = copy;
    tick().then(() => {
      const title = document.querySelector('.ct-drawer [data-field="title"]');
      title?.focus();
      title?.select();
    });
  }

  function close() {
    ed.panelCollection = null;
    ed.panelEntry = null;
  }

  /** A new entry, chosen at once with its title ready to type over. */
  function newEntry() {
    query = '';
    ed.panelEntry = ed.addCollectionEntry(id);
    tick().then(() => {
      const title = document.querySelector('.ct-drawer [data-field="title"]');
      title?.focus();
      title?.select();
    });
  }

  function deleteEntry() {
    const next = afterRemoval(shown.map((en) => en.id), entry.id);
    act.removeEntry(id, entry.id);
    ed.panelEntry = next;
  }

  /** Ctrl+A ticks every row shown; Escape clears the ticks, else goes back to the page, except from a field, an open list or a picker inside, which answer it themselves. */
  function onKey(e) {
    const inField = e.target instanceof Element && e.target.closest('input:not([type="checkbox"]), textarea, [popover], .dd, .dp-overlay, .cp');
    if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'a' && !inField) {
      e.preventDefault();
      setTicks(withTicks(ticks, rowIds, true));
      return;
    }
    if (e.key !== 'Escape' || e.defaultPrevented) return;
    if (ticks.length) { setTicks([]); return; }
    if (inField) return;
    close();
  }

  /** The drag, in one undo step: the entry leaves its place and lands before or after the row it was dropped by. */
  const drag = new RowDrag((from, to) => {
    ed.mutateCollection(id, `collection:${id}:move-entry`, (data) => {
      data.entries = reorderRows(data.entries, (en) => en.id, from, to);
    });
  }, (entryId) => {
    const en = view.entries.find((x) => x.id === entryId);
    return en ? { name: ed.plainTitle(en.title), detail: columns.filter((col) => col.key !== 'text').map((col) => cellText(col.key, en, ed.plainTitle)).filter(Boolean).slice(0, 2).join(' · '), src: en.image ?? '', icon: en.image ? '' : ICONS.image } : null;
  });

  /** An entry stepped one place among those that move with Alt and the arrow keys, its title keeping the focus. */
  async function stepEntry(entryId, dir) {
    const from = movables.findIndex((en) => en.id === entryId);
    if (from < 0 || from + dir < 0 || from + dir >= movables.length) return;
    act.moveEntry(id, entryId, dir);
    await tick();
    document.querySelector(`.ct-open[data-entry-id="${CSS.escape(entryId)}"]`)?.focus();
    drag.landed(entryId);
  }

  /** The arrow keys step from a row's title to the row above or below and choose it; with Alt they move the entry. */
  function onRowKey(e, entryId) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    if (e.altKey) {
      if (!searching) stepEntry(entryId, e.key === 'ArrowUp' ? -1 : 1);
      return;
    }
    const to = entryPosition(rows.map((en) => en.id), entryId)?.[e.key === 'ArrowDown' ? 'next' : 'prev'];
    if (!to) return;
    ed.panelEntry = to;
    e.currentTarget.closest('tbody')?.querySelector(`.ct-open[data-entry-id="${CSS.escape(to)}"]`)?.focus();
  }
</script>

<!-- The slot where a dragged entry lands, in a row of its own across every column -->
{#snippet slot()}<tr class="row-drag-slot-row"><td colspan={3 + columns.length}><div class="row-drag-slot" {@attach drag.slot} out:slotOut></div></td></tr>{/snippet}

{#if view}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <section class="ct" class:ct-ticking={ticks.length > 0} aria-label={view.name ?? id} onkeydown={onKey}>
    <div class="ct-head">
      <h2 class="ct-title">{view.name ?? id}</h2>
      <input type="text" class="ct-search" bind:value={query} placeholder={ta('ph.collections.find')} aria-label={ta('ph.collections.find')} title={ta('ph.collections.find')} />
      <span class="ct-grow"></span>
      <button class="ghost action ct-new" title={ta('ui.addEntry')} onclick={newEntry}>{ta('ui.addEntry')}</button>
      <CollectionMenu {id} {ticks} shownIds={rowIds} onticks={setTicks} />
      <button class="ghost coll-btn ct-close" title={ta('tip.collections.closeTable')} aria-label={ta('tip.collections.closeTable')} onclick={close}>{@html ICONS.cross}</button>
    </div>
    {#if ticks.length}
      <div class="ct-barrow"><SelectionBar {id} {ticks} shownIds={rowIds} onticks={setTicks} /></div>
    {/if}
    <div class="ct-body">
      <div class="ct-scroll">
        <table class="ct-table">
          <thead>
            <tr>
              <th class="ct-tick"><input type="checkbox" class="tick-box" bind:this={headTick} checked={allShown} aria-label={ta('tip.collections.tickShown')} title={ta('tip.collections.tickShown')}
                onclick={() => setTicks(allShown ? withTicks(ticks, rowIds, false) : withTicks(ticks, rowIds, true))} /></th>
              <th class="ct-pic"><span class="sr-only">{ta('collections.picture')}</span></th>
              <th>{ta('lbl.title')}</th>
              {#each columns as col (col.key)}<th class:num={col.numeric}>{ta(col.labelKey)}</th>{/each}
            </tr>
          </thead>
          <tbody {@attach drag.list}>
            {#each rows as en (en.id)}
              {@const canMove = !searching && movable(view.kind, en)}
              {#if drag.at(en.id, 'before')}{@render slot()}{/if}
              <!-- The whole row chooses the entry under the pointer and is the drag handle of an entry that moves; the title is the row's button for the keys, Alt and the arrows moving it -->
              <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
              <tr class:selected={entry?.id === en.id} class:ticked={ticks.includes(en.id)} data-entry-id={en.id} data-drag-id={canMove ? en.id : undefined}
                title={canMove ? ta('tip.collections.dragEntry') : undefined} {@attach drag.handle(en.id, canMove)} onclick={() => (ed.panelEntry = en.id)}>
                <td class="ct-tick"><input type="checkbox" class="tick-box" checked={ticks.includes(en.id)} aria-label={ta('tip.collections.tickEntry', { name: ed.plainTitle(en.title) })}
                  title={ta('tip.collections.tickEntry', { name: ed.plainTitle(en.title) })} onclick={(e) => { e.stopPropagation(); tickRow(en.id, e); }} /></td>
                <td class="ct-pic"><span class="ct-thumb" class:empty={!en.image}>{#if en.image}<img src={en.image} alt="" />{:else}{@html ICONS.image}{/if}</span></td>
                <td class="ct-name"><button type="button" class="ct-open" data-entry-id={en.id} aria-current={entry?.id === en.id ? 'true' : undefined}
                  title={ta('tip.collections.openEntry')} onkeydown={(e) => onRowKey(e, en.id)}
                  onclick={(e) => { e.stopPropagation(); ed.panelEntry = en.id; }}>{ed.plainTitle(en.title)}</button></td>
                {#each columns as col (col.key)}<td class:num={col.numeric} class:ct-text={col.key === 'text'}>{cellText(col.key, en, ed.plainTitle) || '-'}</td>{/each}
              </tr>
              {#if drag.at(en.id, 'after')}{@render slot()}{/if}
            {/each}
          </tbody>
        </table>
        {#if !view.entries.length}
          <p class="panel-hint">{ta('hint.collections.empty')}</p>
        {:else if !rows.length}
          <p class="panel-hint">{ta('collections.noMatch')}</p>
        {/if}
      </div>
      <aside class="ct-drawer" aria-label={entry ? ed.plainTitle(entry.title) : (view.name ?? id)}>
        {#if entry}
          <span class="ct-drawer-head">
            <span class="ct-drawer-name">{ed.plainTitle(entry.title)}</span>
            {#if movable(view.kind, entry) && !searching}
              <button class="ghost nav-act" title={ta('tip.moveUp')} aria-label={ta('tip.moveUp')} disabled={at <= 0} onclick={() => act.moveEntry(id, entry.id, -1)}>{@html ICONS.up}</button>
              <button class="ghost nav-act" title={ta('tip.moveDown')} aria-label={ta('tip.moveDown')} disabled={at === movables.length - 1} onclick={() => act.moveEntry(id, entry.id, 1)}>{@html ICONS.down}</button>
            {/if}
            <button class="ghost coll-btn" title={ta('tip.collections.duplicateEntry')} aria-label={ta('tip.collections.duplicateEntry')} onclick={duplicateEntry}>{@html ICONS.copy}</button>
            <button class="ghost coll-btn coll-danger" title={ta('tip.collections.deleteEntry')} aria-label={ta('tip.collections.deleteEntry')} onclick={deleteEntry}>{@html ICONS.cross}</button>
          </span>
          <div class="panel-body ct-fields">
            {#key entry.id}<EntryFields {id} {entry} kind={view.kind} />{/key}
          </div>
        {/if}
      </aside>
    </div>
  </section>
{/if}

<style>
  /* Over the whole stage, on the panels' surface, the page still drawn underneath */
  .ct {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    background: var(--urd-color-surface, #151a23);
    color: var(--urd-color-text, #e8eaf0);
    font-family: var(--urd-font-body, system-ui, sans-serif);
    font-size: 0.88rem;
  }

  /* With entries ticked, the bar stands in a row of its own under the head */
  .ct.ct-ticking {
    grid-template-rows: auto auto minmax(0, 1fr);
  }

  .ct-barrow {
    padding: 0.5rem 1rem 0;
  }

  .ct-tick {
    width: 1.6rem;
  }

  .ct-table tbody tr.ticked {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 9%, transparent);
  }

  .ct-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem 1rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .ct-title {
    margin: 0;
    font-size: 1rem;
  }

  .ct-search {
    width: 16rem;
    height: 2rem;
    box-sizing: border-box;
    padding: 0 0.6rem;
    font: inherit;
    color: inherit;
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
  }

  .ct-grow {
    flex: 1;
  }

  /* An entry that moves is grabbed by its row */
  tr[data-drag-id] { cursor: grab; }

  /* New entry stands as tall as the collection's menu and the close beside it, and as the search */
  .ct-head .ct-new {
    box-sizing: border-box;
    height: 2rem;
    min-height: 0;
    padding: 0 0.8rem;
  }

  .ct-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 24rem;
    min-height: 0;
  }

  .ct-scroll {
    min-height: 0;
    padding: 0.4rem 1rem 1rem;
    overflow: auto;
    scrollbar-width: thin;
  }

  .ct-table {
    width: 100%;
    border-collapse: collapse;
  }

  .ct-table th {
    padding: 0.5rem 0.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-align: left;
    text-transform: uppercase;
    opacity: 0.65;
  }

  .ct-table td {
    padding: 0.45rem 0.5rem;
    border-top: 1px solid rgb(255 255 255 / 8%);
    vertical-align: middle;
  }

  .ct-table tbody tr {
    cursor: pointer;
  }

  .ct-table tbody tr:hover {
    background: rgb(255 255 255 / 4%);
  }

  /* The chosen entry's row: a faint accent surface, never a line at the edge */
  .ct-table tbody tr.selected {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 14%, transparent);
  }

  .ct-open {
    padding: 0;
    font: inherit;
    font-weight: 500;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: none;
    border: 0;
  }

  .ct-open:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 3px;
    border-radius: 3px;
  }

  .ct-table .num {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .ct-pic {
    width: 2.6rem;
  }

  .ct-thumb {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    overflow: hidden;
    border-radius: 6px;
    background: rgb(255 255 255 / 6%);
  }

  .ct-thumb.empty {
    border: 1px dashed rgb(255 255 255 / 22%);
    opacity: 0.6;
  }

  .ct-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ct-text {
    max-width: 22rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.8;
  }

  /* The drawer: the chosen entry's fields in the panels' own form, scrolling on its own */
  .ct-drawer {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 0;
    border-left: 1px solid rgb(255 255 255 / 8%);
    background: var(--urd-color-bg, #0f1218);
  }

  .ct-drawer-head {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.7rem 0.9rem 0.4rem;
  }

  .ct-drawer-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* The entry's fields keep their own height at the drawer's top and scroll beyond it, rather than being stretched over the drawer or squeezed into it */
  .ct-fields {
    grid-auto-rows: max-content;
    align-content: start;
    min-height: 0;
    padding: 0 0.6rem 1rem 0.8rem;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
</style>
