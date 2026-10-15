<script>
  /* The gallery block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import Choice from '../../lib/Choice.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { GALLERY_VIEWS, GRID_VIEWS, MOSAIC_ROW, POLAROID_TILT, galleryView as blockGalleryView } from '$engine/gallery-model.js';
  import { ta } from '$engine/i18n.js';
  import { ribbonReaches, ribbonReach } from '../options.js';
  import { ICONS } from '../../lib/icons.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockFrame, addGalleryImages, moveGalleryImage, removeGalleryImage, setGalleryImageField, themeSwatches, newSeed } = ed;
  const { groupReset, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet galleryImages()}
    <label class="ghost filepick" title={ta('tip.gallery.addImages')}>
      {ta('ui.addImages')}
      <input type="file" accept="image/*" multiple onchange={addGalleryImages} />
    </label>
    {#each selectedBlock.props.images ?? [] as img, i (i)}
      <div class="bg-layer">
        <span class="toolbar-row" title={ta('hint.gallery')}>
          <img class="site-icon-preview" src={img.src} alt="" />
          <span class="row-tools">
            <button class="ghost row-tool" onclick={() => moveGalleryImage(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
            <button class="ghost row-tool" onclick={() => moveGalleryImage(i, 1)}
              disabled={i === selectedBlock.props.images.length - 1}>{@html ICONS.down}</button>
            <button class="ghost row-tool" title={ta('tip.removeImage')} onclick={() => removeGalleryImage(i)}>{@html ICONS.cross}</button>
          </span>
        </span>
        <label>{ta('lbl.description')}
          <input value={img.alt ?? ''} placeholder={ta('ph.altShort')}
            onchange={(e) => setGalleryImageField(i, 'alt', e.target.value)} /></label>
        <label>{ta('lbl.link')}
          <input value={img.href ?? ''} placeholder={ta('ph.galleryHref')}
            onchange={(e) => setGalleryImageField(i, 'href', e.target.value || null)} /></label>
      </div>
    {/each}
  {/snippet}
  <MenuGroup id="gallery-images" defaultOpen title={ta('group.images')} value={ta('menu.imageCount', { n: selectedBlock.props.images?.length ?? 0 })}>{@render galleryImages()}</MenuGroup>
{:else if area === 'style'}
  {@const gview = blockGalleryView(selectedBlock.props.view)}
  {#snippet galleryView()}
    <div class="pin-line">
      <label>{ta('lbl.view')}
        <Dropdown value={gview}
          options={GALLERY_VIEWS.map((v) => [v, ta(`opt.galleryView.${v}`)])}
          onchange={(v) => setBlockProp('view', v)} /></label>
      <Pin id="galleryView" />
    </div>
    {#if gview === 'ribbon'}
      <Choice label={ta('lbl.ribbonWidth')} value={ribbonReach(selectedBlock.props.width)}
        options={ribbonReaches()}
        onchange={(v) => setBlockProp('width', v)} />
    {/if}
    <!-- The three views that are grids of tiles share the columns and the gap -->
    {#if GRID_VIEWS.includes(gview)}
      <div class="pin-line">
        <label>{ta('lbl.columns')}
          <input type="number" min="1" max="6" value={selectedBlock.props.columns ?? 3}
            onchange={(e) => setBlockProp('columns', Number(e.target.value))} /></label>
        <Pin id="columns" />
      </div>
      <label>{ta('lbl.imageGap')}
        <span class="gridmenu-value">{selectedBlock.props.gap ?? 12} px</span></label>
      <input type="range" min="0" max="32" step="2" value={selectedBlock.props.gap ?? 12}
        oninput={(e) => setBlockProp('gap', Number(e.target.value))} />
    {/if}
    {#if gview === 'mosaic'}
      <div class="ctl-row" title={ta('tip.gallery.rowHeight')}>
        <span class="mini-label ctl-name">{ta('lbl.galleryRowHeight')}</span>
        <input type="range" min={MOSAIC_ROW.min} max={MOSAIC_ROW.max} step="10" value={selectedBlock.props.rowHeight ?? MOSAIC_ROW.dflt}
          oninput={(e) => setBlockProp('rowHeight', e.target.valueAsNumber)} />
        <span class="gridmenu-value">{selectedBlock.props.rowHeight ?? MOSAIC_ROW.dflt} px</span>
      </div>
      <button type="button" class="ghost action" title={ta('tip.gallery.shuffleMosaic')}
        onclick={() => setBlockProp('seed', newSeed())}>
        {@html ICONS.shuffle} {ta('ui.shufflePhotos')}
      </button>
    {/if}
    {#if gview === 'polaroid'}
      <div class="ctl-row" title={ta('tip.gallery.tilt')}>
        <span class="mini-label ctl-name">{ta('lbl.polaroidTilt')}</span>
        <input type="range" min={POLAROID_TILT.min} max={POLAROID_TILT.max} step="1" value={selectedBlock.props.tilt ?? POLAROID_TILT.dflt}
          oninput={(e) => setBlockProp('tilt', e.target.valueAsNumber)} />
        <span class="gridmenu-value">{selectedBlock.props.tilt ?? POLAROID_TILT.dflt}&deg;</span>
      </div>
      <!-- A new lean only where the cards lean at all -->
      {#if (selectedBlock.props.tilt ?? POLAROID_TILT.dflt) > 0}
        <button type="button" class="ghost action" title={ta('tip.gallery.shuffleTilt')}
          onclick={() => setBlockProp('seed', newSeed())}>
          {@html ICONS.shuffle} {ta('ui.shufflePhotos')}
        </button>
      {/if}
      <label title={ta('tip.gallery.frameColor')}>{ta('lbl.frameColor')}
        <ColorPicker value={selectedBlock.props.frameColor || '#ffffff'} tokens={themeSwatches()} allowClear
          label={ta('tip.gallery.frameColor')} onchange={(hex) => setBlockProp('frameColor', hex ?? '')} /></label>
      <label class="gridmenu-snap" title={ta('tip.gallery.captions')}>
        <input type="checkbox" checked={selectedBlock.props.captions === true}
          onchange={(e) => setBlockProp('captions', e.target.checked)} />
        {ta('lbl.galleryCaptions')}
      </label>
    {/if}
    {#if gview === 'slides'}
      <label>{ta('lbl.secondsPerImage')}
        <input type="number" min="2" max="60" value={selectedBlock.props.interval ?? 5}
          onchange={(e) => setBlockProp('interval', Number(e.target.value))} /></label>
    {/if}
  {/snippet}
  {#snippet galleryRoll()}
    <!-- The band: one row, or a second one running the other way -->
    <Choice label={ta('lbl.ribbonRows')} value={String(selectedBlock.props.rows ?? 1)}
      options={[['1', ta('opt.ribbonRows.one')], ['2', ta('opt.ribbonRows.two')]]}
      onchange={(v) => setBlockProp('rows', Number(v))} />
    <Choice label={ta('lbl.ribbonDirection')} value={selectedBlock.props.direction ?? 'left'}
      options={[['left', ta('opt.ribbonDir.left')], ['right', ta('opt.ribbonDir.right')]]}
      onchange={(v) => setBlockProp('direction', v)} />
    <div class="ctl-row" title={ta('tip.ribbon.speed')}>
      <span class="mini-label ctl-name">{ta('lbl.ribbonSpeed')}</span>
      <input type="range" min="10" max="300" step="5" value={selectedBlock.props.speed ?? 60}
        oninput={(e) => setBlockProp('speed', e.target.valueAsNumber)} />
      <span class="gridmenu-value">{selectedBlock.props.speed ?? 60}</span>
    </div>
    <!-- The band fills the block's box, so its height is the frame's -->
    <div class="ctl-row" title={ta('tip.ribbon.bandHeight')}>
      <span class="mini-label ctl-name">{ta('lbl.ribbonHeight')}</span>
      <input type="range" min="60" max="800" step="10" value={selectedBlock.frame.h}
        oninput={(e) => setBlockFrame('h', e.target.valueAsNumber)} />
      <span class="gridmenu-value">{selectedBlock.frame.h} px</span>
    </div>
    <label>{ta('lbl.imageGap')}
      <span class="gridmenu-value">{selectedBlock.props.gap ?? 12} px</span></label>
    <input type="range" min="0" max="32" step="2" value={selectedBlock.props.gap ?? 12}
      oninput={(e) => setBlockProp('gap', Number(e.target.value))} />
    <label class="gridmenu-snap" title={ta('tip.ribbon.pause')}>
      <input type="checkbox" checked={selectedBlock.props.pauseOnHover !== false}
        onchange={(e) => setBlockProp('pauseOnHover', e.target.checked)} />
      {ta('lbl.ribbonPause')}
    </label>
    <Choice label={ta('lbl.bandPause')} value={selectedBlock.props.pause ?? 'button'} title={ta('tip.ribbon.pauseMode')}
      options={[['button', ta('opt.bandPause.button')], ['touch', ta('opt.bandPause.touch')]]}
      onchange={(v) => setBlockProp('pause', v)} />
    <label class="gridmenu-snap" title={ta('tip.ribbon.fade')}>
      <input type="checkbox" checked={selectedBlock.props.fade !== false}
        onchange={(e) => setBlockProp('fade', e.target.checked)} />
      {ta('lbl.ribbonFade')}
    </label>

  {/snippet}
  {#snippet galleryLook()}
    <label>{ta('lbl.radius')}
      <Dropdown value={selectedBlock.props.radius ?? ''}
        options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
        onchange={(v) => setBlockProp('radius', v || null)} /></label>
    <label class="gridmenu-snap" title={ta('tip.lightbox')}>
      <input type="checkbox" checked={selectedBlock.props.lightbox !== false}
        onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
      {ta('lbl.lightbox')}
    </label>
  {/snippet}
  <MenuGroup id="gallery-view" title={ta('lbl.view')} value={ta(`opt.galleryView.${gview}`)} reset={groupReset('gallery-view', { view: 'grid', columns: 3, gap: 12, interval: 5, width: 'canvas', rowHeight: undefined, tilt: undefined, frameColor: undefined, captions: undefined })}>{@render galleryView()}</MenuGroup>
  {#if gview === 'ribbon'}
    <MenuGroup id="gallery-roll" title={ta('lbl.ribbonMotion')} value={`${selectedBlock.props.speed ?? 60} px/s`} reset={groupReset('gallery-roll', { rows: undefined, direction: undefined, speed: undefined, pauseOnHover: undefined, pause: undefined, fade: undefined })}>{@render galleryRoll()}</MenuGroup>
  {/if}
  <MenuGroup id="gallery-look" title={ta('group.galleryImages')} value={{ '': ta('common.none'), sm: ta('opt.size.sm'), md: ta('opt.radius.md') }[selectedBlock.props.radius ?? '']} reset={groupReset('gallery-look', { radius: 'md', lightbox: true })}>{@render galleryLook()}</MenuGroup>
{/if}
