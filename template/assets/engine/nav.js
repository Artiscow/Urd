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
  nav.className = 'urd-nav';

  const logo = document.createElement('a');
  logo.className = 'urd-nav-logo';
  logo.href = '/';
  if (site.nav.logo?.type === 'image') {
    const img = document.createElement('img');
    img.src = site.nav.logo.value;
    img.alt = site.site.title;
    logo.appendChild(img);
  } else {
    logo.textContent = site.nav.logo?.value ?? site.site.title;
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
