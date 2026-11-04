/**
 * Redirects (editor/src/lib/redirects-model.js): the rules checked, written in the host's format, and read back from a list, a CSV file and a `_redirects` written by hand.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';

register('./_svelte-loader.mjs', import.meta.url);
const {
  normalizeFrom, normalizeTo, isReservedSource, redirectIssues, hostLines, toHostFile, isUrdHostFile,
  parseHostFile, parseList, rulesToCsv, rulesFromCsv, mergeRules, withRule, withoutFrom, pageMoved, HOST_FILE_HEAD,
} = await import('../editor/src/lib/redirects-model.js');

const pages = [
  { id: 'hjem', title: 'Hjem', path: '/' },
  { id: 'om-oss', title: 'Om Urd', path: '/om-urd' },
  { id: 'kaker', title: 'Kaker', path: '/kaker' },
  { id: 'shop', title: 'Shop', path: '/shop' },
  { id: 'arkiv', title: 'Arkiv', path: '/arkiv', hidden: true },
];

test('normalizeFrom: a path from the root without its trailing slash, a * only as the last segment, a pasted address cut to its path', () => {
  assert.equal(normalizeFrom('om-oss'), '/om-oss');
  assert.equal(normalizeFrom(' /om-oss/ '), '/om-oss');
  assert.equal(normalizeFrom('https://urd.example/om-oss?x=1'), '/om-oss');
  assert.equal(normalizeFrom('/blogg/*'), '/blogg/*');
  assert.equal(normalizeFrom('/'), '/');
  for (const bad of ['', '/a b', '/a*b', '/*/x', '/a?b', '/:slug', '/a#b']) assert.equal(normalizeFrom(bad), null, bad);
});

test('normalizeTo: a path on the site or a whole web address, nothing with a space', () => {
  assert.equal(normalizeTo('om-urd'), '/om-urd');
  assert.equal(normalizeTo('/nyheter/*'), '/nyheter/*');
  assert.equal(normalizeTo('/shop?tab=kaker#topp'), '/shop?tab=kaker#topp');
  assert.equal(normalizeTo('https://forms.gle/vinterkurs'), 'https://forms.gle/vinterkurs');
  assert.equal(normalizeTo('Https://forms.gle/Vinterkurs'), 'https://forms.gle/Vinterkurs', 'the scheme in lower case, the rest as typed');
  for (const bad of ['', 'javascript:alert(1)', 'mailto:a@b.no', '/a b', 'ftp://x.org/f']) assert.equal(normalizeTo(bad), null, bad);
});

test('isReservedSource: Urd\'s own folders and files, never a page or a media file', () => {
  for (const path of ['/admin', '/admin/x', '/api/github/commit', '/assets/engine/x.js', '/content/site.json', '/index.html', '/urd.json', '/*']) assert.equal(isReservedSource(path), true, path);
  for (const path of ['/om-oss', '/media/old.webp', '/administrasjon']) assert.equal(isReservedSource(path), false, path);
});

test('redirectIssues: what each rule cannot do, or may not', () => {
  const rules = [
    { from: '/om-oss', to: '/om-urd', status: 301 },
    { from: '/kaker', to: '/shop', status: 301 },
    { from: '/admin', to: '/', status: 301 },
    { from: '/a', to: '/b', status: 301 },
    { from: '/b', to: '/a', status: 301 },
    { from: '/om-oss', to: '/shop', status: 301 },
    { from: '/gml-butikk', to: '/butikk', status: 301 },
    { from: '/blogg/*', to: '/nyheter/*', status: 301 },
    { from: '/x', to: '/y/*', status: 301 },
    { from: '/arkiv', to: '/', status: 302 },
    { from: '/pdf', to: '/media/files/plan.pdf', status: 301 },
    { from: '/*', to: '/', status: 301 },
  ];
  const issues = redirectIssues(rules, pages).map((i) => (i ? `${i.level}:${i.key}` : 'ok'));
  assert.deepEqual(issues, [
    'ok',
    'error:hidesPage',
    'error:reserved',
    'error:loop',
    'error:loop',
    'warn:duplicate',
    'warn:notAPage',
    'ok',
    'error:starWithoutStar',
    'ok',
    'ok',
    'error:reserved',
  ]);
  assert.equal(redirectIssues([{ from: '/kaker', to: '/shop', status: 301 }], pages)[0].page, 'Kaker');
  assert.equal(redirectIssues([{ from: '/om-oss/', to: '/', status: 301 }], pages)[0].key, 'badFrom', 'a stored old address is normalised');
});

test('hostLines and toHostFile: the static rules twice, then the ones with a *, the kind always written, a sound list only', () => {
  const rules = [
    { from: '/blogg/*', to: '/nyheter/*', status: 301 },
    { from: '/om-oss', to: '/om-urd', status: 301 },
    { from: '/pamelding', to: 'https://forms.gle/vinterkurs', status: 302 },
    { from: '/om-oss', to: '/shop', status: 301 },
    { from: '/admin', to: '/', status: 301 },
    { from: '/bad path', to: '/', status: 301 },
  ];
  assert.deepEqual(hostLines(rules), {
    static: ['/om-oss /om-urd 301', '/om-oss/ /om-urd 301', '/pamelding https://forms.gle/vinterkurs 302', '/pamelding/ https://forms.gle/vinterkurs 302'],
    dynamic: ['/blogg/* /nyheter/:splat 301'],
  });
  const file = toHostFile(rules);
  assert.ok(file.startsWith(HOST_FILE_HEAD));
  assert.ok(isUrdHostFile(file));
  assert.equal(isUrdHostFile('/old /new 301\n'), false);
  assert.deepEqual(hostLines([{ from: '/om-oss/', to: 'Https://x.no/a', status: 301 }]).static, ['/om-oss https://x.no/a 301', '/om-oss/ https://x.no/a 301'], 'written from the normalised addresses');
  assert.ok(file.endsWith('/blogg/* /nyheter/:splat 301\n'));
  // Every star in a target is the matched part, not only the first.
  const twice = hostLines([{ from: '/blogg/*', to: '/nyheter/*/arkiv/*', status: 301 }]).dynamic;
  assert.deepEqual(twice, ['/blogg/* /nyheter/:splat/arkiv/:splat 301']);
});

test('parseHostFile: a file written by hand read into rules, the twins as one, the host\'s default kind kept, proxies and placeholders left out', () => {
  const { rules, skipped } = parseHostFile([
    '# my redirects',
    '/gammel /ny 301',
    '/gammel/ /ny 301',
    '/kampanje /tilbud',
    '/blogg/* /nyheter/:splat 308',
    '/arkiv/* /gammelt/:splat/side/:splat 301',
    '/api/* /backend/:splat 200',
    '/users/:id /profil/:id 301',
    '',
  ].join('\n'));
  assert.deepEqual(rules, [
    { from: '/gammel', to: '/ny', status: 301 },
    { from: '/kampanje', to: '/tilbud', status: 302 },
    { from: '/blogg/*', to: '/nyheter/*', status: 301 },
    { from: '/arkiv/*', to: '/gammelt/*/side/*', status: 301 },
  ]);
  assert.equal(skipped, 2);
});

test('parseList: a rule a line, apart by spaces, an arrow, a comma or a semicolon, permanent unless said', () => {
  const { rules, skipped } = parseList('/a /b\n/c -> /d 302\n/e, /f, temporary\n/g;/h\n/g → /i\nnot a rule\n');
  assert.deepEqual(rules, [
    { from: '/a', to: '/b', status: 301 },
    { from: '/c', to: '/d', status: 302 },
    { from: '/e', to: '/f', status: 302 },
    { from: '/g', to: '/h', status: 301 },
    { from: '/g', to: '/i', status: 301 },
  ]);
  assert.equal(skipped, 1);
});

test('rulesToCsv and rulesFromCsv: the list out and back, a header passed, a semicolon file read too', () => {
  const rules = [
    { from: '/om-oss', to: '/om-urd', status: 301 },
    { from: '/pamelding', to: 'https://forms.gle/a?b=1,2', status: 302 },
  ];
  const csv = rulesToCsv(rules);
  assert.ok(csv.startsWith('from,to,status\n'));
  assert.deepEqual(rulesFromCsv(csv).rules, rules);
  assert.deepEqual(rulesFromCsv('Fra;Til;Type\n/a;/b;302\n;;\n/c;\n').rules, [{ from: '/a', to: '/b', status: 302 }]);
  assert.equal(rulesFromCsv('Fra;Til;Type\n/a;/b;302\n/c;\n').skipped, 1);
});

test('mergeRules, withRule and withoutFrom: an old address once, an import updating rather than repeating', () => {
  const rules = [{ from: '/a', to: '/b', status: 301 }];
  const merged = mergeRules(rules, [{ from: '/a', to: '/c', status: 302 }, { from: '/d', to: '/e', status: 301 }]);
  assert.deepEqual(merged, { rules: [{ from: '/a', to: '/c', status: 302 }, { from: '/d', to: '/e', status: 301 }], added: 1, replaced: 1 });
  assert.deepEqual(rules, [{ from: '/a', to: '/b', status: 301 }], 'the list given is left as it was');
  assert.deepEqual(withRule(rules, '/x', '/y'), [...rules, { from: '/x', to: '/y', status: 301 }]);
  assert.deepEqual(withoutFrom(merged.rules, '/a'), [{ from: '/d', to: '/e', status: 301 }]);
});

test('pageMoved: the rules to the old address follow the page, and a rule from its new address goes', () => {
  const rules = [
    { from: '/om-oss', to: '/om-urd', status: 301 },
    { from: '/foreningen', to: '/om-urd', status: 301 },
    { from: '/om-foreningen', to: '/shop', status: 301 },
  ];
  assert.deepEqual(pageMoved(rules, '/om-urd', '/om-foreningen'), [
    { from: '/om-oss', to: '/om-foreningen', status: 301 },
    { from: '/foreningen', to: '/om-foreningen', status: 301 },
  ]);
  assert.deepEqual(pageMoved(rules, '/om-urd', '/om-oss'), [
    { from: '/foreningen', to: '/om-oss', status: 301 },
    { from: '/om-foreningen', to: '/shop', status: 301 },
  ], 'moved back to its old address: the rule from it goes');
  assert.deepEqual(pageMoved([{ from: '/a', to: '/kaker#priser', status: 301 }, { from: '/b', to: '/kakerboks', status: 301 }], '/kaker', '/bakst'),
    [{ from: '/a', to: '/bakst#priser', status: 301 }, { from: '/b', to: '/kakerboks', status: 301 }], 'a spot on the page follows it; another address that only starts the same does not');
});
