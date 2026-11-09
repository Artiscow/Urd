<script>
  /**
   * Urd's own settings over the admin, in the form «Settings window» asks for: the dialog with the sections down the left in their three groups (the admin design, Local settings, This site), a search above them and every section's rows at the right, in one scroll a section button jumps in and the list follows;
   * each section's entry folds out to its settings, which jump to their rows: on a rest of the mouse for as long as it stays, and held open by a press until it or another entry is pressed, while a rest on another still opens that one beside it;
   * or the sheet, with the look choices at the left and the rest as rows at the right. Both end in the way to the shortcut sheet and the version.
   * It opens where it was left while the tab is open: each scroll at the row it stood at, and the entry the list held open (keep-place.js).
   * A native modal dialog (ADR-0011) like the shortcut sheet: Escape is its own cancel, and a press outside the card closes it.
   */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { searchLangs } from '../lib/search-langs.svelte.js';
  import { fadingDialog, dialogOut } from '../lib/motion.svelte.js';
  import { ICONS } from '../lib/icons.js';
  import { visibleGroups, inBands } from '../lib/settings-model.js';
  import { settingsContext } from '../state/admin-design.svelte.js';
  import { keepPlace, recall, remember } from './keep-place.js';
  import SettingsBody from './SettingsBody.svelte';

  const ed = getContext('urd-editor');
  let { onclose } = $props();
  let dialogEl = $state(null);
  let contentEl = $state(null);
  let query = $state('');
  let current = $state('design');
  let downOnBackdrop = false;

  const opener = document.activeElement;
  // A setting is found by its words in any language once the other languages are in (search-langs.js); a typed query loads them.
  const c = settingsContext(ed);
  $effect(() => searchLangs.need(query));
  const navGroups = $derived(visibleGroups(query, null, c));
  const navBands = $derived(inBands(navGroups));
  /** The section marked in the list: the one in view, or the first one a search leaves when it hides that one. */
  const marked = $derived(navGroups.some((g) => g.id === current) ? current : navGroups[0]?.id);
  const GROUP_ICONS = { design: 'designs', menu: 'panel_properties', panels: 'foldLeft', canvas: 'panel_grid', look: 'panel_theme', editing: 'pencil', window: 'device_desktop', site: 'panel_site' };

  const close = () => dialogEl?.close();

  /** Whether the shortcut sheet opens once the dialog has closed. */
  let toKeys = false;

  /** Every way of closing ends here: the focus goes back to what had it, or to the gear when that is gone (a tile in the settings panel the dialog took over from), and the shortcut sheet opens where it was asked for. */
  function onClosed() {
    const back = opener instanceof HTMLElement && opener.isConnected && opener !== document.body ? opener : document.querySelector('.rail-gear');
    back?.focus({ preventScroll: true });
    onclose?.();
    if (toKeys) ed.openShortcuts();
  }

  $effect(() => {
    if (dialogEl && !dialogEl.open) dialogEl.showModal();
  });

  /** A section button scrolls its section to the top of the content and holds its entry open; pressed while it is held, it folds the entry back, even under the resting mouse, and leaves the scroll where it is. */
  function jump(id) {
    if (held === id) {
      held = null;
      rested = null;
      clearTimeout(restTimer);
      return;
    }
    current = id;
    held = id;
    contentEl?.querySelector(`#st-sec-${id}`)?.scrollIntoView({ block: 'start', behavior: ed.reducedMotion ? 'auto' : 'smooth' });
  }

  /** A setting under an entry scrolls its row to the middle of the content and lights it for a moment, its section's entry held open; a setting without a row of its own (the presets) brings its section to the top. */
  let flashTimer = 0;
  function jumpTo(groupId, settingId) {
    current = groupId;
    held = groupId;
    const row = contentEl?.querySelector(`#st-sec-n-${settingId}`)?.closest('.st-row');
    if (!row) {
      contentEl?.querySelector(`#st-sec-${groupId}`)?.scrollIntoView({ block: 'start', behavior: ed.reducedMotion ? 'auto' : 'smooth' });
      return;
    }
    row.scrollIntoView({ block: 'center', behavior: ed.reducedMotion ? 'auto' : 'smooth' });
    // The light starts anew at each press, on this row alone.
    for (const lit of contentEl.querySelectorAll('.st-flash')) lit.classList.remove('st-flash');
    void row.offsetWidth;
    row.classList.add('st-flash');
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => row.classList.remove('st-flash'), 1900);
  }
  $effect(() => () => clearTimeout(flashTimer));

  /* The entries that stand folded out: the one a press holds open, and the one the mouse rests on, after a moment so a pointer passing over the list opens nothing; leaving an entry folds it back unless it is held.
     Only a mouse rests: a touch or a pen opens an entry by its press (the hybrid-device guard, AGENTS.md). */
  let held = $state(recall('held'));
  let rested = $state(null);
  $effect(() => remember('held', held));
  let restTimer = 0;
  function restOn(event, id) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(restTimer);
    restTimer = setTimeout(() => (rested = id), 160);
  }
  function restOff(event, id) {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(restTimer);
    if (rested === id) rested = null;
  }
  $effect(() => () => clearTimeout(restTimer));
  /** Whether an entry lists its settings: not a section whose one setting bears its own name (the presets). */
  const listsSettings = (group) => !(group.settings.length === 1 && group.settings[0].labelKey === group.labelKey);

  /** The section in view: the last one whose top has passed the content's top, and the last section of all once the content is scrolled to its end, since a short last section never reaches the top. */
  function track() {
    if (!contentEl) return;
    const sections = [...contentEl.querySelectorAll('.st-section')];
    if (!sections.length) return;
    const atEnd = contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 2;
    const top = contentEl.getBoundingClientRect().top;
    let seen = null;
    for (const el of sections) {
      if (el.getBoundingClientRect().top - top <= 24) seen = el;
    }
    const el = atEnd ? sections[sections.length - 1] : seen;
    if (el) current = el.id.replace('st-sec-', '');
  }

  function openKeys() {
    toKeys = true;
    close();
  }
</script>

{#snippet keys()}
  <button type="button" class="st-keys" title={ta('tip.shortcuts.open')} onclick={openKeys}>{@html ICONS.keyboard}<span>{ta('shortcuts.title')}</span><kbd>?</kbd></button>
{/snippet}

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="st-overlay dx dx-large" bind:this={dialogEl} use:fadingDialog out:dialogOut|global aria-labelledby="st-title" onclose={onClosed}
  onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
  onclick={(e) => downOnBackdrop && e.target === e.currentTarget && close()}>
  {#if ed.settingsPlace === 'sheet'}
    <div class="st-card st-sheet">
      <div class="st-head">
        <h2 id="st-title">{ta('settings.title')}</h2>
        <input type="text" class="st-search" placeholder={ta('settings.find')} aria-label={ta('settings.find')} bind:value={query} />
        <span class="st-version">{ta('settings.version', { version: ed.pluginEngine })}</span>
        <button type="button" class="st-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={close}>{@html ICONS.cross}</button>
      </div>
      <div class="st-sheet-cols">
        <div class="st-col st-col-look" {@attach keepPlace('sheet-look', query)}>
          <SettingsBody place="sheet" only="look" {query} idPrefix="st-look" empty={false} />
          {#if !navGroups.length}<p class="st-empty">{ta('settings.noMatch')}</p>{/if}
        </div>
        <div class="st-col st-col-plain" {@attach keepPlace('sheet-plain', query)}>
          <SettingsBody place="sheet" only="plain" {query} idPrefix="st-plain" empty={false} />
          {@render keys()}
        </div>
      </div>
    </div>
  {:else}
    <div class="st-card st-dialog">
      <nav class="st-nav" aria-label={ta('settings.title')}>
        <h2 id="st-title">{ta('settings.title')}</h2>
        <input type="text" class="st-search" placeholder={ta('settings.find')} aria-label={ta('settings.find')} bind:value={query} />
        <div class="st-nav-list">
          {#each navBands as band (band.id)}
            <span class="st-nav-band" title={ta(band.tipKey)}>{ta(band.labelKey)}</span>
            {#each band.groups as group (group.id)}
              {@const lists = listsSettings(group)}
              {@const open = lists && (held === group.id || rested === group.id)}
              <div class="st-nav-entry" role="presentation" onpointerenter={(e) => restOn(e, group.id)} onpointerleave={(e) => restOff(e, group.id)}>
                <button type="button" class="st-nav-item" aria-current={marked === group.id ? 'true' : undefined}
                  aria-expanded={lists ? open : undefined} aria-controls={lists ? `st-nav-sub-${group.id}` : undefined} onclick={() => jump(group.id)}>
                  {@html ICONS[GROUP_ICONS[group.id]] ?? ''}<span class="st-nav-name">{ta(group.labelKey)}</span>
                  {#if group.shared}<span class="st-nav-shared" title={ta('tip.settings.shared')}>{ta('settings.shared')}</span>{/if}
                </button>
                {#if lists}
                  <!-- The section's settings, each a way to its row; folded, they are out of reach of the keys and the screen reader -->
                  <div class="st-nav-sub" class:open id={`st-nav-sub-${group.id}`} inert={!open}>
                    <div class="st-nav-sub-items">
                      {#each group.settings as s (s.id)}
                        <button type="button" class="st-nav-subitem" class:child={!!s.parent} onclick={() => jumpTo(group.id, s.id)}>{ta(s.labelKey)}</button>
                      {/each}
                    </div>
                  </div>
                {/if}
              </div>
            {/each}
          {/each}
        </div>
        <span class="st-nav-end"></span>
        {@render keys()}
        <span class="st-version">{ta('settings.version', { version: ed.pluginEngine })}</span>
      </nav>
      <div class="st-content" bind:this={contentEl} onscroll={track} {@attach keepPlace('dialog', query)}>
        <button type="button" class="st-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={close}>{@html ICONS.cross}</button>
        <SettingsBody place="dialog" {query} />
      </div>
    </div>
  {/if}
</dialog>

<style>
  .st-overlay {
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    width: 100vw;
    max-width: none;
    height: 100vh;
    max-height: none;
    margin: 0;
    padding: 1rem;
    color: var(--urd-color-text, #e8eaf0);
    background: transparent;
    border: 0;
    font-family: var(--urd-font-body, system-ui, sans-serif);
  }

  .st-overlay[open] {
    display: grid;
    place-items: center;
  }

  .st-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  .st-card {
    box-sizing: border-box;
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  /* The dialog: the sections down the left on the darker ground, the rows at the right in their own scroll */
  .st-dialog {
    display: grid;
    grid-template-columns: 15rem minmax(0, 1fr);
    width: min(1040px, 100%);
    height: min(720px, 100%);
  }

  .st-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    box-sizing: border-box;
    min-height: 0;
    padding: 1.1rem 0.8rem;
    background: var(--urd-color-bg, #0f1218);
    border-right: 1px solid rgb(255 255 255 / 8%);
  }

  .st-nav h2,
  .st-head h2 {
    margin: 0 0 0.6rem;
    padding: 0 0.5rem;
    font-size: 1.05rem;
  }

  .st-head h2 {
    margin: 0;
    padding: 0;
  }

  .st-search {
    box-sizing: border-box;
    width: 100%;
    height: 2.1rem;
    margin-bottom: 0.6rem;
    padding: 0 0.6rem;
    font: inherit;
    font-size: 0.82rem;
    color: inherit;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
  }

  /* The list scrolls on its own where the window is too low for every section */
  .st-nav-list {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  /* An entry and its settings, the entry across the list's width as the entries stand */
  .st-nav-entry {
    display: flex;
    flex-direction: column;
  }

  /* An entry's settings: folded to nothing until the entry opens, then growing to their height and back, at once with reduced motion */
  .st-nav-sub {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.2s ease;
  }

  .st-nav-sub.open {
    grid-template-rows: 1fr;
  }

  .st-nav-sub-items {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-height: 0;
    overflow: hidden;
    padding-left: 1.85rem;
  }

  .st-nav-sub.open .st-nav-sub-items {
    padding-block: 0.15rem 0.35rem;
  }

  .st-nav-subitem {
    display: flex;
    justify-content: flex-start;
    padding: 0.3rem 0.6rem;
    font: inherit;
    font-size: 0.8rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;
    opacity: 0.78;
  }

  .st-nav-subitem.child {
    padding-left: 1.2rem;
  }

  .st-nav-subitem:hover,
  .st-nav-subitem:focus-visible {
    background: rgb(255 255 255 / 6%);
    opacity: 1;
  }

  .st-nav-subitem:focus-visible,
  .st-nav-item:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .st-nav-sub {
      transition: none;
    }
  }

  /* A group's name over its sections, as the row kit's sub-headings stand */
  .st-nav-band {
    padding: 0.7rem 0.6rem 0.25rem;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .st-nav-band:first-child {
    padding-top: 0.1rem;
  }

  .st-nav-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.45rem 0.6rem;
    font: inherit;
    font-size: 0.88rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 8px;
  }

  .st-nav-item:hover {
    background: rgb(255 255 255 / 6%);
  }

  /* The section in view: its name on a faint accent surface, never a line at the edge */
  .st-nav-item[aria-current='true'] {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .st-nav-item :global(svg) {
    flex: none;
    width: 16px;
    height: 16px;
  }

  .st-nav-name {
    flex: 1;
    min-width: 0;
  }

  .st-nav-shared {
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--urd-color-accent, #7c5cff);
  }

  .st-nav-end {
    flex: 1;
  }

  .st-keys {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.55rem 0.6rem;
    font: inherit;
    font-size: 0.88rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
  }

  .st-keys:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .st-keys span {
    flex: 1;
  }

  .st-keys kbd {
    padding: 0 0.4rem;
    font: 600 11px/1.5 system-ui, sans-serif;
    border: 1px solid rgb(255 255 255 / 22%);
    border-bottom-width: 2px;
    border-radius: 5px;
  }

  .st-version {
    padding: 0.5rem 0.6rem 0;
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .st-content {
    position: relative;
    min-height: 0;
    padding: 1.1rem 1.5rem 1.2rem;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .st-close {
    position: absolute;
    top: 0.7rem;
    right: 0.8rem;
    display: grid;
    place-items: center;
    width: 2.2rem;
    height: 2.2rem;
    color: inherit;
    cursor: pointer;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 8px;
  }

  .st-close:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  /* The sheet: the head across the top, the look at the left on the surface and the rows at the right on the darker ground */
  .st-sheet {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    width: min(1180px, 100%);
    height: min(760px, 100%);
  }

  .st-head {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.9rem 1.2rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .st-head h2 {
    flex: 1;
  }

  .st-head .st-search {
    width: 16rem;
    margin: 0;
    background: var(--urd-color-bg, #0f1218);
  }

  .st-head .st-version {
    padding: 0;
  }

  .st-head .st-close {
    position: static;
  }

  .st-sheet-cols {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 24rem;
    min-height: 0;
  }

  .st-col {
    min-height: 0;
    padding: 1rem 1.3rem 1.2rem;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .st-col-plain {
    display: flex;
    flex-direction: column;
    background: var(--urd-color-bg, #0f1218);
  }

  .st-col-plain .st-keys {
    margin-top: auto;
  }

  .st-empty {
    margin: 0.5rem 0;
    font-size: 0.85rem;
    opacity: 0.65;
  }
</style>
