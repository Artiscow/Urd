/**
 * Bakgrunnslag: bilde. Viser en fil fra media/ (eller en data-URL for
 * upubliserte opplastinger i utkast; publisering materialiserer den til
 * en fil, samme flyt som bildeblokken).
 *
 * x/y (0..1) er fokuspunktet (background-position), blur i px lar bildet
 * fungere som stemningsbakgrunn bak tekst. parallax (0..1, additivt fra v0.6)
 * lar laget bevege seg saktere enn resten ved scroll. Alle felt utover src er
 * additive med trygge standarder.
 */

/** Maks andel av scroll-forskyvningen laget kan henge etter (ved parallax=1). */
const MAX_SHIFT = 0.35;

/**
 * translateY (px) for et parallax-lag: seksjonens senter målt mot viewport-
 * senteret, ganget med styrken. Ren funksjon (node-testet).
 * @param {number} rectTop Seksjonens top i viewport-koordinater
 * @param {number} sectionH Seksjonens høyde
 * @param {number} viewportH Vindushøyde
 * @param {number} speed Styrke 0..1
 * @returns {number}
 */
export function parallaxOffset(rectTop, sectionH, viewportH, speed) {
  const k = Math.max(0, Math.min(1, speed)) * MAX_SHIFT;
  const sectionMid = rectTop + sectionH / 2;
  // `|| 0` normaliserer -0 (f.eks. negativ verdi * styrke 0) til +0.
  return (viewportH / 2 - sectionMid) * k || 0;
}

// Aktive parallax-lag: ÉN modulnivå scroll-/resize-lytter forskyver dem via
// rAF. Frakoblede lag (etter re-render) lukes ut når apply returnerer false.
const parallaxAppliers = new Set();
let parallaxListening = false;
let parallaxRaf = 0;
function pumpParallax() {
  parallaxRaf = 0;
  for (const fn of [...parallaxAppliers]) if (!fn()) parallaxAppliers.delete(fn);
}
function scheduleParallax() {
  if (!parallaxRaf) parallaxRaf = requestAnimationFrame(pumpParallax);
}
function registerParallax(apply) {
  parallaxAppliers.add(apply);
  apply();
  if (parallaxListening || typeof window === 'undefined') return;
  parallaxListening = true;
  window.addEventListener('scroll', scheduleParallax, { passive: true });
  window.addEventListener('resize', scheduleParallax, { passive: true });
}

function mountParallax(el, speed) {
  const section = el.closest('.urd-section') ?? el.parentElement;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.style.willChange = 'transform';
  const apply = () => {
    if (!el.isConnected) return false;
    // AV på mobil (dokumentflyt-stabling) og ved prefers-reduced-motion:
    // laget står stille, og forstørringen nullstilles.
    if (reduce || document.body.classList.contains('urd-mobile')) {
      el.style.transform = '';
      el.style.top = '';
      el.style.bottom = '';
      return true;
    }
    const rect = (section ?? el).getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Forstørr laget vertikalt så translasjonen aldri avslører kanter.
    const pad = Math.ceil(Math.abs(speed) * MAX_SHIFT * vh) + 8;
    el.style.top = `-${pad}px`;
    el.style.bottom = `-${pad}px`;
    const dy = parallaxOffset(rect.top, rect.height, vh, speed);
    el.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0)`;
    return true;
  };
  registerParallax(apply);
}

export const imageLayer = {
  version: 2,
  label: 'Bilde',
  defaults: () => ({ src: '', fit: 'cover', x: 0.5, y: 0.5, opacity: 1, blur: 0, parallax: 0 }),
  migrations: {
    // v1 -> v2: parallax lagt til (additivt, av som standard).
    1: (props) => ({ ...props, parallax: props.parallax ?? 0 }),
  },
  /**
   * @param {HTMLElement} el
   * @param {{src: string, fit: 'cover'|'contain'|'repeat', x?: number, y?: number, opacity?: number, blur?: number, parallax?: number}} props
   */
  render(el, props) {
    if (!props.src) return;
    // Samme lastevern som bildeblokken: laget holdes usynlig til bildet
    // er ferdig lastet, så det aldri dukker opp stripevis.
    const probe = new Image();
    probe.src = props.src;
    if (!probe.complete) {
      el.style.visibility = 'hidden';
      const show = () => { el.style.visibility = ''; };
      probe.addEventListener('load', show, { once: true });
      probe.addEventListener('error', show, { once: true });
    }
    el.style.backgroundImage = `url("${props.src}")`;
    if (props.fit === 'repeat') {
      el.style.backgroundSize = 'auto';
      el.style.backgroundRepeat = 'repeat';
    } else {
      el.style.backgroundSize = props.fit === 'contain' ? 'contain' : 'cover';
      el.style.backgroundRepeat = 'no-repeat';
    }
    el.style.backgroundPosition = `${(props.x ?? 0.5) * 100}% ${(props.y ?? 0.5) * 100}%`;
    el.style.opacity = String(props.opacity ?? 1);
    // Litt overskalering ved blur, så kantene ikke "blør" transparent.
    if (props.blur > 0) {
      el.style.filter = `blur(${props.blur}px)`;
      el.style.inset = `-${props.blur * 2}px`;
    }
    // Parallax (additivt fra v0.6): laget henger etter ved scroll.
    if (props.parallax > 0) mountParallax(el, props.parallax);
  },
};
