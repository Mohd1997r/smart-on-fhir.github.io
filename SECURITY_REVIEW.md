# Security Review

## Model

The portal is a private Google Apps Script Web App backed by a single Google Sheet stored in Script Properties. The browser never receives the Spreadsheet ID. Access fails closed if `Session.getActiveUser().getEmail()` is empty or not active in `Users Roles`.

## Roles

Admin, Manager, Charge Nurse, Booking Staff, Nurse, Doctor, and Read Only are enforced in server functions. Doctor specialty restrictions are checked on the server; CSS hiding is not used as a security boundary. Mobile numbers are omitted from server responses unless `CanViewMobile=Yes`.

## Threat controls

- Unauthorized user: blocked in `AuthService.gs`.
- Direct API calls: each API uses role/specialty checks.
- Race conditions: booking/change operations use Script Lock and re-read capacity.
- Duplicate bookings: MRN + AppointmentDate + MedicationID active duplicates are blocked.
- PHI leakage: no real patient data in repository; Logger is not used for patient payloads.
- XSS: client writes data with `textContent` helper and server strips angle brackets for stored text.
- Unsafe deletion: no delete API; cancelled/changed/error are status changes with reasons and audit rows.
- Monthly output integrity: only Booked rows are displayed, and affected day blocks are updated.

## Manual governance required

Google Workspace owners must approve deployment access, legal/health-data agreements, Drive retention, backup policy, admin users, master-data review, capacity rule approval, and LIVE mode. This repository does not claim organizational compliance or production authorization.
