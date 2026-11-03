/**
 * Redirects (content/redirects.json, ADR-0015): an old address sent to a new one, permanently (301) or for now (302).
 * The rules are read and checked here, written in the host's format at publishing (Cloudflare Pages' `_redirects`), and read back from a list, a CSV file or a `_redirects` written by hand.
 * Pure, node-tested (tests/redirects-model.test.mjs).
 */
import { parseCsvRows, detectSeparator } from '$engine/collections-csv.js';

/** The kinds of a rule: permanent (301), the default, and temporary (302). */
export const REDIRECT_KINDS = [301, 302];

/** Cloudflare Pages' limits per project: rules without a * (static) and with one (dynamic). */
export const HOST_LIMITS = { static: 2000, dynamic: 100 };

/** The first line of the file publishing writes; a `_redirects` without it was written by hand. */
export const HOST_FILE_HEAD = '# Written by Urd at publishing from content/redirects.json.';

/** Urd's own folders and files: a rule from one of them would break the site or the admin, and the host never redirects the functions' routes. */
const RESERVED_FOLDERS = ['admin', 'api', 'assets', 'content', 'plugins', 'functions', 'readme'];
const RESERVED_FILES = ['/index.html', '/404.html', '/urd.json', '/speculation-rules.json', '/sitemap.xml', '/robots.txt'];

/** One segment of an old address: no space, no ? or #, and no : (the host reads it as a placeholder) or * (only a whole last segment). */
const SEGMENT = "[A-Za-z0-9._~%!$&'()+,;=@-]+";
const FROM_RE = new RegExp(`^/(?:${SEGMENT}/)*(?:${SEGMENT}|\\*)?$`);
const TO_PATH_RE = /^\/\S*$/;

/**
 * An old address as a rule holds it: a path from the site's root, without a trailing slash, its last segment a * where the rule covers everything under a folder; a whole address pasted gives its path.
 * @param {unknown} raw
 * @returns {string|null} null where it cannot be an old address
 */
export function normalizeFrom(raw) {
  let path = String(raw ?? '').trim();
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      return null;
    }
  }
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, '') || '/';
  return FROM_RE.test(path) ? path : null;
}

/**
 * Where a rule sends its visitors: a path on the site (a query or a fragment allowed) or a whole web address; a * stands for what the old address's * matched.
 * @param {unknown} raw
 * @returns {string|null}
 */
export function normalizeTo(raw) {
  const text = String(raw ?? '').trim();
  if (!text || /\s/.test(text)) return null;
  if (/^https?:\/\//i.test(text)) {
    try {
      const url = new URL(text);
      // The scheme in lower case, as the host's file and the guard read it (a phone's keyboard may give «Https»).
      return url.protocol === 'https:' || url.protocol === 'http:' ? text.replace(/^https?/i, (scheme) => scheme.toLowerCase()) : null;
    } catch {
      return null;
    }
  }
  // Any other scheme (mailto:, javascript:, ftp:) is no target a redirect can have.
  if (/^[a-z][a-z0-9+.-]*:/i.test(text)) return null;
  const path = text.startsWith('/') ? text : `/${text}`;
  return TO_PATH_RE.test(path) ? path : null;
}

/** Whether an old address is one of Urd's own, which no rule may take: a folder or a file of Urd's, or `/*`, which would take them all. */
export function isReservedSource(from) {
  const path = String(from ?? '');
  if (path === '/*' || RESERVED_FILES.includes(path)) return true;
  const first = path.split('/')[1] ?? '';
  return RESERVED_FOLDERS.includes(first);
}

/** The kind as the rule holds it: 302 kept, anything else permanent. */
export function kindOf(status) {
  return Number(status) === 302 ? 302 : 301;
}

/** The path a target leads to on the site, without its query, fragment or trailing slash; null for a web address. */
function targetPath(to) {
  if (!String(to).startsWith('/')) return null;
  const path = String(to).split(/[?#]/)[0];
  return path.length > 1 ? path.replace(/\/+$/, '') || '/' : path;
}

/** Whether a rule with a * takes this path. */
function takes(from, path) {
  if (!from.endsWith('*')) return from === path;
  const prefix = from.slice(0, -1);
  return path.startsWith(prefix);
}

/**
 * What is wrong with each rule, as the list marks it: an error (dark red) where the rule cannot do what it says, a warning (amber) where it may not, null where it is sound.
 * Errors: an old address that is not one, a target that is not one, one of Urd's own addresses, an old address a shown page has (a redirect wins over the page), a * in the target without one in the old address, a circle. Warnings: an old address a rule above already takes, and a target on the site that is no page, no rule's old address and no file.
 * @param {Array<{from: string, to: string, status: number}>} rules
 * @param {Array<{id: string, title: string, path: string, hidden?: boolean}>} pages
 * @returns {Array<{level: 'error'|'warn', key: string, field: 'from'|'to', page?: string}|null>}
 */
export function redirectIssues(rules, pages = []) {
  const shown = pages.filter((p) => !p.hidden);
  const pagePaths = new Set(shown.map((p) => p.path));
  const firstOf = new Map();
  rules.forEach((rule, i) => {
    if (!firstOf.has(rule.from)) firstOf.set(rule.from, i);
  });
  const staticTo = new Map(rules.filter((r) => !String(r.from).endsWith('*')).map((r) => [r.from, r.to]));
  const loops = (rule) => {
    const seen = new Set([rule.from]);
    let path = targetPath(rule.to);
    while (path !== null) {
      if (seen.has(path)) return true;
      if (!staticTo.has(path)) return false;
      seen.add(path);
      path = targetPath(staticTo.get(path));
    }
    return false;
  };
  return rules.map((rule, i) => {
    if (!normalizeFrom(rule.from) || normalizeFrom(rule.from) !== rule.from) return { level: 'error', key: 'badFrom', field: 'from' };
    if (!normalizeTo(rule.to)) return { level: 'error', key: 'badTo', field: 'to' };
    if (isReservedSource(rule.from)) return { level: 'error', key: 'reserved', field: 'from' };
    const hidden = shown.find((p) => takes(rule.from, p.path));
    if (hidden) return { level: 'error', key: 'hidesPage', field: 'from', page: hidden.title || hidden.id };
    const wild = rule.from.endsWith('*');
    if (!wild && rule.to.includes('*')) return { level: 'error', key: 'starWithoutStar', field: 'to' };
    if (!wild && loops(rule)) return { level: 'error', key: 'loop', field: 'to' };
    if (firstOf.get(rule.from) !== i) return { level: 'warn', key: 'duplicate', field: 'from' };
    const path = targetPath(rule.to);
    // A target with a dot in its last segment is taken for a file (a PDF in media/, say), which the list cannot see.
    const file = path !== null && /\.[A-Za-z0-9]+$/.test(path);
    if (path !== null && !wild && !file && !pagePaths.has(path) && !staticTo.has(path)) return { level: 'warn', key: 'notAPage', field: 'to' };
    return null;
  });
}

/** The rules publishing can write, in their normalised form: each old address and target sound, none of Urd's own, the first rule for an old address only. */
function writable(rules) {
  const seen = new Set();
  const out = [];
  for (const rule of rules) {
    const from = normalizeFrom(rule.from);
    const to = normalizeTo(rule.to);
    if (!from || !to || isReservedSource(from) || seen.has(from)) continue;
    seen.add(from);
    out.push({ from, to, status: rule.status });
  }
  return out;
}

/**
 * The lines of the host's file: the static rules first, each old address twice, with and without its slash (the host does not document whether they are one), then the rules with a *, the kind always written (the host reads a missing one as 302).
 * @param {Array<{from: string, to: string, status: number}>} rules
 * @returns {{static: string[], dynamic: string[]}}
 */
export function hostLines(rules) {
  const out = { static: [], dynamic: [] };
  for (const rule of writable(rules)) {
    const kind = kindOf(rule.status);
    if (rule.from.endsWith('*')) {
      out.dynamic.push(`${rule.from} ${rule.to.replace('*', ':splat')} ${kind}`);
    } else {
      for (const from of rule.from === '/' ? ['/'] : [rule.from, `${rule.from}/`]) out.static.push(`${from} ${rule.to} ${kind}`);
    }
  }
  return out;
}

/** The `_redirects` file publishing writes. */
export function toHostFile(rules) {
  const lines = hostLines(rules);
  return [HOST_FILE_HEAD, "# Change the redirects in the admin's Pages panel: this file is written again at every publish.", ...lines.static, ...lines.dynamic].join('\n') + '\n';
}

/** Whether a `_redirects` file is the one Urd writes. */
export function isUrdHostFile(text) {
  return String(text ?? '').startsWith(HOST_FILE_HEAD);
}

/** A kind as a list or a file may give it: 301, 308, «permanent» and the like are permanent; 302, 303, 307, «temporary» are temporary; anything else (or nothing) is the fallback. */
function readKind(raw, fallback) {
  const word = String(raw ?? '').trim().toLowerCase();
  if (['301', '308', 'permanent', 'permanently', 'perm'].includes(word)) return 301;
  if (['302', '303', '307', 'temporary', 'temp'].includes(word)) return 302;
  return fallback;
}

/** One rule from its old address, target and kind as written, or null where it cannot be one. */
function ruleOf(from, to, kind) {
  const f = normalizeFrom(from);
  const t = normalizeTo(String(to ?? '').replace(':splat', '*'));
  return f && t ? { from: f, to: t, status: kind } : null;
}

/**
 * The rules of a `_redirects` file written by hand, before Urd writes its own: each line an old address, a target and a kind (302 where it is left out, as the host reads it); a twin with a trailing slash is one rule, and lines Urd cannot hold (a proxy with 200, a placeholder) are left out.
 * @param {string} text
 * @returns {{rules: Array<{from: string, to: string, status: number}>, skipped: number}}
 */
export function parseHostFile(text) {
  const rules = [];
  let skipped = 0;
  for (const line of String(text ?? '').split(/\r?\n/)) {
    const words = line.trim().split(/\s+/);
    if (!words[0] || words[0].startsWith('#')) continue;
    const code = words[2] ?? '302';
    const rule = ['200', '404'].includes(code) || /:(?!splat)[A-Za-z]/.test(words[0]) ? null : ruleOf(words[0], words[1], readKind(code, 302));
    if (!rule) {
      skipped += 1;
      continue;
    }
    if (!rules.some((r) => r.from === rule.from)) rules.push(rule);
  }
  return { rules, skipped };
}

/**
 * The rules of a pasted list: a rule a line, the old address (from a slash, or a whole address) and the target apart by spaces, an arrow, a comma or a semicolon, and the kind last where it is given (permanent where it is not).
 * @param {string} text
 * @returns {{rules: Array<{from: string, to: string, status: number}>, skipped: number}}
 */
export function parseList(text) {
  const rules = [];
  let skipped = 0;
  for (const line of String(text ?? '').split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const words = line.replace(/->|=>|→/g, ' ').split(/[\s,;\t]+/).filter(Boolean);
    // A line of words is no rule: the old address starts with a slash or is a whole address.
    const looks = words.length >= 2 && (words[0].startsWith('/') || /^https?:\/\//i.test(words[0]));
    const rule = looks ? ruleOf(words[0], words[1], readKind(words[2], 301)) : null;
    if (rule) rules.push(rule);
    else skipped += 1;
  }
  return { rules, skipped };
}

/** One CSV cell, quoted where it must be. */
const cell = (value) => (/[",;\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value);

/** The list as a CSV file: a header, then a rule a row, the kind as 301 or 302. */
export function rulesToCsv(rules) {
  return ['from,to,status', ...rules.map((r) => [r.from, r.to, String(kindOf(r.status))].map(cell).join(','))].join('\n') + '\n';
}

/**
 * The rules of a CSV file: the old address, the target and the kind in the first three columns, a header row recognised and passed, the separator read from the file.
 * @param {string} text
 * @returns {{rules: Array<{from: string, to: string, status: number}>, skipped: number}}
 */
export function rulesFromCsv(text) {
  const rows = parseCsvRows(String(text ?? ''), detectSeparator(String(text ?? ''))).map((r) => r.cells);
  const rules = [];
  let skipped = 0;
  rows.forEach((cells, i) => {
    if (!cells.some((c) => String(c).trim())) return;
    if (i === 0 && /^(from|old|source|fra)/i.test(String(cells[0]).trim())) return;
    const rule = ruleOf(cells[0], cells[1], readKind(cells[2], 301));
    if (rule) rules.push(rule);
    else skipped += 1;
  });
  return { rules, skipped };
}

/**
 * Rules added to a list: a rule for an old address the list already has replaces that one, so an import updates rather than repeats.
 * @returns {{rules: Array<object>, added: number, replaced: number}}
 */
export function mergeRules(rules, incoming) {
  const out = rules.map((r) => ({ ...r }));
  let added = 0;
  let replaced = 0;
  for (const rule of incoming) {
    const at = out.findIndex((r) => r.from === rule.from);
    if (at >= 0) {
      out[at] = { ...rule };
      replaced += 1;
    } else {
      out.push({ ...rule });
      added += 1;
    }
  }
  return { rules: out, added, replaced };
}

/** The list with one rule for an old address: the one standing there replaced, else added at the end. */
export function withRule(rules, from, to, status = 301) {
  return mergeRules(rules, [{ from, to, status }]).rules;
}

/** The list without the rules from an old address. */
export function withoutFrom(rules, from) {
  return rules.filter((r) => r.from !== from);
}

/**
 * A page moved from one address to another: the rules that led to the old address, or to a spot on it, lead to the new one, so no chain grows, and a rule from the new address goes, since it would hide the page.
 * @param {Array<{from: string, to: string, status: number}>} rules
 * @param {string} oldPath
 * @param {string} newPath
 */
export function pageMoved(rules, oldPath, newPath) {
  return withoutFrom(rules, newPath).map((r) => {
    // A target on the old address, a spot or a query on it included (/kaker#priser), moves with the page.
    if (r.to !== oldPath && !r.to.startsWith(`${oldPath}#`) && !r.to.startsWith(`${oldPath}?`)) return r;
    return { ...r, to: `${newPath}${r.to.slice(oldPath.length)}` };
  });
}
