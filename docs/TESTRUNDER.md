# Testrunder (eiers sjekkliste)

Nytt som er levert og venter på eiers testing i produksjon/lokalt. **Kun eieren stryker herfra** når noe er testet; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert.

### Testrunde-batch (0.6.27): multimarkering (M6 batch C del 2)

- [ ] Marquee: dra en ramme på tom seksjonsflate; alle blokker rammen berører (delvis holder) blir utvalget, med stiplet markering per blokk og en flytende verktøylinje («N valgt») over utvalget; klikk uten dra virker som før
- [ ] Shift-klikk: bygg utvalget blokk for blokk (legg til/fjern); utvalget er avgrenset til ÉN seksjon (shift-klikk i en annen seksjon starter nytt utvalg)
- [ ] Gruppe-dra: dra i et hvilket som helst medlem, hele utvalget følger med (samme forskyvning, klemt mot seksjonskantene i bredden); ETT Ctrl+Z ruller hele draget; klikk på et medlem kollapser IKKE utvalget (klikk på tom flate eller Esc gjør det)
- [ ] Piltaster flytter hele utvalget i grid-steg (Shift = 1 px); Delete/Backspace sletter hele utvalget som ETT angre-steg
- [ ] Ctrl+C/V: kopier utvalget (eller én markert blokk) og lim inn; det innlimte får bevart innbyrdes oppsett, litt forskjøvet, blir det nye utvalget, og hele innlimingen er ETT angre-steg; nytt Ctrl+V fortsetter fra det innlimte; innliming går til den AKTIVE seksjonen (sist klikkede); utklippstavlen nullstilles ved sidebytte (kjent avgrensning)
- [ ] Ctrl+D med utvalg dupliserer hele utvalget
- [ ] Verktøylinjen: venstre/midt/høyre + topp/midte/bunn justerer innenfor utvalgets egen boks; «Fordel jevnt» (vises kun ved 3+) gjør luften mellom blokkene lik; hver knapp er ett angre-steg
- [ ] Ren visning og mobilvisning: ingen marquee, ingen verktøylinje, ingen utvalgsrammer

### Testrunde-batch (0.6.26): sticky blokker, klikkplassering, hjelpelinjer, toppkant-høyde (M6 batch C del 1)

- [ ] Sticky: «Fest ved scrolling» på en blokk (Egenskaper/blokkmenyen, kun desktop-visning); i Ren visning fester blokken seg ved vindustoppen med valgt avstand og slipper når egen seksjon er forbi; publiser og sjekk samme adferd som besøkende (demoen: «Møt gjengen»-knappen på Om oss-siden har festing på)
- [ ] Sticky med «Slipp taket» satt til en senere seksjon: blokken følger med forbi egen seksjon og slipper først der; nedtrekket viser kun seksjoner LENGER NED enn blokkens egen
- [ ] Sticky i vanlig redigering (chrome på): blokken står helt stille og kan dras/redigeres som før; mobilvisningen og auto-mobil hos besøkende påvirkes aldri
- [ ] + Ny blokk der man klikker: DOBBELTKLIKK på tom seksjonsflate åpner blokkmenyen ved pekeren, og blokken lander sentrert på klikkpunktet (klemt innenfor seksjonen, snappet til grid); den nye blokken er markert med en gang (også fra hjørneknappen, som fortsatt sentrerer som før)
- [ ] Hjelpelinjer: ny knapp ved visningsvalgene i topplinjen viser stiplete linjer i alle seksjoner (sidens senter, seksjonens midte, innholdsbredde på 4 %/96 % - si fra om margen bør være en annen); overlever redigering, skjules i Ren visning, huskes til neste økt
- [ ] Toppkant-håndtak: dra i seksjonens ØVERSTE kant for å gi/fjerne luft øverst; innholdet står visuelt bom stille (også scrollposisjonen), naboseksjonene røres aldri, ingen blokk havner over toppen (blokker som allerede henger over stopper krymping), og ETT Ctrl+Z angrer hele justeringen; bunnkant-håndtaket virker som før

### Testrunde-batch (0.6.25): blokkmeny, testrunde-fikser på batch B

- [ ] BLOKKMENY (nytt): tannhjul-knapp på hver blokks verktøylinje åpner en flytende meny ved blokken med ALLE blokk-innstillingene (samme innhold som Egenskaper-panelet, de kan aldri divergere); lukkes med X, Esc eller ved avmarkering; havner til venstre for blokken når det er trangt til høyre
- [ ] Ctrl+D: en blokk lagt til via paletten er nå markert med en gang (både i preview og admin), så Ctrl+D virker uten et ekstra klikk først; Ctrl+D virker også når fokus står i tallfelt, slidere og brytere i panelene (kun skrivefelt beholder nettleserens snarvei)
- [ ] Ikon-blokk: tegnede ikoner er SENTRERT i rammen (målt: lik luft på alle sider), i alle størrelser
- [ ] Ikon-blokk: Farge er nå en full fargevelger (temafarger + egen farge), ikke bare de fire tokenene
- [ ] Tegn-/ikonvelgeren: ikonene og tegnene er lyse (var svarte på mørk meny), Nylige står øverst, og swatch-knappen viser det som faktisk er valgt - også eget opplastet bilde; å velge tegn/ikon i menyen bytter bort fra det opplastede bildet
- [ ] Teksteditor-linjen: ny Aa-knapp åpner typografiraden med Font, Størrelse (A/S/M/L/XL/px), Linjeavstand og Bokstavavstand for hele feltet - alt uten å gå til Egenskaper; endringene vises umiddelbart og linjen består (gjenoppkobles etter re-render)
- [ ] «Valgområdet vokser» fra forrige runde: IKKE reprodusert i målingene (ikon/tekst/galleri/kalender målt over gjentatte prop-endringer i headless-nettleser, alle stabile); si fra med en konkret oppskrift (blokktype + handling) om det skjer igjen

### Testrunde-batch (0.6.24): ikonbibliotek, tegnmeny i teksteditoren, linje- og bokstavavstand (M6 batch B)

- [ ] Ikon-blokk: velgeren (som før viste tegn/emoji) har nå tegnede SVG-ikoner øverst i fem kategorier (Sosiale medier, Kommunikasjon, Sted og tid, Symboler, Piler); velg f.eks. Instagram og sjekk at ikonet vises i blokken, følger Farge-valget og skalerer skarpt med Størrelse
- [ ] Tekstblokk: Linjeavstand-slider (1-2,5; A = arv) i Egenskaper gjelder hele feltet og overlever publisering; blir teksten høyere enn rammen, vokser rammen ved neste skriving i feltet (samme adferd som font-størrelse i dag)
- [ ] Tekstblokk: Bokstavavstand-slider (-1 til 8 px; A/0 = arv) gjelder hele feltet; negativ verdi gir tettere tekst

### Testrunde-batch (0.6.22): sidestilt-oppfølging

- [-] Menyplassering i sidestilt (Øverst/Midt på/Nederst) virker og påvirker IKKE topplinje-plasseringen (bytt tilbake til stripe og sjekk at punktene står der de sto)
- [ ] Fargevelger-popoveren: innholdet (sliderne, hex-feltet, fargeprikkene) holder seg INNE i boksen, og boksen inne i panelet (målt rotårsak: grid-kolonnen ble max-content-bred og innholdet fløt 59px ut av boksen; verifisert med headless-nettleser etter fiks)
- [ ] Effektfargen ved hover heter nå Strekfarge/Pillefarge/Glødfarge etter valgt Lenke-hover, og vises IKKE for Standard og Løft (uten glød); «Tekstfarge ved hover» vises alltid
- [ ] Smalt vindu i editorens desktop-preview: menyen (også sidestilt) blir burger under mobil-breakpointet selv om resten av previewen fortsatt er desktop (strukturverktøyene beholdes); hos besøkende som før

### Testrunde-batch (0.6.21): nav-testrundens fikser og nav-utseende

- [ ] Fargevelgeren i Nav → Utseende (Bakgrunnsfarge/Tekstfarge/hover-fargene): klikk på fargeflaten, sliderne og feltene INNE i velgeren skal IKKE lukke den; kun klikk utenfor, klikk i forhåndsvisningen eller Escape (rotårsaker: label-videresending + iframe-klikk når aldri editorens document)
- [ ] Fargevelger-popoveren holder seg innenfor panelet (henger ikke ut over forhåndsvisningen) og boksen omslutter alt innholdet (border-box-fiks)
- [ ] Logo-bilde: sett bildehøyde 94px (og prøv enda større) i alle varianter og størrelser; nav-baren skal ALDRI vokse, bildet vokser ut av linjen
- [ ] Undermenyen lander NØYAKTIG på barens bunn (aldri oppå baren, heller ikke de få pikslene som synes som mørkere bånd på gjennomsiktige flater), også med stor logo, lys/mørk-bryter i verktøyklyngen og i flytende variant; utfall (full bredde) flukter med barens bunn uten skygge-bånd oppover
- [ ] Sidestilt meny på smale vinduer: smaln nettleservinduet under ca. 900px, kolonnen skal bli en VANLIG topplinje med horisontale menypunkter (som stripe-varianten; virker også i editorens preview); burgeren kommer først under mobil-breakpointet; over 900px kommer kolonnen tilbake
- [ ] Undermeny i sidestilt kolonne: åpnes og lukkes KUN med klikk (hover lukker ikke lenger kolonnen under pekeren, så man ikke feilklikker på punktet under)
- [ ] Sidebredde: dra i kolonnekanten i previewen (180-400px); innholdet flytter seg med, og bredden overlever publisering
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