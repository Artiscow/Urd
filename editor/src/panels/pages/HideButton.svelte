<script>
  /* A page's «Hide» button in the heads of its settings: «Hide» while visitors see the page, «Hidden» pressed in amber with a crossed eye while they do not (ed.setPageHidden asks where a published page's visitors go). The front page cannot be hidden. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';

  const ed = getContext('urd-editor');
  let { id } = $props();

  const entry = $derived(ed.siteDraft.pages.find((p) => p.id === id) ?? null);
  const hidden = $derived(entry?.hidden === true);
  const front = $derived(entry?.path === '/');
  const tip = $derived(front ? ta('tip.pages.frontNoHide') : hidden ? ta('tip.pages.hiddenShow') : ta('tip.pages.hide'));
</script>

{#if entry}
  <button type="button" class="hide-btn" class:on={hidden} disabled={front} aria-pressed={hidden} title={tip} aria-label={tip}
    onclick={() => ed.setPageHidden(entry, !hidden)}>{@html hidden ? ICONS.eyeOff : ICONS.eye}<span>{hidden ? ta('ui.hidden') : ta('ui.hide')}</span></button>
{/if}

<style>
  .hide-btn {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.4rem;
    height: 1.9rem;
    padding: 0 0.65rem;
    font: inherit;
    font-size: 0.82rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 8px;
    opacity: 0.85;
  }

  .hide-btn:hover:not(:disabled) {
    opacity: 1;
    background: rgb(255 255 255 / 7%);
  }

  .hide-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }

  /* Hidden: pressed in amber, the state the page is in */
  .hide-btn.on {
    color: #d9b44a;
    border-color: color-mix(in srgb, #d9b44a 60%, transparent);
    background: color-mix(in srgb, #d9b44a 12%, transparent);
    opacity: 1;
  }
</style>
