<script>
  /* The ribbon block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import SliderRow from '../../lib/rows/SliderRow.svelte';
  import ColourRow from '../../lib/rows/ColourRow.svelte';
  import ListEditor from '../../lib/rows/ListEditor.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import { ribbonMotions, ribbonReaches, ribbonReach, ribbonSepOptions, ribbonMainOptions, ribbonStripeOptions, RIBBON_SEP_ICONS, ribbonInk } from '../options.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  import { pinnedNow } from '../pinned.js';
  import RibbonMotion from './RibbonMotion.svelte';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  /** A fold counts the settings it holds now: one whose every setting stands in Pinned is left out, and one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  let { area } = $props();

  /* The ribbon block: the words are edited both here and directly in the band,
   * which stands still while the editing chrome is on. */

  function setRibbonItem(i, value) {
    mutateBlock(`edit:${selectedBlock.blockId}:ribbon${i}`, (b) => { b.props.items[i] = value; });
  }

  function addRibbonItem() {
    mutateBlock('ribbon-item', (b) => { b.props.items ??= []; b.props.items.push(ta('seed.ribbonBlock.new')); });
  }

  function removeRibbonItem(i) {
    mutateBlock('ribbon-item', (b) => { b.props.items.splice(i, 1); });
  }

  /** Moves a word from one place to another, as the list editor's drag and keys do. */
  function moveRibbonItem(from, to) {
    mutateBlock('ribbon-item', (b) => { b.props.items.splice(to, 0, ...b.props.items.splice(from, 1)); });
  }
</script>

{#if area === 'content'}
  {#snippet ribbonWords()}
    <!-- The words are typed in the band as well; the list owns their order and count -->
    <ListEditor items={selectedBlock.props.items ?? []} label={ta('lbl.ribbonItems')} key={(item, i) => i}
      onmove={moveRibbonItem} onremove={removeRibbonItem} onadd={addRibbonItem} addLabel={ta('ui.addRibbonItem')}>
      {#snippet row(item, i)}
        <input value={item} title={ta('tip.ribbon.item')} aria-label={ta('tip.ribbon.item')}
          onchange={(e) => setRibbonItem(i, e.target.value)} />
      {/snippet}
    </ListEditor>
  {/snippet}
  <Fold id="ribbon-words" defaultOpen title={ta('lbl.ribbonItems')} value={ta('menu.wordCount', { n: selectedBlock.props.items?.length ?? 0 })}>{@render ribbonWords()}</Fold>
{:else if area === 'style'}
  {@const motion = selectedBlock.props.motion ?? 'roll'}
  {@const plain = (selectedBlock.props.variant ?? 'band') === 'plain'}
  {@const stripesOn = [selectedBlock.props.above ?? 'none', selectedBlock.props.below ?? 'none'].filter((v) => v !== 'none').length}
  {#snippet ribbonMotion()}
    <Setting key="motion" pin="ribbonMotion">
      <SelectRow label={ta('group.motion')} title={ta('tip.ribbon.motion')} value={motion} options={ribbonMotions()} onchange={(v) => setBlockProp('motion', v)} />
    </Setting>
    <RibbonMotion />
  {/snippet}
  {#snippet ribbonStripes()}
    <Setting key="above">
      <SelectRow label={ta('lbl.ribbonAbove')} title={ta('tip.ribbon.above')} value={selectedBlock.props.above ?? 'none'} options={ribbonStripeOptions()} onchange={(v) => setBlockProp('above', v)} />
    </Setting>
    {#if (selectedBlock.props.above ?? 'none') !== 'none'}
      <Setting key="aboveColor" source="theme">
        <ColourRow label={ta('lbl.colour')} title={ta('tip.ribbon.stripeColor')} value={selectedBlock.props.aboveColor ?? ribbonInk(selectedBlock.props)} tokens={themeSwatches()}
          onchange={(hex) => setBlockProp('aboveColor', hex)} />
      </Setting>
    {/if}
    <Setting key="main">
      <SelectRow label={ta('lbl.ribbonMain')} title={ta('tip.ribbon.main')} value={selectedBlock.props.main ?? 'text'} options={ribbonMainOptions()} onchange={(v) => setBlockProp('main', v)} />
    </Setting>
    <Setting key="below">
      <SelectRow label={ta('lbl.ribbonBelow')} title={ta('tip.ribbon.below')} value={selectedBlock.props.below ?? 'none'} options={ribbonStripeOptions()} onchange={(v) => setBlockProp('below', v)} />
    </Setting>
    {#if (selectedBlock.props.below ?? 'none') !== 'none'}
      <Setting key="belowColor" source="theme">
        <ColourRow label={ta('lbl.colour')} title={ta('tip.ribbon.stripeColor')} value={selectedBlock.props.belowColor ?? ribbonInk(selectedBlock.props)} tokens={themeSwatches()}
          onchange={(hex) => setBlockProp('belowColor', hex)} />
      </Setting>
    {/if}
    {#if stripesOn}
      <Setting key="stripePlace">
        <Choice stack label={ta('lbl.ribbonStripePlace')} title={ta('tip.ribbon.stripePlace')} value={selectedBlock.props.stripePlace ?? 'stack'}
          options={[['stack', ta('opt.ribbonPlace.stack')], ['edge', ta('opt.ribbonPlace.edge')]]}
          onchange={(v) => setBlockProp('stripePlace', v)} />
      </Setting>
      <Setting key="thickness">
        <SliderRow label={ta('lbl.ribbonThickness')} title={ta('tip.ribbon.thickness')} value={selectedBlock.props.thickness ?? 8} min={2} max={40} step={1}
          shown={`${selectedBlock.props.thickness ?? 8} px`} oninput={(v) => setBlockProp('thickness', v)} />
      </Setting>
    {/if}
  {/snippet}
  {#snippet ribbonShape()}
    <Setting key="width">
      <Choice stack label={ta('lbl.ribbonWidth')} value={ribbonReach(selectedBlock.props.width)} options={ribbonReaches()} onchange={(v) => setBlockProp('width', v)} />
    </Setting>
    <Setting key="tilt">
      <SliderRow label={ta('lbl.ribbonTilt')} title={ta('tip.ribbon.tilt')} value={selectedBlock.props.tilt ?? 0} min={-10} max={10} step={1}
        shown={`${selectedBlock.props.tilt ?? 0}°`} oninput={(v) => setBlockProp('tilt', v)} />
    </Setting>
    <!-- The band's colour; the plain design has no band -->
    {#if !plain}
      <Setting key="bg" source="theme">
        <ColourRow label={ta('lbl.background')} title={ta('tip.ribbon.bg')} value={selectedBlock.props.bg ?? 'accent'} tokens={themeSwatches()} onchange={(hex) => setBlockProp('bg', hex)} />
      </Setting>
    {/if}
  {/snippet}
  {#snippet ribbonText()}
    <Setting key="size">
      <SelectRow label={ta('lbl.size')} title={ta('tip.ribbon.size')} value={selectedBlock.props.size ?? 'md'}
        options={[['sm', ta('opt.size.sm')], ['md', ta('opt.size.md')], ['lg', ta('opt.size.lg')], ['xl', ta('opt.size.xl')]]}
        onchange={(v) => setBlockProp('size', v)} />
    </Setting>
    <Setting key="color" source="theme">
      <ColourRow label={ta('lbl.textColor')} title={ta('tip.ribbon.color')} value={selectedBlock.props.color ?? (plain ? 'text' : 'accent-text')} tokens={themeSwatches()}
        onchange={(hex) => setBlockProp('color', hex)} />
    </Setting>
    <Setting key="caps">
      <SwitchRow label={ta('lbl.ribbonCaps')} title={ta('tip.ribbon.caps')} checked={selectedBlock.props.caps === true} onchange={(on) => setBlockProp('caps', on)} />
    </Setting>
    <Setting key="weight">
      <SwitchRow label={ta('lbl.ribbonBold')} title={ta('tip.ribbon.bold')} checked={selectedBlock.props.weight === 'bold'} onchange={(on) => setBlockProp('weight', on ? 'bold' : 'normal')} />
    </Setting>
    <Setting key="outline">
      <SwitchRow label={ta('lbl.ribbonOutline')} title={ta('tip.ribbon.outline')} checked={selectedBlock.props.outline === true} onchange={(on) => setBlockProp('outline', on)} />
    </Setting>
    <Setting key="gap">
      <SliderRow label={ta('lbl.ribbonGap')} title={ta('tip.ribbon.gap')} value={selectedBlock.props.gap ?? 40} min={8} max={120} step={2}
        shown={`${selectedBlock.props.gap ?? 40} px`} oninput={(v) => setBlockProp('gap', v)} />
    </Setting>
    <!-- What stands between the words: a drawn mark, nothing, or the owner's own text -->
    <Setting key="sep">
      <div class="ctl-field">
        <span class="mini-label">{ta('lbl.ribbonSep')}</span>
        <div class="tile-grid cols-6" role="group" aria-label={ta('lbl.ribbonSep')}>
          {#each ribbonSepOptions() as [v, text] (v)}
            <button type="button" class="tile" class:on={(selectedBlock.props.sep ?? 'dot') === v}
              aria-pressed={(selectedBlock.props.sep ?? 'dot') === v} title={text}
              onclick={() => setBlockProp('sep', v)}>{@html RIBBON_SEP_ICONS[v]}</button>
          {/each}
        </div>
      </div>
    </Setting>
    {#if selectedBlock.props.sep === 'custom'}
      <Setting key="sepText">
        <label class="field-stack" title={ta('tip.ribbon.sepText')}>
          <span class="mini-label">{ta('lbl.ribbonSepText')}</span>
          <input class="field-filled" value={selectedBlock.props.sepText ?? ''}
            onchange={(e) => setBlockProp('sepText', e.target.value)} />
        </label>
      </Setting>
    {/if}
  {/snippet}
  <!-- The motion's own settings go with it into Pinned; a band that stands still has the choice alone -->
  <Fold id="ribbon-motion" title={ta('lbl.ribbonMotion')} value={ribbonMotions().find(([v]) => v === motion)?.[1] ?? ''}
    rows={pinned.has('ribbonMotion') ? 0 : motion === 'none' ? 1 : undefined}
    group={groupOf('ribbon-motion', { motion: 'roll', direction: 'left', speed: 60, dwell: 2.5, pauseOnHover: true, pause: 'button', fade: true })}>{@render ribbonMotion()}</Fold>
  <Fold id="ribbon-stripes" title={ta('lbl.ribbonStripes')} value={stripesOn ? ta('menu.onCount', { n: stripesOn }) : ta('common.off')} group={groupOf('ribbon-stripes', { above: 'none', below: 'none', main: 'text', aboveColor: undefined, belowColor: undefined, stripePlace: 'stack', thickness: 8 })}>{@render ribbonStripes()}</Fold>
  <Fold id="ribbon-shape" title={ta('lbl.ribbonShape')} value={ribbonReaches().find(([v]) => v === ribbonReach(selectedBlock.props.width))?.[1] ?? ''} group={groupOf('ribbon-shape', { width: 'canvas', tilt: 0, bg: undefined })}>{@render ribbonShape()}</Fold>
  <Fold id="ribbon-text" title={ta('lbl.ribbonText')} value={{ sm: ta('opt.size.sm'), md: ta('opt.size.md'), lg: ta('opt.size.lg'), xl: ta('opt.size.xl') }[selectedBlock.props.size ?? 'md']} group={groupOf('ribbon-text', { size: 'md', color: undefined, caps: false, weight: 'normal', outline: false, gap: 40, sep: 'dot', sepText: undefined })}>{@render ribbonText()}</Fold>
{/if}
