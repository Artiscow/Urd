<script>
  /* The element menu (ADR-0016 decision 3, 0.7.26.2): Content is what the
     block says and shows, Style is how it looks, Placement is where it sits
     and how it behaves there. Wide, the three stand as columns; narrow, they
     are tabs. Above them the quick row: the settings used most, changed
     without opening anything. A block type's own come first, then the two
     every block has (how it fits a narrower screen, and whether it shows on
     a phone). */
  import { getContext } from 'svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import Pin from './Pin.svelte';
  import { calDesign, calView, calPhoneView, calPhoneDesignDef, calCardDesign, calCardDesignDef } from '$engine/calendar-designs.js';
  import { GALLERY_VIEWS, GRID_VIEWS, galleryView as blockGalleryView } from '$engine/gallery-model.js';
  import { ta } from '$engine/i18n.js';
  import { FIT_BY_WIDTH, SIZE, SIZE_BY_FRAME, blockSize, sizeRange } from '$engine/push-model.js';
  import { ribbonMotions, colorTokens, onOff } from './options.js';
  import { menu, quickChoice, setQuickChoice, chooseArea, MENU_AREAS } from './state.svelte.js';
  import { quickIds, choiceChanged, NO_CHOICE } from '../lib/quick-row.js';
  import { matchWords } from '$engine/palette-search.js';
  import { menuSearch } from '../lib/menu-search.js';
  import Placement from './Placement.svelte';
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
  import Countdown from './families/Countdown.svelte';
  import Audio from './families/Audio.svelte';
  import Collection from './families/Collection.svelte';
  import Product from './families/Product.svelte';
  import Cart from './families/Cart.svelte';
  import Checkout from './families/Checkout.svelte';
  import Fields from './families/Fields.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { setBlockProp, setBlockFit, setBlockSize, endSizeGesture, setBlockHideMobile, designWidth, buttonTargets, setButtonTarget, themeSwatches } = ed;
  /** The family of each block type; a type without one of its own shows the field contract. */
  const FAMILIES = { text: Text, button: Button, image: Image, video: Video, icon: Icon, shape: Shape, gallery: Gallery, ribbon: Ribbon, calendar: Calendar, form: Form, faq: Faq, timeline: Timeline, quote: Quote, stats: Stats, table: Table, share: Share, countdown: Countdown, audio: Audio, collection: Collection, product: Product, cart: Cart, checkout: Checkout };
  const Family = $derived(FAMILIES[selectedBlock.type] ?? Fields);
  let { wide, query = '' } = $props();

  function menuQuickItems() {
    const choice = quickChoice(selectedBlock.type);
    const items = new Map(quickItemsAvailable().map((item) => [item.id, item]));
    return quickIds(selectedBlock.type, choice, new Set(items.keys())).map((id) => items.get(id));
  }
  /** Every setting the selected block can show in its quick row now, as a tile. */
  function quickItemsAvailable() {
    const b = selectedBlock;
    const items = [];
    if (b.type === 'calendar') {
      items.push({ id: 'design', label: ta('calendar.design'), kind: 'open', value: ta(calDesign(b.props.design).labelKey), run: ed.openDesignPicker });
      items.push({ id: 'phoneView', label: ta('calendar.phoneView'), kind: 'open', value: ta(calPhoneDesignDef(calPhoneView(b.props), b.props).labelKey), run: ed.openPhonePicker });
      items.push({ id: 'card', label: ta('calendar.card'), kind: 'open', value: ta(calCardDesignDef(calCardDesign(b.props)).labelKey), run: ed.openCardPicker });
      if (['list', 'cards', 'agenda'].includes(calView(b.props))) {
        items.push({ id: 'limit', label: ta('lbl.maxCount'), kind: 'number', min: 1, max: 50, value: b.props.limit ?? 6, set: (v) => setBlockProp('limit', Math.max(1, Math.min(50, Number(v) || 6))) });
      }
      items.push({ id: 'subscribe', label: ta('quick.subscribe'), kind: 'choice', value: b.props.showSubscribe !== false ? 'on' : 'off', options: [['on', ta('common.on')], ['off', ta('common.off')]], set: (v) => setBlockProp('showSubscribe', v === 'on') });
    }
    const byWidth = FIT_BY_WIDTH.has(b.type);
    items.push({ id: 'fit', label: ta('quick.fit'), kind: 'choice', value: b.fit === 'shrink' || b.fit === 'both' ? b.fit : 'wrap',
      options: byWidth ? [['wrap', ta('quick.fit.fluid')], ['shrink', ta('quick.fit.floor')]]
        : [['wrap', ta('quick.fit.wrap')], ...(designWidth() || b.fit === 'shrink' ? [['shrink', ta('quick.fit.shrink')]] : []), ['both', ta('quick.fit.both')]],
      set: (v) => setBlockFit(v) });
    items.push({ id: 'phone', label: ta('quick.phone'), kind: 'choice', value: b.hideMobile ? 'off' : 'on', options: [['on', ta('quick.phone.show')], ['off', ta('quick.phone.hide')]], set: (v) => setBlockHideMobile(v === 'off') });
    const p = b.props;
    if (b.type === 'text') {
      items.push({ id: 'align', label: ta('lbl.align'), kind: 'choice', value: p.align ?? 'left',
        options: [['left', ta('common.left')], ['center', ta('common.center')], ['right', ta('common.right')]], set: (v) => setBlockProp('align', v) });
      items.push({ id: 'textBox', label: ta('group.textBox'), kind: 'choice', value: p.box ? 'on' : 'off', options: onOff(), set: (v) => setBlockProp('box', v === 'on') });
    } else if (b.type === 'button') {
      items.push({ id: 'goesTo', label: ta('lbl.goesTo'), kind: 'select', value: p.page ?? '__href', options: buttonTargets(), set: setButtonTarget });
      items.push({ id: 'btnStyle', label: ta('lbl.style'), kind: 'select', value: p.style ?? 'primary',
        options: [['primary', ta('opt.btn.primary')], ['secondary', ta('opt.btn.secondary')]], set: (v) => setBlockProp('style', v) });
    } else if (b.type === 'image') {
      items.push({ id: 'imgFit', label: ta('lbl.imageFit'), kind: 'select', value: p.fit ?? 'cover',
        options: [['cover', ta('opt.fitFrame.cover')], ['contain', ta('opt.fitFrame.contain')]], set: (v) => setBlockProp('fit', v) });
      items.push({ id: 'radius', label: ta('group.corners'), kind: 'choice', value: p.radius ?? '',
        options: [['', ta('common.none')], ['sm', ta('opt.size.sm')], ['md', ta('opt.radius.md')]], set: (v) => setBlockProp('radius', v || null) });
    } else if (b.type === 'video') {
      items.push({ id: 'videoSource', label: ta('lbl.videoSource'), kind: 'choice', value: p.source === 'file' ? 'file' : 'embed',
        options: [['embed', ta('opt.videoSource.embed')], ['file', ta('opt.videoSource.file')]], set: (v) => setBlockProp('source', v) });
    } else if (b.type === 'icon') {
      items.push({ id: 'iconSize', label: ta('lbl.sizePx'), kind: 'number', min: 8, max: 400, value: p.size ?? 48, set: (v) => setBlockProp('size', Math.max(8, Math.min(400, Number(v) || 48))) });
      items.push({ id: 'iconColor', label: ta('lbl.color'), kind: 'color', value: p.color ?? 'accent', set: (v) => setBlockProp('color', v) });
    } else if (b.type === 'gallery') {
      const gview = blockGalleryView(p.view);
      items.push({ id: 'galleryView', label: ta('lbl.view'), kind: 'select', value: gview,
        options: GALLERY_VIEWS.map((v) => [v, ta(`opt.galleryView.${v}`)]), set: (v) => setBlockProp('view', v) });
      if (GRID_VIEWS.includes(gview)) {
        items.push({ id: 'columns', label: ta('lbl.columns'), kind: 'number', min: 1, max: 6, value: p.columns ?? 3, set: (v) => setBlockProp('columns', Math.max(1, Math.min(6, Number(v) || 3))) });
      }
    } else if (b.type === 'ribbon') {
      const motion = p.motion ?? 'roll';
      items.push({ id: 'ribbonMotion', label: ta('lbl.ribbonMotion'), kind: 'select', value: motion, options: ribbonMotions(), set: (v) => setBlockProp('motion', v) });
      if (motion === 'roll' || motion === 'sway') {
        items.push({ id: 'speed', label: ta('lbl.ribbonSpeed'), kind: 'number', min: 10, max: 300, step: 5, value: p.speed ?? 60, set: (v) => setBlockProp('speed', Math.max(10, Math.min(300, Number(v) || 60))) });
      }
    } else if (b.type === 'shape') {
      items.push({ id: 'shapeColor', label: ta('lbl.color'), kind: 'select', value: p.color ?? 'accent', options: colorTokens(), set: (v) => setBlockProp('color', v) });
      items.push({ id: 'thickness', label: ta('lbl.thickness'), kind: 'number', min: 1, max: 40, value: p.thickness ?? 2, set: (v) => setBlockProp('thickness', Math.max(1, Math.min(40, Number(v) || 2))) });
    } else if (b.type === 'table') {
      items.push({ id: 'tableLines', label: ta('lbl.tableLines'), kind: 'select', value: p.lines ?? 'rows',
        options: [['rows', ta('opt.table.rows')], ['grid', ta('opt.table.grid')], ['none', ta('common.none')]], set: (v) => setBlockProp('lines', v) });
    } else if (b.type === 'quote') {
      items.push({ id: 'variant', label: ta('lbl.variant'), kind: 'select', value: p.variant ?? 'large',
        options: [['large', ta('opt.quote.large')], ['short', ta('opt.quote.short')]], set: (v) => setBlockProp('variant', v) });
    } else if (b.type === 'stats') {
      items.push({ id: 'variant', label: ta('lbl.variant'), kind: 'select', value: ['plain', 'cards', 'band'].includes(p.variant) ? p.variant : 'plain',
        options: ['plain', 'cards', 'band'].map((v) => [v, ta(`opt.statVariant.${v}`)]), set: (v) => setBlockProp('variant', v) });
    } else if (b.type === 'faq') {
      items.push({ id: 'variant', label: ta('lbl.variant'), kind: 'select', value: p.variant === 'list' ? 'list' : 'cards',
        options: ['cards', 'list'].map((v) => [v, ta(`opt.faqVariant.${v}`)]), set: (v) => setBlockProp('variant', v) });
    } else if (b.type === 'timeline') {
      items.push({ id: 'variant', label: ta('lbl.variant'), kind: 'select', value: p.variant ?? 'left',
        options: [['left', ta('opt.timeline.left')], ['alternating', ta('opt.timeline.alternating')]], set: (v) => setBlockProp('variant', v) });
    } else if (b.type === 'form') {
      items.push({ id: 'sendMode', label: ta('form.mode'), kind: 'select', value: p.mode === 'endpoint' ? 'endpoint' : 'mailto',
        options: [['mailto', ta('form.modeMailto')], ['endpoint', ta('form.modeEndpoint')]], set: (v) => setBlockProp('mode', v) });
    } else if (b.type === 'collection') {
      items.push({ id: 'collectionView', label: ta('lbl.view'), kind: 'select', value: p.view ?? 'cards',
        options: [['cards', ta('opt.collectionView.cards')], ['list', ta('opt.collectionView.list')], ['archive', ta('opt.collectionView.archive')]], set: (v) => setBlockProp('view', v) });
      items.push({ id: 'limit', label: ta('lbl.maxCount'), kind: 'number', min: 0, max: 100, value: p.limit ?? 6, set: (v) => setBlockProp('limit', Math.max(0, Math.min(100, Number(v) || 0))) });
    } else if (b.type === 'product') {
      items.push({ id: 'columns', label: ta('lbl.columns'), kind: 'number', min: 0, max: 6, value: p.columns ?? 0, set: (v) => setBlockProp('columns', Math.max(0, Math.min(6, Number(v) || 0))) });
    } else if (b.type === 'cart') {
      items.push({ id: 'cartView', label: ta('lbl.view'), kind: 'select', value: p.variant ?? 'button',
        options: [['button', ta('opt.cart.button')], ['icon', ta('opt.cart.icon')]], set: (v) => setBlockProp('variant', v) });
    } else if (b.type === 'checkout') {
      items.push({ id: 'vippsButton', label: ta('lbl.vippsCheckout'), kind: 'choice', value: p.vippsCheckout === true ? 'on' : 'off', options: onOff(), set: (v) => setBlockProp('vippsCheckout', v === 'on') });
    } else if (b.type === 'share') {
      items.push({ id: 'variant', label: ta('lbl.variant'), kind: 'select', value: p.variant ?? 'icons',
        options: [['icons', ta('opt.share.icons')], ['labels', ta('opt.share.labels')]], set: (v) => setBlockProp('variant', v) });
    } else if (b.type === 'countdown') {
      items.push({ id: 'seconds', label: ta('lbl.countdownSeconds'), kind: 'choice', value: p.showSeconds !== false ? 'on' : 'off', options: onOff(), set: (v) => setBlockProp('showSeconds', v === 'on') });
    } else if (b.type === 'audio') {
      items.push({ id: 'loop', label: ta('lbl.audioLoop'), kind: 'choice', value: p.loop ? 'on' : 'off', options: onOff(), set: (v) => setBlockProp('loop', v === 'on') });
    } else if (b.type === 'map') {
      items.push({ id: 'zoom', label: ta('lbl.mapZoom'), kind: 'number', min: 1, max: 19, value: p.zoom ?? 15, set: (v) => setBlockProp('zoom', Math.max(1, Math.min(19, Number(v) || 15))) });
    }
    if (!SIZE_BY_FRAME.has(b.type)) {
      // The size ends where the block's base text meets a bound the owner set (sizeRange); setBlockSize holds it there.
      const range = sizeRange(b);
      items.push({ id: 'size', label: ta('lbl.scale'), kind: 'number', min: Math.round(range.min * 100), max: Math.round(range.max * 100), step: Math.round(SIZE.step * 100), value: Math.round(blockSize(b) * 100),
        set: (v) => { endSizeGesture(); setBlockSize((Number(v) || 100) / 100); endSizeGesture(); } });
    }
    return items;
  }

  /* The keys of the menu's areas (0.7.20.9, proposal O on the Design canvas):
     with the focus in the menu and not in a field, 1, 2 and 3 choose Content,
     Style and Placement (the tab when narrow, the column when wide), and /
     goes to the search field of the menu the focus is in. No key caps are
     drawn; the keys are told in the welcome and the user guide. */
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
<div class="emenu-root" onkeydown={menuKeys}>

{#snippet menuContent()}
  <Family area="content" />
{/snippet}
{#snippet menuStyle()}
  <Family area="style" />
{/snippet}
{#snippet menuPlacement()}
  <Placement />
{/snippet}

{#if !query.trim()}
  <!-- The quick row: the settings used most, changed without opening anything -->
  <div class="menu-quick">
    {#each menuQuickItems() as item (item.id)}
      <div class="menu-quick-item">
        <span class="menu-quick-head"><span class="mini-label">{item.label}</span><Pin id={item.id} /></span>
        {#if item.kind === 'open'}
          <button type="button" class="menu-quick-open" onclick={item.run}>{item.value}</button>
        {:else if item.kind === 'number'}
          <input type="number" min={item.min} max={item.max} step={item.step ?? 1} value={item.value} aria-label={item.label} onchange={(e) => item.set(e.target.value)} />
        {:else if item.kind === 'select'}
          <Dropdown value={item.value} options={item.options} title={item.label} compact onchange={(v) => item.set(v)} />
        {:else if item.kind === 'color'}
          <ColorPicker value={item.value} tokens={themeSwatches()} label={item.label} onchange={(v) => item.set(v)} />
        {:else}
          <span class="seg" role="group" aria-label={item.label}>
            {#each item.options as [v, text] (v)}
              <button type="button" class:on={item.value === v} aria-pressed={item.value === v} onclick={() => item.set(v)}>{text}</button>
            {/each}
          </span>
        {/if}
      </div>
    {/each}
    {#if choiceChanged(quickChoice(selectedBlock.type))}
      <button type="button" class="linkish menu-quick-reset" onclick={() => setQuickChoice(selectedBlock.type, NO_CHOICE)}>{ta('menu.quickReset')}</button>
    {/if}
  </div>
{/if}
{#if query.trim()}
  <!-- The search: a copy of the three areas of its own, narrowed to what matches (menu-search.js),
       as columns when wide and under each other when narrow, each area saying when nothing in it matches -->
  <div class="emenu-cols emenu-search" class:stacked={!wide} {@attach menuSearch(query, matchWords)}>
    <section class="emenu-col"><p class="panel-strong emenu-title">{ta('props.tabContent')}</p>{@render menuContent()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>
    <section class="emenu-col"><p class="panel-strong emenu-title">{ta('props.tabStyle')}</p>{@render menuStyle()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>
    <section class="emenu-col"><p class="panel-strong emenu-title">{ta('props.tabPlacement')}</p>{@render menuPlacement()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>
  </div>
{:else if wide}
  <div class="emenu-cols">
    <section class="emenu-col"><p class="panel-strong">{ta('props.tabContent')}</p>{@render menuContent()}</section>
    <section class="emenu-col"><p class="panel-strong">{ta('props.tabStyle')}</p>{@render menuStyle()}</section>
    <section class="emenu-col"><p class="panel-strong">{ta('props.tabPlacement')}</p>{@render menuPlacement()}</section>
  </div>
{:else}
  <div class="props-tabs">
    <span class="seg">
      <button type="button" class:on={menu.tab === 'content'}
        onclick={() => (menu.tab = 'content')}>{ta('props.tabContent')}</button>
      <button type="button" class:on={menu.tab === 'style'}
        onclick={() => (menu.tab = 'style')}>{ta('props.tabStyle')}</button>
      <button type="button" class:on={menu.tab === 'placement'}
        onclick={() => (menu.tab = 'placement')}>{ta('props.tabPlacement')}</button>
    </span>
  </div>
  {#if menu.tab === 'content'}
    {@render menuContent()}
  {:else if menu.tab === 'style'}
    {@render menuStyle()}
  {:else}
    {@render menuPlacement()}
  {/if}
{/if}
</div>
