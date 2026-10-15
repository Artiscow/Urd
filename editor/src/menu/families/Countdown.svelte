<script>
  /* The countdown block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockProps } = ed;
  const { groupReset } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variantOptions = () => [['boxes', ta('opt.countdown.boxes')], ['plain', ta('opt.countdown.plain')]];
</script>

{#if area === 'content'}
  {#snippet countdownTarget()}
    <label>{ta('lbl.countdownTarget')}
      <input type="datetime-local" value={selectedBlock.props.target ?? ''}
        onchange={(e) => setBlockProp('target', e.target.value)} /></label>
    <label title={ta('tip.countdown.done')}>{ta('lbl.countdownDone')}
      <input value={selectedBlock.props.doneText ?? ''}
        onchange={(e) => setBlockProp('doneText', e.target.value)} /></label>
  {/snippet}
  <MenuGroup id="countdown-target" defaultOpen title={ta('group.target')} value={selectedBlock.props.target ? selectedBlock.props.target.replace('T', ' ') : ta('common.none')}>{@render countdownTarget()}</MenuGroup>
{:else if area === 'style'}
  {#snippet countdownLook()}
    <label>{ta('lbl.variant')}
      <Dropdown value={selectedBlock.props.variant ?? 'boxes'} options={variantOptions()}
        onchange={(v) => setBlockProp('variant', v)} /></label>
    <div class="pin-line">
      <label class="gridmenu-snap">
        <input type="checkbox" checked={selectedBlock.props.showSeconds !== false}
          onchange={(e) => setBlockProp('showSeconds', e.target.checked)} />
        {ta('lbl.countdownSeconds')}
      </label>
      <Pin id="seconds" />
    </div>
  {/snippet}
  <MenuGroup id="countdown-look" defaultOpen title={ta('group.appearance')} value={variantOptions().find(([v]) => v === (selectedBlock.props.variant ?? 'boxes'))?.[1] ?? ''} reset={groupReset('countdown-look', { variant: 'boxes', showSeconds: true })}>{@render countdownLook()}</MenuGroup>
{/if}
