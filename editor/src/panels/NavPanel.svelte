<script>
  /* The Nav panel: a fold per part of the menu (lib/panel-folds.js), each with its controls in a part of its own under panels/nav/. */
  import { getContext } from 'svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import NavItems from './nav/NavItems.svelte';
  import NavLogo from './nav/NavLogo.svelte';
  import NavLayout from './nav/NavLayout.svelte';
  import NavColours from './nav/NavColours.svelte';
  import NavMobile from './nav/NavMobile.svelte';
  import NavScroll from './nav/NavScroll.svelte';
  import NavTools from './nav/NavTools.svelte';
  import NavAnnouncement from './nav/NavAnnouncement.svelte';
  import { navFolds } from './nav/nav-actions.js';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  /** Each fold's value while closed and its group of settings to go back from. */
  const fold = navFolds(ed);
  const N = 'nav';
  const siteDraft = $derived(ed.siteDraft);
</script>

<div class="panel-body">
  <!-- Eight groups in the order a menu is set up, from the items to the announcement bar. -->
  <Fold id="items" surface={N} title={ta('group.menuItems')} tip={ta('hint.nav.submenu')} value={fold.itemsValue()} group={fold.itemsGroup()}>
    <NavItems />
  </Fold>
  <!-- The logo: its switch alone while the bar shows none -->
  <Fold id="logo" surface={N} title={ta('group.logo')} tip={ta('hint.nav.logoHome')} value={fold.logoValue()} group={fold.logoGroup()} rows={siteDraft.nav?.logo?.show === false ? 1 : undefined}>
    <NavLogo />
  </Fold>
  <Fold id="layout" surface={N} title={ta('group.navLayoutSize')} value={fold.layoutValue()} group={fold.layoutGroup()}>
    <NavLayout />
  </Fold>
  <Fold id="colours" surface={N} title={ta('group.navColoursFrame')} value={fold.coloursValue()} group={fold.coloursGroup()}>
    <NavColours />
  </Fold>
  <Fold id="mobile" surface={N} title={ta('group.mobile')} tip={ta('tip.nav.mobileSame')} value={fold.mobileValue()} group={fold.mobileGroup()}>
    <NavMobile />
  </Fold>
  <Fold id="scroll" surface={N} title={ta('group.navScrollPages')} value={fold.scrollValue()} group={fold.scrollGroup()}>
    <NavScroll />
  </Fold>
  <!-- The tool cluster: the buttons that stand beside the burger, each switched on beside its own settings -->
  <Fold id="tools" surface={N} title={ta('group.tools')} tip={ta('tip.nav.tools')} value={fold.toolsValue()} group={fold.toolsGroup()}>
    <NavTools />
  </Fold>
  <!-- The announcement: its switch alone until it is on, and a group of what it then holds -->
  <Fold id="announcement" surface={N} title={ta('group.announcement')} tip={ta('tip.nav.announce')} value={fold.announcementValue()} group={fold.announcementGroup()} rows={siteDraft.nav?.announcement?.show ? undefined : 1}>
    <NavAnnouncement />
  </Fold>
</div>
