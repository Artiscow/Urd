<script>
  /* The element menu (ADR-0016 decision 3): Content is what the block says and shows, Style is how it looks, Placement is where it sits and how it behaves there.
     Above them stands Pinned: the settings used most, a block type's own first and then the two every block has (how it fits a narrower screen, and whether it shows on a phone).
     A pinned setting stands there instead of in its area, so no setting is drawn twice (PinScope.svelte), and an area left with nothing in it is not drawn.
     Wide, the areas pour through two columns, a group never split and a heading where its area starts; narrow, they stand under each other with a heading each.
     A block with designs has its design, and its phone design, as the first rows of Style. */
  import { getContext } from 'svelte';
  import Choice from '../lib/Choice.svelte';
  import Setting from '../lib/rows/Setting.svelte';
  import PictureRow from '../lib/rows/PictureRow.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import ColourRow from '../lib/rows/ColourRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import PinScope from './PinScope.svelte';
  import DesignRow from './DesignRow.svelte';
  import FitMin from './FitMin.svelte';
  import BoxStyle from './BoxStyle.svelte';
  import RibbonMotion from './families/RibbonMotion.svelte';
  import { calDesign, calView, calPhoneView, calPhoneDesignDef, calCardDesign, calCardDesignDef } from '$engine/calendar-designs.js';
  import { paymentsOf } from '$engine/shop.js';
  import { GRID_VIEWS, galleryView as blockGalleryView } from '$engine/gallery-model.js';
  import { blockDesigns, phoneDesignName } from '../lib/design-sources.js';
  import { ta } from '$engine/i18n.js';
  import { FIT_BY_WIDTH, SIZE, SIZE_BY_FRAME, blockSize, sizeRange } from '$engine/push-model.js';
  import { ribbonMotions, colorTokens } from './options.js';
  import { menu, quickChoice, setQuickChoice, chooseArea, MENU_AREAS } from './state.svelte.js';
  import { quickIds, choiceChanged, NO_CHOICE } from '../lib/quick-row.js';
  import { matchWords } from '$engine/palette-search.js';
  import { matchAny } from '$engine/search-langs.js';
  import { searchLangs } from '../lib/search-langs.svelte.js';
  import { menuSearch } from '../lib/menu-search.js';
  import { linkOf, linkText } from '../lib/link-edit.js';
  import Placement from './Placement.svelte';
  import MenuArea from './MenuArea.svelte';
  import { toggleHintCard } from '$engine/hint.js';
  import Text from './families/Text.svelte';
  import Button from './families/Button.svelte';
  import Image from './families/Image.svelte';
  import Video from './families/Video.svelte';
  import Icon from './families/Icon.svelte';
  import Shape from './families/Shape.svelte';
  import Gallery from './families/Gallery.svelte';
  import Ribbon from './families/Ribbon.svelte';
  import Calendar from './families/Calendar.svelte';
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
  let { wide, query = '' } = $props();
  // A typed query loads the other languages once; the search runs again when they are in.
  $effect(() => searchLangs.need(query));

  /** The settings in Pinned now, in order, and their ids: the rows inside the areas leave out those (PinScope). */
  const pinnedItems = $derived.by(() => {
    const items = new Map(quickItemsAvailable().map((item) => [item.id, item]));
    return quickIds(selectedBlock.type, quickChoice(selectedBlock.type), new Set(items.keys())).map((id) => items.get(id));
  });
  const pinnedIds = $derived(new Set(pinnedItems.map((item) => item.id)));
  const NONE_PINNED = new Set();
  /** The selected block's designs, drawn as the first rows of Style; the calendar draws its own three in its family. */
  const designs = $derived(selectedBlock.type === 'calendar' ? null : blockDesigns(selectedBlock.type, ed.pluginBlocks));
  /** Every setting the selected block can show in Pinned now, each as its row there. */
  function quickItemsAvailable() {
    const b = selectedBlock;
    const items = [];
    if (b.type === 'calendar') {
      items.push({ id: 'design', label: ta('calendar.design'), tip: ta('tip.calendar.design'), kind: 'open', value: ta(calDesign(b.props.design).labelKey), run: ed.openDesignPicker });
      items.push({ id: 'phoneView', label: ta('calendar.phoneView'), tip: ta('tip.calendar.phoneView'), kind: 'open', value: ta(calPhoneDesignDef(calPhoneView(b.props), b.props).labelKey), run: ed.openPhonePicker });
      items.push({ id: 'card', label: ta('calendar.card'), tip: ta('tip.calendar.card'), kind: 'open', value: ta(calCardDesignDef(calCardDesign(b.props)).labelKey), run: ed.openCardPicker });
      if (['list', 'cards', 'agenda'].includes(calView(b.props))) {
        items.push({ id: 'limit', label: ta('lbl.maxCount'), tip: ta('tip.collection.limit'), kind: 'number', min: 1, max: 50, value: b.props.limit ?? 6, set: (v) => setBlockProp('limit', Math.max(1, Math.min(50, Number(v) || 6))) });
      }
      items.push({ id: 'subscribe', label: ta('quick.subscribe'), tip: ta('tip.calendar.subscribe'), kind: 'switch', value: b.props.showSubscribe !== false, set: (on) => setBlockProp('showSubscribe', on) });
    }
    const byWidth = FIT_BY_WIDTH.has(b.type);
    items.push({ id: 'fit', label: ta('quick.fit'), tip: ta('tip.fit'), below: FitMin, kind: 'choice', value: b.fit === 'shrink' || b.fit === 'both' ? b.fit : 'wrap',
      options: byWidth ? [['wrap', ta('quick.fit.fluid')], ['shrink', ta('quick.fit.floor')]]
        : [['wrap', ta('quick.fit.wrap')], ...(designWidth() || b.fit === 'shrink' ? [['shrink', ta('quick.fit.shrink')]] : []), ['both', ta('quick.fit.both')]],
      set: (v) => setBlockFit(v) });
    items.push({ id: 'phone', label: ta('quick.phone'), tip: ta('tip.hideMobile'), kind: 'choice', value: b.hideMobile ? 'off' : 'on', options: [['on', ta('quick.phone.show')], ['off', ta('quick.phone.hide')]], set: (v) => setBlockHideMobile(v === 'off') });
    const p = b.props;
    // A block's design, as the calendar's: one id for every block with designs, core or plugin (block-designs.js, the design contract), opening the design picker.
    if (designs) items.push({ id: 'design', label: ta('lbl.design'), tip: ta('tip.picker.design'), kind: 'open', value: designs.name(designs.read(p)), picture: designs.picture?.(designs.read(p)) ?? '', run: ed.openBlockDesignPicker });
    // A block with a phone design can pin its row too, which opens the phone design picker.
    if (designs?.phone) items.push({ id: 'phoneDesign', label: ta('lbl.phoneDesign'), tip: ta('tip.picker.phoneDesign'), kind: 'open', value: phoneDesignName(designs, p), run: ed.openBlockPhonePicker });
    if (b.type === 'text') {
      items.push({ id: 'align', label: ta('lbl.align'), tip: ta('tip.text.align'), kind: 'choice', value: p.align ?? 'left',
        options: [['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]], set: (v) => setBlockProp('align', v) });
      items.push({ id: 'textBox', label: ta('group.textBox'), tip: ta('tip.blocks.textBox'), below: p.box ? BoxStyle : null, kind: 'switch', value: Boolean(p.box), set: (on) => setBlockProp('box', on) });
    } else if (b.type === 'button') {
      items.push({ id: 'goesTo', label: ta('lbl.goesTo'), tip: ta('tip.link.field'), kind: 'open', value: linkText(linkOf(p), { pages: ed.siteDraft?.pages ?? [], here: ed.pageId }) || ta('link.none'),
        run: () => ed.openLink({ value: linkOf(p), here: ed.pageId, apply: (link) => ed.setBlockLink(link) }) });
    } else if (b.type === 'image') {
      items.push({ id: 'imgFit', label: ta('lbl.imageFit'), tip: ta('tip.image.fit'), kind: 'select', value: p.fit ?? 'cover',
        options: [['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]], set: (v) => setBlockProp('fit', v) });
      items.push({ id: 'radius', label: ta('group.corners'), tip: ta('tip.image.radius'), kind: 'choice', value: p.radius ?? '',
        options: [['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]], set: (v) => setBlockProp('radius', v || null) });
    } else if (b.type === 'video') {
      items.push({ id: 'videoSource', label: ta('lbl.videoSource'), kind: 'choice', value: p.source === 'file' ? 'file' : 'embed',
        options: [['embed', ta('opt.videoSource.embed')], ['file', ta('opt.videoSource.file')]], set: (v) => setBlockProp('source', v) });
    } else if (b.type === 'icon') {
      items.push({ id: 'iconSize', label: ta('lbl.sizePx'), tip: ta('tip.icon.size'), kind: 'number', min: 8, max: 400, value: p.size ?? 48, set: (v) => setBlockProp('size', Math.max(8, Math.min(400, Number(v) || 48))) });
      items.push({ id: 'iconColor', label: ta('lbl.color'), tip: ta('hint.icon.color'), kind: 'color', value: p.color ?? 'accent', set: (v) => setBlockProp('color', v) });
    } else if (b.type === 'gallery') {
      const gview = blockGalleryView(p.view);
      if (GRID_VIEWS.includes(gview)) {
        items.push({ id: 'columns', label: ta('lbl.columns'), tip: ta('tip.gallery.columns'), kind: 'number', min: 1, max: 6, value: p.columns ?? 3, set: (v) => setBlockProp('columns', Math.max(1, Math.min(6, Number(v) || 3))) });
      }
    } else if (b.type === 'ribbon') {
      const motion = p.motion ?? 'roll';
      items.push({ id: 'ribbonMotion', label: ta('lbl.ribbonMotion'), tip: ta('tip.ribbon.motion'), below: RibbonMotion, kind: 'select', value: motion, options: ribbonMotions(), set: (v) => setBlockProp('motion', v) });
      if (motion === 'roll' || motion === 'sway') {
        items.push({ id: 'speed', label: ta('lbl.ribbonSpeed'), tip: ta('tip.ribbon.speed'), kind: 'number', min: 10, max: 300, step: 5, value: p.speed ?? 60, set: (v) => setBlockProp('speed', Math.max(10, Math.min(300, Number(v) || 60))) });
      }
    } else if (b.type === 'shape') {
      items.push({ id: 'shapeColor', label: ta('lbl.color'), tip: ta('tip.shape.color'), kind: 'select', value: p.color ?? 'accent', options: colorTokens(), set: (v) => setBlockProp('color', v) });
      // The thickness only where the shape draws a stroke, as in Style.
      if (['line', 'arrow'].includes(p.kind) || (['circle', 'rect'].includes(p.kind) && !p.fill)) items.push({ id: 'thickness', label: ta('lbl.thickness'), tip: ta('tip.shape.thickness'), kind: 'number', min: 1, max: 40, value: p.thickness ?? 2, set: (v) => setBlockProp('thickness', Math.max(1, Math.min(40, Number(v) || 2))) });
    } else if (b.type === 'table') {
      items.push({ id: 'tableLines', label: ta('lbl.tableLines'), tip: ta('tip.table.lines'), kind: 'select', value: p.lines ?? 'rows',
        options: [['rows', ta('opt.table.rows')], ['grid', ta('opt.table.grid')], ['none', ta('common.none')]], set: (v) => setBlockProp('lines', v) });
    } else if (b.type === 'form') {
      items.push({ id: 'sendMode', label: ta('form.mode'), tip: ta('form.modeTitle'), kind: 'select', value: p.mode === 'endpoint' ? 'endpoint' : 'mailto',
        options: [['mailto', ta('form.modeMailto')], ['endpoint', ta('form.modeEndpoint')]], set: (v) => setBlockProp('mode', v) });
    } else if (b.type === 'collection') {
      items.push({ id: 'limit', label: ta('lbl.maxCount'), tip: ta('tip.collection.limit'), kind: 'number', min: 0, max: 100, value: p.limit ?? 6, zero: ta('common.all'), set: (v) => { const n = Math.max(0, Math.min(100, Math.round(Number(v)) || 0)); setBlockProp('limit', n); return n; } });
    } else if (b.type === 'product') {
      items.push({ id: 'columns', label: ta('lbl.columns'), tip: ta('tip.product.columns'), kind: 'number', min: 0, max: 6, value: p.columns ?? 0, zero: ta('common.auto'), set: (v) => { const n = Math.max(0, Math.min(6, Math.round(Number(v)) || 0)); setBlockProp('columns', n); return n; } });
    } else if (b.type === 'checkout') {
      // The providers' names alone in Pinned: the rows in Content name the buttons in full.
      items.push({ id: 'vippsButton', label: 'Vipps', tip: ta('tip.checkout.vippsCheckout'), kind: 'switch', value: Boolean(paymentsOf(p).vipps), set: (on) => setBlockProp('payments', { ...paymentsOf(p), vipps: on }) });
      items.push({ id: 'paypalButton', label: 'PayPal', tip: ta('tip.checkout.payPaypal'), kind: 'switch', value: Boolean(paymentsOf(p).paypal), set: (on) => setBlockProp('payments', { ...paymentsOf(p), paypal: on }) });
    } else if (b.type === 'countdown') {
      items.push({ id: 'seconds', label: ta('lbl.countdownSeconds'), tip: ta('tip.countdown.seconds'), kind: 'switch', value: p.showSeconds !== false, set: (on) => setBlockProp('showSeconds', on) });
    } else if (b.type === 'audio') {
      items.push({ id: 'loop', label: ta('lbl.audioLoop'), tip: ta('tip.audio.loop'), kind: 'switch', value: Boolean(p.loop), set: (on) => setBlockProp('loop', on) });
    } else if (b.type === 'map') {
      items.push({ id: 'zoom', label: ta('lbl.mapZoom'), tip: ta('tip.map.zoom'), kind: 'number', min: 1, max: 19, value: p.zoom ?? 15, set: (v) => setBlockProp('zoom', Math.max(1, Math.min(19, Number(v) || 15))) });
    }
    if (!SIZE_BY_FRAME.has(b.type)) {
      // The size ends where the block's base text meets a bound the owner set (sizeRange); setBlockSize holds it there.
      const range = sizeRange(b);
      items.push({ id: 'size', label: ta('lbl.scale'), tip: ta('tip.scale'), kind: 'number', min: Math.round(range.min * 100), max: Math.round(range.max * 100), step: Math.round(SIZE.step * 100), value: Math.round(blockSize(b) * 100),
        set: (v) => { endSizeGesture(); setBlockSize((Number(v) || 100) / 100); endSizeGesture(); } });
    }
    return items;
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
    <!-- A design other than the block's first is its own, with the way back to the first; a phone design chosen is its own too -->
    <Setting pin="design" own={designs.read(selectedBlock.props) !== designs.read({})} reset={() => setBlockProp(designs.prop, undefined)}><DesignRow /></Setting>
    {#if designs.phone}<Setting pin="phoneDesign" own={selectedBlock.props.phoneDesign !== undefined} reset={() => setBlockProp('phoneDesign', undefined)}><DesignRow phone /></Setting>{/if}
  {/if}
  <Family area="style" />
{/snippet}
{#snippet menuPlacement()}
  <Placement />
{/snippet}
<!-- «Which layout tool?» (comparison/ELEMENTS.md E5): the help chip rule (ADR-0008) on the heading of the area whose choices decide how a block is laid out -->
{#snippet layoutChip()}
  <button type="button" class="help-chip" title={ta('hint.how', { title: ta('hint.layout.title') })}
    aria-label={ta('hint.how', { title: ta('hint.layout.title') })}
    onclick={(e) => toggleHintCard(e.currentTarget, { title: ta('hint.layout.title'), lines: [1, 2, 3, 4, 5, 6].map((n) => ta(`hint.layout.${n}`)) })}>?</button>
{/snippet}

{#if !query.trim() && pinnedItems.length}
  <!-- Pinned: the settings used most, each drawn here instead of in its area; the pin on a row takes it back there -->
  <section class="emenu-pinned">
    <header class="emenu-head">
      <span class="emenu-head-title"><span class="panel-strong">{ta('menu.pinned')}</span></span>
      {#if choiceChanged(quickChoice(selectedBlock.type))}
        <button type="button" class="linkish menu-pinned-reset" onclick={() => setQuickChoice(selectedBlock.type, NO_CHOICE)}>{ta('menu.quickReset')}</button>
      {/if}
    </header>
    <div class="emenu-pinned-rows">
      {#each pinnedItems as item (item.id)}
        <!-- A row with what belongs to it, kept together in one column; a setting under it that is pinned itself stands as its own row -->
        <div class="emenu-pinned-item">
          <Setting pin={item.id}>
            {#if item.kind === 'open'}
              <PictureRow label={item.label} title={item.tip} value={item.value} picture={item.picture ?? ''} onclick={item.run} />
            {:else if item.kind === 'number' && item.zero}
              <!-- A number whose zero means «all» or «automatic» shows that word in an empty field; the set returns the stored value, written back, so a clamped or zero entry shows what the block holds -->
              <label title={item.tip}>{item.label}
                <input type="number" min={item.min} max={item.max} step={item.step ?? 1} value={item.value || ''} placeholder={item.zero}
                  onchange={(e) => { const stored = item.set(e.target.value); if (stored !== undefined) e.target.value = stored || ''; }} /></label>
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
          </Setting>
          {#if item.below}
            <PinScope away={() => pinnedIds}><item.below /></PinScope>
          {/if}
        </div>
      {/each}
    </div>
  </section>
{/if}
{#if query.trim()}
  <!-- The search: a copy of the three areas of its own, narrowed to what matches (menu-search.js),
       as columns when wide and under each other when narrow, each area saying when nothing in it matches -->
  <div class="emenu-cols emenu-search" class:emenu-flow={wide} {@attach menuSearch(query, searchLangs.ready ? matchAny : matchWords)}>
    <PinScope away={() => NONE_PINNED}>
      <section class="emenu-col"><p class="panel-strong emenu-title">{ta('props.tabContent')}</p>{@render menuContent()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>
      <section class="emenu-col"><p class="panel-strong emenu-title">{ta('props.tabStyle')}</p>{@render menuStyle()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>
      <section class="emenu-col"><p class="panel-strong emenu-title">{ta('props.tabPlacement')}{@render layoutChip()}</p>{@render menuPlacement()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>
    </PinScope>
  </div>
{:else}
  <!-- Wide: the areas poured through two columns; narrow: under each other, each heading sticking to the top of its area and counting its groups -->
  <div class="emenu-cols" class:emenu-flow={wide} class:emenu-stack={!wide}>
    <PinScope away={() => pinnedIds}>
      <MenuArea title={ta('props.tabContent')} counts={!wide}>{@render menuContent()}</MenuArea>
      <MenuArea title={ta('props.tabStyle')} counts={!wide}>{@render menuStyle()}</MenuArea>
      <MenuArea title={ta('props.tabPlacement')} counts={!wide} chip={layoutChip}>{@render menuPlacement()}</MenuArea>
    </PinScope>
  </div>
{/if}
</div>
