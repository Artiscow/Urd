<script>
  /* On and off, in the row kit (0.7.30.2): the words on the left and the switch at the row's right edge.
     The checkbox carries role="switch", so a screen reader names it a switch, as the admin draws every checkbox but the lists' tick boxes (app.css).
     In a setting row it tells the row it is a switch, so the row draws no reset beside it (Setting.svelte).
     `lead` draws what stands before the words, such as a link's icon; `field` marks the checkbox as `data-field`, where a caller that brings a field into view finds it. */
  import { getContext } from 'svelte';
  let { label, title = undefined, checked, onchange, disabled = false, lead = undefined, field = undefined } = $props();
  getContext('setting-row')?.switched();
</script>

<label class="gridmenu-snap row-switch" class:muted={disabled} {title}>
  <input type="checkbox" role="switch" {checked} {disabled} data-field={field} onchange={(e) => onchange(e.currentTarget.checked)} />
  {#if lead}{@render lead()}{/if}{label}
</label>
