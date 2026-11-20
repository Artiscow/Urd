<script>
  /* The set maker (BACKLOG 0.7.9.3), standing in the colour picker's Palette tab while «+ New set» has it open: the way chosen by name beside the way back, the ten ways as tiles in two rows (each a drawing over a short word, its full name and what it does in its tooltip), the way's controls under them, a preview of the set and «Make the set»; it opens on the shades of the colour in use.
     From a colour: its shades, the colours that match it, the steps to a second colour, and the colours readable as text on it. From pictures: a picture of one's own, read here and never sent, or one the site's pages already hold. From elsewhere: the codes in a pasted text or palette link, one of Urd's ready-made sets with its colours named in the admin's language, or the colours the pages use now. And a shuffle of five colours that keeps the ones locked.
     The colours are worked out by lib/colour-ways.js; the colour a way starts from is chosen in a colour picker of its own, which picks from the sets but makes none; the picker makes the set and opens it (ColorPicker.svelte). What a control does that its words do not say stands in its tooltip; only what the way has nothing to show for stands as a line. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS, CAP_ICONS } from './icons.js';
  import ColorPicker from './ColorPicker.svelte';
  import { shades, matches, blend, readable, mainColours, codesIn, shuffle, nameFromPicture, READY_SETS, SHADE_KINDS, SHADE_COUNTS, MATCH_KINDS, READ_LEVELS, PICTURE_COUNTS } from './colour-ways.js';
  import { colourCode } from './colour-sets.js';

  /** `inUse` is the picker's colour, the start of the ways from a colour; `onmake` takes the set's name and colours; `onclose` goes back to the palette. */
  let { inUse = '#000000', onmake, onclose } = $props();
  const ed = getContext('urd-editor');

  const svg = (inner) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  /** The ways, from a colour first, then from pictures, from elsewhere, and the shuffle. */
  const WAYS = ['shades', 'match', 'blend', 'read', 'picture', 'sitePictures', 'codes', 'ready', 'siteColours', 'shuffle'];
  const LOCK = svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>');
  const UNLOCK = svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 017.5-2"/>');
  const BACK = svg('<path d="M15 6l-6 6 6 6"/>');
  /** Each way's drawing on its tile: the steps of a colour, two colours across a wheel, two colours overlapping, letters, a picture, a picture on a page, a code's #, a ready-made star, the site's palette and the shuffle. */
  const WAY_ICONS = {
    shades: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M9 5v14" /><path d="M9 5h6v14H9z" fill="currentColor" fill-opacity="0.4" stroke="none"/><path d="M15 5h4a2 2 0 012 2v10a2 2 0 01-2 2h-4z" fill="currentColor" stroke="none"/>'),
    match: svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="4" r="2.4" fill="currentColor" stroke="none"/><circle cx="12" cy="20" r="2.4" fill="currentColor" stroke="none"/>'),
    blend: svg('<circle cx="8.5" cy="12" r="5.5"/><circle cx="15.5" cy="12" r="5.5"/>'),
    read: CAP_ICONS.type,
    picture: ICONS.image,
    sitePictures: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18"/><circle cx="8.5" cy="12.5" r="1.4"/><path d="M5 19l4.5-4 3 2.5 3-2 3.5 3"/>'),
    codes: svg('<path d="M9 4L7 20M17 4l-2 16M4 9h16M3 15h16"/>'),
    ready: svg('<path d="M12 3l2.6 5.4 6 .9-4.3 4.2 1 6L12 16.7 6.7 19.5l1-6L3.4 9.3l6-.9z"/>'),
    siteColours: CAP_ICONS.palette,
    shuffle: ICONS.shuffle,
  };

  const plain = (code) => colourCode(code)?.slice(0, 7) ?? '#000000';
  /** A colour from a picker in the maker as a code: a theme colour by its colour now, the opacity left out. */
  const codeOf = (picked) => plain(ed?.themeSwatches?.().find(([name]) => name === picked)?.[1] ?? picked);
  let way = $state(WAYS[0]);

  // The ways' own choices.
  let base = $state(plain(inUse));
  let second = $state('#ffffff');
  let shadeKind = $state(SHADE_KINDS[0]);
  let shadeCount = $state(7);
  let matchKind = $state(MATCH_KINDS[0]);
  let blendCount = $state(7);
  let level = $state(READ_LEVELS[0][1]);
  let pictureCount = $state(8);
  let picture = $state.raw(null);
  let pictureName = $state('');
  let sitePics = $state([]);
  let sitePic = $state(null);
  let codesText = $state('');
  let readyAt = $state(0);
  let siteColours = $state([]);
  let slots = $state(shuffle(Array.from({ length: 5 }, () => ({ code: '#888888', locked: false }))));

  /** The set the way gives now: its name and its colours, as the preview shows them and «Make the set» makes them. */
  const made = $derived.by(() => {
    if (way === 'shades') return { name: ta('cp.made.shades', { code: base }), colors: shades(base, shadeKind, shadeCount) };
    if (way === 'match') return { name: ta('cp.made.match', { code: base }), colors: matches(base, matchKind) };
    if (way === 'blend') return { name: ta('cp.made.blend', { from: base, to: second }), colors: blend(base, second, blendCount) };
    if (way === 'read') return { name: ta('cp.made.read', { code: base }), colors: readable(base, level), on: base };
    if (way === 'picture') return { name: pictureName || ta('cp.made.picture'), colors: picture ? mainColours(picture, pictureCount) : [] };
    if (way === 'sitePictures') return { name: nameFromPicture(sitePic) || ta('cp.made.sitePicture'), colors: picture && sitePic ? mainColours(picture, pictureCount) : [] };
    if (way === 'codes') return { name: ta('cp.made.codes'), colors: codesIn(codesText) };
    if (way === 'ready') {
      const [id, list] = READY_SETS[readyAt];
      return { name: ta(`cp.ready.${id}`), colors: list.map(([key, code]) => ({ code, name: ta(`cp.readyColour.${key}`) })) };
    }
    if (way === 'siteColours') return { name: ta('cp.made.siteColours'), colors: siteColours.map(({ code }) => ({ code })) };
    if (way === 'shuffle') return { name: ta('cp.made.shuffle'), colors: slots.map(({ code }) => ({ code })) };
    return { name: '', colors: [] };
  });

  /** A way chosen: what it reads from the site is read now. */
  function choose(id) {
    way = id;
    reading += 1;
    picture = null;
    pictureName = '';
    sitePic = null;
    if (id === 'sitePictures') ed?.readSitePictures?.().then((list) => { sitePics = list; }).catch(() => { sitePics = []; });
    if (id === 'siteColours') ed?.readSiteColours?.().then((list) => { siteColours = list; }).catch(() => { siteColours = []; });
  }

  /** A colour typed: kept where it is a code, else the field shows the one held. */
  function typed(event, held, set) {
    const code = colourCode(event.currentTarget.value);
    if (code) set(code.slice(0, 7));
    event.currentTarget.value = code ? code.slice(0, 7) : held;
  }

  /** A picture's pixels, read in this browser at a small size: the file stays here, read through an address of its own (a blob), and nothing is sent. */
  /** Counts the reads begun, so a read finished after a later one began, or after the way changed, is dropped (`after` still runs). */
  let reading = 0;
  function readPicture(src, done, after = () => {}) {
    const ticket = ++reading;
    const finish = (pixels) => {
      after();
      if (ticket === reading) done(pixels);
    };
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 80;
      canvas.height = 80;
      const g = canvas.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0, 80, 80);
      try {
        finish(g.getImageData(0, 0, 80, 80).data);
      } catch {
        finish(null);
      }
    };
    img.onerror = () => finish(null);
    img.src = src;
  }

  function onFile(event) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    readPicture(src, (pixels) => {
      picture = pixels;
      pictureName = nameFromPicture(file.name);
    }, () => URL.revokeObjectURL(src));
  }

  function pickSitePicture(src) {
    sitePic = src;
    readPicture(src, (pixels) => { picture = pixels; });
  }

  function make() {
    if (made.colors.length) onmake?.({ name: made.name, colors: made.colors });
  }
</script>

<div class="sm">
  <!-- Back to the palette, and the way chosen by its full name -->
  <div class="sm-row">
    <button type="button" class="sm-back" title={ta('cp.maker.back')} aria-label={ta('cp.maker.back')} onclick={onclose}>{@html BACK}</button>
    <span class="sm-name">{ta(`cp.way.${way}`)}</span>
  </div>
  <!-- The ten ways: a drawing over a short word each, its full name and what it does in its tooltip -->
  <div class="sm-ways" role="group" aria-label={ta('cp.maker.ways')}>
    {#each WAYS as id (id)}
      <button type="button" class="sm-way" aria-pressed={way === id} title={`${ta(`cp.way.${id}`)}: ${id === 'siteColours' ? ta('cp.maker.siteHint') : ta(`cp.wayAbout.${id}`)}`} onclick={() => choose(id)}>{@html WAY_ICONS[id]}<span>{ta(`cp.wayShort.${id}`)}</span></button>
    {/each}
  </div>

    {#if way === 'shades' || way === 'match' || way === 'blend' || way === 'read'}
      <!-- The colour to start from: chosen in a picker of its own, its code typed, or the picker's colour in use -->
      <div class="sm-row">
        <ColorPicker value={base} tokens={ed?.themeSwatches?.() ?? []} label={way === 'blend' ? ta('cp.maker.from') : ta('cp.maker.colour')} newSets={false} onchange={(picked) => (base = codeOf(picked))} />
        <input class="sm-field" value={base} aria-label={way === 'blend' ? ta('cp.maker.from') : ta('cp.maker.colour')} spellcheck="false" onchange={(e) => typed(e, base, (c) => (base = c))} />
        <button type="button" class="sm-btn sm-btn-small" title={ta('tip.cp.maker.inUse')} onclick={() => (base = plain(inUse))}>{ta('cp.maker.inUse')}</button>
      </div>
    {/if}
    {#if way === 'blend'}
      <div class="sm-row">
        <ColorPicker value={second} tokens={ed?.themeSwatches?.() ?? []} label={ta('cp.maker.to')} newSets={false} onchange={(picked) => (second = codeOf(picked))} />
        <input class="sm-field" value={second} aria-label={ta('cp.maker.to')} spellcheck="false" onchange={(e) => typed(e, second, (c) => (second = c))} />
        <button type="button" class="sm-btn sm-btn-small" title={ta('tip.cp.maker.inUse')} onclick={() => (second = plain(inUse))}>{ta('cp.maker.inUse')}</button>
      </div>
    {/if}

    {#if way === 'shades'}
      <div class="sm-seg" role="group" aria-label={ta(`cp.way.${way}`)}>
        {#each SHADE_KINDS as id (id)}<button type="button" aria-pressed={shadeKind === id} onclick={() => (shadeKind = id)}>{ta(`cp.shade.${id}`)}</button>{/each}
      </div>
      <div class="sm-seg" role="group" aria-label={ta('cp.maker.count')}>
        {#each SHADE_COUNTS as n (n)}<button type="button" aria-pressed={shadeCount === n} onclick={() => (shadeCount = n)}>{n}</button>{/each}
      </div>
    {:else if way === 'match'}
      <div class="sm-seg sm-seg-three" role="group" aria-label={ta(`cp.way.${way}`)}>
        {#each MATCH_KINDS as id (id)}<button type="button" aria-pressed={matchKind === id} onclick={() => (matchKind = id)}>{ta(`cp.match.${id}`)}</button>{/each}
      </div>
    {:else if way === 'blend'}
      <div class="sm-seg" role="group" aria-label={ta('cp.maker.count')}>
        {#each SHADE_COUNTS as n (n)}<button type="button" aria-pressed={blendCount === n} onclick={() => (blendCount = n)}>{n}</button>{/each}
      </div>
    {:else if way === 'read'}
      <div class="sm-seg" role="group" aria-label={ta(`cp.way.${way}`)} title={ta('cp.maker.readHint')}>
        {#each READ_LEVELS as [id, value] (id)}<button type="button" aria-pressed={level === value} onclick={() => (level = value)}>{ta(`cp.read.${id}`)}</button>{/each}
      </div>
    {:else if way === 'picture'}
      <label class="sm-file" title={ta('cp.maker.pictureHint')}>{ta('cp.maker.choosePicture')}<input type="file" accept="image/*" onchange={onFile} /></label>
      <div class="sm-seg" role="group" aria-label={ta('cp.maker.count')}>
        {#each PICTURE_COUNTS as n (n)}<button type="button" aria-pressed={pictureCount === n} onclick={() => (pictureCount = n)}>{n}</button>{/each}
      </div>
    {:else if way === 'sitePictures'}
      {#if sitePics.length}
        <div class="sm-pics">
          {#each sitePics as src (src)}
            <button type="button" class="sm-pic" aria-pressed={sitePic === src} aria-label={nameFromPicture(src) ? ta('cp.maker.usePicture', { name: nameFromPicture(src) }) : ta('cp.maker.sitePicture')} onclick={() => pickSitePicture(src)}><img {src} alt="" /></button>
          {/each}
        </div>
        <div class="sm-seg" role="group" aria-label={ta('cp.maker.count')}>
          {#each PICTURE_COUNTS as n (n)}<button type="button" aria-pressed={pictureCount === n} onclick={() => (pictureCount = n)}>{n}</button>{/each}
        </div>
      {:else}
        <span class="sm-hint">{ta('cp.maker.noPictures')}</span>
      {/if}
    {:else if way === 'codes'}
      <textarea class="sm-text" rows="3" spellcheck="false" aria-label={ta('cp.way.codes')} title={ta('cp.maker.codesHint')} placeholder="#264653 #2a9d8f #e9c46a" bind:value={codesText}></textarea>
    {:else if way === 'ready'}
      <div class="sm-chips" role="group" aria-label={ta('cp.way.ready')}>
        {#each READY_SETS as [id], i (id)}<button type="button" class="sm-chip" aria-pressed={readyAt === i} onclick={() => (readyAt = i)}>{ta(`cp.ready.${id}`)}</button>{/each}
      </div>
    {:else if way === 'shuffle'}
      <div class="sm-slots">
        {#each slots as slot, i (i)}
          <div class="sm-slot">
            <span class="sm-slot-colour" style="background: {slot.code}" title={slot.code}></span>
            <button type="button" class="sm-lock" aria-pressed={slot.locked}
              title={slot.locked ? ta('cp.maker.letChange', { n: i + 1 }) : ta('cp.maker.keep', { n: i + 1 })}
              aria-label={slot.locked ? ta('cp.maker.letChange', { n: i + 1 }) : ta('cp.maker.keep', { n: i + 1 })}
              onclick={() => { slots[i].locked = !slots[i].locked; }}>{@html slot.locked ? LOCK : UNLOCK}</button>
          </div>
        {/each}
      </div>
      <button type="button" class="sm-btn" onclick={() => (slots = shuffle($state.snapshot(slots)))}>{@html ICONS.shuffle}<span>{ta('cp.maker.shuffle')}</span></button>
    {/if}

    <!-- The set as it will be made -->
    {#if made.colors.length}
      <div class="sm-preview" role="img" aria-label={made.name}>
        {#each made.colors as c, i (i)}
          {#if made.on}
            <span class="sm-cell sm-cell-text" style="background: {made.on}; color: {c.code}" title={c.code}>Aa</span>
          {:else}
            <span class="sm-cell" style="background: {c.code}" title={c.name ? `${c.name}: ${c.code}` : c.code}></span>
          {/if}
        {/each}
      </div>
    {:else}
      <span class="sm-hint">{ta('cp.maker.empty')}</span>
    {/if}
    <button type="button" class="sm-btn sm-make" disabled={!made.colors.length} onclick={make}>{ta('cp.maker.make')}</button>
</div>

<style>
  .sm {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 7px;
  }

  .sm-back {
    flex: none;
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    background: rgb(0 0 0 / 22%);
    color: inherit;
    cursor: pointer;
  }

  .sm-back:hover {
    border-color: rgb(255 255 255 / 40%);
  }

  .sm-back :global(svg) {
    width: 13px;
    height: 13px;
  }

  .sm-name {
    flex: 1;
    min-width: 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.25;
    overflow-wrap: break-word;
  }

  .sm-ways {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-auto-rows: 1fr;
    gap: 3px;
  }

  .sm-way {
    min-width: 0;
    display: grid;
    justify-items: center;
    align-content: start;
    gap: 3px;
    padding: 5px 1px 4px;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 6px;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 9.5px;
    font-weight: 500;
    line-height: 1.15;
    text-align: center;
    overflow-wrap: break-word;
    cursor: pointer;
  }

  .sm-way:hover {
    border-color: rgb(255 255 255 / 32%);
  }

  .sm-way :global(svg) {
    width: 15px;
    height: 15px;
    color: var(--urd-color-accent, #7c5cff);
  }

  .sm-way[aria-pressed='true'] {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .sm-row {
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
  }

  .sm-row :global(.cp-swatch) {
    flex: none;
    width: 26px;
    height: 26px;
  }

  .sm-field,
  .sm-text {
    flex: 1;
    min-width: 0;
    box-sizing: border-box;
    padding: 0 7px;
    font: 12px/1.3 ui-monospace, monospace;
    color: inherit;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
  }

  .sm-field {
    height: 26px;
  }

  .sm-text {
    padding: 6px 7px;
    resize: vertical;
  }

  .sm-seg,
  .sm-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  .sm-seg {
    padding: 2px;
    background: rgb(0 0 0 / 22%);
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 8px;
  }

  .sm-seg button {
    flex: 1 0 auto;
    min-width: 0;
    height: 22px;
    padding: 0 6px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: inherit;
    opacity: 0.72;
    font-family: inherit;
    font-size: 11px;
    cursor: pointer;
  }

  .sm-seg-three button {
    flex: 1 0 30%;
  }

  .sm-seg button[aria-pressed='true'],
  .sm-lock[aria-pressed='true'] {
    opacity: 1;
    background: var(--urd-color-accent, #7c5cff);
    color: var(--urd-color-accent-text, #fff);
  }

  .sm-chips {
    gap: 4px;
  }

  .sm-chip {
    min-height: 22px;
    padding: 2px 8px;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 11px;
    cursor: pointer;
  }

  .sm-chip[aria-pressed='true'] {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 18%, transparent);
  }

  .sm-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 26px;
    padding: 0 9px;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 6px;
    background: rgb(0 0 0 / 22%);
    color: inherit;
    font-family: inherit;
    font-size: 11.5px;
    font-weight: 500;
    cursor: pointer;
  }

  .sm-btn :global(svg) {
    width: 12px;
    height: 12px;
  }

  .sm-btn-small {
    flex: none;
    padding: 0 7px;
  }

  .sm-make {
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
    color: var(--urd-color-accent-text, #fff);
  }

  .sm-btn:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .sm-file {
    position: relative;
    display: grid;
    place-items: center;
    height: 28px;
    border: 1px dashed rgb(255 255 255 / 28%);
    border-radius: 6px;
    font-size: 11.5px;
    cursor: pointer;
  }

  .sm-file input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .sm-file:focus-within {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }

  .sm-hint {
    font-size: 10.5px;
    line-height: 1.35;
    opacity: 0.6;
  }

  .sm-pics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
  }

  .sm-pic {
    padding: 0;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 5px;
    background: rgb(0 0 0 / 22%);
    cursor: pointer;
  }

  .sm-pic img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sm-pic[aria-pressed='true'] {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 1px;
  }

  .sm-slots {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 3px;
  }

  .sm-slot {
    display: grid;
    gap: 3px;
    justify-items: center;
  }

  .sm-slot-colour {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid rgb(255 255 255 / 14%);
  }

  .sm-lock {
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 5px;
    background: rgb(0 0 0 / 22%);
    color: inherit;
    cursor: pointer;
  }

  .sm-lock :global(svg) {
    width: 11px;
    height: 11px;
  }

  .sm-preview {
    display: grid;
    grid-template-columns: repeat(13, minmax(0, 1fr));
    gap: 2px;
  }

  .sm-cell {
    aspect-ratio: 1;
    border-radius: 3px;
    border: 1px solid rgb(255 255 255 / 14%);
  }

  .sm-cell-text {
    display: grid;
    place-items: center;
    font-size: 9px;
    font-weight: 700;
  }

  :is(.sm-back, .sm-seg button, .sm-chip, .sm-btn, .sm-pic, .sm-lock):focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: 2px;
  }
</style>
