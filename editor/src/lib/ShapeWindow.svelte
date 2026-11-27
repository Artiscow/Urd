<script>
  /* The shape window (ADR-0035): the shipped shapes, the «Custom» sliders and the drawn points.
     Each change goes to `onchange` with its undo step. */
  import { ta } from '$engine/i18n.js';
  import { shapeOf, shapeOutline, outlinePath, outlineMiddle, shapeToPoints, shapeLimits, shapeId, SHAPES, SHAPE_BLANK, SHAPE_SIDES, SHAPE_CORNERS, SHAPE_WAVES, SHAPE_RANGES, SHAPE_POINTS } from '$engine/shape-model.js';
  import { fadingDialog, dialogOut } from './motion.svelte.js';
  import { ICONS } from './icons.js';
  import SliderRow from './rows/SliderRow.svelte';
  import SwitchRow from './rows/SwitchRow.svelte';
  import SubHeading from './rows/SubHeading.svelte';
  import Choice from './Choice.svelte';

  /** `sizes` are the sizes in px the shape is shown at under the preview; `step` names the undo steps (`edit:<step>-…` for a run). */
  let { shape, sizes = [], step = 'shape', onchange, onclose } = $props();

  let dialogEl = $state(null);
  let doneEl = $state(null);
  /** Counts the presses, so each drag is an undo step of its own. */
  let press = 0;
  let svgEl = $state(null);
  let downOnBackdrop = false;
  /** The drawn point in hand, whether its corner's settings go to every point, and whether the two halves follow each other. */
  let sel = $state(0);
  let all = $state(false);
  let mirror = $state(true);

  const drawing = $derived(Boolean(shape.points));
  const outline = $derived(shapeOutline(shape));
  const path = $derived(outlinePath(outline));
  const mark = $derived(shape.icon ?? outlineMiddle(outline));
  const limits = $derived(shapeLimits(shape));
  const chosen = $derived(shapeId(shape));
  const point = $derived(shape.points?.[Math.min(sel, shape.points.length - 1)] ?? null);

  // The window opens with «Done» in focus, never a removal.
  $effect(() => {
    if (dialogEl && !dialogEl.open) {
      dialogEl.showModal();
      doneEl?.focus();
    }
  });

  const ARROW = 'M50 63.5 V36.5 M39 47.5 L50 36.5 L61 47.5';
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const signed = (v) => (v > 0 ? `+${v}` : v < 0 ? `−${-v}` : '0');

  /** The shipped shapes' outlines, drawn once. */
  const tiles = SHAPES.map(([id, values]) => {
    const pts = shapeOutline(shapeOf(values));
    return { id, values, d: outlinePath(pts), mark: outlineMiddle(pts) };
  });

  /** Custom's controls in their three groups; a control shows only where it changes something. */
  const GROUPS = [
    ['outline', 'shapeWin.outline', [
      { key: 'sides', label: 'shapeWin.sides', options: SHAPE_SIDES.map((n) => [n, n ? `${n}` : null]) },
      { key: 'square', label: 'shapeWin.square', show: (s) => !s.sides },
      { key: 'corners', label: 'shapeWin.corners', show: (s) => s.sides },
      { key: 'cornerStyle', label: 'shapeWin.cornerStyle', options: SHAPE_CORNERS.map((k) => [k, null, `shapeWin.corner.${k}`]), show: (s) => s.sides && s.corners },
      { key: 'bulge', label: 'shapeWin.bulge', show: (s) => s.sides, fmt: signed },
      { key: 'turn', label: 'shapeWin.turn', show: (s) => s.sides, fmt: (v) => `${v}°` },
      { key: 'stretch', label: 'shapeWin.stretch', fmt: signed },
    ]],
    ['edge', 'shapeWin.edge', [
      { key: 'waves', label: 'shapeWin.depth' },
      { key: 'count', label: 'shapeWin.count', show: (s) => s.waves },
      { key: 'sharp', label: 'shapeWin.sharp', show: (s) => s.waves },
      { key: 'waveStyle', label: 'shapeWin.waveStyle', options: SHAPE_WAVES.map((k) => [k, null, `shapeWin.wave.${k}`]), show: (s) => s.waves },
      { key: 'alt', label: 'shapeWin.alt', show: (s) => s.waves },
      { key: 'swirl', label: 'shapeWin.swirl', show: (s) => s.waves, fmt: signed },
    ]],
    ['extra', 'shapeWin.extras', [
      { key: 'point', label: 'shapeWin.point' },
      { key: 'dir', label: 'shapeWin.dir', options: [0, 1, 2, 3].map((n) => [n, null, `shapeWin.dir.${n}`]), show: (s) => s.point },
      { key: 'wobble', label: 'shapeWin.wobble' },
    ]],
  ];
  const shownIn = (g) => GROUPS.find(([id]) => id === g)[2].filter((c) => !c.show || c.show(shape)).length;
  /** The extras stand under the shorter of the two columns. */
  const extrasLeft = $derived(shownIn('outline') <= shownIn('edge'));
  const columns = $derived(extrasLeft ? [['outline', 'extra'], ['edge']] : [['outline'], ['edge', 'extra']]);
  const group = (id) => GROUPS.find(([g]) => g === id);
  const maxOf = (key) => (limits[key] !== undefined ? Math.max(limits[key], 1) : SHAPE_RANGES[key][1]);
  /** A choice's options as the kit's segment takes them: the value and its words. */
  const choices = (options) => options.map(([value, text, key]) => [value, key ? ta(key) : text ?? ta('shapeWin.round')]);
  /** A choice's value as the segment hands it back: the options' own value, a number where they are numbers. */
  const valueOf = (options, picked) => options.find(([value]) => `${value}` === `${picked}`)?.[0] ?? picked;

  const emit = (next, run = '') => onchange({ ...shape, ...next }, run ? `edit:${step}-${run}` : step);

  /** A shipped shape: its values, the mark back at the shape's middle. */
  function pick(values) {
    emit({ ...SHAPE_BLANK, ...values, points: null, icon: null });
  }
  function setValue(key, value, run = '') {
    const next = { [key]: value };
    // A square stands on its side until it is turned.
    if (key === 'sides' && value === 4 && !shape.turn) next.turn = 45;
    emit(next, run);
  }

  /** The place in the box a pointer stands at. */
  function boxPoint(e) {
    const r = svgEl.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100];
  }
  /** Follows a pointer from a press until it is let go, keeping the distance it was pressed at from what it moves (`from`). */
  function follow(e, from, move) {
    svgEl.setPointerCapture(e.pointerId);
    const [px, py] = boxPoint(e);
    const on = (ev) => { const [x, y] = boxPoint(ev); move(from[0] + x - px, from[1] + y - py); };
    const off = () => {
      svgEl.removeEventListener('pointermove', on);
      svgEl.removeEventListener('pointerup', off);
      svgEl.removeEventListener('pointercancel', off);
    };
    svgEl.addEventListener('pointermove', on);
    svgEl.addEventListener('pointerup', off);
    svgEl.addEventListener('pointercancel', off);
  }
  const ARROWS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };

  const putMark = (x, y, run) => emit({ icon: [clamp(x, 12, 88), clamp(y, 12, 88)] }, run);
  function markDown(e) {
    e.stopPropagation();
    const run = `icon-${++press}`;
    follow(e, mark, (x, y) => putMark(x, y, run));
  }
  function markKey(e) {
    const by = ARROWS[e.key];
    if (!by) return;
    e.preventDefault();
    putMark(mark[0] + by[0], mark[1] + by[1], 'icon');
  }

  /** A drawn point's partner across the middle line, found where it stands; a point on the line is its own, and a point with none has -1. */
  function partnerOf(points, i) {
    const p = points[i];
    if (Math.abs(p.x - 50) < 1.5) return i;
    let best = -1, far = Infinity;
    points.forEach((q, j) => {
      if (j === i) return;
      const d = Math.hypot(q.x - (100 - p.x), q.y - p.y);
      if (d < far) { far = d; best = j; }
    });
    return far < 12 ? best : -1;
  }
  function movePoint(i, x, y, mate, run) {
    const points = shape.points.map((p) => ({ ...p }));
    x = clamp(x, 0, 100); y = clamp(y, 0, 100);
    if (mirror && mate === i) x = 50;
    points[i].x = x; points[i].y = y;
    if (mirror && mate >= 0 && mate !== i) { points[mate].x = 100 - x; points[mate].y = y; }
    emit({ points }, run);
  }
  function pointDown(e, i) {
    sel = i;
    const mate = mirror ? partnerOf(shape.points, i) : -1;
    const run = `point-${i}-${++press}`;
    follow(e, [shape.points[i].x, shape.points[i].y], (x, y) => movePoint(i, x, y, mate, run));
  }
  function pointKey(e, i) {
    const by = ARROWS[e.key];
    if (!by) return;
    e.preventDefault();
    sel = i;
    movePoint(i, shape.points[i].x + by[0] * 2, shape.points[i].y + by[1] * 2, mirror ? partnerOf(shape.points, i) : -1, `point-${i}`);
  }
  /** A corner's setting, for the point in hand and its partner, or for every point. */
  function setCorner(change, run = '') {
    const mate = mirror ? partnerOf(shape.points, sel) : -1;
    emit({ points: shape.points.map((p, i) => (all || i === sel || i === mate ? { ...p, ...change } : { ...p })) }, run);
  }

  const P = (x, y, size = 45, style = 'round') => ({ x, y, size, style });
  const regular = (n) => Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return P(50 + Math.cos(a) * 46, 50 + Math.sin(a) * 46); });
  const square = (c) => [P(4, 4, ...c[0]), P(96, 4, ...c[1]), P(96, 96, ...c[2]), P(4, 96, ...c[3])];
  /** What a drawing can start from: a polygon, or a square whose corners make a leaf, a tab, a ticket or a bevel. */
  const STARTS = [
    ['outlineShape.hexagon', () => regular(6)],
    ['shapeWin.start.leaf', () => square([[85, 'round'], [10, 'round'], [85, 'round'], [10, 'round']])],
    ['shapeWin.start.tab', () => square([[65, 'round'], [65, 'round'], [0, 'round'], [0, 'round']])],
    ['outlineShape.ticket', () => square([[30, 'scoop'], [30, 'scoop'], [30, 'scoop'], [30, 'scoop']])],
    ['outlineShape.bevel', () => square([[38, 'cut'], [38, 'cut'], [38, 'cut'], [38, 'cut']])],
  ];
  function start(points) {
    sel = 0;
    emit({ points, icon: null });
  }
  /** A soft shape of five to eight points, the two halves alike while «Mirror» is on, every corner fully round. */
  function shuffle() {
    const n = 5 + Math.floor(Math.random() * 4);
    const pts = Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n, r = 28 + Math.random() * 18; return P(50 + Math.cos(a) * r, 50 + Math.sin(a) * r, 100); });
    if (mirror) for (let i = 1; i < n; i++) { const j = n - i; if (j > i) { pts[j].x = 100 - pts[i].x; pts[j].y = pts[i].y; } }
    // Scaled so the soft shape fills the box.
    let x0 = 100, y0 = 100, x1 = 0, y1 = 0;
    for (const p of pts) { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); }
    const s = 92 / Math.max(x1 - x0, y1 - y0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    start(pts.map((p, i) => ({ ...p, x: mirror && i === 0 ? 50 : 50 + (p.x - cx) * s, y: 50 + (p.y - cy) * s })));
  }
  /** The shape's values handed over as points, the mark kept where it stands. */
  function manual() {
    sel = 0;
    emit({ points: shapeToPoints(shape).slice(0, SHAPE_POINTS.max) });
  }
</script>

{#snippet button(d, at, px, label = undefined)}
  <svg viewBox="0 0 100 100" width={px} height={px} aria-label={label} aria-hidden={label ? undefined : 'true'}>
    <path class="sw-shape" {d} /><path class="sw-arrow" d={ARROW} transform="translate({at[0] - 50} {at[1] - 50})" />
  </svg>
{/snippet}

<dialog class="sw-overlay dx dx-large" bind:this={dialogEl} use:fadingDialog out:dialogOut|global aria-labelledby="sw-title" onclose={() => onclose?.()}
  onpointerdown={(e) => (downOnBackdrop = e.target === e.currentTarget)}
  onclick={(e) => downOnBackdrop && e.target === e.currentTarget && dialogEl.close()}>
  <div class="sw-card">
    <header class="sw-head">
      <h2 id="sw-title">{drawing ? ta('shapeWin.draw') : ta('lbl.shape')}</h2>
      {#if drawing}
        <button type="button" class="ghost action danger" onclick={() => emit({ points: null })}>{@html ICONS.bin} {ta('shapeWin.removeDrawing')}</button>
      {:else}
        <button type="button" class="ghost action" onclick={manual}>{ta('shapeWin.manual')}</button>
      {/if}
      <button type="button" class="primary" bind:this={doneEl} onclick={() => dialogEl.close()}>{ta('pic.done')}</button>
    </header>
    <div class="sw-body">
      <div class="sw-view">
        <div class="sw-stick">
          <svg class="sw-canvas" class:sw-large={drawing} viewBox="0 0 100 100" bind:this={svgEl} role="group" aria-label={ta('lbl.shape')}>
            <path class="sw-shape" d={path} />
            <g class="sw-mark" tabindex="0" role="button" aria-label={ta('shapeWin.iconMove')} transform="translate({mark[0] - 50} {mark[1] - 50})"
              onpointerdown={markDown} onkeydown={markKey}>
              <circle class="sw-mark-hit" cx="50" cy="50" r="17" /><path class="sw-arrow" d={ARROW} />
            </g>
            {#if drawing}
              {#each shape.points as p, i (i)}
                <!-- A point is pressed anywhere in a ring larger than its mark, a target of about 30 px -->
                <g class="sw-point-at" class:sel={all || i === sel} tabindex="0" role="button" aria-label={ta('shapeWin.pointN', { n: i + 1 })}
                  onpointerdown={(e) => pointDown(e, i)} onkeydown={(e) => pointKey(e, i)} onfocus={() => (sel = i)}>
                  <circle class="sw-hit" cx={p.x} cy={p.y} r="5.5" /><circle class="sw-handle" cx={p.x} cy={p.y} r="2.8" />
                </g>
              {/each}
            {/if}
          </svg>
          {#if shape.icon}
            <button type="button" class="ghost action" onclick={() => emit({ icon: null })}>{ta('shapeWin.centre')}</button>
          {/if}
          {#if sizes.length}
            <div class="sw-sizes">
              {#each sizes as px (px)}
                <span class="sw-size">{@render button(path, mark, px, `${px} px`)}{px} px</span>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <div class="sw-tools">
        {#if drawing}
          <div class="sw-row"><span>{ta('shapeWin.startFrom')}</span>
            <span class="sw-starts">
              {#each STARTS as [key, make] (key)}<button type="button" class="ghost action" onclick={() => start(make())}>{ta(key)}</button>{/each}
              <button type="button" class="ghost action" onclick={shuffle}>{@html ICONS.shuffle}{ta('shapeWin.shuffle')}</button>
            </span>
          </div>
          <SwitchRow label={ta('shapeWin.mirror')} checked={mirror} onchange={(on) => (mirror = on)} />
          {#if point}
            <div class="sw-point">
              <SubHeading text={all ? ta('shapeWin.everyPoint') : ta('shapeWin.pointOf', { n: Math.min(sel, shape.points.length - 1) + 1, total: shape.points.length })} />
              <SwitchRow label={ta('shapeWin.allAlike')} checked={all} onchange={(on) => { all = on; if (on) setCorner({ size: point.size, style: point.style }); }} />
              <SliderRow inline label={ta('shapeWin.cornerSize')} value={point.size} min={0} max={100} oninput={(v) => setCorner({ size: v }, all ? 'corner-all' : `corner-${sel}`)} />
              <div class="sw-row"><span>{ta('shapeWin.cornerStyle')}</span>
                <Choice fill label={ta('shapeWin.cornerStyle')} value={point.style} options={SHAPE_CORNERS.map((k) => [k, ta(`shapeWin.corner.${k}`)])} onchange={(k) => setCorner({ style: k })} />
              </div>
            </div>
          {/if}
        {:else}
          <SubHeading text={ta('shapeWin.shapes')} />
          <div class="sw-tiles">
            {#each tiles as tile (tile.id)}
              <button type="button" class="sw-tile" class:on={chosen === tile.id} aria-pressed={chosen === tile.id} onclick={() => pick(tile.values)}>
                {@render button(tile.d, tile.mark, 34)}{ta(`outlineShape.${tile.id}`)}
              </button>
            {/each}
          </div>
          <SubHeading text={ta('shapeWin.custom')} />
          <div class="sw-groups">
            {#each columns as column (column[0])}
              <div class="sw-col">
                {#each column as id (id)}
                  {@const [, name, controls] = group(id)}
                  <div class="sw-group">
                    <SubHeading text={ta(name)} />
                    {#each controls as c (c.key)}
                      {#if !c.show || c.show(shape)}
                        {#if c.options}
                          <div class="sw-row"><span>{ta(c.label)}</span>
                            <Choice fill label={ta(c.label)} value={shape[c.key]} options={choices(c.options)} onchange={(v) => setValue(c.key, valueOf(c.options, v))} />
                          </div>
                        {:else}
                          <SliderRow inline label={ta(c.label)} value={shape[c.key]} min={SHAPE_RANGES[c.key][0]} max={maxOf(c.key)}
                            shown={c.fmt ? c.fmt(shape[c.key]) : `${shape[c.key]}`} oninput={(v) => setValue(c.key, v, c.key)} />
                        {/if}
                      {/if}
                    {/each}
                    {#if id === 'extra' && shape.wobble}
                      <div class="sw-row"><span></span>
                        <button type="button" class="ghost action sw-own" onclick={() => setValue('seed', 1 + Math.floor(Math.random() * 9999))}>{ta('shapeWin.randomise')}</button>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</dialog>

<style>
  .sw-overlay {
    position: fixed;
    inset: 0;
    box-sizing: border-box;
    width: 100vw;
    max-width: none;
    height: 100vh;
    max-height: none;
    margin: 0;
    padding: 1rem;
    color: var(--urd-color-text, #e8eaf0);
    font-family: var(--urd-font-body, system-ui, sans-serif);
    background: transparent;
    border: 0;
  }

  .sw-overlay[open] {
    display: grid;
    place-items: center;
  }

  .sw-overlay::backdrop {
    background: rgb(0 0 0 / 60%);
  }

  .sw-card {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    width: min(1060px, 100%);
    max-height: 100%;
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 14px;
    box-shadow: 0 30px 80px rgb(0 0 0 / 55%);
  }

  .sw-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    padding: 0.7rem 1rem;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
  }

  .sw-head h2 {
    margin: 0 auto 0 0;
    font-size: 1rem;
  }

  /* The preview on the darker dotted ground at the left, the tools in their own scroll at the right; one under the other in a narrow window */
  .sw-body {
    display: grid;
    grid-template-columns: minmax(0, 310px) minmax(0, 1fr);
    min-height: 0;
    overflow-y: auto;
  }

  @media (max-width: 760px) {
    .sw-body {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .sw-view {
    padding: 1.1rem;
    background: rgb(0 0 0 / 28%) radial-gradient(rgb(255 255 255 / 7%) 1px, transparent 1px) 0 0 / 14px 14px;
  }

  .sw-stick {
    position: sticky;
    top: 1.1rem;
    display: grid;
    gap: 1rem;
    justify-items: center;
  }

  .sw-canvas {
    width: 220px;
    max-width: 100%;
    height: auto;
    aspect-ratio: 1;
    overflow: visible;
    touch-action: none;
  }

  .sw-canvas.sw-large {
    width: 270px;
  }

  .sw-shape {
    fill: color-mix(in srgb, var(--urd-color-accent, #2ec4a6) 85%, black);
  }

  .sw-arrow {
    fill: none;
    stroke: #fff;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* The mark is dragged: a dashed ring shows what moves */
  .sw-mark {
    cursor: move;
    outline: none;
  }

  .sw-mark-hit {
    fill: transparent;
    stroke: rgb(255 255 255 / 38%);
    stroke-width: 0.8;
    stroke-dasharray: 2 2;
  }

  .sw-mark:focus .sw-mark-hit {
    stroke: #fff;
  }

  .sw-point-at {
    cursor: grab;
    outline: none;
  }

  .sw-hit {
    fill: transparent;
  }

  .sw-handle {
    fill: var(--urd-color-surface, #151a23);
    stroke: var(--urd-color-accent, #2ec4a6);
    stroke-width: 1.6;
  }

  .sw-point-at.sel .sw-handle {
    fill: var(--urd-color-accent, #2ec4a6);
  }

  .sw-point-at:focus-visible .sw-handle {
    stroke: #fff;
    stroke-width: 2.2;
  }

  @media (hover: hover) {
    .sw-mark:hover .sw-mark-hit {
      stroke: #fff;
    }
  }

  .sw-sizes {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    gap: 6px;
  }

  .sw-size {
    display: grid;
    justify-items: center;
    gap: 4px;
    font: 400 0.68rem / 1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    opacity: 0.65;
  }

  .sw-tools {
    display: grid;
    gap: 0.8rem;
    align-content: start;
    min-width: 0;
    padding: 0.9rem 1rem 1rem;
    font-size: 0.85rem;
  }

  .sw-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(62px, 1fr));
    gap: 5px;
  }

  .sw-tile {
    display: grid;
    justify-items: center;
    gap: 3px;
    min-height: 0;
    padding: 7px 2px 5px;
    color: inherit;
    font: 600 0.66rem / 1.15 inherit;
    text-align: center;
    background: rgb(255 255 255 / 6%);
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
  }

  .sw-tile.on {
    border-color: var(--urd-color-accent, #2ec4a6);
  }

  .sw-tile:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 1px;
  }

  @media (hover: hover) {
    .sw-tile:hover {
      border-color: rgb(255 255 255 / 25%);
    }
  }

  /* Custom's groups in two columns; each row's name has one width (--row-name), so every control starts on one line */
  .sw-groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: 0.9rem 1.2rem;
    align-items: start;
  }

  .sw-col {
    display: grid;
    gap: 0.9rem;
    align-content: start;
    min-width: 0;
  }

  .sw-group,
  .sw-point {
    display: grid;
    gap: 7px;
    align-content: start;
  }

  .sw-row {
    display: grid;
    grid-template-columns: var(--row-name, 6.4em) minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    min-height: 26px;
  }

  /* A choice of many keeps to its column: its buttons share the width and give up their side room first */
  .sw-row :global(.choice-seg button) {
    min-width: 0;
    padding-inline: 2px;
  }

  .sw-own {
    justify-self: start;
  }

  .sw-starts {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .sw-point {
    padding: 0.6rem 0.75rem;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
  }
</style>
