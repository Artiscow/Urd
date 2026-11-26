/**
 * The capabilities a block can carry (ADR-0031): groups of settings that stand as a card in the element menu (lib/rows/Capability.svelte) once added or in use.
 */
import { spotLinks } from '$engine/anchor-model.js';
import { calDesign, calView, CAL_SWITCH_VIEWS } from '$engine/calendar-designs.js';
import { linkOf } from '../lib/link-edit.js';
import { DRAWS_NOTHING } from '$engine/push-model.js';

/** The block's own choice under the pointer: its effect, an older block's hover animation, or 'none' where it declines its section's effect ('' = none of its own). */
export const hoverOf = (block, ed) => (block.hover === false ? (block.blocksHoverType ? 'none' : '')
  : block.hover?.type ?? (block.animation && !ed.isEntrance(block.animation) ? block.animation.type : ''));
/** Whether a block's type starts with a block-level flag on (state/blocks.svelte.js blockStarts): the shapes and the icon start as decor hidden on phones. */
const starts = (ed, block, flag) => Boolean(ed.blockStarts(block.type, flag));

/** The shared capabilities, then each type's own: `area` holds the card, `icon` draws it, `pins` are its Pinned rows, `types` its block types (all where absent). */
export const CAPABILITIES = [
  {
    id: 'text-box', area: 'style', icon: 'box', pins: ['textBox'], types: ['text'],
    inUse: (block) => Boolean(block.props?.box),
    add: (ed) => ed.setBlockProp('box', true),
    clear: (ed) => ed.setBlockProps('text-box', { box: false, boxStyle: null }),
  },
  {
    id: 'motion', area: 'style', icon: 'motion', pins: [],
    inUse: (block, ed) => ed.isEntrance(block.animation) || Boolean(hoverOf(block, ed)),
    summary: (block, ed) => (ed.isEntrance(block.animation)
      ? ed.blockEntranceOptions?.().find(([type]) => type === block.animation.type)?.[1]
      : ed.blockHoverOptions?.(block).find(([type]) => type && type === hoverOf(block, ed))?.[1]) ?? '',
    clear: (ed) => {
      ed.setBlockAnimation(null);
      ed.setBlockHover(null);
    },
  },
  {
    id: 'phone', area: 'placement', icon: 'phone', pins: ['phone'],
    single: { value: (block) => Boolean(block.hideMobile), set: (ed, on) => ed.setBlockHideMobile(on) },
    inUse: (block, ed) => Boolean(block.hideMobile) !== starts(ed, block, 'hideMobile'),
    add: (ed, block) => { if (!block.hideMobile) ed.setBlockHideMobile(true); },
    clear: (ed, block) => ed.setBlockHideMobile(starts(ed, block, 'hideMobile')),
  },
  {
    // Shown on phones only; on the desktop canvas the section's bar lists it.
    id: 'phoneOnly', area: 'placement', icon: 'phoneOnly', pins: [],
    single: { value: (block) => Boolean(block.hideDesktop), set: (ed, on) => ed.setBlockHideDesktop(on) },
    inUse: (block) => Boolean(block.hideDesktop),
    add: (ed, block) => { if (!block.hideDesktop) ed.setBlockHideDesktop(true); },
    clear: (ed) => ed.setBlockHideDesktop(false),
  },
  {
    id: 'sticky', area: 'placement', icon: 'stick', pins: [],
    inUse: (block) => Boolean(block.sticky),
    add: (ed, block) => ed.mutateBlock(`edit:${block.blockId}`, (b) => { b.sticky = { offset: 16, until: null }; }),
    clear: (ed, block) => ed.mutateBlock(`edit:${block.blockId}`, (b) => { b.sticky = null; }),
  },
  {
    id: 'link-target', area: 'placement', icon: 'link', pins: [],
    inUse: (block) => Boolean(block.anchor),
    summary: (block) => (block.anchor ? `#${block.anchor}` : ''),
    // The name goes only while no link on the page, in the menu or in the footer reaches the block by it: a link by the block's id still lands without it.
    removable: (block, ed) => !block.anchor || spotLinks({ id: block.blockId, name: block.anchor },
      { page: ed.store?.data, pageId: ed.pageId, path: ed.pageEntry?.()?.path ?? '/', site: ed.siteDraft, byName: true }).length === 0,
    clear: (ed) => ed.setBlockAnchor(''),
  },
  {
    id: 'decor', area: 'placement', icon: 'decor', pins: [],
    single: { value: (block) => Boolean(block.decor), set: (ed, on) => ed.setBlockDecor(on) },
    inUse: (block, ed) => Boolean(block.decor) !== starts(ed, block, 'decor'),
    add: (ed, block) => { if (!block.decor) ed.setBlockDecor(true); },
    clear: (ed, block) => ed.setBlockDecor(starts(ed, block, 'decor')),
  },
];

/* The image's, the calendar's, the button's and the ribbon's own capabilities.
   A calendar's is in use by what its card shows (menu/families/Calendar.svelte). */
/** The views that draw a grid of days, where the earlier events are not offered. */
export const CAL_GRID_VIEWS = ['month', 'week', 'day', 'year'];
/** Whether the calendar shows its first day of the week: the views that draw weeks, the bento design, and a calendar with the view switcher. */
export const calShowsWeek = (props) => ['month', 'week', 'year', 'agenda'].includes(calView(props)) || props.design === 'bento' || props.switcher === true;
CAPABILITIES.push(
  {
    id: 'img-link', area: 'content', icon: 'link', pins: [], types: ['image'],
    // A link, or the lightbox for a picture without one: a link wins the press.
    inUse: (block) => Object.keys(linkOf(block.props ?? {})).some((key) => key !== 'newTab' && key !== 'rel') || Boolean(block.props?.lightbox),
    clear: (ed) => {
      ed.setBlockLink(null);
      ed.setBlockProp('lightbox', false);
    },
  },
  {
    id: 'video-play', area: 'content', icon: 'play', pins: [], types: ['video'],
    // An uploaded film's loop, muting and self-start, all off at the start; an embed's playback is a section of its own, since it asks first from the start.
    available: (block) => block.props?.source === 'file',
    inUse: (block) => block.props?.loop === true || block.props?.muted === true || block.props?.autoplay === true,
    clear: (ed) => ed.setBlockProps('video-play', { loop: false, muted: false, autoplay: false }),
  },
  {
    id: 'video-overlay', area: 'style', icon: 'palette', pins: [], types: ['video'],
    // A colour laid over an uploaded film; an embed's cover takes its overlay in the image editor, as every picture does.
    available: (block) => block.props?.source === 'file',
    inUse: (block) => Boolean(block.props?.overlay),
    clear: (ed) => ed.setBlockProps('video-overlay', { overlay: undefined }),
  },
  {
    id: 'cal-switcher', area: 'content', icon: 'views', pins: [], types: ['calendar'],
    // Only the views that list what is coming can turn to the week or the month.
    available: (block) => CAL_SWITCH_VIEWS.includes(calView(block.props ?? {})),
    inUse: (block) => block.props?.switcher === true,
    add: (ed) => ed.setBlockProp('switcher', true),
    clear: (ed) => ed.setBlockProps('cal-switcher', { switcher: undefined, switcherViews: undefined }),
  },
  {
    id: 'cal-time', area: 'content', icon: 'clock', pins: [], types: ['calendar'],
    // The first day of the week counts where the card shows it: the views that draw weeks, the bento design and a calendar with the view switcher.
    inUse: (block) => block.props?.clock === '12' || (['mon', 'sun'].includes(block.props?.weekStart) && calShowsWeek(block.props ?? {})),
    clear: (ed) => ed.setBlockProps('cal-time', { clock: undefined, weekStart: undefined }),
  },
  {
    id: 'cal-buttons', area: 'content', icon: 'buttons', pins: [], types: ['calendar'],
    // The subscribe button stands until it is turned off; the programme's address counts where the design draws it.
    inUse: (block) => block.props?.showSubscribe !== false || block.props?.showRecurring === true || block.props?.showAdd === false
      || (Boolean(calDesign(block.props?.design).program) && Boolean(block.props?.programHref)),
    clear: (ed) => ed.setBlockProps('cal-buttons', { showSubscribe: false, showRecurring: undefined, showAdd: undefined, programHref: undefined }),
  },
  {
    id: 'cal-notice', area: 'content', icon: 'notice', pins: [], types: ['calendar'],
    // The designs that draw an announcement offer it; adding it turns it on, and the way back hides it and keeps its words.
    available: (block) => Boolean(calDesign(block.props?.design).notice),
    inUse: (block) => block.props?.notice?.show === true,
    add: (ed, block) => ed.setBlockProp('notice', { ...(block.props?.notice ?? {}), show: true }),
    clear: (ed, block) => ed.setBlockProp('notice', { ...(block.props?.notice ?? {}), show: false }),
  },
  {
    id: 'cal-filter', area: 'content', icon: 'filter', pins: [], types: ['calendar'],
    // A design with calendar switches of its own has no chip row, so its own switches do not count.
    inUse: (block) => (!calDesign(block.props?.design).ownFilter && block.props?.showCategories === true) || block.props?.showSearch === true
      || (block.props?.showEarlier === true && !CAL_GRID_VIEWS.includes(calView(block.props ?? {}))),
    clear: (ed) => ed.setBlockProps('cal-filter', { showCategories: false, showSearch: undefined, showEarlier: undefined }),
  },
  {
    id: 'cal-signup', area: 'content', icon: 'signup', pins: [], types: ['calendar'],
    single: { value: (block) => block.props?.showSignup === true, set: (ed, on) => ed.setBlockProp('showSignup', on) },
    inUse: (block) => block.props?.showSignup === true,
    add: (ed) => ed.setBlockProp('showSignup', true),
    clear: (ed) => ed.setBlockProp('showSignup', false),
  },
  {
    id: 'cal-colors', area: 'style', icon: 'palette', pins: [], types: ['calendar'],
    // The colours that count are the design's own slots, as the card draws them.
    inUse: (block) => calDesign(block.props?.design).slots.some((slot) => block.props?.colors?.[slot.key]) || block.props?.stripe != null,
    clear: (ed) => ed.setBlockProps('cal-colors', { colors: undefined, stripe: undefined }),
  },
  {
    id: 'cal-fields', area: 'style', icon: 'type', pins: [], types: ['calendar'],
    inUse: (block) => Object.keys(block.props?.fieldStyle ?? {}).length > 0,
    clear: (ed) => ed.setBlockProps('cal-fields', { fieldStyle: undefined }),
  },
  {
    id: 'btn-colours', area: 'style', icon: 'palette', pins: [], types: ['button'],
    inUse: (block) => ['bg', 'color', 'borderColor', 'hoverBg'].some((key) => Boolean(block.props?.[key])),
    clear: (ed) => ed.setBlockProps('btn-colours', { bg: undefined, color: undefined, borderColor: undefined, hoverBg: undefined }),
  },
  {
    id: 'ribbon-stripes', area: 'style', icon: 'stripes', pins: [], types: ['ribbon'],
    // A stripe above or below, or the band's middle drawn as a stripe.
    inUse: (block) => (block.props?.above ?? 'none') !== 'none' || (block.props?.below ?? 'none') !== 'none' || (block.props?.main ?? 'text') !== 'text',
    clear: (ed) => ed.setBlockProps('ribbon-stripes', { above: undefined, below: undefined, main: undefined, aboveColor: undefined, belowColor: undefined, stripePlace: undefined, thickness: undefined }),
  },
);

const BY_ID = new Map(CAPABILITIES.map((cap) => [cap.id, cap]));

/** The capability with this id, or null. */
export const capability = (id) => BY_ID.get(id) ?? null;

/** Whether the selected block can carry a capability: its type, and what the capability asks of the view; a block that draws nothing has no motion. */
export function carries(cap, block, ed) {
  if (!cap || !block) return false;
  if (cap.types && !cap.types.includes(block.type)) return false;
  if (cap.id === 'motion' && DRAWS_NOTHING.has(block.type)) return false;
  return cap.available ? cap.available(block, ed) : true;
}

/** The capability a Pinned row's setting belongs to, or null. */
export const capabilityOfPin = (pin) => CAPABILITIES.find((cap) => cap.pins.includes(pin)) ?? null;
