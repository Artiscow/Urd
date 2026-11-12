<script>
  /* The Drafts window (ADR-0032, state/drafts.svelte.js): opened from the Drafts tab in the System section, it stands over the canvas beside the work (lib/FloatWindow.svelte), dragged by its head.
     Its head names it, with the striped «W.I.P.» tag while Drafts is being finished, «Move back to the drafts tab» while it stands where it was dragged, a «⋯» menu (this browser's name, «Autosave»), which opens on a mouse's rest and so keeps no tooltip, the fold to a pill, the pin that keeps it open while the owner edits, and Close.
     Three tabs say where each change stands, the one with something new opening first:
     This browser: each part that stands here alone, ticked to be saved or unticked to be kept for later; a row leads to the change, and a part saved on another device since says so under it. «Save ticked…» opens a one-line note in place, which travels with the save; Enter saves.
     Saved: every saved draft (lib/SavedRows.svelte), with what changed, looked at in the canvas (previewState.startLook), on the phone or in a tab of its own, kept beside this browser's version, or opened here by choice.
     Live: the last publishes, with the way to History.
     Unpinned, a press outside it (its tab and the questions it asks excepted) or Escape closes it; opened by a rest on its tab, it closes as the mouse leaves (state/drafts.svelte.js), unless a press in it keeps it. Folded, it is a pill in the canvas's corner with the counts and the dot, which opens it again where it stood. */
  import { getContext, tick } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { ICONS } from '../lib/icons.js';
  import { PART_KINDS } from '../lib/part-kinds.js';
  import { stepsForPart } from '../lib/unpublished.js';
  import { timeAgo } from '../lib/time-ago.js';
  import { thumbThemeStyle } from '../lib/thumb-theme.js';
  import { menuMotion, rowMotion } from '../lib/motion.svelte.js';
  import FloatWindow from '../lib/FloatWindow.svelte';
  import SavedRows from '../lib/SavedRows.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import EmptyState from '../lib/rows/EmptyState.svelte';
  const ed = getContext('urd-editor');

  const GRIP = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg>';
  /** The three tabs, each with the colour of where its changes stand. */
  const TABS = [
    { id: 'browser', word: 'drafts.tab.browser', tone: 'browser' },
    { id: 'saved', word: 'saved.band.saved', tone: 'saved' },
    { id: 'live', word: 'drafts.tab.live', tone: 'live' },
  ];

  let windowEl = $state(null);
  /** The parts that stand in this browser alone. */
  const here = $derived(ed.savedRows.filter((r) => r.band === 'browser'));
  const thumbStyle = $derived(thumbThemeStyle(ed.siteDraft));
  const ago = (at) => timeAgo(at, adminLang()) || ta('history.now');
  const nameOf = (part) => part.name ?? ta(PART_KINDS[part.kind]?.name ?? 'unpublished.site');
  const ticked = (part) => !ed.draftsLater.includes(part.part);

  /** The pages' drafts here, for their pictures: the open page's as it stands, another's as it is stored, read again only when its stored text has changed. */
  const parsed = new Map();
  function storedDoc(id) {
    const text = localStorage.getItem(`urd-draft-${id}`);
    const kept = parsed.get(id);
    if (kept?.text === text) return kept.doc;
    let doc = null;
    try {
      doc = JSON.parse(text ?? 'null');
    } catch { /* a draft that cannot be read is drawn by its sign */ }
    if (!doc?.sections) doc = null;
    parsed.set(id, { text, doc });
    return doc;
  }
  const hereDocs = $derived.by(() => {
    void ed.edits;
    const docs = {};
    for (const r of here) {
      if (r.kind !== 'page') continue;
      const doc = r.id === ed.pageId && ed.store ? ed.store.data : storedDoc(r.id);
      if (doc) docs[r.part] = doc;
    }
    return docs;
  });

  /** A part's line: when it was last changed, and that it is kept for later where unticked. */
  function lineOf(part) {
    const steps = stepsForPart(part, ed.steps.undo, ed.publishedAt);
    const kind = PART_KINDS[part.kind]?.word;
    const words = [steps.length ? ta('drafts.changed', { when: ago(steps[0].at) }) : kind ? ta(kind) : ''];
    if (!ticked(part)) words.push(ta('drafts.later'));
    return words.filter(Boolean).join(' · ');
  }

  /** The tabs: the arrow keys move between them, as a tab list's do. */
  function tabKeys(event) {
    const at = TABS.findIndex((t) => t.id === ed.draftsTab);
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = TABS[(at + step + TABS.length) % TABS.length];
    ed.showDraftsTab(next.id);
    tick().then(() => windowEl?.querySelector(`[data-tab="${next.id}"]`)?.focus());
  }

  /** «Save ticked…»: the note's field in place of the button, then the save; as the field goes, the focus goes back to «Save ticked…», or to the window's tab where nothing is left to save. */
  let noteOpen = $state(false);
  let note = $state('');
  let noteEl = $state(null);
  async function openNote() {
    noteOpen = true;
    await tick();
    noteEl?.focus();
  }
  async function closeNote() {
    noteOpen = false;
    await tick();
    (windowEl?.querySelector('.dw-save:not(:disabled)') ?? windowEl?.querySelector('[role="tab"][aria-selected="true"]'))?.focus();
  }
  async function saveWithNote() {
    const saved = await ed.saveTicked(note.trim());
    if (saved) {
      note = '';
      await closeNote();
    }
  }
  /** The note's keys: Enter saves (the form), Escape closes the field, and Ctrl+S saves with the note as written. */
  function noteKeys(event) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      void closeNote();
    } else if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 's') {
      event.preventDefault();
      event.stopPropagation();
      void saveWithNote();
    }
  }
  const saveLabel = $derived(ed.draftsTicked.length === 1
    ? ta('drafts.saveOne', { name: nameOf(here.find((r) => r.part === ed.draftsTicked[0]) ?? { kind: 'site' }) })
    : ta('drafts.saveN', { n: ed.draftsTicked.length }));
  const allTicked = $derived(here.length > 0 && here.every(ticked));

  /** The «⋯» menu, with this browser's name edited in place: a mouse resting on the «⋯» opens it, and it closes a moment after the mouse has left the «⋯» and the menu, unless a press or the focus keeps it. */
  let moreOpen = $state(false);
  let moreByRest = false;
  let moreTimer = 0;
  const moreHover = { button: false, menu: false };
  /** The «⋯» menu closed, the mouse's place on it forgotten, since a menu taken away under the mouse is never left. */
  function closeMore() {
    clearTimeout(moreTimer);
    moreOpen = false;
    moreByRest = false;
    moreHover.menu = false;
  }
  function moreRest(part, on, event) {
    if (event.pointerType !== 'mouse') return;
    moreHover[part] = on;
    clearTimeout(moreTimer);
    if (on && part === 'button' && !moreOpen) {
      moreTimer = setTimeout(() => {
        moreOpen = true;
        moreByRest = true;
      }, 180);
    } else if (!on && moreOpen && moreByRest) {
      moreTimer = setTimeout(() => {
        if (moreByRest && !moreHover.button && !moreHover.menu && !document.activeElement?.closest?.('.dw-more')) closeMore();
      }, 280);
    }
  }
  function pressMore() {
    clearTimeout(moreTimer);
    if (moreOpen && moreByRest) moreByRest = false;
    else if (moreOpen) closeMore();
    else moreOpen = true;
  }
  $effect(() => () => clearTimeout(moreTimer));
  /** This browser's name, a field always shown in the menu: Enter or leaving the field keeps what was typed, Escape puts back the name it had. */
  let nameText = $state('');
  let nameEl = $state(null);
  $effect(() => {
    if (moreOpen) nameText = ed.browserName;
  });
  function keepName() {
    ed.setBrowserName(nameText);
    nameText = ed.browserName;
  }

  /** A line of what changed in words: the block or section by its own words, else by its kind or place. */
  function lineText(line) {
    const name = line.words || (line.type ? ed.blockLabel(line.type) : ta('diff.section', { n: (line.index ?? 0) + 1 }));
    return ta(`diff.${line.kind}`, { name });
  }

  /** A line of what changed: the saved version looked at in the canvas, scrolled to where it changed once it is drawn; a part taken away has no place in the saved version, so the look stays where it is. */
  async function lookAtLine(row, line) {
    if (ed.looking?.part !== row.part) await ed.lookAt(row.part, {});
    if (ed.looking?.part !== row.part || line.kind.endsWith('Removed')) return;
    setTimeout(() => ed.bridge?.sendScrollSection(line.sectionId), 120);
  }

  /** «Open here» and «Use …'s»: a look at the saved version ends first, so the canvas follows the opening. */
  function openRow(row) {
    if (ed.looking) ed.endLook();
    void ed.openSaved(row.part);
  }

  function openHistory() {
    if (!ed.draftsPinned) ed.closeDrafts();
    ed.openPanel('history');
  }

  /** Unpinned, a press outside the window, its tab and the questions it asks closes it, as Escape does; Escape first closes the «⋯» menu where it stands open, and leaves a menu standing elsewhere in the admin (a tool's, the element menu) to close on its own. */
  $effect(() => {
    if (!ed.draftsOpen) return;
    const onDown = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (moreOpen && !target?.closest('.dw-more, .dw-more-btn')) closeMore();
      if (target?.closest('.dw-more')) moreByRest = false;
      if (target?.closest('.drafts-window')) ed.keepDrafts();
      if (ed.draftsPinned || !target || target.closest('.drafts-window, [data-drafts-tab], dialog, .confirm-dialog')) return;
      ed.closeDrafts();
    };
    const onKey = (e) => {
      if (e.key !== 'Escape' || e.defaultPrevented || ed.confirmBox || ed.looking || (e.target instanceof Element && e.target.closest('dialog'))) return;
      const inside = e.target instanceof Element && e.target.closest('.drafts-window, [data-drafts-tab]');
      if (!inside && (ed.toolMenu || ed.blockMenu)) return;
      if (moreOpen) {
        closeMore();
        return;
      }
      if (!ed.draftsPinned) ed.closeDrafts();
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey);
    };
  });
  /** Closed, the window forgets its «⋯» menu and a note half written; opened by a press or a key, it takes the focus on its open tab. */
  $effect(() => {
    if (!ed.draftsOpen) {
      closeMore();
      noteOpen = false;
      note = '';
    }
  });
  let focusShown = 0;
  $effect(() => {
    const asked = ed.draftsFocusAsked;
    if (!ed.draftsOpen || !windowEl || asked === focusShown) return;
    focusShown = asked;
    windowEl.querySelector('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true });
  });
</script>

{#if ed.draftsOpen}
  <FloatWindow label={ta('panel.drafts')} place={ed.draftsPlace} anchor={ed.draftsAnchor} onmove={ed.moveDrafts} class="drafts-window" bind:el={windowEl}
    onenter={(e) => ed.restOnDraftsWindow(true, e)} onleave={(e) => ed.restOnDraftsWindow(false, e)}>
    {#snippet head()}
      <span class="dw-grip" aria-hidden="true">{@html GRIP}</span>
      <h2 class="dw-title">{ta('panel.drafts')}</h2>
      <span class="wip-tag" title={ta('drafts.wipTip')}>{ta('drafts.wip')}</span>
      <span class="dw-space"></span>
      {#if ed.draftsPlace}
        <IconButton icon={ICONS.reset} size="sm" quiet label={ta('drafts.backToTab')} onclick={() => ed.resetDraftsPlace()} />
      {/if}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="dw-more-wrap" onpointerenter={(e) => moreRest('button', true, e)} onpointerleave={(e) => moreRest('button', false, e)}>
        <IconButton icon={ICONS.kebab} size="sm" quiet tip={false} class="dw-more-btn" label={ta('drafts.more')} expanded={moreOpen} onclick={pressMore} />
      </span>
      <IconButton icon={ICONS.foldPill} size="sm" quiet label={ta('drafts.pill')} onclick={() => ed.foldDraftsToPill()} />
      <IconButton icon={ed.draftsPinned ? ICONS.pinOn : ICONS.pin} size="sm" quiet label={ta('drafts.pin')} pressed={ed.draftsPinned} onclick={() => ed.setDraftsPinned(!ed.draftsPinned)} />
      <IconButton icon={ICONS.cross} size="sm" quiet label={ta('ui.close')} onclick={() => ed.closeDrafts()} />
    {/snippet}

    {#if moreOpen}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="dw-more" role="group" aria-label={ta('drafts.more')} transition:menuMotion onpointerenter={(e) => moreRest('menu', true, e)} onpointerleave={(e) => moreRest('menu', false, e)}>
        <form class="dw-name" onsubmit={(e) => { e.preventDefault(); keepName(); nameEl?.blur(); }}>
          <div class="dw-name-row">
            <span class="dw-name-sign" aria-hidden="true">{@html ICONS.device_laptop}</span>
            <span class="dw-name-word" aria-hidden="true">{ta('drafts.thisBrowser')}</span>
            <input bind:this={nameEl} bind:value={nameText} maxlength="40" placeholder={ta('drafts.namePlaceholder')} aria-label={ta('drafts.thisBrowser')} onblur={keepName}
              onkeydown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); nameText = ed.browserName; nameEl?.blur(); } }} />
          </div>
        </form>
        <div class="dw-switch"><SwitchRow label={ta('drafts.autoSave')} title={ta('tip.drafts.autoSave')} checked={ed.autoSave} onchange={(v) => ed.setAutoSave(v)} /></div>
      </div>
    {/if}

    <div class="dw-tabs" role="tablist" aria-label={ta('drafts.tabs')} tabindex="-1" onkeydown={tabKeys}>
      {#each TABS as t (t.id)}
        {@const on = ed.draftsTab === t.id}
        <button type="button" role="tab" class="dw-tab tone-{t.tone}" class:on aria-selected={on} aria-controls="drafts-tab-body" tabindex={on ? 0 : -1} data-tab={t.id}
          onclick={() => ed.showDraftsTab(t.id)}>
          <i aria-hidden="true"></i>{ta(t.word)}{#if t.id === 'browser' && ed.draftsWaiting}<span class="dw-n">{ed.draftsWaiting}</span>{:else if t.id === 'saved' && ed.draftsSaved}<span class="dw-n">{ed.draftsSaved}</span>{/if}{#if t.id === 'saved' && ed.draftsFresh}<span class="update-dot legal-dot update-dot-inline" aria-hidden="true"></span>{/if}
        </button>
      {/each}
    </div>

    <div class="dw-body" id="drafts-tab-body" role="tabpanel">
      {#if ed.savedAvailable === false && ed.draftsTab !== 'live'}
        <EmptyState text={ta('tip.save.unavailable')} />
      {:else if ed.draftsTab === 'browser'}
        {#if here.length}
          <div class="dw-label"><span class="dw-band tone-browser"><i aria-hidden="true"></i>{ta('saved.band.browser')}</span>
            <button type="button" class="dw-link" onclick={() => ed.tickAll(here.map((r) => r.part))}>{ta(allTicked ? 'drafts.untickAll' : 'drafts.tickAll')}</button></div>
          <div class="dw-rows" role="list">
            {#each here as part (part.part)}
              {@const on = ticked(part)}
              {@const doc = hereDocs[part.part]}
              <div class="dw-item" class:later={!on} role="listitem">
                <div class="dw-row">
                  <input type="checkbox" class="tick-box dw-tick" checked={on} aria-label={nameOf(part)} title={ta('tip.drafts.tick')} onchange={() => ed.toggleLater(part.part)} />
                  <button type="button" class="dw-go" title={ta('tip.unpublished.go', { name: nameOf(part) })} onclick={() => ed.goToUnpublished(part)}>
                    <span class="saved-pic dw-pic" class:drawn={Boolean(doc)} style={doc ? thumbStyle : undefined} aria-hidden="true">{@html doc ? pageThumb(doc, { w: 34, h: 42, max: 4 }) : (PART_KINDS[part.kind]?.icon ?? '')}</span>
                    <span class="dw-words"><b>{nameOf(part)}</b><small>{lineOf(part)}</small></span>
                  </button>
                </div>
                {#if part.elsewhere}
                  <div class="dw-elsewhere">
                    <span>{ta('saved.elsewhere', { when: ed.whenSaved(part.elsewhere.savedAt), who: part.elsewhere.saver ?? '' })}</span>
                    <button type="button" class="ghost" title={ta('tip.saved.use')} onclick={() => ed.useSaved(part.part)}>{ta('saved.use')}</button>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <EmptyState text={ta('tip.save.nothing')} />
        {/if}
      {:else if ed.draftsTab === 'saved'}
        {#if ed.savedList.length}
          <SavedRows rows={ed.savedList} docOf={ed.savedDoc} whenOf={ed.whenSaved} themeStyle={thumbStyle}
            onopen={openRow} onremove={(row) => ed.removeSaved(row.part)}
            onlook={(row, opts) => ed.lookAt(row.part, opts)} ontab={(row) => ed.openSavedInTab(row.part)} onkeep={(row) => ed.keepBoth(row.part)}
            changesOf={ed.changesOf} {lineText} online={lookAtLine} />
        {:else}
          <EmptyState text={ta('drafts.savedEmpty')} />
        {/if}
      {:else}
        {#if ed.historyList === null}
          <EmptyState text={ta('hint.history.loading')} />
        {:else if ed.historyList.length}
          <div class="dw-rows" role="list">
            {#each ed.historyList.slice(0, 5) as c (c.sha)}
              <div class="dw-live" role="listitem"><span>{c.message}</span><small>{[c.author, c.date ? ago(new Date(c.date).getTime()) : ''].filter(Boolean).join(' · ')}</small></div>
            {/each}
          </div>
        {:else}
          <EmptyState text={ed.historyError || ta('drafts.liveEmpty')} />
        {/if}
      {/if}
    </div>

    {#if ed.draftsTab === 'browser' && here.length && ed.savedAvailable !== false}
      <div class="dw-foot">
        {#if noteOpen}
          <form class="dw-note" transition:rowMotion onsubmit={(e) => { e.preventDefault(); void saveWithNote(); }}>
            <input bind:this={noteEl} bind:value={note} maxlength="200" placeholder={ta('drafts.notePlaceholder')} title={ta('tip.drafts.note')} aria-label={ta('drafts.notePlaceholder')}
              onkeydown={noteKeys} />
            <div class="dw-acts">
              <button type="button" class="ghost" onclick={() => void closeNote()}>{ta('confirm.cancel')}</button>
              <button type="submit" class="primary" disabled={!ed.draftsTicked.length || ed.savedBusy || !ed.savedAvailable}>{saveLabel}</button>
            </div>
          </form>
        {:else}
          <div class="dw-acts">
            <button type="button" class="ghost dw-save" title={ta('tip.save')} disabled={!ed.draftsTicked.length || ed.savedBusy || !ed.savedAvailable} onclick={openNote}>{@html ICONS.save}<span>{ta('drafts.saveTicked')}</span></button>
          </div>
        {/if}
      </div>
    {:else if ed.draftsTab === 'live'}
      <div class="dw-foot">
        <button type="button" class="ghost dw-history" onclick={openHistory}>{@html ICONS.panel_history}<span>{ta('drafts.openHistory')}</span></button>
      </div>
    {/if}
  </FloatWindow>
{:else if ed.draftsPill}
  <!-- Folded: the counts and the dot in the canvas's corner; a press opens the window where it stood -->
  <button type="button" class="drafts-pill" title={ta('drafts.pillOpen')} aria-label={[ta('drafts.pillOpen'), ed.draftsWaiting ? ta(ed.draftsWaiting === 1 ? 'save.waiting.one' : 'save.waiting', { n: ed.draftsWaiting }) : '', ed.draftsFresh ? ta(ed.draftsFresh === 1 ? 'saved.news.one' : 'saved.news', { n: ed.draftsFresh }) : ''].filter(Boolean).join(', ')}
    onclick={() => ed.openDrafts()} transition:menuMotion>
    <span class="dp-count tone-browser" aria-hidden="true"><i></i>{ed.draftsWaiting}</span>
    <span class="dp-count tone-saved" aria-hidden="true"><i></i>{ed.draftsSaved}</span>
    {#if ed.draftsFresh}<span class="update-dot legal-dot update-dot-inline" aria-hidden="true"></span>{/if}
    <span class="dp-open" aria-hidden="true">{@html ICONS.chevronUp}</span>
  </button>
{/if}

<style>
  /* The colours of where a change stands: this browser's amber, the saved accent, the live green */
  .tone-browser { --tone: #e2b84a; }
  .tone-saved { --tone: var(--urd-color-accent, #7c5cff); }
  .tone-live { --tone: #5fbf8f; }

  .dw-grip {
    display: inline-flex;
    opacity: 0.45;
  }

  .dw-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
  }

  /* While Drafts is being finished: a striped tag after its name */
  .wip-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: repeating-linear-gradient(-45deg, #e2b84a 0 6px, #d6a93c 6px 12px);
    color: #1a1500;
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.3;
    cursor: help;
  }

  .dw-space {
    flex: 1 1 auto;
  }

  .dw-more-wrap {
    display: inline-flex;
  }

  /* The «⋯» menu, under the head at its right */
  .dw-more {
    position: absolute;
    top: 2.6rem;
    right: 0.5rem;
    z-index: 2;
    display: grid;
    gap: 2px;
    width: min(18rem, calc(100% - 1rem));
    padding: 6px;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 9px;
    background: var(--urd-color-surface, #151a23);
    box-shadow: 0 12px 26px rgb(0 0 0 / 45%);
  }

  .dw-switch {
    display: flex;
    align-items: center;
    min-height: 2rem;
    padding: 0 0.5rem;
    font-size: 0.82rem;
  }

  /* The switch at the row's right edge, as the panels draw one */
  .dw-switch :global(.row-switch) {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    gap: 0.5rem;
  }

  /* This browser's name: its word and a field that fills the rest of the row */
  .dw-name-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 0;
    padding: 0.15rem 0.5rem;
    font-size: 0.82rem;
  }

  .dw-name-sign {
    display: inline-flex;
    flex: none;
    opacity: 0.7;
  }

  .dw-name-word {
    flex: none;
    white-space: nowrap;
  }

  .dw-name-row input {
    flex: 1 1 0;
    width: 0;
    min-width: 0;
    box-sizing: border-box;
  }

  /* The tabs, each marked by the colour of where its changes stand */
  .dw-tabs {
    display: flex;
    gap: 2px;
    padding: 0 0.5rem;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
  }

  .dw-tab:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.55rem;
    border: 0;
    border-radius: 0;
    background: none;
    color: inherit;
    font: inherit;
    font-size: 0.82rem;
    opacity: 0.65;
    cursor: pointer;
  }

  .dw-tab.on {
    opacity: 1;
    box-shadow: inset 0 -2px 0 var(--urd-color-accent, #7c5cff);
  }

  .dw-tab i,
  .dw-band i,
  .dp-count i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--tone);
  }

  .dw-n {
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }

  .dw-body {
    display: grid;
    gap: 0.35rem;
    min-height: 6rem;
    padding: 0.5rem;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .dw-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
  }

  .dw-band {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.75;
  }

  .dw-link:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    padding: 0.1rem 0.3rem;
    border: 0;
    background: none;
    color: var(--urd-color-accent, #7c5cff);
    font: inherit;
    font-size: 0.76rem;
    cursor: pointer;
  }

  .dw-rows {
    display: grid;
    gap: 2px;
  }

  .dw-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding-left: 0.3rem;
    border-radius: 8px;
  }

  .dw-row:hover {
    background: rgb(255 255 255 / 5%);
  }

  .dw-tick {
    flex: none;
  }

  .dw-go:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: flex-start;
    gap: 0.55rem;
    min-width: 0;
    min-height: 2.8rem;
    padding: 0.3rem 0.4rem 0.3rem 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .later .dw-go {
    opacity: 0.6;
  }

  .dw-pic {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 34px;
    height: 42px;
    border-radius: 5px;
    background: rgb(255 255 255 / 5%);
    border: 1px solid rgb(255 255 255 / 10%);
    overflow: hidden;
  }

  .dw-pic.drawn {
    background: var(--urd-color-bg, #f3f2ee);
  }

  .dw-pic :global(svg) {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .dw-words {
    display: grid;
    min-width: 0;
  }

  .dw-words b {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.85rem;
  }

  .dw-words small,
  .dw-live small {
    font-size: 0.74rem;
    opacity: 0.65;
  }

  /* A part saved on another device since: the line under its row, with the way to take the saved one */
  .dw-elsewhere {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    padding: 0 0.4rem 0.35rem 2rem;
    color: #e2b84a;
    font-size: 0.76rem;
  }

  .dw-elsewhere span {
    flex: 1 1 10rem;
    min-width: 0;
  }

  .dw-live {
    display: grid;
    padding: 0.35rem 0.45rem;
    font-size: 0.82rem;
  }

  .dw-foot {
    padding: 0.5rem;
    border-top: 1px solid rgb(255 255 255 / 10%);
  }

  .dw-acts {
    display: flex;
    justify-content: flex-end;
    gap: 0.4rem;
  }

  .dw-save,
  .dw-history {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
  }

  /* The note in place of «Save ticked…»: the owner's words for this save, then the save */
  .dw-note {
    display: grid;
    gap: 0.4rem;
    padding: 0.5rem;
    border: 1px solid var(--urd-color-accent, #7c5cff);
    border-radius: 9px;
  }

  .dw-note input {
    width: 100%;
  }

  /* Folded: a pill in the canvas's corner */
  .drafts-pill:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 310;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    height: 2.2rem;
    padding: 0 0.35rem 0 0.8rem;
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 999px;
    background: var(--urd-color-surface, #151a23);
    box-shadow: 0 10px 24px rgb(0 0 0 / 40%);
    color: inherit;
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .dp-count {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-variant-numeric: tabular-nums;
  }

  .dp-open {
    display: inline-grid;
    place-items: center;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: rgb(255 255 255 / 7%);
  }
</style>
