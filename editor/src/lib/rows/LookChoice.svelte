<script>
  /* How a look is chosen, in the row kit (0.7.33.8), as Urd settings «Designs» asks (menu.designsPref): a picture row naming the design in use that opens the design picker (PictureRow.svelte), or the designs' pictures in place under a small heading, the one in use ringed, a press choosing one at once.
     A choice of a few designs shows them all; a larger one a run around the one in use (lib/look-choice.js); the last tile opens the design picker with its live previews, named «All designs» beside a run and «Full window» where every design stands.
     In the design's own small panel (the bar's design button in its small window, `look:design` in lib/only-group.js) the pictures stand whatever «Designs» says, every design of the choice, scrolling in a box with the one in use brought into view.
     `designs` lists the choice's designs (pictureList in design-sources.js) and is read only for the pictures; without it, or without `onpick`, the row stands in either mode.
     `heading` leaves the small heading out where the fold around the pictures already bears the name. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { menu } from '../../menu/state.svelte.js';
  import { ICONS } from '../icons.js';
  import { looksInPlace } from '../look-choice.js';
  import PictureRow from './PictureRow.svelte';
  import SubHeading from './SubHeading.svelte';

  let { label, value, picture = '', title = undefined, current = null, designs = null, onpick = null, onopen, heading = true } = $props();
  const menuOnly = getContext('menu-only');
  /** Whether this is the design's own small panel, which shows the pictures in either mode. */
  const ownPanel = $derived(menuOnly?.only === 'look:design');
  /** Where the run of a larger choice starts, kept so a press on one of its pictures leaves the run where it stands. */
  let runStart = null;
  const shown = $derived.by(() => {
    if ((menu.designsPref !== 'inline' && !ownPanel) || !designs || !onpick) return null;
    const all = designs();
    const run = looksInPlace(all, current, runStart);
    runStart = run.start;
    return { all, more: run.more, inRun: new Set(run.items.map((d) => d.id)) };
  });

  /** In the design's own small panel, the design in use is brought to the middle of the box, once it is laid out, where it stands out of view: as the panel opens, and when the panel shows another block's design; the box alone scrolls. */
  const intoView = (inUse) => (node) => {
    const frame = requestAnimationFrame(() => {
      const tile = inUse !== null && node.closest('.emenu-only[data-only-kind="look"]') ? node.querySelector('.look-tile.on') : null;
      if (!tile) return;
      const box = node.getBoundingClientRect();
      const at = tile.getBoundingClientRect();
      if (at.top < box.top || at.bottom > box.bottom) node.scrollTop += at.top - box.top - (node.clientHeight - at.height) / 2;
    });
    return () => cancelAnimationFrame(frame);
  };
</script>

{#if shown}
  <div class="look-choice" role="group" aria-label={label} title={heading ? undefined : title}>
    {#if heading}<SubHeading text={label} {title} />{/if}
    <div class="look-grid" {@attach intoView(current)}>
      {#each shown.all as d (d.id)}
        <button type="button" class="look-tile" class:on={d.id === current} class:beyond={shown.more && !shown.inRun.has(d.id)} aria-pressed={d.id === current} title={d.about || d.name}
          onclick={() => { if (d.id !== current) onpick(d.id); }}>
          <span class="look-pic">{#if d.picture}<img src={d.picture} alt="" loading="lazy" onerror={(e) => (e.currentTarget.hidden = true)} />{/if}</span>
          <span class="look-name">{d.name}</span>
        </button>
      {/each}
      {#if onopen}
        <button type="button" class="look-tile look-all" title={ta('tip.lookChoice.all')} onclick={onopen}>
          <span class="look-pic">{@html ICONS.designs}</span>
          <span class="look-name">{ta(shown.more && !ownPanel ? 'lookChoice.all' : 'lookChoice.full')}</span>
        </button>
      {/if}
    </div>
  </div>
{:else}
  <PictureRow {label} {value} {picture} {title} onclick={onopen} />
{/if}

<style>
  .look-choice {
    display: grid;
    gap: 0.4rem;
  }

  /* The pictures share the column's width, as many to a line as fit at a readable size */
  .look-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5.4rem, 1fr));
    gap: 0.4rem;
  }

  .look-tile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.3rem;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    margin: 0;
    padding: 0.3rem;
    font: inherit;
    font-size: 0.72rem;
    line-height: 1.2;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: color-mix(in srgb, currentColor 5%, transparent);
    border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
    border-radius: 9px;
  }

  /* A design beyond the run stands only in the design's own small panel, which shows them all */
  .look-tile.beyond {
    display: none;
  }

  :global(.emenu-only[data-only-kind='look']) .look-tile.beyond {
    display: flex;
  }

  /* There the pictures scroll in a box about three lines of them high, so the panel keeps the size of a run, with room for a tile's focus ring at the box's edges */
  :global(.emenu-only[data-only-kind='look']) .look-grid {
    grid-auto-rows: max-content;
    align-content: start;
    max-height: 21.5rem;
    padding: 3px 0.3rem 3px 3px;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }

  .look-tile:hover {
    border-color: color-mix(in srgb, currentColor 32%, transparent);
  }

  .look-tile:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 1px;
  }

  /* The design in use: ringed in the accent, as the settings' own tiles mark their choice */
  .look-tile.on {
    border-color: var(--urd-color-accent, #7c5cff);
    box-shadow: inset 0 0 0 1px var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 10%, transparent);
  }

  /* Each picture whole and centred on a dark surface, as the design picker shows them */
  .look-pic {
    display: grid;
    place-items: center;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: color-mix(in srgb, currentColor 8%, transparent);
    border-radius: 5px;
  }

  .look-pic img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .look-pic img[hidden] {
    display: none;
  }

  .look-all .look-pic :global(svg) {
    width: 1.4rem;
    height: 1.4rem;
    opacity: 0.75;
  }

  /* The name under its picture at the tile's left edge, in the floating menu and in a panel alike */
  .look-name {
    display: block;
    align-self: stretch;
    min-width: 0;
    text-align: left;
    overflow-wrap: anywhere;
  }
</style>
