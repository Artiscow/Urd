<script>
  /* The Nav panel: the menu items, then the logo, the bar's layout and size, its colours and frame, the phone, scrolling and the pages the menu shows on, the tools and the announcement strip.
     Each is a fold of the row kit its tab's menu reaches (lib/panel-folds.js), with its controls in a part of its own under panels/nav/, saying its value while closed and carrying its reset (panels/nav/nav-actions.js).
     The state the parts read and the functions they write through come from the editor handle. */
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
  <!-- Eight groups by what the owner sets together, in the order a menu is set up: the items, the logo, the bar's layout and size, its colours and frame,
       the phone, scrolling and the pages the menu shows on, the tools beside the burger and the announcement bar. -->
  <Fold id="items" surface={N} title={ta('group.menuItems')} tip={ta('hint.nav.submenu')} value={fold.itemsValue()} group={fold.itemsGroup()}>
    <NavItems />
  </Fold>
  <Fold id="logo" surface={N} title={ta('group.logo')} tip={ta('hint.nav.logoHome')} value={fold.logoValue()} group={fold.logoGroup()}>
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
