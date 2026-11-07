<script>
  /* The card style of a block (boxStyle, additive): the colour, the shadow,
     the border and the glass, for the text box and the FAQ cards. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import ColourRow from '../lib/rows/ColourRow.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBoxStyle, themeSwatches } = ed;
  const bs = $derived(selectedBlock.props.boxStyle ?? {});
</script>

<ColourRow label={ta('lbl.blockColor')} title={ta('tip.box.bg')} value={bs.bg ?? ''} tokens={themeSwatches()} allowClear
  onchange={(hex) => setBoxStyle({ bg: hex || null })} />
<SelectRow label={ta('lbl.shadow')} title={ta('tip.box.shadow')} value={bs.shadow ?? ''}
  options={[['', ta('common.none')], ['soft', ta('opt.shadow.soft')], ['strong', ta('opt.shadow.strong')]]}
  onchange={(v) => setBoxStyle({ shadow: v || null })} />
{#if bs.shadow}
  <ColourRow label={ta('lbl.shadowColor')} title={ta('tip.box.shadowColor')} value={bs.shadowColor ?? ''} tokens={themeSwatches()} allowClear
    onchange={(hex) => setBoxStyle({ shadowColor: hex || null })} />
{/if}
<SelectRow label={ta('lbl.border')} title={ta('tip.box.border')} value={bs.border === 'none' ? 'none' : bs.border ? 'custom' : ''}
  options={[['', ta('opt.border.theme')], ['none', ta('common.none')], ['custom', ta('opt.border.custom')]]}
  onchange={(v) => setBoxStyle({ border: v === 'custom' ? { color: 'accent', width: 1 } : v || null })} />
{#if bs.border !== 'none'}
  <!-- Border color/thickness is ALSO shown for the theme (thin) border:
       picking a color turns it into its own (colorable) border. -->
  {@const bd = typeof bs.border === 'object' ? bs.border : { color: 'text', width: 1 }}
  <ColourRow label={ta('lbl.borderColor')} title={ta('tip.box.borderColor')} value={bd.color} tokens={themeSwatches()}
    onchange={(hex) => setBoxStyle({ border: { ...bd, color: hex } })} />
  <NumberRow label={ta('lbl.thicknessPx')} title={ta('tip.box.borderWidth')} value={bd.width} min={1} max={12} unit="px"
    onchange={(width) => setBoxStyle({ border: { ...bd, width } })} />
{/if}
<SwitchRow label={ta('lbl.glass')} title={ta('tip.box.glass')} checked={Boolean(bs.glass)} onchange={(on) => setBoxStyle({ glass: on || null })} />
