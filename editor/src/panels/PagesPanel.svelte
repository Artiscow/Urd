<script>
  /* The Pages panel: the site's pages, a new page from a template, and each page's slug, search text and sharing image. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { PAGE_PRESETS, buildPagePreset } from '$engine/page-presets.js';
  import { safeCssValue } from '$engine/theme.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const pageId = $derived(ed.pageId);
  const seoDraft = $derived(ed.seoDraft);
  const siteDraft = $derived(ed.siteDraft);
  // The open page lacks a description, unless it is hidden from search: a hollow dot on its Search and sharing group points at the field.
  const missingDescription = $derived(!siteDraft.pages.find((p) => p.id === pageId)?.noindex && !seoDraft.description);
  const templateIds = $derived(ed.templateIds);
  const { addPage, deletePage, handleDeleteTemplate, renamePage, savePageAsTemplate, selectPage, setPageNoindex, setPageSeo, setPageSlug, templateStores, uploadOgImage } = ed;

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
  {#each siteDraft.pages as p (p.id)}
    <div class="page-row" class:current={p.id === pageId}>
      <input class="page-title" value={p.title} title={ta('tip.pages.title')}
        onchange={(e) => renamePage(p, e.target.value)} />
      {#if p.path === '/'}
        <span class="page-path" title={ta('tip.pages.homeLocked')}>/</span>
      {:else}
        <input class="page-slug" value={p.path.slice(1)} title={ta('tip.pages.slug')}
          onchange={(e) => setPageSlug(p, e.target.value)} />
      {/if}
      <span class="row-tools">
        <button class="ghost row-tool" title={ta('tip.pages.open')}
          disabled={p.id === pageId} onclick={() => selectPage(p.id)}>{@html ICONS.right}</button>
        <span class="page-menu-wrap">
          <button class="ghost row-tool" title={ta('tip.pages.menu')}
            onclick={() => (ed.pageMenuFor = ed.pageMenuFor === p.id ? null : p.id)}>{@html ICONS.kebab}</button>
          {#if ed.pageMenuFor === p.id}
            <div class="page-menu">
              <button class="ghost" onclick={() => savePageAsTemplate(p)}>
                {@html ICONS.bookmark} {ta('ui.savePageTemplate')}</button>
              {#if p.path !== '/'}
                <button class="ghost danger" title={ta('tip.pages.delete')}
                  onclick={() => { ed.pageMenuFor = null; deletePage(p); }}>
                  {@html ICONS.cross} {ta('ui.deletePage')}</button>
              {/if}
            </div>
          {/if}
        </span>
      </span>
    </div>
  {/each}
  <details class="group">
    <summary>{ta('ui.seoGroup', { page: siteDraft.pages.find((p) => p.id === pageId)?.title ?? '' })}{#if missingDescription}<i class="note-dot" title={ta('tip.pages.missingDescription')}></i>{/if}</summary>
    <div class="group-items">
      <label title={ta('tip.seo.description')}>{ta('lbl.seoDescription')}
        <textarea rows="2" value={seoDraft.description}
          onchange={(e) => setPageSeo('description', e.target.value)}></textarea>
      </label>
      <label title={ta('tip.seo.ogTitle')}>{ta('lbl.ogTitle')}
        <input value={seoDraft.ogTitle}
          placeholder={siteDraft.pages.find((p) => p.id === pageId)?.title ?? ''}
          onchange={(e) => setPageSeo('ogTitle', e.target.value)} />
      </label>
      <label title={ta('tip.seo.ogDescription')}>{ta('lbl.ogDescription')}
        <textarea rows="2" value={seoDraft.ogDescription} placeholder={seoDraft.description}
          onchange={(e) => setPageSeo('ogDescription', e.target.value)}></textarea>
      </label>
      <label title={ta('tip.seo.ogImage')}>{ta('lbl.ogImage')}
        {#if seoDraft.ogImage}
          <img class="site-icon-preview" src={seoDraft.ogImage} alt={ta('lbl.ogImage')} />
        {/if}
      </label>
      <span class="toolbar-row">
        <label class="ghost filepick tb-grow" title={ta('tip.seo.ogImage')}>
          {seoDraft.ogImage ? ta('ui.changeImage') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={uploadOgImage} />
        </label>
        {#if seoDraft.ogImage}
          <button class="ghost row-tool" title={ta('tip.seo.removeOgImage')}
            onclick={() => setPageSeo('ogImage', '')}>{@html ICONS.cross}</button>
        {/if}
      </span>
      <label class="gridmenu-snap" title={ta('tip.seo.hideFromSearch')}>
        <input type="checkbox"
          checked={siteDraft.pages.find((p) => p.id === pageId)?.noindex === true}
          onchange={(e) => setPageNoindex(e.target.checked)} />
        {ta('lbl.hideFromSearch')}
      </label>
    </div>
  </details>
  <hr class="gridmenu-divider" />
  <input placeholder={ta('ph.newPageName')} bind:value={() => ed.newPageTitle, (v) => (ed.newPageTitle = v)}
    onkeydown={(e) => e.key === 'Enter' && addPage()} />
  <button class="ghost action" title={ta('hint.pages.autoMenu')}
    onclick={addPage} disabled={!ed.newPageTitle.trim()}>{ta('ui.createPage')}</button>
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
          <button class="page-template-del" title={ta('canvas.deleteTemplate')}
            onclick={() => handleDeleteTemplate({ id })}>{@html ICONS.cross}</button>
        </div>
      {/each}
    </div>
  {/if}
</div>
