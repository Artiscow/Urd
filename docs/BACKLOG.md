# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

## Neste opp (v0.2 «tynn skive»)

- [x] Motor: implementer `render.js` (renderPage, renderSection, frameToCss med grid-til-CSS-matte)
- [x] Motor: implementer `text`- og `button`-blokkene og `color`/`gradient`-lagene (også `shape`, `glow` og `grain` ble med)
- [x] Motor: rutefinning i `urd.js` (path → side fra sideregisteret, `?page=<id>` som lokal fallback) + lasting av sidefil + migrering ved lasting
- [x] Motor: `nav.js` (bygg nav fra site.json)
- [x] Motor: preview-modus (`?preview=1`): lytt på postMessage-utkast, inkrementell rerender, meld tilbake høyde
- [x] Editor: skall med preview-iframe, klikk-og-skriv på tekstblokker
- [x] Editor: `draftStore.js` (localStorage-utkast + baseline-sammenligning)
- [x] Editor: `previewBridge.js` (postMessage-protokollen, inkl. `urd-edit` fra siden)
- [x] Editor: publiseringsknapp: samle endrede filer, POST til `/api/github/commit` (endepunktet er fortsatt stubb)
- [x] Functions: implementer `_lib/cookies.js`, `_lib/github.js` (cfg, gh, commitFiles)
- [x] Functions: implementer `login`, `callback`, `me`, `commit`, `latest` (sti-vernet enhetstestet i `tests/guard.test.mjs`)
- [x] Første `npm install`: committ `package-lock.json`
- [x] Oppsettguide: `docs/OPPSETT-PUBLISERING.md` (OAuth-app + Cloudflare-miljøvariabler + feilsøking)
- [x] Ende-til-ende-porten: rediger overskrift på deployet klon, publiser, se den live (bestått 16. juli 2026 på urdweb.pages.dev)

## Påbegynt (v0.3 «Lerretet»)

- [x] Dra, resize og slett med grid-snapping i preview (håndtak på hover; `preview-edit.js` lastes kun i preview-modus)
- [x] Blokkpalett første versjon: + Tekst / + Knapp / + Form i topplinjen (legger nederst i første seksjon)
- [x] Synlig grid-overlegg i seksjonen under dra/resize
- [x] Grid-kontroller i editoren (⌗ Grid: kolonner, radhøyde, snap av/på) - lagres i site.json-utkast og publiseres sammen med sideendringer
- [x] Grid-overstyring per seksjon i UI: «Eget grid for valgt seksjon» i ⌗ Grid-menyen
- [x] Bildeblokk med opplasting: + Bilde komprimerer til webp (maks 1600px, størrelsesvarsel), utkast som data-URL, materialiseres til media/-filer ved publisering (deterministisk filnavn). Valgfri href-prop dekker logo-bruk.
- [x] Palett: nye blokker legges i sist klikkede seksjon (aksentlinje i venstre kant viser aktiv seksjon)
- [ ] Bilde-props i UI: alt-tekst, fit, radius, lenke (hører til blokkeditoren i v0.5)
- [x] z-orden: ⬆/⬇-knapper på blokkverktøylinjen (legg foran/bak)
- [x] Seksjons-CRUD: «+ Ny seksjon» in-place med preset-valg (tom, hero, footer), flytt opp/ned og slett via seksjonsverktøylinje
- [x] Seksjonshøyde: dra-håndtak i underkant av seksjonen (snapper til radhøyden, lagres i size.minHeight)
- [ ] Bilder-preset (venter på image-blokken i paletten)
- [x] Tekstblokker vokser med innholdet under skriving (framen og om nødvendig seksjonen utvides; veksten hører til samme angre-steg som skrivingen)
- [x] Angre/gjenta (Ctrl+Z / Ctrl+Shift+Z) for ALT: flytt, resize, ny/slettet blokk og seksjon, seksjonshøyde, grid, forkast (tekst i skrivemodus bruker nettleserens egen angring)
- [x] «+ Form» er en meny: strek, pil, sirkel, rektangel, trekant
- [x] «Ren visning»-knapp: skjuler alle editeringshåndtak OG topplinjen (flytende Rediger-knapp), så siden ses i full høyde som besøkende ser den
- [x] Klikk-markering: klikk på en blokk holder fokus med varig omriss og synlige håndtak; klikk utenfor avvelger
- [ ] Fyll/farge-valg for former (fill-propen finnes i datamodellen, trenger UI - hører til blokkeditoren i v0.5)

## Funksjoner og forslag (udatert idébank)

- [ ] Tastatursnarveier i editoren (Ctrl+Z angre, piltaster for flytting, Shift for finjustering)
- [ ] Full tekst editor (størrelse, kursiv, uthevet, font (egen mappe for å legge til fonts?), farge, midstilt, venstrestilt, høyrestilt, osv)
- [ ] Automatisk bildekomprimering ved opplasting (webp, størrelsestak per blokktype; mønster fra ApeironLF)
- [ ] «Bakt HTML ved publisering» for SEO/no-JS (editoren har allerede ferdig DOM som kan snapshottes)
- [ ] Flere kjerneblokker: video/embed, ikon, kart, skjema (skjema trolig som plugin)
- [ ] Flere seksjonspresets: kalender, team/styret, FAQ, kontakt, nyheter, oppslagstavle, Hva Skjer/blokk som viser de tre neste arrangementene fra kalender moduler
- [ ] Import fra eksisterende side (i det minste en veiviser som henter tekst/bilder)
- [ ] Flerspråkstøtte for innhold (nb/nn/en-varianter av sider)
- [ ] Samtidighetsvisning i admin («Kari redigerer Hjem nå»)
- [ ] Galleri over community-maler og -plugins (urd.dev eller GitHub-topics)
- [ ] GitLab/Gitea-adapter for publiseringslaget (etter v1, se ADR-0003)
- [ ] Ekstern medialagring (Cloudflare R2) som plugin for bildetunge sider
- [ ] Butikk/Merch mal med forskjellige bestillingsmåter (Kan ta inspirasjon fra ApeironLF for en måte å gjøre det på)
- [ ] Arkiv for bestemte blokker: nyheter, oppslagstavle, styrer

## Bugs og kjente svakheter

- [x] ~~admin/index.html laster ikke editor-build automatisk~~ (utdatert: script-taggen er fast og builden committes alltid)
- [x] CSP i `_headers` strammet: script/style/connect kun 'self', bilder også data:/blob:, frame-ancestors 'self'. Boot-skriptet flyttet til egen fil for å unngå inline-unntak. VERIFISER i nettleser på deployet side (admin + publisering) før 0.3-slipp
- [ ] `python3 -m http.server` ruter ikke `path`-ene fra sideregisteret (kun `/` fungerer); dokumentert begrensning (`?page=<id>` er lokal-fallback)

## Må fikses/avklares før angitt fase

- [ ] v0.4: «dekor»-flagg på blokker (streker/sirkler som stabler dårlig i auto-avledet mobil-layout)
- [ ] v0.6: oppdaterer vs. håndredigerte Urd-eide filer (sjekksum-varsel før overskriving?)
- [ ] v0.6: GitHub Action som verifiserer at committet editor-build matcher kilden i samme commit
- [ ] v0.6: release-Action som synker `template/` til `urd-template`-repoet
- [ ] v0.6: avklar om urdweb skal skilles fra malen (eget repo laget FRA malen), siden publisering fra urdweb-admin skriver rett i eksempelinnholdet alle nye brukere får
- [ ] v0.9: Generalprøven (se VEIKART) - Urd-Design-siden + oppdatering med ekte migrering
- [x] v1.0-porten delvis innfridd allerede: første reelle migrering (sidefil v1→v2, frames til fysiske enheter) ligger i testsuiten (`tests/page-migration.test.mjs`); en blokk-props-migrering gjenstår som eget bevis
- [ ] Avklar: skal `index.html` per side genereres ved publisering, eller skal hosten rewrite alle paths til `/index.html`? (henger sammen med SEO-punktet)
- [ ] Avklar: maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)
