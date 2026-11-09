<script>
  /* «Show all» under the calendar's max count: a list folds the events beyond the count behind it, and the regular-event design folds its own dates, so it shows for a list in any other design.
     It stands in the max count's row: in the calendar's Content, or in Pinned while the max count is pinned (ElementMenu.svelte). */
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
