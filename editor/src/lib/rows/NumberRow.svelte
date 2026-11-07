<script>
  /* A count or an exact size, in the row kit (0.7.30.2): the label on the left and the number to type or step on the right (StepField). */
  import StepField from '../StepField.svelte';
  let { label, title = undefined, value, min, max, step = 1, unit = '', scale = 1, decimals = 0, onchange } = $props();
</script>

<div class="ctl-row row-number" {title}>
  <span class="row-label">{label}</span>
  <StepField {value} {min} {max} {step} {unit} {scale} {decimals} {label} {onchange} />
</div>

<style>
  .row-number {
    font-size: 0.85rem;
  }

  /* The field as wide as a number of a few digits with its unit and arrows, so the words beside it keep their line */
  .row-number :global(.step-field) {
    flex: none;
    width: 6.5rem;
  }
</style>
