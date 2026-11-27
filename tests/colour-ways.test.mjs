/**
 * The ways to make a colour set (editor/src/lib/colour-ways.js, BACKLOG 0.7.9.3).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { shades, matches, blend, contrast, readable, mainColours, codesIn, shuffle, sitePictures, nameFromPicture, READY_SETS, SHADE_KINDS, MATCH_KINDS, READ_LEVELS } from '../editor/src/lib/colour-ways.js';
import { codeToOklch, colourGrid } from '../editor/src/lib/colour-grid.js';
import { ENGINE_DIR } from './_engine.mjs';

const CODE = /^#[0-9a-f]{6}$/;
const light = (code) => codeToOklch(code)[0];

test('shades: light to dark, lighter, darker or greyer, as many as asked, every one a code', () => {
  const all = shades('#15b39a', 'all', 9);
  assert.equal(all.length, 9);
  assert.ok(all.every(({ code }) => CODE.test(code)));
  for (let i = 1; i < all.length; i++) assert.ok(light(all[i].code) < light(all[i - 1].code), 'light to dark');
  const lighter = shades('#15b39a', 'lighter', 5);
  assert.equal(lighter[0].code, '#15b39a', 'lighter starts at the colour');
  assert.ok(light(lighter.at(-1).code) > 0.9);
  const darker = shades('#15b39a', 'darker', 5);
  assert.ok(light(darker.at(-1).code) < light(darker[0].code));
  const greyer = shades('#15b39a', 'greyer', 5);
  assert.ok(codeToOklch(greyer.at(-1).code)[1] < 0.01, 'greyer ends grey');
  for (const kind of SHADE_KINDS) assert.ok(shades('#808080', kind, 7).length >= 1, `${kind} works on a grey`);
  for (const kind of SHADE_KINDS) assert.ok(shades('#808080', kind, 7).every(({ code }) => codeToOklch(code)[1] < 0.005), `${kind}: a grey's shades are greys`);
  assert.equal(shades('#333333', 'darker', 5)[0].code, '#333333', 'darker starts at the grey itself');
});

test('matches: the colour among five that go with it, the hue turned by each kind', () => {
  for (const kind of MATCH_KINDS) {
    const list = matches('#15b39a', kind);
    assert.ok(list.length >= 4 && list.length <= 5, kind);
    assert.ok(list.some(({ code }) => code === '#15b39a'), `${kind}: the colour itself`);
  }
  const hue = (code) => codeToOklch(code)[2];
  const opposite = matches('#15b39a', 'opposite')[2].code;
  const turn = (((hue(opposite) - hue('#15b39a')) % 360) + 360) % 360;
  assert.ok(Math.abs(turn - 180) < 12, `the opposite stands across the wheel (${turn.toFixed(1)}°)`);
});

test('blend: both ends as given, the steps between them', () => {
  const list = blend('#15b39a', '#ffc857', 7);
  assert.equal(list.length, 7);
  assert.equal(list[0].code, '#15b39a');
  assert.equal(list.at(-1).code, '#ffc857');
  assert.equal(blend('#000000', '#000000', 5).length, 1, 'the same colour twice gives one');
});

test('readable: every colour reaches the contrast asked on the background, a column of the palette each', () => {
  assert.ok(Math.abs(contrast('#000000', '#ffffff') - 21) < 0.01);
  assert.equal(contrast('#15b39a', '#15b39a'), 1);
  for (const [, level] of READ_LEVELS) {
    for (const bg of ['#ffffff', '#eaf3f0', '#15b39a', '#04241d', '#000000']) {
      const list = readable(bg, level);
      assert.ok(list.every(({ code }) => contrast(code, bg) >= level), `${bg} at ${level}`);
      assert.ok(list.length <= 13);
    }
  }
  assert.ok(readable('#ffffff', 4.5).length >= 10, 'on white most hues have a readable step');
  const levels = READ_LEVELS.map(([, level]) => readable('#ffffff', level).map(({ code }) => code).join());
  assert.equal(new Set(levels).size, 3, 'each level gives its own colours');
  for (const [bg, lighter] of [['#ffffff', true], ['#1e2a3a', false]]) {
    const vivid = colourGrid('vivid');
    for (const { code } of readable(bg, 4.5)) {
      const col = vivid[0].findIndex((_, c) => vivid.some((row) => row[c].code === code));
      if (col < 0) continue;
      const row = vivid.findIndex((r) => r[col].code === code);
      const nearer = vivid[row + (lighter ? -1 : 1)]?.[col]?.code;
      assert.ok(!nearer || contrast(nearer, bg) < 4.5, `${bg}: ${code} is the step nearest the middle that reads`);
    }
  }
});

test('a picture\'s main colours: the largest groups first, near twins passed by, see-through pixels left out', () => {
  const px = [];
  const put = (rgb, n, a = 255) => { for (let i = 0; i < n; i++) px.push(...rgb, a); };
  put([21, 179, 154], 50);
  put([22, 180, 155], 10);
  put([255, 200, 87], 30);
  put([0, 0, 0], 100, 0);
  put([200, 20, 30], 5);
  const list = mainColours(new Uint8ClampedArray(px), 8);
  assert.deepEqual(list.map(({ code }) => code), ['#15b39a', '#ffc857', '#c8141e'], 'the near twin and the see-through pixels add no colour');
  assert.equal(mainColours(new Uint8ClampedArray(px), 1).length, 1);
});

test('codes in a text: with #, or as a palette link has them, each once; words that read as hex are passed by', () => {
  assert.deepEqual(codesIn('https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51').map(({ code }) => code), ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']);
  assert.deepEqual(codesIn('Brand: #15B39A, accent #FC0; again #15b39a. A facade, a decade, 123 and #12345.').map(({ code }) => code), ['#15b39a', '#ffcc00']);
  assert.deepEqual(codesIn('nothing here'), []);
  assert.deepEqual(codesIn('https://coolors.co/ffffff-264653-e9c46a-000000').map(({ code }) => code), ['#ffffff', '#264653', '#e9c46a', '#000000'], 'a link\'s codes of letters alone too');
  assert.deepEqual(codesIn('Glass: #15b39a80').map(({ code }) => code), ['#15b39a80'], 'a code with its opacity');
  assert.equal(codesIn(Array.from({ length: 60 }, (_, i) => `#0000${i.toString(16).padStart(2, '0')}`).join(' ')).length, 48);
});

test('a shuffle changes only the colours not locked', () => {
  let n = 0;
  const random = () => ((n += 0.137) % 1);
  const start = Array.from({ length: 5 }, () => ({ code: '#888888', locked: false }));
  const first = shuffle(start, random);
  assert.ok(first.every(({ code }) => CODE.test(code) && code !== '#888888'));
  first[1].locked = true;
  first[3].locked = true;
  const second = shuffle(first, random);
  assert.equal(second[1].code, first[1].code);
  assert.equal(second[3].code, first[3].code);
  assert.ok(second[0].code !== first[0].code || second[2].code !== first[2].code, 'the others change');
});

test('the site\'s pictures: the addresses of pictures and the pictures kept in a draft, the most used first', () => {
  const docs = [
    { nav: { logo: { src: '/media/images/logo-1a2b.webp' } } },
    { sections: [{ blocks: [{ props: { src: '/media/images/kake.jpg' } }, { props: { src: '/media/images/kake.jpg' } }, { props: { src: 'data:image/png;base64,iVBORw0KGgo=' } }, { props: { href: '/om-oss', html: '<p>/media/images/not-a-value.jpg in words</p>' } }] }] },
  ];
  assert.deepEqual(sitePictures(docs), ['/media/images/kake.jpg', '/media/images/logo-1a2b.webp', 'data:image/png;base64,iVBORw0KGgo=']);
  assert.deepEqual(sitePictures([{ a: 'https://other.example/y.png', b: '//cdn.example/z.jpg', c: 'media/images/own.png' }]), ['media/images/own.png'], 'another host\'s pictures cannot be read here');
});

test('the ready-made sets: seven of twelve colours, each a code with its name in nb, en-GB and tr', () => {
  assert.deepEqual(READY_SETS.map(([id]) => id), ['metals', 'neon', 'jewels', 'earth', 'nature', 'signals', 'festive']);
  const keys = new Set();
  for (const [, list] of READY_SETS) {
    assert.equal(list.length, 12);
    for (const [key, code] of list) {
      assert.match(code, CODE, key);
      assert.ok(!keys.has(key), `${key} once`);
      keys.add(key);
    }
  }
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const dict = readFileSync(new URL(`locales/admin/${lang}.js`, ENGINE_DIR), 'utf8');
    for (const [id, list] of READY_SETS) {
      assert.ok(dict.includes(`'cp.ready.${id}':`), `${lang}: cp.ready.${id}`);
      for (const [key] of list) assert.ok(dict.includes(`'cp.readyColour.${key}':`), `${lang}: cp.readyColour.${key}`);
    }
  }
});

test('the set maker stands in the palette\'s place, and a set made there opens at once', () => {
  const picker = readFileSync(new URL('../editor/src/lib/ColorPicker.svelte', import.meta.url), 'utf8');
  assert.match(picker, /\{#if making\}\s*<ColourSetMaker inUse=\{currentColor\(\)\} onmake=\{madeSet\} onclose=\{\(\) => \(making = false\)\} \/>/);
  assert.match(picker, /if \(ed\?\.addColourSet\?\.\(\{ id, name, colors \}\)\) \{\s*making = false;\s*openSet = id;/);
  const maker = readFileSync(new URL('../editor/src/lib/ColourSetMaker.svelte', import.meta.url), 'utf8');
  assert.match(maker, /const src = URL\.createObjectURL\(file\);/, 'a picture of one\'s own is read in the browser, through a blob address of its own');
  assert.doesNotMatch(maker, /fetch\(/, 'nothing is sent');
});

test('the set maker\'s ten ways stand as tiles, each with a drawing, a short word, a full name and a line in nb, en-GB and tr', () => {
  const maker = readFileSync(new URL('../editor/src/lib/ColourSetMaker.svelte', import.meta.url), 'utf8');
  const ways = JSON.parse(maker.match(/const WAYS = (\[[^\]]*\]);/)[1].replaceAll("'", '"'));
  assert.equal(ways.length, 10);
  const icons = maker.match(/const WAY_ICONS = \{([\s\S]*?)\n {2}\};/)[1];
  for (const id of ways) assert.match(icons, new RegExp(`^\\s+${id}: `, 'm'), `${id} has a drawing`);
  assert.match(maker, /\{#each WAYS as id \(id\)\}\s*<button type="button" class="sm-way" aria-pressed=\{way === id\}/);
  assert.doesNotMatch(maker, /Dropdown/, 'the ways are not chosen in a dropdown');
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const dict = readFileSync(new URL(`locales/admin/${lang}.js`, ENGINE_DIR), 'utf8');
    for (const key of ['cp.maker.ways', ...ways.flatMap((id) => [`cp.way.${id}`, `cp.wayAbout.${id}`, `cp.wayShort.${id}`])]) {
      assert.ok(dict.includes(`'${key}':`), `${lang}: ${key}`);
    }
  }
});

test('a set from a picture is named after the picture: its file name without the extension, the upload\'s hash and the dashes', () => {
  assert.equal(nameFromPicture('/media/images/bakgrunn-f5939d16.webp'), 'bakgrunn');
  assert.equal(nameFromPicture('/media/images/kake-med-b%C3%A6r-1a2b3c4d.jpg?v=2'), 'kake med bær');
  assert.equal(nameFromPicture('IMG_2034.JPG'), 'IMG 2034');
  assert.equal(nameFromPicture('logo-cafe.png'), 'logo cafe', 'a last word that is no hash stays');
  assert.equal(nameFromPicture('data:image/png;base64,iVBORw0KGgo='), '', 'a picture kept as data has no name');
  assert.equal(nameFromPicture(`${'a'.repeat(60)}.png`).length, 40);
  const maker = readFileSync(new URL('../editor/src/lib/ColourSetMaker.svelte', import.meta.url), 'utf8');
  assert.match(maker, /if \(way === 'sitePictures'\) return \{ name: nameFromPicture\(sitePic\) \|\| ta\('cp\.made\.sitePicture'\)/);
  assert.match(maker, /pictureName = nameFromPicture\(file\.name\);/);
});

test('the colour a way starts from is chosen in a colour picker of its own, which makes no sets', () => {
  const maker = readFileSync(new URL('../editor/src/lib/ColourSetMaker.svelte', import.meta.url), 'utf8');
  const pickers = maker.match(/<ColorPicker [\s\S]*?\/>/g) ?? [];
  assert.equal(pickers.length, 2, 'the colour, and the second colour of a blend');
  for (const tag of pickers) {
    assert.match(tag, /newSets=\{false\}/);
    assert.match(tag, /onchange=\{\(picked\) => \((base|second) = codeOf\(picked\)\)\}/);
  }
  const picker = readFileSync(new URL('../editor/src/lib/ColorPicker.svelte', import.meta.url), 'utf8');
  assert.match(picker, /\{#if newSets\}\s*<button type="button" class="cp-chip cp-chip-add"/);
  assert.match(picker, /ed\.renameColourSet\(opened\.id, nameText\); \}\} onkeydown=\{nameKey\}/, 'Enter in the name field ends the naming');
  assert.match(picker, /if \(event\.key !== 'Enter'\) return;\s*event\.preventDefault\(\);\s*changing = false;/);
});

test('a rule for a panel\'s own colour picker stops at a picker\'s card, so it never reaches the picker inside the set maker', () => {
  const root = new URL('../editor/src/', import.meta.url).pathname;
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(svelte|css)$/.test(name) && !/(ColorPicker|ColourSetMaker)\.svelte$/.test(name)) files.push(path);
    }
  };
  walk(root);
  const reaching = [];
  for (const path of files) {
    readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
      if (!line.includes('{') || line.includes(':where(.dd *')) return;
      if (/\.cp-swatch\b|\.cp(?=[\s:{,)])/.test(line) && !line.includes(':not(.cp-pop *)')) reaching.push(`${path.slice(root.length)}:${i + 1}`);
    });
  }
  assert.deepEqual(reaching, []);
  const picker = readFileSync(new URL('../editor/src/lib/ColorPicker.svelte', import.meta.url), 'utf8');
  assert.match(picker, /if \(!inCard\) namePane\(rootEl, true\);/, 'a picker in a card leaves the pane\'s name to the card\'s own picker');
  assert.match(picker, /class:cp-beside=\{inCard\}/);
});

test('the colour picker\'s card is as wide as the number it is placed by: its border-box width, openPicker\'s W and the anchored placement\'s clamp', () => {
  const picker = readFileSync(new URL('../editor/src/lib/ColorPicker.svelte', import.meta.url), 'utf8');
  const style = picker.slice(picker.indexOf('<style>'));
  const card = style.match(/\n {2}\.cp-pop \{\n([\s\S]*?)\n {2}\}/);
  assert.ok(card, 'the card\'s rule');
  assert.match(card[1], /^\s*box-sizing: border-box;$/m, 'its width is the width it is seen at, padding and border inside');
  const width = Number(card[1].match(/^\s*width: (\d+)px;$/m)?.[1]);
  assert.ok(width > 0, 'the card\'s width');
  // The measured branch: placed by W, inside the panel's right edge with the same margin as from the window's left.
  const open = picker.slice(picker.indexOf('function openPicker() {'), picker.indexOf('\n  }\n', picker.indexOf('function openPicker() {')));
  assert.equal(Number(open.match(/const W = (\d+);/)?.[1]), width, 'openPicker places it by the card\'s width');
  const left = open.match(/const left = Math\.max\((\d+), Math\.min\(r\.right - W, rightEdge - W - (\d+)\)\);/);
  assert.ok(left, 'openPicker keeps it inside the panel');
  const margin = Number(left[1]);
  assert.equal(Number(left[2]), margin, 'the same margin at either edge');
  assert.doesNotMatch(open.replace(/const W = \d+;/, ''), new RegExp(`\\b${width}\\b`), 'openPicker names the width only through W');
  // The anchored branch: right edges aligned with the swatch, and kept inside the pane by the same width and margin.
  const clamp = style.match(/left: clamp\(calc\(anchor\(--urd-pane left, 0px\) \+ (\d+)px\), calc\(anchor\(right\) - (\d+)px\), calc\(anchor\(--urd-pane right, 100vw\) - (\d+)px\)\);/);
  assert.ok(clamp, 'the anchored placement clamps the card inside its pane');
  const [, edge, aligned, far] = clamp.map(Number);
  assert.equal(edge, margin, 'the margin from the pane\'s left');
  assert.equal(aligned, width, 'the card\'s right edge on the swatch\'s');
  assert.equal(far, width + margin, 'the card\'s right edge the margin inside the pane\'s');
});
