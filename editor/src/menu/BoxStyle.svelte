<script>
  /* The card style of a block (boxStyle, additive): the colour, the shadow,
     the border and the glass, for the text box and the FAQ cards.
     Each is a setting row that tells whether the block holds a value of its own, with the way back to the standard: the theme's colour and border, no shadow and no glass (lib/rows/Setting.svelte); the shadow's colour and the border's colour and thickness stand in the row they belong to, so they come and go with it («Extra settings», Pinned). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Setting from '../lib/rows/Setting.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import ColourRow from '../lib/rows/ColourRow.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBoxStyle, themeSwatches } = ed;
  const bs = $derived(selectedBlock.props.boxStyle ?? {});
</script>

<Setting source="theme" own={Boolean(bs.bg)} reset={() => setBoxStyle({ bg: null })}>
  <ColourRow label={ta('lbl.blockColor')} title={ta('tip.box.bg')} value={bs.bg ?? ''} tokens={themeSwatches()} allowClear
    onchange={(hex) => setBoxStyle({ bg: hex || null })} />
</Setting>
<Setting own={Boolean(bs.shadow)} reset={() => setBoxStyle({ shadow: null, shadowColor: null })}>
  <SelectRow label={ta('lbl.shadow')} title={ta('tip.box.shadow')} value={bs.shadow ?? ''}
    options={[['', ta('common.none')], ['soft', ta('opt.shadow.soft')], ['strong', ta('opt.shadow.strong')]]}
    onchange={(v) => setBoxStyle({ shadow: v || null })} />
  {#if bs.shadow}
    <Setting source="theme" own={Boolean(bs.shadowColor)} reset={() => setBoxStyle({ shadowColor: null })}>
      <ColourRow label={ta('lbl.shadowColor')} title={ta('tip.box.shadowColor')} value={bs.shadowColor ?? ''} tokens={themeSwatches()} allowClear
        onchange={(hex) => setBoxStyle({ shadowColor: hex || null })} />
    </Setting>
  {/if}
</Setting>
<Setting source="theme" own={bs.border != null} reset={() => setBoxStyle({ border: null })}>
  <SelectRow label={ta('lbl.border')} title={ta('tip.box.border')} value={bs.border === 'none' ? 'none' : bs.border ? 'custom' : ''}
    options={[['', ta('opt.border.theme')], ['none', ta('common.none')], ['custom', ta('opt.border.custom')]]}
    onchange={(v) => setBoxStyle({ border: v === 'custom' ? { color: 'accent', width: 1 } : v || null })} />
  {#if bs.border !== 'none'}
    <!-- The border's colour and thickness also show for the theme's thin border, and picking a colour turns it into the block's own border. -->
    {@const bd = typeof bs.border === 'object' ? bs.border : { color: 'text', width: 1 }}
    <ColourRow label={ta('lbl.borderColor')} title={ta('tip.box.borderColor')} value={bd.color} tokens={themeSwatches()}
      onchange={(hex) => setBoxStyle({ border: { ...bd, color: hex } })} />
    <NumberRow label={ta('lbl.thicknessPx')} title={ta('tip.box.borderWidth')} value={bd.width} min={1} max={12} unit="px"
      onchange={(width) => setBoxStyle({ border: { ...bd, width } })} />
  {/if}
</Setting>
<Setting own={Boolean(bs.glass)} reset={() => setBoxStyle({ glass: null })}>
  <SwitchRow label={ta('lbl.glass')} title={ta('tip.box.glass')} checked={Boolean(bs.glass)} onchange={(on) => setBoxStyle({ glass: on || null })} />
</Setting>
