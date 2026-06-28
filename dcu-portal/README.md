# DCU Operations & Booking Portal / بوابة تشغيل وحجز وحدة الرعاية النهارية

Internal Google Apps Script Web App for authorized DCU staff. It uses HtmlService, Google Sheets as the structured store, and Drive only for authorized spreadsheet/backup outputs. It is not a public or marketing site.

## Repository layout

- `Main.gs`, `Index.html`, `Styles.html`, `App.html`: web app shell and `google.script.run` API.
- `AuthService.gs`: fail-closed Google-session email lookup and role/specialty filtering.
- `BookingService.gs`, `CapacityService.gs`, `ChangeService.gs`, `ArrivalService.gs`: operational workflows.
- `Setup.gs`: `installSystem()`, `migrateSystem()`, `validateReadiness()`.
- `Logic.js` / `Logic.gs`: isolated business rules used by Apps Script and local Node tests.
- `tests/`: local tests using only clearly fake identifiers such as `T-1` and no real PHI.

## Required owner/admin setup

1. Create a Google Apps Script project owned by the authorized Workspace account.
2. Copy `.clasp.json.example` to `.clasp.json` and set your script ID locally only. Do not commit it.
3. Run `npx clasp push` from `dcu-portal` after authenticating with clasp.
4. In Apps Script, run `installSystem()` once. This creates the spreadsheet `DCU Booking Book 2026-2027`, all tables, and the 24 month sheets.
5. Add at least one active Admin row in `Users Roles` using the Workspace email.
6. Review and approve `Medication Master`, `Treatment Schedules`, `Capacity Rules`, `Specialty Master`, and `Consultant Master` locally. The code does not invent clinical schedules.
7. Run `validateReadiness()` until every item is acceptable.
8. Only an authorized Admin should set `System Config` key `SystemMode` from `SETUP` to `LIVE` after organizational approval.
9. Deploy the web app inside the Workspace only. Do not deploy anonymously or publicly.

## Rollback

Keep Apps Script versions and Drive spreadsheet backups. To roll back code, deploy the previous Apps Script version. To roll back data, restore from the backup copy created by `migrateSystem()` or an organization-approved Drive backup.

## OAuth scopes and reason

- `spreadsheets`: create/read/update controlled operational sheets.
- `drive.file`: create and maintain the booking workbook/backup copies created by this script.
- `userinfo.email`: read the signed-in Workspace user email; email is never accepted from the browser.
- `script.scriptapp`: install time triggers for No Arrival checks.
- `script.external_request`: reserved for future internal QR generation if approved; no external clinical service is used by current code.

## Testing

Run locally:

```bash
node tests/dcu.logic.test.js
```

Google-only behavior (HtmlService rendering, Session email, LockService under real concurrency, Spreadsheet protections, deployment access) must be verified by the owner/admin in the Workspace. The project deliberately does not claim deployment, authorization, or compliance approval.
