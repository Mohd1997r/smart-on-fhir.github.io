# DCU Operations & Booking Portal Agent Notes

- Do not commit real PHI, real MRNs, phone numbers, Spreadsheet IDs, or deployment URLs.
- Run `npm test` after changing business logic.
- Apps Script files are plain `.gs` files at repo root for clasp deployment.
- Critical authorization and capacity rules belong on the server; do not move them to client-only JavaScript.
- `installSystem()` is first-run only; `migrateSystem()` must be idempotent and preserve local master-data edits.
