<script>
  /* The card style of a block (boxStyle, additive): the colour, the shadow,
     the border and the glass, for the text box and the FAQ cards. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Dropdown from '../lib/Dropdown.svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBoxStyle, themeSwatches } = ed;
  const bs = $derived(selectedBlock.props.boxStyle ?? {});
</script>

<label title={ta('tip.box.bg')}>{ta('lbl.blockColor')}
  <ColorPicker value={bs.bg ?? ''} tokens={themeSwatches()} allowClear
    label={ta('tip.box.bg')}
    onchange={(hex) => setBoxStyle({ bg: hex || null })} /></label>
<label title={ta('tip.box.shadow')}>{ta('lbl.shadow')}
  <Dropdown value={bs.shadow ?? ''}
    options={[['', ta('common.none')], ['soft', ta('opt.shadow.soft')], ['strong', ta('opt.shadow.strong')]]}
    onchange={(v) => setBoxStyle({ shadow: v || null })} /></label>
{#if bs.shadow}
  <label title={ta('tip.box.shadowColor')}>{ta('lbl.shadowColor')}
    <ColorPicker value={bs.shadowColor ?? ''} tokens={themeSwatches()} allowClear
      label={ta('tip.box.shadowColor')}
      onchange={(hex) => setBoxStyle({ shadowColor: hex || null })} /></label>
{/if}
<label title={ta('tip.box.border')}>{ta('lbl.border')}
  <Dropdown value={bs.border === 'none' ? 'none' : bs.border ? 'custom' : ''}
    options={[['', ta('opt.border.theme')], ['none', ta('common.none')], ['custom', ta('opt.border.custom')]]}
    onchange={(v) => setBoxStyle({ border: v === 'custom' ? { color: 'accent', width: 1 } : v || null })} /></label>
{#if bs.border !== 'none'}
  <!-- Border color/thickness is ALSO shown for the theme (thin) border:
       picking a color turns it into its own (colorable) border. -->
  {@const bd = typeof bs.border === 'object' ? bs.border : { color: 'text', width: 1 }}
  <label title={ta('tip.box.borderColor')}>{ta('lbl.borderColor')}
    <ColorPicker value={bd.color} tokens={themeSwatches()}
      label={ta('tip.box.borderColor')} onchange={(hex) => setBoxStyle({ border: { ...bd, color: hex } })} /></label>
  <label title={ta('tip.box.borderWidth')}>{ta('lbl.thicknessPx')}
    <span class="num-stepper">
      <button type="button" title={ta('tip.thinner')} aria-label={ta('tip.thinner')}
        onclick={() => setBoxStyle({ border: { ...bd, width: Math.max(1, bd.width - 1) } })}>{@html ICONS.minus}</button>
      <input type="number" min="1" max="12" step="1" value={bd.width}
        onchange={(e) => setBoxStyle({ border: { ...bd, width: Math.min(12, Math.max(1, Number(e.target.value) || 1)) } })} />
      <button type="button" title={ta('tip.thicker')} aria-label={ta('tip.thicker')}
        onclick={() => setBoxStyle({ border: { ...bd, width: Math.min(12, bd.width + 1) } })}>{@html ICONS.plus}</button>
    </span></label>
{/if}
<label class="gridmenu-snap" title={ta('tip.box.glass')}>
  <input type="checkbox" checked={Boolean(bs.glass)}
    onchange={(e) => setBoxStyle({ glass: e.target.checked || null })} />
  {ta('lbl.glass')}
</label>
