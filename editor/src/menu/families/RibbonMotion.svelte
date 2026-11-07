<script>
  /* A ribbon's motion settings, shown while the band moves: the way to play it in the editor, its direction, its pace, and how a visitor pauses it.
     They stand under the motion they belong to: in the Motion fold, or in Pinned while the motion is pinned (ElementMenu.svelte). */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp } = ed;
  const motion = $derived(selectedBlock.props.motion ?? 'roll');
</script>

{#if motion !== 'none'}
  <!-- The band stands still while editing, so the words can be read and typed -->
  <button class="ghost action" title={ta('tip.ribbon.play')}
    onclick={() => ed.bridge?.sendDemoMotion()}>{ta('ui.ribbonPlay')}</button>
  <Setting key="direction">
    <Choice stack label={ta('lbl.ribbonDirection')} value={selectedBlock.props.direction ?? 'left'}
      options={[['left', ta('opt.ribbonDir.left')], ['right', ta('opt.ribbonDir.right')]]}
      onchange={(v) => setBlockProp('direction', v)} />
  </Setting>
  {#if motion === 'step'}
    <!-- A ticker is timed per word, not per pixel -->
    <Setting key="dwell" shown="2.5">
      <SliderRow label={ta('lbl.ribbonDwell')} title={ta('tip.ribbon.dwell')} value={selectedBlock.props.dwell ?? 2.5} min={0.5} max={10} step={0.5}
        shown={`${selectedBlock.props.dwell ?? 2.5} s`} oninput={(v) => setBlockProp('dwell', v)} />
    </Setting>
  {:else}
    <Setting key="speed" shown="60" pin="speed">
      <SliderRow label={ta('lbl.ribbonSpeed')} title={ta('tip.ribbon.speed')} value={selectedBlock.props.speed ?? 60} min={10} max={300} step={5}
        shown={String(selectedBlock.props.speed ?? 60)} oninput={(v) => setBlockProp('speed', v)} />
    </Setting>
  {/if}
  <Setting key="pauseOnHover" shown={ta('common.on')}>
    <SwitchRow label={ta('lbl.ribbonPause')} title={ta('tip.ribbon.pause')} checked={selectedBlock.props.pauseOnHover !== false} onchange={(on) => setBlockProp('pauseOnHover', on)} />
  </Setting>
  <Setting key="pause">
    <Choice stack label={ta('lbl.bandPause')} value={selectedBlock.props.pause ?? 'button'} title={ta('tip.ribbon.pauseMode')}
      options={[['button', ta('opt.bandPause.button')], ['touch', ta('opt.bandPause.touch')]]}
      onchange={(v) => setBlockProp('pause', v)} />
  </Setting>
  <Setting key="fade" shown={ta('common.on')}>
    <SwitchRow label={ta('lbl.ribbonFade')} title={ta('tip.ribbon.fade')} checked={selectedBlock.props.fade !== false} onchange={(on) => setBlockProp('fade', on)} />
  </Setting>
{/if}
