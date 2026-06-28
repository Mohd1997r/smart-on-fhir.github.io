var DCU = (function(){
  var TZ='Asia/Riyadh', MIN_DATE='2026-01-01', MAX_DATE='2027-12-31', SCHEMA_VERSION='1.0.0';
  var ROLES=['Admin','Manager','Charge Nurse','Booking Staff','Nurse','Doctor','Read Only'];
  var BOOKING_ACTIVE=['Submitted','Booked','Pending','Need Review'];
  var BOOKING_OFFICIAL=['Booked'];
  var ARRIVAL_STATUS=['Arrived','Not Arrived','Waiting','In Treatment','Completed'];
  var REQUEST_STATUS=['New','Processing','Alternative Offered','Awaiting Nurse Confirmation','Completed','Failed','Need Review'];
  var TREATMENT_STATUS=['Pending','Given','Not Given','Deferred'];
  var READINESS=['Ready','Missing Order','Missing Labs','Missing Consent','Form B Required','Infection Concern','Medication Not Available','Need Clinical Review'];
  var SPECIALTIES=[['Neurology','الأعصاب','🧠'],['Gastroenterology','الجهاز الهضمي','🩺'],['Rheumatology','الروماتيزم','🦴'],['Endocrinology','الغدد','⚕️'],['Haematology','أمراض الدم','🩸'],['Immunology','المناعة','🛡️'],['Dermatology','الجلدية','◌'],['Cardiology','القلب','♡'],['Other approved specialties','تخصصات أخرى معتمدة','＋']];
  var MEDS=[
    ['MED_IRON_SUCROSE','Iron Sucrose','Venofer','Medication','IV','Infusion','Short Infusion',60,0,'Yes',10,'No','No','Yes'],
    ['MED_FERINJECT','Ferric Carboxymaltose','Ferinject','Medication','IV','Infusion','Short Infusion',45,0,'Yes',10,'No','No','Yes'],
    ['MED_IVIG','IVIG','Immunoglobulin','Medication','IV','IVIG Infusion','Long Infusion',240,0,'No',2,'No','No','Yes'],
    ['MED_DESFERAL','Deferoxamine','Desferal','Medication','IV/SubQ','Infusion','Long Infusion',240,0,'No',2,'No','No','Yes'],
    ['MED_ABATACEPT','Abatacept','Orencia','Medication','IV/SubQ','Infusion','Short Infusion',60,0,'No','','No','No','Yes'],
    ['MED_ADALIMUMAB','Adalimumab','Humira','Medication','SubQ','Infusion','Non-Infusion',30,0,'No','','No','No','Yes'],
    ['MED_ALEMTUZUMAB','Alemtuzumab','Lemtrada','Medication','IV','Infusion','Long Infusion',240,0,'No','','Yes','No','Yes'],
    ['MED_BELIMUMAB','Belimumab','Benlysta','Medication','IV/SubQ','Infusion','Short Infusion',60,0,'No','','No','No','Yes'],
    ['MED_CYCLOPHOSPHAMIDE','Cyclophosphamide','Endoxan','Medication','IV','Infusion','Variable',180,0,'No','','No','No','Yes'],
    ['MED_DUPILUMAB','Dupilumab','Dupixent','Medication','SubQ','Infusion','Non-Infusion',30,0,'No','','No','No','Yes'],
    ['MED_ETANERCEPT','Etanercept','Erelzi','Medication','SubQ','Infusion','Non-Infusion',30,0,'No','','No','No','Yes'],
    ['MED_EVOLOCUMAB','Evolocumab','Repatha','Medication','SubQ','Infusion','Non-Infusion',30,0,'No','','No','No','Yes'],
    ['MED_FINGOLIMOD','Fingolimod','Gilenya','Medication','Oral','Infusion','Long Stay but Non-Infusion',360,0,'No','','No','No','Yes'],
    ['MED_INFLIXIMAB','Infliximab','Remsima / Remicade / Inflectra','Medication','IV','Infusion','Long Infusion',180,0,'No','','No','No','Yes'],
    ['MED_LUSPATERCEPT','Luspatercept','Reblozyl','Medication','SubQ','Infusion','Non-Infusion',30,0,'No','','No','No','Yes'],
    ['MED_MEPOLIZUMAB','Mepolizumab','Nucala','Medication','SubQ','Infusion','Non-Infusion',30,0,'No','','No','No','Yes'],
    ['MED_NATALIZUMAB','Natalizumab','Tysabri','Medication','IV','Infusion','Short Infusion',90,0,'No','','No','No','Yes'],
    ['MED_OCRELIZUMAB','Ocrelizumab','Ocrevus','Medication','IV','Infusion','Long Infusion',240,0,'No','','No','No','Yes'],
    ['MED_OMALIZUMAB','Omalizumab','Xolair','Medication','SubQ','Infusion','Variable',60,0,'No','','No','No','Yes'],
    ['MED_RAVULIZUMAB','Ravulizumab','Ultomiris','Medication','IV','Infusion','Variable',180,0,'No','','No','No','Yes'],
    ['MED_RISANKIZUMAB','Risankizumab','Skyrizi','Medication','IV/SubQ','Infusion','Short Infusion',60,0,'No','','No','No','Yes'],
    ['MED_RITUXIMAB','Rituximab','Truxima / MabThera / Rituxan','Medication','IV','Infusion','Long Infusion',240,0,'No','','No','No','Yes'],
    ['MED_TOCILIZUMAB','Tocilizumab','Actemra','Medication','IV/SubQ','Infusion','Short Infusion',60,0,'No','','No','No','Yes'],
    ['MED_USTEKINUMAB','Ustekinumab','Stelara','Medication','IV/SubQ','Infusion','Short Infusion',60,0,'No','','No','No','Yes'],
    ['MED_VEDOLIZUMAB','Vedolizumab','Entyvio','Medication','IV','Infusion','Short Infusion',60,0,'No','','No','No','Yes'],
    ['MED_ZOLEDRONIC','Zoledronic Acid','Aclasta / Zodric','Medication','IV','Infusion','Short Infusion',60,0,'No','','No','No','Yes'],
    ['MED_ESKETAMINE','Esketamine','Spravato','Medication','Nasal','Infusion','Long Stay but Non-Infusion',120,0,'No','','No','No','Yes'],
    ['PROC_BLOOD','Blood Transfusion','','Blood Product','IV','Blood Transfusion','Variable',240,0,'No',2,'No','Yes','Yes'],
    ['PROC_PARACENTESIS','Paracentesis','','Procedure','Procedure','Other Procedure','Procedure',90,0,'No','','No','Yes','Yes'],
    ['PROC_OTHER_APPROVED','Other approved procedure','','Procedure','Procedure','Other Procedure','Procedure',60,0,'No','','No','No','Yes']
  ];
  return {TZ:TZ,MIN_DATE:MIN_DATE,MAX_DATE:MAX_DATE,SCHEMA_VERSION:SCHEMA_VERSION,ROLES:ROLES,BOOKING_ACTIVE:BOOKING_ACTIVE,BOOKING_OFFICIAL:BOOKING_OFFICIAL,ARRIVAL_STATUS:ARRIVAL_STATUS,REQUEST_STATUS:REQUEST_STATUS,TREATMENT_STATUS:TREATMENT_STATUS,READINESS:READINESS,SPECIALTIES:SPECIALTIES,MEDS:MEDS};
})();
