<script>
  /* A look, in the row kit (0.7.30.2): a button that opens the design picker, with the design's picture where it has one, the setting's name, and under it the design chosen.
     Filled as the admin's buttons are, so it never reads as a fold; buttons that stand together sit side by side in an even grid (`.look-rows` in app.css).
     A pin stands inside its border and the setting's reset on its corner, both through the setting row it is drawn in (Setting.svelte). */
  let { label, value, picture = '', title = undefined, onclick } = $props();
</script>

<button type="button" class="menu-row row-picture" {title} {onclick}>
  {#if picture}{#key picture}<img class="row-picture-img" src={picture} alt="" loading="lazy" onerror={(e) => (e.currentTarget.hidden = true)} />{/key}{/if}
  <span class="row-picture-words"><span class="menu-group-title">{label}</span>{#if value}<span class="menu-group-value">{value}</span>{/if}</span>
</button>

<style>
  .row-picture-img {
    flex: none;
    width: 2.5rem;
    height: 1.65rem;
    object-fit: cover;
    border-radius: 4px;
    background: color-mix(in srgb, currentColor 8%, transparent);
  }

  /* The setting's name over the design chosen in it */
  .row-picture-words {
    display: grid;
    flex: 1;
    min-width: 0;
    line-height: 1.2;
  }

  /* A word too long for a narrow button ends in an ellipsis before the pin */
  .row-picture .menu-group-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8rem;
  }

  .row-picture .menu-group-value {
    max-width: none;
    font-size: 0.74rem;
  }
</style>
