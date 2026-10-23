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
      <div class="settings-pop">
        <p class="panel-strong">{ta('settings.title')}</p>
        <label title={ta('topbar.adminTheme.title')}>{ta('settings.theme')}
          <Dropdown value={ed.adminTheme} options={ed.ADMIN_THEMES} onchange={(v) => (ed.adminTheme = v)} /></label>
        <label title={ta('topbar.language.title')}>{ta('settings.language')}
          <Dropdown value={ed.adminLangChoice} options={[['auto', ta('lang.auto')], ...ed.adminLangOptions()]} onchange={ed.setAdminLang} /></label>
        <label title={ta('tip.settings.layoutPicker')}>{ta('settings.layoutPicker')}
          <Dropdown value={ed.layoutPickerPref}
            options={[['strip', ta('settings.layoutPickerStrip')], ['menu', ta('settings.layoutPickerMenu')]]}
            onchange={ed.setLayoutPicker} /></label>
        <label title={ta('tip.settings.menuWidth')}>{ta('settings.menuWidth')}
          <Dropdown value={menu.widthPref}
            options={[['wide', ta('settings.menuWide')], ['narrow', ta('settings.menuNarrow')]]}
            onchange={setMenuWidthPref} /></label>
        <label title={ta('tip.settings.spellcheck')}>{ta('settings.spellcheck')}
          <Dropdown value={ed.spellcheckPref}
            options={[['on', ta('common.on')], ['off', ta('common.off')]]}
            onchange={ed.setSpellcheck} /></label>
        <label title={ta('tip.settings.linkEditor')}>{ta('settings.linkEditor')}
          <Dropdown value={ed.linkEditorPref}
            options={[['dialog', ta('opt.linkEditor.dialog')], ['popover', ta('opt.linkEditor.popover')]]}
            onchange={ed.setLinkEditor} /></label>
        <label title={ta('tip.settings.panels')}>{ta('settings.panels')}
          <Dropdown value={ed.panelsPref}
            options={[['remember', ta('settings.panelsRemember')], ['reset', ta('settings.panelsReset')]]}
            onchange={ed.setPanelsPref} /></label>
        <!-- The Screen device (ADR-0018, Consequences): its own window
             width, or an editing size with an optional height. An
             admin preference like the theme and the language, so it
             lives here and not in the device strip. -->
        <p class="mini-label" title={ta('tip.screen.mode')}>{ta('settings.screen')}</p>
        <div class="seg" title={ta('tip.screen.mode')}>
          <button type="button" class:on={ed.screenPref.mode === 'own'}
            onclick={() => ed.setScreenPref({ mode: 'own' })}>{ta('lbl.screen.own')}</button>
          <button type="button" class:on={ed.screenPref.mode === 'custom'}
            onclick={() => ed.setScreenPref({ mode: 'custom' })}>{ta('lbl.screen.size')}</button>
        </div>
        {#if ed.screenPref.mode === 'custom'}
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
        {/if}
        <!-- Visitor measurement: the one SITE value in this pop (site.analytics,
             published with the site), placed where the owner looks for Urd's own settings. -->
        {#if ed.siteDraft}
          <p class="mini-label" title={ta('tip.analytics')}>{ta('settings.analytics')}</p>
          <label title={ta('tip.analytics')}>{ta('lbl.analyticsToken')}
            <input type="text" placeholder={ta('ph.analyticsToken')} spellcheck="false"
              value={ed.siteDraft.analytics?.token ?? ''}
              onchange={(e) => ed.setAnalyticsToken(e.target.value)} /></label>
        {/if}
      </div>
    {/if}
  </span>
</nav>
