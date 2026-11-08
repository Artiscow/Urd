<script>
  /* Every page's settings as a table over the canvas («Table over the page» under Page settings): a row per page with the quick settings as cells, the front page as a radio in its column, and the chosen page's every field in a drawer at the right (PageSettingsFields.svelte).
     A cell writes as it is left; Escape closes the table. */
  import { getContext, untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import PageSettingsFields from './PageSettingsFields.svelte';
  import HideButton from './HideButton.svelte';
  import HiddenRow from './HiddenRow.svelte';

  const ed = getContext('urd-editor');
  let rootEl = $state(null);

  const id = $derived(ed.pageSettingsFor);
  const siteDraft = $derived(ed.siteDraft);
  const pages = $derived(siteDraft.pages);
  const entry = $derived(pages.find((p) => p.id === id) ?? null);
  const footerShown = $derived(siteDraft.footer?.show === true);
  const stripShown = $derived(ed.announcementOn());
  const metaOf = (pid) => ed.pageMetas[pid] ?? { searchTitle: '', description: '' };

  $effect(() => { rootEl?.focus(); });

  // An undo or a redo may have changed any page's fields: the cells read them again.
  let restoresSeen = untrack(() => ed.restores);
  $effect(() => {
    const n = ed.restores;
    if (n === restoresSeen) return;
    restoresSeen = n;
    untrack(() => ed.loadAllPageMetas());
  });

  function onKey(e) {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    ed.closePageSettings();
  }

  function makeFront(p) {
    const swap = ed.makeFrontPage(p.id);
    if (swap) ed.frontPageStatus(p, swap.from);
  }
</script>

{#if id}
  <!-- Escape anywhere over the table closes it -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <section class="pt" bind:this={rootEl} tabindex="-1" aria-label={ta('ui.pageSettings')} onkeydown={onKey}>
    <div class="pt-head">
      <h2 class="pt-title">{ta('ui.pageSettings')}</h2>
      <span class="pt-grow"></span>
      <IconButton icon={ICONS.cross} label={ta('tip.pages.closeSettings')} onclick={() => ed.closePageSettings()} />
    </div>
    <div class="pt-body">
      <div class="pt-scroll">
        <table class="pt-table">
          <thead>
            <tr>
              <th scope="col">{ta('pages.col.page')}</th>
              <th scope="col">{ta('pages.col.address')}</th>
              <th scope="col" class="pt-c">{ta('pages.col.front')}</th>
              <th scope="col" class="pt-c">{ta('pages.col.nav')}</th>
              {#if stripShown}<th scope="col" class="pt-c">{ta('pages.col.announcement')}</th>{/if}
              {#if footerShown}<th scope="col" class="pt-c">{ta('pages.col.footer')}</th>{/if}
              <th scope="col">{ta('lbl.searchTitle')}</th>
              <th scope="col">{ta('lbl.seoDescription')}</th>
              <th scope="col" class="pt-c">{ta('pages.col.noSearch')}</th>
              <th scope="col" class="pt-c">{ta('pages.col.hidden')}</th>
            </tr>
          </thead>
          <tbody>
            {#each pages as p (p.id)}
              <tr class:selected={p.id === id}>
                <td class="pt-name"><button type="button" class="pt-open" aria-current={p.id === id ? 'true' : undefined} title={ta('tip.pages.openRow')} onclick={() => ed.openPageSettings(p.id)}>{p.title || p.id}</button></td>
                <td class="pt-path">{p.path}</td>
                <td class="pt-c"><input type="radio" name="pt-front" checked={p.path === '/'} aria-label={ta('tip.pages.frontRadio')} title={ta('tip.pages.frontRadio')} onchange={() => makeFront(p)} /></td>
                <td class="pt-c"><input type="checkbox" checked={!(siteDraft.nav?.hideOn ?? []).includes(p.id)} aria-label={ta('lbl.navOnPage')} title={ta('tip.pages.navOnPage')} onchange={(e) => ed.toggleNavOnPage(p.id, e.target.checked)} /></td>
                {#if stripShown}
                  <td class="pt-c"><input type="checkbox" checked={!(siteDraft.nav?.announcement?.hideOn ?? []).includes(p.id)} aria-label={ta('lbl.announcementOnPage')} title={ta('tip.pages.announcementOnPage')} onchange={(e) => ed.toggleAnnouncementOnPage(p.id, e.target.checked)} /></td>
                {/if}
                {#if footerShown}
                  <td class="pt-c"><input type="checkbox" checked={!(siteDraft.footer?.hideOn ?? []).includes(p.id)} aria-label={ta('lbl.footerOnPage')} title={ta('tip.pages.footerOnPage')} onchange={(e) => ed.toggleFooterOnPage(p.id, e.target.checked)} /></td>
                {/if}
                <td><input class="pt-cell" value={metaOf(p.id).searchTitle} placeholder={p.title} aria-label={ta('lbl.searchTitle')} title={ta('tip.seo.searchTitle')} onchange={(e) => ed.setPageMeta(p.id, 'searchTitle', e.target.value)} /></td>
                <td><input class="pt-cell pt-wide" value={metaOf(p.id).description} placeholder={ta('pages.noDescription')} aria-label={ta('lbl.seoDescription')} title={ta('tip.seo.description')} onchange={(e) => ed.setPageMeta(p.id, 'description', e.target.value)} /></td>
                <td class="pt-c"><input type="checkbox" checked={p.noindex === true} aria-label={ta('lbl.hideFromSearch')} title={ta('tip.seo.hideFromSearch')} onchange={(e) => ed.setPageNoindex(e.target.checked, p.id)} /></td>
                <!-- Hidden from visitors: hiding a published page asks where its visitors go, so the box shows what stands once that is answered -->
                <td class="pt-c"><input type="checkbox" checked={p.hidden === true} disabled={p.path === '/'} aria-label={ta('ui.hidden')} title={p.path === '/' ? ta('tip.pages.frontNoHide') : ta('tip.pages.hide')}
                  onchange={async (e) => { await ed.setPageHidden(p, e.target.checked); e.target.checked = p.hidden === true; }} /></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <aside class="pt-drawer panel-body" aria-label={entry?.title ?? ''}>
        {#if entry}
          <span class="pt-drawer-head"><span class="pt-drawer-name">{entry.title}</span><span class="pt-path">{entry.path}</span><HideButton {id} /></span>
          <HiddenRow {id} />
          {#key id}<PageSettingsFields {id} />{/key}
        {/if}
      </aside>
    </div>
  </section>
{/if}

<style>
  /* Over the whole stage, on the panels' surface, as the collections table stands */
  .pt {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    background: var(--urd-color-surface, #151a23);
    color: var(--urd-color-text, #e8eaf0);
    font-family: var(--urd-font-body, system-ui, sans-serif);
    font-size: 0.88rem;
    outline: none;
  }

  .pt-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem 1rem;
    border-bottom: 1px solid rgb(255 255 255 / 8%);
  }

  .pt-title {
    margin: 0;
    font-size: 1rem;
  }

  .pt-grow {
    flex: 1;
  }

  .pt-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 20rem;
    min-height: 0;
  }

  .pt-scroll {
    min-height: 0;
    padding: 0 1rem 1rem;
    overflow: auto;
    scrollbar-width: thin;
  }

  .pt-table {
    width: 100%;
    border-collapse: collapse;
  }

  .pt-table th {
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

  .pt-table td {
    padding: 0.35rem 0.5rem;
    vertical-align: middle;
    border-bottom: 1px solid rgb(255 255 255 / 6%);
  }

  .pt-c {
    text-align: center;
  }

  /* The chosen row: its name in the accent, never a line at the edge */
  .pt-table tr.selected td {
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 8%, transparent);
  }

  .pt-open {
    padding: 0.2rem 0;
    font: inherit;
    font-weight: 600;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
  }

  .pt-open[aria-current='true'] {
    color: var(--urd-color-accent, #7c5cff);
  }

  .pt-path {
    font-family: ui-monospace, monospace;
    font-size: 0.78rem;
    opacity: 0.65;
  }

  .pt-cell {
    width: 11rem;
    padding: 0.3rem 0.45rem;
    font: inherit;
    font-size: 0.84rem;
    color: inherit;
    background: rgb(255 255 255 / 4%);
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 6px;
  }

  .pt-cell.pt-wide {
    width: 18rem;
  }

  .pt-drawer {
    display: grid;
    gap: 0.5rem;
    align-content: start;
    min-height: 0;
    padding: 1rem;
    overflow-y: auto;
    scrollbar-width: thin;
    border-left: 1px solid rgb(255 255 255 / 8%);
    background: var(--urd-color-bg, #0f1218);
  }

  .pt-drawer-head {
    display: grid;
    gap: 0.1rem;
    padding-bottom: 0.3rem;
  }

  .pt-drawer-head :global(.hide-btn) {
    justify-self: start;
    margin-top: 0.35rem;
  }

  .pt-drawer-name {
    font-size: 1rem;
    font-weight: 600;
  }
</style>
