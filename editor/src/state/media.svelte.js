/**
 * The uploads: the SVG trim, the image compression, the video reading and the upload report, shared by every file the editor takes in.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { svgToDataUrl, svgViewBox, tightSvgViewBox, compressToWebp, ANIMATED_MAX_BYTES, VIDEO_MAX_BYTES, VIDEO_WARN_BYTES, PICTURE_BUDGETS, slugify } from '$engine/imageTools.js';
import { ta } from '$engine/i18n.js';
import { shellState } from './shell.svelte.js';

/* The background editor itself is section/BackgroundEditor.svelte; what
   stays here is shared by every upload in the editor: the SVG trim, the
   image compression and the video reading. */

/* Measures the subject's extent in an SVG via canvas pixels (the SVG is
   rendered as an IMAGE, not live DOM - safe: no script execution, and
   svgToDataUrl has already rejected script SVGs). Returns the bounding
   box in the SVG's user coordinates. */
async function svgContentBBox(dataUrl, vb) {
  try {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = dataUrl; });
    const W = 320;
    const H = Math.max(1, Math.round((W * vb[3]) / vb[2]));
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, W, H);
    const data = ctx.getImageData(0, 0, W, H).data;
    let minx = W, miny = H, maxx = -1, maxy = -1;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (data[(y * W + x) * 4 + 3] > 8) {
          if (x < minx) minx = x; if (x > maxx) maxx = x;
          if (y < miny) miny = y; if (y > maxy) maxy = y;
        }
      }
    }
    if (maxx < minx) return null;
    const sx = vb[2] / W, sy = vb[3] / H;
    return { x: vb[0] + minx * sx, y: vb[1] + miny * sy, width: (maxx - minx + 1) * sx, height: (maxy - miny + 1) * sy };
  } catch { return null; }
}

/* Uploaded SVG: validate + auto-trim (tighten the viewBox to the
   subject, remove dead space) so Cover/scale/position behave around the
   logo itself. Falls back gracefully to the untrimmed SVG if something
   cannot be measured. */
async function svgAutoTrim(file) {
  const text = await file.text();
  const first = svgToDataUrl(text); // validates (throws on script SVG) + encodes
  const vb = svgViewBox(text);
  if (!vb) return first;
  const bbox = await svgContentBBox(first.dataUrl, vb);
  if (!bbox) return first;
  const trimmed = tightSvgViewBox(text, bbox);
  if (trimmed === text) return first;
  try { return svgToDataUrl(trimmed); } catch { return first; }
}

/** The budget for a use (imageTools' PICTURE_BUDGETS), the image block's for a use not named there. */
const budgetFor = (use) => PICTURE_BUDGETS[use] ?? PICTURE_BUDGETS.image;

/** One picture as it is kept: an SVG trimmed to its subject, anything else compressed into the use's budget. */
async function compressOne(file, use) {
  const isSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name || '');
  if (isSvg) return svgAutoTrim(file);
  return compressToWebp(file, undefined, { budget: budgetFor(use) });
}

/**
 * Asks before pictures that stayed over their use's budget are kept (an animation is kept as it is, and a drawing is not compressed): true keeps them.
 * @param {{bytes: number, animated?: boolean}[]} over
 * @param {string} use
 */
async function keepOverBudget(over, use) {
  const budget = Math.round(budgetFor(use) / 1000);
  const lines = [over.length === 1
    ? ta('pic.budget.one', { kb: Math.round(over[0].bytes / 1000), budget })
    : ta('pic.budget.many', { n: over.length, budget })];
  if (over.some((img) => img.animated)) lines.push(ta('pic.budget.animated'));
  return shellState.askConfirm({ title: ta('pic.budget.title'), lines, okLabel: ta('pic.budget.keep') });
}

/** Thrown when the owner chose not to keep a picture over its budget. */
class PictureLeftOut extends Error {
  constructor() {
    super('The picture was left out');
    this.code = 'pictureLeftOut';
  }
}

/**
 * The shared entry for every picture the editor takes in: SVGs auto-trimmed (viewBox tightened to the subject) so a logo or icon fills its space, anything else compressed to webp into its use's budget, and a picture still over it asked about before it is kept.
 * @param {File} file
 * @param {keyof typeof PICTURE_BUDGETS} [use]
 */
async function compressOrTrim(file, use = 'image') {
  const img = await compressOne(file, use);
  if (img.bytes > budgetFor(use) && !(await keepOverBudget([img], use))) throw new PictureLeftOut();
  return img;
}

/**
 * What to say when a picture was not taken: a too-large animation names its size and the limit, a picture left out over its budget says so, and anything else is the read error (`fallback`, a key).
 * @param {unknown} err
 * @param {string} [fallback]
 */
function imageErrorText(err, fallback = 'status.imageReadError') {
  if (err?.code === 'animatedTooLarge') {
    return ta('status.animatedTooLarge', { mb: (err.bytes / 1_000_000).toFixed(1), max: Math.round(ANIMATED_MAX_BYTES / 1_000_000) });
  }
  if (err?.code === 'pictureLeftOut') return ta('status.pictureLeftOut');
  return ta(fallback);
}

/** A video file as a data URL for the draft, inside the media limits from imageTools (the
    hard cap and the warning); publishing writes it to media/ like the images. */
function readVideoFile(file, formatKey, done) {
  if (!['video/mp4', 'video/webm'].includes(file.type)) {
    shellState.setStatus(ta(formatKey), 'error');
    return;
  }
  if (file.size > VIDEO_MAX_BYTES) {
    shellState.setStatus(ta('status.videoTooLarge', { mb: (file.size / 1_000_000).toFixed(1), max: Math.round(VIDEO_MAX_BYTES / 1_000_000) }), 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    done(String(reader.result ?? ''));
    if (file.size > VIDEO_WARN_BYTES) {
      shellState.setStatus(ta('status.videoLarge', { mb: (file.size / 1_000_000).toFixed(1) }), 'error');
    }
  };
  reader.onerror = () => shellState.setStatus(ta('status.imageReadError'), 'error');
  reader.readAsDataURL(file);
}

/** A fresh seed for a scatter the owner wants to keep: never 0, which means the visit's. Not a secret, so Math.random is enough. */
const newSeed = () => 1 + Math.floor(Math.random() * 1000000);

/**
 * Several pictures in one upload (the galleries): each compressed into the use's budget, one unreadable picture not stopping the rest, and those still over the budget asked about once, together.
 * @param {Iterable<File>} fileList
 * @param {keyof typeof PICTURE_BUDGETS} [use]
 * @returns {Promise<{images: {src: string, alt: string, href: null, style: object}[], failed: number}>}
 */
async function compressMany(fileList, use = 'gallery') {
  const taken = [];
  let failed = 0;
  for (const file of fileList) {
    try {
      taken.push({ img: await compressOne(file, use), file });
    } catch {
      failed += 1;
    }
  }
  const over = taken.filter(({ img }) => img.bytes > budgetFor(use));
  const keep = !over.length || (await keepOverBudget(over.map(({ img }) => img), use));
  const images = taken
    .filter(({ img }) => keep || img.bytes <= budgetFor(use))
    .map(({ img, file }) => ({ src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), href: null, style: {} }));
  return { images, failed };
}

/**
 * One picture for a new image block, as the Blocks panel and the canvas menu both add it: compressed (compressOrTrim), with its alt text made from the file name, and the status line telling of the work or of a picture that could not be read.
 * @param {File} file
 * @returns {Promise<{ src: string, alt: string, width: number, height: number, bytes: number }|null>} null when the picture could not be read
 */
async function imageForBlock(file) {
  shellState.setStatus(ta('status.compressingImage'));
  try {
    const img = await compressOrTrim(file, 'image');
    return { src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), width: img.width, height: img.height, bytes: img.bytes };
  } catch (err) {
    shellState.setStatus(imageErrorText(err), 'error');
    return null;
  }
}

/** The status line once several pictures are in: the ones that could not be read, nothing added, or clear. */
function reportUpload(ok, failed) {
  if (failed) shellState.setStatus(ta('status.imagesReadFailed', { n: failed }), 'error');
  else shellState.setStatus(ok ? '' : ta('status.noImagesAdded'));
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const mediaState = {
  svgContentBBox,
  svgAutoTrim,
  budgetFor,
  compressOrTrim,
  imageErrorText,
  readVideoFile,
  newSeed,
  compressMany,
  imageForBlock,
  reportUpload,
};
