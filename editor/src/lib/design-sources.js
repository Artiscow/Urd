/**
 * What the design picker (DesignPicker.svelte) shows: a source per kind of choice, so one picker serves the calendar's designs, its phone and card designs, and every other block's designs (block-designs.js).
 * A source gives the picker its words, the entries in their families with the search and the filter they answer to, each entry's picture, name and description, and the page its live preview draws: the picker itself knows nothing of a block.
 */
import { ta, adminLang } from '$engine/i18n.js';
import { CAL_VIEWS, calDesign, calDesignFamilies, calOptionDefs, calPhoneDesignDef, calPhoneFamilies, calCardDesignDef, calCardFamilies } from '$engine/calendar-designs.js';
import { calendarThumb } from '$engine/calendar-thumb.js';
import { FOOTER_PRESETS, presetSample, applyPreset } from '$engine/footer-presets.js';
import { BLOCK_DESIGNS, blockDesignOf, blockDesignFamilies, designLabelKey, designAboutKey, designPicture, designPhonePicture, blockDesignSample, blockDesignEmpty, designPreviewFrame } from '$engine/block-designs.js';
import { PHONE_DESIGNS } from '$engine/push-model.js';

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
        // A calendar whose feed cannot be fetched draws the sample events here, so its designs can still be seen.
        props: { sources: mode !== 'add' && Array.isArray(props.sources) ? props.sources : [], sampleOnFail: true, limit: 4, view: def.view ?? 'list', ...(def.id === 'plain' ? {} : { design: def.id }), ...(def.view === 'next' ? { nextCount: 3, laterCount: 3 } : {}), ...(phone ? { phoneView: id } : {}), ...(card ? { card: id } : {}) },
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
 * A block's designs as the picker, the menu's design row and its row in Pinned read them: the core catalogue's (block-designs.js), or a plugin block's (the design contract, pluginBlockDesigns in plugins.js, posted by the preview with its words resolved), or null for a block without designs.
 * @param {string} type
 * @param {Array<object>} [pluginBlocks] the plugin blocks the preview reported
 */
export function blockDesigns(type, pluginBlocks = []) {
  const entry = BLOCK_DESIGNS[type];
  if (entry) {
    return {
      blockName: ta(`blocks.${type}`),
      prop: entry.prop,
      phone: Boolean(PHONE_DESIGNS[type]),
      read: (props) => blockDesignOf(type, props),
      families: () => blockDesignFamilies(type).map((f) => ({ family: f.family, label: ta(f.labelKey), designs: f.ids.map((id) => ({ id })) })),
      name: (id) => ta(designLabelKey(type, id)),
      about: (id) => ta(designAboutKey(type, id)),
      picture: (id) => `/admin/designs/${designPicture(type, id)}`,
      phonePicture: (id) => `/admin/designs/${designPhonePicture(type, id)}`,
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
 * A choice's designs as the menus and the panels show their pictures in place (lib/rows/LookChoice.svelte), in the picker's order, each with its id, name, picture and description.
 * Read from a source the picker is given (calendarDesignSource, footerPresetSource), whose words are read from each design's definition (`def`), or from a block's designs (blockDesigns), whose words are read by id.
 * @param {{ families: () => Array<{ designs: Array<{ id: string }> }>, name: Function, picture: (id: string) => string, about: Function, def?: (id: string) => object }} source
 */
export function pictureList(source) {
  return source.families().flatMap((f) => f.designs).map(({ id }) => {
    const def = source.def ? source.def(id) : id;
    return { id, name: source.name(def), picture: source.picture(id), about: source.about(def) };
  });
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
      const props = designs.empty(block.props, siteNow) ? { ...block.props, ...designs.sample.props } : { ...block.props };
      // The design itself, whatever the block draws while narrow: a phone design never stands in for the one being chosen.
      delete props.phoneDesign;
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

/** The phone design picker's first entry: the block keeps its own design on a phone. */
export const SAME_DESIGN = 'same';

/**
 * The phone design a block's props hold, or SAME_DESIGN where none is chosen or the one stored is not among the block's designs.
 * @param {object} designs the block's designs (blockDesigns)
 * @param {object} props
 */
export function phoneDesignOf(designs, props) {
  const id = props?.phoneDesign;
  return typeof id === 'string' && id && designs.read({ [designs.prop]: id }) === id ? id : SAME_DESIGN;
}

/** A phone design's name as the menu shows it: the design's own, or that the block keeps its design. */
export function phoneDesignName(designs, props) {
  const id = phoneDesignOf(designs, props);
  return id === SAME_DESIGN ? ta('picker.phoneSameShort') : designs.name(id);
}

/**
 * A block's phone design (PHONE_DESIGNS in push-model.js): the design it draws while it is narrow, on a phone or in a narrow column, as the calendar's phone view.
 * The first entry keeps the block's own design; the others are its designs, each pictured at a phone's width, and the preview draws the block with the owner's content at a phone's width in the design marked.
 * @param {{block: object, site: object|null, designs: object}} opts the selected block as the page stores it, the site, and the block's designs (blockDesigns)
 */
export function blockPhoneDesignSource({ block, site = null, designs }) {
  const own = designs.read(block.props);
  const current = phoneDesignOf(designs, block.props);
  const name = (d) => (d.id === SAME_DESIGN ? ta('picker.phoneSame', { name: designs.name(own) }) : designs.name(d.id));
  return {
    title: ta('picker.phoneTitle', { block: designs.blockName }),
    label: ta('picker.phoneTitle', { block: designs.blockName }),
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
    families: () => designs.families().map((f, i) => ({ ...f, designs: i === 0 ? [{ id: SAME_DESIGN }, ...f.designs] : f.designs })),
    name,
    searchText: name,
    def: (id) => ({ id }),
    sideTag: () => '',
    picture: (id) => designs.phonePicture(id === SAME_DESIGN ? own : id),
    thumb: () => '',
    about: (d) => (d.id === SAME_DESIGN ? ta('picker.phoneSameAbout') : designs.about(d.id)),
    yours: () => [],
    previewWidth: 390,
    viewport: 'mobile',
    blockId: 'design-picker-block',
    previewPage(id, page, siteNow) {
      const props = designs.empty(block.props, siteNow) ? { ...block.props, ...designs.sample.props } : { ...block.props };
      if (id === SAME_DESIGN) delete props.phoneDesign;
      else props.phoneDesign = id;
      return onePage(page, {
        ...block, id: 'design-picker-block', hideMobile: false, animation: null, sticky: null,
        props,
        frames: { desktop: { ...(block.frames?.desktop ?? { x: 5, y: 24, w: 90, h: designs.frame.h }), y: 24, z: 1, rot: 0 }, mobile: null },
      });
    },
    previewSite(siteNow) {
      if (!designs.sample.contact || !designs.empty(block.props, siteNow)) return siteNow;
      return { ...siteNow, site: { ...(siteNow?.site ?? {}), contact: designs.sample.contact } };
    },
    extraBottom: () => 0,
    afterDraw: null,
  };
}

/**
 * The footer's presets (footer-presets.js): the site's own footer drawn in each preset on an empty page, keeping its own content in each part the preset shows and the preset's sample where it has none, so the preview shows what a choice gives.
 * A preset is an arrangement, not a look the footer keeps, so none stands marked as the one in use.
 * The picker keeps the footer in its preview for this source, measures it, and sends the site anew at every choice, since the footer is the site's, not a block's.
 * @param {{site: object|null}} opts the site as a snapshot
 */
export function footerPresetSource({ site = null }) {
  const name = (d) => ta(`footerTemplate.${d.id}`);
  return {
    title: ta('picker.presetTitle', { block: ta('panel.footer') }),
    label: ta('picker.presetTitle', { block: ta('panel.footer') }),
    searchLabel: ta('picker.presetSearch'),
    countText: (n) => ta('picker.presetCount', { n }),
    noneText: ta('picker.none'),
    currentText: ta('picker.current'),
    aboutHead: ta('picker.presetAbout'),
    yoursHead: '',
    useLabel: ta('picker.presetUse'),
    previewTitle: (n) => ta('picker.preview', { name: n }),
    current: null,
    initial: FOOTER_PRESETS[0],
    filters: null,
    families: () => [{ family: 'footer', label: ta('panel.footer'), designs: FOOTER_PRESETS.map((id) => ({ id })) }],
    name,
    searchText: name,
    def: (id) => ({ id }),
    sideTag: () => '',
    picture: (id) => `/admin/designs/footer-preset-${id}.webp`,
    thumb: () => '',
    about: (d) => ta(`design.footerPreset.${d.id}`),
    yours: () => [],
    previewWidth: 1040,
    viewport: 'desktop',
    blockId: 'design-picker-footer',
    /** The footer stands under the page, so the page is drawn empty; the footer is the site's, sent with the choice. */
    previewPage: (page) => ({ ...page, sections: [] }),
    /** The site with the chosen preset applied to its footer, shown on every page. */
    previewSite(siteNow, id) {
      const footer = applyPreset(siteNow?.footer, presetSample(id, { ta, pages: siteNow?.pages ?? [], privacyPage: siteNow?.footer?.privacyPage ?? null }));
      delete footer.hideOn;
      return { ...siteNow, footer };
    },
    siteVaries: true,
    showsFooter: true,
    findEl: (doc) => doc.getElementById('urd-footer'),
    extraBottom: () => 0,
    /** The footer ends the page, so the preview ends with it; it stands through the draws, so it is watched afresh at each. */
    room: 0,
    stays: true,
    /** The page above the footer is watched too: it empties after the choice is drawn, which moves the footer up without changing its size, and the preview is measured again then. */
    afterDraw: (win, footer, watch) => {
      const page = win.document.getElementById('urd-root');
      if (page) watch(page);
    },
  };
}
