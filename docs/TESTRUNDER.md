# Testrunder (eiers sjekkliste)

Nytt som er levert og venter på eiers testing i produksjon/lokalt. **Kun eieren stryker herfra** når noe er testet; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst eller oppført som en kjent bug.


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