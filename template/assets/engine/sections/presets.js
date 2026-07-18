/**
 * Kjernens seksjonspresets: datafabrikker som produserer en startseksjon.
 * En preset er IKKE en kodevei - etter opprettelse er alle seksjoner
 * likestilte generiske containere (se docs/SKJEMA.md). Plugins kan
 * definere flere presets med samme API.
 *
 * Biblioteket er bygget mot mønstrene fra sidekartleggingen 18. juli 2026 (inspirasjonssidene + ApeironLF, se docs/BACKLOG.md).
 * Alt er komposisjoner av eksisterende blokktyper med temafarge-tokens, så presetene følger brukerens palett.
 * `group` og `hint` er valgfrie felter som «+ Ny seksjon»-menyen bruker til gruppering og beskrivelse.
 * `item`/`itemLabel` er valgfrie fabrikker for gjentakende elementer: seksjonsverktøylinjen viser da en «+ kort/rad»-knapp.
 */

/** Kort, kollisjonstrygg nok id for seksjoner/blokker laget i editoren. */
export function makeId(prefix) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

const autoMobile = () => ({ mobile: { mode: 'auto', attention: null } });

/* Blokkfabrikker: hver retur er et ferskt objekt, for presets kalles flere ganger og seksjoner må aldri dele delobjekter. */

const frame = (x, y, w, h, z = 1) => ({ desktop: { x, y, w, h, z, rot: 0 }, mobile: null });

const text = (fr, html, props = {}) => ({
  id: makeId('blk'),
  type: 'text',
  version: 1,
  props: { html, align: 'left', box: false, ...props },
  animation: null,
  frames: fr,
});

const image = (fr, props = {}) => ({
  id: makeId('blk'),
  type: 'image',
  version: 1,
  // Tomt src: bildeblokken viser rammen, og eieren bytter bilde i Egenskaper.
  // Bevisst ingen eksterne plassholder-URL-er (CSP).
  props: { src: '', alt: 'Bytt dette bildet', fit: 'cover', radius: 'md', href: null, ...props },
  animation: null,
  frames: fr,
});

const button = (fr, label, props = {}) => ({
  id: makeId('blk'),
  type: 'button',
  version: 1,
  props: { label, page: null, href: '#', style: 'primary', ...props },
  animation: null,
  frames: fr,
});

const icon = (fr, glyph, size = 40) => ({
  id: makeId('blk'),
  type: 'icon',
  version: 1,
  props: { glyph, color: 'accent', size },
  animation: null,
  frames: fr,
});

const hoverLift = () => ({ type: 'hover-lift', version: 1, props: {} });

const bg = (...layers) => ({ version: 1, layers });
const colorLayer = (value) => ({ type: 'color', version: 1, props: { value } });
const glowLayer = (x, y, opacity, radius = 0.5) => ({
  type: 'glow', version: 1, props: { x, y, color: 'accent', radius, opacity },
});

/* Utvidbare presets: item(section) lager NESTE element (kort/rad/logo) ferdig plassert etter dem som finnes.
   Antall leses fra seksjonens blokker med en robust markør per preset (bilder, bokser, knapper), så knappen virker også etter redigering.
   Plasseringen antar preset-utlegget; har eieren bygget om seksjonen, er det nye elementet fortsatt vanlige blokker som kan dras på plass. */
const countType = (sec, type) => sec.blocks.filter((b) => b.type === type).length;
const countBoxes = (sec) => sec.blocks.filter((b) => b.type === 'text' && b.props?.box).length;
const maxBottom = (sec) => Math.max(0, ...sec.blocks.map((b) => b.frames.desktop.y + b.frames.desktop.h));
const gridSlot = (n, per, x0, dx, y0, dy) => ({ x: x0 + (n % per) * dx, y: y0 + Math.floor(n / per) * dy });

const section = (preset, minHeight, background, blocks, grid = null) => ({
  id: makeId('sec'),
  version: 1,
  preset,
  size: { minHeight },
  grid,
  background,
  blocks,
  responsive: autoMobile(),
});

export function registerSectionPresets(Urd) {
  /* ---------- Grunnleggende ---------- */

  Urd.sections.define('tom', {
    label: 'Tom seksjon',
    group: 'Grunnleggende',
    hint: 'Blankt lerret å bygge fritt på',
    create: () => section('tom', '40vh', bg(colorLayer('bg')), []),
  });

  Urd.sections.define('hero', {
    label: 'Hero',
    group: 'Grunnleggende',
    hint: 'Stor åpning med gradient og glød, venstrestilt',
    create: () => section('hero', '70vh', {
      version: 1,
      layers: [
        { type: 'gradient', version: 1, props: { stops: ['#0b0e14', '#1a1030'], angle: 160, animate: false } },
        glowLayer(0.7, 0.2, 0.35),
        { type: 'grain', version: 1, props: { opacity: 0.06 } },
      ],
    }, [
      text(frame(8.33, 40, 50, 32), '<h1>Ny overskrift</h1>'),
      text(frame(8.33, 76, 41.67, 20), '<p>Skriv en kort introduksjon her.</p>'),
      button(frame(8.33, 104, 20, 32), 'Les mer'),
    ]),
  });

  Urd.sections.define('hero-sentrert', {
    label: 'Hero, sentrert',
    group: 'Grunnleggende',
    hint: 'Sentrert åpning med to knapper',
    create: () => section('hero-sentrert', '60vh', bg(colorLayer('bg')), [
      text(frame(15, 64, 70, 44), '<h1>Velkommen til oss</h1>', { align: 'center' }),
      text(frame(25, 116, 50, 26), '<p>Én setning om hvem dere er og hva dere gjør.</p>', { align: 'center' }),
      button(frame(31.5, 160, 17, 40), 'Bli medlem'),
      button(frame(51.5, 160, 17, 40), 'Les mer', { style: 'secondary' }),
    ]),
  });

  Urd.sections.define('bilder', {
    label: 'Bilder',
    group: 'Grunnleggende',
    hint: 'Tittel og tre bilderammer',
    create: () => section('bilder', '360px', bg(colorLayer('bg')), [
      text(frame(4, 24, 50, 32), '<h2>Bilder</h2>'),
      image(frame(4, 72, 28, 220)),
      image(frame(36, 72, 28, 220)),
      image(frame(68, 72, 28, 220)),
    ]),
    itemLabel: 'bilde',
    item: (sec) => {
      const { x, y } = gridSlot(countType(sec, 'image'), 3, 4, 32, 72, 244);
      return { blocks: [image(frame(x, y, 28, 220))], bottom: y + 244 };
    },
  });

  Urd.sections.define('kontakt', {
    label: 'Kontakt',
    group: 'Grunnleggende',
    hint: 'Kontaktinfo i kort med e-postknapp',
    create: () => section('kontakt', '320px', bg(colorLayer('surface'), glowLayer(0.2, 0.8, 0.2)), [
      text(frame(10, 32, 40, 36), '<h2>Kontakt oss</h2>'),
      text(frame(10, 84, 36, 130),
        '<p><b>E-post:</b> post@dinforening.no</p><p><b>Telefon:</b> 12 34 56 78</p><p><b>Adresse:</b> Gateadresse 1, 0000 Sted</p>',
        { box: true }),
      button(frame(60, 100, 22, 40), 'Send e-post', { href: 'mailto:post@dinforening.no' }),
    ]),
  });

  Urd.sections.define('footer', {
    label: 'Footer',
    group: 'Grunnleggende',
    hint: 'Enkel bunnseksjon (den delte footeren bor i Footer-panelet)',
    create: () => section('footer', '20vh', bg(colorLayer('surface')), [
      text(frame(25, 24, 50, 20), '<p>© Min forening</p>', { align: 'center' }),
    ]),
  });

  /* ---------- Kort og lister ---------- */

  Urd.sections.define('funksjonskort', {
    label: 'Funksjonskort',
    group: 'Kort og lister',
    hint: 'Tre kort med ikon, tittel og tekst',
    create: () => {
      const card = (x, glyph, title) => {
        const box = text(frame(x, 152, 25, 200),
          `<h3>${title}</h3><p>Kort beskrivelse av hva dere tilbyr.</p>`,
          { align: 'center', box: true });
        box.animation = hoverLift();
        return [icon(frame(x + 10.5, 88, 4, 52), glyph), box];
      };
      return section('funksjonskort', '420px', bg(colorLayer('bg')), [
        text(frame(6, 28, 60, 38), '<h2>Hva vi gjør</h2>'),
        ...card(6, '✦', 'Fellesskap'),
        ...card(37.5, '★', 'Arrangementer'),
        ...card(69, '✓', 'Medlemsfordeler'),
      ]);
    },
    itemLabel: 'kort',
    item: (sec) => {
      const { x, y } = gridSlot(countBoxes(sec), 3, 6, 31.5, 152, 296);
      const box = text(frame(x, y, 25, 200),
        '<h3>Ny tittel</h3><p>Kort beskrivelse av hva dere tilbyr.</p>',
        { align: 'center', box: true });
      box.animation = hoverLift();
      return { blocks: [icon(frame(x + 10.5, y - 64, 4, 52), '✦'), box], bottom: y + 228 };
    },
  });

  Urd.sections.define('nyheter', {
    label: 'Nyheter',
    group: 'Kort og lister',
    hint: 'Tre nyhetskort med bilde, tag og dato',
    create: () => {
      const card = (x) => [
        image(frame(x, 88, 25, 160)),
        text(frame(x, 256, 25, 160),
          '<p><b>Kategori</b> · 1. januar</p><h3>Nyhetstittel</h3><p>Kort ingress som lokker til å lese mer.</p>'),
      ];
      return section('nyheter', '460px', bg(colorLayer('bg')), [
        text(frame(6, 28, 50, 38), '<h2>Siste nytt</h2>'),
        button(frame(78, 30, 16, 36), 'Se alle', { style: 'secondary' }),
        ...card(6), ...card(37.5), ...card(69),
      ]);
    },
    itemLabel: 'sak',
    item: (sec) => {
      const { x, y } = gridSlot(countType(sec, 'image'), 3, 6, 31.5, 88, 344);
      return {
        blocks: [
          image(frame(x, y, 25, 160)),
          text(frame(x, y + 168, 25, 160),
            '<p><b>Kategori</b> · 1. januar</p><h3>Nyhetstittel</h3><p>Kort ingress som lokker til å lese mer.</p>'),
        ],
        bottom: y + 352,
      };
    },
  });

  Urd.sections.define('arrangementer', {
    label: 'Arrangementer',
    group: 'Kort og lister',
    hint: 'Tre rader med dato-badge og påmeldingsknapp',
    create: () => {
      const row = (y, day, month, title) => [
        text(frame(6, y, 8, 88), `<h3>${day}</h3><p>${month}</p>`, { align: 'center', box: true }),
        text(frame(16, y, 58, 88), `<h3>${title}</h3><p>Torsdag kl. 19:00 · Sted</p>`),
        button(frame(78, y + 24, 16, 40), 'Meld deg på', { style: 'secondary' }),
      ];
      return section('arrangementer', '440px', bg(colorLayer('surface')), [
        text(frame(6, 28, 50, 38), '<h2>Hva skjer?</h2>'),
        ...row(88, '11', 'aug', 'Arrangementsnavn'),
        ...row(196, '25', 'aug', 'Neste arrangement'),
        ...row(304, '8', 'sep', 'Enda et arrangement'),
      ]);
    },
    itemLabel: 'rad',
    item: (sec) => {
      const y = maxBottom(sec) + 16;
      return {
        blocks: [
          text(frame(6, y, 8, 88), '<h3>1</h3><p>jan</p>', { align: 'center', box: true }),
          text(frame(16, y, 58, 88), '<h3>Nytt arrangement</h3><p>Torsdag kl. 19:00 · Sted</p>'),
          button(frame(78, y + 24, 16, 40), 'Meld deg på', { style: 'secondary' }),
        ],
        bottom: y + 116,
      };
    },
  });

  Urd.sections.define('team', {
    label: 'Team/styret',
    group: 'Kort og lister',
    hint: 'Portretter med navn, verv og e-post',
    create: () => {
      const member = (x, role) => [
        image(frame(x, 80, 22, 180), { alt: 'Portrett' }),
        text(frame(x, 268, 22, 84),
          `<h3>Navn Navnesen</h3><p>${role}</p><p>navn@dinforening.no</p>`,
          { align: 'center' }),
      ];
      return section('team', '420px', bg(colorLayer('surface')), [
        text(frame(6, 24, 50, 32), '<h2>Styret</h2>'),
        ...member(7.5, 'Leder'), ...member(39, 'Nestleder'), ...member(70.5, 'Kasserer'),
      ]);
    },
    itemLabel: 'person',
    item: (sec) => {
      const { x, y } = gridSlot(countType(sec, 'image'), 3, 7.5, 31.5, 80, 288);
      return {
        blocks: [
          image(frame(x, y, 22, 180), { alt: 'Portrett' }),
          text(frame(x, y + 188, 22, 84),
            '<h3>Navn Navnesen</h3><p>Verv</p><p>navn@dinforening.no</p>',
            { align: 'center' }),
        ],
        bottom: y + 296,
      };
    },
  });

  Urd.sections.define('faq', {
    label: 'FAQ',
    group: 'Kort og lister',
    hint: 'Spørsmål og svar i kort',
    create: () => {
      const qa = (y, q) => text(frame(20, y, 60, 96),
        `<h3>${q}</h3><p>Skriv svaret her.</p>`, { box: true });
      return section('faq', '520px', bg(colorLayer('bg')), [
        text(frame(25, 24, 50, 36), '<h2>Ofte stilte spørsmål</h2>', { align: 'center' }),
        qa(80, 'Hvordan blir jeg medlem?'),
        qa(192, 'Når er dere åpne?'),
        qa(304, 'Hvordan kontakter jeg dere?'),
        text(frame(20, 416, 60, 32),
          '<p>Flere spørsmål? <a href="mailto:post@dinforening.no">Send oss en e-post.</a></p>',
          { align: 'center' }),
      ]);
    },
    itemLabel: 'spørsmål',
    item: (sec) => {
      const y = maxBottom(sec) + 16;
      return {
        blocks: [text(frame(20, y, 60, 96), '<h3>Nytt spørsmål?</h3><p>Skriv svaret her.</p>', { box: true })],
        bottom: y + 124,
      };
    },
  });

  Urd.sections.define('steg', {
    label: 'Steg for steg',
    group: 'Kort og lister',
    hint: 'Tre nummererte kort',
    create: () => {
      const step = (x, n, title) => [
        text(frame(x, 88, 25, 72), `<h3>${n}</h3>`, { align: 'center', size: 44 }),
        text(frame(x, 168, 25, 160),
          `<h3>${title}</h3><p>Forklar dette steget kort.</p>`,
          { align: 'center', box: true }),
      ];
      return section('steg', '400px', bg(colorLayer('bg')), [
        text(frame(6, 28, 60, 38), '<h2>Slik blir du med</h2>'),
        ...step(6, '1', 'Meld deg inn'),
        ...step(37.5, '2', 'Betal kontingent'),
        ...step(69, '3', 'Bli med på det neste'),
      ]);
    },
    itemLabel: 'steg',
    item: (sec) => {
      const n = countBoxes(sec);
      const { x, y } = gridSlot(n, 3, 6, 31.5, 88, 272);
      return {
        blocks: [
          text(frame(x, y, 25, 72), `<h3>${n + 1}</h3>`, { align: 'center', size: 44 }),
          text(frame(x, y + 80, 25, 160),
            '<h3>Nytt steg</h3><p>Forklar dette steget kort.</p>',
            { align: 'center', box: true }),
        ],
        bottom: y + 268,
      };
    },
  });

  Urd.sections.define('hovedoppslag', {
    label: 'Hovedoppslag',
    group: 'Kort og lister',
    hint: 'Én stor sak og to små ved siden',
    create: () => section('hovedoppslag', '540px', bg(colorLayer('bg')), [
      image(frame(6, 40, 55, 300)),
      text(frame(6, 348, 55, 108), '<h2>Hovedsaken</h2><p>Ingress som forteller hvorfor dette er viktigst akkurat nå.</p>'),
      button(frame(6, 464, 14, 38), 'Les mer', { style: 'secondary' }),
      image(frame(66, 40, 28, 120)),
      text(frame(66, 164, 28, 60), '<h3>Liten sak</h3>'),
      image(frame(66, 244, 28, 120)),
      text(frame(66, 368, 28, 60), '<h3>Enda en sak</h3>'),
    ]),
  });

  Urd.sections.define('produkter', {
    label: 'Produkter',
    group: 'Kort og lister',
    hint: 'Tre produktkort; pek Kjøp-knappen på en betalingslenke (f.eks. Vipps)',
    create: () => {
      const product = (x, name, price) => [
        image(frame(x, 88, 25, 200)),
        text(frame(x, 296, 25, 76), `<h3>${name}</h3><p><b>${price}</b></p>`, { align: 'center' }),
        button(frame(x + 5, 380, 15, 40), 'Kjøp'),
      ];
      return section('produkter', '470px', bg(colorLayer('bg')), [
        text(frame(6, 28, 50, 38), '<h2>Merch</h2>'),
        ...product(6, 'Produktnavn', '199 kr'),
        ...product(37.5, 'Produktnavn', '249 kr'),
        ...product(69, 'Produktnavn', '99 kr'),
      ]);
    },
    itemLabel: 'produkt',
    item: (sec) => {
      const { x, y } = gridSlot(countType(sec, 'image'), 3, 6, 31.5, 88, 348);
      return {
        blocks: [
          image(frame(x, y, 25, 200)),
          text(frame(x, y + 208, 25, 76), '<h3>Produktnavn</h3><p><b>199 kr</b></p>', { align: 'center' }),
          button(frame(x + 5, y + 292, 15, 40), 'Kjøp'),
        ],
        bottom: y + 356,
      };
    },
  });

  /* ---------- Fremheving ---------- */

  Urd.sections.define('cta', {
    label: 'CTA-banner',
    group: 'Fremheving',
    hint: 'Full bredde med én tydelig handling',
    create: () => section('cta', '280px', bg(colorLayer('surface'), glowLayer(0.5, 0.5, 0.3, 0.7)), [
      text(frame(20, 56, 60, 40), '<h2>Bli med i fellesskapet</h2>', { align: 'center' }),
      text(frame(25, 104, 50, 26), '<p>Én setning om hvorfor det er verdt det.</p>', { align: 'center' }),
      button(frame(42, 148, 16, 42), 'Bli medlem'),
    ]),
  });

  Urd.sections.define('sitat', {
    label: 'Sitat',
    group: 'Fremheving',
    hint: 'Stort sitat med attribusjon',
    create: () => section('sitat', '300px', bg(colorLayer('bg')), [
      text(frame(15, 64, 70, 116), '<blockquote>«Et sitat fra et medlem, en anmeldelse eller pressen.»</blockquote>', { align: 'center', size: 22 }),
      text(frame(15, 188, 70, 30), '<p>Navn Navnesen, rolle</p>', { align: 'center' }),
    ]),
  });

  Urd.sections.define('statistikk', {
    label: 'Statistikk',
    group: 'Fremheving',
    hint: 'Tre store tall med etikett',
    create: () => {
      const stat = (x, value, label) => [
        text(frame(x, 72, 25, 76), `<h2>${value}</h2>`, { align: 'center', size: 44 }),
        text(frame(x, 156, 25, 36), `<p>${label}</p>`, { align: 'center' }),
      ];
      return section('statistikk', '260px', bg(colorLayer('surface')), [
        ...stat(6, '120+', 'Medlemmer'),
        ...stat(37.5, '25', 'Arrangementer i året'),
        ...stat(69, '1981', 'Grunnlagt'),
      ]);
    },
    itemLabel: 'tall',
    item: (sec) => {
      const { x, y } = gridSlot(Math.floor(countType(sec, 'text') / 2), 3, 6, 31.5, 72, 136);
      return {
        blocks: [
          text(frame(x, y, 25, 76), '<h2>42</h2>', { align: 'center', size: 44 }),
          text(frame(x, y + 84, 25, 36), '<p>Etikett</p>', { align: 'center' }),
        ],
        bottom: y + 144,
      };
    },
  });

  Urd.sections.define('sponsorer', {
    label: 'Sponsorer',
    group: 'Fremheving',
    hint: 'Logorad i gråtone med lenker',
    create: () => {
      // saturate 0 gir gråtonede logoer (klassisk sponsorband).
      // Logoen vises hel (contain) uten avrunding.
      const logo = (x) => image(frame(x, 108, 18.5, 100),
        { alt: 'Sponsorlogo', fit: 'contain', radius: null, saturate: 0 });
      return section('sponsorer', '280px', bg(colorLayer('bg')), [
        text(frame(6, 28, 60, 36), '<h2>Våre støttespillere</h2>'),
        logo(5.5), logo(29), logo(52.5), logo(76),
      ]);
    },
    itemLabel: 'logo',
    item: (sec) => {
      const { x, y } = gridSlot(countType(sec, 'image'), 4, 5.5, 23.5, 108, 124);
      return {
        blocks: [image(frame(x, y, 18.5, 100),
          { alt: 'Sponsorlogo', fit: 'contain', radius: null, saturate: 0 })],
        bottom: y + 124,
      };
    },
  });

  Urd.sections.define('medlemskap', {
    label: 'Medlemskap',
    group: 'Fremheving',
    hint: 'Prisnivåer med fordeler og Vipps-linje',
    create: () => section('medlemskap', '500px', bg(colorLayer('surface')), [
      text(frame(6, 28, 50, 38), '<h2>Medlemskap</h2>'),
      text(frame(14, 88, 32, 250),
        '<h3>Ett år</h3><h2>100 kr</h2><p>Alle arrangementer</p><p>Medlemspriser</p><p>Stemmerett</p>',
        { align: 'center', box: true }),
      text(frame(54, 88, 32, 250),
        '<h3>Hele studietiden</h3><h2>150 kr</h2><p>Alt i ett år-medlemskapet</p><p>Én betaling, ferdig</p>',
        { align: 'center', box: true }),
      button(frame(42, 358, 16, 42), 'Bli medlem'),
      text(frame(25, 414, 50, 30), '<p>Betal med Vipps til #123456</p>', { align: 'center' }),
    ]),
  });
}
