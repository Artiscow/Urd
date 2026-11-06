<script>
  /* The Legal panel: what an association must get right, in three folds (BACKLOG 0.7.31): who it is (the contact details, site.contact), its privacy page (footer.privacyPage) and its terms of sale (site.commerce.termsPage, while the site sells, the shop is on or a page is set).
     Each fold's heading carries its state (lib/legal-model.js); a link from another panel or the strip's Legal menu opens the panel at a group, unfolded, brought into view and its heading lit for a moment. */
  import { getContext, tick } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import ContactFields from './legal/ContactFields.svelte';
  import { ta } from '$engine/i18n.js';
  import { groupChip } from '../lib/legal-model.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const legal = $derived(ed.legal);

  /** The folds by group, for a link that opens the panel at one. */
  let folds = $state({});
  /** The group whose heading is lit after a link opened it. */
  let lit = $state(null);

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

  /** The Pages panel with the template picked and the caret in the new page's name: the page made from it is chosen here by itself. */
  async function makePage(template) {
    ed.newPageTemplate = `preset:${template}`;
    ed.openPanel('pages');
    await tick();
    document.querySelector('[data-new-page]')?.focus();
  }

  // A link asked for a group: unfold it, bring it into view and light its heading.
  $effect(() => {
    const group = ed.legalFocus;
    if (!group) return;
    ed.legalFocus = null;
    tick().then(() => {
      const fold = folds[group];
      if (!fold) return;
      fold.open = true;
      fold.scrollIntoView({ block: 'start', behavior: ed.reducedMotion ? 'auto' : 'smooth' });
      fold.querySelector('summary')?.focus({ preventScroll: true });
      lit = group;
      setTimeout(() => { if (lit === group) lit = null; }, 1400);
    });
  });
</script>

{#snippet chip(group)}
  {#if legal}
    {@const c = groupChip(group, legal)}
    <span class="legal-chip" class:warn={c.tone === 'warn'}
      title={group === 'who' && c.tone === 'warn' ? ta('legal.missing', { list: legal.who.missing.map((k) => ta(MISSING_LABEL[k])).join(', ') }) : undefined}
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
  <details class="group legal-fold" class:lit={lit === 'who'} bind:this={folds.who}
    bind:open={() => ed.legalOpen.who, (v) => (ed.legalOpen = { ...ed.legalOpen, who: v })}>
    <summary title={ta('tip.legal.who')}><span class="legal-fold-name">{ta('legal.group.who')}</span>{@render chip('who')}</summary>
    <div class="group-items">
      <ContactFields missing={legal?.who.missing ?? []} />
    </div>
  </details>
  <details class="group legal-fold" class:lit={lit === 'privacy'} bind:this={folds.privacy}
    bind:open={() => ed.legalOpen.privacy, (v) => (ed.legalOpen = { ...ed.legalOpen, privacy: v })}>
    <summary title={ta('tip.legal.privacy')}><span class="legal-fold-name">{ta('legal.group.privacy')}</span>{@render chip('privacy')}</summary>
    <div class="group-items">
      {@render pageChoice(ta('lbl.footerPrivacy'), ta('tip.footer.privacy'), siteDraft.footer?.privacyPage ?? '', setPrivacyPage, legal?.privacy.page)}
      {#if legal && !legal.privacy.page}
        <button type="button" class="ghost action" title={ta('tip.legal.makePage')} onclick={() => makePage('privacy')}>{@html ICONS.plus} {ta('ui.makePrivacyPage')}</button>
      {/if}
    </div>
  </details>
  {#if legal?.terms.shown}
    <details class="group legal-fold" class:lit={lit === 'terms'} bind:this={folds.terms}
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
