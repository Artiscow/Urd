# Urd-logo

Merket er uruz-runen (ᚢ) tegnet i én strek, med ordmerket «Urd» ved siden. Samme geometri brukes i admin-headeren og i favicon.

## Filer

- `urd-mark-<farge>.svg` - kun runen (gjennomsiktig bakgrunn), til der du trenger selve merket.
- `urd-logo-<farge>.svg` - full lockup: rune + «Urd»-ordmerke.
- `urd-favicon.svg` - runen i turkis på mørk avrundet flate (samme som nettleserfanen bruker).

Ordmerket bruker en system-sans (`Segoe UI`/`system-ui`-stack). Trenger du garantert lik gjengivelse på tvers av maskiner, gjør teksten om til bane i et vektorverktøy.

## Palett

Turkis er primærfargen (brønn-turkis, etter Urðarbrunnr). De andre er bevart som alternativer.

| Navn   | Hex       | Bruk                                  |
|--------|-----------|---------------------------------------|
| turkis | `#15b39a` | Primær                                |
| bronse | `#c9a227` | Alternativ, varm                      |
| indigo | `#7c5cff` | Alternativ, kjølig                    |
| mono   | `#eaf1ed` | For mørk bakgrunn (usynlig på lyst)   |

De samme verdiene finnes som CSS-variabler i editoren (`--urd-brand`, `--urd-brand-bronze`, `--urd-brand-indigo`, `--urd-brand-mono`).
