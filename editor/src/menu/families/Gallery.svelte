<script>
  /* The gallery block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import Choice from '../../lib/Choice.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { GRID_VIEWS, MOSAIC_ROW, POLAROID_TILT, galleryView as blockGalleryView } from '$engine/gallery-model.js';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { ribbonReaches, ribbonReach } from '../options.js';
  import { ICONS } from '../../lib/icons.js';
  import LinkField from '../../lib/LinkField.svelte';
  import { linkOf } from '../../lib/link-edit.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockFrame, addGalleryImages, moveGalleryImage, removeGalleryImage, setGalleryImageField, setGalleryImageLink, themeSwatches, newSeed } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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
        <LinkField label={ta('lbl.link')} value={linkOf(img)} placeholder={ta('ph.galleryHref')} onchange={(link) => setGalleryImageLink(i, link)} />
      </div>
    {/each}
  {/snippet}
  <MenuGroup id="gallery-images" defaultOpen title={ta('group.images')} value={ta('menu.imageCount', { n: selectedBlock.props.images?.length ?? 0 })}>{@render galleryImages()}</MenuGroup>
{:else if area === 'style'}
  {@const gview = blockGalleryView(selectedBlock.props.view)}
  {#snippet galleryView()}
    <Setting key="view">
      <DesignRow pin="galleryView" />
    </Setting>
    {#if gview === 'ribbon'}
      <Setting key="width">
        <Choice label={ta('lbl.ribbonWidth')} value={ribbonReach(selectedBlock.props.width)}
          options={ribbonReaches()}
          onchange={(v) => setBlockProp('width', v)} />
      </Setting>
    {/if}
    <!-- The three views that are grids of tiles share the columns and the gap -->
    {#if GRID_VIEWS.includes(gview)}
      <Setting key="columns" shown="3">
        <div class="pin-line">
          <label>{ta('lbl.columns')}
            <input type="number" min="1" max="6" value={selectedBlock.props.columns ?? 3}
              onchange={(e) => setBlockProp('columns', Number(e.target.value))} /></label>
          <Pin id="columns" />
        </div>
      </Setting>
      <label>{ta('lbl.imageGap')}
        <span class="gridmenu-value">{selectedBlock.props.gap ?? 12} px</span></label>
      <input type="range" min="0" max="32" step="2" value={selectedBlock.props.gap ?? 12}
        oninput={(e) => setBlockProp('gap', Number(e.target.value))} />
    {/if}
    {#if gview === 'mosaic'}
      <Setting key="rowHeight">
        <div class="ctl-row" title={ta('tip.gallery.rowHeight')}>
          <span class="mini-label ctl-name">{ta('lbl.galleryRowHeight')}</span>
          <input type="range" min={MOSAIC_ROW.min} max={MOSAIC_ROW.max} step="10" value={selectedBlock.props.rowHeight ?? MOSAIC_ROW.dflt}
            oninput={(e) => setBlockProp('rowHeight', e.target.valueAsNumber)} />
          <span class="gridmenu-value">{selectedBlock.props.rowHeight ?? MOSAIC_ROW.dflt} px</span>
        </div>
      </Setting>
      <button type="button" class="ghost action" title={ta('tip.gallery.shuffleMosaic')}
        onclick={() => setBlockProp('seed', newSeed())}>
        {@html ICONS.shuffle} {ta('ui.shufflePhotos')}
      </button>
    {/if}
    {#if gview === 'polaroid'}
      <Setting key="tilt">
        <div class="ctl-row" title={ta('tip.gallery.tilt')}>
          <span class="mini-label ctl-name">{ta('lbl.polaroidTilt')}</span>
          <input type="range" min={POLAROID_TILT.min} max={POLAROID_TILT.max} step="1" value={selectedBlock.props.tilt ?? POLAROID_TILT.dflt}
            oninput={(e) => setBlockProp('tilt', e.target.valueAsNumber)} />
          <span class="gridmenu-value">{selectedBlock.props.tilt ?? POLAROID_TILT.dflt}&deg;</span>
        </div>
      </Setting>
      <!-- A new lean only where the cards lean at all -->
      {#if (selectedBlock.props.tilt ?? POLAROID_TILT.dflt) > 0}
        <button type="button" class="ghost action" title={ta('tip.gallery.shuffleTilt')}
          onclick={() => setBlockProp('seed', newSeed())}>
          {@html ICONS.shuffle} {ta('ui.shufflePhotos')}
        </button>
      {/if}
      <Setting key="frameColor" source="theme">
        <label title={ta('tip.gallery.frameColor')}>{ta('lbl.frameColor')}
          <ColorPicker value={selectedBlock.props.frameColor || '#ffffff'} tokens={themeSwatches()} allowClear
            label={ta('tip.gallery.frameColor')} onchange={(hex) => setBlockProp('frameColor', hex ?? '')} /></label>
      </Setting>
      <Setting key="captions">
        <label class="gridmenu-snap" title={ta('tip.gallery.captions')}>
          <input type="checkbox" checked={selectedBlock.props.captions === true}
            onchange={(e) => setBlockProp('captions', e.target.checked)} />
          {ta('lbl.galleryCaptions')}
        </label>
      </Setting>
    {/if}
    {#if gview === 'slides'}
      <Setting key="interval" shown="5">
        <label>{ta('lbl.secondsPerImage')}
          <input type="number" min="2" max="60" value={selectedBlock.props.interval ?? 5}
            onchange={(e) => setBlockProp('interval', Number(e.target.value))} /></label>
      </Setting>
    {/if}
  {/snippet}
  {#snippet galleryRoll()}
    <!-- The band: one row, or a second one running the other way -->
    <Setting key="rows">
      <Choice label={ta('lbl.ribbonRows')} value={String(selectedBlock.props.rows ?? 1)}
        options={[['1', ta('opt.ribbonRows.one')], ['2', ta('opt.ribbonRows.two')]]}
        onchange={(v) => setBlockProp('rows', Number(v))} />
    </Setting>
    <Setting key="direction">
      <Choice label={ta('lbl.ribbonDirection')} value={selectedBlock.props.direction ?? 'left'}
        options={[['left', ta('opt.ribbonDir.left')], ['right', ta('opt.ribbonDir.right')]]}
        onchange={(v) => setBlockProp('direction', v)} />
    </Setting>
    <Setting key="speed">
      <div class="ctl-row" title={ta('tip.ribbon.speed')}>
        <span class="mini-label ctl-name">{ta('lbl.ribbonSpeed')}</span>
        <input type="range" min="10" max="300" step="5" value={selectedBlock.props.speed ?? 60}
          oninput={(e) => setBlockProp('speed', e.target.valueAsNumber)} />
        <span class="gridmenu-value">{selectedBlock.props.speed ?? 60}</span>
      </div>
    </Setting>
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
    <Setting key="pauseOnHover">
      <label class="gridmenu-snap" title={ta('tip.ribbon.pause')}>
        <input type="checkbox" checked={selectedBlock.props.pauseOnHover !== false}
          onchange={(e) => setBlockProp('pauseOnHover', e.target.checked)} />
        {ta('lbl.ribbonPause')}
      </label>
    </Setting>
    <Setting key="pause">
      <Choice label={ta('lbl.bandPause')} value={selectedBlock.props.pause ?? 'button'} title={ta('tip.ribbon.pauseMode')}
        options={[['button', ta('opt.bandPause.button')], ['touch', ta('opt.bandPause.touch')]]}
        onchange={(v) => setBlockProp('pause', v)} />
    </Setting>
    <Setting key="fade">
      <label class="gridmenu-snap" title={ta('tip.ribbon.fade')}>
        <input type="checkbox" checked={selectedBlock.props.fade !== false}
          onchange={(e) => setBlockProp('fade', e.target.checked)} />
        {ta('lbl.ribbonFade')}
      </label>
    </Setting>

  {/snippet}
  {#snippet galleryLook()}
    <Setting key="radius">
      <label>{ta('lbl.radius')}
        <Dropdown value={selectedBlock.props.radius ?? ''}
          options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
          onchange={(v) => setBlockProp('radius', v || null)} /></label>
    </Setting>
    <Setting key="lightbox" shown={ta('common.on')}>
      <label class="gridmenu-snap" title={ta('tip.lightbox')}>
        <input type="checkbox" checked={selectedBlock.props.lightbox !== false}
          onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
        {ta('lbl.lightbox')}
      </label>
    </Setting>
  {/snippet}
  <MenuGroup id="gallery-view" title={ta('lbl.view')} value={ta(`opt.galleryView.${gview}`)} group={groupOf('gallery-view', { view: 'grid', columns: 3, gap: 12, interval: 5, width: 'canvas', rowHeight: undefined, tilt: undefined, frameColor: undefined, captions: undefined })}>{@render galleryView()}</MenuGroup>
  {#if gview === 'ribbon'}
    <MenuGroup id="gallery-roll" title={ta('lbl.ribbonMotion')} value={`${selectedBlock.props.speed ?? 60} px/s`} group={groupOf('gallery-roll', { rows: undefined, direction: undefined, speed: undefined, pauseOnHover: undefined, pause: undefined, fade: undefined })}>{@render galleryRoll()}</MenuGroup>
  {/if}
  <MenuGroup id="gallery-look" title={ta('group.galleryImages')} value={{ '': ta('common.none'), sm: ta('opt.size.sm'), md: ta('opt.radius.md') }[selectedBlock.props.radius ?? '']} group={groupOf('gallery-look', { radius: 'md', lightbox: true })}>{@render galleryLook()}</MenuGroup>
{/if}
