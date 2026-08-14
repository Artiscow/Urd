# Urd-logo

Merket er uruz-runen (ᚢ) tegnet i én strek, med ordmerket «Urd» ved siden. Samme geometri brukes i admin-headeren og i favicon.

## Filer

- `urd-mark-<farge>.svg` - kun runen (gjennomsiktig bakgrunn), til der du trenger selve merket. ViewBoxen er strammet rundt runen med jevn luft (justert 14. august 2026).
- `urd-logo-<farge>.svg` - full lockup: rune + «Urd»-ordmerke. Runen står på ordmerkets grunnlinje i versalhøyde, og viewBoxen er strammet rundt merket (justert 14. august 2026).
- `urd-favicon.svg` - runen i turkis på mørk avrundet flate (samme som nettleserfanen bruker). Runen står i optisk senter av flaten (justert 14. august 2026).
- `legacy/` - filene slik de så ut før justeringene (runen optisk sentrert på em-boksen i lockupen, romslige viewBoxer, runen lavt i favicon-flaten), bevart som backup.

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
