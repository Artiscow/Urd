/**
 * The capabilities a block can carry (ADR-0031): groups of settings that take no room in the element menu until they are added or in use, then stand as a card (lib/rows/Capability.svelte) with their settings and a way back to the standard.
 * Pure: each entry tells, through the editor handle (`ed`) and the selected block it is given, whether the block can carry it, whether it is in use, what adding it sets, and how it is taken back.
 * `area` is the menu's area the card stands in, `icon` its drawing (CAP_ICONS in lib/icons.js), `pins` the Pinned rows that hold its settings, `types` the block types that carry it (every type where absent).
 * A capability that is one switch has `single`: what the switch holds and how it is set, drawn as a card of one line with an On/Off chip (lib/rows/Capability.svelte); adding it switches it on, which on a block that starts with it on (a shape hidden on phones) leaves it as it is and keeps the card.
 * `summary` names what a card folded to one line shows (Urd settings «Adding extras» as folded cards), where one word says it; a card without one shows that it is on.
 * The words are `cap.<id>` (its title) and `cap.about.<id>` (one line on what it does) in the admin dictionaries.
 * The shared capabilities stand first, then each block type's own; a block's own capability whose card a tool of the block's bar opens carries the id of the fold it was (bar-tools.js), so the tool finds it.
 */
import { spotLinks } from '$engine/anchor-model.js';
import { calDesign, calView, CAL_SWITCH_VIEWS } from '$engine/calendar-designs.js';
import { linkOf } from '../lib/link-edit.js';

/** The block's own choice under the pointer: its effect, one an older block keeps as its animation, or 'none' where it declines the effect its section gives every element ('' = none of its own). */
export const hoverOf = (block, ed) => (block.hover === false ? (block.blocksHoverType ? 'none' : '')
  : block.hover?.type ?? (block.animation && !ed.isEntrance(block.animation) ? block.animation.type : ''));
/** Whether a block's type starts with a block-level flag on (state/blocks.svelte.js blockStarts): the shapes and the icon start as decor hidden on phones. */
const starts = (ed, block, flag) => Boolean(ed.blockStarts(block.type, flag));

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
    id: 'sticky', area: 'placement', icon: 'stick', pins: [],
    // A block pins while scrolling on the desktop only, so the setting stands in its view alone.
    available: (block, ed) => ed.viewMode === 'desktop',
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

/* The image's, the calendar's, the button's and the ribbon's own (ADR-0031): what a press on the picture does, what the calendar can show beside its events and how its words are set, the button's colours, and the ribbon's stripes.
   A calendar's capability is in use by what its card shows in the calendar's view (menu/families/Calendar.svelte), so a setting the view leaves out does not keep a card. */
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
    // The subscribe button stands until it is turned off, so a calendar that has not turned it off uses the buttons.
    // The programme's address counts where the design draws it, as the card does.
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

/** Whether the selected block can carry a capability: its type, and what the capability asks of the view. */
export function carries(cap, block, ed) {
  if (!cap || !block) return false;
  if (cap.types && !cap.types.includes(block.type)) return false;
  return cap.available ? cap.available(block, ed) : true;
}

/** The capability a Pinned row's setting belongs to, or null. */
export const capabilityOfPin = (pin) => CAPABILITIES.find((cap) => cap.pins.includes(pin)) ?? null;
