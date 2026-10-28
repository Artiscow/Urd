<script>
  /* The Collections panel: the collections and their entries, with the images, sizes and colours of a product, and CSV in and out. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext, tick } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import Dropdown from '../lib/Dropdown.svelte';
  import { rowDropAt, reorderRows, stepAmong } from '../lib/row-drag.js';
  import { sortEntries } from '$engine/collections.js';
  import { ta } from '$engine/i18n.js';
  import { makeId } from '$engine/sections/presets.js';
  import { entriesToCsv, csvToEntries } from '$engine/collections-csv.js';
  import { ICONS } from '../lib/icons.js';
  import LinkField from '../lib/LinkField.svelte';
  import { linkOf, setLinkOn } from '../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const collectionIds = $derived(ed.collectionIds);
  const collectionStores = $derived(ed.collectionStores);
  const collectionsView = $derived(ed.collectionsView);
  const { addCollection, addCollectionEntry, compressOrTrim, mutateCollection, plainTitle, removeCollection, setStatus } = ed;
  let panelEl = $state(null);
  /** An entry's card in the panel, looked up within its own collection, since two collections may hold the same entry id. */
  const entryBox = (collection, entryId) => panelEl?.querySelector(`[data-collection-id="${CSS.escape(collection)}"] [data-entry-id="${CSS.escape(entryId)}"]`) ?? null;

  // A collection asked open from outside the panel («Edit the product catalogue», a new collection) opens.
  $effect(() => {
    const want = ed.openRequest;
    if (!want) return;
    openCollections[want.id] = true;
    ed.openRequest = null;
  });

  // A click on a product card in the preview (urd-open-entry): the entry opens, scrolls into view and its field takes the focus.
  $effect(() => {
    const want = ed.focusEntry;
    const collection = ed.activeCollection;
    if (!want || !panelEl || !collection) return;
    // The entry's collection opens first, so the entry has somewhere to show; then the entry's own card.
    openCollections[collection] = true;
    openEntry = `${collection}/${want.id}`;
    ed.focusEntry = null;
    tick().then(() => {
      const box = entryBox(collection, want.id);
      if (!box) return;
      box.scrollIntoView({ block: 'nearest' });
      (box.querySelector(`[data-field="${CSS.escape(want.field)}"]`) ?? box.querySelector('[data-field="title"]'))?.focus();
    });
  });

  const COLLECTION_KINDS = [
    ['news', ta('collectionKind.news')],
    ['notices', ta('collectionKind.notices')],
    ['publications', ta('collectionKind.publications')],
    ['products', ta('collectionKind.products')],
    ['custom', ta('collectionKind.custom')],
  ];

  /** A kind's name in the list; a kind the panel does not know is shown as it is stored. */
  const kindLabel = (kind) => COLLECTION_KINDS.find(([k]) => k === kind)?.[1] ?? kind ?? '';

  function setEntryField(id, entryId, field, value) {
    mutateCollection(id, `edit:collection:${id}:${entryId}:${field}`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      if (value === '' && field !== 'title') delete entry[field];
      else entry[field] = value;
    });
  }

  /** An entry's link from the link editor (the title links to it). */
  function setEntryLink(id, entryId, link) {
    mutateCollection(id, `collection:${id}:${entryId}:link`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (entry) setLinkOn(entry, link);
    });
  }

  /** Whether the page keeps an entry where the panel puts it: a product always, another kind's entry while it has no date, since the collection block sorts dated entries by their date (collections.js). */
  const movable = (kind, entry) => kind === 'products' || !entry.date;

  /** The entries in the order the page shows them: products as stored; other kinds with the dated ones newest first and the undated after them in their stored order, as the collection block shows them by default. */
  const shownEntries = (view) => (view.kind === 'products' ? view.entries : sortEntries(view.entries, true));

  /** The arrows: a step past the next entry that moves, the dated ones keeping their places. */
  function moveEntry(id, entryId, dir) {
    mutateCollection(id, `collection:${id}:move-entry`, (data) => {
      data.entries = stepAmong(data.entries, (en) => movable(data.kind, en), (en) => en.id, entryId, dir);
    });
  }

  /* The entries as the Nav panel's rows: closed, one line with the title and the date or the price; open, a card with the fields, one entry open at a time in the panel (kept as «collection/entry», since two collections may hold the same entry id).
     The head is the drag handle, and a faint clone shows where the entry lands (row-drag.js); the arrows on the head still move it a step. */
  let openEntry = $state(null);
  // The collections open, each on its own: a change inside never folds one, and two can stand open together.
  let openCollections = $state({});
  let entryDrag = $state(null);
  let entryDrop = $state(null);
  const CHEV_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const GRIP_ICON = '<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.3"/><circle cx="7" cy="3" r="1.3"/><circle cx="3" cy="8" r="1.3"/><circle cx="7" cy="8" r="1.3"/><circle cx="3" cy="13" r="1.3"/><circle cx="7" cy="13" r="1.3"/></svg>';
  const ENTRY_DRAG_TYPE = 'application/x-urd-collection-entry';

  /** The card's closing: its fold shrinks its one grid row to nothing, the mirror of the opening animation in app.css. */
  function foldOut(node, { duration }) {
    return { duration, easing: cubicOut, css: (t) => `grid-template-rows: ${t}fr` };
  }

  /** What a closed row says after its title: the date, or the price of a product. */
  function entryMeta(kind, entry) {
    if (kind === 'products') return entry.price != null ? String(entry.price) : '';
    return entry.date ?? '';
  }

  /** The drag over a collection's list: the clone's place follows the pointer (rowDropAt). */
  function onEntriesDragOver(e, id) {
    if (entryDrag?.collection !== id) return;
    // Only the entries that move take part: a dated entry keeps its place by its date.
    const rows = [...e.currentTarget.querySelectorAll('.nav-item[data-movable]:not(.ghost)')].map((r) => { const b = r.getBoundingClientRect(); return { id: r.dataset.entryId, top: b.top, bottom: b.bottom }; });
    const drop = rowDropAt(rows, entryDrag.id, e.clientY);
    if (!drop) { entryDrop = null; return; }
    e.preventDefault();
    if (entryDrop?.id !== drop.id || entryDrop?.pos !== drop.pos) entryDrop = drop;
  }

  /** The drop, in one undo step: the entry leaves its place and lands before or after the target. */
  function dropEntry() {
    const drag = entryDrag; const drop = entryDrop;
    entryDrag = null; entryDrop = null;
    if (!drag || !drop) return;
    mutateCollection(drag.collection, `collection:${drag.collection}:move-entry`, (data) => {
      data.entries = reorderRows(data.entries, (en) => en.id, drag.id, drop);
    });
  }

  /** The end of a drag: a release outside the list still lands the entry where the clone last stood; a drag cancelled with Escape moves nothing. */
  function endEntryDrag(e) {
    if (entryDrop && e?.dataTransfer?.dropEffect !== 'none') dropEntry();
    entryDrag = null; entryDrop = null;
  }

  // While an entry is dragged the whole admin document accepts the drop, so a release beside the list is a drop and Escape is the only cancel.
  $effect(() => {
    if (!entryDrag) return;
    const accept = (e) => e.preventDefault();
    window.addEventListener('dragover', accept);
    window.addEventListener('drop', accept);
    return () => {
      window.removeEventListener('dragover', accept);
      window.removeEventListener('drop', accept);
    };
  });

  function removeEntry(id, entryId) {
    mutateCollection(id, `collection:${id}:remove-entry`, (data) => {
      data.entries = data.entries.filter((e) => e.id !== entryId);
    });
  }

  /** Entry image: same webp flow as block images; materialized on publish. */
  async function setEntryImage(id, entryId, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const img = await compressOrTrim(file);
    setEntryField(id, entryId, 'image', img.dataUrl);
  }

  /** The product fields (kind products): the size list is written comma-separated. */
  /** Whether another colour of the entry has the same name, read as a buyer reads it (case and spaces aside). */
  function sameColorName(colors, index) {
    const name = (colors[index]?.name ?? '').trim().toLowerCase();
    return Boolean(name) && colors.some((c, j) => j !== index && (c?.name ?? '').trim().toLowerCase() === name);
  }

  /** Sizes typed into the add field join the entry's sizes, one or several divided by commas, each once. */
  function addEntrySizes(id, entryId, text) {
    const typed = text.split(',').map((s) => s.trim()).filter(Boolean);
    if (!typed.length) return;
    mutateCollection(id, `collection:${id}:${entryId}:sizes`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      const sizes = Array.isArray(entry.sizes) ? entry.sizes : [];
      entry.sizes = [...sizes, ...typed.filter((t) => !sizes.includes(t))];
    });
  }

  function removeEntrySize(id, entryId, index) {
    mutateCollection(id, `collection:${id}:${entryId}:sizes`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry || !Array.isArray(entry.sizes)) return;
      entry.sizes = entry.sizes.filter((_, i) => i !== index);
      if (!entry.sizes.length) delete entry.sizes;
    });
  }

  /** A new colour first in the list, its name field focused with the seed words selected, so typing names it. */
  function addEntryColor(id, entryId) {
    mutateCollection(id, `collection:${id}:${entryId}:colors`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      entry.colors = [{ name: ta('ph.colorName') }, ...(entry.colors ?? [])];
    });
    tick().then(() => {
      const field = entryBox(id, entryId)?.querySelector('.entry-color input');
      field?.focus();
      field?.select();
    });
  }

  function setEntryColor(id, entryId, index, field, value) {
    mutateCollection(id, `edit:collection:${id}:${entryId}:color:${index}:${field}`, (data) => {
      const color = data.entries.find((e) => e.id === entryId)?.colors?.[index];
      if (!color) return;
      // The name can never be emptied (the schema requires it); the image can be removed.
      if (field === 'image' && !value) delete color.image;
      else if (value) color[field] = value;
    });
  }

  async function setEntryColorImage(id, entryId, index, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const img = await compressOrTrim(file);
    setEntryColor(id, entryId, index, 'image', img.dataUrl);
  }

  function removeEntryColor(id, entryId, index) {
    mutateCollection(id, `collection:${id}:${entryId}:colors`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry?.colors) return;
      entry.colors = entry.colors.filter((_, i) => i !== index);
      if (!entry.colors.length) delete entry.colors;
    });
  }

  /** CSV export: the entries are downloaded as <id>.csv. */
  function exportCollectionCsv(id) {
    const data = collectionStores[id]?.data;
    if (!data) return;
    const url = URL.createObjectURL(new Blob([entriesToCsv(data.entries, ed.siteDraft?.pages ?? [])], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** CSV import: REPLACES the collection's entries with the rows from the
   *  file (undo exists). Missing/invalid ids get new ones; pure parsing
   *  lives in engine/collections-csv.js. */
  async function importCollectionCsv(id, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const parsed = csvToEntries(await file.text(), ed.siteDraft?.pages ?? []);
    if (!parsed) {
      setStatus(ta('status.csvInvalid'), 'error');
      return;
    }
    const used = new Set();
    for (const entry of parsed.entries) {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(entry.id) || used.has(entry.id)) entry.id = makeId('entry');
      used.add(entry.id);
    }
    mutateCollection(id, `collection:${id}:import`, (data) => { data.entries = parsed.entries; });
    setStatus(ta('status.csvImported', { count: String(parsed.entries.length) }), 'ok');
  }
</script>

{#snippet holdSwitch(id, entry)}
  <!-- How «Add to basket» waits for the required choices: greyed and unpressable until they are made, or (off) asking for them when pressed -->
  <label class="gridmenu-snap entry-require entry-require-sub" title={ta('tip.entry.disableUntilChosen')}>
    <input type="checkbox" checked={entry.disableUntilChosen === true}
      onchange={(e) => setEntryField(id, entry.id, 'disableUntilChosen', e.target.checked || '')} />
    {ta('lbl.disableUntilChosen')}
  </label>
{/snippet}

{#snippet entryGhost(kind)}
  {@const dragged = entryDrag ? collectionsView[entryDrag.collection]?.entries.find((en) => en.id === entryDrag.id) : null}
  <!-- The faint clone at the landing place -->
  <div class="nav-item ghost" aria-hidden="true">
    <div class="nav-head">
      <span class="nav-grip">{@html GRIP_ICON}</span>
      <span class="nav-head-name ghost-name">{dragged ? plainTitle(dragged.title) : ''}</span>
      <span class="nav-head-link ghost-target">{dragged ? entryMeta(kind, dragged) : ''}</span>
    </div>
  </div>
{/snippet}

<div class="panel-body" bind:this={panelEl}>
  {#if ed.collectionsUnavailable}
    <p class="panel-hint place-error">{ta('collections.unreadable')}</p>
  {/if}
  <!-- The site's collections as cards that open as the entries do: the name, the kind and the count on the head, the toolbar and the entries inside, growing open and shrinking shut -->
  {#each collectionIds as id (id)}
    {@const view = collectionsView[id]}
    {@const collectionView = view}
    {@const shown = view ? shownEntries(view) : []}
    {@const movables = view ? shown.filter((en) => movable(view.kind, en)) : []}
    {@const isOpen = Boolean(openCollections[id])}
    <div class="collection-fold" class:open={isOpen} data-collection-id={id}>
      <button type="button" class="collection-head" title={ta('tip.collections.pick')} aria-expanded={isOpen}
        onclick={() => (openCollections[id] = !isOpen)}>
        <span class="collection-name">{view?.name ?? id}</span>
        <span class="collection-meta">{kindLabel(view?.kind)}</span>
        <span class="collection-meta">{ta('collections.entryCount', { n: view?.entries.length ?? 0 })}</span>
        <span class="collection-chev" aria-hidden="true">{@html CHEV_ICON}</span>
      </button>
      {#if isOpen && view}
      <div class="nav-fold" out:foldOut={{ duration: ed.reducedMotion ? 0 : 160 }}>
      <div class="collection-body">
    <!-- The collection's tools: the new entry in words, the CSV out and in and the delete as the icon tools the entry rows have, their names in the tooltips -->
    <span class="toolbar-row">
      <button class="ghost action" onclick={() => addCollectionEntry(id)}>{ta('ui.addEntry')}</button>
      <span class="row-tools">
        <button class="ghost row-tool" title={`${ta('ui.exportCsv')}: ${ta('tip.collections.exportCsv')}`} aria-label={ta('ui.exportCsv')}
          onclick={() => exportCollectionCsv(id)}>{@html ICONS.download}</button>
        <label class="ghost row-tool filepick" title={`${ta('ui.importCsv')}: ${ta('tip.collections.importCsv')}`} aria-label={ta('ui.importCsv')}>
          {@html ICONS.upload}
          <input type="file" accept=".csv,text/csv" onchange={(e) => importCollectionCsv(id, e)} />
        </label>
        <button class="ghost row-tool" title={ta('tip.collections.deleteCollection')}
          onclick={() => removeCollection(id)}>{@html ICONS.cross}</button>
      </span>
    </span>
    <div class="nav-list entries-list" role="list"
      ondragover={(e) => onEntriesDragOver(e, id)}
      ondrop={(e) => { e.preventDefault(); dropEntry(); }}>
    {#each shown as entry (entry.id)}
      {@const open = openEntry === `${id}/${entry.id}`}
      {@const canMove = movable(collectionView.kind, entry)}
      {@const at = movables.indexOf(entry)}
      {#if entryDrag?.collection === id && entryDrop?.id === entry.id && entryDrop.pos === 'before'}{@render entryGhost(collectionView.kind)}{/if}
      <div class="nav-item" class:open class:dragging={entryDrag?.id === entry.id} data-entry-id={entry.id} data-movable={canMove || undefined} role="listitem">
        <!-- The head is the handle of an entry that moves: the fields sit in the body, so a drag never fights a text selection. A dated entry stands by its date, as on the page, and has no handle -->
        <div class="nav-head" draggable={canMove ? 'true' : undefined} title={canMove ? ta('tip.collections.dragEntry') : ta('tip.collections.datedOrder')}
          onclick={(e) => { e.stopPropagation(); openEntry = open ? null : `${id}/${entry.id}`; }}
          ondragstart={(e) => { if (!canMove) { e.preventDefault(); return; } e.stopPropagation(); entryDrag = { collection: id, id: entry.id }; e.dataTransfer?.setData(ENTRY_DRAG_TYPE, entry.id); }}
          ondragend={endEntryDrag}>
          <span class="nav-grip" class:nav-grip-off={!canMove}>{@html GRIP_ICON}</span>
          <span class="nav-head-name">{plainTitle(entry.title)}</span>
          <span class="nav-head-link">{entryMeta(collectionView.kind, entry)}</span>
          {#if canMove}
            <span class="nav-head-tools" onclick={(e) => e.stopPropagation()}>
              <button class="ghost nav-act" title={ta('tip.moveUp')} disabled={at === 0} onclick={() => moveEntry(id, entry.id, -1)}>{@html ICONS.up}</button>
              <button class="ghost nav-act" title={ta('tip.moveDown')} disabled={at === movables.length - 1} onclick={() => moveEntry(id, entry.id, 1)}>{@html ICONS.down}</button>
            </span>
          {/if}
          <button class="ghost nav-act nav-chev" aria-expanded={open} title={ta('tip.collections.openEntry')} aria-label={ta('tip.collections.openEntry')}>{@html CHEV_ICON}</button>
        </div>
        {#if open}
        <!-- The fold grows from nothing as the card opens (a CSS animation on the wrapper) and shrinks back as it closes -->
        <div class="nav-fold" out:foldOut={{ duration: ed.reducedMotion ? 0 : 160 }}>
        <div class="entry-body">
          <span class="toolbar-row">
            <input value={entry.title} title={ta('lbl.title')} data-field="title"
              onchange={(e) => setEntryField(id, entry.id, 'title', e.target.value || ta('ui.untitled'))} />
            <button class="ghost row-tool" title={ta('tip.collections.deleteEntry')}
              onclick={() => removeEntry(id, entry.id)}>{@html ICONS.cross}</button>
          </span>
          {#if collectionView.kind !== 'products'}
            <div class="entry-fields">
              <span class="nav-body-label">{ta('lbl.date')}</span>
              <input type="date" class="entry-date" value={entry.date ?? ''} title={ta('tip.entry.date')}
                onchange={(e) => setEntryField(id, entry.id, 'date', e.target.value)} />
            </div>
          {/if}
          <textarea rows="3" placeholder={ta('ph.collections.text')} data-field="text"
            value={entry.text ?? ''}
            onchange={(e) => setEntryField(id, entry.id, 'text', e.target.value)}></textarea>
          {#if collectionView.kind !== 'products'}
            <LinkField scope="site" label={ta('lbl.link')} value={linkOf(entry)} placeholder={ta('ph.collections.href')}
              onchange={(link) => setEntryLink(id, entry.id, link)} />
          {/if}
          <!-- The picture large enough to tell what it shows, with its change and its removal beside it -->
          <div class="entry-image" class:empty={!entry.image}>
            {#if entry.image}<img class="entry-image-thumb" src={entry.image} alt="" />{/if}
            <span class="entry-image-actions">
              <label title={ta('tip.entry.image')} class="ghost filepick">
                {entry.image ? ta('ui.changeImage') : ta('ui.addImage')}
                <input type="file" accept="image/*" onchange={(e) => setEntryImage(id, entry.id, e)} />
              </label>
              {#if entry.image}
                <button class="ghost" title={ta('tip.removeImage')}
                  onclick={() => setEntryField(id, entry.id, 'image', '')}>{ta('ui.removeImage')}</button>
              {/if}
            </span>
          </div>
          {#if entry.image}
            <!-- The picture's alt text, the same the image editor on the canvas shows -->
            <label title={ta('tip.image.alt')} class="field-stack">{ta('lbl.altText')}
              <input value={entry.imageAlt ?? ''} placeholder={ta('ph.altText')}
                onchange={(e) => setEntryField(id, entry.id, 'imageAlt', e.target.value.trim())} /></label>
          {/if}
          {#if collectionView.kind === 'products'}
            <!-- The product fields (the shop) on one grid, the names in a column of their own as the Nav card's body sets them: price, member price, badge and sizes, then the colours as rows with their picture -->
            <div class="entry-fields">
              <span class="nav-body-label" title={ta('tip.entry.price')}>{ta('lbl.price')}</span>
              <input type="number" min="0" step="0.01" value={entry.price ?? ''} data-field="price" title={ta('tip.entry.price')}
                onchange={(e) => setEntryField(id, entry.id, 'price', e.target.value === '' ? '' : Number(e.target.value))} />
              <span class="nav-body-label" title={ta('tip.entry.memberPrice')}>{ta('lbl.memberPrice')}</span>
              <input type="number" min="0" step="0.01" value={entry.memberPrice ?? ''} title={ta('tip.entry.memberPrice')}
                onchange={(e) => setEntryField(id, entry.id, 'memberPrice', e.target.value === '' ? '' : Number(e.target.value))} />
              <span class="nav-body-label" title={ta('tip.entry.badge')}>{ta('lbl.productBadge')}</span>
              <input value={entry.badge ?? ''} data-field="badge" title={ta('tip.entry.badge')}
                onchange={(e) => setEntryField(id, entry.id, 'badge', e.target.value)} />
            </div>
            <!-- The sizes as chips, each read whole and taken away on its own, and a field that adds one or several divided by commas -->
            <span class="nav-body-label entry-part" title={ta('tip.entry.sizes')}>{ta('lbl.sizes')}</span>
            {#if entry.sizes?.length}
              <!-- This product's buyer must choose a size before «Add to basket» -->
              <label class="gridmenu-snap entry-require" title={ta('tip.entry.requireSize')}>
                <input type="checkbox" checked={entry.requireSize === true}
                  onchange={(e) => setEntryField(id, entry.id, 'requireSize', e.target.checked || '')} />
                {ta('lbl.requireSize')}
              </label>
              {#if entry.requireSize === true}{@render holdSwitch(id, entry)}{/if}
            {/if}
            <div class="entry-chips">
              {#each entry.sizes ?? [] as size, si (si)}
                <span class="entry-chip">{size}<button type="button" class="entry-chip-x" title={ta('tip.entry.removeSize')} aria-label={ta('tip.entry.removeSize')}
                  onclick={() => removeEntrySize(id, entry.id, si)}>{@html ICONS.cross}</button></span>
              {/each}
              <input class="entry-chip-add" placeholder={ta('ph.addSize')} title={ta('tip.entry.sizes')} data-field="sizes"
                onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEntrySizes(id, entry.id, e.currentTarget.value); e.currentTarget.value = ''; } }}
                onchange={(e) => { addEntrySizes(id, entry.id, e.currentTarget.value); e.currentTarget.value = ''; }} />
            </div>
            <!-- The colours across the card: the switch and «+ Colour» first, then the colours, a new one at the top; each with its name, its picture and its removal -->
            <span class="nav-body-label entry-part" title={ta('tip.entry.colors')}>{ta('lbl.colors')}</span>
            {#if entry.colors?.some((c) => c?.name)}
              <!-- This product's buyer must choose a colour before «Add to basket» -->
              <label class="gridmenu-snap entry-require" title={ta('tip.entry.requireColor')}>
                <input type="checkbox" checked={entry.requireColor === true}
                  onchange={(e) => setEntryField(id, entry.id, 'requireColor', e.target.checked || '')} />
                {ta('lbl.requireColor')}
              </label>
              <!-- The one grey-out switch stands under the first requirement that is on: here when the size asks for nothing -->
              {#if entry.requireColor === true && !(entry.sizes?.length && entry.requireSize === true)}{@render holdSwitch(id, entry)}{/if}
            {/if}
            <button class="ghost action entry-add-color" title={ta('tip.entry.colors')} data-field="colors"
              onclick={() => addEntryColor(id, entry.id)}>{ta('ui.addColor')}</button>
            {#each entry.colors ?? [] as color, ci (ci)}
              {@const twice = sameColorName(entry.colors, ci)}
              <!-- A name another colour has too is marked: the page keeps the two apart, but a buyer reads the same words and the order names the colour by them -->
              <span class="entry-color" class:twice>
                <input value={color.name} placeholder={ta('ph.colorName')} title={twice ? ta('tip.entry.colorTwice') : ta('tip.entry.colors')}
                  aria-invalid={twice || undefined}
                  onchange={(e) => setEntryColor(id, entry.id, ci, 'name', e.target.value)} />
                {#if twice}<span class="entry-color-warn" title={ta('tip.entry.colorTwice')} role="img" aria-label={ta('tip.entry.colorTwice')}>{@html ICONS.warn}</span>{/if}
                <label title={color.image ? ta('ui.changeImage') : ta('tip.entry.colorImage')} class="ghost row-tool filepick entry-color-pick" aria-label={color.image ? ta('ui.changeImage') : ta('ui.addImage')}>
                  {#if color.image}<img class="entry-color-thumb" src={color.image} alt="" />{:else}{@html ICONS.image}{/if}
                  <input type="file" accept="image/*" onchange={(e) => setEntryColorImage(id, entry.id, ci, e)} />
                </label>
                <button class="ghost row-tool" title={ta('tip.entry.removeColor')} onclick={() => removeEntryColor(id, entry.id, ci)}>{@html ICONS.cross}</button>
              </span>
            {/each}

          {/if}
        </div>
        </div>
        {/if}
      </div>
      {#if entryDrag?.collection === id && entryDrop?.id === entry.id && entryDrop.pos === 'after'}{@render entryGhost(collectionView.kind)}{/if}
    {/each}
    </div>
    {#if !collectionView.entries.length}
      <p class="panel-hint">{ta('hint.collections.empty')}</p>
    {/if}
      </div>
      </div>
      {/if}
    </div>
  {/each}
  {#if !ed.collectionsUnavailable}
    {#if collectionIds.length}<hr class="gridmenu-divider" />{/if}
    <p class="mini-label group-sub">{ta('ui.newCollection')}</p>
    <label title={ta('tip.collections.newName')}>{ta('lbl.newCollectionName')}
      <input bind:value={() => ed.newCollectionName, (v) => (ed.newCollectionName = v)} placeholder={ta('ph.collections.name')}
        onkeydown={(e) => e.key === 'Enter' && addCollection()} /></label>
    <label title={ta('tip.collections.kind')}>{ta('common.type')}
      <Dropdown value={ed.newCollectionKind}
        options={COLLECTION_KINDS}
        onchange={(v) => (ed.newCollectionKind = v)} /></label>
    <button class="ghost action" onclick={addCollection} disabled={!ed.newCollectionName.trim()}>{ta('ui.createCollection')}</button>
  {/if}
</div>
