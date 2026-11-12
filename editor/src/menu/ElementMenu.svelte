<script>
  /* The element menu (ADR-0016 decision 3): Content is what the block says and shows, Style is how it looks, Placement is where it sits and how it behaves there.
     Before them stands Pinned: the settings used most, a block type's own first and then the two every block has (how it fits a narrower screen, and whether it shows on a phone).
     A pinned setting stands there instead of in its area, so no setting is drawn twice (PinScope.svelte), and an area left with nothing in it is not drawn.
     Wide, Pinned and the areas share two columns, each whole, cut where they come out most even (`balanceAreas`); narrow, they stand under each other with a heading each; with tabs, one area stands at a time behind Content, Style and Placement (`layout`, menu/state.svelte.js menuLayout).
     What stands first follows the Urd settings' «Shortcuts»: the Pinned rows, the same rows as tiles, nothing but the search (drawn by the menu's frame), or chips that jump to each area.
     A block with designs has its design, and its phone design, as the first rows of Style, and every block its motion as the last group there. */
  import { getContext, setContext } from 'svelte';
  import Choice from '../lib/Choice.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import LookChoice from '../lib/rows/LookChoice.svelte';
  import LookRows from '../lib/rows/LookRows.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import ColourRow from '../lib/rows/ColourRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import LinkField from '../lib/LinkField.svelte';
  import PinScope from './PinScope.svelte';
  import CapScope from './CapScope.svelte';
  import DesignRow from './DesignRow.svelte';
  import FitMin from './FitMin.svelte';
  import SizeBounds from './SizeBounds.svelte';
  import BoxStyle from './BoxStyle.svelte';
  import RibbonMotion from './families/RibbonMotion.svelte';
  import { calDesign, calView, calPhoneView, calPhoneDesignDef, calCardDesign, calCardDesignDef, calLimitStart } from '$engine/calendar-designs.js';
  import { paymentsOf } from '$engine/shop.js';
  import { GRID_VIEWS, galleryView as blockGalleryView } from '$engine/gallery-model.js';
  import { blockDesigns, phoneDesignName, phoneDesignOf, pictureList, calendarDesignSource, SAME_DESIGN } from '../lib/design-sources.js';
  import { ta } from '$engine/i18n.js';
  import { FIT_BY_WIDTH, SIZE, SIZE_BY_FRAME, blockSize, sizeRange } from '$engine/push-model.js';
  import { ribbonMotions, colorTokens } from './options.js';
  import { menu, quickChoice, setQuickChoice, chooseArea, MENU_AREAS } from './state.svelte.js';
  import { quickIds, choiceChanged, NO_CHOICE } from '../lib/quick-row.js';
  import { matchWords } from '$engine/palette-search.js';
  import { matchAny } from '$engine/search-langs.js';
  import { searchLangs } from '../lib/search-langs.svelte.js';
  import { menuSearch } from '../lib/menu-search.js';
  import { linkOf } from '../lib/link-edit.js';
  import Placement from './Placement.svelte';
  import MotionFold from './MotionFold.svelte';
  import { onlyGroup } from '../lib/only-group.js';
  import MenuArea from './MenuArea.svelte';
  import Text from './families/Text.svelte';
  import Button from './families/Button.svelte';
  import Image from './families/Image.svelte';
  import Video from './families/Video.svelte';
  import Icon from './families/Icon.svelte';
  import Shape from './families/Shape.svelte';
  import Gallery from './families/Gallery.svelte';
  import Ribbon from './families/Ribbon.svelte';
  import Calendar from './families/Calendar.svelte';
  import CalShowMore from './families/CalShowMore.svelte';
  import Form from './families/Form.svelte';
  import Faq from './families/Faq.svelte';
  import Timeline from './families/Timeline.svelte';
  import Quote from './families/Quote.svelte';
  import Stats from './families/Stats.svelte';
  import Table from './families/Table.svelte';
  import Share from './families/Share.svelte';
  import Contact from './families/Contact.svelte';
  import Privacy from './families/Privacy.svelte';
  import Countdown from './families/Countdown.svelte';
  import Audio from './families/Audio.svelte';
  import Collection from './families/Collection.svelte';
  import Product from './families/Product.svelte';
  import Cart from './families/Cart.svelte';
  import Checkout from './families/Checkout.svelte';
  import Fields from './families/Fields.svelte';
  import Terms from './families/Terms.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockFit, setBlockSize, endSizeGesture, setBlockHideMobile, designWidth, themeSwatches } = ed;
  /** The family of each block type; a type without one of its own shows the field contract. */
  const FAMILIES = { text: Text, button: Button, image: Image, video: Video, icon: Icon, shape: Shape, gallery: Gallery, ribbon: Ribbon, calendar: Calendar, form: Form, faq: Faq, timeline: Timeline, quote: Quote, stats: Stats, table: Table, share: Share, contact: Contact, privacy: Privacy, terms: Terms, countdown: Countdown, audio: Audio, collection: Collection, product: Product, cart: Cart, checkout: Checkout };
  const Family = $derived(FAMILIES[selectedBlock.type] ?? Fields);
  /** `layout` is 'wide', 'narrow' or 'tabs'; `only` draws one group alone, for a tool of the bar (lib/only-group.js): a group, an area's loose rows or an area. */
  let { layout = 'narrow', query = '', only = null } = $props();
  // What a small panel keeps (lib/only-group.js), for the rows that draw otherwise there: the design's pictures stand in its own panel whatever «Designs» says (lib/rows/LookChoice.svelte).
  setContext('menu-only', { get only() { return only; } });
  const wide = $derived(layout === 'wide');
  const shortcuts = $derived(menu.shortcutsPref);
  /** The Pinned rows stand while the shortcuts are the rows or the tiles. */
  const pinnedShown = $derived(shortcuts === 'pinned' || shortcuts === 'tiles');
  const AREA_TABS = $derived([['content', ta('props.tabContent')], ['style', ta('props.tabStyle')], ['placement', ta('props.tabPlacement')]]);
  // A typed query loads the other languages once; the search runs again when they are in.
  $effect(() => searchLangs.need(query));

  /** The settings in Pinned now, in order, and their ids: the rows inside the areas leave out those (PinScope). */
  const pinnedItems = $derived.by(() => {
    const items = new Map(quickItemsAvailable().map((item) => [item.id, item]));
    return quickIds(selectedBlock.type, quickChoice(selectedBlock.type), new Set(items.keys())).map((id) => items.get(id));
  });
  const pinnedIds = $derived(new Set(pinnedItems.map((item) => item.id)));
  const NONE_PINNED = new Set();
  /** The settings that leave their areas: those in Pinned while Pinned is drawn, none while «Shortcuts» puts the search or the chips first. */
  const areaAway = $derived(pinnedShown ? pinnedIds : NONE_PINNED);
  /** The selected block's designs, drawn as the first rows of Style; the calendar draws its own three in its family. */
  const designs = $derived(selectedBlock.type === 'calendar' ? null : blockDesigns(selectedBlock.type, ed.pluginBlocks));
  /** Every setting the selected block can show in Pinned now, each as its row there. */
  function quickItemsAvailable() {
    const b = selectedBlock;
    const items = [];
    if (b.type === 'calendar') {
      items.push({ id: 'design', label: ta('calendar.design'), tip: ta('tip.calendar.design'), kind: 'open', value: ta(calDesign(b.props.design).labelKey), picture: calendarDesignSource({}).picture(calDesign(b.props.design).id), run: ed.openDesignPicker,
        current: calDesign(b.props.design).id, designs: () => pictureList(calendarDesignSource({})), pick: (id) => ed.setCalendarDesign(id),
        own: calDesign(b.props.design).id !== 'plain', reset: () => ed.setCalendarDesign('plain') });
      items.push({ id: 'phoneView', label: ta('calendar.phoneView'), tip: ta('tip.calendar.phoneView'), kind: 'open', value: ta(calPhoneDesignDef(calPhoneView(b.props), b.props).labelKey), picture: calendarDesignSource({ mode: 'phone' }).picture(calPhoneView(b.props)), run: ed.openPhonePicker,
        own: b.props.phoneView != null || b.props.phoneDesign != null, reset: () => ed.setBlockProps('phoneView', { phoneView: undefined, phoneDesign: undefined }) });
      items.push({ id: 'card', label: ta('calendar.card'), tip: ta('tip.calendar.card'), kind: 'open', value: ta(calCardDesignDef(calCardDesign(b.props)).labelKey), picture: calendarDesignSource({ mode: 'card' }).picture(calCardDesign(b.props)), run: ed.openCardPicker,
        own: b.props.card != null, reset: () => setBlockProp('card', undefined) });
      if (['list', 'cards', 'agenda'].includes(calView(b.props))) {
        const limit0 = calLimitStart(b.props);
        items.push({ id: 'limit', label: ta('lbl.maxCount'), tip: ta('tip.collection.limit'), more: CalShowMore, kind: 'number', min: 1, max: 50, value: b.props.limit ?? 6, set: (v) => setBlockProp('limit', Math.max(1, Math.min(50, Number(v) || 6))),
          own: (b.props.limit ?? 6) !== limit0, reset: () => setBlockProp('limit', limit0) });
      }
      items.push({ id: 'subscribe', label: ta('calendar.showSubscribe'), tip: ta('tip.calendar.subscribe'), kind: 'switch', value: b.props.showSubscribe !== false, set: (on) => setBlockProp('showSubscribe', on),
        own: b.props.showSubscribe !== false, reset: () => setBlockProp('showSubscribe', false) });
    }
    const byWidth = FIT_BY_WIDTH.has(b.type);
    items.push({ id: 'fit', label: ta('lbl.fit'), tip: ta('tip.fit'), more: FitMin, kind: 'choice', value: b.fit === 'shrink' || b.fit === 'both' ? b.fit : 'wrap',
      own: b.fit === 'shrink' || b.fit === 'both', reset: () => setBlockFit('wrap'),
      options: byWidth ? [['wrap', ta('quick.fit.fluid')], ['shrink', ta('quick.fit.floor')]]
        : [['wrap', ta('quick.fit.wrap')], ...(designWidth() || b.fit === 'shrink' ? [['shrink', ta('quick.fit.shrink')]] : []), ['both', ta('quick.fit.both')]],
      set: (v) => setBlockFit(v) });
    const hidden0 = ed.blockStarts(b.type, 'hideMobile');
    items.push({ id: 'phone', label: ta('lbl.hideMobile'), tip: ta('tip.hideMobile'), kind: 'switch', value: Boolean(b.hideMobile), set: (on) => setBlockHideMobile(on),
      own: Boolean(b.hideMobile) !== hidden0, reset: () => setBlockHideMobile(hidden0) });
    const p = b.props;
    /** A prop's own value against its standard, as the group of its row in its area counts it (menu/groups.js), and the way back to it. */
    const standard = (key, value) => ({ own: p[key] !== undefined && JSON.stringify(p[key]) !== JSON.stringify(value), reset: () => setBlockProp(key, value) });
    // A block's design, as the calendar's: one id for every block with designs, core or plugin (block-designs.js, the design contract), opening the design picker.
    if (designs) items.push({ id: 'design', label: ta('lbl.design'), tip: ta('tip.picker.design'), kind: 'open', value: designs.name(designs.read(p)), picture: designs.picture?.(designs.read(p)) ?? '', run: ed.openBlockDesignPicker,
      current: designs.read(p), designs: () => pictureList(designs), pick: (id) => setBlockProp(designs.prop, id),
      own: designs.read(p) !== designs.read({}), reset: () => setBlockProp(designs.prop, undefined) });
    // A block with a phone design can pin its row too, which opens the phone design picker.
    if (designs?.phone) items.push({ id: 'phoneDesign', label: ta('lbl.phoneDesign'), tip: ta('tip.picker.phoneDesign'), kind: 'open', value: phoneDesignName(designs, p),
      picture: (phoneDesignOf(designs, p) === SAME_DESIGN ? designs.picture?.(designs.read(p)) : designs.phonePicture?.(phoneDesignOf(designs, p))) ?? '', run: ed.openBlockPhonePicker,
      own: p.phoneDesign !== undefined, reset: () => setBlockProp('phoneDesign', undefined) });
    if (b.type === 'text') {
      items.push({ id: 'align', label: ta('lbl.align'), tip: ta('tip.text.align'), kind: 'choice', value: p.align ?? 'left',
        options: [['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]], set: (v) => setBlockProp('align', v),
        own: (p.align ?? 'left') !== 'left', reset: () => setBlockProp('align', 'left') });
      items.push({ id: 'textBox', label: ta('lbl.textBoxToggle'), tip: ta('tip.blocks.textBox'), below: p.box ? BoxStyle : null, kind: 'switch', value: Boolean(p.box), set: (on) => setBlockProp('box', on),
        own: Boolean(p.box), reset: () => setBlockProp('box', false) });
    } else if (b.type === 'button') {
      items.push({ id: 'goesTo', label: ta('lbl.goesTo'), kind: 'link', value: linkOf(p), set: (link) => ed.setBlockLink(link) });
    } else if (b.type === 'image') {
      // The image's standards as its look group has them (families/Image.svelte): filling the frame, with the medium corners.
      items.push({ id: 'imgFit', label: ta('lbl.imageFit'), tip: ta('tip.image.fit'), kind: 'choice', value: p.fit ?? 'cover',
        options: [['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]], set: (v) => setBlockProp('fit', v), ...standard('fit', 'cover') });
      items.push({ id: 'radius', label: ta('lbl.radius'), tip: ta('tip.image.radius'), kind: 'choice', value: p.radius ?? '',
        options: [['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]], set: (v) => setBlockProp('radius', v || null), ...standard('radius', 'md') });
    } else if (b.type === 'video') {
      items.push({ id: 'videoSource', label: ta('lbl.videoSource'), kind: 'choice', value: p.source === 'file' ? 'file' : 'embed',
        options: [['embed', ta('opt.videoSource.embed')], ['file', ta('opt.videoSource.file')]], set: (v) => setBlockProp('source', v) });
    } else if (b.type === 'icon') {
      items.push({ id: 'iconSize', label: ta('lbl.sizePx'), tip: ta('tip.icon.size'), kind: 'number', min: 8, max: 400, value: p.size ?? 48, set: (v) => setBlockProp('size', Math.max(8, Math.min(400, Number(v) || 48))), ...standard('size', 48) });
      items.push({ id: 'iconColor', label: ta('lbl.color'), tip: ta('hint.icon.color'), kind: 'color', value: p.color ?? 'accent', set: (v) => setBlockProp('color', v), ...standard('color', 'accent') });
    } else if (b.type === 'gallery') {
      const gview = blockGalleryView(p.view);
      if (GRID_VIEWS.includes(gview)) {
        items.push({ id: 'columns', label: ta('lbl.columns'), tip: ta('tip.gallery.columns'), kind: 'number', min: 1, max: 6, value: p.columns ?? 3, set: (v) => setBlockProp('columns', Math.max(1, Math.min(6, Number(v) || 3))), ...standard('columns', 3) });
      }
    } else if (b.type === 'ribbon') {
      const motion = p.motion ?? 'roll';
      items.push({ id: 'ribbonMotion', label: ta('group.motion'), tip: ta('tip.ribbon.motion'), below: RibbonMotion, kind: 'select', value: motion, options: ribbonMotions(), set: (v) => setBlockProp('motion', v), ...standard('motion', 'roll') });
      if (motion === 'roll' || motion === 'sway') {
        items.push({ id: 'speed', label: ta('lbl.ribbonSpeed'), tip: ta('tip.ribbon.speed'), kind: 'slider', min: 10, max: 300, step: 5, value: p.speed ?? 60, shown: String(p.speed ?? 60), input: (v) => setBlockProp('speed', v), ...standard('speed', 60) });
      }
    } else if (b.type === 'shape') {
      items.push({ id: 'shapeColor', label: ta('lbl.color'), tip: ta('tip.shape.color'), kind: 'select', value: p.color ?? 'accent', options: colorTokens(), set: (v) => setBlockProp('color', v), ...standard('color', 'accent') });
      // The thickness only where the shape draws a stroke, as in Style.
      if (['line', 'arrow'].includes(p.kind) || (['circle', 'rect'].includes(p.kind) && !p.fill)) items.push({ id: 'thickness', label: ta('lbl.thickness'), tip: ta('tip.shape.thickness'), kind: 'number', min: 1, max: 40, value: p.thickness ?? 2, set: (v) => setBlockProp('thickness', Math.max(1, Math.min(40, Number(v) || 2))), ...standard('thickness', 2) });
    } else if (b.type === 'table') {
      items.push({ id: 'tableLines', label: ta('lbl.tableLines'), tip: ta('tip.table.lines'), kind: 'choice', value: p.lines ?? 'rows',
        options: [['rows', ta('opt.table.rows')], ['grid', ta('opt.table.grid')], ['none', ta('common.none')]], set: (v) => setBlockProp('lines', v), ...standard('lines', 'rows') });
    } else if (b.type === 'form') {
      items.push({ id: 'sendMode', label: ta('form.mode'), tip: ta('form.modeTitle'), kind: 'select', value: p.mode === 'endpoint' ? 'endpoint' : 'mailto',
        options: [['mailto', ta('form.modeMailto')], ['endpoint', ta('form.modeEndpoint')]], set: (v) => setBlockProp('mode', v), ...standard('mode', 'mailto') });
    } else if (b.type === 'collection') {
      items.push({ id: 'limit', label: ta('lbl.maxCount'), tip: ta('tip.collection.limit'), kind: 'number', min: 0, max: 100, value: p.limit ?? 6, zero: ta('common.all'), set: (v) => { const n = Math.max(0, Math.min(100, Math.round(Number(v)) || 0)); setBlockProp('limit', n); return n; }, ...standard('limit', 6) });
    } else if (b.type === 'product') {
      items.push({ id: 'columns', label: ta('lbl.columns'), tip: ta('tip.product.columns'), kind: 'number', min: 0, max: 6, value: p.columns ?? 0, zero: ta('common.auto'), set: (v) => { const n = Math.max(0, Math.min(6, Math.round(Number(v)) || 0)); setBlockProp('columns', n); return n; }, ...standard('columns', 0) });
    } else if (b.type === 'checkout') {
      items.push({ id: 'vippsButton', label: ta('lbl.vippsCheckout'), tip: ta('tip.checkout.vippsCheckout'), kind: 'switch', value: Boolean(paymentsOf(p).vipps), set: (on) => setBlockProp('payments', { ...paymentsOf(p), vipps: on }),
        own: Boolean(paymentsOf(p).vipps), reset: () => setBlockProp('payments', { ...paymentsOf(p), vipps: false }) });
      items.push({ id: 'paypalButton', label: ta('lbl.payPaypal'), tip: ta('tip.checkout.payPaypal'), kind: 'switch', value: Boolean(paymentsOf(p).paypal), set: (on) => setBlockProp('payments', { ...paymentsOf(p), paypal: on }),
        own: Boolean(paymentsOf(p).paypal), reset: () => setBlockProp('payments', { ...paymentsOf(p), paypal: false }) });
    } else if (b.type === 'countdown') {
      items.push({ id: 'seconds', label: ta('lbl.countdownSeconds'), tip: ta('tip.countdown.seconds'), kind: 'switch', value: p.showSeconds !== false, set: (on) => setBlockProp('showSeconds', on), ...standard('showSeconds', true) });
    } else if (b.type === 'audio') {
      items.push({ id: 'loop', label: ta('lbl.audioLoop'), tip: ta('tip.audio.loop'), kind: 'switch', value: Boolean(p.loop), set: (on) => setBlockProp('loop', on), ...standard('loop', false) });
    } else if (b.type === 'map') {
      items.push({ id: 'zoom', label: ta('lbl.mapZoom'), tip: ta('tip.map.zoom'), kind: 'number', min: 1, max: 19, value: p.zoom ?? 15, set: (v) => setBlockProp('zoom', Math.max(1, Math.min(19, Number(v) || 15))), ...standard('zoom', ed.propStarts('map', 'zoom')) });
    }
    if (!SIZE_BY_FRAME.has(b.type)) {
      // The size ends where the block's base text meets a bound the owner set (sizeRange); setBlockSize holds it there.
      const range = sizeRange(b);
      items.push({ id: 'size', label: ta('lbl.scale'), tip: ta('tip.scale'), more: SizeBounds, kind: 'slider', min: Math.round(range.min * 100), max: Math.round(range.max * 100), step: Math.round(SIZE.step * 100), value: Math.round(blockSize(b) * 100),
        shown: `${Math.round(blockSize(b) * 100)} %`, input: (v) => setBlockSize(v / 100), done: endSizeGesture,
        own: blockSize(b) !== 1, reset: () => { setBlockSize(1); endSizeGesture(); } });
    }
    return items;
  }

  /* Wide, Pinned and the three areas stand in two columns, in their order and each whole, cut once between the columns where they come out most even.
     The cut is chosen as a block's menu opens, from the parts' heights then, and kept while the owner works in it, so a fold that opens grows its own column and moves nothing across. */
  const PARTS = ['pinned', 'content', 'style', 'placement'];
  /** How many of the parts stand in the left column. */
  let cut = $state(2);
  /** The selected block's id alone, so an edit to the block does not measure the columns anew. */
  const blockId = $derived(selectedBlock.blockId);
  /** Measures the parts once the menu stands, and again for another block or another width. */
  function balanceAreas(node) {
    const measuredFor = blockId;
    if (!wide) return;
    const frame = requestAnimationFrame(() => {
      const heights = PARTS.map((part) => node.querySelector(`[data-area="${part}"]`)?.offsetHeight ?? 0);
      const gap = 16;
      const column = (list) => list.reduce((sum, h) => (h ? sum + h + (sum ? gap : 0) : sum), 0);
      let best = cut;
      let bestTall = Infinity;
      for (let k = 1; k < PARTS.length; k++) {
        const left = column(heights.slice(0, k));
        const right = column(heights.slice(k));
        // An empty column wastes its half, so a cut that leaves one counts as the whole height
        const tall = left && right ? Math.max(left, right) : left + right;
        if (tall < bestTall) { best = k; bestTall = tall; }
      }
      if (measuredFor === blockId) cut = best;
    });
    return () => cancelAnimationFrame(frame);
  }

  /** The areas with nothing in them for this block, read from what is drawn (an area's heading alone), so their tabs are left out; the view moves off an empty area, also when a key chose one.
      Read again for another block, when a setting is pinned or taken out of Pinned, when the tab changes, and when «Extra settings style» moves the way to add into the areas or out of them. */
  let emptyAreas = $state(new Set());
  function tabsIn(node) {
    const measuredFor = blockId;
    void areaAway;
    void menu.tab;
    void menu.capAddPref;
    const frame = requestAnimationFrame(() => {
      if (measuredFor !== blockId) return;
      const empty = new Set(MENU_AREAS.filter((area) => {
        const col = node.querySelector(`[data-area="${area}"]`);
        return !col || !col.querySelector(':scope > :not(.emenu-title, .emenu-none, .emenu-head), :scope > .emenu-head .cap-icons');
      }));
      emptyAreas = empty;
      if (empty.has(menu.tab)) menu.tab = MENU_AREAS.find((area) => !empty.has(area)) ?? 'content';
    });
    return () => cancelAnimationFrame(frame);
  }

  /** With the chips, the area in view marks its chip: the first area whose top has come within the upper part of the menu's scroll, watched by the scroll's own observer. */
  function areaInView(node) {
    if (shortcuts !== 'chips' || layout === 'tabs') return;
    const root = node.closest('.block-menu-body') ?? node.closest('.panel');
    const seen = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) seen.set(entry.target.dataset.area, entry.isIntersecting);
      const first = MENU_AREAS.find((area) => seen.get(area));
      if (first) menu.tab = first;
    }, { root, rootMargin: '0px 0px -55% 0px' });
    for (const col of node.querySelectorAll(':scope [data-area]')) if (MENU_AREAS.includes(col.dataset.area)) observer.observe(col);
    return () => observer.disconnect();
  }

  /* The keys of the menu's areas (0.7.20.9, proposal O on the Design canvas): with the focus in the menu and not in a field, 1, 2 and 3 choose Content, Style and Placement (scrolling to where the area starts), and / goes to the search field of the menu the focus is in.
     No key caps are drawn; the keys are listed in the shortcut sheet and the user guide. */
  function menuKeys(event) {
    const t = event.target;
    if (t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const root = event.currentTarget;
    if (['1', '2', '3'].includes(event.key)) {
      event.preventDefault();
      chooseArea(MENU_AREAS[Number(event.key) - 1], root.closest('.block-menu') ?? root.closest('.panel-body'));
      return;
    }
    if (event.key === '/') {
      event.preventDefault();
      // The floating menu's field stands in its head, above the body; the panel's over the menu.
      const field = (root.closest('.block-menu') ?? root.closest('.panel-body'))?.querySelector('.menu-search');
      field?.focus();
      field?.select();
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="emenu-root" class:narrow={!wide} onkeydown={menuKeys}>

{#snippet menuContent()}
  <Family area="content" />
{/snippet}
{#snippet menuStyle()}
  {#if designs}
    <!-- The block's looks, side by side as the buttons that open their pickers: a design other than the block's first is its own, with the way back to the first; a phone design chosen is its own too -->
    <LookRows pins={designs.phone ? ['design', 'phoneDesign'] : ['design']}>
      <Setting pin="design" own={designs.read(selectedBlock.props) !== designs.read({})} reset={() => setBlockProp(designs.prop, undefined)}><DesignRow /></Setting>
      {#if designs.phone}<Setting pin="phoneDesign" own={selectedBlock.props.phoneDesign !== undefined} reset={() => setBlockProp('phoneDesign', undefined)}><DesignRow phone /></Setting>{/if}
    </LookRows>
  {/if}
  <Family area="style" />
  <MotionFold />
{/snippet}
{#snippet menuPlacement()}
  <Placement />
{/snippet}

{#snippet pinnedPart()}
  {#if pinnedShown && pinnedItems.length}
    <!-- Pinned: the settings used most, each drawn here instead of in its area; the pin on a row takes it back there -->
    <section class="emenu-pinned" data-area="pinned">
      <header class="emenu-head">
        <span class="emenu-head-title"><span class="emenu-head-name">{ta('menu.pinned')}</span></span>
        {#if choiceChanged(quickChoice(selectedBlock.type))}
          <button type="button" class="linkish menu-pinned-reset" onclick={() => setQuickChoice(selectedBlock.type, NO_CHOICE)}>{ta('menu.quickReset')}</button>
        {/if}
      </header>
      <div class="emenu-pinned-rows" class:tiles={shortcuts === 'tiles'}>
        {#each pinnedItems as item (item.id)}
          <!-- A row with what belongs to it, kept together in one column; a setting under it that is pinned itself stands as its own row -->
          <div class="emenu-pinned-item">
            <Setting pin={item.id} own={item.own} reset={item.reset}>
              {#if item.kind === 'open'}
                <!-- A look is chosen as «Designs» asks, and as a row among the tiles, which stand two to a line -->
                <LookChoice label={item.label} title={item.tip} value={item.value} picture={item.picture ?? ''} current={item.current ?? null}
                  designs={shortcuts === 'tiles' ? null : (item.designs ?? null)} onpick={item.pick ?? null} onopen={item.run} />
              {:else if item.kind === 'number' && item.zero}
                <!-- A number whose zero means «all» or «automatic» shows that word in an empty field; the set returns the stored value, written back, so a clamped or zero entry shows what the block holds -->
                <label title={item.tip}>{item.label}
                  <input type="number" min={item.min} max={item.max} step={item.step ?? 1} value={item.value || ''} placeholder={item.zero}
                    onchange={(e) => { const stored = item.set(e.target.value); if (stored !== undefined) e.target.value = stored || ''; }} /></label>
              {:else if item.kind === 'slider'}
                <SliderRow label={item.label} title={item.tip} value={item.value} min={item.min} max={item.max} step={item.step ?? 1} shown={item.shown} oninput={(v) => item.input(v)} onchange={() => item.done?.()} />
              {:else if item.kind === 'link'}
                <LinkField label={item.label} value={item.value} onchange={(link) => item.set(link)} />
              {:else if item.kind === 'number'}
                <NumberRow label={item.label} title={item.tip} value={item.value} min={item.min} max={item.max} step={item.step ?? 1} onchange={(v) => item.set(v)} />
              {:else if item.kind === 'select'}
                <SelectRow label={item.label} title={item.tip} value={item.value} options={item.options} onchange={(v) => item.set(v)} />
              {:else if item.kind === 'color'}
                <ColourRow label={item.label} title={item.tip} value={item.value} tokens={themeSwatches()} onchange={(v) => item.set(v)} />
              {:else if item.kind === 'switch'}
                <SwitchRow label={item.label} title={item.tip} checked={item.value} onchange={(on) => item.set(on)} />
              {:else}
                <Choice label={item.label} title={item.tip} value={item.value} options={item.options} stack onchange={(v) => item.set(v)} />
              {/if}
              <!-- What belongs to the setting and shows with some of its values stands in its row, under its line, as in its area -->
              {#snippet more()}
                {#if item.more}<PinScope away={() => pinnedIds}><item.more /></PinScope>{/if}
              {/snippet}
            </Setting>
            {#if item.below}
              <PinScope away={() => pinnedIds}><item.below /></PinScope>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/if}
{/snippet}
{#if only}
  <!-- A small panel from a tool of the bar: the areas drawn as ever, everything but the one group hidden, none of it taken to Pinned -->
  <PinScope away={() => NONE_PINNED} pins={false}>
    <!-- A tool that opens a capability opens its card whether the block uses it or not (ADR-0031) -->
    <CapScope forced={(id) => only === `fold:${id}`}>
      <div class="emenu-cols emenu-stack emenu-only" {@attach onlyGroup(only)}>
        <MenuArea area="content" title={ta('props.tabContent')}>{@render menuContent()}</MenuArea>
        <MenuArea area="style" title={ta('props.tabStyle')}>{@render menuStyle()}</MenuArea>
        <MenuArea area="placement" title={ta('props.tabPlacement')}>{@render menuPlacement()}</MenuArea>
      </div>
    </CapScope>
  </PinScope>
{:else if query.trim()}
  <!-- The search: a copy of the three areas of its own, narrowed to what matches (menu-search.js),
       Content and Style beside Placement when wide and under each other when narrow, each area saying when nothing in it matches -->
  {#snippet foundContent()}<section class="emenu-col" data-area="content"><p class="emenu-title">{ta('props.tabContent')}</p>{@render menuContent()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>{/snippet}
  {#snippet foundStyle()}<section class="emenu-col" data-area="style"><p class="emenu-title">{ta('props.tabStyle')}</p>{@render menuStyle()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>{/snippet}
  {#snippet foundPlacement()}<section class="emenu-col" data-area="placement"><p class="emenu-title">{ta('props.tabPlacement')}</p>{@render menuPlacement()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>{/snippet}
  <div class="emenu-cols emenu-search" class:emenu-two={wide} {@attach menuSearch(query, searchLangs.ready ? matchAny : matchWords)}>
    <PinScope away={() => NONE_PINNED} pins={pinnedShown}>
      <!-- Every capability stands in the search's copy, so a setting in one the block has not taken is found where it stands (ADR-0031) -->
      <CapScope forced={() => true}>
        {#if wide}
          <div class="emenu-column">{@render foundContent()}{@render foundStyle()}</div>
          <div class="emenu-column">{@render foundPlacement()}</div>
        {:else}
          {@render foundContent()}{@render foundStyle()}{@render foundPlacement()}
        {/if}
      </CapScope>
    </PinScope>
  </div>
{:else}
  <!-- Wide: Pinned and the areas in two columns, cut once where they come out most even (`balanceAreas`); narrow: Pinned, then the areas under each other, each heading sticking to the top of its area and counting its groups.
       Pinned stands outside the scope that takes its settings out of the areas. -->
  {#snippet areaContent()}<PinScope away={() => areaAway} pins={pinnedShown}><MenuArea area="content" title={ta('props.tabContent')} counts={layout === 'narrow'} adds>{@render menuContent()}</MenuArea></PinScope>{/snippet}
  {#snippet areaStyle()}<PinScope away={() => areaAway} pins={pinnedShown}><MenuArea area="style" title={ta('props.tabStyle')} counts={layout === 'narrow'} adds>{@render menuStyle()}</MenuArea></PinScope>{/snippet}
  {#snippet areaPlacement()}<PinScope away={() => areaAway} pins={pinnedShown}><MenuArea area="placement" title={ta('props.tabPlacement')} counts={layout === 'narrow'} adds>{@render menuPlacement()}</MenuArea></PinScope>{/snippet}
  <!-- The chips: one for each area, jumping to where it starts, the area in view marked -->
  {#snippet chips()}
    {#if shortcuts === 'chips' && layout !== 'tabs'}
      <div class="emenu-chips" role="group" aria-label={ta('menu.areas')}>
        {#each AREA_TABS as [area, word] (area)}
          <button type="button" class="emenu-chip" class:on={menu.tab === area} aria-current={menu.tab === area ? 'true' : undefined} onclick={(e) => chooseArea(area, e.currentTarget.closest('.block-menu') ?? e.currentTarget.closest('.panel-body'))}>{word}</button>
        {/each}
      </div>
    {/if}
  {/snippet}
  {@const parts = { pinned: pinnedPart, content: areaContent, style: areaStyle, placement: areaPlacement }}
  {#if wide}
    {@render chips()}
    <div class="emenu-cols emenu-two" {@attach balanceAreas} {@attach areaInView}>
      <div class="emenu-column">{#each PARTS.slice(0, cut) as part (part)}{@render parts[part]()}{/each}</div>
      <div class="emenu-column">{#each PARTS.slice(cut) as part (part)}{@render parts[part]()}{/each}</div>
    </div>
  {:else if layout === 'tabs'}
    <!-- With tabs: Pinned, then the three areas as tabs with one in view, every area drawn so a tab whose area holds nothing for this block can be left out (`tabsIn`); 1, 2 and 3 choose them too (chooseArea) -->
    {@render pinnedPart()}
    <div class="emenu-tabs"><Choice fill label={ta('menu.areas')} value={menu.tab} options={AREA_TABS.filter(([area]) => !emptyAreas.has(area))} onchange={(v) => (menu.tab = v)} /></div>
    <div class="emenu-cols emenu-stack emenu-tabbed" data-tab={menu.tab} {@attach tabsIn}>
      {@render areaContent()}{@render areaStyle()}{@render areaPlacement()}
    </div>
  {:else}
    {@render pinnedPart()}
    {@render chips()}
    <div class="emenu-cols emenu-stack" {@attach areaInView}>
      {@render areaContent()}{@render areaStyle()}{@render areaPlacement()}
    </div>
  {/if}
{/if}
</div>
