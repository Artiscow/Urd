<script>
  /* The pin beside a setting that can stand in Pinned: filled while it does (0.7.20.3). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { isInRow } from '../lib/quick-row.js';
  import { ICONS } from '../lib/icons.js';
  import IconButton from '../lib/rows/IconButton.svelte';
  import { quickChoice, pinToggle } from './state.svelte.js';
  import { capabilityOfPin } from './capabilities.js';
  import { keepCapability } from './capabilities.svelte.js';
  const ed = getContext('urd-editor');
  let { id } = $props();
  const type = $derived(ed.selectedBlock.type);
  const on = $derived(isInRow(type, quickChoice(type), id));

  /** A setting taken out of Pinned goes back to its area; one in a capability the block does not use goes back as the capability's card, so it does not vanish (ADR-0031). */
  function toggle() {
    const cap = capabilityOfPin(id);
    if (on && cap && !cap.inUse(ed.selectedBlock, ed)) keepCapability(ed.selectedBlock.blockId, cap.id);
    pinToggle(type, id);
  }
</script>

<IconButton size="sm" quiet class={on ? 'menu-pin on' : 'menu-pin'} pressed={on} icon={on ? ICONS.pinOn : ICONS.pin}
  label={on ? ta('menu.unpin') : ta('menu.pin')} onclick={toggle} />
