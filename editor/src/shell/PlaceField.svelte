<script>
  /* An address field with the site's places to pick from (the Redirects dialog's old address and target): the field takes a typed address, and the arrow at its right end opens the places, grouped, narrowed to what the field holds, a pick written into the field.
     The list is a popover in the top layer (above the dialog), placed under the field when it opens; Escape and a press outside close it. */
  import { lingering } from '../lib/motion.svelte.js';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';

  /** places: [{ group, label, path }]; the field's own events go to oninput, onchange and onkeydown, a pick to onpick. */
  let { value = '', places = [], placeholder = '', title = '', label = '', invalid = false, warn = false, inputEl = $bindable(null), oninput, onchange, onkeydown, onpick } = $props();

  let wrapEl = $state(null);
  let popEl = $state(null);
  let open = $state(false);
  /** The places stay drawn while the closing pop-up fades out (app.css). */
  const drawn = lingering(() => open);
  /** What the field held as the list opened. */
  let query = $state('');
  const uid = `pf-${Math.random().toString(36).slice(2, 8)}`;

  /** The places the list shows: all of them, or those that match what the field held while it is not one of them. */
  const shown = $derived.by(() => {
    const text = query.trim().toLowerCase();
    if (!text || places.some((p) => p.path.toLowerCase() === text)) return places;
    const hits = places.filter((p) => p.path.toLowerCase().includes(text) || p.label.toLowerCase().includes(text));
    return hits.length ? hits : places;
  });

  /** The list under the field, at its width at least, placed as it opens. */
  function onToggle(e) {
    open = e.newState === 'open';
    if (!open || !wrapEl || !popEl) return;
    query = inputEl?.value ?? String(value ?? '');
    const rect = wrapEl.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom;
    popEl.style.left = `${Math.round(rect.left)}px`;
    popEl.style.minWidth = `${Math.round(rect.width)}px`;
    if (below < 240 && rect.top > below) {
      popEl.style.top = 'auto';
      popEl.style.bottom = `${Math.round(window.innerHeight - rect.top + 4)}px`;
    } else {
      popEl.style.bottom = 'auto';
      popEl.style.top = `${Math.round(rect.bottom + 4)}px`;
    }
  }

  function pick(place) {
    popEl?.hidePopover();
    onpick?.(place.path);
    inputEl?.focus();
  }
</script>

<span class="pf" bind:this={wrapEl}>
  <input class="rd-field pf-input" class:warn bind:this={inputEl} {value} {placeholder} {title} aria-label={label} aria-invalid={invalid ? 'true' : undefined}
    oninput={(e) => oninput?.(e.target.value)} onchange={(e) => onchange?.(e.target.value)} {onkeydown} />
  <button type="button" class="pf-caret" class:open popovertarget={uid} title={ta('tip.redirects.places')} aria-label={ta('tip.redirects.places')} aria-expanded={open} tabindex="-1">{@html ICONS.caret}</button>
</span>
<div class="pf-pop" id={uid} popover="auto" bind:this={popEl} ontoggle={onToggle}>
  {#if drawn.shown}
    {#each shown as place, i (`${place.group}:${place.path}`)}
      {#if i === 0 || shown[i - 1].group !== place.group}
        <span class="pf-group">{place.group}</span>
      {/if}
      <button type="button" class="pf-place" title={place.path} onclick={() => pick(place)}>
        <span class="pf-label">{place.label}</span>
        <span class="pf-path">{place.path}</span>
      </button>
    {:else}
      <span class="pf-none">{ta('redirects.noPlaces')}</span>
    {/each}
  {/if}
</div>

<style>
  .pf {
    position: relative;
    display: flex;
    min-width: 0;
  }

  /* An address in the panels' field look, monospaced, the arrow inside its frame at the right end */
  .pf .pf-input {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding-right: 1.9rem;
    font-family: ui-monospace, monospace;
    font-size: 0.8rem;
  }

  /* A warning: amber, the reason in the tooltip; an error is the panels' dark red (aria-invalid) */
  .pf .pf-input.warn {
    border-color: color-mix(in srgb, #d9b44a 70%, transparent);
  }

  /* The arrow inside the field's frame at its right end, centred by its box, on a faint fill of its own; the shell's button hover does not reach it, and a press (translate and scale, the press feel) keeps it in the field */
  .pf .pf-caret {
    position: absolute;
    top: 0;
    right: 0.3rem;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.55rem;
    height: 1.55rem;
    margin-block: auto;
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: rgb(255 255 255 / 9%);
    border: 0;
    border-radius: 5px;
    opacity: 0.85;
    transform: none;
  }

  .pf .pf-caret:hover,
  .pf .pf-caret.open {
    background: rgb(255 255 255 / 17%);
    border-color: transparent;
    opacity: 1;
  }

  .pf .pf-caret:active {
    transform: none;
  }

  .pf-caret :global(svg) {
    display: block;
  }

  .pf-pop {
    position: fixed;
    inset: auto;
    max-width: min(26rem, calc(100vw - 2rem));
    max-height: 18rem;
    margin: 0;
    padding: 0.3rem;
    overflow-y: auto;
    color: var(--urd-color-text, #e8eaf0);
    font-family: var(--urd-font-body, system-ui, sans-serif);
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 9px;
    box-shadow: 0 14px 34px rgb(0 0 0 / 50%);
    scrollbar-width: thin;
  }

  .pf-group {
    display: block;
    padding: 0.45rem 0.55rem 0.2rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .pf-place {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0.4rem 0.55rem;
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;
  }

  .pf-place:hover,
  .pf-place:focus-visible {
    background: rgb(255 255 255 / 7%);
    outline: none;
  }

  .pf-label {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .pf-path {
    margin-left: auto;
    font-family: ui-monospace, monospace;
    font-size: 0.76rem;
    white-space: nowrap;
    opacity: 0.6;
  }

  .pf-none {
    display: block;
    padding: 0.5rem 0.6rem;
    font-size: 0.82rem;
    opacity: 0.6;
  }
</style>
