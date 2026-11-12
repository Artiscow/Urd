<script>
  /* The Collections panel in the layout «Collections editor» asks for (lib/collection-layout.js):
     stepping in (the default), the collections, then a collection's entries, then one entry, a level at a time with a back arrow and the arrows to the entry before or after;
     two columns, the panel widened while a collection is open with the entries at the left and the chosen entry at the right;
     or the table, the collections here and the open one as a table over the page (collections/CollectionsTable.svelte).
     The place (`panelCollection`, `panelEntry`) and the ticked entries (`panelTicks`) live in the collections state, so they are kept while the panel is closed and opened again.
     The selected entries' bar stands under the search (collections/SelectionBar.svelte), and the collection's one ⋮ menu in its head, with what else acts on the selection (collections/CollectionMenu.svelte).
     A CSV import waiting with «In the panel» as its preview stands in the panel's place until it is applied or cancelled (collections/ImportStep.svelte). */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { sortEntries } from '$engine/collections.js';
  import { ICONS } from '../lib/icons.js';
  import IconButton from '../lib/rows/IconButton.svelte';
  import { entryPosition, afterRemoval, entryMatches } from '../lib/collection-layout.js';
  import { liveTicks } from '../lib/collection-bulk.js';
  import CollectionList from './collections/CollectionList.svelte';
  import CollectionMenu from './collections/CollectionMenu.svelte';
  import SelectionBar from './collections/SelectionBar.svelte';
  import EntryList from './collections/EntryList.svelte';
  import EntryFields from './collections/EntryFields.svelte';
  import ImportStep from './collections/ImportStep.svelte';
  import { collectionActions } from './collections/actions.js';

  const ed = getContext('urd-editor');
  const act = collectionActions(ed);
  /** The search over the open collection's entries (state/collections.svelte.js), shared with the heading's menu in the two columns. */
  const query = $derived(ed.panelQuery);

  /** The chevrons stand a unit toward their point, so they read as centred in their square: the eye centres the triangle the two arms outline, whose middle lies a third of the way in from the open side. */
  const BACK_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg>';
  /** The steps to the entry before and after, as chevrons: the up and down arrows move an entry. */
  const PREV_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg>';
  const NEXT_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 6l6 6-6 6"/></svg>';

  /** The open collection and the chosen entry, each only while it still exists (a deletion or an undo may take it away). */
  const view = $derived(ed.panelCollection && ed.collectionIds.includes(ed.panelCollection) ? ed.collectionsView[ed.panelCollection] : null);
  const entry = $derived(view && ed.panelEntry ? view.entries.find((en) => en.id === ed.panelEntry) ?? null : null);
  const ids = $derived(view ? (view.kind === 'products' ? view.entries : sortEntries(view.entries, true)).map((en) => en.id) : []);
  const place = $derived(entry ? entryPosition(ids, entry.id) : null);
  /** The ticked entries that still exist, and the ones the search shows. */
  const ticks = $derived(view ? liveTicks(ed.panelTicks, view.entries) : []);
  const shownIds = $derived(view ? ids.filter((eid) => entryMatches(view.entries.find((en) => en.id === eid), query, ed.plainTitle)) : []);
  const setTicks = (next) => { ed.panelTicks = next; };

  /** The focus follows a step, once the new level is drawn: to the way back after a step in, to the row stepped out of after a step back. */
  function focusAfter(selector) {
    tick().then(() => document.querySelector(selector)?.focus({ preventScroll: false }));
  }

  function openCollection(id) {
    if (ed.panelCollection !== id) { ed.panelEntry = null; ed.panelQuery = ''; }
    ed.panelCollection = id;
    if (ed.collectionsLayout === 'columns') focusAfter('.panel-head .coll-heading-up');
    else if (ed.collectionsLayout !== 'table') focusAfter('.coll-panel .coll-crumb button');
  }

  function closeCollection() {
    const left = ed.panelCollection;
    ed.panelCollection = null;
    ed.panelEntry = null;
    ed.panelQuery = '';
    focusAfter(`.cl-collection[data-collection-id="${CSS.escape(left)}"]`);
  }

  /** Stepping in to one entry, and back out to its row. */
  function chooseEntry(id) {
    ed.panelEntry = id;
    if (ed.collectionsLayout === 'drill') focusAfter('.coll-panel .coll-crumb button');
  }

  function backToEntries() {
    const left = ed.panelEntry;
    ed.panelEntry = null;
    focusAfter(`.coll-panel .cl-row[data-entry-id="${CSS.escape(left)}"] .cl-head`);
  }

  // Beside a list (the two columns, the table) an entry always stands chosen: the first one, when none is or the chosen one is gone.
  $effect(() => {
    if (ed.collectionsLayout !== 'drill' && view && !entry && ids.length) ed.panelEntry = ids[0];
  });

  /** A new entry, chosen at once with its title ready to type over. */
  function newEntry() {
    ed.panelQuery = '';
    const made = ed.addCollectionEntry(ed.panelCollection);
    ed.panelEntry = made;
    focusField(made, 'title', true);
  }

  /** A copy of the chosen entry under it, chosen at once with its title ready to type over. */
  function duplicateEntry() {
    const [copy] = ed.duplicateEntries(ed.panelCollection, [entry.id]);
    if (!copy) return;
    ed.panelEntry = copy;
    focusField(copy, 'title', true);
  }

  /** The entry's removal, in one undo step: the next entry is chosen where a list stands beside it, and the drill-in steps back to the list. */
  function deleteEntry() {
    const next = ed.collectionsLayout === 'drill' ? null : afterRemoval(ids, entry.id);
    act.removeEntry(ed.panelCollection, entry.id);
    ed.panelEntry = next;
  }

  /** A field of a chosen entry takes the focus once it is drawn. */
  function focusField(entryId, field, select = false) {
    tick().then(() => {
      const box = document.querySelector(`.coll-entry[data-entry-id="${CSS.escape(entryId)}"]`);
      if (!box) return;
      box.scrollIntoView({ block: 'nearest' });
      const el = box.querySelector(`[data-field="${CSS.escape(field)}"]`) ?? box.querySelector('[data-field="title"]');
      el?.focus();
      if (select) el?.select?.();
    });
  }

  /** What a press may land on without clearing the selection: a control, a row, the selection's bar and the collection's menu with its submenu. */
  const KEEPS_SELECTION = 'button, a, input, select, textarea, label, summary, [role="button"], [contenteditable], .cl-row, .sb, .cm-card, .dd';

  // While entries are selected and their list is in the panel, a press on a place in the panel that is not a control clears the selection.
  $effect(() => {
    const el = ed.panelEl;
    if (!el || !ticks.length || entry || ed.collectionsLayout === 'table' || ed.csvImport) return;
    const onClick = (e) => {
      if (e.target instanceof Element && !e.target.closest(KEEPS_SELECTION)) setTicks([]);
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  });

  // A collection asked open from outside the panel («Edit the product catalogue», a new collection) opens.
  $effect(() => {
    const want = ed.openRequest;
    if (!want) return;
    openCollection(want.id);
    ed.openRequest = null;
  });

  // A click on a card in the preview (urd-open-entry), or an entry picked in the Collections tab's menu: its collection opens with the entry chosen and the field asked for focused, selected where asked.
  $effect(() => {
    const want = ed.focusEntry;
    const collection = ed.activeCollection;
    if (!want || !collection) return;
    openCollection(collection);
    ed.panelEntry = want.id;
    ed.focusEntry = null;
    focusField(want.id, want.field, want.select === true);
  });

</script>

{#snippet search()}
  <span class="toolbar-row coll-search">
    <input type="text" bind:value={() => ed.panelQuery, (v) => (ed.panelQuery = v)} placeholder={ta('ph.collections.find')} aria-label={ta('ph.collections.find')} title={ta('ph.collections.find')} />
    <button class="ghost action" title={ta('ui.addEntry')} onclick={newEntry}>{ta('ui.addEntry')}</button>
  </span>
  {#if ticks.length}
    <SelectionBar id={ed.panelCollection} {ticks} {shownIds} onticks={setTicks} />
  {/if}
{/snippet}

{#snippet entryHead(named = false)}
  <!-- The chosen entry's head: its name beside the list (the two columns), where it stands among its collection's entries, the steps to its neighbours, and its removal -->
  <span class="coll-entry-head" class:coll-entry-head-named={named}>
    {#if named}<span class="coll-entry-name">{ed.plainTitle(entry.title)}</span>{/if}
    {#if place}<span class="coll-place">{ta('collections.position', { n: place.index + 1, count: place.count })}</span>{/if}
    <span class="coll-grow"></span>
    {#if place}
      <IconButton icon={PREV_ICON} label={ta('tip.collections.prevEntry')} disabled={!place.prev} onclick={() => { ed.panelEntry = place.prev; }} />
      <IconButton icon={NEXT_ICON} label={ta('tip.collections.nextEntry')} disabled={!place.next} onclick={() => { ed.panelEntry = place.next; }} />
    {/if}
    <IconButton icon={ICONS.copy} label={ta('tip.collections.duplicateEntry')} onclick={duplicateEntry} />
    <IconButton icon={ICONS.bin} danger label={ta('tip.collections.deleteEntry')} onclick={deleteEntry} />
  </span>
{/snippet}

<div class="panel-body coll-panel" class:coll-panel-cols={ed.collectionsLayout === 'columns' && view && ed.csvImport?.view !== 'panel'}>
  {#if ed.csvImport?.view === 'panel'}
    <ImportStep />
  {:else if ed.collectionsLayout === 'table' || !view}
    <!-- The collections: the first level of the drill-in and of the two columns, and the table's own list -->
    <CollectionList selected={ed.collectionsLayout === 'table' ? ed.panelCollection : null} onselect={openCollection} />
  {:else if ed.collectionsLayout === 'columns'}
    <!-- Two columns: the collection named in the panel's heading with its menu (CollectionHeading.svelte); its entries at the left between the search, held at the top, and New entry, held at the foot, the entries scrolling between them; the chosen entry at the right under its head, held while its fields scroll -->
    <div class="coll-cols">
      <div class="coll-list">
        <div class="coll-list-head">
          <span class="toolbar-row coll-search">
            <input type="text" bind:value={() => ed.panelQuery, (v) => (ed.panelQuery = v)} placeholder={ta('ph.collections.find')} aria-label={ta('ph.collections.find')} title={ta('ph.collections.find')} />
          </span>
          {#if ticks.length}<SelectionBar id={ed.panelCollection} {ticks} {shownIds} onticks={setTicks} />{/if}
        </div>
        <div class="coll-list-body">
          <EntryList id={ed.panelCollection} {view} {query} selected={ed.panelEntry} chevron={false} onselect={chooseEntry} {ticks} onticks={setTicks} />
        </div>
        <div class="coll-list-foot">
          <button class="ghost action coll-new" title={ta('ui.addEntry')} onclick={newEntry}>{ta('ui.addEntry')}</button>
        </div>
      </div>
      <div class="coll-detail">
        {#if entry}
          {@render entryHead(true)}
          {#key entry.id}<EntryFields id={ed.panelCollection} {entry} kind={view.kind} />{/key}
        {/if}
      </div>
    </div>
  {:else if !entry}
    <!-- Stepping in, the second level: a collection's entries -->
    <span class="coll-crumb">
      <IconButton icon={BACK_ICON} label={ta('tip.collections.back')} onclick={closeCollection} />
      <span class="coll-crumb-words"><span class="coll-crumb-up">{ta('panel.collections')}</span><span class="coll-crumb-name">{view.name ?? ed.panelCollection}</span></span>
      <CollectionMenu id={ed.panelCollection} {ticks} {shownIds} onticks={setTicks} />
    </span>
    {@render search()}
    <EntryList id={ed.panelCollection} {view} {query} onselect={chooseEntry} {ticks} onticks={setTicks} />
  {:else}
    <!-- Stepping in, the third level: one entry with all its fields -->
    <span class="coll-crumb">
      <IconButton icon={BACK_ICON} label={ta('tip.collections.backToEntries', { name: view.name ?? ed.panelCollection })} onclick={backToEntries} />
      <span class="coll-crumb-words"><span class="coll-crumb-up">{view.name ?? ed.panelCollection}</span><span class="coll-crumb-name">{ed.plainTitle(entry.title)}</span></span>
    </span>
    {@render entryHead()}
    {#key entry.id}<EntryFields id={ed.panelCollection} {entry} kind={view.kind} />{/key}
  {/if}
</div>

<style>
  .coll-panel {
    display: grid;
    gap: 0.6rem;
    align-content: start;
  }

  /* The way back and where the panel stands: the level above in small letters over the name of this one */
  .coll-crumb {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }

  .coll-crumb-words {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  .coll-crumb-up {
    font-size: 0.72rem;
    opacity: 0.6;
  }

  .coll-crumb-name {
    overflow: hidden;
    font-size: 0.95rem;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .coll-search input {
    flex: 1;
    min-width: 0;
  }

  .coll-entry-head {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .coll-place {
    font-size: 0.75rem;
    opacity: 0.65;
  }

  .coll-grow {
    flex: 1;
  }

  /* Two columns: the panel's height under the picker, the entries at the left and the chosen entry at the right, each scrolling on its own while the panel itself stands still */
  .coll-panel-cols {
    flex: 1;
    grid-template-rows: minmax(0, 1fr);
    min-height: 0;
  }

  .coll-cols {
    display: grid;
    grid-template-columns: minmax(13rem, 2fr) minmax(0, 3fr);
    gap: 0.8rem;
    min-height: 0;
  }

  .coll-list,
  .coll-detail {
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  /* The list: the search held at the top and New entry at the foot, on the panel's own surface, so the entries pass behind them as they scroll; a short list leaves New entry at the column's foot */
  .coll-list {
    display: flex;
    flex-direction: column;
    padding-right: 0.6rem;
    border-right: 1px solid rgb(255 255 255 / 8%);
  }

  .coll-list-head,
  .coll-list-foot {
    position: sticky;
    z-index: 2;
    display: grid;
    gap: 0.5rem;
    background: var(--urd-color-surface, #151a23);
  }

  .coll-list-head {
    top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .coll-list-body {
    flex: 1 0 auto;
    padding-block: 0.5rem;
  }

  .coll-list-foot {
    bottom: 0;
    padding-top: 0.5rem;
    border-top: 1px solid rgb(255 255 255 / 8%);
  }

  .coll-cols .coll-search input,
  .coll-list-foot .coll-new {
    box-sizing: border-box;
    height: 2rem;
    min-height: 0;
  }

  .coll-list-foot .coll-new {
    width: 100%;
    justify-content: center;
  }

  /* The chosen entry: its head held at the top on the panel's surface, level with the search beside it, its fields scrolling under it */
  .coll-detail {
    display: grid;
    grid-auto-rows: max-content;
    gap: 0.5rem;
    align-content: start;
  }

  .coll-detail > .coll-entry-head {
    position: sticky;
    top: 0;
    z-index: 2;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
    background: var(--urd-color-surface, #151a23);
  }

  .coll-entry-name {
    overflow: hidden;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 0;
  }
</style>
