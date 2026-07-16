# ADR-0005: Versjonering og migrering - invarianten

**Status:** vedtatt (juli 2026)

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
