# Acceptance Tests

Automated coverage is in `tests/dcu.logic.test.js`. Manual Workspace acceptance must also be run after `installSystem()` with fake TEST-only records.

| # | Acceptance case | Automated result |
|---|---|---|
| 1 | Iron Sucrose Friday within 10 accepts | Covered |
| 2 | Iron Sucrose 11th Friday moves and needs confirmation | Covered |
| 3 | Ferinject within 10 accepts | Covered |
| 4 | Weekend total does not exceed 20 | Covered |
| 5 | Weekend third First Dose rejected for that date | Covered |
| 6 | Non-iron Friday is not booked | Covered |
| 7 | Iron Sucrose Sunday is not booked | Covered |
| 8 | 21st weekday patient is not booked | Covered |
| 9 | Third weekday procedure is not booked | Covered |
| 10 | Third IVIG weekday is not booked | Covered |
| 11 | Third Desferal weekday is not booked | Covered |
| 12 | Third Blood Transfusion weekday is not booked | Covered |
| 13 | Third weekday First Dose is not booked | Covered |
| 14 | Duplicate booking does not create second row | Covered by logic; verify sheet idempotency manually |
| 15 | Not Given creates no next appointment | Verify in Workspace arrival flow |
| 16 | Date override requires reason | Verify in Workspace arrival flow |
| 17 | Change keeps old booking | Verify in Workspace change flow |
| 18 | Manual addition appears in huddle | Verify in Workspace huddle |
| 19 | Doctor cannot see other specialty | Verify with doctor test user |
| 20 | Unauthorized user cannot access | Verify with inactive test user |
| 21 | Wrong ScheduleID rejected | Covered |
| 22 | Blank row does not update wrong row | Verify repository returns `sheetRowNumber` |
| 23 | Booking creation writes Audit Log | Verify in Workspace |
| 24 | Failed change does not disable old booking | Verify with simulated update failure |
| 25 | Blood/Paracentesis No Next Appointment respects approved schedule | Covered |
| 26 | Schedule switch updates interval/unit | Covered |
| 27 | Overlapping capacity rules produce config error | Covered |
| 28 | Late arrival closes No Arrival | Verify in Workspace |
| 29 | Re-running install/migrate preserves local Medication Master | Verify in Workspace |
| 30 | Doctor direct API call cannot fetch another specialty | Verify with direct Apps Script call |
| 31 | Pending/Need Review not in months/huddle official list | Covered by logic; verify Workspace output |
| 32 | Concurrent last-seat requests do not exceed capacity | Verify with Workspace concurrency test |
| 33 | Form B Required blocks readiness until approved/number present | Covered |
| 34 | Monthly update changes affected day only | Verify in month sheet |
| 35 | 29 Feb rejected for 2026/2027 and month day counts correct | Covered |
