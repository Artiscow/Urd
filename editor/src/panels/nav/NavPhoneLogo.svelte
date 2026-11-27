<script>
  /* The logo on the phone: where it stands in the phone's bar, what of it shows there, and its sizes there, each empty for the desktop's. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import NavLogoPhone from './NavLogoPhone.svelte';
  import { ta } from '$engine/i18n.js';
  import { LOGO_TEXT_SIZE, clampRange } from '../../lib/nav-size.js';
  import { navActions } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { setNavMobile, setNavLogo: setLogo } = navActions(ed);
  /** Whether the part draws its heading: in the Nav panel's fold, not on a fold of its own. */
  let { heading = true } = $props();

  const logo = $derived(siteDraft.nav?.logo ?? {});
  const type = $derived(logo.type ?? 'text');
  const place = $derived(siteDraft.nav.style?.mobile?.logo ?? '');
  const parts = $derived(type === 'both' ? (logo.mobileParts ?? '') : '');
  /** Whether the logo stands anywhere on the phone: in its bar, or in the head of the full-screen menu. */
  const seen = $derived(place !== 'hidden' || (siteDraft.nav.style?.mobileMenu === 'sheet' && siteDraft.nav.style?.sheetLogo === true));
  const picture = $derived(type === 'image' || (type === 'both' && parts !== 'text'));
  const words = $derived(type === 'text' || (type === 'both' && parts !== 'image'));

</script>

{#if heading}<SubHeading text={ta('lbl.navPhoneLogo')} />{/if}
<Setting key="logo">
  <Choice label={ta('lbl.navPhoneLogoPlace')} title={ta('tip.nav.phoneLogoPlace')} value={place}
    options={[['', ta('opt.navPhoneLogo.start')], ['center', ta('opt.navPhoneLogo.center')], ['hidden', ta('opt.navPhoneLogo.hidden')]]}
    onchange={(v) => setNavMobile('logo', v || undefined)} />
</Setting>
{#if seen}
  {#if type === 'both'}
    <Setting key="mobileParts">
      <Choice label={ta('lbl.navPhoneLogoParts')} title={ta('tip.nav.phoneLogoParts')} value={parts}
        options={[['', ta('opt.navPhoneLogoParts.both')], ['image', ta('opt.navPhoneLogoParts.image')], ['text', ta('opt.navPhoneLogoParts.text')]]}
        onchange={(v) => setLogo('mobileParts', v || undefined)} />
    </Setting>
  {/if}
  <div class="ctl-pair">
    {#if picture}<NavLogoPhone label={ta('lbl.navPhoneLogoHeight')} />{/if}
    {#if words}
      <div class="ctl-field" title={ta('tip.nav.phoneLogoText')}>
        <span class="mini-label">{ta('lbl.navPhoneLogoText')}</span>
        <input type="number" class="tb-num" min={LOGO_TEXT_SIZE.min} max={LOGO_TEXT_SIZE.max} placeholder={ta('lbl.navSameAsDesktop')}
          value={logo.mobileTextSize ?? ''}
          onchange={(e) => {
            setLogo('mobileTextSize', e.target.value === '' ? undefined : clampRange(e.target.value, LOGO_TEXT_SIZE, undefined));
            e.target.value = siteDraft.nav.logo?.mobileTextSize ?? '';
          }} />
      </div>
    {/if}
  </div>
{/if}
