<script>
  /* The image block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { slugify } from '$engine/imageTools.js';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, openImageEditor, compressOrTrim, imageErrorText, setStatus } = ed;
  const { groupReset, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();

  /** Replace the image in an image block (same webp flow as + Image). */
  async function replaceImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.props.src = img.dataUrl;
        b.props.alt = b.props.alt || slugify(file.name).replaceAll('-', ' ');
      });
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }
</script>

{#if area === 'content'}
  {#snippet imgImage()}
    <label class="ghost filepick">
      {ta('ui.changeImage')}
      <input type="file" accept="image/*" onchange={replaceImage} />
    </label>
    <label>{ta('lbl.description')}
      <input value={selectedBlock.props.alt ?? ''} placeholder={ta('ph.altText')}
        onchange={(e) => setBlockProp('alt', e.target.value)} /></label>
  {/snippet}
  {#snippet imgLink()}
    <label>{ta('lbl.link')}
      <input value={selectedBlock.props.href ?? ''} placeholder={ta('ph.optionalImageLink')}
        onchange={(e) => setBlockProp('href', e.target.value || null)} /></label>
    {#if !selectedBlock.props.href}
      <label class="gridmenu-snap" title={ta('tip.lightbox')}>
        <input type="checkbox" checked={Boolean(selectedBlock.props.lightbox)}
          onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
        {ta('lbl.lightbox')}
      </label>
    {/if}
  {/snippet}
  <MenuGroup id="img-image" title={ta('blocks.image')} value={selectedBlock.props.alt || ta('menu.noAlt')}>{@render imgImage()}</MenuGroup>
  <MenuGroup id="img-link" title={ta('group.linkClick')} value={selectedBlock.props.href || (selectedBlock.props.lightbox ? ta('menu.lightboxShort') : ta('common.none'))} reset={groupReset('img-link', { href: null, lightbox: false })}>{@render imgLink()}</MenuGroup>
{:else if area === 'style'}
  {#snippet imgCrop()}
    <div class="pin-line">
      <label>{ta('lbl.imageFit')}
        <Dropdown value={selectedBlock.props.fit ?? 'cover'}
          options={[['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]]}
          onchange={(v) => setBlockProp('fit', v)} /></label>
      <Pin id="imgFit" />
    </div>
    <label>{ta('lbl.focusX')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.x ?? 0.5) * 100)}%</span></label>
    <input type="range" min="0" max="1" step="0.01" value={selectedBlock.props.x ?? 0.5}
      oninput={(e) => setBlockProp('x', Number(e.target.value))} />
    <label>{ta('lbl.focusY')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.y ?? 0.5) * 100)}%</span></label>
    <input type="range" min="0" max="1" step="0.01" value={selectedBlock.props.y ?? 0.5}
      oninput={(e) => setBlockProp('y', Number(e.target.value))} />
    <label title={ta('tip.zoomCrop')}>{ta('lbl.zoom')}
      <span class="gridmenu-value">{(selectedBlock.props.zoom ?? 1).toFixed(2)}x</span></label>
    <input type="range" min="1" max="3" step="0.01" value={selectedBlock.props.zoom ?? 1}
      oninput={(e) => setBlockProp('zoom', Number(e.target.value))} />
    <button type="button" class="linkish" onclick={openImageEditor}>{ta('ui.openImageEditor')}</button>
  {/snippet}
  {#snippet imgFilters()}
    <label>{ta('lbl.brightness')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.brightness ?? 1) * 100)}%</span></label>
    <input type="range" min="0.2" max="2" step="0.01" value={selectedBlock.props.brightness ?? 1}
      oninput={(e) => setBlockProp('brightness', Number(e.target.value))} />
    <label>{ta('lbl.contrast')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.contrast ?? 1) * 100)}%</span></label>
    <input type="range" min="0.2" max="2" step="0.01" value={selectedBlock.props.contrast ?? 1}
      oninput={(e) => setBlockProp('contrast', Number(e.target.value))} />
    <label>{ta('lbl.saturate')}
      <span class="gridmenu-value">{Math.round((selectedBlock.props.saturate ?? 1) * 100)}%</span></label>
    <input type="range" min="0" max="2" step="0.01" value={selectedBlock.props.saturate ?? 1}
      oninput={(e) => setBlockProp('saturate', Number(e.target.value))} />
  {/snippet}
  {#snippet imgCorners()}
    <div class="pin-line">
      <label>{ta('lbl.radius')}
        <Dropdown value={selectedBlock.props.radius ?? ''}
          options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
          onchange={(v) => setBlockProp('radius', v || null)} /></label>
      <Pin id="radius" />
    </div>
  {/snippet}
  {@const cropN = groupChanged({ fit: 'cover', x: 0.5, y: 0.5, zoom: 1 })}
  {@const filterN = groupChanged({ brightness: 1, contrast: 1, saturate: 1 })}
  <MenuGroup id="img-crop" title={ta('group.crop')} value={cropN ? ta('menu.changed', { n: cropN }) : ta('menu.standard')} reset={groupReset('img-crop', { fit: 'cover', x: 0.5, y: 0.5, zoom: 1 })}>{@render imgCrop()}</MenuGroup>
  <MenuGroup id="img-filters" title={ta('group.filters')} value={filterN ? ta('menu.changed', { n: filterN }) : ta('menu.standard')} reset={groupReset('img-filters', { brightness: 1, contrast: 1, saturate: 1 })}>{@render imgFilters()}</MenuGroup>
  <MenuGroup id="img-corners" title={ta('group.corners')} value={{ '': ta('common.none'), sm: ta('opt.size.sm'), md: ta('opt.radius.md') }[selectedBlock.props.radius ?? '']} reset={groupReset('img-corners', { radius: 'md' })}>{@render imgCorners()}</MenuGroup>
{/if}
