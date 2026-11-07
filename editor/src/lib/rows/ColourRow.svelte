<script>
  /* A colour, in the row kit (0.7.30.2): the label on the left and the swatch that opens the colour picker on the right.
     `tokens` are the theme's colours the picker offers first. */
  import ColorPicker from '../ColorPicker.svelte';
  let { label, title = undefined, value, tokens = [], allowClear = false, onchange } = $props();
</script>

<div class="ctl-row row-colour" {title}>
  <span class="row-label">{label}</span>
  <ColorPicker {value} {tokens} {label} {allowClear} {onchange} />
</div>

<style>
  .row-colour {
    font-size: 0.85rem;
  }
</style>
