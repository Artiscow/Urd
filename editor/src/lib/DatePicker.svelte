<script>
  /**
   * The themed date picker (ADR-0009): a date, or a date with a time, chosen on a drawn calendar instead of the browser's own popup, which follows the OS theme and is unreadable in the dark panels.
   * The field is a button that shows the date in the admin's language; it opens a month grid with the week in the language's order (date-grid.js), a Today row, and the hour and minute as fields when the value takes a time. The arrows walk the days, Enter picks, Escape closes.
   * Two branches, as the dropdown has them (ADR-0011 addendum, anchored.js decides): the popover anchored under the field in the top layer with light dismiss, else a fixed box placed by measuring that closes on a click outside or Escape.
   * `value` is kept as the fields keep it: `YYYY-MM-DD`, or `YYYY-MM-DDTHH:MM` with `time`.
   */
  import { ta, adminLang } from '$engine/i18n.js';
  import { nativeAnchoring, anchorName } from '$engine/anchored.js';
  import { parseDateValue, formatDateValue, weekStartFor, weekdayNames, monthName, monthGrid, shiftMonth, shiftDays, todayParts, formatDateLabel } from './date-grid.js';

  let { value = '', time = false, onchange, title = null, placeholder = null } = $props();

  const native = nativeAnchoring();
  const anchor = anchorName('urd-dp');
  const popId = anchor.slice(2);
  const lang = adminLang();
  const weekStart = weekStartFor(lang);
  const dayNames = weekdayNames(lang, weekStart);
  const today = todayParts();

  let open = $state(false);
  let rootEl = $state(null);
  let popEl = $state(null);
  let gridEl = $state(null);
  let pos = $state({ top: 0, left: 0 });
  /** The month shown, and the day the keys stand on. */
  let view = $state({ y: today.y, m: today.m });
  let cursor = $state({ ...today });

  const parsed = $derived(parseDateValue(value));
  const label = $derived(formatDateLabel(value, lang));
  const cells = $derived(monthGrid(view.y, view.m, weekStart));
  const same = (a, b) => a && b && a.y === b.y && a.m === b.m && a.d === b.d;

  /** Opening starts the grid on the value's month and day, else on today. */
  function startFromValue() {
    const start = parsed ?? today;
    view = { y: start.y, m: start.m };
    cursor = { y: start.y, m: start.m, d: start.d };
  }

  function place() {
    const r = rootEl.getBoundingClientRect();
    const height = time ? 372 : 330;
    const width = 272;
    const below = r.bottom + height + 8 <= window.innerHeight;
    pos = {
      top: below ? r.bottom + 4 : Math.max(8, r.top - height - 4),
      left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)),
    };
  }

  function toggle() {
    if (open) {
      open = false;
      return;
    }
    startFromValue();
    place();
    open = true;
  }

  function closePop() {
    if (native) popEl?.hidePopover();
    open = false;
  }

  /** A day picked: the value with the time it had, or 12:00 for a first time. */
  function pick(cell) {
    const hh = parsed?.hh ?? 12;
    const mm = parsed?.mm ?? 0;
    onchange?.(formatDateValue({ y: cell.y, m: cell.m, d: cell.d, hh, mm }, time));
    if (!time) closePop();
    else {
      cursor = { y: cell.y, m: cell.m, d: cell.d };
      view = { y: cell.y, m: cell.m };
    }
  }

  /** The hour or the minute typed: written with the date the value has, today when it has none. */
  function setTime(part, raw) {
    if (String(raw).trim() === '') return;
    const base = parsed ?? { ...today, hh: 12, mm: 0 };
    const n = Math.max(0, Math.min(part === 'hh' ? 23 : 59, Math.round(Number(raw) || 0)));
    onchange?.(formatDateValue({ ...base, [part]: n }, true));
  }

  function clear() {
    onchange?.('');
    closePop();
  }

  function moveCursor(days) {
    cursor = shiftDays(cursor, days);
    if (cursor.m !== view.m || cursor.y !== view.y) view = { y: cursor.y, m: cursor.m };
    queueMicrotask(() => gridEl?.querySelector('.dp-day.cursor')?.focus());
  }

  function onGridKey(e) {
    const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in moves) {
      e.preventDefault();
      moveCursor(moves[e.key]);
    } else if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault();
      const next = shiftMonth(view.y, view.m, e.key === 'PageUp' ? -1 : 1);
      view = next;
      cursor = { y: next.y, m: next.m, d: Math.min(cursor.d, 28) };
      queueMicrotask(() => gridEl?.querySelector('.dp-day.cursor')?.focus());
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      const dow = ((new Date(Date.UTC(cursor.y, cursor.m - 1, cursor.d)).getUTCDay() + 6) % 7) + 1;
      const offset = (dow - weekStart + 7) % 7;
      moveCursor(e.key === 'Home' ? -offset : 6 - offset);
    }
  }

  // The same closing rules as the dropdown: a click in the preview blurs the window and closes; without the popover the outside click and Escape are read here.
  $effect(() => {
    if (!open) return;
    const onBlur = () => closePop();
    window.addEventListener('blur', onBlur);
    if (native) return () => window.removeEventListener('blur', onBlur);
    const onDown = (e) => { if (rootEl && !rootEl.contains(e.target)) open = false; };
    const onKey = (e) => { if (e.key === 'Escape') open = false; };
    const onScroll = (e) => { if (rootEl && e.target instanceof Node && !rootEl.contains(e.target)) place(); };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  });
</script>

{#snippet calendar()}
  <div class="dp-head">
    <button type="button" class="dp-nav" aria-label={ta('dp.prevMonth')} title={ta('dp.prevMonth')} onclick={() => (view = shiftMonth(view.y, view.m, -1))}>
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3.5L5.5 8 10 12.5"/></svg>
    </button>
    <span class="dp-month" aria-live="polite">{monthName(view.y, view.m, lang)}</span>
    <button type="button" class="dp-nav" aria-label={ta('dp.nextMonth')} title={ta('dp.nextMonth')} onclick={() => (view = shiftMonth(view.y, view.m, 1))}>
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5L10.5 8 6 12.5"/></svg>
    </button>
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="dp-grid" role="grid" aria-label={monthName(view.y, view.m, lang)} bind:this={gridEl} onkeydown={onGridKey}>
    {#each dayNames as name (name)}
      <span class="dp-dow" role="columnheader">{name}</span>
    {/each}
    {#each cells as cell (`${cell.y}-${cell.m}-${cell.d}`)}
      <button type="button" class="dp-day" class:outside={!cell.inMonth} class:today={same(cell, today)} class:selected={same(cell, parsed)} class:cursor={same(cell, cursor)}
        role="gridcell" aria-selected={same(cell, parsed)} tabindex={same(cell, cursor) ? 0 : -1}
        aria-label={formatDateLabel(formatDateValue(cell, false), lang)}
        onclick={() => pick(cell)}>{cell.d}</button>
    {/each}
  </div>
  {#if time}
    <div class="dp-time">
      <label title={ta('dp.hour')}><span class="dp-time-label">{ta('dp.hour')}</span>
        <input type="number" min="0" max="23" value={parsed?.hh ?? ''} placeholder="12" onchange={(e) => setTime('hh', e.target.value)} /></label>
      <span class="dp-colon" aria-hidden="true">:</span>
      <label title={ta('dp.minute')}><span class="dp-time-label">{ta('dp.minute')}</span>
        <input type="number" min="0" max="59" step="5" value={parsed?.mm ?? ''} placeholder="00" onchange={(e) => setTime('mm', e.target.value)} /></label>
    </div>
  {/if}
  <div class="dp-foot">
    <button type="button" class="linkish" onclick={() => pick(today)}>{ta('dp.today')}</button>
    {#if value}<button type="button" class="linkish" onclick={clear}>{ta('dp.clear')}</button>{/if}
  </div>
{/snippet}

<span class="dp" bind:this={rootEl}>
  {#if native}
    <button type="button" class="dp-btn" class:dp-empty={!label} {title} popovertarget={popId} style="anchor-name: {anchor}" onclick={startFromValue}>
      <span class="dp-value">{label || placeholder || ta('dp.pick')}</span>
      <svg class="dp-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
    </button>
    <div class="dp-pop dp-anchored" id={popId} popover="auto" bind:this={popEl} style="position-anchor: {anchor}" ontoggle={(e) => { open = e.newState === 'open'; }}>
      {#if open}{@render calendar()}{/if}
    </div>
  {:else}
    <button type="button" class="dp-btn" class:dp-empty={!label} {title} onclick={toggle}>
      <span class="dp-value">{label || placeholder || ta('dp.pick')}</span>
      <svg class="dp-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
    </button>
    {#if open}
      <div class="dp-pop" style="top: {pos.top}px; left: {pos.left}px">{@render calendar()}</div>
    {/if}
  {/if}
</span>

<style>
  .dp {
    display: flex;
    min-width: 0;
    flex: 1;
  }

  .dp-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    font: inherit;
    color: inherit;
    text-align: left;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 6px;
    padding: 0.45em 0.6em;
    cursor: pointer;
  }

  .dp-btn.dp-empty .dp-value {
    opacity: 0.55;
  }

  .dp-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dp-icon {
    flex: 0 0 auto;
    opacity: 0.65;
  }

  .dp-pop {
    position: fixed;
    z-index: 600;
    width: 272px;
    box-sizing: border-box;
    padding: 10px;
    color: inherit;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 10px;
    box-shadow: 0 12px 36px rgb(0 0 0 / 55%);
  }

  @supports (anchor-name: --a) {
    .dp-anchored {
      inset: auto;
      margin: 4px 0 0;
      position-area: block-end span-inline-end;
    }

    .dp-anchored:not(:popover-open) {
      display: none;
    }

    @supports (position-try-fallbacks: flip-block) {
      .dp-anchored {
        position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
      }
    }
  }

  .dp-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 6px;
  }

  .dp-month {
    flex: 1;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  .dp-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    color: inherit;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 6px;
    cursor: pointer;
  }

  .dp-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 2px;
  }

  .dp-dow {
    padding: 2px 0 4px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-align: center;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .dp-day {
    height: 32px;
    padding: 0;
    font: inherit;
    font-size: 0.85rem;
    color: inherit;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
  }

  .dp-day.outside {
    opacity: 0.4;
  }

  .dp-day.today {
    border-color: color-mix(in srgb, var(--urd-color-accent) 60%, transparent);
  }

  .dp-day:hover,
  .dp-day.cursor:focus-visible {
    background: color-mix(in srgb, currentColor 10%, transparent);
    outline: none;
  }

  .dp-day.selected {
    color: var(--urd-color-bg);
    background: var(--urd-color-accent);
  }

  .dp-time {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    margin-top: 8px;
  }

  .dp-time label {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }

  .dp-time-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .dp-time input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.35em 0.5em;
    font: inherit;
    color: inherit;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 6px;
  }

  .dp-colon {
    padding-bottom: 0.45em;
    opacity: 0.6;
  }

  .dp-foot {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 8px;
    font-size: 0.8rem;
  }
</style>
