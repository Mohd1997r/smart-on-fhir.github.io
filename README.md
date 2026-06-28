# DCU Operations & Booking Portal

Internal bilingual Google Apps Script Web App for DCU/MDU operations: arrivals, huddle, doctor dashboards, manual bookings, appointment changes, search, manager view, monthly booking book, audit, and setup/migration.

> Authorized staff only / للموظفين المصرح لهم فقط. This code is not deployed and does not claim Google Workspace, legal, cybersecurity, or organizational approval.

## Repository layout

- `appsscript.json` — Apps Script V8 manifest, Asia/Riyadh timezone, Workspace-only webapp access.
- `Main.gs`, `Index.html`, `Styles.html`, `App.html` — HtmlService app shell and client router.
- `AuthService.gs` — fail-closed authentication, role checks, doctor specialty filtering.
- `BusinessLogic.gs`, `CapacityService.gs`, `ValidationService.gs` — isolated capacity/date/readiness rules.
- `SheetRepository.gs` — header-based Sheet access preserving real `sheetRowNumber`.
- `ArrivalService.gs`, `BookingService.gs`, `ChangeService.gs`, `HuddleService.gs`, `NoArrivalService.gs`, `WaitingListService.gs`, `MonthlyBookService.gs` — operational workflows.
- `Setup.gs`, `Triggers.gs` — `installSystem()`, `migrateSystem()`, `validateReadiness()`, and trigger installation.
- `DATA_DICTIONARY.md`, `SECURITY_REVIEW.md`, `ACCEPTANCE_TESTS.md` — governance and test documentation.
- `tests/run-tests.js` — local Node acceptance checks with fake TEST-only records.

## Setup and deployment

1. Install clasp locally: `npm install -g @google/clasp`.
2. Login with the Workspace owner/admin account: `clasp login`.
3. Create an Apps Script project or copy `.clasp.json.example` to `.clasp.json` and put the real Apps Script `scriptId` there. Do not commit `.clasp.json`.
4. Push code: `clasp push`.
5. In Apps Script editor, run `installSystem()` once. It creates a Sheet named `DCU Booking Book 2026-2027`, all required tables, 24 monthly sheets for 2026 and 2027, reference medication/specialty/capacity rows, and triggers.
6. Add an active Admin row in `Users Roles` using the owner email. Review and approve Capacity Rules, Medication Master, specialties, consultants, and schedules locally.
7. Run `validateReadiness()`. Resolve all failed checks.
8. Only an Admin should change `System Config` `SYSTEM_MODE` from `SETUP` to `LIVE` after organizational approval.
9. Deploy as Web App inside the Workspace. Do not deploy as anonymous/public. Do not share the Sheet directly with doctors.

## Rollback

- Use Apps Script versions/deployments to roll back the web app code.
- Before `migrateSystem()`, the script copies the Sheet as a backup. Restore from that Drive copy if a structural migration needs rollback.

## Required scopes

- Spreadsheets: read/write controlled booking data and monthly output.
- Drive file: create backup copies and the booking book during setup.
- User email: identify the signed-in Workspace user.
- Script triggers: install no-arrival scheduled scan.
- External request is listed for future authorized QR/rendering extensions; no external patient data export is implemented.

## Testing

Run local acceptance tests:

```bash
npm test
```

Google-specific behavior that cannot be verified locally without a Workspace account includes actual HtmlService deployment, Session email behavior, LockService concurrency under Apps Script, Spreadsheet protections, Drive backup creation, and trigger execution. Those are covered by manual tests in `ACCEPTANCE_TESTS.md`.

## Legacy SMART documentation

The original documentation-site content remains below for repository continuity.


# SMART Technical Documentation


This is the SMART technical documentation, hosted at
<http://docs.smarthealthit.org>

- See <http://smarthealthit.org> for high-level project info and news
- Need help? Ask a question at <http://groups.google.com/group/smart-on-fhir>
- Found an error in these docs? Fork them on Github and send us a pull
  request!


## Build With Docker

```
docker run -it --rm -v "$PWD":/usr/src/app -p "4000:4000" starefossen/github-pages
```

And then open a browser to http://localhost:4000
