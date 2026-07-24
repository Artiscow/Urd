# Testrunder (eiers sjekkliste)

Nytt som er levert og venter på eiers testing i produksjon/lokalt. **Kun eieren stryker herfra** når noe er testet; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert.

### Testrunde-batch (0.6.31): teksteditoren «Office-linjen» (to faste rader, størrelse på markering)

Bugfikser i teksteditoren (del 2, 24. juli):
- [ ] Egendefinert fargevelger: markeringen bevares nå gjennom hele fargevalget (dra i fargeflaten og se fargen endres live uten at markeringen mistes eller fargen legger seg feil); rotårsaken var at den lagrede markeringen ikke ble fornyet mellom live-kallene

Bugfikser (del 3, 24. juli):
- [ ] Blokk-styling (Tekstboks / FAQ-kort, i kortstilen under Tekstboks-valget): NY «Blokkfarge» (egen bakgrunnsfarge, tom = temaets flate, med fjern-knapp), NY «Skyggefarge» (vises når Skygge er valgt), og temaets tynne kantlinje er nå synlig nok til å leses som en kant (var nesten usynlig); «Egen farge» på Kantlinje gir full fargevalg som før. Eldre bokser ser like ut

Bugfikser (del 5, 24. juli):
- [ ] «Temaets (tynn)» kantlinje kan nå farges: Kantfarge-velgeren vises også for den (før kun for «Egen farge»); velger du en farge blir den en egen fargbar kantlinje
- [ ] Dobbeltklikk-menyen («+ Ny blokk» ved pekeren) ligger nå OVER seksjonslinjene og «+ Ny seksjon»-stripen (de vises ikke lenger gjennom menyen)

Bugfikser (del 4, 24. juli - fler edit-chrome-elementer til Urd-tema + kortstil-finpuss):
- [ ] ALT redigerings-chrome følger nå Urd-adminens tema, ikke sidens: blokk-omrisset (også hover-omrisset), grid-overlegget, hjelpe-/side-linjene (guides), marquee-rammen, «+ Ny seksjon»-stripen, seksjons-dragelinjene (topp/bunn), «?»-hjelpechippen, preset-menyen og kalenderens «⚙ Kilder»-knapp. Sidens EGNE knapper («Les mer» osv.) beholder sidetemaet

### Testrunde-batch (0.6.29): gradient-editor, kortstiler, FAQ-akkordeon (M6 batch D del 1)

- [ ] Kortstiler på Tekstboks (innstillingene står rett under Tekstboks-valget): Skygge (Ingen/Myk/Tydelig), Kantlinje (Temaets/Ingen/Egen farge med tykkelse), Glass-effekt (frostet, best over bilder/gradienter); uten valg ser boksen ut som før
- [ ] FAQ-blokk (Blokker-panelet): spørsmålskort der svaret foldes ut ved klikk; hos besøkende åpner hele raden, i editoren er det pilknappen (tekstene er direkte redigerbare der); «Flere svar åpne samtidig» i Egenskaper; demoen: FAQ-seksjon på Om oss med glass + myk skygge
- [ ] FAQ-redigering: klikk rett i spørsmål/svar og skriv (svar har hele formateringslinjen, men uten Aa-raden - typografi der er tekstblokkens); nye spørsmål, rekkefølge og sletting i Egenskaper eller blokkmenyen; blokken lagrer sammenfoldet høyde og utfolding vokser kun visuelt (gir aldri «Upubliserte endringer» av seg selv)
- [ ] Kortstil på FAQ: samme Skygge/Kantlinje/Glass-valg gjelder alle kortene i blokken

### Testrunde-batch (0.6.27): multimarkering (M6 batch C del 2)

- [ ] Ren visning og mobilvisning: ingen marquee, ingen verktøylinje, ingen utvalgsrammer

### Testrunde-batch (0.6.26): sticky blokker, klikkplassering, hjelpelinjer, toppkant-høyde (M6 batch C del 1)

- [ ] Sticky: «Fest ved scrolling» på en blokk (Egenskaper/blokkmenyen, kun desktop-visning); i Ren visning fester blokken seg ved vindustoppen med valgt avstand og slipper når egen seksjon er forbi; publiser og sjekk samme adferd som besøkende (demoen: «Møt gjengen»-knappen på Om oss-siden har festing på)
- [ ] Sticky med «Slipp taket» satt til en senere seksjon: blokken følger med forbi egen seksjon og slipper først der; nedtrekket viser kun seksjoner LENGER NED enn blokkens egen
- [ ] Sticky i vanlig redigering (chrome på): blokken står helt stille og kan dras/redigeres som før; mobilvisningen og auto-mobil hos besøkende påvirkes aldri

### Testrunde-batch (0.6.25): blokkmeny, testrunde-fikser på batch B

- [ ] Ikon-blokk: Farge er nå en full fargevelger (temafarger + egen farge), ikke bare de fire tokenene
- [ ] «Valgområdet vokser» fra forrige runde: IKKE reprodusert i målingene (ikon/tekst/galleri/kalender målt over gjentatte prop-endringer i headless-nettleser, alle stabile); si fra med en konkret oppskrift (blokktype + handling) om det skjer igjen

### Testrunde-batch (0.6.22): sidestilt-oppfølging

- [-] Menyplassering i sidestilt (Øverst/Midt på/Nederst) virker og påvirker IKKE topplinje-plasseringen (bytt tilbake til stripe og sjekk at punktene står der de sto)
- [ ] Effektfargen ved hover heter nå Strekfarge/Pillefarge/Glødfarge etter valgt Lenke-hover, og vises IKKE for Standard og Løft (uten glød); «Tekstfarge ved hover» vises alltid
- [ ] Smalt vindu i editorens desktop-preview: menyen (også sidestilt) blir burger under mobil-breakpointet selv om resten av previewen fortsatt er desktop (strukturverktøyene beholdes); hos besøkende som før

### Testrunde-batch (0.6.21): nav-testrundens fikser og nav-utseende

- [ ] Fargevelgeren i Nav → Utseende (Bakgrunnsfarge/Tekstfarge/hover-fargene): klikk på fargeflaten, sliderne og feltene INNE i velgeren skal IKKE lukke den; kun klikk utenfor, klikk i forhåndsvisningen eller Escape (rotårsaker: label-videresending + iframe-klikk når aldri editorens document)
- [ ] Fargevelger-popoveren holder seg innenfor panelet (henger ikke ut over forhåndsvisningen) og boksen omslutter alt innholdet (border-box-fiks)
- [ ] Logo-bilde: sett bildehøyde 94px (og prøv enda større) i alle varianter og størrelser; nav-baren skal ALDRI vokse, bildet vokser ut av linjen
- [ ] Bildeutsnitt (bredde) på nav-bakgrunnsbildet: virker i sidestilt kolonne (der høyde-slideren naturlig ikke monner); begge sliderne vises for alle varianter

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

### Testrunde-batch (0.6.17): flytende over hero, glød-tilvalg, lys/mørk-bryter

- [ ] Bryteren på mobil: vises ved siden av burgeren; menylisten står fortsatt riktig plassert på desktop (høyre/midtstilt/venstre) med og uten bryter

### Testrunde-batch (0.6.15): dropdown-menyer og mobilmeny


- [ ] Mobilmeny: bytt preview til mobil (og test på den publiserte siden i smalt vindu/telefon) - burger vises, panelet åpner under menyen, undermenyer er trekkspill, Escape/klikk utenfor lukker
- [ ] Slett en side som ligger i en undermeny og bekreft at undermenypunktet forsvinner (en åpner som mister alle barna fjernes helt). Slett en side som et punkt MED undermeny peker på: punktet består som ren åpner og barna beholdes (buggjakt-fiks 22. juli 2026)

### Testrunde-batch (0.6.14): kart-forbedringer

- [ ] Kart adressesøk: skriv en vanlig adresse (f.eks. «Storgata 1, Oslo») i «⚙ Sted» og klikk «Bruk» - stedet slås opp og vises (krever den PUBLISERTE siden; koordinater og OSM-lenker virker også lokalt)
- [ ] Kartet vises nå ut av boksen på den publiserte siden (OSM er lagt i Urds _headers frame-src); ingen manuell CSP-jobb lenger. Bekreft at kartet faktisk viser etter publisering + deploy
- [ ] CSP-vokter-fiks: hvis kartet likevel blokkeres (annen host) får besøkende en «Åpne kartet på OpenStreetMap»-lenke i stedet for et brukket bilde; editoren får instruksen. (Rettet også en variabel-skygging fra 0.6.12 som ville kastet feil her)

### Testrunde-batch (0.6.11): editor-UI-sveip

- [ ] Bildeblokk full editor (0.6.11): editoren viser ikke hele bildet i sin preview.

## Eldre punkter uten batch

- [ ] Fargevelger-fiksen (0.6.10): klikk inne i fargevelgeren (fargeruten, feltene, prikkene) lukker den IKKE lenger; den lukkes kun ved klikk utenfor, Escape eller ved å klikke fargeruten igjen. Gjelder Tema, Nav, bakgrunnslag og oppsett
- [ ] M4 Skjema: «Kontaktskjema»-mal, sett mottaker i «⚙ Skjema», test mailto-innsending på den PUBLISERTE siden (preview validerer bare); test feltredigering (legg til/fjern/type/påkrevd), e-postvalidering og honeypot; test eksternt endepunkt om du har et
- [ ] M4 Kart: «Finn oss»-mal, lim inn koordinater i «⚙ Sted»; bekreft CSP-blokkert-melding FØR du legger `frame-src https://www.openstreetmap.org` i `template/_headers`, og at kartet vises ETTER at linjen er lagt inn og publisert
- [ ] M3 Kalender: feed-henting i produksjon med en ekte Google-kalender-id (fungerte i preview med eksempeldata; produksjon krever functions, og andre verter enn Google krever ICS_HOSTS)