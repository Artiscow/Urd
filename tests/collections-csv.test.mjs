/**
 * Contract tests for the collections CSV export and import (engine/collections-csv.js):
 * the round trip of every field, RFC 4180 quoting with either separator, the cells read from a spreadsheet,
 * and the import's plan (new, changed, unchanged, not stored, not in the file) before anything is stored.
 * The panel's flow (the download, the file read and the previews) is tested in the browser.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  entriesToCsv, parseCsv, readCsv, importPlan, csvCell, columnsFor, separatorFor, detectSeparator, readDate, readNumber, decodeCsv,
} = await engineImport('collections-csv.js');

// Deliberate Norwegian fixture entries: this is user collection content.
const PRODUCTS = [
  {
    id: 'sjokoladekake', title: 'Sjokoladekake', text: 'Saftig, med "mørk" ganache', price: 350, badge: 'Bestselger', sizes: ['Liten', 'Stor'],
    image: '/media/kake-1a2b.webp', imageAlt: 'Kake med mørk ganache', imageStyle: { x: 0.3, y: 0.6, zoom: 1.2, shape: 'square' },
    requireSize: true, disableUntilChosen: true,
  },
  {
    id: 'boller', title: 'Kanelboller, 6 stk.', price: 49.5, memberPrice: 40, colors: [{ name: 'Grønn', image: '/media/x.webp' }, { name: 'Rosa' }],
    requireColor: true, quantity: { min: 2, max: 10 },
  },
  { id: 'brod', title: 'Brød', price: 55, quantity: {} },
];

const NEWS = [
  { id: 'apning', title: 'Åpning', date: '2026-11-02', text: '<p>Velkommen</p>', page: 'kaker', target: 'priser', image: '/media/a.webp' },
  { id: 'avtale', title: 'Avtale', date: '2026-10-01', href: 'https://x.no/a', newTab: true, rel: ['nofollow'] },
  { id: 'fil', title: 'Vedtekter', href: '/media/vedtekter-1.pdf', download: true },
];
const PAGES = [{ id: 'kaker', path: '/kaker' }];

const plan = (entries, text, kind, options, pages = []) => importPlan(entries, readCsv(text, kind, pages).rows, options);

test('entriesToCsv: header and rows, quoted where a cell holds the separator or a quote, lists with |', () => {
  const csv = entriesToCsv(PRODUCTS, [], { kind: 'products' });
  const lines = csv.trim().split('\n');
  assert.equal(lines[0], columnsFor('products').join(','));
  assert.equal(lines.length, 4);
  assert.ok(csv.includes('"Kanelboller, 6 stk."'));
  assert.ok(csv.includes('"Saftig, med ""mørk"" ganache"'));
  assert.ok(csv.includes('Liten|Stor'));
  assert.ok(csv.includes('Grønn|Rosa'));
  assert.ok(csv.includes('/media/x.webp|'), 'the colours\' pictures by position');
});

test('entriesToCsv: a semicolon file writes decimal commas and a byte-order mark, and a kind writes its own columns', () => {
  const csv = entriesToCsv(PRODUCTS, [], { kind: 'products', sep: ';', bom: true });
  assert.ok(csv.startsWith('﻿id;title;'));
  assert.ok(csv.includes(';49,5;40;'), 'the decimal mark follows the separator');
  assert.ok(csv.includes('Kanelboller, 6 stk.'), 'a comma needs no quotes beside semicolons');
  assert.ok(!columnsFor('products').includes('date'));
  assert.ok(!columnsFor('news').includes('price'));
});

test('round trip: a products collection exported and read again is unchanged, in either separator', () => {
  for (const sep of [',', ';']) {
    const result = plan(PRODUCTS, entriesToCsv(PRODUCTS, [], { kind: 'products', sep, bom: true }), 'products');
    assert.deepEqual(result.counts, { refused: 0, new: 0, changed: 0, skipped: 0, same: 3, missing: 0 }, `sep ${sep}`);
    assert.deepEqual(result.entries, PRODUCTS);
  }
});

test('round trip: a news collection keeps its dates, its page links with their spots, its new tab, rel words and download', () => {
  const result = plan(NEWS, entriesToCsv(NEWS, PAGES, { kind: 'news', sep: ';' }), 'news', {}, PAGES);
  assert.equal(result.counts.same, 3);
  assert.deepEqual(result.entries, NEWS);
});

test('csvCell: what the export writes for yes, a style, a quantity without limits and a page that is gone', () => {
  assert.equal(csvCell(PRODUCTS[0], 'requireSize'), 'yes');
  assert.equal(csvCell(PRODUCTS[0], 'requireColor'), '');
  assert.equal(csvCell(PRODUCTS[0], 'imageStyle'), '{"x":0.3,"y":0.6,"zoom":1.2,"shape":"square"}');
  assert.equal(csvCell(PRODUCTS[2], 'quantity'), 'yes');
  assert.equal(csvCell(PRODUCTS[2], 'quantityMax'), '');
  assert.equal(csvCell({ page: 'borte' }, 'href', PAGES), 'page:borte', 'a page that is gone is written by its id');
  assert.equal(csvCell(PRODUCTS[1], 'price', [], ','), '49,5');
});

test('parseCsv: quotes with newlines and CRLF, a byte-order mark, either separator, empty rows discarded', () => {
  assert.deepEqual(parseCsv('a,"b\nc",d\r\n\r\ne,f,g\n'), [['a', 'b\nc', 'd'], ['e', 'f', 'g']]);
  assert.deepEqual(parseCsv('﻿a;"b;c";d\n', ';'), [['a', 'b;c', 'd']]);
});

test('separatorFor and detectSeparator: the language\'s list separator out, the header\'s in', () => {
  assert.equal(separatorFor('nb'), ';');
  assert.equal(separatorFor('tr'), ';');
  assert.equal(separatorFor('en-GB'), ',');
  assert.equal(detectSeparator('﻿id;title;price\n1;"a,b";2\n'), ';');
  assert.equal(detectSeparator('id,title\n'), ',');
  assert.equal(detectSeparator('"a;b",title,x\n'), ',', 'a separator inside quotes does not count');
  assert.equal(detectSeparator('title\nBolle\n'), ',');
});

test('readDate and readNumber: what a spreadsheet writes in the admin\'s languages reads, the rest does not', () => {
  assert.equal(readDate('2026-11-02'), '2026-11-02');
  assert.equal(readDate('2.11.2026'), '2026-11-02');
  assert.equal(readDate('02/11/2026'), '2026-11-02', 'day first, as en-GB, nb and tr write it');
  assert.equal(readDate('2026-2-30'), null, 'a day that does not exist');
  assert.equal(readDate('11-02-2026'), null);
  assert.equal(readNumber('1200.50'), 1200.5);
  assert.equal(readNumber('1 200,50', ','), 1200.5);
  assert.equal(readNumber('1.200,50', ','), 1200.5);
  assert.equal(readNumber('1,200.50'), 1200.5);
  assert.equal(readNumber('49,5'), 49.5, 'a decimal comma that cannot be a thousand');
  assert.equal(readNumber('49.5', ','), 49.5);
  assert.equal(readNumber('1.125'), 1.125, 'three decimals by the file\'s own mark');
  assert.equal(readNumber('1,125', ','), 1.125);
  assert.equal(readNumber('1,125'), 1125, 'a thousand where the mark is a point');
  assert.equal(readNumber('1.125', ','), 1125);
  assert.ok(Number.isNaN(readNumber('ca. 90')));
  assert.ok(Number.isNaN(readNumber('-5')));
});

test('a price with three decimals survives the round trip in either separator', () => {
  const entries = [{ id: 'a', title: 'A', price: 1.125 }, { id: 'b', title: 'B', price: 1125 }];
  for (const sep of [',', ';']) {
    const result = plan(entries, entriesToCsv(entries, [], { kind: 'products', sep }), 'products');
    assert.equal(result.counts.same, 2, `sep ${sep}`);
  }
});

test('decodeCsv: UTF-8, and windows-1252 where the bytes are not UTF-8', () => {
  assert.equal(decodeCsv(new TextEncoder().encode('title\nBrød\n').buffer), 'title\nBrød\n');
  const latin = Uint8Array.from([0x74, 0x69, 0x74, 0x6c, 0x65, 0x0a, 0x42, 0x72, 0xf8, 0x64]);
  assert.equal(decodeCsv(latin.buffer), 'title\nBrød');
});

test('readCsv: the header drives the columns, rows are numbered as a spreadsheet numbers them, and other kinds\' columns are set aside', () => {
  const read = readCsv('price;title;date;colour\n"49,50";Bolle;;x\n', 'products');
  assert.equal(read.sep, ';');
  assert.deepEqual(read.columns, ['title', 'price']);
  assert.deepEqual(read.ignored, ['date', 'colour']);
  assert.equal(read.rows[0].row, 2);
  assert.equal(read.rows[0].set.price, 49.5);
  assert.equal(readCsv('id,name\n1,x\n', 'news'), null, 'no title column');
  assert.equal(readCsv('id,title\n', 'news'), null, 'no rows');
  assert.equal(readCsv('', 'news'), null);
});

test('readCsv: a row that does not read is not stored, and its reason names the cell', () => {
  const text = [
    'id,title,date,image,newTab,rel,imageStyle',
    'a,,2026-11-02,,,,',
    'b,B,2026-13-01,,,,',
    'c,C,,https://x.no/p.jpg,,,',
    'd,D,,,kanskje,,',
    'e,E,,,,friend,',
    'f,F,,,,,"{""zoom"":9}"',
    'g,G,02.11.2026,/media/g.webp,ja,Nofollow,"{""x"":0.2}"',
  ].join('\n');
  const rows = readCsv(text, 'news').rows;
  assert.deepEqual(rows.map((r) => r.problem && [r.problem.key, r.problem.column]), [
    ['noTitle', 'title'], ['date', 'date'], ['image', 'image'], ['yesNo', 'newTab'], ['rel', 'rel'], ['style', 'imageStyle'], null,
  ]);
  assert.deepEqual(rows[6].set, { title: 'G', date: '2026-11-02', newTab: true, image: '/media/g.webp', imageStyle: { x: 0.2 }, rel: ['nofollow'] });
  assert.equal(readCsv('title,price\nX,ca. 90\n', 'products').rows[0].problem.value, 'ca. 90');
  assert.equal(readCsv('title,quantityMax\nX,120\n', 'products').rows[0].problem.key, 'quantity');
});

test('importPlan: one new and one changed row add one entry and update one, the rest kept', () => {
  const text = 'id,title,price\nboller,"Kanelboller, 6 stk.",130\n,Skoleboller,45\n';
  const result = plan(PRODUCTS, text, 'products');
  assert.deepEqual(result.counts, { refused: 0, new: 1, changed: 1, skipped: 0, same: 0, missing: 2 });
  assert.equal(result.entries.length, 4);
  assert.equal(result.entries[1].price, 130);
  assert.equal(result.entries[1].memberPrice, 40, 'a column the file lacks leaves its field as it stands');
  assert.deepEqual(result.entries[1].colors, PRODUCTS[1].colors);
  assert.deepEqual(result.items.find((i) => i.status === 'changed').changes, ['price']);
  assert.equal(result.entries[3].title, 'Skoleboller');
  assert.equal(result.entries[3].id, 'entry-new');
});

test('importPlan: an empty cell clears its field, and colours keep their pictures by name without a pictures column', () => {
  const result = plan(PRODUCTS, 'id,title,badge,colors\nboller,"Kanelboller, 6 stk.",,Rosa|Grønn|Gul\n', 'products');
  const after = result.entries[1];
  assert.equal(after.badge, undefined);
  assert.deepEqual(after.colors, [{ name: 'Rosa' }, { name: 'Grønn', image: '/media/x.webp' }, { name: 'Gul' }]);
  const cleared = plan(PRODUCTS, 'id,title,sizes,imageStyle,requireSize\nsjokoladekake,Sjokoladekake,,,\n', 'products').entries[0];
  assert.equal(cleared.sizes, undefined);
  assert.equal(cleared.imageStyle, undefined);
  assert.equal(cleared.requireSize, undefined);
});

test('importPlan: the quantity turned on, given limits, and turned off', () => {
  const on = plan(PRODUCTS, 'id,title,quantityMax\nsjokoladekake,Sjokoladekake,5\n', 'products').entries[0];
  assert.deepEqual(on.quantity, { max: 5 }, 'a limit turns the quantity on');
  const kept = plan(PRODUCTS, 'id,title,quantityMax\nboller,"Kanelboller, 6 stk.",5\n', 'products').entries[1];
  assert.deepEqual(kept.quantity, { min: 2, max: 5 }, 'the least stands without its column');
  const off = plan(PRODUCTS, 'id,title,quantity,quantityMin\nboller,"Kanelboller, 6 stk.",,2\n', 'products').entries[1];
  assert.equal(off.quantity, undefined);
});

test('importPlan: matched rows skipped, entries not in the file removed, a repeated id not stored', () => {
  const text = 'id,title,price\nboller,"Kanelboller, 6 stk.",130\nboller,Igjen,1\n';
  const skip = plan(PRODUCTS, text, 'products', { matched: 'skip', missing: 'remove' });
  assert.deepEqual(skip.counts, { refused: 1, new: 0, changed: 0, skipped: 1, same: 0, missing: 2 });
  assert.deepEqual(skip.entries, [PRODUCTS[1]], 'the skipped row leaves its entry, the others are removed');
  assert.equal(skip.items.find((i) => i.status === 'refused').problem.key, 'repeatedId');
});

test('importPlan: a refused row still names its entry, so «Remove» never takes it away', () => {
  const result = plan(PRODUCTS, 'id,title,price\nboller,"Kanelboller, 6 stk.",ca. 90\n', 'products', { missing: 'remove' });
  assert.deepEqual(result.items.map((i) => i.status).sort(), ['missing', 'missing', 'refused']);
  assert.ok(result.entries.some((e) => e.id === 'boller'), 'the entry the refused row names stays');
  assert.deepEqual(result.entries.find((e) => e.id === 'boller'), PRODUCTS[1], 'and stays as it was');
});

test('importPlan: an imported entry holds its own lists, not the plan\'s', () => {
  const rows = readCsv('id,title,sizes\nny,Ny,S|M\n', 'products').rows;
  const entry = importPlan([], rows).entries[0];
  entry.sizes.push('L');
  assert.deepEqual(rows[0].set.sizes, ['S', 'M']);
});

test('importPlan: a new row keeps an id that fits and is free, else gets a new one', () => {
  let n = 0;
  const make = (prefix) => `${prefix}-${++n}`;
  const read = readCsv('id,title\nny-kake,Ny kake\nboller-x,X\nUgyldig Id,Y\n', 'products').rows;
  const result = importPlan(PRODUCTS, read, {}, make);
  assert.deepEqual(result.entries.slice(3).map((e) => e.id), ['ny-kake', 'boller-x', 'entry-1']);
});

test('importPlan: an address that names a page of the register is read back as that page and its spot', () => {
  const text = 'id,title,href\na,A,/kaker#priser\nb,B,/annet\nc,C,https://x.no\n';
  const entries = plan([], text, 'news', {}, PAGES).entries;
  assert.deepEqual([entries[0].page, entries[0].target, entries[0].href], ['kaker', 'priser', undefined]);
  assert.equal(entries[1].href, '/annet', 'a path that names no page stays an address');
  assert.equal(entries[2].href, 'https://x.no');
});

test('a row keeps the number the spreadsheet gives it past an empty line, and a page the register no longer has survives the round trip', () => {
  const rows = readCsv('id,title\na,A\n\n,\nb,\n', 'news').rows;
  assert.deepEqual(rows.map((r) => [r.row, r.id]), [[2, 'a'], [5, 'b']]);
  const gone = [{ id: 'a', title: 'A', page: 'borte', target: 'priser' }];
  assert.equal(csvCell(gone[0], 'href', PAGES), 'page:borte#priser');
  const result = plan(gone, entriesToCsv(gone, PAGES, { kind: 'news' }), 'news', {}, PAGES);
  assert.equal(result.counts.same, 1);
});
