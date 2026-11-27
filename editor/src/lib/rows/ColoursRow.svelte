<script>
  /* Several colours of one thing in one row: the label left, the swatches right, each captioned under it and named in full for its picker. */
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

  .row-colour-one :global(.cp-swatch:not(.cp-pop *)) {
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
