<script>
  /* The statistic block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupReset } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variant = $derived(STAT_VARIANT_IDS.includes(selectedBlock.props.variant) ? selectedBlock.props.variant : 'plain');

  /** The variants, as the block's own STAT_VARIANTS lists them: tests/styled-blocks.test.mjs holds the lists equal. */
  const STAT_VARIANT_IDS = ['plain', 'cards', 'band'];
</script>

{#if area === 'content'}
  {#snippet statNumber()}
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
  {/snippet}
  <MenuGroup id="stat-number" defaultOpen title={ta('group.number')} value={`${selectedBlock.props.prefix ?? ''}${selectedBlock.props.value ?? ''}${selectedBlock.props.suffix ?? ''}`.trim()}>{@render statNumber()}</MenuGroup>
{:else if area === 'style'}
  {#snippet statLook()}
    <div class="pin-line">
      <Choice label={ta('lbl.variant')} value={variant}
        options={STAT_VARIANT_IDS.map((v) => [v, ta(`opt.statVariant.${v}`)])}
        onchange={(v) => setBlockProp('variant', v)} />
      <Pin id="variant" />
    </div>
    <label class="gridmenu-snap" title={ta('tip.stat.countUp')}>
      <input type="checkbox" checked={selectedBlock.props.countUp !== false}
        onchange={(e) => setBlockProp('countUp', e.target.checked)} />
      {ta('lbl.statCountUp')}
    </label>
  {/snippet}
  <MenuGroup id="stat-look" defaultOpen title={ta('group.appearance')} value={ta(`opt.statVariant.${variant}`)} reset={groupReset('stat-look', { variant: 'plain', countUp: true })}>{@render statLook()}</MenuGroup>
{/if}
