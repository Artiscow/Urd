# ADR-0001: Hybrid editor model - sections with a free canvas inside

**Status:** accepted (July 2026)

## Context

Two established editing paradigms stood against each other: purely section-based (choose a section type, fill in fields - safe, but limited) and a fully free canvas in the style of Wix/Figma (full freedom, but responsiveness becomes a nightmare and data migration fragile). The vision requires «full control over everything on the page», while promise 2 (an update never breaks a built site) requires a migratable data model.

## Decision

A page is a vertical sequence of **sections**; inside each section, **blocks are placed freely on a snap grid** (configurable, can be switched off). Sections can be scaled/moved freely and are created from presets or from an empty canvas - presets are data factories, not code paths; once created, all sections are equal generic containers.

Because the freedom lets desktop and mobile layouts drift apart, the **mobile review flag** is part of the decision: manually overridden mobile layouts are flagged on desktop changes until the user has looked them over (rules in [SCHEMA.md](../SCHEMA.md#mobile-review)).

## Consequences

- ~90 % of the freedom of a free canvas, with a data model that remains migratable and re-renderable per section.
- Responsiveness is solved per section: auto-derived stacking as the default, manual mobile frames as the override, a flag on drift.
- The editor must handle two coordinate worlds (section order + grid frames) - more complex than a pure section model, considerably simpler than a full-page canvas.
