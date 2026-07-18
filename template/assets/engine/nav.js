/**
 * Bygger navigasjonen fra site.json - sideregisteret (site.pages) og
 * nav-dataene (site.nav). Ingenting hardkodes: nav-elementer med `page`
 * slår opp path i sideregisteret; elementer med `href` er eksterne lenker.
 */

/**
 * @param {object} site site.json, allerede parset
 * @param {HTMLElement} host Element navigasjonen bygges inn i
 */
export function renderNav(site, host) {
  host.replaceChildren();
  const nav = document.createElement('nav');
  // layout (additivt fra v0.5): hvor menypunktene står; logoen er alltid
  // først og fungerer som «Hjem»-knapp.
  nav.className = `urd-nav urd-nav-${site.nav.layout ?? 'right'}`;

  const logoDef = site.nav.logo ?? { type: 'text', value: site.site.title };
  const logo = document.createElement('a');
  logo.className = 'urd-nav-logo';
  logo.href = '/';
  logo.title = 'Til forsiden';

  const logoImg = (src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = site.site.title;
    img.style.height = `${logoDef.size ?? 32}px`;
    return img;
  };
  const logoText = () => document.createTextNode(logoDef.value || site.site.title);

  if (logoDef.type === 'image') {
    logo.appendChild(logoImg(logoDef.value));
  } else if (logoDef.type === 'both' && logoDef.image) {
    // Bilde + tekst, i valgt rekkefølge.
    if ((logoDef.order ?? 'image-first') === 'image-first') {
      logo.append(logoImg(logoDef.image), logoText());
    } else {
      logo.append(logoText(), logoImg(logoDef.image));
    }
  } else {
    logo.appendChild(logoText());
  }
  nav.appendChild(logo);

  const list = document.createElement('ul');
  list.className = 'urd-nav-list';
  for (const item of site.nav.items) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = item.label;
    if (item.page) {
      const target = site.pages.find((p) => p.id === item.page);
      a.href = target ? target.path : '#';
      if (!target) console.warn(`Urd: nav-element peker på ukjent side '${item.page}'`);
    } else {
      a.href = item.href;
      a.rel = 'noopener';
    }
    li.appendChild(a);
    list.appendChild(li);
  }
  nav.appendChild(list);
  host.appendChild(nav);
}
