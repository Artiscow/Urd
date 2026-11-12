<script>
  /* The top bar: the page name, the view, device and zoom clusters with their fold steps, and on the right the tools and Publish with its menu: the publishing acts, what waits to be published, and the last publish. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle. */
  import PanelTab from './PanelTab.svelte';
  import { menuMotion } from '../lib/motion.svelte.js';
  import { getContext } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import UnpublishedRows from '../lib/UnpublishedRows.svelte';
  import { timeAgo } from '../lib/time-ago.js';
  import SettingsGear from './SettingsGear.svelte';
  import PageSwitcher from './PageSwitcher.svelte';
  import UndoButtons from './UndoButtons.svelte';
  import { PHONE_FILL_WIDTH, PHONE_WIDTH_MIN, PHONE_WIDTH_MAX, PHONE_HEIGHT_MIN, PHONE_HEIGHT_MAX } from '../lib/preview-width.js';
  import { SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX } from '../lib/own-screen.js';
  import { SCREEN_RATIOS, PHONE_RATIOS, RATIOS, ratioHeight, aspectOf, aspectText } from '../lib/aspect.js';
  const ed = getContext('urd-editor');

  /** The last publish, for the foot of the Publish menu: who and how long ago, read from the history the menu loads as it opens. */
  const lastPublish = $derived.by(() => {
    const last = ed.historyList?.[0];
    if (!last?.date) return null;
    return { who: last.author, when: timeAgo(new Date(last.date).getTime(), adminLang()) || ta('history.now') };
  });
  $effect(() => {
    if (ed.toolMenu === 'publish' && ed.historyList === null) ed.loadHistory();
  });

  /** «Publish now» in the menu: the menu closes and the publish runs. */
  function publishNow() {
    ed.toolMenu = null;
    ed.publish();
  }

  /** «Discard drafts» in the menu: the question is asked (publishState.askDiscard), and the menu closes with the answer. */
  async function discardFromMenu() {
    await ed.askDiscard();
    ed.toolMenu = null;
  }

  /** A row of the menu's list: the menu closes and the owner is taken to the change. */
  function goTo(part) {
    ed.toolMenu = null;
    ed.goToUnpublished(part);
  }
  /** The Site menu stands in the top bar in the layout whose panel holds the page's tabs alone. */
  const siteMenu = $derived(ed.adminLayout === 'page-tabs');
  /** A tool menu (the Site menu, a device's sizes) opened on a mouse's rest on its button and closed a moment after the mouse leaves it, as the tabs' menus are, each menu with its own wait; a pass on the way elsewhere opens nothing, and a menu the focus has gone into (a size typed) stays until a press outside or Escape. */
  const restTimers = {};
  /** The menu a rest opened, which the press that often follows the rest keeps open rather than closing. */
  let restOpened = null;
  function menuRest(id, on, event) {
    if (event.pointerType !== 'mouse') return;
    const wrap = event.currentTarget;
    clearTimeout(restTimers[id]);
    restTimers[id] = setTimeout(() => {
      if (on && ed.toolMenu !== id) {
        ed.toolMenu = id;
        restOpened = id;
      } else if (!on && ed.toolMenu === id && !wrap?.contains(document.activeElement)) ed.toolMenu = null;
    }, on ? 180 : 280);
  }
  /** A press on a menu's button: it opens or closes the menu, but leaves one a rest just opened standing. */
  function pressMenu(id) {
    clearTimeout(restTimers[id]);
    if (ed.toolMenu === id && restOpened === id) {
      restOpened = null;
      return;
    }
    restOpened = null;
    ed.toolMenu = ed.toolMenu === id ? null : id;
  }
  $effect(() => () => Object.values(restTimers).forEach(clearTimeout));
  /** The gear stands in the top bar when neither a rail nor the strip holds it. */
  const gearHere = $derived(ed.adminLayout === 'panel-tabs' || ed.adminLayout === 'page-tabs');
  /** Each device's button: the fold-out it opens once shown, and the name of its sizes. */
  const SPLITS = { desktop: { menu: 'screen', sizesKey: 'lbl.screenSizes' }, mobile: { menu: 'phone', sizesKey: 'lbl.phoneSizes' } };
  const deviceIcon = (id) => (id === 'mobile' ? ed.phoneIcon : ed.screenIcon);

  /** A size picked in a fold-out sets its device and closes the fold-out. */
  function pickScreen(patch) {
    ed.setScreenPref(patch);
    ed.deviceId = 'desktop';
    ed.toolMenu = null;
  }

  function pickPhone(patch) {
    ed.setPhonePref(patch);
    ed.deviceId = 'mobile';
    ed.toolMenu = null;
  }

  /** The width a device stands at now, which a common ratio keeps. */
  const widthOf = (id) => ed.devices.find((d) => d.id === id)?.width ?? 0;

  /** A size's ratio in the admin's number format («19,5:9» in Norwegian); empty for a size without a height. */
  function ratioOf(width, height) {
    const num = new Intl.NumberFormat(adminLang(), { maximumFractionDigits: 2 });
    return aspectText(aspectOf(width, height), (n) => num.format(n));
  }

  /** A common ratio's name, written as a size's ratio is. */
  const ratioName = (id) => ratioOf(RATIOS[id][0], RATIOS[id][1]);
</script>

{#snippet screenSizes()}
  <!-- The screen's sizes, each with its ratio: your own window, the common sizes with their heights, the common ratios at the width the Screen stands at, and an own size whose height may stay empty; the pick sets the Screen device -->
  <button type="button" class="ghost device-size" class:active={ed.deviceId === 'desktop' && !ed.freeWidth && ed.screenPref.size === 'window'}
    onclick={() => pickScreen({ size: 'window' })}><span>{ta('lbl.screen.own')}</span><span class="device-size-px">{ed.ownWidth}</span><span class="device-ratio"></span></button>
  {#each ed.SCREEN_SIZES as s (s.id)}
    <button type="button" class="ghost device-size" class:active={ed.deviceId === 'desktop' && !ed.freeWidth && ed.screenPref.size === s.id}
      onclick={() => pickScreen({ size: s.id })}><span>{ta(`lbl.screenSize.${s.id}`)}</span><span class="device-size-px">{s.width} × {s.height}</span><span class="device-ratio">{ratioOf(s.width, s.height)}</span></button>
  {/each}
  {@render ratios('desktop', SCREEN_RATIOS, ed.screenPref, false, (r, w) => pickScreen({ size: 'ratio', ratio: r, ratioWidth: w }))}
  <div class="device-own" class:active={ed.deviceId === 'desktop' && !ed.freeWidth && ed.screenPref.size === 'own'}>
    <span>{ta('lbl.ownSize')}</span>
    <span class="device-own-fields">
      <input type="number" class="tb-num" min={SCREEN_WIDTH_MIN} max={SCREEN_WIDTH_MAX} step="10" value={ed.screenPref.width} aria-label={ta('lbl.screen.w')}
        title={ta('tip.screen.width', { min: SCREEN_WIDTH_MIN, max: SCREEN_WIDTH_MAX })}
        onchange={(e) => { ed.setScreenPref({ size: 'own', width: Number(e.target.value) }); ed.deviceId = 'desktop'; e.target.value = ed.screenPref.width; }} />
      <span aria-hidden="true">×</span>
      <input type="number" class="tb-num" min="0" max={SCREEN_HEIGHT_MAX} step="10" placeholder="0" value={ed.screenPref.height || ''} aria-label={ta('lbl.screen.h')}
        title={ta('tip.screen.height', { min: SCREEN_HEIGHT_MIN, max: SCREEN_HEIGHT_MAX })}
        onchange={(e) => { ed.setScreenPref({ size: 'own', height: Number(e.target.value) }); ed.deviceId = 'desktop'; e.target.value = ed.screenPref.height || ''; }} />
    </span>
    <span class="device-ratio">{ratioOf(ed.screenPref.width, ed.screenPref.height)}</span>
  </div>
{/snippet}

{#snippet ratios(id, list, pref, upright, pick)}
  <!-- The common ratios at the width the device stands at now, its height taken from the ratio -->
  {@const w = widthOf(id)}
  <div class="device-ratios" role="group" aria-label={ta('lbl.aspectRatios')}>
    <span title={ta('tip.aspectRatios')}>{ta('lbl.aspectRatios')}</span>
    <span class="device-ratio-chips">
      {#each list as r (r)}
        {@const on = ed.deviceId === id && !ed.freeWidth && pref.size === 'ratio' && pref.ratio === r}
        <button type="button" class="ghost device-ratio-chip" class:active={on} aria-pressed={on}
          title={ta('tip.aspectRatio', { r: ratioName(r), w, h: ratioHeight(w, r, upright) })}
          onclick={() => pick(r, w)}>{ratioName(r)}</button>
      {/each}
    </span>
  </div>
{/snippet}

{#snippet phoneSizes()}
  <!-- The phone's sizes, each with its ratio: the presets with their heights, the width alone, the common ratios at the width the Phone stands at, and an own size; the pick sets the Phone device -->
  {#each ed.PHONE_SIZES as p (p.id)}
    <button type="button" class="ghost device-size" class:active={ed.deviceId === 'mobile' && !ed.freeWidth && ed.phonePref.size === p.id}
      onclick={() => pickPhone({ size: p.id })}><span>{ta(`lbl.phoneSize.${p.id}`)}</span><span class="device-size-px">{p.width} × {p.height}</span><span class="device-ratio">{ratioOf(p.width, p.height)}</span></button>
  {/each}
  <button type="button" class="ghost device-size" class:active={ed.deviceId === 'mobile' && !ed.freeWidth && ed.phonePref.size === 'fill'}
    onclick={() => pickPhone({ size: 'fill' })}><span>{ta('lbl.phoneSize.fill')}</span><span class="device-size-px">{PHONE_FILL_WIDTH}</span><span class="device-ratio"></span></button>
  {@render ratios('mobile', PHONE_RATIOS, ed.phonePref, true, (r, w) => pickPhone({ size: 'ratio', ratio: r, ratioWidth: w }))}
  <div class="device-own" class:active={ed.deviceId === 'mobile' && !ed.freeWidth && ed.phonePref.size === 'own'}>
    <span>{ta('lbl.ownSize')}</span>
    <span class="device-own-fields">
      <input type="number" class="tb-num" min={PHONE_WIDTH_MIN} max={PHONE_WIDTH_MAX} step="1" value={ed.phonePref.width} aria-label={ta('lbl.screen.w')}
        title={ta('tip.phone.width', { min: PHONE_WIDTH_MIN, max: PHONE_WIDTH_MAX })}
        onchange={(e) => { ed.setPhonePref({ size: 'own', width: Number(e.target.value) }); ed.deviceId = 'mobile'; e.target.value = ed.phonePref.width; }} />
      <span aria-hidden="true">×</span>
      <input type="number" class="tb-num" min={PHONE_HEIGHT_MIN} max={PHONE_HEIGHT_MAX} step="1" value={ed.phonePref.height} aria-label={ta('lbl.screen.h')}
        title={ta('tip.phone.height', { min: PHONE_HEIGHT_MIN, max: PHONE_HEIGHT_MAX })}
        onchange={(e) => { ed.setPhonePref({ size: 'own', height: Number(e.target.value) }); ed.deviceId = 'mobile'; e.target.value = ed.phonePref.height; }} />
    </span>
    <span class="device-ratio">{ratioOf(ed.phonePref.width, ed.phonePref.height)}</span>
  </div>
{/snippet}

<header class="topbar" class:hidden={!ed.chromeVisible}>
  <span class="topbar-group">
    {#if ed.site}
      <!-- Current page: a click opens the Pages panel; the page you are
           on must stay visible -->
      <!-- The clusters fold one at a time (FOLD_MQ), not all at the same
           threshold: a single step swapping eleven controls for three
           menu buttons would be too big a jump. A folded cluster carries
           its own current value on the button (device icon, zoom
           percent), so the state can be read without opening the menu.

           `display: contents` on the shell: it exists only so the
           outside-click test has ONE node to ask, and must not create
           its own box in the bar. The Site menu of the page-tabs layout
           stands inside it for the same reason. -->
      <span class="toolset" bind:this={ed.toolMenuEl}>
        {#if siteMenu}
          <nav class="topnav" aria-label={ta('rail.panels')}>
            <!-- The Site menu opens on a press, and on a mouse's rest as the tabs' menus do; it closes a moment after the mouse leaves it and its submenus -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <span class="toolmenu" onpointerenter={(e) => menuRest('site', true, e)} onpointerleave={(e) => menuRest('site', false, e)}>
              <button type="button" class="ghost topnav-btn" class:active={ed.toolMenu === 'site'} aria-expanded={ed.toolMenu === 'site'}
                onclick={() => pressMenu('site')}>{ta('rail.siteMenu')}<span class="topnav-caret" aria-hidden="true">{@html ICONS.caret}</span>{#if ed.updateNotice === 'dot'}<span class="update-dot" aria-hidden="true"></span>{:else if ed.legal?.dot}<span class="update-dot legal-dot" role="img" aria-label={ta('legal.dotLabel')}></span>{:else if ed.draftsFresh}<span class="update-dot legal-dot" role="img" aria-label={ta(ed.draftsFresh === 1 ? 'saved.news.one' : 'saved.news', { n: ed.draftsFresh })}></span>{/if}</button>
              {#if ed.toolMenu === 'site'}
                <div class="tool-pop site-pop" transition:menuMotion>
                  {#each ed.PANEL_GROUPS.slice(1) as group, gi (gi)}
                    <span class="mini-label">{ta(ed.PANEL_GROUP_KEYS[gi + 1])}</span>
                    {#each group as name (name)}
                      <!-- A row with folds opens them beside it on a rest or the right arrow, as the strip's tabs do under them -->
                      <PanelTab {name} variant="row" />
                    {/each}
                  {/each}
                </div>
              {/if}
            </span>
          </nav>
        {/if}
        <PageSwitcher />
        <UndoButtons />

        {#if ed.folded.device}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <span class="toolmenu" onpointerenter={(e) => menuRest('device', true, e)} onpointerleave={(e) => menuRest('device', false, e)}>
            <button class="ghost" class:active={ed.toolMenu === 'device'}
              aria-label={ta('lbl.group.device')}
              onclick={() => pressMenu('device')}
              >{@html ICONS[deviceIcon(ed.deviceId)]}{@html ICONS.caret}</button>
            {#if ed.toolMenu === 'device'}
              <div class="tool-pop" transition:menuMotion>
                {#each ed.devices as d (d.id)}
                  <button class="ghost" class:active={ed.deviceId === d.id && !ed.freeWidth}
                    onclick={() => { ed.deviceId = d.id; ed.toolMenu = null; }}
                    title={ed.deviceTip(d)}
                    >{@html ICONS[deviceIcon(d.id)]} {ta(`lbl.device.${d.id}`)}</button>
                {/each}
                <!-- The devices' sizes stand under them while the cluster is a menu -->
                <span class="mini-label">{ta('lbl.screenSizes')}</span>
                {@render screenSizes()}
                <span class="mini-label">{ta('lbl.phoneSizes')}</span>
                {@render phoneSizes()}
              </div>
            {/if}
          </span>
        {:else}
          <!-- The device, zoom and view controls stand as three framed clusters without captions, so eleven buttons never read as one strip; each folded form keeps its cluster's name for a screen reader -->
          <span class="viewswitch toolgrp">
            {#each ed.devices as d (d.id)}
              {@const split = SPLITS[d.id]}
              {@const on = ed.deviceId === d.id && !ed.freeWidth}
              <!-- Each device is one button with its icon and an arrow, as the page switcher: a press on the device not shown switches to it, a press on the one shown opens its sizes, and a mouse's rest on either opens its sizes, a size picked switching to it -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <span class="toolmenu device-one" class:active={on} onpointerenter={(e) => menuRest(split.menu, true, e)} onpointerleave={(e) => menuRest(split.menu, false, e)}>
                <button class="ghost device-btn" class:active={on} class:open={ed.toolMenu === split.menu}
                  onclick={() => { if (on) pressMenu(split.menu); else ed.deviceId = d.id; }}
                  aria-label={on ? ta('tip.device.sizes', { device: ed.deviceTip(d) }) : ed.deviceTip(d)}
                  aria-expanded={on ? ed.toolMenu === split.menu : undefined}>{@html ICONS[deviceIcon(d.id)]}{@html ICONS.caret}</button>
                {#if ed.toolMenu === split.menu}
                  <div class="tool-pop device-pop" transition:menuMotion>
                    <span class="mini-label">{ta(split.sizesKey)}</span>
                    {#if d.id === 'mobile'}{@render phoneSizes()}{:else}{@render screenSizes()}{/if}
                  </div>
                {/if}
              </span>
            {/each}
          </span>
          {#if ed.freeWidth}
            <span class="free-chip" title={ed.deviceTip(ed.device)}>{ta('lbl.ownWidth', { w: ed.freeWidth })}</span>
          {/if}
        {/if}

        {#if ed.folded.zoom}
          <span class="toolmenu">
            <button class="ghost" class:active={ed.toolMenu === 'zoom'}
              title={ta('lbl.group.zoom')}
              onclick={() => (ed.toolMenu = ed.toolMenu === 'zoom' ? null : 'zoom')}
              ><span class="zoom-cap">{Math.round(ed.scale * 100)}%</span>{@html ICONS.caret}</button>
            {#if ed.toolMenu === 'zoom'}
              <!-- The menu stays open while stepping: zoom is adjusted in
                   several clicks, and a menu that closed on every click
                   would have to be reopened for each step. -->
              <div class="tool-pop" transition:menuMotion>
                <div class="tool-pop-row">
                  <button class="ghost" onclick={() => ed.stepZoom(-1)} title={ta('tip.zoomOut')}>{@html ICONS.minus}</button>
                  <span class="zoom-readout" title={ta('tip.zoomCurrent')}>{Math.round(ed.scale * 100)}%</span>
                  <button class="ghost" onclick={() => ed.stepZoom(1)} title={ta('tip.zoomIn')}>{@html ICONS.plus}</button>
                </div>
                <button class="ghost" class:active={ed.zoomMode === 'fit'}
                  onclick={() => (ed.zoomMode = 'fit')} title={ta('tip.zoomFit')}
                  >{@html ICONS.fit} {ta('lbl.zoom.fit')}</button>
              </div>
            {/if}
          </span>
        {:else}
          <span class="zoomswitch toolgrp">
            <button class="ghost" onclick={() => ed.stepZoom(-1)} title={ta('tip.zoomOut')}>{@html ICONS.minus}</button>
            <span class="zoom-readout" title={ta('tip.zoomCurrent')}>{Math.round(ed.scale * 100)}%</span>
            <button class="ghost" onclick={() => ed.stepZoom(1)} title={ta('tip.zoomIn')}>{@html ICONS.plus}</button>
            <button class="ghost" class:active={ed.zoomMode === 'fit'}
              onclick={() => (ed.zoomMode = 'fit')} title={ta('tip.zoomFit')}>{@html ICONS.fit}</button>
          </span>
        {/if}

        {#if ed.folded.view}
          <span class="toolmenu">
            <button class="ghost" class:active={ed.toolMenu === 'view' || ed.gridOn || ed.guidesOn}
              title={ta('lbl.group.view')}
              onclick={() => (ed.toolMenu = ed.toolMenu === 'view' ? null : 'view')}
              >{@html ICONS.gridToggle}{@html ICONS.caret}</button>
            {#if ed.toolMenu === 'view'}
              <div class="tool-pop" transition:menuMotion>
                <button class="ghost" class:active={ed.gridOn} onclick={ed.toggleGrid}
                  title={ta('tip.gridToggle')}>{@html ICONS.gridToggle} {ta('lbl.view.grid')}</button>
                <button class="ghost" class:active={ed.guidesOn} onclick={ed.toggleGuides}
                  title={ta('tip.guides')}>{@html ICONS.guides} {ta('lbl.view.guides')}</button>
              </div>
            {/if}
          </span>
        {:else}
          <!-- The grid and the guides carry no caption: their icons say it, and the folded form keeps the word as its tooltip -->
          <span class="toolgrp">
            <button class="ghost" class:active={ed.gridOn} onclick={ed.toggleGrid}
              title={ta('tip.gridToggle')}>{@html ICONS.gridToggle}</button>
            <button class="ghost" class:active={ed.guidesOn} onclick={ed.toggleGuides}
              title={ta('tip.guides')}>{@html ICONS.guides}</button>
          </span>
        {/if}
      </span>
    {/if}

    {#if ed.attentionCount > 0}
      <button class="badge attention" onclick={ed.jumpToAttention}
        title={ta('tip.attention')}>
        {@html ICONS.phone}
        <span class="btn-label">{ta(ed.attentionCount === 1 ? 'ui.attentionOne' : 'ui.attentionMany', { n: ed.attentionCount })}</span>
        <span class="badge-mini">{ed.attentionCount}</span>
      </button>
    {/if}

  </span>

  <span class="topbar-group topbar-right">
  {#if ed.site}
    <!-- A new Urd as a pill naming the version, where the site asks for it and the bar is wide; it opens the Updates panel -->
    {#if ed.updateNotice === 'pill'}
      <button type="button" class="ghost update-pill" title={ta('tip.updateOut', { version: ed.updateTarget })} onclick={() => ed.openPanel('update')}>{@html ICONS.panel_update}<span class="btn-label">{ta('ui.updateOut', { version: ed.updateTarget })}</span></button>
    {/if}
    {#if gearHere}<SettingsGear />{/if}
    <button
      class="ghost topbar-tall"
      disabled={Boolean(ed.looking)}
      onclick={ed.toggleChrome}
      title={ed.chromeVisible ? ta('tip.chromeHide') : ta('tip.chromeShow')}
    >{#if ed.chromeVisible}{@html ICONS.eye} <span class="btn-label">{ta('ui.cleanView')}</span>{:else}{@html ICONS.pencil} <span class="btn-label">{ta('ui.edit')}</span>{/if}</button>
    {#if ed.auth?.loggedIn}
      <span class="who" title={ed.auth.allowed ? ta('tip.hasPublishAccess') : ta('tip.noPublishAccess')}>
        {#if !ed.auth.allowed}{@html ICONS.warn}{/if}{ed.auth.login}
      </span>
    {:else if ed.auth}
      <!-- Login keeps its text at all widths: without an icon the button
           would be empty, and it is the entry point to publishing at all. -->
      <a class="ghost" href="/api/github/login">{ta('ui.loginGitHub')}</a>
    {/if}
    <!-- Publish with its menu: the button carries the count of what waits, and opens on a press or a mouse's rest as the bar's other menus do (no tooltip on a button that opens on rest).
         The menu holds the acts first (Publish now, the published site, Discard drafts), then what waits to be published as rows that lead to the change, and at its foot the last publish, which opens History. -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span class="toolmenu publish-wrap" onpointerenter={(e) => menuRest('publish', true, e)} onpointerleave={(e) => menuRest('publish', false, e)}>
      <button type="button" class="primary publish-btn topbar-tall" aria-expanded={ed.toolMenu === 'publish'} aria-haspopup="true" aria-describedby={ed.dirty ? 'publish-waiting' : undefined}
        onclick={() => pressMenu('publish')}>{ta('ui.publish')}{#if ed.dirty}<span class="publish-count" aria-hidden="true"><span>{ed.unpublished.length}</span></span><span class="sr-only" id="publish-waiting">{ta(ed.unpublished.length === 1 ? 'publish.waiting.one' : 'publish.waiting', { n: ed.unpublished.length })}</span>{/if}{@html ICONS.caret}</button>
      {#if ed.toolMenu === 'publish'}
        <div class="tool-pop publish-pop" transition:menuMotion role="group" aria-label={ta('publish.menu')}>
          <button type="button" class="ghost publish-act publish-main" disabled={!ed.dirty || !ed.auth?.allowed}
            title={ed.auth?.allowed ? undefined : ta('tip.history.needsAccess')} onclick={publishNow}>{@html ICONS.upload}<span>{ta('publish.now')}</span></button>
          <a class="ghost publish-act" href={ed.pageEntry()?.path ?? '/'} target="_blank" rel="noopener" onclick={() => (ed.toolMenu = null)}>{@html ICONS.external}<span>{ta('publish.viewLive')}</span></a>
          <button type="button" class="ghost publish-act publish-red" disabled={!ed.dirty || Boolean(ed.looking)} onclick={discardFromMenu}>{@html ICONS.restore}<span>{ta('ui.discard')}</span></button>
          {#if ed.savedRows.length}
            <hr class="gridmenu-divider" />
            <!-- With the bands each band counts its own rows; without them the head counts what waits -->
            <span class="mini-label publish-head">{ta('history.unpublished')}{#if !ed.savedAvailable} · {ed.savedRows.length}{/if}</span>
            <!-- What waits scrolls in its own box, so the acts above it and the last publish under it stay in sight -->
            <div class="publish-rows"><UnpublishedRows parts={ed.savedRows} steps={ed.steps.undo} publishedAt={ed.publishedAt} onpick={goTo}
              bands={ed.savedAvailable} onuse={(part) => { ed.toolMenu = null; ed.useSaved(part.part); }} whenSaved={ed.whenSaved} /></div>
          {/if}
          <hr class="gridmenu-divider" />
          <button type="button" class="ghost publish-act publish-foot" onclick={() => { ed.toolMenu = null; ed.openPanel('history'); }}>
            {@html ICONS.panel_history}<span>{lastPublish ? ta('publish.lastBy', { when: lastPublish.when, who: lastPublish.who }) : ta('publish.openHistory')}</span>
          </button>
        </div>
      {/if}
    </span>
  {/if}
  </span>
</header>
