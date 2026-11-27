<script>
  /* An empty list or panel in the row kit: what will stand here, and the button that adds the first (`action`, `onaction`). */
  let { text, title = undefined, action = undefined, onaction = undefined, children = undefined } = $props();
</script>

<div class="row-empty" {title}>
  <span>{text}</span>
  {#if action && onaction}
    <button type="button" class="ghost action" onclick={onaction}>{action}</button>
  {/if}
  {@render children?.()}
</div>

<style>
  .row-empty {
    display: grid;
    justify-items: center;
    gap: 0.5rem;
    padding: 0.9rem;
    font-size: 0.85rem;
    text-align: center;
    border: 1px dashed color-mix(in srgb, currentColor 22%, transparent);
    border-radius: 8px;
  }

  .row-empty > span {
    opacity: 0.7;
  }
</style>
