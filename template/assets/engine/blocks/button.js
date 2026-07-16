/**
 * Kjerneblokk: knapp. Lenker til en side i sideregisteret (page) eller
 * ekstern URL (href). page slås opp i ctx.site.pages ved render.
 */
export const buttonBlock = {
  version: 1,
  label: 'Knapp',
  defaults: () => ({ label: 'Les mer', page: null, href: null, style: 'primary' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{label: string, page: string|null, href: string|null, style: string}} props
   * @param {{site: object}} ctx
   */
  render(el, props, ctx) {
    const a = document.createElement('a');
    a.className = `urd-button urd-button-${props.style}`;
    a.textContent = props.label;
    if (props.page) {
      const target = ctx.site.pages.find((p) => p.id === props.page);
      a.href = target ? target.path : '#';
      if (!target) console.warn(`Urd: knappen peker på ukjent side '${props.page}'`);
    } else {
      a.href = props.href ?? '#';
    }
    el.appendChild(a);
  },
};
