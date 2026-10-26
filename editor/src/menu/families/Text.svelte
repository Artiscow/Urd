<script>
  /* The text block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import BoxStyle from '../BoxStyle.svelte';
  import { ta } from '$engine/i18n.js';
  import { FONT_STACKS } from '$engine/fonts.js';
  import { SIZE_MIN, SIZE_MAX, clampSize, matchFontStack } from '$engine/text-typo.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const viewMode = $derived(ed.viewMode);
  const { setBlockProp, setBlockProps, editText, setTextStyle } = ed;

  /** The font and the size the whole text carries, read from its first paragraph (the preview writes them on every paragraph). */
  const wholeStyle = $derived.by(() => {
    if (typeof DOMParser === 'undefined') return { font: '', size: '' };
    const doc = new DOMParser().parseFromString(selectedBlock.props.html ?? '', 'text/html');
    const first = doc.body.querySelector('p,h1,h2,h3,h4,h5,h6,li,blockquote,div');
    const size = Number.parseInt(first?.style.fontSize ?? '', 10);
    return { font: matchFontStack(first?.style.fontFamily ?? ''), size: Number.isFinite(size) ? String(size) : '' };
  });

  /** A typed size: empty takes the theme's size back, a number is clamped, anything else is ignored and the field shows what the text has. */
  function typeWholeSize(input) {
    const raw = input.value.trim();
    if (raw === '') { setTextStyle({ fontSize: null }); return; }
    const px = clampSize(Number(raw));
    if (px == null) { input.value = wholeStyle.size; return; }
    setTextStyle({ fontSize: `${px}px` });
    input.value = String(px);
  }
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  <!-- The words are written on the page, where the text is editable in the desktop view: the action opens the text there with its toolbar.
       The font and the size below apply to the whole text at once, the toolbar's own to a selection. -->
  {#if viewMode === 'desktop'}
    <button type="button" class="ghost action" title={ta('tip.editText')} onclick={editText}>{ta('ui.editText')}</button>
    {#key selectedBlock.blockId}
      <label title={ta('tip.wholeFont')}>{ta('lbl.wholeFont')}
        <Dropdown value={wholeStyle.font} options={[['', ta('tt.inheritFont')], ...FONT_STACKS.map(([name, value]) => [value, ta(name)])]}
          onchange={(v) => setTextStyle({ fontFamily: v || null })} /></label>
      <label title={ta('tip.wholeSize')}>{ta('lbl.wholeSize')}
        <input type="number" min={SIZE_MIN} max={SIZE_MAX} step="1" value={wholeStyle.size} placeholder={ta('tt.inheritFont')}
          onchange={(e) => typeWholeSize(e.target)} /></label>
    {/key}
  {/if}
{:else if area === 'style'}
  {#snippet textAlign()}
    <Setting key="align">
      <div class="pin-line">
        <label title={ta('tip.text.align')}>{ta('lbl.align')}
          <Dropdown value={selectedBlock.props.align ?? 'left'}
            options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
            onchange={(v) => setBlockProp('align', v)} /></label>
        <Pin id="align" />
      </div>
    </Setting>
  {/snippet}
  {#snippet textBox()}
    <Setting key="box" shown={ta('common.off')}>
      <div class="pin-line">
        <label title={ta('tip.blocks.textBox')} class="gridmenu-snap">
          <input type="checkbox" checked={Boolean(selectedBlock.props.box)}
            onchange={(e) => setBlockProp('box', e.target.checked)} />
          {ta('lbl.textBoxToggle')}
        </label>
        <Pin id="textBox" />
      </div>
    </Setting>
    {#if selectedBlock.props.box}
      <BoxStyle />
    {/if}
  {/snippet}
  <MenuGroup id="text-align" title={ta('lbl.align')} value={{ left: ta('common.left'), center: ta('common.center'), right: ta('common.right') }[selectedBlock.props.align ?? 'left']} group={groupOf('text-align', { align: 'left' })}>{@render textAlign()}</MenuGroup>
  <MenuGroup id="text-box" title={ta('group.textBox')} value={selectedBlock.props.box ? ta('common.on') : ta('common.off')} group={groupOf('text-box', { box: false, boxStyle: null })}>{@render textBox()}</MenuGroup>
{/if}
