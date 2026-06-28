# Security Review

## Role model

Roles: Admin, Manager, Charge Nurse, Booking Staff, Nurse, Doctor, Read Only. `AuthService.currentUser()` reads the Google session email and fails closed when email is empty, missing, or inactive in `Users Roles`. Doctors are filtered to their configured specialties on every server API, including direct calls.

## Controls

- Spreadsheet ID is read from Script Properties and is not embedded in HTML/JavaScript.
- Browser writes only to server APIs; booking data and monthly sheets are never direct browser targets.
- Booking creation and change use `LockService`, re-read state, duplicate detection, and audit logging.
- Doctors do not receive mobile/internal note fields from the server.
- No delete workflow is provided; Changed, Cancelled, and Entered by Error are auditable states.
- Cache is reserved for non-sensitive reference data only.
- UI text insertion escapes HTML and uses safe rendering patterns.
- Fixed banner: `Authorized staff only / للموظفين المصرح لهم فقط`.

## Threats addressed

- Unauthorized user: fail-closed access denied.
- Direct server call by doctor for another specialty: server-side specialty check denies.
- Duplicate/parallel booking: lock + duplicate key MRN/date/medication.
- Alternative date abuse: alternative date requires confirmation before booked.
- PHI leakage: no real patient examples in code/tests; no spreadsheet ID in client.

## External requirements

Google Workspace health-data compliance, legal approvals, cyber-security review, account provisioning, and deployment policy must be completed by the organization. This code does not decide compliance.
