<script>
  /* On and off in the row kit: the words on the left and a role="switch" checkbox at the right edge; in a setting row it draws no reset. */
  import { getContext } from 'svelte';
  let { label, title = undefined, checked, onchange, disabled = false, lead = undefined, field = undefined } = $props();
  getContext('setting-row')?.switched();
</script>

<label class="gridmenu-snap row-switch" class:muted={disabled} {title}>
  <input type="checkbox" role="switch" {checked} {disabled} data-field={field} onchange={(e) => onchange(e.currentTarget.checked)} />
  {#if lead}{@render lead()}{/if}{label}
</label>
