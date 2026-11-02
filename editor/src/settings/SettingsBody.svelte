<script>
  /* The Urd settings' rows (lib/settings-model.js) in the form the window asks for.
     `place` dialog or sheet draws each group as a section with a heading, and each setting as a row with its name at the left and its control at the right, a pictured choice with its tiles under its name;
     the panel draws each group as a fold with the settings stacked, the name over the control, and the chosen picture's name beside the setting's name since the tiles carry none.
     A shared group (the site's own values) carries its mark in the heading. `only` keeps one side of the sheet, `query` is the search, `idPrefix` keeps the ids apart when two bodies stand in one window, and `empty` says whether a search that finds nothing says so here. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { menu, setMenuWidthPref } from '../menu/state.svelte.js';
  import { visibleGroups, pictured } from '../lib/settings-model.js';
  import SettingControl from './SettingControl.svelte';

  const ed = getContext('urd-editor');
  let { place = 'dialog', only = null, query = '', idPrefix = 'st-sec', empty = true } = $props();
  const c = { ed, ta, menu, setMenuWidthPref };
  const groups = $derived(visibleGroups(query, only, c));
  const compact = $derived(place === 'panel');

  /** The name of the chosen option, shown beside the setting's name where the tiles carry no names. */
  function chosen(setting) {
    const v = setting.get(c);
    return setting.options?.(c).find(([id]) => id === v)?.[1] ?? '';
  }

  const GLOBE = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';
</script>

{#each groups as group (group.id)}
  {#if compact}
    <details class="group st-fold" open>
      <summary title={group.shared ? ta('tip.settings.shared') : undefined}>
        {ta(group.labelKey)}
        {#if group.shared}<span class="st-shared">{@html GLOBE}{ta('settings.shared')}</span>{/if}
      </summary>
      <div class="group-items st-items">
        {#each group.settings as s (s.id)}
          <div class="st-item" class:st-sub={!!s.parent} title={ta(s.tipKey)}>
            <span class="st-name"><span id="{idPrefix}-n-{s.id}">{ta(s.labelKey)}</span>{#if pictured(s, ed.settingsPictures)}<span class="st-chosen">{chosen(s)}</span>{/if}</span>
            <SettingControl setting={s} pictures={ed.settingsPictures} compact nameId="{idPrefix}-n-{s.id}" />
          </div>
        {/each}
      </div>
    </details>
  {:else}
    <section class="st-section" id="{idPrefix}-{group.id}">
      <h3 title={group.shared ? ta('tip.settings.shared') : undefined}>
        {ta(group.labelKey)}
        {#if group.shared}<span class="st-shared">{@html GLOBE}{ta('settings.shared')}</span>{/if}
      </h3>
      {#each group.settings as s, i (s.id)}
        <div class="st-row" class:st-row-stack={pictured(s, ed.settingsPictures) || s.kind === 'text'}
          class:st-has-sub={group.settings[i + 1]?.parent === s.id} class:st-sub={!!s.parent} title={ta(s.tipKey)}>
          <span class="st-name" id="{idPrefix}-n-{s.id}">{ta(s.labelKey)}</span>
          <SettingControl setting={s} pictures={ed.settingsPictures} nameId="{idPrefix}-n-{s.id}" />
        </div>
      {/each}
    </section>
  {/if}
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

  .st-section h3 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 0.2rem;
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
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
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

  /* The panel's folds: the settings stacked, the name over the control */
  .st-fold summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .st-items {
    gap: 0.7rem;
    padding-left: 0;
  }

  .st-item {
    display: grid;
    gap: 0.35rem;
  }

  .st-item.st-sub {
    margin-top: -0.3rem;
    padding-left: 0.8rem;
  }

  .st-item .st-name {
    justify-content: space-between;
    font-size: 0.82rem;
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
