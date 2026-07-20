> **Merk (juli 2026):** Dette er den opprinnelige, rå idemyldringen for Urd og beholdes som historikk.
> Den gjeldende og strukturerte planen ligger i [docs/](docs/) - se særlig
> [VISJON.md](docs/VISJON.md), [ARKITEKTUR.md](docs/ARKITEKTUR.md), [SKJEMA.md](docs/SKJEMA.md) og [VEIKART.md](docs/VEIKART.md).
> Alle punktene under er sporet inn i veikartet (se sporbarhetstabellen i VEIKART.md).

Nettsidebygger:
WYSIWYG - En ikke-teknisk redaktør bygger og endrer siden uten å se en kodelinje. redigerbare tokens,
En oppdatering knuser aldri en bygget side. `version` + `migrate` på hver blokk løfter gammel data trygt fremover.
En open source nettside-bygger der du kan gjøre alt som trengs for å
bygge OG vedlikeholde/publisere nettsiden din, og der du eier alt selv.
Open source nettside-bygger du eier selv. Gratis, statisk, git-versjonert.
Gratis, statisk, git-eid, og bygget for å utvides uten å knuse sidene som allerede står.
Hvilken som helst statisk host (Cloudflare Pages, GitHub Pages …). «Publiser» = commit.
en oppdatering av Urd skal aldri stille knuse en side noen allerede har bygget. Klonede sider kan trygt oppgradere til nyere Urd, og dataene følger med.
Gammel data løftes til ny form ved lasting. Sider bygget på v1 overlever en v2-blokk.
Statisk + git.


Urd skal bestå av en hovedmotor som er selve nettsidebyggeren og nettsiden. Slik man lager en nettside er ved å klone git repoet (Urd). Man bruker da Urd til å lage oppsettet til nettsiden sin og publisere endringer/oppsettet. Alt som blir publisert er det som blir vist som nettsiden. Etter første oppsett er nettsidebyggerdelen av Urd admin senteret for den nettsiden. Når man da går inn på "XYZ"-nettside kan man gå til admin eller en logg inn som tar en til selve nettsidebyggeren.
Hvordan nettsiden er: Nettsiden og Urd er statisk og er en mappe/repo i git eller gitlab, hvor man kan fritt velge hvordan nettsiden blir kjørt. Default er github + cloudflare.  reell GitHub OAuth + Cloudflare-kobling (i dag simulert; uttalt neste steg).

WYSIWYG: Rediger i en admin som det blir på den ekte siden: klikk og skriv, hover for tone / dra / slett, «+ Ny seksjon» in-place. 
Høy customizability: Man kan lage egne seksjoner eller bruke en mal. Grid-basert slik at man kan klikke "Tekstboks", "Bilde" osv osv, og dra den over på siden, slik at man kan sette tekst, tekstbokser, bilder (og alle typer bokser og ting) inn på siden fritt. Det man setter inn snapper til et grid (man kan bestemme hvor stort gridet er). Man kan gjøre boksene større eller mindre, bredere eller høyere. Full kontroll over alt man har på siden. Man kan legge inn streker, horsontale, vertikale, skrå, sirkler, logoer, etc.
Full editor over bagrunn og farger: farge/gradient/animert + glød- og bildelag + korn. (og mer?)
Panel for sidene på nettsiden (hjem, om oss, bilder, butikk osv.) og for å redigere nav.
Detaljert editor for hver seksjon, blokk, tekst, bilder, animasjoner og for farger.

Mulighet for å lage egen mal. 
Urd skal være en hovedmotor, man kan også legge til plugins i en /plugins mappe. Plugins kan være alt fra custom maler, animasjoner, bakgrunner, seksjoner osv osv.

Mal for: Hero, bilder, kalender, footer, 
