<script>
  /* The Footer panel: where it shows, its presets, its look and background, the brand, the columns with their links, the site's links and contact details, the call to action and the bottom row, each a fold of the row kit its tab's menu reaches (lib/panel-folds.js).
     A fold says its value while closed, and a fold of settings carries its reset (lib/site-groups.js). The state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import LookChoice from '../lib/rows/LookChoice.svelte';
  import { pictureList, footerPresetSource } from '../lib/design-sources.js';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import SubHeading from '../lib/rows/SubHeading.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import ListEditor from '../lib/rows/ListEditor.svelte';
  import CardList from '../lib/rows/CardList.svelte';
  import PanelLinkRow from '../lib/rows/PanelLinkRow.svelte';
  import { siteGroup } from '../lib/site-groups.js';
  import { squareBeside } from '../lib/square-beside.js';
  import { ta } from '$engine/i18n.js';
  import { hasRichFooter } from '$engine/footer-model.js';
  import { siteContact, contactParts, legalParts } from '$engine/contact-model.js';
  import { ICONS } from '../lib/icons.js';
  import BackgroundEditor from '../section/BackgroundEditor.svelte';
  import LinkField from '../lib/LinkField.svelte';
  import { linkOf, setLinkOn } from '../lib/link-edit.js';
  const ed = getContext('urd-editor');
  const pageId = $derived(ed.pageId);
  const siteDraft = $derived(ed.siteDraft);
  const { compressOrTrim, footerBgCtx, footerMutate, imageErrorText, setStatus } = ed;

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
      const img = await compressOrTrim(file, 'image');
      ed.openPicture({ kind: 'logo', place: 'footer', fresh: true, source: { src: img.dataUrl } });
    } catch (err) {
      setStatus(imageErrorText(err, 'status.imageReadErrorSvg'), 'error');
    }
  }

  function removeFooterLogo() {
    footerMutate('footer', (f) => {
      if (!f.brand) return;
      delete f.brand.logo; delete f.brand.logoSource; delete f.brand.mode; delete f.brand.logoHeight;
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

  /** Moves a link of the link row or the bottom line from one place to another, as the list editor's drag and keys do. */
  function moveFooterListLink(field, from, to) {
    footerMutate('footer', (f) => { f[field].splice(to, 0, ...f[field].splice(from, 1)); });
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

  /** Per-page visibility: the footer shows on all pages except those in hideOn (the page's settings share it). */
  const toggleFooterOnPage = ed.toggleFooterOnPage;

  function addFooterColumn() {
    footerMutate('footer', (f) => {
      f.columns ??= [];
      f.columns.push({ title: ta('seed.column'), links: [{ label: ta('seed.link'), page: siteDraft.pages[0].id }] });
    });
  }

  function removeFooterColumn(ci) {
    footerMutate('footer', (f) => { f.columns.splice(ci, 1); if (!f.columns.length) delete f.columns; });
  }

  /** Moves a column from one place to another, as the list editor's drag and keys do. */
  function moveFooterColumn(from, to) {
    footerMutate('footer', (f) => { f.columns.splice(to, 0, ...f.columns.splice(from, 1)); });
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

  /** Moves a column's link from one place to another within the column. */
  function moveFooterLink(ci, from, to) {
    footerMutate('footer', (f) => { f.columns[ci].links.splice(to, 0, ...f.columns[ci].links.splice(from, 1)); });
  }

  function setFooterLinkLabel(ci, li, value) {
    footerMutate(`edit:footer-link-label-${ci}-${li}`, (f) => { f.columns[ci].links[li].label = value; });
  }

  /** A column link from the link editor. */
  function setFooterLink(ci, li, link) {
    footerMutate('footer', (f) => setLinkOn(f.columns[ci].links[li], link));
  }

  /** The groups of settings with a value of their own to go back from: the pages it is kept off, the alignment, the columns' alignment, the brand's form and logo, and the parts the site's links and contact details show. */
  const writeFooter = (name, change) => footerMutate(name, () => change());
  /** The alignment the engine draws without one of its own: a footer of plain lines centred, one with columns or a brand at the left (footer.js). */
  const alignDefault = () => (hasRichFooter(siteDraft) ? 'left' : 'center');
  const pagesGroup = () => siteGroup(() => siteDraft.footer, writeFooter, 'footer-pages', { hideOn: undefined });
  // A big call to action centres the footer, so its alignment is neither shown nor reset then.
  const lookGroup = () => siteGroup(() => siteDraft.footer, writeFooter, 'footer-look', siteDraft.footer?.cta?.big === true ? {} : { align: alignDefault() });
  const brandGroup = () => siteGroup(() => siteDraft.footer?.brand, writeFooter, 'footer-brand', { mode: 'text', logoHeight: 40 });
  const columnsGroup = () => siteGroup(() => siteDraft.footer, writeFooter, 'footer-columns', { columnsAlign: 'left' });
  /** The parts the footer can show from the site's links and contact details: the links, and the legal line and the contact details where there is something to show; a switch and its reset stand only for these. */
  const sharedParts = () => {
    const contact = siteContact(siteDraft);
    return ['links', legalParts(contact).length > 0 && 'legal', Boolean(contactParts(contact)) && 'contact'].filter(Boolean);
  };
  const sharedGroup = () => siteGroup(() => siteDraft.footer, writeFooter, 'footer-shared', Object.fromEntries(sharedParts().map((key) => [key, undefined])));

  /** The words for the closed folds. */
  const pagesValue = () => {
    if (!siteDraft.footer?.show) return ta('common.off');
    const pages = siteDraft.pages ?? [];
    return `${pages.filter((pg) => !(siteDraft.footer?.hideOn ?? []).includes(pg.id)).length} / ${pages.length}`;
  };
  const alignName = (v) => ta(v === 'center' ? 'common.center' : v === 'right' ? 'common.right' : 'common.left');
  /** How many of those parts the footer shows. */
  const sharedValue = () => `${sharedParts().filter((key) => siteDraft.footer?.[key] !== false).length} / ${sharedParts().length}`;
  const bottomValue = () => siteDraft.footer?.copyright || `${(siteDraft.footer?.linkRow?.length ?? 0) + (siteDraft.footer?.baseline?.length ?? 0)}`;
  const F = 'footer';

  /** The column whose card stands open, one at a time: the column itself, so the card goes with it as the columns move, and none stands open once an undo or a preset brings other columns. */
  let openColumn = $state(null);
  const columnAt = (ci) => siteDraft.footer?.columns?.[ci];
</script>

<div class="panel-body">
  <!-- Whether the site has a footer, and the pages it is kept off (the page's settings share it): the switch alone until the footer is on -->
  <Fold id="pages" surface={F} title={ta('group.showOnPages')} value={pagesValue()} group={pagesGroup()} rows={siteDraft.footer?.show ? undefined : 1}>
    <SwitchRow label={ta('lbl.showFooter')} title={ta('tip.footer.show')} checked={Boolean(siteDraft.footer?.show)}
      onchange={(on) => footerMutate('footer', (f) => { f.show = on; })} />
    {#if siteDraft.footer?.show}
      <Setting key="hideOn">
        {#each siteDraft.pages ?? [] as pg (pg.id)}
          <SwitchRow label={pg.title || pg.id} title={ta('tip.footer.hideOnPage')} checked={!(siteDraft.footer?.hideOn ?? []).includes(pg.id)}
            onchange={(on) => toggleFooterOnPage(pg.id, on)} />
        {/each}
      </Setting>
    {/if}
  </Fold>

  <!-- The footer's presets, chosen as Urd settings «Choosing a design» asks, in the shared design picker or by their pictures in place: each sets the footer's look and the parts it shows, keeping the footer's own content in each part it shows (footer-presets.js) -->
  <Fold id="presets" surface={F} title={ta('group.footerPresets')} value="">
    <LookChoice label={ta('group.footerPresets')} value="" title={ta('tip.footer.presets')} current={null} heading={false}
      designs={() => pictureList(footerPresetSource({}))}
      onpick={(id) => ed.applyFooterPreset(id)}
      onopen={() => (ed.designPicker = { kind: 'footer' })} />
  </Fold>

  <Fold id="appearance" surface={F} title={ta('group.appearance')} value={siteDraft.footer?.cta?.big === true ? '' : alignName(siteDraft.footer?.align ?? alignDefault())} group={lookGroup()}>
    {#if siteDraft.footer?.cta?.big !== true}
      <Setting key="align">
        <SelectRow label={ta('lbl.align')} title={ta('tip.footer.align')} value={siteDraft.footer?.align ?? alignDefault()}
          options={[['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]]}
          onchange={(v) => footerMutate('footer', (f) => { f.align = v; })} />
      </Setting>
    {/if}
    <SubHeading text={ta('lbl.background')} />
    <BackgroundEditor bg={footerBgCtx} layers={siteDraft.footer?.background?.layers ?? []} />
  </Fold>

  <Fold id="brand" surface={F} title={ta('group.brand')} value={siteDraft.footer?.brand?.title || ''} group={brandGroup()}>
    <label class="field-stack" title={ta('tip.footer.brandTitle')}>{ta('lbl.title')}
      <input value={siteDraft.footer?.brand?.title ?? ''} placeholder={ta('ph.footer.brandTitle')}
        oninput={(e) => setFooterBrand('title', e.target.value)} /></label>
    <label class="field-stack" title={ta('tip.footer.tagline')}>{ta('lbl.tagline')}
      <input value={siteDraft.footer?.brand?.tagline ?? ''}
        oninput={(e) => setFooterBrand('tagline', e.target.value)} /></label>
    <Setting key="mode">
      <SelectRow label={ta('lbl.brandMode')} title={ta('tip.footer.brandMode')} value={siteDraft.footer?.brand?.mode ?? 'text'}
        options={[['text', ta('blocks.text')], ['image', ta('opt.brand.image')], ['both', ta('opt.brand.both')]]}
        onchange={(v) => setFooterBrandMode(v)} />
    </Setting>
    {#if (siteDraft.footer?.brand?.mode ?? 'text') !== 'text'}
      {@const logo = siteDraft.footer?.brand?.logo ?? ''}
      <!-- The image as a thumbnail as tall as its picker and the file's row beside it, as the menu's logo has it, with its file's name, the way into the image editor and the bin -->
      <div class="logo-pick">
        <span class="logo-thumb" {@attach squareBeside}>{#if logo}<img src={logo} alt="" />{/if}</span>
        <span class="logo-pick-col">
          <label class="ghost filepick" title={ta('tip.webpAutoPublish')}>
            {logo ? ta('ui.changeLogo') : ta('ui.uploadLogo')}
            <input type="file" accept="image/*" onchange={uploadFooterLogo} />
          </label>
          {#if logo}
            <span class="toolbar-row">
              <span class="logo-file tb-grow">{logo.startsWith('data:') ? '' : logo.split('/').pop()}</span>
              <IconButton icon={ICONS.pencil} label={ta('tip.logo.edit')}
                onclick={() => ed.openPicture({ kind: 'logo', place: 'footer', source: siteDraft.footer.brand.logoSource?.src ? siteDraft.footer.brand.logoSource : { src: logo } })} />
              <IconButton icon={ICONS.bin} danger label={ta('tip.footer.removeLogo')} onclick={removeFooterLogo} />
            </span>
          {/if}
        </span>
      </div>
      {#if siteDraft.footer?.brand?.logo}
        <Setting key="logoHeight">
          <SliderRow label={ta('lbl.logoHeight')} title={ta('tip.footer.logoHeight')} value={siteDraft.footer?.brand?.logoHeight ?? 40} min={16} max={160} step={2}
            shown={`${siteDraft.footer?.brand?.logoHeight ?? 40} px`} oninput={(v) => setFooterLogoHeight(v)} />
        </Setting>
      {/if}
    {/if}
  </Fold>

  <!-- The columns, each with its heading and its links -->
  <Fold id="columns" surface={F} title={ta('group.columns')} value={(siteDraft.footer?.columns ?? []).length ? `${siteDraft.footer.columns.length}` : ta('common.none')} group={columnsGroup()}>
    <!-- Cards like the Nav tab's items: closed, a column's heading and how many links it holds; open, its heading and its links -->
    <CardList items={siteDraft.footer?.columns ?? []} label={ta('group.columns')} key={(col) => col}
      card={(col) => ({ name: col.title || ta('seed.column'), detail: `${(col.links ?? []).length}` })}
      isOpen={(ci) => columnAt(ci) !== undefined && openColumn === columnAt(ci)} ontoggle={(ci) => (openColumn = openColumn === columnAt(ci) ? null : columnAt(ci))}
      onmove={moveFooterColumn} onremove={removeFooterColumn} removeLabel={ta('tip.footer.removeColumn')}>
      {#snippet body(col, ci)}
        <label class="field-stack" title={ta('tip.footer.columnTitle')}>{ta('lbl.heading')}
          <input value={col.title} oninput={(e) => setFooterColumnTitle(ci, e.target.value)} /></label>
        <ListEditor items={col.links ?? []} label={col.title || ta('group.columns')} key={(link, li) => li}
          card={(link) => ({ name: link.label ?? '' })}
          onmove={(from, to) => moveFooterLink(ci, from, to)} onremove={(li) => removeFooterLink(ci, li)} removeLabel={ta('tip.removeLink')}
          onadd={() => addFooterLink(ci)} addLabel={ta('ui.addColumnLink')}>
          {#snippet row(link, li)}
            {@render linkFields(link, (v) => setFooterLinkLabel(ci, li, v), (next) => setFooterLink(ci, li, next))}
          {/snippet}
        </ListEditor>
      {/snippet}
    </CardList>
    <button type="button" class="ghost action" onclick={() => { addFooterColumn(); openColumn = siteDraft.footer?.columns?.at(-1) ?? null; }}>{@html ICONS.plus}{ta('ui.addColumn').replace(/^\+\s*/, '')}</button>
    <Setting key="columnsAlign">
      <SelectRow label={ta('lbl.splitColumnAlign')} title={ta('tip.footer.columnsAlign')} value={siteDraft.footer?.columnsAlign ?? 'left'}
        options={[['left', ta('common.left')], ['center', ta('common.center')]]}
        onchange={(v) => setFooterColumnsAlign(v)} />
    </Setting>
  </Fold>

  <!-- The site's links (site.links, edited in the Site panel) and its legal line and contact details (set in the Legal panel), each shown here or left out; a switch shows only where there is something to leave out -->
  <Fold id="shared" surface={F} title={ta('group.footerShared')} tip={ta('tip.footer.shared')} value={sharedValue()} group={sharedGroup()}>
    <Setting key="links">
      <SwitchRow label={ta('ui.footerLinks')} title={ta('tip.footer.links')} checked={siteDraft.footer?.links !== false}
        onchange={(on) => footerMutate('footer', (f) => { if (on) delete f.links; else f.links = false; })} />
    </Setting>
    <PanelLinkRow label={ta('group.siteLinks')} to={ta('panel.site')} title={ta('ui.editSiteLinks')} onclick={() => { ed.siteLinksOpen = true; ed.openPanel('site'); }} />
    {#if legalParts(siteContact(siteDraft)).length}
      <Setting key="legal">
        <SwitchRow label={ta('ui.footerLegal')} title={ta('tip.footer.legal')} checked={siteDraft.footer?.legal !== false}
          onchange={(on) => footerMutate('footer', (f) => { if (on) delete f.legal; else f.legal = false; })} />
      </Setting>
    {/if}
    {#if contactParts(siteContact(siteDraft))}
      <Setting key="contact">
        <SwitchRow label={ta('ui.footerContact')} title={ta('tip.footer.contact')} checked={siteDraft.footer?.contact !== false}
          onchange={(on) => footerMutate('footer', (f) => { if (on) delete f.contact; else f.contact = false; })} />
      </Setting>
    {/if}
    <PanelLinkRow label={ta('group.siteContact')} to={ta('panel.legal')} title={ta('ui.editSiteContact')} onclick={() => ed.openPanel('legal', { fold: 'who' })} />
    <!-- The privacy page the footer links to is chosen in the Legal panel: the page chosen shows here, and the row opens the panel at «Privacy» -->
    <PanelLinkRow label={ta('lbl.footerPrivacy')} to={ta('panel.legal')} title={ta('tip.footer.privacy')} onclick={() => ed.openPanel('legal', { fold: 'privacy' })}>
      {#snippet value()}<span>{(siteDraft.pages ?? []).find((p) => p.id === siteDraft.footer?.privacyPage)?.title ?? ta('common.none')}</span>{/snippet}
    </PanelLinkRow>
  </Fold>

  <!-- The call to action: its switch alone until it is on, and a group of what it then holds -->
  <Fold id="cta" surface={F} title={ta('group.cta')} value={siteDraft.footer?.cta ? ta((siteDraft.footer.cta.kind ?? 'button') === 'button' ? 'opt.cta.button' : 'opt.cta.newsletter') : ta('common.off')} rows={siteDraft.footer?.cta ? undefined : 1}>
    <SwitchRow label={ta('lbl.showCta')} title={ta('tip.footer.cta')} checked={Boolean(siteDraft.footer?.cta)} onchange={(on) => enableFooterCta(on)} />
    {#if siteDraft.footer?.cta}
      {@const cta = siteDraft.footer.cta}
      <SelectRow label={ta('common.type')} title={ta('tip.footer.ctaKind')} value={cta.kind ?? 'button'}
        options={[['button', ta('opt.cta.button')], ['newsletter', ta('opt.cta.newsletter')]]}
        onchange={(v) => setFooterCtaField('kind', v)} />
      <SwitchRow label={ta('lbl.bigCentered')} title={ta('tip.footer.ctaBig')} checked={cta.big === true} onchange={(on) => setFooterCtaField('big', on)} />
      <label class="field-stack" title={ta('tip.footer.ctaHeading')}>{ta('lbl.heading')}
        <input value={cta.heading ?? ''} placeholder={ta('ph.footer.ctaHeading')}
          oninput={(e) => setFooterCtaField('heading', e.target.value)} /></label>
      <label class="field-stack" title={ta('tip.footer.ctaSub')}>{ta('lbl.subText')}
        <input value={cta.sub ?? ''}
          oninput={(e) => setFooterCtaField('sub', e.target.value)} /></label>
      <label class="field-stack" title={ta('tip.footer.ctaLabel')}>{ta('lbl.buttonText')}
        <input value={cta.label ?? ''} placeholder={ta('ph.footer.ctaLabel')}
          oninput={(e) => setFooterCtaField('label', e.target.value)} /></label>
      {#if (cta.kind ?? 'button') === 'button'}
        <LinkField scope="site" removable={false} label={ta('lbl.buttonTarget')} title={ta('tip.footer.ctaTarget')} value={linkOf(cta)} onchange={setFooterCtaLink} />
      {:else}
        <label class="field-stack" title={ta('tip.footer.ctaEndpoint')}>{ta('lbl.newsletterEndpoint')}
          <input value={cta.endpoint ?? ''} placeholder={ta('ph.endpoint')}
            onchange={(e) => setFooterCtaField('endpoint', e.target.value)} /></label>
        <label class="field-stack" title={ta('tip.footer.ctaRecipient')}>{ta('lbl.recipientFallback')}
          <input value={cta.recipient ?? ''} placeholder={ta('ph.email')}
            onchange={(e) => setFooterCtaField('recipient', e.target.value)} /></label>
        <label class="field-stack" title={ta('tip.footer.ctaSuccess')}>{ta('lbl.confirmation')}
          <input value={cta.success ?? ''} placeholder={ta('ph.footer.ctaSuccess')}
            oninput={(e) => setFooterCtaField('success', e.target.value)} /></label>
      {/if}
    {/if}
  </Fold>

  <!-- The bottom row: a row of links above the bottom line, and the bottom line with the copyright and its own links -->
  <Fold id="bottom" surface={F} title={ta('group.footerBottom')} value={bottomValue()}>
    <SubHeading text={ta('group.linkRow')} />
    {@render footerLinkList('linkRow', siteDraft.footer?.linkRow ?? [], ta('ui.addRowLink'))}
    <SubHeading text={ta('group.baseline')} />
    <label class="field-stack" title={ta('tip.footer.copyright')}>{ta('lbl.copyright')}
      <input value={siteDraft.footer?.copyright ?? ''} placeholder={ta('ph.footer.copyright')}
        oninput={(e) => setFooterCopyright(e.target.value)} /></label>
    {@render footerLinkList('baseline', siteDraft.footer?.baseline ?? [], ta('ui.addBaselineLink'))}
  </Fold>
</div>

{#snippet linkFields(link, setLabel, setLink)}
  <div class="footer-link">
    <input value={link.label} title={ta('tip.linkLabel')} aria-label={ta('tip.linkLabel')} oninput={(e) => setLabel(e.target.value)} />
    <LinkField scope="site" removable={false} value={linkOf(link)} title={ta('tip.linkTarget')} onchange={setLink} />
  </div>
{/snippet}

{#snippet footerLinkList(field, links, addLabel)}
  <ListEditor items={links} label={ta(field === 'linkRow' ? 'group.linkRow' : 'group.baseline')} key={(link, li) => li}
    card={(link) => ({ name: link.label ?? '' })}
    onmove={(from, to) => moveFooterListLink(field, from, to)} onremove={(li) => removeFooterListLink(field, li)} removeLabel={ta('tip.removeLink')}
    onadd={() => addFooterListLink(field)} {addLabel}>
    {#snippet row(link, li)}
      {@render linkFields(link, (v) => setFooterListLinkLabel(field, li, v), (next) => setFooterListLink(field, li, next))}
    {/snippet}
  </ListEditor>
{/snippet}
