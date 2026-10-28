<script>
  /**
   * The shortcut sheet (comparison/ELEMENTS.md E21): every key the editor answers to, in groups by where it works (shortcuts.js).
   * Opened by «?» on the page and in the panels, from the Urd settings and from the setup wizard.
   * A native modal dialog (ADR-0011): Escape is its own cancel, and a press outside its card closes it as it does the design picker.
   */
  import { ta } from '$engine/i18n.js';
  import { ICONS } from './icons.js';
  import { SHORTCUT_GROUPS, KEY_LABELS, POINTER_TOKENS, ARROW_TOKENS } from './shortcuts.js';

  let { onclose } = $props();
  let dialogEl = $state(null);
  // The dialog fills the window around its card: a press that starts and ends outside the card closes it, and a drag out of the card never does.
  let downOnBackdrop = false;

  // What had the focus when the sheet opened: the page's frame after «?» on the page, or a control in the panels.
  const opener = document.activeElement;

  const close = () => dialogEl?.close();

  /** Every way of closing ends here: the focus goes back to what had it, so the keys go on working on the page, and the sheet leaves. */
  function onClosed() {
    if (opener instanceof HTMLElement && opener.isConnected && opener !== document.body) opener.focus({ preventScroll: true });
    onclose?.();
  }

  $effect(() => {
    if (dialogEl && !dialogEl.open) dialogEl.showModal();
  });

  /** The arrows drawn on a key: one up, one down, or the four of the arrow keys. */
  const ARROW_PATHS = {
    up: ['M12 19V5M6 11l6-6 6 6'],
    down: ['M12 5v14M6 13l6 6 6-6'],
    arrows: ['M12 3v7M9 6l3-3 3 3', 'M12 21v-7M9 18l3 3 3-3', 'M3 12h7M6 9l-3 3 3 3', 'M21 12h-7M18 9l3 3-3 3'],
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="sk-overlay" bind:this={dialogEl} aria-labelledby="sk-title" onclose={onClosed}
  onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
  onclick={(e) => downOnBackdrop && e.target === e.currentTarget && close()}>
  <div class="sk-card">
    <div class="sk-head">
      <h2 id="sk-title">{ta('shortcuts.title')}</h2>
      <button type="button" class="sk-close" aria-label={ta('ui.close')} title={ta('ui.close')} onclick={close}>{@html ICONS.cross}</button>
    </div>
    <div class="sk-body">
      <div class="sk-cols">
      {#each SHORTCUT_GROUPS as group (group.id)}
        <section class="sk-group">
          <h3 title={group.tipKey ? ta(group.tipKey) : undefined}>{ta(group.labelKey)}</h3>
          <dl>
            {#each group.rows as row (row.labelKey)}
              <div class="sk-row">
              <dt title={row.tipKey ? ta(row.tipKey) : undefined}>{ta(row.labelKey)}</dt>
              <dd>
                {#each row.ways as way, wi (wi)}
                  {#if wi}<span class="sk-or">{ta('shortcuts.or')}</span>{/if}
                  <span class="sk-way">
                    {#each way as token, ti (ti)}
                      {#if ti}<span class="sk-plus" aria-hidden="true">+</span>{/if}
                      {#if ARROW_TOKENS.includes(token)}
                        <kbd class="sk-arrow" role="img" aria-label={ta(KEY_LABELS[token])}>
                          <svg viewBox="0 0 24 24" width={token === 'arrows' ? 16 : 12} height={token === 'arrows' ? 16 : 12} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            {#each ARROW_PATHS[token] as d (d)}<path {d} />{/each}
                          </svg>
                        </kbd>
                      {:else if KEY_LABELS[token]}
                        <kbd class:sk-pointer={POINTER_TOKENS.includes(token)}>{ta(KEY_LABELS[token])}</kbd>
                      {:else}
                        <kbd>{token}</kbd>
                      {/if}
                    {/each}
                  </span>
                {/each}
              </dd>
              </div>
            {/each}
          </dl>
        </section>
      {/each}
      </div>
    </div>
  </div>
</dialog>

<style>
  .sk-overlay {
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

  .sk-overlay[open] {
    display: grid;
    place-items: center;
  }

  .sk-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  .sk-card {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0.8rem;
    box-sizing: border-box;
    width: min(960px, 100%);
    max-height: min(760px, 100%);
    padding: 1rem 1.1rem 1.1rem;
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  .sk-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.7rem;
  }

  .sk-head h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .sk-close {
    display: grid;
    place-items: center;
    width: 2.2rem;
    height: 2.2rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 8px;
  }

  .sk-close:hover {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  /* The groups flow into two columns of their natural height, each group kept whole, and the body scrolls them when the window is short */
  .sk-body {
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .sk-cols {
    columns: 2 22rem;
    column-gap: 2rem;
  }

  .sk-group {
    break-inside: avoid;
    margin-bottom: 1.1rem;
  }

  .sk-group h3 {
    margin: 0 0 0.45rem;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .sk-group dl {
    display: grid;
    gap: 0.35rem;
    margin: 0;
  }

  /* Each row takes the width its own keys need, so a long row never narrows the names of the others */
  .sk-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .sk-group dt {
    min-width: 0;
    font-size: 0.85rem;
  }

  .sk-group dd {
    display: flex;
    flex-wrap: wrap;
    flex: none;
    align-items: center;
    justify-content: flex-end;
    gap: 0.3rem;
    max-width: 65%;
    margin: 0;
  }

  .sk-way {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
  }

  kbd {
    display: inline-grid;
    place-items: center;
    box-sizing: border-box;
    min-width: 1.7em;
    padding: 0.1rem 0.4rem;
    font: 600 11px/1.4 system-ui, sans-serif;
    color: inherit;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 22%);
    border-bottom-width: 2px;
    border-radius: 5px;
    white-space: nowrap;
  }

  /* A pointer's action is not a key: a dashed outline without the key's depth */
  kbd.sk-pointer {
    font-weight: 500;
    background: transparent;
    border-style: dashed;
    border-bottom-width: 1px;
  }

  .sk-arrow {
    padding: 0.15rem 0.3rem;
  }

  .sk-plus,
  .sk-or {
    font-size: 11px;
    opacity: 0.55;
  }
</style>
