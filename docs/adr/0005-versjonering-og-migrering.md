# ADR-0005: Versjonering og migrering - invarianten

**Status:** vedtatt (juli 2026); addendum om pre-v1-innbakingen (august 2026)

## Kontekst

Løfte 2: en Urd-oppdatering skal aldri knuse en side noen allerede har bygget. Klonede sider skal trygt kunne oppgradere motoren, og dataene skal følge med. Erfaringen fra ApeironLF (ad-hoc `normalize()` per modul, ingen formell kontrakt) viste at dette må være et systemkrav, ikke en konvensjon.

## Beslutning

- **Alt versjoneres:** filer har `schemaVersion`; hver seksjon, blokk, bakgrunnslag og animasjon har `version`.
- **Hver registertype definerer stegvise migreringer:** `migrations[n]` løfter nøyaktig v(n) → v(n+1) og er en ren funksjon (props inn, props ut - ingen DOM, ingen sideeffekter).
- **Lasteregel** (implementert i `template/assets/engine/migrate.js`):
  `while (data.version < def.version) props = def.migrations[data.version++](props)`
- **I minnet:** lasting muterer aldri repoet; disk skrives først ved neste publisering (da i løftet form).
- **Aldri destruktivt:** ukjent type eller manglende migrering → nøytral plassholder-rendering, original-JSON urørt. Aldri kast, aldri slett.
- **Gjelder plugins likt:** plugins bruker samme define-API og arver kontrakten.

## Konsekvenser

- Å endre en blokktypes props-form er alltid lov - men koster en migreringsfunksjon. Det er prisen, og den håndheves.
- Migreringer er trivielt enhetstestbare; v1.0-porten krever minst én reell v1→v2-migrering i testsuiten.
- Nyere innhold enn motor (side redigert med nyere Urd) rendres som plassholder i stedet for å feiltolkes - nedgradering er trygt, om enn ikke pent.

## Addendum: pre-v1-innbakingen (fase-slippet av v0.6, august 2026)

Migrerings-overlevelse var uviktig før v1 (presisert 24. juli 2026: ingenting eksternt var bygget), så ved fase-slippet av v0.6 ble utviklingshistorikkens formater bakt inn som nye v1-former:

- Sidefiler og site.json ble `schemaVersion` 1 igjen (tidligere 3 og 2); gradient-laget, bilde-bakgrunnslaget og kalender-blokken ble `version` 1 (tidligere 3, 2 og 3). Dagens props-former ER de nye v1-formene; ingen data endret form.
- Pre-v1-migreringsstegene og testene deres ble slettet. Maskineriet (`lift`, `liftPageFile`, `liftSiteFile`) og de tomme `migrations: {}`-kontraktene består, dekket av de syntetiske testene i `tests/migrate.test.mjs`, og er grunnlaget for 0.6.9-oppdatereren.
- Kravet «minst én reell migrering i testsuiten» gjelder fra første reelle formatendring etter v1.0 (backloggens v1.0-bevis), ikke kontinuerlig gjennom pre-v1-utviklingen. Frem til da er skjemavalideringen (`npm run validate` + CI) det aktive vernet for kontrakten.
- Under utvikling trenger upushede formatendringer fortsatt ingen migrering (presisering 24. juli 2026, loggført i backloggen); fra v1.0 håndheves kontrakten fullt ut.
