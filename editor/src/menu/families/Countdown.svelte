<script>
  /* The countdown block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import DatePicker from '../../lib/DatePicker.svelte';
  import { getContext } from 'svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import { pinnedNow } from '../pinned.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  /** A fold counts the settings it holds now: one whose every setting stands in Pinned is left out, and one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
</script>

{#if area === 'content'}
  {#snippet countdownTarget()}
    <!-- A span beside the picker: the calendar's surface is not part of the field's label -->
    <div class="field-stack" title={ta('tip.countdown.target')}>
      <span class="nav-body-label">{ta('lbl.countdownTarget')}</span>
      <DatePicker value={selectedBlock.props.target ?? ''} time onchange={(v) => setBlockProp('target', v)} title={ta('tip.countdown.target')} />
    </div>
    <label title={ta('tip.countdown.done')}>{ta('lbl.countdownDone')}
      <input value={selectedBlock.props.doneText ?? ''}
        onchange={(e) => setBlockProp('doneText', e.target.value)} /></label>
  {/snippet}
  <Fold id="countdown-target" defaultOpen title={ta('group.target')} value={selectedBlock.props.target ? selectedBlock.props.target.replace('T', ' ') : ta('common.none')}>{@render countdownTarget()}</Fold>
{:else if area === 'style'}
  {#snippet countdownLook()}
    <Setting key="showSeconds" pin="seconds">
      <SwitchRow label={ta('lbl.countdownSeconds')} title={ta('tip.countdown.seconds')} checked={selectedBlock.props.showSeconds !== false} onchange={(on) => setBlockProp('showSeconds', on)} />
    </Setting>
  {/snippet}
  <Fold id="countdown-look" defaultOpen title={ta('group.appearance')} value={selectedBlock.props.showSeconds !== false ? ta('common.on') : ta('common.off')}
    rows={pinned.left('seconds')} group={groupOf('countdown-look', { showSeconds: true })}>{@render countdownLook()}</Fold>
{/if}
