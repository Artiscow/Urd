<script>
  /* More than three choices, or long ones: the label and the themed dropdown under it, or beside it with `inline`; `stay` keeps the list open. */
  import Dropdown from '../Dropdown.svelte';
  let { label, title = undefined, value, options, onchange, disabled = false, inline = false, stay = false } = $props();
  const id = $props.id();
</script>

<div class={inline ? 'ctl-row row-select-inline' : 'row-select'} {title}>
  <span class="row-label" id="{id}-label">{label}</span>
  <Dropdown {value} {options} {onchange} {disabled} {stay} fit={inline} labelledby="{id}-label" />
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
