/**
 * Kart-referansepluginen (v0.6 M4): personvennlig OpenStreetMap-innbygging.
 * Eieren limer inn koordinater eller en OSM-lenke; blokken bygger inn OSMs
 * offisielle iframe (ingen sporing, ingen tredjeparts-tiles). Følger kalender-
 * referansen: egen CSS via én style-tag, hover-konfigpanel, hjelpechip
 * (ADR-0008), temastyrte nedtrekk (ADR-0009).
 *
 * CSP (ADR-0006): iframe mot openstreetmap.org krever frame-src-unntak.
 * Manifestet deklarerer det, Plugins-panelet viser eieren linjen, og blir
 * kartet blokkert av CSP viser blokken den nøyaktige _headers-linjen.
 */
import { parseLocation, buildEmbedUrl, buildLargerMapUrl, OSM_HOST } from './osm.js';

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

const post = (msg) => window.parent?.postMessage(msg, location.origin);

/* ---------- Konfigpanel ---------- */

function configPanel(el, props, ctx) {
  const gear = el2('button', 'urd-kart-gear', '⚙ Sted');
  gear.type = 'button';
  gear.title = 'Kartsted og zoom';
  const panel = el2('div', 'urd-kart-config');

  const label = (text) => el2('div', 'urd-kart-config-label', text);
  const location = el2('input', 'urd-kart-config-input');
  location.value = props.location ?? '';
  location.placeholder = '59.913, 10.739 eller en OSM-lenke';

  const zoom = el2('input', 'urd-kart-config-input');
  zoom.type = 'number';
  zoom.min = '1';
  zoom.max = '19';
  zoom.value = String(props.zoom ?? 15);

  const height = el2('input', 'urd-kart-config-input');
  height.type = 'number';
  height.min = '120';
  height.max = '900';
  height.value = String(props.height ?? 320);

  const apply = el2('button', 'urd-kart-apply', 'Bruk');
  apply.type = 'button';
  apply.addEventListener('click', () => {
    post({
      type: 'urd-edit',
      sectionId: ctx.section.id,
      blockId: el.dataset.blockId,
      props: {
        location: location.value.trim(),
        zoom: Math.max(1, Math.min(19, Number(zoom.value) || 15)),
        height: Math.max(120, Math.min(900, Number(height.value) || 320)),
      },
      rerender: true,
    });
    close();
  });

  panel.append(
    label('Sted (koordinater eller OSM-lenke)'), location,
    el2('p', 'urd-kart-config-note', 'Finn punktet på openstreetmap.org, høyreklikk «Vis adresse» eller kopier lenken fra Del.'),
    label('Zoom (1 til 19)'), zoom,
    label('Høyde (piksler)'), height,
    apply,
  );

  const onOutside = (event) => {
    if (!panel.isConnected) { close(); return; }
    if (panel.contains(event.target) || event.target === gear) return;
    close();
  };
  function close() {
    panel.classList.remove('vis');
    document.removeEventListener('pointerdown', onOutside, true);
  }
  gear.addEventListener('click', (event) => {
    event.stopPropagation();
    if (panel.classList.toggle('vis')) {
      setTimeout(() => document.addEventListener('pointerdown', onOutside, true), 0);
    } else {
      close();
    }
  });
  return [gear, panel];
}

/* ---------- Tomtilstand og CSP-degradering ---------- */

function emptyState(host, ctx) {
  if (!ctx.preview) return;
  host.appendChild(el2('div', 'urd-kart-empty',
    'Pek på blokken og klikk «⚙ Sted» for å legge inn koordinater eller en OSM-lenke.'));
}

/**
 * Er innbyggingen tillatt av CSP? En blokkert iframe laster aldri; vi kan ikke
 * lese på tvers av opprinnelse, men CSP-brudd sender en securitypolicyviolation.
 * Vi lytter på den én gang og bytter til en forklarende tomtilstand.
 */
function watchCspBlock(host, frame, ctx) {
  if (!ctx.preview) return;
  // Sammenlign den blokkerte verten EKSAKT (parset URL), aldri en delstreng:
  // en delstreng-sjekk ville også slått til på f.eks. openstreetmap.org.example.com.
  let blockedHost = null;
  try { blockedHost = new URL(OSM_HOST).hostname; } catch { /* OSM_HOST er en konstant, dette skjer ikke */ }
  const onViolation = (event) => {
    let host = null;
    try { host = new URL(event.blockedURI).hostname; } catch { /* blockedURI kan være «inline»/«eval» m.m. */ }
    if (event.violatedDirective?.startsWith('frame-src') && host && host === blockedHost) {
      document.removeEventListener('securitypolicyviolation', onViolation);
      frame.remove();
      const note = el2('div', 'urd-kart-empty');
      note.append(
        el2('strong', null, 'Kartet er blokkert av nettstedets CSP.'),
        el2('p', 'urd-kart-config-note', `Legg til denne verten i frame-src i _headers, så vises kartet:`),
        el2('code', 'urd-kart-code', `frame-src ${OSM_HOST}`),
      );
      host.appendChild(note);
    }
  };
  document.addEventListener('securitypolicyviolation', onViolation);
  setTimeout(() => document.removeEventListener('securitypolicyviolation', onViolation), 4000);
}

/* ---------- CSS ---------- */

const KART_CSS = `
.urd-kart { width: 100%; position: relative; display: grid; gap: 6px; }
.urd-kart-frame { width: 100%; border: 1px solid color-mix(in srgb, var(--urd-color-text) 15%, transparent);
  border-radius: var(--urd-radius-md); display: block; }
.urd-kart-link { font-size: 0.82em; opacity: 0.75; }
.urd-kart-link a { color: var(--urd-color-accent); }
.urd-kart-empty { padding: 24px; text-align: center; border: 1px dashed color-mix(in srgb, var(--urd-color-text) 30%, transparent);
  border-radius: var(--urd-radius-md); opacity: 0.85; display: grid; gap: 8px; justify-items: center; }
.urd-kart-code { font: 12px/1.4 ui-monospace, monospace; padding: 4px 8px; border-radius: 5px;
  background: color-mix(in srgb, var(--urd-color-text) 10%, transparent); }
.urd-kart-tools { position: absolute; top: -32px; right: -6px; z-index: 5;
  display: flex; gap: 4px; align-items: center;
  /* Usynlig bro ned til blokk-kanten, så hover overlever veien opp */
  padding-bottom: 8px; }
.urd-kart-tools .urd-hint-chip { position: static; }
.urd-kart-gear { font: 600 11px/1 system-ui, sans-serif; padding: 5px 9px; border-radius: 999px; cursor: pointer;
  color: #fff; background: var(--urd-color-accent); border: 0;
  opacity: 0; pointer-events: none; transition: opacity 0.15s; }
.urd-block:hover .urd-kart-gear, .urd-kart-gear:focus-visible,
.urd-kart:has(.urd-kart-config.vis) .urd-kart-gear { opacity: 0.92; pointer-events: auto; }
.urd-kart-config { position: absolute; top: -6px; right: 0; z-index: 6; width: min(340px, 92vw);
  display: none; gap: 6px; padding: 12px; border-radius: 10px;
  background: #151a23; color: #e8eaf0; border: 1px solid rgb(255 255 255 / 18%);
  box-shadow: 0 12px 36px rgb(0 0 0 / 55%); font: 12px/1.4 system-ui, sans-serif; }
.urd-kart-config.vis { display: grid; }
.urd-kart-config-label { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.55; }
.urd-kart-config-note { font-size: 11px; opacity: 0.6; margin: 0; }
.urd-kart-config-input { font: 12px/1.4 system-ui, sans-serif; color: inherit; background: rgb(255 255 255 / 6%);
  border: 1px solid rgb(255 255 255 / 20%); border-radius: 6px; padding: 5px 7px; width: 100%; }
.urd-kart-apply { font: 600 12px/1 system-ui, sans-serif; cursor: pointer; border-radius: 6px;
  padding: 7px 10px; border: 0; background: #7c5cff; color: #fff; }
body.urd-chrome-off .urd-kart-gear, body.urd-chrome-off .urd-kart-config { display: none !important; }
`;

function injectCss() {
  if (document.getElementById('urd-kart-css')) return;
  const style = document.createElement('style');
  style.id = 'urd-kart-css';
  style.textContent = KART_CSS;
  document.head.appendChild(style);
}

/* ---------- Autovekst ---------- */

function autoGrow(el, host, ctx) {
  const needed = host.scrollHeight;
  if (Math.abs(needed - el.clientHeight) > 8 && ctx.viewport !== 'mobile') {
    el.style.height = `${needed}px`;
    const sectionEl = el.closest('.urd-section');
    if (sectionEl) {
      const bottom = el.offsetTop + needed + 24;
      const current = Number.parseFloat(sectionEl.style.minHeight) || 0;
      if (bottom > current) sectionEl.style.minHeight = `${bottom}px`;
    }
    if (ctx.preview) {
      const block = ctx.section?.blocks?.find((b) => b.id === el.dataset.blockId);
      if (block && block.frames.desktop.h !== needed) {
        block.frames.desktop = { ...block.frames.desktop, h: needed };
        // KUN høyden meldes (urd-grow), aldri hele framen: ellers ville en
        // dratt blokk teleporteres tilbake til snapshotets gamle x/y.
        post({ type: 'urd-grow', sectionId: ctx.section.id, blockId: el.dataset.blockId, h: needed });
      }
    }
  }
}

/* ---------- Blokken ---------- */

function renderKart(el, props, ctx) {
  injectCss();
  const host = el2('div', 'urd-kart');
  el.appendChild(host);

  const loc = parseLocation(props.location);
  if (loc) {
    const zoom = props.zoom ?? loc.zoom ?? 15;
    const frame = el2('iframe', 'urd-kart-frame');
    frame.src = buildEmbedUrl({ lat: loc.lat, lon: loc.lon, zoom });
    frame.style.height = `${props.height ?? 320}px`;
    frame.loading = 'lazy';
    frame.title = 'Kart';
    frame.setAttribute('referrerpolicy', 'no-referrer');
    host.appendChild(frame);
    watchCspBlock(host, frame, ctx);

    const link = el2('div', 'urd-kart-link');
    const a = el2('a', null, 'Vis større kart');
    a.href = buildLargerMapUrl({ lat: loc.lat, lon: loc.lon, zoom });
    a.target = '_blank';
    a.rel = 'noopener';
    link.appendChild(a);
    host.appendChild(link);
  } else {
    emptyState(host, ctx);
  }

  if (ctx.preview && ctx.viewport !== 'mobile') {
    const [gear, panel] = configPanel(el, props, ctx);
    // «?» og «⚙ Sted» i samme rad øverst til høyre, med hover-bro (klar av rotasjonshåndtaket).
    const tools = el2('div', 'urd-kart-tools');
    tools.appendChild(gear);
    host.append(tools, panel);
    import('/assets/engine/hint.js').then(({ attachHint }) => {
      if (!host.isConnected || host.querySelector('.urd-hint-chip')) return;
      const chip = attachHint(tools, {
        title: 'Kartblokken',
        lines: [
          'Pek på blokken og klikk «⚙ Sted» for å legge inn koordinater («59.913, 10.739») eller en OSM-lenke',
          'Finn stedet på openstreetmap.org: høyreklikk kartet og velg «Vis adresse», eller kopier fra Del-knappen',
          'Still zoom (1 er verden, 19 er gatenivå) og høyden på kartet',
          'Kartet er OpenStreetMaps egen innbygging: ingen sporing, ingen informasjonskapsler',
          `Nettstedet må tillate kartet: legg «frame-src ${OSM_HOST}» inn i _headers (Plugins-panelet viser det samme)`,
        ],
      });
      tools.insertBefore(chip, tools.firstChild);
    });
  }

  autoGrow(el, host, ctx);
}

/* ---------- «Finn oss»-preset ---------- */

const blockId = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return 'blk-' + [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
};

function finnOssSection() {
  return {
    version: 1,
    preset: 'finn-oss',
    size: { minHeight: '480px' },
    grid: null,
    background: { version: 1, layers: [{ type: 'color', version: 1, props: { color: 'bg', opacity: 1 } }] },
    blocks: [
      {
        id: blockId(),
        type: 'text',
        version: 1,
        props: { html: '<h2>Finn oss</h2>', align: 'left', box: false },
        animation: null,
        frames: { desktop: { x: 6, y: 40, w: 60, h: 70, z: 1, rot: 0 }, mobile: null },
      },
      {
        id: blockId(),
        type: 'kart',
        version: 1,
        props: { location: '', zoom: 15, height: 320 },
        animation: null,
        frames: { desktop: { x: 6, y: 120, w: 88, h: 360, z: 2, rot: 0 }, mobile: null },
      },
    ],
    responsive: { mobile: { mode: 'auto', attention: null } },
  };
}

/* ---------- Registrering ---------- */

/** @param {typeof window.Urd} Urd */
export function register(Urd) {
  Urd.blocks.define('kart', {
    version: 1,
    label: 'Kart',
    defaults: () => ({ location: '', zoom: 15, height: 320 }),
    migrations: {},
    render: renderKart,
  });

  Urd.sections.define('finn-oss', {
    label: 'Finn oss',
    group: 'Kort og lister',
    hint: 'Kart med adressen deres (personvennlig OpenStreetMap)',
    create: finnOssSection,
  });
}
