/**
 * A baked picture's file (0.7.29.4): the site icon and a page's share image drawn from their kept original on a canvas, the way picture.js draws a picture in its frame (bakeLayout in picture-edit.js), and written as WebP within the use's budget.
 * The browser and link previews read these as files, so the settings the page draws elsewhere are drawn into them here.
 */
import { pictureStyle, pictureFilter, parseColor, duotoneFilterUrl } from '$engine/picture.js';
import { compressToWebp, PICTURE_BUDGETS } from '$engine/imageTools.js';
import { bakeLayout } from './picture-edit.js';

/** The picture loaded, its own size known. */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('The picture could not be loaded'));
    img.src = src;
  });
}

/**
 * Bakes a picture: its original drawn with its settings at a size, as a WebP data URL within the use's budget.
 * @param {{src: string}} source The kept original: its file and its settings side by side
 * @param {{width?: number, height?: number, size?: (natural: {width: number, height: number}) => {width: number, height: number}, use: keyof typeof PICTURE_BUDGETS, color: (token: string) => string}} options
 *   the size is given, or found from the original's own size (a logo's); color gives a site colour's value for a token (the duotone's and the overlay's colours)
 * @returns {Promise<{dataUrl: string, bytes: number, width: number, height: number}>}
 */
export async function bakePicture(source, { width: givenWidth, height: givenHeight, size, use, color }) {
  const style = pictureStyle(source);
  const img = await loadImage(source.src);
  const { width, height } = size ? size({ width: img.naturalWidth, height: img.naturalHeight }) : { width: givenWidth, height: givenHeight };
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const layout = bakeLayout({ natural: { width: img.naturalWidth, height: img.naturalHeight }, out: { width, height }, style });
  const dark = parseColor(color(style.duotone.dark));
  const light = parseColor(color(style.duotone.light));
  const duotone = style.look === 'duotone' && dark && light ? duotoneFilterUrl(dark, light) : '';
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(layout.angle);
  ctx.scale(layout.sx, layout.sy);
  ctx.filter = pictureFilter(style, { duotone }) || 'none';
  ctx.drawImage(img, layout.rect.x, layout.rect.y, layout.rect.w, layout.rect.h);
  ctx.restore();
  ctx.filter = 'none';
  // The vintage look's vignette: base.css's inset shadow (60 px at 0.45), cast inwards by a band filled just outside the canvas, its blur at the share of 60 px a 1200 px picture has.
  if (style.look === 'vintage') {
    ctx.save();
    ctx.shadowColor = 'rgb(0 0 0 / 0.45)';
    ctx.shadowBlur = Math.max(4, (60 * Math.max(width, height)) / 1200);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.rect(-width, -height, width * 3, height * 3);
    ctx.rect(0, 0, width, height);
    ctx.fill('evenodd');
    ctx.restore();
  }
  if (style.overlay) {
    ctx.globalAlpha = style.overlay.strength;
    ctx.fillStyle = color(style.overlay.color);
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  }
  const png = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!png) throw new Error('The picture could not be baked');
  return compressToWebp(png, Math.max(width, height), { budget: PICTURE_BUDGETS[use] });
}
