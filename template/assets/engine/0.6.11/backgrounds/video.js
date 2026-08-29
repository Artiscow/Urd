/**
 * Bakgrunnslag: video (funksjonskartet C6). Selvhostet mp4/webm-loop fra
 * media/ (eller en data-URL for upubliserte opplastinger i utkast;
 * publisering materialiserer den til fil, samme flyt som bildelaget).
 * Personvennlig: filen er git-eid, ingen tredjepartsverter.
 *
 * Avspilling: autoplay krever muted + playsinline; loopen pauses utenfor
 * viewporten via delt IntersectionObserver (logikk, ikke animasjon,
 * ADR-0011). Ved prefers-reduced-motion spilles aldri video: plakatbildet
 * vises som stillbilde, og uten plakat utelates laget så lagene under
 * synes - alltid en sluttilstand, aldri skjult innhold.
 */

import { isSafeImage } from '../nav-model.js';
import { bgPosition, mountLayerParallax } from './image.js';

/* Kilden går rett inn i video-elementets src: samme ankrede vokter-mønster
   som bildelagene (isSafeImage), begrenset til media/-stier og video-data-URL-er. */
const SAFE_VIDEO_RE = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;

/** @param {unknown} src @returns {boolean} */
export function isSafeVideo(src) {
  return typeof src === 'string' && SAFE_VIDEO_RE.test(src);
}

// Delt observer: bakgrunnsvideoer spiller kun mens seksjonen er i viewporten.
// Frakoblede elementer (etter re-render) lukes ut i callbacken.
let videoObserver = null;
function observeVideo(video) {
  videoObserver ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.target.isConnected) {
        videoObserver.unobserve(entry.target);
        continue;
      }
      // play() kan avvises av autoplay-policyen; da står plakaten/første
      // ramme, som er en ren sluttilstand.
      if (entry.isIntersecting) entry.target.play().catch(() => {});
      else entry.target.pause();
    }
  }, { threshold: 0 });
  videoObserver.observe(video);
}

const fillStyle = (el, fit, x, y) => {
  el.style.position = 'absolute';
  el.style.inset = '0';
  el.style.width = '100%';
  el.style.height = '100%';
  el.style.objectFit = fit === 'contain' ? 'contain' : 'cover';
  el.style.objectPosition = bgPosition(x, y);
};

export const videoLayer = {
  version: 1,
  label: 'Video',
  labelKey: 'bgLayer.video',
  defaults: () => ({ src: '', poster: '', fit: 'cover', x: 0.5, y: 0.5, opacity: 1, parallax: 0 }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{src: string, poster?: string, fit?: 'cover'|'contain', x?: number, y?: number, opacity?: number, parallax?: number}} props
   */
  render(el, props) {
    if (!isSafeVideo(props.src)) return;
    el.style.opacity = String(props.opacity ?? 1);

    // Redusert bevegelse: plakatbildet som stillbilde (samme utsnitt).
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      if (!isSafeImage(props.poster)) return;
      const still = document.createElement('img');
      still.className = 'urd-bg-video-plakat';
      still.alt = '';
      still.setAttribute('aria-hidden', 'true');
      still.src = props.poster;
      fillStyle(still, props.fit, props.x, props.y);
      el.appendChild(still);
      return;
    }

    const video = document.createElement('video');
    video.className = 'urd-bg-video';
    video.muted = true;
    video.setAttribute('muted', '');
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    // Observeren starter avspillingen (aldri autoplay-attributtet), og med
    // preload=metadata lastes selve filmen først når seksjonen nærmer seg
    // viewporten - en video under folden koster ellers hele filen ved last.
    video.preload = 'metadata';
    video.disablePictureInPicture = true;
    // Ren dekor: bakgrunnen skal aldri annonseres av skjermlesere.
    video.setAttribute('aria-hidden', 'true');
    if (isSafeImage(props.poster)) video.poster = props.poster;
    video.src = props.src;
    fillStyle(video, props.fit, props.x, props.y);
    el.appendChild(video);
    observeVideo(video);
    // Parallax (additivt): bildelagets maskineri; cover overskanner kantene,
    // contain forskyves fritt med luft rundt.
    if (props.parallax > 0) mountLayerParallax(video, props.parallax, 0, props.fit === 'contain' ? 'contain' : 'cover');
  },
};
