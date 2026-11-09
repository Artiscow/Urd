<script>
  /* The admin design's line (ADR-0030), over its tiles first in the Urd settings: the design that stands, «Floating menu», or «Floating menu, changed» with the parts that differ named under it.
     While a part differs, «Back to Floating menu» takes every part back to the design; after a design is chosen, «Undo» takes it back as one step while the parts stand as it left them (state/admin-design.svelte.js). */
  import { ta, adminLang } from '$engine/i18n.js';
  import { ADMIN_DESIGNS } from '../lib/admin-designs.js';
  import { ICONS } from '../lib/icons.js';
  import { applyDesign, canUndo, undoDesign, partLabel } from '../state/admin-design.svelte.js';

  let { c } = $props();
  const designs = $derived(c.designs);
  const standing = $derived(designs.state.design);
  const changed = $derived(designs.state.changed);
  const name = $derived(ta(ADMIN_DESIGNS.find((d) => d.id === standing)?.labelKey ?? ''));
  const undoable = $derived(canUndo(designs.values));

  /** The parts that differ, joined as the admin language joins a list. */
  function joined(ids) {
    const names = ids.map(partLabel);
    try {
      return new Intl.ListFormat(adminLang(), { type: 'conjunction' }).format(names);
    } catch {
      return names.join(', ');
    }
  }
</script>

<div class="ad">
  <span class="ad-words">
    <span class="ad-name">{changed.length ? ta('adminDesign.changed', { name }) : name}</span>
    {#if changed.length}<span class="ad-diff">{ta('adminDesign.differs', { parts: joined(changed) })}</span>{/if}
  </span>
  {#if changed.length}
    <button type="button" class="ad-act" title={ta('tip.adminDesign.back', { name })} onclick={() => applyDesign(standing, c)}>{@html ICONS.reset}<span>{ta('adminDesign.back', { name })}</span></button>
  {/if}
  {#if undoable}
    <button type="button" class="ad-act" title={ta('tip.adminDesign.undo')} onclick={() => undoDesign(c)}>{@html ICONS.undo}<span>{ta('ui.undo')}</span></button>
  {/if}
</div>

<style>
  .ad {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem 0.6rem;
  }

  .ad-words {
    display: grid;
    flex: 1 1 12rem;
    gap: 0.1rem;
    min-width: 0;
  }

  .ad-name {
    font-size: 0.85rem;
    font-weight: 600;
  }

  .ad-diff {
    font-size: 0.75rem;
    opacity: 0.7;
  }

  .ad-act {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.7rem;
    font: inherit;
    font-size: 0.78rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    border-radius: 999px;
  }

  .ad-act:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .ad-act:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }

  .ad-act :global(svg) {
    width: 13px;
    height: 13px;
  }
</style>
