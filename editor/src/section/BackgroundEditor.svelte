<script>
  /* The background editor: the layers of a section, the nav or the footer (colour, gradient, glow, image, slideshow, video, pattern, grain), with the focal point, the sizes, the gradient stops and the shared folder. `bg` is the target (mutate, keyPrefix, keyId) and `layers` its layers. Split out of App.svelte in 0.7.26.3; the state it reads and the functions it writes through come from the editor handle. */
  import { getContext } from 'svelte';
  import ColorPicker from '../lib/ColorPicker.svelte';
  import Dropdown from '../lib/Dropdown.svelte';
  import { ta, tp, taApiError } from '$engine/i18n.js';
  import { BG_PATTERNS, PATTERN_SIZE, PATTERN_OPACITY, bgPattern } from '$engine/backgrounds/pattern.js';
  import { slideshowLayer } from '$engine/backgrounds/slideshow.js';
  import { gradientLayer, gradientRender, gradientSpeed, GRAD_SPEED_RANGE } from '$engine/backgrounds/gradient.js';
  import { lift } from '$engine/migrate.js';
  import { sortStops, pointerAt, widestGapAt, addStopAt } from '../lib/gradient-stops.js';
  import { GALLERY_STYLES, GALLERY_SHAPES, GALLERY_LOOKS, GALLERY_TONES, styleMotion, motionsFor, frameSize, roundable, colouredLook, frameColor } from '$engine/gallery-layout.js';
  import { loadFolderPhotos, parsePhotoSource } from '$engine/photo-source.js';
  import { ICONS } from '../lib/icons.js';
  import SliderRow from '../lib/rows/SliderRow.svelte';
  import SwitchRow from '../lib/rows/SwitchRow.svelte';
  import IconButton from '../lib/rows/IconButton.svelte';
  import ListEditor from '../lib/rows/ListEditor.svelte';
  import CardList from '../lib/rows/CardList.svelte';
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

  /** The icons of the layers that have no picture or colour of their own to show on their card. */
  const LAYER_ICONS = {
    glow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3.5" fill="currentColor"/><circle cx="12" cy="12" r="8" opacity="0.5"/></svg>',
    grain: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="6" cy="6" r="1.6"/><circle cx="13" cy="8" r="1.6"/><circle cx="18" cy="5" r="1.6"/><circle cx="8" cy="13" r="1.6"/><circle cx="16" cy="14" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>',
    pattern: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9h16M4 15h16M9 4v16M15 4v16"/></svg>',
    image: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 17l5-5 4 4 3-3 4 4"/></svg>',
    video: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
  };

  /** A layer's card, on its head and under the pointer while it is dragged: its colour, its gradient or its picture (or its kind's icon), its kind, and its colour or strength. */
  function layerCard(layer) {
    const def = BG_DEFS[layer.type];
    const name = def?.labelKey ? ta(def.labelKey) : (def?.label ?? layer.type);
    const p = layer.props ?? {};
    const strength = `${Math.round((p.opacity ?? def?.defaults?.().opacity ?? 1) * 100)}%`;
    if (layer.type === 'color') return { name, detail: String(p.value ?? ''), swatch: stopSwatch(p.value) };
    if (layer.type === 'gradient') return { name, detail: strength, swatch: gradPreviewCss(gradientProps(layer).stops ?? []) };
    const src = layer.type === 'image' ? p.src : layer.type === 'video' ? p.poster : layer.type === 'slideshow' ? p.images?.[0]?.src : '';
    return { name, detail: strength, src: src || '', icon: LAYER_ICONS[layer.type] ?? LAYER_ICONS.image };
  }

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

  /** Moves a layer from one place in the stack to another, as the list editor's drag and keys do; whether it stands open goes with it. */
  function moveBgLayer(bg, from, to) {
    bg.mutate(bg.keyPrefix, (t) => {
      const layers = t.background.layers;
      layers.splice(to, 0, ...layers.splice(from, 1));
    });
    const list = opened[bg.keyId];
    if (list) list.splice(to, 0, ...list.splice(from, 1));
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

  /** A stored gradient layer as the current version reads it: a layer stored at an older version is shown lifted, and lifted in place at its first edit (mutateGradient), so the editor and the engine read one shape. */
  function gradientProps(layer) {
    // The lift clones its input, so it reads a snapshot, never the state proxy.
    const lifted = lift($state.snapshot(layer), gradientLayer);
    return lifted.ok ? lifted.props : layer.props;
  }

  function mutateGradient(bg, i, key, fn) {
    bg.mutate(key, (t) => {
      const layer = t.background.layers[i];
      const lifted = lift($state.snapshot(layer), gradientLayer);
      if (lifted.ok && lifted.version !== layer.version) {
        layer.props = lifted.props;
        layer.version = lifted.version;
      }
      fn(layer.props);
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

  /** A stop's position while it is dragged or slid: one undo step per stop, the rows kept in place until the move ends. */
  function setGradAt(bg, i, si, at) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-stop${si}-at`, (p) => {
      p.stops[si] = { ...p.stops[si], at };
    });
  }

  /** The rows in position order once a move has ended (lib/gradient-stops.js). */
  function sortGradStops(bg, i) {
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-stops-sort`, (p) => {
      p.stops = sortStops(p.stops);
    });
  }

  /** The stop's own opacity as a percentage, 100 stored as no field. */
  function setGradAlpha(bg, i, si, percent) {
    const v = Math.min(100, Math.max(0, Math.round(Number(percent) || 0)));
    mutateGradient(bg, i, `edit:${bg.keyPrefix}-${bg.keyId}-${i}-stop${si}-alpha`, (p) => {
      const stop = { ...p.stops[si] };
      if (v >= 100) delete stop.alpha;
      else stop.alpha = v / 100;
      p.stops[si] = stop;
    });
  }

  /** The swatch a stop is painted with in the admin: the theme swatch for a token, else the colour itself. */
  function stopSwatch(color) {
    return themeSwatches().find(([name]) => name === color)?.[1] ?? color;
  }

  /** The gradient's colours drawn left to right on the bar, with the theme swatches for token colours. */
  function gradPreviewCss(stops) {
    const painted = stops.map((s) => ({ ...s, color: stopSwatch(s.color) }));
    return gradientRender({ kind: 'linear', angle: 90, stops: painted }).background;
  }

  /** «+ Add colour»: a stop in the middle of the widest gap, with the nearest colour. */
  function addGradStop(bg, i) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      p.stops = addStopAt(p.stops, widestGapAt(p.stops));
    });
  }

  /** A press on the bar itself adds a stop where the pointer is. */
  function addGradStopAtPointer(bg, i, event) {
    if (event.button !== 0 || event.target.closest('.grad-handle')) return;
    const at = pointerAt(event.clientX, event.currentTarget.getBoundingClientRect());
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      p.stops = addStopAt(p.stops, at);
    });
  }

  function removeGradStop(bg, i, si) {
    mutateGradient(bg, i, bg.keyPrefix, (p) => {
      if (p.stops.length > 2) p.stops.splice(si, 1);
    });
  }

  /** The handle being dragged on a bar: {layer, index} or null. */
  let handleDrag = $state(null);

  /** A handle follows the pointer along its bar; the rows are sorted into position order when it is let go. */
  function startHandleDrag(bg, event, layerI, si) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const bar = event.currentTarget.closest('.grad-preview');
    handleDrag = { layer: layerI, index: si };
    const move = (ev) => setGradAt(bg, layerI, si, pointerAt(ev.clientX, bar.getBoundingClientRect()));
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      handleDrag = null;
      sortGradStops(bg, layerI);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /** The arrow keys move a focused handle one step, ten with Shift; the rows sort when the handle loses focus, so a move past a neighbour never pulls the handle out from under the keys. */
  function handleKey(bg, event, layerI, si, at) {
    const step = event.shiftKey ? 10 : 1;
    const delta = event.key === 'ArrowRight' || event.key === 'ArrowUp' ? step : event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -step : 0;
    if (!delta) return;
    event.preventDefault();
    setGradAt(bg, layerI, si, Math.min(100, Math.max(0, at + delta)));
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
      const img = await compressOrTrim(file, 'background');
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
      const img = await compressOrTrim(file, 'background');
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
    const { images, failed } = await compressMany(files, 'background');
    if (images.length) {
      bg.mutate(bg.keyPrefix, (t) => {
        const props = t.background.layers[i].props;
        props.images ??= [];
        props.images.push(...images.map(({ src }) => ({ src, x: 0.5, y: 0.5 })));
      });
    }
    reportUpload(images.length, failed);
  }

  /** Moves a slide from one place to another, as the list editor's drag and keys do. */
  function moveBgGalleryImage(bg, i, from, to) {
    bg.mutate(bg.keyPrefix, (t) => {
      const arr = t.background.layers[i].props.images;
      arr.splice(to, 0, ...arr.splice(from, 1));
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

  /** The image editor on an image layer's picture (its look and adjustments) or a slideshow picture (its focus point), read and written through this background. */
  function editBgPicture(bg, i, j = null) {
    const read = () => {
      const props = $state.snapshot(layers[i]?.props);
      return j === null ? props ?? null : props?.images?.[j] ?? null;
    };
    const mutate = (key, fn) => bg.mutate(key, (t) => {
      const props = t.background.layers[i].props;
      fn(j === null ? props : props.images[j]);
    });
    ed.openPicture({ kind: j === null ? 'layer' : 'slide', place: { read, mutate } });
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
    <ListEditor items={layer.props.images ?? []} label={ta('group.images')} key={(img, j) => j} card={(img) => ({ name: img.alt ?? '', src: img.src })}
      onmove={(from, to) => moveBgGalleryImage(bg, i, from, to)} onremove={(j) => removeBgGalleryImage(bg, i, j)}>
      {#snippet row(img, j)}
      <div class="bg-slide">
      <span class="toolbar-row">
        <img class="site-icon-preview" src={img.src} alt="" />
        <IconButton icon={ICONS.pencil} label={ta('tip.bg.editSlide')} onclick={() => editBgPicture(bg, i, j)} />
      </span>
      <SliderRow label={ta('lbl.focusX')} title={ta('tip.image.focusX')} value={img.x ?? 0.5} min={0} max={1} step={0.01}
        shown={`${Math.round((img.x ?? 0.5) * 100)}%`} oninput={(v) => setBgGalleryImageProp(bg, i, j, 'x', v)} />
      <SliderRow label={ta('lbl.focusY')} title={ta('tip.image.focusY')} value={img.y ?? 0.5} min={0} max={1} step={0.01}
        shown={`${Math.round((img.y ?? 0.5) * 100)}%`} oninput={(v) => setBgGalleryImageProp(bg, i, j, 'y', v)} />
      </div>
      {/snippet}
    </ListEditor>
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
    <SliderRow label={ta('lbl.motionSpeed')} title={ta('tip.bg.motionSpeed')} value={layer.props.motionSpeed ?? 20} min={6} max={60} step={1}
      shown={`${layer.props.motionSpeed ?? 20} s`} oninput={(v) => setBgProp(bg, i, 'motionSpeed', v)} />
  {/if}
{/snippet}

<!-- The layers in their stack (the first drawn at the back, hint.bg.order), as cards like the Nav tab's items: a press on a card's head opens its settings, and the head is pressed, held and dragged, or moved with Alt and the arrows, to change the order -->
<CardList items={layers} label={ta('lbl.background')} key={(layer) => layer} card={layerCard} {isOpen} ontoggle={toggleLayer}
  onmove={(from, to) => moveBgLayer(bg, from, to)} onremove={(i) => removeBgLayer(bg, i)}>
  {#snippet body(layer, i)}
    <label title={ta('tip.bg.changeType')}>{ta('lbl.layerType')}
      <Dropdown value={layer.type} title={ta('tip.bg.changeType')}
        options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
        onchange={(v) => changeBgLayerType(bg, i, v)} /></label>
    {#if layer.type === 'color'}
      <label title={ta('tip.bg.layerColor')}>{ta('lbl.color')}
        <ColorPicker value={layer.props.value} tokens={themeSwatches()}
          label={ta('tip.bg.layerColor')} onchange={(hex) => setBgProp(bg, i, 'value', hex)} /></label>
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={layer.props.opacity ?? 1} min={0.05} max={1} step={0.01}
        shown={`${Math.round((layer.props.opacity ?? 1) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'opacity', v)} />
    {:else if layer.type === 'gradient'}
      {@const g = gradientProps(layer)}
      <label title={ta('tip.bg.gradKind')}>{ta('blocks.shape')}
        <Dropdown value={g.kind ?? 'linear'}
          options={[['linear', ta('opt.grad.linear')], ['radial', ta('opt.grad.radial')]]}
          onchange={(v) => setGradKind(bg, i, v)} /></label>
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="grad-preview" title={ta('tip.bg.gradPreview')} style="background: {gradPreviewCss(g.stops)}"
        onpointerdown={(e) => addGradStopAtPointer(bg, i, e)}>
        {#each g.stops as stop, si (si)}
          <button type="button" class="grad-handle" class:dragging={handleDrag?.layer === i && handleDrag.index === si}
            style="left: {stop.at ?? 0}%; background: {stopSwatch(stop.color)}"
            title={ta('tip.bg.gradHandle')} aria-label={`${ta('tip.bg.stopColor')} ${si + 1}: ${stop.at ?? 0}%`}
            onpointerdown={(e) => startHandleDrag(bg, e, i, si)}
            onkeydown={(e) => handleKey(bg, e, i, si, Number(stop.at) || 0)}
            onblur={() => sortGradStops(bg, i)}></button>
        {/each}
      </div>
      {#each g.stops as stop, si (si)}
        <span class="nav-line grad-stop">
          <ColorPicker value={stop.color} tokens={themeSwatches()}
            label={ta('tip.bg.stopColor')} onchange={(hex) => setGradStop(bg, i, si, { color: hex })} />
          <SliderRow compact label={ta('tip.bg.stopAt')} title={ta('tip.bg.stopAt')} value={stop.at ?? 0} min={0} max={100} step={1}
            shown={`${Math.round(Number(stop.at) || 0)}%`} oninput={(v) => setGradAt(bg, i, si, v)} onchange={() => sortGradStops(bg, i)} />
          <input type="number" class="grad-alpha" min="0" max="100" step="5" value={Math.round((stop.alpha ?? 1) * 100)}
            title={ta('tip.bg.stopAlpha')}
            onchange={(e) => setGradAlpha(bg, i, si, e.target.value)} />
          {#if g.stops.length > 2}
            <IconButton icon={ICONS.bin} danger label={ta('tip.bg.removeStop')} onclick={() => removeGradStop(bg, i, si)} />
          {/if}
        </span>
      {/each}
      <button class="ghost action" title={ta('tip.bg.addStop')}
        onclick={() => addGradStop(bg, i)}>{ta('ui.addStop')}</button>
      {#if (g.kind ?? 'linear') === 'radial'}
        <SliderRow label={ta('lbl.centerX')} title={ta('tip.bg.centerX')} value={g.x ?? 0.5} min={0} max={1} step={0.01}
          shown={`${Math.round((g.x ?? 0.5) * 100)}%`} oninput={(v) => setGradProp(bg, i, 'x', v)} />
        <SliderRow label={ta('lbl.centerY')} title={ta('tip.bg.centerY')} value={g.y ?? 0.5} min={0} max={1} step={0.01}
          shown={`${Math.round((g.y ?? 0.5) * 100)}%`} oninput={(v) => setGradProp(bg, i, 'y', v)} />
      {:else}
        <SliderRow label={ta('lbl.angle')} title={ta('tip.bg.angle')} value={g.angle} min={0} max={360} step={5}
          shown={`${g.angle}°`} oninput={(v) => setGradProp(bg, i, 'angle', v)} />
      {/if}
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={g.opacity ?? 1} min={0.05} max={1} step={0.01}
        shown={`${Math.round((g.opacity ?? 1) * 100)}%`} oninput={(v) => setGradProp(bg, i, 'opacity', v)} />
      <label title={ta('tip.bg.motion')}>{ta('lbl.motion')}
        <Dropdown value={g.animation ?? 'none'}
          options={GRAD_ANIMATIONS[(g.kind ?? 'linear') === 'radial' ? 'radial' : 'linear']}
          onchange={(v) => setGradProp(bg, i, 'animation', v)} /></label>
      {#if (g.animation ?? 'none') !== 'none'}
        <SliderRow label={ta('lbl.motionSpeed')} title={ta('tip.bg.motionSpeed')} value={gradientSpeed(g, g.animation)} min={GRAD_SPEED_RANGE.min} max={GRAD_SPEED_RANGE.max} step={1}
          shown={`${gradientSpeed(g, g.animation)} s`} oninput={(v) => setGradProp(bg, i, 'speed', v)} />
      {/if}
    {:else if layer.type === 'glow'}
      <label title={ta('tip.bg.glowColor')}>{ta('lbl.color')}
        <ColorPicker value={layer.props.color} tokens={themeSwatches()}
          label={ta('tip.bg.glowColor')} onchange={(hex) => setBgProp(bg, i, 'color', hex)} /></label>
      <SliderRow label={ta('lbl.posX')} title={ta('tip.bg.glowX')} value={layer.props.x} min={0} max={1} step={0.01}
        shown={`${Math.round(layer.props.x * 100)}%`} oninput={(v) => setBgProp(bg, i, 'x', v)} />
      <SliderRow label={ta('lbl.posY')} title={ta('tip.bg.glowY')} value={layer.props.y} min={0} max={1} step={0.01}
        shown={`${Math.round(layer.props.y * 100)}%`} oninput={(v) => setBgProp(bg, i, 'y', v)} />
      <SliderRow label={ta('lbl.size')} title={ta('tip.bg.glowSize')} value={layer.props.radius} min={0.1} max={1} step={0.01}
        shown={`${Math.round(layer.props.radius * 100)}%`} oninput={(v) => setBgProp(bg, i, 'radius', v)} />
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={layer.props.opacity} min={0.05} max={1} step={0.01}
        shown={`${Math.round(layer.props.opacity * 100)}%`} oninput={(v) => setBgProp(bg, i, 'opacity', v)} />
    {:else if layer.type === 'grain'}
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={layer.props.opacity} min={0} max={1} step={0.01}
        shown={`${Math.round(layer.props.opacity * 100)}%`} oninput={(v) => setBgProp(bg, i, 'opacity', v)} />
    {:else if layer.type === 'pattern'}
      <label title={ta('tip.bg.pattern')}>{ta('lbl.bgPattern')}
        <Dropdown value={bgPattern(layer.props.pattern)}
          options={BG_PATTERNS.map((id) => [id, ta(`opt.bgPattern.${id}`)])}
          onchange={(v) => setBgProp(bg, i, 'pattern', v)} /></label>
      <label title={ta('tip.bg.patternColor')}>{ta('lbl.color')}
        <ColorPicker value={layer.props.color ?? 'text'} tokens={themeSwatches()}
          label={ta('lbl.color')} onchange={(hex) => setBgProp(bg, i, 'color', hex)} /></label>
      <SliderRow label={ta('lbl.size')} title={ta('tip.bg.patternSize')} value={layer.props.size ?? PATTERN_SIZE.dflt} min={PATTERN_SIZE.min} max={PATTERN_SIZE.max} step={2}
        shown={`${layer.props.size ?? PATTERN_SIZE.dflt} px`} oninput={(v) => setBgProp(bg, i, 'size', v)} />
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={layer.props.opacity ?? PATTERN_OPACITY} min={0} max={1} step={0.01}
        shown={`${Math.round((layer.props.opacity ?? PATTERN_OPACITY) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'opacity', v)} />
      <SliderRow label={ta('lbl.patternRotation')} title={ta('tip.bg.patternRotation')} value={layer.props.rotation ?? 0} min={0} max={180} step={5}
        shown={`${layer.props.rotation ?? 0}°`} oninput={(v) => setBgProp(bg, i, 'rotation', v)} />
      <SwitchRow label={ta('lbl.patternInvert')} title={ta('tip.bg.patternInvert')} checked={layer.props.invert === true} onchange={(on) => setBgProp(bg, i, 'invert', on)} />
    {:else if layer.type === 'image'}
      <span class="toolbar-row">
        <label class="ghost filepick tb-grow" title={ta('tip.webpAuto')}>
          {layer.props.src ? ta('ui.changeImage') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={(e) => setBgImage(bg, i, e)} />
        </label>
        {#if layer.props.src}
          <IconButton icon={ICONS.pencil} label={ta('tip.bg.editImage')} onclick={() => editBgPicture(bg, i)} />
        {/if}
      </span>
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
        <SliderRow label={ta('lbl.horizontal')} title={ta('tip.bg.position')} value={layer.props.x ?? 0.5} min={-0.5} max={1.5} step={0.01}
          shown={`${Math.round((layer.props.x ?? 0.5) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'x', v)} />
        <SliderRow label={ta('lbl.vertical')} title={ta('tip.bg.position')} value={layer.props.y ?? 0.5} min={-0.5} max={1.5} step={0.01}
          shown={`${Math.round((layer.props.y ?? 0.5) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'y', v)} />
      {/if}
      <SliderRow label={ta('lbl.blur')} title={ta('tip.bg.blur')} value={layer.props.blur ?? 0} min={0} max={20} step={1}
        shown={`${layer.props.blur ?? 0} px`} oninput={(v) => setBgProp(bg, i, 'blur', v)} />
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={layer.props.opacity ?? 1} min={0.05} max={1} step={0.01}
        shown={`${Math.round((layer.props.opacity ?? 1) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'opacity', v)} />
      {@render bgMotionRows(bg, i, layer)}
      <SwitchRow label={ta('lbl.parallax')} title={ta('tip.bg.parallax')} checked={(layer.props.parallax ?? 0) > 0} onchange={(on) => setBgProp(bg, i, 'parallax', on ? 0.3 : 0)} />
      {#if (layer.props.parallax ?? 0) > 0}
        <SliderRow label={ta('lbl.parallaxStrength')} title={ta('tip.bg.parallaxStrength')} value={layer.props.parallax ?? 0.3} min={0.1} max={1} step={0.01}
          shown={`${Math.round((layer.props.parallax ?? 0) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'parallax', v)} />
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
        <SliderRow label={ta('lbl.secondsPerImage')} title={ta('tip.gallery.interval')} value={gp.interval ?? 12} min={0.5} max={90} step={0.5}
          shown={`${gp.interval ?? 12} s`} oninput={(v) => setBgProp(bg, i, 'interval', v)} />
        <SliderRow label={ta('lbl.transition')} title={ta('tip.bg.fade')} value={gp.fade ?? 1.5} min={0} max={5} step={0.1}
          shown={`${(gp.fade ?? 1.5).toFixed(1)} s`} oninput={(v) => setBgProp(bg, i, 'fade', v)} />
        <SliderRow label={ta('lbl.blur')} title={ta('tip.bg.blur')} value={gp.blur ?? 0} min={0} max={20} step={1}
          shown={`${gp.blur ?? 0} px`} oninput={(v) => setBgProp(bg, i, 'blur', v)} />
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
        <SliderRow label={ta('lbl.size')} title={ta('tip.bg.photoSize')} value={frameSize(gp.size, gstyle)} min={60} max={400} step={2}
          shown={`${frameSize(gp.size, gstyle)} px`} oninput={(v) => setBgProp(bg, i, 'size', v)} />
        {#if gstyle === 'floating'}
          <SliderRow label={ta('lbl.photoSpread')} title={ta('tip.bg.photoSpread')} value={gp.spread ?? 0.85} min={0} max={1} step={0.01}
            shown={`${Math.round((gp.spread ?? 0.85) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'spread', v)} />
          <SliderRow label={ta('lbl.photoTilt')} title={ta('tip.bg.photoTilt')} value={gp.tilt ?? 5} min={0} max={15} step={1}
            shown={`${gp.tilt ?? 5}°`} oninput={(v) => setBgProp(bg, i, 'tilt', v)} />
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
          <SliderRow label={ta('lbl.rounding')} title={ta('tip.bg.photoRadius')} value={gp.radius ?? 5} min={0} max={48} step={1}
            shown={`${gp.radius ?? 5} px`} oninput={(v) => setBgProp(bg, i, 'radius', v)} />
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
        <SliderRow label={ta('lbl.secondsPerImage')} title={ta('tip.gallery.interval')} value={gp.interval ?? 12} min={0.5} max={90} step={0.5}
          shown={`${gp.interval ?? 12} s`} oninput={(v) => setBgProp(bg, i, 'interval', v)} />
      {:else if gmotion !== 'none' || gstyle === 'band'}
        <SliderRow label={ta('lbl.motionSpeed')} title={ta('tip.bg.motionSpeed')} value={gp.motionSpeed ?? 30} min={0.5} max={90} step={0.5}
          shown={`${gp.motionSpeed ?? 30} s`} oninput={(v) => setBgProp(bg, i, 'motionSpeed', v)} />
      {/if}
      <SwitchRow label={ta('lbl.underNav')} title={ta('tip.bg.underNav')} checked={gp.underNav !== false}
        onchange={(on) => (on ? setBgProp(bg, i, 'underNav', true) : setBgProps(bg, i, { underNav: false, underAnnounce: false }))} />
      {#if siteDraft.nav?.announcement?.text}
        <!-- The strip sits above the menu: behind the strip means behind the menu too. -->
        <SwitchRow label={ta('lbl.underAnnounce')} title={ta('tip.bg.underAnnounce')} checked={gp.underAnnounce === true} disabled={gp.underNav === false}
          onchange={(on) => (on ? setBgProps(bg, i, { underAnnounce: true, underNav: true }) : setBgProp(bg, i, 'underAnnounce', false))} />
      {/if}
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={gp.opacity ?? 0.85} min={0.05} max={1} step={0.01}
        shown={`${Math.round((gp.opacity ?? 0.85) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'opacity', v)} />
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
      <SliderRow label={ta('lbl.horizontal')} title={ta('tip.bg.videoFocus')} value={layer.props.x ?? 0.5} min={0} max={1} step={0.01}
        shown={`${Math.round((layer.props.x ?? 0.5) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'x', v)} />
      <SliderRow label={ta('lbl.vertical')} title={ta('tip.bg.videoFocus')} value={layer.props.y ?? 0.5} min={0} max={1} step={0.01}
        shown={`${Math.round((layer.props.y ?? 0.5) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'y', v)} />
      <SliderRow label={ta('lbl.strength')} title={ta('tip.bg.strength')} value={layer.props.opacity ?? 1} min={0.05} max={1} step={0.01}
        shown={`${Math.round((layer.props.opacity ?? 1) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'opacity', v)} />
      <SwitchRow label={ta('lbl.parallax')} title={ta('tip.bg.parallax')} checked={(layer.props.parallax ?? 0) > 0} onchange={(on) => setBgProp(bg, i, 'parallax', on ? 0.3 : 0)} />
      {#if (layer.props.parallax ?? 0) > 0}
        <SliderRow label={ta('lbl.parallaxStrength')} title={ta('tip.bg.parallaxStrength')} value={layer.props.parallax ?? 0.3} min={0.1} max={1} step={0.01}
          shown={`${Math.round((layer.props.parallax ?? 0) * 100)}%`} oninput={(v) => setBgProp(bg, i, 'parallax', v)} />
      {/if}
    {/if}
  {/snippet}
</CardList>
<label title={ta('tip.bg.newLayer')}>{ta('lbl.newLayer')}
  <Dropdown value={newBgType}
    options={BG_TYPES.map(([id, def]) => [id, def.labelKey ? ta(def.labelKey) : def.label])}
    onchange={(v) => (newBgType = v)} /></label>
<button class="ghost action" onclick={() => addBgLayer(bg, newBgType)}>{ta('ui.addLayer')}</button>
