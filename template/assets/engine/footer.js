/**
 * Delt footer: redigeres ETT sted (site.footer) og vises nederst på alle
 * sider. Additivt felt fra v0.5. To former: den gamle enkle (kun text-linjer,
 * rendres byte-likt som før) og den rike (merkevare, kolonner, sosiale lenker,
 * copyright, bakgrunnsfarge). Ren logikk i footer-model.js.
 */

import { resolveColor } from './theme.js';
import { iconSvg } from './icons.js';
import {
  footerBrand,
  footerColumns,
  footerSocial,
  footerBaseline,
  hasRichFooter,
} from './footer-model.js';

/** Sosial-raden: ett anker per lenke, ikonet er motorens egen tegnede SVG. */
function buildSocial(social) {
  const row = document.createElement('div');
  row.className = 'urd-footer-social';
  for (const s of social) {
    const svg = iconSvg(s.icon);
    if (!svg) continue; // ukjent ikon-id droppes stille
    const a = document.createElement('a');
    a.className = 'urd-footer-soc';
    a.href = s.url;
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', s.icon);
    // iconSvg er motorens egen, selvforfattede SVG (samme mønster som
    // blocks/icon.js) - ikke brukerinnhold, trygt å sette som innerHTML.
    a.innerHTML = svg;
    row.appendChild(a);
  }
  return row;
}

/**
 * @param {object} site site.json, allerede parset
 * @param {HTMLElement} host Elementet footeren bygges inn i
 */
export function renderFooter(site, host) {
  host.replaceChildren();
  host.style.removeProperty('background');
  const footer = site.footer;
  if (!footer?.show) {
    host.style.display = 'none';
    return;
  }

  const rich = hasRichFooter(site);
  const baseline = footerBaseline(site);

  // Påskrudd, men uten innhold: en synlig, men HELT tom footer. Ingen tekst,
  // ingen plassholder, ingen sidetittel - den fylles først når noe legges inn i
  // Footer-panelet. (show av gir ingen footer i det hele tatt, over.)
  if (!rich && !baseline.length) {
    host.style.display = '';
    const inner = document.createElement('div');
    inner.className = 'urd-footer urd-footer-empty';
    host.appendChild(inner);
    return;
  }

  // Gammel form: kun text-linjer. Byte-likt som før, uten kolonner/social.
  if (!rich) {
    host.style.display = '';
    const inner = document.createElement('div');
    inner.className = `urd-footer urd-footer-${footer.align ?? 'center'}`;
    for (const line of (footer.text ?? '').split('\n')) {
      if (!line.trim()) continue;
      const p = document.createElement('p');
      p.textContent = line;
      inner.appendChild(p);
    }
    host.appendChild(inner);
    return;
  }

  // Rik form.
  const brand = footerBrand(site);
  const columns = footerColumns(site);
  const social = footerSocial(site);
  host.style.display = '';

  const inner = document.createElement('div');
  inner.className = `urd-footer urd-footer-rich urd-footer-${footer.align ?? 'left'}`;
  // Bakgrunnsfarge ligger på den fullbredde .urd-footer (som standard-regelen
  // i base.css); default = temaets surface når footer.bg ikke er satt.
  if (footer.bg) inner.style.background = resolveColor(footer.bg);

  const wrap = document.createElement('div');
  wrap.className = 'urd-footer-wrap';

  if (brand || columns.length || social.length) {
    const top = document.createElement('div');
    top.className = 'urd-footer-top';

    if (brand || social.length) {
      const brandCol = document.createElement('div');
      brandCol.className = 'urd-footer-brand';
      if (brand) {
        const title = document.createElement('div');
        title.className = 'urd-footer-brand-title';
        title.textContent = brand.title;
        brandCol.appendChild(title);
        if (brand.tagline) {
          const tagline = document.createElement('p');
          tagline.className = 'urd-footer-tagline';
          tagline.textContent = brand.tagline;
          brandCol.appendChild(tagline);
        }
      }
      if (social.length) brandCol.appendChild(buildSocial(social));
      top.appendChild(brandCol);
    }

    for (const col of columns) {
      const c = document.createElement('div');
      c.className = 'urd-footer-col';
      if (col.title) {
        const h = document.createElement('h4');
        h.textContent = col.title;
        c.appendChild(h);
      }
      const ul = document.createElement('ul');
      for (const link of col.links) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = link.label;
        a.href = link.href;
        if (link.external) a.rel = 'noopener noreferrer';
        li.appendChild(a);
        ul.appendChild(li);
      }
      c.appendChild(ul);
      top.appendChild(c);
    }
    wrap.appendChild(top);
  }

  if (baseline.length) {
    const base = document.createElement('div');
    base.className = 'urd-footer-baseline';
    for (const line of baseline) {
      const span = document.createElement('span');
      span.textContent = line;
      base.appendChild(span);
    }
    wrap.appendChild(base);
  }

  inner.appendChild(wrap);
  host.appendChild(inner);
}
