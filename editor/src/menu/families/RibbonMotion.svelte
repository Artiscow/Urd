<script>
  /* A ribbon's motion settings, shown while the band moves: the way to play it in the editor, its direction, its pace, and how a visitor pauses it.
     They stand under the motion they belong to: in the Motion fold, or in Pinned while the motion is pinned (ElementMenu.svelte). */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
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
    <Choice label={ta('lbl.ribbonDirection')} value={selectedBlock.props.direction ?? 'left'}
      options={[['left', ta('opt.ribbonDir.left')], ['right', ta('opt.ribbonDir.right')]]}
      onchange={(v) => setBlockProp('direction', v)} />
  </Setting>
  {#if motion === 'step'}
    <!-- A ticker is timed per word, not per pixel -->
    <Setting key="dwell" shown="2.5">
      <div class="ctl-row" title={ta('tip.ribbon.dwell')}>
        <span class="mini-label ctl-name">{ta('lbl.ribbonDwell')}</span>
        <input type="range" min="0.5" max="10" step="0.5" value={selectedBlock.props.dwell ?? 2.5}
          oninput={(e) => setBlockProp('dwell', e.target.valueAsNumber)} />
        <span class="gridmenu-value">{selectedBlock.props.dwell ?? 2.5} s</span>
      </div>
    </Setting>
  {:else}
    <Setting key="speed" shown="60" pin="speed">
      <div class="ctl-row" title={ta('tip.ribbon.speed')}>
        <span class="mini-label ctl-name">{ta('lbl.ribbonSpeed')}</span>
        <input type="range" min="10" max="300" step="5" value={selectedBlock.props.speed ?? 60}
          oninput={(e) => setBlockProp('speed', e.target.valueAsNumber)} />
        <span class="gridmenu-value">{selectedBlock.props.speed ?? 60}</span>
      </div>
    </Setting>
  {/if}
  <Setting key="pauseOnHover" shown={ta('common.on')}>
    <label class="gridmenu-snap" title={ta('tip.ribbon.pause')}>
      <input type="checkbox" checked={selectedBlock.props.pauseOnHover !== false}
        onchange={(e) => setBlockProp('pauseOnHover', e.target.checked)} />
      {ta('lbl.ribbonPause')}
    </label>
  </Setting>
  <Setting key="pause">
    <Choice label={ta('lbl.bandPause')} value={selectedBlock.props.pause ?? 'button'} title={ta('tip.ribbon.pauseMode')}
      options={[['button', ta('opt.bandPause.button')], ['touch', ta('opt.bandPause.touch')]]}
      onchange={(v) => setBlockProp('pause', v)} />
  </Setting>
  <Setting key="fade" shown={ta('common.on')}>
    <label class="gridmenu-snap" title={ta('tip.ribbon.fade')}>
      <input type="checkbox" checked={selectedBlock.props.fade !== false}
        onchange={(e) => setBlockProp('fade', e.target.checked)} />
      {ta('lbl.ribbonFade')}
    </label>
  </Setting>
{/if}
