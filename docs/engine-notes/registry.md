# registry.js

The full text of the longer comments in the engine's `registry.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Shared registry factory. Every extensible type in Urd (blocks, section
presets, background layers, animations) uses the same registry pattern,
and plugins use the identical define APIs as the core.

## `createRegistry › alias`

Resolves an old contract id to its current one (ADR-0021). Aliases are
consulted only on a direct miss, so a plugin that still defines the
old id keeps winning for its own data.

## `createRegistry › reserve`

Marks ids as the engine's own before their modules have defined them (core-types.js, ADR-0036): define() refuses them, and the definer returned here, which the engine keeps, defines them.
