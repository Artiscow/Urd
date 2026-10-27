<script>
  /* The panel rail: the panels in their groups, the mark and the settings gear with its popover. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import Dropdown from '../lib/Dropdown.svelte';
  import { menu, setMenuWidthPref } from '../menu/state.svelte.js';
  import { SCREEN_WIDTH_MIN, SCREEN_WIDTH_MAX, SCREEN_HEIGHT_MAX, SCREEN_HEIGHT_MIN } from '../lib/own-screen.js';
  const ed = getContext('urd-editor');
</script>

<nav class="rail" class:hidden={!ed.chromeVisible}>
  {#each ed.PANEL_GROUPS as group, gi (gi)}
    <!-- Uppercase label above each group: page tools, site settings
         and system read as three levels. -->
    <span class="rail-group">{ta(ed.PANEL_GROUP_KEYS[gi])}</span>
    {#each group as name (name)}
      <button class:active={ed.activePanel === name} onclick={() => ed.togglePanel(name)}>{ed.PANEL_LABELS[name]}</button>
    {/each}
  {/each}
  <span class="rail-settings" bind:this={ed.settingsEl}>
    <!-- The mark lives at the bottom of the rail by the gear, not in
         the top bar: there it would take the space the discard
         confirmation needs to grow. -->
    <span class="rail-brand" title="Urd">
      <!-- The viewBox is cropped to the glyph's visual box (stroke
           included), so the svg bottom IS the rune's foot and the
           baseline alignment lands. -->
      <svg class="brand-mark" viewBox="10.3 8.3 19.4 25.4" aria-hidden="true"><path d="M12 32V10l16 6.5V32" fill="none" stroke="var(--urd-brand)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <span class="brand-word">Urd</span>
    </span>
    <button class="rail-gear" class:active={ed.settingsOpen} title={ta('settings.title')}
      onclick={() => (ed.settingsOpen = !ed.settingsOpen)}>{@html ICONS.gear}</button>
    {#if ed.settingsOpen}
      <!-- Urd's own settings in four groups: how the admin looks, how the editing tools behave, the window, and the one site value.
           Each setting is a row with its name at the left and its control at the right; an on/off choice and the Screen button's two choices are segment controls. -->
      <div class="settings-pop">
        <p class="panel-strong">{ta('settings.title')}</p>
        <section class="settings-group">
          <p class="mini-label">{ta('settings.group.look')}</p>
          <label class="settings-row" title={ta('topbar.adminTheme.title')}><span>{ta('settings.theme')}</span>
            <Dropdown value={ed.adminTheme} options={ed.ADMIN_THEMES} onchange={(v) => (ed.adminTheme = v)} /></label>
          <label class="settings-row" title={ta('topbar.language.title')}><span>{ta('settings.language')}</span>
            <Dropdown value={ed.adminLangChoice} options={[['auto', ta('lang.auto')], ...ed.adminLangOptions()]} onchange={ed.setAdminLang} /></label>
        </section>
        <section class="settings-group">
          <p class="mini-label">{ta('settings.group.editing')}</p>
          <label class="settings-row" title={ta('tip.settings.addBlockMenu')}><span>{ta('settings.addBlockMenu')}</span>
            <Dropdown value={ed.addBlockMenuPref}
              options={[['side', ta('settings.addBlockMenuSide')], ['slim', ta('settings.addBlockMenuSlim')]]}
              onchange={ed.setAddBlockMenu} /></label>
          <label class="settings-row" title={ta('tip.settings.layoutPicker')}><span>{ta('settings.layoutPicker')}</span>
            <Dropdown value={ed.layoutPickerPref}
              options={[['strip', ta('settings.layoutPickerStrip')], ['menu', ta('settings.layoutPickerMenu')]]}
              onchange={ed.setLayoutPicker} /></label>
          <label class="settings-row" title={ta('tip.settings.menuWidth')}><span>{ta('settings.menuWidth')}</span>
            <Dropdown value={menu.widthPref}
              options={[['wide', ta('settings.menuWide')], ['narrow', ta('settings.menuNarrow')]]}
              onchange={setMenuWidthPref} /></label>
          <label class="settings-row" title={ta('tip.settings.linkEditor')}><span>{ta('settings.linkEditor')}</span>
            <Dropdown value={ed.linkEditorPref}
              options={[['dialog', ta('opt.linkEditor.dialog')], ['popover', ta('opt.linkEditor.popover')]]}
              onchange={ed.setLinkEditor} /></label>
          <div class="settings-row" title={ta('tip.settings.spellcheck')}><span>{ta('settings.spellcheck')}</span>
            <div class="seg">
              <button type="button" class:on={ed.spellcheckPref === 'on'} onclick={() => ed.setSpellcheck('on')}>{ta('common.on')}</button>
              <button type="button" class:on={ed.spellcheckPref === 'off'} onclick={() => ed.setSpellcheck('off')}>{ta('common.off')}</button>
            </div>
          </div>
        </section>
        <section class="settings-group">
          <p class="mini-label">{ta('settings.group.window')}</p>
          <label class="settings-row" title={ta('tip.settings.panels')}><span>{ta('settings.panels')}</span>
            <Dropdown value={ed.panelsPref}
              options={[['remember', ta('settings.panelsRemember')], ['reset', ta('settings.panelsReset')]]}
              onchange={ed.setPanelsPref} /></label>
          <!-- The Screen device (ADR-0018, Consequences): its own window width, or an editing size with an optional height.
               An admin preference like the theme and the language, so it lives here and not in the device strip. -->
          <div class="settings-row" title={ta('tip.screen.mode')}><span>{ta('settings.screen')}</span>
            <div class="seg">
              <button type="button" class:on={ed.screenPref.mode === 'own'}
                onclick={() => ed.setScreenPref({ mode: 'own' })}>{ta('lbl.screen.own')}</button>
              <button type="button" class:on={ed.screenPref.mode === 'custom'}
                onclick={() => ed.setScreenPref({ mode: 'custom' })}>{ta('lbl.screen.size')}</button>
            </div>
          </div>
          {#if ed.screenPref.mode === 'custom'}
            <div class="settings-row settings-sub">
              <span></span>
              <div class="ctl-row">
                <span class="mini-label">{ta('lbl.screen.w')}</span>
                <input type="number" class="tb-num" min={SCREEN_WIDTH_MIN} max={SCREEN_WIDTH_MAX} step="10"
                  title={ta('tip.screen.width', { min: SCREEN_WIDTH_MIN, max: SCREEN_WIDTH_MAX })}
                  value={ed.screenPref.width} onchange={(e) => { ed.setScreenPref({ width: Number(e.target.value) }); e.target.value = ed.screenPref.width; }} />
                <span class="mini-label">{ta('lbl.screen.h')}</span>
                <input type="number" class="tb-num" min="0" max={SCREEN_HEIGHT_MAX} step="10" placeholder="0"
                  title={ta('tip.screen.height', { min: SCREEN_HEIGHT_MIN, max: SCREEN_HEIGHT_MAX })}
                  value={ed.screenPref.height || ''} onchange={(e) => { ed.setScreenPref({ height: Number(e.target.value) }); e.target.value = ed.screenPref.height || ''; }} />
              </div>
            </div>
          {/if}
        </section>
        <!-- Visitor measurement: the one SITE value in this pop (site.analytics,
             published with the site), placed where the owner looks for Urd's own settings. -->
        {#if ed.siteDraft}
          <section class="settings-group">
            <p class="mini-label" title={ta('tip.analytics')}>{ta('settings.analytics')}</p>
            <label class="settings-stack" title={ta('tip.analytics')}><span>{ta('lbl.analyticsToken')}</span>
              <input type="text" placeholder={ta('ph.analyticsToken')} spellcheck="false"
                value={ed.siteDraft.analytics?.token ?? ''}
                onchange={(e) => ed.setAnalyticsToken(e.target.value)} /></label>
          </section>
        {/if}
      </div>
    {/if}
  </span>
</nav>
