<script>
  /* A setting that lives in another panel, in the row kit (0.7.30.2): its name on the left, and the panel it opens on the right with an arrow.
     `value` draws what the setting holds there beside its name, such as the legal name and what is still to fill in. */
  import { ICONS } from '../icons.js';
  let { label, to, title = undefined, onclick, value = undefined } = $props();
</script>

<button type="button" class="row-link" {title} {onclick}>
  <span class="row-link-name">{label}{#if value}<span class="row-link-value">{@render value()}</span>{/if}</span>
  <span class="row-link-to">{to}{@html ICONS.chevronRight}</span>
</button>

<style>
  .row-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    width: 100%;
    padding: 0.45rem 0.7rem;
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    text-align: left;
    background: color-mix(in srgb, currentColor 5%, transparent);
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
  }

  .row-link:hover {
    border-color: var(--urd-color-accent);
  }

  .row-link-name {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.2rem 0.5rem;
    min-width: 0;
  }

  .row-link-value {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  /* The value's words are dimmed beside the name; a mark among them (a chip) keeps its strength */
  .row-link-value > :global(span:not([class])) {
    opacity: 0.75;
  }

  .row-link-to {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--urd-color-accent);
  }
</style>
