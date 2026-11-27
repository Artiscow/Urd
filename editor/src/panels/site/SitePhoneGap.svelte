<script>
  /* The space between a section's blocks on the phone, for every section without its own: the same row in the Site panel and the Phone panel. */
  import { getContext } from 'svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { MOBILE_GAP, MOBILE_GAP_MAX, mobileGapOf } from '$engine/migrate.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);

  /** The standard is stored as no field; the layout keeps the content width and the gutter it stands at. */
  function setMobileGap(v) {
    ed.siteMutate('edit:site-mobile-gap', () => {
      const next = { ...(siteDraft.layout ?? {}), contentWidth: ed.layoutWidth, gutter: ed.layoutGutter, mobileGap: v === MOBILE_GAP ? undefined : v };
      for (const k of Object.keys(next)) if (next[k] === undefined) delete next[k];
      siteDraft.layout = next;
    });
  }
</script>

<Setting key="mobileGap">
  <SliderRow label={ta('lbl.mobileGap')} title={ta('tip.site.mobileGap')} value={mobileGapOf(null, siteDraft)} min={0} max={MOBILE_GAP_MAX} step={4}
    shown={`${mobileGapOf(null, siteDraft)} px`} oninput={(v) => setMobileGap(v)} />
</Setting>
