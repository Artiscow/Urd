/**
 * Core block: shape.
 * Lines and arrows, ellipses, rectangles and triangles; a line can carry a `label` and a mark set in its middle, the chapter divider.
 * Notes: docs/engine-notes/blocks/shape.md (Urd repository).
 */
import { resolveColor } from '../theme.js';
import { iconSvg } from '../icons.js';

/** The styles a line and an arrow's shaft are drawn in, `solid` where `lineStyle` is absent. */
export const LINE_STYLES = ['solid', 'dashed', 'dotted', 'double'];

const lineStyleOf = (props) => (LINE_STYLES.includes(props.lineStyle) ? props.lineStyle : 'solid');

/** The stroke's thickness in px: a double line takes at least 3, for its two strokes and the gap between them. */
const strokeOf = (props) => (lineStyleOf(props) === 'double' ? Math.max(3, props.thickness) : props.thickness);

/** The mark a line carries before its word: a drawn icon of Urd's set, else a character; decoration, hidden from assistive technology. */
function lineMark(props) {
  const svg = typeof props.icon === 'string' && props.icon ? iconSvg(props.icon) : null;
  const glyph = typeof props.glyph === 'string' ? props.glyph.trim() : '';
  if (!svg && !glyph) return null;
  const mark = document.createElement('span');
  mark.className = 'urd-shape-chapter-mark';
  mark.setAttribute('aria-hidden', 'true');
  if (svg) mark.innerHTML = svg;
  else mark.textContent = glyph;
  return mark;
}

/** The fill of a filled shape: the shape's colour when `fill` is `true`, or the colour string an older block stores as its fill. */
function fillColor(props, color) {
  return props.fill === true || !props.fill ? color : resolveColor(props.fill);
}

export const shapeBlock = {
  version: 1,
  label: 'Shape',
  labelKey: 'blocks.shape',
  defaults: () => ({ kind: 'line', color: 'accent', thickness: 2, fill: null }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{kind: 'line'|'arrow'|'circle'|'rect'|'triangle', color: string, thickness: number, fill: boolean|string|null,
   *          label?: string, lineStyle?: string, icon?: string|null, glyph?: string}} props
   * @param {object} ctx
   */
  render(el, props, ctx) {
    const color = resolveColor(props.color);

    // The chapter divider: the line drawn on both sides of a word and a mark, its two strokes the element's ::before and ::after (shape.css).
    const label = props.kind === 'line' && typeof props.label === 'string' ? props.label.trim() : '';
    const mark = props.kind === 'line' ? lineMark(props) : null;
    if (label || mark) {
      const row = document.createElement('div');
      row.className = 'urd-shape-chapter';
      row.style.color = color;
      row.style.setProperty('--urd-shape-t', `${strokeOf(props)}px`);
      row.style.setProperty('--urd-shape-style', lineStyleOf(props));
      const mid = document.createElement('span');
      mid.className = 'urd-shape-chapter-mid';
      if (mark) mid.appendChild(mark);
      if (label) {
        const word = document.createElement('span');
        word.className = 'urd-shape-chapter-label';
        word.textContent = label;
        mid.appendChild(word);
      }
      row.appendChild(mid);
      el.appendChild(row);
      return;
    }

    if (props.kind === 'line' || props.kind === 'arrow') {
      // A horizontal line centred in the frame, drawn as its top border in the line's style; direction comes from rot.
      const line = document.createElement('div');
      line.style.cssText = `position:absolute;left:0;right:${props.kind === 'arrow' ? '10px' : '0'};top:50%;transform:translateY(-50%);border-top:${strokeOf(props)}px ${lineStyleOf(props)} ${color};`;
      el.appendChild(line);
      if (props.kind === 'arrow') {
        const head = document.createElement('div');
        const size = Math.max(6, props.thickness * 4);
        head.style.cssText = `position:absolute;right:0;top:50%;transform:translateY(-50%);width:0;height:0;border-top:${size}px solid transparent;border-bottom:${size}px solid transparent;border-left:${size * 1.4}px solid ${color};`;
        el.appendChild(head);
      }
      return;
    }

    if (props.kind === 'triangle') {
      // A triangle is drawn as a filled surface (clip-path cannot take a stroke).
      const tri = document.createElement('div');
      tri.style.cssText = `position:absolute;inset:0;background:${fillColor(props, color)};clip-path:polygon(50% 0, 100% 100%, 0 100%);`;
      el.appendChild(tri);
      return;
    }

    // circle / rect: a circle becomes an ellipse in non-square frames.
    if (props.fill) {
      el.style.background = fillColor(props, color);
    } else {
      el.style.border = `${props.thickness}px solid ${color}`;
    }
    if (props.kind === 'circle') el.style.borderRadius = '50%';
  },
};
