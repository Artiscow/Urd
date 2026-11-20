<script>
  /* The site's «Back to top» button (0.7.13.14, the engine's totop.js), in the Site panel's fold of the same name: shown or not, and under four subheadings
     its look (the design from the shared design picker, the owner's words on the worded designs, the shape on the shaped ones, set in the shape window, the mark in place of the arrow with its size, a mark over a picture that fills the whole button, how the words alone answer the mouse and a touch and the line under them, and the colours of the parts the design shows, side by side),
     its size on the desktop and on phones, its placement and side, and its showing (how far a visitor scrolls before it shows, and whether phones show it).
     Each choice is written into `site.layout.toTop` as one undo step, a value at its standard taken away, so a site that sets nothing stores nothing; a slider's run and a typing session are one step each (`edit:`). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { toTopOf, toTopShapeOf, toTopOutline, TOTOP_SHAPED, TOTOP_WORDED, TOTOP_AFTER, TOTOP_TEXT_MAX, TOTOP_SIZES, TOTOP_HOVERS, TOTOP_PRESSES, TOTOP_LINES, TOTOP_LINE_WIDTH, TOTOP_ICON_SIZE, TOTOP_FILLS, toTopFillsWhole } from '$engine/totop.js';
  import { pictureList, toTopDesignSource } from '../../lib/design-sources.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import ColoursRow from '../../lib/rows/ColoursRow.svelte';
  import SubHeading from '../../lib/rows/SubHeading.svelte';
  import LookChoice from '../../lib/rows/LookChoice.svelte';
  import Choice from '../../lib/Choice.svelte';
  import GlyphPicker from '../../lib/GlyphPicker.svelte';
  import { glyphTakesColour } from '$engine/glyphs.js';
  import { shapeStored, shapeId } from '$engine/shape-model.js';
  import PictureRow from '../../lib/rows/PictureRow.svelte';
  import ShapeWindow from '../../lib/ShapeWindow.svelte';
  import { ICONS } from '../../lib/icons.js';

  const ed = getContext('urd-editor');
  const set = $derived(toTopOf(ed.siteDraft));
  const shaped = $derived(TOTOP_SHAPED.includes(set.design));
  const worded = $derived(TOTOP_WORDED.includes(set.design));
  const wordsAlone = $derived(set.design === 'words');

  /** The sizes by their names, from the standard up. */
  const SIZE_KEYS = { m: 'opt.size.md', l: 'opt.size.lg', xl: 'opt.size.xl', xxl: 'opt.size.xxl' };
  const sizeOptions = () => Object.keys(TOTOP_SIZES).map((id) => [id, ta(SIZE_KEYS[id])]);

  /** Writes one setting of the button; its standard takes it away, and an empty setting takes the field away with it. */
  function write(key, value, standard, name = 'site-totop') {
    ed.siteMutate(name, () => {
      const layout = (ed.siteDraft.layout ??= {});
      const top = { ...(layout.toTop ?? {}) };
      if (value === standard || value == null || value === '') delete top[key];
      else top[key] = value;
      if (Object.keys(top).length) layout.toTop = top;
      else delete layout.toTop;
    });
  }

  /** The button's own mark in place of the arrow, one undo step: a character, a drawn icon or a picture, each taking the others' place; none takes it back to the arrow. */
  function writeMark(mark) {
    ed.siteMutate('site-totop', () => {
      const layout = (ed.siteDraft.layout ??= {});
      const top = { ...(layout.toTop ?? {}) };
      delete top.glyph;
      delete top.icon;
      delete top.image;
      // How a picture fills the button, and the mark over it, go with the picture.
      if (!mark.image) {
        delete top.fill;
        delete top.over;
      }
      for (const [key, value] of Object.entries(mark)) if (value) top[key] = value;
      if (Object.keys(top).length) layout.toTop = top;
      else delete layout.toTop;
    });
  }
  const ownMark = $derived(Boolean(set.image || set.icon || set.glyph));
  /** A picture that fills the whole button, and the mark over it where the owner puts one: the arrow, or a drawn icon or a character. */
  const whole = $derived(toTopFillsWhole(set));
  const over = $derived(whole ? set.over : null);
  /** The mark the size and the colour act on: the one over a whole picture, else the button's own. */
  const markOwn = $derived(whole ? Boolean(over?.icon || over?.glyph) : ownMark);
  /** The mark takes a colour: the arrow, a drawn icon, or a character drawn as text; a picture and emoji keep their own colours, and a whole picture with nothing over it has none. */
  const markColoured = $derived(whole
    ? Boolean(over) && (Boolean(over.icon) || !over.glyph || glyphTakesColour(over.glyph))
    : !set.image && (Boolean(set.icon) || !set.glyph || glyphTakesColour(set.glyph)));

  /** One of the button's colours, the others kept; none takes it back to the design's own. */
  function writeColour(which, value) {
    const colors = { ...(ed.siteDraft.layout?.toTop?.colors ?? {}) };
    if (value) colors[which] = value;
    else delete colors[which];
    write('colors', Object.keys(colors).length ? colors : null, null);
  }

  /** Whether the hover draws in the effect's colour (all but the plain lift), and the touch (its tint and underline, where phones show the button). */
  const hoverColoured = $derived(set.hover !== 'liftPlain');
  const pressColoured = $derived(set.phone && (set.press === 'tint' || set.press === 'underline'));
  const effectColoured = $derived(hoverColoured || pressColoured);
  /** The effect's colour, named by what it colours: the hover's colour, underline, pill or glow, the touch's alone, or both. */
  const effectLabel = $derived(
    hoverColoured && pressColoured ? ta('lbl.toTopEffectColour')
      : !hoverColoured ? ta('lbl.toTopTouchColour')
        : set.hover === 'underline' ? ta('hoverColor.underline.label')
          : set.hover === 'pill' ? ta('hoverColor.pill.label')
            : set.hover === 'lift' ? ta('hoverColor.lift.label')
              : ta('lbl.toTopHoverColour'));
  /** The same, as the short word under its swatch. */
  const effectCaption = $derived(
    hoverColoured && pressColoured ? ta('toTopColour.effect')
      : !hoverColoured ? ta('toTopColour.touch')
        : set.hover === 'underline' ? ta('toTopColour.underline')
          : set.hover === 'pill' ? ta('toTopColour.pill')
            : set.hover === 'lift' ? ta('toTopColour.glow')
              : ta('toTopColour.hover'));

  /** The colours of the parts the design shows, each the design's own while none is set: the background and the ring (none under a picture that fills the whole button), the arrow or the own mark (a picture and emoji keep their own), the words, and the words alone's line and effect. */
  const colourItems = $derived([
    set.design !== 'words' && !toTopFillsWhole(set) && { key: 'bg', caption: ta('lbl.toTopBg'), name: ta('lbl.toTopBg') },
    set.design === 'ring' && !toTopFillsWhole(set) && { key: 'ring', caption: ta('toTopColour.ring'), name: ta('lbl.toTopRingColour') },
    markColoured && (markOwn ? { key: 'arrow', caption: ta('lbl.toTopIcon'), name: ta('lbl.toTopIconColour') } : { key: 'arrow', caption: ta('toTopColour.arrow'), name: ta('lbl.toTopArrow') }),
    worded && { key: 'words', caption: ta('lbl.toTopWords'), name: ta('lbl.toTopWordsColour') },
    wordsAlone && set.line !== 'none' && { key: 'line', caption: ta('toTopColour.line'), name: ta('lbl.toTopLineColour') },
    wordsAlone && effectColoured && { key: 'effect', caption: effectCaption, name: effectLabel },
  ].filter(Boolean).map((item) => ({ ...item, value: set.colors[item.key] ?? '', onchange: (v) => writeColour(item.key, v) })));

  /** A shaped design's shape (shape-model.js): the owner's own, or the design's own as the shape window starts from it; its name is the shipped shape's, «Custom» for values of the owner's own, or the drawing's. */
  const shapeNow = $derived(toTopShapeOf(set));
  const shapeName = $derived.by(() => {
    if (shapeNow.points) return ta('shapeWin.drawnName');
    const id = shapeId(shapeNow);
    return id ? ta(`outlineShape.${id}`) : ta('shapeWin.custom');
  });
  /** The outline as the button draws it, as a small picture for the row. */
  const shapePicture = $derived(`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-28 -6 156 112"><path d="${toTopOutline(set).d}" fill="#2ba58d"/></svg>`)}`);
  let shapeOpen = $state(false);
  /** Writes the shape as the window hands it over: only what differs from the circle, with the waves and amount the shape replaces taken away. A circle is stored only where the design would draw something else without it. */
  function writeShape(next, name) {
    ed.siteMutate(name, () => {
      const layout = (ed.siteDraft.layout ??= {});
      const top = { ...(layout.toTop ?? {}) };
      const stored = shapeStored(next);
      delete top.waves;
      delete top.count;
      if (Object.keys(stored).length || top.design === 'square') top.shape = stored;
      else delete top.shape;
      if (Object.keys(top).length) layout.toTop = top;
      else delete layout.toTop;
    });
  }

  /** The mark's size, named by what stands: the arrow or the own mark. */
  const sizeLabel = $derived(markOwn ? ta('lbl.toTopIconSize') : ta('lbl.toTopArrowSize'));
  /** A picture on a shaped design stands inside the button's edge or fills the whole button; filling it, it has no size of its own. */
  const fillShown = $derived(shaped && Boolean(set.image));
  const sizeShown = $derived(!whole);
</script>

<Setting key="show">
  <SwitchRow label={ta('lbl.toTopShow')} checked={set.show} onchange={(on) => write('show', on, true)} />
</Setting>
{#if set.show}
  <SubHeading text={ta('group.toTopLook')} />
  <!-- The design first, chosen as Urd settings «Choosing a design» asks, in the shared design picker or by its pictures in place; what belongs to it stands directly under it -->
  <Setting key="design">
    <LookChoice label={ta('lbl.design')} value={ta(`toTopDesign.${set.design}`)} picture={`/admin/designs/totop-${set.design}.webp`} current={set.design}
      designs={() => pictureList(toTopDesignSource({}))}
      onpick={(id) => ed.setToTopDesign(id)}
      onopen={() => (ed.designPicker = { kind: 'totop' })} />
  </Setting>
  {#if worded}
    <!-- The words of the worded designs, the site language's own while empty -->
    <Setting key="text">
      <label class="field-stack" title={ta('tip.toTopWords')}>{ta('lbl.toTopWords')}
        <input type="text" maxlength={TOTOP_TEXT_MAX} value={ed.siteDraft.layout?.toTop?.text ?? ''} placeholder={ta('ph.toTopWords')}
          oninput={(e) => write('text', e.currentTarget.value, '', 'edit:site-totop-text')} />
      </label>
    </Setting>
  {/if}
  {#if wordsAlone}
    <!-- The words alone answer the mouse and a touch as the menu's links do, and stand over a line of the owner's choosing -->
    <Setting key="hover">
      <SelectRow inline label={ta('lbl.toTopHover')} value={set.hover}
        options={TOTOP_HOVERS.map((id) => [id, ta(`opt.hover.${id}`)])}
        onchange={(v) => write('hover', v, 'standard')} />
    </Setting>
    <!-- A touch on a phone, where phones show the button -->
    {#if set.phone}
      <Setting key="press">
        <SelectRow inline label={ta('lbl.navPress')} title={ta('tip.toTopPress')} value={set.press ?? ''}
          options={[['', ta('opt.navPress.none')], ...TOTOP_PRESSES.map((id) => [id, ta(`opt.navPress.${id}`)])]}
          onchange={(v) => write('press', v, '')} />
      </Setting>
    {/if}
    <Setting key="line">
      <SelectRow inline label={ta('lbl.toTopLine')} value={set.line}
        options={TOTOP_LINES.map((id) => [id, ta(`opt.toTopLine.${id}`)])}
        onchange={(v) => write('line', v, 'solid')} />
    </Setting>
    {#if set.line !== 'none'}
      <Setting key="lineWidth">
        <SliderRow label={ta('lbl.toTopLineWidth')} value={set.lineWidth} min={TOTOP_LINE_WIDTH.min} max={TOTOP_LINE_WIDTH.max} step={TOTOP_LINE_WIDTH.step}
          shown={`${set.lineWidth} px`} oninput={(v) => write('lineWidth', v, TOTOP_LINE_WIDTH.standard, 'edit:site-totop-line')} />
      </Setting>
    {/if}
  {/if}
  {#if shaped}
    <!-- The shape: its picture and its name, opening the shape window (lib/ShapeWindow.svelte), where a shipped shape is picked, shaped with Custom's sliders or drawn by hand -->
    <Setting key="shape">
      <PictureRow label={ta('lbl.shape')} value={shapeName} picture={shapePicture} onclick={() => (shapeOpen = true)} />
    </Setting>
  {/if}
  <!-- The mark in place of the arrow and its size in one row: a character, a drawn icon from Urd's set, or a picture uploaded and edited (GlyphPicker opens the image editor on it), the bin on its corner taking it back to the arrow; the row's reset takes the size back -->
  <Setting key={sizeShown ? 'iconSize' : null}>
    <div class="ctl-row totop-mark">
      <span class="row-label" title={ta('tip.toTopIcon')}>{ta('lbl.toTopIcon')}</span>
      <span class="totop-mark-line">
        <GlyphPicker value={set.glyph} blank={ICONS.up} icon={set.icon} image={set.image}
          onpick={(glyph) => writeMark({ glyph })}
          onicon={(id) => writeMark({ icon: id })}
          onimage={(dataUrl) => writeMark({ image: dataUrl })}
          onremove={ownMark ? () => writeMark({}) : undefined} removeLabel={ta('ui.toTopArrowBack')} />
        {#if sizeShown}
          <span class="totop-mark-size" title={sizeLabel}>
            <SliderRow compact label={sizeLabel} value={set.iconSize} min={TOTOP_ICON_SIZE.min} max={TOTOP_ICON_SIZE.max} step={TOTOP_ICON_SIZE.step}
              shown={`${set.iconSize} %`} oninput={(v) => write('iconSize', v, TOTOP_ICON_SIZE.standard, 'edit:site-totop-icon-size')} />
          </span>
        {/if}
      </span>
    </div>
  </Setting>
  {#if fillShown}
    <!-- A picture of the owner's own on a shaped design: inside the button's edge, or over the whole button -->
    <Setting key="fill">
      <Choice label={ta('lbl.toTopFill')} value={set.fill}
        options={TOTOP_FILLS.map((id) => [id, ta(`opt.toTopFill.${id}`), ta(`tip.toTopFill.${id}`)])}
        onchange={(v) => write('fill', v, TOTOP_FILLS[0])} />
    </Setting>
  {/if}
  {#if whole}
    <!-- Over a picture that fills the whole button: nothing, or a mark, the arrow until a drawn icon or a character takes its place, with its size -->
    <Setting key="over">
      <Choice label={ta('lbl.toTopOver')} value={over ? 'mark' : 'none'}
        options={[['none', ta('opt.toTopOver.none')], ['mark', ta('opt.toTopOver.mark')]]}
        onchange={(v) => write('over', v === 'mark' ? {} : null, null)} />
    </Setting>
    {#if over}
      <Setting key="iconSize">
        <div class="ctl-row totop-mark">
          <span class="row-label">{ta('lbl.toTopIcon')}</span>
          <span class="totop-mark-line">
            <GlyphPicker value={over.glyph} blank={ICONS.up} icon={over.icon}
              onpick={(glyph) => write('over', { glyph }, null)}
              onicon={(id) => write('over', { icon: id }, null)}
              onremove={markOwn ? () => write('over', {}, null) : undefined} removeLabel={ta('ui.toTopArrowBack')} />
            <span class="totop-mark-size" title={sizeLabel}>
              <SliderRow compact label={sizeLabel} value={set.iconSize} min={TOTOP_ICON_SIZE.min} max={TOTOP_ICON_SIZE.max} step={TOTOP_ICON_SIZE.step}
                shown={`${set.iconSize} %`} oninput={(v) => write('iconSize', v, TOTOP_ICON_SIZE.standard, 'edit:site-totop-icon-size')} />
            </span>
          </span>
        </div>
      </Setting>
    {/if}
  {/if}
  <!-- The colours of the parts the design shows, side by side, each taken away by the bin on its own swatch; a picture filling a shaped button leaves none -->
  {#if colourItems.length}
    <Setting key="colors">
      <ColoursRow label={ta('lbl.colors')} items={colourItems} tokens={ed.themeSwatches()} />
    </Setting>
  {/if}

  <!-- The size's and the placement's segments carry their names above them in capitals, as the fold's subheadings stand, with the reset at the end of that line -->
  <Setting key="size">
    <Choice stack label={ta('group.toTopSize')} value={set.size} options={sizeOptions()}
      onchange={(v) => write('size', v, 'm')} />
  </Setting>
  {#if set.phone}
    <Setting key="phoneSize">
      <SelectRow inline label={ta('lbl.toTopPhoneSize')} value={set.phoneSize ?? ''}
        options={[['', ta('opt.toTopPhoneSize.same')], ...sizeOptions()]}
        onchange={(v) => write('phoneSize', v, '')} />
    </Setting>
  {/if}

  <Setting key="place">
    <Choice stack label={ta('lbl.toTopPlace')} title={ta('tip.toTopPlace')} value={set.place}
      options={[['corner', ta('opt.toTopPlace.corner')], ['content', ta('opt.toTopPlace.content')]]}
      onchange={(v) => write('place', v, 'corner')} />
  </Setting>
  <Setting key="side">
    <Choice label={ta('lbl.toTopSide')} value={set.side}
      options={[['left', ta('common.left')], ['right', ta('common.right')]]}
      onchange={(v) => write('side', v, 'right')} />
  </Setting>

  <SubHeading text={ta('group.toTopShowing')} />
  <Setting key="after">
    <SelectRow inline label={ta('lbl.toTopAfter')} value={set.after}
      options={TOTOP_AFTER.map((id) => [id, ta(`opt.toTopAfter.${id}`)])}
      onchange={(v) => write('after', v, 'little')} />
  </Setting>
  <Setting key="phone">
    <Choice label={ta('lbl.toTopPhone')} value={set.phone ? 'show' : 'hide'}
      options={[['show', ta('opt.showHide.show')], ['hide', ta('opt.showHide.hide')]]}
      onchange={(v) => write('phone', v === 'show', true)} />
  </Setting>
{/if}
{#if shapeOpen}
  <ShapeWindow shape={shapeNow} sizes={Object.values(TOTOP_SIZES)} step="site-totop-shape" onchange={writeShape} onclose={() => (shapeOpen = false)} />
{/if}

<style>
  /* The mark's row: the picker and the size's slider share the line after the label */
  .totop-mark-line {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
    margin-left: 0.6rem;
  }

  .totop-mark-size {
    flex: 1;
    min-width: 0;
  }
</style>
