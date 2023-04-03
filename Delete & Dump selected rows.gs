function delete_dump_data() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data_sheet = ss.getSheetByName("Sheet1");    // Sheet from where rows needed to be deleted
  var rows = data_sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  
  var dump_sheet = ss.getSheetByName("Projects")    // Sheet where seleted rows will be pasted
  var l_row = dump_sheet.getLastRow();
  var last_row = dump_sheet.getRange("A1:A"+l_row).getValues();         // Getting last row
  var last_row = l_row - last_row.reverse().findIndex(c=>c[0]!='');

  var rowsDeleted = 0;
  var deleted_data = []
  for (var i = 0; i <= numRows - 1; i++) {
    var column = values[i];
    if (column[9] == 'No' || column[9] == 'no') {  // This searches all cells in columns J, change the column[9] for different column 
      deleted_data.push(values[i])
      data_sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
      rowsDeleted = rowsDeleted +1;
    }
  }

  if (deleted_data.length !== 0){
    dump_sheet.getRange(last_row+1,1,deleted_data.length,deleted_data[0].length).setValues(deleted_data)
  }

};
