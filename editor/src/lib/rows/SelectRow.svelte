<script>
  /* More than three choices, or long ones, in the row kit (0.7.30.2): the label above and the themed dropdown under it (ADR-0009).
     Two or three short choices take a segment instead (lib/Choice.svelte). */
  import Dropdown from '../Dropdown.svelte';
  let { label, title = undefined, value, options, onchange, disabled = false } = $props();
  const id = $props.id();
</script>

<div class="row-select" {title}>
  <span class="row-label" id="{id}-label">{label}</span>
  <Dropdown {value} {options} {onchange} {disabled} labelledby="{id}-label" />
</div>

<style>
  .row-select {
    display: grid;
    gap: 5px;
    font-size: 0.85rem;
  }
</style>
