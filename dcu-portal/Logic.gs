(function(root){
'use strict';
var START='2026-01-01', END='2027-12-31';
var WEEKEND_ALLOWED=['MED_IRON_SUCROSE','MED_FERINJECT'];
var PROCEDURES=['Procedure','Blood Product'];
function pad(n){return String(n).padStart(2,'0');}
function dateKey(d){ if(typeof d==='string') return d.slice(0,10); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function parseDate(s){ var p=String(s).slice(0,10).split('-').map(Number); return new Date(Date.UTC(p[0],p[1]-1,p[2])); }
function addDays(s,n){ var d=parseDate(s); d.setUTCDate(d.getUTCDate()+n); return dateKey(d); }
function weekday(s){ return parseDate(s).getUTCDay(); }
function inRange(s){ return s>=START && s<=END && dateKey(parseDate(s))===s; }
function isWeekend(s){ var w=weekday(s); return w===5 || w===6; }
function medById(meds,id){ return (meds||[]).filter(function(m){return m.MedicationID===id;})[0]; }
function activeBookings(bookings,date){ return (bookings||[]).filter(function(b){return b.AppointmentDate===date && ['Submitted','Booked','Pending','Need Review'].indexOf(b.BookingStatus)>=0;}); }
function ensureNoOverlappingRules(rules){ var keys={}; (rules||[]).forEach(function(r){ if(r.IsActive==='Yes'){ var k=[r.DayType,r.MedicationID||'',r.ItemType||'',r.RuleType].join('|'); if(keys[k]) throw code('CONFIG_OVERLAP','Overlapping active capacity rules'); keys[k]=true; }}); }
function countFor(bookings,date,predicate){ return activeBookings(bookings,date).filter(predicate).length; }
function validateCapacity(input, bookings, meds, closedDates, rules){
  if(!inRange(input.date)) return {ok:false,code:'DATE_OUT_OF_RANGE'};
  if((closedDates||[]).some(function(c){return c.Date===input.date && c.IsActive==='Yes';})) return {ok:false,code:'CLOSED_DATE'};
  ensureNoOverlappingRules(rules||[]);
  var med=medById(meds,input.medicationId); if(!med || med.IsActive==='No') return {ok:false,code:'MEDICATION_INVALID'};
  var dayBookings=activeBookings(bookings,input.date); var weekend=isWeekend(input.date);
  if(weekend){
    if(WEEKEND_ALLOWED.indexOf(input.medicationId)<0) return {ok:false,code:'WEEKEND_MEDICATION_NOT_ALLOWED'};
    if(PROCEDURES.indexOf(med.ItemType)>=0) return {ok:false,code:'WEEKEND_PROCEDURE_NOT_ALLOWED'};
    if(dayBookings.length>=20) return {ok:false,code:'DAILY_FULL'};
    if(countFor(bookings,input.date,function(b){return b.MedicationID===input.medicationId;})>=10) return {ok:false,code:'MEDICATION_DAILY_FULL'};
    if(input.firstDose && countFor(bookings,input.date,function(b){return String(b.FirstDose)==='Yes';})>=2) return {ok:false,code:'FIRST_DOSE_FULL'};
  } else {
    if(WEEKEND_ALLOWED.indexOf(input.medicationId)>=0) return {ok:false,code:'WEEKDAY_IRON_NOT_ALLOWED'};
    if(dayBookings.length>=20) return {ok:false,code:'DAILY_FULL'};
    if(input.firstDose && countFor(bookings,input.date,function(b){return String(b.FirstDose)==='Yes';})>=2) return {ok:false,code:'FIRST_DOSE_FULL'};
    if(['MED_IVIG','MED_DESFERAL','MED_BLOOD'].indexOf(input.medicationId)>=0 && countFor(bookings,input.date,function(b){return b.MedicationID===input.medicationId;})>=2) return {ok:false,code:'MEDICATION_DAILY_FULL'};
    if(PROCEDURES.indexOf(med.ItemType)>=0 && countFor(bookings,input.date,function(b){var m=medById(meds,b.MedicationID); return m && PROCEDURES.indexOf(m.ItemType)>=0;})>=2) return {ok:false,code:'PROCEDURE_FULL'};
  }
  if((bookings||[]).some(function(b){return b.MRN===input.mrn && b.AppointmentDate===input.date && b.MedicationID===input.medicationId && ['Submitted','Booked','Pending','Need Review'].indexOf(b.BookingStatus)>=0;})) return {ok:false,code:'DUPLICATE_BOOKING'};
  return {ok:true,code:'OK'};
}
function findNextAvailable(input, bookings, meds, closedDates, rules){ var d=input.date; while(d<=END){ var res=validateCapacity(Object.assign({},input,{date:d}),bookings,meds,closedDates,rules); if(res.ok) return {status:d===input.date?'Booked':'Alternative Offered',date:d,code:res.code,requiresConfirmation:d!==input.date}; d=addDays(d,1);} return {status:'Need Review',date:null,code:'NO_DATE_AVAILABLE',requiresConfirmation:false}; }
function code(c,m){ var e=new Error(c+': '+(m||c)); e.code=c; return e; }
function validateSchedule(schedule, medicationId){ if(!schedule || schedule.IsActive!=='Yes') throw code('SCHEDULE_INVALID','Schedule is not active'); if(schedule.MedicationID!==medicationId) throw code('SCHEDULE_MEDICATION_MISMATCH','Schedule does not match medication'); return {IntervalNumber:schedule.IntervalNumber,IntervalUnit:schedule.IntervalUnit,NoNextAppointment:schedule.NoNextAppointment==='Yes'}; }
function validateReadiness(row,today){ if(row.FormBRequired==='Yes'){ if(row.FormBStatus!=='Approved'||!row.FormBApprovalNumber) return {ready:false,code:'FORM_B_INCOMPLETE'}; if(row.FormBExpiryDate && row.FormBExpiryDate<today) return {ready:false,code:'FORM_B_EXPIRED'}; } return {ready:row.TreatmentReadiness==='Ready',code:row.TreatmentReadiness==='Ready'?'READY':'READINESS_NOT_READY'}; }
function daysInMonth(y,m){ return new Date(Date.UTC(y,m,0)).getUTCDate(); }
function monthSheets(){ var names=[], months=['January','February','March','April','May','June','July','August','September','October','November','December']; [2026,2027].forEach(function(y){months.forEach(function(mon,i){names.push({name:y+' '+mon,days:daysInMonth(y,i+1)});});}); return names; }
root.DcuLogic={validateCapacity:validateCapacity,findNextAvailable:findNextAvailable,validateSchedule:validateSchedule,validateReadiness:validateReadiness,monthSheets:monthSheets,addDays:addDays,isWeekend:isWeekend};
})(typeof module==='undefined'?this:module.exports);
