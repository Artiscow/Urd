<script>
  /* The statistic block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp } = ed;
  let { area } = $props();

  /** The variants, as the block's own STAT_VARIANTS lists them: tests/styled-blocks.test.mjs holds the lists equal. */
  const STAT_VARIANT_IDS = ['plain', 'cards', 'band'];
</script>

{#if area === 'content'}
  <label>{ta('lbl.statValue')}
    <input value={selectedBlock.props.value ?? ''} title={ta('tip.stat.value')}
      onchange={(e) => setBlockProp('value', e.target.value)} /></label>
  <label>{ta('lbl.statPrefix')}
    <input value={selectedBlock.props.prefix ?? ''}
      onchange={(e) => setBlockProp('prefix', e.target.value)} /></label>
  <label>{ta('lbl.statSuffix')}
    <input value={selectedBlock.props.suffix ?? ''}
      onchange={(e) => setBlockProp('suffix', e.target.value)} /></label>
  <label>{ta('lbl.statLabel')}
    <input value={selectedBlock.props.label ?? ''}
      onchange={(e) => setBlockProp('label', e.target.value)} /></label>
{:else if area === 'style'}
  <Choice label={ta('lbl.variant')} value={STAT_VARIANT_IDS.includes(selectedBlock.props.variant) ? selectedBlock.props.variant : 'plain'}
    options={STAT_VARIANT_IDS.map((v) => [v, ta(`opt.statVariant.${v}`)])}
    onchange={(v) => setBlockProp('variant', v)} />
  <label class="gridmenu-snap" title={ta('tip.stat.countUp')}>
    <input type="checkbox" checked={selectedBlock.props.countUp !== false}
      onchange={(e) => setBlockProp('countUp', e.target.checked)} />
    {ta('lbl.statCountUp')}
  </label>
  <hr class="gridmenu-divider" />
{/if}
