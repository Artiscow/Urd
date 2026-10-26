<script>
  /* The background editor: the layers of a section, the nav or the footer (colour, gradient, glow, image, slideshow, video, pattern, grain), with the focal point, the sizes, the gradient stops and the shared folder. `bg` is the target (mutate, keyPrefix, keyId) and `layers` its layers. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import { ta, tp, taApiError } from '$engine/i18n.js';
  import { BG_PATTERNS, PATTERN_SIZE, PATTERN_OPACITY, bgPattern } from '$engine/backgrounds/pattern.js';
  import { slideshowLayer } from '$engine/backgrounds/slideshow.js';
  import { GALLERY_STYLES, GALLERY_SHAPES, GALLERY_LOOKS, GALLERY_TONES, styleMotion, motionsFor, frameSize, roundable, colouredLook, frameColor } from '$engine/gallery-layout.js';
  import { loadFolderPhotos, parsePhotoSource } from '$engine/photo-source.js';
  import { ICONS } from '../lib/icons.js';
  const ed = getContext('urd-editor');
  const secBox = $derived(ed.secBox);
  const sectionBg = $derived(ed.sectionBg);
  const siteDraft = $derived(ed.siteDraft);
  const { BG_DEFS, BG_TYPES, compressMany, compressOrTrim, imageErrorText, newSeed, readVideoFile, reportUpload, setStatus, themeSwatches } = ed;
  let { bg, layers } = $props();

  const imgNat = $state({});            // src -> { w, h } (natural image size)

  // Load the images' natural sizes (for the space calculation).
  $effect(() => {
    for (const l of sectionBg) {
      const src = l?.props?.src;
      if (l?.type === 'image' && src && !imgNat[src]) {
        const im = new Image();
        im.onload = () => { imgNat[src] = { w: im.naturalWidth, h: im.naturalHeight }; };
        im.src = src;
      }
    }
  });

  /** Selected layer type for "+ Add layer" */
  let newBgType = $state('color');

  /** Which layers show their settings, per target (bg.keyId) and by the layer's place; a layer is folded until it is opened or added. */
  const opened = $state({});
  const isOpen = (i) => opened[bg.keyId]?.[i] === true;

  function toggleLayer(i) {
    opened[bg.keyId] ??= [];
    opened[bg.keyId][i] = !opened[bg.keyId][i];
  }

  function addBgLayer(bg, type) {
    const at = layers.length;
    bg.mutate(bg.keyPrefix, (t) => {
      t.background ??= { version: 1, layers: [] };
      t.background.layers.push({ type, version: BG_DEFS[type].version ?? 1, props: BG_DEFS[type].defaults() });
    });
    opened[bg.keyId] ??= [];
    opened[bg.keyId][at] = true;
  }

  function removeBgLayer(bg, i) {
    bg.mutate(bg.keyPrefix, (t) => {
      t.background.layers.splice(i, 1);
      // An empty layer list cleans background away entirely, so targets
      // without a background do not carry an empty {version,layers} object
      // (and nav/footer fall back to flat).
      if (!t.background.layers.length) delete t.background;
    });
    opened[bg.keyId]?.splice(i, 1);
  }

  function moveBgLayer(bg, i, dir) {
    const j = i + dir;
    bg.mutate(bg.keyPrefix, (t) => {
      const layers = t.background.layers;
      if (j < 0 || j >= layers.length) return;
      [layers[i], layers[j]] = [layers[j], layers[i]];
    });
    const list = opened[bg.keyId];
    if (list && j >= 0 && j < layers.length) [list[i], list[j]] = [list[j], list[i]];
  }

  /** Several props of one layer in one undo step: for switches that imply each other. */
  function setBgProps(bg, i, patch) {
    bg.mutate(`edit:${bg.keyPrefix}-${bg.keyId}-${i}-${Object.keys(patch).join('+')}`, (t) => {
      Object.assign(t.background.layers[i].props, patch);
    });
  }

  function setBgProp(bg, i, name, value) {
    bg.mutate(`edit:${bg.keyPrefix}-${bg.keyId}-${i}-${name}`, (t) => {
      t.background.layers[i].props[name] = value;
    });
  }

  /* Focal-point drag on the image background layer: a small preview box
     where dragging a point sets x/y (0..1) at once. Same focus idea as the
     image editor. */
  function startFocalDrag(event, bg, i, axes = 'xy') {
    event.preventDefault();
    const pad = event.currentTarget;
    // Pointer capture on the pad element: it then gets ALL pointer events
    // until the button is released, also when the mouse drags across the
    // preview iframe (which otherwise eats them, so the drag "sticks"
    // after releasing outside).
    pad.setPointerCapture?.(event.pointerId);
    const move = (e) => {
      const r = pad.getBoundingClientRect();
      if (axes.includes('x')) {
        const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        setBgProp(bg, i, 'x', Math.round(x * 100) / 100);
      }
      if (axes.includes('y')) {
        const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        setBgProp(bg, i, 'y', Math.round(y * 100) / 100);
      }
    };
    move(event);
    const up = () => {
      pad.removeEventListener('pointermove', move);
      pad.removeEventListener('pointerup', up);
      pad.removeEventListener('pointercancel', up);
    };
    pad.addEventListener('pointermove', move);
    pad.addEventListener('pointerup', up);
    pad.addEventListener('pointercancel', up);
  }

  /* Size (custom size mode): the stepper/number field writes `size` as a
     fraction, clamped to 10-400 %. */
  const clampBgSize = (v) => Math.min(4, Math.max(0.1, v));

  function stepBgSize(bg, i, cur, delta) {
    setBgProp(bg, i, 'size', clampBgSize(Math.round((cur + delta) * 100) / 100));
  }

  function setBgSizePct(bg, i, pct) {
    const n = Number(pct);
    if (Number.isFinite(n)) setBgProp(bg, i, 'size', clampBgSize(n / 100));
  }

  /* "Cover"/"Show all": compute the scale from the image and section sizes
     and set it, so Fill/Show-all become presets that can be fine-tuned
     further (not separate modes). r = the height/width ratio between
     section and image at 100 % width. */
  function setBgFillSize(bg, i, layer, mode) {
    const nat = imgNat[layer.props.src];
    if (!nat?.w || !nat?.h || !secBox?.w || !secBox?.h) return;
    const r = (secBox.h * nat.w) / (secBox.w * nat.h);
    const size = mode === 'cover' ? Math.max(1, r) : Math.min(1, r);
    if (layer.props.fit === 'tile' || layer.props.fit === 'repeat') setBgProp(bg, i, 'fit', 'plain');
    setBgProp(bg, i, 'size', clampBgSize(Math.round(size * 100) / 100));
  }

  function gradientProps(layer) {
    return layer.props;
  }

  function mutateGradient(bg, i, key, fn) {
    bg.mutate(key, (t) => {
      fn(t.background.layers[i].props);
    });
  }

  function setGradProp(bg, i, name, value) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-${name}`, (p) => { p[name] = value; });
  }

  /** A shape switch resets the animation if it does not exist for the new shape. */
  const GRAD_ANIMATIONS = {
    linear: [['none', ta('common.none')], ['pan', ta('opt.gradAnim.pan')], ['pan-loop', ta('opt.gradAnim.panLoop')], ['rotate', ta('opt.gradAnim.rotate')]],
    radial: [['none', ta('common.none')], ['pulse', ta('opt.gradAnim.pulse')], ['orbit', ta('opt.gradAnim.orbit')]],
  };

  function setGradKind(bg, i, kind) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      p.kind = kind;
      if (!GRAD_ANIMATIONS[kind].some(([id]) => id === (p.animation ?? 'none'))) p.animation = 'none';
    });
  }

  function setGradStop(bg, i, si, patch) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-stop${si}`, (p) => {
      p.stops[si] = { ...p.stops[si], ...patch };
    });
  }

  /** New color at the bottom of the list, with a share equal to the average. */
  function addGradStop(bg, i) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      const avg = Math.round(p.stops.reduce((a, s) => a + (Number(s.share) || 0), 0) / p.stops.length) || 50;
      p.stops.push({ color: p.stops[p.stops.length - 1]?.color ?? '#ffffff', share: avg });
    });
  }

  function removeGradStop(bg, i, si) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      if (p.stops.length > 2) p.stops.splice(si, 1);
    });
  }

  function reorderGradStop(bg, i, from, to) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      const [moved] = p.stops.splice(from, 1);
      p.stops.splice(to, 0, moved);
    });
  }

  /** Ongoing drag reordering of gradient colors: {layer, from, insert}
   *  or null. insert is the insertion slot (0..count), drawn as a line
   *  above the row (or below the last one). */
  let stopDrag = $state(null);

  /** Pointer-based drag (not HTML5 dnd: it gives neither a visual
   *  indicator nor a reliable drop on the neighboring row). The dragged
   *  row is dimmed, and the insertion line follows the pointer; the drop
   *  performs ONE undo step. */
  function startStopDrag(bg, event, layerI, si) {
    if (event.button !== 0) return;
    event.preventDefault();
    const container = event.currentTarget.closest('.bg-layer');
    const row = event.currentTarget.closest('.grad-stop');
    stopDrag = { layer: layerI, from: si, insert: si };

    // Ghost row: a copy of the whole row (with the color) follows the
    // pointer, so you see WHAT you are dragging, not just where it lands.
    // Inline style, since the copy lives on document.body outside the
    // component tree.
    const rect = row.getBoundingClientRect();
    const grabY = event.clientY - rect.top;
    const ghost = row.cloneNode(true);
    ghost.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;`
      + `width:${rect.width}px;display:flex;align-items:center;gap:0.4rem;`
      + 'pointer-events:none;z-index:1000;opacity:0.92;padding:2px 4px;'
      + 'background:var(--urd-color-surface);border:1px solid var(--urd-color-accent);border-radius:6px;';
    document.body.appendChild(ghost);

    const move = (ev) => {
      ghost.style.top = `${ev.clientY - grabY}px`;
      const rects = [...container.querySelectorAll('.grad-stop')].map((r) => r.getBoundingClientRect());
      let insert = rects.length;
      for (let k = 0; k < rects.length; k++) {
        if (ev.clientY < rects[k].top + rects[k].height / 2) {
          insert = k;
          break;
        }
      }
      stopDrag = { ...stopDrag, insert };
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      ghost.remove();
      const drag = stopDrag;
      stopDrag = null;
      if (!drag) return;
      const to = drag.insert > drag.from ? drag.insert - 1 : drag.insert;
      if (to !== drag.from) reorderGradStop(bg, drag.layer, drag.from, to);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /** Change the layer type afterwards (the layer keeps its slot, props reset). */
  function changeBgLayerType(bg, i, type) {
    bg.mutate(bg.keyPrefix, (t) => {
      if (t.background.layers[i].type === type) return;
      t.background.layers[i] = { type, version: BG_DEFS[type].version ?? 1, props: BG_DEFS[type].defaults() };
    });
  }

  async function setBgImage(bg, i, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      setBgProp(bg, i, 'src', img.dataUrl);
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }

  /** The video layer's film (readVideoFile holds the limits). */
  function setBgVideo(bg, i, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) readVideoFile(file, 'status.videoFormat', (dataUrl) => setBgProp(bg, i, 'src', dataUrl));
  }

  /** The poster image for the video layer (the still shown with reduced motion). */
  async function setBgPoster(bg, i, event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file);
      setBgProp(bg, i, 'poster', img.dataUrl);
    } catch (err) {
      setStatus(imageErrorText(err), 'error');
    }
  }

  /* The shared folder: the panel reads the folder through the site's own
     proxy, the same call the layer in the preview makes for itself. The
     button always goes out again, so a share the owner has just opened is
     seen at once. One readout per layer, keyed like the history entries. */
  let folderStatus = $state({});

  const folderKey = (bg, i) => `${bg.keyPrefix}-${bg.keyId}-${i}`;

  async function checkBgFolder(bg, i, layer) {
    const key = folderKey(bg, i);
    folderStatus[key] = { text: ta('status.folderChecking'), err: false };
    const answer = await loadFolderPhotos(layer.props.folder, layer.props.order, { force: true });
    folderStatus[key] = answer.photos.length
      ? { text: tp('status.folderFound', answer.photos.length, { count: answer.photos.length }), err: false }
      : { text: taApiError(answer) ?? ta('status.folderNone'), err: true };
  }

  async function addBgGalleryImages(bg, i, event) {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    if (!files.length) return;
    setStatus(ta('status.compressingImages'));
    const { images, failed, big } = await compressMany(files);
    if (images.length) {
      bg.mutate(bg.keyPrefix, (t) => {
        const props = t.background.layers[i].props;
        props.images ??= [];
        props.images.push(...images.map(({ src }) => ({ src, x: 0.5, y: 0.5 })));
      });
    }
    reportUpload(images.length, failed, big);
  }

  function moveBgGalleryImage(bg, i, j, dir) {
    bg.mutate(bg.keyPrefix, (t) => {
      const arr = t.background.layers[i].props.images;
      const k = j + dir;
      if (k < 0 || k >= arr.length) return;
      [arr[j], arr[k]] = [arr[k], arr[j]];
    });
  }

  function removeBgGalleryImage(bg, i, j) {
    bg.mutate(bg.keyPrefix, (t) => { t.background.layers[i].props.images.splice(j, 1); });
  }

  function setBgGalleryImageProp(bg, i, j, name, value) {
    bg.mutate(`edit:${bg.keyPrefix}g-${bg.keyId}-${i}-${j}-${name}`, (t) => {
      t.background.layers[i].props.images[j][name] = value;
    });
  }

  /** A gallery layer's props as the engine draws them: the editor keeps a layer at the version
      it was stored with, so one from before the styles is read through the layer's own lift. */
  const galleryView = (layer) => ((layer.version ?? 1) < slideshowLayer.version
    ? slideshowLayer.migrations[1](layer.props ?? {}) : (layer.props ?? {}));
</script>

{#snippet bgImageRows(bg, i, layer)}
  {#if (layer.props.source ?? 'upload') !== 'folder'}
    <label class="ghost filepick" title={ta('tip.bg.addImages')}>
      {ta('ui.addImages')}
      <input type="file" accept="image/*" multiple onchange={(e) => addBgGalleryImages(bg, i, e)} />
    </label>
    {#each layer.props.images ?? [] as img, j (j)}
      <span class="toolbar-row">
        <img class="site-icon-preview" src={img.src} alt="" />
        <span class="row-tools">
          <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveBgGalleryImage(bg, i, j, -1)} disabled={j === 0}>{@html ICONS.up}</button>
          <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveBgGalleryImage(bg, i, j, 1)}
            disabled={j === layer.props.images.length - 1}>{@html ICONS.down}</button>
          <button class="ghost row-tool" title={ta('tip.removeImage')}
            onclick={() => removeBgGalleryImage(bg, i, j)}>{@html ICONS.cross}</button>
        </span>
      </span>
      <label title={ta('tip.image.focusX')}>{ta('lbl.focusX')}
        <span class="gridmenu-value">{Math.round((img.x ?? 0.5) * 100)}%</span></label>
      <input type="range" min="0" max="1" step="0.01" value={img.x ?? 0.5}
        oninput={(e) => setBgGalleryImageProp(bg, i, j, 'x', Number(e.target.value))} />
      <label title={ta('tip.image.focusY')}>{ta('lbl.focusY')}
        <span class="gridmenu-value">{Math.round((img.y ?? 0.5) * 100)}%</span></label>
      <input type="range" min="0" max="1" step="0.01" value={img.y ?? 0.5}
        oninput={(e) => setBgGalleryImageProp(bg, i, j, 'y', Number(e.target.value))} />
    {/each}
  {/if}
{/snippet}

{#snippet bgFolderRows(bg, i, layer)}
  {@const fp = galleryView(layer)}
  <label title={ta('tip.bg.photoSource')}>{ta('lbl.photoSource')}
    <Dropdown value={fp.source ?? 'upload'}
      options={[['upload', ta('opt.photoSource.upload')], ['folder', ta('opt.photoSource.folder')]]}
      onchange={(v) => setBgProp(bg, i, 'source', v)} /></label>
  {#if (fp.source ?? 'upload') === 'folder'}
    {@const parsed = parsePhotoSource(fp.folder ?? '')}
    <!-- A Google Photos album and a picture list come in their own order: there is no name or date to sort by -->
    {@const sortable = !parsed || parsed.provider === 'drive' || parsed.provider === 'nextcloud'}
    <label title={ta('tip.bg.photoFolder')}>{ta('lbl.photoFolder')}
      <input type="text" class:bad-target={(fp.folder ?? '').trim() && !parsed}
        value={fp.folder ?? ''} placeholder="https://drive.google.com/drive/folders/..."
        onchange={(e) => setBgProp(bg, i, 'folder', e.target.value.trim())} /></label>
    <label title={ta('tip.bg.folderOrder')}>{ta('lbl.folderOrder')}
      <Dropdown value={sortable || fp.order === 'random' ? (fp.order ?? 'name') : 'name'}
        options={sortable
          ? [['name', ta('opt.folderOrder.name')], ['newest', ta('opt.folderOrder.newest')], ['random', ta('opt.folderOrder.random')]]
          : [['name', ta('opt.folderOrder.listed')], ['random', ta('opt.folderOrder.random')]]}
        onchange={(v) => setBgProp(bg, i, 'order', v)} /></label>
    <label title={ta('tip.bg.folderMax')}>{ta('lbl.folderMax')}
      <input type="number" min="1" max="60" value={fp.folderMax ?? 24}
        onchange={(e) => setBgProp(bg, i, 'folderMax', Number(e.target.value))} /></label>
    <button type="button" class="ghost action" disabled={!parsed} onclick={() => checkBgFolder(bg, i, layer)}>
      {@html ICONS.eye} {ta('ui.checkFolder')}
    </button>
    {#if folderStatus[folderKey(bg, i)]}
      <p class="folder-status" class:err={folderStatus[folderKey(bg, i)].err}>{folderStatus[folderKey(bg, i)].text}</p>
    {/if}
  {/if}
{/snippet}

{#snippet bgMotionRows(bg, i, layer)}
  <label title={ta('tip.bg.imageMotion')}>{ta('lbl.motion')}
    <Dropdown value={layer.props.motion ?? 'none'}
      options={[['none', ta('common.none')], ['kenburns', ta('opt.bgMotion.kenburns')], ['drift', ta('opt.bgMotion.drift')]]}
      onchange={(v) => setBgProp(bg, i, 'motion', v)} /></label>
  {#if (layer.props.motion ?? 'none') !== 'none'}
    <label title={ta('tip.bg.motionSpeed')}>{ta('lbl.motionSpeed')}
      <span class="gridmenu-value">{layer.props.motionSpeed ?? 20} s</span></label>
    <input type="range" min="6" max="60" step="1" value={layer.props.motionSpeed ?? 20}
      oninput={(e) => setBgProp(bg, i, 'motionSpeed', Number(e.target.value))} />
  {/if}
{/snippet}

{#each layers as layer, i (i)}
  <div class="bg-layer">
    <span class="nav-line">
      <button type="button" class="ghost row-tool bg-fold" class:open={isOpen(i)} title={ta('tip.bg.foldLayer')} aria-label={ta('tip.bg.foldLayer')}
        aria-expanded={isOpen(i)} onclick={() => toggleLayer(i)}>{@html ICONS.caret}</button>
      <Dropdown value={layer.type} title={ta('tip.bg.changeType')}
        options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
        onchange={(v) => changeBgLayerType(bg, i, v)} />
      <span class="row-tools">
        <button class="ghost row-tool" title={ta('hint.bg.order')}
          onclick={() => moveBgLayer(bg, i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" title={ta('hint.bg.order')}
          onclick={() => moveBgLayer(bg, i, 1)}
          disabled={i === layers.length - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('tip.bg.removeLayer')} onclick={() => removeBgLayer(bg, i)}>{@html ICONS.cross}</button>
      </span>
    </span>
    {#if isOpen(i)}
      {#if layer.type === 'color'}
        <label title={ta('tip.bg.layerColor')}>{ta('lbl.color')}
          <ColorPicker value={layer.props.value} tokens={themeSwatches()}
            label={ta('tip.bg.layerColor')} onchange={(hex) => setBgProp(bg, i, 'value', hex)} /></label>
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'gradient'}
        {@const g = gradientProps(layer)}
        {@const shareSum = g.stops.reduce((a, s) => a + Math.max(0, Number(s.share) || 0), 0)}
        <label title={ta('tip.bg.gradKind')}>{ta('blocks.shape')}
          <Dropdown value={g.kind ?? 'linear'}
            options={[['linear', ta('opt.grad.linear')], ['radial', ta('opt.grad.radial')]]}
            onchange={(v) => setGradKind(bg, i, v)} /></label>
        {#each g.stops as stop, si (si)}
          <span class="nav-line grad-stop"
            class:dragging={stopDrag?.layer === i && stopDrag.from === si}
            class:drop-above={stopDrag?.layer === i && stopDrag.insert === si}
            class:drop-below={stopDrag?.layer === i && stopDrag.insert === g.stops.length && si === g.stops.length - 1}>
            <span class="grad-grip" title={ta('tip.bg.dragStop')}
              onpointerdown={(e) => startStopDrag(bg, e, i, si)}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><circle cx="5" cy="3" r="1.4"/><circle cx="11" cy="3" r="1.4"/><circle cx="5" cy="8" r="1.4"/><circle cx="11" cy="8" r="1.4"/><circle cx="5" cy="13" r="1.4"/><circle cx="11" cy="13" r="1.4"/></svg>
            </span>
            <ColorPicker value={stop.color} tokens={themeSwatches()}
              label={ta('tip.bg.stopColor')} onchange={(hex) => setGradStop(bg, i, si, { color: hex })} />
            <input type="range" class="tb-grow" min="0" max="100" step="1" value={stop.share ?? 50}
              title={ta('tip.bg.stopShare')}
              oninput={(e) => setGradStop(bg, i, si, { share: Number(e.target.value) })} />
            <span class="gridmenu-value">{shareSum > 0 ? Math.round((Math.max(0, Number(stop.share) || 0) / shareSum) * 100) : Math.round(100 / g.stops.length)}%</span>
            {#if g.stops.length > 2}
              <button class="ghost row-tool" title={ta('tip.bg.removeStop')}
                onclick={() => removeGradStop(bg, i, si)}>{@html ICONS.cross}</button>
            {/if}
          </span>
        {/each}
        <button class="ghost action" title={ta('tip.bg.addStop')}
          onclick={() => addGradStop(bg, i)}>{ta('ui.addStop')}</button>
        {#if (g.kind ?? 'linear') === 'radial'}
          <label title={ta('tip.bg.centerX')}>{ta('lbl.centerX')}
            <span class="gridmenu-value">{Math.round((g.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={g.x ?? 0.5}
            oninput={(e) => setGradProp(bg, i, 'x', Number(e.target.value))} />
          <label title={ta('tip.bg.centerY')}>{ta('lbl.centerY')}
            <span class="gridmenu-value">{Math.round((g.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={g.y ?? 0.5}
            oninput={(e) => setGradProp(bg, i, 'y', Number(e.target.value))} />
        {:else}
          <label title={ta('tip.bg.angle')}>{ta('lbl.angle')}
            <span class="gridmenu-value">{g.angle}°</span></label>
          <input type="range" min="0" max="360" step="5" value={g.angle}
            oninput={(e) => setGradProp(bg, i, 'angle', Number(e.target.value))} />
        {/if}
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((g.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={g.opacity ?? 1}
          oninput={(e) => setGradProp(bg, i, 'opacity', Number(e.target.value))} />
        <label title={ta('tip.bg.motion')}>{ta('lbl.motion')}
          <Dropdown value={g.animation ?? 'none'}
            options={GRAD_ANIMATIONS[(g.kind ?? 'linear') === 'radial' ? 'radial' : 'linear']}
            onchange={(v) => setGradProp(bg, i, 'animation', v)} /></label>
      {:else if layer.type === 'glow'}
        <label title={ta('tip.bg.glowColor')}>{ta('lbl.color')}
          <ColorPicker value={layer.props.color} tokens={themeSwatches()}
            label={ta('tip.bg.glowColor')} onchange={(hex) => setBgProp(bg, i, 'color', hex)} /></label>
        <label title={ta('tip.bg.glowX')}>{ta('lbl.posX')}
          <span class="gridmenu-value">{Math.round(layer.props.x * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.x}
          oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
        <label title={ta('tip.bg.glowY')}>{ta('lbl.posY')}
          <span class="gridmenu-value">{Math.round(layer.props.y * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.y}
          oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        <label title={ta('tip.bg.glowSize')}>{ta('lbl.size')}
          <span class="gridmenu-value">{Math.round(layer.props.radius * 100)}%</span></label>
        <input type="range" min="0.1" max="1" step="0.01" value={layer.props.radius}
          oninput={(e) => setBgProp(bg, i, 'radius', Number(e.target.value))} />
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round(layer.props.opacity * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'grain'}
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round(layer.props.opacity * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.opacity}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'pattern'}
        <label title={ta('tip.bg.pattern')}>{ta('lbl.bgPattern')}
          <Dropdown value={bgPattern(layer.props.pattern)}
            options={BG_PATTERNS.map((id) => [id, ta(`opt.bgPattern.${id}`)])}
            onchange={(v) => setBgProp(bg, i, 'pattern', v)} /></label>
        <label title={ta('tip.bg.patternColor')}>{ta('lbl.color')}
          <ColorPicker value={layer.props.color ?? 'text'} tokens={themeSwatches()}
            label={ta('lbl.color')} onchange={(hex) => setBgProp(bg, i, 'color', hex)} /></label>
        <label title={ta('tip.bg.patternSize')}>{ta('lbl.size')}
          <span class="gridmenu-value">{layer.props.size ?? PATTERN_SIZE.dflt} px</span></label>
        <input type="range" min={PATTERN_SIZE.min} max={PATTERN_SIZE.max} step="2" value={layer.props.size ?? PATTERN_SIZE.dflt}
          oninput={(e) => setBgProp(bg, i, 'size', Number(e.target.value))} />
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? PATTERN_OPACITY) * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.opacity ?? PATTERN_OPACITY}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        <label title={ta('tip.bg.patternRotation')}>{ta('lbl.patternRotation')}
          <span class="gridmenu-value">{layer.props.rotation ?? 0}&deg;</span></label>
        <input type="range" min="0" max="180" step="5" value={layer.props.rotation ?? 0}
          oninput={(e) => setBgProp(bg, i, 'rotation', Number(e.target.value))} />
        <label class="gridmenu-snap" title={ta('tip.bg.patternInvert')}>
          <input type="checkbox" checked={layer.props.invert === true}
            onchange={(e) => setBgProp(bg, i, 'invert', e.target.checked)} />
          {ta('lbl.patternInvert')}
        </label>
      {:else if layer.type === 'image'}
        <label class="ghost filepick" title={ta('tip.webpAuto')}>
          {layer.props.src ? ta('ui.changeImage') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={(e) => setBgImage(bg, i, e)} />
        </label>
        {@const isTile = layer.props.fit === 'tile' || layer.props.fit === 'repeat'}
        <label title={ta('tip.bg.fit')}>{ta('lbl.imageFit')}
          <Dropdown value={isTile ? 'tile' : 'plain'}
            options={[['plain', ta('opt.img.plain')], ['tile', ta('opt.img.tile')]]}
            onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
        <label title={ta('tip.bg.size')}>{ta('lbl.size')}</label>
        <div class="sizestep">
          <button type="button" title={ta('tip.smaller')} onclick={() => stepBgSize(bg, i, layer.props.size ?? 1, -0.05)}>{@html ICONS.minus}</button>
          <input type="number" min="10" max="400" value={Math.round((layer.props.size ?? 1) * 100)}
            onchange={(e) => setBgSizePct(bg, i, e.target.value)} />
          <span class="sizeunit">%</span>
          <button type="button" title={ta('tip.larger')} onclick={() => stepBgSize(bg, i, layer.props.size ?? 1, 0.05)}>{@html ICONS.plus}</button>
        </div>
        {#if !isTile}
          <div class="sizefill">
            <button type="button" class="ghost" title={ta('tip.bg.cover')} onclick={() => setBgFillSize(bg, i, layer, 'cover')}>{ta('ui.cover')}</button>
            <button type="button" class="ghost" title={ta('opt.fitFrame.contain')} onclick={() => setBgFillSize(bg, i, layer, 'contain')}>{ta('opt.fit.contain')}</button>
          </div>
          <label title={ta('tip.bg.position')}>{ta('lbl.position')}</label>
          <div class="focalpad" onpointerdown={(e) => startFocalDrag(e, bg, i, 'xy')}
            style="--fx:{Math.max(0, Math.min(1, layer.props.x ?? 0.5)) * 100}%; --fy:{Math.max(0, Math.min(1, layer.props.y ?? 0.5)) * 100}%">
            <span class="focaldot"></span>
          </div>
          <label title={ta('tip.bg.position')} class="sub">{ta('lbl.horizontal')}
            <span class="gridmenu-value">{Math.round((layer.props.x ?? 0.5) * 100)}%</span></label>
          <input type="range" min="-0.5" max="1.5" step="0.01" value={layer.props.x ?? 0.5}
            oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
          <label title={ta('tip.bg.position')} class="sub">{ta('lbl.vertical')}
            <span class="gridmenu-value">{Math.round((layer.props.y ?? 0.5) * 100)}%</span></label>
          <input type="range" min="-0.5" max="1.5" step="0.01" value={layer.props.y ?? 0.5}
            oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        {/if}
        <label title={ta('tip.bg.blur')}>{ta('lbl.blur')}
          <span class="gridmenu-value">{layer.props.blur ?? 0} px</span></label>
        <input type="range" min="0" max="20" step="1" value={layer.props.blur ?? 0}
          oninput={(e) => setBgProp(bg, i, 'blur', Number(e.target.value))} />
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        {@render bgMotionRows(bg, i, layer)}
        <label class="gridmenu-snap" title={ta('tip.bg.parallax')}>
          <input type="checkbox" checked={(layer.props.parallax ?? 0) > 0}
            onchange={(e) => setBgProp(bg, i, 'parallax', e.target.checked ? 0.3 : 0)} />
          {ta('lbl.parallax')}
        </label>
        {#if (layer.props.parallax ?? 0) > 0}
          <label title={ta('tip.bg.parallaxStrength')}>{ta('lbl.parallaxStrength')}
            <span class="gridmenu-value">{Math.round((layer.props.parallax ?? 0) * 100)}%</span></label>
          <input type="range" min="0.1" max="1" step="0.01" value={layer.props.parallax ?? 0.3}
            oninput={(e) => setBgProp(bg, i, 'parallax', Number(e.target.value))} />
          <label title={ta('tip.bg.bleed')}>{ta('lbl.bleed')}
            <Dropdown value={layer.props.bleed ?? 'none'}
              options={[['none', ta('common.none')], ['up', ta('opt.bleed.up')], ['down', ta('opt.bleed.down')], ['both', ta('opt.brand.both')]]}
              onchange={(v) => setBgProp(bg, i, 'bleed', v)} /></label>
        {/if}
      {:else if layer.type === 'slideshow'}
        {@const gp = galleryView(layer)}
        {@const gstyle = gp.style ?? 'floating'}
        {@const gmotion = styleMotion(gstyle, gp.motion)}
        {@const fixedSeed = (gp.seed ?? 0) > 0}
        {@render bgFolderRows(bg, i, layer)}
        {@render bgImageRows(bg, i, layer)}
        <label title={ta('tip.bg.galleryStyle')}>{ta('lbl.galleryStyle')}
          <Dropdown value={gstyle}
            options={GALLERY_STYLES.map((st) => [st, ta(`opt.galleryStyle.${st}`)])}
            onchange={(v) => setBgProp(bg, i, 'style', v)} /></label>
        {#if gstyle === 'fill'}
          <label title={ta('tip.bg.slideFit')}>{ta('lbl.imageFit')}
            <Dropdown value={gp.fit ?? 'cover'}
              options={[['cover', ta('opt.fit.cover')], ['contain', ta('opt.fit.contain')]]}
              onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
          <label title={ta('tip.gallery.interval')}>{ta('lbl.secondsPerImage')}
            <span class="gridmenu-value">{gp.interval ?? 12} s</span></label>
          <input type="range" min="0.5" max="90" step="0.5" value={gp.interval ?? 12}
            oninput={(e) => setBgProp(bg, i, 'interval', Number(e.target.value))} />
          <label title={ta('tip.bg.fade')}>{ta('lbl.transition')}
            <span class="gridmenu-value">{(gp.fade ?? 1.5).toFixed(1)} s</span></label>
          <input type="range" min="0" max="5" step="0.1" value={gp.fade ?? 1.5}
            oninput={(e) => setBgProp(bg, i, 'fade', Number(e.target.value))} />
          <label title={ta('tip.bg.blur')}>{ta('lbl.blur')}
            <span class="gridmenu-value">{gp.blur ?? 0} px</span></label>
          <input type="range" min="0" max="20" step="1" value={gp.blur ?? 0}
            oninput={(e) => setBgProp(bg, i, 'blur', Number(e.target.value))} />
        {:else}
          {#if gstyle === 'band'}
            <label title={ta('tip.bg.rows')}>{ta('lbl.galleryRows')}
              <Dropdown value={String(gp.rows ?? 2)} options={[['1', '1'], ['2', '2']]}
                onchange={(v) => setBgProp(bg, i, 'rows', Number(v))} /></label>
            <label title={ta('tip.bg.direction')}>{ta('lbl.photoDirection')}
              <Dropdown value={gp.direction ?? 'left'}
                options={[['left', ta('opt.ribbonDir.left')], ['right', ta('opt.ribbonDir.right')]]}
                onchange={(v) => setBgProp(bg, i, 'direction', v)} /></label>
          {:else}
            <label title={ta('tip.bg.photoCount')}>{ta('lbl.photoCount')}
              <input type="number" min={gstyle === 'mosaic' ? 4 : 1} max="20"
                value={gp.count ?? (gstyle === 'mosaic' ? 12 : 8)}
                onchange={(e) => setBgProp(bg, i, 'count', Number(e.target.value))} /></label>
            <label title={ta('tip.bg.galleryRepeat')}>{ta('lbl.galleryRepeat')}
              <Dropdown value={gp.repeat === true ? 'repeat' : 'once'}
                options={[['once', ta('opt.galleryRepeat.once')], ['repeat', ta('opt.galleryRepeat.repeat')]]}
                onchange={(v) => setBgProp(bg, i, 'repeat', v === 'repeat')} /></label>
            <label title={ta('tip.bg.galleryPlace')}>{ta('lbl.galleryPlace')}
              <Dropdown value={fixedSeed ? 'fixed' : 'random'}
                options={[['random', ta('opt.galleryPlace.random')], ['fixed', ta('opt.galleryPlace.fixed')]]}
                onchange={(v) => setBgProp(bg, i, 'seed', v === 'fixed' ? newSeed() : 0)} /></label>
            {#if fixedSeed}
              <button type="button" class="ghost action" title={ta('tip.bg.photoSeed')}
                onclick={() => setBgProp(bg, i, 'seed', newSeed())}>
                {@html ICONS.shuffle} {ta('ui.shufflePhotos')}
              </button>
            {/if}
          {/if}
          <label title={ta('tip.bg.photoSize')}>{ta('lbl.size')}
            <span class="gridmenu-value">{frameSize(gp.size, gstyle)} px</span></label>
          <input type="range" min="60" max="400" step="2" value={frameSize(gp.size, gstyle)}
            oninput={(e) => setBgProp(bg, i, 'size', Number(e.target.value))} />
          {#if gstyle === 'floating'}
            <label title={ta('tip.bg.photoSpread')}>{ta('lbl.photoSpread')}
              <span class="gridmenu-value">{Math.round((gp.spread ?? 0.85) * 100)}%</span></label>
            <input type="range" min="0" max="1" step="0.01" value={gp.spread ?? 0.85}
              oninput={(e) => setBgProp(bg, i, 'spread', Number(e.target.value))} />
            <label title={ta('tip.bg.photoTilt')}>{ta('lbl.photoTilt')}
              <span class="gridmenu-value">{gp.tilt ?? 5}°</span></label>
            <input type="range" min="0" max="15" step="1" value={gp.tilt ?? 5}
              oninput={(e) => setBgProp(bg, i, 'tilt', Number(e.target.value))} />
          {/if}
          <label title={ta('tip.bg.galleryShape')}>{ta('lbl.galleryShape')}
            <Dropdown value={gp.shape ?? 'rect'}
              options={GALLERY_SHAPES.map((sh) => [sh, ta(`opt.galleryShape.${sh}`)])}
              onchange={(v) => setBgProp(bg, i, 'shape', v)} /></label>
          <label title={ta('tip.bg.galleryLook')}>{ta('lbl.galleryLook')}
            <Dropdown value={gp.look ?? 'shadow'}
              options={GALLERY_LOOKS.map((lk) => [lk, ta(`opt.galleryLook.${lk}`)])}
              onchange={(v) => setBgProp(bg, i, 'look', v)} /></label>
          {#if colouredLook(gp.look)}
            <label title={ta('tip.bg.frameColor')}>{ta('lbl.frameColor')}
              <ColorPicker value={frameColor(gp.look, gp.frameColor)} tokens={themeSwatches()} allowClear
                label={ta('tip.bg.frameColor')} onchange={(hex) => setBgProp(bg, i, 'frameColor', hex ?? '')} /></label>
          {/if}
          {#if roundable(gp.shape) && (gp.look ?? 'shadow') !== 'polaroid'}
            <label title={ta('tip.bg.photoRadius')}>{ta('lbl.rounding')}
              <span class="gridmenu-value">{gp.radius ?? 5} px</span></label>
            <input type="range" min="0" max="48" step="1" value={gp.radius ?? 5}
              oninput={(e) => setBgProp(bg, i, 'radius', Number(e.target.value))} />
          {/if}
        {/if}
        <label title={ta('tip.bg.galleryTone')}>{ta('lbl.galleryTone')}
          <Dropdown value={gp.tone ?? 'natural'}
            options={GALLERY_TONES.map((tn) => [tn, ta(`opt.galleryTone.${tn}`)])}
            onchange={(v) => setBgProp(bg, i, 'tone', v)} /></label>
        {#if motionsFor(gstyle).length > 1}
          <label title={ta('tip.bg.photoMotion')}>{ta('lbl.motion')}
            <Dropdown value={gmotion}
              options={motionsFor(gstyle).map((m) => [m, m === 'none' ? ta('common.none') : ta(`opt.galleryMotion.${m}`)])}
              onchange={(v) => setBgProp(bg, i, 'motion', v)} /></label>
        {/if}
        {#if gmotion === 'crossfade' && gstyle !== 'fill'}
          <label title={ta('tip.gallery.interval')}>{ta('lbl.secondsPerImage')}
            <span class="gridmenu-value">{gp.interval ?? 12} s</span></label>
          <input type="range" min="0.5" max="90" step="0.5" value={gp.interval ?? 12}
            oninput={(e) => setBgProp(bg, i, 'interval', Number(e.target.value))} />
        {:else if gmotion !== 'none' || gstyle === 'band'}
          <label title={ta('tip.bg.motionSpeed')}>{ta('lbl.motionSpeed')}
            <span class="gridmenu-value">{gp.motionSpeed ?? 30} s</span></label>
          <input type="range" min="0.5" max="90" step="0.5" value={gp.motionSpeed ?? 30}
            oninput={(e) => setBgProp(bg, i, 'motionSpeed', Number(e.target.value))} />
        {/if}
        <label class="gridmenu-snap" title={ta('tip.bg.underNav')}>
          <input type="checkbox" checked={gp.underNav !== false}
            onchange={(e) => (e.target.checked
              ? setBgProp(bg, i, 'underNav', true)
              : setBgProps(bg, i, { underNav: false, underAnnounce: false }))} />
          {ta('lbl.underNav')}
        </label>
        {#if siteDraft.nav?.announcement?.text}
          <!-- The strip sits above the menu: behind the strip means behind the menu too. -->
          <label class="gridmenu-snap" class:muted={gp.underNav === false} title={ta('tip.bg.underAnnounce')}>
            <input type="checkbox" checked={gp.underAnnounce === true} disabled={gp.underNav === false}
              onchange={(e) => (e.target.checked
                ? setBgProps(bg, i, { underAnnounce: true, underNav: true })
                : setBgProp(bg, i, 'underAnnounce', false))} />
            {ta('lbl.underAnnounce')}
          </label>
        {/if}
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((gp.opacity ?? 0.85) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={gp.opacity ?? 0.85}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
      {:else if layer.type === 'video'}
        <label class="ghost filepick" title={ta('tip.bg.videoFile')}>
          {layer.props.src ? ta('ui.changeVideo') : ta('ui.chooseVideo')}
          <input type="file" accept="video/mp4,video/webm" onchange={(e) => setBgVideo(bg, i, e)} />
        </label>
        <label class="ghost filepick" title={ta('tip.bg.poster')}>
          {layer.props.poster ? ta('ui.changeImage') : ta('ui.choosePoster')}
          <input type="file" accept="image/*" onchange={(e) => setBgPoster(bg, i, e)} />
        </label>
        <label title={ta('tip.bg.fit')}>{ta('lbl.imageFit')}
          <Dropdown value={layer.props.fit ?? 'cover'}
            options={[['cover', ta('opt.fit.cover')], ['contain', ta('opt.fit.contain')]]}
            onchange={(v) => setBgProp(bg, i, 'fit', v)} /></label>
        <label title={ta('tip.bg.videoFocus')} class="sub">{ta('lbl.horizontal')}
          <span class="gridmenu-value">{Math.round((layer.props.x ?? 0.5) * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.x ?? 0.5}
          oninput={(e) => setBgProp(bg, i, 'x', Number(e.target.value))} />
        <label title={ta('tip.bg.videoFocus')} class="sub">{ta('lbl.vertical')}
          <span class="gridmenu-value">{Math.round((layer.props.y ?? 0.5) * 100)}%</span></label>
        <input type="range" min="0" max="1" step="0.01" value={layer.props.y ?? 0.5}
          oninput={(e) => setBgProp(bg, i, 'y', Number(e.target.value))} />
        <label title={ta('tip.bg.strength')}>{ta('lbl.strength')}
          <span class="gridmenu-value">{Math.round((layer.props.opacity ?? 1) * 100)}%</span></label>
        <input type="range" min="0.05" max="1" step="0.01" value={layer.props.opacity ?? 1}
          oninput={(e) => setBgProp(bg, i, 'opacity', Number(e.target.value))} />
        <label class="gridmenu-snap" title={ta('tip.bg.parallax')}>
          <input type="checkbox" checked={(layer.props.parallax ?? 0) > 0}
            onchange={(e) => setBgProp(bg, i, 'parallax', e.target.checked ? 0.3 : 0)} />
          {ta('lbl.parallax')}
        </label>
        {#if (layer.props.parallax ?? 0) > 0}
          <label title={ta('tip.bg.parallaxStrength')}>{ta('lbl.parallaxStrength')}
            <span class="gridmenu-value">{Math.round((layer.props.parallax ?? 0) * 100)}%</span></label>
          <input type="range" min="0.1" max="1" step="0.01" value={layer.props.parallax ?? 0.3}
            oninput={(e) => setBgProp(bg, i, 'parallax', Number(e.target.value))} />
        {/if}
      {/if}
    {/if}
  </div>
{/each}
<label title={ta('tip.bg.newLayer')}>{ta('lbl.newLayer')}
  <Dropdown value={newBgType}
    options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
    onchange={(v) => (newBgType = v)} /></label>
<button class="ghost action" onclick={() => addBgLayer(bg, newBgType)}>{ta('ui.addLayer')}</button>
