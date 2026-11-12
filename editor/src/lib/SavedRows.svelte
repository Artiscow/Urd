<script>
  /* The Drafts window's Saved tab (ADR-0032): every saved draft, the newest first (lib/saved-model.js savedList), each with a picture of a page drawn as «My templates» are (preset-thumb.js pageThumb) or the part's sign, its name, «New» where this browser has not seen it, the browser it was saved from, who saved it and when, and the owner's note on the save in italics.
     A press on a row opens it to its acts (`opened` names the part whose row stands open): «Open here» takes the saved draft into this browser (`onopen`), or a check says this browser holds it as saved; the bin takes the saved copy away (`onremove`) at its second press, as a removal does, bright red in between, and a mouse or the focus leaving the row disarms it. */
  import { ta } from '$engine/i18n.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { ICONS } from './icons.js';
  import { PART_KINDS } from './part-kinds.js';
  import { rowMotion } from './motion.svelte.js';
  import IconButton from './rows/IconButton.svelte';
  let { rows, docOf = () => null, whenOf = (iso) => iso, themeStyle = '', onopen, onremove, opened = $bindable(null) } = $props();

  const nameOf = (row) => row.name ?? ta(PART_KINDS[row.kind]?.name ?? 'unpublished.site');
  /** Where and when a draft was saved: the browser's name where it has one, who saved it, and how long ago. */
  const fromOf = (row) => [row.device, row.saver, whenOf(row.savedAt)].filter(Boolean).join(' · ');

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
  const uid = Math.random().toString(36).slice(2, 7);
</script>

<div class="saved-rows" role="list">
  {#each rows as row (row.part)}
    {@const doc = row.kind === 'page' ? docOf(row.part) : null}
    {@const isOpen = opened === row.part}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="saved-item" class:open={isOpen} role="listitem" onpointerleave={(e) => { if (e.pointerType === 'mouse' && armed === row.part) armed = null; }}
      onfocusout={(e) => { if (armed === row.part && !e.currentTarget.contains(e.relatedTarget)) armed = null; }}>
      <button type="button" class="saved-row" aria-expanded={isOpen} aria-controls={`saved-acts-${uid}-${row.part}`} onclick={() => { opened = isOpen ? null : row.part; }}>
        <span class="saved-pic" class:drawn={Boolean(doc)} style={doc ? themeStyle : undefined} aria-hidden="true">{@html doc ? pageThumb(doc, { w: 34, h: 42, max: 4 }) : (PART_KINDS[row.kind]?.icon ?? '')}</span>
        <span class="saved-words">
          <span class="saved-name">{nameOf(row)}{#if row.fresh}<span class="saved-new">{ta('saved.new')}</span>{/if}</span>
          <small>{fromOf(row)}</small>
          {#if row.note}<span class="saved-note">{row.note}</span>{/if}
        </span>
        <span class="saved-chev" aria-hidden="true">{@html ICONS.chevronDown}</span>
      </button>
      {#if isOpen}
        <div class="saved-acts" id={`saved-acts-${uid}-${row.part}`} transition:rowMotion>
          {#if row.here === 'same'}
            <span class="saved-here">{@html ICONS.check}{ta('saved.heldHere')}</span>
          {:else}
            <button type="button" class="ghost saved-open" title={ta(row.here === 'mine' ? 'tip.saved.openMine' : 'tip.saved.open')} onclick={() => onopen(row)}>{ta('saved.open')}</button>
          {/if}
          <IconButton icon={ICONS.bin} size="sm" danger class={armed === row.part ? 'armed' : ''} label={armed === row.part ? ta('saved.removeArmed') : ta('saved.remove', { name: nameOf(row) })} onclick={() => pressBin(row)} />
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .saved-rows {
    display: grid;
    gap: 2px;
  }

  .saved-item {
    border: 1px solid transparent;
    border-radius: 9px;
  }

  /* An open row stands in a frame of its own, with its acts under it */
  .saved-item.open {
    border-color: rgb(255 255 255 / 12%);
    background: rgb(255 255 255 / 3%);
  }

  .saved-row:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    width: 100%;
    min-width: 0;
    min-height: 2.8rem;
    padding: 0.3rem 0.45rem;
    border: 0;
    border-radius: 8px;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
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
    font-weight: 600;
  }

  .saved-words small {
    font-size: 0.74rem;
    opacity: 0.65;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* The owner's note on the save, in their own words */
  .saved-note {
    font-size: 0.78rem;
    font-style: italic;
    overflow-wrap: anywhere;
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

  .saved-chev {
    display: inline-flex;
    flex: none;
    opacity: 0.5;
    transition: transform 0.2s ease;
  }

  .open .saved-chev {
    transform: rotate(180deg);
  }

  .saved-acts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
    padding: 0 0.45rem 0.45rem;
  }

  .saved-open:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    flex: none;
    width: auto;
    min-height: 1.8rem;
    padding: 0 0.7rem;
    font-size: 0.8rem;
  }

  .saved-here {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-right: auto;
    font-size: 0.76rem;
    color: var(--urd-color-accent, #7c5cff);
  }

  @media (prefers-reduced-motion: reduce) {
    .saved-chev { transition: none; }
  }
</style>
