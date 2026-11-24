/**
 * The canvas's loading cover (editor/src/lib/canvas-cover.js, lib/CanvasCover.svelte, Urd settings «Canvas loading»): the four looks and the stored one read back, drawn in the admin theme's colours, and the start's handshake that lifts it.
 * The editor sends urd-startup-done with its round after its start; the preview answers urd-shown with the round once it has drawn the start and painted it, and only then loads the rest of the engine.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR, engineImport } from './_engine.mjs';
import { COVER_LOOKS, COVER_POINTS, coverLookOf, coverArt, coverPicture, coverGoal } from '../editor/src/lib/canvas-cover.js';

const editorFile = (path) => readFileSync(new URL(`../editor/src/${path}`, import.meta.url), 'utf8');
const urd = readFileSync(new URL('urd.js', ENGINE_DIR), 'utf8');

test('the looks are the rune circle, the carved runes, the tiles and the runestone, the rune circle for anything not stored as one', () => {
  assert.deepEqual(COVER_LOOKS, ['circle', 'stave', 'tiles', 'stone']);
  for (const look of COVER_LOOKS) assert.equal(coverLookOf(look), look);
  for (const raw of [null, undefined, '', 'spinner', 'CIRCLE']) assert.equal(coverLookOf(raw), 'circle', String(raw));
});

test('each look draws the three runes of Urd\'s name in the admin theme\'s colours, as drawn SVG alone', () => {
  const runes = ['M28 76 V46 L44 53 V76', 'M54 76 V46 L65 54 L54 62 L66 76', 'M76 46 V76 L92 46 V76 M76 46 L92 76'];
  for (const look of COVER_LOOKS) {
    const art = coverArt(look);
    assert.match(art, /^<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">[\s\S]*<\/svg>$/, look);
    for (const d of runes) assert.ok(art.includes(`d="${d}"`), `${look} draws ${d}`);
    assert.ok(art.includes('var(--urd-color-accent'), `${look} draws in the theme's accent`);
    assert.doesNotMatch(art, /<(?:script|text|foreignObject|image)\b|\son\w+=|href=/i, `${look} is drawn shapes alone`);
    // Every colour is the admin's own, a literal only as a variable's fallback.
    for (const hex of art.matchAll(/#[0-9a-f]{3,8}\b/gi)) assert.match(art.slice(Math.max(0, hex.index - 30), hex.index), /var\(--urd-color-[a-z]+, $/, `${look}: ${hex[0]} stands as a fallback`);
    assert.equal((art.match(/<svg\b/g) ?? []).length, 1, look);
    assert.ok(coverPicture(look).includes(`d="${runes[0]}"`), `${look}'s picture is its drawing`);
  }
  assert.equal(coverArt('nonsense'), coverArt('circle'));
});

test('a look stands finished without the cover: each stroke is drawn over a span of the load, the runes last, the drawing whole at the end', () => {
  for (const look of COVER_LOOKS) {
    const art = coverArt(look);
    assert.doesNotMatch(art, /stroke-dashoffset|<animate|<style/, `${look} carries no motion of its own`);
    const parts = [...art.matchAll(/class="(cc-draw|cc-pop)" style="--a:([\d.]+);--b:([\d.]+)"/g)];
    assert.equal(parts.length, (art.match(/class="cc-(?:draw|pop)"/g) ?? []).length, `${look}: every drawn part has its span`);
    for (const [, , a, b] of parts) assert.ok(Number(a) >= 0 && Number(a) < Number(b) && Number(b) <= 1, `${look}: ${a} to ${b}`);
    assert.equal(Math.max(...parts.map(([, , , b]) => Number(b))), 1, `${look} is whole only as the cover lifts`);
    assert.ok(parts.some(([, , a]) => Number(a) < COVER_POINTS[0]), `${look} shows a part from the start, where its drawing begins`);
  }
  assert.ok(coverArt('stone').includes('class="cc-mote"') && /class="cc-mote"[^>]*opacity="0"/.test(coverArt('stone')), 'the sparks are hidden at rest');
  const cover = editorFile('lib/CanvasCover.svelte');
  assert.match(cover, /\.cc-art \{\s*width: min\(108px, 36%\);\s*aspect-ratio: 1;\s*animation: cc-in 0\.1s ease both;/, 'the drawing shows at once, with no wait');
  assert.match(cover, /style:--p=\{COVER_POINTS\[0\]\}/, 'its first part drawn from the start');
  assert.match(cover, /let progress = COVER_POINTS\[0\];/, 'and its progress from the first step\'s point');
  assert.match(cover, /stroke-dashoffset: calc\(1 - clamp\(0, \(var\(--p\) - var\(--a, 0\)\) \/ \(var\(--b, 1\) - var\(--a, 0\)\), 1\)\);/, 'a stroke follows the load over its span');
  assert.match(cover, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*\.cc-art \{\s*--p: 1 !important;[\s\S]*\.cc-art :global\(\*\) \{\s*animation: none !important;/, 'reduced motion stands the drawing whole and still');
  assert.match(cover, /role="status"/);
  assert.match(cover, /\{#if covered\}<span class="sr-only">\{ta\('ui\.loading'\)\}<\/span>\{\/if\}/, 'a screen reader hears «Loading…» while it stands');
});

test('the drawing goes to each step\'s point, creeps towards the next while a step takes long without reaching it, and is whole at the last', () => {
  assert.deepEqual(COVER_POINTS, [0.2, 0.45, 0.85, 1]);
  for (let at = 0; at < COVER_POINTS.length - 1; at++) {
    assert.equal(coverGoal(at, 0), COVER_POINTS[at]);
    const later = [500, 1500, 5000, 60000].map((ms) => coverGoal(at, ms));
    for (let i = 1; i < later.length; i++) assert.ok(later[i] > later[i - 1], `step ${at} creeps on`);
    assert.ok(later.at(-1) < COVER_POINTS[at + 1], `step ${at} never reaches the next point`);
  }
  assert.equal(coverGoal(3, 0), 1);
  assert.equal(coverGoal(9, 0), 1, 'a step past the last is the whole drawing');
  assert.equal(coverGoal(-2, 0), COVER_POINTS[0]);
  assert.equal(coverGoal(1, -50), COVER_POINTS[1], 'no time before the step');
});

test('each document the canvas or the live phone is asked for is a round of covering, and only that round\'s answer, or its own wait, lifts the cover', () => {
  const preview = editorFile('state/preview.svelte.js');
  assert.match(preview, /function coverCanvas\(\) \{\s*canvasRound \+= 1;\s*canvasCovered = true;\s*canvasStep = 0;\s*clearTimeout\(coverWait\);/, 'a new round covers the canvas, its drawing from the start, and takes the last wait with it');
  assert.match(preview, /async function onReady\(\) \{\s*\/\/[^\n]*\n\s*const round = canvasRound;\s*const own = bridge;\s*if \(canvasStep < 2\) canvasStep = 2;\s*try \{\s*await answerReady\(\);\s*\} finally \{\s*canvasOpened = true;\s*\/\/[^\n]*\n\s*if \(round === canvasRound && own === bridge\) own\?\.sendStartupDone\(round\);/, 'the start\'s end is sent after the start, or a start that failed, to its own document alone');
  assert.match(preview, /function onShown\(msg\) \{\s*if \(msg\.round !== canvasRound\) return;\s*clearTimeout\(coverWait\);\s*liftCover\(\);/, 'an earlier document\'s answer lifts nothing');
  assert.match(preview, /const round = canvasRound;\s*clearTimeout\(coverWait\);\s*coverWait = setTimeout\(\(\) => \{ if \(round === canvasRound\) liftCover\(\); \}, CANVAS_WAIT\);/, 'a canvas that never answers lets its cover go, an earlier round\'s wait never');
  assert.match(preview, /function liftCover\(\) \{\s*if \(!canvasCovered\) return;\s*canvasCovered = false;\s*pageState\.fitMissingPhoneHeights\(\);/, 'the hidden phone preview waits for the cover to lift, once a round');
  assert.equal((preview.match(/fitMissingPhoneHeights\(\)/g) ?? []).length, 1, 'and is asked for nowhere else');
  assert.match(preview, /coverCanvas\(\);\s*iframeEl\.src = iframeEl\.src;/, 'a canvas loaded again is covered again');
  const stage = editorFile('shell/PreviewStage.svelte');
  assert.match(stage, /\$effect\.pre\(\(\) => \{\s*void src;\s*untrack\(\(\) => ed\.coverCanvas\(\)\);\s*\}\);/, 'another page asked for is a new round, covered before the frame loads it');
  assert.match(stage, /<CanvasCover covered=\{ed\.canvasCovered\} step=\{ed\.canvasStep\} look=\{ed\.canvasCover\} \/>/);
  const phone = editorFile('shell/LivePhone.svelte');
  assert.match(phone, /if \(first\) post\(\{ type: 'urd-startup-done', round \}\);/);
  assert.match(phone, /msg\?\.type === 'urd-shown' && msg\.round === round\) \{\s*clearTimeout\(coverTimer\);\s*shown = true;/);
  assert.match(phone, /shown = false;\s*phoneStep = 0;\s*round \+= 1;\s*clearTimeout\(coverTimer\);\s*frame\.src = src;/, 'the frame loaded again is a new round');
  assert.match(phone, /<CanvasCover covered=\{!shown\} step=\{phoneStep\} look=\{ed\.canvasCover\} \/>/);
  assert.match(phone, /msg\?\.type === 'urd-ready'\) \{\s*ready = true;\s*phoneStep = 2;/);
  const bridge = editorFile('lib/previewBridge.js');
  assert.match(bridge, /if \(msg\?\.type === 'urd-shown'\) handlers\.onShown\?\.\(msg\);/);
  assert.match(bridge, /sendStartupDone\(round\) \{\s*post\(\{ type: 'urd-startup-done', round \}\);/);
  assert.match(bridge, /const LOOK_PASSES = new Set\(\['urd-ready', 'urd-shown',/, 'a saved draft looked at lifts the cover too');
  const cover = editorFile('lib/CanvasCover.svelte');
  assert.match(cover, /\{#key round\}<div class="cc-art"/, 'a cover raised again draws from the start');
  assert.match(cover, /border-radius: inherit;/, 'the phone view\'s rounded canvas keeps its corners');
});

test('the preview answers the start with its round once it is drawn, its language and needed plugins in and painted, and loads the rest of the engine after', async () => {
  assert.match(urd, /msg\?\.type === 'urd-startup-done'\) \{\s*\/\/[^\n]*\n\s*const needed = langOutOfSync\(\) \|\| needsPlugins\(pageTypes\(state\.page, state\.site\.nav, state\.site\.footer\), Urd\);\s*Promise\.all\(\[langQueue, needed \? pluginsIn : null\]\.map\(\(step\) => step\?\.catch\(\(\) => \{\}\)\)\)\.then\(\(\) => requestAnimationFrame\(\(\) => requestAnimationFrame\(\(\) => \{\s*window\.parent\?\.postMessage\(\{ type: 'urd-shown', round: msg\.round \?\? null \}, location\.origin\);\s*rest\(\);/, 'the plugins are waited for only where the page draws a type of theirs or awaits its language from one, and the rest comes after the answer');
  assert.match(urd, /pluginsIn = loadPluginList\(Urd, state\.engine, msg\.enabled\)\.then\(/, 'the answer waits for the plugins the start sent');
  assert.match(urd, /const rest = \(\) => \{\s*if \(restAsked\) return;\s*restAsked = true;\s*queue\.loadEverything\(Urd\)/, 'the rest is asked for once');
  assert.match(urd, /setTimeout\(\(\) => \(typeof window\.requestIdleCallback === 'function' \? window\.requestIdleCallback\(rest, \{ timeout: 1000 \}\) : rest\(\)\), START_WAIT_MS\);/, 'a frame whose editor sends no start, or never paints, loads it a moment after ready');
  // The start's end waits in the queue behind the start's own messages, so the answer follows their drawing.
  const { drawnBy } = await engineImport('preview-queue.js');
  assert.equal(drawnBy({ type: 'urd-startup-done' }, { page: null, site: {} }), null);
});
