<script>
  /* A waiting CSV import as a table over the page, cell by cell («Table, every cell» under Import preview, and «Show every cell» from the dialog and the panel's step): a row per row of the file in its own order, its status, and the kind's columns the file holds (lib/csv-preview.js cellOf).
     A changed cell shows the value it had struck above the new one, a refused row shows the file's own cells with the one that did not read ringed and the reason in its status, and the entries the file does not name stand last.
     The bar holds the chips that narrow the rows, the way back to the summary where the table was opened from one, and the choices with Cancel and Import (ImportChoices.svelte); Escape goes back to the summary, or cancels where the table is the chosen preview. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { csvCell } from '$engine/collections-csv.js';
  import { chipsOf, cellOf } from '../../lib/csv-preview.js';
  import ImportChoices from './ImportChoices.svelte';

  const ed = getContext('urd-editor');
  let filter = $state('all');
  let rootEl = $state(null);

  const session = $derived(ed.csvImport);
  const plan = $derived(ed.csvPlan);
  const name = $derived(session ? ed.collectionsView[session.id]?.name ?? session.id : '');
  const chips = $derived(chipsOf(plan));
  const shown = $derived(chips.some((c) => c.status === filter) ? filter : 'all');
  const items = $derived(plan ? plan.items.filter((i) => shown === 'all' || i.status === shown) : []);
  const columns = $derived(session ? session.read.columns : []);
  /** The dialog or the panel's step the table was opened from, which it goes back to; none where the table is the chosen preview. */
  const fromSummary = $derived(session?.from ?? null);
  const cell = (entry, column) => csvCell(entry, column, ed.siteDraft?.pages ?? []);
  const words = (column, text) => (column === 'title' || column === 'text' ? ed.plainTitle(text) : text);

  const statusText = (item) => {
    if (item.status === 'refused') return ta(`csv.problem.${item.problem.key}`, { column: item.problem.column ?? '', value: item.problem.value ?? '' });
    if (item.status === 'missing') return ta(session.missing === 'remove' ? 'csv.missing.removed' : 'csv.missing.kept');
    return ta(`csv.status.${item.status}`);
  };

  $effect(() => { rootEl?.focus(); });

  function onKey(e) {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    if (fromSummary) ed.setCsvImport({ view: fromSummary });
    else ed.cancelCsvImport();
  }
</script>

{#if session && plan}
  <!-- Escape anywhere over the table goes back to the summary or cancels -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <section class="it" bind:this={rootEl} tabindex="-1" aria-label={ta('csv.title', { file: session.fileName })} onkeydown={onKey}>
    <div class="it-bar">
      <span class="it-words">
        <h2>{ta('csv.title', { file: session.fileName })}</h2>
        <span class="it-sub" title={session.read.ignored.length ? ta('csv.ignored', { list: session.read.ignored.join(', ') }) : ''}>{ta(session.read.rows.length === 1 ? 'csv.into.one' : 'csv.into', { n: session.read.rows.length, name })}</span>
      </span>
      <span class="it-chips" role="group" aria-label={ta('csv.filter')}>
        {#each chips as c (c.status)}
          <button type="button" class="it-chip" class:on={shown === c.status} aria-pressed={shown === c.status}
            title={ta(c.status === 'all' ? 'tip.csv.all' : `tip.csv.status.${c.status}`)} onclick={() => (filter = c.status)}>
            {#if c.status !== 'all'}<span class="it-dot it-d-{c.status}" aria-hidden="true"></span>{/if}
            {ta(`csv.status.${c.status}`)} <b>{c.n}</b>
          </button>
        {/each}
      </span>
      <span class="it-grow"></span>
      {#if fromSummary}
        <button type="button" class="it-btn" title={ta('tip.csv.summary')} onclick={() => ed.setCsvImport({ view: fromSummary })}>{ta('csv.summary')}</button>
      {/if}
      <ImportChoices inline />
    </div>
    <div class="it-scroll">
      <table class="it-table">
        <thead>
          <tr>
            <th scope="col">{ta('csv.row')}</th>
            <th scope="col">{ta('csv.statusHead')}</th>
            {#each columns as column (column)}<th scope="col" class:it-num={column === 'price' || column === 'memberPrice'}>{column}</th>{/each}
          </tr>
        </thead>
        <tbody>
          {#each items as item (item.row ?? `id:${item.id}`)}
            <tr class="it-r-{item.status}" class:it-removed={item.status === 'missing' && session.missing === 'remove'}>
              <td class="it-rownum">{item.row ?? ''}</td>
              <td class="it-status"><span class="it-pill it-p-{item.status}">{statusText(item)}</span></td>
              {#each columns as column (column)}
                {@const c = cellOf(item, column, cell)}
                <td class:it-num={column === 'price' || column === 'memberPrice'} class:it-changed={c.was !== null}>
                  {#if c.was !== null}<s title={words(column, c.was)}>{words(column, c.was) || ta('csv.none')}</s>{/if}
                  <span class="it-val" class:it-bad={c.bad} title={words(column, c.text)}>{words(column, c.text)}</span>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
{/if}

<style>
  /* Over the whole stage, on the panels' surface, as the collections table stands */
  .it {
    position: absolute;
    inset: 0;
    z-index: 6;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    background: var(--urd-color-surface, #151a23);
    color: var(--urd-color-text, #e8eaf0);
    font-family: var(--urd-font-body, system-ui, sans-serif);
    font-size: 0.85rem;
    outline: none;
    --it-refused: #f07171;
    --it-new: #63d18f;
    --it-changed: #e9b44c;
  }

  .it-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1rem;
    padding: 0.7rem 1rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .it-words {
    display: grid;
    min-width: 0;
  }

  .it-words h2 {
    margin: 0;
    font-size: 1rem;
  }

  .it-sub {
    font-size: 0.75rem;
    opacity: 0.65;
  }

  .it-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .it-chip,
  .it-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    font: inherit;
    font-size: 0.78rem;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 999px;
  }

  .it-btn {
    min-height: 2rem;
    padding: 0 0.9rem;
    border-radius: 8px;
  }

  .it-chip.on {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .it-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.5;
  }

  .it-d-refused { background: var(--it-refused); opacity: 1; }
  .it-d-new { background: var(--it-new); opacity: 1; }
  .it-d-changed, .it-d-skipped { background: var(--it-changed); opacity: 1; }
  .it-d-missing { background: transparent; border: 1.5px dashed currentColor; }

  .it-grow {
    flex: 1;
  }

  .it-scroll {
    min-height: 0;
    padding: 0 1rem 1rem;
    overflow: auto;
    scrollbar-width: thin;
  }

  .it-table {
    width: 100%;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
  }

  .it-table th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 0.55rem 0.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    background: var(--urd-color-surface, #151a23);
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    opacity: 0.85;
  }

  .it-table td {
    max-width: 16rem;
    padding: 0.4rem 0.5rem;
    vertical-align: top;
    border-bottom: 1px solid rgb(255 255 255 / 6%);
  }

  .it-table td s,
  .it-val {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .it-table td s {
    font-size: 0.72rem;
    opacity: 0.6;
  }

  .it-num {
    text-align: right;
  }

  .it-rownum {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .it-changed {
    background: color-mix(in srgb, var(--it-changed) 13%, transparent);
  }

  .it-bad {
    border-radius: 4px;
    outline: 1.5px solid var(--it-refused);
    outline-offset: 1px;
    min-height: 1.1em;
  }

  .it-r-refused td {
    background: color-mix(in srgb, var(--it-refused) 8%, transparent);
  }

  .it-r-new td:first-child {
    box-shadow: inset 3px 0 0 var(--it-new);
  }

  .it-r-same td,
  .it-r-missing td {
    opacity: 0.6;
  }

  .it-removed td {
    text-decoration: line-through;
  }

  .it-status {
    max-width: 18rem;
  }

  .it-pill {
    display: inline-block;
    padding: 1px 8px;
    font-size: 0.68rem;
    font-weight: 600;
    white-space: normal;
    border-radius: 999px;
    border: 1px solid rgb(255 255 255 / 16%);
  }

  .it-p-refused { color: var(--it-refused); border-color: transparent; background: color-mix(in srgb, var(--it-refused) 14%, transparent); border-radius: 6px; }
  .it-p-new { color: var(--it-new); border-color: transparent; background: color-mix(in srgb, var(--it-new) 14%, transparent); }
  .it-p-changed { color: var(--it-changed); border-color: transparent; background: color-mix(in srgb, var(--it-changed) 14%, transparent); }
  .it-p-missing { border-style: dashed; }
</style>
