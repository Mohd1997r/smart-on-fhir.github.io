var SheetRepository=(function(){
function ss_(){var id=PropertiesService.getScriptProperties().getProperty('DCU_SPREADSHEET_ID'); if(!id) throw new Error('CONFIG_SPREADSHEET_ID_MISSING'); return SpreadsheetApp.openById(id);} 
function sheet_(name){var sh=ss_().getSheetByName(name); if(!sh) throw new Error('SHEET_MISSING_'+name); return sh;}
function headers(name){var sh=sheet_(name), last=Math.max(sh.getLastColumn(),1); return sh.getRange(1,1,1,last).getValues()[0].filter(String);} 
function readTable(name){var sh=sheet_(name), h=headers(name), last=sh.getLastRow(); if(last<2)return []; var vals=sh.getRange(2,1,last-1,h.length).getDisplayValues(); var out=[]; vals.forEach(function(r,i){ if(r.join('')==='')return; var o={sheetRowNumber:i+2}; h.forEach(function(k,j){o[k]=r[j];}); out.push(o);}); return out;}
function appendRow(name,obj){var sh=sheet_(name), h=headers(name); sh.appendRow(h.map(function(k){return obj[k]===undefined?'':obj[k];})); return sh.getLastRow();}
function updateRow(name,rowNumber,patch){var sh=sheet_(name), h=headers(name), row=sh.getRange(rowNumber,1,1,h.length).getValues()[0]; h.forEach(function(k,i){if(Object.prototype.hasOwnProperty.call(patch,k)) row[i]=patch[k];}); sh.getRange(rowNumber,1,1,h.length).setValues([row]);}
function ensureSheet(name,h){var ss=ss_(), sh=ss.getSheetByName(name)||ss.insertSheet(name); var ex=sh.getLastColumn()?sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].filter(String):[]; var merged=ex.slice(); h.forEach(function(x){if(merged.indexOf(x)<0)merged.push(x);}); sh.getRange(1,1,1,merged.length).setValues([merged]).setFontWeight('bold'); sh.setFrozenRows(1); return sh;}
return {readTable:readTable,appendRow:appendRow,updateRow:updateRow,ensureSheet:ensureSheet,headers:headers,ss:ss_};})();
