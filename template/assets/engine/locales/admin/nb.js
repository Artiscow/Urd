/**
 * Admin-tekster, norsk bokmål (basen: lastes alltid først, andre språk
 * legges oppå, så manglende nøkler faller tilbake hit). Kjøretids-lastes
 * av editorens main.js og av preview-chromen - aldri bundlet, så en
 * oversettelsesendring krever ingen bygging. Paritetstesten
 * (tests/i18n.test.mjs) holder språkfilene i synk.
 */
export default {
  lang: 'nb',
  strings: {
    'panel.pages': 'Sider',
    'panel.blocks': 'Blokker',
    'panel.properties': 'Egenskaper',
    'panel.grid': 'Grid',
    'panel.site': 'Nettsted',
    'panel.theme': 'Tema',
    'panel.nav': 'Nav',
    'panel.footer': 'Footer',
    'panel.collections': 'Samlinger',
    'panel.plugins': 'Plugins',
    'panel.history': 'Historikk',
    'topbar.adminTheme.title': 'Adminens fargetema (kun editoren, ikke nettsiden din)',
    'topbar.language.title': 'Admin-språk: Automatisk følger enhetens språk, og et valg huskes i denne nettleseren',
    'lang.auto': 'Automatisk (følg enheten)',
    'site.langLabel': 'Språk på nettsiden',
    'site.langTitle': 'Styrer motorens egne tekster hos besøkende (knapper, datoer, skjemameldinger) og sidens lang-attributt. Innholdet ditt oversettes ikke.',
  },
};
