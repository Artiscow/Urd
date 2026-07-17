# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

Fullførte punkter fra v0.2 og v0.3 er ryddet bort ved 0.3.0-slippet (17. juli 2026); se [CHANGELOG.md](../CHANGELOG.md) for hva som ble levert.

## Neste opp (v0.4 «Responsivt, bakgrunn + animasjoner»)

- [ ] Mobilvisning i editoren (breakpoint-bytte)
- [ ] Auto-avledet mobil-stabling (én kolonne i leserekkefølge)
- [ ] Manuelle mobil-frames + mobil-tilsyn-flagget ende-til-ende (regler i SKJEMA.md)
- [ ] «Dekor»-flagg på blokker (streker/sirkler som stabler dårlig i auto-avledet mobil-layout)
- [ ] Full bakgrunnseditor: farge/gradient (også animert), glød, bildelag, korn
- [ ] Animasjonsinnstillinger per blokk/seksjon (inn-animasjoner, hover) med version+migrate-kontrakt

## Til v0.5 (UI-omlegging og paneler)

- [ ] Topplinjen er metta: legges om sammen med v0.5-panelene (sider/nav/tema) - trolig sidepanel eller ikonverktøylinje, og statusmeldinger som toast
- [ ] Blokkeditor (per-blokk-props i UI): bilde (alt/fit/radius/lenke), former (fyll/farge/tykkelse), knapp (mål/stil), tekst (justering)
- [ ] Bilder-preset for seksjoner (image-blokken finnes; preseten trenger fornuftige plassholdere)

## Funksjoner og forslag (udatert idébank)

- [ ] Tastatursnarveier i editoren: piltaster for flytting (Ctrl+Z og Shift-for-fri-plassering er levert)
- [ ] Full tekst editor (størrelse, kursiv, uthevet, font (egen mappe for å legge til fonts?), farge, midstilt, venstrestilt, høyrestilt, osv)
- [ ] «Bakt HTML ved publisering» for SEO/no-JS (editoren har allerede ferdig DOM som kan snapshottes)
- [ ] Flere kjerneblokker: video/embed, ikon, kart, skjema (skjema trolig som plugin)
- [ ] Flere seksjonspresets: kalender, team/styret, FAQ, kontakt, nyheter, oppslagstavle, Hva Skjer/blokk som viser de tre neste arrangementene fra kalender-moduler
- [ ] Import fra eksisterende side (i det minste en veiviser som henter tekst/bilder)
- [ ] Flerspråkstøtte for innhold (nb/nn/en-varianter av sider)
- [ ] Samtidighetsvisning i admin («Kari redigerer Hjem nå»)
- [ ] Galleri over community-maler og -plugins (urd.dev eller GitHub-topics)
- [ ] GitLab/Gitea-adapter for publiseringslaget (etter v1, se ADR-0003)
- [ ] Ekstern medialagring (Cloudflare R2) som plugin for bildetunge sider
- [ ] Butikk/Merch-mal med forskjellige bestillingsmåter (kan ta inspirasjon fra ApeironLF)
- [ ] Arkiv for bestemte blokker: nyheter, oppslagstavle, styrer

## Bugs og kjente svakheter

- [ ] `python3 -m http.server` ruter ikke `path`-ene fra sideregisteret (kun `/` fungerer); dokumentert begrensning (`?page=<id>` er lokal-fallback)

## Må fikses/avklares før angitt fase

- [ ] v0.6: oppdaterer vs. håndredigerte Urd-eide filer (sjekksum-varsel før overskriving?)
- [ ] v0.6: GitHub Action som verifiserer at committet editor-build matcher kilden i samme commit
- [ ] v0.6: release-Action som synker `template/` til `urd-template`-repoet
- [ ] v0.6: avklar om urdweb skal skilles fra malen (eget repo laget FRA malen), siden publisering fra urdweb-admin skriver rett i eksempelinnholdet alle nye brukere får
- [ ] v0.9: Generalprøven (se VEIKART) - Urd-Design-siden + oppdatering med ekte migrering
- [ ] v1.0: en blokk-props-migrering som eget bevis (sidefil-migreringene v1→v2→v3 ligger allerede i testsuiten)
- [ ] Avklar: skal `index.html` per side genereres ved publisering, eller skal hosten rewrite alle paths til `/index.html`? (henger sammen med SEO-punktet)
- [ ] Avklar: maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)
