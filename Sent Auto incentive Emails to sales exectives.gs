function AutoEmail_Designers() {

  var id_data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IDs Payout");
  var lr = Last_Row(id_data,"A1:A")
  var today_date = Utilities.formatDate(new Date(), "GMT+5:30","MM-dd-yyyy' 'HH:mm")

  var start_date = id_data.getRange("I1").getValue()
  var start_date = new Date(start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short',year: 'numeric' });
  var end_date = id_data.getRange("J1").getValue()
  var end_date = new Date(end_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short',year: 'numeric' });


  for(var x=4; x<=lr; x++){
    var flag = id_data.getRange("AF" + x).getValue()
    var designer_email = id_data.getRange("C" + x).getValue()

    
    if(flag == 1 && designer_email !== ""){

      var reporting_manager_email = id_data.getRange("I" + x).getValue()
      var emp_id = id_data.getRange("A"+x).getValue()

      var target_booking = id_data.getRange("K"+x).getValue()
      var actual_booking = id_data.getRange("L" + x).getValue()
      

      var target_cgmv = id_data.getRange("N"+x).getValue()
      var actual_cgmv = id_data.getRange("O" + x).getValue()
      var actual_cgmv = actual_cgmv.toFixed(2)

      var booking_weightage = id_data.getRange("U" + x).getValue()
      var booking_weightage = (booking_weightage*100).toFixed(0) + "%"

      var cgmv_weightage = id_data.getRange("V" + x).getValue()
      var cgmv_weightage = (cgmv_weightage*100).toFixed(0) + "%"

      var overall_achieved = id_data.getRange("X"+x).getValue()
      var overall_achieved = (overall_achieved *100).toFixed(0) + "%"

      var incentive_eligibility = id_data.getRange("Y"+x).getValue()

     

      var final_incentive_amount = id_data.getRange("AD" + x).getValue()
      if (final_incentive_amount == ""){
        final_incentive_amount = 0
      } else{
        final_incentive_amount = final_incentive_amount.toFixed(2)
      }


      var booking_pids = Fetch_PIDs(designer_email)[1]
      var cgmv_pids = Fetch_PIDs(designer_email)[0]

      if (incentive_eligibility == "Yes"){

        var emailTemp = HtmlService.createTemplateFromFile("Auto Email Body- Green");
    
        emailTemp.designer_name = designer_name;
        emailTemp.emp_id = emp_id;

        emailTemp.start_date = start_date;
        emailTemp.end_date = end_date;

        emailTemp.target_booking = target_booking;
        emailTemp.actual_booking = actual_booking;

        emailTemp.target_cgmv = target_cgmv;
        emailTemp.actual_cgmv = actual_cgmv;

        emailTemp.booking_weightage = booking_weightage;
        emailTemp.cgmv_weightage = cgmv_weightage;
        
        emailTemp.overall_achieved = overall_achieved;
        emailTemp.incentive_eligibility = incentive_eligibility;

        emailTemp.final_incentive_amount = final_incentive_amount;
        emailTemp.booking_pids = booking_pids;
        emailTemp.cgmv_pids = cgmv_pids;

        var htmlMessage = emailTemp.evaluate().getContent();

        if (reporting_manager_email !== ""){
          var cc= reporting_manager_email + "," + "xyz@gmail.com"
        }
        else {
          var cc = "xyz@gmail.com"
        }

        GmailApp.sendEmail(
        designer_email,
        "Quarterly incentive for JAS'23",
        "only html",
        {htmlBody: htmlMessage, cc: cc, name: 'Incentive Payout KSA'});

        id_data.getRange("AG" + x).setValue(today_date);
        Logger.log("Email sent to " + designer_email)
      }
      else{
        var emailTemp = HtmlService.createTemplateFromFile("Auto Email Body- Red");
    
        emailTemp.designer_name = designer_name;
        emailTemp.emp_id = emp_id;

        emailTemp.start_date = start_date;
        emailTemp.end_date = end_date;

        emailTemp.target_booking = target_booking;
        emailTemp.actual_booking = actual_booking;

        emailTemp.target_cgmv = target_cgmv;
        emailTemp.actual_cgmv = actual_cgmv;

        emailTemp.booking_weightage = booking_weightage;
        emailTemp.cgmv_weightage = cgmv_weightage;

        
        emailTemp.overall_achieved = overall_achieved;
        emailTemp.incentive_eligibility = incentive_eligibility;

        emailTemp.final_incentive_amount = final_incentive_amount;
        emailTemp.booking_pids = booking_pids;
        emailTemp.cgmv_pids = cgmv_pids;

        var htmlMessage = emailTemp.evaluate().getContent();

        if (reporting_manager_email !== ""){
          var cc= reporting_manager_email + "," + "xyz@gmail.com"
        }
        else {
          var cc = "xyz@gmail.com"
        }

        GmailApp.sendEmail(
        designer_email,
        "Quarterly incentive for JAS'23",
        "only html",
        {htmlBody: htmlMessage, cc: cc, name: 'Incentive Payout KSA'});

        id_data.getRange("AG" + x).setValue(today_date);
        Logger.log("Email sent to " + designer_email)
      }
      
    }
  }
}

# Utils functions

function Last_Row(sheet, range) {
  var lrow = sheet.getLastRow();
  var last_row = sheet.getRange(range+lrow).getValues();             
  var last_row = lrow - last_row.reverse().findIndex(c=>c[0]!='');
  return last_row
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}



function Fetch_PIDs(designer_name) {

  var cgmv_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CGMV Dump");      // Data sheet
  var basedata_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Base Data");      // Data sheet
  var meta_data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IDs Payout");
  
  const start_date = meta_data.getRange("I1").getValue()
  const end_date = meta_data.getRange("J1").getValue()

  var full_cgmv_data  = cgmv_sheet.getRange("A1:L").getValues();
  var cgmv_data = [];

  var designer_name = designer_name.toLowerCase()
  
  for (var i= 0; i<full_cgmv_data.length;i++){

    if( full_cgmv_data[i][11].toString().toLowerCase().includes(designer_name) && full_cgmv_data[i][1] >= start_date &&
     full_cgmv_data[i][1] <= end_date && cgmv_data.indexOf(full_cgmv_data[i][0]) == -1){    
      cgmv_data.push(full_cgmv_data[i][0])
    }  
  }

  var base_data = [];
  var full_base_data  = basedata_sheet.getRange("A1:G").getValues();
  
  for (var i= 0; i<full_base_data.length;i++){

    if( full_base_data[i][5].toString().toLowerCase().includes(designer_name) && full_base_data[i][2] >= start_date && full_base_data[i][2] <= end_date && 
    base_data.indexOf(full_base_data[i][0]) == -1){    
      base_data.push(full_base_data[i][0])
    }  
  }
  return [cgmv_data, base_data]

}
