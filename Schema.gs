var TABLES={
'Patients':['PatientID','MRN','PatientName','MobileNumber','Specialty','Consultant','Diagnosis','CreatedAt','CreatedBy','ModifiedAt','ModifiedBy','IsActive'],
'Arrival Records':['VisitID','VisitDate','ArrivalTime','PatientID','MRN','PatientName','MobileNumber','Room','Specialty','Consultant','Diagnosis','MedicationID','MedicationName','AdministrationRoute','DoseNumber','FirstDose','PrimaryNurse','ArrivalStatus','TreatmentStatus','LabsStatus','ConsentRequired','SickLeaveNeeded','WatcherLeaveNeeded','HomeMedicationRefillNeeded','OtherNotes','IntervalNumber','IntervalUnit','SuggestedNextAppointmentDate','FinalAppointmentDate','DateOverrideReason','NoNextAppointmentRequired','TreatmentReadiness','FormBRequired','FormBStatus','FormBApprovalNumber','FormBApprovedAt','FormBExpiryDate','CreatedAt','CreatedBy','ModifiedAt','ModifiedBy'],
'Visit Log':['VisitID','VisitDate','ArrivalTime','PatientName','MRN','Room','Specialty','Consultant','Diagnosis','MedicationProcedure','DoseNumber','FirstDose','PrimaryNurse','ArrivalStatus','TreatmentStatus','LabsStatus','ConsentStatus','SickLeave','WatcherLeave','HomeMedicationRefill','NextAppointmentDate','Notes'],
'Booking Requests':['RequestID','IdempotencyKey','RequestType','MRN','PatientName','MedicationID','MedicationName','Specialty','Consultant','DoseNumber','FirstDose','RequestedAppointmentDate','SuggestedDate','FinalAppointmentDate','Status','Reason','ErrorCode','CreatedAt','CreatedBy','ProcessedAt','ConfirmedAt','ConfirmedBy'],
'Booking Data':['BookingID','RequestID','PreviousBookingID','PreviousAppointmentDate','MRN','PatientName','MobileNumber','MedicationID','MedicationName','Specialty','Consultant','Diagnosis','AppointmentDate','DoseNumber','FirstDose','BookingStatus','BookingType','BookingCategory','TreatmentReadiness','FormBRequired','FormBStatus','Reason','CreatedAt','CreatedBy','ModifiedAt','ModifiedBy'],
'Change Requests':['ChangeID','BookingID','MRN','PreviousAppointmentDate','RequestedNewDate','FinalNewDate','Status','Reason','CreatedAt','CreatedBy','ProcessedAt','ErrorCode'],
'Waiting List':['WaitingListID','RequestID','MRN','MedicationID','RequestedDate','Status','OfferedDate','ConfirmedBy','ConfirmedAt','CreatedAt','CreatedBy'],
'No Arrival Log':['NoArrivalID','BookingID','AppointmentDate','MRN','Status','AlertType','OpenedAt','ClosedAt','ClosedBy'],
'Medication Master':['MedicationID','GenericName','Aliases','ItemType','Route','BookingCategory','AdministrationType','ExpectedChairMinutes','ObservationMinutes','WeekendEligibility','DailyLimit','RequiresFormB','DefaultNoNextAppointment','IsActive','ReviewedBy','ReviewedAt'],
'Medication Aliases':['AliasID','MedicationID','Alias','IsActive'],
'Treatment Schedules':['ScheduleID','MedicationID','ScheduleNameArabic','ScheduleNameEnglish','Phase','DoseSequenceFrom','DoseSequenceTo','IntervalNumber','IntervalUnit','MaximumLoadingDoses','NoNextAppointment','RequiresFormB','IsActive','ApprovedBy','ApprovedAt','Version'],
'Specialty Master':['SpecialtyID','SpecialtyEnglish','SpecialtyArabic','Icon','IsActive'],
'Consultant Master':['ConsultantID','ConsultantName','Specialty','IsActive'],
'Capacity Rules':['RuleID','RuleName','DayType','MedicationID','Category','Limit','IsActive','ApprovedBy','ApprovedAt'],
'Closed Dates':['ClosedDate','Reason','IsActive','ApprovedBy','ApprovedAt'],
'Users Roles':['Email','DisplayName','Role','Specialties','CanViewMRN','CanViewMobile','IsActive','CreatedAt','CreatedBy'],
'Daily Huddle':['HuddleDate','BookingID','Sequence','Room','MRN','PatientName','MedicationID','MedicationName','Specialty','Consultant','ArrivalStatus','BookingStatus','AlertFlags','BuiltAt'],
'Audit Log':['AuditID','ActorEmail','Action','EntityType','EntityID','OldValue','NewValue','Reason','CreatedAt','ErrorCode'],
'System Config':['ConfigKey','ConfigValue','UpdatedAt','UpdatedBy']
};
var MONTH_SECTIONS=['Cardio','Other Procedure','IVIG Infusion','Blood Transfusion','Infusion'];
var MONTH_COLUMNS=['No','Patient Name','MRN','Mobile No','Diagnosis / Medication','Appointment / Readmission Date','Doctor','Rebooking Date'];
