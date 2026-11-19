<script>
  /* More than three choices, or long ones, in the row kit (0.7.30.2): the label above and the themed dropdown under it (ADR-0009).
     `inline` puts the dropdown beside the label, as wide as the chosen option; the label breaks onto a second line first, and the dropdown goes under it only where the row has no room for both, so a choice is never cut.
     Two or three short choices take a segment instead (lib/Choice.svelte). */
  import Dropdown from '../Dropdown.svelte';
  let { label, title = undefined, value, options, onchange, disabled = false, inline = false } = $props();
  const id = $props.id();
</script>

<div class={inline ? 'ctl-row row-select-inline' : 'row-select'} {title}>
  <span class="row-label" id="{id}-label">{label}</span>
  <Dropdown {value} {options} {onchange} {disabled} fit={inline} labelledby="{id}-label" />
</div>

<style>
  .row-select {
    display: grid;
    gap: 5px;
    font-size: 0.85rem;
  }

  .row-select-inline {
    flex-wrap: wrap;
    font-size: 0.85rem;
  }

  /* The label takes the room the dropdown leaves and breaks its words before the dropdown has to go under it */
  .row-select-inline > .row-label {
    flex: 1 1 5rem;
  }

  .row-select-inline > :global(.dd) {
    margin-left: auto;
  }
</style>
