<script module>
  let windows = 0;
</script>

<script>
  /* A reading window over the editor: a heading with a line under it, a body that scrolls, and a footer; Escape or a press outside closes it. */
  import { ta } from '$engine/i18n.js';
  import { fadingDialog, dialogOut } from './motion.svelte.js';
  import { ICONS } from './icons.js';

  let { title, onclose, lead = undefined, children, foot = undefined } = $props();
  let dialogEl = $state(null);
  const titleId = `rw-title-${++windows}`;
  // A press that starts and ends outside the card closes it, and a drag out of the card never does.
  let downOnBackdrop = false;
  const opener = document.activeElement;

  /** What a footer button does once the window is closed and the focus is back where it was. */
  let after = null;

  /** Closes the window, its fade first; a footer button hands over what it does next (`then`), run once the window is gone. */
  function close(then) {
    after = typeof then === 'function' ? then : null;
    dialogEl?.close();
  }

  function onClosed() {
    if (opener instanceof HTMLElement && opener.isConnected && opener !== document.body) opener.focus({ preventScroll: true });
    onclose?.();
    const next = after;
    after = null;
    next?.();
  }

  let bodyEl = $state(null);

  // The window opens with the focus on its body, which the keys then scroll.
  $effect(() => {
    if (!dialogEl || dialogEl.open) return;
    dialogEl.showModal();
    bodyEl?.focus({ preventScroll: true });
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="rw-overlay dx dx-large" bind:this={dialogEl} use:fadingDialog out:dialogOut|global aria-labelledby={titleId} onclose={onClosed}
  onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
  onclick={(e) => downOnBackdrop && e.target === e.currentTarget && close()}>
  <div class="rw-card">
    <header class="rw-head">
      <div class="rw-titles">
        <h2 id={titleId}>{title}</h2>
        {#if lead}<div class="rw-lead">{@render lead()}</div>{/if}
      </div>
      <button type="button" class="rw-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={() => close()}>{@html ICONS.cross}</button>
    </header>
    <div class="rw-body" bind:this={bodyEl} tabindex="-1">{@render children()}</div>
    {#if foot}<footer class="rw-foot">{@render foot(close)}</footer>{/if}
  </div>
</dialog>

<style>
  .rw-overlay {
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
  }

  .rw-overlay[open] {
    display: grid;
    place-items: center;
  }

  .rw-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  /* The card reads at a comfortable width and scrolls its body, its heading and footer standing still */
  .rw-card {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    box-sizing: border-box;
    width: min(780px, 100%);
    max-height: min(820px, 100%);
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 14px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  .rw-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.2rem 1.4rem 0.9rem;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
  }

  .rw-titles {
    display: grid;
    gap: 0.25rem;
    min-width: 0;
  }

  .rw-head h2 {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.25;
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .rw-lead {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.9rem;
    font-size: 0.85rem;
    opacity: 0.72;
  }

  .rw-close {
    display: grid;
    flex: none;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 8px;
  }

  .rw-close:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .rw-body {
    min-height: 0;
    padding: 1.1rem 1.4rem 1.3rem;
    overflow-y: auto;
    scrollbar-width: thin;
    font-size: 0.95rem;
    line-height: 1.55;
  }

  .rw-body:focus {
    outline: none;
  }

  /* The footer's buttons stand at one size, a closing one beside the action, whatever the panel around the window gives its own */
  .rw-foot :global(:is(.ghost, .primary)) {
    box-sizing: border-box;
    justify-content: center;
    min-height: 2.4rem;
    padding: 0.4em 1.1em;
  }

  .rw-foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 0.6rem;
    padding: 0.85rem 1.4rem;
    border-top: 1px solid rgb(255 255 255 / 10%);
  }
</style>
