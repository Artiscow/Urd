<script>
  /* The confirmation and prompt dialog the editor asks with before a step that cannot be undone, and where a deleted or hidden page's visitors go. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle.
     A modal <dialog> in the browser's top layer, so a question asked from another modal dialog (the page settings) stands above it; Escape cancels. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Dropdown from '../lib/Dropdown.svelte';

  const ed = getContext('urd-editor');
  let dialogEl = $state(null);

  $effect(() => {
    if (ed.confirmBox && dialogEl && !dialogEl.open) dialogEl.showModal();
  });

  /** Escape cancels, as the Cancel button does. */
  function onCancel(e) {
    e.preventDefault();
    ed.answerConfirm(false);
  }
</script>

{#if ed.confirmBox}
  {@const box = ed.confirmBox}
  <!-- A click on the backdrop cancels (same as the lightbox ::backdrop).
       Closing happens on click, not pointerdown, so the click finishes
       before the dialog disappears and never hits the panel below. -->
  <!-- The backdrop is a mouse shortcut: Escape is the keyboard path and
       the Cancel button the focusable one. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <dialog class="confirm-dialog" bind:this={dialogEl} aria-labelledby="confirm-title" oncancel={onCancel}
    onpointerdown={(e) => (ed.confirmDownOnOverlay = e.target === e.currentTarget)}
    onclick={(e) => ed.confirmDownOnOverlay && e.target === e.currentTarget && ed.answerConfirm(false)}>
    <div class="setup-card" class:confirm-wide={box.sections?.length}>
      <h2 id="confirm-title">{box.title}</h2>
      {#each box.lines as line (line)}
        <p class="panel-hint confirm-line">{line}</p>
      {/each}
      {#each box.sections ?? [] as section, i (i)}
        <section class="confirm-section">
          <h3>{section.heading}</h3>
          {#each section.lines as line, j (j)}
            <p class="panel-hint confirm-line">{line}</p>
          {/each}
        </section>
      {/each}
      {#if box.destination}
        {@const d = box.destination}
        <!-- Where the visitors of the address go: the front page, another page, or nowhere -->
        <div class="dest" role="radiogroup" aria-labelledby="dest-lead">
          <span class="confirm-line dest-lead" id="dest-lead">{d.lead}</span>
          <button type="button" class="dest-choice" class:on={d.choice === 'front'} role="radio" aria-checked={d.choice === 'front'}
            title={ta('tip.dest.front')} onclick={() => (d.choice = 'front')}><span class="dest-dot" aria-hidden="true"></span>{ta('dest.front')}</button>
          {#if d.options.length}
            <div class="dest-choice" class:on={d.choice === 'page'}>
              <button type="button" class="dest-pick" role="radio" aria-checked={d.choice === 'page'} title={ta('tip.dest.page')}
                onclick={() => (d.choice = 'page')}><span class="dest-dot" aria-hidden="true"></span>{ta('dest.page')}</button>
              <Dropdown value={d.page} options={d.options} title={ta('tip.dest.page')}
                onchange={(v) => { d.page = v; d.choice = 'page'; }} />
            </div>
          {/if}
          <button type="button" class="dest-choice" class:on={d.choice === 'none'} role="radio" aria-checked={d.choice === 'none'}
            title={ta('tip.dest.none')} onclick={() => (d.choice = 'none')}><span class="dest-dot" aria-hidden="true"></span>{ta('dest.none')}</button>
        </div>
      {/if}
      {#if box.prompt}
        <!-- svelte-ignore a11y_autofocus (single-field modal: focus belongs in the field) -->
        <input autofocus bind:value={box.value} placeholder={box.placeholder}
          onkeydown={(e) => e.key === 'Enter' && box.value.trim() && ed.answerConfirm(true)} />
      {/if}
      <span class="setup-actions">
        <button class="ghost" onclick={() => ed.answerConfirm(false)}>{box.cancelLabel}</button>
        <button class="primary" class:danger={box.danger} onclick={() => ed.answerConfirm(true)}>{box.okLabel}</button>
      </span>
    </div>
  </dialog>
{/if}

<style>
  /* An answer that undoes much: the panels' dark red, not the accent */
  .setup-actions .primary.danger {
    background: #8f2b2b;
    border-color: #b23b3b;
    color: #fff;
  }

  .setup-actions .primary.danger:hover {
    background: #a33434;
  }

  /* The card is the dialog's face; the dialog itself covers the window and centres it over a dimmed backdrop, so a press beside the card lands on the dialog */
  .confirm-dialog {
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    width: 100vw;
    max-width: none;
    height: 100vh;
    max-height: none;
    margin: 0;
    padding: 1rem;
    color: inherit;
    background: transparent;
    border: 0;
    overflow: visible;
  }

  .confirm-dialog[open] {
    display: grid;
    place-items: center;
  }

  .confirm-dialog::backdrop {
    background: rgb(0 0 0 / 55%);
  }

  .dest {
    display: grid;
    gap: 0.4rem;
  }

  .dest-lead {
    font-size: 0.88rem;
  }

  /* A choice as a tile with a drawn dot, the chosen one on a faint accent surface */
  .dest-choice {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    gap: 0.6rem;
    height: 2.7rem;
    padding: 0 0.75rem;
    font-size: 0.92rem;
    text-align: left;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
  }

  .dest-choice.on {
    border-color: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 70%, transparent);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 12%, transparent);
  }

  .dest-pick {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    gap: 0.6rem;
    align-self: stretch;
    padding: 0;
    text-align: left;
    background: transparent;
    border: 0;
  }

  /* The page to choose: a slim framed field on a faint fill of its own at the tile's right end, in the tile's own size, dimmed until the choice is taken */
  .dest-choice :global(.dd) {
    flex: 0 1 11rem;
    min-width: 0;
    margin-left: auto;
  }

  .dest-choice :global(.dd-btn) {
    height: 1.9rem;
    min-height: 0;
    padding: 0 0.55rem;
    font-size: 0.85rem;
    background: rgb(255 255 255 / 7%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .dest-choice:not(.on) :global(.dd-btn) {
    opacity: 0.7;
  }

  .dest-choice:has(.dest-pick) {
    padding-right: 0.4rem;
  }

  .dest-dot {
    flex: none;
    width: 13px;
    height: 13px;
    border: 2px solid currentColor;
    border-radius: 50%;
    opacity: 0.6;
  }

  .on .dest-dot {
    border-color: var(--urd-color-accent, #7c5cff);
    background: radial-gradient(circle, var(--urd-color-accent, #7c5cff) 40%, transparent 45%);
    opacity: 1;
  }
</style>
