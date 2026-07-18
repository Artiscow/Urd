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
- [x] Nav editor: logo/ikon i nav, og ikon/logo + egen tekst som «Hjem»-knapp (M7, 18. juli 2026; logo-typen «bilde + tekst»)
- [x] Konfliktvarsel før publisering via `latest?base=` + Historikk-panel med angre-publisering (`history`/`revert`) + oppsettsveiviser (M5, 18. juli 2026)
- [x] Bilder-preset for seksjoner (M6, 18. juli 2026; tomme bilderammer som byttes i Egenskaper - bevisst ingen eksterne plassholder-URL-er pga. CSP)
- [x] Flere seksjonspresets uten datakilder: team/styret, FAQ, kontakt (M6, 18. juli 2026)
- [x] Video/embed-blokk (YouTube/Vimeo, personvennlig, CSP-unntak for frame-src) og ikon-blokk (M6, 18. juli 2026)
- [x] Tastatursnarveier: piltaster flytter markert blokk (Shift = 1 px), Delete sletter, Esc avmarkerer (M6, 18. juli 2026)
- [x] Når man trykker på et objekt på siden åpnes «Egenskaper» seg automatisk (M6) - REVERSERT 18. juli 2026 etter eiers test; gjelder nå kun ny seksjon
- [x] Rotering på lerretet: ⟳-håndtak med 15°-snapping (Shift = fritt); størrelse har eget hjørnehåndtak fra før (M6, 18. juli 2026)
- [x] Knapper/lenker i editoren utløses ikke ved klikk - klikket markerer blokken (M6, 18. juli 2026)
- [x] Innlastning: synlige elementer dukker opp med en gang; inngangsanimasjoner spilles kun ved scroll-inn senere (M6, 18. juli 2026; egne innlastningsanimasjoner kan komme som funksjon senere)
- [x] Footer-editor: delt footer i eget panel (M7, 18. juli 2026); design-maler bygges videre i v0.6
- [x] M7: Utvikle nav-editor: justering av menypunktene (venstre/midt/høyre), logo med tre valg: tekst, bilde, bilde+tekst (med størrelse og rekkefølge), logo som «Hjem»-knapp (18. juli 2026)
- [x] M7: Delt footer (site.footer, additivt): redigeres ett sted, vises på alle sider (18. juli 2026); design-maler bygges videre i v0.6
- [x] Nav admin panel: logo-delen er sammenleggbar gruppe; full tekststil for logotekst (font/størrelse/fet/kursiv) og bildeeditor for bildelogo (høyde + avrunding) (0.5.7.3, 18. juli 2026)
- [x] M7/M8: Ordentlig og fullstendig utvikling av seksjonspresetene (0.5.9-0.5.9.3, 18. juli 2026): 19 presets i gruppert galleri med beskrivelser, utvidbare seksjoner («+ kort/rad/person»-knapp per preset med gjentakende elementer), kontraktstest + skjemavalidering av alle presets i CI. Venter på eiers testrunde før 0.5.0-gaten.
- [x] For å legge til blokk: hover over en seksjon viser «+ Legg til blokk» med meny under; valget legges i den seksjonen (0.5.7.9, 18. juli 2026)
- [x] Når man legger til en ny seksjon åpnes Egenskaper automatisk (M7, 18. juli 2026)
- [x] Full teksteditor per tekstfelt: egen font og grunnstørrelse per tekstblokk i Egenskaper (tomt = arv fra tema), pluss flytende linje for markert tekst (0.5.7.3, 18. juli 2026)
- [x] SISTE STEG FØR 0.5.0: kartlegging av inspirasjonssidene (nobaraproject, linuxmint, garudalinux, forbrukerradet, online.ntnu +/offline, abakus, broderskabet, vg, nrk) + full funksjonsinventering av ApeironLF (github.com/Apeiron-Linjeforening/ApeironLF) + nettbutikk-research (Squarespace/Wix Commerce, Snipcart, Stripe Payment Links, Vipps Go/Checkout). Gjort 18. juli 2026; funnene er sortert inn i v0.5-preset-punktet over, v0.6/v0.7-punktene under og horisonten. Wix/Squarespace/Gutenberg-editorene ble kartlagt i egen runde 18. juli 2026 (M8a).
- [x] AVKLART (M2, 17. juli 2026): publisering genererer `<slug>/index.html` per side (kopi av rot-index.html) og sletter dem for fjernede/flyttede sider - ruting virker da på alle statiske hoster, ikke bare SPA-fallback

## Til v0.6 (økosystem)

- [ ] Funksjon for flere språk for både Urd github, admin panel og på nettsidene: Norsk (Bokmål), Norsk (Nynorsk), Samisk, Svensk, Dansk, Finsk, Engelsk (Britisk), Gaelic, Spansk, Tysk, Tradisjonel Kinesisk (Taiwan), Simplifisert Kinesisk, Portogisisk, Fransk, Kanadisk (Engelsk men med "please" og overlig tekst)
- [ ] Kart- og skjema-blokk som referanse-plugins (sammen med kalender-pluginen)
- [ ] Kalender-pluginens designkrav (fra ApeironLF-kartleggingen 18. juli 2026): datakilden er en ABONNERBAR FEED (offentlig Google-kalender via API-nøkkel eller iCal/ICS-URL), ikke manuell inntasting; gjentakende arrangementer ekspanderes (singleEvents/RRULE); tre visninger (liste med dato-badge, kort-rutenett, månedskalender); kategori-chips via tittelkonvensjonen «Kategori: Tittel»; auto-uttrekk av påmeldingslenke (skjema-URL i beskrivelsen); «Abonner»-knapp (webcal + Google-cid); flere kalenderkilder + «neste arrangement»-panel; robuste tomtilstander og tydelig merkede plassholdere før feed er koblet
- [ ] Kalender-avhengige presets: kalender, nyheter, oppslagstavle, «Hva skjer» (tre neste arrangementer)
- [ ] CSP-opt-in-mekanisme for plugins: kontrollerte, synlige unntak per tjeneste (trengs for kalender-pluginens googleapis.com, og senere betalings-plugins)
- [ ] Arkiv/datablokk-mønsteret (samlinger: nyheter, oppslag, styrer) - designes sammen med kalender-referansepluginen, det er samme mønster (blokk som rendrer en samling innslag)
- [ ] Dropdown-menyer i nav med flere design (krever omlagt nav-rendering for besøkende: hover/klikk, tastatur, mobilmeny) - flyttet fra v0.5
- [ ] Nav-design videre: bakgrunnsbilde i menyen, design/hover-stiler for menypunkter, flere menystiler (f.eks. ekte «flytende» variant med luft rundt) - flyttet fra v0.5, hører sammen med dropdown-omleggingen
- [ ] Flere design for former, bokser o.l. (design-galleri; plugins skal kunne levere egne - flyttet fra idébanken)
- [ ] Søk i blokkvelgeren (gir mening når plugin-blokker gjør listen lang - flyttet fra idébanken)
- [ ] Fra editor-researchen (Squarespace/Wix/Gutenberg, 18. juli 2026): gradient-editor med frie stopp + radial, multimarkering med align/distribute, lagpanel/list view, palett-fra-bilde + genererte palettforslag, seksjonstemaer (ferdige rollesett per seksjon), lightbox («forstørr ved klikk»), duotone-aktig filter
- [ ] Fra sidekartleggingen (18. juli 2026): delt footer med kolonner (lenkelister, kontakt/adresse/org.nr, sosiale lenker) - additivt på site.footer; FAQ-akkordeon (utvid/lukk hos besøkende); ikonbibliotek med tegnede SVG-er i ikon-blokken (sosiale medier m.m.); boks-/kortstiler (skygge, kantlinje, glassmorfisme/backdrop-blur - Garuda-uttrykket); visuelle miniatyrer i preset-velgeren; publikasjonsarkiv-preset (utgaver gruppert per år, PDF-lenker - hører til arkiv/datablokk-mønsteret); hero-galleri (bildekarusell som bakgrunnslag); tabs/filter over kortliste (vurderes mot plugin-API-et)
- [ ] Plugin-/mal-oppdagbarhet: etabler GitHub-topic-konvensjon (`urd-plugin`, `urd-mal`); galleri-nettstedet kommer etter v1

## Til v0.7 (finpuss + butikk)

- [ ] Butikk uten betalingsgateway som KJERNEFUNKSJON (eiers valg 18. juli 2026, ApeironLF-modellen): produktkort-blokk med varianter (størrelse/farge, pris + evt. medlemspris, badge, bildegalleri der fargevalg bytter bilde), handlekurv-blokk (localStorage + skuff med antall-badge), kasse = bestillingsskjema (navn/e-post/telefon/kommentar + honeypot) som går til e-post (mailto, null oppsett) eller valgfritt endepunkt (Apps Script/Pages Function), betaling via Vipps-nummer-instruks. Helt avhengighetsfri, katalogen git-eid. Bygges PÅ v0.6-datablokk-mønsteret (produktkatalog = samling). Må lande før v1: v1.0-porten (gjenskape ApeironLF) forutsetter den.
- [ ] Produktkort-preset fra v0.5 («kjøp = ekstern lenke») oppgraderes til å kunne peke på ekte produktblokker

## Etter v1.0 (horisont)

- [ ] Import fra eksisterende side (veiviser som henter tekst/bilder)
- [ ] Flerspråkstøtte for innhold (nb/nn/en-varianter; migreringskontrakten gjør at den kan komme når som helst)
- [ ] Samtidighetsvisning i admin («Kari redigerer Hjem nå») - krever sanntidsinfra utover statisk+functions; konfliktvarselet i v0.5 dekker det viktigste
- [ ] Galleri-nettsted over community-maler og -plugins (urd.dev; forutsetter et community)
- [ ] GitLab/Gitea-adapter for publiseringslaget (se ADR-0003)
- [ ] Ekstern medialagring (Cloudflare R2) som plugin for bildetunge sider
- [ ] Ekte betalings-kasse for butikken (Snipcart-modellen med git-eid katalog + CSP-opt-in, eller Vipps Checkout via Pages Function) - kun ved reell etterspørsel; selve butikken (uten gateway) kommer i v0.7
- [ ] Utenfor scope for kjernen (fra kartleggingen 18. juli 2026): innlogging/medlemsområde, P2P-bruktmarked (ApeironLFs «Kjøp & bytte»), fulltekstsøk på siden (krever avhengighet à la minisearch - evt. community-plugin), sanntidsfeeds/personalisering. Krever server/CMS eller avhengigheter; Urd er statisk og avhengighetsfri

## Funksjoner og Forslag

- [ ] Mobil-opplevelsen bør revurderes som HELT egen versjon av siden (eiers observasjon 17. juli 2026 etter å ha håndlaget desktop+mobil: dagens kobling desktop→auto/manuell mobil er vanskelig å jobbe med). Kandidat: v0.7-vurdering; krever design før implementasjon.
- [ ] Mobil-tilsyn-varselet må bli tydeligere: SI hva som skal gjøres og HVOR (hvilken seksjon, hvilken visning). I dag: gul chip + gult omriss, men ingen veiviser. Kandidat: klikk på chipen hopper til seksjonen i mobilvisning og viser en kort forklaring med ✓-knappen. TAS SAMMEN MED v0.7-mobilrevurderingen over, så arbeidet ikke gjøres to ganger.
- [ ] 📵 (dekor/skjult på mobil) gjelder kun AUTOMATISK mobil-layout og oppleves som «virker ikke» i manuelle seksjoner. Avklar: skal manuelle seksjoner også kunne skjule blokker per blokk (f.eks. 📵 = ikke rendret i manuell modus også)? TAS SAMMEN MED v0.7-mobilrevurderingen over.
- [x] Miniikon for nettsiden i tabs og bokmerker (0.5.8.7, 18. juli 2026: opplastbart nettstedsikon i Tema-panelet + Urd-merke som standard i mal og admin)
- [ ] Logo/ikon for nettsider
- [x] Legge til stil til avhukingsbokser i admin (muligens moderne knapp som er animert venstre/høyre istedenfor sjekk av/på)
- [ ] Mulighet til å legge til påkse egg (hemmeligheter) på nettsidene

    
## Bugs og kjente svakheter

- [ ] `python3 -m http.server` ruter ikke `path`-ene fra sideregisteret (kun `/` fungerer); dokumentert begrensning (`?page=<id>` er lokal-fallback)
- [ ] Angring av en merge-commit gjenoppretter første forelders innholdstilstand (dokumentert i revert.js); sjelden via admin-flyten, men mulig når noen også jobber via git
- [ ] Etter angre-publisering kreves omlasting av admin før ny publisering (bevisst sperre; en bedre flyt er å laste inn den gjenopprettede tilstanden automatisk etter deploy)
- [ ] Historikk-panelet på Urds eget monorepo viser også utviklingscommits som rører template/content (eksempelinnholdet); løses naturlig av urd-template-splitten i v0.6
- [ ] Oppsettsveiviserens utløser er streng-matching på malens standardnavn («Min forening») i både site.json og App.svelte; bør bli et eksplisitt signal i site.json ved v0.6-splitten

- [ ] Utheving (markeringstusj) lagrer fargen som fast verdi i teksten - den følger IKKE med hvis temaets aksentfarge endres etterpå (iboende i contenteditable-tilnærmingen; en var()-basert span kan vurderes i v0.6)
- [ ] Ctrl+D (dupliser) virker når fokus står i forhåndsvisningen og en blokk er markert; med fokus i admin-panelene går snarveien til nettleseren (bokmerke)

## Teknisk opprydding (kandidater til v0.6)

- [ ] Delt auth-prolog for muterende functions-endepunkter (cfg/cookie/currentUser/isAllowedLogin er duplisert i commit.js og revert.js; en requirePublisher-hjelper i _lib)
- [ ] Konflikt- og angre-dialogene bruker nettleserens confirm(); bør over på editorens eget modalsystem (setup-kortet viser mønsteret)

## Må fikses/avklares før angitt fase

- [ ] v0.6: oppdaterer vs. håndredigerte Urd-eide filer (sjekksum-varsel før overskriving?)
- [ ] v0.6: GitHub Action som verifiserer at committet editor-build matcher kilden i samme commit
- [ ] v0.6: release-Action som synker `template/` til `urd-template`-repoet
- [ ] v0.6: avklar om urdweb skal skilles fra malen (eget repo laget FRA malen), siden publisering fra urdweb-admin skriver rett i eksempelinnholdet alle nye brukere får
- [ ] v0.9: Generalprøven (se VEIKART) - Urd-Design-siden + oppdatering med ekte migrering
- [ ] v0.9: rydde opp og fullføre BRUKERVEILEDNING.md (startet i v0.5; skal dekke alt editoren kan, med skjermbilder?)
- [ ] v1.0: en blokk-props-migrering som eget bevis (sidefil-migreringene v1→v2→v3 ligger allerede i testsuiten)
- [ ] v0.7: avklar maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)
