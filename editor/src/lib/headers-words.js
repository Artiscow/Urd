/**
 * A site's `_headers` in plain words for Updates, as descriptors the panel translates: `{ key, vars }` for a dictionary key, `{ text }` as written.
 */

/** The security policy in force, whose directives are listed by what they let a page load; a report-only one stands as written. */
const POLICY = /^content-security-policy$/i;

/** The policy's directives that say where a kind of content may come from, with their names in the dictionary. */
const KINDS = {
  'default-src': 'hdr.dir.default',
  'script-src': 'hdr.dir.script',
  'style-src': 'hdr.dir.style',
  'img-src': 'hdr.dir.img',
  'media-src': 'hdr.dir.media',
  'font-src': 'hdr.dir.font',
  'connect-src': 'hdr.dir.connect',
  'frame-src': 'hdr.dir.frame',
  'worker-src': 'hdr.dir.worker',
  'manifest-src': 'hdr.dir.manifest',
};

/** Sources named by a keyword. */
const SOURCES = {
  "'self'": 'hdr.src.self',
  "'none'": 'hdr.src.none',
  'data:': 'hdr.src.data',
  'blob:': 'hdr.src.blob',
  "'unsafe-inline'": 'hdr.src.inline',
  "'unsafe-eval'": 'hdr.src.eval',
};

/** The hosts Urd's own file opens, by name. */
const HOSTS = {
  'static.cloudflareinsights.com': 'hdr.src.analytics',
  'cloudflareinsights.com': 'hdr.src.analytics',
  'www.youtube-nocookie.com': 'hdr.src.youtube',
  'player.vimeo.com': 'hdr.src.vimeo',
  'www.openstreetmap.org': 'hdr.src.osm',
};

/** The path rules of Urd's own file, by name. */
const PATHS = {
  '/*': 'hdr.path.all',
  '/admin/*': 'hdr.path.admin',
  '/media/*': 'hdr.path.media',
  '/assets/engine/*': 'hdr.path.engine',
  '/assets/styles/base.css': 'hdr.path.base',
  '/speculation-rules.json': 'hdr.path.speculation',
};

/** Words an owner may add to the HTTPS rule. */
const HSTS_WORDS = { includesubdomains: 'hdr.word.subdomains', preload: 'hdr.word.preload' };

/**
 * The path rules of a `_headers` text, each with its header lines; comments and blank lines are left out.
 * @param {string|null|undefined} text
 * @returns {Array<{path: string, headers: Array<{name: string, value: string, line: string}>}>}
 */
export function readRules(text) {
  const rules = [];
  let rule = null;
  for (const raw of String(text ?? '').split('\n')) {
    const line = raw.replace(/[ \t\r]+$/, '');
    const words = line.trim();
    if (!words || words.startsWith('#')) continue;
    if (!/^[ \t]/.test(line)) {
      rule = { path: words, headers: [] };
      rules.push(rule);
      continue;
    }
    const m = /^[ \t]+([A-Za-z0-9-]+)[ \t]*:[ \t]*(.*)$/.exec(line);
    if (m && rule) rule.headers.push({ name: m[1], value: m[2], line: words });
  }
  return rules;
}

/** A header's value as its directives, each a list of words with the directive's name first. */
const directivesOf = (value) => value.split(';').map((part) => part.trim().split(/\s+/).filter(Boolean)).filter((d) => d.length);

/** A path rule's words. */
export const pathWords = (path) => (PATHS[path] ? { key: PATHS[path] } : { text: path });

/** A source's words: a keyword's name, a known host's name, or the host. */
export function sourceWords(source) {
  const key = SOURCES[source.toLowerCase()];
  if (key) return { key };
  try {
    const url = new URL(source);
    const whole = url.protocol === 'https:' && (url.pathname === '/' || url.pathname === '') && !url.search && !source.includes('*');
    if (whole) return HOSTS[url.host] ? { key: HOSTS[url.host] } : { text: url.host };
  } catch { /* a source that is no address stands as written */ }
  return { text: source };
}

/** A policy directive's words: the kind of content it is about, or its name. */
export const kindWords = (name) => (KINDS[name.toLowerCase()] ? { key: KINDS[name.toLowerCase()] } : { text: name });

/** A policy directive that is no kind of content, in a sentence, or as written. */
function directiveSentence([name, ...sources]) {
  const only = sources.length === 1 ? sources[0].toLowerCase() : null;
  const lower = name.toLowerCase();
  if (lower === 'frame-ancestors' && only === "'self'") return { key: 'hdr.rule.frameSelf' };
  if (lower === 'frame-ancestors' && only === "'none'") return { key: 'hdr.rule.frameNone' };
  if (lower === 'form-action' && only === "'self'") return { key: 'hdr.rule.formSelf' };
  if (lower === 'object-src' && only === "'none'") return { key: 'hdr.rule.objectNone' };
  if (lower === 'base-uri' && only === "'self'") return { key: 'hdr.rule.baseSelf' };
  if (lower === 'upgrade-insecure-requests' && !sources.length) return { key: 'hdr.rule.upgrade' };
  return { text: [name, ...sources].join(' ') };
}

/**
 * A header line's rules in sentences; a policy gives those of its directives that are no kind of content, and a header Urd does not know stands as written.
 * @param {{path: string, name: string, value: string}} header
 * @returns {Array<{key?: string, vars?: object, text?: string}>}
 */
export function ruleWords({ path, name, value }) {
  const v = value.trim();
  const where = pathWords(path);
  switch (name.toLowerCase()) {
    case 'strict-transport-security': {
      const age = Number(/(?:^|;)\s*max-age=(\d+)/i.exec(v)?.[1] ?? 0);
      if (age > 0) return [{ key: age === 31536000 ? 'hdr.rule.hstsYear' : 'hdr.rule.hsts' }];
      break;
    }
    case 'x-content-type-options': if (/^nosniff$/i.test(v)) return [{ key: 'hdr.rule.nosniff' }]; break;
    case 'x-frame-options':
      if (/^sameorigin$/i.test(v)) return [{ key: 'hdr.rule.frameSelf' }];
      if (/^deny$/i.test(v)) return [{ key: 'hdr.rule.frameNone' }];
      break;
    case 'referrer-policy': if (/^strict-origin-when-cross-origin$/i.test(v)) return [{ key: 'hdr.rule.referrer' }]; break;
    case 'x-robots-tag': if (!v.includes(':') && /\bnoindex\b/i.test(v)) return [{ key: 'hdr.rule.noindex', vars: { path: where } }]; break;
    case 'cache-control':
      if (/\bimmutable\b/i.test(v) && /\bmax-age=31536000\b/i.test(v)) return [{ key: 'hdr.rule.cacheKeep', vars: { path: where } }];
      if (/\bno-cache\b/i.test(v)) return [{ key: 'hdr.rule.cacheCheck', vars: { path: where } }];
      break;
    case 'content-type': return [{ key: 'hdr.rule.type', vars: { path: where } }];
    case 'speculation-rules': return [{ key: 'hdr.rule.speculation' }];
    default:
      if (POLICY.test(name)) return directivesOf(v).filter((d) => !KINDS[d[0].toLowerCase()]).map(directiveSentence);
  }
  return [{ key: 'hdr.rule.raw', vars: { rule: { text: `${name}: ${v}` }, path: where } }];
}

/** The policy line a file's pages answer to: the one under `/*`, else the first. */
function policyOf(rules) {
  const all = rules.flatMap((rule) => rule.headers.map((header) => ({ ...header, path: rule.path })));
  return all.find((h) => POLICY.test(h.name) && h.path === '/*') ?? all.find((h) => POLICY.test(h.name)) ?? null;
}

/**
 * What a file's pages may load, by kind, each with its sources in words; a source the owner added is marked as theirs.
 * @param {string} text
 * @param {string[]} [added] The owner's additions as the update reports them, `directive source …`
 * @returns {Array<{kind: object, sources: Array<{words: object, yours: boolean}>}>}
 */
export function policyTable(text, added = []) {
  const policy = policyOf(readRules(text));
  if (!policy) return [];
  const theirs = new Set(added.flatMap((label) => {
    const [name, ...words] = label.split(/\s+/);
    return words.map((word) => `${name.toLowerCase()} ${word}`);
  }));
  return directivesOf(policy.value).filter((d) => KINDS[d[0].toLowerCase()]).map(([name, ...sources]) => {
    const seen = new Map();
    for (const source of sources) {
      const words = sourceWords(source);
      const id = words.key ?? words.text;
      const yours = theirs.has(`${name.toLowerCase()} ${source}`);
      if (!seen.has(id)) seen.set(id, { words, yours });
      else if (yours) seen.get(id).yours = true;
    }
    return { kind: kindWords(name), sources: [...seen.values()] };
  });
}

/**
 * Every rule of a file but its policy's kinds of content, in sentences, each once.
 * @param {string} text
 * @returns {Array<object>}
 */
export function otherRules(text) {
  const seen = new Map();
  for (const rule of readRules(text)) {
    for (const header of rule.headers) {
      for (const words of ruleWords({ ...header, path: rule.path })) seen.set(JSON.stringify(words), words);
    }
  }
  return [...seen.values()];
}

/** The header lines of a file by path rule and name, the first of each. */
function headerMap(text) {
  const map = new Map();
  for (const rule of readRules(text)) {
    for (const header of rule.headers) {
      const key = `${rule.path}\n${header.name.toLowerCase()}`;
      if (!map.has(key)) map.set(key, { ...header, path: rule.path });
    }
  }
  return map;
}

/** A policy's directives by name, each with its sources. */
const directiveMap = (value) => new Map(directivesOf(value).map(([name, ...sources]) => [name.toLowerCase(), { name, sources }]));

/** Whether two header values say the same: the same directives with the same words, in any order. */
function sameValue(a, b) {
  const one = directiveMap(a);
  const two = directiveMap(b);
  if (one.size !== two.size) return false;
  for (const [name, { sources }] of one) {
    const other = two.get(name)?.sources;
    if (!other || other.length !== sources.length || sources.some((s) => !other.includes(s))) return false;
  }
  return true;
}

/** A header line's change in words: a policy as a whole names itself first, then its rules that are no kind of content. */
const wholeWords = (header) => (POLICY.test(header.name) ? [{ key: 'hdr.rule.policy' }, ...ruleWords(header)] : ruleWords(header));

/**
 * What changes from one file to another, in words, each once: rules added, gone or changed, and what a policy's kinds of content gain or lose.
 * @param {string|null} from
 * @param {string|null} to
 * @returns {Array<{kind: 'added'|'removed'|'changed'|'sourcesAdded'|'sourcesRemoved'|'kindNew'|'kindGone', words: object, sources?: object[]}>}
 */
export function headerChanges(from, to) {
  const before = headerMap(from);
  const after = headerMap(to);
  const out = new Map();
  const push = (change) => out.set(JSON.stringify(change), change);
  for (const [key, header] of after) {
    const old = before.get(key);
    if (!old) {
      for (const words of wholeWords(header)) push({ kind: 'added', words });
      continue;
    }
    if (sameValue(old.value, header.value)) continue;
    if (!POLICY.test(header.name)) {
      for (const words of ruleWords(header)) push({ kind: 'changed', words });
      continue;
    }
    const was = directiveMap(old.value);
    const now = directiveMap(header.value);
    for (const [name, { name: label, sources }] of now) {
      const gone = was.get(name);
      if (!KINDS[name]) {
        if (!gone || !sameValue(`${name} ${gone.sources.join(' ')}`, `${name} ${sources.join(' ')}`)) push({ kind: gone ? 'changed' : 'added', words: directiveSentence([label, ...sources]) });
        continue;
      }
      if (!gone) {
        push({ kind: 'kindNew', words: kindWords(label), sources: sources.map(sourceWords) });
        continue;
      }
      const more = sources.filter((s) => !gone.sources.includes(s));
      const less = gone.sources.filter((s) => !sources.includes(s));
      if (more.length) push({ kind: 'sourcesAdded', words: kindWords(label), sources: more.map(sourceWords) });
      if (less.length) push({ kind: 'sourcesRemoved', words: kindWords(label), sources: less.map(sourceWords) });
    }
    for (const [name, { name: label, sources }] of was) {
      if (now.has(name)) continue;
      if (KINDS[name]) push({ kind: 'kindGone', words: kindWords(label) });
      else push({ kind: 'removed', words: directiveSentence([label, ...sources]) });
    }
  }
  for (const [key, header] of before) {
    if (!after.has(key)) for (const words of wholeWords(header)) push({ kind: 'removed', words });
  }
  return [...out.values()];
}

/**
 * The owner's additions the update keeps, in words: sources by kind, the HTTPS rule's words by name, anything else as written.
 * @param {string[]} added `directive word …`, as the update reports them
 * @returns {Array<{words: object, sources?: object[]}>}
 */
export function keptWords(added = []) {
  return added.map((label) => {
    const [name, ...words] = label.split(/\s+/);
    if (KINDS[name.toLowerCase()]) return { words: kindWords(name), sources: words.map(sourceWords) };
    if (!words.length && HSTS_WORDS[name.toLowerCase()]) return { words: { key: HSTS_WORDS[name.toLowerCase()] } };
    return { words: { text: label } };
  });
}

/** What an owner's value adds to the release's it came from, by directive, or null where it takes anything away. */
function ownExtras(release, mine) {
  const ours = directiveMap(release);
  const theirs = directiveMap(mine);
  for (const [name, { sources }] of ours) {
    const own = theirs.get(name);
    if (!own || sources.some((s) => !own.sources.includes(s))) return null;
  }
  return [...theirs].map(([name, { name: label, sources }]) => ({ name, label, own: !ours.has(name), sources: sources.filter((s) => !ours.get(name)?.sources.includes(s)) }))
    .filter((extra) => extra.own || extra.sources.length);
}

/** A header line with the owner's own additions put into the release's new value. */
function lineWithExtras(header, extras) {
  const directives = directivesOf(header.value);
  for (const extra of extras) {
    const match = directives.find((d) => d[0].toLowerCase() === extra.name);
    if (match) match.push(...extra.sources.filter((s) => !match.slice(1).includes(s)));
    else directives.push([extra.label, ...extra.sources]);
  }
  return `  ${header.name}: ${directives.map((d) => d.join(' ')).join('; ')}`;
}

/**
 * The edits that bring a site's own file what a release changed, read against the owner's own lines; one they took from is shown to weigh (`compare`).
 * @param {string|null} from The release the site's file is closest to
 * @param {string} to The new release's file
 * @param {string|null} site The site's own file
 * @returns {Array<{step: string, path: string, name?: string, directive?: string, sources?: string, copy?: string}>}
 */
export function handEdits(from, to, site) {
  const before = headerMap(from);
  const after = headerMap(to);
  const mine = headerMap(site);
  const rulesHeld = new Set(readRules(site).map((rule) => rule.path));
  const out = [];
  const newRules = new Map();
  for (const [key, header] of after) {
    const old = before.get(key);
    if (old && sameValue(old.value, header.value)) continue;
    if (!rulesHeld.has(header.path)) {
      if (!newRules.has(header.path)) newRules.set(header.path, [header.path]);
      newRules.get(header.path).push(`  ${header.line}`);
      continue;
    }
    const own = mine.get(key);
    if (!own) {
      out.push({ step: 'add', path: header.path, copy: `  ${header.line}` });
      continue;
    }
    if (sameValue(own.value, header.value)) continue;
    const extras = old ? ownExtras(old.value, own.value) : null;
    if (!extras) {
      out.push({ step: 'compare', path: header.path, name: header.name, copy: `  ${header.line}` });
      continue;
    }
    if (!POLICY.test(header.name)) {
      const copy = lineWithExtras(header, extras);
      if (!sameValue(own.value, copy.slice(copy.indexOf(':') + 1))) out.push({ step: 'replace', path: header.path, name: header.name, copy });
      continue;
    }
    const was = directiveMap(old.value);
    const now = directiveMap(header.value);
    const held = directiveMap(own.value);
    for (const [name, { name: label, sources }] of now) {
      const more = sources.filter((s) => !held.get(name)?.sources.includes(s));
      if (!held.has(name)) out.push({ step: 'addDirective', path: header.path, name: header.name, copy: `; ${[label, ...sources].join(' ')}` });
      else if (more.length) out.push({ step: 'addSources', path: header.path, name: header.name, directive: label, copy: ` ${more.join(' ')}` });
      const less = (was.get(name)?.sources ?? []).filter((s) => !sources.includes(s) && held.get(name)?.sources.includes(s));
      if (less.length) out.push({ step: 'removeSources', path: header.path, name: header.name, directive: label, sources: less.join(' ') });
    }
    for (const [name, { name: label }] of was) {
      if (!now.has(name) && held.has(name)) out.push({ step: 'removeDirective', path: header.path, name: header.name, directive: label });
    }
  }
  for (const [key, header] of before) {
    if (!after.has(key) && mine.has(key)) out.push({ step: 'remove', path: header.path, name: header.name });
  }
  for (const [path, lines] of newRules) out.push({ step: 'newRule', path, copy: lines.join('\n') });
  return out;
}
