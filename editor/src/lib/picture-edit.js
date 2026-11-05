/**
 * The image editor's rules (0.7.29.2), pure so they are tested: what each kind of picture keeps and where, the crop window the stage draws over the whole picture, a pointer on the turned picture as a point on the picture itself, the zoom a corner handle gives, and the resets.
 * The drawing on the page is the engine's picture.js; the dialog is PictureEditor.svelte, and the writes go through state/picture-editor.svelte.js.
 */
import { pictureStyle, PICTURE_BOUNDS, DUOTONE_DEFAULT } from '$engine/picture.js';
import { aspectRatio } from '$engine/push-model.js';

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

/** The shapes a collection or product picture has in its card, as the entry's `imageStyle.shape`. */
export const ENTRY_SHAPES = ['auto', 'wide', 'square', 'portrait', 'circle'];

/** The frame ratio each entry shape gives (collection.js's SHAPE_ASPECTS as numbers). */
const ENTRY_SHAPE_RATIO = { wide: 16 / 9, square: 1, portrait: 3 / 4, circle: 1 };

/**
 * What each kind of picture can do in the editor: its shapes, the fit, the corners, the overlay and the description.
 * The video's cover has the video's own shape and no description (it is decoration on a button); a gallery picture takes the gallery's shape and corners.
 */
export const KIND_TOOLS = {
  image: { ratios: IMAGE_RATIOS, fit: true, corners: true, overlay: true, alt: true },
  gallery: { ratios: null, fit: true, corners: false, overlay: true, alt: true },
  entry: { ratios: ENTRY_SHAPES, fit: true, corners: true, overlay: true, alt: true },
  cover: { ratios: null, fit: false, corners: false, overlay: false, alt: false },
};

/**
 * A picture as the editor holds it, read from where its kind keeps it: the image block's props, a gallery picture, a collection entry or the video's cover.
 * @param {'image'|'gallery'|'entry'|'cover'} kind
 * @param {object} source The block's props (image, cover), the gallery picture (gallery) or the entry (entry)
 * @returns {{src: string, alt: string, fit: 'cover'|'contain', ratio: string, radius: string, style: object}}
 */
export function readPicture(kind, source) {
  const s = source ?? {};
  const raw = kind === 'image' ? s : kind === 'gallery' ? (s.style ?? {}) : kind === 'entry' ? (s.imageStyle ?? {}) : (s.coverStyle ?? {});
  const style = pictureStyle(raw);
  return {
    src: String((kind === 'entry' ? s.image : kind === 'cover' ? s.poster : s.src) ?? ''),
    alt: String((kind === 'entry' ? s.imageAlt : s.alt) ?? ''),
    fit: raw.fit === 'contain' ? 'contain' : 'cover',
    ratio: kind === 'image' ? (IMAGE_RATIOS.includes(s.aspect) ? s.aspect : 'free') : kind === 'entry' ? (ENTRY_SHAPES.includes(raw.shape) ? raw.shape : 'auto') : '',
    radius: ['sm', 'md'].includes(kind === 'entry' ? raw.radius : s.radius) ? (kind === 'entry' ? raw.radius : s.radius) : '',
    style,
  };
}

/**
 * The settings as they are stored: each one at none left out, so a picture never edited stays as lean as it was, and nothing outside the schema's values is written (a `null` never is).
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
 * Writes the editor's picture back where its kind keeps it, in place: the settings merged into what is stored, those at none taken out, and the fit, the shape, the corners and the description beside them.
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
 * The frame's width over its height for a shape, or null where the shape leaves it to the frame as dragged (free, auto) or the picture's own size is not known yet (original).
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
 * The part of the picture its frame shows, as fractions of the picture (in its own axes, before the turn): what the stage draws as the crop window.
 * The frame shows the picture covered (or whole, for contain), placed by the focus point and zoomed towards it, the way picture.js draws it; a quarter turn lays the frame across the picture.
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
 * A pointer over the stage's turned picture as a point on the picture itself (0..1 on each axis, clamped): the pointer taken back through the turn's rotation and mirrors around the picture's centre.
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

/**
 * The zoom a corner handle gives when it is dragged to a point, the opposite corner held: the crop window keeps its shape and spans from that corner to the point.
 * @param {{anchorX: number, anchorY: number, pointX: number, pointY: number, full: {width: number, height: number}}} p
 *   the corner held and the pointer as fractions of the picture; full is the window at zoom 1
 * @returns {number}
 */
export function zoomFromCorner({ anchorX, anchorY, pointX, pointY, full }) {
  const across = Math.abs(pointX - anchorX) / full.width;
  const down = Math.abs(pointY - anchorY) / full.height;
  const share = Math.max(across, down, 1 / PICTURE_BOUNDS.zoom.max);
  return Math.round(Math.min(PICTURE_BOUNDS.zoom.max, Math.max(1, 1 / share)) * 100) / 100;
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
 * The frame moved over the picture: the crop window shifted by a distance (fractions of the picture), held inside the picture, as the focus point the page draws it by.
 * The focus point is where the frame stands: an axis the frame fills from edge to edge keeps its point.
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

/**
 * The frame centred on a point of the picture, as near as it can stand: what a click beside the frame does.
 * @param {{left: number, top: number, width: number, height: number}} win
 * @param {{x: number, y: number}} at The point on the picture (0..1)
 * @param {{x: number, y: number}} point The focus point now
 * @returns {{x: number, y: number}}
 */
export function frameAt(win, at, point) {
  return movedFrame(win, at.x - (win.left + win.width / 2), at.y - (win.top + win.height / 2), point);
}

/** How far past its own size a picture may be drawn and still count as sharp: a few per cent do not show. */
const SHARP_SCALE = 1.05;

/**
 * How large the page draws a picture's own pixels in its frame: above 1 the picture is stretched past its own size and shows soft.
 * The frame shows the picture covered (or whole, for contain), zoomed and grown by its straightening, the way picture.js draws it; a quarter turn lays the picture across its frame.
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
