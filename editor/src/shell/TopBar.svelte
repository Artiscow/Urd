<script>
  /* The top bar: the page name, the view, device and zoom clusters with their fold steps, the draft status with Publish and Discard, and the tools on the right. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import { fly } from 'svelte/transition';
  const ed = getContext('urd-editor');
</script>

<header class="topbar" class:hidden={!ed.chromeVisible}>
  <span class="topbar-group">
    {#if ed.site}
      <!-- Current page: a click opens the Pages panel; the page you are
           on must stay visible -->
      <button class="ghost page-btn" title={ta('tip.switchPage')}
        onclick={() => ed.togglePanel('pages')}>{ed.pageEntry()?.title ?? ''}</button>

      <!-- The clusters fold one at a time (FOLD_MQ), not all at the same
           threshold: a single step swapping eleven controls for three
           menu buttons would be too big a jump. A folded cluster carries
           its own current value on the button (device icon, zoom
           percent), so the state can be read without opening the menu.

           `display: contents` on the shell: it exists only so the
           outside-click test has ONE node to ask, and must not create
           its own box in the bar. -->
      <span class="toolset" bind:this={ed.toolMenuEl}>
        {#if ed.folded.device}
          <span class="toolmenu">
            <button class="ghost" class:active={ed.toolMenu === 'device'}
              title={ta('lbl.group.device')}
              onclick={() => (ed.toolMenu = ed.toolMenu === 'device' ? null : 'device')}
              >{@html ICONS[`device_${ed.deviceId}`]}{@html ICONS.caret}</button>
            {#if ed.toolMenu === 'device'}
              <div class="tool-pop">
                {#each ed.devices as d (d.id)}
                  <button class="ghost" class:active={ed.deviceId === d.id}
                    onclick={() => { ed.deviceId = d.id; ed.toolMenu = null; }}
                    title={ed.deviceTip(d)}
                    >{@html ICONS[`device_${d.id}`]} {ta(`lbl.device.${d.id}`)}</button>
                {/each}
              </div>
            {/if}
          </span>
        {:else}
          <!-- Eleven controls in a row with identical borders read as one
               strip. Three labeled clusters instead: Device, Zoom, View. -->
          <span class="tool-cap">{ta('lbl.group.device')}</span>
          <span class="viewswitch toolgrp">
            {#each ed.devices as d (d.id)}
              <button class="ghost" class:active={ed.deviceId === d.id}
                onclick={() => (ed.deviceId = d.id)}
                title={ed.deviceTip(d)}
                >{@html ICONS[`device_${d.id}`]}</button>
            {/each}
          </span>
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
