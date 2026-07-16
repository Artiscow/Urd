# Urd

> Urd er trolig den eldste av de tre nornene i norrøn mytologi som sitter ved foten av Yggdrasil og bestemmer æsenes skjebner. Sammen sitter nornene og spinner skjebnetråder eller risser skjebnen inn i trestykker.
> Urd er verktøyet for å spinne og risse inn din egen nettside ut fra treets rot.

**Status: under utvikling - ikke klar til bruk ennå.** Se [veikartet](docs/VEIKART.md) for hvor langt vi er kommet.

## Hva er Urd?

Urd er en open source nettsidebygger der **repoet du kloner ER nettsiden din** - og nettsiden er sin egen bygger. Et gratis, statisk, git-eid alternativ til Squarespace, Wix og Publii.

Ingen server. Ingen database. Ingen abonnement. Ingen byggeprosess. Bare et git-repo med lesbare filer som du eier selv, og som kan serveres av hvilken som helst statisk host (Cloudflare Pages, GitHub Pages, …).

## Slik fungerer det

1. **Klon** Urd-malen til ditt eget repo og koble det til en statisk host.
2. **Sett opp** siden din gjennom oppsettsveiviseren - navn, farger, logo.
3. **Rediger** ved å gå til `dinside.no/admin` og logge inn med GitHub. Der er hele byggeren: klikk og skriv rett på siden, dra blokker fritt på et grid, legg til seksjoner, rediger bakgrunner, farger og navigasjon.
4. **Publiser** - ett klikk lager én git-commit med endringene dine, og hosten serverer den nye siden på under et minutt.

Etter første oppsett er admin-siden kontrollsenteret for nettsiden din. Alt du ser på siden kan redigeres derfra.

## De fire løftene

1. **Du eier alt.** Siden din er et git-repo med lesbare filer. Ingen innlåsing.
2. **En oppdatering knuser aldri en bygget side.** Alt innhold har `version` + migreringer som løfter gammel data trygt fremover.
3. **Nettsiden trenger ingen byggeprosess.** Det som ligger i repoet er nøyaktig det nettleseren laster.
4. **WYSIWYG uten kompromiss.** Admin viser den ekte siden - samme motor, samme filer.

## Dokumentasjon

| Dokument | Innhold |
|---|---|
| [docs/VISJON.md](docs/VISJON.md) | Hva Urd er, hvem det er for, og løftene som styrer alle valg |
| [docs/ARKITEKTUR.md](docs/ARKITEKTUR.md) | Systemoversikt: motoren, editoren, publiseringsflyten |
| [docs/SKJEMA.md](docs/SKJEMA.md) | Datamodellen - kontrakten alt bygger på |
| [docs/VEIKART.md](docs/VEIKART.md) | Faser fra skjelett til v1.0 |
| [docs/UTVIKLING.md](docs/UTVIKLING.md) | For oss som utvikler Urd: oppsett, regler, vanlige oppgaver |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Løpende oppgaveliste: gjøremål, bugs og forslag |
| [docs/adr/](docs/adr/) | Arkitekturbeslutninger med begrunnelse |

## Lisens

[MIT](LICENSE)

---

                                  |
                                 |||
                                |||||
                  |    |    |   |||||||
                 )_)  )_)  )_)   ~|~
                )___))___))___)\  |
               )____)____)_____)\\|
             _____|____|____|_____\\\__
             \                       /
       ~^~^~~^~^~~^~^~~^~^~~^~^~~^~^~~^~^~
               ~^~  all aboard!  ~^~
       ~^~^~~^~^~~^~^~~^~^~~^~^~~^~^~~^~^~