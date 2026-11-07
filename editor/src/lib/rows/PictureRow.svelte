<script>
  /* A look, in the row kit (0.7.30.2): a row naming what is chosen, with its picture where it has one, that opens the design picker.
     A pin stands beside it through the setting row it is drawn in (Setting.svelte's `pin`). */
  let { label, value, picture = '', title = undefined, onclick } = $props();
</script>

<button type="button" class="menu-row row-picture" {title} {onclick}>
  {#if picture}<img class="row-picture-img" src={picture} alt="" loading="lazy" />{/if}
  <span class="menu-group-title">{label}</span><span class="menu-group-value">{value}</span>
</button>

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
