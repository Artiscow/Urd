<script>
  /* The Blocks panel: the palette of block types, the calendar designs, the images and galleries added with pictures, the plugin blocks and the saved templates. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { makeId } from '$engine/sections/presets.js';
  import { searchItemsAny } from '$engine/search-langs.js';
  import { searchLangs } from '../lib/search-langs.svelte.js';
  import { calDesignGroups } from '$engine/calendar-designs.js';
  import { PALETTE_GROUPS, PALETTE_KINDS } from '$engine/block-palette.js';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const bridge = $derived(ed.bridge);
  const iframeEl = $derived(ed.iframeEl);
  const pluginBlocks = $derived(ed.pluginBlocks);
  const templateIds = $derived(ed.templateIds);
  const templateStores = $derived(ed.templateStores);
  const viewMode = $derived(ed.viewMode);
  const { addCalendarDesign, buildBlock, compressMany, imageForBlock, reportImage, reportUpload, requestPlacement, setStatus } = ed;

  function addBlock(kind) {
    requestPlacement(buildBlock(kind));
  }

  /** Core blocks whose Content panel is the field contract (the same
   *  renderer as plugin fields): place search, numbers, toggles, selects. */
  function addPluginBlock(entry, extraProps = {}) {
    // pluginBlocks is $state: structuredClone on a reactive proxy throws
    // DataCloneError (same trap as postMessage). Snapshot yields plain
    // objects; it also works on non-reactive values.
    const raw = $state.snapshot(entry);
    requestPlacement({
      id: makeId('blk'),
      type: raw.type,
      version: raw.version ?? 1,
      decor: false,
      props: { ...(raw.defaults ?? {}), ...$state.snapshot(extraProps) },
      animation: null,
      frames: { desktop: { x: 25, y: 40, w: 50, h: 260, z: 1, rot: 0 }, mobile: null },
    });
  }

  /* The block search in the panel (a flat hit list). The index is built
     from the VISIBLE labels the panel already shows: core blocks, shapes,
     block-group templates and plugin blocks (variants flattened). */
  let blockSearch = $state('');
  // The hits in every language: a typed query loads the other languages once, and the list runs again when they are in.
  const blockHits = $derived.by(() => {
    searchLangs.need(blockSearch);
    void searchLangs.ready;
    return searchItemsAny(panelBlockItems(), blockSearch, (item) => item.label);
  });

  function panelBlockItems() {
    // The palette's kinds in its order, the image and the gallery from pictures as the panel adds them, then the calendar's views and designs, which the hit list reaches by name.
    const items = [];
    for (const group of PALETTE_GROUPS) {
      for (const kind of group.kinds) {
        const def = PALETTE_KINDS[kind];
        const label = ta(def.labelKey);
        if (def.files === 'one') items.push({ label, act: 'image' });
        else if (def.files === 'many') items.push({ label, act: 'galleryImages' });
        else if (def.action === 'designs') items.push({ label, act: 'designs' });
        else items.push({ label, act: 'block', kind });
      }
    }
    items.push(
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewCards')}`, act: 'block', kind: 'calendar-cards' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewMonth')}`, act: 'block', kind: 'calendar-month' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewNext')}`, act: 'block', kind: 'calendar-next' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewAgenda')}`, act: 'block', kind: 'calendar-agenda' },
      ...calDesignGroups().flatMap((group) => group.designs).filter((d) => d.id !== 'plain')
        .map((d) => ({ label: `${ta('blocks.calendar')}: ${ta(d.labelKey)}`, act: 'calendarDesign', design: d.id })),
    );
    for (const id of templateIds) {
      const tpl = templateStores[id]?.data?.mal;
      if (tpl?.kind === 'blocks') items.push({ label: tpl.name, act: 'template', id });
    }
    for (const entry of pluginBlocks) {
      if (entry.variants?.length) {
        for (const variant of entry.variants) {
          items.push({ label: `${entry.label}: ${variant.label}`, act: 'plugin', entry, props: variant.props });
        }
      } else {
        items.push({ label: entry.label, act: 'plugin', entry });
      }
    }
    return items;
  }

  function runPanelItem(item) {
    if (item.act === 'block') addBlock(item.kind);
    else if (item.act === 'calendarDesign') addCalendarDesign(item.design);
    else if (item.act === 'plugin') addPluginBlock(item.entry, item.props ?? {});
    else if (item.act === 'template') bridge?.sendInsertTemplate(item.id);
    else if (item.act === 'designs') ed.designPicker = { mode: 'add' };
  }

  /** + Image: compress to webp and put in the draft as a data URL.
   *  On publish it is materialized to a file in media/. */
  async function addImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const img = await imageForBlock(file);
    if (!img) return;

    // Start width 30 % of the section; the height follows the image's
    // aspect ratio with an assumed section width (freely adjusted afterwards anyway).
    const height = Math.round((img.height / img.width) * 0.3 * (iframeEl?.clientWidth ?? 1280));
    requestPlacement({
      id: makeId('blk'),
      type: 'image',
      version: 1,
      props: { src: img.src, alt: img.alt, fit: 'cover', radius: 'md', href: null },
      animation: null,
      frames: { desktop: { x: 4, y: 8, w: 30, h: Math.max(40, height), z: 1, rot: 0 }, mobile: null },
    });
    reportImage(img.bytes);
  }

  /** "Gallery with images" in the palette: build the block pre-filled. */
  async function addGalleryBlock(event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (!images.length) {
      reportUpload(0, failed, big);
      return;
    }
    const block = buildBlock('gallery');
    block.props.images = images;
    requestPlacement(block);
    reportUpload(images.length, failed, big);
  }
</script>

<div class="panel-body" class:locked={viewMode === 'mobile'}
  title={viewMode === 'mobile' ? ta('tip.blocks.mobileLocked') : undefined}>
  <input type="text" bind:value={blockSearch}
    placeholder={ta('canvas.searchBlocks')} title={ta('canvas.searchBlocks')} />
  {#if blockSearch.trim()}
    <!-- An active search shows a flat, ranked hit list instead
         of the groups. -->
    {#each blockHits as item (item.label)}
      {#if item.act === 'image'}
        <label class="ghost filepick" title={ta('tip.webpAuto')}>
          {item.label}
          <input type="file" accept="image/*" onchange={addImage} />
        </label>
      {:else if item.act === 'galleryImages'}
        <label class="ghost filepick" title={ta('tip.blocks.galleryImages')}>
          {item.label}
          <input type="file" accept="image/*" multiple onchange={addGalleryBlock} />
        </label>
      {:else}
        <button class="ghost" onclick={() => runPanelItem(item)}>{item.label}</button>
      {/if}
    {:else}
      <p class="panel-hint">{ta('canvas.searchEmpty')}</p>
    {/each}
  {:else}
  <!-- The palette's groups in the order the canvas's «+ New block» shares (block-palette.js), a picture and a name per entry -->
  {#each PALETTE_GROUPS as group (group.id)}
    <p class="mini-label group-sub">{ta(group.labelKey)}</p>
    <div class="tile-grid cols-3 palette-grid">
      {#each group.kinds as kind (kind)}
        {@const def = PALETTE_KINDS[kind]}
        {#if def.files}
          <label class="tile filepick" title={ta(def.tipKey)}>{@html def.picture}<span>{ta(def.labelKey)}</span>
            <input type="file" accept="image/*" multiple={def.files === 'many'} onchange={def.files === 'many' ? addGalleryBlock : addImage} /></label>
        {:else if def.action === 'designs'}
          <button type="button" class="tile" title={ta(def.tipKey)} onclick={() => (ed.designPicker = { mode: 'add' })}>{@html def.picture}<span>{ta(def.labelKey)}</span></button>
        {:else}
          <button type="button" class="tile" title={def.tipKey ? ta(def.tipKey) : undefined} onclick={() => addBlock(kind)}>{@html def.picture}<span>{ta(def.labelKey)}</span></button>
        {/if}
      {/each}
    </div>
  {/each}
  {#if templateIds.some((id) => templateStores[id]?.data?.mal?.kind === 'blocks')}
    {@const blockGroupTemplates = templateIds.filter((id) => templateStores[id]?.data?.mal?.kind === 'blocks')}
    <details class="group">
      <summary>{ta('canvas.tabMyTemplates')}</summary>
      <div class="group-items">
        {#each blockGroupTemplates as id (id)}
          <button class="ghost" title={ta('canvas.insertGroup')}
            onclick={() => bridge?.sendInsertTemplate(id)}>{templateStores[id].data.mal.name}</button>
        {/each}
      </div>
    </details>
  {/if}
  {#if pluginBlocks.length}
    <details class="group">
      <summary>{ta('panel.plugins')}</summary>
      <div class="group-items">
        {#each pluginBlocks as entry (entry.type)}
          {#if entry.variants?.length}
            <details class="group">
              <summary>{entry.label}</summary>
              <div class="group-items">
                {#each entry.variants as variant (variant.label)}
                  <button class="ghost" title={ta('tip.blocks.fromPlugin', { plugin: entry.plugin })}
                    onclick={() => addPluginBlock(entry, variant.props)}>{variant.label}</button>
                {/each}
              </div>
            </details>
          {:else}
            <button class="ghost" title={ta('tip.blocks.fromPlugin', { plugin: entry.plugin })}
              onclick={() => addPluginBlock(entry)}>{entry.label}</button>
          {/if}
        {/each}
      </div>
    </details>
  {/if}
  {/if}
</div>
