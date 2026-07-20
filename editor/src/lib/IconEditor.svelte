<script>
  /**
   * Full ikon-editor for nettstedsikonet (favicon): beskjær til kvadrat, zoom,
   * fokuspunkt (dra i forhåndsvisningen), filtre (lysstyrke/kontrast/metning +
   * gråtone) og nullstill. Alt bakes til et 128px webp-ikon på «Bruk».
   *
   * Favicon-en er en RASTER-fil (vises i nettleserfanen), så justeringene kan
   * ikke ligge som CSS slik bildeblokken gjør; de tegnes inn i selve ikonet.
   * ÉN coverDraw bruker samme matematikk til både forhåndsvisning og eksport.
   */
  let { image = '', onapply, oncancel } = $props();

  const PREVIEW = 220;
  const OUTPUT = 128;

  let canvasEl = $state(null);
  let img = $state(null);
  let zoom = $state(1);
  let focusX = $state(0.5);
  let focusY = $state(0.5);
  let brightness = $state(1);
  let contrast = $state(1);
  let saturate = $state(1);

  $effect(() => {
    if (!image) return;
    const loaded = new Image();
    loaded.onload = () => { img = loaded; };
    loaded.src = image;
  });

  /** Tegner bildet «cover» i et kvadrat, med zoom, fokuspunkt og filtre. */
  function coverDraw(ctx, size) {
    ctx.clearRect(0, 0, size, size);
    if (!img) return;
    ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
    const base = Math.max(size / img.width, size / img.height);
    const scale = base * zoom;
    const w = img.width * scale;
    const h = img.height * scale;
    // Fokuspunktet i bildet legges i sentrum; klem så kvadratet alltid dekkes.
    let dx = size / 2 - focusX * w;
    let dy = size / 2 - focusY * h;
    dx = Math.min(0, Math.max(size - w, dx));
    dy = Math.min(0, Math.max(size - h, dy));
    ctx.drawImage(img, dx, dy, w, h);
    ctx.filter = 'none';
  }

  // Tegn forhåndsvisningen på nytt når noe endres (img og alle justeringene).
  $effect(() => {
    img; zoom; focusX; focusY; brightness; contrast; saturate;
    if (canvasEl) coverDraw(canvasEl.getContext('2d'), PREVIEW);
  });

  function startPan(event) {
    if (!img) return;
    event.preventDefault();
    let lastX = event.clientX;
    let lastY = event.clientY;
    const scale = Math.max(PREVIEW / img.width, PREVIEW / img.height) * zoom;
    const w = img.width * scale;
    const h = img.height * scale;
    const move = (ev) => {
      // Dra bildet: fokuspunktet flytter motsatt vei.
      focusX = Math.min(1, Math.max(0, focusX - (ev.clientX - lastX) / w));
      focusY = Math.min(1, Math.max(0, focusY - (ev.clientY - lastY) / h));
      lastX = ev.clientX;
      lastY = ev.clientY;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  function reset() {
    zoom = 1; focusX = 0.5; focusY = 0.5;
    brightness = 1; contrast = 1; saturate = 1;
  }

  function apply() {
    const out = document.createElement('canvas');
    out.width = OUTPUT;
    out.height = OUTPUT;
    coverDraw(out.getContext('2d'), OUTPUT);
    onapply?.(out.toDataURL('image/webp', 0.92));
  }
</script>

<div class="ie-overlay" role="dialog" aria-modal="true">
  <div class="ie-card">
    <h2>Rediger nettstedsikon</h2>
    <div class="ie-stage">
      <canvas bind:this={canvasEl} width={PREVIEW} height={PREVIEW}
        class="ie-canvas" onpointerdown={startPan} title="Dra for å flytte utsnittet"></canvas>
      <p class="ie-hint">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p>
    </div>

    <label class="ie-row">Zoom <span class="ie-val">{zoom.toFixed(2)}x</span></label>
    <input type="range" min="1" max="3" step="0.02" bind:value={zoom} />

    <label class="ie-row">Lysstyrke <span class="ie-val">{Math.round(brightness * 100)}%</span></label>
    <input type="range" min="0.3" max="2" step="0.02" bind:value={brightness} />
    <label class="ie-row">Kontrast <span class="ie-val">{Math.round(contrast * 100)}%</span></label>
    <input type="range" min="0.3" max="2" step="0.02" bind:value={contrast} />
    <label class="ie-row">Metning <span class="ie-val">{Math.round(saturate * 100)}%</span></label>
    <input type="range" min="0" max="2" step="0.02" bind:value={saturate} />

    <span class="ie-tools">
      <button type="button" class="ghost" onclick={() => (saturate = 0)}>Gråtone</button>
      <button type="button" class="ghost" onclick={reset}>Nullstill</button>
    </span>

    <span class="ie-actions">
      <button type="button" class="ghost" onclick={() => oncancel?.()}>Avbryt</button>
      <button type="button" class="primary" onclick={apply}>Bruk</button>
    </span>
  </div>
</div>

<style>
  .ie-overlay {
    position: fixed;
    inset: 0;
    z-index: 450;
    display: grid;
    place-items: center;
    background: rgb(0 0 0 / 55%);
  }

  .ie-card {
    display: grid;
    gap: 0.55rem;
    width: min(20rem, calc(100vw - 2rem));
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    padding: 1.2rem;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 15%);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgb(0 0 0 / 55%);
  }

  .ie-card h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .ie-stage {
    display: grid;
    justify-items: center;
    gap: 0.4rem;
  }

  .ie-canvas {
    width: 220px;
    height: 220px;
    border-radius: 10px;
    /* Sjakkbrett bak gjennomsiktige ikoner, så utsnittet er tydelig */
    background: repeating-conic-gradient(rgb(255 255 255 / 8%) 0 25%, transparent 0 50%) 0 0 / 20px 20px,
      color-mix(in srgb, var(--urd-color-text, #fff) 6%, transparent);
    cursor: grab;
    touch-action: none;
  }

  .ie-canvas:active {
    cursor: grabbing;
  }

  .ie-hint {
    margin: 0;
    font-size: 0.75rem;
    opacity: 0.6;
    text-align: center;
  }

  .ie-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.82rem;
  }

  .ie-val {
    font: 0.75rem ui-monospace, monospace;
    opacity: 0.7;
  }

  .ie-card input[type='range'] {
    width: 100%;
    accent-color: var(--urd-color-accent, #7c5cff);
  }

  .ie-tools,
  .ie-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.2rem;
  }

  .ie-actions {
    justify-content: flex-end;
  }

  .ie-card button {
    font: inherit;
    padding: 0.45em 0.9em;
    border-radius: 7px;
    cursor: pointer;
  }

  .ie-card .ghost {
    color: inherit;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 20%);
  }

  .ie-card .primary {
    color: #fff;
    background: var(--urd-color-accent, #7c5cff);
    border: 0;
  }
</style>
