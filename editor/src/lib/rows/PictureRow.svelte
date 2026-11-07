<script>
  /* A look, in the row kit (0.7.30.2): a row naming what is chosen, with its picture where it has one, that opens the design picker.
     `children` is what stands at the row's end, such as the quick row's pin. */
  let { label, value, picture = '', title = undefined, onclick, children = undefined } = $props();
</script>

<div class="pin-line row-picture">
  <button type="button" class="menu-row" {title} {onclick}>
    {#if picture}<img class="row-picture-img" src={picture} alt="" loading="lazy" />{/if}
    <span class="menu-group-title">{label}</span><span class="menu-group-value">{value}</span>
  </button>
  {@render children?.()}
</div>

<style>
  .row-picture-img {
    flex: none;
    width: 2.6rem;
    height: 1.75rem;
    margin: -0.15rem 0;
    object-fit: cover;
    border-radius: 4px;
    background: color-mix(in srgb, currentColor 8%, transparent);
  }
</style>
