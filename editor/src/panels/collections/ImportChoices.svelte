<script>
  /* The waiting import's choices for matching rows and for unnamed entries, each shown only where it applies, then Cancel and Import. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import Choice from '../../lib/Choice.svelte';

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
      <Choice label={ta('csv.matched')} title={ta('tip.csv.matched')} value={session.matched}
        options={['update', 'skip'].map((v) => [v, ta(`csv.matched.${v}`), ta(`tip.csv.matched.${v}`)])}
        onchange={(v) => ed.setCsvImport({ matched: v })} />
    {/if}
    {#if plan.counts.missing}
      <Choice label={ta('csv.missing')} title={ta('tip.csv.missing')} value={session.missing}
        options={['keep', 'remove'].map((v) => [v, ta(`csv.missing.${v}`), ta(`tip.csv.missing.${v}`)])}
        onchange={(v) => ed.setCsvImport({ missing: v })} />
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
    color: var(--urd-color-accent-text);
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
