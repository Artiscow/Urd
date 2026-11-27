/**
 * The image editor's rules: what each kind of picture keeps and where, the crop window, a pointer on the turned picture, a handle's zoom, and the resets.
 */
import { pictureStyle, PICTURE_BOUNDS, PICTURE_LOOKS, DUOTONE_DEFAULT, straightenScale } from '$engine/picture.js';
import { aspectRatio } from '$engine/push-model.js';
import { phoneCells, MOBILE_ROW } from '$engine/migrate.js';

/** The settings the editor writes beside the picture, in the order its sections show them. */
export const STYLE_KEYS = ['x', 'y', 'zoom', 'rotate', 'flipX', 'flipY', 'straighten', 'look', 'duotone', 'brightness', 'contrast', 'saturate', 'blur', 'overlay'];

/** Every setting at none: the picture as it is, centred, not zoomed, turned, finished, adjusted or covered. */
export const NEUTRAL = Object.freeze({ x: 0.5, y: 0.5, zoom: 1, rotate: 0, flipX: false, flipY: false, straighten: 0, look: 'natural', duotone: DUOTONE_DEFAULT, brightness: 1, contrast: 1, saturate: 1, blur: 0, overlay: null });

/** The settings each of the column's sections owns, for its own Reset; the framing (the focus point and the zoom) is reset with «Reset all». */
export const SECTIONS = {
  look: ['look', 'duotone'],
  turn: ['rotate', 'flipX', 'flipY', 'straighten'],
  adjust: ['brightness', 'contrast', 'saturate', 'blur'],
  overlay: ['overlay'],
};

/** The shapes the image block offers: free (the frame as dragged), the picture's own, and the common ratios. */
export const IMAGE_RATIOS = ['free', 'original', '1:1', '4:3', '3:2', '16:9', '9:16', '4:5'];

/** The looks drawn by a filter alone: a background layer has no frame for the vintage vignette or the duotone's colours. */
export const FILTER_LOOKS = PICTURE_LOOKS.filter((look) => look !== 'vintage' && look !== 'duotone');

/** The shapes a logo is cut to: its own, and the common ratios. */
export const LOGO_RATIOS = ['original', '1:1', '4:3', '3:2', '16:9', '9:16', '4:5'];

/** The longest side a baked logo has: sharp at twice the largest height the nav and the footer draw a logo at. */
export const LOGO_LONGEST = 800;

/** The shapes a collection or product picture has in its card, as the entry's `imageStyle.shape`. */
export const ENTRY_SHAPES = ['auto', 'wide', 'square', 'portrait', 'circle'];

/** The frame ratio each entry shape gives (collection.js's SHAPE_ASPECTS as numbers). */
const ENTRY_SHAPE_RATIO = { wide: 16 / 9, square: 1, portrait: 3 / 4, circle: 1 };

/**
 * What each kind of picture can do in the editor: its shapes, fit, corners, overlay and description, and whether it is baked, framed, handed back or frameless.
 */
export const KIND_TOOLS = {
  image: { ratios: IMAGE_RATIOS, fit: true, corners: true, overlay: true, alt: true },
  gallery: { ratios: null, fit: true, corners: false, overlay: true, alt: true },
  entry: { ratios: ENTRY_SHAPES, fit: true, corners: true, overlay: true, alt: true },
  cover: { ratios: null, fit: false, corners: false, overlay: true, alt: false },
  icon: { ratios: null, fit: false, corners: false, overlay: true, alt: false, bake: { width: 128, height: 128 } },
  share: { ratios: null, fit: false, corners: false, overlay: true, alt: false, bake: { width: 1200, height: 630 } },
  portrait: { ratios: null, fit: false, corners: false, overlay: true, alt: false, round: true, frame: { width: 48, height: 48 } },
  glyph: { ratios: null, fit: false, corners: false, overlay: true, alt: false, bake: { width: 256, height: 256 }, handed: true },
  logo: { ratios: LOGO_RATIOS, fit: false, corners: false, overlay: true, alt: false, bake: { longest: LOGO_LONGEST } },
  layer: { ratios: null, fit: false, corners: false, overlay: false, alt: false, frameless: true, turn: false, looks: FILTER_LOOKS, budget: 'background', removable: false },
  slide: { ratios: null, fit: false, corners: false, overlay: false, alt: false, turn: false, look: false, adjust: false, zoom: false, budget: 'background', removable: false },
};

/**
 * A colour from the picker as a picture keeps it: a theme colour's name, or a hex colour without its transparency; null for anything else.
 * @param {unknown} value
 * @returns {string|null}
 */
export function pickedColour(value) {
  const v = String(value ?? '').trim().toLowerCase();
  if (/^[a-z][a-z0-9-]*$/.test(v)) return v;
  const hex = /^#[0-9a-f]{6}/.exec(v);
  return hex ? hex[0] : null;
}

/** The settings an image background layer takes from the editor, beside its own placement: its look and adjustments (the blur is the layer's own). */
export const LAYER_KEYS = ['look', 'brightness', 'contrast', 'saturate', 'blur'];

/** Whether a kind of picture is baked into a file of its own (the site icon, a share image). */
export const isBaked = (kind) => Boolean(KIND_TOOLS[kind]?.bake);

/**
 * A picture as the editor holds it, read from where its kind keeps it: block props, a gallery picture, an entry, the video's cover, or a baked picture's original.
 * @param {'image'|'gallery'|'entry'|'cover'|'icon'|'share'} kind
 * @param {object} source The block's props (image, cover), the gallery picture (gallery), the entry (entry) or the kept original (icon, share)
 * @returns {{src: string, alt: string, fit: 'cover'|'contain', ratio: string, radius: string, style: object}}
 */
export function readPicture(kind, source) {
  const s = source ?? {};
  const raw = kind === 'image' || kind === 'layer' || kind === 'slide' || isBaked(kind) ? s : kind === 'gallery' ? (s.style ?? {}) : kind === 'entry' || kind === 'portrait' ? (s.imageStyle ?? {}) : (s.coverStyle ?? {});
  const style = pictureStyle(raw);
  return {
    src: String((kind === 'entry' || kind === 'portrait' ? s.image : kind === 'cover' ? s.poster : s.src) ?? ''),
    alt: String((kind === 'entry' ? s.imageAlt : s.alt) ?? ''),
    fit: raw.fit === 'contain' ? 'contain' : 'cover',
    ratio: kind === 'image' ? (IMAGE_RATIOS.includes(s.aspect) ? s.aspect : 'free') : kind === 'entry' ? (ENTRY_SHAPES.includes(raw.shape) ? raw.shape : 'auto') : kind === 'logo' ? (LOGO_RATIOS.includes(s.ratio) ? s.ratio : 'original') : '',
    radius: ['sm', 'md'].includes(kind === 'entry' ? raw.radius : s.radius) ? (kind === 'entry' ? raw.radius : s.radius) : '',
    style,
  };
}

/**
 * The settings as they are stored: each one at none left out, and nothing outside the schema's values written (never a `null`).
 * @param {object} style
 * @returns {object}
 */
export function storedStyle(style) {
  const out = {};
  for (const key of STYLE_KEYS) {
    const value = style?.[key];
    if (key === 'overlay') {
      if (value && value.strength > 0) out.overlay = { color: value.color, strength: value.strength };
    } else if (key === 'duotone') {
      // The duotone's colours belong to the duotone look, and the default pair is left out.
      if (style.look === 'duotone' && value && (value.dark !== DUOTONE_DEFAULT.dark || value.light !== DUOTONE_DEFAULT.light)) out.duotone = { dark: value.dark, light: value.light };
    } else if (value != null && value !== NEUTRAL[key]) out[key] = value;
  }
  return out;
}

/**
 * Writes the editor's picture back in place where its kind keeps it: the settings merged in, those at none taken out, and the fit, shape, corners and alt text.
 * @param {'image'|'gallery'|'entry'|'cover'} kind
 * @param {object} target The block's props (image, cover), the gallery picture or the entry, changed in place
 * @param {ReturnType<typeof readPicture>} pic
 */
export function writePicture(kind, target, pic) {
  const style = storedStyle(pic.style);
  const merge = (into) => {
    for (const key of STYLE_KEYS) delete into[key];
    Object.assign(into, style);
  };
  if (kind === 'image') {
    merge(target);
    target.src = pic.src;
    target.alt = pic.alt;
    target.fit = pic.fit;
    if (pic.radius) target.radius = pic.radius;
    else target.radius = null;
    if (pic.ratio && pic.ratio !== 'free') target.aspect = pic.ratio;
    else delete target.aspect;
    return;
  }
  if (kind === 'layer') {
    target.src = pic.src;
    for (const key of LAYER_KEYS) {
      if (key in style) target[key] = style[key];
      else delete target[key];
    }
    return;
  }
  if (kind === 'slide') {
    target.src = pic.src;
    target.x = pic.style.x;
    target.y = pic.style.y;
    return;
  }
  if (kind === 'portrait') {
    target.image = pic.src;
    if (Object.keys(style).length) target.imageStyle = style;
    else delete target.imageStyle;
    return;
  }
  if (kind === 'cover') {
    target.poster = pic.src;
    const cover = { ...style };
    if (Object.keys(cover).length) target.coverStyle = cover;
    else delete target.coverStyle;
    return;
  }
  if (kind === 'gallery') {
    target.src = pic.src;
    target.alt = pic.alt;
    const next = { ...(target.style ?? {}) };
    merge(next);
    if (pic.fit === 'contain') next.fit = 'contain';
    else delete next.fit;
    target.style = next;
    return;
  }
  // A collection or product entry: the picture, its description and its imageStyle.
  if (pic.src) target.image = pic.src;
  else delete target.image;
  if (pic.alt) target.imageAlt = pic.alt;
  else delete target.imageAlt;
  const next = { ...(target.imageStyle ?? {}) };
  merge(next);
  for (const key of ['fit', 'shape', 'radius']) delete next[key];
  if (pic.fit === 'contain') next.fit = 'contain';
  if (pic.ratio && pic.ratio !== 'auto') next.shape = pic.ratio;
  if (pic.radius && pic.ratio !== 'circle') next.radius = pic.radius;
  if (Object.keys(next).length) target.imageStyle = next;
  else delete target.imageStyle;
}

/**
 * The frame's width over its height for a shape, or null where the frame as dragged decides (free, auto) or the picture's own size is not known (original).
 * @param {string} ratio An image block's ratio or an entry's shape
 * @param {number} [natural] The picture's own width over its height
 * @returns {number|null}
 */
export function ratioValue(ratio, natural) {
  if (ratio === 'original') return natural > 0 ? natural : null;
  if (ENTRY_SHAPE_RATIO[ratio]) return ENTRY_SHAPE_RATIO[ratio];
  return aspectRatio(ratio);
}

/**
 * The crop window: the part of the picture its frame shows, in fractions of the picture before the turn, as picture.js draws it.
 * @param {{pictureRatio: number, frameRatio: number, x: number, y: number, zoom: number, fit?: string, quarter?: boolean}} p
 * @returns {{left: number, top: number, width: number, height: number}}
 */
export function cropWindow({ pictureRatio, frameRatio, x, y, zoom, fit = 'cover', quarter = false }) {
  const frame = quarter ? 1 / frameRatio : frameRatio;
  let w = 1;
  let h = 1;
  if (fit !== 'contain' && pictureRatio > 0 && frame > 0) {
    if (pictureRatio > frame) w = frame / pictureRatio;
    else h = pictureRatio / frame;
  }
  const z = Math.max(1, zoom || 1);
  w /= z;
  h /= z;
  return { left: x * (1 - w), top: y * (1 - h), width: w, height: h };
}

/**
 * A pointer over the stage's turned picture as a point on the picture (0..1 on each axis), taken back through the turn and mirrors around its centre.
 * @param {{clientX: number, clientY: number, centerX: number, centerY: number, width: number, height: number, angle: number, flipX?: boolean, flipY?: boolean}} p
 *   width and height are the picture box's own size before the turn; angle is in degrees
 * @returns {{x: number, y: number}}
 */
export function pointOnPicture({ clientX, clientY, centerX, centerY, width, height, angle, flipX = false, flipY = false }) {
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  const r = (-angle * Math.PI) / 180;
  let ux = dx * Math.cos(r) - dy * Math.sin(r);
  let uy = dx * Math.sin(r) + dy * Math.cos(r);
  if (flipX) ux = -ux;
  if (flipY) uy = -uy;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  return { x: clamp(ux / width + 0.5), y: clamp(uy / height + 0.5) };
}

/** The crop window's least size: its longer side at what the largest zoom shows, each side a little of the picture at least. */
const LEAST_SHARE = 1 / PICTURE_BOUNDS.zoom.max;
const LEAST_SIDE = 0.02;

const clamped = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const fourth = (v) => Math.round(v * 10000) / 10000;

/**
 * The crop window with one of its eight handles dragged to a point: the handle's edges follow, the opposite ones hold, and a kept shape (`keep`) holds.
 * @param {{win: {left: number, top: number, width: number, height: number}, edge: {x: -1|0|1, y: -1|0|1}, point: {x: number, y: number}, keep?: number|null}} p
 *   win is the window where the drag began; edge the handle (-1 the left or top edge, 1 the right or bottom, 0 neither); point the pointer on the picture (0..1)
 * @returns {{left: number, top: number, width: number, height: number}}
 */
export function croppedWindow({ win, edge, point, keep = null }) {
  const right = win.left + win.width;
  const bottom = win.top + win.height;
  let w = win.width;
  let h = win.height;
  if (edge.x < 0) w = right - clamped(point.x, 0, right);
  if (edge.x > 0) w = clamped(point.x, win.left, 1) - win.left;
  if (edge.y < 0) h = bottom - clamped(point.y, 0, bottom);
  if (edge.y > 0) h = clamped(point.y, win.top, 1) - win.top;
  if (keep > 0) {
    if (edge.x && edge.y) {
      if (w / keep >= h) h = w / keep;
      else w = h * keep;
    } else if (edge.x) h = w / keep;
    else w = h * keep;
    const fit = Math.min(1, 1 / w, 1 / h);
    w *= fit;
    h *= fit;
  } else {
    w = Math.max(LEAST_SIDE, w);
    h = Math.max(LEAST_SIDE, h);
  }
  const longer = Math.max(w, h);
  if (longer < LEAST_SHARE) {
    w *= LEAST_SHARE / longer;
    h *= LEAST_SHARE / longer;
  }
  // The handle's opposite edge holds; an axis the handle does not move keeps the window's middle.
  const left = edge.x < 0 ? right - w : edge.x > 0 ? win.left : win.left + (win.width - w) / 2;
  const top = edge.y < 0 ? bottom - h : edge.y > 0 ? win.top : win.top + (win.height - h) / 2;
  return { left: fourth(clamped(left, 0, 1 - w)), top: fourth(clamped(top, 0, 1 - h)), width: fourth(w), height: fourth(h) };
}

/**
 * The zoom and focus point that draw a crop window: a zoom of one over its longer side, and a point by where the window stands in the room the picture leaves.
 * @param {{left: number, top: number, width: number, height: number}} win
 * @param {{x: number, y: number}} point The focus point now
 * @returns {{zoom: number, x: number, y: number}}
 */
export function styleForWindow(win, point) {
  const along = (start, size, keep) => (1 - size > 0.0001 ? Math.round(clamped(start / (1 - size), 0, 1) * 1000) / 1000 : keep);
  return {
    zoom: fourth(clamped(1 / Math.max(win.width, win.height), 1, PICTURE_BOUNDS.zoom.max)),
    x: along(win.left, win.width, point.x),
    y: along(win.top, win.height, point.y),
  };
}

/**
 * A window on the picture as the page shows it: mirrored, then turned clockwise by a quarter, a half or three quarters, as the stage draws the picture.
 * @param {{left: number, top: number, width: number, height: number}} win The window as fractions of the picture's own axes
 * @param {{rotate?: number, flipX?: boolean, flipY?: boolean}} turn
 * @returns {{left: number, top: number, width: number, height: number}}
 */
export function windowAsShown(win, { rotate = 0, flipX = false, flipY = false } = {}) {
  const left = flipX ? 1 - win.left - win.width : win.left;
  const top = flipY ? 1 - win.top - win.height : win.top;
  const { width, height } = win;
  if (rotate === 90) return { left: 1 - top - height, top: left, width: height, height: width };
  if (rotate === 180) return { left: 1 - left - width, top: 1 - top - height, width, height };
  if (rotate === 270) return { left: top, top: 1 - left - width, width: height, height: width };
  return { left, top, width, height };
}

/**
 * An image block's frame after a free crop: the picture keeps its size and place, and the frame follows the window's edges, within the section's width.
 * @param {{x: number, y: number, w: number, h: number}} frame The frame where the crop began (x and w in per cent of the section, y and h in px)
 * @param {{left: number, top: number, width: number, height: number}} from The window where the crop began, as the page shows it (windowAsShown)
 * @param {{left: number, top: number, width: number, height: number}} to The window now, as the page shows it
 * @returns {{x: number, y: number, w: number, h: number}}
 */
export function frameForCrop(frame, from, to) {
  const r2 = (v) => Math.round(v * 100) / 100;
  let w = frame.w * (to.width / from.width);
  let h = frame.h * (to.height / from.height);
  if (w > 100) {
    h *= 100 / w;
    w = 100;
  }
  w = Math.max(1, r2(w));
  const x = clamped(r2(frame.x + ((to.left - from.left) / from.width) * frame.w), 0, r2(100 - w));
  const y = Math.max(0, Math.round(frame.y + ((to.top - from.top) / from.height) * frame.h));
  return { ...frame, x, y, w, h: Math.max(1, r2(h)) };
}

/**
 * An image block's phone placement after a crop in the phone view, at the crop's shape: rows when pinned, else a height, unless its cells keep the shape.
 * @param {object|null} placement The block's `frames.mobile` as the editor opened
 * @param {number} width The block's width on the phone in px, as drawn
 * @param {number} ratio The cropped frame's width over its height
 * @returns {object|null}
 */
export function phoneForCrop(placement, width, ratio) {
  if (!(width > 0 && ratio > 0)) return placement;
  const height = width / ratio;
  if (Number.isFinite(placement?.row)) return { ...placement, rows: Math.max(1, Math.round(height / MOBILE_ROW)) };
  if (phoneCells(placement) && !(placement?.height > 0)) return placement;
  return { ...(placement ?? {}), height: Math.max(MOBILE_ROW, Math.round(height)) };
}

/**
 * A quarter turn to the left or the right.
 * @param {number} rotate 0, 90, 180 or 270
 * @param {-1|1} way -1 left, 1 right
 * @returns {0|90|180|270}
 */
export function turned(rotate, way) {
  return /** @type {0|90|180|270} */ (((rotate + way * 90) % 360 + 360) % 360);
}

/**
 * The settings with one section, or all of them, taken back to none.
 * @param {object} style
 * @param {keyof typeof SECTIONS|'all'} section «all» takes the framing back too
 * @returns {object}
 */
export function resetStyle(style, section) {
  if (section === 'all') return { ...NEUTRAL };
  const next = { ...style };
  for (const key of SECTIONS[section] ?? []) next[key] = NEUTRAL[key];
  return next;
}

/**
 * Whether a section, or the whole picture, holds a setting other than none: its Reset is offered only then.
 * @param {object} style
 * @param {keyof typeof SECTIONS|'all'} section
 * @returns {boolean}
 */
export function sectionChanged(style, section) {
  const keys = section === 'all' ? STYLE_KEYS : SECTIONS[section] ?? [];
  return keys.some((key) => {
    if (key === 'overlay') return Boolean(style?.overlay);
    if (key === 'duotone') return Boolean(style?.duotone) && (style.duotone.dark !== DUOTONE_DEFAULT.dark || style.duotone.light !== DUOTONE_DEFAULT.light);
    return style?.[key] !== NEUTRAL[key];
  });
}

/**
 * The frame moved over the picture: the crop window shifted by a distance and held inside the picture, as a focus point; a filled axis keeps its point.
 * @param {{left: number, top: number, width: number, height: number}} win The window where the move began
 * @param {number} dx
 * @param {number} dy
 * @param {{x: number, y: number}} point The focus point where the move began
 * @returns {{x: number, y: number}}
 */
export function movedFrame(win, dx, dy, point) {
  const along = (start, size, delta, keep) => {
    const room = 1 - size;
    if (room <= 0.0001) return keep;
    return Math.round((Math.min(room, Math.max(0, start + delta)) / room) * 1000) / 1000;
  };
  return { x: along(win.left, win.width, dx, point.x), y: along(win.top, win.height, dy, point.y) };
}

/** How far past its own size a picture may be drawn and still count as sharp: a few per cent do not show. */
const SHARP_SCALE = 1.05;

/**
 * How large the page draws a picture's own pixels in its frame, as picture.js does: above 1 the picture is stretched past its own size and shows soft.
 * @param {{natural: {width: number, height: number}, frame: {width: number, height: number}, zoom?: number, fit?: string, quarter?: boolean, grow?: number}} p
 *   natural is the picture's own size in pixels, frame the frame's on the page; grow is the straightening's scale (picture.js straightenScale)
 * @returns {{scale: number, sharp: boolean, drawnWidth: number}|null} null where a size is not known
 */
export function sharpness({ natural, frame, zoom = 1, fit = 'cover', quarter = false, grow = 1 }) {
  if (!(natural?.width > 0 && natural?.height > 0 && frame?.width > 0 && frame?.height > 0)) return null;
  const across = quarter ? natural.height : natural.width;
  const down = quarter ? natural.width : natural.height;
  const fill = fit === 'contain' ? Math.min(frame.width / across, frame.height / down) : Math.max(frame.width / across, frame.height / down);
  const scale = fill * Math.max(1, zoom || 1) * Math.max(1, grow || 1);
  return { scale, sharp: scale <= SHARP_SCALE, drawnWidth: Math.round(natural.width * scale) };
}


/**
 * A picture's weight in bytes when it is held in the draft as a data URL, from its base64 length; null for a picture at a path (its size is read from the file).
 * @param {string} src
 * @returns {number|null}
 */
export function dataUrlBytes(src) {
  const m = /^data:[^,]*;base64,([A-Za-z0-9+/]*)(={0,2})$/.exec(String(src ?? ''));
  if (!m) return null;
  return Math.floor(((m[1].length + m[2].length) * 3) / 4) - m[2].length;
}

/** The pictures that keep their own drawing, where size and sharpness say nothing: a drawing (SVG) is sharp at every size. */
export const isDrawing = (src) => /^data:image\/svg\+xml[;,]/i.test(String(src ?? '')) || /\.svg(?:[?#]|$)/i.test(String(src ?? ''));

/** The settings «Apply to all» gives every picture in a gallery: the look, the adjustments and the overlay. */
export const SHARED_KEYS = [...SECTIONS.look, ...SECTIONS.adjust, ...SECTIONS.overlay];

/**
 * A gallery picture's stored style with the open picture's look, adjustments and overlay, its own framing and turn kept.
 * @param {object|undefined} stored The gallery picture's `style` as stored
 * @param {object} from The open picture's settings (readPicture's `style`)
 * @returns {object}
 */
export function withShared(stored, from) {
  const own = pictureStyle(stored ?? {});
  const next = { ...own };
  for (const key of SHARED_KEYS) next[key] = from[key];
  const out = { ...(stored ?? {}) };
  for (const key of STYLE_KEYS) delete out[key];
  return { ...out, ...storedStyle(next) };
}

/**
 * A baked picture's kept original as it is stored beside the baked file: the original's file and the settings it is baked with, those at none left out.
 * @param {ReturnType<typeof readPicture>} pic
 * @returns {object}
 */
export function sourceOf(pic) {
  const ratio = pic.ratio && pic.ratio !== 'original' && LOGO_RATIOS.includes(pic.ratio) ? { ratio: pic.ratio } : {};
  return { src: pic.src, ...storedStyle(pic.style), ...ratio };
}

/**
 * A logo's baked size in pixels: the part its shape and zoom show of the original, at most `longest` on its longest side; a drawing (SVG) is drawn at `longest`.
 * @param {{natural: {width: number, height: number}, ratio: string, zoom?: number, quarter?: boolean, drawing?: boolean, longest?: number}} p
 * @returns {{width: number, height: number}}
 */
export function logoBakeSize({ natural, ratio, zoom = 1, quarter = false, drawing = false, longest = LOGO_LONGEST }) {
  const nw = Math.max(1, (quarter ? natural.height : natural.width) || 1);
  const nh = Math.max(1, (quarter ? natural.width : natural.height) || 1);
  const r = ratioValue(ratio, nw / nh) ?? nw / nh;
  let w = nw / nh > r ? nh * r : nw;
  let h = w / r;
  w /= Math.max(1, zoom);
  h /= Math.max(1, zoom);
  const scale = drawing ? longest / Math.max(w, h) : Math.min(1, longest / Math.max(w, h));
  return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
}

/**
 * Where a baked picture's original is drawn on its canvas, as picture.js draws it: the turn, and the picture's rectangle before it, about the canvas's centre.
 * @param {{natural: {width: number, height: number}, out: {width: number, height: number}, style: object, fit?: string}} p
 * @returns {{angle: number, sx: number, sy: number, rect: {x: number, y: number, w: number, h: number}}}
 */
export function bakeLayout({ natural, out, style, fit = 'cover' }) {
  const s = pictureStyle(style);
  const quarter = s.rotate === 90 || s.rotate === 270;
  const bw = quarter ? out.height : out.width;
  const bh = quarter ? out.width : out.height;
  const nw = natural.width > 0 ? natural.width : bw;
  const nh = natural.height > 0 ? natural.height : bh;
  const fill = fit === 'contain' ? Math.min(bw / nw, bh / nh) : Math.max(bw / nw, bh / nh);
  const dw = nw * fill;
  const dh = nh * fill;
  // object-position: the leftover room shared by the focus point; the zoom scales about the same point.
  const ox = (bw - dw) * s.x;
  const oy = (bh - dh) * s.y;
  const fx = s.x * bw;
  const fy = s.y * bh;
  const grow = straightenScale(s.straighten);
  return {
    angle: ((s.rotate + s.straighten) * Math.PI) / 180,
    sx: (s.flipX ? -1 : 1) * grow,
    sy: (s.flipY ? -1 : 1) * grow,
    rect: { x: fx + (ox - fx) * s.zoom - bw / 2, y: fy + (oy - fy) * s.zoom - bh / 2, w: dw * s.zoom, h: dh * s.zoom },
  };
}
