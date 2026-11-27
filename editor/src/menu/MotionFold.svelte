<script>
  /* The block's motion at the foot of Style: its entrance, with duration and delay, and its pointer effect; a capability card (ADR-0031). */
  import { getContext } from 'svelte';
  import Capability from '../lib/rows/Capability.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import { hoverOf } from './capabilities.js';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockAnimation, setBlockHover, setBlockAnimProp, setBlockEntranceMobile, isEntrance, blockEntranceOptions, blockHoverOptions } = ed;

  /** The block's own choice under the pointer (capabilities.js hoverOf); '' follows its section, or is none where the section gives none. */
  const hoverNow = $derived(hoverOf(selectedBlock, ed));
</script>

<Capability id="motion">
  <Setting own={isEntrance(selectedBlock.animation)} reset={() => setBlockAnimation(null)}>
    <SelectRow label={ta('lbl.animIn')} title={ta('tip.props.blockAnim')} value={isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : ''}
      options={blockEntranceOptions()} onchange={(v) => setBlockAnimation(v || null)} />
    {#if isEntrance(selectedBlock.animation)}
      <!-- Plays the entrance once on the canvas as this screen shows it; greyed out where this screen draws no entrance -->
      <button type="button" class="ghost action" disabled={ed.viewMode === 'mobile' ? !selectedBlock.entranceMobile || selectedBlock.hideMobile : selectedBlock.hideDesktop}
        onclick={() => ed.bridge?.sendDemoAnim(selectedBlock.sectionId, selectedBlock.blockId)}>{ta('ui.playEntrance')}</button>
      <NumberRow label={ta('lbl.durationMs')} title={ta('tip.anim.duration')} value={selectedBlock.animation.props.duration} min={100} max={4000} step={100}
        onchange={(v) => setBlockAnimProp('duration', Number(v))} />
      <NumberRow label={ta('lbl.delayMs')} title={ta('tip.anim.delay')} value={selectedBlock.animation.props.delay ?? 0} min={0} max={4000} step={100}
        onchange={(v) => setBlockAnimProp('delay', Number(v))} />
      <SwitchRow label={ta('lbl.entranceMobile')} checked={selectedBlock.entranceMobile} onchange={(on) => setBlockEntranceMobile(on)} />
    {/if}
  </Setting>
  <Setting own={Boolean(hoverNow)} reset={() => setBlockHover(null)}>
    <SelectRow label={ta('lbl.onHover')} title={ta('tip.props.blockHover')} value={hoverNow}
      options={blockHoverOptions(selectedBlock)} onchange={(v) => setBlockHover(v || null)} />
  </Setting>
</Capability>
