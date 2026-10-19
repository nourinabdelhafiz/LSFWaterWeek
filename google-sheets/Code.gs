/** Google Apps Script — bound to your destination Google Sheet. **/
const SHEET_NAME = 'Contacts';
const HEADERS = ['Submitted At', 'Full Name', 'Country', 'WhatsApp', 'Company', 'Email'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const p = (e && e.parameter) || {};
    if (p.companyWebsite) return response_('Rejected');
    const name = clean_(p.fullName, 120), country = clean_(p.country, 120);
    const phone = clean_(p.whatsapp, 20), company = clean_(p.company, 150);
    const email = clean_(p.email, 254);
    if (p.consent !== 'yes' || name.length < 2 || !country || !/^\+[0-9]{7,15}$/.test(phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
      return response_('Invalid data');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error('Script must be created from inside a Google Sheet');
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    // Prevent submitted formulas from being interpreted as spreadsheet formulas.
    const row = [new Date(),name,country,phone,company,email].map((v,i) => i===0 ? v : safeCell_(v));
    sheet.appendRow(row);
    return response_('OK');
  } catch(err) {
    console.error(err);
    return response_('Error');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
function clean_(value,max) { return String(value || '').trim().slice(0,max); }
function safeCell_(value) {return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;}
function response_(text) {return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);}
function testConnection() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error(
      "No spreadsheet connected to this Apps Script!"
    );
  }

  let sheet = ss.getSheetByName("Contacts");

  if (!sheet) {
    sheet = ss.insertSheet("Contacts");
  }

  sheet.appendRow([
    new Date(),
    "TEST USER",
    "Egypt",
    "+201000000000",
    "LSF",
    "test@example.com"
  ]);

  Logger.log("Success! Test row added.");
}
