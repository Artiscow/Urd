<script>
  /* The Nav panel's Logo fold: whether the bar shows the logo, then the logo as words, a picture or both, the words' font, size and weight, the picture with its heights and rounding, and which of the two comes first. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import IconButton from '../../lib/rows/IconButton.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { ta } from '$engine/i18n.js';
  import { fontChoices } from '$engine/fonts.js';
  import { ICONS } from '../../lib/icons.js';
  import { LOGO_SIZE, clampRange } from '../../lib/nav-size.js';
  import { squareBeside } from '../../lib/square-beside.js';
  const ed = getContext('urd-editor');
  const siteDraft = $derived(ed.siteDraft);
  const { compressOrTrim, imageErrorText, setStatus, siteMutate } = ed;

  function setLogo(patch) {
    siteMutate('edit:nav-logo', () => {
      siteDraft.nav.logo = { type: 'text', value: '', ...siteDraft.nav.logo, ...patch };
    });
  }

  /** The logo in the bar or out of it; shown is the default, which is never stored. */
  function setLogoShown(on) {
    siteMutate('edit:nav-logo-show', () => {
      siteDraft.nav.logo ??= { type: 'text', value: '' };
      if (on) delete siteDraft.nav.logo.show;
      else siteDraft.nav.logo.show = false;
    });
  }

  /**
   * Logo type switch.
   * value means text (text/both) or image URL (image), so the fields are moved along when the meaning shifts.
   */
  function setLogoType(type) {
    siteMutate('nav', () => {
      siteDraft.nav.logo ??= { type: 'text', value: siteDraft.site.title };
      const logo = siteDraft.nav.logo;
      const imageInValue = logo.type === 'image';
      if (type === 'both') {
        if (imageInValue) {
          logo.image = logo.value;
          logo.value = siteDraft.site.title;
        }
        logo.image ??= '';
        logo.size ??= 32;
      } else if (type === 'image') {
        if (!imageInValue) logo.value = logo.image ?? '';
        delete logo.image;
        logo.size ??= 32;
      } else {
        if (imageInValue) logo.value = siteDraft.site.title;
        delete logo.image;
        delete logo.imageSource;
      }
      logo.type = type;
    });
  }

  /** The logo's picture chosen: kept as the original, and the image editor opens on it; «Done» bakes the logo (setLogoPicture), materialized on publish. */
  async function uploadLogoImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const img = await compressOrTrim(file, 'image');
      ed.openPicture({ kind: 'logo', place: 'nav', fresh: true, source: { src: img.dataUrl } });
    } catch (err) {
      setStatus(imageErrorText(err, 'status.imageReadErrorSvg'), 'error');
    }
  }

  /** The image editor on the logo: from its kept original, or from the logo itself where none is kept. */
  function editLogoImage(src) {
    const kept = siteDraft.nav.logo?.imageSource;
    ed.openPicture({ kind: 'logo', place: 'nav', source: kept?.src ? kept : { src } });
  }
</script>

<SwitchRow label={ta('lbl.logoShow')} title={ta('tip.nav.logoShow')} checked={siteDraft.nav.logo?.show !== false}
  onchange={(on) => setLogoShown(on)} />
{#if siteDraft.nav.logo?.show !== false}
  <Choice label={ta('common.type')} value={siteDraft.nav.logo?.type ?? 'text'}
    options={[['text', ta('blocks.text')], ['image', ta('blocks.image')], ['both', ta('opt.logo.both')]]}
    onchange={(v) => setLogoType(v)} />
  {#if (siteDraft.nav.logo?.type ?? 'text') !== 'image'}
    <input value={siteDraft.nav.logo?.value ?? ''} placeholder={ta('ph.nav.logoName')}
      oninput={(e) => setLogo({ value: e.target.value })} />
    <!-- Style row like a word processor: font | px | B I -->
    <span class="toolbar-row">
      <Dropdown title={ta('tip.nav.logoFont')}
        value={siteDraft.nav.logo?.font ?? ''}
        options={fontChoices(ta, [['', ta('common.inherit')]])}
        onchange={(v) => setLogo({ font: v || undefined })} />
      <input type="number" class="tb-num" min="8" max="96" placeholder="px"
        title={ta('tip.nav.textSize')}
        value={siteDraft.nav.logo?.textSize ?? ''}
        onchange={(e) => setLogo({ textSize: e.target.value ? Number(e.target.value) : undefined })} />
      <button class="tbtn" title={ta('format.bold')} class:active={siteDraft.nav.logo?.bold !== false}
        onclick={() => setLogo({ bold: siteDraft.nav.logo?.bold === false })}><b>{ta('format.boldLetter')}</b></button>
      <button class="tbtn" title={ta('format.italic')} class:active={Boolean(siteDraft.nav.logo?.italic)}
        onclick={() => setLogo({ italic: !siteDraft.nav.logo?.italic })}><i>{ta('format.italicLetter')}</i></button>
    </span>
  {/if}
  {#if (siteDraft.nav.logo?.type ?? 'text') !== 'text'}
    {@const logoSrc = siteDraft.nav.logo?.type === 'image' ? siteDraft.nav.logo?.value : siteDraft.nav.logo?.image}
    <!-- The image as a thumbnail as tall as its picker and the file's row beside it, then the three sizes on one row -->
    <div class="logo-pick">
      <span class="logo-thumb" {@attach squareBeside}>
        {#if logoSrc}<img src={logoSrc} alt="" />{/if}
      </span>
      <span class="logo-pick-col">
        <label class="ghost filepick" title={ta('tip.webpAuto')}>
          {logoSrc ? ta('ui.changeImage') : ta('ui.chooseImage')}
          <input type="file" accept="image/*" onchange={uploadLogoImage} />
        </label>
        {#if logoSrc}
          <span class="toolbar-row">
            <span class="logo-file tb-grow">{logoSrc.startsWith('data:') ? '' : logoSrc.split('/').pop()}</span>
            <IconButton icon={ICONS.pencil} label={ta('tip.logo.edit')} onclick={() => editLogoImage(logoSrc)} />
          </span>
        {/if}
      </span>
    </div>
    <div class="ctl-triple">
      <div class="ctl-field" title={ta('tip.nav.logoHeight')}>
        <span class="mini-label">{ta('lbl.height')}</span>
        <input type="number" class="tb-num" min="12" max="128"
          value={siteDraft.nav.logo?.size ?? 32}
          onchange={(e) => setLogo({ size: Number(e.target.value) })} />
      </div>
      <div class="ctl-field" title={ta('tip.nav.logoHeightMobile')}>
        <span class="mini-label">{ta('lbl.onMobile')}</span>
        <input type="number" class="tb-num" min={LOGO_SIZE.min} max={LOGO_SIZE.max} placeholder={ta('lbl.navSameAsDesktop')}
          value={siteDraft.nav.logo?.mobileSize ?? ''}
          onchange={(e) => {
            const raw = e.target.value;
            setLogo({ mobileSize: raw === '' ? undefined : clampRange(raw, LOGO_SIZE, undefined) });
            e.target.value = siteDraft.nav.logo?.mobileSize ?? '';
          }} />
      </div>
      <div class="ctl-field" title={ta('tip.nav.logoRadius')}>
        <span class="mini-label">{ta('lbl.rounding')}</span>
        <input type="number" class="tb-num" min="0" max="64"
          value={siteDraft.nav.logo?.radius ?? 0}
          onchange={(e) => setLogo({ radius: Number(e.target.value) })} />
      </div>
    </div>
  {/if}
  {#if siteDraft.nav.logo?.type === 'both'}
    <Setting key="order">
      <Choice label={ta('lbl.order')} value={siteDraft.nav.logo?.order ?? 'image-first'}
        options={[['image-first', ta('opt.logo.imageFirst')], ['text-first', ta('opt.logo.textFirst')]]}
        onchange={(v) => setLogo({ order: v })} />
    </Setting>
  {/if}
{/if}
