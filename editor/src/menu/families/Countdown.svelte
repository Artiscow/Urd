<script>
  /* The countdown block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp } = ed;
  let { area } = $props();
</script>

{#if area === 'content'}
  <label>{ta('lbl.countdownTarget')}
    <input type="datetime-local" value={selectedBlock.props.target ?? ''}
      onchange={(e) => setBlockProp('target', e.target.value)} /></label>
  <label title={ta('tip.countdown.done')}>{ta('lbl.countdownDone')}
    <input value={selectedBlock.props.doneText ?? ''}
      onchange={(e) => setBlockProp('doneText', e.target.value)} /></label>
{:else if area === 'style'}
  <label>{ta('lbl.variant')}
    <Dropdown value={selectedBlock.props.variant ?? 'boxes'}
      options={[['boxes', ta('opt.countdown.boxes')], ['plain', ta('opt.countdown.plain')]]}
      onchange={(v) => setBlockProp('variant', v)} /></label>
  <label class="gridmenu-snap">
    <input type="checkbox" checked={selectedBlock.props.showSeconds !== false}
      onchange={(e) => setBlockProp('showSeconds', e.target.checked)} />
    {ta('lbl.countdownSeconds')}
  </label>
  <hr class="gridmenu-divider" />
{/if}
