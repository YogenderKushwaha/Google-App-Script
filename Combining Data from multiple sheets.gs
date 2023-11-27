
function Update_Studio_Data(){
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet_id_data = ss.getSheetByName('Gsheet IDs')
  var all_data_dump = ss.getSheetByName('Combined_Data')

  all_data_dump.getRange("A2:N").clear()

  var sheet_ids = OneDimentionalArray(sheet_id_data)

  sheet_id_data.getRange("C2:C").clear()

  for (var i in sheet_ids){
    ImportAllData(sheet_ids[i],i)
  }
  sheet_id_data.getRange("E1").setValue(new Date())
}


function ImportAllData(sheet_id,count) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var new_sheet = ss.getSheetByName("Combined_Data");                                            // New Sheet where data is to be pasted 
  var data_sheet = SpreadsheetApp.openById(sheet_id);                                           // Data sheet
  var data_sheet1 = data_sheet.getSheetByName("Qanvast_LeadsData");
  var data_sheet2 = data_sheet.getSheetByName("Qanvast_RepeatLeadsData");
  var sheet_id_dump = ss.getSheetByName('Gsheet IDs')

  var studio = data_sheet1.getRange("H5").getValue();                       
   
  var count = Number(count) + 1;

  var lastRow = Last_Row(new_sheet, "A1:A")                                                      // Enter the sheet Name and Column for last row
  var lastRow_ds1 = Last_Row(data_sheet1, "A1:A")
  var lastRow_ds2 = Last_Row(data_sheet2, "A1:A")

  var full_data1  = data_sheet1.getRange(7,1,lastRow_ds1,14).getValues();                      // Data range
  var full_data2  = data_sheet2.getRange(7,1,lastRow_ds2,14).getValues();                      // Data range

  var col = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];                                              // Enter the columns you want to copy


  // For 1st Tab
  var new_data1 = [];  
  for (var i= 0; i<full_data1.length;i++){
    var value = [];
    for (var k in col) {
      var l = col[k] - 1;
      value.push(full_data1[i][l])  
    }
    if (value.length > 0){
     new_data1.push(value)
    }
  }
  if (new_data1.length > 0){
    new_sheet.getRange(lastRow+1,1,new_data1.length,new_data1[0].length).setValues(new_data1)
  }

  // For 2nd Tab

  var lastRow = Last_Row(new_sheet, "A1:A")

  var new_data2 = [];  
  for (var i= 0; i<full_data2.length;i++){
    var value = [];
    for (var k in col) {
      var l = col[k] - 1;
      value.push(full_data2[i][l])  
    }
    if (value.length > 0){
     new_data2.push(value)
    }
  }
  if (new_data2.length > 0){
    Logger.log(count + ". " + studio + " -----------------------> Done")
    new_sheet.getRange(lastRow+1,1,new_data2.length,new_data2[0].length).setValues(new_data2)
    sheet_id_dump.getRange("C" + (count+1)).setValue("Done")
  }
    
}

function onOpen(){
  SpreadsheetApp.getUi()
    .createMenu("Update Data")
    .addItem("Run", "Update_Studio_Data")
    .addToUi()
}



function Last_Row(sheet, range) {
  var lrow = sheet.getLastRow();
  var last_row = sheet.getRange(range+lrow).getValues();             
  var last_row = lrow - last_row.reverse().findIndex(c=>c[0]!='');
  return last_row
}


function OneDimentionalArray(sheet_name){
  var phone  = sheet_name.getRange(2,2,Last_Row(sheet_name, "B1:B")-1,1).getValues();                 
  var onedarray = []
  for (var i= 0; i<phone.length; i++){
    onedarray.push(phone[i][0])
  }
  return onedarray
}
