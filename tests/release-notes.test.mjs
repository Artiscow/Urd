/**
 * A release's notes in the Update panel (editor/src/lib/release-notes.js): the Markdown GitHub keeps for a release, read into blocks the panel draws itself.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE_DIR } from './_engine.mjs';
import { parseNotes, parseInline, plainText, releaseLabel, NOTES_MAX } from '../editor/src/lib/release-notes.js';

/** A run of words written back as text, its marks named, for short comparisons. */
const flat = (nodes) => nodes.map((n) => {
  if (n.kind === 'text') return n.text;
  if (n.kind === 'br') return '|';
  if (n.kind === 'code') return `\`${n.text}\``;
  if (n.kind === 'link') return `[${flat(n.children)}](${n.href})`;
  return `<${n.kind}>${flat(n.children)}</${n.kind}>`;
}).join('');

test('headings, paragraphs, rules and code blocks', () => {
  const blocks = parseNotes('# Urd 0.7.11 ##\n\nThis release\nfinishes the phone.\n\n---\n\n```\nnode --test\n```\n### Small');
  assert.deepEqual(blocks.map((b) => b.kind), ['heading', 'para', 'rule', 'code', 'heading']);
  assert.equal(blocks[0].level, 1);
  assert.equal(flat(blocks[0].inline), 'Urd 0.7.11', 'a closing run of # is taken away');
  assert.equal(flat(blocks[1].inline), 'This release finishes the phone.', 'the lines of a paragraph run together');
  assert.equal(blocks[3].text, 'node --test');
  assert.equal(flat(parseNotes('## C#')[0].inline), 'C#', 'a # that is part of a word stays');
});

test('GitHub\'s folds: the summary in bold, the blocks inside, folds inside folds, and a fold cut short closed at the end', () => {
  const blocks = parseNotes('<details>\n<summary><b>The phone</b></summary>\n\n- **Order:** a rule\n\n<details><summary>Inner</summary>\n\nDeep words\n</details>\n</details>\n\nAfter');
  assert.deepEqual(blocks.map((b) => b.kind), ['fold', 'para']);
  assert.equal(flat(blocks[0].summary), '<strong>The phone</strong>');
  assert.deepEqual(blocks[0].blocks.map((b) => b.kind), ['list', 'fold']);
  assert.equal(flat(blocks[0].blocks[1].summary), 'Inner');
  assert.equal(flat(blocks[0].blocks[1].blocks[0].inline), 'Deep words');
  const cut = parseNotes('<details>\n<summary>Open</summary>\n\n- one\n- two');
  assert.equal(cut.length, 1);
  assert.equal(cut[0].kind, 'fold', 'a fold whose closing tag was cut off closes at the end');
  assert.equal(cut[0].blocks[0].items.length, 2);
  assert.deepEqual(parseNotes('</details>\nWords').map((b) => b.kind), ['para'], 'a closing tag without its opening is passed by');
});

test('lists: nested by their indent, numbered or not, an item\'s paragraph under its list, and a blank line between items', () => {
  const [list] = parseNotes('- **A picker:**\n  - Theme\n  - Custom\n\n  The picker opens on the tab used last.\n- Second\n\n- Third');
  assert.equal(list.kind, 'list');
  assert.equal(list.ordered, false);
  assert.equal(list.items.length, 3);
  assert.deepEqual(list.items[0].map((b) => b.kind), ['para', 'list', 'para']);
  assert.equal(list.items[0][1].items.length, 2);
  assert.equal(flat(list.items[0][2].inline), 'The picker opens on the tab used last.');
  const [numbered] = parseNotes('1. One\n2. Two');
  assert.equal(numbered.ordered, true);
  assert.equal(numbered.items.length, 2);
});

test('inline marks: bold, italic, code, links and bare addresses, and the tags GitHub writes', () => {
  assert.equal(flat(parseInline('**Bold** and *italic* and _too_ and `code`')), '<strong>Bold</strong> and <em>italic</em> and <em>too</em> and `code`');
  assert.equal(flat(parseInline('<b>B</b>, <strong>S</strong>, <em>E</em><br>next')), '<strong>B</strong>, <strong>S</strong>, <em>E</em>|next');
  assert.equal(flat(parseInline('snake_case_name stays')), 'snake_case_name stays', 'an underscore inside a word is no mark');
  assert.equal(flat(parseInline('2 * 3 * 4')), '2 * 3 * 4', 'a star beside a space is no mark');
  assert.equal(flat(parseInline('See [the guide](https://example.com/a "Title").')), 'See [the guide](https://example.com/a).');
  assert.equal(flat(parseInline('Go to https://example.com/notes.')), 'Go to [https://example.com/notes](https://example.com/notes).', 'a bare address, its full stop left outside');
  assert.equal(flat(parseInline('\\*not italic\\*')), '*not italic*');
});

test('a link leads only to an http or https address, and no tag in the notes becomes one', () => {
  for (const bad of ['[x](javascript:alert(1))', '[x](data:text/html,hi)', '[x](/relative)', '[x](vbscript:msgbox)']) {
    assert.ok(!parseInline(bad).some((n) => n.kind === 'link'), bad);
  }
  const [para] = parseNotes('<img src=x onerror=alert(1)> <script>alert(1)</script>');
  assert.equal(para.kind, 'para');
  assert.ok(para.inline.every((n) => n.kind === 'text'), 'any other tag stands as the words it is');
  const notes = readFileSync(new URL('../editor/src/lib/ReleaseNotes.svelte', import.meta.url), 'utf8');
  assert.doesNotMatch(notes, /\{@html/, 'the panel draws the notes with its own elements, never as HTML');
  assert.match(notes, /<a href=\{n\.href\} target="_blank" rel="noopener noreferrer">/);
  assert.match(notes, /<Fold id=\{`\$\{place\}-\$\{i\}`\} surface="update" title=\{plainText\(b\.summary\) \|\| /, 'a fold in the notes is the row kit\'s Fold');
  assert.equal(plainText(parseInline('<b>The phone</b> and `code`')), 'The phone and code');
});

test('notes of any shape read in time with their length, nested no deeper than ten', () => {
  const hostile = ['*'.repeat(NOTES_MAX), '**a'.repeat(6000), '['.repeat(NOTES_MAX), '[a'.repeat(9000) + '](https://x.y)', `# ${' '.repeat(NOTES_MAX - 4)}x`,
    `https://${'a'.repeat(NOTES_MAX - 9)}`, '- '.repeat(9000) + 'x', '<details>\n'.repeat(2000), 'a *b '.repeat(4000), 'a _b '.repeat(4000), '`'.repeat(NOTES_MAX),
    // A run of blank lines inside an item, closers found and turned down again and again, and lines holding a line break of another kind.
    `- a\n${'\n'.repeat(19990)}  b`, `${' _a'.repeat(6666)}a_b`, `${' *a'.repeat(6666)}a**`, `${' __a'.repeat(5000)}a__b`, `- ${' '.repeat(19990)}a\u2028b`,
    `<details>${' '.repeat(19980)}x`, '<!--'.repeat(5000), `<details>\n<summary>${'a\n'.repeat(9990)}`];
  for (const text of hostile) {
    const start = performance.now();
    parseNotes(text);
    assert.ok(performance.now() - start < 300, `${JSON.stringify(text.slice(0, 14))} reads in time with its length`);
  }
  const deep = Array.from({ length: 60 }, (_, k) => `${' '.repeat(k * 2)}- x`).join('\n');
  const depth = (blocks, n = 0) => blocks.reduce((m, b) => Math.max(m, b.kind === 'list' ? Math.max(...b.items.map((item) => depth(item, n + 1))) : b.kind === 'fold' ? depth(b.blocks, n + 1) : n), n);
  assert.equal(depth(parseNotes(deep)), 10);
  assert.equal(depth(parseNotes('<details>\n'.repeat(30))), 10);
});

test('the update function keeps the notes to the length the panel reads, and the panel draws them as Markdown', () => {
  const fn = readFileSync(new URL('../template/functions/api/github/update.js', import.meta.url), 'utf8');
  assert.match(fn, new RegExp(`release\\.body\\.slice\\(0, ${NOTES_MAX}\\)`));
  assert.equal(parseNotes('a'.repeat(NOTES_MAX + 500))[0].inline[0].text.length, NOTES_MAX);
  const panel = readFileSync(new URL('../editor/src/panels/UpdatePanel.svelte', import.meta.url), 'utf8');
  assert.match(panel, /<ReleaseNotes text=\{updateInfo\.notes\} large \/>/, 'in the reading window, at the size of reading');
});

test('a release is named by its name where that holds its version, else by its version and its name', () => {
  assert.equal(releaseLabel('v0.7.11 - The Phone Focus', 'v0.7.11'), 'v0.7.11 - The Phone Focus');
  assert.equal(releaseLabel('Urd v0.7.11', 'v0.7.11'), 'Urd v0.7.11');
  assert.equal(releaseLabel('The Phone Focus', 'v0.7.11'), 'v0.7.11 - The Phone Focus');
  assert.equal(releaseLabel('', 'v0.7.11'), 'v0.7.11');
  assert.equal(releaseLabel(null, 'v0.7.11'), 'v0.7.11');
});

test('the update check names and links the release on offer and the one installed, a page on github.com only, and the Action gives the template\'s release its name', () => {
  const fn = readFileSync(new URL('../template/functions/api/github/update.js', import.meta.url), 'utf8');
  assert.match(fn, /if \(page\.protocol === 'https:' && page\.host === 'github\.com'\) url = page\.href;/);
  assert.match(fn, /const installed = await releaseOf\(token, config\.templateRepo, state\.target\);/, 'up to date: the installed version\'s release');
  assert.match(fn, /const offered = await releaseOf\(token, config\.templateRepo, state\.target\);/, 'an update: the one on offer');
  assert.match(fn, /release: installed && \{ name: installed\.name, url: installed\.url, date: installed\.date \}/);
  assert.match(fn, /notes: offered\?\.notes \?\? null, release: offered && \{ name: offered\.name, url: offered\.url, date: offered\.date \}/);
  assert.match(fn, /date: typeof release\.published_at === 'string' && !Number\.isNaN\(Date\.parse\(release\.published_at\)\) \? release\.published_at : null,/, 'the date it was published, where it reads as one');
  const action = readFileSync(new URL('../.github/workflows/release.yml', import.meta.url), 'utf8');
  assert.match(action, /NAME: \$\{\{ github\.event\.release\.name \}\}/);
  assert.match(action, /TITLE="\$\{NAME:-Urd \$TAG\}"/);
  assert.match(action, /gh release edit "\$TAG" --repo "\$REPO" --title "\$TITLE" --notes "\$BODY"/);
  const panel = readFileSync(new URL('../editor/src/panels/UpdatePanel.svelte', import.meta.url), 'utf8');
  assert.match(panel, /<a class="update-release" href=\{updateInfo\.release\.url\} target="_blank" rel="noopener noreferrer" title=\{ta\('update\.releaseOnGitHub'\)\}>/);
  assert.match(panel, /releaseLabel\(updateInfo\.release\.name, updateInfo\.target\)/);
});

test('a summary left unclosed is its first line\'s words, and the notes after the fold still stand', () => {
  const blocks = parseNotes('<details>\n<summary>Title\n\n- a\n</details>\n\n## Next heading');
  assert.deepEqual(blocks.map((b) => b.kind), ['fold', 'heading']);
  assert.equal(flat(blocks[0].summary), 'Title');
  assert.equal(blocks[0].blocks[0].kind, 'list');
  assert.equal(flat(blocks[1].inline), 'Next heading');
  const words = parseNotes('<details>Text\nmore\n</details>\n\nAfter the fold');
  assert.deepEqual(words.map((b) => b.kind), ['fold', 'para']);
  assert.equal(flat(words[0].blocks[0].inline), 'Text more', 'words without a summary are the fold\'s content');
  assert.equal(plainText(words[0].summary), '', 'no summary: the panel names the fold «Details»');
  const two = parseNotes('<details>\n<summary>Over\ntwo lines</summary>\n\nInside\n</details>');
  assert.equal(flat(two[0].summary), 'Over two lines');
  assert.equal(parseNotes('<details open>\n<summary>Open</summary>\n</details>')[0].open, true);
  assert.equal(parseNotes('<details>\n<summary>Shut</summary>\n</details>')[0].open, false);
});

test('a fold\'s end is never read inside a code block, and a code span that names a tag keeps it', () => {
  const blocks = parseNotes('<details><summary>X</summary>\n\n```html\n</details>\n```\n\n</details>\nAfter');
  assert.deepEqual(blocks.map((b) => b.kind), ['fold', 'para']);
  assert.equal(blocks[0].blocks[0].kind, 'code');
  assert.equal(blocks[0].blocks[0].text, '</details>');
  assert.equal(flat(parseInline('`<b>`, `<strong>`, `<em>`, `<code>` and `<br>` are read')), '`<b>`, `<strong>`, `<em>`, `<code>` and `<br>` are read');
  assert.equal(flat(parseInline('<code>urd.json</code> and <b>bold</b>')), '`urd.json` and <strong>bold</strong>');
});

test('the words of a link hold no link of their own, and a bare address keeps the brackets it opens', () => {
  const [link] = parseInline('[https://github.com/o/r/pull/1](https://github.com/o/r/pull/1)');
  assert.equal(link.kind, 'link');
  assert.ok(link.children.every((n) => n.kind === 'text'));
  assert.equal(flat(parseInline('[see https://a.b](https://x.y)')), '[see https://a.b](https://x.y/)');
  assert.equal(flat(parseInline('(see https://en.wikipedia.org/wiki/Foo_(bar))')), '(see [https://en.wikipedia.org/wiki/Foo_(bar)](https://en.wikipedia.org/wiki/Foo_(bar)))');
});

test('marks inside marks: a double inside a single, and three for both', () => {
  assert.equal(flat(parseInline('*a **b** c*')), '<em>a <strong>b</strong> c</em>');
  assert.equal(flat(parseInline('***x***')), '<em><strong>x</strong></em>');
  assert.equal(flat(parseInline('a ***b** c')), 'a *<strong>b</strong> c', 'a closer right after another mark is still found');
});

test('quotes and GitHub\'s alerts, underlined headings, comments left out, and a rule that ends a list', () => {
  const [quote, alert] = parseNotes('> Plain words\n> go on\n\n> [!WARNING]\n> Back up first');
  assert.equal(quote.kind, 'quote');
  assert.equal(quote.alert, null);
  assert.equal(flat(quote.blocks[0].inline), 'Plain words go on');
  assert.equal(alert.alert, 'warning');
  assert.equal(flat(alert.blocks[0].inline), 'Back up first');
  const setext = parseNotes('Title\n=====\nSub\n---');
  assert.deepEqual(setext.map((b) => [b.kind, b.level, flat(b.inline)]), [['heading', 1, 'Title'], ['heading', 2, 'Sub']]);
  assert.deepEqual(parseNotes('Before <!-- a note to self --> after\n<!-- open').map((b) => flat(b.inline)), ['Before  after']);
  assert.deepEqual(parseNotes('- a\n---').map((b) => b.kind), ['list', 'rule']);
  const notes = readFileSync(new URL('../editor/src/lib/ReleaseNotes.svelte', import.meta.url), 'utf8');
  assert.match(notes, /title=\{plainText\(b\.summary\) \|\| ta\('update\.notes\.details'\)\} defaultOpen=\{b\.open\}/);
  assert.match(notes, /ta\(`update\.notes\.alert\.\$\{b\.alert\}`\)/);
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const dict = readFileSync(new URL(`locales/admin/${lang}.js`, ENGINE_DIR), 'utf8');
    for (const key of ['details', 'alert.note', 'alert.tip', 'alert.important', 'alert.warning', 'alert.caution']) assert.ok(dict.includes(`'update.notes.${key}':`), `${lang}: ${key}`);
  }
});

test('a release\'s name holds its version only as a whole number', () => {
  assert.equal(releaseLabel('Urd 0.7.10', 'v0.7.1'), 'v0.7.1 - Urd 0.7.10');
  assert.equal(releaseLabel('v0.7.1.2 and more', 'v0.7.1'), 'v0.7.1 - v0.7.1.2 and more');
  assert.equal(releaseLabel('Urd v0.7.1: fixes', 'v0.7.1'), 'Urd v0.7.1: fixes');
});

