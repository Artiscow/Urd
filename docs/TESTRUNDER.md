# Testrunder (eiers sjekkliste)

Nytt som er levert og venter på eiers testing i produksjon/lokalt. **Kun eieren stryker herfra** når noe er testet; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert.

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

- [ ] Bakgrunnsbilde-kontroller i Nav → Utseende (vises når bilde er valgt): «Bildestyrke» toner bildet mot bakgrunnsfargen, «Bildeutsnitt (høyde)» velger hvilken del av bildet stripen viser (0 = toppen, 100 = bunnen)
- [ ] Pille-luft: «Luft over pillen» (på som standard, vises ved Flytende); skru av og bekreft at pillen ligger helt i toppen
- [ ] Sidestilt meny: velg «Sidestilt venstre» og «Sidestilt høyre» i Variant; fast kolonne langs kanten, innholdet flytter seg tilsvarende, undermenyer er trekkspill, bryteren ligger nederst i kolonnen; bytt til mobilvisning og bekreft topplinje med burger
- [ ] Variantbytte frem og tilbake (stripe ↔ flytende ↔ sidestilt) etterlater ingen rester (body-padding, klasser)
- [ ] Ny temafarge «Tekst på aksent» i Tema-panelet (og i alt-temaet): styrer teksten på primærknapper; sett en lys aksent + lys bakgrunn og bekreft at knappteksten nå kan gjøres lesbar

### Testrunde-batch (0.6.17): flytende over hero, glød-tilvalg, lys/mørk-bryter

- [ ] Flytende svever nå OVER innholdet: hero-en starter øverst bak pillen, ingen stripe/tomrom rundt pillen lenger. Test med sticky på (pillen følger med) og av (pillen blir igjen øverst); klikk på innholdet i stripene ved siden av pillen skal gå gjennom
- [ ] Glød: pillen er nå uten glød som standard; skru på «Glød rundt pillen» i Nav → Utseende (vises kun ved Flytende) og bekreft aksentglød
- [ ] Lys/mørk-bryter: i Tema → «Lys/mørk-bryter», klikk «+ Lag alternativt tema» (starter med inverterte farger), sett «Hovedtemaet er» riktig (Mørkt for dagens side), juster fargene; sol/måne-knappen dukker opp i menyen. Test at bryteren bytter tema, at valget huskes ved omlast (localStorage), at første besøk i privat vindu følger OS-preferansen, og «Foreslå på nytt (inverter)» + fjern-knappen
- [ ] Bryteren på mobil: vises ved siden av burgeren; menylisten står fortsatt riktig plassert på desktop (høyre/midtstilt/venstre) med og uten bryter

### Testrunde-batch (0.6.16): flytende pille, hover-stiler, bakgrunnsbilde

- [x] Flytende meny: velg «Flytende (pille)» i Nav → Utseende → Variant; bekreft pillen med luft rundt, at den fester med toppluft ved scrolling (sticky), og at mobilmenyens panel legger seg pent under pillen
- [x] Hover-stiler: test «Understrek», «Pille» og «Løft med glød» i Nav → Utseende → Lenke-hover, på både lyst og mørkt tema; Tab-fokus skal gi samme effekt som hover
- [x] Bakgrunnsbilde i menyen: last opp i Nav → Utseende; juster farge/dekkevne (sløret over bildet); publiser og bekreft at bildet ble en /media/meny-….webp-fil og vises hos besøkende

### Testrunde-batch (0.6.15): dropdown-menyer og mobilmeny

- [ ] Undermeny i nav: legg til undermenypunkter med «+»-knappen i Menypunkter (Nav-panelet); punkt MED egen side får lenke + pilknapp, punkt med målet «Ingen lenke» blir ren åpner. Test hover (åpner/lukker med forsinkelse), klikk på pilen, at kun én er åpen, Escape (lukker + fokus tilbake) og Tab gjennom menyen
- [ ] Mobilmeny: bytt preview til mobil (og test på den publiserte siden i smalt vindu/telefon) - burger vises, panelet åpner under menyen, undermenyer er trekkspill, Escape/klikk utenfor lukker
- [ ] Nav-farger i undermenyene: sett bakgrunnsfarge/dekkevne i Nav → Utseende og bekreft at undermenyer og mobilpanelet følger samme flate
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
- [ ] Plugin-menyene: «Plugins»-seksjonene i «+ Ny blokk», «+ Ny seksjon» og Blokker-panelet viser skjema/kart/kalender; «Kalender ▾»-foldemenyen gir de fire visningene
