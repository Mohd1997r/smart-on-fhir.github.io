# DCU Portal Agent Notes

- Do not add real PHI, real MRNs, or real phone numbers. Use clearly fake `TEST` data only.
- Keep business rules in `Logic.js` and copy to `Logic.gs` when changed so local tests and Apps Script stay aligned.
- Run `node tests/dcu.logic.test.js` after rule changes.
- Never expose Script Properties, Spreadsheet IDs, or direct sheet write paths in client HTML/JS.
- Preserve fail-closed authorization in every server API.
