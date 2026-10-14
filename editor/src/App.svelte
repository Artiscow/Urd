<script>
  /**
   * The editor shell (0.7.26.5): the layout, the choice of panel and the
   * startup. The state lives in the modules under state/, each with a
   * handle; the shell merges them into the editor handle every part reads
   * and writes through (setContext 'urd-editor'), runs each module's
   * effects once, and starts the editor when it is mounted.
   */
  import { setContext, onMount } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from './lib/icons.js';
  import Dropdown from './lib/Dropdown.svelte';
  import PagesPanel from './panels/PagesPanel.svelte';
  import NavPanel from './panels/NavPanel.svelte';
  import SitePanel from './panels/SitePanel.svelte';
  import ThemePanel from './panels/ThemePanel.svelte';
  import BlocksPanel from './panels/BlocksPanel.svelte';
  import GridPanel from './panels/GridPanel.svelte';
  import PropertiesPanel from './panels/PropertiesPanel.svelte';
  import FooterPanel from './panels/FooterPanel.svelte';
  import CollectionsPanel from './panels/CollectionsPanel.svelte';
  import PluginsPanel from './panels/PluginsPanel.svelte';
  import HistoryPanel from './panels/HistoryPanel.svelte';
  import UpdatePanel from './panels/UpdatePanel.svelte';
  import IconEditor from './lib/IconEditor.svelte';
  import DesignPicker from './lib/DesignPicker.svelte';
  import { calDesign } from '$engine/calendar-designs.js';
  import ColorPicker from './lib/ColorPicker.svelte';
  import FloatingMenu from './menu/FloatingMenu.svelte';
  import TopBar from './shell/TopBar.svelte';
  import Rail from './shell/Rail.svelte';
  import PreviewStage from './shell/PreviewStage.svelte';
  import ConfirmDialog from './shell/ConfirmDialog.svelte';
  import SetupWizard from './shell/SetupWizard.svelte';
  import { mediaState } from './state/media.svelte.js';
  import { historyState } from './state/history.svelte.js';
  import { previewState } from './state/preview.svelte.js';
  import { shellState } from './state/shell.svelte.js';
  import { siteState } from './state/site.svelte.js';
  import { pageState } from './state/page.svelte.js';
  import { collectionsState } from './state/collections.svelte.js';
  import { templatesState } from './state/templates.svelte.js';
  import { pluginsState } from './state/plugins.svelte.js';
  import { updaterState } from './state/updater.svelte.js';
  import { blocksState } from './state/blocks.svelte.js';
  import { bridgeState } from './state/bridge.svelte.js';
  import { publishState } from './state/publish.svelte.js';

  const parts = [mediaState, historyState, previewState, shellState, siteState, pageState, collectionsState, templatesState, pluginsState, updaterState, blocksState, bridgeState, publishState];
  const ed = {};
  for (const part of parts) Object.defineProperties(ed, Object.getOwnPropertyDescriptors(part));
  /* The handle's own closures: what the element menu and the panels open or read across the modules. */
  Object.assign(ed, {
    blockLabel: (type) => blocksState.BLOCK_LABELS[type] ?? type,
    blockEntranceOptions: () => pageState.BLOCK_ENTRANCE_OPTIONS,
    hoverOptions: () => pageState.HOVER_OPTIONS,
    openPanel: (panel, opts = {}) => {
      if (opts.calendars) siteState.siteCalendarsOpen = true;
      shellState.activePanel = panel;
    },
    openCollection: (id) => {
      collectionsState.activeCollection = id;
      shellState.activePanel = 'collections';
    },
    openDesignPicker: () => {
      pageState.designPicker = { mode: 'set' };
    },
  });
  setContext('urd-editor', ed);
  for (const part of parts) part.effects?.();
  onMount(() => { ed.init(); });
</script>

<svelte:window onkeydown={ed.onKeydown} onpointerdown={ed.onPointerdownWindow} />

<div class="editor">
  {#if !ed.chromeVisible}
    <!-- Clean view: all editor UI is hidden so the page gets the full surface -->
    <button class="chrome-restore" onclick={ed.toggleChrome} title={ta('tip.backToEdit')}>{@html ICONS.pencil} {ta('ui.edit')}</button>
  {/if}

  <TopBar />

  {#if ed.site}
    <div class="workspace">
      <!-- Clean view hides the rail and the panel rather than unmounting them:
           the folds keep their own open state in the DOM, which lives only
           as long as the subtree does. -->
      <Rail />

      {#if ed.activePanel}
        <aside class="panel" class:hidden={!ed.chromeVisible} bind:this={ed.panelEl}>
          <div class="panel-head">
            <h2 title={ed.PANEL_INTROS[ed.activePanel]?.map((k) => ta(k)).join('\n')}>{ed.PANEL_LABELS[ed.activePanel]}</h2>
            {#if ed.panelHasGroups}
              <button type="button" class="fold-all fold-toggle" class:collapse={ed.panelAllOpen}
                title={ta(ed.panelAllOpen ? 'ui.collapseAll' : 'ui.expandAll')}
                aria-label={ta(ed.panelAllOpen ? 'ui.collapseAll' : 'ui.expandAll')}
                onclick={ed.togglePanelGroups}>{@html ICONS.foldToggle}</button>
            {/if}
          </div>

          {#if ed.activePanel === 'pages'}
            <PagesPanel />
          {:else if ed.activePanel === 'nav'}
            <NavPanel />
          {:else if ed.activePanel === 'site'}
            <SitePanel />
          {:else if ed.activePanel === 'theme'}
            <ThemePanel />
          {:else if ed.activePanel === 'blocks'}
            <BlocksPanel />
          {:else if ed.activePanel === 'grid'}
            <GridPanel />
          {:else if ed.activePanel === 'properties'}
            <PropertiesPanel />
          {:else if ed.activePanel === 'footer'}
            <FooterPanel />
          {:else if ed.activePanel === 'collections'}
            <CollectionsPanel />
          {:else if ed.activePanel === 'plugins'}
            <PluginsPanel />
          {:else if ed.activePanel === 'history'}
            <HistoryPanel />
          {:else if ed.activePanel === 'update'}
            <UpdatePanel />
          {/if}
        </aside>
      {/if}

      <PreviewStage />
    </div>
  {:else}
    <p class="loading">{ta('ui.loading')}</p>
  {/if}

  {#if ed.iconEditorImage}
    <IconEditor image={ed.iconEditorImage} onapply={ed.applyIcon} oncancel={() => (ed.iconEditorImage = null)} />
  {/if}
  {#if ed.designPicker}
    <DesignPicker mode={ed.designPicker.mode} current={ed.designPicker.mode === 'set' ? calDesign(ed.selectedBlock?.props.design).id : null}
      site={ed.siteDraft ? $state.snapshot(ed.siteDraft) : null} page={ed.store?.data ? $state.snapshot(ed.store.data) : null}
      onpick={(id) => { if (ed.designPicker.mode === 'add') ed.addCalendarDesign(id); else ed.setCalendarDesign(id); ed.designPicker = null; }}
      onclose={() => (ed.designPicker = null)} />
  {/if}

  <ConfirmDialog />

  <SetupWizard />

  {#if ed.status}
    <div class="toast" class:ok={ed.statusKind === 'ok'} class:error={ed.statusKind === 'error'}>
      <span>{ed.status}</span>
      <button class="toast-x" onclick={() => ed.setStatus('')} title={ta('ui.close')}>×</button>
    </div>
  {/if}
</div>

{#if ed.blockMenu && ed.selectedBlock}
  <FloatingMenu pos={ed.blockMenu} onclose={() => (ed.blockMenu = null)} />
{/if}

