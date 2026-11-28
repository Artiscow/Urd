# Amended ADRs: the record

An accepted ADR in [docs/adr/](../) is kept as one text that is always true: when a decision changes, the decision is rewritten in place, and the mechanics that followed the change go to ARCHITECTURE.md and SCHEMA.md. Each ADR that has been amended has one file here that is its changelog, so the reasoning that held at each point in time can still be read.

Rules:

- The file is named after its ADR, `<number>-<slug>.md` (ADR-0014's is `0014-updater-model.md`), and titled «Amendments to» the ADR's title. The first amendment of an ADR creates it; every later amendment of the same ADR goes into it, never into a new file.
- Each amendment adds a section `## Until <date>` at the top of the file, under its title and introduction, where the date is the day the amendment was made; a second or third amendment the same day is `## Until <date> (2)` and `(3)`. The section names the decisions that changed and holds their wording as it stood before, with relative links made to resolve from this folder.
- A section is never edited afterwards, except that a relative link is repaired when a rename breaks it; the link keeps pointing at the same document, or at the document that replaced it.
- The sections for the amendments made until 27 November 2026 hold the whole ADR as it stood, its headings two levels down, with its status line as it was then.
- The current ADR's status line names the date and the decisions changed by the latest amendment, and links to its file here («earlier text in amended/»).
- An ADR that is replaced as a whole is not recorded here: it stays in docs/adr/ with the status «Superseded by ADR-NNNN», as before.
- Addenda inside an ADR are for notes that change no decision. A change of a decision is a rewrite of that decision, with a section here.
