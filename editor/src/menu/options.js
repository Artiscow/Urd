/**
 * The option lists the element menu shares between its families and its quick
 * row, as functions, since their words come from the admin dictionary and
 * `ta` is never called at module level (ADR-0012).
 */
import { ta } from '$engine/i18n.js';

export const onOff = () => [['on', ta('common.on')], ['off', ta('common.off')]];

/** A band's reach (ribbon-model.js): the content surface by default, the window, or the block's own box. */
export const ribbonReaches = () => [['canvas', ta('opt.ribbonWidth.content')], ['page', ta('opt.ribbonWidth.page')], ['content', ta('opt.ribbonWidth.own')]];
export const ribbonReach = (w) => (w === 'canvas' || w === 'page' ? w : 'content');
export const ribbonMotions = () => [['roll', ta('opt.ribbonMotion.roll')], ['sway', ta('opt.ribbonMotion.sway')],
  ['step', ta('opt.ribbonMotion.step')], ['none', ta('opt.ribbonMotion.none')]];
export const ribbonMainOptions = () => [
  ['text', ta('opt.ribbonStripe.text')], ['marks', ta('opt.ribbonStripe.marks')],
  ['plain', ta('opt.ribbonStripe.plain')],
];
export const ribbonStripeOptions = () => [['none', ta('common.none')], ...ribbonMainOptions()];
export const ribbonSepOptions = () => [
  ['dot', ta('opt.ribbonSep.dot')], ['dash', ta('opt.ribbonSep.dash')], ['slash', ta('opt.ribbonSep.slash')],
  ['star', ta('opt.ribbonSep.star')], ['none', ta('common.none')], ['custom', ta('opt.ribbonSep.custom')],
];
/** The ink a thin stripe inherits when it has no colour of its own (the block's own rule). */
export const ribbonInk = (props) => props.color || (props.variant === 'plain' ? 'text' : 'accent-text');
// The ribbon's separators, drawn the way the band draws them.
const sepSvg = (body) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${body}</svg>`;
export const RIBBON_SEP_ICONS = {
  dot: sepSvg('<circle cx="12" cy="12" r="3"/>'),
  dash: sepSvg('<rect x="3" y="10.6" width="18" height="2.8" rx="1.4"/>'),
  slash: sepSvg('<path d="M15.5 3.5L8.5 20.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/>'),
  star: sepSvg('<path d="M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z"/>'),
  none: sepSvg('<path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.35"/><path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>'),
  custom: sepSvg('<path d="M5 8h14M5 12h9M5 16h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>'),
};

export const shapeKinds = () => [
  ['line', ta('shape.line')], ['arrow', ta('shape.arrow')], ['circle', ta('shape.circle')],
  ['rect', ta('shape.rect')], ['triangle', ta('shape.triangle')],
];
export const colorTokens = () => [
  ['accent', ta('color.accent')], ['text', ta('color.text')], ['surface', ta('color.surface')], ['bg', ta('color.bg')],
];

/** The anchor points for "pin to screen": vertical-horizontal, as dockPosition in the engine reads them. */
export const DOCK_OPTIONS = [
  ['top-left', 'opt.dock.topLeft'], ['top-center', 'opt.dock.topCenter'], ['top-right', 'opt.dock.topRight'],
  ['middle-left', 'opt.dock.middleLeft'], ['middle-center', 'opt.dock.middleCenter'], ['middle-right', 'opt.dock.middleRight'],
  ['bottom-left', 'opt.dock.bottomLeft'], ['bottom-center', 'opt.dock.bottomCenter'], ['bottom-right', 'opt.dock.bottomRight'],
];
