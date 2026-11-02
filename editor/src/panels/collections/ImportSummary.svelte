<script>
  /* What a waiting CSV import will do, as a list (the dialog and the panel's step): chips that narrow it to one kind of row, then the rows grouped by what becomes of them, the ones that need the owner first (lib/csv-preview.js).
     A row that is not stored says why; a changed row names its changed fields with the old value struck before the new; in the dialog the unchanged rows stand as one line. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { groupsOf, chipsOf, changeOf, summaryOf } from '../../lib/csv-preview.js';

  const ed = getContext('urd-editor');
  /** compact: the panel's narrow step, where a changed row names its fields without their values. */
  let { compact = false } = $props();
  let filter = $state('all');

  const session = $derived(ed.csvImport);
  const plan = $derived(ed.csvPlan);
  const kind = $derived(session ? ed.collectionsView[session.id]?.kind : null);
  const chips = $derived(chipsOf(plan));
  const groups = $derived(groupsOf(plan, chips.some((c) => c.status === filter) ? filter : 'all'));

  const problemText = (p) => ta(`csv.problem.${p.key}`, { column: p.column ?? '', value: p.value ?? '' });
  const pill = (item) => (item.status === 'missing' ? ta(session.missing === 'remove' ? 'csv.missing.removed' : 'csv.missing.kept') : ta(`csv.status.${item.status}`));
</script>

{#if plan}
  <div class="ip-chips" role="group" aria-label={ta('csv.filter')}>
    {#each chips as c (c.status)}
      <button type="button" class="ip-chip" class:on={filter === c.status} aria-pressed={filter === c.status}
        title={ta(c.status === 'all' ? 'tip.csv.all' : `tip.csv.status.${c.status}`)} onclick={() => (filter = c.status)}>
        {#if c.status !== 'all'}<span class="ip-dot ip-d-{c.status}" aria-hidden="true"></span>{/if}
        {ta(`csv.status.${c.status}`)} <span class="ip-n">{c.n}</span>
      </button>
    {/each}
  </div>
  <div class="ip-rows">
    {#each groups as g (g.status)}
      <span class="ip-group">{ta(`csv.group.${g.status}`)}</span>
      {#if g.status === 'same' && !compact && filter === 'all'}
        <!-- The unchanged rows as one line in the dialog; their own chip lists them -->
        <div class="ip-row ip-r-same">
          <span class="ip-num" aria-hidden="true"></span>
          <span class="ip-t"><b>{g.items.map((i) => ed.plainTitle(i.entry.title)).join(', ')}</b><small>{ta('csv.sameLine')}</small></span>
          <span class="ip-pill">{g.items.length}</span>
        </div>
      {:else}
        {#each g.items as item (item.row ?? `id:${item.id}`)}
          <div class="ip-row ip-r-{item.status}">
            {#if item.entry.image && item.status !== 'refused'}
              <img class="ip-thumb" src={item.entry.image} alt="" />
            {:else}
              <span class="ip-num" title={item.row ? ta('csv.rowNumber', { n: item.row }) : ''}>{item.row ?? ''}</span>
            {/if}
            <span class="ip-t">
              <b>{ed.plainTitle(item.entry.title) || ta('csv.noTitle')}</b>
              <small>
                {#if item.status === 'refused'}
                  {problemText(item.problem)}
                {:else if item.status === 'changed' || item.status === 'skipped'}
                  {#each item.changes as field, i (field)}
                    {@const c = changeOf(field, item.status === 'changed' ? item.before : item.entry, item.status === 'changed' ? item.entry : item.after, ed.plainTitle)}
                    <span class="ip-change">{ta(`csv.field.${field}`)}{#if !compact && 'to' in c}{' '}<s>{c.from || ta('csv.none')}</s>{' '}<span class="ip-to">{c.to || ta('csv.none')}</span>{/if}{i < item.changes.length - 1 ? ' · ' : ''}</span>
                  {/each}
                {:else}
                  {summaryOf(item.entry, kind)}
                {/if}
              </small>
            </span>
            <span class="ip-pill ip-p-{item.status}" class:ip-p-removed={item.status === 'missing' && session.missing === 'remove'}>{pill(item)}</span>
          </div>
        {/each}
      {/if}
    {/each}
  </div>
{/if}

<style>
  .ip-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .ip-chip {
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

  .ip-chip.on {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .ip-n {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .ip-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ip-c, currentColor);
  }

  .ip-d-missing {
    background: transparent;
    border: 1.5px dashed currentColor;
    opacity: 0.7;
  }

  .ip-d-same {
    opacity: 0.5;
  }

  /* The kinds of row, each its own colour: not stored, new and changed; the rest in the text colour */
  .ip-chips, .ip-rows {
    --ip-refused: #f07171;
    --ip-new: #63d18f;
    --ip-changed: #e9b44c;
  }

  .ip-d-refused { --ip-c: var(--ip-refused); }
  .ip-d-new { --ip-c: var(--ip-new); }
  .ip-d-changed, .ip-d-skipped { --ip-c: var(--ip-changed); }

  .ip-rows {
    display: grid;
    align-content: start;
    gap: 1px;
    min-height: 0;
  }

  .ip-group {
    padding: 0.6rem 0.5rem 0.2rem;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .ip-row {
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr) auto;
    gap: 0.6rem;
    align-items: center;
    padding: 0.4rem 0.5rem;
    border-radius: 8px;
  }

  .ip-row:hover {
    background: rgb(255 255 255 / 4%);
  }

  .ip-thumb {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    object-fit: cover;
  }

  .ip-num {
    font-size: 0.7rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
    opacity: 0.6;
  }

  .ip-t {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  .ip-t b {
    overflow: hidden;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ip-t small {
    font-size: 0.75rem;
    line-height: 1.4;
    opacity: 0.75;
  }

  .ip-r-refused small {
    color: var(--ip-refused);
    opacity: 1;
  }

  .ip-r-same, .ip-r-missing {
    opacity: 0.6;
  }

  .ip-change s {
    opacity: 0.7;
  }

  .ip-to {
    color: var(--ip-changed);
  }

  .ip-pill {
    padding: 2px 8px;
    font-size: 0.68rem;
    font-weight: 600;
    white-space: nowrap;
    border-radius: 999px;
    border: 1px solid rgb(255 255 255 / 16%);
  }

  .ip-p-refused { color: var(--ip-refused); border-color: transparent; background: color-mix(in srgb, var(--ip-refused) 14%, transparent); }
  .ip-p-new { color: var(--ip-new); border-color: transparent; background: color-mix(in srgb, var(--ip-new) 14%, transparent); }
  .ip-p-changed { color: var(--ip-changed); border-color: transparent; background: color-mix(in srgb, var(--ip-changed) 14%, transparent); }
  .ip-p-missing { border-style: dashed; }
  .ip-p-removed { color: var(--ip-refused); border-color: color-mix(in srgb, var(--ip-refused) 50%, transparent); }
</style>
