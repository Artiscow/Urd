<script>
  /* The top bar: the page name, the view, device and zoom clusters with their fold steps, the draft status with Publish and Discard, and the tools on the right. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle. */
  import { getContext } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import { fly } from 'svelte/transition';
  import SettingsGear from './SettingsGear.svelte';
  import { PHONE_FILL_WIDTH, PHONE_WIDTH_MIN, PHONE_WIDTH_MAX, PHONE_HEIGHT_MIN, PHONE_HEIGHT_MAX } from '../lib/preview-width.js';
  import { SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX, SCREEN_HEIGHT_MIN, SCREEN_HEIGHT_MAX } from '../lib/own-screen.js';
  import { SCREEN_RATIOS, PHONE_RATIOS, RATIOS, ratioHeight, aspectOf, aspectText } from '../lib/aspect.js';
  const ed = getContext('urd-editor');
  /** The Site menu stands in the top bar in the layout whose panel holds the page's tabs alone. */
  const siteMenu = $derived(ed.adminLayout === 'page-tabs');
  /** The gear stands in the top bar when neither a rail nor the strip holds it. */
  const gearHere = $derived(ed.adminLayout === 'panel-tabs' || ed.adminLayout === 'page-tabs');
  /** Each device's split button: the fold-out it opens, the icon it shows, and the name of its sizes. */
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
            <span class="toolmenu">
              <button type="button" class="ghost topnav-btn" class:active={ed.toolMenu === 'site'} title={ta('tip.siteMenu')}
                onclick={() => (ed.toolMenu = ed.toolMenu === 'site' ? null : 'site')}>{ta('rail.siteMenu')}{@html ICONS.caret}{#if ed.updateNotice === 'dot'}<span class="update-dot" aria-hidden="true"></span>{/if}</button>
              {#if ed.toolMenu === 'site'}
                <div class="tool-pop site-pop">
                  {#each ed.PANEL_GROUPS.slice(1) as group, gi (gi)}
                    <span class="mini-label">{ta(ed.PANEL_GROUP_KEYS[gi + 1])}</span>
                    {#each group as name (name)}
                      <button type="button" class="ghost" class:active={ed.activePanel === name} aria-pressed={ed.activePanel === name} title={name === 'update' && ed.updateNotice === 'dot' ? ta('tip.updateOut', { version: ed.updateTarget }) : undefined} onclick={() => ed.togglePanel(name)}>{ed.PANEL_LABELS[name]}{#if name === 'update' && ed.updateNotice === 'dot'}<span class="update-dot update-dot-inline" aria-hidden="true"></span>{/if}</button>
                    {/each}
                  {/each}
                </div>
              {/if}
            </span>
          </nav>
        {/if}
        <button class="ghost page-btn" title={ta('tip.switchPage')}
          onclick={() => ed.togglePanel('pages')}>{ed.pageEntry()?.title ?? ''}</button>

        {#if ed.folded.device}
          <span class="toolmenu">
            <button class="ghost" class:active={ed.toolMenu === 'device'}
              title={ta('lbl.group.device')}
              onclick={() => (ed.toolMenu = ed.toolMenu === 'device' ? null : 'device')}
              >{@html ICONS[deviceIcon(ed.deviceId)]}{@html ICONS.caret}</button>
            {#if ed.toolMenu === 'device'}
              <div class="tool-pop">
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
          <!-- Eleven controls in a row with identical borders read as one
               strip. Three labeled clusters instead: Device, Zoom, View. -->
          <span class="tool-cap">{ta('lbl.group.device')}</span>
          <span class="viewswitch toolgrp">
            {#each ed.devices as d (d.id)}
              {@const split = SPLITS[d.id]}
              {@const on = ed.deviceId === d.id && !ed.freeWidth}
              <!-- Each device is a split button: the icon chooses the device at its size, the caret opens its sizes -->
              <span class="toolmenu device-split" class:active={on}>
                <button class="ghost device-btn" class:active={on}
                  onclick={() => (ed.deviceId = d.id)} title={ed.deviceTip(d)} aria-label={ed.deviceTip(d)}>{@html ICONS[deviceIcon(d.id)]}</button>
                <button class="ghost device-caret" class:active={on} class:open={ed.toolMenu === split.menu}
                  onclick={() => { ed.toolMenu = ed.toolMenu === split.menu ? null : split.menu; }}
                  title={ta(split.sizesKey)} aria-label={ta(split.sizesKey)} aria-expanded={ed.toolMenu === split.menu}>{@html ICONS.caret}</button>
                {#if ed.toolMenu === split.menu}
                  <div class="tool-pop device-pop">
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
              <div class="tool-pop">
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
          <span class="tool-cap">{ta('lbl.group.zoom')}</span>
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
              <div class="tool-pop">
                <button class="ghost" class:active={ed.gridOn} onclick={ed.toggleGrid}
                  title={ta('tip.gridToggle')}>{@html ICONS.gridToggle} {ta('lbl.view.grid')}</button>
                <button class="ghost" class:active={ed.guidesOn} onclick={ed.toggleGuides}
                  title={ta('tip.guides')}>{@html ICONS.guides} {ta('lbl.view.guides')}</button>
              </div>
            {/if}
          </span>
        {:else}
          <span class="tool-cap">{ta('lbl.group.view')}</span>
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

  <span class="topbar-group topbar-draft">
    {#if ed.dirty}
      <!-- The cluster slides out to the right with a quick fade when the
           draft is discarded or published; the space collapses only
           afterwards, so the bar never jumps mid-motion. Reduced motion
           gives a plain cut. -->
      <span class="draft-cluster" out:fly={{ x: 24, duration: ed.reducedMotion ? 0 : 150 }}>
      <!-- The status is a STATE, not an action: the pill shape remains,
           but with the chip idiom rather than a filled accent surface
           (ADR-0016), so Publish is the only filled surface in the bar. -->
      <!-- The narrowest step shows only the exclamation mark; the title
           carries the word, and both forms are aria-hidden so screen
           readers get it once. -->
      <span class="chip draft-chip" title={ta('ui.unpublished')} aria-label={ta('ui.unpublished')}>
        <span class="chip-full" aria-hidden="true">{ta('ui.unpublished')}</span>
        <span class="chip-mini" aria-hidden="true">!</span>
      </span>
      <!-- Discard is destructive and would otherwise take prime space. A
           full pill when there is room, otherwise a small red circle.
           The restore glyph, not a back arrow: the latter means undo.
           The button keeps its width when armed; the confirmation comes
           as its own pill below the bar. -->
      <!-- The shell exists for the anchoring: the pill is centered under
           the BUTTON, not under the group, so it points at what it confirms. -->
      <span class="discard-wrap" bind:this={ed.discardWrapEl}>
        <button class="discard-dot" class:armed={ed.discardArmed} onclick={ed.requestDiscard}
          title={ed.discardArmed ? ta('tip.discardArmed') : ta('tip.discard')}
        >{@html ICONS.restore}<span class="discard-label">{ta('ui.discard')}</span></button>
        {#if ed.discardArmed}
          <button class="discard-confirm" onclick={ed.confirmDiscard} title={ta('tip.discardArmed')}
            >{@html ICONS.restore} {ta('ui.discardConfirm')}</button>
        {/if}
      </span>
      </span>
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
      class="ghost"
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
    <a class="ghost" href={ed.pageEntry()?.path ?? '/'} target="_blank" rel="noopener"
      title={ta('ui.viewSite')}>{@html ICONS.external} <span class="btn-label">{ta('ui.viewSite')}</span></a>
    <button class="primary" onclick={ed.publish} disabled={!ed.dirty}>{ta('ui.publish')}</button>
  {/if}
  </span>
</header>
