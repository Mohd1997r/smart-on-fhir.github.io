function now_(){return Utilities.formatDate(new Date(),DCU.TZ,"yyyy-MM-dd'T'HH:mm:ssXXX");}
function uuid_(prefix){return (prefix||'ID')+'-'+Utilities.getUuid();}
function getSpreadsheetId_(){var id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'); if(!id) throw appError_('SETUP_REQUIRED','Spreadsheet ID is not configured.'); return id;}
function getSpreadsheet_(){return SpreadsheetApp.openById(getSpreadsheetId_());}
function appError_(code,msg){var e=new Error(msg||code); e.code=code; return e;}
function sanitizeText_(v){return String(v==null?'':v).replace(/[<>]/g,'').trim();}
function normalizeMrn_(v){var s=sanitizeText_(v); if(!s) throw appError_('MRN_REQUIRED','MRN is required.'); return s;}
function getSystemMode_(){try{return readConfig_('SYSTEM_MODE')||'SETUP';}catch(e){return 'SETUP';}}
function readConfig_(key){var rows=readTable_('System Config').rows; var r=rows.filter(function(x){return x.ConfigKey===key;})[0]; return r&&r.ConfigValue;}
