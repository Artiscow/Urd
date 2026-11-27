<script>
  /* The Phone panel: what is set for the phone, for the whole site and for the section at work, each setting also in its own panel or menu. */
  import { getContext, onMount, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { sectionWords } from '$engine/anchor-model.js';
  import { MOBILE_GAP, MOBILE_ROOM, mobileGapOf } from '$engine/migrate.js';
  import { ICONS } from '../lib/icons.js';
  import PhoneSectionRows from '../section/PhoneSectionRows.svelte';
  import PhoneOrder from './phone/PhoneOrder.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import EmptyState from '../lib/rows/EmptyState.svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import NavMobile from './nav/NavMobile.svelte';
  import NavLauncherPhone from './nav/NavLauncherPhone.svelte';
  import SitePhoneGap from './site/SitePhoneGap.svelte';
  import { navFolds } from './nav/nav-actions.js';
  import { siteGroup } from '../lib/site-groups.js';
  const ed = getContext('urd-editor');
  /** The Nav panel's fold of the menu on the phone: its value while closed and its group of settings to go back from. */
  const navFold = navFolds(ed);
  /** The space between blocks on the phone for every section, with its way back to the standard, as the Site panel's width fold holds it. */
  const gapGroup = () => siteGroup(() => ed.siteDraft.layout, (name, change) => ed.siteMutate(name, () => {
    change();
    if (ed.siteDraft.layout && !Object.keys(ed.siteDraft.layout).length) delete ed.siteDraft.layout;
  }), 'site-phone-gap', { mobileGap: MOBILE_GAP });

  /** The open page's sections, read again after every change, every undo and every page loaded, since the page's data is no state of its own. */
  const sections = $derived.by(() => {
    void ed.pageId;
    void ed.edits;
    void ed.restores;
    return ed.sections.slice();
  });
  /** The section at work, a new copy each time, so what is reckoned from it follows. */
  const section = $derived.by(() => {
    const found = sections.find((s) => s.id === ed.activeSectionId);
    return found ? { ...found, blocks: found.blocks.slice() } : null;
  });
  const sectionOptions = $derived(sections.map((s, i) => {
    const words = sectionWords(s);
    return [s.id, words ? `${ta('diff.section', { n: i + 1 })}: ${words}` : ta('diff.section', { n: i + 1 })];
  }));
  /** The space fold's value while closed: the space between the section's blocks on the phone, its room, and whether text may shrink. */
  const spaceValue = $derived.by(() => {
    const gap = `${mobileGapOf({ size: { mobileGap: ed.sectionMobileGap ?? undefined } }, ed.siteDraft)} px`;
    // The room above and below shows only where the section has its own.
    const room = ed.sectionPhoneRoom.top !== null || ed.sectionPhoneRoom.bottom !== null ? ` · ${ta('phone.roomValue', { top: ed.sectionPhoneRoom.top ?? MOBILE_ROOM, bottom: ed.sectionPhoneRoom.bottom ?? MOBILE_ROOM })}` : '';
    if (room) return ed.sectionReadable.phone ? `${gap}${room}` : `${gap}${room} · ${ta('phone.readableOff')}`;
    return ed.sectionReadable.phone ? gap : `${gap} · ${ta('phone.readableOff')}`;
  });

  /** The section at work, and the canvas showing it: a pick here makes it the canvas's chosen section and brings it into view. */
  function pickSection(id, reveal = true) {
    ed.onSelectSection({ sectionId: id });
    ed.bridge?.sendActiveSection(id);
    if (reveal) ed.bridge?.sendScrollSection(id);
  }

  /** The topmost section on the canvas showing at least half of itself, or half the canvas where it is taller. */
  function sectionInView() {
    try {
      const win = ed.iframeEl?.contentWindow;
      const hosts = [...(win?.document.querySelectorAll('.urd-section[data-section-id]') ?? [])];
      const high = win.innerHeight;
      const host = hosts.find((h) => {
        const r = h.getBoundingClientRect();
        return Math.min(r.bottom, high) - Math.max(r.top, 0) >= Math.min(r.height, high) / 2;
      });
      return host?.dataset.sectionId ?? null;
    } catch {
      return null;
    }
  }

  // Where no section is at work, the one in view stands in the panel, else the first.
  $effect(() => {
    if (section || !sections.length) return;
    const ids = sections.map((s) => s.id);
    untrack(() => {
      const seen = sectionInView();
      pickSection(ids.includes(seen) ? seen : ids[0], false);
    });
  });

  // The panel shows the phone as the owner opens it; one the admin starts with leaves the view it came back to.
  onMount(() => {
    if (!ed.openedAtStart('phone') && ed.viewMode !== 'mobile') ed.deviceId = 'mobile';
  });
</script>

<div class="panel-body">
  {#if !sections.length}
    <EmptyState text={ta('phone.noSection')} />
  {:else if section}
    <!-- The section at work, and its settings one press away, as the gear on its bar opens them -->
    <div class="pp-section">
      {#if sections.length > 1}
        <SelectRow label={ta('lbl.section')} value={section.id} options={sectionOptions} onchange={(id) => pickSection(id)} />
      {:else}
        <span class="pp-section-name">{sectionOptions[0]?.[1] ?? ''}</span>
      {/if}
      <!-- The gear opens the section's menu and closes it at a second press, as the gear on the section's bar does -->
      <span class="pp-gear" data-opens-menu><IconButton icon={ICONS.gear} label={ta('phone.sectionSettings')} onclick={() => ed.bridge?.sendSectionSettings(section.id)} /></span>
    </div>
    {#if ed.phonePanelPref === 'top'}
      <SubHeading text={ta('lbl.phoneBlocks')} />
      <PhoneOrder />
    {/if}
  {/if}

  <!-- The phone settings of the Nav and Site panels, drawn by the same rows as there -->
  <SubHeading text={ta('phone.wholeSite')} />
  <Fold id="nav-phone-bar" surface="phone" title={ta('phone.navBar')} tip={ta('tip.nav.mobileSame')} value={navFold.phoneBarValue()} group={navFold.phoneBarGroup()}>
    <NavMobile part="bar" />
  </Fold>
  {#if ed.siteDraft.nav?.logo?.show !== false}
    <Fold id="nav-phone-logo" surface="phone" title={ta('lbl.navPhoneLogo')} value={navFold.phoneLogoValue()} group={navFold.phoneLogoGroup()}>
      <NavMobile part="logo" />
    </Fold>
  {/if}
  <Fold id="nav-phone" surface="phone" title={ta('phone.navGroup')} value={navFold.mobileValue()} group={navFold.phoneMenuGroup({ launcher: true })}>
    <NavMobile part="menu" />
    {#if ed.siteDraft.nav?.launcher?.show === true}
      <NavLauncherPhone />
    {/if}
  </Fold>
  <Fold id="site-phone" surface="phone" title={ta('phone.siteGap')} value={`${mobileGapOf(null, ed.siteDraft)} px`} group={gapGroup()}>
    <SitePhoneGap />
  </Fold>

  {#if section}
    <!-- The section's own settings for the phone, one part per fold, the order's fold right above the list it sorts -->
    <SubHeading text={ta('phone.thisSection')} />
    <Fold id="section-space" surface="phone" title={ta('phone.spaceText')} value={spaceValue}>
      <PhoneSectionRows part="space" />
    </Fold>
    <Fold id="section-layout" surface="phone" title={ta('lbl.phoneLayout')} tip={ta('tip.phoneLayout')}>
      <PhoneSectionRows part="layout" />
    </Fold>
    <Fold id="section-order" surface="phone" title={ta('lbl.phoneOrder')} tip={ta('tip.phoneOrder')} value={ta(`opt.phoneOrder.${ed.sectionPhoneOrder}`)}>
      <PhoneSectionRows part="order" />
    </Fold>
    {#if ed.phonePanelPref === 'fold'}
      <Fold id="order" surface="phone" title={ta('lbl.phoneBlocks')} value={ta('phone.blocks', { n: section.blocks.length })} defaultOpen>
        <PhoneOrder />
      </Fold>
    {/if}
  {/if}
</div>

<style>
  /* The section at work beside its settings' gear, the gear level with the field */
  .pp-section {
    display: flex;
    align-items: flex-end;
    gap: 6px;
  }

  .pp-section > :global(.row-select) {
    flex: 1;
    min-width: 0;
  }

  .pp-gear {
    display: flex;
  }

  .pp-section-name {
    flex: 1;
    min-width: 0;
    align-self: center;
    font-size: 0.85rem;
    font-weight: 600;
  }
</style>
