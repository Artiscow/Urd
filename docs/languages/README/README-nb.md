<p align="center">
  <img src="../../brand/urd-logo-turkis.svg" alt="Urd" width="200">
</p>

[Sámegiella](README-se.md) · [🇬🇧 English](../../../README.md) · **🇳🇴 Bokmål** · [🇳🇴 Nynorsk](README-nn.md) · [🇹🇷 Türkçe](README-tr.md)

Norsk utgave av README. Hovedutgaven i repo-roten er på engelsk; norsk er prosjektets arbeidsspråk og gjelder for resten av dokumentasjonen.

<p align="center">
  <a href="https://github.com/Artiscow/Urd/actions/workflows/tests.yml"><img src="https://github.com/Artiscow/Urd/actions/workflows/tests.yml/badge.svg" alt="Tester"></a>
  <a href="https://github.com/Artiscow/Urd/releases"><img src="https://img.shields.io/github/v/release/Artiscow/Urd?label=release&color=15b39a" alt="Release"></a>
</p>

<p align="center">
  <a href="../setup-publication/SETUP-nb.md"><strong>Kom i gang</strong></a> ·
  <a href="../user-guide/GUIDE-nb.md"><strong>Brukerveiledning</strong></a> ·
  <a href="../../VEIKART.md"><strong>Veikart</strong></a>
</p>

> Urd er trolig den eldste av de tre nornene i norrøn mytologi som sitter ved foten av Yggdrasil og bestemmer æsenes skjebner. Sammen sitter nornene og spinner skjebnetråder eller risser skjebnen inn i trestykker.
> Urd er verktøyet for å spinne og risse inn din egen nettside ut fra treets rot.

**Status: under utvikling - ikke klar til bruk ennå.** Se [veikartet](../../VEIKART.md) for hvor langt vi er kommet.

## Hva er Urd?

Urd er en open source nettsidebygger der **repoet du kloner ER nettsiden din** - og nettsiden er sin egen bygger. Et gratis, statisk, git-eid alternativ til Squarespace, Wix og Publii.

Ingen server. Ingen database. Ingen abonnement. Ingen byggeprosess. Bare et git-repo med lesbare filer som du eier selv, og som kan serveres av hvilken som helst statisk host (Cloudflare Pages, GitHub Pages, …).

## Slik fungerer det

1. **Lag repoet ditt** fra [urd-template](https://github.com/Artiscow/urd-template) («Use this template» på GitHub) og koble det til en statisk host: [oppsettsguiden](../setup-publication/SETUP-nb.md) tar deg gjennom hvert steg.
2. **Sett opp** siden din gjennom oppsettsveiviseren - navn, farger, logo.
3. **Rediger** ved å gå til `dinside.no/admin` og logge inn med GitHub. Der er hele byggeren: klikk og skriv rett på siden, dra blokker fritt på et grid, legg til seksjoner, rediger bakgrunner, farger og navigasjon.
4. **Publiser** - ett klikk lager én git-commit med endringene dine, og hosten serverer den nye siden på under et minutt.
5. **Oppdater** - Oppdatering-panelet i admin henter nye Urd-versjoner fra malrepoet som én commit, og varsler om filer du har håndredigert.

Etter første oppsett er admin-siden kontrollsenteret for nettsiden din. Alt du ser på siden kan redigeres derfra.

Urd kan utvides med **plugins** som bor i repoet ditt og skrus på i admin. Tre følger med som referanse: kalender (abonnerbar feed med fire visninger), kontaktskjema (mailto eller eget endepunkt) og kart (personvennlig OpenStreetMap). Se [template/plugins/README.md](../../../template/plugins/README.md) for å lage egne.

## De fire løftene

1. **Du eier alt.** Siden din er et git-repo med lesbare filer. Ingen innlåsing.
2. **En oppdatering knuser aldri en bygget side.** Alt innhold har `version` + migreringer som løfter gammel data trygt fremover.
3. **Nettsiden trenger ingen byggeprosess.** Det som ligger i repoet er nøyaktig det nettleseren laster.
4. **WYSIWYG uten kompromiss.** Admin viser den ekte siden - samme motor, samme filer.

## Språk

Editoren og motorens besøkende-tekster finnes på nordsamisk, britisk engelsk, norsk (bokmål og nynorsk) og tyrkisk. Admin-språket følger enheten din som standard og huskes per nettleser; besøkende-språket velges i Nettsted-panelet. Å legge til eller forbedre en oversettelse er en ren filendring uten byggesteg, se [CONTRIBUTING.md](../../../CONTRIBUTING.md). Et språk Urd ikke har innebygd kan legges til som en språkpakke: en plugin som kun er oversettelsesfiler, slått på i Plugins-panelet.

## Dokumentasjon

| Dokument | Innhold |
|---|---|
| [docs/VISJON.md](../../VISJON.md) | Hva Urd er, hvem det er for, og løftene som styrer alle valg |
| [docs/ARKITEKTUR.md](../../ARKITEKTUR.md) | Systemoversikt: motoren, editoren, publiseringsflyten |
| [docs/SKJEMA.md](../../SKJEMA.md) | Datamodellen - kontrakten alt bygger på |
| [docs/VEIKART.md](../../VEIKART.md) | Faser fra skjelett til v1.0 |
| [Brukerveiledning](../user-guide/GUIDE-nb.md) | For sideeiere: hvordan editoren brukes, uten kode |
| [docs/UTVIKLING.md](../../UTVIKLING.md) | For oss som utvikler Urd: oppsett, regler, vanlige oppgaver |
| [Oppsett av publisering](../setup-publication/SETUP-nb.md) | Engangsoppsett av publisering: GitHub OAuth-app + Cloudflare |
| [docs/BACKLOG.md](../../BACKLOG.md) | Løpende oppgaveliste: gjøremål, bugs og forslag |
| [docs/TESTRUNDER.md](../../TESTRUNDER.md) | Sjekkliste for manuell testing: levert arbeid som venter på testing |
| [docs/languages/](../) | Alle oversatte dokumenter (guide og oppsett på fem språk; norsk tekst er kanonisk ved avvik) |
| [docs/sammenligning/FUNKSJONSKART.md](../../sammenligning/FUNKSJONSKART.md) | Funksjonssammenligning mot andre nettsidebyggere med gap-analyse |
| [docs/sammenligning/LAERDOMMER.md](../../sammenligning/LAERDOMMER.md) | Hvordan andre nettsidebyggere bygger, og hva vi kan hente (arkitektur og mønstre) |
| [docs/sammenligning/ELEMENTKART.md](../../sammenligning/ELEMENTKART.md) | Elementer og funksjoner: hvordan de tilbys brukeren og hvordan de bygges |
| [docs/CHANGELOG.md](../../CHANGELOG.md) | Endringslogg per push |
| [CONTRIBUTING.md](../../../CONTRIBUTING.md) | Slik bidrar du: fork, gren, tester, pull request |
| [docs/adr/](../../adr/) | Arkitekturbeslutninger med begrunnelse |

## Lisens

[MIT](../../../LICENSE)
