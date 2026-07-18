# Brukerveiledning

For deg som eier eller redigerer en side bygget med Urd. Ingen kode, ingen
git-kunnskap nødvendig: alt skjer i nettleseren på din egen side.

> Urd er under utvikling. Veiledningen dekker det som finnes i dag og
> utvides etter hvert; en full opprydding er planlagt mot v0.9.

## Kom i gang

1. Gå til `/admin` på siden din (for eksempel `dinside.pages.dev/admin`).
2. Logg inn med GitHub-kontoen din (knappen oppe til høyre). Du kan se og
   prøve editoren uten innlogging, men ikke publisere.
3. Alt du endrer lagres som **utkast** i nettleseren din med en gang.
   Ingenting blir synlig for besøkende før du trykker **Publiser**.

## Editoren

Skjermen har tre deler:

- **Topplinjen**: velg side, bytt mellom desktop- og mobilvisning (skjerm- og telefonikonene), og publiser.
- **Panelvelgeren til venstre**: Sider, Blokker, Egenskaper, Tema, Nav, Grid
  og Historikk. Klikk for å åpne et panel; klikk igjen for å lukke.
  (Noen paneler er fortsatt under bygging.)
- **Forhåndsvisningen**: den ekte siden din. Det du ser er det besøkende får.

**Ren visning** (oppe til høyre) skjuler alle verktøyene så du ser siden
helt uten editor-rammer. Klikk «Rediger»-knappen for å komme tilbake.

## Redigere innhold

- **Skrive tekst**: klikk i en tekstblokk og skriv rett inn i siden.
- **Flytte en blokk**: ta tak i den og dra. Blokken snapper til
  hjelpelinjene (se Grid under).
- **Endre størrelse**: dra i håndtaket i blokkens hjørne.
- **Verktøylinjen over valgt blokk**:
  - ⠿ flytt (dra)
  - lag-pilene (pil mot strek, opp/ned) legger blokken helt foran eller bakerst (når blokker overlapper).
    NB: mens du redigerer vises blokken du peker på eller har markert
    alltid øverst, så håndtakene kan nås - den EKTE rekkefølgen ser du
    i Ren visning og på den publiserte siden
  - telefonikonet: mobil-synlighet (dekor), se under
  - × slett blokken
- **Rotere**: dra i den lille ⟳-sirkelen i blokkens øvre høyre hjørne
  (snapper til 15°-steg; hold Shift for fri vinkel). Nøyaktig gradtall
  kan også settes i Egenskaper.
- **Tastatur på markert blokk**: piltastene flytter ett grid-steg
  (Shift = 1 px), Delete sletter, Esc avmarkerer.
- **Angre**: Ctrl+Z (og Ctrl+Shift+Z for å gjenta) virker på alt: flytting,
  størrelse, tekst, sletting, seksjoner og grid.

### Legge til blokker

Åpne **Blokker**-panelet og klikk blokken du vil ha; den legges midt i
synsfeltet, i seksjonen du sist klikket i. Typene:

- **Tekst**: vanlig tekst rett på siden.
- **Tekstboks**: tekst i et kort med bakgrunnsfarge og avrundede hjørner,
  fint til hjelpetekster og informasjonsbokser.
- **Knapp**: lenke til en annen side eller ekstern adresse.
- **Bilde**: last opp fra maskinen. Bildet komprimeres automatisk.
- **Video**: lim inn en YouTube- eller Vimeo-lenke i Egenskaper.
  Innbyggingen er personvennlig, og videoen spilles på den publiserte
  siden (i editoren markerer klikk bare blokken).
- **Ikon**: et tegn eller en emoji i valgfri størrelse og temafarge.
- **Former**: strek, pil, sirkel, rektangel og trekant til dekorasjon.

I editoren utløses aldri lenker og knapper når du klikker på dem -
klikket markerer blokken. Test lenkene via «Se siden ↗».

### Hva betyr telefonikonet (dekor)?

Knappen viser om blokken blir med til mobil. På mobil stables innholdet
automatisk i én kolonne, og der hoppes pynt over: en skrå strek eller pil
som ligger fint bak teksten på desktop blir bare rot midt i en mobilkolonne.

- Telefon = blokken er innhold og vises på mobil.
- Overstrøket telefon (gul knapp) = blokken er pynt (dekor) og skjules i
  automatisk mobil-layout.

Klikk for å bytte. Nye former starter som pynt. (Har du håndjustert
mobil-layouten i seksjonen, plasserer du uansett alt selv; da betyr
flagget ingenting der.)

## Egenskaper-panelet

Klikk på en blokk og åpne **Egenskaper** for å finjustere den med tall og
valg i stedet for dra-og-slipp:

- Alle blokker: nøyaktig posisjon og størrelse, lag (hva som ligger
  foran), rotasjon og mobil-synlighet (pynt).
- Tekst: justering og tekstboks av/på. Knapp: tekst, hvor den går og stil.
  Bilde: bytt bilde, alt-tekst, beskjæring, avrunding og lenke.
  Form: type, farge fra temaet, tykkelse og fylt/kantlinje.
- Klikker du i en seksjon (uten blokk valgt) viser panelet seksjonens
  minstehøyde, eget grid, bakgrunn og animasjon.

**Bakgrunner**: en seksjons bakgrunn er bygget av lag som kan stables:
farge, gradient (kan animeres), glød, bilde og korn. Legg til, fjern og
sorter lag i seksjonens Egenskaper; hvert lag har sine egne kontroller.

**Animasjoner**: blokker og seksjoner kan gli eller tone inn når
besøkende scroller til dem (og «løft ved peker» for hover-effekt).
Velges i Egenskaper. Forhåndsvisningen i editoren viser slutt-tilstanden;
selve animasjonen spilles på den publiserte siden. Besøkende som har
skrudd av animasjoner i systemet sitt (redusert bevegelse) får innholdet
uten animasjon.

**Formatere tekst**: klikk i en tekstblokk, så dukker verktøylinjen opp
over den: tekstnivå (avsnitt/overskrifter), fet, kursiv, understrek,
farger, lenke, justering, lister, sitat og fjern formatering. Font og
grunnstørrelse for hele feltet settes i Egenskaper.

## Seksjoner

Siden er bygget av seksjoner oppå hverandre. Pek på grensen mellom to
seksjoner for å få **+ Ny seksjon**. Verktøylinjen oppe til høyre i en
seksjon (vises når du peker på den):

- ↑ / ↓ flytt seksjonen opp eller ned på siden
- ⤓ tilpass høyden til innholdet
- × slett seksjonen

Du kan også dra i seksjonens nederkant for å justere høyden fritt, eller
dra rett i «+ Ny seksjon»-knappen på grensen mellom to seksjoner (klikk
åpner fortsatt menyen; dra flytter grensen). Blokker kan bevisst henge
utover seksjonskanten; ingenting klippes.

## Grid (hjelpelinjer)

**Grid**-panelet styrer rutenettet blokker snapper til når du drar dem.
Gridet vises i forhåndsvisningen så lenge panelet er åpent.

- **Rutestørrelse**: hvor tett rutenettet er.
- **Snap til grid**: skru av for å plassere helt fritt. Hold Shift mens du
  drar for å overstyre snap midlertidig.
- En seksjon kan få sitt eget grid, uavhengig av resten av siden.

Gridet er kun et hjelpemiddel ved redigering: å endre det flytter aldri
noe innhold, og besøkende ser det aldri.

## Mobil

Besøkende på mobil får automatisk innholdet i én kolonne, i naturlig
leserekkefølge. Du trenger vanligvis ikke gjøre noe.

- **Telefonikonet i topplinjen** viser siden slik den blir på mobil.
- Vil du finjustere, dra i blokkene i mobilvisningen: seksjonen går da over
  til **manuell mobil-layout**, der du plasserer alt selv. ↺ på seksjonen
  tar den tilbake til automatikken.
- **Mobil-tilsyn**: endrer du noe på desktop i en seksjon som er
  håndjustert for mobil, markeres seksjonen gult og topplinjen sier ifra
  («1 seksjon trenger mobil-tilsyn»). Det betyr bare: ta en titt i
  mobilvisningen og se at alt fortsatt ser bra ut, og kvitter med ✓.

## Sider, meny og tema

- **Sider**-panelet: opprett en ny side (skriv navnet og trykk Enter),
  gi sider nytt navn eller ny adresse, eller slett dem med ×. Forsiden
  kan ikke slettes eller flyttes. Nye sider legges automatisk i menyen
  og blir synlige for besøkende først når du publiserer.
- **Nav**-panelet: menyen øverst på siden. Endre tekst, velg hvilken side
  (eller ekstern adresse) hvert punkt går til, flytt med ↑/↓, fjern med ×.
  Logoen kan være tekst, et opplastet bilde eller begge deler (med
  størrelse og rekkefølge), og fungerer alltid som «Hjem»-knapp.
  Menypunktene kan stå til høyre, midtstilt eller til venstre.
- **Footer**-panelet: bunnteksten som vises nederst på alle sider.
  Skru den på, skriv linjene (én per linje) og velg justering - den
  redigeres ett sted og gjelder hele nettstedet.
- **Tema**-panelet: fargene og fontene hele siden bygger på. Endrer du
  aksentfargen, følger knapper, lenker og markeringer med overalt.

## Utkast og publisering

- Alt du gjør lagres som utkast i din nettleser, også på tvers av sider.
  «Upubliserte endringer» i topplinjen viser at du har noe upublisert.
- **Publiser** legger alle utkastene ut på siden. Det tar omtrent ett
  minutt før endringene er synlige for besøkende.
- **Forkast utkast** sletter utkastene og tar deg tilbake til slik siden
  er publisert.
- **Se siden ↗** åpner den publiserte siden i ny fane.

Publisering krever at GitHub-brukeren din har fått tilgang av
sideeieren (se [OPPSETT-PUBLISERING.md](OPPSETT-PUBLISERING.md)).

Er dere flere som redigerer, sier editoren ifra hvis noen andre har
publisert endringer i de samme delene siden du lastet siden, og lar deg
velge om du vil publisere likevel eller se på endringene først.

## Historikk og angring av publisering

**Historikk**-panelet viser de siste publiseringene: hva som ble endret,
av hvem og når. «↩ Angre siste publisering» ruller siden tilbake til slik
den var før forrige publisering. Angringen er selv en publisering, så
ingenting slettes fra historikken, og du kan angre angringen. Etter en
angring laster du admin på nytt (etter ~1 minutt) før du redigerer
videre, editoren sier ifra.

(Ctrl+Z angrer utkast i nettleseren FØR du publiserer; Historikk-panelet
angrer det som allerede er publisert.)

## Første gang

Åpner du admin på en helt fersk side, får du en kort veiviser: sidens
navn og to farger. Alt den setter kan endres senere i Tema- og
Nav-panelene.
