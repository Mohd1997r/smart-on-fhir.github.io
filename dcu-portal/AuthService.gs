var AuthService=(function(){
function email_(){return Session.getActiveUser().getEmail()||Session.getEffectiveUser().getEmail()||'';}
function currentUser(){var email=email_().toLowerCase(); if(!email) throw new Error('ACCESS_DENIED_NO_EMAIL'); var rows=SheetRepository.readTable(DCU.SHEETS.USERS); var u=rows.filter(function(r){return String(r.Email).toLowerCase()===email && r.IsActive==='Yes';})[0]; if(!u) throw new Error('ACCESS_DENIED_USER_NOT_ACTIVE'); return {email:email,role:u.Role,specialties:String(u.Specialties||'').split(',').map(function(s){return s.trim();}).filter(String),canViewMrn:u.CanViewMRN==='Yes',canViewMobile:u.CanViewMobile==='Yes'};}
function requireRole(roles){var u=currentUser(); if(roles.indexOf(u.role)<0) throw new Error('ACCESS_DENIED_ROLE'); return u;}
function canSeeSpecialty(u,s){return u.role!=='Doctor'||u.specialties.indexOf(s)>=0;}
function filterRowsByUser(rows,u){return rows.filter(function(r){return canSeeSpecialty(u,r.Specialty);}).map(function(r){var c=Object.assign({},r); if(u.role==='Doctor'){delete c.MobileNumber; delete c.MobileNo; delete c.Notes; delete c.OtherNotes;} if(!u.canViewMobile){delete c.MobileNumber; delete c.MobileNo;} if(!u.canViewMrn){delete c.MRN;} return c;});}
return {currentUser:currentUser,requireRole:requireRole,canSeeSpecialty:canSeeSpecialty,filterRowsByUser:filterRowsByUser};})();
