/**
 * Første EKTE filmigrering i Urd: sidefiler v1 (frames i grid-enheter)
 * løftes til v2 (fysiske enheter: % av bredden / px). Dette er beviset
 * for løfte 2 i praksis: innhold laget mot gammelt format flytter seg
 * ikke en piksel ved lasting i ny motor.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { liftPageFile, PAGE_SCHEMA_VERSION } from '../template/assets/engine/migrate.js';

const site = { grid: { columns: 24, rowHeight: 8 } };

const v1Page = () => ({
  schemaVersion: 1,
  meta: { id: 'test', title: 'Test' },
  sections: [
    {
      id: 'sec-a',
      version: 1,
      grid: null,
      blocks: [
        {
          id: 'blk-a',
          type: 'text',
          version: 1,
          props: {},
          frames: {
            desktop: { x: 2, y: 6, w: 12, h: 4, z: 1, rot: 0 },
            mobile: { x: 1, y: 14, w: 10, h: 2, z: 1, rot: 0 },
          },
        },
      ],
    },
    {
      id: 'sec-b',
      version: 1,
      // Egen grid-overstyring: omregningen skal bruke DENNE, ikke sitets.
      grid: { columns: 12, rowHeight: 12 },
      blocks: [
        {
          id: 'blk-b',
          type: 'text',
          version: 1,
          props: {},
          frames: { desktop: { x: 3, y: 2, w: 6, h: 3, z: 1, rot: 0 }, mobile: null },
        },
      ],
    },
  ],
});

test('v1-frames regnes om til fysiske enheter med riktig grid', () => {
  const lifted = liftPageFile(v1Page(), site);
  assert.equal(lifted.schemaVersion, PAGE_SCHEMA_VERSION);

  const a = lifted.sections[0].blocks[0].frames;
  assert.deepEqual(a.desktop, { x: 8.33, y: 48, w: 50, h: 32, z: 1, rot: 0 });
  assert.deepEqual(a.mobile, { x: 4.17, y: 112, w: 41.67, h: 16, z: 1, rot: 0 });

  const b = lifted.sections[1].blocks[0].frames;
  assert.deepEqual(b.desktop, { x: 25, y: 24, w: 50, h: 36, z: 1, rot: 0 });
  assert.equal(b.mobile, null);
});

test('originalen muteres aldri', () => {
  const original = v1Page();
  liftPageFile(original, site);
  assert.equal(original.schemaVersion, 1);
  assert.equal(original.sections[0].blocks[0].frames.desktop.x, 2);
});

test('filer på gjeldende versjon passerer uendret', () => {
  const current = { schemaVersion: PAGE_SCHEMA_VERSION, meta: {}, sections: [] };
  assert.deepEqual(liftPageFile(current, site), current);
});

test('nyere filer enn motoren returneres urørt (trygg nedgradering)', () => {
  const future = { schemaVersion: PAGE_SCHEMA_VERSION + 5, meta: {}, sections: [] };
  assert.deepEqual(liftPageFile(future, site), future);
});
