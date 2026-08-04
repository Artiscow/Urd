# Bidra til Urd

Takk for at du vil bidra! Dette dokumentet er for alle som vil sende endringer til Urd. Oppsett av utviklingsmiljøet og de tekniske reglene står i [docs/UTVIKLING.md](docs/UTVIKLING.md); les den først.

## Slik sender du et bidrag

1. **Fork** repoet på GitHub (knappen øverst til høyre) og klon forken din:
   ```bash
   git clone https://github.com/<ditt-brukernavn>/Urd.git
   cd Urd
   git remote add upstream https://github.com/<urd-eier>/Urd.git
   ```
2. **Lag en gren** fra `main` med et beskrivende navn:
   ```bash
   git switch -c fiks/mobil-stabling-dekor
   # eller: funksjon/kalender-blokk, docs/skjema-presisering, ...
   ```
3. **Gjør endringen.** Hold den liten og fokusert: én ting per gren/PR. Følg reglene i [docs/UTVIKLING.md](docs/UTVIKLING.md), spesielt:
   - Endrer du props-formen på en blokk/seksjon/bakgrunn/animasjon: bump `version`, skriv migrering, legg til test.
   - Skjemaendringer gjøres tre steder i samme commit (SKJEMA.md, `schema/`, eksempeldata).
   - Motoren (`template/assets/engine/`) forblir avhengighetsfri, lesbar vanilla JS.
   - Editor-endringer: kjør `npm run build` og committ den oppdaterte `template/admin/assets/`.
4. **Kjør testene** før du sender:
   ```bash
   node --test tests/
   ```
5. **Committ** med en kort, beskrivende melding i imperativ («Legg til kalender-blokk», ikke «La til...»). Norsk eller engelsk er begge greit i commit-meldinger.
6. **Push og åpne en pull request** mot `main` i hovedrepoet:
   ```bash
   git push -u origin fiks/mobil-stabling-dekor
   ```
   Beskriv i PR-en **hva** som er endret og **hvorfor**. Referer gjerne til et issue eller et punkt i [docs/BACKLOG.md](docs/BACKLOG.md).
7. **Hold forken oppdatert** mens du venter på review:
   ```bash
   git fetch upstream && git rebase upstream/main
   ```

## Hva vi ser etter i review

- Bryter endringen et av de fire løftene i [docs/VISJON.md](docs/VISJON.md)? Da må den endres, uansett hvor fin den er.
- Er testene grønne, og har ny funksjonalitet tester der det gir mening?
- Er koden i samme stil som resten (norsk i docs og brukerflater, engelsk i kode/identifikatorer, ingen tankestreker i tekst)?
- Store arkitekturendringer: åpne et issue og diskuter FØR du bygger, gjerne med forslag til en ny ADR i `docs/adr/`.

## Bidra med språk

Urd er flerspråklig (se [ADR-0012](docs/adr/0012-flerspraak.md)). Oversettelsene er rene ES-moduler, så et språkbidrag krever **ingen bygging** og ingen kunnskap om Svelte:

- `template/assets/engine/locales/site/<kode>.js` er tekstene besøkende ser (knapper, datoer, skjemameldinger).
- `template/assets/engine/locales/admin/<kode>.js` er redigeringsverktøyets tekster.
- `template/plugins/<plugin>/locales/<kode>.js` er pluginenes tekster.

Norsk bokmål (`nb.js`) er basen i alle sett: en nøkkel som mangler i et annet språk faller tilbake til bokmål, aldri til en tom side.

**Slik oversetter du:**

1. Kopier `nb.js` i settet du vil oversette, til filnavnet for språket ditt.
2. Oversett VERDIENE. Nøklene (`'nav.toTop'`) er identifikatorer og skal aldri endres.
3. Behold plassholderne i teksten: `{n}`, `{label}`, `{email}` osv. må stå igjen, ellers mangler tall og navn i den ferdige teksten. De kan flyttes dit setningen din trenger dem.
4. Ingen tankestrek (em dash) i verdiene; bruk vanlig bindestrek.
5. Kjør språksjekken - den er Urds «language file checker» og sier fra om nøkler mangler, er tomme eller har feil plassholdere:
   ```bash
   node --test tests/i18n.test.mjs
   ```
6. Nytt språk (ikke bare en oppdatering av et eksisterende)? Legg koden inn i `SUPPORTED_LANGS` og `matchLang` i `template/assets/engine/i18n.js`, og i `LANG_OPTIONS` i `editor/src/App.svelte` (med språkets EGET navn, alfabetisk sortert). Da må editoren bygges (`cd editor && npm run build`) og bundelen committes.

**Gjennomgang av eksisterende oversettelser er også et bidrag.** Den nordsamiske oversettelsen er et maskinskrevet førsteutkast som venter på gjennomgang av en morsmålsbruker; filene er merket med det. Retter du språkfeil der, er det like verdifullt som en ny oversettelse.

Dokumentoversettelser (README og oppsettsguiden) bor i [docs/languages/](docs/languages/). Norsk er kanonisk: ved avvik gjelder den norske teksten, og oversettelser oppdateres i etterkant.

## Feilrapporter og forslag

Bruk GitHub Issues. For feil: beskriv hva du gjorde, hva du forventet og hva som skjedde, gjerne med nettleser/OS. For forslag: sjekk først [docs/BACKLOG.md](docs/BACKLOG.md) og [docs/VEIKART.md](docs/VEIKART.md) så vi slipper duplikater.

## Lisens

Ved å bidra godtar du at bidraget ditt lisensieres under prosjektets [MIT-lisens](LICENSE).
