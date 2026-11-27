<script>
  /* Folds a calendar list's events beyond the max count under «Show all»; hidden in the regular-event design, which folds its own dates. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { calDesign, calView } from '$engine/calendar-designs.js';
  const ed = getContext('urd-editor');
  const props = $derived(ed.selectedBlock.props);
</script>

{#if calView(props) === 'list' && calDesign(props.design).module !== 'more'}
  <Setting own={props.showMore === false} reset={() => ed.setBlockProp('showMore', undefined)}>
    <SwitchRow label={ta('calendar.showMore')} title={ta('tip.calendar.showMore')} checked={props.showMore !== false} onchange={(on) => ed.setBlockProp('showMore', on ? undefined : false)} />
  </Setting>
{/if}
