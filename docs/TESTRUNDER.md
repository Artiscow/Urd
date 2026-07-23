# Testrunder (eiers sjekkliste)

Nytt som er levert og venter på eiers testing i produksjon/lokalt. **Kun eieren stryker herfra** når noe er testet; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert.

### Testrunde-batch (0.6.24): ikonbibliotek, tegnmeny i teksteditoren, linje- og bokstavavstand (M6 batch B)

- [ ] Ikon-blokk: velgeren (som før viste tegn/emoji) har nå tegnede SVG-ikoner øverst i fem kategorier (Sosiale medier, Kommunikasjon, Sted og tid, Symboler, Piler); velg f.eks. Instagram og sjekk at ikonet vises i blokken, følger Farge-valget og skalerer skarpt med Størrelse
- [ ] Ikon-blokk: med et tegnet ikon valgt viser panelet «Fjern tegnet ikon» i stedet for fritekstfeltet; fjerning gir tegnet/emojien tilbake; å velge et tegn i menyen bytter også bort fra SVG-ikonet; eget opplastet bilde vinner fortsatt over alt
- [ ] Ikon-blokk: en side med SVG-ikon åpnet i en eldre Urd-motor (eller med en ukjent ikon-id) skal falle stille tilbake til glyfen, aldri knekke
- [ ] Teksteditor-linjen: ny smilefjes-knapp («Sett inn tegn») åpner en rullbar tegnrad i selve linjen med Nylige øverst og samme kategorier som ikon-blokkens velger; klikk setter tegnet inn ved markøren (også midt i et ord) og lagres i utkastet
- [ ] Tegnraden og admin-velgeren deler Nylige-listen: et tegn satt inn i teksteditoren dukker opp under Nylige i ikon-blokkens velger og omvendt
- [ ] Tekstblokk: Linjeavstand-slider (1-2,5; A = arv) i Egenskaper gjelder hele feltet og overlever publisering; blir teksten høyere enn rammen, vokser rammen ved neste skriving i feltet (samme adferd som font-størrelse i dag)
- [ ] Tekstblokk: Bokstavavstand-slider (-1 til 8 px; A/0 = arv) gjelder hele feltet; negativ verdi gir tettere tekst
- [ ] Eldre tekstblokker uten de nye feltene rendres uendret (arv fra tema)

### Testrunde-batch (0.6.22): sidestilt-oppfølging

- [x] Sidestilt meny: velg sidestilt på en side som aldri har rørt Menyplassering; menypunktene skal stå ØVERST i kolonnen (rett under logoen), uansett hva Menyplassering sto på i topplinjen (plasseringen i kolonnen er nå et eget valg med Øverst som standard)
- [ ] Menyplassering i sidestilt (Øverst/Midt på/Nederst) virker og påvirker IKKE topplinje-plasseringen (bytt tilbake til stripe og sjekk at punktene står der de sto)
- [x] Undermeny i sidestilt kolonne: hover ÅPNER trekkspillet, men lukker det ALDRI mens pekeren er blant menypunktene (flere kan stå åpne samtidig); alt lukkes samlet når pekeren forlater kolonnen; klikk på pilen virker som før
- [x] Panelet: Menyplassering og Lenke-hover (med Glødstyrke og hover-fargene) står rett under Størrelse i alle varianter; Bakgrunnsfarge/Gjennomsiktighet/Uskarphet/Tekstfarge kommer etter
- [x] Undermeny → Design viser kun Standard/Pille-punkter/Understrek-liste når sidestilt er valgt (Ren flate og Utfall er meningsløse i kolonnen); alle fem vises for stripe/flytende
- [x] Pille-punkter og Understrek-liste i sidestilt kolonne: trekkspillpunktene får henholdsvis pilleform og skillelinjer
- [x] Undermeny-design Kort: ingen mørkere skygge-bånd oppå baren lenger (kortets skygge faller kun nedover, som utfall); sjekk særlig flytende pille/firkant med farget bakgrunn
- [x] Pille-punkter: nytt «Punktfarge»-valg i Undermeny-gruppen (vises kun når Design = Pille-punkter); uten valg brukes undermeny-flaten som før
- [ ] Fargevelger-popoveren: innholdet (sliderne, hex-feltet, fargeprikkene) holder seg INNE i boksen, og boksen inne i panelet (målt rotårsak: grid-kolonnen ble max-content-bred og innholdet fløt 59px ut av boksen; verifisert med headless-nettleser etter fiks)
- [ ] Effektfargen ved hover heter nå Strekfarge/Pillefarge/Glødfarge etter valgt Lenke-hover, og vises IKKE for Standard og Løft (uten glød); «Tekstfarge ved hover» vises alltid
- [ ] Smalt vindu i editorens desktop-preview: menyen (også sidestilt) blir burger under mobil-breakpointet selv om resten av previewen fortsatt er desktop (strukturverktøyene beholdes); hos besøkende som før
- [x] Panelet: «Variant» heter nå «Navigasjonsmeny»; Gjennomsiktighet og Uskarphet står rett under den (etter variantvalgene Glød/Luft/Tekstjustering); Tekstfarge står sammen med fargevalgene, rett etter Bakgrunnsfarge

### Testrunde-batch (0.6.21): nav-testrundens fikser og nav-utseende

- [ ] Fargevelgeren i Nav → Utseende (Bakgrunnsfarge/Tekstfarge/hover-fargene): klikk på fargeflaten, sliderne og feltene INNE i velgeren skal IKKE lukke den; kun klikk utenfor, klikk i forhåndsvisningen eller Escape (rotårsaker: label-videresending + iframe-klikk når aldri editorens document)
- [ ] Fargevelger-popoveren holder seg innenfor panelet (henger ikke ut over forhåndsvisningen) og boksen omslutter alt innholdet (border-box-fiks)
- [ ] Logo-bilde: sett bildehøyde 94px (og prøv enda større) i alle varianter og størrelser; nav-baren skal ALDRI vokse, bildet vokser ut av linjen
- [ ] Undermenyen lander NØYAKTIG på barens bunn (aldri oppå baren, heller ikke de få pikslene som synes som mørkere bånd på gjennomsiktige flater), også med stor logo, lys/mørk-bryter i verktøyklyngen og i flytende variant; utfall (full bredde) flukter med barens bunn uten skygge-bånd oppover
- [x] Undermenyen og mobilpanelet får kun bakgrunnsfargen som standard når nav har bakgrunnsbilde; «Bakgrunnsbilde også i undermenyen» (i den nye Undermeny-gruppen) skrur bildet på
- [ ] Sidestilt meny på smale vinduer: smaln nettleservinduet under ca. 900px, kolonnen skal bli en VANLIG topplinje med horisontale menypunkter (som stripe-varianten; virker også i editorens preview); burgeren kommer først under mobil-breakpointet; over 900px kommer kolonnen tilbake
- [ ] Undermeny i sidestilt kolonne: åpnes og lukkes KUN med klikk (hover lukker ikke lenger kolonnen under pekeren, så man ikke feilklikker på punktet under)
- [ ] Sidebredde: dra i kolonnekanten i previewen (180-400px); innholdet flytter seg med, og bredden overlever publisering
- [ ] Bildeutsnitt (bredde) på nav-bakgrunnsbildet: virker i sidestilt kolonne (der høyde-slideren naturlig ikke monner); begge sliderne vises for alle varianter
- [x] Menyplassering i sidestilt = vertikal plassering (Øverst/Midt på/Nederst); Tekstjustering (venstre/midt/høyre) justerer punktene i kolonnen
- [x] Undermeny-pilen i kolonnen: høyrestilt tekst gir pil på VENSTRE side; midtstilt tekst står i ro (pilen skyver ikke); venstrestilt har pilen til høyre
- [x] Klistrete meny-valget er skjult for sidestilt (irrelevant der); vises for stripe/flytende
- [x] Fire størrelser (Liten/Standard/Stor/Ekstra stor) i alle varianter; Standard = nøyaktig utseendet fra før
- [x] Hover-farge + Tekstfarge ved hover i alle hover-stilene (Understrek: strek = hover-farge, tekst = tekstfarge ved hover)
- [x] Ny hover-stil «Løft» (kun løft, ingen glød); «Løft med glød» har fått «Glødstyrke»-slider, og gløden ligger BAK teksten
- [x] Ny variant «Flytende (firkant)»: som pillen uten avrunding, med glød- og luft-valgene
- [x] «Luft over menyen» av (flytende): menyen skal ligge HELT inntil toppen, ingen rest-luft
- [x] Undermeny-design i den nye Undermeny-gruppen: Kort, Ren flate, Pille-punkter, Understrek-liste, Utfall (full bredde) + Kolonner (2 gir 2x2-rutenett osv.); utfall bør sjekkes ekstra i flytende variant
- [x] Panelet: Variant og Størrelse står øverst i Utseende med variantvalgene (Glød/Luft/Tekstjustering) rett under Variant; «Bakgrunnsfarge» (før «Bakgrunn») og «Gjennomsiktighet» (0 % = tett, før «Dekkevne»); undermeny-innstillingene i egen Undermeny-gruppe; forklaringene bor i tooltips, ikke tekstavsnitt

### Testrunde-batch (0.6.20): galleri-blokk, lightbox, hero-galleri, preset-miniatyrer

- [ ] Galleri-blokk: legg til via Blokker → Galleri («Tomt galleri» og «Galleri med bilder» med flere filer valgt samtidig) og via «+ Ny blokk» i en seksjon; tomt galleri viser «Legg til bilder i Egenskaper»
- [ ] Egenskaper-panelet: «+ Legg til bilder» (flervalg, hele bunken skal være ETT angre-steg), omorganiser med pilene, fjern, alt-tekst og lenke per bilde
- [ ] Rutenett-visningen: kolonner (1-6) og «Luft mellom bildene»; blokken vokser automatisk med innholdet uten at en dratt blokk teleporteres; mobilvisning viser maks 2 kolonner
- [ ] Karusell-visningen: sidescroll med snap og pilknapper; VIKTIG å teste at blokk-dra i preview fortsatt virker forbi karusellen (scroll mot dra kan sloss)
- [ ] Lysbilde-visningen: bytter automatisk (Sekunder per bilde), piler og prikker; i editoren skal den STÅ STILLE med chrome på og kun rykke frem i Ren visning; rediger tekst intenst i en seksjon med lysbilde i ~30 s og bekreft at det ikke stables timere (ingen hakking/oppspinning)
- [ ] Flisklikk i preview: chrome på åpner bildeeditoren (utsnitt/zoom/filtre/alt/bytt/fjern); Ren visning åpner lightboxen
- [ ] Lightbox hos besøkende (publisert side eller lokal server uten ?preview): klikk åpner fullskjerm, forrige/neste, piltaster, Esc, bakgrunnsklikk lukker, scroll er låst mens den er åpen, alt-tekst vises som bildetekst; et bilde MED lenke navigerer i stedet for å åpne lightbox
- [ ] Bildeblokkens «Fullskjerm ved klikk (lightbox)»: avkryssingen i Egenskaper (skjules når lenke er satt); virker hos besøkende og i Ren visning
- [ ] Hero-galleri: legg bakgrunnslaget «Bildegalleri» på en seksjon; last opp flere bilder, juster fokus per bilde, sekunder/overgang/uskarphet/styrke; krysstoningen skal være myk uten blink av halvlastede bilder; med ETT bilde vises det statisk; test OS-innstillingen «redusert bevegelse» (ingen bytter, ingen toning)
- [ ] Publisering med galleri + hero-galleri: alle bildene blir /media/…webp-filer, og republisering uten endringer lager ingen duplikatfiler
- [ ] Preset-miniatyrer: «+ Ny seksjon» viser en liten skisse per mal (også plugin-malene); skissene følger temafargene og ligner malens faktiske utlegg
- [ ] Ny «Galleri»-seksjonsmal under Grunnleggende; demosiden (hjem) har fått en galleri-seksjon med tre bilder som kan brukes til testingen

### Testrunde-batch (0.6.18): bildekontroller, pille-luft, sidestilt meny

- [x]Bakgrunnsbilde-kontroller i Nav → Utseende (vises når bilde er valgt): «Bildestyrke» toner bildet mot bakgrunnsfargen, «Bildeutsnitt (høyde)» velger hvilken del av bildet stripen viser (0 = toppen, 100 = bunnen)
- [x] Pille-luft: «Luft over pillen» (på som standard, vises ved Flytende); skru av og bekreft at pillen ligger helt i toppen
- [x] Sidestilt meny: velg «Sidestilt venstre» og «Sidestilt høyre» i Variant; fast kolonne langs kanten, innholdet flytter seg tilsvarende, undermenyer er trekkspill, bryteren ligger nederst i kolonnen; bytt til mobilvisning og bekreft topplinje med burger
- [x] Variantbytte frem og tilbake (stripe ↔ flytende ↔ sidestilt) etterlater ingen rester (body-padding, klasser)
- [x] Ny temafarge «Tekst på aksent» i Tema-panelet (og i alt-temaet): styrer teksten på primærknapper; sett en lys aksent + lys bakgrunn og bekreft at knappteksten nå kan gjøres lesbar

### Testrunde-batch (0.6.17): flytende over hero, glød-tilvalg, lys/mørk-bryter

- [x] Flytende svever nå OVER innholdet: hero-en starter øverst bak pillen, ingen stripe/tomrom rundt pillen lenger. Test med sticky på (pillen følger med) og av (pillen blir igjen øverst); klikk på innholdet i stripene ved siden av pillen skal gå gjennom
- [x] Glød: pillen er nå uten glød som standard; skru på «Glød rundt pillen» i Nav → Utseende (vises kun ved Flytende) og bekreft aksentglød
- [x] Lys/mørk-bryter: i Tema → «Lys/mørk-bryter», klikk «+ Lag alternativt tema» (starter med inverterte farger), sett «Hovedtemaet er» riktig (Mørkt for dagens side), juster fargene; sol/måne-knappen dukker opp i menyen. Test at bryteren bytter tema, at valget huskes ved omlast (localStorage), at første besøk i privat vindu følger OS-preferansen, og «Foreslå på nytt (inverter)» + fjern-knappen
- [ ] Bryteren på mobil: vises ved siden av burgeren; menylisten står fortsatt riktig plassert på desktop (høyre/midtstilt/venstre) med og uten bryter

### Testrunde-batch (0.6.16): flytende pille, hover-stiler, bakgrunnsbilde

- [x] Flytende meny: velg «Flytende (pille)» i Nav → Utseende → Variant; bekreft pillen med luft rundt, at den fester med toppluft ved scrolling (sticky), og at mobilmenyens panel legger seg pent under pillen
- [x] Hover-stiler: test «Understrek», «Pille» og «Løft med glød» i Nav → Utseende → Lenke-hover, på både lyst og mørkt tema; Tab-fokus skal gi samme effekt som hover
- [x] Bakgrunnsbilde i menyen: last opp i Nav → Utseende; juster farge/dekkevne (sløret over bildet); publiser og bekreft at bildet ble en /media/meny-….webp-fil og vises hos besøkende

### Testrunde-batch (0.6.15): dropdown-menyer og mobilmeny

- [x] Undermeny i nav: legg til undermenypunkter med «+»-knappen i Menypunkter (Nav-panelet); punkt MED egen side får lenke + pilknapp, punkt med målet «Ingen lenke» blir ren åpner. Test hover (åpner/lukker med forsinkelse), klikk på pilen, at kun én er åpen, Escape (lukker + fokus tilbake) og Tab gjennom menyen
- [ ] Mobilmeny: bytt preview til mobil (og test på den publiserte siden i smalt vindu/telefon) - burger vises, panelet åpner under menyen, undermenyer er trekkspill, Escape/klikk utenfor lukker
- [x] Nav-farger i undermenyene: sett bakgrunnsfarge/dekkevne i Nav → Utseende og bekreft at undermenyer og mobilpanelet følger samme flate
- [ ] Slett en side som ligger i en undermeny og bekreft at undermenypunktet forsvinner (en åpner som mister alle barna fjernes helt). Slett en side som et punkt MED undermeny peker på: punktet består som ren åpner og barna beholdes (buggjakt-fiks 22. juli 2026)

### Testrunde-batch (0.6.14): kart-forbedringer

- [ ] Kart adressesøk: skriv en vanlig adresse (f.eks. «Storgata 1, Oslo») i «⚙ Sted» og klikk «Bruk» - stedet slås opp og vises (krever den PUBLISERTE siden; koordinater og OSM-lenker virker også lokalt)
- [ ] Kartet vises nå ut av boksen på den publiserte siden (OSM er lagt i Urds _headers frame-src); ingen manuell CSP-jobb lenger. Bekreft at kartet faktisk viser etter publisering + deploy
- [ ] CSP-vokter-fiks: hvis kartet likevel blokkeres (annen host) får besøkende en «Åpne kartet på OpenStreetMap»-lenke i stedet for et brukket bilde; editoren får instruksen. (Rettet også en variabel-skygging fra 0.6.12 som ville kastet feil her)

### Testrunde-batch (0.6.11): editor-UI-sveip

- [x] Egenskaper-omorganisering: X/Y/Bredde/Høyde/Lag/Rotasjon + «Skjul i mobil» ligger nå i en sammenleggbar «Plassering, lag og rotasjon» nederst i panelet, for ALLE blokktyper. Bekreft at de fortsatt virker og at panelet er ryddigere
- [ ] Bildeblokk full editor (0.6.11): editoren viser ikke hele bildet i sin preview.

## Eldre punkter uten batch

- [ ] Fargevelger-fiksen (0.6.10): klikk inne i fargevelgeren (fargeruten, feltene, prikkene) lukker den IKKE lenger; den lukkes kun ved klikk utenfor, Escape eller ved å klikke fargeruten igjen. Gjelder Tema, Nav, bakgrunnslag og oppsett
- [ ] M4 Skjema: «Kontaktskjema»-mal, sett mottaker i «⚙ Skjema», test mailto-innsending på den PUBLISERTE siden (preview validerer bare); test feltredigering (legg til/fjern/type/påkrevd), e-postvalidering og honeypot; test eksternt endepunkt om du har et
- [ ] M4 Kart: «Finn oss»-mal, lim inn koordinater i «⚙ Sted»; bekreft CSP-blokkert-melding FØR du legger `frame-src https://www.openstreetmap.org` i `template/_headers`, og at kartet vises ETTER at linjen er lagt inn og publisert
- [ ] M3 Kalender: feed-henting i produksjon med en ekte Google-kalender-id (fungerte i preview med eksempeldata; produksjon krever functions, og andre verter enn Google krever ICS_HOSTS)
- [x] Plugin-menyene: «Plugins»-seksjonene i «+ Ny blokk», «+ Ny seksjon» og Blokker-panelet viser skjema/kart/kalender; «Kalender ▾»-foldemenyen gir de fire visningene
