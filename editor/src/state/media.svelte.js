/**
 * The uploads: the SVG trim, the image compression, the video reading and the upload report, shared by every file the editor takes in.
 * Split out of App.svelte in 0.7.26.5; the other parts reach it through the handle below, and the shell merges every module's handle into the editor handle.
 */
import { svgToDataUrl, svgViewBox, tightSvgViewBox, compressToWebp, ANIMATED_WARN_BYTES, ANIMATED_MAX_BYTES, VIDEO_MAX_BYTES, VIDEO_WARN_BYTES, WARN_BYTES, slugify } from '$engine/imageTools.js';
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

/* SVGs are auto-trimmed (viewBox tightened to the subject); raster is
   compressed to webp. Shared entry for all image uploads, so an SVG
   logo/icon fills its space. */
async function compressOrTrim(file) {
  const isSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name || '');
  if (isSvg) return svgAutoTrim(file);
  const img = await compressToWebp(file);
  // An animation is kept as the file it is, so its size is the owner's to know about.
  if (img.animated && img.bytes > ANIMATED_WARN_BYTES) {
    shellState.setStatus(ta('status.animatedLarge', { mb: (img.bytes / 1_000_000).toFixed(1) }), 'error');
  }
  return img;
}

/** What to say when an image could not be taken: a too-large animation names its size and the limit. */
function imageErrorText(err) {
  if (err?.code === 'animatedTooLarge') {
    return ta('status.animatedTooLarge', { mb: (err.bytes / 1_000_000).toFixed(1), max: Math.round(ANIMATED_MAX_BYTES / 1_000_000) });
  }
  return ta('status.imageReadError');
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

/** A fresh seed for a scatter the owner wants to keep: never 0, which means the visit's. */
const newSeed = () => 1 + (crypto.getRandomValues(new Uint32Array(1))[0] % 1000000);

/** Multiple images in one upload (the galleries): compress all;
 *  one unreadable image does not stop the rest of the batch. */
async function compressMany(fileList) {
  const images = [];
  let failed = 0;
  let big = 0;
  for (const file of fileList) {
    try {
      const img = await compressOrTrim(file);
      if (img.bytes > WARN_BYTES) big += 1;
      images.push({ src: img.dataUrl, alt: slugify(file.name).replaceAll('-', ' '), href: null, style: {} });
    } catch {
      failed += 1;
    }
  }
  return { images, failed, big };
}

function reportUpload(ok, failed, big) {
  if (failed) shellState.setStatus(ta('status.imagesReadFailed', { n: failed }), 'error');
  else if (big) shellState.setStatus(ta('status.imagesLarge', { n: big }), 'error');
  else shellState.setStatus(ok ? '' : ta('status.noImagesAdded'));
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const mediaState = {
  svgContentBBox,
  svgAutoTrim,
  compressOrTrim,
  imageErrorText,
  readVideoFile,
  newSeed,
  compressMany,
  reportUpload,
};
