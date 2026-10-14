<script>
  /* The pin beside a setting that can stand in the quick row: filled while it
     does (0.7.20.3). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { isInRow } from '../lib/quick-row.js';
  import { ICONS } from '../lib/icons.js';
  import { quickChoice, pinToggle } from './state.svelte.js';
  const ed = getContext('urd-editor');
  let { id } = $props();
  const type = $derived(ed.selectedBlock.type);
  const on = $derived(isInRow(type, quickChoice(type), id));
</script>

<button type="button" class="menu-pin" class:on aria-pressed={on}
  title={on ? ta('menu.unpin') : ta('menu.pin')} aria-label={on ? ta('menu.unpin') : ta('menu.pin')}
  onclick={() => pinToggle(type, id)}>{@html on ? ICONS.pinOn : ICONS.pin}</button>
