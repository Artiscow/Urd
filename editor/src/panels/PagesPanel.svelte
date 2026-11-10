<script>
  /* The Pages panel: the site's pages with their names and slugs, each page's settings and actions behind its row's gear (pages/PageSettingsStep.svelte here when «In the panel» is chosen, else the dialog or the table the shell mounts), and a new page from a template. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { PAGE_PRESETS, buildPagePreset } from '$engine/page-presets.js';
  import { safeCssValue } from '$engine/theme.js';
  import { ICONS } from '../lib/icons.js';
  import { pageFills } from '../lib/fill-in.js';
  import PageSettingsStep from './pages/PageSettingsStep.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  const ed = getContext('urd-editor');
  const pageId = $derived(ed.pageId);
  const siteDraft = $derived(ed.siteDraft);
  const templateIds = $derived(ed.templateIds);
  const { addPage, handleDeleteTemplate, selectPage, templateStores } = ed;

  /** The new page's name turned down: the field keeps it in dark red with the reason as its tooltip, until the next keystroke. The rows' names and addresses are shared with the page settings (site.svelte.js typedPageFields). */
  let newPageError = $state(null);

  async function createPage() {
    newPageError = await addPage();
  }

  // The panel closed: a name or an address left turned down refills with what stands.
  $effect(() => () => ed.dropTypedPageFields());

  /* The parts of a template each page still has to fill in (lib/fill-in.js): the open page's after every change (its data is not reactive, the count of changes is), the others' read from their drafts as the panel opens and as pages come and go. */
  const openHere = $derived.by(() => {
    void ed.edits;
    void pageId;
    return pageFills(ed.store?.data);
  });
  let openElsewhere = $state({});
  $effect(() => {
    const others = siteDraft.pages.filter((p) => p.id !== pageId && !p.hidden).map((p) => $state.snapshot(p));
    let live = true;
    Promise.all(others.map((entry) => ed.readPageDraft(entry).then(pageFills).catch(() => null)))
      .then((counts) => { if (live) openElsewhere = Object.fromEntries(others.map((entry, i) => [entry.id, counts[i]])); });
    return () => { live = false; };
  });
  const openOn = (p) => {
    if (p.hidden) return 0;
    const open = p.id === pageId ? openHere : openElsewhere[p.id];
    return open ? open.own + open.contact : 0;
  };

  /* The starter-pack thumbnails are built once (create() per section is
     cheap, but the grid rerenders on every keystroke in the name field). */
  const builtinPageThumbs = Object.fromEntries(PAGE_PRESETS.map((p) => [
    p.id, pageThumb(buildPagePreset(p.id, { pageId: 'preview', title: '' })),
  ]));

  /** The site's color tokens as inline vars on the template thumbnail
   *  grids: the thumbnails draw with var(--urd-color-*) and must show the
   *  SITE's palette, not the admin's (the admin never loads
   *  content/theme.css). Invalid values are dropped. */
  const thumbThemeStyle = $derived.by(() => {
    const c = siteDraft?.theme?.tokens?.color ?? {};
    return ['bg', 'surface', 'text', 'accent']
      .filter((k) => typeof c[k] === 'string' && safeCssValue(c[k]))
      .map((k) => `--urd-color-${k}: ${c[k]};`)
      .join(' ');
  });
</script>

<div class="panel-body">
  {#if ed.pageSettingsPref === 'step' && ed.pageSettingsFor}
  <PageSettingsStep />
  {:else}
  {#each siteDraft.pages as p (p.id)}
    <div class="page-row" class:current={p.id === pageId} class:page-hidden={p.hidden}>
      <input class="page-title" value={ed.pageFieldValue(p, 'title')} title={ed.pageFieldError(p.id, 'title') ?? ta('tip.pages.title')} aria-invalid={ed.pageFieldError(p.id, 'title') ? 'true' : undefined}
        oninput={(e) => ed.typePageField(p.id, 'title', e.target.value)} onchange={(e) => ed.commitPageField(p, 'title', e.target.value)} />
      {#if p.path === '/'}
        <span class="page-path" title={ta('tip.pages.homeLocked')}>/</span>
      {:else}
        <input class="page-slug" value={ed.pageFieldValue(p, 'slug')} title={ed.pageFieldError(p.id, 'slug') ?? ta('tip.pages.slug')} aria-invalid={ed.pageFieldError(p.id, 'slug') ? 'true' : undefined}
          oninput={(e) => ed.typePageField(p.id, 'slug', e.target.value)} onchange={(e) => ed.commitPageField(p, 'slug', e.target.value)} />
      {/if}
      <span class="row-tools">
        <!-- The parts of a template still to fill in on the page, marked on the page itself -->
        {#if openOn(p)}<span class="page-fills" title={ta('tip.pages.fills', { count: openOn(p) })}>{openOn(p)}</span>{/if}
        <!-- Shown or hidden from visitors: hiding a published page asks where its visitors go -->
        <IconButton icon={p.hidden ? ICONS.eyeOff : ICONS.eye} class={p.hidden ? 'row-hidden' : ''} disabled={p.path === '/'} pressed={p.hidden === true}
          label={p.path === '/' ? ta('tip.pages.frontNoHide') : p.hidden ? ta('tip.pages.hiddenShow') : ta('tip.pages.hide')}
          onclick={() => ed.setPageHidden(p, !p.hidden)} />
        <IconButton icon={ICONS.right} label={ta('tip.pages.open')} disabled={p.id === pageId} onclick={() => selectPage(p.id)} />
        <IconButton icon={ICONS.gear} label={ta('tip.pages.settings')} onclick={() => ed.openPageSettings(p.id)} />
      </span>
    </div>
  {/each}
  <!-- Old addresses sent on: the Redirects dialog -->
  <button type="button" class="ghost action redirects-open" title={ta('tip.redirects.open')} onclick={() => ed.openRedirects()}>
    {@html ICONS.redirect}<span>{ta('ui.redirects')}</span>
    {#if ed.redirectRules.length}<span class="redirects-count">{ed.redirectRules.length}</span>{/if}
  </button>
  {/if}
  <hr class="gridmenu-divider" />
  <input data-new-page placeholder={ta('ph.newPageName')} bind:value={() => ed.newPageTitle, (v) => { ed.newPageTitle = v; newPageError = null; }}
    title={newPageError ?? ''} aria-invalid={newPageError ? 'true' : undefined}
    onkeydown={(e) => e.key === 'Enter' && createPage()} />
  <button class="ghost action" title={ta('hint.pages.autoMenu')}
    onclick={createPage} disabled={!ed.newPageTitle.trim()}>{ta('ui.createPage')}</button>
  <span class="mini-label">{ta('canvas.tabPresets')}</span>
  <div class="page-template-grid" style={thumbThemeStyle}>
    <div class="page-template-card" class:picked={ed.newPageTemplate === null}>
      <button class="page-template-pick" title={ta('tip.pages.blankPick')}
        onclick={() => (ed.newPageTemplate = null)}>
        <span class="page-template-thumb">{@html pageThumb({ sections: [] })}</span>
        <span class="page-template-name">{ta('ui.blankPage')}</span>
      </button>
    </div>
    {#each PAGE_PRESETS as p (p.id)}
      <div class="page-template-card" class:picked={ed.newPageTemplate === `preset:${p.id}`}>
        <button class="page-template-pick" title={ta('tip.pages.templatePick', { name: ta(p.labelKey) })}
          onclick={() => (ed.newPageTemplate = ed.newPageTemplate === `preset:${p.id}` ? null : `preset:${p.id}`)}>
          <span class="page-template-thumb">{@html builtinPageThumbs[p.id]}</span>
          <span class="page-template-name">{ta(p.labelKey)}</span>
        </button>
      </div>
    {/each}
  </div>
  {#if templateIds.some((id) => templateStores[id]?.data?.mal?.kind === 'page')}
    <span class="mini-label">{ta('canvas.tabMyTemplates')}</span>
    <div class="page-template-grid" style={thumbThemeStyle}>
      {#each templateIds.filter((id) => templateStores[id]?.data?.mal?.kind === 'page') as id (id)}
        <div class="page-template-card" class:picked={ed.newPageTemplate === id}>
          <button class="page-template-pick" title={ta('tip.pages.templatePick', { name: templateStores[id].data.mal.name })}
            onclick={() => (ed.newPageTemplate = ed.newPageTemplate === id ? null : id)}>
            <span class="page-template-thumb">{@html pageThumb(templateStores[id].data.page)}</span>
            <span class="page-template-name">{templateStores[id].data.mal.name}</span>
          </button>
          <button class="page-template-del danger" title={ta('canvas.deleteTemplate')}
            onclick={() => handleDeleteTemplate({ id })}>{@html ICONS.bin}</button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* A hidden page's row, dimmed, its eye in amber */
  .page-row.page-hidden :global(.page-title),
  .page-row.page-hidden :global(.page-slug) {
    opacity: 0.55;
  }

  .page-row :global(.row-hidden) {
    color: #d9b44a;
  }

  /* The count of parts still to fill in, in the same amber as a hidden page's eye */
  .page-fills {
    align-self: center;
    min-width: 1.2rem;
    padding: 0 0.3rem;
    border-radius: 999px;
    background: color-mix(in srgb, #d9b44a 22%, transparent);
    color: #d9b44a;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    line-height: 1.2rem;
    text-align: center;
  }

  .redirects-open {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.3rem;
  }

  .redirects-count {
    margin-left: auto;
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    opacity: 0.6;
  }
</style>
