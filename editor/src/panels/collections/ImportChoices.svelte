<script>
  /* The waiting import's two choices and its way out, shared by the three previews: what rows that match an entry do, shown while some row matches one with a change, and what becomes of the entries the file does not name, shown while there are any; then Cancel and Import.
     Import stores the plan as one undo step (state/collections.svelte.js applyCsvImport) and stands greyed while it would store nothing. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';

  const ed = getContext('urd-editor');
  /** inline: the table's bar, where the choices and the buttons stand in one row. */
  let { inline = false } = $props();

  const session = $derived(ed.csvImport);
  const plan = $derived(ed.csvPlan);
  const matches = $derived(plan ? plan.counts.changed + plan.counts.skipped : 0);
  const storable = $derived(plan ? plan.counts.new + plan.counts.changed + (session.missing === 'remove' ? plan.counts.missing : 0) : 0);
</script>

{#if plan}
  <div class="ic" class:ic-inline={inline}>
    {#if matches}
      <span class="ic-choice">
        <span class="ic-label" title={ta('tip.csv.matched')}>{ta('csv.matched')}</span>
        <span class="seg" role="group" aria-label={ta('csv.matched')}>
          {#each ['update', 'skip'] as v (v)}
            <button type="button" class:on={session.matched === v} aria-pressed={session.matched === v} title={ta(`tip.csv.matched.${v}`)}
              onclick={() => ed.setCsvImport({ matched: v })}>{ta(`csv.matched.${v}`)}</button>
          {/each}
        </span>
      </span>
    {/if}
    {#if plan.counts.missing}
      <span class="ic-choice">
        <span class="ic-label" title={ta('tip.csv.missing')}>{ta('csv.missing')}</span>
        <span class="seg" role="group" aria-label={ta('csv.missing')}>
          {#each ['keep', 'remove'] as v (v)}
            <button type="button" class:on={session.missing === v} aria-pressed={session.missing === v} title={ta(`tip.csv.missing.${v}`)}
              onclick={() => ed.setCsvImport({ missing: v })}>{ta(`csv.missing.${v}`)}</button>
          {/each}
        </span>
      </span>
    {/if}
    <span class="ic-actions">
      <button type="button" class="ic-btn" title={ta('tip.csv.cancel')} onclick={() => ed.cancelCsvImport()}>{ta('confirm.cancel')}</button>
      <button type="button" class="ic-btn ic-primary" disabled={!storable} title={ta('tip.csv.apply')} onclick={() => ed.applyCsvImport()}>{ta('csv.apply')}</button>
    </span>
  </div>
{/if}

<style>
  .ic {
    display: grid;
    gap: 0.5rem;
  }

  .ic-inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1rem;
  }

  .ic-choice {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .ic-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .ic-btn {
    min-height: 2rem;
    padding: 0 0.9rem;
    font: inherit;
    font-size: 0.82rem;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 8px;
  }

  .ic-primary {
    font-weight: 600;
    color: var(--urd-color-bg, #0f1218);
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
  }

  .ic-btn:disabled {
    cursor: default;
    opacity: 0.45;
  }

  .ic-btn:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }
</style>
