<script>
  /* A page's settings as a dialog over the admin (the default «Page settings»): the pages down the left with the front page and the hidden ones marked, the chosen page's name and address at the top, and its fields at the right (PageSettingsFields.svelte).
     A native modal dialog (ADR-0011), as the Urd settings: Escape and a press on the backdrop close it, and every change is written as it is made. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import PageSettingsFields from './PageSettingsFields.svelte';

  const ed = getContext('urd-editor');
  let dialogEl = $state(null);
  let closeEl = $state(null);
  // A press outside the card lands on the dialog itself: it closes when it both starts and ends there, so a drag out of the card never does.
  let downOnBackdrop = false;

  const id = $derived(ed.pageSettingsFor);
  const pages = $derived(ed.siteDraft.pages);
  const entry = $derived(pages.find((p) => p.id === id) ?? null);

  $effect(() => {
    if (dialogEl && !dialogEl.open) {
      dialogEl.showModal();
      closeEl?.focus();
    }
  });

  /** Leaving the dialog by Escape or the backdrop ends the settings; the page itself may be gone by then. */
  function onClosed() {
    if (ed.pageSettingsFor) ed.closePageSettings();
  }

  /** Another page in the list: its fields are read, and the dialog stays. */
  function pick(pageId) {
    ed.openPageSettings(pageId);
  }
</script>

{#if id}
  <dialog class="ps-overlay" bind:this={dialogEl} aria-labelledby="ps-title" onclose={onClosed}
    onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
    onclick={(e) => downOnBackdrop && e.target === e.currentTarget && dialogEl.close()}>
    <div class="ps-card">
      <nav class="ps-list" aria-label={ta('panel.pages')}>
        <h2 id="ps-title">{ta('ui.pageSettings')}</h2>
        {#each pages as p (p.id)}
          <button type="button" class="ps-page" aria-current={p.id === id ? 'true' : undefined} title={p.path} onclick={() => pick(p.id)}>
            <span class="ps-page-name">{p.title || p.id}</span>
            {#if p.path === '/'}<span class="ps-mark" title={ta('tip.pages.isFront')}>{@html ICONS.home}</span>{/if}
            {#if p.noindex}<span class="ps-mark" title={ta('lbl.hideFromSearch')}>{@html ICONS.eyeOff}</span>{/if}
          </button>
        {/each}
      </nav>
      <div class="ps-main">
        <div class="ps-head">
          <span class="ps-words">
            <span class="ps-name">{entry?.title ?? ''}</span>
            <span class="ps-path">{entry?.path ?? ''}</span>
          </span>
          <button type="button" class="ps-x" bind:this={closeEl} title={ta('tip.pages.closeSettings')} aria-label={ta('tip.pages.closeSettings')} onclick={() => dialogEl.close()}>{@html ICONS.cross}</button>
        </div>
        <div class="ps-body panel-body">
          {#if entry}{#key id}<PageSettingsFields {id} wide />{/key}{/if}
        </div>
      </div>
    </div>
  </dialog>
{/if}

<style>
  .ps-overlay {
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
    font-family: var(--urd-font-body, system-ui, sans-serif);
    background: transparent;
    border: 0;
  }

  .ps-overlay[open] {
    display: grid;
    place-items: center;
  }

  .ps-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  /* The pages down the left on the darker ground, the fields at the right in their own scroll */
  .ps-card {
    display: grid;
    grid-template-columns: 13rem minmax(0, 1fr);
    width: min(860px, 100%);
    height: min(680px, 100%);
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 14px;
    box-shadow: 0 30px 80px rgb(0 0 0 / 55%);
  }

  .ps-list {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-height: 0;
    padding: 1rem 0.6rem;
    overflow-y: auto;
    scrollbar-width: thin;
    background: var(--urd-color-bg, #0f1218);
  }

  .ps-list h2 {
    margin: 0 0 0.5rem;
    padding: 0 0.5rem;
    font-size: 1rem;
  }

  .ps-page {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    padding: 0.5rem 0.6rem;
    font: inherit;
    font-size: 0.88rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 8px;
  }

  .ps-page:hover {
    background: rgb(255 255 255 / 6%);
  }

  /* The chosen page: its name on a faint accent surface, never a line at the edge */
  .ps-page[aria-current='true'] {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .ps-page-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ps-mark {
    display: inline-flex;
    opacity: 0.6;
  }

  .ps-mark :global(svg) {
    width: 13px;
    height: 13px;
  }

  .ps-main {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 0;
  }

  .ps-head {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 1rem 1.1rem 0.7rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .ps-words {
    display: grid;
    flex: 1;
    gap: 0.1rem;
    min-width: 0;
  }

  .ps-name {
    overflow: hidden;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ps-path {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .ps-x {
    display: grid;
    flex: none;
    place-items: center;
    width: 1.9rem;
    height: 1.9rem;
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 8px;
  }

  .ps-x:hover {
    background: rgb(255 255 255 / 7%);
  }

  .ps-body {
    min-height: 0;
    padding: 1rem 1.25rem 1.25rem;
    overflow-y: auto;
    scrollbar-width: thin;
  }
</style>
