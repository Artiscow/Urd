<script>
  /**
   * The command palette (comparison/ELEMENTS.md E1): one field, and under it every command the editor offers, the ones run last first, narrowed to the matches while the owner types (lib/command-palette.js). The arrows walk the list, Enter runs the marked command, Escape closes.
   * Opened by Ctrl/⌘+K in the panels and on the page; in a text Ctrl+K stays the link key. A native modal dialog (ADR-0011), closed by a press outside its card as the shortcut sheet is.
   */
  import { ta } from '$engine/i18n.js';
  import { searchItems } from '$engine/palette-search.js';
  import { arrangeCommands, flatItems, readRecent, rememberCommand, RECENT_KEY } from './command-palette.js';

  let { commands = [], onclose } = $props();
  let dialogEl = $state(null);
  let query = $state('');
  let marked = $state(0);
  let downOnBackdrop = false;
  const recent = readRecent(localStorage);
  const groups = $derived(arrangeCommands(commands, query, recent, searchItems));
  const items = $derived(flatItems(groups));
  const opener = document.activeElement;

  const close = () => dialogEl?.close();

  function onClosed() {
    if (opener instanceof HTMLElement && opener.isConnected && opener !== document.body) opener.focus({ preventScroll: true });
    onclose?.();
  }

  $effect(() => {
    if (dialogEl && !dialogEl.open) dialogEl.showModal();
  });

  // A new query starts the walk at the top.
  $effect(() => {
    void query;
    marked = 0;
  });

  /** Runs a command: remembered as recent, then the palette closes and the command does its work with the focus back where it was. */
  function run(item) {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(rememberCommand(recent, item.id)));
    } catch { /* a full store keeps no recent list */ }
    close();
    item.run();
  }

  function onKey(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!items.length) return;
      marked = (marked + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
      dialogEl?.querySelector(`[data-index="${marked}"]`)?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[marked]) run(items[marked]);
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="kp-overlay" bind:this={dialogEl} aria-label={ta('palette.title')} onclose={onClosed}
  onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
  onclick={(e) => downOnBackdrop && e.target === e.currentTarget && close()}>
  <div class="kp-card" onkeydown={onKey}>
    <div class="kp-field">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
      <!-- svelte-ignore a11y_autofocus -->
      <input type="text" class="kp-input" placeholder={ta('palette.search')} aria-label={ta('palette.title')} bind:value={query} autofocus
        role="combobox" aria-expanded="true" aria-controls="kp-list" aria-activedescendant={items[marked] ? `kp-${marked}` : undefined} />
      <kbd class="kp-esc">Esc</kbd>
    </div>
    <div class="kp-list" id="kp-list" role="listbox">
      {#if !groups.length}
        <p class="kp-none">{ta('palette.none')}</p>
      {/if}
      {#each groups as group (group.group)}
        <div class="kp-group">
          <p class="kp-group-title">{ta(`palette.group.${group.group}`)}</p>
          {#each group.items as item (item.id)}
            {@const index = items.indexOf(item)}
            <button type="button" class="kp-item" class:marked={index === marked} id={`kp-${index}`} data-index={index} role="option" aria-selected={index === marked}
              onpointerenter={() => (marked = index)} onclick={() => run(item)}>
              <span class="kp-item-label">{item.label}</span>
              {#if item.hint}<span class="kp-item-hint">{item.hint}</span>{/if}
            </button>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</dialog>

<style>
  .kp-overlay {
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    width: 100vw;
    max-width: none;
    height: 100vh;
    max-height: none;
    margin: 0;
    padding: 10vh 1rem 1rem;
    color: var(--urd-color-text, #e8eaf0);
    background: transparent;
    border: 0;
  }

  .kp-overlay[open] {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .kp-overlay::backdrop {
    background: rgb(0 0 0 / 55%);
  }

  .kp-card {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    box-sizing: border-box;
    width: min(560px, 100%);
    max-height: min(520px, 100%);
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
    border-radius: 14px;
    box-shadow: 0 24px 60px rgb(0 0 0 / 50%);
  }

  .kp-field {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 0.9rem;
    border-bottom: 1px solid color-mix(in srgb, currentColor 12%, transparent);
  }

  .kp-field :global(svg) {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    opacity: 0.6;
  }

  .kp-input {
    flex: 1;
    min-width: 0;
    padding: 0.2rem 0;
    font: inherit;
    font-size: 1rem;
    color: inherit;
    background: transparent;
    border: 0;
    outline: 0;
  }

  .kp-esc {
    padding: 2px 6px;
    font: 600 10px/1.4 system-ui, sans-serif;
    opacity: 0.55;
    border: 1px solid currentColor;
    border-radius: 5px;
  }

  .kp-list {
    overflow-y: auto;
    padding: 0.4rem;
  }

  .kp-group + .kp-group {
    margin-top: 0.35rem;
  }

  .kp-group-title {
    margin: 0.35rem 0.6rem 0.2rem;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .kp-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.8rem;
    width: 100%;
    padding: 0.5rem 0.6rem;
    font: inherit;
    font-size: 0.92rem;
    color: inherit;
    text-align: left;
    background: transparent;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
  }

  .kp-item.marked {
    background: color-mix(in srgb, var(--urd-color-accent) 22%, transparent);
  }

  .kp-item-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .kp-item-hint {
    flex-shrink: 0;
    font-size: 0.75rem;
    opacity: 0.55;
  }

  .kp-none {
    margin: 0.8rem 0.6rem;
    font-size: 0.9rem;
    opacity: 0.6;
  }
</style>
