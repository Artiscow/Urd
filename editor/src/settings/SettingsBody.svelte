<script>
  /* The Urd settings' rows (lib/settings-model.js) in the form the window asks for, every section open in one scroll, with no folds.
     The sections stand in their groups (the admin design, Local settings, This site), a group named over its first section where that section's heading does not already say it, and not on the sheet's plain side, where the first group holds parts alone; a section is its heading, whose tooltip says what its settings act on, and its rows.
     `place` dialog or sheet draws each setting as a row with its name at the left and its control at the right, a pictured choice and a text field under the name at the full width;
     the panel stacks every name over its control, shows the chosen picture's name beside the setting's name since the tiles carry none, and keeps each section's heading at the top while its section scrolls.
     The admin design stands first, its tiles under the line that names the design that stands and what differs from it (AdminDesignRow.svelte), and a part whose value differs from that design names the design's value beside its name, with the way back to it (state/admin-design.svelte.js).
     A shared section (the site's own values) carries its mark in the heading. `only` keeps one side of the sheet, `query` is the search, `idPrefix` keeps the ids apart when two bodies stand in one window, and `empty` says whether a search that finds nothing says so here. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { searchLangs } from '../lib/search-langs.svelte.js';
  import { visibleGroups, inBands, pictured } from '../lib/settings-model.js';
  import { settingsContext, partNote, partBack } from '../state/admin-design.svelte.js';
  import { ICONS } from '../lib/icons.js';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import SettingControl from './SettingControl.svelte';
  import AdminDesignRow from './AdminDesignRow.svelte';

  const ed = getContext('urd-editor');
  let { place = 'dialog', only = null, query = '', idPrefix = 'st-sec', empty = true } = $props();
  // A setting is found by its words in any language once the other languages are in (search-langs.js); a typed query loads them.
  const c = settingsContext(ed);
  $effect(() => searchLangs.need(query));
  const bands = $derived(inBands(visibleGroups(query, only, c)));
  const compact = $derived(place === 'panel');

  /** The name of the chosen option, shown beside the setting's name where the tiles carry no names. */
  function chosen(setting) {
    const v = setting.get(c);
    return setting.options?.(c).find(([id]) => id === v)?.[1] ?? '';
  }

  const GLOBE = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';</script>

{#each bands as band (band.id)}
  {#if only !== 'plain' && band.labelKey !== band.groups[0].labelKey}<SubHeading text={ta(band.labelKey)} title={ta(band.tipKey)} />{/if}
  {#each band.groups as group (group.id)}
    <section class="st-section" class:compact id="{idPrefix}-{group.id}">
      <h3 class="st-head" id="{idPrefix}-h-{group.id}" title={group.tipKey ? ta(group.tipKey) : undefined}>
        {ta(group.labelKey)}
        {#if group.shared}<span class="st-shared">{@html GLOBE}{ta('settings.shared')}</span>{/if}
      </h3>
      {#each group.settings as s, i (s.id)}
        {@const note = s.part ? partNote(s.id, c) : null}
        {#if s.design}
          <div class="st-row st-row-stack" title={ta(s.tipKey)}>
            <AdminDesignRow {c} />
            <SettingControl setting={s} {c} pictures={ed.settingsPictures} {compact} nameId="{idPrefix}-h-{group.id}" />
          </div>
        {:else}
          <div class="st-row" class:st-row-stack={pictured(s, ed.settingsPictures) || s.kind === 'text'}
            class:st-has-sub={group.settings[i + 1]?.parent === s.id} class:st-sub={!!s.parent} title={ta(s.tipKey)}>
            <span class="st-name">
              <span id="{idPrefix}-n-{s.id}">{ta(s.labelKey)}</span>
              {#if compact && pictured(s, ed.settingsPictures)}<span class="st-chosen">{chosen(s)}</span>{/if}
              {#if note}
                <button type="button" class="st-note" title={ta('tip.adminDesign.partBack', { name: note.name, value: note.value })}
                  onclick={() => partBack(note.part, note.design, c)}>{ta('adminDesign.partValue', { name: note.name, value: note.value })}{@html ICONS.reset}</button>
              {/if}
            </span>
            <SettingControl setting={s} {c} pictures={ed.settingsPictures} {compact} nameId="{idPrefix}-n-{s.id}" label={ta(s.labelKey)} />
          </div>
        {/if}
      {/each}
    </section>
  {/each}
{:else}
  {#if empty}<p class="st-empty">{ta('settings.noMatch')}</p>{/if}
{/each}

<style>
  .st-section {
    display: grid;
    gap: 0;
    margin-bottom: 1.1rem;
    scroll-margin-top: 0.5rem;
  }

  .st-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 0.3rem;
    font-size: 0.95rem;
    font-weight: 600;
  }

  /* A row: the name at the left, the control in a column of its own at the right; a pictured choice and a text field stand under the name at the full width */
  .st-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 14rem;
    gap: 0.4rem 1rem;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .st-row-stack {
    grid-template-columns: minmax(0, 1fr);
  }

  /* A setting that belongs to the choice above it: drawn directly under that row, the two kept together without a line between them, its name set in */
  .st-row.st-has-sub {
    padding-bottom: 0.2rem;
    border-bottom: 0;
  }

  .st-row.st-sub {
    padding-top: 0.2rem;
  }

  .st-sub .st-name {
    padding-left: 1rem;
    font-size: 0.8rem;
    opacity: 0.85;
  }

  .st-name {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3rem 0.6rem;
    font-size: 0.85rem;
  }

  /* A part changed from the design: the design's value in words, the arrow taking the part back to it */
  .st-note {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.1rem 0.5rem;
    font: inherit;
    font-size: 0.72rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    border-radius: 999px;
    opacity: 0.8;
  }

  .st-note :global(svg) {
    width: 12px;
    height: 12px;
  }

  .st-note:hover,
  .st-note:focus-visible {
    border-color: var(--urd-color-accent, #7c5cff);
    opacity: 1;
  }

  .st-note:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }

  .st-shared {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.1rem 0.5rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--urd-color-accent, #7c5cff);
    text-transform: none;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 14%, transparent);
    border-radius: 999px;
  }

  /* The panel's column: every name over its control, no lines between the rows, and the section's heading kept at the top while its section scrolls */
  .compact .st-head {
    position: sticky;
    top: 0;
    z-index: 1;
    margin: 0;
    padding: 0.45rem 0 0.35rem;
    font-size: 0.85rem;
    background: var(--urd-color-surface, #151a23);
  }

  .compact .st-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.35rem;
    padding: 0.4rem 0;
    border-bottom: 0;
  }

  .compact .st-name {
    justify-content: space-between;
    font-size: 0.82rem;
  }

  .compact .st-sub .st-name {
    padding-left: 0.8rem;
  }

  .st-chosen {
    font-size: 0.75rem;
    opacity: 0.65;
  }

  .st-empty {
    margin: 0.5rem 0;
    font-size: 0.85rem;
    opacity: 0.65;
  }
</style>
