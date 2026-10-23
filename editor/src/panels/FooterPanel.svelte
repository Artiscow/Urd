<script>
  /* The Footer panel: the brand, the columns with their links, the social icons, the call to action, the templates and the footer's background. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import { ta } from '$engine/i18n.js';
  import { footerDesign } from '$engine/footer-model.js';
  import { glowLayer } from '$engine/backgrounds/glow.js';
  import { grainLayer } from '$engine/backgrounds/grain.js';
  import { footerThumb } from '$engine/footer-thumb.js';
  import { siteContact, contactParts, legalParts } from '$engine/contact-model.js';
  import { ICONS } from '../lib/icons.js';
  import BackgroundEditor from '../section/BackgroundEditor.svelte';
  import LinkField from '../lib/LinkField.svelte';
  import { linkOf, setLinkOn } from '../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const pageId = $derived(ed.pageId);
  const siteDraft = $derived(ed.siteDraft);
  const { compressOrTrim, footerBgCtx, footerMutate, setStatus } = ed;

  function setFooterBrand(field, value) {
    footerMutate(`edit:footer-brand-${field}`, (f) => {
      f.brand ??= {};
      if (value.trim()) f.brand[field] = value; else delete f.brand[field];
      if (!f.brand.title && !f.brand.tagline && !f.brand.logo) delete f.brand;
    });
  }

  /* Footer logo (text/logo/both, mirrors the nav logo): uploaded to webp,
     materialized to media/ on publish. */
  function setFooterBrandMode(value) {
    footerMutate('footer', (f) => {
      f.brand ??= {};
      if (value === 'image' || value === 'both') f.brand.mode = value; else delete f.brand.mode;
    });
  }

  async function uploadFooterLogo(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      footerMutate('footer', (f) => { f.brand ??= {}; f.brand.logo = img.dataUrl; if (!f.brand.mode) f.brand.mode = 'both'; });
    } catch {
      setStatus(ta('status.imageReadErrorSvg'), 'error');
    }
  }

  function removeFooterLogo() {
    footerMutate('footer', (f) => {
      if (!f.brand) return;
      delete f.brand.logo; delete f.brand.mode; delete f.brand.logoHeight;
      if (!f.brand.title && !f.brand.tagline) delete f.brand;
    });
  }

  function setFooterLogoHeight(value) {
    footerMutate('edit:footer-logo-height', (f) => {
      f.brand ??= {};
      const n = Number(value);
      if (Number.isFinite(n)) f.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n)));
    });
  }

  function setFooterCopyright(value) {
    footerMutate('edit:footer-copyright', (f) => {
      if (value.trim()) f.copyright = value; else delete f.copyright;
    });
  }

  /* Footer templates: ten research-based starting layouts, built from
     the site's own pages and title. They fill the footer; everything can
     be edited further. Each has a small thumb description for the visual
     template picker (footerThumb). */
  const FOOTER_TEMPLATES = [
    { id: 'minimal', label: ta('footerTemplate.minimal'), thumb: { center: true, social: 2, baselineLinks: 1 } },
    { id: 'centered', label: ta('footerTemplate.centered'), thumb: { center: true, row: true, social: 3 } },
    { id: 'columns', label: ta('footerTemplate.columns'), thumb: { tag: true, cols: 3, social: 3, baselineLinks: 2 } },
    { id: 'sitemap', label: ta('footerTemplate.sitemap'), thumb: { tag: true, fat: true, cols: 4, social: 4, baselineLinks: 3 } },
    { id: 'newsletter', label: ta('footerTemplate.newsletter'), thumb: { tag: true, cta: true, cols: 2, social: 2, baselineLinks: 1 } },
    { id: 'bigcta', label: ta('footerTemplate.bigcta'), thumb: { center: true, bigcta: true, baselineLinks: 2 } },
    { id: 'contact', label: ta('footerTemplate.contact'), thumb: { tag: true, cols: 2, social: 2, baselineLinks: 1 } },
    { id: 'mega', label: ta('footerTemplate.mega'), thumb: { tag: true, mega: true, cols: 2, social: 4, baselineLinks: 2 } },
    { id: 'chapters', label: ta('footerTemplate.chapters'), thumb: { chapters: true, cols: 3, baselineLinks: 2 } },
    { id: 'split', label: ta('footerTemplate.split'), thumb: { split: true, cols: 2, baselineLinks: 1 } },
  ];

  function footerTemplateConfig(name) {
    // ALWAYS a neutral placeholder, NEVER the site title: the site title
    // can contain anything (e.g. a version number on a test site), and
    // sample text must never carry a version number. The owner types in
    // their own name.
    const title = ta('seed.orgName');
    const pages = siteDraft.pages ?? [];
    const pageLinks = (n) => pages.slice(0, n).map((p) => ({ label: p.title || p.id, page: p.id }));
    const ext = (label, href) => ({ label, href });
    const copyright = `© ${title}`;
    if (name === 'minimal') {
      return { align: 'center', brand: { title },
        copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    if (name === 'centered') {
      return { align: 'center', brand: { title }, linkRow: pageLinks(5),
        copyright: `${copyright} · ${ta('seed.footer.madeWith')}` };
    }
    if (name === 'columns') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline1') },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
          { title: ta('seed.footer.colCompany'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.join'), '#'), ext(ta('seed.footer.press'), '#')] },
          { title: ta('seed.footer.colResources'), links: [ext(ta('seed.footer.bylaws'), '#'), ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.contact'), '#')] },
        ],
        copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#')] };
    }
    if (name === 'sitemap') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline2') },
        columns: [
          { title: ta('seed.footer.colExplore'), links: [ext(ta('seed.footer.home'), '#'), ext(ta('seed.footer.events'), '#'), ext(ta('seed.footer.gallery'), '#'), ext(ta('seed.footer.blog'), '#')] },
          { title: ta('seed.footer.colCompany'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.history'), '#'), ext(ta('seed.footer.press'), '#'), ext(ta('seed.footer.contact'), '#')] },
          { title: ta('seed.footer.colSupport'), links: [ext(ta('seed.join'), '#'), ext(ta('seed.footer.faq'), '#'), ext(ta('seed.footer.help'), '#')] },
          { title: ta('seed.footer.colLegal'), links: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#'), ext(ta('seed.footer.bylaws'), '#')] },
        ],
        copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#'), ext(ta('seed.footer.cookies'), '#')] };
    }
    if (name === 'newsletter') {
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline3') },
        cta: { kind: 'newsletter', heading: ta('seed.footer.newsletterHeading'), label: ta('seed.footer.newsletterButton'), recipient: ta('seed.email'), success: ta('seed.footer.newsletterSuccess') },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
          { title: ta('seed.footer.colMore'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.contact'), '#'), ext(ta('seed.footer.privacy'), '#')] },
        ],
        copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    if (name === 'bigcta') {
      return { align: 'center',
        cta: { kind: 'button', big: true, heading: ta('seed.footer.ctaHeading'), sub: ta('seed.footer.ctaSub'), label: ta('seed.join'), href: '#' },
        linkRow: pageLinks(4), copyright,
        baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#')] };
    }
    if (name === 'contact') {
      // The contact column after the pages is the site's own contact details (the Site panel), never sample text.
      return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline4') },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
        ],
        copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    if (name === 'chapters') {
      // The link columns as numbered chapters under a rule each (footer.design).
      return { align: 'left', design: 'chapters', brand: { title, tagline: ta('seed.footer.tagline2') },
        columns: [
          { title: ta('seed.footer.colExplore'), links: pageLinks(4) },
          { title: ta('seed.footer.colCompany'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.history'), '#'), ext(ta('seed.footer.contact'), '#')] },
          { title: ta('seed.footer.colSupport'), links: [ext(ta('seed.join'), '#'), ext(ta('seed.footer.faq'), '#'), ext(ta('seed.footer.help'), '#')] },
        ],
        copyright, baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.terms'), '#')] };
    }
    if (name === 'split') {
      // The brand with a call to action on a tinted half, the columns in the other half (footer.design).
      return { align: 'left', design: 'split', brand: { title, tagline: ta('seed.footer.tagline1') },
        cta: { kind: 'button', heading: ta('seed.footer.ctaHeading'), label: ta('seed.join'), href: '#' },
        columns: [
          { title: ta('seed.footer.colPages'), links: pageLinks(4) },
          { title: ta('seed.footer.colMore'), links: [ext(ta('seed.footer.about'), '#'), ext(ta('seed.footer.contact'), '#'), ext(ta('seed.footer.privacy'), '#')] },
        ],
        copyright, baseline: [ext(ta('seed.footer.privacy'), '#')] };
    }
    // mega: columns + background layers (glow + grain).
    return { align: 'left', brand: { title, tagline: ta('seed.footer.tagline5') },
      columns: [
        { title: ta('seed.footer.colExplore'), links: pageLinks(4) },
        { title: ta('seed.footer.colFollow'), links: [ext(ta('seed.footer.newsletter'), '#'), ext(ta('seed.email'), `mailto:${ta('seed.email')}`)] },
      ],
      copyright,
      baseline: [ext(ta('seed.footer.privacy'), '#'), ext(ta('seed.footer.madeWith'), '#')],
      background: { version: 1, layers: [
        { type: 'glow', version: glowLayer.version ?? 1, props: { ...glowLayer.defaults(), color: 'accent', x: 0.12, y: 0, radius: 0.6, opacity: 0.45 } },
        { type: 'grain', version: grainLayer.version ?? 1, props: { ...grainLayer.defaults(), opacity: 0.08 } },
      ] } };
  }

  /** Apply a footer layout: replaces the content fields and turns the footer on. */
  function applyFooterTemplate(name) {
    footerMutate('footer-template', (f) => {
      const t = footerTemplateConfig(name);
      f.show = true;
      delete f.text; // "Simple text" is the legacy form; the templates use the rich footer.
      for (const k of ['align', 'brand', 'columns', 'social', 'copyright', 'baseline', 'linkRow', 'cta', 'columnsAlign', 'background', 'design', 'contact', 'legal']) {
        if (t[k] !== undefined) f[k] = t[k]; else delete f[k];
      }
    });
  }

  /* Generic link-list handlers for the bottom-line links (baseline) and
     the doormat row (linkRow) - same shape as the column links, but on a
     flat list. */
  function addFooterListLink(field) {
    footerMutate('footer', (f) => {
      f[field] ??= [];
      f[field].push(siteDraft.pages[0] ? { label: ta('seed.link'), page: siteDraft.pages[0].id } : { label: ta('seed.link'), href: 'https://' });
    });
  }

  function removeFooterListLink(field, i) {
    footerMutate('footer', (f) => { f[field].splice(i, 1); if (!f[field].length) delete f[field]; });
  }

  function moveFooterListLink(field, i, dir) {
    footerMutate('footer', (f) => {
      const a = f[field]; const j = i + dir;
      if (j < 0 || j >= a.length) return;
      [a[i], a[j]] = [a[j], a[i]];
    });
  }

  function setFooterListLinkLabel(field, i, value) {
    footerMutate(`edit:footer-${field}-label-${i}`, (f) => { f[field][i].label = value; });
  }

  /** A bottom-line or link-row link from the link editor. */
  function setFooterListLink(field, i, link) {
    footerMutate('footer', (f) => setLinkOn(f[field][i], link));
  }

  /** Column alignment: the heading of a wide (two-part) column. */
  function setFooterColumnsAlign(value) {
    footerMutate('footer', (f) => { if (value === 'center') f.columnsAlign = 'center'; else delete f.columnsAlign; });
  }

  /* Call to action (CTA): a button (link) or newsletter (email field). */
  function enableFooterCta(on) {
    footerMutate('footer', (f) => { if (on) f.cta ??= { kind: 'button', label: ta('seed.join') }; else delete f.cta; });
  }

  function setFooterCtaField(field, value) {
    footerMutate(`edit:footer-cta-${field}`, (f) => {
      f.cta ??= {};
      if (value === '' || value == null || value === false) delete f.cta[field];
      else f.cta[field] = value;
    });
  }

  /** The call to action's link from the link editor. */
  function setFooterCtaLink(link) {
    footerMutate('footer', (f) => {
      f.cta ??= {};
      setLinkOn(f.cta, link);
    });
  }

  /** Per-page visibility: the footer shows on all pages except those in hideOn. */
  function toggleFooterOnPage(pageId, show) {
    footerMutate('footer', (f) => {
      const hide = new Set(f.hideOn ?? []);
      if (show) hide.delete(pageId); else hide.add(pageId);
      if (hide.size) f.hideOn = [...hide]; else delete f.hideOn;
    });
  }

  function addFooterColumn() {
    footerMutate('footer', (f) => {
      f.columns ??= [];
      f.columns.push({ title: ta('seed.column'), links: [{ label: ta('seed.link'), page: siteDraft.pages[0].id }] });
    });
  }

  function removeFooterColumn(ci) {
    footerMutate('footer', (f) => { f.columns.splice(ci, 1); if (!f.columns.length) delete f.columns; });
  }

  function moveFooterColumn(ci, dir) {
    footerMutate('footer', (f) => {
      const j = ci + dir;
      if (j < 0 || j >= f.columns.length) return;
      [f.columns[ci], f.columns[j]] = [f.columns[j], f.columns[ci]];
    });
  }

  function setFooterColumnTitle(ci, value) {
    footerMutate(`edit:footer-col-title-${ci}`, (f) => { f.columns[ci].title = value; });
  }

  function addFooterLink(ci) {
    footerMutate('footer', (f) => {
      f.columns[ci].links ??= [];
      f.columns[ci].links.push({ label: ta('seed.link'), page: siteDraft.pages[0].id });
    });
  }

  function removeFooterLink(ci, li) {
    footerMutate('footer', (f) => { f.columns[ci].links.splice(li, 1); });
  }

  function moveFooterLink(ci, li, dir) {
    footerMutate('footer', (f) => {
      const links = f.columns[ci].links;
      const j = li + dir;
      if (j < 0 || j >= links.length) return;
      [links[li], links[j]] = [links[j], links[li]];
    });
  }

  function setFooterLinkLabel(ci, li, value) {
    footerMutate(`edit:footer-link-label-${ci}-${li}`, (f) => { f.columns[ci].links[li].label = value; });
  }

  /** A column link from the link editor. */
  function setFooterLink(ci, li, link) {
    footerMutate('footer', (f) => setLinkOn(f.columns[ci].links[li], link));
  }

</script>

<div class="panel-body">
  <label class="gridmenu-snap" title={ta('tip.footer.show')}>
    <input type="checkbox" checked={Boolean(siteDraft.footer?.show)}
      onchange={(e) => footerMutate('footer', (f) => { f.show = e.target.checked; })} />
    {ta('lbl.showFooter')}
  </label>

  {#if siteDraft.footer?.show}
    <details class="group">
      <summary>{ta('group.showOnPages')}</summary>
      <div class="group-items">
        {#each siteDraft.pages ?? [] as pg (pg.id)}
          <label class="gridmenu-snap" title={ta('tip.footer.hideOnPage')}>
            <input type="checkbox"
              checked={!(siteDraft.footer?.hideOn ?? []).includes(pg.id)}
              onchange={(e) => toggleFooterOnPage(pg.id, e.target.checked)} />
            {pg.title || pg.id}
          </label>
        {/each}
      </div>
    </details>
  {/if}

  <!-- The footer's look, chosen in the shared design picker; the content stays as it is -->
  <details class="group">
    <summary>{ta('lbl.design')}<span class="menu-group-value">{ta(`footerDesign.${footerDesign(siteDraft) || 'standard'}`)}</span></summary>
    <div class="group-items">
      <button class="ghost action" title={ta('tip.footer.design')} onclick={() => (ed.designPicker = { kind: 'footer' })}>{ta('ui.chooseDesign')}</button>
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.startpoint')}</summary>
    <div class="group-items">
      <div class="footer-tpick">
        {#each FOOTER_TEMPLATES as t (t.id)}
          <button class="footer-tp" title={ta('tip.footer.template', { label: t.label })}
            onclick={() => applyFooterTemplate(t.id)}>
            <span class="footer-tp-thumb">{@html footerThumb(t.thumb)}</span>
            <span class="footer-tp-name">{t.label}</span>
          </button>
        {/each}
      </div>
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.brand')}</summary>
    <div class="group-items">
      <label title={ta('tip.footer.brandTitle')}>{ta('lbl.title')}
        <input value={siteDraft.footer?.brand?.title ?? ''} placeholder={ta('ph.footer.brandTitle')}
          oninput={(e) => setFooterBrand('title', e.target.value)} /></label>
      <label title={ta('tip.footer.tagline')}>{ta('lbl.tagline')}
        <input value={siteDraft.footer?.brand?.tagline ?? ''}
          oninput={(e) => setFooterBrand('tagline', e.target.value)} /></label>
      <label title={ta('tip.footer.brandMode')}>{ta('lbl.brandMode')}
        <Dropdown value={siteDraft.footer?.brand?.mode ?? 'text'}
          options={[['text', ta('blocks.text')], ['image', ta('opt.brand.image')], ['both', ta('opt.brand.both')]]}
          onchange={(v) => setFooterBrandMode(v)} /></label>
      {#if (siteDraft.footer?.brand?.mode ?? 'text') !== 'text'}
        <span class="toolbar-row">
          <label class="ghost filepick tb-grow" title={ta('tip.webpAutoPublish')}>
            {siteDraft.footer?.brand?.logo ? ta('ui.changeLogo') : ta('ui.uploadLogo')}
            <input type="file" accept="image/*" onchange={uploadFooterLogo} />
          </label>
          {#if siteDraft.footer?.brand?.logo}
            <button class="ghost row-tool" title={ta('tip.footer.removeLogo')}
              onclick={removeFooterLogo}>{@html ICONS.cross}</button>
          {/if}
        </span>
        {#if siteDraft.footer?.brand?.logo}
          <label>{ta('lbl.logoHeight')}
            <span class="gridmenu-value">{siteDraft.footer?.brand?.logoHeight ?? 40} px</span></label>
          <input type="range" min="16" max="160" step="2" value={siteDraft.footer?.brand?.logoHeight ?? 40}
            oninput={(e) => setFooterLogoHeight(e.target.value)} />
        {/if}
      {/if}
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.columns')}</summary>
    <div class="group-items">
      {#each siteDraft.footer?.columns ?? [] as col, ci}
        <div class="nav-row">
          <input value={col.title} title={ta('tip.footer.columnTitle')}
            oninput={(e) => setFooterColumnTitle(ci, e.target.value)} />
          <span class="row-tools">
            <button class="ghost row-tool" title={ta('tip.footer.addLink')}
              onclick={() => addFooterLink(ci)}>{@html ICONS.plus}</button>
            <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveFooterColumn(ci, -1)} disabled={ci === 0}>{@html ICONS.up}</button>
            <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveFooterColumn(ci, 1)}
              disabled={ci === siteDraft.footer.columns.length - 1}>{@html ICONS.down}</button>
            <button class="ghost row-tool" title={ta('tip.footer.removeColumn')}
              onclick={() => removeFooterColumn(ci)}>{@html ICONS.cross}</button>
          </span>
        </div>
        {#each col.links ?? [] as link, li}
          <div class="nav-row nav-sub-row">
            <input value={link.label} title={ta('tip.linkLabel')}
              oninput={(e) => setFooterLinkLabel(ci, li, e.target.value)} />
            <span class="row-tools">
              <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveFooterLink(ci, li, -1)} disabled={li === 0}>{@html ICONS.up}</button>
              <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveFooterLink(ci, li, 1)}
                disabled={li === col.links.length - 1}>{@html ICONS.down}</button>
              <button class="ghost row-tool" title={ta('tip.removeLink')}
                onclick={() => removeFooterLink(ci, li)}>{@html ICONS.cross}</button>
            </span>
            <span class="nav-target">
              <LinkField scope="site" removable={false} value={linkOf(link)} title={ta('tip.linkTarget')} onchange={(next) => setFooterLink(ci, li, next)} />
            </span>
          </div>
        {/each}
      {/each}
      <button class="ghost action" onclick={addFooterColumn}>{ta('ui.addColumn')}</button>
      <label title={ta('tip.footer.columnsAlign')}>{ta('lbl.splitColumnAlign')}
        <Dropdown value={siteDraft.footer?.columnsAlign ?? 'left'}
          options={[['left', ta('common.left')], ['center', ta('common.center')]]}
          onchange={(v) => setFooterColumnsAlign(v)} /></label>
    </div>
  </details>

  <details class="group">
    <summary title={ta('tip.footer.links')}>{ta('group.social')}</summary>
    <div class="group-items">
      <!-- The row shows the site's links (site.links), edited in the Site panel -->
      <label class="gridmenu-snap" title={ta('tip.footer.links')}>
        <input type="checkbox" checked={siteDraft.footer?.links !== false}
          onchange={(e) => footerMutate('footer', (f) => { if (e.target.checked) delete f.links; else f.links = false; })} />
        {ta('ui.footerLinks')}
      </label>
      <button class="ghost action" onclick={() => { ed.siteLinksOpen = true; ed.openPanel('site'); }}>{ta('ui.editSiteLinks')}</button>
    </div>
  </details>

  <details class="group">
    <summary title={ta('tip.footer.contact')}>{ta('group.siteContact')}</summary>
    <div class="group-items">
      <!-- The legal line and the address, phone and email come from the Site panel; a switch shows only when there is something to leave out -->
      {#if legalParts(siteContact(siteDraft)).length}
        <label class="gridmenu-snap" title={ta('tip.footer.legal')}>
          <input type="checkbox" checked={siteDraft.footer?.legal !== false}
            onchange={(e) => footerMutate('footer', (f) => { if (e.target.checked) delete f.legal; else f.legal = false; })} />
          {ta('ui.footerLegal')}
        </label>
      {/if}
      {#if contactParts(siteContact(siteDraft))}
        <label class="gridmenu-snap" title={ta('tip.footer.contact')}>
          <input type="checkbox" checked={siteDraft.footer?.contact !== false}
            onchange={(e) => footerMutate('footer', (f) => { if (e.target.checked) delete f.contact; else f.contact = false; })} />
          {ta('ui.footerContact')}
        </label>
      {/if}
      <button class="ghost action" onclick={() => { ed.siteContactOpen = true; ed.openPanel('site'); }}>{ta('ui.editSiteContact')}</button>
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.cta')}</summary>
    <div class="group-items">
      <label class="gridmenu-snap" title={ta('tip.footer.cta')}>
        <input type="checkbox" checked={Boolean(siteDraft.footer?.cta)}
          onchange={(e) => enableFooterCta(e.target.checked)} />
        {ta('lbl.showCta')}
      </label>
      {#if siteDraft.footer?.cta}
        {@const cta = siteDraft.footer.cta}
        <label title={ta('tip.footer.ctaKind')}>{ta('common.type')}
          <Dropdown value={cta.kind ?? 'button'}
            options={[['button', ta('opt.cta.button')], ['newsletter', ta('opt.cta.newsletter')]]}
            onchange={(v) => setFooterCtaField('kind', v)} /></label>
        <label class="gridmenu-snap" title={ta('tip.footer.ctaBig')}>
          <input type="checkbox" checked={cta.big === true}
            onchange={(e) => setFooterCtaField('big', e.target.checked)} />
          {ta('lbl.bigCentered')}
        </label>
        <label title={ta('tip.footer.ctaHeading')}>{ta('lbl.heading')}
          <input value={cta.heading ?? ''} placeholder={ta('ph.footer.ctaHeading')}
            oninput={(e) => setFooterCtaField('heading', e.target.value)} /></label>
        <label title={ta('tip.footer.ctaSub')}>{ta('lbl.subText')}
          <input value={cta.sub ?? ''}
            oninput={(e) => setFooterCtaField('sub', e.target.value)} /></label>
        <label title={ta('tip.footer.ctaLabel')}>{ta('lbl.buttonText')}
          <input value={cta.label ?? ''} placeholder={ta('ph.footer.ctaLabel')}
            oninput={(e) => setFooterCtaField('label', e.target.value)} /></label>
        {#if (cta.kind ?? 'button') === 'button'}
          <LinkField scope="site" removable={false} label={ta('lbl.buttonTarget')} title={ta('tip.footer.ctaTarget')} value={linkOf(cta)} onchange={setFooterCtaLink} />
        {:else}
          <label title={ta('tip.footer.ctaEndpoint')}>{ta('lbl.newsletterEndpoint')}
            <input value={cta.endpoint ?? ''} placeholder={ta('ph.endpoint')}
              onchange={(e) => setFooterCtaField('endpoint', e.target.value)} /></label>
          <label title={ta('tip.footer.ctaRecipient')}>{ta('lbl.recipientFallback')}
            <input value={cta.recipient ?? ''} placeholder={ta('ph.email')}
              onchange={(e) => setFooterCtaField('recipient', e.target.value)} /></label>
          <label title={ta('tip.footer.ctaSuccess')}>{ta('lbl.confirmation')}
            <input value={cta.success ?? ''} placeholder={ta('ph.footer.ctaSuccess')}
              oninput={(e) => setFooterCtaField('success', e.target.value)} /></label>
        {/if}
      {/if}
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.linkRow')}</summary>
    <div class="group-items">
      {@render footerLinkList('linkRow', siteDraft.footer?.linkRow ?? [])}
      <button class="ghost action" onclick={() => addFooterListLink('linkRow')}>{ta('ui.addRowLink')}</button>
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.appearance')}</summary>
    <div class="group-items">
      {#if siteDraft.footer?.cta?.big !== true}
        <label title={ta('tip.footer.align')}>{ta('lbl.align')}
          <Dropdown value={siteDraft.footer?.align ?? 'left'}
            options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
            onchange={(v) => footerMutate('footer', (f) => { f.align = v; })} /></label>
        <hr class="gridmenu-divider" />
      {/if}
      <p class="panel-strong">{ta('lbl.background')}</p>
      <BackgroundEditor bg={footerBgCtx} layers={siteDraft.footer?.background?.layers ?? []} />
    </div>
  </details>

  <details class="group">
    <summary>{ta('group.baseline')}</summary>
    <div class="group-items">
      <label title={ta('tip.footer.copyright')}>{ta('lbl.copyright')}
        <input value={siteDraft.footer?.copyright ?? ''} placeholder={ta('ph.footer.copyright')}
          oninput={(e) => setFooterCopyright(e.target.value)} /></label>
      <p class="panel-strong">{ta('lbl.baselineLinks')}</p>
      {@render footerLinkList('baseline', siteDraft.footer?.baseline ?? [])}
      <button class="ghost action" onclick={() => addFooterListLink('baseline')}>{ta('ui.addBaselineLink')}</button>
    </div>
  </details>
</div>

{#snippet footerLinkList(field, links)}
  {#each links as link, li}
    <div class="nav-row nav-sub-row">
      <input value={link.label} title={ta('tip.linkLabel')}
        oninput={(e) => setFooterListLinkLabel(field, li, e.target.value)} />
      <span class="row-tools">
        <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveFooterListLink(field, li, -1)} disabled={li === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveFooterListLink(field, li, 1)}
          disabled={li === links.length - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('tip.removeLink')}
          onclick={() => removeFooterListLink(field, li)}>{@html ICONS.cross}</button>
      </span>
      <span class="nav-target">
        <LinkField scope="site" removable={false} value={linkOf(link)} title={ta('tip.linkTarget')} onchange={(next) => setFooterListLink(field, li, next)} />
      </span>
    </div>
  {/each}
{/snippet}
