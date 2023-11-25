function ImportStudioData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var new_sheet1 = ss.getSheetByName("Qanvast_LeadsData");                 // Sheet 1 where data is to be pasted
  var new_sheet2 = ss.getSheetByName("Qanvast_RepeatLeadsData");           // Sheet 2 where data is to be pasted
  var data_sheet = SpreadsheetApp.openById("date-sheeet-Q3YireAU").getSheetByName("Sheet1"); // Data sheet
  
  var full_data  = data_sheet.getRange("A1:AF").getValues();               // Data range
  
  var lastRow1 = Last_Row(new_sheet1, "A1:A")                              // Enter the sheet Name and Column for last row
  var lastRow2 = Last_Row(new_sheet2, "A1:A")                              // Enter the sheet Name and Column for last row

  var phonenum1 = OneDimentionalArray(new_sheet1)                          // Checking for existing PhoneNumbers in sheet1
  var phonenum2 = OneDimentionalArray(new_sheet2)                          // Checking for existing PhoneNumbers in sheet1

  var newDate = new_sheet1.getRange("G5").getValue();                      // Taking inputs from Gsheet
  newDate.setDate(newDate.getDate() - 7)
  Logger.log(newDate)
  var studio = new_sheet1.getRange("H5").getValue();                       // Taking inputs from Gsheet

  var col = [2,4,8,10,11,13];                                              // Enter the columns you want to copy

  // For 1st Allocation
  var new_data1 = [];  
  for (var i= 0; i<full_data.length;i++){
    var value = [];
    if(full_data[i][13] >= newDate && (full_data[i][14] == studio || full_data[i][15] == studio  || 
    full_data[i][16] == studio || full_data[i][17] == studio  || full_data[i][18] == studio ))
    {
      for (var k in col) {
        var l = col[k] - 1;
        if (phonenum1.indexOf(full_data[i][3]) == -1){
          value.push(full_data[i][l])  
        }
      }
    }
   if (value.length > 0){
     new_data1.push(value)
   }
  }
  if (new_data1.length > 0){
    
    new_sheet1.getRange(lastRow1+1,1,new_data1.length,new_data1[0].length).setValues(new_data1)
    Logger.log(new_data1.length + " Fresh Leads updated")
  }
  else{
    Logger.log("No New records for Fresh Allocated Leads")
  }
  
  

  // For Re-Allocation 
  var new_data2 = [];
  for (var i= 0; i<full_data.length;i++){
    var value = [];
    if(full_data[i][24] >= newDate && (full_data[i][25] == studio || full_data[i][26] == studio  || 
    full_data[i][27] == studio || full_data[i][28] == studio  || full_data[i][29] == studio ))
    {
      for (var k in col) {
        var l = col[k] - 1;
        if (phonenum2.indexOf(full_data[i][3]) == -1){
          value.push(full_data[i][l])  
        }
      }
    }
   if (value.length > 0){
     new_data2.push(value)
   }
  }
  if (new_data2.length > 0){
    
    new_sheet2.getRange(lastRow2+1,1,new_data2.length,new_data2[0].length).setValues(new_data2)
    Logger.log(new_data2.length + " Re-Allocated Leads updated")
  }



function Last_Row(sheet, range) {
  var lrow = sheet.getLastRow();
  var last_row = sheet.getRange(range+lrow).getValues();             
  var last_row = lrow - last_row.reverse().findIndex(c=>c[0]!='');
  return last_row
}

function OneDimentionalArray(sheet_name){
  var phone  = sheet_name.getRange(7,2,Last_Row(sheet_name, "B1:B"),1).getValues();                 
  var phonenum = []
  for (var i= 0; i<phone.length; i++){
    phonenum.push(phone[i][0])
  }
  return phonenum
}




  else {
    Logger.log("No New records for Re-Allocated Leads")
  }
    
}
