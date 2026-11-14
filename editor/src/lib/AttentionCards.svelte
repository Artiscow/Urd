<script>
  /* The phone review's cards (ADR-0019 decision 5): for each section that needs a review in the phone view, what happened on the desktop and when, with «Reviewed», drawn over the stage beside the phone, level with its section, so they cover none of the page.
     The preview reports where the sections stand (preview-edit.js reportAttention); what happened is read from the draft. Where the stage has no room beside the canvas, a card stands above its section (placeTextBar). */
  import { getContext } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { placeTextBar } from './menu-place.js';
  import { ICONS } from './icons.js';
  import { menuMotion } from './motion.svelte.js';

  const ed = getContext('urd-editor');

  /** The cards' measured heights, by section, so each is placed at its own size. */
  let heights = $state({});
  /** Counted up when the window or the stage changes size, or the stage is panned, so the cards' places are reckoned again. */
  let moved = $state(0);

  /** Relative time in the admin's language («2 hours ago»). */
  function relativeTime(iso) {
    const then = Date.parse(iso);
    if (!Number.isFinite(then)) return '';
    try {
      const rtf = new Intl.RelativeTimeFormat(adminLang(), { numeric: 'auto' });
      const mins = Math.round((Date.now() - then) / 60000);
      if (Math.abs(mins) < 60) return rtf.format(-mins, 'minute');
      const hours = Math.round(mins / 60);
      if (Math.abs(hours) < 24) return rtf.format(-hours, 'hour');
      return rtf.format(-Math.round(hours / 24), 'day');
    } catch {
      return '';
    }
  }

  /** What happened, from the section's flag: its reason in words, a reason without a translation (from a newer engine) read as the general one. */
  function reasonText(reason) {
    const key = `canvas.attention.${reason}`;
    const label = ta(key);
    return label === key ? ta('canvas.attention.fallback') : label;
  }

  /** Each card with its words and its place beside the canvas, top to bottom, a card never over the one above it. */
  const cards = $derived.by(() => {
    void moved;
    void ed.edits;
    void ed.restores;
    const frame = ed.iframeEl;
    const wrap = ed.frameWrapEl;
    if (!frame || !wrap || !ed.chromeVisible || ed.looking) return [];
    const ir = frame.getBoundingClientRect();
    const stage = wrap.getBoundingClientRect();
    const s = ed.scale || 1;
    const canvas = { left: Math.max(ir.left, stage.left), right: Math.min(ir.right, stage.right) };
    const out = [];
    let below = -Infinity;
    for (const card of ed.attentionCards) {
      const attention = ed.sections.find((x) => x.id === card.sectionId)?.responsive?.mobile?.attention;
      if (!attention?.needed) continue;
      const r = card.rect;
      const section = { left: ir.left + s * r.left, top: ir.top + s * Math.max(r.top, 0), right: ir.left + s * r.right, bottom: ir.top + s * r.bottom };
      const h = heights[card.sectionId] ?? 96;
      const place = placeTextBar(section, { w: 260, h }, canvas, stage);
      const top = Math.max(place.top, below + 8);
      below = top + h;
      out.push({ id: card.sectionId, left: place.left, top, text: reasonText(attention.reason), when: relativeTime(attention.since) });
    }
    return out;
  });

  $effect(() => {
    const wrap = ed.frameWrapEl;
    const onMove = () => { moved += 1; };
    window.addEventListener('resize', onMove);
    wrap?.addEventListener('scroll', onMove, { passive: true });
    const ro = wrap ? new ResizeObserver(onMove) : null;
    ro?.observe(wrap);
    return () => {
      window.removeEventListener('resize', onMove);
      wrap?.removeEventListener('scroll', onMove);
      ro?.disconnect();
    };
  });

  /** A card's height as it is drawn, for its place. */
  function measure(node, id) {
    const ro = new ResizeObserver(() => {
      if (heights[id] !== node.offsetHeight) heights = { ...heights, [id]: node.offsetHeight };
    });
    ro.observe(node);
    return { destroy: () => ro.disconnect() };
  }
</script>

{#each cards as card (card.id)}
  <div class="review-card" role="status" style="left: {card.left}px; top: {card.top}px" use:measure={card.id} transition:menuMotion>
    <span class="rc-text">{card.text}</span>
    {#if card.when}<span class="rc-when">{card.when}</span>{/if}
    <button type="button" class="rc-done" title={ta('canvas.mobileReviewed')} onclick={() => ed.reviewSection(card.id)}>
      {@html ICONS.check}<span>{ta('canvas.mobileReviewedShort')}</span>
    </button>
  </div>
{/each}

<style>
  /* In the review flag's amber, over the dark stage beside the phone */
  .review-card {
    position: fixed;
    z-index: 310;
    display: grid;
    gap: 4px;
    justify-items: start;
    box-sizing: border-box;
    width: 260px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid color-mix(in srgb, #e2b84a 55%, transparent);
    background: color-mix(in srgb, var(--urd-color-surface, #151a23) 92%, #e2b84a);
    color: var(--urd-color-text, #e6e8ea);
    font: 500 12.5px/1.35 system-ui, sans-serif;
    box-shadow: 0 8px 22px rgb(0 0 0 / 35%);
  }

  .rc-when {
    font-size: 11px;
    opacity: 0.65;
  }

  .rc-done {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 2px;
    border: 0;
    border-radius: 999px;
    padding: 4px 12px;
    background: #e2b84a;
    color: #1a1508;
    font: 600 12px system-ui, sans-serif;
    cursor: pointer;
  }

  .rc-done:hover {
    background: color-mix(in srgb, #e2b84a 85%, white);
  }

  .rc-done:focus-visible {
    outline: 2px solid var(--urd-color-accent);
    outline-offset: 2px;
  }
</style>
