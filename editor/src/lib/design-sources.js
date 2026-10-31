/**
 * What the design picker (DesignPicker.svelte) shows: a source per kind of choice, so one picker serves the calendar's designs, its phone and card designs, and every other block's designs (block-designs.js).
 * A source gives the picker its words, the entries in their families with the search and the filter they answer to, each entry's picture, name and description, and the page its live preview draws: the picker itself knows nothing of a block.
 */
import { ta, adminLang } from '$engine/i18n.js';
import { CAL_VIEWS, calDesign, calDesignFamilies, calOptionDefs, calPhoneDesignDef, calPhoneFamilies, calCardDesignDef, calCardFamilies } from '$engine/calendar-designs.js';
import { calendarThumb } from '$engine/calendar-thumb.js';
import { FOOTER_DESIGNS, footerDesign, hasRichFooter } from '$engine/footer-model.js';
import { BLOCK_DESIGNS, blockDesignOf, blockDesignFamilies, designLabelKey, designAboutKey, designPicture, blockDesignSample, blockDesignEmpty, designPreviewFrame } from '$engine/block-designs.js';

/** Phrases joined as the admin language joins a list («a, b og c»), with commas where the language has no rules for it. */
function joined(parts) {
  try {
    return new Intl.ListFormat(adminLang(), { type: 'conjunction' }).format(parts);
  } catch {
    return parts.join(', ');
  }
}

/** A page with one section holding the block the preview draws, over the page the editor holds (its theme and settings). */
function onePage(page, block) {
  const section = { id: 'design-picker-sec', version: 1, size: { minHeight: '200px' }, grid: null, background: { version: 1, layers: [] }, blocks: [block] };
  return { ...(page ?? {}), sections: [section] };
}

const VIEW_KEYS = { list: 'calendar.viewList', cards: 'calendar.viewCards', month: 'calendar.viewMonth', agenda: 'calendar.viewAgenda', next: 'calendar.viewNext', week: 'calendar.viewWeek', day: 'calendar.viewDay', year: 'calendar.viewYear' };

/**
 * The calendar's designs (0.7.19.22): `mode` 'set' changes the selected calendar's design, 'add' adds a calendar in the chosen one, 'phone' chooses the phone design the selected calendar draws on a phone (calPhoneCandidates: the neutral list, every design that reads on a phone, and the phone designs designs lend; pictures under phone-<id>.webp and the preview at a phone's width in the calendar's own design, `design`), and 'card' the card design its card wears (calCardCandidates: the neutral card, every design's card, and the card designs designs lend; pictures under card-<id>.webp, the preview with the card open).
 * Under the preview the marked entry is described, and what the owner can change on it is said in plain sentences under three headings: Colours (what its colours paint, `<design labelKey>.colors`, or for another design's phone view or card that it keeps its own), Text (its words) and Options (its settings, `calendar.opt.<key>.phrase`, and its rewriting); a heading with nothing under it is left out.
 */
export function calendarDesignSource({ mode = 'set', current = null, design = 'plain', props = {} }) {
  const phone = mode === 'phone';
  const card = mode === 'card';
  /** The lists other than the design's own: pictures and preview follow the calendar's own design. */
  const lent = phone || card;
  const picPrefix = phone ? 'phone-' : card ? 'card-' : '';

  /** A card several designs share is named for its colour set and the first designs that share it; the search finds it by any of their names. */
  function name(d) {
    if (!d.setCard) return ta(d.labelKey);
    const names = d.designs.map((id) => ta(calDesign(id).labelKey));
    const set = ta(d.labelKey);
    return names.length > 3 ? ta('calendar.picker.setNameMore', { set, designs: names.slice(0, 3).join(', '), n: names.length - 3 }) : ta('calendar.picker.setName', { set, designs: joined(names) });
  }

  return {
    title: ta(phone ? 'calendar.picker.phoneTitle' : card ? 'calendar.picker.cardTitle' : 'calendar.picker.title'),
    label: ta('calendar.picker.title'),
    searchLabel: ta('calendar.picker.search'),
    countText: (n) => ta('calendar.picker.count', { n }),
    noneText: ta('calendar.picker.none'),
    currentText: ta('calendar.picker.current'),
    aboutHead: ta('calendar.picker.aboutHead'),
    yoursHead: ta('calendar.picker.yoursHead'),
    useLabel: mode === 'add' ? ta('calendar.picker.add') : ta('calendar.picker.use'),
    previewTitle: (n) => ta('calendar.picker.preview', { name: n }),
    current,
    initial: current ?? (phone ? 'agenda' : card ? 'neutral' : 'plain'),
    /** The plain design follows the block's view, so it stands in every view's filter; the lent lists have no view filter. */
    filters: lent ? null : { allLabel: ta('calendar.picker.all'), items: CAL_VIEWS.map((v) => [v, ta(VIEW_KEYS[v])]), match: (d, v) => d.view === null || d.view === v },
    families: () => (phone ? calPhoneFamilies(props) : card ? calCardFamilies() : calDesignFamilies()),
    name,
    searchText: (d) => (d.setCard ? [name(d), ...d.designs.map((id) => ta(calDesign(id).labelKey))].join(' ') : ta(d.labelKey)),
    def: (id) => (phone ? calPhoneDesignDef(id, props) : card ? calCardDesignDef(id) : calDesign(id)),
    sideTag: (d) => (!lent && d.view ? ta(VIEW_KEYS[d.view]) : ''),
    picture: (id) => `/admin/designs/${picPrefix}${id}.webp`,
    thumb: (id) => calendarThumb(id),
    /** What the marked entry is: a design's own description, a lent or neutral entry's own, or for a design's card the card as that design draws it. */
    about(def) {
      if (def.setCard) return ta('calendar.picker.setAbout', { designs: joined(def.designs.map((id) => ta(calDesign(id).labelKey))) });
      if (card && def.desktop) return ta('calendar.picker.cardOf', { name: ta(def.labelKey) });
      return ta(`${def.labelKey}.about`);
    },
    /**
     * What the owner can change on the marked entry, as [heading, sentences] rows under Colours, Text and Options; a row with no sentence is left out.
     * A design: what its colours paint, its words, its settings and its rewriting. A phone view or card: the calendar's colours for a neutral one, what the colours paint for the calendar's own design, or that another design keeps its own; then what follows the calendar.
     */
    yours(def) {
      const look = def.look ? calDesign(def.look) : null;
      let colours;
      let text;
      let options;
      if (lent) {
        if (def.setCard) colours = [calDesign(design).set === def.set ? ta('calendar.picker.c.cardOwn') : ta('calendar.picker.c.setOther')];
        else if (!look) colours = [ta(phone ? 'calendar.picker.c.phoneNeutral' : 'calendar.picker.c.cardNeutral')];
        else if (look.id === design) colours = [card ? ta('calendar.picker.c.cardOwn') : ta(`${look.labelKey}.colors`)];
        else colours = [ta('calendar.picker.c.other', { name: ta(look.labelKey) })];
        text = [ta(phone ? 'calendar.picker.c.phoneWords' : 'calendar.picker.c.cardText')];
        options = [ta(phone ? 'calendar.picker.c.phoneOptions' : 'calendar.picker.c.cardOptions')];
      } else {
        colours = [ta(`${def.labelKey}.colors`)];
        text = [ta('calendar.picker.c.words'), ...(def.theme?.length ? [ta('calendar.picker.c.theme')] : [])];
        const settings = calOptionDefs(def.id).filter((o) => !o.tipKey).map((o) => ta(`${o.labelKey}.phrase`));
        options = [...(settings.length ? [ta('calendar.picker.c.settings', { settings: joined(settings) })] : []), ...(def.rewrites ? [ta('calendar.picker.c.rewrite')] : [])];
      }
      return [['calendar.picker.h.colours', colours], ['calendar.picker.h.text', text], ['calendar.picker.h.options', options]].filter(([, lines]) => lines.length).map(([key, lines]) => [ta(key), lines]);
    },
    /** The preview page's width in CSS px (a phone's for the phone designs); the iframe is scaled to the pane, and its height follows the drawn calendar. */
    previewWidth: phone ? 390 : 1040,
    viewport: phone ? 'mobile' : 'desktop',
    blockId: 'design-picker-cal',
    /** One calendar in the chosen design on an otherwise empty page, drawn by the preview with the block's own feeds, or the sample events while it has none; for a phone or card design, the calendar's own design with that phone or card design, at a phone's width for the phone. */
    previewPage(id, page) {
      const def = calDesign(lent ? design : id);
      return onePage(page, {
        id: 'design-picker-cal', type: 'calendar', version: 1, decor: false, hideMobile: false, animation: null,
        props: { sources: mode !== 'add' && Array.isArray(props.sources) ? props.sources : [], limit: 4, view: def.view ?? 'list', ...(def.id === 'plain' ? {} : { design: def.id }), ...(def.view === 'next' ? { nextCount: 3, laterCount: 3 } : {}), ...(phone ? { phoneView: id } : {}), ...(card ? { card: id } : {}) },
        frames: { desktop: { x: 3, y: 24, w: 94, h: 600 }, mobile: null },
      });
    },
    previewSite: (site) => site,
    /** The open card reaches below the calendar in the card designs' preview. */
    extraBottom: (doc) => doc.querySelector('dialog.urd-cal-dialog[open]')?.getBoundingClientRect().bottom ?? 0,
    /** For a card design the preview shows the card itself: the first event is opened once the events are drawn, and the card is watched too. */
    afterDraw: card ? (win, block, watch) => openPreviewCard(win, block, watch, 0) : null,
  };
}

/** Opens the first event's card in the preview, once an event stands, and watches the card's size as well. */
function openPreviewCard(win, block, watch, tries) {
  const event = block.querySelector('.urd-cal-event');
  if (!event) {
    if (tries < 300) win.requestAnimationFrame(() => openPreviewCard(win, block, watch, tries + 1));
    return;
  }
  event.click();
  const dialog = win.document.querySelector('dialog.urd-cal-dialog[open]');
  if (dialog) watch(dialog);
}

/**
 * A block's designs as the picker, the menu's design row and its quick tile read them: the core catalogue's (block-designs.js), or a plugin block's (the design contract, pluginBlockDesigns in plugins.js, posted by the preview with its words resolved), or null for a block without designs.
 * @param {string} type
 * @param {Array<object>} [pluginBlocks] the plugin blocks the preview reported
 */
export function blockDesigns(type, pluginBlocks = []) {
  const entry = BLOCK_DESIGNS[type];
  if (entry) {
    return {
      blockName: ta(`blocks.${type}`),
      prop: entry.prop,
      read: (props) => blockDesignOf(type, props),
      families: () => blockDesignFamilies(type).map((f) => ({ family: f.family, label: ta(f.labelKey), designs: f.ids.map((id) => ({ id })) })),
      name: (id) => ta(designLabelKey(type, id)),
      about: (id) => ta(designAboutKey(type, id)),
      picture: (id) => `/admin/designs/${designPicture(type, id)}`,
      frame: entry.frame,
      sample: blockDesignSample(type, ta),
      empty: (props, site) => blockDesignEmpty(type, props, site),
    };
  }
  const plugin = pluginBlocks.find((b) => b.type === type);
  const designs = plugin?.designs;
  if (!designs?.items?.length) return null;
  const byId = new Map(designs.items.map((item) => [item.id, item]));
  return {
    blockName: plugin.label ?? type,
    prop: designs.prop,
    read: (props) => (byId.has(props?.[designs.prop]) ? props[designs.prop] : designs.items[0].id),
    families: () => [{ family: type, label: plugin.label ?? type, designs: designs.items.map((item) => ({ id: item.id })) }],
    name: (id) => byId.get(id)?.label ?? id,
    about: (id) => byId.get(id)?.about ?? '',
    picture: (id) => byId.get(id)?.picture ?? '',
    frame: { w: 60, h: 200 },
    sample: { props: {} },
    empty: () => false,
  };
}

/**
 * Every other block's designs (blockDesigns): the selected block drawn in each design with its own content, at its real width and close up (designPreviewFrame); a block with nothing of its own to show (no pictures, no collection, no contact details) is drawn with the sample its picture has.
 * @param {{block: object, site: object|null, designs: object, sectionWidth?: string}} opts the selected block as the page stores it (its version, frames and props) and the site, as snapshots, the block's designs, and its section's own width (`size.maxWidth`)
 */
export function blockDesignSource({ block, site = null, designs, sectionWidth }) {
  const current = designs.read(block.props);
  const own = block.frames?.desktop ?? {};
  const fit = designPreviewFrame(site, Math.min(100, own.w ?? designs.frame.w), sectionWidth);
  const name = (d) => designs.name(d.id);
  return {
    title: ta('picker.title', { block: designs.blockName }),
    label: ta('picker.title', { block: designs.blockName }),
    searchLabel: ta('picker.search'),
    countText: (n) => ta('picker.count', { n }),
    noneText: ta('picker.none'),
    currentText: ta('picker.current'),
    aboutHead: ta('picker.aboutHead'),
    yoursHead: '',
    useLabel: ta('picker.use'),
    previewTitle: (n) => ta('picker.preview', { name: n }),
    current,
    initial: current,
    filters: null,
    families: designs.families,
    name,
    searchText: name,
    def: (id) => ({ id }),
    sideTag: () => '',
    picture: designs.picture,
    thumb: () => '',
    about: (d) => designs.about(d.id),
    yours: () => [],
    previewWidth: fit.width,
    viewport: 'desktop',
    blockId: 'design-picker-block',
    previewPage(id, page, siteNow) {
      const props = designs.empty(block.props, siteNow) ? { ...block.props, ...designs.sample.props } : block.props;
      return onePage(page, {
        ...block, id: 'design-picker-block', hideMobile: false, animation: null, sticky: null,
        props: { ...props, [designs.prop]: id },
        frames: { desktop: { x: fit.x, y: 24, w: fit.w, h: own.h ?? designs.frame.h, z: 1, rot: 0 }, mobile: null },
      });
    },
    /** The contact designs read the site's details; without any the preview borrows the sample association. */
    previewSite(siteNow) {
      if (!designs.sample.contact || !designs.empty(block.props, siteNow)) return siteNow;
      return { ...siteNow, site: { ...(siteNow?.site ?? {}), contact: designs.sample.contact } };
    },
    extraBottom: () => 0,
    afterDraw: null,
  };
}

/** The footer's designs as the picker lists them: the standard footer and the ones footer-model.js names. */
export const FOOTER_DESIGN_IDS = ['standard', ...FOOTER_DESIGNS];

/**
 * The footer's designs (footer-model.js): the site's own footer drawn in each design on an empty page, with a sample of brand and columns while the footer has no content of its own.
 * The picker keeps the footer in its preview for this source, measures it, and sends the site anew at every choice, since the design is the site's, not a block's.
 * @param {{site: object|null}} opts the site as a snapshot
 */
export function footerDesignSource({ site = null }) {
  const current = footerDesign(site ?? {}) || 'standard';
  const name = (d) => ta(`footerDesign.${d.id}`);
  return {
    title: ta('picker.title', { block: ta('panel.footer') }),
    label: ta('picker.title', { block: ta('panel.footer') }),
    searchLabel: ta('picker.search'),
    countText: (n) => ta('picker.count', { n }),
    noneText: ta('picker.none'),
    currentText: ta('picker.current'),
    aboutHead: ta('picker.aboutHead'),
    yoursHead: '',
    useLabel: ta('picker.use'),
    previewTitle: (n) => ta('picker.preview', { name: n }),
    current,
    initial: current,
    filters: null,
    families: () => [{ family: 'footer', label: ta('panel.footer'), designs: FOOTER_DESIGN_IDS.map((id) => ({ id })) }],
    name,
    searchText: name,
    def: (id) => ({ id }),
    sideTag: () => '',
    picture: (id) => `/admin/designs/footer-${id}.webp`,
    thumb: () => '',
    about: (d) => ta(`design.footer.${d.id}`),
    yours: () => [],
    previewWidth: 1040,
    viewport: 'desktop',
    blockId: 'design-picker-footer',
    /** The footer stands under the page, so the page is drawn empty; the footer is the site's, sent with the choice. */
    previewPage: (page) => ({ ...page, sections: [] }),
    /** The site with the footer shown in the chosen design; a footer with nothing of its own borrows a brand and two columns of the site's pages. */
    previewSite(siteNow, id) {
      const footer = { ...(siteNow?.footer ?? { version: 1 }), show: true };
      if (!hasRichFooter({ ...siteNow, footer })) {
        const pages = siteNow?.pages ?? [];
        const links = (from, n) => pages.slice(from, from + n).map((p) => ({ label: p.title || p.id, page: p.id }));
        Object.assign(footer, {
          brand: { title: ta('seed.orgName') },
          columns: [{ title: ta('seed.footer.colExplore'), links: links(0, 4) }, { title: ta('seed.footer.colPages'), links: links(4, 3) }],
          copyright: `© ${ta('seed.orgName')}`,
        });
      }
      delete footer.hideOn;
      if (id && id !== 'standard') footer.design = id; else delete footer.design;
      return { ...siteNow, footer };
    },
    siteVaries: true,
    showsFooter: true,
    findEl: (doc) => doc.getElementById('urd-footer'),
    extraBottom: () => 0,
    afterDraw: null,
  };
}
