<script>
  /* The font and the size of a whole text at once, in the desktop view where the text is written on the page: the text block's and the terms of sale's, in their Style.
     The values are read from the text's first paragraph (the preview writes them on every paragraph), and the text toolbar's own apply to a selection. */
  import { getContext } from 'svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { fontChoices } from '$engine/fonts.js';
  import { SIZE_MIN, SIZE_MAX, clampSize, matchFontStack } from '$engine/text-typo.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);

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
    if (raw === '') { ed.setTextStyle({ fontSize: null }); return; }
    const px = clampSize(Number(raw));
    if (px == null) { input.value = wholeStyle.size; return; }
    ed.setTextStyle({ fontSize: `${px}px` });
    input.value = String(px);
  }
</script>

{#if ed.viewMode === 'desktop'}
  {#key selectedBlock.blockId}
    <SelectRow label={ta('lbl.wholeFont')} title={ta('tip.wholeFont')} value={wholeStyle.font} options={fontChoices(ta, [['', ta('tt.inheritFont')]])}
      onchange={(v) => ed.setTextStyle({ fontFamily: v || null })} />
    <label title={ta('tip.wholeSize')}>{ta('lbl.wholeSize')}
      <input type="number" min={SIZE_MIN} max={SIZE_MAX} step="1" value={wholeStyle.size} placeholder={ta('tt.inheritFont')}
        onchange={(e) => typeWholeSize(e.target)} /></label>
  {/key}
{/if}
