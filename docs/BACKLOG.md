# Backlog

Løpende oppgaveliste for Urd-utviklingen: konkrete gjøremål, feilrettinger og forslag. [VEIKART.md](VEIKART.md) eier fasene og målene; denne listen eier de konkrete oppgavene. Flytt gjerne ting mellom seksjonene, og stryk med `[x]` når noe er gjort (rydd bort fullførte ved versjonsslipp).

Fullførte punkter fra v0.2-v0.5 er ryddet bort ved versjonsslippene (0.3.0 17. juli 2026, 0.5.10 18. juli 2026); se [CHANGELOG.md](../CHANGELOG.md) for hva som ble levert. Innkomne forslag og funn sorteres rett inn i milepælen eller fasen der de best tas; dokumenterte begrensninger uten plan står i egen seksjon nederst.

## Til v0.6 «Økosystem» (startet 19. juli 2026; milepæler M1-M9, avhengighetsstyrt rekkefølge; pushes nummereres 0.6.1 og oppover)

- [x] **M1 Grunnmur** (0.6.1-0.6.3, 19. juli 2026; eiers testrunde bestått): plugin-lasting for alvor (requiresEngine-validering mot motorversjonen, provides-kontroll, feilkapsling med staging/rollback per plugin), Plugins-panel i admin (aktiver/deaktiver via plugins.json gjennom utkast-/publiseringsflyten), CSP-behovsmodell (ADR: manifestets `csp`-felt + eksakt _headers-instruks i admin; _headers forblir Urd-eid), requirePublisher-hjelper i _lib, konflikt-/angre-dialoger over på editorens modalsystem, eksplisitt oppsettsveiviser-signal i site.json
- [x] **M2 Datablokk/arkiv-mønsteret** (0.6.4-0.6.6, 19. juli 2026; eiers testrunder underveis): ADR-0007 + samlinger i content/ (innslag + samling-blokk med kort/liste/arkiv-visning); nyheter, oppslagstavle og publikasjonsarkiv-preset bygget på mønsteret; produktkatalogen i v0.7 gjenbruker det. Testrundene løftet i tillegg editorene til topp-nivå (M2.5/M2.6): felles teksteditor på alle rike flater (også titler), felles bildeeditor med fokuspunkt/zoom/form/tredelingsgitter, felles fargevelger med gjennomsiktighet og delt Lagrede/Nylige-palett i admin og lerret
- [ ] **M3 Kalender-referanseplugin** (ApeironLF-designkravene): abonnerbar feed (avhengighetsfri ICS-parser + Google Calendar API-kilde), gjentakende arrangementer ekspanderes, tre visninger (liste med dato-badge, kort-rutenett, månedskalender), kategori-chips via «Kategori: Tittel», auto-uttrekk av påmeldingslenke, «Abonner»-knapp (webcal + Google-cid), flere kilder + «neste arrangement»-panel, robuste tomtilstander; «Hva skjer»-preset
- [ ] **M4 Skjema- og kart-referanseplugins**: skjema etter ApeironLF-modellen (mailto/valgfritt endepunkt + honeypot), kart som personvennlig OSM-innbygging med CSP-opt-in-flyten
- [ ] **M5 Nav-omlegging**: dropdown-menyer (klikk/hover, tastatur/aria, mobilmeny) + nav-design videre (bakgrunnsbilde i menyen, hover-stiler, ekte «flytende» variant)
- [ ] **M6 Editor- og designløft**: ikonbibliotek med tegnede SVG-er (sosiale medier m.m.), tegn/emoji-menyen inn i teksteditoren, sticky blokker (fest på skjermen, med valg for hvor de starter/stopper å være festet), «+ ny blokk» der man klikker i seksjonen, hjelpelinjer for hele siden (bredde/senter horisontalt og vertikalt, alltid synlige med av/på-knapp), seksjonshøyde justerbar også OVENFRA (sensitiv: må kunne utvide/krympe en seksjon uten at naboen endres; bekreft design med eier før bygging), footer med kolonner og sosiale lenker (additivt på site.footer), FAQ-akkordeon, boks-/kortstiler (skygge/kantlinje/glassmorfisme), gradient-editor med frie stopp + radial, seksjonstemaer (ferdige rollesett) inkl. kontrastfiks for preview-verktøylinjene (hvit tekst på lys aksent gir lav kontrast i dag), hero-galleri som bakgrunnslag, preset-miniatyrer i velgeren, lightbox, multimarkering (eiers ønske 19. juli 2026: markér en sone på siden eller flere blokker, kopier/lim inn utvalget med Ctrl+C/V slik at oppsettet blokkene imellom bevares; align/distribute på utvalget hører til). STREKK (kuttes hvis fasen vokser): duotone, palett-fra-bilde, lagpanel, flere design for former/bokser (design-galleri), flere DESIGN for samlingsvisningene og flere samlingsbaserte seksjonsmaler (eiers ønske 19. juli 2026: malene i galleriet er riktig retning, lag flere)
- [ ] **M7 Flerspråk-rammeverk** (eiers valg 19. juli 2026: rammeverk + bokmål/engelsk nå, resten påfyllbart): i18n-infrastruktur for admin (strings-moduler, språkvelger, localStorage) og motorens besøkende-tekster; nb + en komplette med paritetstest i CI; øvrige språk fra eiers liste (nynorsk, samisk, svensk, dansk, finsk, britisk engelsk, gaelic, spansk, tysk, trad./forenklet kinesisk, portugisisk, fransk, kanadisk engelsk) som påfyllbare oversettelsesfiler med bidrags-dokumentasjon
- [ ] **M8 Maler og oppdagbarhet**: «Lagre som mal» (content/maler/), maler delt som plugins, GitHub-topic-konvensjonen (`urd-plugin`, `urd-mal`; galleri-nettstedet kommer etter v1), søk i blokkvelgeren
- [ ] **M9 Splitt og oppdaterer (fasegaten)**: urd-template-repo med «Use this template», release-Action som synker template/, urdweb-avklaringen (eget repo laget FRA malen), oppdaterer v1 (én-klikks oppdatering av ownedPaths med sjekksum-varsel for håndredigerte filer). Splitten fjerner også monorepo-støyen: historikk-panelet som viser utviklingscommits (de rører template/content), og truncated-varselet i konfliktsjekken ved stor repo-diff (GitHub avkorter ved 300 filer). Fjern også oppsettsveiviserens navnematch-fallback når malens standardinnhold setter site.setup. Port: klon malen, bygg side i admin, installer kalender-pluginen, kjør oppdateringsknappen; alt overlever

## Til v0.7 (finpuss + butikk)

- [ ] Butikk uten betalingsgateway som KJERNEFUNKSJON (eiers valg 18. juli 2026, ApeironLF-modellen): produktkort-blokk med varianter (størrelse/farge, pris + evt. medlemspris, badge, bildegalleri der fargevalg bytter bilde), handlekurv-blokk (localStorage + skuff med antall-badge), kasse = bestillingsskjema (navn/e-post/telefon/kommentar + honeypot) som går til e-post (mailto, null oppsett) eller valgfritt endepunkt (Apps Script/Pages Function), betaling via Vipps-nummer-instruks. Helt avhengighetsfri, katalogen git-eid. Bygges PÅ v0.6-datablokk-mønsteret (produktkatalog = samling). Må lande før v1: v1.0-porten (gjenskape ApeironLF) forutsetter den.
- [ ] Produktkort-preset fra v0.5 («kjøp = ekstern lenke») oppgraderes til å kunne peke på ekte produktblokker
- [ ] **Mobil-revurderingen** (eiers observasjon 17. juli 2026 etter å ha håndlaget desktop+mobil: dagens kobling desktop→auto/manuell mobil er vanskelig å jobbe med; krever design før implementasjon). Tas som ETT arbeid, med disse punktene innbakt: (a) vurder HELT egen mobilversjon av siden; (b) mobil-tilsyn-varselet må si HVA som skal gjøres og HVOR (kandidat: klikk på chipen hopper til seksjonen i mobilvisning med kort forklaring og ✓-knapp); (c) avklar 📵/dekor i MANUELLE seksjoner (i dag gjelder skjulingen kun auto-layout og oppleves som «virker ikke»); (d) mobil-stablingen kan splitte HÅNDBYGDE kort: editoren mangler UI for å sette det additive mobileOrder-feltet på egne blokker
- [ ] Editor-finpuss: etter publisering speiles kun gjeldende side i minnet, så navigering til en ANNEN nettopp publisert side før deployen er ute (~1 min) viser serverens gamle innhold (aldri datatap, kun villedende visning); tekstblokkens autovekst er kun monoton (rammen krymper aldri når tekst slettes) og et ekko-rerender midt i rask skriving kan i teorien miste caret-posisjonen
- [ ] Påskeegg: mulighet til å legge inn hemmeligheter/easter eggs på nettsidene (moro-funksjon, formen er åpen)
- [ ] Avklar maks bildestørrelse og varselgrenser i editoren (hosters filgrenser)

## Til v0.8 og senere faser

- [ ] v0.8: contentHash for media-filnavn er 32-bit; to ulike bilder med samme navn og hash-kollisjon (~1/4 mrd) ville stille delt fil. Vurder lengre hash ved bildearbeidet
- [ ] v0.9: Generalprøven (se VEIKART) - Urd-Design-siden + oppdatering med ekte migrering
- [ ] v0.9: rydde opp og fullføre BRUKERVEILEDNING.md (startet i v0.5; skal dekke alt editoren kan, med skjermbilder?)
- [ ] v1.0: en blokk-props-migrering som eget bevis (sidefil-migreringene v1→v2→v3 ligger allerede i testsuiten)

## Må avklares før M9-gaten

- [ ] Oppdaterer vs. håndredigerte Urd-eide filer (sjekksum-varsel før overskriving?)
- [ ] Release-Action som synker `template/` til `urd-template`-repoet
- [ ] Avklar om urdweb skal skilles fra malen (eget repo laget FRA malen), siden publisering fra urdweb-admin skriver rett i eksempelinnholdet alle nye brukere får

## Etter v1.0 (horisont)

- [ ] Import fra eksisterende side (veiviser som henter tekst/bilder)
- [ ] Flerspråkstøtte for innhold (nb/nn/en-varianter; migreringskontrakten gjør at den kan komme når som helst)
- [ ] Samtidighetsvisning i admin («Kari redigerer Hjem nå») - krever sanntidsinfra utover statisk+functions; konfliktvarselet i v0.5 dekker det viktigste
- [ ] Galleri-nettsted over community-maler og -plugins (urd.dev; forutsetter et community)
- [ ] GitLab/Gitea-adapter for publiseringslaget (se ADR-0003)
- [ ] Ekstern medialagring (Cloudflare R2) som plugin for bildetunge sider
- [ ] Ekte betalings-kasse for butikken (Snipcart-modellen med git-eid katalog + CSP-opt-in, eller Vipps Checkout via Pages Function) - kun ved reell etterspørsel; selve butikken (uten gateway) kommer i v0.7
- [ ] Utenfor scope for kjernen (fra kartleggingen 18. juli 2026): innlogging/medlemsområde, P2P-bruktmarked (ApeironLFs «Kjøp & bytte»), fulltekstsøk på siden (krever avhengighet à la minisearch - evt. community-plugin), sanntidsfeeds/personalisering. Krever server/CMS eller avhengigheter; Urd er statisk og avhengighetsfri

## Kjente begrensninger (dokumentert, ingen fiks planlagt)

- `python3 -m http.server` ruter ikke `path`-ene fra sideregisteret (kun `/` fungerer); dokumentert begrensning (`?page=<id>` er lokal-fallback)
- Angring av en merge-commit gjenoppretter første forelders innholdstilstand (dokumentert i revert.js); sjelden via admin-flyten, men mulig når noen også jobber via git
- Tekst-selvhelbrederen fjerner alle knapper i rik tekst ved rendering, også en bevisst innlimt HTML-knapp (vernet mot foreldreløse håndtak-knapper veier tyngre); innlimte event-attributter og script strippes alltid hos besøkende
- history/latest-endepunktene krever kun innlogging, ikke ALLOWED_LOGINS (lesende; på offentlige repo er dataene uansett åpne). Dokumentert asymmetri
- revert bytter hele nettside-undertreet, men «siste publisering» finnes via content/-filteret: en commit som KUN rører media/ eller rutingskopier (mulig via git, ikke via editoren) er usynlig for angringen

## Forslag og Ideer


## Levert underveis i v0.6 (ryddes bort ved fase-slippet)

- [x] Logo/ikon for nettsider (levert i v0.5: nettstedsikon/favicon via site.icon i Tema-panelet, nav-logo via site.nav.logo med tekst/bilde/begge i Nav-panelet)
- [x] Teknisk opprydding-punktene (levert 0.6.2): requirePublisher-hjelperen i functions/_lib/auth.js (brukes av commit.js og revert.js), og konflikt-/angre-dialogene over på editorens modalsystem (askConfirm, ingen window.confirm igjen)
- [x] Oppsettsveiviserens utløser er et eksplisitt signal (levert 0.6.2: `site.setup === true` er primærutløser; navnematch-fallbacken fjernes ved M9, se M9-punktet)
- [x] GitHub Action som verifiserer at committet editor-build matcher kilden i samme commit (levert tidlig, 19. juli 2026: bygg-samsvar-steg i tests.yml)
- [x] Verifisert i produksjon 19. juli 2026 at /admin/* arver CSP-en fra /*-regelen i _headers (curl mot urdweb.pages.dev viser identisk CSP på / og /admin/); forbeholdet gjelder fortsatt andre hoster enn Cloudflare Pages
- [x] Utheving og tekstfarge fra TEMA-knappene følger nå temaet (levert 0.6.8: fargen execCommand skriver byttes til var(--urd-color-<token>) i feltet; egne farger forblir frikoblet hex med vilje)
- [x] Ctrl+D (dupliser) virker nå også med fokus i admin-panelene (levert 0.6.8: urd-duplicate over broen; ikke i tekstfelt, der beholder nettleseren snarveien)
- [x] Admin-menyens aktiv-markering flytter ikke lenger noe (levert 0.6.8: font-vekt-endringen fjernet; aktiv markeres av bakgrunn + kant, som er stabile)
- [x] Etter angre-publisering lastes den gjenopprettede tilstanden automatisk (levert 0.6.8: admin poller de serverte innholdsfilene til deployen er ute, forkaster utkastene og laster på nytt selv; ved tidsavbrudd består den gamle sperren og omlast-meldingen)
