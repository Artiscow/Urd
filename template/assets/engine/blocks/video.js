/**
 * Kjerneblokk: video/embed. Lim inn en YouTube- eller Vimeo-lenke, så
 * rendres personvernvennlig innbygging (youtube-nocookie / dnt=1).
 * CSP-en i _headers har et bevisst frame-src-unntak for akkurat disse
 * to vertene - andre embeds krever plugin og eget CSP-valg hos eieren.
 */

/** Finner innbyggings-URL for en kjent videotjeneste, ellers null. */
export function embedUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, '');

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    const id = url.pathname.startsWith('/embed/')
      ? url.pathname.slice('/embed/'.length)
      : url.pathname.startsWith('/shorts/')
        ? url.pathname.slice('/shorts/'.length)
        : url.searchParams.get('v');
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
  }
  if (host === 'youtu.be') {
    const id = url.pathname.slice(1);
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
  }
  if (host === 'vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    return /^\d+$/.test(id ?? '') ? `https://player.vimeo.com/video/${id}?dnt=1` : null;
  }
  if (host === 'player.vimeo.com') {
    return `${url.origin}${url.pathname}?dnt=1`;
  }
  return null;
}

export const videoBlock = {
  version: 1,
  label: 'Video',
  defaults: () => ({ url: '', title: 'Video' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{url: string, title?: string}} props
   * @param {object} ctx
   */
  render(el, props, ctx) {
    const src = embedUrl(props.url);
    if (!src) {
      // Uten (gyldig) URL: rolig plassholder, aldri krasj.
      const hint = document.createElement('div');
      hint.className = 'urd-video-empty';
      hint.textContent = props.url
        ? 'Ukjent videolenke (YouTube og Vimeo støttes)'
        : 'Lim inn en YouTube- eller Vimeo-lenke i Egenskaper';
      el.appendChild(hint);
      return;
    }
    const frame = document.createElement('iframe');
    frame.src = src;
    frame.title = props.title || 'Video';
    frame.setAttribute('allowfullscreen', '');
    frame.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';
    frame.loading = 'lazy';
    frame.style.cssText = 'width:100%;height:100%;border:0;display:block;';
    el.appendChild(frame);
    // I redigeringsmodus skal klikk markere blokken, ikke starte spilleren.
    if (ctx.preview && ctx.viewport !== 'mobile') {
      const shield = document.createElement('div');
      shield.className = 'urd-video-shield';
      shield.title = 'Videoen spilles på den publiserte siden';
      el.appendChild(shield);
    }
  },
};
