/* What the Nav panel's parts share (panels/nav/): the writes more than one fold makes, the variant's kind, and each fold's value while closed with its group of settings to go back from (lib/site-groups.js).
   Every function reads the draft and the writes from the editor handle when it is called, so one set serves the panel for as long as it stands. */
import { ta } from '$engine/i18n.js';
import { toolOrder } from '$engine/nav-model.js';
import { isFloatingVariant, sizePresetOf, phoneSizes } from '../../lib/nav-size.js';
import { siteGroup, mergeGroups } from '../../lib/site-groups.js';

/** The column at the left or the right, where the bar's own settings have no say. */
export const isSideNav = (nav) => nav?.variant === 'side-left' || nav?.variant === 'side-right';

/** One of the three floating forms. */
export const isFloatingNav = (nav) => isFloatingVariant(nav?.variant);

/** A part's own object left empty by a change leaves the file. */
function dropEmpty(parent, key) {
  if (parent?.[key] && typeof parent[key] === 'object' && !Object.keys(parent[key]).length) delete parent[key];
}

/** @param {object} ed The editor handle (getContext('urd-editor')) */
export function navActions(ed) {
  /** One field of nav.style; a call with undefined removes it, so a default is never stored. */
  function setNavStyle(name, value) {
    ed.siteMutate(`edit:nav-style-${name}`, () => {
      const nav = ed.siteDraft.nav;
      nav.style ??= {};
      if (value === undefined) delete nav.style[name];
      else nav.style[name] = value;
    });
  }

  /** One of the phone's own values (nav.style.mobile); undefined removes it, and an emptied object leaves the file. */
  function setNavMobile(key, value) {
    ed.siteMutate(`edit:nav-mobile-${key}`, () => {
      const nav = ed.siteDraft.nav;
      nav.style ??= {};
      const mobile = { ...(nav.style.mobile ?? {}) };
      if (value === undefined) delete mobile[key];
      else mobile[key] = value;
      if (Object.keys(mobile).length) nav.style.mobile = mobile;
      else delete nav.style.mobile;
    });
  }

  /** A field on the logo itself; undefined removes it. */
  function setNavLogo(key, value) {
    ed.siteMutate(`edit:nav-logo-${key}`, () => {
      const next = { type: 'text', value: '', ...ed.siteDraft.nav.logo };
      if (value === undefined) delete next[key];
      else next[key] = value;
      ed.siteDraft.nav.logo = next;
    });
  }

  /**
   * The marks already uploaded for the launcher, the button's included: the pickers offer them again, so one image can serve several shortcuts and the pull tab.
   */
  function launcherImages() {
    const launcher = ed.siteDraft.nav?.launcher;
    return [launcher?.image, ...(launcher?.links ?? []).map((link) => link.image)].filter(Boolean);
  }

  /** Whether a tool has a row in the Tools fold: the theme button only with an alt theme to switch to. */
  const toolShown = (id) => id !== 'theme' || Boolean(ed.siteDraft.theme?.alt?.tokens);

  return { setNavStyle, setNavMobile, setNavLogo, launcherImages, toolShown };
}

/**
 * Each fold's value while closed and its group: the settings in it with a default the setters leave out of the file, among those the fold shows now.
 * @param {object} ed The editor handle
 */
export function navFolds(ed) {
  const nav = () => ed.siteDraft.nav;
  const style = () => ed.siteDraft.nav?.style;
  const { toolShown } = navActions(ed);

  /** Every reset is a step of the menu's settings ('nav', as the panel's setters name theirs), so a fold whose settings stand in several objects goes back in one step; `tidy` takes an object it leaves empty out of the file. */
  const write = (tidy) => (name, change) => ed.siteMutate('nav', () => {
    change();
    tidy?.();
  });
  /** A group's defaults with the fields a condition hides left out, so a hidden value neither marks the fold nor goes with its reset. */
  const pick = (entries) => Object.fromEntries(entries.filter(([, , shown = true]) => shown).map(([key, value]) => [key, value]));
  const pagesShown = (hideOn) => {
    const pages = ed.siteDraft.pages ?? [];
    return `${pages.filter((pg) => !(hideOn ?? []).includes(pg.id)).length} / ${pages.length}`;
  };

  /** The items' submenu settings, once an item has a submenu: the design, how the submenus open, the pills' colour, the columns, and the side bar's own two. */
  function itemsGroup() {
    if (!(nav()?.items ?? []).some((item) => item.children?.length)) return null;
    const side = isSideNav(nav());
    return siteGroup(style, write(), 'nav-items', pick([
      ['subStyle', undefined], ['subColumns', undefined], ['subPillColor', undefined, style()?.subStyle === 'pills'],
      ['subOpen', undefined, !side || style()?.sideSubs !== 'expanded'],
      ['sideSubs', undefined, side], ['sideSubArrow', undefined, side && style()?.sideSubs === 'expanded'],
    ]));
  }
  /** How many items stand at the top of the menu. */
  const itemsValue = () => `${(nav()?.items ?? []).length}`;

  /** The logo's settings while the bar shows it; its switch has no reset, as no switch has. */
  function logoGroup() {
    const type = nav()?.logo?.type ?? 'text';
    const shown = nav()?.logo?.show !== false;
    return siteGroup(() => nav()?.logo, write(), 'nav-logo', pick([
      ['font', undefined, shown && type !== 'image'], ['textSize', undefined, shown && type !== 'image'], ['bold', true, shown && type !== 'image'], ['italic', false, shown && type !== 'image'],
      ['size', 32, shown && type !== 'text'], ['mobileSize', undefined, shown && type !== 'text'], ['radius', 0, shown && type !== 'text'],
      ['order', 'image-first', shown && type === 'both'],
    ]));
  }
  /** The logo's words, or that it is a picture. */
  const logoValue = () => (nav()?.logo?.type === 'image' ? ta('blocks.image') : nav()?.logo?.value || ed.siteDraft.site?.title || ta('blocks.text'));

  function layoutGroup() {
    const side = isSideNav(nav());
    const floating = isFloatingNav(nav());
    return mergeGroups(
      siteGroup(nav, write(), 'nav-layout', pick([['variant', 'bar'], ['layout', 'right', !side], ['overlay', undefined, !side && !floating]])),
      siteGroup(style, write(), 'nav-layout', pick([
        ['pillWidth', undefined, floating], ['radius', undefined, floating], ['glow', undefined, floating], ['topGap', true, floating],
        ['inset', true, !side && !floating], ['sidePlacement', 'top', side], ['sideAlign', 'left', side], ['width', 250, side],
        ['size', 'md'], ['padY', undefined, !side], ['textSize', undefined], ['padX', undefined, !side], ['gap', undefined, !side],
      ])),
    );
  }
  const VARIANT_WORDS = { bar: 'bar', floating: 'floating', 'floating-square': 'floatingSquare', 'floating-tab': 'floatingTab', 'side-left': 'sideLeft', 'side-right': 'sideRight' };
  /** The form, and the size step or that the size is the owner's own. */
  const layoutValue = () => {
    const preset = sizePresetOf(style());
    return `${ta(`opt.navVariant.${VARIANT_WORDS[nav()?.variant] ?? 'bar'}`)} · ${preset ? ta(`opt.size.${preset}`) : ta('opt.custom')}`;
  };

  function coloursGroup() {
    const side = isSideNav(nav());
    const hover = style()?.hover;
    return siteGroup(style, write(), 'nav-colours', pick([
      ['hover', 'standard'], ['hoverGlow', 0.6, hover === 'lift'], ['hoverColor', 'accent', ['underline', 'pill', 'lift'].includes(hover)],
      ['hoverTextColor', 'accent'], ['textColor', 'text'], ['blur', true],
      ['border', undefined, !side], ['shadow', undefined, !side && !isFloatingNav(nav())],
    ]));
  }
  const HOVER_WORDS = { standard: 'standard', underline: 'underline', pill: 'pill', 'lift-plain': 'liftPlain', lift: 'lift' };
  /** The hover style. */
  const coloursValue = () => ta(`opt.hover.${HOVER_WORDS[style()?.hover] ?? 'standard'}`);

  /** The phone's own values (nav.style.mobile) among the keys given. */
  const phoneOwn = (id, entries) => siteGroup(() => style()?.mobile, write(() => dropEmpty(style(), 'mobile')), id, pick(entries));

  /** The bar on the phone: its sizes, its border, where its items and tools stand, and over the top section and the content width. */
  function phoneBarGroup() {
    const side = isSideNav(nav());
    const bar = !side && !isFloatingNav(nav());
    // As NavMobile.svelte shows it: the burger and its buttons are placed while they stand after the logo.
    const toolsAfterLogo = (style()?.mobile?.tools?.side ?? style()?.tools?.side ?? 'end') !== 'start';
    return phoneOwn('nav-mobile', [
      ['padY', undefined, !side], ['textSize', undefined], ['size', undefined], ['border', undefined], ['layout', undefined, toolsAfterLogo], ['tools', undefined],
      ['overlay', undefined, bar], ['inset', undefined, bar],
    ]);
  }
  /** The thickness and the text size the phone draws the bar with. */
  const phoneBarValue = () => {
    const sizes = phoneSizes(nav());
    return sizes.padY == null ? `${sizes.textSize} px` : `${sizes.padY} · ${sizes.textSize} px`;
  };

  /** The logo on the phone, while the bar shows one: its place in the bar, and the logo's own values for the phone. */
  function phoneLogoGroup() {
    const logo = nav()?.logo ?? {};
    const type = logo.type ?? 'text';
    const parts = type === 'both' ? logo.mobileParts : undefined;
    // As NavPhoneLogo.svelte shows them: what shows and the sizes only while the logo stands somewhere on the phone, each size only for the part shown.
    const seen = style()?.mobile?.logo !== 'hidden' || (style()?.mobileMenu === 'sheet' && style()?.sheetLogo === true);
    const picture = type === 'image' || (type === 'both' && parts !== 'text');
    const words = type === 'text' || (type === 'both' && parts !== 'image');
    return mergeGroups(
      phoneOwn('nav-mobile', [['logo', undefined]]),
      siteGroup(() => nav()?.logo, write(), 'nav-mobile', pick([['mobileSize', undefined, seen && picture], ['mobileTextSize', undefined, seen && words], ['mobileParts', undefined, seen && type === 'both']])),
    );
  }
  /** Where the logo stands in the phone's bar. */
  const phoneLogoValue = () => ta(`opt.navPhoneLogo.${{ center: 'center', hidden: 'hidden' }[style()?.mobile?.logo] ?? 'start'}`);

  /** The menu the burger opens on the phone: its form, how its links answer a touch, the burger, and the full-screen menu's contents and surface; `launcher` adds the launcher's two for the phone, which the Nav panel keeps in its Tools fold. */
  function phoneMenuGroup({ launcher = false } = {}) {
    const sheet = style()?.mobileMenu === 'sheet';
    const hasSubs = Boolean(nav()?.items?.some((item) => item.children?.length));
    // As NavMobile.svelte shows them: the bar's tools on the phone, and with the bar alone beside the full-screen menu, the theme button and the cart in the menu without asking.
    const themeTool = Boolean(ed.siteDraft.theme?.alt?.tokens) && style()?.tools?.theme !== false;
    const cartTool = Boolean(nav()?.cart?.show);
    const barTools = !(sheet && style()?.sheetBarTools === false);
    const groups = [
      phoneOwn('nav-mobile', [['press', undefined]]),
      siteGroup(style, write(), 'nav-mobile', pick([
        ['mobileMenu', 'dropdown'], ['sheetMotion', 'top', sheet], ['mobileAlign', 'left'], ['sheetLogo', undefined, sheet && nav()?.logo?.show !== false],
        ['sheetBarTools', true, sheet && (themeTool || cartTool || style()?.tools?.links === true)],
        ['sheetTheme', undefined, sheet && barTools && themeTool],
        ['sheetCart', undefined, sheet && barTools && cartTool], ['sheetAnnounce', undefined, sheet && Boolean(nav()?.announcement?.show)],
        ['sheetToolLabels', undefined, sheet && (barTools ? Boolean(style()?.sheetTheme || style()?.sheetCart) : themeTool || cartTool || style()?.tools?.links === true)],
        ['mobileSubs', 'collapsed', hasSubs], ['mobileSubArrow', true, hasSubs],
      ])),
      siteGroup(() => style()?.burger, write(() => dropEmpty(style(), 'burger')), 'nav-mobile', { icon: 'lines', showLabel: undefined }),
    ];
    if (sheet) groups.push(siteGroup(() => style()?.sheet, write(() => dropEmpty(style(), 'sheet')), 'nav-mobile', { bg: 'surface', bgOpacity: 0.85, blur: undefined, textColor: undefined }));
    if (launcher && nav()?.launcher?.show === true) groups.push(siteGroup(() => nav()?.launcher, write(), 'nav-mobile', { mobileView: undefined, mobileMax: 6 }));
    return mergeGroups(...groups);
  }

  /** The Nav panel's Phone fold: the three parts as one group. */
  function mobileGroup() {
    const groups = [phoneBarGroup(), phoneMenuGroup()];
    if (nav()?.logo?.show !== false) groups.splice(1, 0, phoneLogoGroup());
    return mergeGroups(...groups);
  }
  /** The menu the burger opens. */
  const mobileValue = () => ta(style()?.mobileMenu === 'sheet' ? 'opt.mobileMenu.sheet' : 'opt.mobileMenu.dropdown');

  function scrollGroup() {
    const scrolls = !isSideNav(nav());
    const shrink = scrolls && nav()?.sticky !== false && nav()?.scroll === 'shrink';
    return mergeGroups(
      siteGroup(nav, write(), 'nav-scroll', pick([
        ['sticky', true, scrolls], ['scroll', 'none', scrolls && nav()?.sticky !== false], ['hideOn', undefined], ['hideMode', 'hidden', (nav()?.hideOn ?? []).length > 0],
      ])),
      siteGroup(style, write(), 'nav-scroll', pick([
        ['shrinkTo', 0.5, shrink], ['shrinkAt', 80, shrink], ['shrinkMs', 220, shrink], ['shrinkLogo', undefined, shrink && nav()?.logo?.show !== false && (nav()?.logo?.type ?? 'text') !== 'text'],
        ['atTop', undefined, scrolls],
      ])),
    );
  }
  /** What the bar does as the page scrolls, where it does something, and how many pages show the menu. */
  const scrollValue = () => {
    const parts = [];
    if (!isSideNav(nav()) && nav()?.sticky !== false && nav()?.scroll && nav().scroll !== 'none') parts.push(ta(`opt.scroll.${nav().scroll}`));
    parts.push(pagesShown(nav()?.hideOn));
    return parts.join(' · ');
  };

  function toolsGroup() {
    const groups = [siteGroup(() => style()?.tools, write(() => dropEmpty(style(), 'tools')), 'nav-tools', pick([
      ['side', undefined], ['align', undefined, isSideNav(nav())], ['order', undefined], ['theme', undefined, toolShown('theme')], ['links', undefined],
    ]))];
    if (nav()?.launcher?.show === true) {
      groups.push(siteGroup(() => nav()?.launcher, write(), 'nav-tools', {
        view: 'grid', size: 'md', width: undefined, iconSize: undefined, textSize: undefined, mobileView: undefined, longNames: 'cut', mobileMax: 6, showTitle: true,
      }));
    }
    return mergeGroups(...groups);
  }
  /** How many of the tools with a row stand in the menu. */
  const toolsValue = () => {
    const on = { theme: style()?.tools?.theme !== false, links: style()?.tools?.links === true, cart: nav()?.cart?.show === true, launcher: nav()?.launcher?.show === true };
    const shown = toolOrder(style() ?? {}).filter(toolShown);
    return `${shown.filter((id) => on[id]).length} / ${shown.length}`;
  };

  function announcementGroup() {
    const a = nav()?.announcement;
    const show = a?.show === true;
    const side = isSideNav(nav());
    const sticky = show && nav()?.sticky !== false && !side && !isFloatingNav(nav()) && !nav()?.overlay;
    return siteGroup(() => nav()?.announcement, write(), 'nav-announcement', pick([
      ['sticky', true, sticky], ['followNav', undefined, show && nav()?.scroll === 'hide' && nav()?.sticky !== false && !side && a?.sticky !== false],
      ['place', 'nav', show && side], ['dismiss', true, show], ['color', 'accent', show], ['textColor', 'accent-text', show], ['hideOn', undefined, show],
    ]));
  }
  /** The strip's words while it is on. */
  const announcementValue = () => (nav()?.announcement?.show ? nav().announcement.text || ta('common.on') : ta('common.off'));

  return {
    itemsGroup, itemsValue, logoGroup, logoValue, layoutGroup, layoutValue, coloursGroup, coloursValue, mobileGroup, mobileValue, phoneBarGroup, phoneBarValue, phoneLogoGroup, phoneLogoValue, phoneMenuGroup,
    scrollGroup, scrollValue, toolsGroup, toolsValue, announcementGroup, announcementValue,
  };
}
