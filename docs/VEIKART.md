# Veikart

[🇬🇧 English](languages/ROADMAP-en-GB.md) · **🇳🇴 Bokmål**

Rekkefølgen er bevisst: **motor → publiseringsløkke → editor-dybde.** Motoren gjør skjemaet virkelig (skjemafeil er billigst å fikse før editoren avhenger av dem). Publiseringsløkka er den mest risikable *integrasjonen*, men det mest *utprøvde* mønsteret - å lande den tidlig gir et ekte deploy-mål for alt etterpå. Editor-finesse er den lange halen og bygges mot en fungerende rørledning.

## v0.1 - Skjelett *(levert 16. juli 2026)*

Dokumenter (VISJON, ARCHITECTURE, SCHEMA, VEIKART, ADR-er), JSON Schema-kontrakt i `schema/`, repo-skjelett med motor-stubber, eksempelinnhold, editor-skall og functions-stubber. `migrate.js` implementeres for ekte - invarianten først.

**Port:** eksempeldataene validerer mot skjemaene; dokumentene er godkjente.

## v0.2 - «Tynn skive» *(levert 16. juli 2026)*

Ende-til-ende med minst mulig bredde: motoren rendrer `hjem.json` (én hero-seksjon, tekst- og knappblokk, gradientbakgrunn, kun desktop). Admin laster den ekte siden i iframe, klikk-og-skriv på tekst, utkast i localStorage, «Publiser» committer via functions, Cloudflare Pages serverer.

**Port:** rediger en overskrift i nettleseren på en deployet klon og se den live etter publisering - uten å røre en kodefil.

## v0.3 - Lerretet *(levert 17. juli 2026)*

- Blokkpalett: tekst, bilde, knapp, former (streker - horisontale, vertikale, skrå via rotasjon - sirkler, rektangler), logo.
- Dra, resize og snap på gridet (konfigurerbar grid-størrelse), z-orden.
- Seksjons-CRUD med «+ Ny seksjon» in-place, seksjonspresets (hero, bilder, footer) - og **bygge egne seksjoner fra tom seksjon**.
- Inkrementell rerender i preview.

## v0.4 - Responsivt *(levert 17. juli 2026)*

Rendyrket mobilfase: nesten rent motorarbeid, uavhengig av panel-UI-et
som kommer i v0.5. (Bakgrunnseditor og animasjoner er flyttet til v0.5:
de ER panel-UI, og skal ikke bygges to ganger.)

- Mobilvisning i editor, auto-avledet stabling, manuelle mobil-frames.
- **Mobil-tilsyn-flagget ende-til-ende** (regler i [SCHEMA.md](SCHEMA.md#mobile-review)).
- «Dekor»-flagg på blokker (streker/sirkler som stabler dårlig i auto-avledet layout).

**Port:** en side bygget på desktop ser fornuftig ut på mobil uten manuell
inngripen, og tilsyn-flagget fanger drift når mobil-layout er håndjustert.

## v0.5 - Panelene og nettstedet rundt siden *(levert 18. juli 2026)*

Editorens UI legges om FØRST (dagens topplinje er metta), og alle
redigeringsflatene bygges på den nye layouten:

- Ny editor-layout: sidepanel/ikonverktøylinje, statusmeldinger som toast.
- Sidepanel: opprette/omdøpe/slette sider fra sideregisteret.
- Nav-editor og theme-token-panel (farger, fonter, radier).
- Blokkeditor: props-UI per blokktype - bilde (alt/fit/radius/lenke), former (fyll/farge/tykkelse), knapp (mål/stil), tekst (justering, typografi). Nye blokktyper: video/embed og ikon.
- Tastatursnarveier: piltaster flytter markert blokk, Delete sletter, Esc avmarkerer.
- Seksjonseditor med **full bakgrunnseditor** (lag: farge/gradient/animert, glød, bildelag, korn) og **animasjonsinnstillinger per blokk/seksjon** (inn-animasjoner, hover; version+migrate-kontrakt) - flyttet fra v0.4.
- Konfliktvarsel før publisering («noen andre har publisert siden du lastet», via `latest`-endepunktet som har vært klart siden v0.2).
- Oppsettsveiviser ved første besøk (navn, farger, logo, GitHub/Cloudflare-kobling).
- Historikk- og angre-publisering-UI (`history`/`revert`).

## v0.6 - Økosystem *(levert 9. august 2026)*

- Plugin-lasting for alvor: plugins leverer **egne blokker, seksjonspresets, bakgrunner, animasjoner og maler** via `register(Urd)`. Kalender-pluginen som referanseeksempel, med kart og skjema som ytterligere referanse-plugins (alle tre ble kjerneblokker i 0.7.18).
- **Arkiv/datablokk-mønsteret**: blokker som rendrer samlinger av innslag (nyheter, oppslag, styrer), designet sammen med kalenderen. Kalender-avhengige presets: nyheter, oppslagstavle, «Hva skjer».
- **«Lagre som mal»**: egne seksjoner/sider lagres i `content/maler/` og kan deles som plugins. GitHub-topic-konvensjon (`urd-plugin`, `urd-template`) for oppdagbarhet.
- `urd-template`-repo-splitt + release-Action («Use this template»).
- Oppdaterer v1 ([ADR-0014](adr/0014-updater-model.md)): én-klikks Urd-oppdatering fra malrepoet, der hver Urd-eide fil klassifiseres etter sjekksummen mot utgivelsestaggen, så en håndredigert fil vises før noe skrives; `_headers` skrives aldri og får diff-instruks i stedet.

Fasen ble styrt som milepælene 0.6.1-0.6.9 i [BACKLOG.md](BACKLOG.md), og vokste underveis med et editor- og designløft (0.6.6), maler og gjenbruk (0.6.7) og flerspråk-rammeverket (0.6.8).

**Port:** klon malen via «Use this template», bygg en side i admin, installer kalender-pluginen, og kjør oppdateringsknappen: alt overlever. *(Bestått 9. august 2026.)*

## v0.7 - Finpuss + butikk

- **Butikk uten betalingsgateway som kjernefunksjon** (ApeironLF-modellen, valgt 18. juli 2026): produktkort-blokk med varianter, handlekurv (localStorage + skuff), bestillingsskjema til e-post/valgfritt endepunkt, betaling via Vipps-nummer-instruks. Avhengighetsfri, git-eid katalog; bygges på v0.6-datablokk-mønsteret. Ekte betalings-kasse er flyttet inn i fasen som valgfritt lag oppå skjema-kassen (9. august 2026; Vipps Checkout, [ADR-0020](adr/0020-optional-payment-layer-vipps-checkout.md)); kjernen forblir gateway-fri. Vipps MobilePay Checkout avvikles 30. april 2027 (Kustom har overtatt den), så det valgfrie laget flyttes til ePayment-API-et eller til Kustom Checkout før det.
- **SEO-grunnpakke** (fra funksjonskartet 23. juli 2026, se [FEATURES.md](comparison/FEATURES.md)): per-side meta/og-felter, sitemap, robots, 404, canonical. Pluss RSS for samlinger, flere skjema-felttyper, video-bakgrunnslag og CSV/tabell.
- **Arkitektur-avklaringene**: fast innholdsbredde ([ADR-0018](adr/0018-bound-content-width.md)), den synkede mobilmodellen ([ADR-0019](adr/0019-synced-mobile-model.md)), klientside-navigasjon (målt, og lukket uten ruter), innholdsdytting på desktop-lerretet ([ADR-0024](adr/0024-content-push-on-the-desktop-canvas.md)) og størrelsesmodellen for hver blokk ([ADR-0025](adr/0025-the-sizing-model.md)).
- **Intuitivitets-gjennomgangen**: er alt intuitivt, er noe rotete, er noe lett å misforstå? (Funksjonssammenligningen mot andre byggere ble gjort 23. juli 2026 og fornyet 11. oktober 2026, [FEATURES.md](comparison/FEATURES.md).)
- **Personvernstandarder og videresendinger** (fra sammenligningen 11. oktober 2026): innbygginger lastes først ved et klikk, en personvernside lages fra nettstedsinnstillingene, samtykke spørres om bare når besøksmåling eller innbygginger trenger det, og 301-videresendinger lages ved publisering ([ADR-0015](adr/0015-redirects-ownership.md)).
- **Egne utseender fra designverktøy** (besluttet 14. oktober 2026): et utseende laget i Figma, Penpot, Illustrator eller SVGator blir ansiktet, den avgrensede stilen eller tokenene til et Urd-element, med pekeren som CSS-egenskaper for design som følger den; kode kommer aldri inn denne veien.

Fasen styres som milepælene 0.7.0-0.7.25 i [BACKLOG.md](BACKLOG.md), delt opp 9. august 2026 (arkitekturavklaringene først, deretter blokker, butikk og synlighet, finpuss mot slutten) og utvidet underveis. Utgivelsene bærer fasens minor med løpende patch-nummer (0.7.1 til 0.7.4 så langt). Per 11. oktober 2026:

- **Levert:** 0.7.1 oppryddingsrunden, 0.7.2 fast innholdsbredde, 0.7.4 blokker og skjemafelter, 0.7.5 butikken, 0.7.6 SEO og synlighet, 0.7.7 video-bakgrunn og mediegrenser, 0.7.8 klientside-navigasjon, 0.7.12 forankringsrunden, 0.7.14 engelsk-renskingen, 0.7.15 menylinjens størrelse.
- **Åpne:** 0.7.3 mobil-revurderingen, 0.7.9 design-strekket fra 0.6.6, 0.7.10 intuitivitets-gjennomgangen og editor-finpuss, 0.7.11 tilgjengelighetsrunden, 0.7.13 elementgjennomgangen, 0.7.16 arkivering og personsamlinger, 0.7.17 breddeskaleringen (oppfølgingen fra testrunden), 0.7.18 kart, skjema, kalender og besøksmåling inn i kjernen (alle trinn levert), 0.7.19 kalenderdesignene, 0.7.20 elementmenyen, 0.7.21 størrelsesmodellen for hvert element, 0.7.22 utskrift, 0.7.23 videresendinger, 0.7.24 personvernstandarder, 0.7.25 egne utseender fra designverktøy.

**Port:** en testbestilling går gjennom handlekurv, bestillingsskjema og e-post på en deployet side; publisert side har meta/og-felter, sitemap, robots og 404; intuitivitets-gjennomgangen er gjennomført og funnene sortert inn i backloggen; og hver milepæl over er levert og har bestått testrunden sin, eller er flyttet til en senere fase med flyttingen ført i backloggen.

## v0.8 - Fart, media og bakte sider

Tre tråder: en ytelses- og størrelsesgjennomgang av hele produktet, mediearbeidet som gjør bilder lette og håndterlige, og sider bakt til HTML ved publisering, sammen med innholdet som trenger sin egen adresse. (Grunnleggende bildekomprimering ved opplasting - webp, maks 1600 px, størrelsesvarsel - ble levert i v0.3.)

- **Fart for besøkende:** mål og senk vekt og lastetid (motorstørrelse, kritisk CSS, caching-headere, `content-visibility` for seksjoner under folden, Lighthouse-budsjett som CI-sjekk?), og vis motorens letthet målbart; filer for søkemotorer og AI-agenter skrevet ved publisering (llms.txt, en Markdown-tvilling per side, en Content-Signal-linje eieren velger, `lastmod` i sitemap), editorens CSS skilt ut fra den besøkendes stilark, og modullister per side når sidene er bakt.
- **Fart i editoren:** profiler rendering og rerendering med mange seksjoner og blokker, en finere patch-protokoll i preview (én blokk eller ett attributt i stedet for å tegne seksjonen på nytt), bundle-størrelse og oppstartstid, dra og resize i 60 fps på store sider, og et indekslag så admin-spørringer holder farten når samlingene vokser.
- **Media:** responsive bilder (`srcset`, bildets egne mål, AVIF), et mediebibliotek-panel (fra funksjonskartet), en bildeeditor i admin, lengre innholdshash i mediefilnavn, eventuelt rekomprimering av eksisterende media/-filer, og animasjons- og 3D-filer (Lottie, Rive, glTF) som lokale plugins, med en sandkasse-portal for eksportert kode.
- **Bakte sider:** «bakt HTML ved publisering» (SEO/no-JS-punktet fra risikolisten), med samlingsdata bakt inn, og innslagssider (en permalenke per samlingsinnslag, fra funksjonskartet) og en side per produkt (lenket fra butikkens quick view) generert sammen med den.
- **Innhold:** arrangementer som samlingstype (dato, tid og sted, et kommende-filter og en månedsvisning), for en forening som holder programmet sitt i Urd og ikke i en kalenderfeed; og malmodellen: en mal eller en gruppe maler eksportert som plugin, og hele nettstedsmaler holdt i Urd; og **elementrunden**: elementene som mangler etter sammenligningen 11. oktober 2026, hvert bygd nativt (faner, popup, fillister og dokumenter, åpningstider, diagrammer og fremdrift, karusellvisning for samlinger, flere skjemafelt med betingelser og trinn, påmeldingslenker med «legg til i kalender», sponsornivåer, donasjoner, brødsmulesti, datovinduer), med typede egne felt per samling og nettstedssøk fra en indeks laget ved publisering til vurdering ved siden av ([ELEMENTS.md](comparison/ELEMENTS.md)).
- **Ved siden av:** MCP-serverens lesedel ([ADR-0017](adr/0017-ai-via-local-mcp-server.md)), en avhengighetsfri lokal prosess med leseverktøy og `urd_validate`; og at oppdatereren tilbyr de oppfriskede medfølgende pluginene som valgfrie filer.

**Port:** ytelsesbudsjettet (Lighthouse-terskler og vektmål, festes når fasen startes) er målt og holdt på publisert eksempelside, og dra/resize holder 60 fps på en stor side.

## v0.9 - Generalprøven

Vi bruker Urd som en fremmed bruker, uten snarveier:

- Lag en ekte side (arbeidsnavn: Urd-Design) via «Use this template»-knappen, i eget repo med eget Cloudflare-oppsett, satt opp KUN ved å følge [oppsettsguiden](languages/setup-publication/SETUP-nb.md). All friksjon som oppdages er funn som skal fikses.
- Bygg siden ferdig gjennom admin alene.
- Hosting utover Cloudflare Pages: siden servert fra hvilken som helst statisk host (GitHub Pages, Netlify, egen server), med en måte for innloggingen og publiseringen fra `/admin` å virke der, og et svar på hvordan en slik side får Urd-oppdateringer (lagt til 6. oktober 2026; detaljer i BACKLOG).
- Slipp deretter en Urd-oppdatering som inneholder en **ekte blokkendring (v1→v2 med migrering)**, og kjør oppdater-knappen på Urd-Design-siden.

Også i fasen (detaljer i [BACKLOG.md](BACKLOG.md)): dokumentasjonsrunden (oppsettsguide-friksjon, feilsøking, readme-strukturen) og en ferdig brukerveiledning, og utgivelses- og oppdaterer-herdingen, begge samlet hit 9. august 2026 fordi de dekker guidene og koden generalprøven prøver ut; MCP-serverens skriveverktøy (ADR-0017); oversettelsesrunden for nn og se; touchvennlighet for admin og publisert side; én redigeringsstørrelse per nettsted, delt mellom editorene; kodekommentarene gjennomgått før utenforstående utviklere leser dem; å starte et nytt nettsted fra en blank side eller en full sidemal; styreskifte (en sjekkliste for «ny styreperiode»: repoet i en GitHub-organisasjon for foreningen, to eiere med tofaktor, Cloudflare-kontoen og domenet på foreningen); testfiksturer per blokktype og en seedet fuzz-test av dyttepasset; optimistiske commits som prøver igjen når bare andre filer er endret; og, til vurdering, en redigeringsmodus for bare innhold og planlagt publisering.

Frem til v0.6 var `template/` både verksted og demo (urdweb); fra v0.6 er malen et eget repo, og Urd-Design er den første siden som lever som en ekte brukers.

**Port:** Urd-Design overlever oppdateringen uten tap av innhold eller manuell inngripen - løfte 2 bevist i praksis, ikke bare i testsuiten.

## v1.0 - Brukbar

En forening kan klone, sette opp, bygge og vedlikeholde en side uten utvikler.

**Port:** migreringskontrakten er testet med minst én reell v1→v2-blokkendring i testsuiten; en pilotside (kandidat: gjenskape ApeironLF med Urd) er bygget og driftes. Piloten forutsetter v0.7-butikken (ApeironLF har merch med handlekurv) og kalenderblokken (arrangementer fra Google Calendar/iCal-feed).

## Etter 1.0 (horisont)

Uprioritert, avhenger av community og behov: import fra eksisterende sider,
flerspråklig INNHOLD (nb/nn/en-varianter av sidene selv; UI-et og dokumentasjonen
er flerspråklige fra 0.6.8), flere UI-språk (fransk, tysk, spansk, finsk, dansk),
eksport av et bygget nettsted, samtidighetsvisning i admin, galleri-nettsted for maler og
plugins (urd.dev), GitLab/Gitea-adapter (publisering og oppdateringer for et repo utenfor GitHub), ekstern medialagring (R2),
PR-per-utkast-/deploy-preview-arbeidsflyt (fra [CODE.md](comparison/CODE.md#part-5-publishing-and-deploy)), synkede globale blokker (én blokk brukt på flere sider og redigert ett sted),
butikk-utvidelser utover ApeironLFs behov (pris og varelager per variant med mer) og
butikk/merch-mal. Detaljer i [BACKLOG.md](BACKLOG.md).

---

## Sporbarhet: idemyldringen (PLAN.md) → veikartet

Ingenting fra den opprinnelige idemyldringen skal gå tapt:

| Punkt fra PLAN.md | Hvor det lever |
|---|---|
| WYSIWYG: klikk og skriv, hover for dra/slett, «+ Ny seksjon» in-place | v0.2 (klikk-og-skriv) + v0.3 |
| Grid-basert fri plassering, resize, konfigurerbar grid-størrelse | v0.3 (+ `grid` i site.json/seksjon) |
| Streker (horisontale/vertikale/skrå), sirkler, logoer | v0.3 (shape/logo-blokker, `rot` i frames) |
| Full bakgrunnseditor: farge/gradient/animert + glød + bildelag + korn | v0.5 (motoren rendrer lagene siden v0.2) |
| Animasjoner (blokk/seksjon) | v0.5 + utvidbart via plugins (v0.6) |
| Panel for sidene + nav-redigering | v0.5 |
| Detaljert editor for seksjon/blokk/tekst/bilder/farger | v0.3–v0.5 |
| Lage egne seksjoner | v0.3 (tom seksjon + blokker) |
| Lage egen mal | v0.6 («Lagre som mal» → `content/maler/`) |
| Plugins i /plugins: maler, animasjoner, bakgrunner, seksjoner | v0.6 (plugin-API `provides:{blocks, sectionPresets, backgrounds, animations, templates}`) - kontrakten er definert allerede i v0.1-skjemaet |
| Maler for hero, bilder, kalender, footer | v0.3 (presets) + kalenderen (referanse-plugin i v0.6, kjerneblokk fra 0.7.18) |
| Oppdatering knuser aldri bygget side (`version` + `migrate`) | v0.1 (migrate.js implementert) + testet i v1.0-porten |
| Reell GitHub OAuth + Cloudflare-kobling | v0.2 (tynn skive) |
| Statisk + git, publiser = commit, valgfri host | Hele arkitekturen ([ARCHITECTURE.md](ARCHITECTURE.md)) |

## Risikoer og åpne spørsmål

| Tema | Status |
|---|---|
| SEO / besøkende uten JS (klientside-rendering gir tomt skall for enkle crawlere) | Akseptert i v0; SEO-grunnpakken ble levert i 0.7.6, og «bakt HTML ved publisering» er planlagt i v0.8 - editoren rendrer allerede ferdig DOM som kan snapshottes |
| Auto-avledet mobil-layout for dekor-blokker (streker/sirkler stabler dårlig) | Levert i v0.4 («dekor»-flagg); mobilmodellen som helhet er avgjort i [ADR-0019](adr/0019-synced-mobile-model.md) (synket per blokk, radnettet), der `hideMobile` har tatt over mobilskjulingen |
| Bilder i git (repo-vekst, filgrenser hos hoster) | v0: størrelsesvarsler i editor; mediebiblioteket (v0.8) viser størrelser og ubrukte filer; ekstern lagring (f.eks. R2) som plugin-spørsmål etter v1 |
| Oppdaterer vs. håndredigerte Urd-eide filer | Avgjort i [ADR-0014](adr/0014-updater-model.md): hver Urd-eide fil klassifiseres etter sjekksummen mot utgivelsestaggen, en håndredigert fil vises som konflikt før noe skrives, og `_headers` skrives aldri |
| Ikke-GitHub-hoster (GitLab/Gitea) | `functions/_lib`-grensen holdes adapter-vennlig; utenfor scope til etter v1 (andre statiske hoster for selve nettstedet er planlagt i v0.9) |
| Antall breakpoints | To (desktop + mobil) i v1; nettbrett vurderes senere |
| Tredjepartstjenester endrer seg under nettstedet | Vipps Checkout avvikles 30. april 2027. Kjernen forblir gateway-fri; det valgfrie laget flyttes før datoen (BACKLOG URGENT) |
