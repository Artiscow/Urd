<script>
  /* The button block in the element menu (0.7.26.2): its Content and Style areas, drawn where the menu asks for one, and the settings it writes through the editor handle.
     Style holds the button's colours under its design: the fill, the words, the outline and the fill under the pointer, each empty while it follows the design and the theme. */
  import { getContext } from 'svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import { makeGroupHelpers } from '../groups.js';
  import { ta } from '$engine/i18n.js';
  import { pinnedNow } from '../pinned.js';
  import { linkOf, linkText } from '../../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps, setBlockLink, themeSwatches } = ed;
  const { groupOf, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  /** The colours the menu writes, all empty by default: the design and the theme give the button its colours. */
  const COLOURS = { bg: undefined, color: undefined, borderColor: undefined, hoverBg: undefined };
  /** The colour a row shows while it is empty: the one the design draws, Filled in the accent with its text colour, Outline in the accent on nothing. */
  const filled = $derived(selectedBlock.props.style !== 'secondary');
  const drawn = $derived({ bg: filled ? 'accent' : '', color: filled ? 'accent-text' : 'accent', borderColor: filled ? '' : 'accent', hoverBg: '' });
  const setColour = (key, value) => setBlockProp(key, value || undefined);
  /** A fold counts the settings it holds now: one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet btnLink()}
    <label title={ta('tip.button.text')}>{ta('blocks.text')}
      <input value={selectedBlock.props.label}
        onchange={(e) => setBlockProp('label', e.target.value)} /></label>
    <Setting pin="goesTo">
      <LinkField label={ta('lbl.goesTo')} value={linkOf(selectedBlock.props)} onchange={setBlockLink} />
    </Setting>
  {/snippet}
  <Fold id="btn-link" defaultOpen title={ta('group.textLink')} value={linkText(linkOf(selectedBlock.props), { pages: ed.siteDraft?.pages ?? [], here: ed.pageId }) || ta('link.none')}
    rows={1 + pinned.left('goesTo')}>{@render btnLink()}</Fold>
{:else if area === 'style'}
  {#snippet btnColours()}
    {#each [['bg', 'lbl.btnFill', 'tip.button.fill'], ['color', 'lbl.textColor', 'tip.button.textColor'], ['borderColor', 'lbl.btnOutline', 'tip.button.outline'], ['hoverBg', 'lbl.btnHoverFill', 'tip.button.hoverFill']] as [key, label, tip] (key)}
      <Setting {key}>
        <ColourRow label={ta(label)} title={ta(tip)} value={selectedBlock.props[key] || drawn[key]} tokens={themeSwatches()}
          onchange={(v) => setColour(key, v)} />
      </Setting>
    {/each}
  {/snippet}
  <Fold id="btn-colours" title={ta('group.btnColours')} value={groupChanged(COLOURS) ? ta('menu.changed', { n: groupChanged(COLOURS) }) : ta('menu.standard')} group={groupOf('btn-colours', COLOURS)}>{@render btnColours()}</Fold>
{/if}
