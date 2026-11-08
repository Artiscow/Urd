<script>
  /* The gallery block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import NumberRow from '../../lib/rows/NumberRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import ListEditor from '../../lib/rows/ListEditor.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { GRID_VIEWS, MOSAIC_ROW, POLAROID_TILT, galleryView as blockGalleryView } from '$engine/gallery-model.js';
  import { ta } from '$engine/i18n.js';
  import { ribbonReaches, ribbonReach } from '../options.js';
  import { ICONS } from '../../lib/icons.js';
  import LinkField from '../../lib/LinkField.svelte';
  import { linkOf } from '../../lib/link-edit.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');

  /** The image editor on one of the gallery's pictures, with its tile's shape and size as the preview draws it (the first tile showing that picture). */
  function editGalleryPicture(i) {
    const tile = ed.iframeEl?.contentDocument?.querySelector(`[data-block-id="${selectedBlock.blockId}"] .urd-gallery-edit[data-index="${i}"]`);
    const w = tile?.offsetWidth ?? 0;
    const h = tile?.offsetHeight ?? 0;
    ed.openPicture({ kind: 'gallery', sectionId: selectedBlock.sectionId, blockId: selectedBlock.blockId, index: i, frameRatio: h ? w / h : 0, frameWidth: w, frameHeight: h });
  }
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockFrame, addGalleryImages, moveGalleryImage, removeGalleryImage, setGalleryImageField, setGalleryImageLink, themeSwatches, newSeed } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet galleryImages()}
    <!-- The pictures in their order, each with its editor, its description and its link -->
    <ListEditor items={selectedBlock.props.images ?? []} label={ta('group.images')} key={(img, i) => i} card={(img) => ({ name: img.alt ?? '', src: img.src })} onmove={moveGalleryImage} onremove={removeGalleryImage}>
      {#snippet row(img, i)}
        <div class="gallery-row" title={ta('hint.gallery')}>
          <span class="toolbar-row">
            <img class="site-icon-preview" src={img.src} alt="" />
            <IconButton icon={ICONS.pencil} label={ta('tip.gallery.editPicture')} onclick={() => editGalleryPicture(i)} />
          </span>
          <label title={ta('tip.gallery.alt')}>{ta('lbl.description')}
            <input value={img.alt ?? ''} placeholder={ta('ph.altShort')}
              onchange={(e) => setGalleryImageField(i, 'alt', e.target.value)} /></label>
          <LinkField label={ta('lbl.link')} value={linkOf(img)} placeholder={ta('ph.galleryHref')} onchange={(link) => setGalleryImageLink(i, link)} />
        </div>
      {/snippet}
    </ListEditor>
    <label class="ghost action filepick" title={ta('tip.gallery.addImages')}>
      {ta('ui.addImages')}
      <input type="file" accept="image/*" multiple onchange={addGalleryImages} />
    </label>
    <!-- What a press on a picture does: the lightbox, as on the image block -->
    <Setting key="lightbox" shown={ta('common.on')}>
      <SwitchRow label={ta('lbl.lightbox')} title={ta('tip.lightbox')} checked={selectedBlock.props.lightbox !== false} onchange={(on) => setBlockProp('lightbox', on)} />
    </Setting>
  {/snippet}
  <Fold id="gallery-images" defaultOpen title={ta('group.images')} value={ta('menu.imageCount', { n: selectedBlock.props.images?.length ?? 0 })}
    group={groupOf('gallery-images', { lightbox: true })}>{@render galleryImages()}</Fold>
{:else if area === 'style'}
  {@const gview = blockGalleryView(selectedBlock.props.view)}
  <!-- The chosen design's own settings under the design row, then the corners every design has -->
  {#snippet galleryLook()}
    {#if gview === 'ribbon'}
      <Setting key="width">
        <Choice stack label={ta('lbl.ribbonWidth')} value={ribbonReach(selectedBlock.props.width)} options={ribbonReaches()} onchange={(v) => setBlockProp('width', v)} />
      </Setting>
      <!-- The band: one row, or a second one running the other way -->
      <Setting key="rows">
        <Choice stack label={ta('lbl.ribbonRows')} value={String(selectedBlock.props.rows ?? 1)}
          options={[['1', ta('opt.ribbonRows.one')], ['2', ta('opt.ribbonRows.two')]]}
          onchange={(v) => setBlockProp('rows', Number(v))} />
      </Setting>
      <Setting key="direction">
        <Choice stack label={ta('lbl.ribbonDirection')} value={selectedBlock.props.direction ?? 'left'}
          options={[['left', ta('opt.ribbonDir.left')], ['right', ta('opt.ribbonDir.right')]]}
          onchange={(v) => setBlockProp('direction', v)} />
      </Setting>
      <Setting key="speed" shown="60">
        <SliderRow label={ta('lbl.ribbonSpeed')} title={ta('tip.ribbon.speed')} value={selectedBlock.props.speed ?? 60} min={10} max={300} step={5}
          shown={String(selectedBlock.props.speed ?? 60)} oninput={(v) => setBlockProp('speed', v)} />
      </Setting>
      <!-- The band fills the block's box, so its height is the frame's -->
      <SliderRow label={ta('lbl.ribbonHeight')} title={ta('tip.ribbon.bandHeight')} value={selectedBlock.frame.h} min={60} max={800} step={10}
        shown={`${selectedBlock.frame.h} px`} oninput={(v) => setBlockFrame('h', v)} />
    {/if}
    <!-- The three views that are grids of tiles share the columns -->
    {#if GRID_VIEWS.includes(gview)}
      <Setting key="columns" shown="3" pin="columns">
        <NumberRow label={ta('lbl.columns')} title={ta('tip.gallery.columns')} value={selectedBlock.props.columns ?? 3} min={1} max={6} onchange={(v) => setBlockProp('columns', v)} />
      </Setting>
    {/if}
    {#if gview === 'ribbon' || GRID_VIEWS.includes(gview)}
      <Setting key="gap" shown="12">
        <SliderRow label={ta('lbl.imageGap')} title={ta('tip.gallery.gap')} value={selectedBlock.props.gap ?? 12} min={0} max={32} step={2}
          shown={`${selectedBlock.props.gap ?? 12} px`} oninput={(v) => setBlockProp('gap', v)} />
      </Setting>
    {/if}
    {#if gview === 'ribbon'}
      <Setting key="pauseOnHover" shown={ta('common.on')}>
        <SwitchRow label={ta('lbl.ribbonPause')} title={ta('tip.ribbon.pause')} checked={selectedBlock.props.pauseOnHover !== false} onchange={(on) => setBlockProp('pauseOnHover', on)} />
      </Setting>
      <Setting key="pause">
        <Choice stack label={ta('lbl.bandPause')} title={ta('tip.ribbon.pauseMode')} value={selectedBlock.props.pause ?? 'button'}
          options={[['button', ta('opt.bandPause.button')], ['touch', ta('opt.bandPause.touch')]]}
          onchange={(v) => setBlockProp('pause', v)} />
      </Setting>
      <Setting key="fade" shown={ta('common.on')}>
        <SwitchRow label={ta('lbl.ribbonFade')} title={ta('tip.ribbon.fade')} checked={selectedBlock.props.fade !== false} onchange={(on) => setBlockProp('fade', on)} />
      </Setting>
    {/if}
    {#if gview === 'mosaic'}
      <Setting key="rowHeight">
        <SliderRow label={ta('lbl.galleryRowHeight')} title={ta('tip.gallery.rowHeight')} value={selectedBlock.props.rowHeight ?? MOSAIC_ROW.dflt} min={MOSAIC_ROW.min} max={MOSAIC_ROW.max} step={10}
          shown={`${selectedBlock.props.rowHeight ?? MOSAIC_ROW.dflt} px`} oninput={(v) => setBlockProp('rowHeight', v)} />
      </Setting>
      <button type="button" class="ghost action" title={ta('tip.gallery.shuffleMosaic')}
        onclick={() => setBlockProp('seed', newSeed())}>
        {@html ICONS.shuffle} {ta('ui.shufflePhotos')}
      </button>
    {/if}
    {#if gview === 'polaroid'}
      <Setting key="tilt">
        <SliderRow label={ta('lbl.polaroidTilt')} title={ta('tip.gallery.tilt')} value={selectedBlock.props.tilt ?? POLAROID_TILT.dflt} min={POLAROID_TILT.min} max={POLAROID_TILT.max} step={1}
          shown={`${selectedBlock.props.tilt ?? POLAROID_TILT.dflt}°`} oninput={(v) => setBlockProp('tilt', v)} />
      </Setting>
      <!-- A new lean only where the cards lean at all -->
      {#if (selectedBlock.props.tilt ?? POLAROID_TILT.dflt) > 0}
        <button type="button" class="ghost action" title={ta('tip.gallery.shuffleTilt')}
          onclick={() => setBlockProp('seed', newSeed())}>
          {@html ICONS.shuffle} {ta('ui.shufflePhotos')}
        </button>
      {/if}
      <Setting key="frameColor" source="theme">
        <ColourRow label={ta('lbl.frameColor')} title={ta('tip.gallery.frameColor')} value={selectedBlock.props.frameColor || '#ffffff'} tokens={themeSwatches()} allowClear
          onchange={(hex) => setBlockProp('frameColor', hex ?? '')} />
      </Setting>
      <Setting key="captions">
        <SwitchRow label={ta('lbl.galleryCaptions')} title={ta('tip.gallery.captions')} checked={selectedBlock.props.captions === true} onchange={(on) => setBlockProp('captions', on)} />
      </Setting>
    {/if}
    {#if gview === 'slides'}
      <Setting key="interval" shown="5">
        <NumberRow label={ta('lbl.secondsPerImage')} title={ta('tip.gallery.interval')} value={selectedBlock.props.interval ?? 5} min={2} max={60} unit="s" onchange={(v) => setBlockProp('interval', v)} />
      </Setting>
    {/if}
    <Setting key="radius">
      <Choice stack label={ta('lbl.radius')} title={ta('tip.gallery.radius')} value={selectedBlock.props.radius ?? ''}
        options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
        onchange={(v) => setBlockProp('radius', v || null)} />
    </Setting>
  {/snippet}
  {@const lookDefaults = { columns: 3, gap: 12, interval: 5, width: 'canvas', rows: undefined, direction: undefined, speed: undefined, pauseOnHover: undefined, pause: undefined, fade: undefined, rowHeight: undefined, tilt: undefined, frameColor: undefined, captions: undefined, radius: 'md' }}
  {@const lookN = groupChanged(lookDefaults)}
  <!-- The carousel has only the corners; a grid with its columns pinned keeps the gap and the corners -->
  <Fold id="gallery-look" title={ta('group.appearance')} value={lookN ? ta('menu.changed', { n: lookN }) : ta('menu.standard')}
    rows={gview === 'carousel' ? 1 : undefined} group={groupOf('gallery-look', lookDefaults)}>{@render galleryLook()}</Fold>
{/if}

<style>
  .gallery-row {
    display: grid;
    gap: 4px;
    min-width: 0;
  }
</style>
