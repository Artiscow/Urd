<script>
  /* The statistic block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { blockDesignOf } from '$engine/block-designs.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variant = $derived(blockDesignOf('stats', selectedBlock.props));
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
    <Setting key="variant">
      <DesignRow pin="variant" />
    </Setting>
    <Setting key="countUp" shown={ta('common.on')}>
      <label class="gridmenu-snap" title={ta('tip.stat.countUp')}>
        <input type="checkbox" checked={selectedBlock.props.countUp !== false}
          onchange={(e) => setBlockProp('countUp', e.target.checked)} />
        {ta('lbl.statCountUp')}
      </label>
    </Setting>
  {/snippet}
  <MenuGroup id="stat-look" defaultOpen title={ta('group.appearance')} value={ta(`opt.statVariant.${variant}`)} group={groupOf('stat-look', { variant: 'plain', countUp: true })}>{@render statLook()}</MenuGroup>
{/if}
