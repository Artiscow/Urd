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
  import CapabilityAdd from './menu/CapabilityAdd.svelte';
  import BlockActions from './menu/BlockActions.svelte';
  import { menu } from './menu/state.svelte.js';
  import Dropdown from './lib/Dropdown.svelte';
  import PagesPanel from './panels/PagesPanel.svelte';
  import NavPanel from './panels/NavPanel.svelte';
  import SitePanel from './panels/SitePanel.svelte';
  import ThemePanel from './panels/ThemePanel.svelte';
  import BlocksPanel from './panels/BlocksPanel.svelte';
  import GridPanel from './panels/GridPanel.svelte';
  import PhonePanel from './panels/PhonePanel.svelte';
  import PropertiesPanel from './panels/PropertiesPanel.svelte';
  import FooterPanel from './panels/FooterPanel.svelte';
  import LegalPanel from './panels/LegalPanel.svelte';
  import CollectionsPanel from './panels/CollectionsPanel.svelte';
  import PluginsPanel from './panels/PluginsPanel.svelte';
  import HistoryPanel from './panels/HistoryPanel.svelte';
  import UpdatePanel from './panels/UpdatePanel.svelte';
  import DesignPicker from './lib/DesignPicker.svelte';
  import { calDesign, calPhoneView, calCardDesign } from '$engine/calendar-designs.js';
  import { calendarDesignSource, blockDesignSource, blockDesigns, footerPresetSource, blockPhoneDesignSource, SAME_DESIGN } from './lib/design-sources.js';
  import ColorPicker from './lib/ColorPicker.svelte';
  import FloatingMenu from './menu/FloatingMenu.svelte';
  import TextToolbar from './lib/TextToolbar.svelte';
  import TopBar from './shell/TopBar.svelte';
  import Rail from './shell/Rail.svelte';
  import CollectionHeading from './panels/collections/CollectionHeading.svelte';
  import PanelNav from './shell/PanelNav.svelte';
  import PanelStrip from './shell/PanelStrip.svelte';
  import PreviewStage from './shell/PreviewStage.svelte';
  import ConfirmDialog from './shell/ConfirmDialog.svelte';
  import PictureEditor from './lib/PictureEditor.svelte';
  import RedirectsDialog from './shell/RedirectsDialog.svelte';
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
  import { linkState } from './state/link.svelte.js';
  import LinkDialog from './lib/LinkDialog.svelte';
  import ShortcutSheet from './lib/ShortcutSheet.svelte';
  import SettingsDialog from './settings/SettingsDialog.svelte';
  import SettingsPanel from './panels/SettingsPanel.svelte';
  import CollectionsTable from './panels/collections/CollectionsTable.svelte';
  import ImportDialog from './panels/collections/ImportDialog.svelte';
  import ImportTable from './panels/collections/ImportTable.svelte';
  import PageSettingsDialog from './panels/pages/PageSettingsDialog.svelte';
  import PageSettingsTable from './panels/pages/PageSettingsTable.svelte';
  import CommandPalette from './lib/CommandPalette.svelte';
  import { paletteState } from './state/palette.svelte.js';
  import { pageSettingsState } from './state/page-settings.svelte.js';
  import { redirectsState } from './state/redirects.svelte.js';
  import { pictureEditorState } from './state/picture-editor.svelte.js';
  import { legalPanelState } from './state/legal.svelte.js';
  import { savedState } from './state/saved.svelte.js';
  import { draftsState } from './state/drafts.svelte.js';
  import DraftsWindow from './shell/DraftsWindow.svelte';
  import { keepScroll } from './lib/scroll-place.js';

  const parts = [mediaState, historyState, previewState, shellState, siteState, pageState, collectionsState, templatesState, pluginsState, updaterState, blocksState, bridgeState, publishState, linkState, pageSettingsState, redirectsState, pictureEditorState, legalPanelState, savedState, draftsState];
  const ed = {};
  for (const part of parts) Object.defineProperties(ed, Object.getOwnPropertyDescriptors(part));
  /** The side panel's place: the docked menu's per block or section, the Collections panel's per open collection, a page's settings per page where the Pages panel steps into them, every other panel's its own. */
  const panelPlace = $derived(ed.activePanel === 'properties' ? (ed.selectedBlock ? `menu:dock:${ed.selectedBlock.blockId}` : ed.activeSectionId ? `menu:dock:section:${ed.activeSectionId}` : null)
    : ed.activePanel === 'collections' ? `panel:collections:${ed.panelCollection ?? ''}`
    : ed.activePanel === 'pages' && ed.pageSettingsPref === 'step' && ed.pageSettingsFor ? `page-settings:step:${ed.pageSettingsFor}`
    : ed.activePanel ? `panel:${ed.activePanel}` : null);
  /* The handle's own closures: what the element menu and the panels open or read across the modules. */
  Object.assign(ed, {
    blockLabel: (type) => blocksState.BLOCK_LABELS[type] ?? type,
    blockEntranceOptions: () => pageState.BLOCK_ENTRANCE_OPTIONS,
    blockHoverOptions: (block) => pageState.blockHoverOptions(block),
    openPanel: (panel, opts = {}) => {
      if (opts.calendars) siteState.siteCalendarsOpen = true;
      // A panel at one of its folds (lib/panel-folds.js): unfolded, brought into view and its heading lit.
      if (opts.fold) shellState.showFold(panel, opts.fold, { press: opts.press === true });
      if (opts.shop) {
        siteState.siteShopOpen = true;
        siteState.focusShopCurrency = true;
      }
      shellState.activePanel = panel;
    },
    openCollection: (id) => {
      collectionsState.activeCollection = id;
      collectionsState.openRequest = { id };
      shellState.activePanel = 'collections';
    },
    openDesignPicker: () => {
      pageState.designPicker = { mode: 'set' };
    },
    openPhonePicker: () => {
      pageState.designPicker = { mode: 'phone' };
    },
    openCardPicker: () => {
      pageState.designPicker = { mode: 'card' };
    },
    /** The design picker for the selected block's designs (block-designs.js), kept to that block. */
    openBlockDesignPicker: () => {
      pageState.designPicker = { kind: 'block', blockId: ed.selectedBlock?.blockId ?? null };
    },
    /** The phone design picker for the selected block (PHONE_DESIGNS in push-model.js): the design it draws while narrow. */
    openBlockPhonePicker: () => {
      pageState.designPicker = { kind: 'block', blockId: ed.selectedBlock?.blockId ?? null, phone: true };
    },
  });
  setContext('urd-editor', ed);
  for (const part of parts) part.effects?.();
  /** The two columns name the open collection in the panel's heading (panels/collections/CollectionHeading.svelte). */
  const collectionHeading = $derived(ed.activePanel === 'collections' && ed.collectionsLayout === 'columns' && ed.collectionIds.includes(ed.panelCollection) && ed.csvImport?.view !== 'panel');
  onMount(() => { ed.init(); });
</script>

<svelte:window onkeydown={ed.onKeydown} onpointerdown={ed.onPointerdownWindow} />

<div class="editor" data-layout={ed.adminLayout}>
  {#if !ed.chromeVisible}
    <!-- Clean view: all editor UI is hidden so the page gets the full surface -->
    <button class="chrome-restore" onclick={ed.toggleChrome} title={ta('tip.backToEdit')}>{@html ICONS.pencil} {ta('ui.edit')}</button>
  {/if}

  <TopBar />

  {#if ed.site}
    {#if ed.adminLayout === 'top-tabs'}<PanelStrip />{/if}
    <div class="workspace">
      <!-- Clean view hides the rail and the panel rather than unmounting them:
           the folds keep their own open state in the DOM, which lives only
           as long as the subtree does. -->
      <Rail />

      <!-- The tab layouts keep the panel's column standing with its tabs while no panel is open, or folded to a handle at the edge -->
      {#if (ed.adminLayout === 'panel-tabs' || ed.adminLayout === 'page-tabs') && (ed.panelFolded || (ed.adminLayout === 'page-tabs' && !ed.activePanel))}
        <button type="button" class="panel-handle" class:hidden={!ed.chromeVisible} title={ta('ui.openPanel')} aria-label={ta('ui.openPanel')} onclick={() => ed.unfoldPanel()}>{@html ICONS.foldRight}</button>
      {:else if ed.activePanel || ed.adminLayout === 'panel-tabs' || ed.adminLayout === 'page-tabs'}
        <!-- The two-column collections editor widens the panel while a collection is open in it -->
        <!-- The panel opens where it was left: each panel, each block's and section's docked menu, and each collection in the Collections panel (lib/scroll-place.js) -->
        <aside class="panel" class:hidden={!ed.chromeVisible} inert={Boolean(ed.looking)} bind:this={ed.panelEl} {@attach keepScroll(panelPlace)}
          class:panel-wide={ed.activePanel === 'collections' && ed.collectionsLayout === 'columns' && ed.panelCollection && ed.collectionIds.includes(ed.panelCollection)}
          class:panel-still={collectionHeading}>
          {#if ed.adminLayout === 'panel-tabs' || ed.adminLayout === 'page-tabs'}<PanelNav />{/if}
          {#if ed.activePanel}
          <div class="panel-head">
            {#if collectionHeading}
              <!-- The two columns name the open collection in the heading's place, with its menu beside the name -->
              <CollectionHeading />
            {:else}
              <h2 title={ed.PANEL_INTROS[ed.activePanel]?.map((k) => ta(k)).join('\n')}>{ed.PANEL_LABELS[ed.activePanel]}</h2>
            {/if}
            <span class="panel-head-tools">
              <!-- The docked menu's actions for the selected block and its way to add a capability to it (ADR-0031), as in the floating menu's head -->
              {#if ed.activePanel === 'properties' && ed.selectedBlock}<BlockActions />{/if}
              {#if ed.activePanel === 'properties' && ed.selectedBlock && !menu.propsQuery.trim()}<CapabilityAdd />{/if}
              {#if ed.panelHasGroups}
                <button type="button" class="fold-all fold-toggle" class:collapse={ed.panelAllOpen}
                  title={ta(ed.panelAllOpen ? 'ui.collapseAll' : 'ui.expandAll')}
                  aria-label={ta(ed.panelAllOpen ? 'ui.collapseAll' : 'ui.expandAll')}
                  onclick={ed.togglePanelGroups}>{@html ICONS.foldToggle}</button>
              {/if}
              <!-- The rail folds the panel away; the other layouts close it from the tab or the word that opened it -->
              {#if ed.adminLayout === 'rail'}
                <button type="button" class="fold-all panel-fold" title={ta('ui.foldPanel')} aria-label={ta('ui.foldPanel')} onclick={() => (ed.activePanel = null)}>{@html ICONS.foldLeft}</button>
              {/if}
            </span>
          </div>

          {#if ed.activePanel === 'pages'}
            <PagesPanel />
          {:else if ed.activePanel === 'nav'}
            <NavPanel />
          {:else if ed.activePanel === 'site'}
            <SitePanel />
          {:else if ed.activePanel === 'legal'}
            <LegalPanel />
          {:else if ed.activePanel === 'theme'}
            <ThemePanel />
          {:else if ed.activePanel === 'blocks'}
            <BlocksPanel />
          {:else if ed.activePanel === 'grid'}
            <GridPanel />
          {:else if ed.activePanel === 'phone'}
            <PhonePanel />
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
          {:else if ed.activePanel === 'settings'}
            <SettingsPanel />
          {/if}
        {/if}
        </aside>
      {/if}

      <!-- The stage, with the collections table standing over it while a collection is open in that layout, and a CSV import's table over both while it waits; the preview stays mounted underneath -->
      <div class="stage-area">
        <PreviewStage />
        {#if ed.csvImport?.view === 'table' && ed.chromeVisible}
          <ImportTable />
        {:else if ed.pageSettingsFor && ed.pageSettingsPref === 'table' && ed.chromeVisible}
          <PageSettingsTable />
        {:else if ed.activePanel === 'collections' && ed.collectionsLayout === 'table' && ed.panelCollection && ed.collectionIds.includes(ed.panelCollection) && ed.chromeVisible
          && !((ed.adminLayout === 'panel-tabs' || ed.adminLayout === 'page-tabs') && ed.panelFolded)}
          <CollectionsTable />
        {/if}
      </div>
    </div>
  {:else}
    <p class="loading">{ta('ui.loading')}</p>
  {/if}

  {#if ed.designPicker?.kind === 'block'}
    <!-- A block's designs, a core block's or a plugin block's: the picked one is written to the prop the block keeps its design in; a block that is gone takes the picker with it -->
    {@const storedSection = ed.selectedBlock && ed.store?.data.sections.find((sec) => sec.id === ed.selectedBlock.sectionId)}
    {@const stored = storedSection?.blocks.find((blk) => blk.id === ed.selectedBlock.blockId)}
    {@const designs = ed.selectedBlock ? blockDesigns(ed.selectedBlock.type, ed.pluginBlocks) : null}
    {#if stored && designs}
      <!-- The phone form chooses the design the block draws while narrow (phoneDesign), the first entry keeping its own -->
      {@const phone = ed.designPicker.phone === true && designs.phone}
      <DesignPicker source={phone
          ? blockPhoneDesignSource({ block: $state.snapshot(stored), site: ed.siteDraft ? $state.snapshot(ed.siteDraft) : null, designs })
          : blockDesignSource({ block: $state.snapshot(stored), site: ed.siteDraft ? $state.snapshot(ed.siteDraft) : null, designs, sectionWidth: storedSection.size?.maxWidth })}
        site={ed.siteDraft ? $state.snapshot(ed.siteDraft) : null} page={ed.store?.data ? $state.snapshot(ed.store.data) : null}
        plugins={$state.snapshot(ed.pluginsView)?.enabled ?? []} collections={$state.snapshot(ed.collectionsView) ?? null}
        place={`block:${ed.selectedBlock.type}${phone ? ':phone' : ''}`}
        onpick={(id) => { if (phone) ed.setBlockProp('phoneDesign', id === SAME_DESIGN ? null : id); else ed.setBlockProp(designs.prop, id); ed.designPicker = null; }}
        onclose={() => (ed.designPicker = null)} />
    {/if}
  {:else if ed.designPicker?.kind === 'footer'}
    <!-- The footer's presets: the picked one sets the footer's look and parts, its own content kept (footer-presets.js) -->
    <DesignPicker source={footerPresetSource({ site: ed.siteDraft ? $state.snapshot(ed.siteDraft) : null })}
      site={ed.siteDraft ? $state.snapshot(ed.siteDraft) : null} page={ed.store?.data ? $state.snapshot(ed.store.data) : null}
      plugins={$state.snapshot(ed.pluginsView)?.enabled ?? []} collections={$state.snapshot(ed.collectionsView) ?? null}
      place="footer"
      onpick={(id) => { ed.applyFooterPreset(id); ed.designPicker = null; }}
      onclose={() => (ed.designPicker = null)} />
  {:else if ed.designPicker && ed.designPicker.kind !== 'block'}
    <DesignPicker source={calendarDesignSource({ mode: ed.designPicker.mode,
      current: ed.designPicker.mode === 'set' ? calDesign(ed.selectedBlock?.props.design).id : ed.designPicker.mode === 'phone' ? calPhoneView(ed.selectedBlock?.props) : ed.designPicker.mode === 'card' ? calCardDesign(ed.selectedBlock?.props) : null,
      design: calDesign(ed.selectedBlock?.props.design).id, props: ed.selectedBlock ? $state.snapshot(ed.selectedBlock.props) : {} })}
      site={ed.siteDraft ? $state.snapshot(ed.siteDraft) : null} page={ed.store?.data ? $state.snapshot(ed.store.data) : null}
      place={`calendar:${ed.designPicker.mode ?? 'set'}`}
      onpick={(id) => { if (ed.designPicker.mode === 'add') ed.addCalendarDesign(id, ed.designPicker.place); else if (ed.designPicker.mode === 'phone') ed.setCalendarPhoneView(id); else if (ed.designPicker.mode === 'card') ed.setCalendarCard(id); else ed.setCalendarDesign(id); ed.designPicker = null; }}
      onclose={() => (ed.designPicker = null)} />
  {/if}

  {#if ed.linkRequest}
    <!-- One link editor for every link: the request says how the host keeps the link and what applies it, and a new request draws a new dialog -->
    {#key ed.linkRequest}
      <LinkDialog request={ed.linkRequest} onclose={ed.closeLink} />
    {/key}
  {/if}

  {#if ed.pageSettingsFor && ed.pageSettingsPref === 'dialog'}
    <!-- A page's settings over the admin, in the default layout -->
    <PageSettingsDialog />
  {/if}

  {#if ed.csvImport?.view === 'dialog'}
    <!-- A CSV import waiting for the owner's word, in the default preview -->
    <ImportDialog />
  {/if}

  {#if ed.settingsOpen}
    <!-- Urd's own settings over the admin, as a dialog or a sheet by «Settings window»; the panel form stands in the panel column -->
    <SettingsDialog onclose={() => (ed.settingsOpen = false)} />
  {/if}

  {#if ed.shortcutsOpen}
    <ShortcutSheet onclose={() => (ed.shortcutsOpen = false)} />
  {/if}

  {#if paletteState.paletteOpen}
    <!-- The command palette: built from the states as it opens, so the list reads the page, the panels and the draft as they stand -->
    <CommandPalette commands={paletteState.buildCommands()} pinned={ed.siteDraft?.shortcuts ?? []} onpin={ed.siteDraft ? ed.toggleShortcut : null} onclose={() => (paletteState.paletteOpen = false)} />
  {/if}

  <RedirectsDialog />
  <PictureEditor />
  <ConfirmDialog />

  <SetupWizard />

  {#if ed.status}
    <div class="toast" class:ok={ed.statusKind === 'ok'} class:error={ed.statusKind === 'error'}>
      <span>{ed.status}</span>
      {#if ed.statusAction}
        <!-- The one action the status offers, such as «Undo» after a delete of several entries -->
        <button type="button" class="toast-act" onclick={() => { const run = ed.statusAction.run; ed.setStatus(''); run(); }}>{ed.statusAction.label}</button>
      {/if}
      <button class="toast-x" onclick={() => ed.setStatus('')} title={ta('ui.close')}>{@html ICONS.cross}</button>
    </div>
  {/if}
</div>

{#if ed.blockMenu && (ed.selectedBlock || (ed.blockMenu.section && ed.activeSectionId))}
  <FloatingMenu pos={ed.blockMenu} />
{/if}
<!-- The text bar: the tools of a text written on the canvas, over the stage -->
<TextToolbar />

{#if ed.site && ed.chromeVisible}
  <!-- The Drafts window over the canvas, or its pill, opened from the Drafts tab (state/drafts.svelte.js) -->
  <DraftsWindow />
{/if}

