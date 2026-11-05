/**
 * The image editor's state (0.7.29.2): which picture is open, the picture as the editor holds it (lib/picture-edit.js readPicture), and its writes.
 * Every change is written at once through the place the picture lives (the image block's or video's props, a gallery picture, a collection entry), so the canvas behind the dialog shows it live, all under one history key per opening: the whole edit is one undo step in the admin.
 * The dialog keeps its own undo and redo for the changes made while it is open; Cancel and Escape write the picture back as it was opened.
 */
import { ta } from '$engine/i18n.js';
import { compressToWebp } from '$engine/imageTools.js';
import { readPicture, writePicture, ratioValue, resetStyle, withShared, KIND_TOOLS } from '../lib/picture-edit.js';
import { pageState } from './page.svelte.js';
import { collectionsState } from './collections.svelte.js';
import { mediaState } from './media.svelte.js';
import { shellState } from './shell.svelte.js';

/** The picture that is open: its kind and where it lives, and the frame's shape and size as the preview drew it (0 where they are not known). */
let target = $state(null);

/** The picture as the editor holds it. */
let pic = $state(null);

/** The picture as it was opened, for Cancel and Compare. */
let opened = $state(null);

/** The picture's own width over its height, once the dialog has loaded it. */
let natural = $state(0);

/** The dialog's own steps back and forward while it is open: each the picture as it stood, and for a gallery picture every picture's settings beside it («Apply to all» changes them). */
let undoSteps = $state([]);
let redoSteps = $state([]);

/** The dialog's state as it was opened, for Cancel. */
let openedStep = null;

/** Compare held: the stage shows the picture as it was opened. */
let comparing = $state(false);

/** The history key of this opening, so all of its writes are one step. */
let key = null;
let openings = 0;

/** The dialog's state before a slider's drag, set on its first move and kept as one step when it is let go. */
let gestureBefore = null;

const clone = (v) => JSON.parse(JSON.stringify(v));

/** Every picture's stored settings in the open picture's gallery, by its place there. */
function galleryStyles() {
  const { block } = pageState.readBlock(target.sectionId, target.blockId);
  return (block?.props.images ?? []).map((img) => clone(img.style ?? {}));
}

/** The dialog's state as one step: the picture, and for a gallery picture every picture's settings. */
function snapshot() {
  return { pic: clone(pic), styles: target.kind === 'gallery' ? galleryStyles() : null };
}

/** A step put back: the gallery's settings, then the picture itself. */
function restore(step) {
  if (step.styles) {
    pageState.mutateBlockAt(target.sectionId, target.blockId, key, (block) => {
      block.props.images?.forEach((img, i) => {
        if (step.styles[i]) img.style = clone(step.styles[i]);
      });
    });
  }
  pic = clone(step.pic);
  write(step.pic);
}

const sameStep = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Where the picture lives now, read from the draft. */
function readSource(t) {
  if (t.kind === 'entry') {
    const entry = collectionsState.collectionsView[t.collection]?.entries?.find((e) => e.id === t.entryId);
    return entry ? clone(entry) : null;
  }
  const { block } = pageState.readBlock(t.sectionId, t.blockId);
  if (!block) return null;
  if (t.kind === 'gallery') return block.props.images?.[t.index] ? clone(block.props.images[t.index]) : null;
  return clone(block.props);
}

/**
 * Opens the editor on a picture.
 * @param {{kind: 'image'|'gallery'|'entry'|'cover', sectionId?: string, blockId?: string, index?: number, collection?: string, entryId?: string, frameRatio?: number}} t
 */
function open(t) {
  if (!KIND_TOOLS[t?.kind]) return;
  if (t.kind === 'gallery' && !Number.isInteger(t.index)) return;
  const source = readSource(t);
  if (!source) return;
  const read = readPicture(t.kind, source);
  // An image block's frame is part of its picture here: a shape changes it, and Cancel and the dialog's undo put it back.
  if (t.kind === 'image') {
    const { block } = pageState.readBlock(t.sectionId, t.blockId);
    if (block?.frames?.desktop) read.frame = clone(block.frames.desktop);
  }
  const size = (v) => (Number(v) > 0 ? Number(v) : 0);
  target = { ...t, frameRatio: size(t.frameRatio), frameWidth: size(t.frameWidth), frameHeight: size(t.frameHeight) };
  pic = read;
  opened = clone(read);
  natural = 0;
  undoSteps = [];
  redoSteps = [];
  comparing = false;
  gestureBefore = null;
  openings += 1;
  key = `edit:picture:${t.blockId ?? t.entryId}:${openings}`;
  openedStep = snapshot();
  pageState.blockMenu = null;
}

/** The frame's width over its height the crop window is drawn with: the chosen shape's, else an image block's frame as a shape left it, else the frame as the preview drew it, else the block's frame at the design width. */
function frameRatio() {
  if (!target || !pic) return 1;
  const chosen = ratioValue(pic.ratio, natural);
  if (chosen) return chosen;
  if (target.kind === 'image' && pic.frame && opened?.frame && !sameStep(pic.frame, opened.frame)) {
    const w = pageState.designWidth(target.sectionId) * (pic.frame.w / 100);
    if (w > 0 && pic.frame.h > 0) return w / pic.frame.h;
  }
  if (target.frameRatio) return target.frameRatio;
  if (target.kind === 'image' || target.kind === 'cover') {
    const { block } = pageState.readBlock(target.sectionId, target.blockId);
    const f = block?.frames?.desktop;
    const w = f ? pageState.designWidth(target.sectionId) * (f.w / 100) : 0;
    if (w > 0 && f.h > 0) return w / f.h;
  }
  return 16 / 9;
}

/**
 * The frame's size on the page in pixels, for the sharpness check: an image block's from its frame at the design width (a new shape changes it), a video cover's from the video's frame, anything else as the preview drew it; null where it is not known.
 * @returns {{width: number, height: number}|null}
 */
function frameSize() {
  if (!target || !pic) return null;
  if (target.kind === 'image' || target.kind === 'cover') {
    const { block } = pageState.readBlock(target.sectionId, target.blockId);
    const f = (target.kind === 'image' && pic.frame) || block?.frames?.desktop;
    const w = f ? pageState.designWidth(target.sectionId) * (f.w / 100) : 0;
    if (w > 0 && f.h > 0) return { width: w, height: f.h };
  }
  return target.frameWidth && target.frameHeight ? { width: target.frameWidth, height: target.frameHeight } : null;
}

/** How many pictures the open picture's gallery holds, 0 for any other kind. */
function galleryCount() {
  if (target?.kind !== 'gallery') return 0;
  return pageState.readBlock(target.sectionId, target.blockId).block?.props.images?.length ?? 0;
}

/**
 * Writes a picture through the place it lives; an image block's frame (set by a new shape, frameForRatio) goes with it.
 * @param {object} next
 */
function write(next) {
  const t = target;
  if (!t) return;
  const value = clone(next);
  if (t.kind === 'entry') {
    collectionsState.mutateCollection(t.collection, key, (data) => {
      const entry = data.entries.find((e) => e.id === t.entryId);
      if (entry) writePicture('entry', entry, value);
    });
    return;
  }
  pageState.mutateBlockAt(t.sectionId, t.blockId, key, (block) => {
    if (t.kind === 'gallery') {
      const img = block.props.images?.[t.index];
      if (img) writePicture('gallery', img, value);
      return;
    }
    writePicture(t.kind, block.props, value);
    if (t.kind === 'image' && value.frame && block.frames?.desktop) block.frames.desktop = { ...block.frames.desktop, ...value.frame };
  });
}

/**
 * The image block's frame for a new shape: it keeps its height and takes the width the shape gives, moving left where the room to its right is too small; null where the shape leaves the frame as it is.
 * @param {object} frame
 * @param {string} ratio
 */
function frameForRatio(frame, ratio) {
  const value = ratioValue(ratio, natural);
  const designPx = pageState.designWidth(target.sectionId);
  if (!value || !frame || !(designPx > 0)) return null;
  const w = Math.max(1, Math.min(Math.round(((frame.h * value) / designPx) * 10000) / 100, 100));
  return { ...frame, w, x: Math.min(frame.x, Math.round((100 - w) * 100) / 100), h: Math.max(1, Math.round(((w / 100) * designPx) / value)) };
}

/**
 * A change in the dialog: written at once, and kept as one of the dialog's own steps.
 * A slider's moves are one step together (`gesture`), kept when it is let go (endGesture).
 * @param {object} patch Top-level fields of the picture, with `style` merged into its settings
 * @param {{gesture?: boolean}} [options]
 */
function change(patch, { gesture = false } = {}) {
  if (!pic) return;
  const before = clone(pic);
  const next = { ...before, ...patch, style: patch.style ? { ...before.style, ...patch.style } : before.style };
  if (target.kind === 'image' && patch.ratio && patch.ratio !== before.ratio) next.frame = frameForRatio(before.frame, patch.ratio) ?? before.frame;
  if (JSON.stringify(next) === JSON.stringify(before)) return;
  if (gesture) gestureBefore ??= snapshot();
  else {
    // A wheel's or a key's moves still open are a step of their own before this one.
    endGesture();
    undoSteps = [...undoSteps, snapshot()];
    redoSteps = [];
  }
  pic = next;
  write(next);
}

/** A slider let go: its moves become one of the dialog's steps. */
function endGesture() {
  if (!gestureBefore) return;
  if (!sameStep(gestureBefore, snapshot())) {
    undoSteps = [...undoSteps, gestureBefore];
    redoSteps = [];
  }
  gestureBefore = null;
}

function undo() {
  endGesture();
  if (!undoSteps.length) return;
  const prev = undoSteps.at(-1);
  undoSteps = undoSteps.slice(0, -1);
  redoSteps = [...redoSteps, snapshot()];
  restore(prev);
}

function redo() {
  endGesture();
  if (!redoSteps.length) return;
  const next = redoSteps.at(-1);
  redoSteps = redoSteps.slice(0, -1);
  undoSteps = [...undoSteps, snapshot()];
  restore(next);
}

/** «Apply to all» in a gallery: every other picture there takes the open one's look, adjustments and overlay (lib/picture-edit.js withShared), as one of the dialog's steps. */
function applyToAll() {
  const t = target;
  if (!t || t.kind !== 'gallery' || !pic) return;
  endGesture();
  const before = snapshot();
  const next = before.styles.map((stored, i) => (i === t.index ? stored : withShared(stored, pic.style)));
  if (sameStep(next, before.styles)) {
    shellState.setStatus(ta('pic.appliedAll'));
    return;
  }
  pageState.mutateBlockAt(t.sectionId, t.blockId, key, (block) => {
    block.props.images?.forEach((img, i) => {
      if (i !== t.index && next[i]) img.style = next[i];
    });
  });
  undoSteps = [...undoSteps, before];
  redoSteps = [];
  shellState.setStatus(ta('pic.appliedAll'));
}

/** The picture's file as bytes: a picture in the draft from its data URL, one at a path read from the site. */
async function pictureBlob(src) {
  const m = /^data:([^;,]*);base64,(.*)$/.exec(src);
  if (!m) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`The picture could not be read (${res.status})`);
    return res.blob();
  }
  const raw = atob(m[2]);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
  return new Blob([bytes], { type: m[1] || 'application/octet-stream' });
}

/** «Make smaller»: the open picture compressed again into its use's budget, kept only when it came out lighter (an animation is kept as it is). */
async function shrink() {
  const t = target;
  const from = pic?.src;
  if (!t || !from) return;
  shellState.setStatus(ta('status.compressingImage'));
  try {
    const blob = await pictureBlob(from);
    const img = await compressToWebp(blob, undefined, { budget: mediaState.budgetFor(t.kind) });
    if (target !== t || pic?.src !== from) return;
    if (img.animated) {
      shellState.setStatus(ta('pic.budget.animated'));
      return;
    }
    if (img.bytes >= blob.size) {
      shellState.setStatus(ta('pic.size.notSmaller'));
      return;
    }
    natural = 0;
    change({ src: img.dataUrl });
    shellState.setStatus('');
  } catch {
    shellState.setStatus(ta('status.imageReadError'), 'error');
  }
}

/** A section, or every setting, back to none. */
function reset(section) {
  if (!pic) return;
  change({ style: resetStyle(pic.style, section) });
}

/** A new picture in place of the open one, through the same checks as a first upload (an SVG trimmed, the picture compressed into its use's budget, one still over it asked about). */
async function replace(file) {
  const t = target;
  if (!file || !pic) return;
  try {
    const img = await mediaState.compressOrTrim(file, t.kind);
    if (target !== t) return;
    natural = 0;
    change({ src: img.dataUrl });
  } catch (err) {
    shellState.setStatus(mediaState.imageErrorText(err), 'error');
  }
}

/** Takes the picture away and closes: the image block and the video's cover stand without one, a gallery picture leaves the gallery, an entry keeps its other fields. */
function remove() {
  const t = target;
  if (!t || !pic) return;
  endGesture();
  if (t.kind === 'gallery') {
    pageState.mutateBlockAt(t.sectionId, t.blockId, key, (block) => {
      block.props.images?.splice(t.index, 1);
    });
  } else {
    const before = clone(pic);
    const next = { ...before, src: '' };
    pic = next;
    write(next);
  }
  close();
  shellState.setStatus(ta('pic.removed'));
}

/** «Done»: the changes stay, as one step in the admin's history. */
function done() {
  endGesture();
  close();
}

/** Cancel or Escape: the picture, and a gallery's other pictures, back as they were opened. */
function cancel() {
  endGesture();
  if (pic && openedStep && !sameStep(snapshot(), openedStep)) restore(openedStep);
  close();
}

function close() {
  gestureBefore = null;
  target = null;
  pic = null;
  opened = null;
  openedStep = null;
  comparing = false;
  undoSteps = [];
  redoSteps = [];
}

export const pictureEditorState = {
  get pictureTarget() { return target; },
  get picture() { return pic; },
  get pictureOpened() { return opened; },
  get pictureNatural() { return natural; },
  set pictureNatural(v) { natural = v; },
  get pictureComparing() { return comparing; },
  set pictureComparing(v) { comparing = v; },
  get pictureCanUndo() { return undoSteps.length > 0; },
  get pictureCanRedo() { return redoSteps.length > 0; },
  get pictureFrameRatio() { return frameRatio(); },
  get pictureFrameSize() { return frameSize(); },
  get pictureGalleryCount() { return galleryCount(); },
  openPicture: open,
  changePicture: change,
  endPictureGesture: endGesture,
  undoPicture: undo,
  redoPicture: redo,
  resetPicture: reset,
  replacePicture: replace,
  shrinkPicture: shrink,
  applyPictureToAll: applyToAll,
  removePicture: remove,
  donePicture: done,
  cancelPicture: cancel,
};
