<script>
  /* The Collections panel: the collections and their entries, with the images, sizes and colours of a product, and CSV in and out. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
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

  const COLLECTION_KINDS = [
    ['news', ta('collectionKind.news')],
    ['notices', ta('collectionKind.notices')],
    ['publications', ta('collectionKind.publications')],
    ['products', ta('collectionKind.products')],
    ['custom', ta('collectionKind.custom')],
  ];

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

  function moveEntry(id, index, dir) {
    mutateCollection(id, `collection:${id}:move-entry`, (data) => {
      const j = index + dir;
      if (j < 0 || j >= data.entries.length) return;
      [data.entries[index], data.entries[j]] = [data.entries[j], data.entries[index]];
    });
  }

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
  function setEntrySizes(id, entryId, text) {
    const sizes = text.split(',').map((s) => s.trim()).filter(Boolean);
    setEntryField(id, entryId, 'sizes', sizes.length ? sizes : '');
  }

  function addEntryColor(id, entryId) {
    mutateCollection(id, `collection:${id}:${entryId}:colors`, (data) => {
      const entry = data.entries.find((e) => e.id === entryId);
      if (!entry) return;
      entry.colors = [...(entry.colors ?? []), { name: ta('ph.colorName') }];
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

<div class="panel-body">
  {#if ed.collectionsUnavailable}
    <p class="panel-hint place-error">{ta('collections.unreadable')}</p>
  {/if}
  {#if collectionIds.length}
    <label>{ta('blocks.collection')}
      <Dropdown value={ed.activeCollection ?? ''}
        options={[['', ta('common.choose')], ...collectionIds.map((id) => [id, collectionsView[id]?.name ?? id])]}
        onchange={(v) => (ed.activeCollection = v || null)} /></label>
  {/if}
  {#if ed.activeCollection && collectionsView[ed.activeCollection]}
    {@const collectionView = collectionsView[ed.activeCollection]}
    <span class="toolbar-row">
      <button class="ghost action" onclick={() => addCollectionEntry(ed.activeCollection)}>{ta('ui.addEntry')}</button>
      <button class="ghost action" title={ta('tip.collections.exportCsv')}
        onclick={() => exportCollectionCsv(ed.activeCollection)}>{ta('ui.exportCsv')}</button>
      <label class="ghost filepick" title={ta('tip.collections.importCsv')}>
        {ta('ui.importCsv')}
        <input type="file" accept=".csv,text/csv" onchange={(e) => importCollectionCsv(ed.activeCollection, e)} />
      </label>
      <button class="ghost row-tool" title={ta('tip.collections.deleteCollection')}
        onclick={() => removeCollection(ed.activeCollection)}>{@html ICONS.cross}</button>
    </span>
    {#each collectionView.entries as entry, i (entry.id)}
      <!-- Collapsible entry: title + date in the summary, the fields inside (panel space) -->
      <details class="group collection-entry">
        <summary>{plainTitle(entry.title)}{collectionView.kind === 'products'
          ? (entry.price != null ? ` · ${entry.price}` : '')
          : (entry.date ? ` · ${entry.date}` : '')}</summary>
        <div class="group-items">
          <span class="toolbar-row">
            <input value={entry.title} title={ta('lbl.title')}
              onchange={(e) => setEntryField(ed.activeCollection, entry.id, 'title', e.target.value || ta('ui.untitled'))} />
            <span class="row-tools">
              <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveEntry(ed.activeCollection, i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
              <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveEntry(ed.activeCollection, i, 1)}
                disabled={i === collectionView.entries.length - 1}>{@html ICONS.down}</button>
              <button class="ghost row-tool" title={ta('tip.collections.deleteEntry')}
                onclick={() => removeEntry(ed.activeCollection, entry.id)}>{@html ICONS.cross}</button>
            </span>
          </span>
          {#if collectionView.kind !== 'products'}
            <label>{ta('lbl.date')}
              <input type="date" value={entry.date ?? ''}
                onchange={(e) => setEntryField(ed.activeCollection, entry.id, 'date', e.target.value)} /></label>
          {/if}
          <textarea rows="3" placeholder={ta('ph.collections.text')}
            value={entry.text ?? ''}
            onchange={(e) => setEntryField(ed.activeCollection, entry.id, 'text', e.target.value)}></textarea>
          {#if collectionView.kind !== 'products'}
            <LinkField scope="site" label={ta('lbl.link')} value={linkOf(entry)} placeholder={ta('ph.collections.href')}
              onchange={(link) => setEntryLink(ed.activeCollection, entry.id, link)} />
          {/if}
          <span class="toolbar-row">
            <label class="ghost filepick">
              {entry.image ? ta('ui.changeImage') : ta('ui.addImage')}
              <input type="file" accept="image/*" onchange={(e) => setEntryImage(ed.activeCollection, entry.id, e)} />
            </label>
            {#if entry.image}
              <img class="site-icon-preview" src={entry.image} alt="" />
              <button class="ghost row-tool" title={ta('tip.removeImage')}
                onclick={() => setEntryField(ed.activeCollection, entry.id, 'image', '')}>{@html ICONS.cross}</button>
            {/if}
          </span>
          {#if entry.image}
            <!-- The picture's alt text, the same the image editor on the canvas shows -->
            <label class="field-stack">{ta('lbl.altText')}
              <input value={entry.imageAlt ?? ''} placeholder={ta('ph.altText')}
                onchange={(e) => setEntryField(ed.activeCollection, entry.id, 'imageAlt', e.target.value.trim())} /></label>
          {/if}
          {#if collectionView.kind === 'products'}
            <!-- The product fields (the shop): price, member price, badge, sizes and colors. -->
            <label>{ta('lbl.price')}
              <input type="number" min="0" step="0.01" value={entry.price ?? ''}
                onchange={(e) => setEntryField(ed.activeCollection, entry.id, 'price', e.target.value === '' ? '' : Number(e.target.value))} /></label>
            <label title={ta('tip.entry.memberPrice')}>{ta('lbl.memberPrice')}
              <input type="number" min="0" step="0.01" value={entry.memberPrice ?? ''}
                onchange={(e) => setEntryField(ed.activeCollection, entry.id, 'memberPrice', e.target.value === '' ? '' : Number(e.target.value))} /></label>
            <label title={ta('tip.entry.badge')}>{ta('lbl.productBadge')}
              <input value={entry.badge ?? ''}
                onchange={(e) => setEntryField(ed.activeCollection, entry.id, 'badge', e.target.value)} /></label>
            <label title={ta('tip.entry.sizes')}>{ta('lbl.sizes')}
              <input value={(entry.sizes ?? []).join(', ')} placeholder={ta('ph.sizes')}
                onchange={(e) => setEntrySizes(ed.activeCollection, entry.id, e.target.value)} /></label>
            {#each entry.colors ?? [] as color, ci (ci)}
              <span class="toolbar-row">
                <input value={color.name} placeholder={ta('ph.colorName')}
                  onchange={(e) => setEntryColor(ed.activeCollection, entry.id, ci, 'name', e.target.value)} />
                <label class="ghost filepick">
                  {color.image ? ta('ui.changeImage') : ta('ui.addImage')}
                  <input type="file" accept="image/*" onchange={(e) => setEntryColorImage(ed.activeCollection, entry.id, ci, e)} />
                </label>
                {#if color.image}
                  <img class="site-icon-preview" src={color.image} alt="" />
                {/if}
                <button class="ghost row-tool" title={ta('tip.entry.removeColor')} onclick={() => removeEntryColor(ed.activeCollection, entry.id, ci)}>{@html ICONS.cross}</button>
              </span>
            {/each}
            <button class="ghost action" title={ta('tip.entry.colors')}
              onclick={() => addEntryColor(ed.activeCollection, entry.id)}>{ta('ui.addColor')}</button>
          {/if}
        </div>
      </details>
    {/each}
    {#if !collectionView.entries.length}
      <p class="panel-hint">{ta('hint.collections.empty')}</p>
    {/if}
    <hr class="gridmenu-divider" />
  {/if}
  {#if !ed.collectionsUnavailable}
    <label>{ta('lbl.newCollectionName')}
      <input bind:value={() => ed.newCollectionName, (v) => (ed.newCollectionName = v)} placeholder={ta('ph.collections.name')}
        onkeydown={(e) => e.key === 'Enter' && addCollection()} /></label>
    <label>{ta('common.type')}
      <Dropdown value={ed.newCollectionKind}
        options={COLLECTION_KINDS}
        onchange={(v) => (ed.newCollectionKind = v)} /></label>
    <button class="ghost action" onclick={addCollection} disabled={!ed.newCollectionName.trim()}>{ta('ui.createCollection')}</button>
  {/if}
</div>
