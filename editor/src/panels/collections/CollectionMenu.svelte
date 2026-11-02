<script>
  /* A collection's own menu, the ⋮ in its head: rename it, give it another kind among those its entries fit (lib/collection-bulk.js), tick all its entries, its CSV out and in, and its removal (undone with Ctrl+Z).
     The menu is a card under the ⋮ with its sub-views in place (the new name, the kinds), each with a way back. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { dismiss } from '../../lib/dismiss.js';
  import { kindsFor } from '../../lib/collection-bulk.js';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  let { id, onselectall } = $props();
  const act = collectionActions(ed);

  let open = $state(false);
  let page = $state('main');
  let name = $state('');
  let opener = $state(null);
  let card = $state(null);
  let fileEl = $state(null);

  const view = $derived(ed.collectionsView[id]);
  const kinds = $derived(view ? kindsFor(view) : []);
  const kindLabel = (kind) => ta(`collectionKind.${kind}`);

  const BACK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  const CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
  const NEXT = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function close() {
    open = false;
    page = 'main';
  }

  /** A sub-view, its first control taking the focus. */
  function go(next) {
    page = next;
    if (next === 'rename') name = view?.name ?? id;
    tick().then(() => card?.querySelector('input, button:not([disabled])')?.focus());
  }

  function rename() {
    ed.renameCollection(id, name);
    close();
  }
</script>

<span class="cm-wrap">
  <button type="button" class="ghost row-tool" bind:this={opener} aria-expanded={open}
    title={ta('tip.collections.menu')} aria-label={ta('tip.collections.menu')} onclick={() => (open ? close() : (open = true))}>{@html ICONS.kebab}</button>
  {#if open}
    <div class="cm-card" role="group" aria-label={view?.name ?? id} bind:this={card} use:dismiss={{ close, opener }}>
      {#if page === 'main'}
        <button type="button" title={ta('tip.collections.rename')} onclick={() => go('rename')}>{ta('ui.rename')}</button>
        <button type="button" title={ta('tip.collections.kind')} onclick={() => go('kind')}>
          <span>{ta('common.type')}</span><span class="cm-val">{kindLabel(view?.kind)}{@html NEXT}</span></button>
        <button type="button" title={ta('tip.collections.selectAll')} onclick={() => { onselectall?.(); close(); }}>{ta('ui.selectAllEntries')}</button>
        <hr />
        <button type="button" title={ta('tip.collections.exportCsv')} onclick={() => { act.exportCollectionCsv(id); close(); }}>{ta('ui.exportCsv')}</button>
        <!-- The file picker stands hidden; the menu's own item opens it -->
        <button type="button" title={ta('tip.collections.importCsv')} onclick={() => fileEl?.click()}>{ta('ui.importCsv')}</button>
        <input class="cm-file-input" type="file" accept=".csv,text/csv" tabindex="-1" aria-hidden="true" bind:this={fileEl}
          onchange={(e) => { act.importCollectionCsv(id, e); close(); }} />
        <hr />
        <button type="button" class="cm-danger" title={ta('tip.collections.deleteCollection')} onclick={() => { close(); ed.removeCollection(id); }}>{ta('ui.deleteCollection')}</button>
      {:else if page === 'rename'}
        <button type="button" class="cm-back" title={ta('ui.back')} onclick={() => go('main')}>{@html BACK}<span>{ta('ui.rename')}</span></button>
        <!-- The name changes alone: the collection's id, its file, its feed and the blocks that show it stay -->
        <input type="text" class="cm-input" bind:value={name} aria-label={ta('lbl.collectionName')} title={ta('tip.collections.rename')}
          onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); rename(); } }} />
        <button type="button" class="cm-primary" disabled={!name.trim()} onclick={rename}>{ta('ui.save')}</button>
      {:else if page === 'kind'}
        <button type="button" class="cm-back" title={ta('ui.back')} onclick={() => go('main')}>{@html BACK}<span>{ta('common.type')}</span></button>
        {#each kinds as k (k.kind)}
          <!-- A kind the entries do not fit stands greyed, its reason under its name -->
          <button type="button" aria-pressed={view?.kind === k.kind} aria-disabled={!k.fits || undefined}
            class:cm-off={!k.fits} title={k.fits ? ta('tip.collections.kind') : ta(`collections.reason.${k.reason}`)}
            onclick={() => { if (!k.fits) return; ed.setCollectionKind(id, k.kind); close(); }}>
            <span class="cm-two"><span>{kindLabel(k.kind)}</span>{#if !k.fits}<span class="cm-why">{ta(`collections.reason.${k.reason}`)}</span>{/if}</span>
            {#if view?.kind === k.kind}<span class="cm-check" aria-hidden="true">{@html CHECK}</span>{/if}
          </button>
        {/each}
      {/if}
    </div>
  {/if}
</span>

<style>
  .cm-wrap {
    position: relative;
    display: inline-flex;
  }

  /* The card under the ⋮, right-aligned, over what follows in the panel */
  .cm-card {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    z-index: 30;
    display: grid;
    gap: 2px;
    width: min(16rem, 80vw);
    padding: 6px;
    font-size: 0.85rem;
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 10px;
    box-shadow: 0 14px 40px rgb(0 0 0 / 55%);
  }

  .cm-card > button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: 2rem;
    padding: 0.4rem 0.6rem;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;
  }

  .cm-card > button:hover,
  .cm-card > button:focus-visible {
    background: rgb(255 255 255 / 8%);
    outline: none;
  }

  .cm-file-input {
    display: none;
  }

  .cm-val {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    opacity: 0.7;
  }

  .cm-card hr {
    width: 100%;
    height: 1px;
    margin: 3px 0;
    border: 0;
    background: rgb(255 255 255 / 10%);
  }

  .cm-danger {
    color: #f08a8a;
  }

  .cm-back {
    justify-content: flex-start !important;
    font-weight: 600;
  }

  .cm-input {
    height: 2rem;
    margin: 2px 0.3rem;
    padding: 0 0.5rem;
    font: inherit;
    color: inherit;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid var(--urd-color-accent, #7c5cff);
    border-radius: 6px;
  }

  .cm-primary {
    justify-content: center !important;
    margin: 2px 0.3rem;
    font-weight: 600;
    color: var(--urd-color-bg, #0f1218) !important;
    background: var(--urd-color-accent, #7c5cff) !important;
  }

  .cm-primary:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .cm-two {
    display: grid;
    gap: 0.1rem;
  }

  .cm-why {
    font-size: 0.75rem;
  }

  .cm-off {
    opacity: 0.5;
    cursor: default !important;
  }

  .cm-check {
    display: inline-flex;
    color: var(--urd-color-accent, #7c5cff);
  }
</style>
