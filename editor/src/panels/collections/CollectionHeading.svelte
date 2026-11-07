<script>
  /* The panel's heading in the two columns («Collections editor»: two columns) while a collection is open: «Collections › name ▾» with the collection's ⋮ beside its name.
     «Collections» goes back to the list of collections, the name opens the picker of the site's collections, and the ⋮ is the collection's own menu (CollectionMenu.svelte): it renames the collection, changes its kind, exports and imports it, and acts on the selected entries, so it stands with the collection's name, never over the chosen entry. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { sortEntries } from '$engine/collections.js';
  import { entryMatches } from '../../lib/collection-layout.js';
  import { liveTicks } from '../../lib/collection-bulk.js';
  import Dropdown from '../../lib/Dropdown.svelte';
  import CollectionMenu from './CollectionMenu.svelte';

  const ed = getContext('urd-editor');
  const view = $derived(ed.collectionsView[ed.panelCollection]);
  const options = $derived(ed.collectionIds.map((id) => [id, ed.collectionsView[id]?.name ?? id]));
  /** The ticked entries that still exist, and the ones the panel's search shows, which «Select all» takes. */
  const ticks = $derived(view ? liveTicks(ed.panelTicks, view.entries) : []);
  const shownIds = $derived(view ? (view.kind === 'products' ? view.entries : sortEntries(view.entries, true)).filter((en) => entryMatches(en, ed.panelQuery, ed.plainTitle)).map((en) => en.id) : []);

  function back() {
    const left = ed.panelCollection;
    ed.panelCollection = null;
    ed.panelEntry = null;
    queueMicrotask(() => document.querySelector(`.cl-collection[data-collection-id="${CSS.escape(left)}"]`)?.focus());
  }

  function choose(id) {
    if (id === ed.panelCollection) return;
    ed.panelEntry = null;
    ed.panelCollection = id;
  }
</script>

<!-- The heading itself stands for the screen reader; the controls around the name are a group of their own, since a heading holds no menu -->
<h2 class="coll-heading-sr">{ta('panel.collections')}: {view?.name ?? ed.panelCollection}</h2>
<div class="coll-heading" role="group" aria-label={ta('panel.collections')}>
  <button type="button" class="coll-heading-up" title={ta('tip.collections.back')} onclick={back}>{ta('panel.collections')}</button>
  <span class="coll-heading-sep" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>
  <span class="coll-heading-pick"><Dropdown compact value={ed.panelCollection} {options} title={ta('tip.collections.chooseCollection')} onchange={choose} /></span>
  <CollectionMenu id={ed.panelCollection} {ticks} {shownIds} onticks={(next) => (ed.panelTicks = next)} />
</div>

<style>
  .coll-heading-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .coll-heading {
    font-size: 0.95rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    min-width: 0;
  }

  /* «Collections» reads as the level above, small and dim, and leads back to it */
  .coll-heading-up {
    flex: none;
    min-height: 0;
    padding: 0.15em 0.3em;
    font: inherit;
    font-size: 0.85em;
    font-weight: 500;
    opacity: 0.6;
    background: transparent;
    border: 0;
    border-radius: 5px;
  }

  .coll-heading-up:hover {
    opacity: 1;
    background: rgb(255 255 255 / 7%);
  }

  .coll-heading-sep {
    display: inline-flex;
    flex: none;
    opacity: 0.45;
  }

  /* The collection's name as the heading's word, its arrow opening the picker */
  .coll-heading-pick {
    display: flex;
    min-width: 0;
  }

  .coll-heading-pick :global(.dd-btn) {
    font-size: inherit;
    font-weight: 700;
    border-radius: 6px;
    padding: 0.15em 0.4em;
  }

  .coll-heading-pick :global(.dd-btn:hover) {
    background: rgb(255 255 255 / 7%);
  }
</style>
