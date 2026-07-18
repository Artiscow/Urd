/**
 * Delt footer: redigeres ETT sted (site.footer) og vises nederst på alle
 * sider. Additivt felt fra v0.5: mangler det (eller show er false),
 * rendres ingenting - eldre sider er uendret. Teksten er linjer skilt
 * med linjeskift; hver linje blir et avsnitt.
 */

/**
 * @param {object} site site.json, allerede parset
 * @param {HTMLElement} host Elementet footeren bygges inn i
 */
export function renderFooter(site, host) {
  host.replaceChildren();
  const footer = site.footer;
  if (!footer?.show || !footer.text?.trim()) {
    host.style.display = 'none';
    return;
  }
  host.style.display = '';
  const inner = document.createElement('div');
  inner.className = `urd-footer urd-footer-${footer.align ?? 'center'}`;
  for (const line of footer.text.split('\n')) {
    if (!line.trim()) continue;
    const p = document.createElement('p');
    p.textContent = line;
    inner.appendChild(p);
  }
  host.appendChild(inner);
}
