<script>
  /* The block's motion, at the foot of Style in the element menu: how it comes in as the page scrolls to it, with its duration and delay, and what it does under the pointer, its rows from the row kit as a section's motion has them.
     A capability (ADR-0031): a card while the block has an entrance or an effect, or was given motion this session, and nothing until then.
     The entrance and the pointer's effect are setting rows that tell whether the block has one, with the way back to none; the duration and the delay stand in the entrance's row. */
  import { getContext } from 'svelte';
  import Capability from '../lib/rows/Capability.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import { hoverOf } from './capabilities.js';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockAnimation, setBlockHover, setBlockAnimProp, isEntrance, blockEntranceOptions, blockHoverOptions } = ed;

  /** The block's own choice under the pointer (capabilities.js hoverOf); '' follows its section, or is none where the section gives none. */
  const hoverNow = $derived(hoverOf(selectedBlock, ed));
</script>

<Capability id="motion">
  <Setting own={isEntrance(selectedBlock.animation)} reset={() => setBlockAnimation(null)}>
    <SelectRow label={ta('lbl.animIn')} title={ta('tip.props.blockAnim')} value={isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : ''}
      options={blockEntranceOptions()} onchange={(v) => setBlockAnimation(v || null)} />
    {#if isEntrance(selectedBlock.animation)}
      <NumberRow label={ta('lbl.durationMs')} title={ta('tip.anim.duration')} value={selectedBlock.animation.props.duration} min={100} max={4000} step={100}
        onchange={(v) => setBlockAnimProp('duration', Number(v))} />
      <NumberRow label={ta('lbl.delayMs')} title={ta('tip.anim.delay')} value={selectedBlock.animation.props.delay ?? 0} min={0} max={4000} step={100}
        onchange={(v) => setBlockAnimProp('delay', Number(v))} />
    {/if}
  </Setting>
  <Setting own={Boolean(hoverNow)} reset={() => setBlockHover(null)}>
    <SelectRow label={ta('lbl.onHover')} title={ta('tip.props.blockHover')} value={hoverNow}
      options={blockHoverOptions(selectedBlock)} onchange={(v) => setBlockHover(v || null)} />
  </Setting>
</Capability>
