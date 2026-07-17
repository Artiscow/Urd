# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

Fullførte punkter fra v0.2 og v0.3 er ryddet bort ved 0.3.0-slippet (17. juli 2026); se [CHANGELOG.md](../CHANGELOG.md) for hva som ble levert.

## Neste opp (v0.4 «Responsivt»)

- [x] Mobilvisning i editoren (💻/📱-toggle; iframen smales til 390px, motorens matchMedia bytter modus selv)
- [x] Auto-avledet mobil-stabling (ekte flyt i én kolonne i leserekkefølge, tekst får naturlig høyde; besøkende får det automatisk via matchMedia)
- [x] Manuelle mobil-frames (første mobil-dra materialiserer hele seksjonen) + mobil-tilsyn-flagget ende-til-ende (gul markering, teller-chip, ✓ gjennomgått, ↺ tilbake til auto)
- [x] «Dekor»-flagg på blokker (✦-toggle; former er dekor som standard og utelates fra auto-stabling)
- [ ] Testrunde på urdweb (porten: desktop-side ser fornuftig ut på mobil uten inngripen; tilsyn-flagget fanger drift) før 0.4.0-bump

## Til v0.5 (paneler og UI-omlegging)

- [ ] Ny editor-layout FØRST: sidepanel/ikonverktøylinje i stedet for metta topplinje, statusmeldinger som toast
- [ ] Blokkeditor (per-blokk-props i UI): bilde (alt/fit/radius/lenke), former (fyll/farge/tykkelse), knapp (mål/stil), tekst (justering)
- [ ] Full teksteditor i blokkeditoren: størrelse, fet/kursiv, farge, font (flyttet fra idébanken - det er panel-UI)
- [ ] Seksjonseditor med full bakgrunnseditor: farge/gradient (også animert), glød, bildelag, korn (flyttet fra v0.4)
- [ ] Animasjonsinnstillinger per blokk/seksjon (inn-animasjoner, hover) med version+migrate-kontrakt (flyttet fra v0.4)
- [ ] Konfliktvarsel før publisering: bruk `latest?base=`-endepunktet (serverdelen har vært klar siden v0.2) til å varsle «noen andre har publisert siden du lastet»
- [ ] Bilder-preset for seksjoner (image-blokken finnes; preseten trenger fornuftige plassholdere)
- [ ] Flere seksjonspresets uten datakilder: team/styret, FAQ, kontakt (rene datafabrikker)
- [ ] Video/embed-blokk og ikon-blokk (trenger props-UI fra blokkeditoren; embeds krever bevisst CSP-unntak for frame-src, f.eks. YouTube)
- [ ] Tastatursnarveier: piltaster flytter markert blokk (Shift = finjustering), Delete sletter, Esc avmarkerer
- [ ] AVKLARES FØR SIDEPANELET: nye sider trenger fungerende ruting per host. Cloudflare Pages faller tilbake til index.html (verifisert: /om-oss virker på urdweb), men GitHub Pages m.fl. gjør ikke - generere index.html per side ved publisering, eller dokumentere host-krav?

## Til v0.6 (økosystem)

- [ ] Kart- og skjema-blokk som referanse-plugins (sammen med kalender-pluginen)
- [ ] Kalender-avhengige presets: kalender, nyheter, oppslagstavle, «Hva skjer» (tre neste arrangementer)
- [ ] Arkiv/datablokk-mønsteret (samlinger: nyheter, oppslag, styrer) - designes sammen med kalender-referansepluginen, det er samme mønster (blokk som rendrer en samling innslag)
- [ ] Plugin-/mal-oppdagbarhet: etabler GitHub-topic-konvensjon (`urd-plugin`, `urd-mal`); galleri-nettstedet kommer etter v1

## Etter v1.0 (horisont)

- [ ] Import fra eksisterende side (veiviser som henter tekst/bilder)
- [ ] Flerspråkstøtte for innhold (nb/nn/en-varianter; migreringskontrakten gjør at den kan komme når som helst)
- [ ] Samtidighetsvisning i admin («Kari redigerer Hjem nå») - krever sanntidsinfra utover statisk+functions; konfliktvarselet i v0.5 dekker det viktigste
- [ ] Galleri-nettsted over community-maler og -plugins (urd.dev; forutsetter et community)
- [ ] GitLab/Gitea-adapter for publiseringslaget (se ADR-0003)
- [ ] Ekstern medialagring (Cloudflare R2) som plugin for bildetunge sider
- [ ] Butikk/Merch-mal med bestillingsintegrasjoner (kan ta inspirasjon fra ApeironLF)

## Funksjoner og Forslag

    
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
