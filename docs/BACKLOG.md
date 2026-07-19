# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

Fullførte punkter fra v0.2-v0.5 er ryddet bort ved versjonsslippene (0.3.0 17. juli 2026, 0.5.10 18. juli 2026); se [CHANGELOG.md](../CHANGELOG.md) for hva som ble levert.

## Neste opp (v0.6 «Økosystem», startet 19. juli 2026)

Fasen kjøres i milepæler M1-M9 (rekkefølgen er avhengighetsstyrt); pushes
nummereres 0.6.1 og oppover. (v0.5 levert 18. juli 2026; se CHANGELOG.)

## Til v0.6 (økosystem, etter milepæl)

- [ ] **M1 Grunnmur**: plugin-lasting for alvor (requiresEngine-validering mot motorversjonen, provides-kontroll, feilkapsling med staging/rollback per plugin), Plugins-panel i admin (aktiver/deaktiver via plugins.json gjennom utkast-/publiseringsflyten), CSP-behovsmodell (ADR: manifestets `csp`-felt + eksakt _headers-instruks i admin; _headers forblir Urd-eid), requirePublisher-hjelper i _lib, konflikt-/angre-dialoger over på editorens modalsystem, eksplisitt oppsettsveiviser-signal i site.json
- [ ] **M2 Datablokk/arkiv-mønsteret**: ADR + samlinger i content/ (innslag + blokk som rendrer samling med visningsmal); nyheter, oppslagstavle og publikasjonsarkiv-preset bygges på mønsteret; produktkatalogen i v0.7 gjenbruker det
- [ ] **M3 Kalender-referanseplugin** (ApeironLF-designkravene): abonnerbar feed (avhengighetsfri ICS-parser + Google Calendar API-kilde), gjentakende arrangementer ekspanderes, tre visninger (liste med dato-badge, kort-rutenett, månedskalender), kategori-chips via «Kategori: Tittel», auto-uttrekk av påmeldingslenke, «Abonner»-knapp (webcal + Google-cid), flere kilder + «neste arrangement»-panel, robuste tomtilstander; «Hva skjer»-preset
- [ ] **M4 Skjema- og kart-referanseplugins**: skjema etter ApeironLF-modellen (mailto/valgfritt endepunkt + honeypot), kart som personvennlig OSM-innbygging med CSP-opt-in-flyten
- [ ] **M5 Nav-omlegging**: dropdown-menyer (klikk/hover, tastatur/aria, mobilmeny) + nav-design videre (bakgrunnsbilde i menyen, hover-stiler, ekte «flytende» variant)
- [ ] **M6 Editor- og designløft**: ikonbibliotek med tegnede SVG-er (sosiale medier m.m.), tegn/emoji-menyen inn i teksteditoren, sticky blokker (fest på skjermen med start/stopp), «+ ny blokk» der man klikker i seksjonen, footer med kolonner og sosiale lenker (additivt på site.footer), FAQ-akkordeon, boks-/kortstiler (skygge/kantlinje/glassmorfisme), gradient-editor med frie stopp + radial, seksjonstemaer (ferdige rollesett), hero-galleri som bakgrunnslag, preset-miniatyrer i velgeren, lightbox. STREKK (kuttes hvis fasen vokser): duotone, palett-fra-bilde, multimarkering med align/distribute, lagpanel, flere design for former/bokser (design-galleri)
- [ ] **M7 Flerspråk-rammeverk** (eiers valg 19. juli 2026: rammeverk + bokmål/engelsk nå, resten påfyllbart): i18n-infrastruktur for admin (strings-moduler, språkvelger, localStorage) og motorens besøkende-tekster; nb + en komplette med paritetstest i CI; øvrige språk fra eiers liste (nynorsk, samisk, svensk, dansk, finsk, britisk engelsk, gaelic, spansk, tysk, trad./forenklet kinesisk, portugisisk, fransk, kanadisk engelsk) som påfyllbare oversettelsesfiler med bidrags-dokumentasjon
- [ ] **M8 Maler og oppdagbarhet**: «Lagre som mal» (content/maler/), maler delt som plugins, GitHub-topic-konvensjonen (`urd-plugin`, `urd-mal`; galleri-nettstedet kommer etter v1), søk i blokkvelgeren
- [ ] **M9 Splitt og oppdaterer (fasegaten)**: urd-template-repo med «Use this template», release-Action som synker template/, urdweb-avklaringen (eget repo laget FRA malen), oppdaterer v1 (én-klikks oppdatering av ownedPaths med sjekksum-varsel for håndredigerte filer). Port: klon malen, bygg side i admin, installer kalender-pluginen, kjør oppdateringsknappen; alt overlever

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
- [ ] Logo/ikon for nettsider
- [ ] Mulighet til å legge til påkse egg (hemmeligheter) på nettsidene
- [ ] Sticky Blokker (lage ny blokk og velge "Klistre" eller "Fest" for at den står på siden der man setter den) + funksjon til å si hvor den skal stoppe og/eller starte å være sticky
- [ ] Klikk på en seksjon får opp "+ ny blokk" der du klikker
- [ ] Emoji/tegn meny i tekst editor

    
## Bugs og kjente svakheter

- [ ] `python3 -m http.server` ruter ikke `path`-ene fra sideregisteret (kun `/` fungerer); dokumentert begrensning (`?page=<id>` er lokal-fallback)
- [ ] Angring av en merge-commit gjenoppretter første forelders innholdstilstand (dokumentert i revert.js); sjelden via admin-flyten, men mulig når noen også jobber via git
- [ ] Etter angre-publisering kreves omlasting av admin før ny publisering (bevisst sperre; en bedre flyt er å laste inn den gjenopprettede tilstanden automatisk etter deploy)
- [ ] Historikk-panelet på Urds eget monorepo viser også utviklingscommits som rører template/content (eksempelinnholdet); løses naturlig av urd-template-splitten i v0.6
- [ ] Oppsettsveiviserens utløser er streng-matching på malens standardnavn («Min forening») i både site.json og App.svelte; bør bli et eksplisitt signal i site.json ved v0.6-splitten

- [ ] Utheving (markeringstusj) lagrer fargen som fast verdi i teksten - den følger IKKE med hvis temaets aksentfarge endres etterpå (iboende i contenteditable-tilnærmingen; en var()-basert span kan vurderes i v0.6)
- [ ] Ctrl+D (dupliser) virker når fokus står i forhåndsvisningen og en blokk er markert; med fokus i admin-panelene går snarveien til nettleseren (bokmerke)

Fra den store feilsveipen 19. juli 2026 (bevisst ikke fikset nå; de bekreftede feilene ER fikset, se CHANGELOG):

- [ ] Etter publisering speiles kun gjeldende side i minnet: navigerer man til en ANNEN nettopp publisert side før deployen er ferdig (~1 min), vises serverens gamle innhold til deployen er ute. Ikke datatap (repoet er riktig), kun villedende visning i vinduet
- [ ] Mobil-stablingen kan fortsatt splitte HÅNDBYGDE kort (flere blokker per kort i kolonner); seksjonsmalene er løst med det additive mobileOrder-feltet, men editoren har ingen UI for å sette det på egne blokker. TAS MED v0.7-mobilrevurderingen
- [ ] Preview-verktøylinjene (blokk/seksjon) bruker hvit tekst på aksentfargen: med en lys aksent i brukerens sidetema blir kontrasten lav. Hører til kontrast-/temaarbeidet (seksjonstemaer) i v0.6
- [ ] Tekst-selvhelbrederen fjerner alle knapper i rik tekst ved rendering, også en bevisst innlimt HTML-knapp (vernet mot foreldreløse håndtak-knapper veier tyngre); innlimte event-attributter og script strippes nå alltid hos besøkende
- [ ] Tekstblokkens autovekst er kun monoton (rammen krymper aldri når tekst slettes), og et ekko-rerender midt i rask skriving kan i teorien miste caret-posisjonen
- [ ] contentHash for media-filnavn er 32-bit: to ulike bilder med samme navn og hash-kollisjon (~1/4 mrd) ville stille delt fil. Vurder lengre hash ved v0.8-bildearbeidet
- [ ] history/latest-endepunktene krever kun innlogging, ikke ALLOWED_LOGINS (lesende; på offentlige repo er dataene uansett åpne). Dokumentert asymmetri
- [ ] revert bytter hele nettside-undertreet, men «siste publisering» finnes via content/-filteret: en commit som KUN rører media/ eller rutingskopier (mulig via git, ikke via editoren) er usynlig for angringen
- [ ] truncated-flagget i konfliktsjekken teller hele repo-diffen (GitHub avkorter ved 300 filer): på monorepoet kan stor utviklingsaktivitet gi «kan overlappe»-varsel uten reell konflikt; løses naturlig av urd-template-splitten i v0.6
- [ ] Verifiser i produksjon at /admin/* faktisk arver CSP-en fra /*-regelen i _headers (Cloudflare Pages slår sammen regler; andre hoster gjør det ikke nødvendigvis)

## Teknisk opprydding (kandidater til v0.6)

- [ ] Delt auth-prolog for muterende functions-endepunkter (cfg/cookie/currentUser/isAllowedLogin er duplisert i commit.js og revert.js; en requirePublisher-hjelper i _lib)
- [ ] Konflikt- og angre-dialogene bruker nettleserens confirm(); bør over på editorens eget modalsystem (setup-kortet viser mønsteret)

## Må fikses/avklares før angitt fase

- [ ] v0.6: oppdaterer vs. håndredigerte Urd-eide filer (sjekksum-varsel før overskriving?)
- [x] v0.6: GitHub Action som verifiserer at committet editor-build matcher kilden i samme commit (levert tidlig, 19. juli 2026: bygg-samsvar-steg i tests.yml)
- [ ] v0.6: release-Action som synker `template/` til `urd-template`-repoet
- [ ] v0.6: avklar om urdweb skal skilles fra malen (eget repo laget FRA malen), siden publisering fra urdweb-admin skriver rett i eksempelinnholdet alle nye brukere får
- [ ] v0.9: Generalprøven (se VEIKART) - Urd-Design-siden + oppdatering med ekte migrering
- [ ] v0.9: rydde opp og fullføre BRUKERVEILEDNING.md (startet i v0.5; skal dekke alt editoren kan, med skjermbilder?)
- [ ] v1.0: en blokk-props-migrering som eget bevis (sidefil-migreringene v1→v2→v3 ligger allerede i testsuiten)
- [ ] v0.7: avklar maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)
