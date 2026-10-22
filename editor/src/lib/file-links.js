/**
 * Links to files (0.7.27.9): the link editor's File kind.
 * A PDF chosen there is held in the draft as a data URL that carries its name, and publishing writes it to media/ as `<name>-<hash>.pdf` (publishHeldFiles), a name its content decides, so links to the same file share one path.
 * The files the File kind lists are the ones the site's content already uses: every path in media/ that is not a picture (siteFiles).
 */
import { contentHash, mediaExtension, slugify } from '$engine/imageTools.js';

/** A PDF held in a draft until it is published: its name (a slug) stands before the data. */
const HELD_PDF_RE = /^data:application\/pdf;name=([a-z0-9-]{1,40});base64,/;

/** A path in media/ as content writes it. */
const MEDIA_PATH_RE = /\/media\/[a-z0-9][a-z0-9._-]*\.([a-z0-9]+)/gi;

/** The picture extensions, which the image fields offer and the File kind leaves out. */
const PICTURE_EXTENSIONS = new Set(['webp', 'svg', 'png', 'jpg', 'jpeg', 'gif', 'avif', 'ico']);

/** The keys a link keeps its address under. */
const ADDRESS_KEYS = new Set(['href', 'url']);

/**
 * A PDF read as a data URL (FileReader), held with its file's name for publishing.
 * @param {string} dataUrl `data:application/pdf;base64,…`
 * @param {string} fileName The file's own name (meny.pdf)
 * @returns {string}
 */
export function heldPdf(dataUrl, fileName) {
  const data = String(dataUrl ?? '').split(',', 2)[1] ?? '';
  return `data:application/pdf;name=${slugify(String(fileName ?? ''), 'file')};base64,${data}`;
}

/** The name a held PDF carries, or null for any other value. */
export function heldName(href) {
  return typeof href === 'string' ? (href.match(HELD_PDF_RE)?.[1] ?? null) : null;
}

/** Whether a link's address is a file: a held PDF or a path in media/. */
export function isFileHref(href) {
  return heldName(href) !== null || (typeof href === 'string' && /^\/media\/[^/\s]+\.[a-z0-9]+$/i.test(href.trim()));
}

/** The words a file is shown by: its file name, a held PDF's with .pdf after it. */
export function fileLabel(href) {
  const held = heldName(href);
  if (held) return `${held}.pdf`;
  const name = String(href ?? '').split('/').pop() ?? '';
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
}

/**
 * The files the site's content uses, for the File kind: every path in media/ that is not a picture, found in any text of the values (addresses, sources, rich text), once each and sorted.
 * @param {...unknown} values Pages, the site, collections
 * @returns {string[]}
 */
export function siteFiles(...values) {
  const found = new Set();
  const visit = (value) => {
    if (typeof value === 'string') {
      for (const match of value.matchAll(MEDIA_PATH_RE)) {
        if (!PICTURE_EXTENSIONS.has(match[1].toLowerCase())) found.add(match[0]);
      }
    } else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === 'object') Object.values(value).forEach(visit);
  };
  values.forEach(visit);
  return [...found].sort((a, b) => fileLabel(a).localeCompare(fileLabel(b)));
}

/**
 * Writes the PDFs held under `href` and `url` anywhere in a value to media/: each becomes a file in the commit, once per path, and the address its path.
 * The value is changed in place.
 * @param {unknown} value A page, a section, a block's props, the site or a collection entry
 * @param {Array<{path: string, content: string, encoding: string}>} files The commit's files, added to
 */
export function publishHeldFiles(value, files) {
  if (Array.isArray(value)) {
    value.forEach((item) => publishHeldFiles(item, files));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    const name = ADDRESS_KEYS.has(key) ? heldName(item) : null;
    if (!name) {
      publishHeldFiles(item, files);
      continue;
    }
    const base64 = item.split(',', 2)[1] ?? '';
    const path = `media/${name}-${contentHash(base64)}.${mediaExtension(item)}`;
    if (!files.some((file) => file.path === path)) files.push({ path, content: base64, encoding: 'base64' });
    value[key] = `/${path}`;
  }
}
