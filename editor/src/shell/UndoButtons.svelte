<script>
  /* Undo, redo and the session's steps, right after the page switcher: the arrows greyed when there is nothing to take back or bring back, their tooltips naming the step, and the caret opening the steps newest first, the undone ones greyed above «now», and at the foot «Discard drafts» with «Redo everything» beside it while there is something to bring back.
     A step's row goes back to just after it, or forward to an undone one, in one go (historyState.goSteps); the steps are kept in this browser over a reload (lib/history-store.js).
     A tool menu as the top bar's others (ed.toolMenu 'steps'), which stays open through a jump between steps and through the discard's question, and closes on a press outside it or Escape. */
  import { getContext } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import { stepKind } from '../lib/history-model.js';

  const ed = getContext('urd-editor');
  const steps = $derived(ed.steps);
  const open = $derived(ed.toolMenu === 'steps');
  /** The redo steps above «now», the farthest first. */
  const ahead = $derived([...steps.redo].reverse());

  /** A step in words: its kind of change, and the page it was made on where it was made on one. */
  function label(step) {
    const kind = stepKind(step.key, { typed: step.typed });
    const page = kind.onPage ? ed.siteDraft?.pages?.find((p) => p.id === step.pageId)?.title : null;
    return { text: ta(kind.labelKey), page, icon: ICONS[kind.icon] ?? ICONS.pencil };
  }

  /** How long ago a step was made, in the admin's language: «now» under a minute. */
  function ago(at) {
    const seconds = Math.round((Date.now() - (at || Date.now())) / 1000);
    if (seconds < 60) return ta('history.now');
    const minutes = Math.round(seconds / 60);
    let format;
    try {
      format = new Intl.RelativeTimeFormat(adminLang(), { style: 'narrow', numeric: 'auto' });
    } catch {
      format = new Intl.RelativeTimeFormat(undefined, { style: 'narrow', numeric: 'auto' });
    }
    return minutes < 60 ? format.format(-minutes, 'minute') : format.format(-Math.round(minutes / 60), 'hour');
  }

  /**
   * «Discard drafts» at the menu's foot: the top bar's discard (publishState.discard, one undo step back to the published version), asked first since it takes every unpublished change at once.
   * The drafts come back in one press: «Redo everything» in the message that follows and at the menu's foot undoes the discard.
   */
  async function discardAll() {
    const ok = await ed.askConfirm({ title: ta('confirm.discardDrafts'), lines: [ta('confirm.discardDraftsLine')], okLabel: ta('ui.discard'), danger: true });
    if (!ok || !ed.confirmDiscard()) return;
    ed.setStatus(ta('ui.discarded'), 'info', { label: ta('ui.redoAll'), run: () => redoAll() });
  }

  /** The undone steps «Redo everything» brings back: the nearest ones up to a discard, which it never redoes, since that would take the drafts again. */
  const redoCount = $derived.by(() => {
    const at = steps.redo.findIndex((step) => step.key === 'discard');
    return at === -1 ? steps.redo.length : at;
  });
  /** Right after a discard, with nothing to redo before one: «Redo everything» undoes the discard. */
  const discardOnTop = $derived(!redoCount && steps.undo[0]?.key === 'discard');
  function redoAll() {
    if (redoCount) ed.goSteps('forward', redoCount);
    else if (discardOnTop) ed.undo();
  }

  const undoTip = $derived(steps.undo.length ? ta('tip.undoStep', { step: label(steps.undo[0]).text }) : ta('tip.undoNone'));
  const redoTip = $derived(steps.redo.length ? ta('tip.redoStep', { step: label(steps.redo[0]).text }) : ta('tip.redoNone'));
</script>

<span class="toolmenu undo-group" role="group" aria-label={ta('history.title')}>
  <button type="button" class="ghost undo-btn" disabled={!steps.undo.length} title={undoTip} aria-label={undoTip} onclick={() => ed.undo()}>{@html ICONS.undo}</button>
  <button type="button" class="ghost undo-btn" disabled={!steps.redo.length} title={redoTip} aria-label={redoTip} onclick={() => ed.redo()}>{@html ICONS.redo}</button>
  <button type="button" class="ghost undo-caret" class:open disabled={!steps.undo.length && !steps.redo.length} title={ta('tip.steps')} aria-label={ta('tip.steps')} aria-expanded={open}
    onclick={() => (ed.toolMenu = open ? null : 'steps')}>{@html ICONS.caret}</button>
  {#if open}
    <div class="tool-pop steps-pop" role="dialog" aria-label={ta('history.title')}>
      <span class="steps-head"><b>{ta('history.title')}</b><small>{ta('history.kept')}</small></span>
      <div class="steps-list">
        {#each ahead as step, i (`r${i}`)}
          {@const l = label(step)}
          <!-- An undone step: forward to it, as many redos as it stands from «now» -->
          <button type="button" class="ghost step-row step-ahead" title={ta('tip.stepForward')} onclick={() => ed.goSteps('forward', ahead.length - i)}>
            <span class="step-ico">{@html l.icon}</span><span class="step-words">{l.text}{#if l.page}<span class="step-page">{` · ${l.page}`}</span>{/if}</span><small>{ta('history.undone')}</small>
          </button>
        {/each}
        {#each steps.undo as step, i (`u${i}`)}
          {@const l = label(step)}
          <button type="button" class="ghost step-row" class:step-now={i === 0} title={i === 0 ? ta('tip.stepNow') : ta('tip.stepBack')} aria-current={i === 0 ? 'step' : undefined}
            onclick={() => { if (i) ed.goSteps('back', i); }}>
            <span class="step-ico">{@html l.icon}</span><span class="step-words">{l.text}{#if l.page}<span class="step-page">{` · ${l.page}`}</span>{/if}</span><small>{ago(step.at)}</small>
          </button>
        {/each}
      </div>
      <span class="steps-sep" aria-hidden="true"></span>
      <!-- The two ends: every draft discarded, and every undone step (or the discard) brought back -->
      <span class="steps-foot">
        <button type="button" class="ghost step-row step-start" disabled={!ed.dirty} title={ta('tip.discard')} onclick={discardAll}>
          <span class="step-ico" aria-hidden="true">{@html ICONS.restore}</span><span class="step-words">{ta('ui.discard')}</span>
        </button>
        {#if redoCount || discardOnTop}
          <button type="button" class="ghost step-row step-redo-all" title={ta('tip.redoAll')} onclick={redoAll}>
            <span class="step-ico">{@html ICONS.redo}</span><span class="step-words">{ta('ui.redoAll')}</span>
          </button>
        {/if}
      </span>
    </div>
  {/if}
</span>

<style>
  /* The three read as one control, as the devices' buttons do */
  .undo-group {
    display: inline-flex;
    align-items: center;
    gap: 0;
    padding: 2px;
    border: 1px solid rgb(255 255 255 / 11%);
    border-radius: 8px;
  }

  .undo-btn,
  .undo-caret {
    display: grid;
    place-items: center;
    height: 1.9rem;
    padding: 0 0.45rem;
    background: transparent;
    border-color: transparent;
  }

  .undo-btn:hover:not(:disabled),
  .undo-caret:hover:not(:disabled) {
    background: rgb(255 255 255 / 8%);
  }

  .undo-caret {
    padding: 0 0.25rem;
  }

  .undo-btn:disabled,
  .undo-caret:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .undo-caret.open {
    background: rgb(255 255 255 / 13%);
  }

  /* As wide as the longest step needs, from 21rem to 30rem; a longer one is cut short with an ellipsis */
  .steps-pop {
    width: max-content;
    min-width: 21rem;
    max-width: min(30rem, calc(100vw - 2rem));
  }

  .steps-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.3rem 0.55rem 0.4rem;
  }

  .steps-head small {
    font-size: 0.72rem;
    opacity: 0.6;
  }

  /* One column the rows can never widen past the menu: the words give way, never the time */
  .steps-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2px;
    max-height: min(24rem, 60vh);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .step-row {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.55rem;
    text-align: left;
    background: transparent;
    border-color: transparent;
  }

  /* A row's hover is a faint surface, without the shell's button border */
  .step-row:hover:not(:disabled) {
    background: rgb(255 255 255 / 7%);
    border-color: transparent;
  }

  /* The time at the row's right edge */
  .step-row small {
    flex: none;
    margin-left: auto;
    padding-left: 0.6rem;
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    opacity: 0.6;
  }

  .step-ico {
    display: grid;
    flex: none;
    place-items: center;
    width: 1.1rem;
    opacity: 0.75;
  }

  .step-ico :global(svg) {
    width: 14px;
    height: 14px;
  }

  .step-words {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .step-page {
    opacity: 0.6;
  }

  /* The steps undone stand greyed above «now» */
  .step-ahead {
    opacity: 0.5;
  }

  .step-ahead:hover {
    opacity: 0.85;
  }

  /* «now»: the step the draft stands on, on a faint accent surface, never a line at the edge */
  .step-row.step-now,
  .step-row.step-now:hover:not(:disabled) {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  /* «Discard drafts» takes every unpublished change, so it stands in the panels' dark red */
  .step-row.step-start:not(:disabled) {
    background: rgb(150 35 35 / 30%);
    color: #f2b8b3;
  }

  .step-row.step-start:hover:not(:disabled) {
    background: rgb(150 35 35 / 48%);
  }

  .step-row.step-start:disabled {
    opacity: 0.4;
  }

  /* The foot: «Discard drafts» takes the row, «Redo everything» stands at its right while there is something to bring back */
  .steps-foot {
    display: flex;
    gap: 4px;
  }

  .steps-foot .step-start {
    flex: 1 1 auto;
    width: auto;
    min-width: 0;
  }

  .step-row.step-redo-all {
    flex: none;
    width: auto;
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .step-row.step-redo-all:hover:not(:disabled) {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 28%, transparent);
  }

  .steps-sep {
    height: 1px;
    margin: 0.25rem 0.2rem;
    background: rgb(255 255 255 / 10%);
  }
</style>
