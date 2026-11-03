<script>
  /* The Pages panel: the site's pages with their names and slugs, each page's settings and actions behind its row's gear (pages/PageSettingsStep.svelte here when «In the panel» is chosen, else the dialog or the table the shell mounts), and a new page from a template. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { pageThumb } from '$engine/preset-thumb.js';
  import { PAGE_PRESETS, buildPagePreset } from '$engine/page-presets.js';
  import { safeCssValue } from '$engine/theme.js';
  import { ICONS } from '../lib/icons.js';
  import PageSettingsStep from './pages/PageSettingsStep.svelte';
  const ed = getContext('urd-editor');
  const pageId = $derived(ed.pageId);
  const siteDraft = $derived(ed.siteDraft);
  const templateIds = $derived(ed.templateIds);
  const { addPage, handleDeleteTemplate, renamePage, selectPage, setPageSlug, templateStores } = ed;

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
        <button class="ghost row-tool" title={ta('tip.pages.settings')} aria-label={ta('ui.pageSettings')}
          onclick={() => ed.openPageSettings(p.id)}>{@html ICONS.gear}</button>
      </span>
    </div>
  {/each}
  {/if}
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
