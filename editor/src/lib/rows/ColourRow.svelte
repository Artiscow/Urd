<script>
  /* A colour, in the row kit: the label and the swatch; as a setting row's only control, its bin is the row's way back, unless `ownsRow` is false. */
  import { getContext } from 'svelte';
  import ColorPicker from '../ColorPicker.svelte';
  let { label, title = undefined, value, tokens = [], allowClear = false, ownsRow = true, onchange } = $props();
  const row = ownsRow ? getContext('setting-row') : null;
  row?.coloured();
</script>

<div class="ctl-row row-colour" {title}>
  <span class="row-label">{label}</span>
  <ColorPicker {value} {tokens} {label} {allowClear} {onchange} onremove={row?.own() ? row.back : undefined} />
</div>

<style>
  .row-colour {
    font-size: 0.85rem;
  }
</style>
