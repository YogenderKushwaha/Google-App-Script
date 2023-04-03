function import_all_data() {


  let selectedColumns1 = [2,28];
  
  let ss1 = SpreadsheetApp.openById("source-sheet-id-jsadsjdsfakjbjdb4jknr"); //SPREADSHEET TO COPY FROM  
  let sheet1 = ss1.getSheetByName("ABC"); //SHEET (TAB) TO COPY FROM  
  let ssThis1 = SpreadsheetApp.getActiveSpreadsheet();
  let sheetRawData1 = ssThis1.getSheetByName("Cash Dump"); //SHEET IN THE TARGET SPREADSHEET TO COPY TO
  sheetRawData1.getRange("A2:B").clear()
  
  selectedColumns1.forEach(function(column,i ){
    let data1 = sheet1.getRange(1,column, sheet1.getLastRow(),1).getValues();
    sheetRawData1.getRange(1,1+i, sheet1.getLastRow(), 1).setValues(data1);    
  })
}
