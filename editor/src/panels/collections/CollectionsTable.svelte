<script>
  /* The open collection as a table over the page («Table over the page» under Collections editor): the entries as rows with a column per field the kind has (lib/collection-layout.js), and the chosen entry's fields in a drawer at the right.
     It stands over the stage while the Collections panel lists the collections, so the preview stays as it is underneath; the close button and Escape go back to the page. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { sortEntries } from '$engine/collections.js';
  import { ICONS } from '../../lib/icons.js';
  import { movable, entryMatches, entryPosition, afterRemoval, tableColumns, cellText } from '../../lib/collection-layout.js';
  import CollectionTools from './CollectionTools.svelte';
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

  /** Escape goes back to the page, except from a field, an open list or a picker inside, which answer it themselves. */
  function onKey(e) {
    if (e.key !== 'Escape' || e.defaultPrevented) return;
    if (e.target instanceof Element && e.target.closest('input, textarea, [popover], .dd, .dp-overlay, .cp')) return;
    close();
  }

  /** The arrow keys step from a row's title to the row above or below and choose it. */
  function onRowKey(e, entryId) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const to = entryPosition(rows.map((en) => en.id), entryId)?.[e.key === 'ArrowDown' ? 'next' : 'prev'];
    if (!to) return;
    ed.panelEntry = to;
    e.currentTarget.closest('tbody')?.querySelector(`.ct-open[data-entry-id="${CSS.escape(to)}"]`)?.focus();
  }
</script>

{#if view}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <section class="ct" aria-label={view.name ?? id} onkeydown={onKey}>
    <div class="ct-head">
      <h2 class="ct-title">{view.name ?? id}</h2>
      <input type="text" class="ct-search" bind:value={query} placeholder={ta('ph.collections.find')} aria-label={ta('ph.collections.find')} title={ta('ph.collections.find')} />
      <span class="ct-grow"></span>
      <CollectionTools {id} />
      <button class="ghost action ct-new" title={ta('ui.addEntry')} onclick={newEntry}>{ta('ui.addEntry')}</button>
      <button class="ghost row-tool ct-close" title={ta('tip.collections.closeTable')} aria-label={ta('tip.collections.closeTable')} onclick={close}>{@html ICONS.cross}</button>
    </div>
    <div class="ct-body">
      <div class="ct-scroll">
        <table class="ct-table">
          <thead>
            <tr>
              <th class="ct-pic"><span class="sr-only">{ta('collections.picture')}</span></th>
              <th>{ta('lbl.title')}</th>
              {#each columns as col (col.key)}<th class:num={col.numeric}>{ta(col.labelKey)}</th>{/each}
            </tr>
          </thead>
          <tbody>
            {#each rows as en (en.id)}
              <!-- The whole row chooses the entry under the pointer; the title is the row's button for the keys -->
              <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
              <tr class:selected={entry?.id === en.id} onclick={() => (ed.panelEntry = en.id)}>
                <td class="ct-pic"><span class="ct-thumb" class:empty={!en.image}>{#if en.image}<img src={en.image} alt="" />{:else}{@html ICONS.image}{/if}</span></td>
                <td class="ct-name"><button type="button" class="ct-open" data-entry-id={en.id} aria-current={entry?.id === en.id ? 'true' : undefined}
                  title={ta('tip.collections.openEntry')} onkeydown={(e) => onRowKey(e, en.id)}
                  onclick={(e) => { e.stopPropagation(); ed.panelEntry = en.id; }}>{ed.plainTitle(en.title)}</button></td>
                {#each columns as col (col.key)}<td class:num={col.numeric} class:ct-text={col.key === 'text'}>{cellText(col.key, en, ed.plainTitle) || '-'}</td>{/each}
              </tr>
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
            <button class="ghost row-tool" title={ta('tip.collections.deleteEntry')} aria-label={ta('tip.collections.deleteEntry')} onclick={deleteEntry}>{@html ICONS.cross}</button>
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

  .ct-fields {
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
