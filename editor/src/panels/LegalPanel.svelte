<script>
  /* The Legal panel: what an association must get right, in three folds (BACKLOG 0.7.31): who it is (the contact details, site.contact), its privacy page (footer.privacyPage) and its terms of sale (site.commerce.termsPage, while the site sells, the shop is on or a page is set).
     Each fold's heading carries its state (lib/legal-model.js); a link from another panel or the tab's menu opens the panel at a fold by its `data-fold` (lib/panel-folds.js). */
  import { getContext, tick } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import ContactFields from './legal/ContactFields.svelte';
  import { ta } from '$engine/i18n.js';
  import { groupChip } from '../lib/legal-model.js';
  import { retentionOf, RETENTION_MAX } from '$engine/privacy-model.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const legal = $derived(ed.legal);

  const MISSING_LABEL = { legalName: 'lbl.legalName', email: 'lbl.email', street: 'lbl.street', city: 'lbl.city' };

  /** Any shown page, and the page chosen even while it is hidden, so the choice stays named. */
  const pageOptions = (current) => [['', ta('common.none')], ...(siteDraft.pages ?? []).filter((p) => !p.hidden || p.id === current).map((p) => [p.id, p.title])];

  function setPrivacyPage(v) {
    ed.footerMutate('legal', (f) => { if (v) f.privacyPage = v; else delete f.privacyPage; });
  }

  function setTermsPage(v) {
    ed.siteMutate('legal', () => {
      siteDraft.site.commerce ??= {};
      if (v) siteDraft.site.commerce.termsPage = v;
      else delete siteDraft.site.commerce.termsPage;
    });
  }

  /** The choices for how long each kind is kept: a set time, the kind's own criterion, or not decided (stored as no value). */
  const KEEP_OPTIONS = {
    forms: [['period', 'opt.keep.period'], ['closed', 'opt.keep.closed'], ['', 'opt.keep.undecided']],
    newsletter: [['unsubscribe', 'opt.keep.unsubscribe'], ['period', 'opt.keep.period'], ['', 'opt.keep.undecided']],
  };

  /** A set time chosen before its number is typed, by kind, with the unit picked: it stands in the panel and nothing is stored, so the privacy page never names a period the owner did not type. */
  let pending = $state({});

  /** A kind's choice as the panel shows it: the stored one, else a set time waiting for its number. */
  const keepShown = (kind) => retentionOf(siteDraft, kind) ?? (pending[kind] ? { until: 'period', count: null, unit: pending[kind].unit } : null);

  /** Writes a kind's choice into site.retention; null leaves the kind out, which reads as not decided. */
  function storeKeep(kind, value) {
    ed.siteMutate('legal', () => {
      const next = { ...(siteDraft.site.retention ?? {}) };
      if (value) next[kind] = value;
      else delete next[kind];
      if (Object.keys(next).length) siteDraft.site.retention = next;
      else delete siteDraft.site.retention;
    });
  }

  /** A kind's choice: a set time waits for its number, the kind left out meanwhile; the kind's own criterion is stored at once; not decided leaves the kind out. */
  function setKeepChoice(kind, choice) {
    const { [kind]: _, ...rest } = pending;
    if (choice === 'period') {
      if (retentionOf(siteDraft, kind)?.until === 'period') return;
      pending = { ...rest, [kind]: { unit: 'months' } };
      storeKeep(kind, null);
      return;
    }
    pending = rest;
    storeKeep(kind, choice ? { until: choice } : null);
  }

  /** A set time's number (a whole number from 1 to RETENTION_MAX) or unit: a number stores the period; an empty or unreadable entry keeps what stands. Returns the number the field shows. */
  function setKeepPeriod(kind, patch) {
    const shown = keepShown(kind);
    if (shown?.until !== 'period') return null;
    const unit = patch.unit ?? shown.unit;
    const raw = patch.count === undefined ? '' : String(patch.count).trim();
    const typed = raw === '' ? shown.count : Math.round(Number(raw));
    if (!Number.isFinite(typed)) {
      if (shown.count === null) pending = { ...pending, [kind]: { unit } };
      return shown.count;
    }
    const count = Math.min(RETENTION_MAX, Math.max(1, typed));
    const { [kind]: _, ...rest } = pending;
    pending = rest;
    ed.siteMutate(`edit:legal-keep-${kind}`, () => {
      siteDraft.site.retention = { ...(siteDraft.site.retention ?? {}), [kind]: { until: 'period', count, unit } };
    });
    return count;
  }

  /** The Pages panel with the template picked and the caret in the new page's name: the page made from it is chosen here by itself. */
  async function makePage(template) {
    ed.newPageTemplate = `preset:${template}`;
    ed.openPanel('pages');
    await tick();
    document.querySelector('[data-new-page]')?.focus();
  }
</script>

{#snippet chip(group)}
  {#if legal}
    {@const c = groupChip(group, legal)}
    <span class="legal-chip" class:warn={c.tone === 'warn'}
      title={group === 'who' && c.tone === 'warn' ? ta('legal.missing', { list: legal.who.missing.map((k) => ta(MISSING_LABEL[k])).join(', ') })
        : group === 'privacy' && legal.privacy.page && legal.privacy.undecided.length ? ta('legal.undecidedList', { list: legal.privacy.undecided.map((k) => ta(`legal.keep.${k}`)).join(', ') }) : undefined}
      >{#if c.tone === 'ok'}{@html ICONS.check}{/if}{ta(c.key, { n: c.n })}</span>
  {/if}
{/snippet}

{#snippet pageChoice(label, tip, value, onchange, page)}
  <div class="legal-page-row">
    <label class="field-stack" title={tip}>{label}
      <Dropdown {value} options={pageOptions(value)} {onchange} /></label>
    {#if page}
      <button type="button" class="ghost row-tool" title={ta('tip.legal.openPage')} aria-label={ta('tip.legal.openPage')} onclick={() => ed.selectPage(page)}>{@html ICONS.pencil}</button>
    {/if}
  </div>
{/snippet}

<div class="panel-body">
  <details class="group legal-fold" data-fold="who"
    bind:open={() => ed.legalOpen.who, (v) => (ed.legalOpen = { ...ed.legalOpen, who: v })}>
    <summary title={ta('tip.legal.who')}><span class="legal-fold-name">{ta('legal.group.who')}</span>{@render chip('who')}</summary>
    <div class="group-items">
      <ContactFields missing={legal?.who.missing ?? []} />
    </div>
  </details>
  <details class="group legal-fold" data-fold="privacy"
    bind:open={() => ed.legalOpen.privacy, (v) => (ed.legalOpen = { ...ed.legalOpen, privacy: v })}>
    <summary title={ta('tip.legal.privacy')}><span class="legal-fold-name">{ta('legal.group.privacy')}</span>{@render chip('privacy')}</summary>
    <div class="group-items">
      {@render pageChoice(ta('lbl.footerPrivacy'), ta('tip.footer.privacy'), siteDraft.footer?.privacyPage ?? '', setPrivacyPage, legal?.privacy.page)}
      {#if legal && !legal.privacy.page}
        <button type="button" class="ghost action" title={ta('tip.legal.makePage')} onclick={() => makePage('privacy')}>{@html ICONS.plus} {ta('ui.makePrivacyPage')}</button>
      {/if}
      <!-- How long the association keeps each kind the site has; one not decided is marked, as the privacy page says it is not decided -->
      {#if legal?.privacy.kinds.length}
        <span class="mini-label" title={ta('tip.legal.keep')}>{ta('legal.keep.heading')}</span>
        {#each legal.privacy.kinds as kind (kind)}
          {@const kept = retentionOf(siteDraft, kind)}
          {@const shown = keepShown(kind)}
          <label class="field-stack" title={ta(`tip.legal.keep.${kind}`)}><span>{ta(`legal.keep.${kind}`)}{#if !kept}<span class="legal-need-dot" title={ta('tip.legal.undecided')} aria-hidden="true"></span>{/if}</span>
            <Dropdown value={shown?.until ?? ''} options={KEEP_OPTIONS[kind].map(([v, key]) => [v, ta(key)])} onchange={(v) => setKeepChoice(kind, v)} /></label>
          {#if shown?.until === 'period'}
            <div class="field-pair">
              <input type="number" min="1" max={RETENTION_MAX} step="1" value={shown.count ?? ''} aria-label={ta('lbl.keepCount')} title={ta('tip.legal.keepCount')}
                onchange={(e) => { e.currentTarget.value = String(setKeepPeriod(kind, { count: e.currentTarget.value }) ?? ''); }} />
              <Dropdown value={shown.unit} title={ta('tip.legal.keepUnit')} options={[['months', ta('opt.keep.months')], ['years', ta('opt.keep.years')]]}
                onchange={(v) => setKeepPeriod(kind, { unit: v })} />
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </details>
  {#if legal?.terms.shown}
    <details class="group legal-fold" data-fold="terms"
      bind:open={() => ed.legalOpen.terms, (v) => (ed.legalOpen = { ...ed.legalOpen, terms: v })}>
      <summary title={ta('tip.legal.terms')}><span class="legal-fold-name">{ta('legal.group.terms')}</span>{@render chip('terms')}</summary>
      <div class="group-items">
        {@render pageChoice(ta('settings.termsPage'), ta('tip.settings.termsPage'), siteDraft.site.commerce?.termsPage ?? '', setTermsPage, legal.terms.page)}
        {#if !legal.terms.page}
          <button type="button" class="ghost action" title={ta('tip.legal.makePage')} onclick={() => makePage('terms')}>{@html ICONS.plus} {ta('ui.makeTermsPage')}</button>
        {/if}
      </div>
    </details>
  {/if}
</div>
