<script>
  /* The image block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import { slugify } from '$engine/imageTools.js';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  import LinkField from '../../lib/LinkField.svelte';
  import { linkOf, linkText } from '../../lib/link-edit.js';
  import { ICONS } from '../../lib/icons.js';
  const ed = getContext('urd-editor');
  /** A fold whose every setting stands in Pinned is left out. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, setBlockLink, openImageEditor, compressOrTrim, imageErrorText, setStatus } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  /** Whether the picture links somewhere (a page, a spot or an address). */
  const imageLinked = $derived(Object.keys(linkOf(selectedBlock.props)).some((key) => key !== 'newTab' && key !== 'rel'));
  let { area } = $props();

  /** Replace the image in an image block (same webp flow as + Image). */
  async function replaceImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file, 'image');
      mutateBlock(`edit:${selectedBlock.blockId}`, (b) => {
        b.props.src = img.dataUrl;
        b.props.alt = b.props.alt || slugify(file.name).replaceAll('-', ' ');
      });
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }
</script>

{#snippet editorButton()}
  <!-- The image editor first in Content: framing, turn, look, adjustments and overlay in one place -->
  <button type="button" class="ghost action pe-open" title={ta('tip.image.openEditor')} onclick={openImageEditor}>{@html ICONS.pencil}{ta('ui.openImageEditor')}</button>
{/snippet}

{#if area === 'content'}
  {@render editorButton()}
  {#snippet imgImage()}
    <label title={ta('tip.image.change')} class="ghost filepick">
      {ta('ui.changeImage')}
      <input type="file" accept="image/*" onchange={replaceImage} />
    </label>
    <label title={ta('tip.image.alt')}>{ta('lbl.description')}
      <input value={selectedBlock.props.alt ?? ''} placeholder={ta('ph.altText')}
        onchange={(e) => setBlockProp('alt', e.target.value)} /></label>
  {/snippet}
  {#snippet imgLink()}
    <Setting key="href">
      <LinkField label={ta('lbl.link')} value={linkOf(selectedBlock.props)} placeholder={ta('ph.optionalImageLink')} onchange={setBlockLink} />
    </Setting>
    <!-- The lightbox only for a picture without a link: a link wins the click -->
    {#if !imageLinked}
      <Setting key="lightbox" shown={ta('common.off')}>
        <label class="gridmenu-snap" title={ta('tip.lightbox')}>
          <input type="checkbox" checked={Boolean(selectedBlock.props.lightbox)}
            onchange={(e) => setBlockProp('lightbox', e.target.checked)} />
          {ta('lbl.lightbox')}
        </label>
      </Setting>
    {/if}
  {/snippet}
  <Fold id="img-image" title={ta('blocks.image')} value={selectedBlock.props.alt || ta('menu.noAlt')}>{@render imgImage()}</Fold>
  <Fold id="img-link" title={ta('group.linkClick')} value={imageLinked ? linkText(linkOf(selectedBlock.props), { pages: ed.siteDraft?.pages ?? [], here: ed.pageId }) : (selectedBlock.props.lightbox ? ta('menu.lightboxShort') : ta('common.none'))}
    group={groupOf('img-link', { href: null, page: undefined, target: undefined, newTab: undefined, rel: undefined, download: undefined, lightbox: false })}>{@render imgLink()}</Fold>
{:else if area === 'style'}
  <!-- The two one-press choices beside the editor, each with its pin for Pinned; the rest of the picture's settings are the editor's -->
  {#snippet imgFit()}
    <Setting key="fit" pin="imgFit">
      <label title={ta('tip.image.fit')}>{ta('lbl.imageFit')}
        <Dropdown value={selectedBlock.props.fit ?? 'cover'}
          options={[['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]]}
          onchange={(v) => setBlockProp('fit', v)} /></label>
    </Setting>
  {/snippet}
  {#snippet imgCorners()}
    <Setting key="radius" pin="radius">
      <label title={ta('tip.image.radius')}>{ta('lbl.radius')}
        <Dropdown value={selectedBlock.props.radius ?? ''}
          options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
          onchange={(v) => setBlockProp('radius', v || null)} /></label>
    </Setting>
  {/snippet}
  {#if !pinned.all('imgFit')}<Fold id="img-fit" title={ta('lbl.imageFit')} value={selectedBlock.props.fit === 'contain' ? ta('opt.fitFrame.contain') : ta('opt.fitFrame.cover')} group={groupOf('img-fit', { fit: 'cover' })}>{@render imgFit()}</Fold>{/if}
  {#if !pinned.all('radius')}<Fold id="img-corners" title={ta('group.corners')} value={{ '': ta('common.none'), sm: ta('opt.size.sm'), md: ta('opt.radius.md') }[selectedBlock.props.radius ?? '']} group={groupOf('img-corners', { radius: 'md' })}>{@render imgCorners()}</Fold>{/if}
{/if}

<style>
  .pe-open {
    gap: 0.45rem;
  }
</style>
