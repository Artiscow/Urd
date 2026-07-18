/**
 * Kjerneanimasjoner. Registertyper med samme version+migrate-kontrakt som
 * blokker og bakgrunnslag (docs/SKJEMA.md): en Urd-oppdatering kan endre
 * en animasjons props trygt via migrations.
 *
 * Inngangsanimasjonene (fade-in, slide-up, zoom-in) spilles når elementet
 * scrolles inn hos besøkende (IntersectionObserver). I editorens preview
 * vises SLUTT-tilstanden: redigering skal ikke utløse evige avspillinger.
 * prefers-reduced-motion respekteres (CSS-en i base.css nuller også ut).
 *
 * All CSS ligger i base.css (.urd-anim-*): definisjonene her setter kun
 * klasser og varighet/forsinkelse som CSS-variabler.
 */

const entranceDefaults = () => ({ duration: 600, delay: 0 });

export const coreAnimations = {
  'fade-in': { version: 1, label: 'Ton inn', entrance: true, defaults: entranceDefaults, migrations: {} },
  'slide-up': { version: 1, label: 'Gli opp', entrance: true, defaults: entranceDefaults, migrations: {} },
  'zoom-in': { version: 1, label: 'Zoom inn', entrance: true, defaults: entranceDefaults, migrations: {} },
  'hover-lift': { version: 1, label: 'Løft ved peker', entrance: false, defaults: () => ({}), migrations: {} },
};

/** Delt observer: legger på .urd-anim-in første gang elementet er synlig. */
let observer = null;

/**
 * Ingenting skal spilles ved sideINNLASTING - kun ved scrolling senere.
 * Tidsvinduet alene var ikke nok (trege innlastinger kunne overskride
 * det), så før første scroll snappes alt, uansett.
 */
let hasScrolled = false;
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => { hasScrolled = true; }, { once: true, passive: true });
}

function entranceObserver() {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      observer.unobserve(el);
      // Synlig ved innlasting/rerender (ferskt observert, eller før
      // brukeren har scrollet): bare DUKK OPP. Animasjonen er for
      // innhold man scroller til senere.
      const fresh = performance.now() - (el._urdObservedAt ?? 0) < 250;
      if (!hasScrolled || fresh) {
        el.style.transition = 'none';
        el.classList.add('urd-anim-in');
        requestAnimationFrame(() => { el.style.transition = ''; });
      } else {
        el.classList.add('urd-anim-in');
      }
    }
  }, { threshold: 0.15 });
  return observer;
}

/**
 * Kobler en (allerede versjonsløftet) animasjon på et element.
 * Merk: blokker med rotasjon har inline transform som vinner over
 * animasjonsklassenes transform - da spilles kun opacity-delen.
 *
 * @param {HTMLElement} el
 * @param {string} type Animasjonstype (nøkkel i registeret)
 * @param {{duration?: number, delay?: number}} props Løftede props
 * @param {{entrance?: boolean}} def Typedefinisjonen
 * @param {{preview?: boolean}} [ctx] Render-kontekst
 */
export function applyAnimation(el, type, props, def, ctx = {}) {
  el.classList.add(`urd-anim-${type}`);
  if (props.duration != null) el.style.setProperty('--urd-anim-duration', `${props.duration}ms`);
  if (props.delay != null) el.style.setProperty('--urd-anim-delay', `${props.delay}ms`);
  if (!def.entrance) return;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (ctx.preview || reduced) {
    el.classList.add('urd-anim-in');
    return;
  }
  el._urdObservedAt = performance.now();
  entranceObserver().observe(el);
}
