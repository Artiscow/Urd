/**
 * A release's Markdown notes as a tree of blocks and inline runs that the Updates panel draws with its own elements, never as HTML; a link leads only to http(s).
 */

/**
 * @typedef {{kind: 'text', text: string} | {kind: 'strong' | 'em', children: Inline[]} | {kind: 'code', text: string} | {kind: 'br'} | {kind: 'link', href: string, children: Inline[]}} Inline
 * @typedef {{kind: 'heading', level: number, inline: Inline[]} | {kind: 'para', inline: Inline[]} | {kind: 'list', ordered: boolean, items: Block[][]} | {kind: 'code', text: string} | {kind: 'rule'} | {kind: 'quote', alert: string|null, blocks: Block[]} | {kind: 'fold', summary: Inline[], open: boolean, blocks: Block[]}} Block
 */

const LIST_ITEM = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/;
const HEADING = /^ {0,3}(#{1,6})[ \t]+(.*)$/;
const FENCE = /^\s*(```|~~~)/;
const DETAILS_OPEN = /^\s*<details(\s[^>]*)?>(.*)$/i;
const DETAILS_CLOSE = /^\s*<\/details>\s*$/i;
const SUMMARY_OPEN = /^\s*<summary>/i;
const SUMMARY = /^\s*<summary>([\s\S]*?)<\/summary>(.*)$/i;
const QUOTE = /^ {0,3}>/;
const ALERT = /^\[!(note|tip|important|warning|caution)\]\s*$/i;
const SETEXT_1 = /^ {0,3}=+[ \t]*$/;
const SETEXT_2 = /^ {0,3}-+[ \t]*$/;

/** How deep folds, quotes and lists nest: one deeper than this stands as words. */
const NEST_DEPTH = 10;

/** The width of a line's leading spaces, a tab counting four. */
const indentOf = (line) => {
  let n = 0;
  for (const ch of line) {
    if (ch === ' ') n += 1;
    else if (ch === '\t') n += 4;
    else break;
  }
  return n;
};

/** A line with up to `n` columns of its leading spaces taken off. */
const dedent = (line, n) => {
  let i = 0;
  let taken = 0;
  while (i < line.length && taken < n && (line[i] === ' ' || line[i] === '\t')) {
    taken += line[i] === '\t' ? 4 : 1;
    i += 1;
  }
  return line.slice(i);
};

const blank = (line) => !line.trim();

/** For each line, the index of the first line from it on that holds words, -1 where none does: read once, so a run of blank lines is passed in one step. */
const nextFilled = (lines) => {
  const out = new Int32Array(lines.length + 1);
  out[lines.length] = -1;
  for (let k = lines.length - 1; k >= 0; k -= 1) out[k] = blank(lines[k]) ? out[k + 1] : k;
  return out;
};

/** A rule: three or more of one of - * _ alone on a line, spaces between them allowed. */
const isRule = (line) => {
  if (indentOf(line) > 3) return false;
  const bare = line.replace(/\s/g, '');
  return bare.length >= 3 && (/^-+$/.test(bare) || /^\*+$/.test(bare) || /^_+$/.test(bare));
};

/** A heading's words, a closing run of # after a space taken away. */
const headingWords = (raw) => {
  const words = raw.trimEnd();
  let end = words.length;
  while (end > 0 && words[end - 1] === '#') end -= 1;
  return end < words.length && (end === 0 || /\s/.test(words[end - 1])) ? words.slice(0, end).trimEnd() : words;
};

/** A link written [words](address "title"), read where it starts; its words hold no bracket, so a try reads no further than the next one. */
const LINK = /\[([^[\]\n]*)\]\(([^)\s]+)(?:[ \t]+"[^"\n]*")?\)/y;

/** The inline tags read as their Markdown, so a summary written `<b>Words</b>` reads as bold. */
const asMarkdown = (text) => text
  .replace(/<\/?(?:b|strong)>/gi, '**')
  .replace(/<\/?(?:i|em)>/gi, '*')
  .replace(/<\/?code>/gi, '`')
  .replace(/<br\s*\/?>/gi, '\n');

/** The inline tags read as their Markdown outside code, so code that names a tag keeps it as written. */
function tagsAsMarkdown(text) {
  let out = '';
  let i = 0;
  while (i < text.length) {
    const open = text.indexOf('`', i);
    const close = open === -1 ? -1 : text.indexOf('`', open + 1);
    if (close === -1) {
      out += asMarkdown(text.slice(i));
      break;
    }
    out += asMarkdown(text.slice(i, open)) + text.slice(open, close + 1);
    i = close + 1;
  }
  return out;
}

/** An address a link may lead to: http or https only, read by the URL parser. */
function safeHref(raw) {
  try {
    const url = new URL(raw.trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}

/** Words with their bare addresses made links: the address's closing punctuation is left outside it, and a closing bracket only where the address opened one. */
function withBareLinks(text) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(/https?:\/\/[^\s<>]+/g)) {
    let address = m[0];
    for (;;) {
      const end = address[address.length - 1];
      if ('.,;:!?\'"»'.includes(end)) address = address.slice(0, -1);
      else if (end === ')' && address.split('(').length < address.split(')').length) address = address.slice(0, -1);
      else break;
    }
    const href = safeHref(address);
    if (!href) continue;
    if (m.index > last) out.push({ kind: 'text', text: text.slice(last, m.index) });
    out.push({ kind: 'link', href, children: [{ kind: 'text', text: address }] });
    last = m.index + address.length;
  }
  if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
  return out;
}

/**
 * A run of words read into its inline marks, each mark's last search kept, so a long text reads in time with its length.
 * @param {string} source
 * @param {boolean} [inLink] Whether the words are a link's, which hold no link of their own
 * @returns {Inline[]}
 */
export function parseInline(source, inLink = false) {
  const text = tagsAsMarkdown(String(source ?? ''));
  const out = [];
  let plain = '';
  const flush = () => {
    if (!plain) return;
    if (inLink) out.push({ kind: 'text', text: plain });
    else out.push(...withBareLinks(plain));
    plain = '';
  };
  const wordAt = (j) => j >= 0 && j < text.length && /[\p{L}\p{N}_]/u.test(text[j]);
  /** Whether a mark at `j` can close: it follows no space, a single one is no half of a double, and an underscore stands at a word's end. */
  const closes = (mark, j) => {
    if (j < 1 || /\s/.test(text[j - 1])) return false;
    const ch = mark[0];
    if (mark.length === 1 && (text[j + 1] === ch || text[j - 1] === ch)) return false;
    return ch !== '_' || !wordAt(j + mark.length);
  };
  /** The last search for each mark: from where, and the closing mark it found (-1 for none), which answers every search from there up to it. */
  const searched = new Map();
  const closing = (mark, from) => {
    const last = searched.get(mark);
    if (last && from >= last.from && (last.found === -1 || from <= last.found)) return last.found;
    let j = text.indexOf(mark, from);
    while (j !== -1 && !closes(mark, j)) j = text.indexOf(mark, j + 1);
    searched.set(mark, { from, found: j });
    return j;
  };
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\\' && i + 1 < text.length && '\\`*_[]()#+-.!<>'.includes(text[i + 1])) {
      plain += text[i + 1];
      i += 2;
      continue;
    }
    if (ch === '\n') {
      flush();
      out.push({ kind: 'br' });
      i += 1;
      continue;
    }
    if (ch === '`') {
      const end = text.indexOf('`', i + 1);
      if (end > i + 1) {
        flush();
        out.push({ kind: 'code', text: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    if (ch === '[' && !inLink) {
      LINK.lastIndex = i;
      const m = LINK.exec(text);
      if (m) {
        flush();
        const href = safeHref(m[2]);
        const children = parseInline(m[1], true);
        if (href) out.push({ kind: 'link', href, children });
        else out.push(...children);
        i += m[0].length;
        continue;
      }
    }
    if (ch === '*' || ch === '_') {
      const size = text[i + 1] !== ch ? 1 : text[i + 2] !== ch ? 2 : 3;
      const mark = ch.repeat(size);
      const open = i + size;
      // A mark opens before a word, and an underscore only where it stands outside a word.
      if (open < text.length && !/\s/.test(text[open]) && (ch === '*' || !wordAt(i - 1))) {
        const j = closing(mark, open + 1);
        if (j !== -1) {
          flush();
          const children = parseInline(text.slice(open, j), inLink);
          out.push(size === 1 ? { kind: 'em', children } : size === 2 ? { kind: 'strong', children } : { kind: 'em', children: [{ kind: 'strong', children }] });
          i = j + size;
          continue;
        }
      }
    }
    plain += ch;
    i += 1;
  }
  flush();
  return out;
}

/**
 * A fold from its opening line on: its summary, whether it opens open, its inner lines, and the index after its close or the end; a code block holds no close.
 */
function readFold(lines, start) {
  const opening = DETAILS_OPEN.exec(lines[start]);
  const open = /\bopen\b/i.test(opening[1] ?? '');
  let i = start + 1;
  let head = opening[2].trim() ? opening[2] : '';
  if (!head) {
    let k = i;
    while (k < lines.length && blank(lines[k])) k += 1;
    if (k < lines.length && SUMMARY_OPEN.test(lines[k])) {
      head = lines[k];
      i = k + 1;
    }
  }
  let summary = '';
  const inner = [];
  if (SUMMARY_OPEN.test(head)) {
    let joined = head;
    let closed = /<\/summary>/i.test(head);
    let k = i;
    while (!closed && k < lines.length && !blank(lines[k]) && !DETAILS_CLOSE.test(lines[k]) && !DETAILS_OPEN.test(lines[k])) {
      closed = /<\/summary>/i.test(lines[k]);
      joined += ` ${lines[k++].trim()}`;
    }
    const m = closed ? SUMMARY.exec(joined) : null;
    if (m) {
      summary = m[1].trim();
      if (m[2].trim()) inner.push(m[2]);
      i = k;
    } else {
      summary = head.replace(SUMMARY_OPEN, '').trim();
    }
  } else if (head) {
    inner.push(head);
  }
  let depth = 1;
  let fence = null;
  while (i < lines.length) {
    const line = lines[i];
    const f = FENCE.exec(line);
    if (f) {
      if (!fence) fence = f[1];
      else if (line.trim().startsWith(fence)) fence = null;
    } else if (!fence) {
      if (DETAILS_OPEN.test(line)) depth += 1;
      else if (DETAILS_CLOSE.test(line)) {
        depth -= 1;
        if (depth === 0) {
          i += 1;
          break;
        }
      }
    }
    inner.push(line);
    i += 1;
  }
  return { summary, open, inner, next: i };
}

/** A list from its first item on, each item's lines under it, and the index after it; a rule, heading, fold, code block or quote at its indent ends it. */
function readList(lines, filled, start, depth) {
  const base = indentOf(lines[start]);
  const ordered = /\d/.test(LIST_ITEM.exec(lines[start])[2]);
  const ends = (line) => indentOf(line) <= base && (isRule(line) || DETAILS_OPEN.test(line) || HEADING.test(line) || FENCE.test(line) || QUOTE.test(line));
  const items = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    const m = LIST_ITEM.exec(line);
    if (m && indentOf(line) === base && /\d/.test(m[2]) === ordered && !isRule(line)) {
      // An item: its first words, and the lines indented under it (blank lines among them kept while more of it follows).
      const width = m[1].length + m[2].length + 1;
      const own = [m[3]];
      i += 1;
      while (i < lines.length) {
        const next = lines[i];
        if (blank(next)) {
          const ahead = filled[i];
          if (ahead === -1 || indentOf(lines[ahead]) <= base) break;
          for (; i < ahead; i += 1) own.push('');
          continue;
        }
        if (ends(next) || (indentOf(next) <= base && LIST_ITEM.test(next))) break;
        if (indentOf(next) <= base && blank(own[own.length - 1] ?? 'x')) break;
        own.push(dedent(next, Math.min(width, indentOf(next))));
        i += 1;
      }
      items.push(parseBlocks(own, depth + 1));
      continue;
    }
    if (blank(line)) {
      // A blank line between two items of the same list keeps the list going.
      const ahead = filled[i];
      const nm = ahead === -1 ? null : LIST_ITEM.exec(lines[ahead]);
      if (nm && indentOf(lines[ahead]) === base && /\d/.test(nm[2]) === ordered && !isRule(lines[ahead])) {
        i = ahead;
        continue;
      }
    }
    break;
  }
  return { block: { kind: 'list', ordered, items }, next: i };
}

/**
 * Lines read into blocks.
 * @param {string[]} lines
 * @param {number} [depth] How deep in folds, quotes and lists the lines stand
 * @returns {Block[]}
 */
function parseBlocks(lines, depth = 0) {
  const blocks = [];
  const filled = nextFilled(lines);
  let para = [];
  const endPara = () => {
    if (!para.length) return;
    blocks.push({ kind: 'para', inline: parseInline(para.map((l) => l.trim()).join(' ')) });
    para = [];
  };
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (blank(line)) {
      endPara();
      i = filled[i] === -1 ? lines.length : filled[i];
      continue;
    }
    if (FENCE.test(line)) {
      endPara();
      const mark = FENCE.exec(line)[1];
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith(mark)) code.push(lines[i++]);
      i += 1;
      blocks.push({ kind: 'code', text: code.join('\n') });
      continue;
    }
    if (DETAILS_OPEN.test(line) && depth < NEST_DEPTH) {
      endPara();
      const { summary, open, inner, next } = readFold(lines, i);
      blocks.push({ kind: 'fold', summary: parseInline(summary), open, blocks: parseBlocks(inner, depth + 1) });
      i = next;
      continue;
    }
    if (DETAILS_CLOSE.test(line)) {
      // A closing tag without its opening one is passed by.
      i += 1;
      continue;
    }
    if (QUOTE.test(line) && depth < NEST_DEPTH) {
      endPara();
      const inner = [];
      while (i < lines.length && QUOTE.test(lines[i])) inner.push(lines[i++].replace(/^ {0,3}> ?/, ''));
      const alert = ALERT.exec(inner[0] ?? '');
      blocks.push({ kind: 'quote', alert: alert ? alert[1].toLowerCase() : null, blocks: parseBlocks(alert ? inner.slice(1) : inner, depth + 1) });
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      endPara();
      blocks.push({ kind: 'heading', level: heading[1].length, inline: parseInline(headingWords(heading[2])) });
      i += 1;
      continue;
    }
    if (para.length && (SETEXT_1.test(line) || SETEXT_2.test(line))) {
      // Words underlined with = or - are a heading.
      blocks.push({ kind: 'heading', level: SETEXT_1.test(line) ? 1 : 2, inline: parseInline(para.map((l) => l.trim()).join(' ')) });
      para = [];
      i += 1;
      continue;
    }
    if (isRule(line)) {
      endPara();
      blocks.push({ kind: 'rule' });
      i += 1;
      continue;
    }
    if (LIST_ITEM.test(line) && depth < NEST_DEPTH) {
      endPara();
      const { block, next } = readList(lines, filled, i, depth);
      blocks.push(block);
      i = next;
      continue;
    }
    para.push(line);
    i += 1;
  }
  endPara();
  return blocks;
}

/**
 * A run of words as plain text, its marks left out: the title a fold's summary gives the panel's fold.
 * @param {Inline[]} nodes
 * @returns {string}
 */
export function plainText(nodes) {
  return (nodes ?? []).map((n) => (n.kind === 'text' || n.kind === 'code' ? n.text : n.kind === 'br' ? ' ' : plainText(n.children))).join('').trim();
}

/**
 * A release's words in the Updates panel: its GitHub name where it holds the whole version, else the version before the name, else the version alone.
 * @param {string|null|undefined} name The release's name
 * @param {string} tag Its version tag, such as v0.7.11
 * @returns {string}
 */
export function releaseLabel(name, tag) {
  const words = String(name ?? '').trim();
  const version = String(tag ?? '').replace(/^v/i, '');
  if (!words) return String(tag ?? '');
  const digit = (c) => c !== undefined && c >= '0' && c <= '9';
  for (let at = version ? words.indexOf(version) : -1; at !== -1; at = words.indexOf(version, at + 1)) {
    const before = words[at - 1];
    const after = words[at + version.length];
    const longer = digit(after) || (after === '.' && digit(words[at + version.length + 1]));
    if (!digit(before) && before !== '.' && !longer) return words;
  }
  return `${tag} - ${words}`;
}

/** The longest notes read, as the update function keeps them (functions/api/github/update.js). */
export const NOTES_MAX = 20000;

/** Notes without their comments (`<!-- … -->`), found by plain searches; a comment left open runs to the end. */
function withoutComments(text) {
  let out = '';
  let i = 0;
  for (;;) {
    const start = text.indexOf('<!--', i);
    if (start === -1) return out + text.slice(i);
    out += text.slice(i, start);
    const end = text.indexOf('-->', start + 4);
    if (end === -1) return out;
    i = end + 3;
  }
}

/**
 * A release's notes read into blocks, the first NOTES_MAX characters of them.
 * Every kind of line break ends a line, so no line holds one inside it.
 * @param {string|null|undefined} text The notes as Markdown
 * @returns {Block[]}
 */
export function parseNotes(text) {
  const notes = withoutComments(String(text ?? '').slice(0, NOTES_MAX)).replace(/\r\n?|[\u2028\u2029\u0085]/g, '\n');
  return parseBlocks(notes.split('\n'));
}
