<script>
  /* The image block in the element menu: its Content and Style areas, and the settings it writes through the editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Capability from '../../lib/rows/Capability.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import { slugify } from '$engine/imageTools.js';
  import { PICTURE_BLENDS, pictureBlend, blendStrength } from '$engine/picture.js';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  import LinkField from '../../lib/LinkField.svelte';
  import { linkOf } from '../../lib/link-edit.js';
  import { ICONS } from '../../lib/icons.js';
  const ed = getContext('urd-editor');
  /** A fold counts the settings it holds now: one whose every setting stands in Pinned is left out, and one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, setBlockLink, openImageEditor, compressOrTrim, imageErrorText, setStatus } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  /** Whether the picture links somewhere (a page, a spot or an address). */
  const imageLinked = $derived(Object.keys(linkOf(selectedBlock.props)).some((key) => key !== 'newTab' && key !== 'rel'));
  let { area } = $props();
  /** How the block blends with what lies behind it, `normal` for none. */
  const blend = $derived(pictureBlend(selectedBlock.props.blend) || 'normal');
  const blendOptions = $derived(PICTURE_BLENDS.map((mode) => [mode, ta(`opt.blend.${mode}`)]));
  /** How strongly the blend is drawn, in per cent. */
  const strength = $derived(Math.round(blendStrength(selectedBlock.props.blendStrength) * 100));

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
    <Setting key="href" own={imageLinked} reset={() => setBlockLink(null)}>
      <LinkField label={ta('lbl.link')} value={linkOf(selectedBlock.props)} placeholder={ta('ph.optionalImageLink')} onchange={setBlockLink} />
    </Setting>
    <!-- The lightbox only for a picture without a link: a link wins the click -->
    {#if !imageLinked}
      <Setting key="lightbox">
        <SwitchRow label={ta('lbl.lightbox')} title={ta('tip.lightbox')} checked={Boolean(selectedBlock.props.lightbox)} onchange={(on) => setBlockProp('lightbox', on)} />
      </Setting>
    {/if}
  {/snippet}
  <Fold id="img-image" title={ta('blocks.image')} value={selectedBlock.props.alt || ta('menu.noAlt')}>{@render imgImage()}</Fold>
  <Capability id="img-link" group={groupOf('img-link', { href: null, page: undefined, target: undefined, newTab: undefined, rel: undefined, download: undefined, lightbox: false })}>{@render imgLink()}</Capability>
{:else if area === 'style'}
  <!-- The two one-press choices, each with its pin, and how the block blends with what lies behind it; the rest are the image editor's -->
  {#snippet imgLook()}
    <Setting key="fit" pin="imgFit">
      <Choice stack label={ta('lbl.imageFit')} title={ta('tip.image.fit')} value={selectedBlock.props.fit ?? 'cover'}
        options={[['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]]}
        onchange={(v) => setBlockProp('fit', v)} />
    </Setting>
    <Setting key="radius" pin="radius">
      <Choice stack label={ta('lbl.radius')} title={ta('tip.image.radius')} value={selectedBlock.props.radius ?? ''}
        options={[['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]]}
        onchange={(v) => setBlockProp('radius', v || null)} />
    </Setting>
    <!-- The blend, with its strength under it while there is one; the way back takes both -->
    {#snippet blendStrengthRow()}
      {#if blend !== 'normal'}
        <SliderRow label={ta('lbl.strength')} title={ta('tip.image.blendStrength')} value={strength} min={5} max={100} step={1} shown={`${strength} %`}
          oninput={(v) => setBlockProp('blendStrength', v >= 100 ? undefined : v / 100)} />
      {/if}
    {/snippet}
    <Setting key="blend" more={blendStrengthRow} reset={() => setBlockProps('blend', { blend: undefined, blendStrength: undefined })}>
      <SelectRow stay label={ta('lbl.blend')} title={ta('tip.image.blend')} value={blend} options={blendOptions}
        onchange={(v) => (v === 'normal' ? setBlockProps('blend', { blend: undefined, blendStrength: undefined }) : setBlockProp('blend', v))} />
    </Setting>
  {/snippet}
  <Fold id="img-look" title={ta('group.appearance')} value={`${selectedBlock.props.fit === 'contain' ? ta('opt.fitFrame.contain') : ta('opt.fitFrame.cover')} · ${{ '': ta('common.none'), sm: ta('opt.size.sm'), md: ta('opt.radius.md') }[selectedBlock.props.radius ?? '']}${blend === 'normal' ? '' : ` · ${ta(`opt.blend.${blend}`)}`}`}
    rows={1 + pinned.left('imgFit', 'radius')} group={groupOf('img-look', { fit: 'cover', radius: 'md', blend: undefined, blendStrength: undefined })}>{@render imgLook()}</Fold>
{/if}

<style>
  .pe-open {
    gap: 0.45rem;
  }
</style>
