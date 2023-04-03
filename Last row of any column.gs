  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1");

  var lrow = sheet.getLastRow();
  var last_row = sheet.getRange("A1:A"+lrow).getValues();                // it is for column A.  
  var last_row = srow1 - last_row.reverse().findIndex(c=>c[0]!='');
