function all_tabs(){

  var sheetId = 'G-Sheet-ID-1234abcde';                                         // G-Sheet ID 
  var workId = [572785752,1993276896,1640242121,520532217,1008499177,1312808976,861012325,1515498137];  // Tab-ID or Worksheet ID you want to skip.

  var spreadsheet = SpreadsheetApp.openById(sheetId);
  var sheets = spreadsheet.getSheets();
  var sheet;
  
  for (var i = 0; i < sheets.length; i++) {
    if (workId.indexOf(sheets[i].getSheetId()) === -1) {                       // === -1 for skipping the tabs in the workID, use !== -1 for including
      sheet = sheets[i];
      spreadsheet.setActiveSheet(sheet);
      delete_records(sheet);                                                   // Calling delete function
    }
  }
}

function delete_records(sheet){                                               // Function to perform any operation. here I want to delete records

  var rows = sheet.getDataRange(); 
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  
  var rowsDeleted = 0;                                               
  for (var i = 0; i <= numRows - 1; i++) {                   
    var column = values[i];
    if (column[14] == 'Exited' && column[5] == 0) {                         // Condition to delete the records. [ 14 = Column O, 5 = Column F] 
      Logger.log(column[0])                                                      
      sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
      rowsDeleted = rowsDeleted +1;
    }
  }
};
