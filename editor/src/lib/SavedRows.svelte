<script>
  /* The Drafts window's Saved tab (ADR-0032): every saved draft, the newest first (lib/saved-model.js savedList), each with a picture of a page drawn as «My templates» are (preset-thumb.js pageThumb) or the part's sign, its name, «New» where this browser has not seen it, the browser it was saved from, who saved it and when, and the owner's note on the save in italics.
     A press on a row opens it (`opened` names the part whose row stands open). A page's row lists what changed against this browser's version (`changesOf`, lib/page-diff.js, worded by `lineText`), each line looking at the saved version in the canvas at its place (`online`).
     Then its acts: «Look» and «Look on the phone» draw the saved version of a page or the site settings in the canvas (`onlook`), «New tab» opens a page's in a tab of its own (`ontab`), and «Open here» takes the saved draft into this browser (`onopen`), or a check says this browser holds it as saved.
     Where this browser has changed the part too (not where it only holds an older saved copy, unchanged since), a box says so with «Look at both» (`onlook` with both), «Keep both» for a page (`onkeep`) and «Use …'s» in Open here's place.
     The bin takes the saved copy away (`onremove`) at its second press, as a removal does, bright red in between, and a mouse or the focus leaving the row disarms it. */
  import { untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { ICONS } from './icons.js';
  import { PART_KINDS } from './part-kinds.js';
  import { rowMotion } from './motion.svelte.js';
  import IconButton from './rows/IconButton.svelte';
  let { rows, docOf = () => null, whenOf = (iso) => iso, themeStyle = '', onopen, onremove, onlook = null, ontab = null, onkeep = null, online = null, changesOf = null, lineText = (line) => line.kind, opened = $bindable(null) } = $props();
  /** The most lines of what changed a row lists; the rest are counted. */
  const LINES = 6;
  /** What changed in the open row, read as it opens, not again at every edit: null while it is read. */
  let changes = $state(null);
  $effect(() => {
    const part = opened;
    changes = null;
    if (!part || !changesOf || !untrack(() => rows.some((r) => r.part === part && r.kind === 'page'))) return;
    let gone = false;
    changesOf(part).then((found) => { if (!gone) changes = found; });
    return () => { gone = true; };
  });
  /** Looked at in the canvas: a page, or the site settings. */
  const lookable = (row) => Boolean(onlook) && (row.kind === 'page' || row.kind === 'site');

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
        <div class="saved-open-body" id={`saved-acts-${uid}-${row.part}`} transition:rowMotion>
          {#if row.kind === 'page' && changes}
            <!-- What changed: each line looks at the saved version where it changed -->
            <div class="saved-diff">
              {#if changes.fresh}
                <span class="saved-diff-line plain"><i aria-hidden="true"></i>{ta('drafts.newPage')}</span>
              {:else if !changes.lines.length}
                <span class="saved-diff-line plain"><i aria-hidden="true"></i>{ta('drafts.noChanges')}</span>
              {:else}
                {#each changes.lines.slice(0, LINES) as line, i (i)}
                  <button type="button" class="saved-diff-line" disabled={!online} onclick={() => online?.(row, line)}><i aria-hidden="true"></i><span>{lineText(line)}</span></button>
                {/each}
                {#if changes.lines.length > LINES}<span class="saved-diff-line plain more">{ta('drafts.moreChanges', { n: changes.lines.length - LINES })}</span>{/if}
              {/if}
            </div>
          {/if}
          {#if row.here === 'mine'}
            <!-- Changed here too: both looked at, both kept, or the saved one taken -->
            <div class="saved-both">
              <span>{ta('drafts.changedHere', { name: nameOf(row) })}</span>
              <span class="saved-acts">
                {#if lookable(row)}<button type="button" class="ghost saved-act" onclick={() => onlook(row, { both: true })}>{ta('drafts.lookBoth')}</button>{/if}
                {#if onkeep && row.kind === 'page'}<button type="button" class="ghost saved-act" onclick={() => onkeep(row)}>{ta('drafts.keepBoth')}</button>{/if}
                <button type="button" class="ghost saved-act" title={ta('tip.saved.openMine')} onclick={() => onopen(row)}>{row.device ? ta('drafts.useFrom', { from: row.device }) : ta('saved.use')}</button>
              </span>
            </div>
          {/if}
          <div class="saved-acts">
            {#if lookable(row)}
              <button type="button" class="ghost saved-act" onclick={() => onlook(row, {})}>{ta('drafts.look')}</button>
              <button type="button" class="ghost saved-act" onclick={() => onlook(row, { phone: true })}>{ta('drafts.lookPhone')}</button>
            {/if}
            {#if ontab && row.kind === 'page'}<button type="button" class="ghost saved-act" onclick={() => ontab(row)}>{ta('drafts.newTab')}</button>{/if}
            {#if row.here === 'same'}
              <span class="saved-here">{@html ICONS.check}{ta('saved.heldHere')}</span>
            {:else if row.here === 'none' || row.here === 'behind'}
              <button type="button" class="ghost saved-open" title={ta('tip.saved.open')} onclick={() => onopen(row)}>{ta('saved.open')}</button>
            {/if}
            <IconButton icon={ICONS.bin} size="sm" danger class={armed === row.part ? 'armed' : ''} label={armed === row.part ? ta('saved.removeArmed') : ta('saved.remove', { name: nameOf(row) })} onclick={() => pressBin(row)} />
          </div>
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

  .saved-open-body {
    display: grid;
    gap: 0.45rem;
    padding: 0 0.45rem 0.45rem;
  }

  .saved-acts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
  }

  /* What changed: a short list, each line leading to its place in the canvas */
  .saved-diff {
    display: grid;
    gap: 1px;
  }

  .saved-diff-line:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
    min-height: 1.6rem;
    padding: 0.15rem 0.4rem;
    border: 0;
    border-radius: 6px;
    background: none;
    color: inherit;
    font: inherit;
    font-size: 0.78rem;
    text-align: left;
    opacity: 0.85;
    cursor: pointer;
  }

  .saved-diff-line:hover:not(:disabled) {
    background: rgb(255 255 255 / 6%);
    opacity: 1;
  }

  .saved-diff-line.plain {
    cursor: default;
  }

  .saved-diff-line.more {
    opacity: 0.6;
  }

  .saved-diff-line i {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background: #e2b84a;
  }

  /* Changed here too: a dashed box in the amber of what this browser holds */
  .saved-both {
    display: grid;
    gap: 0.4rem;
    padding: 0.5rem;
    border: 1px dashed color-mix(in srgb, #e2b84a 55%, transparent);
    border-radius: 8px;
    font-size: 0.8rem;
  }

  .saved-act:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)),
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
    font-size: 0.76rem;
    color: var(--urd-color-accent, #7c5cff);
  }

  @media (prefers-reduced-motion: reduce) {
    .saved-chev { transition: none; }
  }
</style>
