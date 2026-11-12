<script>
  /* The Drafts tab's marks, the same in every layout (PanelTab, Rail): «saving» while a save runs, «saved» with a check for a few seconds after, and otherwise the amber count of the parts that stand in this browser alone; the amber dot while a saved draft is new here. On the rail's icon (`corner`) they sit at its corner, the count as a small badge. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  let { corner = false } = $props();
</script>

{#if ed.savedBusy}
  <span class="drafts-state" class:corner aria-hidden="true">{#if corner}<span class="drafts-spin"></span>{:else}{ta('drafts.saving')}{/if}</span>
{:else if ed.savedJust}
  <span class="drafts-state done" class:corner aria-hidden="true">{@html ICONS.check}{#if !corner}{ta('drafts.justSaved')}{/if}</span>
{:else if ed.draftsWaiting}
  <span class="drafts-count" class:corner aria-hidden="true">{ed.draftsWaiting}</span>
{/if}
{#if ed.draftsFresh}<span class="update-dot legal-dot" class:update-dot-inline={!corner} aria-hidden="true"></span>{/if}

<style>
  /* The count of what stands in this browser alone, in the amber of the This browser tab */
  .drafts-count {
    display: inline-grid;
    place-items: center;
    min-width: 1.05rem;
    height: 1.05rem;
    margin-left: 0.35rem;
    padding: 0 0.3rem;
    border-radius: 999px;
    background: color-mix(in srgb, #e2b84a 22%, transparent);
    color: #e2b84a;
    font-size: 0.68rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .drafts-state {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    margin-left: 0.35rem;
    font-size: 0.72rem;
    opacity: 0.75;
    white-space: nowrap;
  }

  .drafts-state.done {
    color: var(--urd-color-accent, #7c5cff);
    opacity: 1;
  }

  .drafts-state :global(svg) {
    width: 0.8rem;
    height: 0.8rem;
  }

  /* On the rail's icon: the count as a badge at its corner, the state as a small mark there */
  .corner {
    position: absolute;
    right: 3px;
    bottom: 3px;
    margin: 0;
  }

  .drafts-count.corner {
    min-width: 0.85rem;
    height: 0.85rem;
    padding: 0 0.2rem;
    background: #e2b84a;
    color: #1a1500;
    font-size: 0.58rem;
  }

  .drafts-spin {
    width: 0.55rem;
    height: 0.55rem;
    border: 1.5px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: drafts-spin 0.8s linear infinite;
  }

  @keyframes drafts-spin {
    to { transform: rotate(1turn); }
  }

  @media (prefers-reduced-motion: reduce) {
    .drafts-spin { animation: none; }
  }
</style>
