<script>
  /* The countdown block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import DatePicker from '../../lib/DatePicker.svelte';
  import { getContext } from 'svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import DesignRow from '../DesignRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variantOptions = () => [['boxes', ta('opt.countdown.boxes')], ['plain', ta('opt.countdown.plain')]];
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
  <MenuGroup id="countdown-target" defaultOpen title={ta('group.target')} value={selectedBlock.props.target ? selectedBlock.props.target.replace('T', ' ') : ta('common.none')}>{@render countdownTarget()}</MenuGroup>
{:else if area === 'style'}
  {#snippet countdownLook()}
    <Setting key="variant">
      <DesignRow pin="design" />
    </Setting>
    <Setting key="showSeconds" shown={ta('common.on')}>
      <div class="pin-line">
        <label title={ta('tip.countdown.seconds')} class="gridmenu-snap">
          <input type="checkbox" checked={selectedBlock.props.showSeconds !== false}
            onchange={(e) => setBlockProp('showSeconds', e.target.checked)} />
          {ta('lbl.countdownSeconds')}
        </label>
        <Pin id="seconds" />
      </div>
    </Setting>
  {/snippet}
  <MenuGroup id="countdown-look" defaultOpen title={ta('group.appearance')} value={variantOptions().find(([v]) => v === (selectedBlock.props.variant ?? 'boxes'))?.[1] ?? ''} group={groupOf('countdown-look', { variant: 'boxes', showSeconds: true })}>{@render countdownLook()}</MenuGroup>
{/if}
