<script>
  /* The statistic block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet statNumber()}
    <label title={ta('tip.stat.value')}>{ta('lbl.statValue')}
      <input value={selectedBlock.props.value ?? ''}
        onchange={(e) => setBlockProp('value', e.target.value)} /></label>
    <label title={ta('tip.stat.prefix')}>{ta('lbl.statPrefix')}
      <input value={selectedBlock.props.prefix ?? ''}
        onchange={(e) => setBlockProp('prefix', e.target.value)} /></label>
    <label title={ta('tip.stat.suffix')}>{ta('lbl.statSuffix')}
      <input value={selectedBlock.props.suffix ?? ''}
        onchange={(e) => setBlockProp('suffix', e.target.value)} /></label>
    <label title={ta('tip.stat.label')}>{ta('lbl.statLabel')}
      <input value={selectedBlock.props.label ?? ''}
        onchange={(e) => setBlockProp('label', e.target.value)} /></label>
  {/snippet}
  <Fold id="stat-number" defaultOpen title={ta('group.number')} value={`${selectedBlock.props.prefix ?? ''}${selectedBlock.props.value ?? ''}${selectedBlock.props.suffix ?? ''}`.trim()}>{@render statNumber()}</Fold>
{:else if area === 'style'}
  {#snippet statLook()}
    <Setting key="countUp" shown={ta('common.on')}>
      <SwitchRow label={ta('lbl.statCountUp')} title={ta('tip.stat.countUp')} checked={selectedBlock.props.countUp !== false} onchange={(on) => setBlockProp('countUp', on)} />
    </Setting>
  {/snippet}
  <Fold id="stat-look" defaultOpen rows={1} title={ta('group.appearance')} value={selectedBlock.props.countUp !== false ? ta('common.on') : ta('common.off')} group={groupOf('stat-look', { countUp: true })}>{@render statLook()}</Fold>
{/if}
