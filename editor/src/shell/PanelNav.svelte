<script>
  /* The panel's own navigation at its top, in the two tab layouts: a segment for the three groups with the chosen group's panels as a tab row under it («panel-tabs»), or the page's panels alone as tabs, the site's and the system's standing in the top bar's Site menu («page-tabs»). The group the segment shows follows the open panel; while none is open it is the one last picked here, the page's at first and again after the column has been folded. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import PanelTab from './PanelTab.svelte';
  import Choice from '../lib/Choice.svelte';
  const ed = getContext('urd-editor');
  let pickedGroup = $state(0);
  const groupOf = (panel) => Math.max(0, ed.PANEL_GROUPS.findIndex((g) => g.includes(panel)));
  const shownGroup = $derived(ed.activePanel ? groupOf(ed.activePanel) : pickedGroup);
  const tabs = $derived(ed.adminLayout === 'page-tabs' ? ed.PANEL_GROUPS[0] : ed.PANEL_GROUPS[shownGroup]);
</script>

<nav class="panel-nav" aria-label={ta('rail.panels')}>
  <!-- The column folds to a handle at the edge, which opens it again; the fold button ends the first row -->
  {#snippet fold()}
    <button type="button" class="fold-all panel-fold" title={ta('ui.foldPanel')} aria-label={ta('ui.foldPanel')} onclick={() => (ed.panelFolded = true)}>{@html ICONS.foldLeft}</button>
  {/snippet}
  {#if ed.adminLayout === 'panel-tabs'}
    <div class="panel-nav-row">
      <Choice fill label={ta('rail.panels')} value={shownGroup} options={ed.PANEL_GROUP_KEYS.map((key, gi) => [gi, ta(key)])}
        onchange={(gi) => { pickedGroup = gi; if (ed.activePanel && groupOf(ed.activePanel) !== gi) ed.activePanel = null; }}>
        <!-- The update dot stands on the System group's button, and Legal's on the Site group's, while their tabs are out of sight -->
        {#snippet mark(gi)}{#if gi === 2 && shownGroup !== 2 && ed.updateNotice === 'dot'}<span class="update-dot" aria-hidden="true"></span>{/if}{#if gi === 1 && shownGroup !== 1 && ed.legal?.dot}<span class="update-dot legal-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{/if}{/snippet}
      </Choice>
      {@render fold()}
    </div>
  {/if}
  <div class="panel-tabs">
    {#each tabs as name (name)}
      <PanelTab {name} menus={ed.panelTabMenus} />
    {/each}
    {#if ed.adminLayout !== 'panel-tabs'}{@render fold()}{/if}
  </div>
</nav>
