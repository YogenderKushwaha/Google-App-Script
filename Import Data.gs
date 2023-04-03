function importdata() {

 var start_time = new Date(new Date().getTime());

// Sheet1 - Clean Up PJT 
  importRange(
   "source-gsheet-id-asdasbcjsajkaduenda", 
   "abc!B:F", 
   "destination-gsheet-id-asdasbcjsajkaduenda",
   "xyz!A1" 
 );

  var end_time = new Date(new Date().getTime());
  var time_taken = (end_time - start_time)/(1000*60);
  Logger.log("Execution Time: " +time_taken.toFixed(2) + " Minutes")

};
 
function importRange(sourceID, sourceRange, destinationID, destinationRangeStart){
 
  
  const sourceSS = SpreadsheetApp.openById(sourceID);
  const sourceRng = sourceSS.getRange(sourceRange);
  const sourceVals = sourceRng.getValues();
 
  
  const destinationSS = SpreadsheetApp.openById(destinationID);
  const destStartRange = destinationSS.getRange(destinationRangeStart);
  const destSheet = destStartRange.getSheet();
 
  
  // destSheet.clear();
 
  
  const destRange = destSheet.getRange(
      destStartRange.getRow(),
      destStartRange.getColumn(),
      sourceVals.length,
      sourceVals[0].length
    );
  
  
  destRange.setValues(sourceVals);


  SpreadsheetApp.flush();
};
