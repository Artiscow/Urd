<script>
  /* The Nav panel's Announcement fold: the strip above the menu, off by default, with its words, its link, how it stays and goes away, its colours and the pages it shows on once it is on. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import { ta } from '$engine/i18n.js';
  import { linkOf, setLinkOn } from '../../lib/link-edit.js';
  import { isSideNav, isFloatingNav } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const bridge = $derived(ed.bridge);
  const { siteMutate, themeSwatches } = ed;

  const sideVariant = $derived(isSideNav(siteDraft?.nav));
  const floatingVariant = $derived(isFloatingNav(siteDraft?.nav));

  /** The announcement bar (nav.announcement): an emptied object is removed. */
  function setNavAnnouncement(key, value) {
    siteMutate(`edit:nav-announce-${key}`, () => {
      const next = { ...(siteDraft.nav.announcement ?? {}) };
      if (value === undefined) delete next[key];
      else next[key] = value;
      if (Object.keys(next).length) siteDraft.nav.announcement = next;
      else delete siteDraft.nav.announcement;
    });
  }
</script>

<SwitchRow label={ta('lbl.announceShow')} title={ta('tip.nav.announce')} checked={siteDraft.nav.announcement?.show === true}
  onchange={(on) => setNavAnnouncement('show', on ? true : undefined)} />
{#if siteDraft.nav.announcement?.show}
  <label class="field-stack" title={ta('tip.nav.announce')}>
    <span class="mini-label">{ta('lbl.text')}</span>
    <input type="text" class="field-filled" value={siteDraft.nav.announcement?.text ?? ''}
      onchange={(e) => setNavAnnouncement('text', e.target.value.trim() || undefined)} />
  </label>
  <!-- The strip's link, set in the link editor -->
  <LinkField scope="site" label={ta('lbl.link')} title={ta('tip.nav.announceLink')} value={linkOf(siteDraft.nav.announcement)}
    onchange={(link) => siteMutate('nav-announce-link', () => {
      const next = { ...(siteDraft.nav.announcement ?? {}) };
      setLinkOn(next, link);
      siteDraft.nav.announcement = next;
    })} />
  <!-- Only where the strip can scroll away: a sticky bar in the flow -->
  {#if siteDraft.nav.sticky !== false && !floatingVariant && !sideVariant && !siteDraft.nav.overlay}
    <Setting key="sticky">
      <SwitchRow label={ta('lbl.announceSticky')} title={ta('tip.nav.announceSticky')} checked={siteDraft.nav.announcement?.sticky !== false}
        onchange={(on) => setNavAnnouncement('sticky', on ? undefined : false)} />
    </Setting>
  {/if}
  <!-- Only where the menu slides out from under the strip -->
  {#if siteDraft.nav.scroll === 'hide' && siteDraft.nav.sticky !== false && !sideVariant && siteDraft.nav.announcement?.sticky !== false}
    <Setting key="followNav">
      <SwitchRow label={ta('lbl.announceFollowNav')} title={ta('tip.nav.announceFollowNav')} checked={siteDraft.nav.announcement?.followNav === true}
        onchange={(on) => setNavAnnouncement('followNav', on ? true : undefined)} />
    </Setting>
  {/if}
  {#if sideVariant}
    <Setting key="place">
      <Choice label={ta('lbl.announcePlace')} title={ta('tip.nav.announcePlace')}
        value={siteDraft.nav.announcement?.place ?? 'nav'}
        options={[['nav', ta('opt.announcePlace.nav')], ['page', ta('opt.announcePlace.page')], ['content', ta('opt.announcePlace.content')]]}
        onchange={(v) => setNavAnnouncement('place', v === 'nav' ? undefined : v)} />
    </Setting>
  {/if}
  <Setting key="dismiss">
    <SwitchRow label={ta('lbl.announceDismiss')} title={ta('tip.nav.announceDismiss')} checked={siteDraft.nav.announcement?.dismiss !== false}
      onchange={(on) => setNavAnnouncement('dismiss', on ? undefined : false)} />
  </Setting>
  <!-- The dismissal is remembered per browser, in the preview as on the published page, so the strip needs a way back while editing. -->
  {#if siteDraft.nav.announcement?.dismiss !== false}
    <button class="ghost" title={ta('tip.nav.announceShowAgain')}
      onclick={() => bridge?.sendAnnounceReset()}>{ta('lbl.announceShowAgain')}</button>
  {/if}
  <Setting key="color">
    <ColourRow label={ta('lbl.background')} title={ta('tip.nav.announceColor')} value={siteDraft.nav.announcement?.color ?? 'accent'} tokens={themeSwatches()}
      onchange={(hex) => setNavAnnouncement('color', hex)} />
  </Setting>
  <Setting key="textColor">
    <ColourRow label={ta('lbl.textColor')} title={ta('tip.nav.announceTextColor')} value={siteDraft.nav.announcement?.textColor ?? 'accent-text'} tokens={themeSwatches()}
      onchange={(hex) => setNavAnnouncement('textColor', hex)} />
  </Setting>
  <SubHeading text={ta('group.showOnPages')} title={ta('tip.nav.announceOnPage')} />
  <!-- Two pages to a row, as the menu's own list -->
  <Setting key="hideOn">
    <div class="page-switches">
      {#each siteDraft.pages ?? [] as pg (pg.id)}
        <SwitchRow label={pg.title || pg.id} title={ta('tip.nav.announceOnPage')} checked={!(siteDraft.nav.announcement?.hideOn ?? []).includes(pg.id)}
          onchange={(on) => ed.toggleAnnouncementOnPage(pg.id, on)} />
      {/each}
    </div>
  </Setting>
{/if}
