<script>
  /* The site's collections as rows, each with its name, its kind and its count, the open one marked; and the form that makes a new collection under them. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Dropdown from '../../lib/Dropdown.svelte';

  const ed = getContext('urd-editor');
  let { selected = null, onselect } = $props();

  const NEXT_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  const KINDS = $derived([
    ['news', ta('collectionKind.news')],
    ['notices', ta('collectionKind.notices')],
    ['publications', ta('collectionKind.publications')],
    ['products', ta('collectionKind.products')],
    ['custom', ta('collectionKind.custom')],
  ]);

  /** A kind's name; a kind the panel does not know is shown as it is stored. */
  const kindLabel = (kind) => KINDS.find(([k]) => k === kind)?.[1] ?? kind ?? '';

  /** A new collection opens at once (its open request), so its first entry is one press away. */
  const create = () => ed.addCollection();
</script>

{#if ed.collectionsUnavailable}
  <p class="panel-hint place-error">{ta('collections.unreadable')}</p>
{/if}
<div class="cl-collections">
  {#each ed.collectionIds as id (id)}
    {@const view = ed.collectionsView[id]}
    <button type="button" class="cl-collection" class:selected={selected === id} data-collection-id={id} title={ta('tip.collections.pick')}
      aria-current={selected === id ? 'true' : undefined} onclick={() => onselect?.(id)}>
      <span class="cl-collection-words">
        <span class="cl-collection-name">{view?.name ?? id}</span>
        <span class="cl-collection-meta">{kindLabel(view?.kind)} · {ta('collections.entryCount', { n: view?.entries.length ?? 0 })}</span>
      </span>
      <span class="cl-next" aria-hidden="true">{@html NEXT_ICON}</span>
    </button>
  {/each}
</div>
{#if !ed.collectionsUnavailable}
  {#if ed.collectionIds.length}<hr class="gridmenu-divider" />{/if}
  <p class="mini-label group-sub">{ta('ui.newCollection')}</p>
  <label title={ta('tip.collections.newName')}>{ta('lbl.newCollectionName')}
    <input data-new-collection bind:value={() => ed.newCollectionName, (v) => (ed.newCollectionName = v)} placeholder={ta('ph.collections.name')}
      onkeydown={(e) => e.key === 'Enter' && create()} /></label>
  <label title={ta('tip.collections.kind')}>{ta('common.type')}
    <Dropdown value={ed.newCollectionKind} options={KINDS} onchange={(v) => (ed.newCollectionKind = v)} /></label>
  <button class="ghost action" onclick={create} disabled={!ed.newCollectionName.trim()}>{ta('ui.createCollection')}</button>
{/if}

<style>
  .cl-collections {
    display: grid;
    gap: 0.4rem;
  }

  .cl-collection {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.7rem;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: color-mix(in srgb, currentColor 3%, transparent);
    border: 1px solid color-mix(in srgb, currentColor 12%, transparent);
    border-radius: 8px;
  }

  .cl-collection:hover {
    border-color: color-mix(in srgb, currentColor 28%, transparent);
  }

  /* The open collection: a faint accent surface and border, never a line at the edge */
  .cl-collection.selected {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 14%, transparent);
  }

  .cl-collection-words {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  .cl-collection-name {
    overflow: hidden;
    font-size: 0.9rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cl-collection-meta {
    font-size: 0.74rem;
    opacity: 0.65;
  }

  .cl-next {
    display: inline-flex;
    opacity: 0.6;
  }
</style>
