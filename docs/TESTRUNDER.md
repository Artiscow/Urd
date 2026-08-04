# Testrunder (sjekkliste for manuell testing)

Nytt som er levert og venter på manuell testing i produksjon/lokalt. **Punkter strykes kun av den som tester**; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst eller oppført som en kjent bug.


### Testrunde-batch (0.6.0.7): innstillings-popover, zoom-steppere, hjelpelinje-knapp

- [ ] Tannhjulet nederst til venstre åpner Urd-innstillingene (Fargetema + Språk); begge valgene virker som før (temabytte umiddelbart, språkbytte laster på nytt)
- [ ] Popoveren lukkes ved klikk hvor som helst UTENFOR - også ved klikk på selve nettsiden i previewen - og med Escape; tannhjulet viser på-tilstand mens den er åpen
- [ ] Zoom: minus/pluss stepper i 10 %-trinn (nedre/øvre grense 10/400 %), avlesningen følger med, og Tilpass-knappen går tilbake til automatisk skalering; redigering (klikk/dra/skriv) treffer riktig også i manuell zoom
- [ ] Hjelpelinje-knappen har rutenett-ikon og viser TYDELIG når hjelpelinjene er på; av/på virker som før
- [ ] Språklistene (innstillingene + Nettsted > Språk på nettsiden) står alfabetisk etter språkets eget navn, med Automatisk øverst i admin-velgeren
- [ ] Topbaren: tema-/språkvelgerne er borte fra toppen og ingenting annet har flyttet seg

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