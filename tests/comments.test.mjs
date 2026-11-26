/**
 * Short comments (ADR-0037): the code a site loads or runs holds each comment to LIMIT characters of words, a JSDoc tag's words after its type too.
 * No comment cites a release, tells what was before or wraps mid-sentence. SCOPE names the areas the rule holds, and grows as each is brought within it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ENGINE_DIR } from './_engine.mjs';
import { HISTORY, LIMIT, notesOf, proseLength, visitorModules } from '../scripts/engine-notes.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const ENGINE = fileURLToPath(ENGINE_DIR);
const walk = (dir) => readdirSync(dir).flatMap((name) => (statSync(dir + name).isDirectory() ? (name === 'node_modules' ? [] : walk(`${dir}${name}/`)) : [dir + name]));
const relative = (file) => file.slice(ROOT.length);
const visitors = new Set(visitorModules().map((module) => ENGINE + module));

/** The code the rule covers, by area: each area joins SCOPE in the round that brings it within the limit. */
const AREAS = {
  functions: () => walk(`${ROOT}template/functions/`).filter((f) => f.endsWith('.js')),
  engine: () => [
    ...walk(ENGINE).filter((f) => /\.(js|css)$/.test(f) && !visitors.has(f)),
    ...walk(`${ROOT}template/assets/urd/`).filter((f) => f.endsWith('.js')),
    ...walk(`${ROOT}template/plugins/`).filter((f) => f.endsWith('.js')),
    `${ROOT}template/assets/styles/base.css`, `${ROOT}template/admin/favicon-boot.js`,
    `${ROOT}template/index.html`, `${ROOT}template/admin/index.html`, `${ROOT}template/404.html`,
  ],
  visitor: () => [...visitors],
  editorScripts: () => walk(`${ROOT}editor/src/`).filter((f) => f.endsWith('.js')),
  editorViews: () => walk(`${ROOT}editor/src/`).filter((f) => /\.(svelte|css)$/.test(f)),
};
/** The areas the rule holds today. */
const SCOPE = new Set(['functions', 'engine', 'visitor', 'editorScripts']);

/** A release or commit number of Urd's (0.7.26.5, 0.7.0.16-35p), or a release a thing dates from («since v0.6»). */
const RELEASE = /(?<![\w.])0\.[1-9]\d*\.\d+(?:\.\d+)*(?:-\d+)?p?\b|\b(?:since|from|until)\s+v?0\.\d+(?:\.\d+)*/i;

/** A JSDoc tag line's words: what follows its tag, its type and the name it describes. */
function tagWords(line) {
  let rest = line.replace(/^@[a-z]+\s*/i, '');
  if (rest.startsWith('{')) {
    let depth = 0;
    let i = 0;
    for (; i < rest.length; i++) { if (rest[i] === '{') depth++; else if (rest[i] === '}' && --depth === 0) break; }
    rest = rest.slice(i + 1);
  }
  return /^@(param|property|prop|typedef|template)\b/i.test(line) ? rest.trim().replace(/^\[[^\]]*\]|^\S+/, '') : rest;
}

/** Every comment of a script's text: its words, the words of each JSDoc tag, and where it stands. */
function scriptComments(src, offset = 0) {
  return notesOf(src).map((note) => {
    const tags = [];
    for (const line of note.tags.split('\n')) {
      if (/^@[a-z]+/i.test(line)) tags.push(line);
      else if (tags.length && line) tags[tags.length - 1] += ` ${line}`;
    }
    return { at: offset + note.start, words: note.header ? note.prose.replace(/Notes: docs\/engine-notes\/\S+ \(Urd repository\)\./, '') : note.prose, tags: tags.map(tagWords), raw: note.raw };
  });
}

/** Every comment of a text read by pattern: CSS's block comments and HTML's. */
const patternComments = (src, pattern) => [...src.matchAll(pattern)].map((m) => ({ at: m.index, words: m[1].replace(/^\s*\*?/gm, ''), tags: [], raw: m[0] }));
const CSS_COMMENT = /\/\*([\s\S]*?)\*\//g;
const HTML_COMMENT = /<!--([\s\S]*?)-->/g;

/** The comments of one file, read by its kind. */
function commentsOf(file, src = readFileSync(file, 'utf8')) {
  if (file.endsWith('.js')) return scriptComments(src);
  if (file.endsWith('.css')) return patternComments(src, CSS_COMMENT);
  if (file.endsWith('.html')) return patternComments(src, HTML_COMMENT);
  // A Svelte file: its scripts through the parser, its styles and markup by pattern.
  const found = [];
  let markup = src;
  for (const m of src.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    found.push(...scriptComments(m[1], m.index + m[0].indexOf(m[1])));
    markup = markup.replace(m[0], ' '.repeat(m[0].length));
  }
  for (const m of src.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    found.push(...patternComments(m[1], CSS_COMMENT).map((c) => ({ ...c, at: c.at + m.index + m[0].indexOf(m[1]) })));
    markup = markup.replace(m[0], ' '.repeat(m[0].length));
  }
  return [...found, ...patternComments(markup, HTML_COMMENT)];
}

/** A line of a comment's words that ends mid-sentence, the next line carrying the sentence on; a list item may follow a line of its own. */
const midSentence = (words) => {
  const lines = words.split('\n').map((line) => line.trim()).filter(Boolean);
  return lines.slice(0, -1).find((line, i) => !/[.!?:]["'»)`\]]*$/.test(line) && !/^([-*•]|\d+[.)])\s/.test(lines[i + 1]));
};

/** What a comment breaks of the rule, if anything. */
function faults(comment) {
  const out = [];
  const wrapped = midSentence(comment.words);
  if (wrapped) out.push(`a line wrapped mid-sentence («${wrapped.slice(-30)}»)`);
  if (proseLength(comment.words) > LIMIT) out.push(`${proseLength(comment.words)} characters of words`);
  for (const tag of comment.tags) if (proseLength(tag) > LIMIT) out.push(`a tag of ${proseLength(tag)} characters of words`);
  const text = [comment.words, ...comment.tags].join(' ');
  if (RELEASE.test(text)) out.push(`a release number (${text.match(RELEASE)[0]})`);
  if (HISTORY.test(text)) out.push(`«${text.match(HISTORY)[0]}»`);
  return out;
}

/** The comments out of bounds in an area's files, each with its place. */
function outOfBounds(area) {
  const found = [];
  for (const file of AREAS[area]()) {
    const src = readFileSync(file, 'utf8');
    for (const comment of commentsOf(file)) {
      const wrong = faults(comment);
      if (wrong.length) found.push(`${relative(file)}:${src.slice(0, comment.at).split('\n').length} ${wrong.join(', ')}`);
    }
  }
  return found;
}

test('every comment in the areas the rule holds is short, cites no release and tells nothing of what was before', () => {
  for (const area of SCOPE) {
    assert.ok(AREAS[area]().length > 0, `${area} has files`);
    assert.deepEqual(outOfBounds(area), [], `${area}: each comment says what the code does in at most ${LIMIT} characters (ADR-0037)`);
  }
});

test('an area the rule does not hold yet still has comments to bring within it, so it joins SCOPE once it has none', (t) => {
  for (const area of Object.keys(AREAS).filter((name) => !SCOPE.has(name))) {
    const left = outOfBounds(area).length;
    t.diagnostic(`${area}: ${left} comments left`);
    assert.ok(left > 0, `${area} holds the rule, so it joins SCOPE`);
  }
});

test('the reader finds the comments of each kind of file', () => {
  const svelte = commentsOf('x.svelte', '<script>\n  // In the script.\n</script>\n<!-- In the markup. -->\n<style>\n  /* In the style. */\n</style>\n');
  assert.deepEqual(svelte.map((c) => c.words.trim()), ['In the script.', 'In the style.', 'In the markup.'], 'the three parts of a Svelte file');
  assert.equal(midSentence('The first line runs\non into the second.'), 'The first line runs');
  assert.equal(midSentence('A sentence ends here.\nAnother one: a list follows\n- an item'), undefined);
  assert.ok(commentsOf(`${ROOT}template/assets/styles/base.css`).length > 100, 'the stylesheet labels');
  assert.deepEqual(faults({ words: 'Split out of App.svelte in 0.7.26.5.', tags: [] }), ['a release number (0.7.26.5)']);
  assert.deepEqual(faults({ words: 'The size (additive since v0.6).', tags: [] }), ['a release number (since v0.6)']);
  assert.deepEqual(faults({ words: 'A tag sorts v0.7.10 before v0.7.11.', tags: [] }), []);
  assert.deepEqual(faults({ words: 'The list, which no longer holds the old ones.', tags: [] }), ['«no longer»']);
  assert.equal(tagWords('@param {{a: {b: string}}} context The page and its site'), ' The page and its site');
  assert.deepEqual(faults({ words: 'Short.', tags: [tagWords(`@returns {string} ${'word '.repeat(40)}`)] }), ['a tag of 199 characters of words']);
});
