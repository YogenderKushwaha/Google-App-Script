function filtered_data() {

  var new_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");                          // Sheet where data is to be pasted
  var data_sheet = SpreadsheetApp.openById("vcv9Rmrfhgjdgfdgf76576vvg").getSheetByName("data_sheet");      // Data sheet
  new_sheet.getRange("A2:J").clear()

  var full_data  = data_sheet.getRange("A1:AH").getValues();
  var new_data = [];
  var col = [1,2,3,4,6,11,13,33];                                                // Enter the columns you want to copy
  
  for (var i= 0; i<full_data.length;i++){

    var value = [];
      if(full_data[i][10] == "Yes" || full_data[i][10] == "Column Name" ){       // Filtering Column & Filter values. for column K = [i][10] 
      for (var k in col) {
        var l = col[k] - 1;
        value.push(full_data[i][l])
      }
     }
   if (value.length > 0){
     new_data.push(value)
   }
  }

  new_sheet.getRange(1,1,new_data.length,new_data[0].length).setValues(new_data)

}
