<script>
  /* The cover over a canvas while its page loads, in the look «Canvas loading» chooses, drawn as the load goes and lifted once the page stands whole. */
  import { untrack } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { coverArt, coverGoal, COVER_POINTS } from './canvas-cover.js';

  /**
   * `step`: how far the canvas has come: 0 its page asked for, 1 the frame loaded, 2 the page drawn.
   * @type {{ covered: boolean, step?: number, look?: string }}
   */
  let { covered, step = 0, look = 'circle' } = $props();

  /** How long the cover takes to fade as it lifts (the transition below), after which its drawing leaves. */
  const LIFT_MS = 300;
  /** The last step, the whole drawing, which a lifted cover has reached. */
  const LAST = COVER_POINTS.length - 1;
  /** How quickly the drawing follows its point, and the last strokes as the cover lifts, in ms. */
  const FOLLOW_MS = 160;
  const FINISH_MS = 60;

  /** The ground's grid of dots, in px (app.css .frame-wrap). */
  const DOTS = 16;

  /** Each time the cover is raised, its drawing starts anew, even within the fade of the last lift. */
  let round = $state(0);
  $effect(() => {
    if (covered) untrack(() => { round += 1; });
  });

  /** Whether the drawing stands: while covered, and through the fade after. */
  let drawn = $state(false);
  let artEl = $state(null);
  let coverEl = $state(null);

  // The cover's dots stand in line with the ground it lies on (the canvas's frame, or the live phone's room), so it reads as the ground itself.
  $effect(() => {
    const el = coverEl;
    const ground = el?.closest('.frame-wrap, .lp-room');
    if (!el || !ground) return;
    const step = (v) => ((v % DOTS) + DOTS) % DOTS;
    const place = () => {
      const g = ground.getBoundingClientRect();
      const c = el.getBoundingClientRect();
      el.style.backgroundPosition = `${step(g.left + ground.clientLeft - ground.scrollLeft - c.left)}px ${step(g.top + ground.clientTop - ground.scrollTop - c.top)}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    ro.observe(ground);
    ground.addEventListener('scroll', place, { passive: true });
    return () => {
      ro.disconnect();
      ground.removeEventListener('scroll', place);
    };
  });

  $effect(() => {
    if (covered) {
      drawn = true;
      return;
    }
    const timer = setTimeout(() => { drawn = false; }, LIFT_MS);
    return () => clearTimeout(timer);
  });

  // The drawing's progress follows the steps a frame at a time, from the first step's point as a new round of covering begins.
  $effect(() => {
    const el = artEl;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let progress = COVER_POINTS[0];
    let seen = untrack(() => step);
    let since = performance.now();
    let last = since;
    let frame = 0;
    const tick = (now) => {
      const at = covered ? Math.min(Math.max(step, 0), LAST - 1) : LAST;
      if (at !== seen) {
        seen = at;
        since = now;
      }
      // A frame's time can come a moment before the round began, which moves nothing.
      progress += (coverGoal(at, now - since) - progress) * Math.min(1, Math.max(0, now - last) / (at === LAST ? FINISH_MS : FOLLOW_MS));
      last = Math.max(last, now);
      el.style.setProperty('--p', progress.toFixed(4));
      if (progress < 0.9995) frame = requestAnimationFrame(tick);
    };
    el.style.setProperty('--p', String(progress));
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });
</script>

<div class="canvas-cover" class:lifted={!covered} role="status" bind:this={coverEl}>
  {#if covered}<span class="sr-only">{ta('ui.loading')}</span>{/if}
  {#if drawn}
    <!-- The look's drawing, from the admin's own constant strings -->
    {#key round}<div class="cc-art" style:--p={COVER_POINTS[0]} bind:this={artEl}>{@html coverArt(look)}</div>{/key}
  {/if}
</div>

<style>
  /* Over the whole canvas, on the canvas's own ground (app.css .frame-wrap): the admin's surface, deeper, with its faint grid of dots */
  .canvas-cover {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: grid;
    place-items: center;
    color: var(--urd-color-text, #e8eaf0);
    background-color: color-mix(in srgb, var(--urd-color-bg, #0f1419) 70%, black);
    background-image: radial-gradient(color-mix(in srgb, var(--urd-color-text, #e8eaf0) 9%, transparent) 1px, transparent 1.4px);
    background-size: 16px 16px;
    /* The phone view's rounded canvas keeps its corners */
    border-radius: inherit;
    transition: opacity 0.28s ease, visibility 0s;
  }

  .canvas-cover.lifted {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.28s ease, visibility 0s 0.28s;
  }

  /* The drawing stands at once, its first part drawn (the first step's point), so the cover is never seen without it */
  .cc-art {
    width: min(108px, 36%);
    aspect-ratio: 1;
    animation: cc-in 0.1s ease both;
  }

  .cc-art :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  @keyframes cc-in {
    from { opacity: 0; }
  }

  /* A stroke is drawn over its span of the load (--a to --b), and a mark grows in over its span */
  .cc-art :global(.cc-draw) {
    stroke-dasharray: 1;
    stroke-dashoffset: calc(1 - clamp(0, (var(--p) - var(--a, 0)) / (var(--b, 1) - var(--a, 0)), 1));
  }

  .cc-art :global(.cc-pop) {
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(clamp(0, (var(--p) - var(--a, 0)) / (var(--b, 1) - var(--a, 0)), 1));
  }

  /* The rings turn and the sparks rise the whole time, whatever the load */
  .cc-art :global(.cc-spin),
  .cc-art :global(.cc-spin-back) {
    transform-box: view-box;
    transform-origin: 60px 60px;
    animation: cc-spin 26s linear infinite;
  }

  .cc-art :global(.cc-spin-back) {
    animation-duration: 18s;
    animation-direction: reverse;
  }

  @keyframes cc-spin {
    to { transform: rotate(360deg); }
  }

  .cc-art :global(.cc-glow) {
    filter: drop-shadow(0 0 3px var(--urd-color-accent, #7c5cff));
  }

  .cc-art :global(.cc-mote) {
    animation: cc-rise 2.8s ease-out var(--d, 0s) infinite backwards;
  }

  @keyframes cc-rise {
    0% { transform: translateY(0); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateY(-46px); opacity: 0; }
  }

  /* Reduced motion: the drawing stands finished and still, the sparks leave, and the cover comes and goes without a fade */
  @media (prefers-reduced-motion: reduce) {
    .canvas-cover,
    .canvas-cover.lifted {
      transition: none;
    }

    .cc-art {
      --p: 1 !important;
      animation-duration: 0s;
    }

    .cc-art :global(*) {
      animation: none !important;
    }
  }
</style>
