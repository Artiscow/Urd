<script>
  /* A document's look (doc-look.js): the side the contents stand on, the accent, the headings' and the cards' colours, the lines between the parts, the corners and the fonts, for the privacy page and a text in a document design.
     Only the settings the chosen design draws are shown (docLookSettings); each falls back to the theme until the owner chooses. */
  import { getContext } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import Choice from '../lib/Choice.svelte';
  import Setting from './Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { fontChoices } from '$engine/fonts.js';
  import { DOC_CORNERS, docLookSettings } from '$engine/doc-look.js';
  const ed = getContext('urd-editor');
  const { setBlockProp, themeSwatches } = ed;
  /** `type` is the block ('privacy' or 'text'), `design` the design it is drawn in. */
  let { type, design } = $props();
  const p = $derived(ed.selectedBlock.props);
  const shows = $derived(docLookSettings(type, design, p));
  const fonts = () => fontChoices(ta, [['', ta('tt.inheritFont')]]);
</script>

{#if shows.side}
  <!-- The side the contents stand on, directly under the design that has them -->
  <Setting key="contentsSide">
    <Choice label={ta('lbl.docSide')} title={ta('tip.doc.side')} value={p.contentsSide === 'right' ? 'right' : 'left'}
      options={[['left', ta('common.left')], ['right', ta('common.right')]]}
      onchange={(v) => setBlockProp('contentsSide', v === 'right' ? 'right' : null)} />
  </Setting>
{/if}
{#if shows.align}
  <!-- Where the document stands in its block, centred unless set otherwise: with contents, the text centred with the list at the block's outer edge or beside the list; otherwise centred or at the block's left edge -->
  <Setting key="placement">
    {#if design === 'contents'}
      <Choice label={ta('lbl.docAlign')} title={ta('tip.doc.align')} value={p.placement === 'start' ? 'start' : 'center'}
        options={[['center', ta('opt.docAlign.center')], ['start', ta('opt.docAlign.beside')]]}
        onchange={(v) => setBlockProp('placement', v === 'start' ? 'start' : null)} />
    {:else}
      <Choice label={ta('lbl.docPlace')} title={ta('tip.doc.place')} value={p.placement === 'start' ? 'start' : 'center'}
        options={[['center', ta('opt.docAlign.center')], ['start', ta('common.left')]]}
        onchange={(v) => setBlockProp('placement', v === 'start' ? 'start' : null)} />
    {/if}
  </Setting>
{/if}
{#if shows.accent}
  <Setting key="accent" source="theme">
    <label title={ta('tip.doc.accent')}>{ta('lbl.docAccent')}
      <ColorPicker value={p.accent ?? ''} tokens={themeSwatches()} allowClear label={ta('tip.doc.accent')}
        onchange={(v) => setBlockProp('accent', v || null)} /></label>
  </Setting>
{/if}
{#if shows.headingColor}
  <Setting key="headingColor" source="theme">
    <label title={ta('tip.doc.headingColor')}>{ta('lbl.docHeadingColor')}
      <ColorPicker value={p.headingColor ?? ''} tokens={themeSwatches()} allowClear label={ta('tip.doc.headingColor')}
        onchange={(v) => setBlockProp('headingColor', v || null)} /></label>
  </Setting>
{/if}
{#if shows.cardColor}
  <Setting key="cardColor" source="theme">
    <label title={ta('tip.doc.cardColor')}>{ta('lbl.docCardColor')}
      <ColorPicker value={p.cardColor ?? ''} tokens={themeSwatches()} allowClear label={ta('tip.doc.cardColor')}
        onchange={(v) => setBlockProp('cardColor', v || null)} /></label>
  </Setting>
{/if}
{#if shows.rules}
  <!-- The questions' lines are the rows' own; the other designs' are the rule over each part -->
  <Setting key="rules">
    <label class="gridmenu-snap" title={ta(design === 'questions' ? 'tip.doc.rulesQuestions' : 'tip.doc.rules')}>
      <input type="checkbox" checked={p.rules !== false}
        onchange={(e) => setBlockProp('rules', e.target.checked ? null : false)} />
      {ta(design === 'questions' ? 'lbl.docRulesQuestions' : 'lbl.docRules')}
    </label>
  </Setting>
{/if}
{#if shows.corners}
  <Setting key="corners" source="theme">
    <label title={ta('tip.doc.corners')}>{ta('group.corners')}
      <Dropdown value={DOC_CORNERS.includes(p.corners) ? p.corners : 'md'}
        options={DOC_CORNERS.map((c) => [c, ta(`opt.docCorners.${c}`)])}
        onchange={(v) => setBlockProp('corners', v === 'md' ? null : v)} /></label>
  </Setting>
{/if}
{#if shows.headingFont}
  <Setting key="headingFont" source="theme">
    <label title={ta('tip.doc.headingFont')}>{ta('lbl.docHeadingFont')}
      <Dropdown value={p.headingFont ?? ''} options={fonts()}
        onchange={(v) => setBlockProp('headingFont', v || null)} /></label>
  </Setting>
{/if}
{#if shows.font}
  <Setting key="font" source="theme">
    <label title={ta('tip.doc.font')}>{ta('lbl.docFont')}
      <Dropdown value={p.font ?? ''} options={fonts()}
        onchange={(v) => setBlockProp('font', v || null)} /></label>
  </Setting>
{/if}
