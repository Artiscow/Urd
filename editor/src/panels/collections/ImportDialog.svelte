<script>
  /* A waiting CSV import as a dialog over the admin (the default «Import preview»): the file and the collection it goes into, the list of what it will do (ImportSummary.svelte), «Show every cell» to the table (ImportTable.svelte), and the choices with Cancel and Import (ImportChoices.svelte).
     A native modal dialog (ADR-0011): Escape and a press on the backdrop cancel the import, and nothing is stored until Import. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import ImportSummary from './ImportSummary.svelte';
  import ImportChoices from './ImportChoices.svelte';

  const ed = getContext('urd-editor');
  let dialogEl = $state(null);
  let closeEl = $state(null);
  // A press outside the card lands on the dialog itself: it cancels when it both starts and ends there, so a drag out of the card never does.
  let downOnBackdrop = false;

  const session = $derived(ed.csvImport);
  const name = $derived(session ? ed.collectionsView[session.id]?.name ?? session.id : '');

  $effect(() => {
    if (dialogEl && !dialogEl.open) {
      dialogEl.showModal();
      closeEl?.focus();
    }
  });

  /** Leaving the dialog by Escape or the backdrop cancels the import; Import and Cancel have already ended it. */
  function onClosed() {
    if (ed.csvImport?.view === 'dialog') ed.cancelCsvImport();
  }
</script>

{#if session}
  <dialog class="ip-overlay" bind:this={dialogEl} aria-labelledby="ip-title" onclose={onClosed}
    onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
    onclick={(e) => downOnBackdrop && e.target === e.currentTarget && dialogEl.close()}>
    <div class="ip-card">
      <div class="ip-head">
        <div class="ip-words">
          <h2 id="ip-title">{ta('csv.title', { file: session.fileName })}</h2>
          <p>{ta(session.read.rows.length === 1 ? 'csv.into.one' : 'csv.into', { n: session.read.rows.length, name })} · {ta(`csv.sep.${session.read.sep === ';' ? 'semicolon' : session.read.sep === '\t' ? 'tab' : 'comma'}`)}</p>
          {#if session.read.ignored.length}
            <p class="ip-ignored" title={ta('tip.csv.ignored')}>{ta('csv.ignored', { list: session.read.ignored.join(', ') })}</p>
          {/if}
        </div>
        <button type="button" class="ip-cells" title={ta('tip.csv.cells')} onclick={() => ed.setCsvImport({ view: 'table', from: 'dialog' })}>{ta('csv.cells')}</button>
        <button type="button" class="ip-x" bind:this={closeEl} title={ta('tip.csv.cancel')} aria-label={ta('tip.csv.cancel')} onclick={() => dialogEl.close()}>{@html ICONS.cross}</button>
      </div>
      <div class="ip-body"><ImportSummary /></div>
      <div class="ip-foot"><ImportChoices /></div>
    </div>
  </dialog>
{/if}

<style>
  .ip-overlay {
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

  .ip-overlay[open] {
    display: grid;
    place-items: center;
  }

  .ip-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  .ip-card {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    width: min(680px, 100%);
    max-height: min(720px, 100%);
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 14px;
    box-shadow: 0 30px 80px rgb(0 0 0 / 55%);
  }

  .ip-head {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 1rem 1.1rem 0.7rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .ip-words {
    flex: 1;
    min-width: 0;
  }

  .ip-head h2 {
    margin: 0;
    overflow: hidden;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ip-head p {
    margin: 0.2rem 0 0;
    font-size: 0.78rem;
    opacity: 0.65;
  }

  .ip-cells,
  .ip-x {
    flex: none;
    height: 1.9rem;
    font: inherit;
    font-size: 0.78rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 8px;
  }

  .ip-cells {
    padding: 0 0.7rem;
  }

  .ip-x {
    display: grid;
    place-items: center;
    width: 1.9rem;
    padding: 0;
  }

  .ip-cells:hover,
  .ip-x:hover {
    background: rgb(255 255 255 / 7%);
  }

  .ip-body {
    display: grid;
    align-content: start;
    gap: 0.5rem;
    min-height: 0;
    padding: 0.7rem 0.6rem 0.6rem;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .ip-body :global(.ip-chips) {
    padding: 0 0.5rem;
  }

  .ip-foot {
    padding: 0.8rem 1.1rem;
    border-top: 1px solid rgb(255 255 255 / 8%);
  }
</style>
