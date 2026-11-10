<script>
  /* A colour, in the row kit (0.7.30.2): the label on the left and the swatch that opens the colour picker on the right.
     `tokens` are the theme's colours the picker offers first.
     As a setting row's only control (Setting.svelte) the colour owns the row's way back: the row draws no reset, and a colour of the block's own carries the bin on its swatch's corner, which takes it back to the standard.
     A colour that shares its row with other controls (`ownsRow={false}`) leaves the row its reset, and its bin only empties a colour that may be empty (`allowClear`), as it does outside a setting row. */
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
