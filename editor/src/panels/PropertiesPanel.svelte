<script>
  /* The Properties panel: the selected block's element menu, or the section's height, grid, theme, anchor, background, dividers and animation. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import { menu } from '../menu/state.svelte.js';
  import ElementMenu from '../menu/ElementMenu.svelte';
  import SearchField from '../menu/SearchField.svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import { ta } from '$engine/i18n.js';
  import { DIVIDER_SHAPES, DIVIDER_HEIGHT } from '$engine/divider-model.js';
  import { SECTION_THEME_LABELS, sectionThemeVars } from '$engine/theme.js';
  import BackgroundEditor from '../section/BackgroundEditor.svelte';
  import AnchorField from '../lib/AnchorField.svelte';
  import { sectionWords } from '$engine/anchor-model.js';
  const ed = getContext('urd-editor');
  const activePanel = $derived(ed.activePanel);
  const activeSectionId = $derived(ed.activeSectionId);
  const bridge = $derived(ed.bridge);
  const previewPalette = $derived(ed.previewPalette);
  const sectionAnim = $derived(ed.sectionAnim);
  const sectionBg = $derived(ed.sectionBg);
  const sectionBgCtx = $derived(ed.sectionBgCtx);
  const sectionDivider = $derived(ed.sectionDivider);
  const sectionGrid = $derived(ed.sectionGrid);
  const sectionHover = $derived(ed.sectionHover);
  const sectionMinHeight = $derived(ed.sectionMinHeight);
  const sectionTheme = $derived(ed.sectionTheme);
  const selectedBlock = $derived(ed.selectedBlock);
  const { BLOCK_LABELS, ENTRANCE_OPTIONS, HOVER_OPTIONS, animObj, isEntrance, mutateSection, normalizeAnim, readableOn, setSectionGrid, setSectionHeight, themeHex, themeSwatches, toggleSectionGrid } = ed;

  /** Ready-made section theme (role set): presentation, no mobile invalidation. */
  function setSectionTheme(role) {
    mutateSection('section-theme', (s) => {
      if (role) s.theme = role; else delete s.theme;
    });
  }

  /** The role-set samples in Properties: substitute the page's ACTUAL
   *  theme colors into the role recipes, so each sample is live
   *  (ADR-0016). The recipes reference only the --urd-base-* copies, so a
   *  plain text substitution yields valid CSS colors (color-mix survives). */
  function sectionThemeSample(role) {
    // The samples follow the preview's active mode (previewPalette merges
    // alt tokens via the engine's activeTokens, so scheme: 'dark' resolves correctly).
    const pal = previewPalette;
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
    bridge?.sendDemoAnim(activeSectionId);
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

  function setSectionHover(type) {
    mutateSection('section-hover', (s) => {
      normalizeAnim(s);
      s.hover = type ? animObj(type) : null;
    });
  }

  function setSectionAnimProp(name, value) {
    if (!Number.isFinite(value)) return;
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props[name] = value;
    });
    bridge?.sendDemoAnim(activeSectionId);
  }

  /** String prop on the section animation (stagger pattern and effect). */
  function setSectionAnimStr(name, value) {
    mutateSection('edit:section-anim', (s) => {
      if (s.animation) s.animation.props[name] = value;
    });
    bridge?.sendDemoAnim(activeSectionId);
  }
</script>

<div class="panel-body">
  {#if selectedBlock}
    <p class="panel-strong">{ta('blocks.suffix', { label: BLOCK_LABELS[selectedBlock.type] ?? selectedBlock.type })}</p>
    <SearchField get={() => menu.propsQuery} set={(v) => (menu.propsQuery = v)} />
    <ElementMenu wide={false} query={menu.propsQuery} />
  {:else if activeSectionId}
    <p class="panel-strong">{ta('lbl.section')}</p>
    <label title={ta('hint.props.minHeight')}>{ta('lbl.minHeight')}
      <input class="token-input" value={sectionMinHeight} placeholder={ta('ph.minHeight')}
        onchange={(e) => setSectionHeight(e.target.value)} /></label>
    <hr class="gridmenu-divider" />
    <label class="gridmenu-snap">
      <input type="checkbox" checked={sectionGrid !== null}
        onchange={(e) => toggleSectionGrid(e.target.checked)} />
      {ta('lbl.sectionGrid')}
    </label>
    {#if sectionGrid}
      <label>
        {ta('lbl.gridSize')}
        <span class="gridmenu-value">{sectionGrid.size} px</span>
      </label>
      <input type="range" min="4" max="96" step="2" value={sectionGrid.size}
        oninput={(e) => setSectionGrid('size', Number(e.target.value))} />
    {/if}

    <hr class="gridmenu-divider" />
    <p class="panel-strong" title={ta('tip.props.sectionTheme')}>{ta('lbl.sectionTheme')}</p>
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
    <!-- The section's name for links, typed or suggested from its first heading -->
    {#key activeSectionId}
      <AnchorField value={ed.sectionAnchor} own={activeSectionId} taken={() => ed.anchorsTaken(activeSectionId)}
        words={sectionWords(ed.sections.find((s) => s.id === activeSectionId))} path={ed.pageEntry()?.path ?? '/'}
        onchange={(name) => ed.setSectionAnchor(name)} />
    {/key}

    <hr class="gridmenu-divider" />
    <p class="panel-strong">{ta('lbl.background')}</p>
    <BackgroundEditor bg={sectionBgCtx} layers={sectionBg} />

    <hr class="gridmenu-divider" />
    <p class="panel-strong" title={ta('tip.props.dividers')}>{ta('lbl.sectionDividers')}</p>
    {#each [['top', 'lbl.dividerTop'], ['bottom', 'lbl.dividerBottom']] as [edge, key] (edge)}
      {@const own = sectionDivider[edge]}
      <label title={ta('tip.props.dividers')}>{ta(key)}
        <Dropdown value={own?.shape ?? ''}
          options={[['', ta('common.none')], ...DIVIDER_SHAPES.map((id) => [id, ta(`opt.divider.${id}`)])]}
          onchange={(v) => setSectionDivider(edge, 'shape', v)} /></label>
      <!-- The edge's own settings, only while it has a shape -->
      {#if own?.shape}
        <div class="ctl-row">
          <span class="mini-label ctl-name">{ta('lbl.height')}</span>
          <input type="range" min={DIVIDER_HEIGHT.min} max={DIVIDER_HEIGHT.max} step="4" value={own.height ?? DIVIDER_HEIGHT.dflt}
            oninput={(e) => setSectionDivider(edge, 'height', e.target.valueAsNumber)} />
          <span class="gridmenu-value">{own.height ?? DIVIDER_HEIGHT.dflt} px</span>
        </div>
        <label title={ta('tip.divider.color')}>{ta('lbl.color')}
          <ColorPicker value={own.color ?? 'bg'} tokens={themeSwatches()}
            label={ta('tip.divider.color')} onchange={(hex) => setSectionDivider(edge, 'color', hex)} /></label>
        <label class="gridmenu-snap" title={ta('tip.divider.flip')}>
          <input type="checkbox" checked={own.flip === true}
            onchange={(e) => setSectionDivider(edge, 'flip', e.target.checked)} />
          {ta('lbl.dividerFlip')}
        </label>
        <label class="gridmenu-snap" title={ta('tip.divider.invert')}>
          <input type="checkbox" checked={own.invert === true}
            onchange={(e) => setSectionDivider(edge, 'invert', e.target.checked)} />
          {ta('lbl.patternInvert')}
        </label>
      {/if}
    {/each}

    <hr class="gridmenu-divider" />
    <label title={ta('tip.props.sectionAnim')}>{ta('lbl.animIn')}
      <Dropdown value={isEntrance(sectionAnim) ? sectionAnim.type : ''}
        options={ENTRANCE_OPTIONS}
        onchange={(v) => setSectionAnimation(v || null)} /></label>
    {#if isEntrance(sectionAnim)}
      <label>{ta('lbl.durationMs')}
        <input type="number" min="100" max="4000" step="100" value={sectionAnim.props.duration}
          onchange={(e) => setSectionAnimProp('duration', Number(e.target.value))} /></label>
      <label>{ta('lbl.delayMs')}
        <input type="number" min="0" max="4000" step="100" value={sectionAnim.props.delay ?? 0}
          onchange={(e) => setSectionAnimProp('delay', Number(e.target.value))} /></label>
      {#if sectionAnim.type === 'stagger'}
        <label title={ta('tip.props.staggerEffect')}>{ta('lbl.staggerEffect')}
          <Dropdown value={sectionAnim.props.effect ?? 'slide-up'}
            options={[['fade-in', ta('anim.fadeIn')], ['slide-up', ta('anim.slideUp')], ['zoom-in', ta('anim.zoomIn')]]}
            onchange={(v) => setSectionAnimStr('effect', v)} /></label>
        <label title={ta('tip.props.staggerStep')}>{ta('lbl.stepMs')}
          <input type="number" min="0" max="1000" step="10" value={sectionAnim.props.step ?? 90}
            onchange={(e) => setSectionAnimProp('step', Number(e.target.value))} /></label>
        <label title={ta('tip.props.staggerPattern')}>{ta('lbl.pattern')}
          <Dropdown value={sectionAnim.props.pattern ?? 'sequence'}
            options={[['sequence', ta('opt.stagger.sequence')], ['columns', ta('opt.stagger.columns')],
              ['rows', ta('opt.stagger.rows')], ['center', ta('opt.stagger.center')]]}
            onchange={(v) => setSectionAnimStr('pattern', v)} /></label>
      {/if}
    {/if}
    <label title={ta('tip.props.sectionHover')}>{ta('lbl.onHover')}
      <Dropdown value={sectionHover?.type ?? (sectionAnim && !isEntrance(sectionAnim) ? sectionAnim.type : '')}
        options={HOVER_OPTIONS}
        onchange={(v) => setSectionHover(v || null)} /></label>
  {:else}
    <p class="panel-hint">{ta('hint.props.empty')}</p>
  {/if}
</div>
