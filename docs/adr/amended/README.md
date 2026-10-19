# Amended ADRs: the record

An accepted ADR in [docs/adr/](../) is kept as one text that is always true: when a decision changes, the decision is rewritten in place, the status line names the date and the decisions that changed, and the mechanics that followed the change go to ARCHITECTURE.md and SCHEMA.md. The text as it stood before the rewrite is kept here, so the reasoning that held at each point in time can still be read (the practice of immutable records, adopted 11 October 2026 in this form).

Rules:

- A file here is a copy of the ADR as it stood before an amendment, named `<number>-<slug>-until-<date>.md`, where the date is the day the amendment was made. It is never edited, except that a relative link is repaired when the move into this folder or a later rename breaks it; the link keeps pointing at the same document, or at the document that replaced it.
- The current ADR's status line names the amendment date and points here («earlier text in amended/»); the copy keeps its original status line.
- An ADR that is replaced as a whole is not copied here: it stays in docs/adr/ with the status «Superseded by ADR-NNNN», as before.
- Addenda inside an ADR are for notes that change no decision. A change of a decision is a rewrite of that decision, with a copy here.
