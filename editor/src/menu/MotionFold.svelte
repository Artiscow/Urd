<script>
  /* The block's motion, at the foot of Style in the element menu: how it comes in as the page scrolls to it, with its duration and delay, and what it does under the pointer; a group that shows the effect while closed, its rows from the row kit as a section's motion has them. */
  import { getContext } from 'svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockAnimation, setBlockHover, setBlockAnimProp, isEntrance, blockEntranceOptions, hoverOptions } = ed;

  /** What the Motion group shows while closed. */
  function menuMotionValue() {
    const id = isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : selectedBlock.hover?.type;
    const hit = id ? [...blockEntranceOptions(), ...hoverOptions()].find(([v]) => v === id) : null;
    return hit ? hit[1] : ta('common.none');
  }
</script>

<Fold id="motion" title={ta('group.motion')} value={menuMotionValue()}>
  <SelectRow label={ta('lbl.animIn')} title={ta('tip.props.blockAnim')} value={isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : ''}
    options={blockEntranceOptions()} onchange={(v) => setBlockAnimation(v || null)} />
  {#if isEntrance(selectedBlock.animation)}
    <NumberRow label={ta('lbl.durationMs')} title={ta('tip.anim.duration')} value={selectedBlock.animation.props.duration} min={100} max={4000} step={100}
      onchange={(v) => setBlockAnimProp('duration', Number(v))} />
    <NumberRow label={ta('lbl.delayMs')} title={ta('tip.anim.delay')} value={selectedBlock.animation.props.delay ?? 0} min={0} max={4000} step={100}
      onchange={(v) => setBlockAnimProp('delay', Number(v))} />
  {/if}
  <SelectRow label={ta('lbl.onHover')} title={ta('tip.props.blockHover')} value={selectedBlock.hover?.type ?? (selectedBlock.animation && !isEntrance(selectedBlock.animation) ? selectedBlock.animation.type : '')}
    options={hoverOptions()} onchange={(v) => setBlockHover(v || null)} />
</Fold>
