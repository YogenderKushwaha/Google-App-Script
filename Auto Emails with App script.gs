function SendAutoEmail_recovery_cx1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getSheetByName("projects");
  var srow = sheet.getLastRow();
  var lr = sheet.getRange("A1:A"+srow).getValues();
  var lr = srow - lr.reverse().findIndex(c=>c[0]!='');

  var dump_sheet = ss.getSheetByName("Email Dump");
  var drow = dump_sheet.getLastRow();
  var d_lr = sheet.getRange("A1:A"+drow).getValues();
  var d_lr = drow - d_lr.reverse().findIndex(c=>c[0]!='');

  var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  var today_date = new Date(new Date().getTime() + 4 * MILLIS_PER_DAY);
  var payment_due_date =Utilities.formatDate(today_date, "GMT+5:30", "MM/dd/yyyy")
  var today_date_time = Utilities.formatDate(new Date(), "GMT+5:30","MM-dd-yyyy' 'HH:mm")
  var data = [];

  for(var x=2; x<=lr; x++){
    var val = []

    var k = sheet.getRange("N" + x).getValue();
    var cx_email = sheet.getRange("J" + x).getValue();
    var bm_email= sheet.getRange("L" + x).getValue();
    var p_designer_email = sheet.getRange("K" + x).getValue();
    
    if(k == "Yes"){

    var emailTemp = HtmlService.createTemplateFromFile("Auto Email Body");

    if(cx_email !=="") {
    
      var pid = sheet.getRange("A" + x).getValue();
      var co = sheet.getRange("E" + x).getValue();
      var current_order_value = co.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      var ca = sheet.getRange("F" + x).getValue();
      var current_amount_due = ca.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      var total_paid_so_far = sheet.getRange("G" + x).getValue().toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      var cx_name = sheet.getRange("I" + x).getValue();
      var agm_email = sheet.getRange("M" + x).getValue();
      
      emailTemp.pid = pid;
      emailTemp.current_order_value = current_order_value;
      emailTemp.current_amount_due = current_amount_due;
      emailTemp.total_paid_so_far = total_paid_so_far;
      emailTemp.cx_name = cx_name;
      emailTemp.agm_email = agm_email;
      emailTemp.bm_email = bm_email;
      emailTemp.payment_due_date = payment_due_date;
      emailTemp.cx_email = cx_email;
      emailTemp.p_designer_email = p_designer_email;
      

      var htmlMessage = emailTemp.evaluate().getContent();
      var cc="";
      if(p_designer_email!="")
      {cc=p_designer_email+",";}
      if(bm_email!="")
      {
        if(s_designer_email="")
        {cc=cc+bm_email+",";}
        else
        cc=cc+bm_email+",";
        
        }
      if(agm_email!="")
      {
        if(bm_email="")
        {cc=cc+agm_email+",";}
        else
        cc=cc+agm_email+",";}
      if(cc == "")
      {
        cc="ykushwaha20@gmail.com";
      }
      GmailApp.sendEmail(
      cx_email,
      "Payment Reminder: Project ID- " + pid + " , Amount Due- " + current_amount_due + " SGD",
      "only html",
      {htmlBody: htmlMessage, cc: cc, name: 'Yogender Kushwaha'});

      sheet.getRange("O" + x).setValue(today_date_time);
      sheet.getRange("H" + x).setValue(payment_due_date);
      val.push(pid)
      val.push(today_date_time)
      val.push(cx_email)
      val.push("Recovery Cx 1")
      val.push(current_order_value)
      val.push(current_amount_due)
      val.push(total_paid_so_far)
      val.push(cc)
      val.push(payment_due_date)
      
      
    } 
    else {
      sheet.getRange("O" + x).setValue("No Email ID");
    }; 
  }
  if (val.length > 0){
    data.push(val)
    } 
  }
  if(data.length > 0){
    dump_sheet.getRange(d_lr + 1,1,data.length,data[0].length).setValues(data)
  }
  
};
