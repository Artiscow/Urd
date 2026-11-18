<script>
  /* The logo picture's height on the phone, empty for the desktop's: in the Nav panel's Logo fold beside the other two sizes, and among the logo's settings for the phone (NavPhoneLogo.svelte), the same field in both. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { LOGO_SIZE, clampRange } from '../../lib/nav-size.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  /** The field's name: short beside the logo's other sizes, whole where it stands alone. */
  let { label = ta('lbl.onMobile') } = $props();

  function setMobileSize(raw) {
    ed.siteMutate('edit:nav-logo', () => {
      siteDraft.nav.logo = { type: 'text', value: '', ...siteDraft.nav.logo, mobileSize: raw === '' ? undefined : clampRange(raw, LOGO_SIZE, undefined) };
    });
  }
</script>

<div class="ctl-field" title={ta('tip.nav.logoHeightMobile')}>
  <span class="mini-label">{label}</span>
  <input type="number" class="tb-num" min={LOGO_SIZE.min} max={LOGO_SIZE.max} placeholder={ta('lbl.navSameAsDesktop')}
    value={siteDraft.nav.logo?.mobileSize ?? ''}
    onchange={(e) => {
      setMobileSize(e.target.value);
      e.target.value = siteDraft.nav.logo?.mobileSize ?? '';
    }} />
</div>
