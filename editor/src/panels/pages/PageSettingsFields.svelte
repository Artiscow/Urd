<script>
  /* The settings of one page, shared by the three layouts (PageSettingsStep, PageSettingsDialog and PageSettingsTable): the menu and the footer on the page, its title in search with the title the site's format gives, the description, the sharing fields, and the page's own actions.
     The meta fields come from the page-settings state, which writes the open page's store or another page's draft, so any page is edited without switching the canvas; the switches and the flag live in the site draft.
     In the dialog's width (wide) the fields that belong together stand in pairs: the two switches, the search title beside the title it gives, the sharing title beside the image; in a panel's width they stand under each other. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import Choice from '../../lib/Choice.svelte';

  const ed = getContext('urd-editor');
  /** id: the page; grouped: each part as a fold-out group (the step) instead of a heading; wide: the pairs side by side (the dialog); actions: the page's own actions at the end. */
  let { id, grouped = false, wide = false, actions = true } = $props();

  const siteDraft = $derived(ed.siteDraft);
  const entry = $derived(siteDraft.pages.find((p) => p.id === id) ?? null);
  const meta = $derived(ed.pageMetas[id] ?? { searchTitle: '', description: '', ogTitle: '', ogDescription: '', ogImage: '' });
  const navOn = $derived(!(siteDraft.nav?.hideOn ?? []).includes(id));
  const stripShown = $derived(ed.announcementOn());
  const stripOn = $derived(!(siteDraft.nav?.announcement?.hideOn ?? []).includes(id));
  const footerShown = $derived(siteDraft.footer?.show === true);
  const footerOn = $derived(!(siteDraft.footer?.hideOn ?? []).includes(id));
  const front = $derived(entry?.path === '/');

  function makeFront() {
    const swap = ed.makeFrontPage(id);
    if (swap) ed.frontPageStatus(entry, swap.from);
  }

  /** The template's name is asked for over the admin, so the modal dialog steps aside first. */
  function saveTemplate() {
    const page = entry;
    if (ed.pageSettingsPref === 'dialog') ed.closePageSettings();
    ed.savePageAsTemplate(page);
  }

  function deletePage() {
    ed.closePageSettings();
    ed.deletePage(entry);
  }
</script>

{#snippet part(key, body)}
  {#if grouped}
    <details class="group" open>
      <summary>{ta(key)}</summary>
      <div class="group-items">{@render body()}</div>
    </details>
  {:else}
    <section class="ps-part">
      <h3 class="mini-label ps-head">{ta(key)}</h3>
      {@render body()}
    </section>
  {/if}
{/snippet}

{#snippet onPage()}
  <div class="ps-pair ps-switches">
    <label class="gridmenu-snap" title={ta('tip.pages.navOnPage')}>
      <input type="checkbox" checked={navOn} onchange={(e) => ed.toggleNavOnPage(id, e.target.checked)} />
      {ta('lbl.navOnPage')}
    </label>
    {#if stripShown}
      <label class="gridmenu-snap" title={ta('tip.pages.announcementOnPage')}>
        <input type="checkbox" checked={stripOn} onchange={(e) => ed.toggleAnnouncementOnPage(id, e.target.checked)} />
        {ta('lbl.announcementOnPage')}
      </label>
    {/if}
    {#if footerShown}
      <label class="gridmenu-snap" title={ta('tip.pages.footerOnPage')}>
        <input type="checkbox" checked={footerOn} onchange={(e) => ed.toggleFooterOnPage(id, e.target.checked)} />
        {ta('lbl.footerOnPage')}
      </label>
    {/if}
  </div>
  {#if !navOn}
    <!-- How the menu is reached on this page: the site's one choice, shown where it applies -->
    <Choice label={ta('lbl.navReachedBy')} title={ta('tip.nav.hideMode')} value={siteDraft.nav.hideMode ?? 'hidden'}
      options={ed.NAV_HIDE_MODE_OPTIONS} onchange={ed.setNavHideMode} />
  {/if}
{/snippet}

{#snippet search()}
  <div class="ps-pair">
    <label class="field-stack" title={ta('tip.seo.searchTitle')}>{ta('lbl.searchTitle')}
      <input value={meta.searchTitle} placeholder={entry?.title ?? ''} onchange={(e) => ed.setPageMeta(id, 'searchTitle', e.target.value)} />
    </label>
    <div class="ps-field" title={ta('tip.site.titleFormat')}>
      <span class="ps-name">{ta('lbl.titleResult')}</span>
      <output class="ps-result">{ed.pageTitleOf(id)}</output>
    </div>
  </div>
  <label class="field-stack" title={ta('tip.seo.description')}>{ta('lbl.seoDescription')}
    <!-- An empty field says in grey what the description is and where it shows -->
    <textarea rows="2" value={meta.description} placeholder={ta('ph.seo.description')} onchange={(e) => ed.setPageMeta(id, 'description', e.target.value)}></textarea>
  </label>
  <label class="gridmenu-snap" title={ta('tip.seo.hideFromSearch')}>
    <input type="checkbox" checked={entry?.noindex === true} onchange={(e) => ed.setPageNoindex(e.target.checked, id)} />
    {ta('lbl.hideFromSearch')}
  </label>
{/snippet}

{#snippet sharing()}
  <div class="ps-pair">
    <label class="field-stack" title={ta('tip.seo.ogTitle')}>{ta('lbl.ogTitle')}
      <input value={meta.ogTitle} placeholder={meta.searchTitle || entry?.title || ''} onchange={(e) => ed.setPageMeta(id, 'ogTitle', e.target.value)} />
    </label>
    <div class="ps-field" title={ta('tip.seo.ogImage')}>
      <span class="ps-name">{ta('lbl.ogImage')}</span>
      <span class="ps-image">
        {#if meta.ogImage}<img class="ps-thumb" src={meta.ogImage} alt={ta('lbl.ogImage')} />{/if}
        <label class="ghost filepick ps-pick" title={ta('tip.seo.ogImage')}>
          {meta.ogImage ? ta('ui.changeImage') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={(e) => ed.uploadPageOgImage(id, e)} />
        </label>
        {#if meta.ogImage}
          <button class="ghost row-tool" title={ta('tip.seo.removeOgImage')} aria-label={ta('tip.seo.removeOgImage')} onclick={() => ed.setPageMeta(id, 'ogImage', '')}>{@html ICONS.cross}</button>
        {/if}
      </span>
    </div>
  </div>
  <label class="field-stack" title={ta('tip.seo.ogDescription')}>{ta('lbl.ogDescription')}
    <textarea rows="2" value={meta.ogDescription} placeholder={meta.description} onchange={(e) => ed.setPageMeta(id, 'ogDescription', e.target.value)}></textarea>
  </label>
{/snippet}

{#snippet thePage()}
  <div class="ps-actions">
    {#if !front}
      <button class="ghost action" title={ta('tip.pages.makeFront')} onclick={makeFront}>{@html ICONS.home} {ta('ui.makeFrontPage')}</button>
    {/if}
    <button class="ghost action" title={ta('tip.pages.duplicate')} onclick={() => ed.duplicatePage(entry)}>{@html ICONS.copy} {ta('ui.duplicatePage')}</button>
    <button class="ghost action" title={ta('tip.pages.saveTemplate')} onclick={saveTemplate}>{@html ICONS.bookmark} {ta('ui.savePageTemplate')}</button>
    {#if !front}
      <button class="ghost action danger" title={ta('tip.pages.delete')} onclick={deletePage}>{@html ICONS.cross} {ta('ui.deletePage')}</button>
    {/if}
  </div>
{/snippet}

{#if entry}
  <div class="ps-fields" class:ps-grouped={grouped} class:ps-wide={wide}>
    {@render part('group.onThisPage', onPage)}
    {@render part('group.pageSearch', search)}
    {@render part('group.pageSharing', sharing)}
    {#if actions}
      {@render part('group.thePage', thePage)}
    {/if}
  </div>
{/if}

<style>
  .ps-fields {
    display: grid;
    gap: 1.1rem;
    align-content: start;
  }

  .ps-fields.ps-grouped {
    gap: 0.6rem;
  }

  /* One part: its heading, then its fields at the panels' spacing */
  .ps-part {
    display: grid;
    gap: 0.6rem;
    align-content: start;
  }

  .ps-head {
    margin: 0;
  }

  /* Each part but the first stands under a rule, so the three read as three */
  .ps-part + .ps-part {
    padding-top: 1rem;
    border-top: 1px solid rgb(255 255 255 / 8%);
  }

  /* Two fields that belong together: under each other in a panel, side by side in the dialog */
  .ps-pair {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.6rem;
    align-items: start;
  }

  .ps-wide .ps-pair {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem 1.25rem;
  }

  /* The page's switches stand side by side however many the site has on */
  .ps-wide .ps-pair.ps-switches {
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    gap: 0.6rem;
    align-items: stretch;
  }

  /* A switch's name on one line, so the tiles in the row stand the same height */
  .ps-wide .ps-switches .gridmenu-snap {
    white-space: nowrap;
  }

  /* In the dialog's width every switch stands on its own faint tile with its name, so a switch is never read as the next one's */
  .ps-wide .gridmenu-snap {
    padding: 0.55rem 0.75rem;
    background: rgb(255 255 255 / 4%);
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 8px;
  }

  /* A field that is not a text field, laid out as the labelled fields are: its name, then the thing itself */
  .ps-field {
    display: grid;
    gap: 5px;
    min-width: 0;
    font-size: 0.85rem;
  }

  .ps-name {
    min-width: 0;
  }

  /* The title the format gives, at a field's height on a faint surface */
  .ps-result {
    display: flex;
    align-items: center;
    min-width: 0;
    height: 2.2rem;
    padding: 0 0.6rem;
    overflow: hidden;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: rgb(255 255 255 / 6%);
    border-radius: 6px;
  }

  .ps-image {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    min-width: 0;
  }

  .ps-thumb {
    flex: none;
    width: 3.6rem;
    height: 2.2rem;
    object-fit: cover;
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 6px;
  }

  .ps-pick {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 0;
    height: 2.2rem;
  }

  .ps-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .ps-actions .action {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .ps-actions .danger {
    color: #e05252;
  }
</style>
