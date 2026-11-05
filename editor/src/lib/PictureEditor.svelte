<script>
  /* The image editor (0.7.29.2, layout A): a modal dialog over the admin with the picture large at its true shape in the middle, the crop window and the focus point on it, the shapes, the fit, the zoom and the focus point's numbers under it, and the tools in a column at the right (Look, Turn, Adjust, Corners, Overlay, Text, Size), each section with its own Reset.
     Size (0.7.29.3) weighs the file against its use's budget, with «Make smaller» over it, and says whether the picture is sharp in its frame on the page.
     The head holds the dialog's own undo and redo, Compare (held, the picture as it was opened) and «Reset all»; the foot removes the picture, gives a gallery's other pictures this one's look («Apply to all»), takes another, or closes with «Done». Escape cancels.
     Every change is written at once through state/picture-editor.svelte.js, so the canvas behind shows it, and the rules (the crop window, a pointer on the turned picture, the zoom a corner gives) are lib/picture-edit.js. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { pictureFilter, pictureStyle, PICTURE_LOOKS, PICTURE_BOUNDS, LOOK_FILTERS, straightenScale, parseColor, duotoneFilterUrl } from '$engine/picture.js';
  import { cropWindow, pointOnPicture, zoomFromCorner, turned, sectionChanged, KIND_TOOLS, ratioValue, movedFrame, frameAt, sharpness, dataUrlBytes, isDrawing, isBaked } from './picture-edit.js';
  import { ICONS } from './icons.js';
  import StepField from './StepField.svelte';
  import ColorPicker from './ColorPicker.svelte';

  const ed = getContext('urd-editor');
  const pic = $derived(ed.picture);
  const target = $derived(ed.pictureTarget);
  const tools = $derived(target ? KIND_TOOLS[target.kind] : null);
  /** What the stage draws: the picture as it is, or as it was opened while Compare is held. */
  const shown = $derived(ed.pictureComparing && ed.pictureOpened ? ed.pictureOpened : pic);
  const style = $derived(shown ? pictureStyle(shown.style) : null);

  let dialogEl = $state(null);
  let stageEl = $state(null);
  let boxEl = $state(null);
  let stageW = $state(0);
  let stageH = $state(0);

  $effect(() => {
    if (!dialogEl) return;
    if (pic && !dialogEl.open) dialogEl.showModal();
  });

  $effect(() => {
    if (!stageEl) return;
    const ro = new ResizeObserver(() => {
      stageW = stageEl.clientWidth;
      stageH = stageEl.clientHeight;
    });
    ro.observe(stageEl);
    return () => ro.disconnect();
  });

  /** The picture's own width over its height (known once loaded), else the frame's, so the stage has a shape before the picture arrives. */
  const pictureRatio = $derived(ed.pictureNatural || ed.pictureFrameRatio || 1);
  const quarter = $derived(style ? style.rotate === 90 || style.rotate === 270 : false);
  /** The picture box's own size on the stage, before the turn: as large as the stage allows for the picture as turned. */
  const box = $derived.by(() => {
    const room = { w: Math.max(0, stageW - 48), h: Math.max(0, stageH - 48) };
    const seen = quarter ? 1 / pictureRatio : pictureRatio;
    let w = room.w;
    let h = w / seen;
    if (h > room.h) {
      h = room.h;
      w = h * seen;
    }
    return quarter ? { w: h, h: w } : { w, h };
  });
  const angle = $derived(style ? style.rotate + style.straighten : 0);
  const boxTransform = $derived(style ? `translate(-50%, -50%) rotate(${angle}deg) scale(${style.flipX ? -1 : 1}, ${style.flipY ? -1 : 1})` : '');
  /** The crop window as fractions of the picture, the straightening's growth taken off around its centre. */
  const win = $derived.by(() => {
    if (!style || !shown) return null;
    const w = cropWindow({ pictureRatio, frameRatio: ed.pictureFrameRatio, x: style.x, y: style.y, zoom: style.zoom, fit: shown.fit, quarter });
    const grow = straightenScale(style.straighten);
    if (grow === 1) return w;
    const cx = w.left + w.width / 2;
    const cy = w.top + w.height / 2;
    return { left: cx - w.width / grow / 2, top: cy - w.height / grow / 2, width: w.width / grow, height: w.height / grow };
  });

  /** A pointer over the stage as a point on the picture. */
  function pointAt(event) {
    const r = boxEl.getBoundingClientRect();
    return pointOnPicture({ clientX: event.clientX, clientY: event.clientY, centerX: r.left + r.width / 2, centerY: r.top + r.height / 2, width: box.w, height: box.h, angle, flipX: style.flipX, flipY: style.flipY });
  }

  /** The frame moved over the picture: dragged from where it is pressed, or, pressed beside it, first put where the press is; one step when it is let go. */
  function startMove(event) {
    if (event.button !== 0 || !boxEl || !win || !style || tools.frameless) return;
    event.preventDefault();
    stageEl.focus({ preventScroll: true });
    let from = pointAt(event);
    let startWin = win;
    let startPoint = { x: style.x, y: style.y };
    const inside = from.x >= win.left && from.x <= win.left + win.width && from.y >= win.top && from.y <= win.top + win.height;
    if (!inside) {
      startPoint = frameAt(win, from, startPoint);
      ed.changePicture({ style: startPoint }, { gesture: true });
      startWin = cropWindow({ pictureRatio, frameRatio: ed.pictureFrameRatio, ...startPoint, zoom: style.zoom, fit: pic.fit, quarter });
    }
    const move = (e) => {
      if (!boxEl || !style) return up();
      const p = pointAt(e);
      ed.changePicture({ style: movedFrame(startWin, p.x - from.x, p.y - from.y, startPoint) }, { gesture: true });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      ed.endPictureGesture();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /** A corner of the crop window dragged: the opposite corner holds, and the zoom and the focus point follow so the window spans to the pointer. */
  function startCorner(event, corner) {
    if (event.button !== 0 || !win) return;
    event.preventDefault();
    event.stopPropagation();
    const right = corner.includes('r');
    const bottom = corner.includes('b');
    const anchorX = right ? win.left : win.left + win.width;
    const anchorY = bottom ? win.top : win.top + win.height;
    const full = cropWindow({ pictureRatio, frameRatio: ed.pictureFrameRatio, x: 0.5, y: 0.5, zoom: 1, fit: pic.fit, quarter });
    const move = (e) => {
      if (!boxEl || !style) return up();
      const p = pointAt(e);
      const zoom = zoomFromCorner({ anchorX, anchorY, pointX: p.x, pointY: p.y, full });
      const w = full.width / zoom;
      const h = full.height / zoom;
      const left = right ? anchorX : anchorX - w;
      const top = bottom ? anchorY : anchorY - h;
      const x = w < 1 ? Math.min(1, Math.max(0, left / (1 - w))) : style.x;
      const y = h < 1 ? Math.min(1, Math.max(0, top / (1 - h))) : style.y;
      ed.changePicture({ style: { zoom, x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 } }, { gesture: true });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      ed.endPictureGesture();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  let settleTimer = 0;
  /** A change from the wheel or the keys: one step once they rest. */
  function nudge(patch) {
    ed.changePicture({ style: patch }, { gesture: true });
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => ed.endPictureGesture(), 500);
  }

  function onWheel(event) {
    if (!style || tools.frameless || tools.zoom === false) return;
    event.preventDefault();
    const zoom = Math.min(PICTURE_BOUNDS.zoom.max, Math.max(1, style.zoom - event.deltaY * 0.002));
    nudge({ zoom: Math.round(zoom * 100) / 100 });
  }

  /** The arrow keys move the frame (Shift a larger step); + and - zoom. */
  function onStageKey(event) {
    if (!style || !win || tools.frameless) return;
    const step = event.shiftKey ? 0.05 : 0.01;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[event.key]) {
      event.preventDefault();
      const [dx, dy] = moves[event.key];
      nudge(movedFrame(win, dx, dy, { x: style.x, y: style.y }));
    } else if ((event.key === '+' || event.key === '-') && tools.zoom !== false) {
      event.preventDefault();
      nudge({ zoom: Math.round(Math.min(PICTURE_BOUNDS.zoom.max, Math.max(1, style.zoom + (event.key === '+' ? 0.1 : -0.1))) * 100) / 100 });
    }
  }

  /** The dialog's own keys: its undo and redo; Escape is the dialog's cancel. */
  function onDialogKey(event) {
    if (!(event.ctrlKey || event.metaKey)) return;
    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) {
      event.preventDefault();
      ed.undoPicture();
    } else if ((key === 'z' && event.shiftKey) || key === 'y') {
      event.preventDefault();
      ed.redoPicture();
    }
  }

  function onCancel(event) {
    event.preventDefault();
    ed.cancelPicture();
  }

  $effect(() => {
    if (!pic && dialogEl?.open) dialogEl.close();
  });

  const ratioLabel = (r) => ({ free: ta('pic.ratio.free'), original: ta('pic.ratio.original'), auto: ta('opt.auto'), wide: ta('pic.shape.wide'), square: '1:1', portrait: ta('pic.shape.portrait'), circle: ta('pic.shape.circle') }[r] ?? r);
  const OVERLAY_COLORS = ['text', 'accent', 'bg', 'surface'];
  /** A colour from the picker as the picture keeps it: a theme colour's name, or a hex colour without its transparency (a duotone or an overlay has no use for one); null for anything else. */
  function pickedColour(value) {
    const v = String(value ?? '').trim().toLowerCase();
    if (/^[a-z][a-z0-9-]*$/.test(v)) return v;
    const hex = /^#[0-9a-f]{6}/.exec(v);
    return hex ? hex[0] : null;
  }

  /** A duotone's gradient map for a pair of colours as the site's theme gives them, '' where a colour cannot be read. */
  function duotoneUrl(pair) {
    const dark = parseColor(siteColor(pair.dark));
    const light = parseColor(siteColor(pair.light));
    return dark && light ? duotoneFilterUrl(dark, light) : '';
  }

  /** The duotone's colours: black and white, and the site's own, each colour once (a site whose text is black offers black once). */
  const DUO_CHOICES = [['#000000', 'pic.color.black'], ['#ffffff', 'pic.color.white'], ['text', 'color.text'], ['accent', 'color.accent'], ['bg', 'color.bg'], ['surface', 'color.surface']];
  const DUO_COLORS = $derived.by(() => {
    const seen = new Set();
    return DUO_CHOICES.filter(([color]) => {
      const value = String(siteColor(color)).toLowerCase();
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  });
  /** A site colour as the site's theme gives it (the admin's own colours are its chrome's), or a hex colour as it is. */
  const siteColor = (color) => (String(color).startsWith('#') ? color : ed.siteDraft?.theme?.tokens?.color?.[color] ?? `var(--urd-color-${color})`);

  /** The open picture's file: its weight in bytes and its own size in pixels, read once for each picture (null until known). */
  const src = $derived(pic?.src ?? '');
  let fileBytes = $state(null);
  let naturalPx = $state(null);
  $effect(() => {
    const at = src;
    fileBytes = null;
    naturalPx = null;
    if (!at) return;
    let live = true;
    const known = dataUrlBytes(at);
    if (known != null) fileBytes = known;
    else fetch(at).then((r) => (r.ok ? r.blob() : null)).then((b) => { if (live && b) fileBytes = b.size; }).catch(() => {});
    const probe = new Image();
    probe.onload = () => { if (live && probe.naturalWidth) naturalPx = { width: probe.naturalWidth, height: probe.naturalHeight }; };
    probe.src = at;
    return () => { live = false; };
  });
  const drawing = $derived(isDrawing(src));
  /** The budget the file is weighed against; a baked picture's original has none, since its bake is made within the budget. */
  const budget = $derived(target && !isBaked(target.kind) ? ed.budgetFor(tools.budget ?? target.kind) : 0);
  const overBudget = $derived(fileBytes != null && budget > 0 && fileBytes > budget);
  /** Whether the picture has the pixels its frame draws it at on the page, with the zoom and the turn it has now. */
  const sharp = $derived(pic && !drawing ? sharpness({
    natural: naturalPx,
    frame: ed.pictureFrameSize,
    zoom: pic.style.zoom,
    fit: pic.fit,
    quarter: pic.style.rotate === 90 || pic.style.rotate === 270,
    grow: straightenScale(pic.style.straighten),
  }) : null);

  /** A slider's value written as it moves, one step when it is let go. */
  const slide = (key) => (e) => ed.changePicture({ style: { [key]: Number(e.target.value) } }, { gesture: true });
  const settle = () => ed.endPictureGesture();
</script>

{#if pic}
  <dialog class="pe" bind:this={dialogEl} oncancel={onCancel} onkeydown={onDialogKey} aria-labelledby="pe-title">
    <div class="pe-card">
      <header class="pe-head">
        <b id="pe-title">{ta(`pic.title.${target.kind}`)}</b>
        <span class="pe-acts">
          <button type="button" class="ghost pe-icon" disabled={!ed.pictureCanUndo} title={ta('pic.undo')} aria-label={ta('pic.undo')} onclick={() => ed.undoPicture()}>{@html ICONS.undo}</button>
          <button type="button" class="ghost pe-icon" disabled={!ed.pictureCanRedo} title={ta('pic.redo')} aria-label={ta('pic.redo')} onclick={() => ed.redoPicture()}>{@html ICONS.redo}</button>
          <button type="button" class="ghost pe-hold" title={ta('tip.pic.compare')} aria-pressed={ed.pictureComparing}
            onpointerdown={() => (ed.pictureComparing = true)} onpointerup={() => (ed.pictureComparing = false)} onpointerleave={() => (ed.pictureComparing = false)}
            onkeydown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); ed.pictureComparing = true; } }}
            onkeyup={() => (ed.pictureComparing = false)}>{@html ICONS.eye}{ta('pic.compare')}</button>
          {#if sectionChanged(pic.style, 'all')}
            <button type="button" class="ghost" title={ta('tip.pic.resetAll')} onclick={() => ed.resetPicture('all')}>{ta('pic.resetAll')}</button>
          {/if}
          <button type="button" class="ghost pe-icon" title={ta('ui.close')} aria-label={ta('ui.close')} onclick={() => ed.cancelPicture()}>{@html ICONS.cross}</button>
        </span>
      </header>

      <!-- The picture at its true shape, turned as the page draws it, with the frame's crop window and the focus point -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions (the stage is a canvas the pointer and the arrow keys work on, named by its tooltip) -->
      <div class="pe-stage" bind:this={stageEl} tabindex="0" role="application" aria-label={ta('tip.pic.stage')} title={ta('tip.pic.stage')}
        onpointerdown={startMove} onwheel={onWheel} onkeydown={onStageKey}>
        {#if shown.src && box.w > 0}
          <div class="pe-box" bind:this={boxEl} style:width="{box.w}px" style:height="{box.h}px" style:transform={boxTransform} style:--urd-color-accent={siteColor('accent')}>
            <img src={shown.src} alt="" draggable="false" style:filter={pictureFilter(style, { duotone: duotoneUrl(style.duotone) })}
              onload={(e) => { const i = e.currentTarget; if (i.naturalWidth && i.naturalHeight) ed.pictureNatural = i.naturalWidth / i.naturalHeight; }} />
            {#if style.look === 'vintage'}<span class="pe-layer urd-pic-look-vintage"></span>{/if}
            {#if style.overlay}<span class="pe-overlay" style:background={siteColor(style.overlay.color)} style:opacity={style.overlay.strength}></span>{/if}
            {#if win && !tools.frameless}
              <span class="pe-window" class:pe-round={tools.round || pic.ratio === 'circle'} style:left="{win.left * 100}%" style:top="{win.top * 100}%" style:width="{win.width * 100}%" style:height="{win.height * 100}%">
                {#each tools.zoom === false ? [] : ['tl', 'tr', 'bl', 'br'] as corner (corner)}
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <span class="pe-handle pe-{corner}" title={ta('tip.pic.zoom')} onpointerdown={(e) => startCorner(e, corner)}></span>
                {/each}
              </span>
            {/if}
          </div>
        {:else if !shown.src}
          <!-- No picture yet: the stage offers one -->
          <label class="ghost filepick pe-choose" title={ta('tip.pic.upload')} onpointerdown={(e) => e.stopPropagation()}>{@html ICONS.image}{ta('ui.chooseImage')}
            <input type="file" accept="image/*" onchange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; ed.replacePicture(f); }} /></label>
        {/if}
      </div>

      <div class="pe-under">
        {#if tools.ratios}
          <div class="pe-chips" role="radiogroup" aria-label={ta('pic.shape')} title={ta('tip.pic.ratio')}>
            {#each tools.ratios as r (r)}
              <button type="button" class="pe-chip" class:on={pic.ratio === r} role="radio" aria-checked={pic.ratio === r}
                disabled={r === 'original' && !ed.pictureNatural}
                onclick={() => ed.changePicture({ ratio: r })}>{ratioLabel(r)}</button>
            {/each}
          </div>
        {/if}
        {#if tools.fit}
          <div class="pe-chips" role="radiogroup" aria-label={ta('lbl.imageFit')}>
            <button type="button" class="pe-chip" class:on={pic.fit === 'cover'} role="radio" aria-checked={pic.fit === 'cover'} title={ta('opt.fitFrame.cover')} onclick={() => ed.changePicture({ fit: 'cover' })}>{ta('pic.fit.cover')}</button>
            <button type="button" class="pe-chip" class:on={pic.fit === 'contain'} role="radio" aria-checked={pic.fit === 'contain'} title={ta('opt.fitFrame.contain')} onclick={() => ed.changePicture({ fit: 'contain' })}>{ta('pic.fit.contain')}</button>
          </div>
        {/if}
        {#if !tools.frameless && tools.zoom !== false}
          <label class="pe-slider" title={ta('tip.pic.zoom')}><span>{ta('lbl.zoom')}</span>
            <input type="range" min="1" max={PICTURE_BOUNDS.zoom.max} step="0.01" value={pic.style.zoom} oninput={slide('zoom')} onchange={settle} />
            <StepField value={pic.style.zoom} min={1} max={PICTURE_BOUNDS.zoom.max} step={0.05} decimals={2} label={ta('lbl.zoom')} onchange={(v) => nudge({ zoom: v })} /></label>
        {/if}
      </div>

      <aside class="pe-tools">
        {#if tools.look !== false}
          <section class="pe-sec">
            <div class="pe-sec-t"><span>{ta('pic.sec.look')}</span>{#if sectionChanged(pic.style, 'look')}<button type="button" class="linkish" title={ta('tip.pic.reset')} onclick={() => ed.resetPicture('look')}>{ta('pic.reset')}</button>{/if}</div>
            <div class="pe-looks" role="radiogroup" aria-label={ta('pic.sec.look')} style:--urd-color-accent={siteColor('accent')}>
              {#each tools.looks ?? PICTURE_LOOKS as look (look)}
                <button type="button" class="pe-look" class:on={pic.style.look === look} role="radio" aria-checked={pic.style.look === look} onclick={() => ed.changePicture({ style: { look } })}>
                  <span class="pe-look-pic">
                    {#if pic.src}<img src={pic.src} alt="" draggable="false" style:filter={look === 'duotone' ? duotoneUrl(pic.style.duotone) || LOOK_FILTERS.duotone : LOOK_FILTERS[look]} />{/if}
                    {#if look === 'vintage'}<span class="pe-layer urd-pic-look-vintage"></span>{/if}
                  </span>
                  <span class="pe-look-name">{ta(`opt.galleryTone.${look}`)}</span>
                </button>
              {/each}
            </div>
            {#if pic.style.look === 'duotone'}
              <!-- The duotone's two colours: the shadows and the highlights -->
              {#each [['dark', 'pic.duo.dark', 'tip.pic.duo.dark'], ['light', 'pic.duo.light', 'tip.pic.duo.light']] as [end, label, tip] (end)}
                <div class="pe-duo" role="radiogroup" aria-label={ta(label)} title={ta(tip)}>
                  <span class="pe-duo-label">{ta(label)}</span>
                  {#each DUO_COLORS as [color, name] (color)}
                    <button type="button" class="pe-swatch" class:on={pic.style.duotone[end] === color} role="radio" aria-checked={pic.style.duotone[end] === color}
                      style:background={siteColor(color)} title={ta(name)} aria-label={ta(name)}
                      onclick={() => ed.changePicture({ style: { duotone: { ...pic.style.duotone, [end]: color } } })}></button>
                  {/each}
                  <!-- Any colour: the picker, ringed while the colour chosen is none of the swatches -->
                  <span class="pe-own" class:on={!DUO_COLORS.some(([c]) => c === pic.style.duotone[end])} title={ta('pic.ownColour')}>
                    <ColorPicker value={pic.style.duotone[end]} tokens={ed.themeSwatches()} label={ta('pic.ownColour')}
                      onchange={(v) => { const c = pickedColour(v); if (c) ed.changePicture({ style: { duotone: { ...pic.style.duotone, [end]: c } } }); }} />
                  </span>
                </div>
              {/each}
            {/if}
          </section>
        {/if}

        {#if tools.turn !== false}
          <section class="pe-sec">
            <div class="pe-sec-t"><span>{ta('pic.sec.turn')}</span>{#if sectionChanged(pic.style, 'turn')}<button type="button" class="linkish" title={ta('tip.pic.reset')} onclick={() => ed.resetPicture('turn')}>{ta('pic.reset')}</button>{/if}</div>
            <div class="pe-row">
              <button type="button" class="ghost pe-icon" title={ta('pic.rotateLeft')} aria-label={ta('pic.rotateLeft')} onclick={() => ed.changePicture({ style: { rotate: turned(pic.style.rotate, -1) } })}>{@html ICONS.rotateLeft}</button>
              <button type="button" class="ghost pe-icon" title={ta('pic.rotateRight')} aria-label={ta('pic.rotateRight')} onclick={() => ed.changePicture({ style: { rotate: turned(pic.style.rotate, 1) } })}>{@html ICONS.rotateRight}</button>
              <button type="button" class="ghost pe-icon" class:on={pic.style.flipX} aria-pressed={pic.style.flipX} title={ta('pic.flipX')} aria-label={ta('pic.flipX')} onclick={() => ed.changePicture({ style: { flipX: !pic.style.flipX } })}>{@html ICONS.flipX}</button>
              <button type="button" class="ghost pe-icon" class:on={pic.style.flipY} aria-pressed={pic.style.flipY} title={ta('pic.flipY')} aria-label={ta('pic.flipY')} onclick={() => ed.changePicture({ style: { flipY: !pic.style.flipY } })}>{@html ICONS.flipY}</button>
            </div>
            <label class="pe-slider" title={ta('tip.pic.straighten')}><span>{ta('pic.straighten')}</span>
              <input type="range" min={PICTURE_BOUNDS.straighten.min} max={PICTURE_BOUNDS.straighten.max} step="0.5" value={pic.style.straighten} oninput={slide('straighten')} onchange={settle} />
              <StepField value={pic.style.straighten} min={PICTURE_BOUNDS.straighten.min} max={PICTURE_BOUNDS.straighten.max} step={0.5} decimals={1} unit="°" label={ta('pic.straighten')} onchange={(v) => nudge({ straighten: v })} /></label>
          </section>
        {/if}

        {#if tools.adjust !== false}
          <section class="pe-sec">
            <div class="pe-sec-t"><span>{ta('pic.sec.adjust')}</span>{#if sectionChanged(pic.style, 'adjust')}<button type="button" class="linkish" title={ta('tip.pic.reset')} onclick={() => ed.resetPicture('adjust')}>{ta('pic.reset')}</button>{/if}</div>
            {#each [['brightness', 'lbl.brightness'], ['contrast', 'lbl.contrast'], ['saturate', 'lbl.saturate']] as [key, label] (key)}
              <label class="pe-slider" title={ta(`tip.image.${key}`)}><span>{ta(label)}</span>
                <input type="range" min="0" max="2" step="0.01" value={pic.style[key]} oninput={slide(key)} onchange={settle} />
                <StepField value={pic.style[key]} min={0} max={2} scale={100} unit="%" label={ta(label)} onchange={(v) => nudge({ [key]: v })} /></label>
            {/each}
            <label class="pe-slider" title={ta('tip.pic.blur')}><span>{ta('lbl.blur')}</span>
              <input type="range" min="0" max={PICTURE_BOUNDS.blur.max} step="0.5" value={pic.style.blur} oninput={slide('blur')} onchange={settle} />
              <StepField value={pic.style.blur} min={0} max={PICTURE_BOUNDS.blur.max} step={0.5} decimals={1} unit="px" label={ta('lbl.blur')} onchange={(v) => nudge({ blur: v })} /></label>
          </section>
        {/if}

        {#if tools.corners && pic.ratio !== 'circle'}
          <section class="pe-sec">
            <div class="pe-sec-t"><span>{ta('pic.sec.corners')}</span></div>
            <div class="pe-chips" role="radiogroup" aria-label={ta('pic.sec.corners')}>
              {#each [['', 'common.none'], ['sm', 'opt.size.sm'], ['md', 'opt.radius.md']] as [r, label] (r)}
                <button type="button" class="pe-chip" class:on={pic.radius === r} role="radio" aria-checked={pic.radius === r} onclick={() => ed.changePicture({ radius: r })}>{ta(label)}</button>
              {/each}
            </div>
          </section>
        {/if}

        {#if tools.overlay}
          <section class="pe-sec">
            <div class="pe-sec-t"><span>{ta('pic.sec.overlay')}</span>{#if sectionChanged(pic.style, 'overlay')}<button type="button" class="linkish" title={ta('tip.pic.reset')} onclick={() => ed.resetPicture('overlay')}>{ta('pic.reset')}</button>{/if}</div>
            <div class="pe-row" role="radiogroup" aria-label={ta('pic.sec.overlay')}>
              <button type="button" class="pe-swatch pe-none" class:on={!pic.style.overlay} role="radio" aria-checked={!pic.style.overlay} title={ta('common.none')} aria-label={ta('common.none')} onclick={() => ed.changePicture({ style: { overlay: null } })}></button>
              {#each OVERLAY_COLORS as color (color)}
                <button type="button" class="pe-swatch" class:on={pic.style.overlay?.color === color} role="radio" aria-checked={pic.style.overlay?.color === color}
                  style:background={siteColor(color)} title={ta(`color.${color}`)} aria-label={ta(`color.${color}`)}
                  onclick={() => ed.changePicture({ style: { overlay: { color, strength: pic.style.overlay?.strength ?? 0.35 } } })}></button>
              {/each}
              <span class="pe-own" class:on={Boolean(pic.style.overlay) && !OVERLAY_COLORS.includes(pic.style.overlay.color)} title={ta('pic.ownColour')}>
                <ColorPicker value={pic.style.overlay?.color ?? '#000000'} tokens={ed.themeSwatches()} label={ta('pic.ownColour')}
                  onchange={(v) => { const c = pickedColour(v); if (c) ed.changePicture({ style: { overlay: { color: c, strength: pic.style.overlay?.strength ?? 0.35 } } }); }} />
              </span>
            </div>
            {#if pic.style.overlay}
              <label class="pe-slider" title={ta('tip.pic.overlayStrength')}><span>{ta('lbl.strength')}</span>
                <input type="range" min="0.05" max="1" step="0.01" value={pic.style.overlay.strength}
                  oninput={(e) => ed.changePicture({ style: { overlay: { color: pic.style.overlay.color, strength: Number(e.target.value) } } }, { gesture: true })} onchange={settle} />
                <StepField value={pic.style.overlay.strength} min={0.05} max={1} scale={100} unit="%" label={ta('lbl.strength')} onchange={(v) => nudge({ overlay: { color: pic.style.overlay.color, strength: v } })} /></label>
            {/if}
          </section>
        {/if}

        {#if tools.alt}
          <section class="pe-sec">
            <div class="pe-sec-t"><span>{ta('pic.sec.text')}</span></div>
            <label class="pe-text" title={ta('tip.image.alt')}><span>{ta('lbl.description')}</span>
              <textarea rows="2" value={pic.alt} placeholder={ta('ph.altText')}
                oninput={(e) => ed.changePicture({ alt: e.target.value }, { gesture: true })} onchange={settle}></textarea></label>
          </section>
        {/if}

        {#if pic.src && ((budget > 0 && fileBytes != null) || sharp || drawing)}
          <section class="pe-sec">
            <div class="pe-sec-t"><span>{ta('pic.sec.size')}</span></div>
            {#if fileBytes != null && budget > 0}
              <div class="pe-budget" class:over={overBudget} title={ta('tip.pic.budget')}>
                <span>{ta('pic.size.weight', { kb: Math.max(1, Math.round(fileBytes / 1000)), budget: Math.round(budget / 1000) })}</span>
                <span class="pe-meter" aria-hidden="true"><span style:width="{Math.min(100, (fileBytes / budget) * 100)}%"></span></span>
              </div>
              {#if overBudget && !drawing}
                <button type="button" class="ghost pe-shrink" title={ta('tip.pic.shrink')} onclick={() => ed.shrinkPicture()}>{ta('pic.shrink')}</button>
              {/if}
            {/if}
            {#if drawing}
              <span class="pe-sharp ok">{@html ICONS.check}{ta('pic.sharp.drawing')}</span>
            {:else if sharp}
              <span class="pe-sharp" class:ok={sharp.sharp} title={sharp.sharp ? ta('tip.pic.sharp.yes') : ta('tip.pic.sharp.no', { w: naturalPx.width, drawn: sharp.drawnWidth })}>{@html sharp.sharp ? ICONS.check : ICONS.warn}{sharp.sharp ? ta('pic.sharp.yes') : ta('pic.sharp.no', { w: naturalPx.width, drawn: sharp.drawnWidth })}</span>
            {/if}
          </section>
        {/if}
      </aside>

      <footer class="pe-foot">
        {#if pic.src && !tools.handed && tools.removable !== false && !(tools.bake && target.fresh)}
          <button type="button" class="ghost pe-remove" onclick={() => ed.removePicture()}>{ta('ui.remove')}</button>
        {/if}
        {#if target.kind === 'gallery' && ed.pictureGalleryCount > 1}
          <button type="button" class="ghost" title={ta('tip.pic.applyAll')} onclick={() => ed.applyPictureToAll()}>{ta('pic.applyAll')}</button>
        {/if}
        <label class="ghost filepick pe-upload" title={ta('tip.pic.upload')}>{@html ICONS.upload}{pic.src ? ta('pic.upload') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; ed.replacePicture(f); }} /></label>
        <button type="button" class="primary pe-done" disabled={ed.pictureBaking} onclick={() => ed.donePicture()}>{ta('pic.done')}</button>
      </footer>
    </div>
  </dialog>
{/if}

<style>
  /* The dialog covers the window over a dimmed backdrop; the card is the editor's face */
  .pe {
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    width: 100vw;
    max-width: none;
    height: 100vh;
    max-height: none;
    margin: 0;
    padding: 2.5vh 2.5vw;
    color: inherit;
    background: transparent;
    border: 0;
  }

  .pe[open] {
    display: grid;
  }

  .pe::backdrop {
    background: rgb(0 0 0 / 62%);
  }

  .pe-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 21rem;
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    min-height: 0;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
    overflow: hidden;
  }

  .pe-head {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.8rem 0.6rem 1.1rem;
    border-bottom: 1px solid rgb(255 255 255 / 11%);
  }

  .pe-head b {
    font-size: 1rem;
  }

  .pe-acts {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .pe-icon {
    display: grid;
    place-items: center;
    width: 2.1rem;
    height: 2.1rem;
    padding: 0;
  }

  .pe-icon.on {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .pe-hold {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .pe-hold[aria-pressed='true'] {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  /* The stage: a checked ground the picture stands on, the picture as large as it allows */
  .pe-stage {
    grid-column: 1;
    grid-row: 2;
    position: relative;
    min-height: 0;
    overflow: hidden;
    cursor: move;
    touch-action: none;
    background: conic-gradient(rgb(255 255 255 / 5%) 25%, transparent 0 50%, rgb(255 255 255 / 5%) 0 75%, transparent 0) 0 0 / 20px 20px;
  }

  .pe-stage:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: -2px;
  }

  .pe-box {
    position: absolute;
    left: 50%;
    top: 50%;
    isolation: isolate;
    user-select: none;
  }

  .pe-box img {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .pe-layer,
  .pe-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* The frame's view, which is dragged to choose what shows: the rest of the picture darkened around it, the thirds inside */
  .pe-window {
    position: absolute;
    box-sizing: border-box;
    border: 2px solid #fff;
    box-shadow: 0 0 0 100vmax rgb(0 0 0 / 50%);
    pointer-events: none;
    background:
      linear-gradient(90deg, transparent calc(33.33% - 0.5px), rgb(255 255 255 / 45%) 0 calc(33.33% + 0.5px), transparent 0 calc(66.66% - 0.5px), rgb(255 255 255 / 45%) 0 calc(66.66% + 0.5px), transparent 0),
      linear-gradient(180deg, transparent calc(33.33% - 0.5px), rgb(255 255 255 / 45%) 0 calc(33.33% + 0.5px), transparent 0 calc(66.66% - 0.5px), rgb(255 255 255 / 45%) 0 calc(66.66% + 0.5px), transparent 0);
  }

  .pe-window.pe-round {
    border-radius: 50%;
  }

  .pe-choose {
    position: absolute;
    left: 50%;
    top: 50%;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .pe-handle {
    position: absolute;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 40%);
    pointer-events: auto;
  }

  .pe-tl { left: -8px; top: -8px; cursor: nwse-resize; }
  .pe-br { right: -8px; bottom: -8px; cursor: nwse-resize; }
  .pe-tr { right: -8px; top: -8px; cursor: nesw-resize; }
  .pe-bl { left: -8px; bottom: -8px; cursor: nesw-resize; }

  .pe-under {
    grid-column: 1;
    grid-row: 3;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1.2rem;
    padding: 0.7rem 1.1rem;
    border-top: 1px solid rgb(255 255 255 / 11%);
  }

  .pe-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .pe-chip {
    padding: 0.3rem 0.7rem;
    font-size: 0.85rem;
    border-radius: 999px;
  }

  .pe-chip.on {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .pe-slider {
    display: grid;
    grid-template-columns: 6rem minmax(0, 1fr) 5.2rem;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    min-width: 14rem;
  }

  .pe-under .pe-slider {
    grid-template-columns: auto minmax(8rem, 14rem) 5.2rem;
  }

  .pe-slider input {
    width: 100%;
    accent-color: var(--urd-color-accent, #7c5cff);
  }

  .pe-duo {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
  }

  .pe-duo-label {
    flex-basis: 100%;
  }

  .pe-text textarea {
    box-sizing: border-box;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    padding: 0.3rem 0.45rem;
  }

  .pe-tools {
    grid-column: 2;
    grid-row: 2 / 4;
    display: grid;
    align-content: start;
    min-height: 0;
    overflow-y: auto;
    border-left: 1px solid rgb(255 255 255 / 11%);
    scrollbar-width: thin;
  }

  .pe-sec {
    display: grid;
    gap: 0.6rem;
    padding: 0.9rem 1.1rem;
    border-bottom: 1px solid rgb(255 255 255 / 11%);
  }

  .pe-sec-t {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.6rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .pe-sec-t .linkish {
    font-size: 0.8rem;
    letter-spacing: 0;
    text-transform: none;
  }

  .pe-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
  }

  .pe-looks {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.45rem;
  }

  .pe-look {
    display: grid;
    gap: 0.25rem;
    padding: 0;
    font-size: 0.74rem;
    text-align: center;
    background: none;
    border: 0;
    opacity: 0.85;
  }

  .pe-look.on {
    opacity: 1;
  }

  .pe-look-pic {
    position: relative;
    display: block;
    aspect-ratio: 1;
    overflow: hidden;
    isolation: isolate;
    border: 2px solid transparent;
    border-radius: 6px;
  }

  .pe-look.on .pe-look-pic {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .pe-look-pic img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pe-swatch {
    width: 1.9rem;
    height: 1.9rem;
    padding: 0;
    border: 2px solid rgb(255 255 255 / 25%);
    border-radius: 50%;
  }

  /* The own colour: the picker in a swatch's place */
  .pe-own {
    display: inline-grid;
    flex: none;
    width: 1.9rem;
    height: 1.9rem;
  }

  /* Round like the swatches beside it, and ringed as a chosen one is */
  .pe-own :global(.cp-swatch) {
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
  }

  .pe-own.on :global(.cp-swatch) {
    border-color: #fff;
    box-shadow: 0 0 0 2px var(--urd-color-accent, #7c5cff);
  }

  /* Until an own colour is chosen the picker shows the colour wheel, not a swatch that is already beside it */
  .pe-own:not(.on) :global(.cp-swatch) {
    background: conic-gradient(#f44, #fd3, #4d4, #3dd, #44f, #d4d, #f44) !important;
  }

  .pe-swatch.on {
    border-color: #fff;
    box-shadow: 0 0 0 2px var(--urd-color-accent, #7c5cff);
  }

  /* «None»: a ring with a stroke across */
  .pe-none {
    background: linear-gradient(135deg, transparent calc(50% - 1px), rgb(255 255 255 / 60%) 0 calc(50% + 1px), transparent 0);
  }

  .pe-text {
    display: grid;
    gap: 0.35rem;
    font-size: 0.85rem;
  }

  .pe-text textarea {
    resize: vertical;
  }

  /* Size: the file's weight on a meter against its budget, red over it, and the sharpness with its mark */
  .pe-budget {
    display: grid;
    gap: 0.3rem;
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .pe-meter {
    display: block;
    height: 0.35rem;
    border-radius: 999px;
    background: rgb(255 255 255 / 10%);
    overflow: hidden;
  }

  .pe-meter > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--urd-color-accent, #7c5cff);
  }

  .pe-budget.over {
    color: #f5a09a;
  }

  .pe-budget.over .pe-meter > span {
    background: #e05252;
  }

  .pe-shrink {
    justify-self: start;
  }

  .pe-sharp {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: #f5a09a;
  }

  .pe-sharp.ok {
    color: #7ee2a8;
  }

  .pe-sharp :global(svg) {
    flex: none;
  }

  .pe-foot {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.6rem;
    padding: 0.7rem 1.1rem;
    border-top: 1px solid rgb(255 255 255 / 11%);
  }

  .pe-foot > :first-child {
    margin-right: auto;
  }

  .pe-remove {
    border-color: #b23b3b;
    background: rgb(150 35 35 / 30%);
    color: #f2b8b3;
  }

  .pe-upload {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .pe-done {
    min-width: 6rem;
  }

  /* A narrow window: the tools under the picture */
  @media (max-width: 760px) {
    .pe-card {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(14rem, 1fr) auto minmax(0, 40%) auto;
    }

    .pe-tools {
      grid-column: 1;
      grid-row: 4;
      border-left: 0;
      border-top: 1px solid rgb(255 255 255 / 11%);
    }
  }
</style>
