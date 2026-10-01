# Bilder fra en delt mappe

[English](PHOTOS-en-GB.md)

Bakgrunnslaget **Bildegalleri** kan, i alle stilene sine (svevende bilder,
fyll, rullende bånd, mosaikk og polaroider), hente bildene sine fra en mappe
du deler et annet sted, i stedet for fra opplastinger. Nettstedet leser mappa hver gang siden vises, så et bilde du
legger i mappa dukker opp på nettstedet av seg selv, og ingenting lagres i
nettstedets egne filer.

## Hvorfor en delt mappe heller enn opplasting

Opplasting er den enkleste måten å få et bilde inn på nettstedet på, og for en
logo eller ett enkelt hero-bilde er det den riktige. En delt mappe lønner seg
når bildene er mange, skifter ofte, eller kommer fra mer enn én person:

- **Bildene oppdaterer seg selv.** Legg et bilde i mappa, så er det på
  nettstedet neste gang siden vises, uten redigering og uten publisering. Fjern
  det fra mappa, så er det borte.
- **Andre kan legge til bilder uten å røre nettstedet.** Alle du gir tilgang
  til mappa kan fylle den: klubbens fotograf, en kollega, en mobil som
  sikkerhetskopierer rett inn i mappa. Ingen trenger redigereren.
- **Nettstedet holder seg lite.** Et opplastet bilde lagres i nettstedets eget
  repo, og hver opplasting blir liggende i historikken for godt, også etter at
  bildet er slettet fra siden. En mappekilde lagrer ingenting der, så et
  nettsted med hundrevis av arrangementsbilder vokser ikke for hvert av dem, og
  publiseringen holder seg rask.
- **Arkivet ditt blir der det er.** Mappa er originalen; nettstedet viser den
  bare. Rydd, gi nye navn eller gå over til en ny mappe uten å røre nettstedets
  filer.

To ting en delt mappe ikke er:

- **Den er ikke raskere for den besøkende.** Et opplastet bilde komprimeres av
  redigereren og serveres som en statisk fil rett fra hostens nettverk, og
  raskere enn det blir ikke et bilde. Et mappebilde hentes gjennom nettstedet
  fra mappeverten første gang noen ber om det og mellomlagres etterpå, så det
  første besøket etter at mellomlageret har gått ut er tregere, ikke raskere.
- **Den er ikke privat.** Mappa må være delt med alle som har lenka, og bildene
  vises til alle som besøker siden.

Fire slags mapper virker:

| Mappe | Det du trenger |
|---|---|
| En Google Drive-mappe | En API-nøkkel i Cloudflare (én gang) og en mappe delt med alle som har lenka |
| Et Google Foto-album | En delingslenke til albumet, ikke noe mer |
| En Nextcloud- eller ownCloud-deling | Delingslenka, og verten lagt inn i Cloudflare |
| En hvilken som helst annen liste | En adresse som slutter på `.json` og svarer med en bildeliste, og vertene lagt inn i Cloudflare |

Cloudflare-variablene settes samme sted som publiseringsvariablene, og hver
endring i dem krever en ny deploy. Begge er beskrevet i
[oppsettguiden](../setup-publication/SETUP-nb.md) (variablene er punkt 10 og
11 der).

## Google Drive

Dette er mappeslaget som trenger en nøkkel, fordi Google bare lister en mappe
for en som sier hvem den er. Nøkkelen når aldri nettleseren: nettstedets egen
funksjon på tjeneren bruker den, og siden den besøkende ser får bare bilder
servert av nettstedet selv.

1. **Del mappa.** Høyreklikk mappa i Google Drive, velg *Del*, og velg
   *Alle som har lenken* som *Leser* under *Generell tilgang*. Kopier lenka.
   Bare bilder som ligger rett i mappa vises; undermapper leses ikke.
2. **Lag en API-nøkkel.** Gå til [console.cloud.google.com](https://console.cloud.google.com),
   logg inn og opprett et prosjekt (eller velg et du alt har). Så:
   - *APIs & Services* → *Library*: søk opp *Google Drive API* og skru det på.
   - *APIs & Services* → *Credentials* → *Create credentials* → *API key*.
     Kopier nøkkelen.
   - Anbefalt: rediger nøkkelen, og velg *Restrict key* under *API
     restrictions* med bare *Google Drive API* huket av. La *Application
     restrictions* stå på *None*: kallene kommer fra Cloudflares tjenere, ikke
     fra en nettleser, så en referrer-begrensning ville stoppet dem.

   En slik nøkkel kan bare lese det som er delt offentlig. Den ser ikke de
   private filene dine, og det er nettopp poenget.
3. **Legg nøkkelen i Cloudflare.** I Pages-prosjektet: *Settings* →
   *Environment variables* → *Add*. Type **Secret**, navn `DRIVE_API_KEY`,
   verdi nøkkelen. Deploy så på nytt (en tom commit holder, se oppsettguiden).
4. **Lim inn lenka i redigereren.** Velg seksjonen, åpne *Bakgrunn*, og sett
   *Bilder fra* til *Delt mappe* i laget. Lim mappelenka inn i *Mappeadresse*,
   velg *Rekkefølge* og sett *Hent inntil*, og trykk *Sjekk mappa*. Bare
   mappe-id-en fra adressefeltet virker også.

## Google Foto

1. Åpne albumet i Google Foto, trykk *Del* og lag en lenke.
2. Lim lenka inn som *Mappeadresse*. Både den lange lenka
   (`photos.google.com/share/...`) og den korte (`photos.app.goo.gl/...`)
   virker; den lange er tryggest å beholde, siden Google har sagt at korte
   lenker kan slutte å virke med tida.

Ingen nøkkel trengs. Albumet må være delt med lenke; et album delt bare med
navngitte personer kan ikke leses.

## Nextcloud eller ownCloud

1. Åpne delingspanelet til mappa i Nextcloud og lag en *Delingslenke*. Lenka
   ser slik ut: `https://sky.example.org/s/AbCdEfGh1234`. En deling med passord
   kan ikke leses, siden nettstedet leser den anonymt.
2. Legg verten inn i variabelen `PHOTO_HOSTS` (type Text) i Cloudflare:
   `sky.example.org`. Flere verter skilles med komma. Deploy på nytt.
3. Lim delingslenka inn som *Mappeadresse*.

## En hvilken som helst annen liste

For en tjeneste de tre over ikke dekker, kan nettstedet lese en liste du
legger ut selv: en https-adresse som slutter på `.json` og svarer med

```json
{ "photos": [
  { "src": "https://bilder.example.org/sommer/01.jpg", "name": "Åpningsdagen" },
  { "src": "https://bilder.example.org/sommer/02.jpg" }
] }
```

En ren liste med adresser virker også. Alle verter som er i spill, listas egen
og bildenes, må stå i `PHOTO_HOSTS`, ellers blir bildene utelatt.

## Hva meldingene betyr

*Sjekk mappa* leser mappa slik siden gjør det og forteller hva den fant.

| Melding | Hva du gjør |
|---|---|
| Urd kjenner ikke igjen den mappeadressen | Lenka er ikke en av de fire slagene. Kopier delingslenka på nytt fra tjenesten selv. |
| Google Drive er ikke satt opp: DRIVE_API_KEY mangler | Legg inn variabelen i Cloudflare og deploy på nytt. |
| Den delte mappa svarte 403 eller 404 | Mappa er ikke delt med alle som har lenka, eller nøkkelen får ikke bruke Drive API. |
| Bildeverten «…» er ikke tillatt | Legg verten inn i `PHOTO_HOSTS` og deploy på nytt. |
| Mappa inneholder ingen bilder | Bare bilder rett i mappa teller; undermapper leses ikke. |
| Kunne ikke lese den delte mappa | På et nettsted som kjører lokalt, uten Cloudflare, kan mappa ikke leses i det hele tatt; laget viser eksempelbilder i stedet. På det utrullede nettstedet svarte ikke mappeverten. |

## Godt å vite

- **Alt i mappa er offentlig.** Legg bare bilder der som kan vises til hvem
  som helst.
- **Nettstedet henter bildene selv**, gjennom sin egen adresse, aldri rett fra
  Google eller Nextcloud. Derfor når ingen nøkkel nettleseren, og derfor
  trenger ikke nettstedets sikkerhetsregler noen endring.
- **Størrelsen følger bruken.** En liten flytende ramme ber om et lite bilde,
  en bakgrunn i full bredde om et stort, så en mobil laster aldri mer enn den
  viser. Dette gjelder Google Drive og Google Foto, som skalerer på
  forespørsel. En Nextcloud-deling og en bildeliste sendes videre slik filene
  er lagret, så legg bilder i en fornuftig størrelse der (hvert på høyst
  12 MB).
- **Fotografier, ikke tegninger.** JPEG, PNG, WebP, GIF og AVIF vises. En
  SVG-fil hoppes over: den er et dokument og ikke et bilde, og nettstedet
  serverer ikke andres dokumenter fra sin egen adresse.
- **Nye bilder vises innen omtrent ti minutter.** Lista holdes en liten stund,
  så en travel side ikke leser mappa ved hvert besøk. Et bilde som byttes ut
  under samme navn kan ta opptil et døgn før det endrer seg.
- **Hvilke bilder som vises** er *Rekkefølge*: *Etter navn* tar de første
  sortert på filnavn, *Nyeste først* de sist endrede, og *Tilfeldig* trekker
  et nytt utvalg ved hver sidevisning. *Hent inntil* (1-60) bestemmer hvor
  mange som vises; trekningen og kuttet gjøres fra de første 200 bildene i
  mappa.
- **Mens nettstedet kjører lokalt** (utvikling, uten Cloudflare) viser laget
  tegnede eksempelbilder i redigereren, så oppsettet kan gjøres likevel.
