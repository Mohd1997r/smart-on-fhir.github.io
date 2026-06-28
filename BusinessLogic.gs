var DcuLogic = (function(){
function pad(n){return String(n).padStart(2,'0');}
function parseDate(s){ if (s instanceof Date) return new Date(Date.UTC(s.getFullYear(),s.getMonth(),s.getDate())); if(!/^\d{4}-\d{2}-\d{2}$/.test(String(s))) throw new Error('INVALID_DATE'); var p=String(s).split('-').map(Number); var d=new Date(Date.UTC(p[0],p[1]-1,p[2])); if(d.getUTCFullYear()!==p[0]||d.getUTCMonth()!==p[1]-1||d.getUTCDate()!==p[2]) throw new Error('INVALID_DATE'); return d; }
function fmt(d){ return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate()); }
function addDays(s,n){ var d=parseDate(s); d.setUTCDate(d.getUTCDate()+n); return fmt(d); }
function addInterval(s,num,unit){ var d=parseDate(s); num=Number(num||0); if(unit==='Days') d.setUTCDate(d.getUTCDate()+num); else if(unit==='Weeks') d.setUTCDate(d.getUTCDate()+num*7); else if(unit==='Months') d.setUTCMonth(d.getUTCMonth()+num); else if(unit==='Years') d.setUTCFullYear(d.getUTCFullYear()+num); else throw new Error('INVALID_INTERVAL_UNIT'); return fmt(d); }
function dayType(s){ var w=parseDate(s).getUTCDay(); return (w===5||w===6)?'Weekend':'Weekday'; }
function inRange(s){ return s>=DCU.MIN_DATE && s<=DCU.MAX_DATE; }
function medById(id, meds){ meds=meds||medRows(); for(var i=0;i<meds.length;i++) if(meds[i].MedicationID===id) return meds[i]; return null; }
function medRows(){ var h=['MedicationID','GenericName','Aliases','ItemType','Route','BookingCategory','AdministrationType','ExpectedChairMinutes','ObservationMinutes','WeekendEligibility','DailyLimit','RequiresFormB','DefaultNoNextAppointment','IsActive']; return DCU.MEDS.map(function(r){var o={}; h.forEach(function(k,i){o[k]=r[i];}); return o;}); }
function isProcedure(m){ return m && (m.ItemType==='Procedure' || m.BookingCategory==='Other Procedure'); }
function activeBookings(bookings,date){ return (bookings||[]).filter(function(b){return b.AppointmentDate===date && ['Submitted','Booked','Pending','Need Review'].indexOf(b.BookingStatus)>=0;}); }
function duplicate(bookings,candidate){ return (bookings||[]).some(function(b){ return ['Submitted','Booked','Pending','Need Review'].indexOf(b.BookingStatus)>=0 && b.MRN===candidate.MRN && b.AppointmentDate===candidate.AppointmentDate && b.MedicationID===candidate.MedicationID; }); }
function evaluateCapacity(date, candidate, bookings, closedDates, meds){
  if(!inRange(date)) return {ok:false, code:'DATE_OUT_OF_RANGE'};
  if((closedDates||[]).indexOf(date)>=0) return {ok:false, code:'CLOSED_DATE'};
  var m=medById(candidate.MedicationID, meds); if(!m||m.IsActive==='No') return {ok:false, code:'MEDICATION_INACTIVE'};
  var day=dayType(date), rows=activeBookings(bookings,date), total=rows.length, first=rows.filter(function(b){return truthy(b.FirstDose);}).length;
  var medCount=rows.filter(function(b){return b.MedicationID===candidate.MedicationID;}).length;
  var procCount=rows.filter(function(b){var mm=medById(b.MedicationID, meds); return isProcedure(mm);}).length;
  if(duplicate(bookings, Object.assign({},candidate,{AppointmentDate:date}))) return {ok:false, code:'DUPLICATE_BOOKING'};
  if(day==='Weekend'){
    if(['MED_IRON_SUCROSE','MED_FERINJECT'].indexOf(candidate.MedicationID)<0) return {ok:false, code:'WEEKEND_MEDICATION_NOT_ALLOWED'};
    if(total>=20) return {ok:false, code:'WEEKEND_TOTAL_FULL'};
    if(truthy(candidate.FirstDose)&&first>=2) return {ok:false, code:'FIRST_DOSE_FULL'};
    if(medCount>=10) return {ok:false, code:'WEEKEND_MEDICATION_FULL'};
    return {ok:true, code:'OK'};
  }
  if(['MED_IRON_SUCROSE','MED_FERINJECT'].indexOf(candidate.MedicationID)>=0) return {ok:false, code:'WEEKDAY_IRON_NOT_ALLOWED'};
  if(total>=20) return {ok:false, code:'WEEKDAY_TOTAL_FULL'};
  if(truthy(candidate.FirstDose)&&first>=2) return {ok:false, code:'FIRST_DOSE_FULL'};
  if(isProcedure(m) && procCount>=2) return {ok:false, code:'PROCEDURE_FULL'};
  if(['MED_IVIG','MED_DESFERAL','PROC_BLOOD'].indexOf(candidate.MedicationID)>=0 && medCount>=2) return {ok:false, code:'ITEM_FULL'};
  return {ok:true, code:'OK'};
}
function findNearestDate(start,candidate,bookings,closedDates,meds){ var d=start, last; while(inRange(d)){ var ev=evaluateCapacity(d,candidate,bookings,closedDates,meds); if(ev.ok) return {status:d===start?'Available':'Alternative Offered', date:d, code:'OK'}; last=ev.code; d=addDays(d,1);} return {status:'Need Review', date:'', code:last||'NO_DATE_AVAILABLE'}; }
function truthy(v){ return v===true || v==='TRUE' || v==='Yes' || v==='1' || v===1; }
function validateSchedule(medicationId,scheduleId,schedules){ var s=(schedules||[]).filter(function(x){return x.ScheduleID===scheduleId && x.IsActive!=='No';})[0]; if(!s) return {ok:false, code:'SCHEDULE_NOT_ACTIVE'}; if(s.MedicationID!==medicationId) return {ok:false, code:'SCHEDULE_MEDICATION_MISMATCH'}; return {ok:true, intervalNumber:s.IntervalNumber, intervalUnit:s.IntervalUnit, noNextAppointment:s.NoNextAppointment, requiresFormB:s.RequiresFormB}; }
function validateReadiness(row, today){ if(row.TreatmentReadiness!=='Ready') return {ok:false, code:'READINESS_NOT_READY'}; if(truthy(row.FormBRequired)){ if(row.FormBStatus!=='Approved'||!row.FormBApprovalNumber) return {ok:false, code:'FORM_B_INCOMPLETE'}; if(row.FormBExpiryDate && row.FormBExpiryDate < (today||fmt(new Date()))) return {ok:false, code:'FORM_B_EXPIRED'}; } return {ok:true, code:'OK'}; }
function daysInMonth(y,m){ return new Date(Date.UTC(y,m,0)).getUTCDate(); }
return {parseDate:parseDate,fmt:fmt,addDays:addDays,addInterval:addInterval,dayType:dayType,inRange:inRange,medRows:medRows,medById:medById,evaluateCapacity:evaluateCapacity,findNearestDate:findNearestDate,validateSchedule:validateSchedule,validateReadiness:validateReadiness,daysInMonth:daysInMonth,duplicate:duplicate,truthy:truthy};
})();
