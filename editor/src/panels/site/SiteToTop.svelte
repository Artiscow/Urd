<script>
  /* The site's «Back to top» button (0.7.13.14, the engine's totop.js), in the Site panel's fold of the same name: shown or not, its design from the shared design picker, the shape's waves on the shaped designs, the owner's words on the worded ones, its placement and side, its size on the desktop and on phones, the colours of the parts its design shows, how the words alone answer the mouse and a touch and the line under them, how far a visitor scrolls before it shows, and whether phones show it.
     Each choice is written into `site.layout.toTop` as one undo step, a value at its standard taken away, so a site that sets nothing stores nothing; a slider's run and a typing session are one step each (`edit:`). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { toTopOf, TOTOP_SHAPED, TOTOP_WORDED, TOTOP_AFTER, TOTOP_WAVES, TOTOP_COUNT, TOTOP_TEXT_MAX, TOTOP_SIZES, TOTOP_HOVERS, TOTOP_PRESSES, TOTOP_LINES, TOTOP_LINE_WIDTH } from '$engine/totop.js';
  import { pictureList, toTopDesignSource } from '../../lib/design-sources.js';
  import Setting from '../../lib/rows/Setting.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import LookChoice from '../../lib/rows/LookChoice.svelte';
  import Choice from '../../lib/Choice.svelte';

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
</script>

<Setting key="show">
  <SwitchRow label={ta('lbl.toTopShow')} checked={set.show} onchange={(on) => write('show', on, true)} />
</Setting>
{#if set.show}
  <!-- The design first, chosen as Urd settings «Choosing a design» asks, in the shared design picker or by its pictures in place -->
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
  {#if shaped}
    <!-- The shape editor: the edge turned into waves, deeper and pointier as the slider goes, and how many -->
    <Setting key="waves">
      <SliderRow label={ta('lbl.toTopWaves')} title={ta('tip.toTopWaves')} value={set.waves} min={TOTOP_WAVES.min} max={TOTOP_WAVES.max} step={TOTOP_WAVES.step}
        shown={`${set.waves}`} oninput={(v) => write('waves', v, 0, 'edit:site-totop-waves')} />
    </Setting>
    {#if set.waves > 0}
      <Setting key="count">
        <SliderRow label={ta('lbl.toTopCount')} title={ta('tip.toTopCount')} value={set.count} min={TOTOP_COUNT.min} max={TOTOP_COUNT.max} step={TOTOP_COUNT.step}
          shown={`${set.count}`} oninput={(v) => write('count', v, TOTOP_COUNT.standard, 'edit:site-totop-count')} />
      </Setting>
    {/if}
  {/if}
  {#if wordsAlone}
    <!-- The words alone answer the mouse and a touch as the menu's links do, and stand over a line of the owner's choosing -->
    <Setting key="hover">
      <SelectRow label={ta('lbl.toTopHover')} value={set.hover}
        options={TOTOP_HOVERS.map((id) => [id, ta(`opt.hover.${id}`)])}
        onchange={(v) => write('hover', v, 'standard')} />
    </Setting>
    <!-- A touch on a phone, where phones show the button -->
    {#if set.phone}
      <Setting key="press">
        <SelectRow label={ta('lbl.navPress')} title={ta('tip.toTopPress')} value={set.press ?? ''}
          options={[['', ta('opt.navPress.none')], ...TOTOP_PRESSES.map((id) => [id, ta(`opt.navPress.${id}`)])]}
          onchange={(v) => write('press', v, '')} />
      </Setting>
    {/if}
    <Setting key="line">
      <SelectRow label={ta('lbl.toTopLine')} value={set.line}
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
  <Setting key="place">
    <Choice label={ta('lbl.toTopPlace')} title={ta('tip.toTopPlace')} value={set.place}
      options={[['corner', ta('opt.toTopPlace.corner')], ['content', ta('opt.toTopPlace.content')]]}
      onchange={(v) => write('place', v, 'corner')} />
  </Setting>
  <Setting key="side">
    <Choice label={ta('lbl.toTopSide')} value={set.side}
      options={[['left', ta('common.left')], ['right', ta('common.right')]]}
      onchange={(v) => write('side', v, 'right')} />
  </Setting>
  <Setting key="size">
    <Choice label={ta('lbl.size')} value={set.size} options={sizeOptions()}
      onchange={(v) => write('size', v, 'm')} />
  </Setting>
  {#if set.phone}
    <Setting key="phoneSize">
      <SelectRow label={ta('lbl.toTopPhoneSize')} value={set.phoneSize ?? ''}
        options={[['', ta('opt.toTopPhoneSize.same')], ...sizeOptions()]}
        onchange={(v) => write('phoneSize', v, '')} />
    </Setting>
  {/if}
  <!-- The colours of the parts the design shows, each the design's own while none is set -->
  <Setting key="colors">
    {#if set.design !== 'words'}
      <ColourRow label={ta('lbl.toTopBg')} value={set.colors.bg ?? ''} tokens={ed.themeSwatches()} allowClear onchange={(v) => writeColour('bg', v)} />
    {/if}
    {#if set.design === 'ring'}
      <ColourRow label={ta('lbl.toTopRingColour')} value={set.colors.ring ?? ''} tokens={ed.themeSwatches()} allowClear onchange={(v) => writeColour('ring', v)} />
    {/if}
    <ColourRow label={ta('lbl.toTopArrow')} value={set.colors.arrow ?? ''} tokens={ed.themeSwatches()} allowClear onchange={(v) => writeColour('arrow', v)} />
    {#if worded}
      <ColourRow label={ta('lbl.toTopWordsColour')} value={set.colors.words ?? ''} tokens={ed.themeSwatches()} allowClear onchange={(v) => writeColour('words', v)} />
    {/if}
    {#if wordsAlone && set.line !== 'none'}
      <ColourRow label={ta('lbl.toTopLineColour')} value={set.colors.line ?? ''} tokens={ed.themeSwatches()} allowClear onchange={(v) => writeColour('line', v)} />
    {/if}
    {#if wordsAlone && effectColoured}
      <ColourRow label={effectLabel} value={set.colors.effect ?? ''} tokens={ed.themeSwatches()} allowClear onchange={(v) => writeColour('effect', v)} />
    {/if}
  </Setting>
  <Setting key="after">
    <SelectRow label={ta('lbl.toTopAfter')} value={set.after}
      options={TOTOP_AFTER.map((id) => [id, ta(`opt.toTopAfter.${id}`)])}
      onchange={(v) => write('after', v, 'little')} />
  </Setting>
  <Setting key="phone">
    <Choice label={ta('lbl.toTopPhone')} value={set.phone ? 'show' : 'hide'}
      options={[['show', ta('opt.showHide.show')], ['hide', ta('opt.showHide.hide')]]}
      onchange={(v) => write('phone', v === 'show', true)} />
  </Setting>
{/if}
