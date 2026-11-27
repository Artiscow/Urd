<script>
  /* One Urd setting's control: pictures, a dropdown, a segment, a slider or a text field; `c` is the context it writes through, `compact` the narrow column. */
  import { ta } from '$engine/i18n.js';
  import Dropdown from '../lib/Dropdown.svelte';
  import Choice from '../lib/Choice.svelte';
  import { pictured } from '../lib/settings-model.js';
  import { settingPicture } from '../lib/settings-pictures.js';
  import SliderRow from '../lib/rows/SliderRow.svelte';

  let { setting, c, pictures = 'pictures', compact = false, nameId, label = '' } = $props();
  const options = $derived(setting.options ? setting.options(c) : []);
  const value = $derived(setting.get(c));
  /* The tiles stand in one row where they fit; the panel's column takes four at most and wraps the rest. */
  const cols = $derived(compact && options.length > 5 ? 4 : options.length);
</script>

{#if pictured(setting, pictures)}
  <div class="st-tiles" class:compact style="--st-cols: {cols}" role="group" aria-labelledby={nameId}>
    {#each options as [id, word, tip] (id)}
      <button type="button" class="st-tile" class:on={value === id} aria-pressed={value === id} title={tip ?? word} onclick={() => setting.set(c, id)}>
        <span class="st-pic">{@html settingPicture(setting.look, id)}</span>
        <span class="st-tile-name">{word}</span>
      </button>
    {/each}
  </div>
{:else if setting.kind === 'choice'}
  <Dropdown {value} {options} labelledby={nameId} onchange={(v) => setting.set(c, v)} />
{:else if setting.kind === 'seg'}
  <Choice fill {label} {value} {options} onchange={(v) => setting.set(c, v)} />
{:else if setting.kind === 'range'}
  <div class="st-range"><SliderRow compact {label} {value} min={setting.min} max={setting.max} step={setting.step ?? 1} shown={setting.unit ? `${value} ${setting.unit}` : undefined}
    oninput={(v) => setting.set(c, v)} /></div>
{:else if setting.kind === 'text'}
  <input type="text" class="st-text" spellcheck="false" placeholder={setting.placeholderKey ? ta(setting.placeholderKey) : ''}
    aria-labelledby={nameId} value={value} onchange={(e) => setting.set(c, e.target.value)} />
{/if}

<style>
  /* The tiles: a row of tiles of one width, wrapping where the row is full, each a picture with its name under it, the chosen one ringed in the accent */
  .st-tiles {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    width: 100%;
  }

  /* The tile's picture starts at the top, so the pictures of a row stand level whatever the length of the names under them */
  .st-tile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.3rem;
    box-sizing: border-box;
    width: 8.25rem;
    min-width: 0;
    padding: 0.3rem;
    font: inherit;
    font-size: 0.72rem;
    line-height: 1.2;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: color-mix(in srgb, currentColor 5%, transparent);
    border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
    border-radius: 9px;
  }

  .st-tile:hover {
    border-color: color-mix(in srgb, currentColor 32%, transparent);
  }

  .st-tile.on {
    border-color: var(--urd-color-accent, #7c5cff);
    box-shadow: inset 0 0 0 1px var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 10%, transparent);
  }

  .st-pic {
    display: block;
    width: 100%;
    aspect-ratio: 64 / 40;
  }

  .st-pic :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* A name wraps onto a second line rather than running past its tile */
  .st-tile-name {
    display: block;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  /* The panel's column: the tiles share the width in a grid, the pictures alone, their names in the tooltip and beside the setting's name */
  .st-tiles.compact {
    display: grid;
    grid-template-columns: repeat(var(--st-cols, 2), minmax(0, 1fr));
  }

  .compact .st-tile {
    width: 100%;
    padding: 0.3rem;
  }

  .compact .st-tile-name {
    display: none;
  }

  /* The slider takes the row's width beside the setting's name */
  .st-range {
    width: 100%;
    min-width: 10rem;
  }

  /* In the accent, as a panel's sliders are (app.css .panel-body) */
  .st-range :global(input[type='range']) {
    width: 100%;
    accent-color: var(--urd-color-accent, #7c5cff);
  }

  /* A text field in the admin's own box: the darker ground, a faint border that turns to the accent while it has the focus */
  .st-text {
    box-sizing: border-box;
    width: 100%;
    height: 2.2rem;
    min-width: 0;
    padding: 0 0.7rem;
    font: inherit;
    font-size: 0.88rem;
    color: inherit;
    background: var(--urd-color-bg, #0f1218);
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 8px;
  }

  .st-text::placeholder {
    color: inherit;
    opacity: 0.5;
  }

  .st-text:focus {
    border-color: var(--urd-color-accent, #7c5cff);
    outline: none;
  }
</style>
