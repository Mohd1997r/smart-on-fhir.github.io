# Data Dictionary

All tables use fixed unique English internal headers. Arabic/English labels are provided in the UI and can be extended in local governance documents. Required means required for normal workflow unless the status/rule allows otherwise.

## Core tables

| Table | Key | Purpose | Relationships |
|---|---|---|---|
| Patients | PatientID | One row per MRN/patient master record | MRN referenced by visits/bookings |
| Arrival Records | VisitID | Operational arrival record | MRN, PatientID, MedicationID |
| Visit Log | VisitID | Append-only visit log copy | MRN, MedicationID |
| Booking Requests | RequestID | Idempotent request queue | Creates Booking Data after validation |
| Booking Data | BookingID | Official booking store | RequestID, MRN, MedicationID, PreviousBookingID |
| Change Requests | ChangeID | Change workflow audit | PreviousBookingID |
| Waiting List | WaitingID | Waiting/offered/accepted workflow | RequestID |
| No Arrival Log | NoArrivalID | Open/closed no-arrival alerts | BookingID, MRN |
| Medication Master | MedicationID | Approved medication/procedure reference | Treatment Schedules, bookings |
| Medication Aliases | AliasID | Medication synonyms | MedicationID |
| Treatment Schedules | ScheduleID | Pharmacy-reviewed schedules | MedicationID |
| Specialty Master | SpecialtyID | Approved specialties | Users, bookings |
| Consultant Master | ConsultantID | Consultant reference | Specialty |
| Capacity Rules | RuleID | Approved non-clinical capacity limits | DayType, MedicationID/ItemType |
| Closed Dates | Date | Closed/holiday dates | Capacity search |
| Users Roles | Email | Authorization model | Role, Specialties |
| Daily Huddle | HuddleID | Optional huddle snapshots | Date |
| Audit Log | AuditID | Append-only audit events | Entity/EntityID |
| System Config | Key | Runtime config | SystemMode, SchemaVersion |

## Important fields and allowed values

- `MRN`: text, required, never converted to number.
- `RequestStatus`: New, Processing, Alternative Offered, Awaiting Nurse Confirmation, Completed, Failed, Need Review.
- `BookingStatus`: Submitted, Booked, Pending, Need Review, Changed, Cancelled, Entered by Error, No Appointment Required.
- `ArrivalStatus`: Arrived, Not Arrived, Waiting, In Treatment, Completed.
- `TreatmentStatus`: Pending, Given, Not Given, Deferred.
- `IntervalUnit`: Days, Weeks, Months, Years.
- `TreatmentReadiness`: Ready, Missing Order, Missing Labs, Missing Consent, Form B Required, Infection Concern, Medication Not Available, Need Clinical Review.
- `FormBStatus`: Not Required, Pending, Approved, Rejected, Expired.
- `Waiting List Status`: Waiting, Offered, Accepted, Booked, Declined, Cancelled.

## Monthly booking output sheets

`2026 January` through `2027 December` contain actual calendar days only. February 2026 and February 2027 have 28 days. Official month output includes Booked active rows only, not Pending or Need Review.
