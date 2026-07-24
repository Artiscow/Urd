/**
 * Bakgrunnslag: gradient. Lineær eller radiell. Fargene er en LISTE i
 * rekkefølge (først til sist langs gradienten), og hver farge har en
 * andel plass (share): hvor stor del av gradienten den dekker. En farge
 * med plass 0 gir en hard fargekant. Valgfri animasjon per form.
 *
 * Andelene er vekter: de normaliseres ved rendering, så summen trenger
 * ikke være 100. Hver farge males i midten av sitt bånd; CSS-en strekker
 * første og siste farge ut til kantene.
 */
import { resolveColor } from '../theme.js';

/** Gyldige animasjoner per form; alt annet rendres uanimert. */
const ANIMATIONS = {
  linear: ['pan', 'pan-loop', 'rotate'],
  radial: ['pulse', 'orbit'],
};

/** Normaliserer andelene til fargeposisjoner (sentrum av hvert bånd, 0-100). */
function centers(stops) {
  const list = Array.isArray(stops) && stops.length ? stops : [{ color: '#0b0e14' }, { color: '#1a1030' }];
  const weights = list.map((s) => Math.max(0, Number(s?.share) || 0));
  const sum = weights.reduce((a, b) => a + b, 0);
  const even = sum <= 0;
  const total = even ? list.length : sum;
  let cum = 0;
  return list.map((s, i) => {
    const w = even ? 1 : weights[i];
    const at = ((cum + w / 2) / total) * 100;
    cum += w;
    return { color: s?.color ?? '#0b0e14', at: Math.round(at * 100) / 100 };
  });
}

/** Sirkulær syklus for én-veis panorering (eiers regnbue-modell 24. juli
 *  2026): siste farge glir tilbake til første, så mønsteret leses
 *  1 2 3 4 1 2 3 4 - aldri speilet, og ingen farge synes to ganger
 *  samtidig (eiers regel: en farge vises kun én gang med mindre den er
 *  lagt til to ganger). Posisjonene er prosent av ÉN periode. */
function cyclicCycle(list) {
  const r2 = (v) => Math.round(v * 100) / 100;
  const shift = list[0]?.at ?? 0;
  return [
    ...list.map((s) => ({ color: s.color, at: r2(s.at - shift) })),
    { color: list[0]?.color ?? '#0b0e14', at: 100 },
  ];
}

/**
 * Loopens geometri (ren, node-testbar): følger vinkelen eieren har satt.
 * Perioden er gradientlinjen gjennom flaten pluss AKKURAT nok til at den
 * skjulte delen av syklusen rommer den største fargen: da kan ingen
 * farge splittes over synsfeltets kanter (eiers regel 24. juli 2026:
 * ingen farge vises to ganger), samtidig som fargene beholder omtrent
 * samme størrelse som i den statiske gradienten (med 7 like farger er
 * perioden bare 1/6 lengre enn linjen, aldri dobbel). Forskyvningen er
 * nøyaktig én periode langs aksen - da er mønsteret identisk ved rundens
 * slutt, og loopen sømløs for ENHVER vinkel (CSS-vinkel: 0 = oppover,
 * 90 = mot høyre).
 *
 * @param {number} width Flatens bredde i px
 * @param {number} height Flatens høyde i px
 * @param {number} angleDeg Gradientvinkelen
 * @param {number} [maxShare] Største fargens normaliserte andel (0..1)
 * @returns {{period: number, dx: number, dy: number}} px, avrundet til 2 desimaler
 */
export function loopGeometry(width, height, angleDeg, maxShare = 0.5) {
  const rad = ((angleDeg % 360) * Math.PI) / 180;
  // || 0 normaliserer -0 (flyttallsstøy ved rene vinkler).
  const r2 = (v) => Math.round(v * 100) / 100 || 0;
  const line = Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));
  // Klemmes så en ekstremt dominant farge ikke gir en absurd lang
  // periode (og aldri deling på null).
  const share = Math.min(Math.max(maxShare, 0), 0.9);
  const period = line / (1 - share);
  return { period: r2(period), dx: r2(Math.sin(rad) * period), dy: r2(-Math.cos(rad) * period) };
}

/**
 * Løperens gradient (ren): gjentakende gradient med syklusens posisjoner
 * omregnet til px av perioden, så mønsteret fliser sømløst langs aksen.
 */
export function loopGradientCss(stops, angleDeg, periodPx) {
  const css = stops
    .map((s) => `${resolveColor(s.color)} ${Math.round((s.at / 100) * periodPx * 100) / 100}px`)
    .join(', ');
  return `repeating-linear-gradient(${angleDeg}deg, ${css})`;
}

/**
 * Bygger hele render-oppskriften som en ren funksjon (node-testbar):
 * background-CSS, ekstra style-egenskaper (kebab-case, inkl. CSS-vars)
 * og animasjonsklassen.
 *
 * @param {{kind?: string, stops: Array<{color: string, share?: number}>, angle?: number, x?: number, y?: number, animation?: string, opacity?: number}} props
 * @returns {{background: string|null, className: string|null, styles: Record<string, string>, loop?: {angle: number, stops: Array<{color: string, at: number}>}}}
 *   loop settes kun for pan-loop: da males gradienten på en løper i px
 *   når flaten kan måles (se render), og background er null.
 */
export function gradientRender(props) {
  const kind = props.kind === 'radial' ? 'radial' : 'linear';
  const anim = (ANIMATIONS[kind] ?? []).includes(props.animation) ? props.animation : null;
  const list = centers(props.stops);
  const cssStops = list.map((s) => `${resolveColor(s.color)} ${s.at}%`).join(', ');

  // Størrelse/gjentakelse må settes INLINE, ikke bare i animasjonsklassen:
  // background-shorthanden under nullstiller dem, og inline-stil vinner
  // uansett over klassen (lærepenge 24. juli 2026: «pusting» i stedet for
  // panorering fordi flisen aldri ble 200 %).
  const styles = {};
  let background;
  if (kind === 'radial') {
    const x = Math.round((props.x ?? 0.5) * 100);
    const y = Math.round((props.y ?? 0.5) * 100);
    background = `radial-gradient(circle at ${x}% ${y}%, ${cssStops})`;
    if (anim === 'orbit') {
      // 200 %-lerret: posisjonen (100x, 100y) holder sentrum på plass,
      // og banen svinger rundt den via variablene (se urd-bg-orbit).
      styles['background-size'] = '200% 200%';
      styles['background-repeat'] = 'no-repeat';
      styles['--urd-bg-px'] = `${x}%`;
      styles['--urd-bg-py'] = `${y}%`;
    }
    if (anim === 'pulse') styles['--urd-bg-op'] = String(props.opacity ?? 1);
  } else {
    const angle = props.angle ?? 160;
    if (anim === 'pan-loop') {
      // Løper-modellen (se render): den rene oppskriften er syklusen,
      // vinkelen og største fargeandel (styrer periodelengden);
      // px-målene settes først når flaten kan måles.
      const weights = (props.stops ?? []).map((s) => Math.max(0, Number(s?.share) || 0));
      const sum = weights.reduce((a, b) => a + b, 0);
      const maxShare = sum > 0 ? Math.max(...weights) / sum : 1 / list.length;
      return {
        background: null,
        className: null,
        styles,
        loop: { angle, stops: cyclicCycle(list), maxShare },
      };
    }
    background = anim === 'rotate'
      ? `linear-gradient(calc(var(--urd-grad-spin, 0deg) + ${angle}deg), ${cssStops})`
      : `linear-gradient(${angle}deg, ${cssStops})`;
    if (anim === 'pan') styles['background-size'] = '200% 200%';
  }

  const classNames = { pan: 'urd-bg-animate', rotate: 'urd-bg-rotate', pulse: 'urd-bg-pulse', orbit: 'urd-bg-orbit' };
  return { background, className: anim ? classNames[anim] : null, styles };
}

/** v1 → v2: stoppene går fra rene fargestrenger til {color, at} jevnt
 *  fordelt. Defensiv mot blandet tilstand: et stopp som ALT er på
 *  v2-formen beholdes som det er (aldri [object Object] i CSS-en). */
function liftStops(stops) {
  const list = Array.isArray(stops) && stops.length ? stops : ['#0b0e14', '#1a1030'];
  const spread = (i) => (list.length === 1 ? 0 : Math.round((i * 100) / (list.length - 1)));
  return list.map((s, i) => {
    if (s && typeof s === 'object') {
      return { color: s.color ?? '#0b0e14', at: typeof s.at === 'number' ? s.at : spread(i) };
    }
    return { color: s, at: spread(i) };
  });
}

/** v2 → v3: posisjoner (at) blir andeler (share) via båndgrensene midt
 *  mellom nabofarger; rekkefølgen langs gradienten blir listens rekkefølge. */
function sharesFromPositions(stops) {
  const sorted = [...liftStops(stops)].sort((a, b) => a.at - b.at);
  const bounds = [0, ...sorted.slice(0, -1).map((s, i) => (s.at + sorted[i + 1].at) / 2), 100];
  return sorted.map((s, i) => ({
    color: s.color,
    share: Math.round((bounds[i + 1] - bounds[i]) * 10) / 10,
  }));
}

/* Loop-løperne må måles på nytt når vinduet endrer størrelse (px-mål).
   ÉN modulnivå-lytter; frakoblede løpere (etter re-render) lukes ut ved
   at apply returnerer false. */
const loopAppliers = new Set();
let loopListenerOn = false;
function registerLoopApply(apply) {
  loopAppliers.add(apply);
  if (loopListenerOn || typeof window === 'undefined') return;
  loopListenerOn = true;
  window.addEventListener('resize', () => {
    for (const fn of [...loopAppliers]) {
      if (!fn()) loopAppliers.delete(fn);
    }
  });
}

/* Roter-animasjonen interpolerer en registrert vinkel-variabel; uten
   støtte degraderer den til statisk gradient (dekor velter aldri siden). */
let spinRegistered = false;
function registerSpin() {
  if (spinRegistered) return;
  spinRegistered = true;
  try {
    CSS.registerProperty({ name: '--urd-grad-spin', syntax: '<angle>', inherits: false, initialValue: '0deg' });
  } catch { /* alt annet enn førstegangsregistrering er uinteressant */ }
}

export const gradientLayer = {
  version: 3,
  label: 'Gradient',
  defaults: () => ({
    kind: 'linear',
    stops: [{ color: '#0b0e14', share: 50 }, { color: '#1a1030', share: 50 }],
    angle: 160,
    x: 0.5,
    y: 0.5,
    animation: 'none',
    opacity: 1,
  }),
  migrations: {
    1: (props) => ({ ...props, kind: 'linear', x: 0.5, y: 0.5, stops: liftStops(props.stops) }),
    2: (props) => ({
      kind: props.kind === 'radial' ? 'radial' : 'linear',
      stops: sharesFromPositions(props.stops),
      angle: props.angle ?? 160,
      x: props.x ?? 0.5,
      y: props.y ?? 0.5,
      animation: props.animate ? (props.kind === 'radial' ? 'orbit' : 'pan') : 'none',
      opacity: props.opacity ?? 1,
    }),
  },
  /**
   * @param {HTMLElement} el
   * @param {{kind: string, stops: Array<{color: string, share: number}>, angle: number, x: number, y: number, animation: string, opacity?: number}} props
   */
  render(el, props) {
    const r = gradientRender(props);
    el.style.opacity = String(props.opacity ?? 1);
    for (const [name, value] of Object.entries(r.styles)) el.style.setProperty(name, value);
    if (r.loop) {
      // Én-veis panorering følger eierens vinkel: en gjentakende gradient
      // males på en oversized løper i px, og løperen forskyves nøyaktig
      // én periode langs aksen per runde - sømløst for enhver vinkel.
      // Px-målene krever lagt-ut flate, derfor rAF + resize-oppfrisking.
      el.classList.add('urd-bg-loop-host');
      const runner = document.createElement('div');
      runner.className = 'urd-bg-loop-runner';
      el.appendChild(runner);
      const apply = () => {
        if (!el.isConnected) return false;
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (w && h) {
          const geo = loopGeometry(w, h, r.loop.angle, r.loop.maxShare);
          runner.style.inset = `${-Math.ceil(geo.period)}px`;
          runner.style.background = loopGradientCss(r.loop.stops, r.loop.angle, geo.period);
          runner.style.setProperty('--urd-loop-dx', `${geo.dx}px`);
          runner.style.setProperty('--urd-loop-dy', `${geo.dy}px`);
        }
        return true;
      };
      requestAnimationFrame(apply);
      registerLoopApply(apply);
      return;
    }
    el.style.background = r.background;
    if (r.className) {
      el.classList.add(r.className);
      if (r.className === 'urd-bg-rotate') registerSpin();
    }
  },
};
