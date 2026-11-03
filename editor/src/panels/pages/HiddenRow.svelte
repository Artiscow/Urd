<script>
  /* The row under a hidden page's head: where visitors to its address go while it is hidden, a temporary redirect changed here (ed.setHiddenTarget), or «not found». */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import Dropdown from '../../lib/Dropdown.svelte';

  const ed = getContext('urd-editor');
  let { id } = $props();

  /** The choice that sends nowhere: no redirect, the host's «not found». */
  const NONE = '__none';

  const entry = $derived(ed.siteDraft.pages.find((p) => p.id === id) ?? null);
  const target = $derived(entry ? ed.hiddenTargetOf(entry) : null);
  const options = $derived.by(() => {
    const pages = ed.siteDraft.pages.filter((p) => p.id !== id && p.path !== '/' && !p.hidden).map((p) => [p.path, p.title || p.id]);
    const list = [['/', ta('dest.front')], ...pages];
    // A target set in the Redirects dialog (another address, a web address) stands in the list as itself.
    if (target && !list.some(([path]) => path === target)) list.push([target, target]);
    return [...list, [NONE, ta('dest.none')]];
  });
</script>

{#if entry?.hidden}
  <div class="hidden-row" title={ta('tip.pages.hiddenTarget')}>
    <span class="hidden-ico" aria-hidden="true">{@html ICONS.redirect}</span>
    <span class="hidden-words">{ta('lbl.whileHidden', { path: entry.path })}</span>
    <Dropdown value={target ?? NONE} {options} title={ta('tip.pages.hiddenTarget')}
      onchange={(v) => ed.setHiddenTarget(entry, v === NONE ? null : v)} />
  </div>
{/if}

<style>
  .hidden-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
    padding: 0.5rem 1.1rem;
    font-size: 0.84rem;
    background: color-mix(in srgb, #d9b44a 11%, transparent);
    border-bottom: 1px solid color-mix(in srgb, #d9b44a 32%, transparent);
  }

  .hidden-ico {
    display: inline-flex;
    color: #d9b44a;
  }

  .hidden-words {
    min-width: 0;
  }

  /* The destination at its own width beside the words, not stretched to the row's end */
  .hidden-row :global(.dd) {
    flex: 0 1 15rem;
    min-width: 0;
  }
</style>
