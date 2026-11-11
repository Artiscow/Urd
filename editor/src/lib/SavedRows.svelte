<script>
  /* The Saved menu's rows (ADR-0032): every saved draft, the newest first (lib/saved-model.js savedList), each with a picture of a page drawn as «My templates» are (preset-thumb.js pageThumb) or the part's sign, its name, who saved it and when, and «New» where this browser has not seen it.
     «Open here» takes the saved draft into this browser (`onopen`); a draft this browser holds as saved shows a check instead. The bin takes the saved copy away (`onremove`) at its second press, as a removal does, bright red in between, and a mouse or the focus leaving the row disarms it. */
  import { ta } from '$engine/i18n.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { ICONS } from './icons.js';
  import IconButton from './rows/IconButton.svelte';
  let { rows, docOf = () => null, whenOf = (iso) => iso, themeStyle = '', onopen, onremove } = $props();

  /** The sign and the words of a part without a picture or a name of its own. */
  const KINDS = {
    page: { icon: ICONS.panel_pages },
    site: { icon: ICONS.panel_site, name: 'unpublished.site' },
    collections: { icon: ICONS.panel_collections, name: 'unpublished.collections' },
    collection: { icon: ICONS.panel_collections },
    templates: { icon: ICONS.panel_blocks, name: 'canvas.tabMyTemplates' },
    plugins: { icon: ICONS.panel_plugins, name: 'panel.plugins' },
    redirects: { icon: ICONS.redirect, name: 'ui.redirects' },
  };
  const nameOf = (row) => row.name ?? ta(KINDS[row.kind]?.name ?? 'unpublished.site');

  /** The row whose bin waits for its second press. */
  let armed = $state(null);
  function pressBin(row) {
    if (armed !== row.part) {
      armed = row.part;
      return;
    }
    armed = null;
    onremove(row);
  }
</script>

<div class="saved-rows" role="list">
  {#each rows as row (row.part)}
    {@const doc = row.kind === 'page' ? docOf(row.part) : null}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="saved-row" role="listitem" onpointerleave={(e) => { if (e.pointerType === 'mouse' && armed === row.part) armed = null; }}
      onfocusout={(e) => { if (armed === row.part && !e.currentTarget.contains(e.relatedTarget)) armed = null; }}>
      <span class="saved-pic" class:drawn={Boolean(doc)} style={doc ? themeStyle : undefined} aria-hidden="true">{@html doc ? pageThumb(doc, { w: 34, h: 42, max: 4 }) : (KINDS[row.kind]?.icon ?? '')}</span>
      <span class="saved-words">
        <span class="saved-name">{nameOf(row)}{#if row.fresh}<span class="saved-new">{ta('saved.new')}</span>{/if}</span>
        <small>{ta('saved.by', { who: row.saver, when: whenOf(row.savedAt) })}</small>
      </span>
      {#if row.here === 'same'}
        <span class="saved-here" title={ta('tip.saved.here')}>{@html ICONS.check}</span>
      {:else}
        <button type="button" class="ghost saved-open" title={ta(row.here === 'mine' ? 'tip.saved.openMine' : 'tip.saved.open')} onclick={() => onopen(row)}>{ta('saved.open')}</button>
      {/if}
      <IconButton icon={ICONS.bin} size="sm" danger class={armed === row.part ? 'armed' : ''} label={armed === row.part ? ta('saved.removeArmed') : ta('saved.remove', { name: nameOf(row) })} onclick={() => pressBin(row)} />
    </div>
  {/each}
</div>

<style>
  .saved-rows {
    display: grid;
    gap: 2px;
  }

  .saved-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    min-height: 2.6rem;
    padding: 0.2rem 0.4rem;
    border-radius: 7px;
  }

  .saved-row:hover {
    background: rgb(255 255 255 / 5%);
  }

  /* The picture: a page drawn in the site's colours, or the part's sign in the same frame */
  .saved-pic {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 34px;
    height: 42px;
    border-radius: 5px;
    background: rgb(255 255 255 / 5%);
    border: 1px solid rgb(255 255 255 / 10%);
    overflow: hidden;
  }

  .saved-pic.drawn {
    background: var(--urd-color-bg, #f3f2ee);
  }

  .saved-pic :global(svg) {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .saved-words {
    display: grid;
    flex: 1 1 auto;
    min-width: 0;
  }

  .saved-name {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.85rem;
  }

  .saved-words small {
    font-size: 0.74rem;
    opacity: 0.65;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* New here: a small chip in the amber of what this browser has not seen */
  .saved-new {
    flex: none;
    padding: 0 0.4rem;
    border-radius: 999px;
    background: color-mix(in srgb, #e2b84a 18%, transparent);
    color: #e2b84a;
    font-size: 0.68rem;
    font-weight: 600;
  }

  .saved-open {
    flex: none;
    min-height: 1.7rem;
    padding: 0 0.6rem;
    font-size: 0.78rem;
  }

  .saved-here {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 1.7rem;
    height: 1.7rem;
    color: var(--urd-color-accent, #7c5cff);
  }
</style>
