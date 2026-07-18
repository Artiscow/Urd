/**
 * Kjernens seksjonspresets: datafabrikker som produserer en startseksjon.
 * En preset er IKKE en kodevei - etter opprettelse er alle seksjoner
 * likestilte generiske containere (se docs/SKJEMA.md). Plugins kan
 * definere flere presets med samme API.
 */

/** Kort, kollisjonstrygg nok id for seksjoner/blokker laget i editoren. */
export function makeId(prefix) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

const autoMobile = () => ({ mobile: { mode: 'auto', attention: null } });

export function registerSectionPresets(Urd) {
  Urd.sections.define('tom', {
    label: 'Tom seksjon',
    create: () => ({
      id: makeId('sec'),
      version: 1,
      preset: 'tom',
      size: { minHeight: '40vh' },
      grid: null,
      background: {
        version: 1,
        layers: [{ type: 'color', version: 1, props: { value: 'bg' } }],
      },
      blocks: [],
      responsive: autoMobile(),
    }),
  });

  Urd.sections.define('hero', {
    label: 'Hero',
    create: () => ({
      id: makeId('sec'),
      version: 1,
      preset: 'hero',
      size: { minHeight: '70vh' },
      grid: null,
      background: {
        version: 1,
        layers: [
          { type: 'gradient', version: 1, props: { stops: ['#0b0e14', '#1a1030'], angle: 160, animate: false } },
          { type: 'glow', version: 1, props: { x: 0.7, y: 0.2, color: 'accent', radius: 0.5, opacity: 0.35 } },
          { type: 'grain', version: 1, props: { opacity: 0.06 } },
        ],
      },
      blocks: [
        {
          id: makeId('blk'),
          type: 'text',
          version: 1,
          props: { html: '<h1>Ny overskrift</h1>', align: 'left' },
          animation: null,
          frames: { desktop: { x: 8.33, y: 40, w: 50, h: 32, z: 1, rot: 0 }, mobile: null },
        },
        {
          id: makeId('blk'),
          type: 'text',
          version: 1,
          props: { html: '<p>Skriv en kort introduksjon her.</p>', align: 'left' },
          animation: null,
          frames: { desktop: { x: 8.33, y: 76, w: 41.67, h: 20, z: 1, rot: 0 }, mobile: null },
        },
        {
          id: makeId('blk'),
          type: 'button',
          version: 1,
          props: { label: 'Les mer', page: null, href: '#', style: 'primary' },
          animation: null,
          frames: { desktop: { x: 8.33, y: 104, w: 20, h: 32, z: 1, rot: 0 }, mobile: null },
        },
      ],
      responsive: autoMobile(),
    }),
  });

  Urd.sections.define('bilder', {
    label: 'Bilder',
    create: () => {
      const img = (x) => ({
        id: makeId('blk'),
        type: 'image',
        version: 1,
        // Tomt src: bildeblokken viser rammen, og eieren bytter bilde i
        // Egenskaper. Bevisst ingen eksterne plassholder-URL-er (CSP).
        props: { src: '', alt: 'Bytt dette bildet', fit: 'cover', radius: 'md', href: null },
        animation: null,
        frames: { desktop: { x, y: 72, w: 28, h: 220, z: 1, rot: 0 }, mobile: null },
      });
      return {
        id: makeId('sec'),
        version: 1,
        preset: 'bilder',
        size: { minHeight: '360px' },
        grid: null,
        background: { version: 1, layers: [{ type: 'color', version: 1, props: { value: 'bg' } }] },
        blocks: [
          {
            id: makeId('blk'),
            type: 'text',
            version: 1,
            props: { html: '<h2>Bilder</h2>', align: 'left' },
            animation: null,
            frames: { desktop: { x: 4, y: 24, w: 50, h: 32, z: 1, rot: 0 }, mobile: null },
          },
          img(4), img(36), img(68),
        ],
        responsive: autoMobile(),
      };
    },
  });

  Urd.sections.define('team', {
    label: 'Team/styret',
    create: () => {
      const member = (x, role) => ([
        {
          id: makeId('blk'),
          type: 'image',
          version: 1,
          props: { src: '', alt: 'Portrett', fit: 'cover', radius: 'md', href: null },
          animation: null,
          frames: { desktop: { x, y: 80, w: 22, h: 180, z: 1, rot: 0 }, mobile: null },
        },
        {
          id: makeId('blk'),
          type: 'text',
          version: 1,
          props: { html: `<h3>Navn Navnesen</h3><p>${role}</p>`, align: 'center', box: false },
          animation: null,
          frames: { desktop: { x, y: 268, w: 22, h: 64, z: 1, rot: 0 }, mobile: null },
        },
      ]);
      return {
        id: makeId('sec'),
        version: 1,
        preset: 'team',
        size: { minHeight: '400px' },
        grid: null,
        background: { version: 1, layers: [{ type: 'color', version: 1, props: { value: 'surface' } }] },
        blocks: [
          {
            id: makeId('blk'),
            type: 'text',
            version: 1,
            props: { html: '<h2>Styret</h2>', align: 'left' },
            animation: null,
            frames: { desktop: { x: 6, y: 24, w: 50, h: 32, z: 1, rot: 0 }, mobile: null },
          },
          ...member(6, 'Leder'), ...member(39, 'Nestleder'), ...member(72, 'Kasserer'),
        ],
        responsive: autoMobile(),
      };
    },
  });

  Urd.sections.define('faq', {
    label: 'FAQ',
    create: () => {
      const qa = (y, q) => ({
        id: makeId('blk'),
        type: 'text',
        version: 1,
        props: { html: `<h3>${q}</h3><p>Skriv svaret her.</p>`, align: 'left', box: true },
        animation: null,
        frames: { desktop: { x: 20, y, w: 60, h: 96, z: 1, rot: 0 }, mobile: null },
      });
      return {
        id: makeId('sec'),
        version: 1,
        preset: 'faq',
        size: { minHeight: '460px' },
        grid: null,
        background: { version: 1, layers: [{ type: 'color', version: 1, props: { value: 'bg' } }] },
        blocks: [
          {
            id: makeId('blk'),
            type: 'text',
            version: 1,
            props: { html: '<h2>Ofte stilte spørsmål</h2>', align: 'center' },
            animation: null,
            frames: { desktop: { x: 25, y: 24, w: 50, h: 36, z: 1, rot: 0 }, mobile: null },
          },
          qa(80, 'Hvordan blir jeg medlem?'),
          qa(192, 'Når er dere åpne?'),
          qa(304, 'Hvordan kontakter jeg dere?'),
        ],
        responsive: autoMobile(),
      };
    },
  });

  Urd.sections.define('kontakt', {
    label: 'Kontakt',
    create: () => ({
      id: makeId('sec'),
      version: 1,
      preset: 'kontakt',
      size: { minHeight: '320px' },
      grid: null,
      background: {
        version: 1,
        layers: [
          { type: 'color', version: 1, props: { value: 'surface' } },
          { type: 'glow', version: 1, props: { x: 0.2, y: 0.8, color: 'accent', radius: 0.5, opacity: 0.2 } },
        ],
      },
      blocks: [
        {
          id: makeId('blk'),
          type: 'text',
          version: 1,
          props: { html: '<h2>Kontakt oss</h2>', align: 'left' },
          animation: null,
          frames: { desktop: { x: 10, y: 32, w: 40, h: 36, z: 1, rot: 0 }, mobile: null },
        },
        {
          id: makeId('blk'),
          type: 'text',
          version: 1,
          props: {
            html: '<p>✉ post@dinforening.no</p><p>📞 12 34 56 78</p><p>📍 Gateadresse 1, 0000 Sted</p>',
            align: 'left',
            box: true,
          },
          animation: null,
          frames: { desktop: { x: 10, y: 84, w: 36, h: 130, z: 1, rot: 0 }, mobile: null },
        },
        {
          id: makeId('blk'),
          type: 'button',
          version: 1,
          props: { label: 'Send e-post', page: null, href: 'mailto:post@dinforening.no', style: 'primary' },
          animation: null,
          frames: { desktop: { x: 60, y: 100, w: 22, h: 40, z: 1, rot: 0 }, mobile: null },
        },
      ],
      responsive: autoMobile(),
    }),
  });

  Urd.sections.define('footer', {
    label: 'Footer',
    create: () => ({
      id: makeId('sec'),
      version: 1,
      preset: 'footer',
      size: { minHeight: '20vh' },
      grid: null,
      background: {
        version: 1,
        layers: [{ type: 'color', version: 1, props: { value: 'surface' } }],
      },
      blocks: [
        {
          id: makeId('blk'),
          type: 'text',
          version: 1,
          props: { html: '<p>© Min forening</p>', align: 'center' },
          animation: null,
          frames: { desktop: { x: 25, y: 24, w: 50, h: 20, z: 1, rot: 0 }, mobile: null },
        },
      ],
      responsive: autoMobile(),
    }),
  });
}
