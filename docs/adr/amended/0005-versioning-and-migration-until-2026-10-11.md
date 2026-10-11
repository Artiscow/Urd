# ADR-0005: Versioning and migration - the invariant

**Status:** accepted (July 2026); addendum on the pre-v1 baking-in (August 2026)

## Context

Promise 2: an Urd update must never break a site someone has already built. Cloned sites must be able to safely upgrade the engine, and the data must come along. The experience from ApeironLF (ad-hoc `normalize()` per module, no formal contract) showed that this must be a system requirement, not a convention.

## Decision

- **Everything is versioned:** files have `schemaVersion`; every section, block, background layer and animation has `version`.
- **Every registry type defines stepwise migrations:** `migrations[n]` lifts exactly v(n) → v(n+1) and is a pure function (props in, props out - no DOM, no side effects).
- **Load rule** (implemented in `template/assets/engine/migrate.js`):
  `while (data.version < def.version) props = def.migrations[data.version++](props)`
- **In memory:** loading never mutates the repo; disk is written first at the next publish (then in lifted form).
- **Never destructive:** unknown type or missing migration → neutral placeholder rendering, original JSON untouched. Never throw, never delete.
- **Applies equally to plugins:** plugins use the same define API and inherit the contract.

## Consequences

- Changing a block type's props shape is always allowed - but costs a migration function. That is the price, and it is enforced.
- Migrations are trivially unit-testable; the v1.0 gate requires at least one real v1→v2 migration in the test suite.
- Content newer than the engine (a site edited with a newer Urd) is rendered as a placeholder instead of being misinterpreted - downgrading is safe, if not pretty.

## Addendum: the pre-v1 baking-in (the phase release of v0.6, August 2026)

Migration survival was unimportant before v1 (clarified 24 July 2026: nothing external had been built), so at the phase release of v0.6 the development history's formats were baked in as the new v1 shapes:

- Page files and site.json became `schemaVersion` 1 again (previously 3 and 2); the gradient layer, the image background layer and the calendar block became `version` 1 (previously 3, 2 and 3). Today's props shapes ARE the new v1 shapes; no data changed shape.
- The pre-v1 migration steps and their tests were deleted. The machinery (`lift`, `liftPageFile`, `liftSiteFile`) and the empty `migrations: {}` contracts remain, covered by the synthetic tests in `tests/migrate.test.mjs`, and form the foundation of the 0.6.9 updater.
- The requirement «at least one real migration in the test suite» applies from the first real format change after v1.0 (the backlog's v1.0 proof), not continuously through pre-v1 development. Until then, schema validation (`npm run validate` + CI) is the active protection for the contract.
- During development, unpushed format changes still need no migration (clarification 24 July 2026, logged in the backlog); from v1.0 the contract is fully enforced.
