<script>
  /* The Blocks panel: the palette of block types, the calendar designs, the images and galleries added with pictures, the plugin blocks and the saved templates. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { makeId } from '$engine/sections/presets.js';
  import { searchItemsAny } from '$engine/search-langs.js';
  import { searchLangs } from '../lib/search-langs.svelte.js';
  import { slugify, WARN_BYTES } from '$engine/imageTools.js';
  import { calDesignGroups } from '$engine/calendar-designs.js';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const bridge = $derived(ed.bridge);
  const iframeEl = $derived(ed.iframeEl);
  const pluginBlocks = $derived(ed.pluginBlocks);
  const templateIds = $derived(ed.templateIds);
  const templateStores = $derived(ed.templateStores);
  const viewMode = $derived(ed.viewMode);
  const { addCalendarDesign, buildBlock, compressMany, compressOrTrim, imageErrorText, reportUpload, requestPlacement, setStatus } = ed;

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
    const items = [
      { label: ta('blocks.text'), act: 'block', kind: 'text' },
      { label: ta('ui.textBox'), act: 'block', kind: 'text-box' },
      { label: ta('blocks.button'), act: 'block', kind: 'button' },
      { label: ta('blocks.image'), act: 'image' },
      { label: ta('blocks.video'), act: 'block', kind: 'video' },
      { label: ta('blocks.icon'), act: 'block', kind: 'icon' },
      { label: ta('blocks.map'), act: 'block', kind: 'map' },
      { label: ta('blocks.form'), act: 'block', kind: 'form' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewList')}`, act: 'block', kind: 'calendar' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewCards')}`, act: 'block', kind: 'calendar-cards' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewMonth')}`, act: 'block', kind: 'calendar-month' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewNext')}`, act: 'block', kind: 'calendar-next' },
      { label: `${ta('blocks.calendar')}: ${ta('calendar.viewAgenda')}`, act: 'block', kind: 'calendar-agenda' },
      ...calDesignGroups().flatMap((group) => group.designs).filter((d) => d.id !== 'plain')
        .map((d) => ({ label: `${ta('blocks.calendar')}: ${ta(d.labelKey)}`, act: 'calendarDesign', design: d.id })),
      { label: ta('blocks.collection'), act: 'block', kind: 'collection' },
      { label: ta('blocks.faq'), act: 'block', kind: 'faq' },
      { label: ta('blocks.timeline'), act: 'block', kind: 'timeline' },
      { label: ta('blocks.quote'), act: 'block', kind: 'quote' },
      { label: ta('blocks.stats'), act: 'block', kind: 'stats' },
    { label: ta('blocks.ribbon'), act: 'block', kind: 'ribbon' },
      { label: ta('blocks.table'), act: 'block', kind: 'table' },
      { label: ta('blocks.share'), act: 'block', kind: 'share' },
      { label: ta('blocks.contact'), act: 'block', kind: 'contact' },
      { label: ta('blocks.countdown'), act: 'block', kind: 'countdown' },
      { label: ta('blocks.audio'), act: 'block', kind: 'audio' },
      { label: ta('blocks.product'), act: 'block', kind: 'product' },
      { label: ta('blocks.cart'), act: 'block', kind: 'cart' },
      { label: ta('blocks.checkout'), act: 'block', kind: 'checkout' },
      { label: ta('ui.emptyGallery'), act: 'block', kind: 'gallery' },
      { label: ta('ui.galleryWithImages'), act: 'galleryImages' },
      { label: ta('shape.line'), act: 'block', kind: 'shape-line' },
      { label: ta('shape.arrow'), act: 'block', kind: 'shape-arrow' },
      { label: ta('shape.circle'), act: 'block', kind: 'shape-circle' },
      { label: ta('shape.rect'), act: 'block', kind: 'shape-rect' },
      { label: ta('shape.triangle'), act: 'block', kind: 'shape-triangle' },
    ];
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
  }

  /** + Image: compress to webp and put in the draft as a data URL.
   *  On publish it is materialized to a file in media/. */
  async function addImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setStatus(ta('status.compressingImage'));
    let img;
    try {
      img = await compressOrTrim(file);
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
      return;
    }

    // Start width 30 % of the section; the height follows the image's
    // aspect ratio with an assumed section width (freely adjusted afterwards anyway).
    const height = Math.round((img.height / img.width) * 0.3 * (iframeEl?.clientWidth ?? 1280));
    requestPlacement({
      id: makeId('blk'),
      type: 'image',
      version: 1,
      props: { src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), fit: 'cover', radius: 'md', href: null },
      animation: null,
      frames: { desktop: { x: 4, y: 8, w: 30, h: Math.max(40, height), z: 1, rot: 0 }, mobile: null },
    });
    if (img.bytes > WARN_BYTES) {
      setStatus(ta('status.imageLarge', { kb: Math.round(img.bytes / 1024) }), 'error');
    } else {
      setStatus('');
    }
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
  <details class="group">
    <summary>{ta('blocks.text')}</summary>
    <div class="group-items">
      <button class="ghost" onclick={() => addBlock('text')}>{ta('blocks.text')}</button>
      <button class="ghost" onclick={() => addBlock('text-box')}
        title={ta('tip.blocks.textBox')}>{ta('ui.textBox')}</button>
    </div>
  </details>
  <button class="ghost" onclick={() => addBlock('button')}>{ta('blocks.button')}</button>
  <label class="ghost filepick" title={ta('tip.webpAuto')}>
    {ta('blocks.image')}
    <input type="file" accept="image/*" onchange={addImage} />
  </label>
  <button class="ghost" title={ta('tip.blocks.video')}
    onclick={() => addBlock('video')}>{ta('blocks.video')}</button>
  <button class="ghost" title={ta('tip.blocks.icon')}
    onclick={() => addBlock('icon')}>{ta('blocks.icon')}</button>
  <button class="ghost" title={ta('tip.blocks.map')}
    onclick={() => addBlock('map')}>{ta('blocks.map')}</button>
  <button class="ghost" title={ta('tip.blocks.form')}
    onclick={() => addBlock('form')}>{ta('blocks.form')}</button>
  <button class="ghost" title={ta('tip.blocks.collection')}
    onclick={() => addBlock('collection')}>{ta('blocks.collection')}</button>
  <button class="ghost" title={ta('tip.blocks.faq')}
    onclick={() => addBlock('faq')}>{ta('blocks.faq')}</button>
  <button class="ghost" title={ta('tip.blocks.timeline')}
    onclick={() => addBlock('timeline')}>{ta('blocks.timeline')}</button>
  <button class="ghost" title={ta('tip.blocks.quote')}
    onclick={() => addBlock('quote')}>{ta('blocks.quote')}</button>
  <button class="ghost" title={ta('tip.blocks.stats')}
    onclick={() => addBlock('stats')}>{ta('blocks.stats')}</button>
  <button class="ghost" title={ta('tip.blocks.ribbon')}
    onclick={() => addBlock('ribbon')}>{ta('blocks.ribbon')}</button>
  <button class="ghost" title={ta('tip.blocks.table')}
    onclick={() => addBlock('table')}>{ta('blocks.table')}</button>
  <button class="ghost" title={ta('tip.blocks.share')}
    onclick={() => addBlock('share')}>{ta('blocks.share')}</button>
  <button class="ghost" title={ta('tip.blocks.contact')}
    onclick={() => addBlock('contact')}>{ta('blocks.contact')}</button>
  <button class="ghost" title={ta('tip.blocks.countdown')}
    onclick={() => addBlock('countdown')}>{ta('blocks.countdown')}</button>
  <button class="ghost" title={ta('tip.blocks.audio')}
    onclick={() => addBlock('audio')}>{ta('blocks.audio')}</button>
  <button class="ghost" title={ta('tip.blocks.product')}
    onclick={() => addBlock('product')}>{ta('blocks.product')}</button>
  <button class="ghost" title={ta('tip.blocks.cart')}
    onclick={() => addBlock('cart')}>{ta('blocks.cart')}</button>
  <button class="ghost" title={ta('tip.blocks.checkout')}
    onclick={() => addBlock('checkout')}>{ta('blocks.checkout')}</button>
  <details class="group">
    <summary>{ta('blocks.gallery')}</summary>
    <div class="group-items">
      <button class="ghost" title={ta('tip.blocks.gallery')}
        onclick={() => addBlock('gallery')}>{ta('ui.emptyGallery')}</button>
      <label class="ghost filepick" title={ta('tip.blocks.galleryImages')}>
        {ta('ui.galleryWithImages')}
        <input type="file" accept="image/*" multiple onchange={addGalleryBlock} />
      </label>
    </div>
  </details>
  <details class="group">
    <summary>{ta('blocks.calendar')}</summary>
    <div class="group-items">
      <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar')}>{ta('calendar.viewList')}</button>
      <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar-cards')}>{ta('calendar.viewCards')}</button>
      <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar-month')}>{ta('calendar.viewMonth')}</button>
      <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar-next')}>{ta('calendar.viewNext')}</button>
      <button class="ghost" title={ta('tip.blocks.calendar')} onclick={() => addBlock('calendar-agenda')}>{ta('calendar.viewAgenda')}</button>
    </div>
    <!-- Every design with its picture, in the design picker: a choice adds a calendar in that design -->
    <div class="group-items">
      <button class="ghost" title={ta('tip.calendar.picker.open')} onclick={() => (ed.designPicker = { mode: 'add' })}>{ta('calendar.picker.open')}</button>
    </div>
  </details>
  <details class="group">
    <summary>{ta('group.shapes')}</summary>
    <div class="group-items">
      <button class="ghost" onclick={() => addBlock('shape-line')}>{ta('shape.line')}</button>
      <button class="ghost" onclick={() => addBlock('shape-arrow')}>{ta('shape.arrow')}</button>
      <button class="ghost" onclick={() => addBlock('shape-circle')}>{ta('shape.circle')}</button>
      <button class="ghost" onclick={() => addBlock('shape-rect')}>{ta('shape.rect')}</button>
      <button class="ghost" onclick={() => addBlock('shape-triangle')}>{ta('shape.triangle')}</button>
    </div>
  </details>
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
