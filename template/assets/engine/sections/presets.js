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
