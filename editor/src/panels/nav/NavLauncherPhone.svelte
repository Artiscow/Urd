<script>
  /* The launcher's settings for the phone: the design the menu on the phone gives it, and how many shortcuts it shows there; in the Nav panel's Tools fold under the launcher's sizes, and in the Phone panel's fold of the menu on the phone (0.7.3.24), the same rows in both. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import { ta } from '$engine/i18n.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);

  /** The launcher's three designs, as the desktop panel offers them. */
  const viewOptions = $derived([
    ['grid', ta('opt.launcherView.grid')],
    ['list', ta('opt.launcherView.list')],
    ['cover', ta('opt.launcherView.cover')],
  ]);

  /** A field on the launcher itself; undefined removes it. */
  function setLauncher(key, value) {
    ed.siteMutate(`edit:nav-launcher-${key}`, () => {
      siteDraft.nav.launcher ??= { links: [] };
      if (value === undefined) delete siteDraft.nav.launcher[key];
      else siteDraft.nav.launcher[key] = value;
    });
  }
</script>

<!-- The menu on the phone can carry another design than the desktop panel -->
<Setting key="mobileView">
  <Choice label={ta('lbl.launcherMobileView')} title={ta('tip.nav.launcherMobileView')}
    value={siteDraft.nav.launcher?.mobileView ?? ''}
    options={[['', ta('lbl.navSameAsDesktop')], ...viewOptions]}
    onchange={(v) => setLauncher('mobileView', v || undefined)} />
</Setting>
<Setting key="mobileMax">
  <SliderRow label={ta('lbl.launcherMobileMax')} title={ta('tip.nav.launcherMobileMax')} value={siteDraft.nav.launcher?.mobileMax ?? 6} min={1} max={24} step={1}
    shown={`${siteDraft.nav.launcher?.mobileMax ?? 6}`} oninput={(v) => setLauncher('mobileMax', v === 6 ? undefined : v)} />
</Setting>
