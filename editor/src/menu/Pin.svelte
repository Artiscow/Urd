<script>
  /* The pin beside a setting that can stand in Pinned: filled while it does (0.7.20.3). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { isInRow } from '../lib/quick-row.js';
  import { ICONS } from '../lib/icons.js';
  import IconButton from '../lib/rows/IconButton.svelte';
  import { quickChoice, pinToggle } from './state.svelte.js';
  const ed = getContext('urd-editor');
  let { id } = $props();
  const type = $derived(ed.selectedBlock.type);
  const on = $derived(isInRow(type, quickChoice(type), id));
</script>

<IconButton size="sm" quiet class={on ? 'menu-pin on' : 'menu-pin'} pressed={on} icon={on ? ICONS.pinOn : ICONS.pin}
  label={on ? ta('menu.unpin') : ta('menu.pin')} onclick={() => pinToggle(type, id)} />
