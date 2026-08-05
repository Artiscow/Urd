# Testrunder (sjekkliste for manuell testing)

Nytt som er levert og venter på manuell testing i produksjon/lokalt. **Punkter strykes kun av den som tester**; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst eller oppført som en kjent bug.


### Testrunde-batch (0.6.9.6): setup-signalet og malens README

- [ ] Fersk klon (eller tøm `urd-setup-done` fra localStorage mot en deploy av malen): oppsettsveiviseren vises i admin, utløst av setup-signalet alene
- [ ] Fullfør veiviseren og publiser: `setup`-feltet er borte fra site.json i repoet, og veiviseren vises aldri igjen
- [ ] Avvis veiviseren (lukk uten å fullføre): den holder seg borte i samme nettleser, men feltet består i repoet til noen fullfører
- [ ] Malens README leses godt på GitHub på alle tre språk (flagg-lenkelinjen bytter mellom bokmål/engelsk/tyrkisk, og lenkene til oppsettsguide og brukerveiledning virker per språk)

### Testrunde-batch (0.6.9.5): Oppdatering-panelet (etter rc-synken)

- [ ] Panelet åpnes fra verktøy-gruppen og viser installert motorversjon; med malrepo utilgjengelig vises oversatt feil med fungerende «Prøv igjen»
- [ ] Med rc-versjon tilgjengelig: endringslisten viser motorfiler og valgfrie filer riktig, håndredigerte filer har varseltrekant med forklarende tooltip
- [ ] «Behold min» på en functions-fil holder den utenfor (verifiser i repoet etterpå); checkboxen finnes IKKE på motorfiler
- [ ] `_headers`-avvik viser instruksen med oppstrøms tekst i markerbar blokk; filen er urørt i repoet etter oppdateringen
- [ ] Bekreftelsesdialogen viser målversjon + antall, og lister håndredigerte motorfiler som overskrives
- [ ] Etter Oppdater: status følger commit → utrulling, admin laster på nytt av seg selv når /urd.json melder ny versjon, og upubliserte utkast består etter omlastingen
- [ ] Uten publiseringstilgang (bruker utenfor ALLOWED_LOGINS): Oppdater-knappen er deaktivert med forklarende tooltip
- [ ] Lokalt (dev-server.py uten functions): panelet degraderer pent til utilgjengelig-melding

### Testrunde-batch (0.6.9.4): oppdaterer server-side (etter rc-synken)

- [ ] GET /api/github/update (innlogget) mot rc-tagget malrepo: svaret klassifiserer riktig (uendret/håndredigert/ny/slettet) mot en testklon der én functions-fil er bevisst håndredigert
- [ ] `_headers`-avvik rapporteres med oppstrøms tekst i sjekk-svaret, og filen står ALDRI i endringslisten
- [ ] POST med gyldig expect gjennomfører ÉN commit i testklonen: ny motormappe inn, gammel ut, slug-kopier byte-like ny rot-index.html, urd.json-engine bumpet
- [ ] POST med skip på en atomgruppe-fil avvises med updateBadSkip; skip på en functions-fil respekteres (filen forblir urørt)
- [ ] POST med utdatert expect (push noe annet først) gir updateRace uten at noe skrives
- [ ] Klon uten baseline-tagg (engine-verdi som ikke finnes som tagg i malrepoet) får updateNoBaseline, oversatt på admin-språket

### Testrunde-batch (0.6.9.3): release-Action

- [ ] Engangsoppsett gjort: offentlig `urd-template`-repo opprettet («Template repository» huket av, topic `urd-mal`), og secreten `URD_TEMPLATE_PAT` (fine-grained, contents read/write kun på malrepoet) lagt inn i monorepoet
- [ ] Rc-dispatch: tagg en commit med et treparts rc-nummer, kjør Release-workflowen manuelt med prerelease-flagget, og se at malrepoet seedes med template/-innholdet som ÉN commit «Urd v<nummer>» pluss taggen
- [ ] Omkjøring av samme dispatch er ufarlig: workflowen melder uendret innhold/eksisterende tagg i stedet for å lage ny commit eller flytte taggen
- [ ] check-release stopper feil: en dispatch mot en tagg som ikke matcher urd.json.engine feiler i versjonskonsistens-steget før noe pushes

### Testrunde-batch (0.6.9.2): versjonert motor og immutable-cache

- [ ] Siden laster normalt lokalt (dev-server.py) og i preview: alle sider, nav, footer, bakgrunner og animasjoner, uten 404 i konsollen/nettverksfanen (alle motor-moduler fra /assets/engine/0.6.8/)
- [ ] Undersidene (kaker/om-oss/kontakt) har nå render-blokkerende tema og blinkefritt lys/mørk-valg ved direkte innlasting (theme.css + theme-init.js kom inn med kopi-rettingen)
- [ ] Alle fire pluginene virker i preview (kalender, skjema, kart, språkpakken): importene går via /assets/urd/-skallene
- [ ] Admin-språkbytte virker fortsatt (ordbøkene kjøretids-lastes via /assets/urd/locales/admin/)
- [ ] Etter deploy: svar-headerne viser `immutable` på en motorfil (f.eks. /assets/engine/0.6.8/boot.js) og på /assets/styles/base.css, men IKKE på /assets/urd/i18n.js
- [ ] Etter deploy: publisér en side og sjekk at slug-kopiene skrives med de versjonerte stiene (vis kildekode på en underside)

### Testrunde-batch (0.6.9.1): pre-v1-innbakingen

- [ ] Alle fire eksempelsidene rendrer identisk som før innbakingen (gradienter, bilde-bakgrunner med parallaks, kalender-blokken på Hjem): versjonstallene ble endret, aldri props-formene
- [ ] Gradient-editoren: rediger farger/andeler/animasjon på et gradient-lag (Hjem eller Kaker) og se at endringer slår gjennom og publiserer rent (lift-løftingen i editoren er fjernet)
- [ ] Ny side: opprett en side i admin, publiser, og sjekk i repoet at sidefilen har `"schemaVersion": 1`
- [ ] Kalender-blokken: sett inn en ny kalender fra blokkvelgeren og se at den fungerer (version 1, ingen migrering i veien)
- [ ] Konsollen hos besøkende: ingen plassholder-advarsler («missing-migration»/«newer-than-engine») på noen av sidene

### Testrunde-batch (0.6.0.10): API-feil på admin-språket, motor-stempel og CSS-rydding

- [ ] API-feil oversettes: sett admin-språket til English (UK), logg ut i en annen fane og prøv å publisere - feilmeldingen kommer på engelsk (kode-oppslag), ikke som norsk backend-tekst
- [ ] Utløpt innlogging: med utløpt/ugyldig token gir publisering «sign in again»-varianten (koden `loginExpired`), ikke den generiske «must sign in»-meldingen med rå årsak
- [ ] Kart-søket i preview: søk på tøys (under 3 tegn og et sted som ikke finnes) med admin på et annet språk - «skriv en adresse»- og «fant ikke stedet»-meldingene følger admin-språket
- [ ] Kalender-feed-feil: pek en kalenderkilde på en ikke-godkjent vert - feilen i blokken viser vertsnavnet interpolert, på admin-språket
- [ ] Panelene etter CSS-ryddingen: klikk gjennom alle paneler (særlig Tema, Nettsted, oppsettskortet og verktøyradene) og se at ingenting har mistet stil
- [ ] Motor-stempelet: alle fire pluginene laster fortsatt (ingen «krever motor»-advarsler i konsollen), og plugin-panelet viser ingen versjonsadvarsel med engine 0.6.8 mot kravet >=0.6.8

### Testrunde-batch (0.6.0.9): SHA-pinnede actions

- [ ] Etter push: alle tre workflowene (Tester, CodeQL, Dependency review) kjører grønt med de pinnede SHA-ene, og loggene viser at riktige versjoner ble hentet (checkout v7.0.1, setup-node v7.0.0, dependency-review v5.0.0, codeql v4.37.6)
- [ ] Neste Dependabot-mandag: kommer det actions-oppdateringer, skal de stå som ÉN samlet PR som bumper SHA pluss versjonskommentaren bak, ikke en PR per action

### Testrunde-batch (0.6.0.8): vite 8.2.0 og gjenbygd bundel

- [ ] Røyktest av editoren etter byggverktøy-bumpen: åpne /admin, last en side, åpne hvert panel, rediger en blokk og publiser. Bundelen er bygget av en nyere vite, og selv om streng-literalene er bit-identiske med forrige bundel, er dette den eneste testen som faktisk kjører den

### Testrunde-batch (0.6.8.10): språkpakke-plugins

- [ ] Aktivering: åpne Plugins-panelet - «Svensk språkpakke» står der (deaktivert), viser «Språkpakke: Svenska» og ingen versjonsadvarsel. Slå den på og publiser
- [ ] Besøkende-språket: Nettsted > Språk viser nå Svenska alfabetisk mellom Norsk nynorsk og Türkçe. Velg det, og se i forhåndsvisningen at meny, «Till toppen», lysboks, galleri og nyhetsbrev-skjemaet er svenske MENS admin fortsatt er på ditt eget språk
- [ ] Publisert side: last den ekte siden med site.lang = sv - samme svenske chrome, og `<html lang="sv">` i kilden. Datobadger og kalender-månedsnavn er svenske via Intl (ikke oversatt i pakken)
- [ ] Delvis dekning: pakken dekker KUN besøkende-siden, så admin-språkvelgeren skal IKKE tilby Svenska. Sjekk at den ikke dukker opp der
- [ ] Deaktivering: slå pakken av igjen mens site.lang fortsatt er sv - siden faller til bokmål uten å kræsje, og velgeren beholder «sv» som eget alternativ så verdien ikke går tapt
- [ ] Utkast vs. publisert: slå pakken på UTEN å publisere - språket skal være valgbart i Nettsted-panelet og virke i forhåndsvisningen (utkastlista), men admin-språkvelgeren venter til det er publisert
- [ ] Lag din egen: følg «Språkpakker»-avsnittet i template/plugins/README.md og lag en pakke for et språk med admin-dekning (kopier locales/admin/nb.js, oversett noen nøkler) - de uoversatte nøklene skal vises på bokmål, ikke som nøkkelnavn
- [ ] Ingen ekstra last for innebygde språk: med site.lang = nb/en-GB skal nettverksfanen ikke vise language-packs.js i det hele tatt

### Testrunde-batch (0.6.8.9): dokumentasjonen på fem språk

- [ ] GitHub-visningen: åpne repoet på github.com - READMEen vises på engelsk med logo, språklinje og uttale-avsnittet; klikk gjennom alle fire språklenker og tilbake igjen (GitHub gjengir relative lenker riktig)
- [ ] Lenkelinjene: fra hvert dokument, klikk hvert språk - ingen 404, og gjeldende språk er uthevet uten lenke. Sjekk også de to-språks-linjene (utvikling, veikart, visjon)
- [ ] Brukerveiledningen mot ekte admin: sett admin til English (UK) og følg den engelske veiledningen - knappe- og panelnavnene i teksten skal matche det som faktisk står på skjermen. Gjenta stikkprøve på tyrkisk
- [ ] Oppsettsguiden: følg den engelske utgaven mot et ekte Cloudflare/GitHub-oppsett - menyvalgene står på engelsk (som i dashbordet), og feilsøkingstabellens symptomer matcher Urds faktiske meldinger
- [ ] Uttale-avsnittet: leser det naturlig for en engelsktalende, og stemmer *weird*-etymologien? (Samme på tyrkisk)
- [ ] Samisk gjennomgang: be gjerne en med nordsamisk som morsmål se over README-se.md, GUIDE-se.md og SETUP-se.md (alle er merket som maskinutkast)
- [ ] CONTRIBUTING: følg «Bidra med språk»-oppskriften som om du var en ny bidragsyter - er stegene nok til å legge inn en rettelse og verifisere den med paritetstesten?

### Testrunde-batch (0.6.8.8): plugin-locales (kalender, skjema, kart)

- [ ] Besøkende-språket: sett site.lang til en-GB og se på en side med kalender/skjema/kart - «Next event»-panelet, nedtellingen (Today!/Tomorrow/In {n} days), Abonner-knappene, skjemaets valideringsmeldinger og «Send», kartets «View larger map» følger språket; månedsnavn/ukedager i kalenderen likeså
- [ ] Nedtelling på samisk/tyrkisk: stikkprøv at «I dag/I morgen/Om N dager»-tekstene er ekte språk (egne nøkler, ikke rå tall); samisk er maskinutkast (funn meldes)
- [ ] Config-panelene i preview (Kilder/Skjema/Sted) og hjelpechipene følger ADMIN-språket, uavhengig av site-språket
- [ ] Plugin-navnene: Blokker-panelets «Fra plugins»-seksjon og Plugins-panelet viser names på admin-språket (Calendar/Takvim …); blokk- og variant-etiketter likeså
- [ ] Språkbytte i preview: bytt Nettsted > Språk - plugin-tekstene hos besøkende i previewen bytter MED (applyPluginSiteLocales), ingen norske rester
- [ ] Skjema-seed: sett inn Kontaktskjema-preset med admin på engelsk - feltene heter Name/Email/Message (seed); publisert skjema validerer og sender som før
- [ ] A11y: kalenderens ‹/›-månedsknapper annonserer Forrige/Neste måned på sidens språk
- [ ] Gamle manifester: en plugin UTEN locales/names-feltene lastes som før (bakoverkompatibelt)

### Testrunde-batch (0.6.8.7): seed-innhold på admin-språket

- [ ] Engelsk seed: med admin på English (UK), sett inn en Hero-, kort- og team-preset pluss tekst/knapp/FAQ-blokker - alt innsatt INNHOLD (overskrifter, brødtekst, «Read more»-knappen, FAQ-spørsmålene) er engelsk, og preset-galleriets etiketter/grupper/hint følger språket
- [ ] Footer-maler: velg «Newsletter»- og «Big CTA»-malen på engelsk - kolonnetitler, taglines, «Privacy», CTA-feltene og «Made with Urd» settes inn på engelsk
- [ ] Innsatt innhold FRYSES: bytt admin-språk etter innsetting - det alt innsatte innholdet beholder språket sitt (det er brukerdata nå), kun chromen bytter
- [ ] Norsk uendret: på bokmål settes alt inn ordrett som før
- [ ] Publisert side: seedene vises hos besøkende nøyaktig som de ble satt inn (ingen nøkler, ingen oversettelse ved rendering)
- [ ] Gruppering intakt: preset-galleriet har samme grupper og rekkefølge som før, plugin-presets samlet sist

### Testrunde-batch (0.6.8.6): canvas-chromen (verktøylinjer, hjelpekort, bildeeditor)

- [ ] Engelsk canvas-runde: med admin på English (UK), åpne preview-chromen - blokkpaletten (+ Ny blokk), preset-galleriet (+ Ny seksjon), tekst-verktøylinjens titler (pek på knappene; B/I-bokstavene), seksjonshøyde-håndtakene, multimarkeringslinjen («2 selected»), blokk-verktøylinjen og dobbeltklikk-menyen skal være engelske
- [ ] Hjelpechipene: åpne «?» på FAQ-, galleri- og samlingsblokken - kortets tittel («Slik virker …»-mønsteret) og innholdslinjene følger admin-språket; ved FØRSTE sidelast skal chipene aldri vise rå nøkler (adminLocaleReady-vinduet)
- [ ] Bildeeditoren: alle etiketter og segmentvalg følger språket; «Bytt bilde»/«Velg bilde»-ternæren riktig
- [ ] Delte kart: font-navnene, seksjonstema-valgene (Flate/Aksent/Invers), ikon-/tegnkategoriene i velgerne, bakgrunnslag-typene og animasjonsvalgene følger admin-språket i BÅDE panelene og canvas-menyene
- [ ] Besøkende upåvirket: hos besøkende (og i Ren visning uten chrome) finnes ingen spor av admin-språket; footer-sosiallenkenes aria-labels er fortsatt merkenavn 
- [ ] Norsk uendret: hele canvas-chromen ordrett som før på bokmål

### Testrunde-batch (0.6.8.5): admin-strenger B (tooltips, placeholders, panel-tekster)

- [ ] Full engelsk-runde: bytt admin-språk til English (UK) og gå gjennom ALLE paneler - gruppetitler, knapper, hint-avsnitt, placeholders og tooltips (hold pekeren over «?»-felter og knapper) skal være engelske; norsk skal ikke skinne gjennom noe sted i chromen
- [ ] Norsk uendret: med bokmål skal hele admin se ordrett ut som før
- [ ] Fargevelgeren: «koblet til temafargen»-tittelen (pek på en swatch koblet til token) interpolerer riktig på valgt språk; Fjern fargen-knappen likeså
- [ ] Bildeeditoren og tegnvelgeren: etiketter (Zoom/Lysstyrke/Kontrast/Metning, Nullstill/Bruk) følger språket
- [ ] Fet/kursiv-knappene i logo-innstillingene viser B/I på engelsk, K/I på tyrkisk, F/K på norsk
- [ ] Innhold forblir innhold: nye blokker settes fortsatt inn med norsk seed-tekst uansett admin-språk (oversettes først i 0.6.8.7), og publiserings-commitmeldingen i historikken er norsk (bevisst: delt git-historikk)

### Testrunde-batch (0.6.8.4): admin-strenger A (meldinger, dialoger, nedtrekk)

- [ ] Bytt admin-språk til English (UK): statuslinja (Angret/Undone, Publiserer…/Publishing…), publiseringsdialogene (konflikt/angre), alle nedtrekksvalg (nav-varianter, hover-stiler, galleri-visninger, footer-maler, temaforslag) og Egenskapers «Text block»-overskrift følger språket
- [ ] Norsk uendret: med bokmål skal alt se ordrett ut som før (nb-basen speiler de gamle tekstene)
- [ ] Parameteriserte meldinger: last opp et stort bilde ({kb}-melding) og en bunke der noen feiler ({n}-meldinger) - tallene settes inn riktig på alle språk
- [ ] Angre-dialogen: commit-meldingen («…») vises fortsatt ordrett i dialogen (brukerdata oversettes aldri)
- [ ] Stikkprøve nynorsk/samisk/tyrkisk: panelnavn + noen nedtrekk; samisk er maskinutkast (innholdsfeil meldes som funn, ikke stryk)

### Testrunde-batch (0.6.8.2-3): panel-refaktoren og språkvelgerne

- [ ] Panelene virker som før: klikk gjennom alle 11 (Sider, Blokker, Egenskaper, Grid, Nettsted, Tema, Nav, Footer, Samlinger, Plugins, Historikk) - åpne/lukke, Grid-overlegg følger Grid-panelet, Historikk laster, blokk-klikk åpner Egenskaper
- [ ] Auto-språk: uten lagret valg skal admin følge nettleser-/OS-språket (norsk maskin = bokmål; sett nettleseren til et ustøttet språk, f.eks. tysk = engelsk)
- [ ] Språkvelgeren i topbaren: velg hvert av de fem språkene - admin laster på nytt og panelnavnene skifter språk (resten av UI-et er fortsatt norsk til batchene 4-6); «Automatisk» går tilbake til enhetsspråket; valget overlever ny fane/omstart i samme nettleser
- [ ] Nettsted > Språk på nettsiden: bytt til f.eks. English (UK) - previewen bytter besøkende-chrome UMIDDELBART (footer-knapper, til-toppen) uten omlasting; «Upubliserte endringer» vises; publiser og sjekk at den publiserte siden følger valget
- [ ] Håndredigert lang-verdi utenfor lista (f.eks. «de» i site.json): panelet viser den som eget alternativ øverst og ødelegger ingenting
- [ ] Historikk-datoene formateres etter admin-språket

### Testrunde-batch (0.6.8.1): flerspråk-kjernen og besøkende-tekstene

- [ ] Standard uendret: en side med `"lang": "no"` (demoen) skal se HELT ut som før på bokmål - nav-tooltips, til-toppen, footer, galleri, datobadger
- [ ] Språkbytte: sett `site.lang` til `nn`, `en-GB`, `se` og `tr` (håndredigert site.json, publiser eller lokal server) - motor-chromen bytter språk (temabryterens skjermleser-tekst, burger, til-toppen, lysboksens knapper, galleri-pilene, video-tomtilstander), og `<html lang>` følger med (sjekk i devtools)
- [ ] Datoer: samlings-datobadgen viser månedsnavn på sidens språk (f.eks. «njukčamánnu» for mars på nordsamisk, «Mar» på tyrkisk)
- [ ] Nyhetsbrev-CTA: med TOM knappetekst vises språkets standard («Meld på»/«Sign up»/…); egen tekst overstyrer som før; valideringsmelding og bekreftelse følger språket; mailto-fallbackens emne/kropp likeså
- [ ] Skjermleser/a11y: footer-sosiallenkene annonserer «Facebook»/«Instagram» (ikke rå id), galleri-prikkene «Bilde 1/2/3» på sidens språk
- [ ] Lokal utvikling: `python3 dev-server.py` + site.lang satt til `en-GB` - språkfilen dynamisk-lastes uten feil i konsollen
- [ ] Ukjent språk: `"lang": "de"` gir bokmål (fallback), ingen feil
- [ ] Samisk innhold: be gjerne en med nordsamisk som morsmål se over `locales/site/se.js` (flagget i filen)

### Testrunde-batch (0.6.6.5.12): lenker til seksjon/anker og nav scroll-adferd

- [ ] Anker på tvers av sider: demo-footerens «Kakevideoen» (Utforsk-kolonnen) skal fra en annen side gå til Kaker og rulle mykt ned til videoseksjonen
- [ ] Anker på samme side: lag en knapp/footer-lenke med `#seksjons-id` fra samme side - siden ruller mykt dit uten omlasting; med redusert bevegelse hopper den direkte
- [ ] Kopier-knappen: seksjonens Egenskaper viser «Anker #id» - kopier, lim inn i et lenkefelt, og lenken virker
- [ ] Vokteren står: `javascript:alert(1)` og `//ond.no` i lenkefeltet gir fortsatt død lenke (`#`); eksterne https-lenker åpner som før med noopener
- [ ] Nav krymp: sett Meny > «Ved scrolling» til Krymp - i Ren visning og publisert blir menyen kompakt etter et stykke scrolling og normal igjen øverst; prøv også med flytende pille og størrelse Stor (skaleringene skal komponere)
- [ ] Nav skjul: «Skjul, vis ved scroll opp» - menyen glir ut ved scrolling ned, inn igjen ved scrolling opp, alltid synlig øverst; småbevegelser får den ikke til å flimre
- [ ] Mobil: med mobilmenyen åpen skal menyen aldri forsvinne; lukket oppfører den seg som på desktop
- [ ] Gating: valget «Ved scrolling» vises ikke for sidestilt variant eller når «Klistrete meny» er av; i redigeringsmodus (chrome på) står menyen alltid i ro
- [ ] Redusert bevegelse: krymp/skjul skjer som klipp uten overgang

### Testrunde-batch (0.6.0.6): gradient pan/orbit på kompositoren (transform-løpere)

- [ ] Pan (lineær gradient, «Panorer»): sett animasjonen på et gradientlag - glidningen skal se identisk ut som før (diagonal drift frem og tilbake over 18 s), uten hakking, og gradienten skal fylle seksjonen uten synlige kanter eller hvite striper i noen vindusstørrelse
- [ ] Orbit (radiell gradient, «Bane»): sentrum skal stå der det er satt (Sentrum X/Y) og banen svinge rundt det som før (26 s); prøv også et sentrum utenfor midten (f.eks. X 70 %, Y 20 %)
- [ ] Redusert bevegelse: pan viser stille utsnitt som før; orbit skal nå vise det KORREKTE forankrede sentrumet (før viste den feil hjørne av lerretet)
- [ ] Pulse/Rotate/Panorer én vei: uendret adferd (kun pan/orbit er bygget om)
- [ ] I editor-preview: gradientlag med pan/orbit redigeres og forhåndsvises som før (bytt animasjon frem og tilbake, ingen etterlatte løpere eller doble lag)

### Testrunde-batch (0.6.0.5): View Transitions mellom sider, native scrollås og myk ankerscroll

- [ ] Sidebytte-krysstoning: naviger mellom sider på den publiserte siden i Chromium - myk krysstoning der nav og footer står i ro mens innholdet toner; frem/tilbake-knappene gir samme overgang. I Firefox (uten støtte): vanlig, umiddelbar navigasjon uten feil
- [ ] Redusert bevegelse: med OS-innstillingen på skal sidebyttet være et rent klipp (ingen toning), og ankerlenker/«Til toppen» hoppe direkte
- [ ] Preview i admin: sidebytter i editoren skal være som før (ingen overgang, ingen visuelle artefakter fra view-transition-navnene)
- [ ] Scrollås: åpne lysboksen (bilde/galleri) - bakgrunnen kan ikke scrolles; lukk (Esc, kryss, bakgrunnsklikk) - scrollen er fri igjen med bevart posisjon. Prøv også re-åpning rett etter lukking
- [ ] Myk ankerscroll: en blokk-lenke til `#anker` og «Til toppen»-pilen ruller mykt hos besøkende
- [ ] Seksjonsdrag i admin: dra en seksjons topphåndtak (høyde ovenfra) - innholdet under skal stå visuelt stille som før, ingen myk/drivende scroll-kompensasjon

### Testrunde-batch (0.6.35): Høy-fiksene fra kodegjennomgangen (browser-røyk; maskinen manglet headless Chromium)

- [ ] Blokk-lenker: sett en `javascript:alert(1)`-href på knapp, bilde, samlingsinnslag og galleri-bilde (håndredigert utkast/JSON) - hos besøkende skal knappen være død ('#'), bildet uten lenke-innpakning, samlingstittelen uten lenke og galleri-flisen uten lenke (lightbox tar over der den er på); trygge https-/mailto-lenker OG interne stier/anker (`/om-oss`, `#kontakt`) virker som før
- [ ] Angre samlinger: rediger et innslag (både i panelet og klikk-og-skriv i preview) - Ctrl+Z angrer selve samlingsendringen, aldri en urelatert side-/site-endring; slett en samling og Ctrl+Z bringer den tilbake med innholdet; opprett en samling og Ctrl+Z fjerner den igjen
- [ ] Angre plugins: skru en plugin av/på og Ctrl+Z - previewen laster på nytt med forrige liste; vanlig angring av sideinnhold skal ALDRI utløse preview-reload
- [ ] Kvotevarsel: fyll utkastet med store bilder til localStorage sprenges (eller senk kvoten midlertidig i devtools) - rød feilmelding i statuslinja i stedet for stille tap; publisering frigjør plassen
- [ ] Publisering etter vokter-tilstrammingen: vanlig publisering (sider, samlinger, plugins, bilder/SVG-logo, sletting av side/samling) går gjennom uten avvisning

### Testrunde-batch (0.6.6.5.11): tema uten FOUC (light-dark()), SVG auto-trim, nav-variant «Flytende (tab)»

Bygg om på en ekte side og sjekk hos besøkende/publisert der det står:

- [ ] Ingen tema-flimmer: last (og hard-reload) den publiserte siden i lys og i mørk OS-modus - siden skal males med riktig tema fra første frame, ingen mørk-til-lys (eller omvendt) blink. Prøv også med treg tilkobling (DevTools «Slow 3G»)
- [ ] Lys/mørk-bryteren: klikk bryteren i menyen - farger OG nettleser-chrome (scrollbar/formfelt) bytter umiddelbart; reload beholder valget uten flimmer (manuelt valg skal vinne over OS)
- [ ] Følg system: uten et manuelt valg skal siden følge OS-temaet og bytte når du bytter OS-tema
- [ ] Preview i admin: endre temafarger i Tema-panelet - previewen oppdaterer live til utkastets farger, og tema-bryteren i previewen virker
- [ ] SVG auto-trim: last opp en SVG med luft rundt motivet som nav-logo, bilde-blokk og bakgrunn - logoen/bildet skal fylle plassen tett (ingen død marg rundt). Favicon: last opp en SVG - fanen skal vise et tett beskåret ikon
- [ ] Nav-variant «Flytende (tab)»: velg den i Meny > Utseende - menyen henger ned fra toppen med firkant topp og avrundet bunn. Med «Luft over menyen» av blir den en nedhengende header. Glød/luft-tilvalgene skal virke som for de andre flytende

### Testrunde-batch (0.6.6.5.9): redigerings-lerretet skalert til fullvindus-preview (identisk med publisert)

Sammenlign redigerings-visningen mot den publiserte siden («Se siden» / egen fane):

- [ ] Identisk render: det du ser i admin-lerretet skal se likt ut som den publiserte siden (samme plassering, brytning, avstand) - kun visningsstørrelsen (zoom) kan skille. Prøv på flere sider, også en uten parallaks
- [ ] Ingen topp/bunn-barer: lerretet skal fylle flaten uten svarte striper over/under, både på vanlig og svært bred skjerm
- [ ] Zoom: «Tilpass» skalerer siden til å passe vinduet (%-avlesningen viser gjeldende); «100%» viser ekte 1:1 (kan gi scroll); «Ren visning» er også 1:1 fullvindu
- [ ] Zoom følger panelene: åpne/lukk et panel (f.eks. Tema) - siden skal ombryte IDENTISK (samme render-bredde), kun zoom-prosenten endrer seg
- [ ] Redigering under skalering: blokkmeny (klikk en blokk), dra/endre størrelse, tekst-skriving og markering skal treffe riktig sted også når lerretet er skalert ned
- [ ] Mobilvisning: bytt til mobil (390px) - telefonen står sentrert på mørk flate og skaleres til å passe høyden

### Testrunde-batch (0.6.6.5.8): Nettsted-panel - navngi siden, beskrivelse, favicon

- [-] Beskrivelse: skriv en kort beskrivelse; den skal overleve publisering (brukes av søkemotorer/deling)
- [ ] Angre: etter å ha endret navn/beskrivelse skal Ctrl+Z reversere endringen

### Testrunde-batch (0.6.6.5.7): moderniser til native/CSS - parallaks scroll-drevet, faq som `<details>`, lightbox som `<dialog>`

Bygg om på en ekte side og sjekk hos besøkende/publisert der det står:

- [ ] Parallaks (scroll-drevet): legg et Bilde-bakgrunnslag med «Parallakse» på. På publisert/ren visning skal bildet henge etter ved scroll som før (samme retning og styrke), uten zoom. På mobil og ved redusert bevegelse står det stille. Skal se likt ut som før omleggingen
- [ ] FAQ (native `<details>`): sett inn en FAQ-blokk. Besøkende: klikk hvor som helst på spørsmålsraden folder ut; kun ett svar åpent av gangen (åpne et nytt lukker forrige). Ctrl/Cmd+F og søk etter tekst inne i et lukket svar skal åpne svaret automatisk. Tastatur: Tab til et spørsmål, Enter/Mellomrom folder ut
- [ ] FAQ i editor: klikk rett i et spørsmål eller svar for å skrive (skal IKKE folde ut ved skriving, mellomrom skrives normalt); pil-ikonet folder ut og inn; «flere åpne samtidig» i Egenskaper lar flere stå åpne. Blokken skal ikke hoppe/teleportere ved utfolding
- [ ] Lightbox (native `<dialog>`): klikk et bilde med lightbox på (bildeblokk eller galleri). Fullvisning åpner over ALT innhold; Esc lukker; piltastene blar; klikk på den mørke bakgrunnen lukker; fokus går tilbake til bildet du klikket fra. Tab skal holde seg inne i lightboxen (ikke havne bak den)

### Testrunde-batch (0.6.6.5.5): bakgrunnsbilde omdesignet - fri plassering, kraftig parallaks, Flislegg, SVG auto-trim, bleed

Legg et Bilde-bakgrunnslag på en seksjon (Egenskaper → Bakgrunn → Nytt lag = Bilde), og last opp en logo/et bilde:

- [ ] Størrelse: stepperen (10-400 %) og +/- krymper/forstørrer bildet. «Dekk» fyller seksjonen (beskjærer), «Vis hele» viser hele bildet - begge regner seg fram fra bilde- og seksjonsmål

### Testrunde-batch (0.6.6.5.4): seksjonstemaer, parallax, stagger, admin-kontrast, ferdige temaer + oppusset Tema-panel

- [-] Stagger: sett «Animasjon inn» = Stagger på en seksjon med flere kort; kortene skal slippes inn forskjøvet fra én trigger. Prøv begge mønstre («En etter en» og «Kolonnevis») og trinn-tiden
- [-] Ferdige temaer: Tema-panelet har seks forslag (Brønn/Stein/Plomme/Rose/Hav/Natt); klikk ett og hele temaet + lys/mørk fylles, så kan du finjustere fritt

### Testrunde-batch (0.6.6.5.2): footer-overhaling, delt bakgrunnslag for nav, Urd-logo

Footer-overhalingen (26. juli). Bygg footeren i admin (Footer-panelet) og sjekk på siden:
- [ ] Handlingsoppfordring (CTA): knapp-varianten lenker til side/URL/mailto og virker uten server; nyhetsbrev-varianten validerer e-post og viser inline bekreftelse (mot et ekte endepunkt) eller åpner mailto som fallback uten endepunkt; en stor sentrert CTA-variant finnes. NB: nyhetsbrev mot ekstern vert krever `connect-src` i `_headers`

### Testrunde-batch (0.6.31): teksteditoren «Office-linjen» (to faste rader, størrelse på markering)

Bugfikser (del 5, 24. juli):
- [ ] «Temaets (tynn)» kantlinje kan nå farges: Kantfarge-velgeren vises også for den (før kun for «Egen farge»); velger du en farge blir den en egen fargbar kantlinje

### Testrunde-batch (0.6.26): sticky blokker, klikkplassering, hjelpelinjer, toppkant-høyde (M6 batch C del 1)

- [-] Sticky: «Fest ved scrolling» på en blokk (Egenskaper/blokkmenyen, kun desktop-visning); i Ren visning fester blokken seg ved vindustoppen med valgt avstand og slipper når egen seksjon er forbi; publiser og sjekk samme adferd som besøkende (demoen: «Møt gjengen»-knappen på Om oss-siden har festing på)
- [-] Sticky med «Slipp taket» satt til en senere seksjon: blokken følger med forbi egen seksjon og slipper først der; nedtrekket viser kun seksjoner LENGER NED enn blokkens egen
- [-] Sticky i vanlig redigering (chrome på): blokken står helt stille og kan dras/redigeres som før; mobilvisningen og auto-mobil hos besøkende påvirkes aldri

### Testrunde-batch (0.6.22): sidestilt-oppfølging

- [-] Menyplassering i sidestilt (Øverst/Midt på/Nederst) virker og påvirker IKKE topplinje-plasseringen (bytt tilbake til stripe og sjekk at punktene står der de sto)

### Testrunde-batch (0.6.21): nav-testrundens fikser og nav-utseende

- [ ] Bildeutsnitt (bredde) på nav-bakgrunnsbildet: virker i sidestilt kolonne (der høyde-slideren naturlig ikke monner); begge sliderne vises for alle varianter

### Testrunde-batch (0.6.17): flytende over hero, glød-tilvalg, lys/mørk-bryter

- [ ] Bryteren på mobil: vises ved siden av burgeren; menylisten står fortsatt riktig plassert på desktop (høyre/midtstilt/venstre) med og uten bryter

### Testrunde-batch (0.6.15): dropdown-menyer og mobilmeny


- [ ] Mobilmeny: bytt preview til mobil (og test på den publiserte siden i smalt vindu/telefon) - burger vises, panelet åpner under menyen, undermenyer er trekkspill, Escape/klikk utenfor lukker
- [ ] Slett en side som ligger i en undermeny og bekreft at undermenypunktet forsvinner (en åpner som mister alle barna fjernes helt). Slett en side som et punkt MED undermeny peker på: punktet består som ren åpner og barna beholdes (buggjakt-fiks 22. juli 2026)

### Testrunde-batch (0.6.14): kart-forbedringer

- [ ] Kart adressesøk: skriv en vanlig adresse (f.eks. «Storgata 1, Oslo») i «⚙ Sted» og klikk «Bruk» - stedet slås opp og vises (krever den PUBLISERTE siden; koordinater og OSM-lenker virker også lokalt)
- [ ] Kartet vises nå ut av boksen på den publiserte siden (OSM er lagt i Urds _headers frame-src); ingen manuell CSP-jobb lenger. Bekreft at kartet faktisk viser etter publisering + deploy
- [ ] CSP-vokter-fiks: hvis kartet likevel blokkeres (annen host) får besøkende en «Åpne kartet på OpenStreetMap»-lenke i stedet for et brukket bilde; editoren får instruksen. (Rettet også en variabel-skygging fra 0.6.12 som ville kastet feil her)

## Eldre punkter uten batch

- [ ] Fargevelger-fiksen (0.6.10): klikk inne i fargevelgeren (fargeruten, feltene, prikkene) lukker den IKKE lenger; den lukkes kun ved klikk utenfor, Escape eller ved å klikke fargeruten igjen. Gjelder Tema, Nav, bakgrunnslag og oppsett
- [ ] M4 Skjema: «Kontaktskjema»-mal, sett mottaker i «⚙ Skjema», test mailto-innsending på den PUBLISERTE siden (preview validerer bare); test feltredigering (legg til/fjern/type/påkrevd), e-postvalidering og honeypot; test eksternt endepunkt om du har et
- [ ] M4 Kart: «Finn oss»-mal, lim inn koordinater i «⚙ Sted»; bekreft CSP-blokkert-melding FØR du legger `frame-src https://www.openstreetmap.org` i `template/_headers`, og at kartet vises ETTER at linjen er lagt inn og publisert
- [ ] M3 Kalender: feed-henting i produksjon med en ekte Google-kalender-id (fungerte i preview med eksempeldata; produksjon krever functions, og andre verter enn Google krever ICS_HOSTS)