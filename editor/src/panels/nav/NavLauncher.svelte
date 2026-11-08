<script>
  /* The launcher's row in the Nav panel's Tools fold: the switch that shows its button, then its design, its sizes, the phone's view and how many shortcuts the phone shows, its title, the button's own mark, and the shortcuts.
     A shortcut is a card in the row kit's card list: closed, its mark, its name and a warning where its target goes nowhere; open, its tile drawn as the menu draws it, which is itself the mark picker, beside its fields. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import MarkPicker from '../../lib/MarkPicker.svelte';
  import LinkField from '../../lib/LinkField.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import CardList from '../../lib/rows/CardList.svelte';
  import { ta } from '$engine/i18n.js';
  import { resolveLink, LAUNCHER_BOUNDS } from '$engine/nav-model.js';
  import { iconSvg, ICON_LIBRARY } from '$engine/icons.js';
  import { ICONS } from '../../lib/icons.js';
  import { SIZE_IDS, clampRange } from '../../lib/nav-size.js';
  import { linkOf, setLinkOn } from '../../lib/link-edit.js';
  import { navActions } from './nav-actions.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { compressOrTrim, imageErrorText, setStatus, siteMutate } = ed;
  const { launcherImages } = navActions(ed);

  // The launcher's three designs, drawn as the panel they give: tiles in three columns, rows with a small mark, or image cards in two columns.
  const viewSvg = (body) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${body}</svg>`;
  const LAUNCHER_VIEW_ICONS = {
    'grid': viewSvg('<rect x="1" y="1" width="46" height="32" rx="3" stroke-opacity="0.35"/><rect x="6" y="6" width="10" height="10" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="19" y="6" width="10" height="10" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="32" y="6" width="10" height="10" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><path d="M7 20h8M20 20h8M33 20h8" stroke-opacity="0.7"/><path d="M6 26h10M19 26h10M32 26h10" stroke-opacity="0.35"/>'),
    'list': viewSvg('<rect x="1" y="1" width="46" height="32" rx="3" stroke-opacity="0.35"/><rect x="6" y="6" width="7" height="7" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="6" y="17" width="7" height="7" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none"/><path d="M17 9.5h24M17 20.5h18" stroke-opacity="0.7"/>'),
    'cover': viewSvg('<rect x="1" y="1" width="46" height="32" rx="3" stroke-opacity="0.35"/><rect x="6" y="6" width="16" height="12" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><rect x="26" y="6" width="16" height="12" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="none"/><path d="M6 14h16M26 14h16" stroke-opacity="0.55" stroke-width="3"/><path d="M6 23h12M26 23h12" stroke-opacity="0.35"/>'),
  };

  /** The launcher's three designs, for the desktop panel and the mobile menu alike. */
  const launcherViewOptions = $derived([
    ['grid', ta('opt.launcherView.grid')],
    ['list', ta('opt.launcherView.list')],
    ['cover', ta('opt.launcherView.cover')],
  ]);

  /** The launcher button's default mark, drawn as the menu draws it. */
  const LAUNCHER_DOTS = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">'
    + [6, 12, 18].flatMap((y) => [6, 12, 18].map((x) => `<circle cx="${x}" cy="${y}" r="1.6"/>`)).join('')
    + '</svg>';

  /** The shortcut whose row stands open, one at a time: the shortcut itself, so its card goes with it as the rows move. */
  let launcherOpen = $state.raw(null);

  /** The picker hands over both fields at once: an image wins, an icon clears it. */
  function setLauncherMark(i, mark) {
    siteMutate('nav', () => {
      siteDraft.nav.launcher ??= { links: [] };
      const row = i === null ? siteDraft.nav.launcher : siteDraft.nav.launcher.links[i];
      if (mark.image) row.image = mark.image;
      else delete row.image;
      if (mark.icon) row.icon = mark.icon;
      else delete row.icon;
    });
  }

  /** A field on the launcher itself; undefined removes it. */
  function setLauncher(key, value) {
    siteMutate(`edit:nav-launcher-${key}`, () => {
      siteDraft.nav.launcher ??= { links: [] };
      if (value === undefined) delete siteDraft.nav.launcher[key];
      else siteDraft.nav.launcher[key] = value;
    });
  }

  /** One of the launcher's own px values, within its bounds; an empty field gives the part back to the size. */
  function setLauncherPx(event, key) {
    const raw = event.target.value;
    setLauncher(key, raw === '' ? undefined : clampRange(raw, LAUNCHER_BOUNDS[key], undefined));
    event.target.value = siteDraft.nav.launcher?.[key] ?? '';
  }

  function addLauncherLink() {
    siteMutate('nav', () => {
      siteDraft.nav.launcher ??= { links: [] };
      siteDraft.nav.launcher.links ??= [];
      siteDraft.nav.launcher.links.push({ label: ta('seed.link'), href: '', icon: 'globe' });
    });
  }

  function removeLauncherLink(i) {
    siteMutate('nav', () => { siteDraft.nav.launcher.links.splice(i, 1); });
  }

  /** Moves a shortcut from one place to another, as the list editor's drag and keys do. */
  function moveLauncherLink(from, to) {
    siteMutate('nav', () => {
      const links = siteDraft.nav.launcher.links;
      links.splice(to, 0, ...links.splice(from, 1));
    });
  }

  function setLauncherLink(i, key, value) {
    siteMutate(`edit:nav-launcher-${key}-${i}`, () => { siteDraft.nav.launcher.links[i][key] = value; });
  }

  /**
   * An own image for the button or for one shortcut (i = null is the button): the same webp flow as the logo, materialized into media/ on publish.
   */
  async function uploadLauncherImage(file, i) {
    if (!file) return;
    try {
      const img = await compressOrTrim(file, 'logo');
      siteMutate('nav', () => {
        siteDraft.nav.launcher ??= { links: [] };
        if (i === null) siteDraft.nav.launcher.image = img.dataUrl;
        else siteDraft.nav.launcher.links[i].image = img.dataUrl;
      });
    } catch (err) {
      setStatus(imageErrorText(err, 'status.imageReadErrorSvg'), 'error');
    }
  }

  /** A shortcut's card: its mark and its name, and a warning where its link leads to a page that is gone. */
  const linkCard = (link) => ({ name: link.label || ta('seed.link'), src: link.image ?? '', icon: link.image ? '' : (iconSvg(link.icon) || ''), warn: resolveLink(link, siteDraft.pages).missing ? ta('tip.badTarget') : '' });

  const toggleLink = (link) => { launcherOpen = launcherOpen === link ? null : link; };
</script>

<SwitchRow label={ta('lbl.showInMenu')} title={ta('tip.nav.launcher')} checked={siteDraft.nav.launcher?.show === true}
  onchange={(on) => setLauncher('show', on ? true : undefined)} />
{#if siteDraft.nav.launcher?.show === true}
  <!-- The design as small drawings of the panel each one gives -->
  <Setting key="view">
    <div class="ctl-field">
      <span class="mini-label">{ta('lbl.design')}</span>
      <div class="tile-grid cols-3" role="group" aria-label={ta('lbl.design')}>
        {#each launcherViewOptions as [v, text] (v)}
          <button type="button" class="tile" class:on={(siteDraft.nav.launcher?.view ?? 'grid') === v}
            aria-pressed={(siteDraft.nav.launcher?.view ?? 'grid') === v}
            onclick={() => setLauncher('view', v === 'grid' ? undefined : v)}>{@html LAUNCHER_VIEW_ICONS[v]}<span>{text}</span></button>
        {/each}
      </div>
    </div>
  </Setting>
  <!-- The size: one choice for the panel, the marks and the names together, then each on its own (empty = follows the size) -->
  <Setting key="size">
    <Choice rows label={ta('lbl.launcherSize')} title={ta('tip.nav.launcherSize')} value={siteDraft.nav.launcher?.size ?? 'md'}
      options={SIZE_IDS.map((id) => [id, ta(`opt.size.${id}`)])}
      onchange={(v) => setLauncher('size', v === 'md' ? undefined : v)} />
  </Setting>
  <div class="ctl-triple">
    {#each [['width', 'lbl.launcherWidth', 'tip.nav.launcherWidth'], ['iconSize', 'lbl.launcherIconSize', 'tip.nav.launcherIconSize'], ['textSize', 'lbl.launcherTextSize', 'tip.nav.launcherTextSize']] as [key, label, tip] (key)}
      <div class="ctl-field" title={ta(tip)}>
        <span class="mini-label">{ta(label)}</span>
        <input type="number" class="tb-num" min={LAUNCHER_BOUNDS[key].min} max={LAUNCHER_BOUNDS[key].max} placeholder={ta('common.auto')}
          value={siteDraft.nav.launcher?.[key] ?? ''}
          onchange={(e) => setLauncherPx(e, key)} />
      </div>
    {/each}
  </div>
  <!-- The mobile menu can carry another design than the desktop panel -->
  <Setting key="mobileView">
    <Choice label={ta('lbl.launcherMobileView')} title={ta('tip.nav.launcherMobileView')}
      value={siteDraft.nav.launcher?.mobileView ?? ''}
      options={[['', ta('lbl.navSameAsDesktop')], ...launcherViewOptions]}
      onchange={(v) => setLauncher('mobileView', v || undefined)} />
  </Setting>
  <Setting key="longNames">
    <Choice label={ta('lbl.launcherLongNames')} title={ta('tip.nav.launcherLongNames')}
      value={siteDraft.nav.launcher?.longNames ?? 'cut'}
      options={[['cut', ta('opt.launcherLongNames.cut')], ['wrap', ta('opt.launcherLongNames.wrap')]]}
      onchange={(v) => setLauncher('longNames', v === 'cut' ? undefined : v)} />
  </Setting>
  <Setting key="mobileMax">
    <SliderRow label={ta('lbl.launcherMobileMax')} title={ta('tip.nav.launcherMobileMax')} value={siteDraft.nav.launcher?.mobileMax ?? 6} min={1} max={24} step={1}
      shown={`${siteDraft.nav.launcher?.mobileMax ?? 6}`} oninput={(v) => setLauncher('mobileMax', v === 6 ? undefined : v)} />
  </Setting>
  <Setting key="showTitle">
    <SwitchRow label={ta('lbl.launcherShowTitle')} title={ta('tip.nav.launcherTitle')} checked={siteDraft.nav.launcher?.showTitle !== false}
      onchange={(on) => setLauncher('showTitle', on ? undefined : false)} />
  </Setting>
  {#if siteDraft.nav.launcher?.showTitle !== false}
    <label class="field-stack" title={ta('tip.nav.launcherTitleText')}>
      <span class="mini-label">{ta('lbl.launcherTitle')}</span>
      <input type="text" class="field-filled" placeholder={ta('ph.launcherTitle')}
        value={siteDraft.nav.launcher?.title ?? ''}
        onchange={(e) => setLauncher('title', e.target.value.trim() || undefined)} />
    </label>
  {/if}
  <!-- The button itself: the same picker as the shortcuts, where no mark at all means the nine drawn dots -->
  <SubHeading text={ta('lbl.launcherButton')} />
  <span class="lbtn-pick">
    <MarkPicker icon={siteDraft.nav.launcher?.icon ?? ''} image={siteDraft.nav.launcher?.image ?? ''}
      images={launcherImages()} klass="lbtn-mark" noneLabel={ta('opt.launcherDots')}
      label={ta('tip.nav.launcherIcon')}
      onpick={(mark) => setLauncherMark(null, mark)} onfile={(file) => uploadLauncherImage(file, null)}>
      {#if siteDraft.nav.launcher?.image}
        <img src={siteDraft.nav.launcher.image} alt="" />
      {:else if siteDraft.nav.launcher?.icon}
        {@html iconSvg(siteDraft.nav.launcher.icon) || ''}
      {:else}
        {@html LAUNCHER_DOTS}
      {/if}
    </MarkPicker>
    <span class="lbtn-name">
      {#if siteDraft.nav.launcher?.image}{ta('mp.ownImage')}
      {:else if siteDraft.nav.launcher?.icon}{ta(ICON_LIBRARY[siteDraft.nav.launcher.icon]?.labelKey ?? 'common.none')}
      {:else}{ta('opt.launcherDots')}{/if}
    </span>
  </span>
  <!-- Cards like the menu's items: closed, a shortcut's mark and name, with a warning where its link leads nowhere; open, its tile as the menu draws it and its fields -->
  <CardList items={siteDraft.nav.launcher?.links ?? []} label={ta('group.launcher')} key={(link) => link} card={linkCard}
    isOpen={(i) => launcherOpen !== null && launcherOpen === siteDraft.nav.launcher?.links?.[i]} ontoggle={(i) => toggleLink(siteDraft.nav.launcher.links[i])}
    onmove={moveLauncherLink} onremove={(i) => removeLauncherLink(i)} removeLabel={ta('tip.removeLink')}>
    {#snippet body(link, i)}
      <div class="lrow-body">
        <!-- The tile as the menu draws it, and the way to change the mark -->
        <MarkPicker icon={link.icon ?? ''} image={link.image ?? ''} images={launcherImages()}
          klass="lrow-tile" label={ta('mp.pickMark')}
          onpick={(mark) => setLauncherMark(i, mark)} onfile={(file) => uploadLauncherImage(file, i)}>
          <span class="lrow-tile-mark">
            {#if link.image}<img src={link.image} alt="" />{:else if link.icon}{@html iconSvg(link.icon) || ''}{/if}
          </span>
          <span class="lrow-tile-name">{link.label || ta('seed.link')}</span>
        </MarkPicker>
        <div class="lrow-fields">
          <input class="field-filled" value={link.label} title={ta('tip.nav.launcherLabel')}
            placeholder={ta('lbl.text')}
            onchange={(e) => setLauncherLink(i, 'label', e.target.value)} />
          <LinkField scope="site" value={linkOf(link)} title={ta('tip.link.field')} removable={false}
            onchange={(next) => siteMutate(`nav-launcher-link-${i}`, () => setLinkOn(siteDraft.nav.launcher.links[i], next))} />
          <span class="lrow-actions">
            <MarkPicker icon={link.icon ?? ''} image={link.image ?? ''} images={launcherImages()}
              klass="linkish" label={ta('mp.pickMark')}
              onpick={(mark) => setLauncherMark(i, mark)} onfile={(file) => uploadLauncherImage(file, i)}>
              {ta('mp.changeMark')}
            </MarkPicker>
          </span>
        </div>
      </div>
    {/snippet}
  </CardList>
  <button type="button" class="ghost action" onclick={() => { addLauncherLink(); launcherOpen = siteDraft.nav.launcher?.links?.at(-1) ?? null; }}>{@html ICONS.plus}{ta('ui.addLauncherLink').replace(/^\+\s*/, '')}</button>
{/if}
