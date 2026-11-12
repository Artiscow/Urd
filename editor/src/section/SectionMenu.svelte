<script>
  /* A section's settings in the element menu's form (0.7.30.6): Style (its theme, its background, its edges and its motion) and Placement (its size and grid, its name for links and its actions).
     The floating menu draws them beside the section, from the gear on its bar or «Settings» in its right-click menu, and the Settings panel draws the same.
     Wide, the two areas stand side by side; narrow, under each other with a heading each. With words in the search field, a copy of the areas narrowed to what matches (menu-search.js). */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { DIVIDER_SHAPES, DIVIDER_HEIGHT } from '$engine/divider-model.js';
  import { SECTION_THEME_LABELS, sectionThemeVars } from '$engine/theme.js';
  import { sectionWords } from '$engine/anchor-model.js';
  import { matchWords } from '$engine/palette-search.js';
  import { matchAny } from '$engine/search-langs.js';
  import BackgroundEditor from './BackgroundEditor.svelte';
  import AnchorField from '../lib/AnchorField.svelte';
  import Choice from '../lib/Choice.svelte';
  import Fold from '../lib/rows/Fold.svelte';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import SelectRow from '../lib/rows/SelectRow.svelte';
  import ColourRow from '../lib/rows/ColourRow.svelte';
  import NumberRow from '../lib/rows/NumberRow.svelte';
  import ActionRow from '../lib/rows/ActionRow.svelte';
  import MenuArea from '../menu/MenuArea.svelte';
  import { onlyGroup } from '../lib/only-group.js';
  import { ICONS } from '../lib/icons.js';
  import { menuSearch } from '../lib/menu-search.js';
  import { searchLangs } from '../lib/search-langs.svelte.js';
  import { SECTION_WIDTH_MIN, SECTION_WIDTH_MAX, SECTION_WIDTH_STEP, sectionWidthOf, sectionWidthValue } from '../lib/content-width.js';
  const ed = getContext('urd-editor');
  /** `only` draws one group alone, for a tool of the bar (lib/only-group.js). */
  let { wide = false, query = '', only = null } = $props();
  // A typed query loads the other languages once; the search runs again when they are in.
  $effect(() => searchLangs.need(query));

  const activeSectionId = $derived(ed.activeSectionId);
  const sectionAnim = $derived(ed.sectionAnim);
  const sectionBg = $derived(ed.sectionBg);
  const sectionDivider = $derived(ed.sectionDivider);
  const sectionGrid = $derived(ed.sectionGrid);
  const sectionHover = $derived(ed.sectionHover);
  const sectionBlocksHover = $derived(ed.sectionBlocksHover);
  const sectionMinHeight = $derived(ed.sectionMinHeight);
  const sectionTheme = $derived(ed.sectionTheme);
  /** The section's content width as a choice and a px width (lib/content-width.js). */
  const sectionWidth = $derived(sectionWidthOf(ed.sectionMaxWidth, ed.layoutWidth));
  const sectionWidthWord = $derived(sectionWidth.mode === 'full' ? ta('opt.sectionWidth.full') : sectionWidth.shown);
  /** On a full-width site «Full width» is the site's own width, so it is offered only to a section that has it stored. */
  const sectionWidthOptions = $derived([
    ['site', ta('opt.sectionWidth.site')],
    ...(ed.layoutWidth === 'full' && sectionWidth.mode !== 'full' ? [] : [['full', ta('opt.sectionWidth.full')]]),
    ['own', ta('opt.sectionWidth.own')],
  ]);
  /** Where the section stands among the page's sections, for its moves up and down. */
  const sectionIndex = $derived(ed.sections.findIndex((s) => s.id === activeSectionId));
  const { ENTRANCE_OPTIONS, HOVER_OPTIONS, animObj, isEntrance, mutateSection, normalizeAnim, readableOn, setSectionGrid, setSectionHeight, themeHex, themeSwatches, toggleSectionGrid } = ed;

  /** Ready-made section theme (role set): presentation, no mobile invalidation. */
  function setSectionTheme(role) {
    mutateSection('section-theme', (s) => {
      if (role) s.theme = role; else delete s.theme;
    });
  }

  /** The role-set samples: the page's actual theme colours put into the role recipes, so each sample is live (ADR-0016).
   *  The recipes reference only the --urd-base-* copies, so a plain text substitution yields valid CSS colours (color-mix survives). */
  function sectionThemeSample(role) {
    // The samples follow the preview's active mode (previewPalette merges alt tokens via the engine's activeTokens, so scheme: 'dark' resolves correctly).
    const pal = ed.previewPalette;
    const subst = (v) => v
      .replaceAll('var(--urd-base-bg)', pal.bg)
      .replaceAll('var(--urd-base-surface)', pal.surface)
      .replaceAll('var(--urd-base-text)', pal.text)
      .replaceAll('var(--urd-base-accent)', pal.accent)
      .replaceAll('var(--urd-base-accent-text)', pal['accent-text'] ?? readableOn(themeHex(pal.accent ?? '#000000', pal)));
    const vars = sectionThemeVars(role);
    return {
      bg: vars['--urd-color-bg'] ? subst(vars['--urd-color-bg']) : pal.bg,
      surface: vars['--urd-color-surface'] ? subst(vars['--urd-color-surface']) : pal.surface,
      text: vars['--urd-color-text'] ? subst(vars['--urd-color-text']) : pal.text,
      accent: vars['--urd-color-accent'] ? subst(vars['--urd-color-accent']) : pal.accent,
    };
  }

  function setSectionAnimation(type) {
    mutateSection('section-anim', (s) => {
      normalizeAnim(s);
      s.animation = type ? animObj(type) : null;
    });
    ed.bridge?.sendDemoAnim(activeSectionId);
  }

  /** One field of one edge's divider. A shape of '' removes the edge, and an emptied object the field. */
  function setSectionDivider(edge, key, value) {
    mutateSection(`section-divider-${edge}-${key}`, (s) => {
      const divider = { ...(s.divider ?? {}) };
      if (key === 'shape' && !value) {
        delete divider[edge];
      } else {
        const own = { ...(divider[edge] ?? { shape: 'wave' }) };
        if (value === undefined || value === false || value === '') delete own[key];
        else own[key] = value;
        divider[edge] = own;
      }
      if (Object.keys(divider).length) s.divider = divider;
      else delete s.divider;
    });
  }

  /** What the closed Edge shapes group shows: the shapes of the edges that have one. */
  function edgesValue() {
    const shapes = ['top', 'bottom'].map((edge) => sectionDivider[edge]?.shape).filter(Boolean);
    return shapes.map((shape) => ta(`opt.divider.${shape}`)).join(' · ') || ta('common.none');
  }

  /** What the closed Motion group shows: the entrance and the effects under the pointer that the section has, its own and the one it gives every element. */
  function motionValue() {
    const label = (options, type) => options.find(([id]) => id === type)?.[1];
    const entrance = isEntrance(sectionAnim) ? label(ENTRANCE_OPTIONS, sectionAnim.type) : null;
    const hoverType = sectionHover?.type ?? (sectionAnim && !isEntrance(sectionAnim) ? sectionAnim.type : '');
    const hover = hoverType ? label(HOVER_OPTIONS, hoverType) : null;
    const blocksHover = sectionBlocksHover?.type ? label(HOVER_OPTIONS, sectionBlocksHover.type) : null;
    return [entrance, hover, blocksHover].filter(Boolean).join(' · ') || ta('common.none');
  }

  function setSectionHover(type) {
    mutateSection('section-hover', (s) => {
      normalizeAnim(s);
      s.hover = type ? animObj(type) : null;
    });
  }

  /** The pointer effect every element in the section plays, where it has none of its own. */
  function setBlocksHover(type) {
    mutateSection('section-blocks-hover', (s) => {
      s.blocksHover = type ? animObj(type) : null;
    });
  }

  function setSectionAnimProp(name, value) {
    if (!Number.isFinite(value)) return;
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props[name] = value;
    });
    ed.bridge?.sendDemoAnim(activeSectionId);
  }

  /** String prop on the section animation (stagger pattern and effect). */
  function setSectionAnimStr(name, value) {
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props[name] = value;
    });
    ed.bridge?.sendDemoAnim(activeSectionId);
  }
</script>

{#snippet sectionMotion()}
  <Fold id="sec-motion" title={ta('group.motion')} value={motionValue()}>
    <SelectRow label={ta('lbl.animIn')} title={ta('tip.props.sectionAnim')} value={isEntrance(sectionAnim) ? sectionAnim.type : ''}
      options={ENTRANCE_OPTIONS} onchange={(v) => setSectionAnimation(v || null)} />
    {#if isEntrance(sectionAnim)}
      <NumberRow label={ta('lbl.durationMs')} title={ta('tip.anim.duration')} value={sectionAnim.props.duration} min={100} max={4000} step={100}
        onchange={(v) => setSectionAnimProp('duration', v)} />
      <NumberRow label={ta('lbl.delayMs')} title={ta('tip.anim.delay')} value={sectionAnim.props.delay ?? 0} min={0} max={4000} step={100}
        onchange={(v) => setSectionAnimProp('delay', v)} />
      {#if sectionAnim.type === 'stagger'}
        <SelectRow label={ta('lbl.staggerEffect')} title={ta('tip.props.staggerEffect')} value={sectionAnim.props.effect ?? 'slide-up'}
          options={[['fade-in', ta('anim.fadeIn')], ['slide-up', ta('anim.slideUp')], ['zoom-in', ta('anim.zoomIn')]]}
          onchange={(v) => setSectionAnimStr('effect', v)} />
        <NumberRow label={ta('lbl.stepMs')} title={ta('tip.props.staggerStep')} value={sectionAnim.props.step ?? 90} min={0} max={1000} step={10}
          onchange={(v) => setSectionAnimProp('step', v)} />
        <SelectRow label={ta('lbl.pattern')} title={ta('tip.props.staggerPattern')} value={sectionAnim.props.pattern ?? 'sequence'}
          options={[['sequence', ta('opt.stagger.sequence')], ['columns', ta('opt.stagger.columns')], ['rows', ta('opt.stagger.rows')], ['center', ta('opt.stagger.center')]]}
          onchange={(v) => setSectionAnimStr('pattern', v)} />
      {/if}
    {/if}
    <!-- Two effects under the pointer: every element in the section, each as the pointer is over it, and the section itself with its background -->
    <SelectRow label={ta('lbl.blocksOnHover')} title={ta('tip.props.blocksHover')} value={sectionBlocksHover?.type ?? ''}
      options={HOVER_OPTIONS} onchange={(v) => setBlocksHover(v || null)} />
    <SelectRow label={ta('lbl.sectionOnHover')} title={ta('tip.props.sectionHover')} value={sectionHover?.type ?? (sectionAnim && !isEntrance(sectionAnim) ? sectionAnim.type : '')}
      options={HOVER_OPTIONS} onchange={(v) => setSectionHover(v || null)} />
  </Fold>
{/snippet}

{#snippet sectionStyle()}
  <Fold id="sec-theme" title={ta('lbl.sectionTheme')} value={ta(SECTION_THEME_LABELS[sectionTheme] ?? 'common.standard')}>
    <div class="rs-grid">
      {#each [['', 'common.standard'], ...Object.entries(SECTION_THEME_LABELS)] as [id, key] (id)}
        {@const c = sectionThemeSample(id)}
        <button class="rs-card" class:on={sectionTheme === id}
          title={ta('tip.props.sectionTheme')} onclick={() => setSectionTheme(id)}>
          <span class="rs-sample" style="background: {c.bg}">
            <i class="rs-line" style="background: {c.text}"></i>
            <i class="rs-chip" style="background: {c.surface}"></i>
            <i class="rs-dot" style="background: {c.accent}"></i>
          </span>
          <span class="rs-name">{ta(key)}</span>
        </button>
      {/each}
    </div>
  </Fold>
  <Fold id="sec-bg" title={ta('lbl.background')} value={sectionBg.map((layer) => ta(`bgLayer.${layer.type}`)).join(' · ') || ta('common.none')}>
    <BackgroundEditor bg={ed.sectionBgCtx} layers={sectionBg} />
  </Fold>
  <Fold id="sec-edges" title={ta('lbl.sectionDividers')} value={edgesValue()}>
    {#each [['top', 'lbl.dividerTop'], ['bottom', 'lbl.dividerBottom']] as [edge, key] (edge)}
      {@const own = sectionDivider[edge]}
      <SelectRow label={ta(key)} title={ta('tip.props.dividers')} value={own?.shape ?? ''}
        options={[['', ta('common.none')], ...DIVIDER_SHAPES.map((id) => [id, ta(`opt.divider.${id}`)])]}
        onchange={(v) => setSectionDivider(edge, 'shape', v)} />
      <!-- The edge's own settings, only while it has a shape -->
      {#if own?.shape}
        <SliderRow label={ta('lbl.height')} value={own.height ?? DIVIDER_HEIGHT.dflt} min={DIVIDER_HEIGHT.min} max={DIVIDER_HEIGHT.max} step={4}
          shown={`${own.height ?? DIVIDER_HEIGHT.dflt} px`} oninput={(v) => setSectionDivider(edge, 'height', v)} />
        <ColourRow label={ta('lbl.color')} title={ta('tip.divider.color')} value={own.color ?? 'bg'} tokens={themeSwatches()}
          onchange={(hex) => setSectionDivider(edge, 'color', hex)} />
        <SwitchRow label={ta('lbl.dividerFlip')} title={ta('tip.divider.flip')} checked={own.flip === true} onchange={(on) => setSectionDivider(edge, 'flip', on)} />
        <SwitchRow label={ta('lbl.patternInvert')} title={ta('tip.divider.invert')} checked={own.invert === true} onchange={(on) => setSectionDivider(edge, 'invert', on)} />
      {/if}
    {/each}
  </Fold>
  {@render sectionMotion()}
{/snippet}

{#snippet sectionPlacement()}
  <Fold id="sec-size" title={ta('group.sectionSize')} value={[sectionWidthWord, sectionMinHeight || ta('common.auto'), sectionGrid ? `${ta('group.grid')} ${sectionGrid.size} px` : ''].filter(Boolean).join(' · ')}>
    <!-- The content width binds on the desktop only: on a phone the content fills the screen whatever is set -->
    {#if ed.viewMode === 'desktop'}
      <Choice label={ta('lbl.contentWidth')} title={ta('tip.props.sectionWidth')} value={sectionWidth.mode}
        options={sectionWidthOptions}
        onchange={(mode) => { if (mode !== sectionWidth.mode) ed.setSectionWidth(sectionWidthValue(mode, sectionWidth.px)); }} />
      {#if sectionWidth.mode === 'own'}
        <SliderRow label={ta('lbl.widthFree')} title={ta('tip.props.sectionWidthPx')} value={sectionWidth.px} min={SECTION_WIDTH_MIN} max={SECTION_WIDTH_MAX} step={SECTION_WIDTH_STEP}
          shown={sectionWidth.shown} oninput={(v) => ed.setSectionWidth(sectionWidthValue('own', v))} />
      {/if}
    {/if}
    <label title={ta('hint.props.minHeight')}>{ta('lbl.minHeight')}
      <input class="token-input" value={sectionMinHeight} placeholder={ta('ph.minHeight')}
        onchange={(e) => setSectionHeight(e.target.value)} /></label>
    <SwitchRow label={ta('lbl.sectionGrid')} title={ta('tip.sectionGrid')} checked={sectionGrid !== null} onchange={(on) => toggleSectionGrid(on)} />
    {#if sectionGrid}
      <SliderRow label={ta('lbl.gridSize')} title={ta('tip.gridSize')} value={sectionGrid.size} min={4} max={96} step={2}
        shown={`${sectionGrid.size} px`} oninput={(v) => setSectionGrid('size', v)} />
    {/if}
  </Fold>
  <!-- The section's name for links, typed or suggested from its first heading: one setting, so it stands alone -->
  <Fold id="sec-link" rows={1} title={ta('group.linkTarget')} value={ed.sectionAnchor ? `#${ed.sectionAnchor}` : ''}>
    {#key activeSectionId}
      <AnchorField value={ed.sectionAnchor} own={activeSectionId} taken={() => ed.anchorsTaken(activeSectionId)}
        words={sectionWords(ed.sections.find((s) => s.id === activeSectionId))} path={ed.pageEntry()?.path ?? '/'}
        onchange={(name) => ed.setSectionAnchor(name)} />
    {/key}
  </Fold>
  <!-- The section's actions, as on its bar and in its right-click menu -->
  <ActionRow label={ta('canvas.ctx.sectionLabel')} actions={[
    { id: 'duplicate', icon: ICONS.copy, label: ta('canvas.ctx.duplicateSection'), run: () => ed.handleDuplicateSection({ sectionId: activeSectionId }) },
    { id: 'up', icon: ICONS.up, label: ta('canvas.ctx.sectionUp'), disabled: sectionIndex <= 0, run: () => ed.handleMoveSection({ sectionId: activeSectionId, dir: -1 }) },
    { id: 'down', icon: ICONS.down, label: ta('canvas.ctx.sectionDown'), disabled: sectionIndex < 0 || sectionIndex >= ed.sections.length - 1,
      run: () => ed.handleMoveSection({ sectionId: activeSectionId, dir: 1 }) },
    { id: 'delete', icon: ICONS.bin, danger: true, label: ta('canvas.ctx.deleteSection'), arm: ta('canvas.ctx.pressAgain'), run: () => ed.handleDeleteSection({ sectionId: activeSectionId }) },
  ]} />
{/snippet}

<div class="emenu-root" class:narrow={!wide}>
  {#if only}
    <!-- A small panel from a tool on the section's bar: the areas drawn as ever, everything but the one group hidden -->
    <div class="emenu-cols emenu-stack emenu-only" {@attach onlyGroup(only)}>
      <MenuArea area="style" title={ta('props.tabStyle')}>{@render sectionStyle()}</MenuArea>
      <MenuArea area="placement" title={ta('props.tabPlacement')}>{@render sectionPlacement()}</MenuArea>
    </div>
  {:else if query.trim()}
    <!-- The search: a copy of the two areas, narrowed to what matches, each saying when nothing in it matches -->
    {#snippet foundStyle()}<section class="emenu-col" data-area="style"><p class="emenu-title">{ta('props.tabStyle')}</p>{@render sectionStyle()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>{/snippet}
    {#snippet foundPlacement()}<section class="emenu-col" data-area="placement"><p class="emenu-title">{ta('props.tabPlacement')}</p>{@render sectionPlacement()}<p class="emenu-none">{ta('menu.noMatch')}</p></section>{/snippet}
    <div class="emenu-cols emenu-search" class:emenu-two={wide} {@attach menuSearch(query, searchLangs.ready ? matchAny : matchWords)}>
      {#if wide}
        <div class="emenu-column">{@render foundStyle()}</div>
        <div class="emenu-column">{@render foundPlacement()}</div>
      {:else}
        {@render foundStyle()}{@render foundPlacement()}
      {/if}
    </div>
  {:else if wide}
    <!-- Wide: Style beside Placement -->
    <div class="emenu-cols emenu-two">
      <div class="emenu-column"><MenuArea area="style" title={ta('props.tabStyle')}>{@render sectionStyle()}</MenuArea></div>
      <div class="emenu-column"><MenuArea area="placement" title={ta('props.tabPlacement')}>{@render sectionPlacement()}</MenuArea></div>
    </div>
  {:else}
    <!-- Narrow: under each other, each heading sticking to the top of its area and counting its groups -->
    <div class="emenu-cols emenu-stack">
      <MenuArea area="style" title={ta('props.tabStyle')} counts>{@render sectionStyle()}</MenuArea>
      <MenuArea area="placement" title={ta('props.tabPlacement')} counts>{@render sectionPlacement()}</MenuArea>
    </div>
  {/if}
</div>
