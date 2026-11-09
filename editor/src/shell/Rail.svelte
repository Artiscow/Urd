<script>
  /* The panel rail, in the two layouts that have one (the Urd settings, «Panel navigation»): the icon rail with the panels as icons in their groups, a panel's folds in a flyout beside its icon headed by its name (PanelTab), or the sidebar with the panels as words under a heading per group, the open panel's folds under its word as a tree, or in a flyout beside each word (Urd settings «Folds in the sidebar»). Both end in the mark and the settings gear. The other layouts reach the panels from the panel's top, a strip under the top bar or the top bar itself (PanelNav, PanelStrip, TopBar). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import SettingsGear from './SettingsGear.svelte';
  import PanelTab from './PanelTab.svelte';
  import { panelFolds, collectionMenuRows } from '../lib/panel-folds.js';
  import { menu } from '../menu/state.svelte.js';
  import { sortEntries } from '$engine/collections.js';
  import { rowMotion } from '../lib/motion.svelte.js';
  const ed = getContext('urd-editor');

  /** A panel's rows in the sidebar's tree: its folds where it has two or more (lib/panel-folds.js), the site's collections under Collections. */
  function treeRows(name) {
    if (name === 'collections') {
      if (ed.collectionsUnavailable) return [];
      return collectionMenuRows(ed.collectionIds, ed.collectionsView, sortEntries).map((c) => ({ id: c.id, label: c.name, collection: true }));
    }
    const folds = panelFolds(name, { site: ed.siteDraft, legal: ed.legal, designs: menu.designsPref });
    return folds.length > 1 ? folds.map((f) => ({ id: f.id, label: ta(f.key), press: f.press === true })) : [];
  }

  /** «Under the word, on a rest»: the word whose folds stand under it, set after a moment once the mouse rests on its word or its folds, or the focus is in them, and taken back a moment after it leaves. */
  let rested = $state(null);
  let restTimer = 0;
  function restOn(name, event) {
    if (event && event.pointerType !== 'mouse') return;
    clearTimeout(restTimer);
    restTimer = setTimeout(() => { rested = name; }, 180);
  }
  function restOff(name, event) {
    if (event && event.pointerType !== 'mouse') return;
    clearTimeout(restTimer);
    restTimer = setTimeout(() => { if (rested === name) rested = null; }, 280);
  }
  $effect(() => () => clearTimeout(restTimer));

  /** Whether a word's folds stand under it: the open panel's always, and in the hover form the word's the mouse rests on as well. */
  const foldsShown = (name) => ed.activePanel === name || (ed.sidebarFolds === 'hover' && rested === name);

  /** A row of the tree: a collection opens in the Collections panel, a fold opens alone in its panel, or its one button is pressed. */
  function pickRow(name, row) {
    if (row.collection) ed.openCollection(row.id);
    else ed.openPanel(name, { fold: row.id, press: row.press });
  }
</script>

{#if ed.adminLayout === 'rail'}
  <nav class="rail rail-icons" class:hidden={!ed.chromeVisible} aria-label={ta('rail.panels')}>
    {#each ed.PANEL_GROUPS as group, gi (gi)}
      {#if gi > 0}<span class="rail-divider" aria-hidden="true"></span>{/if}
      {#each group as name (name)}
        <!-- An icon with folds opens them in a flyout beside it, headed by its name in the tooltip's place -->
        <PanelTab {name} variant="rail" />
      {/each}
    {/each}
    <span class="rail-settings rail-settings-stack">
      <span class="rail-brand" title="Urd">
        <svg class="brand-mark" viewBox="10.3 8.3 19.4 25.4" aria-hidden="true"><path d="M12 32V10l16 6.5V32" fill="none" stroke="var(--urd-brand)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
      <SettingsGear />
    </span>
  </nav>
{:else if ed.adminLayout === 'sidebar'}
  <nav class="rail" class:hidden={!ed.chromeVisible} aria-label={ta('rail.panels')}>
    {#each ed.PANEL_GROUPS as group, gi (gi)}
      <!-- Uppercase label above each group: page tools, site settings
           and system read as three levels. -->
      <span class="rail-group">{ta(ed.PANEL_GROUP_KEYS[gi])}</span>
      {#each group as name (name)}
        {#if ed.sidebarFolds === 'flyout'}
          <!-- «Folds in the sidebar» Beside the word: a word with folds opens them in a flyout beside it -->
          <PanelTab {name} variant="word" />
        {:else}
          {@const rows = treeRows(name)}
          {@const shown = rows.length > 0 && foldsShown(name)}
          <!-- «Folds in the sidebar» Under the word (the default): the open panel's folds stand under its word; on hover: the open panel's stay, and the word the mouse rests on, or the focus is in, opens its own as well -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="side-item" onpointerenter={(e) => ed.sidebarFolds === 'hover' && restOn(name, e)} onpointerleave={(e) => ed.sidebarFolds === 'hover' && restOff(name, e)}
            onfocusin={() => ed.sidebarFolds === 'hover' && restOn(name)} onfocusout={(e) => ed.sidebarFolds === 'hover' && !e.currentTarget.contains(e.relatedTarget) && restOff(name)}>
          <button class:active={ed.activePanel === name} aria-pressed={ed.activePanel === name} aria-expanded={rows.length ? shown : undefined} title={name === 'update' && ed.updateNotice === 'dot' ? ta('tip.updateOut', { version: ed.updateTarget }) : undefined} onclick={() => ed.togglePanel(name)}><span class="side-name">{ed.PANEL_LABELS[name]}</span>{#if name === 'update' && ed.updateNotice === 'dot'}<span class="update-dot update-dot-inline" aria-hidden="true"></span>{/if}{#if name === 'legal' && ed.legal?.dot}<span class="update-dot update-dot-inline legal-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{/if}{#if rows.length}<span class="side-more" class:open={shown} aria-hidden="true">{@html ICONS.chevronRight}</span>{/if}</button>
          {#if shown}
            <div class="side-folds" role="group" aria-label={name === 'collections' ? ed.PANEL_LABELS[name] : ta('tip.panelTab.menu', { panel: ed.PANEL_LABELS[name] })} transition:rowMotion>
              {#each rows as row (row.id)}
                <button type="button" class="side-fold" onclick={() => pickRow(name, row)}>{row.label}</button>
              {/each}
            </div>
          {/if}
          </div>
        {/if}
      {/each}
    {/each}
    <span class="rail-settings">
      <!-- The mark lives at the bottom of the rail by the gear, not in
           the top bar: there it would take the space the discard
           confirmation needs to grow. -->
      <span class="rail-brand" title="Urd">
        <!-- The viewBox is cropped to the glyph's visual box (stroke
             included), so the svg bottom IS the rune's foot and the
             baseline alignment lands. -->
        <svg class="brand-mark" viewBox="10.3 8.3 19.4 25.4" aria-hidden="true"><path d="M12 32V10l16 6.5V32" fill="none" stroke="var(--urd-brand)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <span class="brand-word">Urd</span>
      </span>
      <SettingsGear />
    </span>
  </nav>
{/if}
