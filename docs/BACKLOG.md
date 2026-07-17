# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

Fullførte punkter fra v0.2 og v0.3 er ryddet bort ved 0.3.0-slippet (17. juli 2026); se [CHANGELOG.md](../CHANGELOG.md) for hva som ble levert.

## Neste opp (v0.5 «Panelene og nettstedet rundt siden»)

Se «Til v0.5»-seksjonen under; fasen starter med den nye editor-layouten.
(v0.4 «Responsivt» levert 17. juli 2026; se CHANGELOG.)

## Til v0.5 (paneler og UI-omlegging)

- [x] Ny editor-layout FØRST: panelvelger med tekstknapper + sidepanel i stedet for metta topplinje, statusmeldinger som toast (M1, 17. juli 2026)
- [x] Blokkeditor (per-blokk-props i UI): bilde (alt/fit/radius/lenke), former (fyll/farge/tykkelse), knapp (mål/stil), tekst (justering) (M3, 17. juli 2026)
- [x] Teksteditor: flytende linje over markert tekst med fet/kursiv/overskrifter/temafarger (M3, 17. juli 2026; fontvalg styres av Tema-panelet, egne skriftstørrelser utsatt)
- [x] Seksjonseditor med full bakgrunnseditor: farge/gradient (også animert), glød, bildelag, korn (M4, 18. juli 2026)
- [x] Animasjonsinnstillinger per blokk/seksjon (fade-in/slide-up/zoom-in/hover-lift) med version+migrate-kontrakt (M4, 18. juli 2026)
- [ ] Konfliktvarsel før publisering: bruk `latest?base=`-endepunktet (serverdelen har vært klar siden v0.2) til å varsle «noen andre har publisert siden du lastet»
- [ ] Bilder-preset for seksjoner (image-blokken finnes; preseten trenger fornuftige plassholdere)
- [ ] Flere seksjonspresets uten datakilder: team/styret, FAQ, kontakt (rene datafabrikker)
- [ ] Video/embed-blokk og ikon-blokk (trenger props-UI fra blokkeditoren; embeds krever bevisst CSP-unntak for frame-src, f.eks. YouTube)
- [ ] Tastatursnarveier: piltaster flytter markert blokk (Shift = finjustering), Delete sletter, Esc avmarkerer
- [x] AVKLART (M2, 17. juli 2026): publisering genererer `<slug>/index.html` per side (kopi av rot-index.html) og sletter dem for fjernede/flyttede sider - ruting virker da på alle statiske hoster, ikke bare SPA-fallback

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

- [ ] Mobil-opplevelsen bør revurderes som HELT egen versjon av siden (eiers observasjon 17. juli 2026 etter å ha håndlaget desktop+mobil: dagens kobling desktop→auto/manuell mobil er vanskelig å jobbe med). Kandidat: v0.7-vurdering; krever design før implementasjon.
- [ ] Mobil-tilsyn-varselet må bli tydeligere: SI hva som skal gjøres og HVOR (hvilken seksjon, hvilken visning). I dag: gul chip + gult omriss, men ingen veiviser. Kandidat: klikk på chipen hopper til seksjonen i mobilvisning og viser en kort forklaring med ✓-knappen.
- [ ] 📵 (dekor/skjult på mobil) gjelder kun AUTOMATISK mobil-layout og oppleves som «virker ikke» i manuelle seksjoner. Avklar: skal manuelle seksjoner også kunne skjule blokker per blokk (f.eks. 📵 = ikke rendret i manuell modus også)?
- [ ] Flere forskjellige design for former, bokser o.l

    
## Bugs og kjente svakheter

- [ ] `python3 -m http.server` ruter ikke `path`-ene fra sideregisteret (kun `/` fungerer); dokumentert begrensning (`?page=<id>` er lokal-fallback)

## Må fikses/avklares før angitt fase

- [ ] v0.6: oppdaterer vs. håndredigerte Urd-eide filer (sjekksum-varsel før overskriving?)
- [ ] v0.6: GitHub Action som verifiserer at committet editor-build matcher kilden i samme commit
- [ ] v0.6: release-Action som synker `template/` til `urd-template`-repoet
- [ ] v0.6: avklar om urdweb skal skilles fra malen (eget repo laget FRA malen), siden publisering fra urdweb-admin skriver rett i eksempelinnholdet alle nye brukere får
- [ ] v0.9: Generalprøven (se VEIKART) - Urd-Design-siden + oppdatering med ekte migrering
- [ ] v0.9: rydde opp og fullføre BRUKERVEILEDNING.md (startet i v0.5; skal dekke alt editoren kan, med skjermbilder?)
- [ ] v1.0: en blokk-props-migrering som eget bevis (sidefil-migreringene v1→v2→v3 ligger allerede i testsuiten)
- [ ] v0.7: avklar maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)
