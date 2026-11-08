<script>
  /* The Nav panel's Tools fold: where the buttons beside the burger stand (the end or the start of the bar; in the column the bottom or the top, with its own alignment), then each tool in the cluster's order: the theme button, the site's links, the cart and the launcher, each switched on beside its own settings.
     The tools are cards in the row kit's card list, in the cluster's order, and a card dragged to a new place moves its tool in the menu. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import CardList from '../../lib/rows/CardList.svelte';
  import PanelLinkRow from '../../lib/rows/PanelLinkRow.svelte';
  import NavLauncher from './NavLauncher.svelte';
  import { ta } from '$engine/i18n.js';
  import { toolOrder, TOOL_IDS } from '$engine/nav-model.js';
  import { linkOf, setLinkOn } from '../../lib/link-edit.js';
  import { navActions, isSideNav } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { siteMutate } = ed;
  const { toolShown } = navActions(ed);

  const sideVariant = $derived(isSideNav(siteDraft?.nav));

  /** The tools with a row, in the cluster's order. */
  const shownTools = $derived(toolOrder(siteDraft?.nav?.style ?? {}).filter(toolShown));

  /** Each tool's name, on its card's head. */
  const TOOL_NAMES = { theme: 'lbl.themeToggle', links: 'lbl.navToolLinks', cart: 'lbl.cart', launcher: 'group.launcher' };

  /** Whether a tool stands in the menu, for its card's head. */
  const toolOn = (id) => (id === 'theme' ? siteDraft.nav.style?.tools?.theme !== false
    : id === 'links' ? siteDraft.nav.style?.tools?.links === true
    : id === 'cart' ? siteDraft.nav.cart?.show === true
    : siteDraft.nav.launcher?.show === true);

  /** The tool whose card stands open; one at a time. */
  let openTool = $state(null);

  function setNavTools(key, value) {
    siteMutate(`edit:nav-tools-${key}`, () => {
      siteDraft.nav.style ??= {};
      const next = { ...(siteDraft.nav.style.tools ?? {}) };
      if (value === undefined) delete next[key];
      else next[key] = value;
      if (Object.keys(next).length) siteDraft.nav.style.tools = next;
      else delete siteDraft.nav.style.tools;
    });
  }

  /** The cluster's order (nav.style.tools.order) is stored whole, and only where it differs from the default: a card moves among the tools with a card, and a tool without one keeps its place. */
  function moveTool(from, to) {
    const order = toolOrder(siteDraft.nav.style ?? {});
    const shown = order.filter(toolShown);
    shown.splice(to, 0, ...shown.splice(from, 1));
    let next = 0;
    const moved = order.map((id) => (toolShown(id) ? shown[next++] : id));
    setNavTools('order', moved.join() === TOOL_IDS.join() ? undefined : moved);
  }
</script>

{#if sideVariant}
  <Setting key="side">
    <Choice label={ta('lbl.toolsSide')} title={ta('tip.nav.toolsSideColumn')} value={siteDraft.nav.style?.tools?.side ?? 'end'}
      options={[['start', ta('opt.toolsSide.top')], ['end', ta('opt.toolsSide.bottom')]]}
      onchange={(v) => setNavTools('side', v === 'start' ? 'start' : undefined)} />
  </Setting>
  <Setting key="align">
    <Choice label={ta('lbl.toolsAlign')} title={ta('tip.nav.toolsAlign')} value={siteDraft.nav.style?.tools?.align ?? 'center'}
      options={[['start', ta('opt.toolsAlign.start')], ['center', ta('opt.toolsAlign.center')], ['end', ta('opt.toolsAlign.end')], ['spread', ta('opt.toolsAlign.spread')]]}
      onchange={(v) => setNavTools('align', v === 'center' ? undefined : v)} />
  </Setting>
{:else}
  <Setting key="side">
    <Choice label={ta('lbl.toolsSide')} title={ta('tip.nav.toolsSide')} value={siteDraft.nav.style?.tools?.side ?? 'end'}
      options={[['start', ta('opt.toolsSide.start')], ['end', ta('opt.toolsSide.end')]]}
      onchange={(v) => setNavTools('side', v === 'start' ? 'start' : undefined)} />
  </Setting>
{/if}
<!-- The tools as cards in the cluster's order: closed, a tool's name and whether it stands in the menu; open, its settings -->
<CardList items={shownTools} label={ta('group.tools')} key={(id) => id} card={(id) => ({ name: ta(TOOL_NAMES[id]), detail: toolOn(id) ? ta('common.on') : ta('common.off') })}
  isOpen={(i) => openTool === shownTools[i]} ontoggle={(i) => (openTool = openTool === shownTools[i] ? null : shownTools[i])} onmove={moveTool}>
  {#snippet body(id)}
    <div class="nav-tool">
      {#if id === 'theme'}
        <Setting key="theme">
          <SwitchRow label={ta('lbl.showInMenu')} title={ta('tip.nav.themeToggle')} checked={siteDraft.nav.style?.tools?.theme !== false}
            onchange={(on) => setNavTools('theme', on ? undefined : false)} />
        </Setting>
      {:else if id === 'links'}
        <Setting key="links">
          <SwitchRow label={ta('lbl.showInMenu')} title={ta('tip.nav.toolLinks')} checked={siteDraft.nav.style?.tools?.links === true}
            onchange={(on) => setNavTools('links', on ? true : undefined)} />
        </Setting>
        <PanelLinkRow label={ta('group.siteLinks')} to={ta('panel.site')} title={ta('ui.editSiteLinks')} onclick={() => { ed.siteLinksOpen = true; ed.openPanel('site'); }} />
      {:else if id === 'cart'}
        <SwitchRow label={ta('lbl.showInMenu')} title={ta('tip.nav.cart')} checked={siteDraft.nav.cart?.show === true}
          onchange={(on) => siteMutate('nav', () => {
            if (on) siteDraft.nav.cart = { ...(siteDraft.nav.cart ?? {}), show: true };
            else delete siteDraft.nav.cart;
          })} />
        {#if siteDraft.nav.cart?.show}
          <LinkField scope="site" label={ta('lbl.checkoutPage')} title={ta('tip.cart.checkout')} pagesOnly value={linkOf(siteDraft.nav.cart)}
            onchange={(link) => siteMutate('nav', () => setLinkOn(siteDraft.nav.cart, link))} />
          <label class="field-stack" title={ta('tip.product.currency')}>{ta('lbl.currency')}
            <input value={siteDraft.nav.cart.currency ?? 'kr'}
              onchange={(e) => siteMutate('nav', () => { siteDraft.nav.cart.currency = e.target.value.trim() || 'kr'; })} /></label>
        {/if}
      {:else}
        <NavLauncher />
      {/if}
    </div>
  {/snippet}
</CardList>

<style>
  /* A tool's heading, its switch and its settings under each other, as the rows of a fold stand */
  .nav-tool {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.4rem;
  }
</style>
