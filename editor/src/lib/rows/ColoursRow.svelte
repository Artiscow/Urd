<script>
  /* Several colours of one thing in one row, in the row kit: the label on the left and the swatches side by side on the right, each named under its swatch, wrapping where the row has no room.
     Each item is `{ key, caption, name, value, onchange }`: the caption is the short word under the swatch, the name the colour's full name for its picker and a screen reader.
     Each colour is taken away by the bin on its own swatch's corner, so the row draws no reset beside it (Setting.svelte). */
  import { getContext } from 'svelte';
  import ColorPicker from '../ColorPicker.svelte';
  let { label, title = undefined, items, tokens = [] } = $props();
  getContext('setting-row')?.coloured();
</script>

<div class="ctl-row row-colours" {title}>
  <span class="row-label">{label}</span>
  <span class="row-colours-set">
    {#each items as item (item.key)}
      <span class="row-colour-one">
        <ColorPicker value={item.value} {tokens} label={item.name} allowClear onchange={item.onchange} />
        <span class="row-colour-caption" aria-hidden="true">{item.caption}</span>
      </span>
    {/each}
  </span>
</div>

<style>
  .row-colours {
    align-items: flex-start;
    font-size: 0.85rem;
  }

  .row-colours > .row-label {
    padding-top: 0.45rem;
  }

  .row-colours-set {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px 12px;
  }

  .row-colour-one {
    display: grid;
    justify-items: center;
    gap: 3px;
    max-width: 5.5rem;
  }

  .row-colour-one :global(.cp-swatch) {
    width: 2.6rem;
    height: 1.9rem;
  }

  .row-colour-caption {
    font-size: 0.72rem;
    line-height: 1.2;
    text-align: center;
    opacity: 0.7;
  }
</style>
