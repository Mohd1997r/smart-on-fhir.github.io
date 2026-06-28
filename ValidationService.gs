function validateDateInRange_(date){if(!DcuLogic.inRange(date)) throw appError_('DATE_OUT_OF_RANGE','Date must be in 2026 or 2027.');}
function validateOverride_(suggested,finalDate,reason){if(finalDate && suggested && finalDate!==suggested && !sanitizeText_(reason)) throw appError_('OVERRIDE_REASON_REQUIRED','Date override reason is required.');}
function validateScheduleSelection_(medicationId,scheduleId){if(!scheduleId) return null; var res=DcuLogic.validateSchedule(medicationId,scheduleId,readTable_('Treatment Schedules').rows); if(!res.ok) throw appError_(res.code,'Invalid treatment schedule.'); return res;}
function validateReadinessServer_(row){var r=DcuLogic.validateReadiness(row); if(!r.ok) throw appError_(r.code,'Treatment readiness is incomplete.'); return r;}
