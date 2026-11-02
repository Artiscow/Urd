<script>
  /* The bar for the ticked entries, under the search: the cross that clears the ticks, how many are ticked and how many the search hides, Duplicate, «More» and Delete apart at the right.
     «More» opens a card under the bar: set a field on all of them, move or copy them to another collection (the ones they fit, the others greyed with their reason, or a new one), export them as CSV, and tick all the entries shown.
     Each change is one undo step, offered again as «Undo» in the status line (state/collections.svelte.js). */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { dismiss } from '../../lib/dismiss.js';
  import DatePicker from '../../lib/DatePicker.svelte';
  import { entriesFit, settableFields, hiddenTicks } from '../../lib/collection-bulk.js';
  import { collectionActions } from './actions.js';

  const ed = getContext('urd-editor');
  let { id, ticks, shownIds, onticks } = $props();
  const act = collectionActions(ed);

  let open = $state(false);
  let page = $state('main');
  let opener = $state(null);
  let card = $state(null);
  let field = $state(null);
  let value = $state('');
  let newName = $state('');

  const view = $derived(ed.collectionsView[id]);
  const hidden = $derived(hiddenTicks(ticks, shownIds));
  const fields = $derived(settableFields(view?.kind));
  const chosenField = $derived(fields.find((f) => f.field === field) ?? fields[0]);
  const ticked = $derived(view ? view.entries.filter((e) => ticks.includes(e.id)) : []);
  const others = $derived(ed.collectionIds.filter((c) => c !== id).map((c) => {
    const v = ed.collectionsView[c];
    return { id: c, name: v?.name ?? c, kind: v?.kind, ...entriesFit(ticked, v?.kind) };
  }));

  const BACK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  const NEXT = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  const CARET = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const PLUS = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  function close() {
    open = false;
    page = 'main';
    newName = '';
  }

  /** A sub-view, its first control taking the focus. */
  function go(next) {
    page = next;
    if (next === 'field') { field = fields[0]?.field ?? null; value = ''; }
    tick().then(() => card?.querySelector('input, button:not([disabled]):not(.sb-back)')?.focus());
  }

  function duplicate() {
    const copies = ed.duplicateEntries(id, ticks);
    onticks(copies);
  }

  function remove() {
    ed.removeEntries(id, ticks);
    onticks([]);
  }

  function setField(clear) {
    const ok = ed.setFieldOn(id, ticks, chosenField.field, clear ? '' : String(value).trim());
    if (ok) close();
  }

  function carry(to, copy) {
    if (ed.carryToCollection(id, to, ticks, copy)) {
      if (!copy) onticks([]);
      close();
    }
  }

  function carryNew(copy) {
    if (ed.carryToNewCollection(id, newName, ticks, copy)) {
      if (!copy) onticks([]);
      close();
    }
  }
</script>

<div class="sb">
  <button type="button" class="sb-icon" title={ta('tip.collections.clearTicks')} aria-label={ta('tip.collections.clearTicks')} onclick={() => onticks([])}>{@html ICONS.cross}</button>
  <span class="sb-count" aria-live="polite">
    <span>{ta('collections.ticked', { n: String(ticks.length) })}</span>
    {#if hidden}<span class="sb-hidden">{ta('collections.tickedHidden', { n: String(hidden) })}</span>{/if}
  </span>
  <button type="button" class="sb-icon" title={ta('tip.collections.duplicateTicked')} aria-label={ta('tip.collections.duplicateTicked')} onclick={duplicate}>{@html ICONS.copy}</button>
  <span class="sb-wrap">
    <button type="button" class="sb-more" bind:this={opener} aria-expanded={open} title={ta('tip.collections.moreTicked')}
      onclick={() => (open ? close() : (open = true))}>{ta('ui.more')}{@html CARET}</button>
    {#if open}
      <div class="sb-card" role="group" aria-label={ta('tip.collections.moreTicked')} bind:this={card} use:dismiss={{ close, opener }}>
        {#if page === 'main'}
          <button type="button" title={ta('tip.collections.setField')} onclick={() => go('field')}><span>{ta('ui.setField')}</span>{@html NEXT}</button>
          <button type="button" title={ta('tip.collections.moveTicked')} onclick={() => go('move')}><span>{ta('ui.moveToCollection')}</span>{@html NEXT}</button>
          <button type="button" title={ta('tip.collections.copyTicked')} onclick={() => go('copy')}><span>{ta('ui.copyToCollection')}</span>{@html NEXT}</button>
          <hr />
          <button type="button" title={ta('tip.collections.exportTicked')} onclick={() => { act.exportCollectionCsv(id, ticks); close(); }}>{ta('ui.exportTicked')}</button>
          <button type="button" title={ta('tip.collections.tickShown')} onclick={() => { onticks([...new Set([...ticks, ...shownIds])]); close(); }}>
            <span>{ta('ui.tickShown')}</span><kbd>Ctrl A</kbd></button>
        {:else if page === 'field'}
          <button type="button" class="sb-back" title={ta('ui.back')} onclick={() => go('main')}>{@html BACK}<span>{ta('ui.setField')}</span></button>
          <!-- The fields the collection's kind has, the chosen one's value under them -->
          <span class="seg sb-seg" role="group" aria-label={ta('ui.setField')}>
            {#each fields as f (f.field)}
              <button type="button" class:on={chosenField?.field === f.field} aria-pressed={chosenField?.field === f.field}
                onclick={() => { field = f.field; value = ''; }}>{ta(f.labelKey)}</button>
            {/each}
          </span>
          {#if chosenField?.input === 'date'}
            <DatePicker value={value} title={ta('tip.entry.date')} onchange={(v) => (value = v)} />
          {:else}
            <input class="sb-input" type={chosenField?.input === 'number' ? 'number' : 'text'} min="0" step="0.01" bind:value
              aria-label={ta(chosenField?.labelKey ?? 'ui.setField')} title={ta('tip.collections.setField')}
              onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setField(false); } }} />
          {/if}
          <span class="sb-pair">
            <button type="button" class="sb-plain" title={ta('tip.collections.clearField')} onclick={() => setField(true)}>{ta('ui.clearField', { field: ta(chosenField?.labelKey ?? 'ui.setField') })}</button>
            <button type="button" class="sb-primary" disabled={String(value).trim() === ''} onclick={() => setField(false)}>{ta('ui.setForTicked', { n: String(ticks.length) })}</button>
          </span>
        {:else}
          {@const copy = page === 'copy'}
          <button type="button" class="sb-back" title={ta('ui.back')} onclick={() => go('main')}>{@html BACK}<span>{ta(copy ? 'ui.copyToCollection' : 'ui.moveToCollection')}</span></button>
          <span class="sb-head">{ta(copy ? 'collections.copyTo' : 'collections.moveTo', { n: String(ticks.length) })}</span>
          {#each others as o (o.id)}
            <!-- A collection the entries do not fit stands greyed, its reason under its name -->
            <button type="button" aria-disabled={!o.fits || undefined} class:sb-off={!o.fits}
              title={o.fits ? ta(copy ? 'tip.collections.copyTicked' : 'tip.collections.moveTicked') : ta(`collections.reason.${o.reason}`)}
              onclick={() => { if (o.fits) carry(o.id, copy); }}>
              <span class="sb-two"><span>{o.name}</span><span class="sb-why">{o.fits ? ta(`collectionKind.${o.kind}`) : `${ta(`collectionKind.${o.kind}`)}: ${ta(`collections.reason.${o.reason}`)}`}</span></span>
            </button>
          {:else}
            <span class="sb-why sb-none">{ta('collections.noOtherCollection')}</span>
          {/each}
          <hr />
          <!-- A new collection of the same kind, named here, takes the entries -->
          <span class="sb-new">
            <span class="sb-new-mark" aria-hidden="true">{@html PLUS}</span>
            <input class="sb-input" type="text" bind:value={newName} placeholder={ta('ph.collections.newFor')} aria-label={ta('lbl.newCollectionName')} title={ta('tip.collections.newFor')}
              onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); carryNew(copy); } }} />
          </span>
          <button type="button" class="sb-primary" disabled={!newName.trim()} onclick={() => carryNew(copy)}>{ta('ui.createCollection')}</button>
        {/if}
      </div>
    {/if}
  </span>
  <span class="sb-divider" aria-hidden="true"></span>
  <button type="button" class="sb-icon sb-danger" title={ta('tip.collections.deleteTicked')} aria-label={ta('tip.collections.deleteTicked')} onclick={remove}>{@html ICONS.cross}</button>
</div>

<style>
  .sb {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.35rem 0.3rem 0.25rem;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 14%, transparent);
    border: 1px solid var(--urd-color-accent, #7c5cff);
    border-radius: 8px;
  }

  .sb-count {
    display: grid;
    flex: 1;
    min-width: 0;
    font-size: 0.82rem;
    line-height: 1.2;
  }

  .sb-hidden {
    font-size: 0.72rem;
    opacity: 0.75;
  }

  .sb-icon {
    display: inline-grid;
    flex: none;
    place-items: center;
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .sb > .sb-icon:first-child {
    border-color: transparent;
  }

  .sb-danger {
    color: #f08a8a;
    border-color: rgb(224 82 82 / 50%);
  }

  .sb-divider {
    flex: none;
    width: 1px;
    height: 1.2rem;
    background: rgb(255 255 255 / 20%);
  }

  .sb-wrap {
    position: static;
    display: inline-flex;
  }

  /* «More» in words and in the accent, unlike the collection's own ⋮ above it */
  .sb-more {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    height: 1.8rem;
    padding: 0 0.55rem;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--urd-color-bg, #0f1218);
    cursor: pointer;
    background: var(--urd-color-accent, #7c5cff);
    border: 0;
    border-radius: 6px;
  }

  .sb-card {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    left: 0;
    z-index: 30;
    display: grid;
    gap: 2px;
    padding: 6px;
    font-size: 0.85rem;
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 10px;
    box-shadow: 0 14px 40px rgb(0 0 0 / 55%);
  }

  .sb-card > button {
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

  .sb-card > button:hover,
  .sb-card > button:focus-visible {
    background: rgb(255 255 255 / 8%);
    outline: none;
  }

  .sb-card kbd {
    font: inherit;
    font-size: 0.72rem;
    opacity: 0.6;
  }

  .sb-card hr {
    width: 100%;
    height: 1px;
    margin: 3px 0;
    border: 0;
    background: rgb(255 255 255 / 10%);
  }

  .sb-card > .sb-back {
    justify-content: flex-start;
    font-weight: 600;
  }

  .sb-head {
    padding: 0.3rem 0.6rem 0.1rem;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .sb-two {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }

  .sb-why {
    font-size: 0.75rem;
    opacity: 0.65;
  }

  .sb-none {
    padding: 0.3rem 0.6rem;
  }

  .sb-off {
    opacity: 0.5;
    cursor: default !important;
  }

  .sb-seg {
    display: flex;
    margin: 2px 0.3rem;
  }

  .sb-seg button {
    flex: 1;
    padding: 5px 4px;
  }

  .sb-input {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    height: 2rem;
    padding: 0 0.5rem;
    font: inherit;
    color: inherit;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 6px;
  }

  .sb-input:focus {
    border-color: var(--urd-color-accent, #7c5cff);
    outline: none;
  }

  .sb-card > .sb-input,
  .sb-card > :global(.dp) {
    margin: 2px 0.3rem;
    width: auto;
  }

  .sb-new {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0 0.3rem;
  }

  .sb-new-mark {
    display: inline-flex;
    opacity: 0.7;
  }

  .sb-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    margin: 2px 0.3rem;
  }

  .sb-plain,
  .sb-primary {
    min-height: 2rem;
    padding: 0 0.5rem;
    font: inherit;
    font-size: 0.8rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .sb-primary {
    font-weight: 600;
    color: var(--urd-color-bg, #0f1218);
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
  }

  .sb-card > .sb-primary {
    margin: 2px 0.3rem;
  }

  .sb-primary:disabled {
    opacity: 0.45;
    cursor: default;
  }
</style>
