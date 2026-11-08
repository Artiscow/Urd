<script>
  /* A waiting CSV import as a step in the Collections panel («In the panel» under Import preview): the way back cancels it, the file and its rows under the collection's name, the list of what it will do (ImportSummary.svelte, compact), «Show every cell» to the table (ImportTable.svelte), and the choices with Cancel and Import at the foot (ImportChoices.svelte).
     Escape inside the step cancels the import, and nothing is stored until Import. */
  import { getContext, tick } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import ImportSummary from './ImportSummary.svelte';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import ImportChoices from './ImportChoices.svelte';

  const ed = getContext('urd-editor');
  let backEl = $state(null);

  const BACK_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 6l-6 6 6 6"/></svg>';

  const session = $derived(ed.csvImport);
  const name = $derived(session ? ed.collectionsView[session.id]?.name ?? session.id : '');

  // The way back takes the focus as the step opens, as a step in from the list does.
  tick().then(() => backEl?.focus());

  function onKey(e) {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    ed.cancelCsvImport();
  }
</script>

{#if session}
  <!-- Escape anywhere in the step cancels the import -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="is" onkeydown={onKey}>
    <span class="is-crumb">
      <IconButton icon={BACK_ICON} label={ta('tip.csv.cancel')} bind:el={backEl} onclick={() => ed.cancelCsvImport()} />
      <span class="is-words"><span class="is-up">{name}</span><span class="is-name">{ta('csv.step')}</span></span>
      <button type="button" class="is-cells" title={ta('tip.csv.cells')} onclick={() => ed.setCsvImport({ view: 'table', from: 'panel' })}>{ta('csv.cellsShort')}</button>
    </span>
    <span class="is-file" title={session.read.ignored.length ? ta('csv.ignored', { list: session.read.ignored.join(', ') }) : ''}>
      <span class="is-filename">{session.fileName}</span> · {ta(session.read.rows.length === 1 ? 'csv.rows.one' : 'csv.rows', { n: session.read.rows.length })} · {ta(`csv.sep.${session.read.sep === ';' ? 'semicolon' : session.read.sep === '\t' ? 'tab' : 'comma'}`)}
    </span>
    <ImportSummary compact />
    <div class="is-foot"><ImportChoices /></div>
  </div>
{/if}

<style>
  .is {
    display: grid;
    gap: 0.6rem;
    align-content: start;
  }

  .is-crumb {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }

  .is-words {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  .is-up {
    overflow: hidden;
    font-size: 0.72rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.6;
  }

  .is-name {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .is-cells {
    flex: none;
    height: 1.8rem;
    padding: 0 0.6rem;
    font: inherit;
    font-size: 0.75rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 7px;
  }

  .is-file {
    overflow: hidden;
    font-size: 0.75rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.7;
  }

  .is-filename {
    font-family: ui-monospace, monospace;
  }

  /* The choices stay at the panel's foot while the list scrolls past */
  .is-foot {
    position: sticky;
    bottom: 0;
    padding: 0.7rem 0 0.2rem;
    background: var(--urd-color-surface, #151a23);
    border-top: 1px solid rgb(255 255 255 / 8%);
  }
</style>
