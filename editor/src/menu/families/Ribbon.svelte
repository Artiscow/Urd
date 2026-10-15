<script>
  /* The ribbon block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import Choice from '../../lib/Choice.svelte';
  import ColorPicker from '../../lib/ColorPicker.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { ribbonMotions, ribbonReaches, ribbonReach, ribbonSepOptions, ribbonMainOptions, ribbonStripeOptions, RIBBON_SEP_ICONS, ribbonInk } from '../options.js';
  import { ICONS } from '../../lib/icons.js';
  import { menu } from '../state.svelte.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps, themeSwatches } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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

  function moveRibbonItem(i, dir) {
    const j = i + dir;
    mutateBlock('ribbon-item', (b) => {
      if (j < 0 || j >= b.props.items.length) return;
      [b.props.items[i], b.props.items[j]] = [b.props.items[j], b.props.items[i]];
    });
  }
</script>

{#if area === 'content'}
  {#snippet ribbonWords()}
    <!-- The words are typed in the band as well; the list owns order and count -->
    {#each selectedBlock.props.items ?? [] as item, i (i)}
      <span class="nav-line">
        <input value={item} title={ta('tip.ribbon.item')}
          onchange={(e) => setRibbonItem(i, e.target.value)} />
        <span class="row-tools">
          <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveRibbonItem(i, -1)}
            disabled={i === 0}>{@html ICONS.up}</button>
          <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveRibbonItem(i, 1)}
            disabled={i === (selectedBlock.props.items?.length ?? 0) - 1}>{@html ICONS.down}</button>
          <button class="ghost row-tool" title={ta('tip.ribbon.remove')}
            onclick={() => removeRibbonItem(i)}>{@html ICONS.cross}</button>
        </span>
      </span>
    {/each}
    <button class="ghost action" onclick={addRibbonItem}>{ta('ui.addRibbonItem')}</button>
  {/snippet}
  {#snippet ribbonSep()}
    <!-- The separator: a drawn mark, nothing, or the owner's own text -->
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
  <MenuGroup id="ribbon-words" title={ta('lbl.ribbonItems')} value={ta('menu.wordCount', { n: selectedBlock.props.items?.length ?? 0 })}>{@render ribbonWords()}</MenuGroup>
  <MenuGroup id="ribbon-sep" title={ta('lbl.ribbonSep')} value={ribbonSepOptions().find(([v]) => v === (selectedBlock.props.sep ?? 'dot'))?.[1] ?? ''} group={groupOf('ribbon-sep', { sep: 'dot', sepText: undefined })}>{@render ribbonSep()}</MenuGroup>
{:else if area === 'style'}
  {@const motion = selectedBlock.props.motion ?? 'roll'}
  {@const stripesOn = [selectedBlock.props.above ?? 'none', selectedBlock.props.below ?? 'none'].filter((v) => v !== 'none').length}
  {@const colourN = groupChanged({ bg: undefined, color: undefined })}
  {#snippet ribbonMotion()}
      <Setting key="motion">
        <div class="pin-line">
          <Dropdown filled value={motion} options={ribbonMotions()} onchange={(v) => setBlockProp('motion', v)} />
          <Pin id="ribbonMotion" />
        </div>
      </Setting>
      {#if motion !== 'none'}
        <!-- The band stands still while editing, so the words can be read and typed -->
        <button class="ghost action" title={ta('tip.ribbon.play')}
          onclick={() => ed.bridge?.sendDemoMotion()}>{ta('ui.ribbonPlay')}</button>
        <Setting key="direction">
          <Choice label={ta('lbl.ribbonDirection')} value={selectedBlock.props.direction ?? 'left'}
            options={[['left', ta('opt.ribbonDir.left')], ['right', ta('opt.ribbonDir.right')]]}
            onchange={(v) => setBlockProp('direction', v)} />
        </Setting>
        {#if motion === 'step'}
          <!-- A ticker is timed per word, not per pixel -->
          <Setting key="dwell" shown="2.5">
            <div class="ctl-row" title={ta('tip.ribbon.dwell')}>
              <span class="mini-label ctl-name">{ta('lbl.ribbonDwell')}</span>
              <input type="range" min="0.5" max="10" step="0.5" value={selectedBlock.props.dwell ?? 2.5}
                oninput={(e) => setBlockProp('dwell', e.target.valueAsNumber)} />
              <span class="gridmenu-value">{selectedBlock.props.dwell ?? 2.5} s</span>
            </div>
          </Setting>
        {:else}
          <Setting key="speed" shown="60">
            <div class="ctl-row" title={ta('tip.ribbon.speed')}>
              <span class="mini-label ctl-name">{ta('lbl.ribbonSpeed')}</span>
              <input type="range" min="10" max="300" step="5" value={selectedBlock.props.speed ?? 60}
                oninput={(e) => setBlockProp('speed', e.target.valueAsNumber)} />
              <span class="gridmenu-value">{selectedBlock.props.speed ?? 60}</span>
              <Pin id="speed" />
            </div>
          </Setting>
        {/if}
        <Setting key="pauseOnHover" shown={ta('common.on')}>
          <label class="gridmenu-snap" title={ta('tip.ribbon.pause')}>
            <input type="checkbox" checked={selectedBlock.props.pauseOnHover !== false}
              onchange={(e) => setBlockProp('pauseOnHover', e.target.checked)} />
            {ta('lbl.ribbonPause')}
          </label>
        </Setting>
        <Setting key="pause">
          <Choice label={ta('lbl.bandPause')} value={selectedBlock.props.pause ?? 'button'} title={ta('tip.ribbon.pauseMode')}
            options={[['button', ta('opt.bandPause.button')], ['touch', ta('opt.bandPause.touch')]]}
            onchange={(v) => setBlockProp('pause', v)} />
        </Setting>
        <Setting key="fade" shown={ta('common.on')}>
          <label class="gridmenu-snap" title={ta('tip.ribbon.fade')}>
            <input type="checkbox" checked={selectedBlock.props.fade !== false}
              onchange={(e) => setBlockProp('fade', e.target.checked)} />
            {ta('lbl.ribbonFade')}
          </label>
        </Setting>
      {/if}
  {/snippet}
  {#snippet ribbonStripes()}
      <Setting key="above">
        <label class="field-stack" title={ta('tip.ribbon.above')}>
          <span class="mini-label">{ta('lbl.ribbonAbove')}</span>
          <Dropdown filled value={selectedBlock.props.above ?? 'none'} options={ribbonStripeOptions()}
            onchange={(v) => setBlockProp('above', v)} />
        </label>
      </Setting>
      {#if (selectedBlock.props.above ?? 'none') !== 'none'}
        <Setting key="aboveColor" source="theme">
          <label title={ta('tip.ribbon.stripeColor')}>{ta('lbl.colour')}
            <ColorPicker value={selectedBlock.props.aboveColor ?? ribbonInk(selectedBlock.props)} tokens={themeSwatches()}
              label={ta('tip.ribbon.stripeColor')}
              onchange={(hex) => setBlockProp('aboveColor', hex)} /></label>
        </Setting>
      {/if}
      <Setting key="main">
        <label class="field-stack" title={ta('tip.ribbon.main')}>
          <span class="mini-label">{ta('lbl.ribbonMain')}</span>
          <Dropdown filled value={selectedBlock.props.main ?? 'text'} options={ribbonMainOptions()}
            onchange={(v) => setBlockProp('main', v)} />
        </label>
      </Setting>
      <Setting key="below">
        <label class="field-stack" title={ta('tip.ribbon.below')}>
          <span class="mini-label">{ta('lbl.ribbonBelow')}</span>
          <Dropdown filled value={selectedBlock.props.below ?? 'none'} options={ribbonStripeOptions()}
            onchange={(v) => setBlockProp('below', v)} />
        </label>
      </Setting>
      {#if (selectedBlock.props.below ?? 'none') !== 'none'}
        <Setting key="belowColor" source="theme">
          <label title={ta('tip.ribbon.stripeColor')}>{ta('lbl.colour')}
            <ColorPicker value={selectedBlock.props.belowColor ?? ribbonInk(selectedBlock.props)} tokens={themeSwatches()}
              label={ta('tip.ribbon.stripeColor')}
              onchange={(hex) => setBlockProp('belowColor', hex)} /></label>
        </Setting>
      {/if}
      {#if (selectedBlock.props.above ?? 'none') !== 'none' || (selectedBlock.props.below ?? 'none') !== 'none'}
        <Setting key="stripePlace">
          <Choice label={ta('lbl.ribbonStripePlace')} title={ta('tip.ribbon.stripePlace')}
            value={selectedBlock.props.stripePlace ?? 'stack'}
            options={[['stack', ta('opt.ribbonPlace.stack')], ['edge', ta('opt.ribbonPlace.edge')]]}
            onchange={(v) => setBlockProp('stripePlace', v)} />
        </Setting>
        <Setting key="thickness" shown="8">
          <div class="ctl-row" title={ta('tip.ribbon.thickness')}>
            <span class="mini-label ctl-name">{ta('lbl.ribbonThickness')}</span>
            <input type="range" min="2" max="40" step="1" value={selectedBlock.props.thickness ?? 8}
              oninput={(e) => setBlockProp('thickness', e.target.valueAsNumber)} />
            <span class="gridmenu-value">{selectedBlock.props.thickness ?? 8} px</span>
          </div>
        </Setting>
      {/if}
  {/snippet}
  {#snippet ribbonShape()}
      <Setting key="width">
        <Choice label={ta('lbl.ribbonWidth')} value={ribbonReach(selectedBlock.props.width)}
          options={ribbonReaches()}
          onchange={(v) => setBlockProp('width', v)} />
      </Setting>
      <Setting key="variant">
        <Choice label={ta('lbl.ribbonVariant')} value={selectedBlock.props.variant ?? 'band'}
          options={[['band', ta('opt.ribbonVariant.band')], ['plain', ta('opt.ribbonVariant.plain')]]}
          onchange={(v) => setBlockProp('variant', v)} />
      </Setting>
      <Setting key="tilt" shown="0">
        <div class="ctl-row" title={ta('tip.ribbon.tilt')}>
          <span class="mini-label ctl-name">{ta('lbl.ribbonTilt')}</span>
          <input type="range" min="-10" max="10" step="1" value={selectedBlock.props.tilt ?? 0}
            oninput={(e) => setBlockProp('tilt', e.target.valueAsNumber)} />
          <span class="gridmenu-value">{selectedBlock.props.tilt ?? 0}&deg;</span>
        </div>
      </Setting>
  {/snippet}
  {#snippet ribbonText()}
      <Setting key="size">
        <label class="field-stack">
          <span class="mini-label">{ta('lbl.size')}</span>
          <Dropdown filled value={selectedBlock.props.size ?? 'md'}
            options={[['sm', ta('opt.size.sm')], ['md', ta('opt.size.md')], ['lg', ta('opt.size.lg')], ['xl', ta('opt.size.xl')]]}
            onchange={(v) => setBlockProp('size', v)} />
        </label>
      </Setting>
      <Setting key="caps" shown={ta('common.off')}>
        <label class="gridmenu-snap" title={ta('tip.ribbon.caps')}>
          <input type="checkbox" checked={selectedBlock.props.caps === true}
            onchange={(e) => setBlockProp('caps', e.target.checked)} />
          {ta('lbl.ribbonCaps')}
        </label>
      </Setting>
      <Setting key="weight">
        <label class="gridmenu-snap" title={ta('tip.ribbon.bold')}>
          <input type="checkbox" checked={selectedBlock.props.weight === 'bold'}
            onchange={(e) => setBlockProp('weight', e.target.checked ? 'bold' : 'normal')} />
          {ta('lbl.ribbonBold')}
        </label>
      </Setting>
      <Setting key="outline" shown={ta('common.off')}>
        <label class="gridmenu-snap" title={ta('tip.ribbon.outline')}>
          <input type="checkbox" checked={selectedBlock.props.outline === true}
            onchange={(e) => setBlockProp('outline', e.target.checked)} />
          {ta('lbl.ribbonOutline')}
        </label>
      </Setting>
      <Setting key="gap" shown="40">
        <div class="ctl-row" title={ta('tip.ribbon.gap')}>
          <span class="mini-label ctl-name">{ta('lbl.ribbonGap')}</span>
          <input type="range" min="8" max="120" step="2" value={selectedBlock.props.gap ?? 40}
            oninput={(e) => setBlockProp('gap', e.target.valueAsNumber)} />
          <span class="gridmenu-value">{selectedBlock.props.gap ?? 40} px</span>
        </div>
      </Setting>
  {/snippet}
  {#snippet ribbonColours()}
      <Setting key="bg">
        <div class="swatch-row">
          {#if (selectedBlock.props.variant ?? 'band') !== 'plain'}
            <div class="swatch-cell" title={ta('tip.ribbon.bg')}>
              <ColorPicker value={selectedBlock.props.bg ?? 'accent'} tokens={themeSwatches()}
                label={ta('tip.ribbon.bg')} onchange={(hex) => setBlockProp('bg', hex)} />
              <span class="mini-label">{ta('lbl.background')}</span>
            </div>
          {/if}
          <div class="swatch-cell" title={ta('tip.ribbon.color')}>
            <ColorPicker value={selectedBlock.props.color ?? ((selectedBlock.props.variant ?? 'band') === 'plain' ? 'text' : 'accent-text')}
              tokens={themeSwatches()} label={ta('tip.ribbon.color')}
              onchange={(hex) => setBlockProp('color', hex)} />
            <span class="mini-label">{ta('lbl.textColor')}</span>
          </div>
        </div>
      </Setting>
  {/snippet}
  <MenuGroup id="ribbon-motion" title={ta('lbl.ribbonMotion')} value={ribbonMotions().find(([v]) => v === motion)?.[1] ?? ''} group={groupOf('ribbon-motion', { motion: 'roll', direction: 'left', speed: 60, dwell: 2.5, pauseOnHover: true, pause: 'button', fade: true })}>{@render ribbonMotion()}</MenuGroup>
  <MenuGroup id="ribbon-stripes" title={ta('lbl.ribbonStripes')} value={stripesOn ? ta('menu.onCount', { n: stripesOn }) : ta('common.off')} group={groupOf('ribbon-stripes', { above: 'none', below: 'none', main: 'text', aboveColor: undefined, belowColor: undefined, stripePlace: 'stack', thickness: 8 })}>{@render ribbonStripes()}</MenuGroup>
  <MenuGroup id="ribbon-shape" title={ta('lbl.ribbonShape')} value={ribbonReaches().find(([v]) => v === ribbonReach(selectedBlock.props.width))?.[1] ?? ''} group={groupOf('ribbon-shape', { width: 'canvas', variant: 'band', tilt: 0 })}>{@render ribbonShape()}</MenuGroup>
  <MenuGroup id="ribbon-text" title={ta('lbl.ribbonText')} value={{ sm: ta('opt.size.sm'), md: ta('opt.size.md'), lg: ta('opt.size.lg'), xl: ta('opt.size.xl') }[selectedBlock.props.size ?? 'md']} group={groupOf('ribbon-text', { size: 'md', caps: false, weight: 'normal', outline: false, gap: 40 })}>{@render ribbonText()}</MenuGroup>
  <MenuGroup id="ribbon-colours" title={ta('group.navColours')} value={colourN ? ta('menu.changed', { n: colourN }) : ta('menu.standard')} group={groupOf('ribbon-colours', { bg: undefined, color: undefined })}>{@render ribbonColours()}</MenuGroup>
{/if}
