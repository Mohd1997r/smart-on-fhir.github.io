# Data Dictionary

All tables use unique header names and are accessed by header, never column position. MRN is text and must not be converted to a number.

## Core tables

| Table | Key | Purpose | Key relationships |
|---|---|---|---|
| Patients | PatientID | One row per unique fake/real patient record in the secured Sheet | MRN referenced by Arrival Records and Booking Data |
| Arrival Records | VisitID | Operational arrival entry per visit | PatientID/MRN, MedicationID |
| Visit Log | VisitID | Append-only visit log generated from arrivals | Mirrors visit data; not future booking |
| Booking Requests | RequestID | Request queue written by web app before official booking | One request can create one BookingID |
| Booking Data | BookingID | Official booking ledger | PreviousBookingID for changes |
| Change Requests | ChangeID | Change workflow audit | BookingID and resulting new booking |
| Waiting List | WaitingListID | No capacity/range outcomes | RequestID; requires Offered/Accepted before booking |
| No Arrival Log | NoArrivalID | Internal no-arrival alerts | BookingID |
| Audit Log | AuditID | Append-only audit trail | EntityType + EntityID |

## Master/config tables

Medication Master contains MedicationID, GenericName, Aliases, ItemType, Route, BookingCategory, AdministrationType, ExpectedChairMinutes, ObservationMinutes, WeekendEligibility, DailyLimit, RequiresFormB, DefaultNoNextAppointment, IsActive, ReviewedBy, ReviewedAt. Only `Other approved procedure` permits local review; free text is not accepted as a medication.

Treatment Schedules contains ScheduleID, MedicationID, bilingual names, Phase, dose sequence bounds, Interval Number/Unit, Maximum Loading Doses, No Next Appointment, Requires Form B, Is Active, approval metadata, and Version. No clinical intervals are pre-invented by the code.

Users Roles contains Email, DisplayName, Role, Specialties, CanViewMRN, CanViewMobile, IsActive. Server-side authorization uses this table for every API.

Capacity Rules, Closed Dates, Specialty Master, Consultant Master, System Config, Daily Huddle, Medication Aliases, and the 24 monthly sheets are created by setup/migration with fixed headers.

## Field rules

- Dates: ISO `yyyy-mm-dd`, allowed appointment range 2026-01-01 through 2027-12-31.
- Status values: request states New, Processing, Alternative Offered, Awaiting Nurse Confirmation, Completed, Failed, Need Review; booking states Submitted, Booked, Pending, Need Review, Changed, Cancelled, Entered by Error, No Appointment Required.
- Treatment readiness: Ready, Missing Order, Missing Labs, Missing Consent, Form B Required, Infection Concern, Medication Not Available, Need Clinical Review.
- Form B: if required, Ready requires Approved status, approval number, and non-expired expiry date when entered.
