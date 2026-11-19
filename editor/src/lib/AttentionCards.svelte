<script>
  /* The phone review's cards (ADR-0019 decision 5): for each section that needs a review in the phone view, what fell behind the desktop and when, naming the block, with «Reviewed», drawn over the stage beside the phone, level with its section, so they cover none of the page.
     The preview reports where the sections stand (preview-edit.js reportAttention); what happened is read from the draft. Where the stage has no room beside the canvas, a card stands above its section (placeTextBar). */
  import { getContext } from 'svelte';
  import { ta, adminLang } from '$engine/i18n.js';
  import { blockWords, sectionWords } from '$engine/anchor-model.js';
  import { placeClearOf } from './menu-place.js';
  import { canvasBarState } from '../state/canvas-bar.svelte.js';
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

  /** A block's name on the card: its own words, else its kind. */
  const blockName = (block) => ta('canvas.attention.name', { name: blockWords(block) || ed.blockLabel(block.type) });

  /** Names in a list in the admin's language («A», «B» and «C»). */
  function nameList(names) {
    try {
      return new Intl.ListFormat(adminLang(), { type: 'conjunction' }).format(names);
    } catch {
      return names.join(', ');
    }
  }

  /** The blocks the flag is about: the block whose desktop words changed under the phone's own, or the blocks pinned on the phone that the desktop changed around. */
  function fellBehind(attention, section) {
    const blocks = section?.blocks ?? [];
    if (attention.reason === 'words-changed' || attention.reason === 'size-changed') return blocks.filter((b) => b.id === attention.blockId);
    if (attention.reason === 'pinned-behind') return blocks.filter((b) => Number.isFinite(b.frames?.mobile?.row));
    return [];
  }

  /** What happened, from the section's flag: what fell behind, naming the blocks; the general words where none is left to name; a flag of another reason in its own words, and one without a translation (from a newer engine) in the general words. */
  function reasonText(attention, section) {
    if (attention.reason === 'words-changed' || attention.reason === 'size-changed' || attention.reason === 'pinned-behind') {
      const names = fellBehind(attention, section).map(blockName);
      if (!names.length) return ta('canvas.attention.fallback');
      // Several pinned blocks are named in the words for more than one.
      const many = attention.reason === 'pinned-behind' && names.length > 1;
      return ta(`canvas.attention.${attention.reason}${many ? '-many' : ''}`, { name: nameList(names) });
    }
    const key = `canvas.attention.${attention.reason}`;
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
      const flagged = ed.sections.find((x) => x.id === card.sectionId);
      const attention = flagged?.responsive?.mobile?.attention;
      if (!attention?.needed) continue;
      const r = card.rect;
      const section = { left: ir.left + s * r.left, top: ir.top + s * Math.max(r.top, 0), right: ir.left + s * r.right, bottom: ir.top + s * r.bottom };
      const h = heights[card.sectionId] ?? 96;
      // The section's and the block's bars stand beside the phone too (CanvasBar.svelte): the card stands clear of them.
      const place = placeClearOf(section, { w: 260, h }, canvas, stage, [canvasBarState.sectionPlaced, canvasBarState.placed, canvasBarState.navPlaced]);
      const top = Math.max(place.top, below + 8);
      below = top + h;
      // The card names its section, as the order's column does: its first words, or its place on the page.
      const name = sectionWords(flagged) || ta('diff.section', { n: ed.sections.indexOf(flagged) + 1 });
      out.push({ id: card.sectionId, left: place.left, top, name, text: reasonText(attention, flagged), when: relativeTime(attention.since) });
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
    <span class="rc-name" title={card.name}>{card.name}</span>
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

  /* The section the card is about, in the review flag's amber, one line cut short with an ellipsis */
  .rc-name {
    max-width: 100%;
    overflow: hidden;
    color: #e2b84a;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
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
