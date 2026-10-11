# ADR-0005: Versioning and migration - the invariant

**Status:** accepted (July 2026); the decisions on the pre-v1 period amended August 2026 (the phase release of v0.6), earlier text in [amended/](amended/0005-versioning-and-migration-until-2026-10-11.md). The contract's fields are in [SCHEMA.md](../SCHEMA.md#the-migration-contract).

## Context

Promise 2: an Urd update must never break a site someone has already built. Cloned sites must be able to safely upgrade the engine, and the data must come along. The experience from ApeironLF (ad-hoc `normalize()` per module, no formal contract) showed that this must be a system requirement, not a convention.

## Decision

- **Everything is versioned:** files have `schemaVersion`; every section, block, background layer and animation has `version`.
- **Every registry type defines stepwise migrations:** `migrations[n]` lifts exactly v(n) → v(n+1) and is a pure function (props in, props out - no DOM, no side effects).
- **Load rule:** data whose version is behind the definition is lifted one step at a time until it matches (`template/assets/engine/migrate.js`).
- **In memory:** loading never mutates the repo; disk is written first at the next publish (then in lifted form).
- **Never destructive:** unknown type or missing migration → neutral placeholder rendering, original JSON untouched. Never throw, never delete.
- **Applies equally to plugins:** plugins use the same define API and inherit the contract.
- **Before v1 the contract is not yet enforced:** a format change that has not been pushed needs no migration, and the migrations written during pre-v1 development are baked in at a phase release (the current shapes become version 1 and the pre-v1 steps are deleted). Until then schema validation is the active protection for the contract; from v1.0 the contract is fully enforced.

## Consequences

- Changing a block type's props shape is always allowed - but costs a migration function. That is the price, and from v1.0 it is enforced.
- Migrations are trivially unit-testable; the requirement of at least one real migration in the test suite applies from the first real format change after v1.0.
- Content newer than the engine (a site edited with a newer Urd) is rendered as a placeholder instead of being misinterpreted - downgrading is safe, if not pretty.
