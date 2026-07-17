# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

Fullførte punkter fra v0.2 og v0.3 er ryddet bort ved 0.3.0-slippet (17. juli 2026); se [CHANGELOG.md](../CHANGELOG.md) for hva som ble levert.

## Neste opp (v0.4 «Responsivt»)

- [ ] Mobilvisning i editoren (breakpoint-bytte)
- [ ] Auto-avledet mobil-stabling (én kolonne i leserekkefølge)
- [ ] Manuelle mobil-frames + mobil-tilsyn-flagget ende-til-ende (regler i SKJEMA.md)
- [ ] «Dekor»-flagg på blokker (streker/sirkler som stabler dårlig i auto-avledet mobil-layout)

## Til v0.5 (paneler og UI-omlegging)

- [ ] Ny editor-layout FØRST: sidepanel/ikonverktøylinje i stedet for metta topplinje, statusmeldinger som toast
- [ ] Blokkeditor (per-blokk-props i UI): bilde (alt/fit/radius/lenke), former (fyll/farge/tykkelse), knapp (mål/stil), tekst (justering)
- [ ] Full teksteditor i blokkeditoren: størrelse, fet/kursiv, farge, font (flyttet fra idébanken - det er panel-UI)
- [ ] Seksjonseditor med full bakgrunnseditor: farge/gradient (også animert), glød, bildelag, korn (flyttet fra v0.4)
- [ ] Animasjonsinnstillinger per blokk/seksjon (inn-animasjoner, hover) med version+migrate-kontrakt (flyttet fra v0.4)
- [ ] Konfliktvarsel før publisering: bruk `latest?base=`-endepunktet (serverdelen har vært klar siden v0.2) til å varsle «noen andre har publisert siden du lastet»
- [ ] Bilder-preset for seksjoner (image-blokken finnes; preseten trenger fornuftige plassholdere)
- [ ] AVKLARES FØR SIDEPANELET: nye sider trenger fungerende ruting per host. Cloudflare Pages faller tilbake til index.html (verifisert: /om-oss virker på urdweb), men GitHub Pages m.fl. gjør ikke - generere index.html per side ved publisering, eller dokumentere host-krav?

## Funksjoner og forslag (udatert idébank)

- [ ] Tastatursnarveier i editoren: piltaster for flytting (Ctrl+Z og Shift-for-fri-plassering er levert)
- [ ] «Bakt HTML ved publisering» for SEO/no-JS (hører til v0.7 Optimalisering, se VEIKART)
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
- [ ] v0.7: avklar maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)
