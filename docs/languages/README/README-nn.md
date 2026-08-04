<p align="center">
  <img src="../../brand/urd-logo-turkis.svg" alt="Urd" width="200">
</p>

[Sámegiella](README-se.md) · [🇬🇧 English](../../../README.md) · [🇳🇴 Bokmål](README-nb.md) · **🇳🇴 Nynorsk** · [🇹🇷 Türkçe](README-tr.md)

Omsetjing av README. Hovudutgåva i repo-rota er på engelsk.

> Urd er truleg den eldste av dei tre nornene i norrøn mytologi som sit ved foten av Yggdrasil og avgjer skjebnen til æsene. Saman sit nornene og spinn skjebnetrådar eller ristar skjebnen inn i trestykke.
> Urd er verktøyet for å spinne og riste inn di eiga nettside ut frå rota til treet.

**Status: under utvikling - ikkje klar til bruk enno.** Sjå [veikartet](../../VEIKART.md) for kor langt vi har kome.

## Kva er Urd?

Urd er ein open source nettsidebyggjar der **repoet du klonar ER nettsida di** - og nettsida er sin eigen byggjar. Eit gratis, statisk, git-eigd alternativ til Squarespace, Wix og Publii.

Ingen server. Ingen database. Ingen abonnement. Ingen byggjeprosess. Berre eit git-repo med lesbare filer som du eig sjølv, og som kan serverast av kva som helst statisk host (Cloudflare Pages, GitHub Pages, …).

## Slik fungerer det

1. **Klon** Urd-malen til ditt eige repo og kople det til ein statisk host.
2. **Set opp** sida di gjennom oppsettsvegvisaren - namn, fargar, logo.
3. **Rediger** ved å gå til `disida.no/admin` og logge inn med GitHub. Der er heile byggjaren: klikk og skriv rett på sida, dra blokker fritt på eit grid, legg til seksjonar, rediger bakgrunnar, fargar og navigasjon.
4. **Publiser** - eitt klikk lagar éin git-commit med endringane dine, og hosten serverer den nye sida på under eit minutt.

Etter første oppsett er admin-sida kontrollsenteret for nettsida di. Alt du ser på sida kan redigerast derfrå.

Urd kan utvidast med **plugins** som bur i repoet ditt og blir skrudde på i admin. Tre følgjer med som referanse: kalender (abonnerbar feed med fire visingar), kontaktskjema (mailto eller eige endepunkt) og kart (personvennleg OpenStreetMap). Sjå [template/plugins/README.md](../../../template/plugins/README.md) for å lage eigne.

## Dei fire lovnadene

1. **Du eig alt.** Sida di er eit git-repo med lesbare filer. Inga innlåsing.
2. **Ei oppdatering knuser aldri ei bygd side.** Alt innhald har `version` + migreringar som løftar gamle data trygt framover.
3. **Nettsida treng ingen byggjeprosess.** Det som ligg i repoet er nøyaktig det nettlesaren lastar.
4. **WYSIWYG utan kompromiss.** Admin viser den ekte sida - same motor, same filer.

## Dokumentasjon

Dokumenta er skrivne på bokmål; skildringane under er omsette.

| Dokument | Innhald |
|---|---|
| [docs/VISJON.md](../../VISJON.md) | Kva Urd er, kven det er for, og lovnadene som styrer alle val (på bokmål) |
| [docs/ARKITEKTUR.md](../../ARKITEKTUR.md) | Systemoversikt: motoren, editoren, publiseringsflyten (på bokmål) |
| [docs/SKJEMA.md](../../SKJEMA.md) | Datamodellen - kontrakten alt byggjer på (på bokmål) |
| [docs/VEIKART.md](../../VEIKART.md) | Fasar frå skjelett til v1.0 (på bokmål) |
| [docs/BRUKERVEILEDNING.md](../../BRUKERVEILEDNING.md) | For sideeigarar: korleis editoren blir brukt, utan kode (på bokmål) |
| [docs/UTVIKLING.md](../../UTVIKLING.md) | For oss som utviklar Urd: oppsett, reglar, vanlege oppgåver (på bokmål) |
| [docs/OPPSETT-PUBLISERING.md](../setup-publication/SETUP-nn.md) | Eingongsoppsett av publisering: GitHub OAuth-app + Cloudflare |
| [docs/BACKLOG.md](../../BACKLOG.md) | Løpande oppgåveliste: gjeremål, buggar og forslag (på bokmål) |
| [docs/TESTRUNDER.md](../../TESTRUNDER.md) | Sjekklista til eigaren: levert arbeid som ventar på testing (på bokmål) |
| [docs/sammenligning/FUNKSJONSKART.md](../../sammenligning/FUNKSJONSKART.md) | Funksjonssamanlikning mot andre nettsidebyggjarar med gap-analyse (på bokmål) |
| [docs/sammenligning/LAERDOMMER.md](../../sammenligning/LAERDOMMER.md) | Korleis andre nettsidebyggjarar byggjer, og kva vi kan hente (arkitektur og mønster) (på bokmål) |
| [docs/sammenligning/ELEMENTKART.md](../../sammenligning/ELEMENTKART.md) | Element og funksjonar: korleis dei blir tilbydde brukaren og korleis dei blir bygde (på bokmål) |
| [docs/CHANGELOG.md](../../CHANGELOG.md) | Endringslogg per push (på bokmål) |
| [CONTRIBUTING.md](../../../CONTRIBUTING.md) | Slik bidreg du: fork, grein, testar, pull request (på bokmål) |
| [docs/adr/](../../adr/) | Arkitekturavgjerder med grunngjeving (på bokmål) |

## Lisens

[MIT](../../../LICENSE)
