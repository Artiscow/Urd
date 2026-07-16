# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

## Neste opp (v0.2 «tynn skive»)

- [ ] Motor: implementer `render.js` (renderPage, renderSection, frameToCss med grid-til-CSS-matte)
- [ ] Motor: implementer `text`- og `button`-blokkene og `color`/`gradient`-lagene
- [ ] Motor: rutefinning i `urd.js` (path → side fra sideregisteret) + lasting av sidefil + migrering ved lasting
- [ ] Motor: `nav.js` (bygg nav fra site.json)
- [ ] Motor: preview-modus (`?preview=1`): lytt på postMessage-utkast, inkrementell rerender, meld tilbake høyde
- [ ] Editor: skall med preview-iframe, klikk-og-skriv på tekstblokker
- [ ] Editor: `draftStore.js` (localStorage-utkast + baseline-sammenligning)
- [ ] Editor: `previewBridge.js` (postMessage-protokollen)
- [ ] Editor: publiseringsknapp: samle endrede filer, POST til `/api/github/commit`
- [ ] Functions: implementer `_lib/cookies.js`, `_lib/github.js` (cfg, gh, commitFiles)
- [ ] Functions: implementer `login`, `callback`, `me`, `commit`, `latest`
- [ ] Første `npm install`: committ `package-lock.json`
- [ ] Oppsettguide: kort md for å sette opp OAuth-app + Cloudflare-miljøvariabler (generaliser fra ApeironLF-dokumentet)
- [ ] Ende-til-ende-porten: rediger overskrift på deployet klon, publiser, se den live

## Funksjoner og forslag (udatert idébank)

- [ ] Tastatursnarveier i editoren (Ctrl+Z angre, piltaster for flytting, Shift for finjustering)
- [ ] Automatisk bildekomprimering ved opplasting (webp, størrelsestak per blokktype; mønster fra ApeironLF)
- [ ] «Bakt HTML ved publisering» for SEO/no-JS (editoren har allerede ferdig DOM som kan snapshottes)
- [ ] Flere kjerneblokker: video/embed, ikon, kart, skjema (skjema trolig som plugin)
- [ ] Flere seksjonspresets: kalender, team/styret, FAQ, kontakt
- [ ] Import fra eksisterende side (i det minste en veiviser som henter tekst/bilder)
- [ ] Flerspråkstøtte for innhold (nb/nn/en-varianter av sider)
- [ ] Samtidighetsvisning i admin («Kari redigerer Hjem nå»)
- [ ] Galleri over community-maler og -plugins (urd.dev eller GitHub-topics)
- [ ] GitLab/Gitea-adapter for publiseringslaget (etter v1, se ADR-0003)
- [ ] Ekstern medialagring (Cloudflare R2) som plugin for bildetunge sider

## Bugs og kjente svakheter

- [ ] `template/admin/index.html` bytter ikke automatisk til å laste `./assets/editor.js` når editoren er bygget; byggesteget bør skrive inn script-taggen (eller skallet bør feature-sjekke at filen finnes)
- [ ] `_headers` er minimal; CSP for /admin og resten må strammes til når publiseringsflyten lander (v0.2)
- [ ] `python3 -m http.server` ruter ikke `path`-ene fra sideregisteret (kun `/` fungerer); dokumentert begrensning, men bør nevnes i UTVIKLING.md-oppskriften når ruting lander

## Må fikses/avklares før angitt fase

- [ ] v0.4: «dekor»-flagg på blokker (streker/sirkler som stabler dårlig i auto-avledet mobil-layout)
- [ ] v0.6: oppdaterer vs. håndredigerte Urd-eide filer (sjekksum-varsel før overskriving?)
- [ ] v0.6: GitHub Action som verifiserer at committet editor-build matcher kilden i samme commit
- [ ] v0.6: release-Action som synker `template/` til `urd-template`-repoet
- [ ] v1.0: minst én reell v1→v2-blokkmigrering i testsuiten (porten i VEIKART)
- [ ] Avklar: skal `index.html` per side genereres ved publisering, eller skal hosten rewrite alle paths til `/index.html`? (henger sammen med SEO-punktet)
- [ ] Avklar: maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)
