# Kalenderen

[English](CALENDAR-en-GB.md)

Den engelske teksten er den kanoniske (ADR-0022): ved avvik gjelder [CALENDAR-en-GB.md](CALENDAR-en-GB.md). Knapp- og panelnavnene under er de norske admintekstene.

For deg som eier eller redigerer et nettsted bygget med Urd og vil vise arrangementer på det. Blokken **Kalender** viser en kalender du har et annet sted, i kalenderappen du allerede bruker. Du legger til og endrer arrangementer der, og nettstedet følger med av seg selv. Ingenting lagres i Urd.

Veiledningen dekker det kalenderen kan i dag. Den vanlige bruken av editoren står i [brukerveiledningen](../user-guide/GUIDE-nb.md).

**Innhold:** [Slik virker det](#slik-virker-det) · [Kalendertjenester](#kalendertjenester) · [Legge til kalenderen](#legge-til-kalenderen) · [Design](#design) · [Hva som leses fra et arrangement](#hva-som-leses-fra-et-arrangement) · [Møtelenker](#møtelenker) · [Påmelding](#påmelding) · [Steder og kart](#steder-og-kart) · [Finne arrangementer](#finne-arrangementer) · [Tider](#tider) · [Arrangementskortet](#arrangementskortet) · [Søkemotorer](#søkemotorer) · [Telefon, tastatur og utskrift](#telefon-tastatur-og-utskrift) · [Personvern](#personvern) · [Hva kalenderen ikke kan](#hva-kalenderen-ikke-kan)

## Slik virker det

Alle kalendertjenester kan gi en kalender en adresse som andre programmer kan lese, kalt en **iCal-adresse** (den slutter ofte på `.ics`, eller begynner med `webcal://`). Du limer adressen inn i kalenderblokken, og blokken leser kalenderen hver gang siden vises.

To ting følger av det:

- **Kalenderen må være offentlig.** Nettstedet leser den uten å logge inn, så alle som har adressen kan også lese den. Ha en egen kalender for det nettstedet viser, atskilt fra den private.
- **En endring bruker litt tid på å vises.** Nettstedet husker det det leste i omtrent ti minutter, og noen tjenester oppdaterer iCal-adressen bare noen ganger om dagen.

## Kalendertjenester

Kalenderen trenger en tjeneste som kan gi en offentlig iCal-adresse. «Prøvd» betyr at tjenesten er brukt med Urd. De andre gir en vanlig iCal-adresse og ventes å virke på samme måte.

| Tjeneste | Hvem som lager den | Pris | Offentlig iCal-adresse | Prøvd |
|---|---|---|---|---|
| Google Kalender | Google, USA | gratis | ja | ja |
| Proton Calendar | Proton, Sveits | gratis med én kalender; deling og flere kalendere i betalte abonnement | ja | nei |
| Fastmail | Fastmail, Australia | betalt | ja | nei |
| Nextcloud Kalender | åpen kildekode, på egen eller leid server | programvaren er gratis | ja | nei |
| iCloud Kalender | Apple, USA | gratis med Apple-konto | ja | nei |
| Outlook | Microsoft, USA | gratis og betalt | ja | nei |
| Teamup | Teamup, Sveits | gratis og betalt | ja | nei |
| Tuta Calendar | Tuta, Tyskland | gratis | **nei** | |
| Spond | Spond, Norge | gratis | **nei** | |

**Tuta Calendar** kan ikke dele en kalender utenfor Tuta, fordi alt i den er kryptert bare for egne brukere. **Spond** har ingen offentlig adresse for en gruppes arrangementer; den synkroniserer dem bare til kalenderen på din egen telefon. Ingen av dem kan vises av kalenderblokken i dag.

Hvor du finner adressen:

- **Google Kalender:** Innstillinger, kalenderen under «Innstillinger for kalenderne mine», «Tilgangsrettigheter for aktiviteter»: kryss av for «Gjør tilgjengelig for alle». Deretter «Integrer kalender»: kopier «Offentlig adresse i iCal-format». Du kan også lime inn bare kalender-id-en (den ser ut som en e-postadresse).
- **Proton Calendar:** Settings, All settings, Calendars, «Share with anyone», «Create link». Velg full visning, så titler og beskrivelser følger med.
- **Fastmail:** Settings, Calendars, «Edit & share» på kalenderen, «Publish», «Full event details».
- **Nextcloud Kalender:** blyanten ved kalenderen, «Del lenke», kopier lenken og lim den inn som den er. Kalenderblokken gjør selv lenken om til adressen til kalenderens iCal-fil.
- **iCloud Kalender:** del kalenderen og slå på «Offentlig kalender»; kopier lenken (den begynner med `webcal://`).
- **Outlook:** Innstillinger, Kalender, Delte kalendere, «Publiser en kalender»; kopier ICS-lenken.
- **Teamup:** kalenderens iCalendar-strømmer.

## Legge til kalenderen

1. Åpne panelet **Blokker** og legg til en **Kalender**-blokk (eller seksjonsmalen «Hva skjer»).
2. Velg blokken. I menyen dens, under **Kilder**, limer du inn iCal-adressen, én per linje.
3. Velg design under **Design**, og hvor mange arrangementer som vises.

Før en kilde er limt inn, viser blokken eksempelarrangementer i editoren, så du kan se designet. Besøkende ser aldri eksempelarrangementene.

**Flere kalendere** kan stå i én blokk. De vises som én kalender, og et arrangement som står i to av dem vises én gang. Gi hver et **Navn** og en farge: navnet blir arrangementenes kategori, og fargen merker dem.

## Design

Kalenderen har 34 design, gruppert etter hva de viser. Et design velges når blokken legges til, og byttes senere under **Design** i blokkens meny. Arrangementene er de samme i alle design.

| Viser | Design |
|---|---|
| En liste over det som kommer | Enkel, Tidslinje, Tabell, Programhefte, Nummerert program, Liste på marine, Glass, Fast arrangement |
| Kort | Plakatvegg, Billetter, Dagkarusell, Bildekort, Rutenett på krem, Bento |
| Det neste arrangementet, med de som følger | Reklametavle, Stablede kort, Oppslagstavle, Delt kort, Bånd, Én linje, Nedtellingsring, Mørkt glass, Bento for akkurat nå, Akkurat nå på krem, Akkurat nå på marine |
| En agenda dag for dag | Agenda, mørk |
| En uke | Ukestripe, Ukeplan, Kalenderlag |
| En måned | den enkle måneden, Måned med sidepanel, Oversikt på krem |
| En dag | Dagsplan |
| Et år | Årshjul, Varmekart |

Hvor du finner dem:

- **Panelet Blokker,** under **Kalender**: de fem enkle visningene som knapper, og **Design** med et lite bilde av hvert design. Et trykk legger til en kalender i det designet.
- **Blokksøket** i panelet Blokker: skriv navnet på et design («Ukestripe»).
- **Menyen + Ny blokk** i en seksjon: Kalender folder seg ut i visningene og designene.
- **Seksjonsmaler:** «Hva skjer» som liste, kort, måned, uke eller neste arrangement.

Omrisset til en ny kalender tilpasses designet, og på nytt når du bytter design eller innstillinger. Dra i sidene på omrisset for å gjøre kalenderen smalere eller bredere; **Størrelse** i menyen gjør hele kalenderen, teksten medregnet, mindre eller større.

Hvert design har egne farger, og noen har egne innstillinger, i blokkens meny. Ordene et design skriver («Neste arrangement», «Senere») endres ved å klikke på dem i forhåndsvisningen.

**Kalenderens kunngjøring.** Noen av designene for «Akkurat nå» kan vise en lapp ved siden av neste arrangement, slått på med **Vis kunngjøring i kalenderen**. Du skriver den ved å klikke på lappen i forhåndsvisningen. Den er uavhengig av kunngjøringsstripen over menyen.

## Hva som leses fra et arrangement

| I kalenderappen | På nettstedet |
|---|---|
| Tittel | arrangementets tittel |
| Start og slutt | tiden, skrevet med slutt («18:00-21:00») |
| Hele dagen, eller flere dager | «hele dagen», eller «til 6. okt» |
| Sted | stedet, som lenke til et kart |
| Beskrivelse | beskrivelsen, med adressene som lenker |
| Et arrangement som gjentas | hver forekomst, merket som gjentakende |
| Et avlyst arrangement | strøket tittel og «Avlyst», med mindre du skjuler dem |
| Et bilde lagt ved som adresse, eller en lenke til et bilde i beskrivelsen | arrangementets bilde |
| Kategorier | arrangementets kategori |

**Arrangementer som gjentas** leses med de vanlige reglene: hver dag, uke, måned eller år, på gitte ukedager, «andre tirsdag», «siste torsdag i måneden», bare i gitte måneder, med enkeltdatoer lagt til eller tatt bort, og med enkeltforekomster flyttet eller endret.

**Kategorier** kommer fra det første av disse som finnes: navnet du ga kalenderen under Kilder, kategorien arrangementet har i kalenderappen, eller en tittel skrevet som «Kategori: Tittel» («Møte: Årsmøte» har kategorien «Møte» og tittelen «Årsmøte»).

**Bilder** hentes av nettstedet selv og gis til siden, fra verter nettstedet er satt opp til å tillate. Et bilde fra en vert som ikke er tillatt, utelates; oppsettet er beskrevet i [Bilder fra en delt mappe](../setup-photos/PHOTOS-nb.md) (variabelen `PHOTO_HOSTS`).

**En formatert beskrivelse** (fet skrift, lister, lenker) vises med avsnitt, linjeskift, lister, fet, kursiv, understreking, sitat og lenker. Alt annet i den, som bilder, farger, skjemaer og innebygd innhold, utelates. En kalender er skrevet av noen utenfor nettstedet, så bare det som er kjent som ufarlig tegnes.

## Møtelenker

Et arrangement med videomøte får en **Bli med**-knapp i kortet sitt.

Lenken finnes på to måter:

- **Feltet kalenderappen skriver den i.** Google Kalender og Outlook legger møtelenken i et eget felt når du legger et møte til et arrangement.
- **En lenke i arrangementets adresse, sted eller beskrivelse** til en tjeneste kalenderen kjenner: Zoom, Microsoft Teams, Google Meet, Whereby, Webex, Proton Meet, kMeet (Infomaniak), Element Call og Jitsi på `meet.jit.si`.

**En egen server** (Jitsi, Nextcloud Talk, BigBlueButton og lignende) har en adresse bare du kjenner. Legg den inn i panelet **Nettsted** under **Egne møteadresser**, for eksempel `meet.example.org`, med komma mellom flere. En lenke til den adressen i et arrangement gir da også Bli med-knappen.

Knappen viser hvor den leder når pekeren hviler på den («meet.proton.me»), så en besøkende kan se adressen før de trykker. En lenke regnes som møtelenke bare når adressen er nøyaktig en kjent adresse, aldri fordi navnet står et sted i en lengre adresse.

## Påmelding

Med **Vis «Meld deg på»-knapper** på får et arrangement med påmeldingslenke en **Meld deg på**-knapp i listen og i kortet. Bryteren er av på en ny kalender.

Påmeldingslenken er den første av disse som finnes:

1. **En lenke på en linje i beskrivelsen som nevner påmelding,** registrering eller billetter, for eksempel «Påmelding: https://example.org/skjema» eller «Billetter: https://example.org/billetter».
2. **Arrangementets egen adresse,** som arrangementstjenester som Eventbrite, Luma og Mobilizon fyller ut med arrangementets side.

En lenke som bare står i beskrivelsen er ikke en påmelding; den blir stående som lenke i teksten. En lenke til et bilde eller et videomøte er aldri påmeldingen.

Knappen leder til siden arrangøren har valgt. Kalenderen selv tar ikke imot påmeldinger, se [Hva kalenderen ikke kan](#hva-kalenderen-ikke-kan).

## Steder og kart

Stedet for et arrangement er en lenke til et kart. Hvilket kart velger du i panelet **Nettsted** under **Karttjeneste**. Hvert valg i listen sier hvem som lager tjenesten, hvor de er fra, og hva den gjør med et søk fra en besøkende.

| Tjeneste | Finner et lokale ved navn | Dekker |
|---|---|---|
| OpenStreetMap (standard) | sjelden | verden |
| DuckDuckGo Maps | ja | verden |
| Brave Maps | ja | verden |
| HERE WeGo | ja | verden |
| Google Maps | ja | verden |
| Apple Kart | ja | verden |
| Norgeskart | nei | Norge |
| FINN kart | ja | Norge |

Det er bare en lenke: ingenting lastes fra karttjenesten før en besøkende trykker på stedet.

**Velg stedet fra kalenderappens eget søk når den har et.** Google Kalender, Apple Kalender og Outlook foreslår steder mens du skriver i stedsfeltet. Velg et av forslagene, så fyller appen inn lokalets navn og hele adressen. Du trenger ikke gjøre mer.

**Skriv adressen for hånd bare når appen ikke har et slikt søk.** Skriv da lokalets navn først og adressen etter, med komma mellom: «Klubbhuset, Storgata 1, 7011 Trondheim».

Hvorfor formen betyr noe:

- En karttjeneste som kjenner lokaler ved navn (se tabellen) får hele teksten.
- En karttjeneste som bare kjenner adresser får adressen uten navnet foran, siden navnet ville fått søket til å feile.
- Et sted skrevet som bare et navn («Klubbhuset») har ingen adresse, og ingen kart kan finne det.

**Koordinater.** Når kalenderappen lagrer et punkt for stedet, åpner OpenStreetMap og Apple Kart akkurat det punktet, som ingen søk kan bomme på.

## Finne arrangementer

Fire verktøy hjelper en besøkende å finne et arrangement. Alle er brytere i blokkens meny, og alle er av på en ny kalender:

- **Vis kategori-filter:** en knapp per kategori.
- **Vis stedsfilter:** en knapp per lokale. Lokalet er stedet fram til første komma, så «Klubbhuset, Storgata 1» er «Klubbhuset». Knappene vises når arrangementene har to eller flere lokaler.
- **Vis søkefelt:** den besøkende skriver, og bare arrangementene med de ordene i tittel, sted eller beskrivelse står igjen.
- **Vis tidligere arrangementer:** arrangementene fra de siste 90 dagene som er over, foldet under «Tidligere» med antall. Den tilbys i designene som teller opp det som kommer, ikke i måned, uke, dag eller år.

Verktøyene virker sammen: et søk innenfor ett lokale, i én kategori.

**Vis visningsvelger** lar den besøkende bytte mellom det som kommer, uken og måneden.

## Tider

- **Tidssone** (panelet **Nettsted**): klokken alle besøkende ser tidene på, for eksempel `Europe/Oslo`. Uten den ser hver besøkende tidene i sin egen tidssone. En besøkende i en annen sone får vite hvilken sone tidene står i.
- **Klokke** (blokken): 24 timer, eller 12 timer med am og pm. 24 timer er standard i alle språk.
- **Uka starter** (blokken): mandag eller søndag, eller «Auto» for det nettstedets språk bruker.

## Arrangementskortet

Et trykk på et arrangement åpner kortet over kalenderen: dato og tid, sted, bilde, hele beskrivelsen, og knappene Bli med og Meld deg på. Siden kan rulles som vanlig, og Escape, lukkeknappen eller et trykk utenfor kortet lukker det.

**Legg i kalender** i kortet gir den besøkende arrangementet i sin egen kalender: til Google Kalender, eller som fil for Apple Kalender, Outlook og de andre. Den tilbyr også hele kalenderen som abonnement.

**Vis abonner-knapp** setter en **Abonner**-knapp under kalenderen, så besøkende kan følge hele kalenderen i sin egen app.

## Søkemotorer

Med **Fortell søkemotorer om arrangementene** på (den er på med mindre du slår den av) beskriver den publiserte siden arrangementene kalenderen viser i en form søkemotorer leser: navn, tid, sted, møtelenke, og om arrangementet er avlyst. En søkemotor kan da vise et arrangement med dato og sted. Om den gjør det, er opp til søkemotoren.

Gi hvert arrangement et sted med adresse. Et arrangement uten er den typen søkemotorer oftest utelater.

## Telefon, tastatur og utskrift

- **På telefon** endres designene med sju kolonner: dagene i en uke står under hverandre, og i en måned er hver dag en knapp med en prikk per arrangement; et trykk lister dagens arrangementer.
- **Med tastatur** er en måned eller en uke ett stopp for Tab-tasten. Piltastene går mellom dagene, Home og End går til endene av uken, og PageUp og PageDown bytter måned eller uke. Enter åpner et arrangement.
- **På papir** utelates designet og knappene, og arrangementene skrives ut som en enkel liste.

## Personvern

- **Den besøkendes nettleser kontakter aldri kalendertjenesten din.** Nettstedet henter kalenderen selv og gir den til siden, og arrangementenes bilder på samme måte.
- **Et kart, et møte eller en påmeldingsside kontaktes bare når den besøkende trykker på lenken.**
- **Det som står i en offentlig kalender er offentlig.** Ikke skriv navn, telefonnumre eller private notater i arrangementene i en kalender nettstedet viser.

## Hva kalenderen ikke kan

Blokken viser en kalender som ligger et annet sted, så tre ting er utenfor rekkevidde:

- **Påmelding med antall plasser og venteliste.** Bruk et skjema eller en arrangementstjeneste, og legg lenken i arrangementet.
- **Billettsalg.** Det samme: lenk til tjenesten som selger dem.
- **Et kart med alle arrangementene på.**

En kalender som krever innlogging kan heller ikke vises.
