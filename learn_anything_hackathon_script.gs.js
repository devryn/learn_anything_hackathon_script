/*
* Small script to automatically send emails and slack messages to all Radicals per selection in marking matrix
* Created by Ben Collins 4/13/16
* Source here https://www.benlcollins.com/spreadsheets/marking-template/
*/

function sendBudget() {
  // select the range from the Summary sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Budget by Radical");
  var lastRow = sheet.getLastRow();

  var range = sheet.getRange(1,1,lastRow-3,12).getValues();
  //Logger.log(range.length);

  // create timestamp to mark when communication was sent
  var timestamp = new Date();

  // loop over range and send communication if "Yes" option chosen
  for (var i = 0; i < range.length; i++) {
    if (range[i][10] == "Yes") {

      // choose email, slack or both channels
      switch (range[i][11]) {
        case "Email":
          // send email to Radical by calling sendEmail function
          sendEmail(range[i]);
          break;

        case "Slack":
          // post message to slack
          sendToSlack(range[i]);
          break;

        case "Both":
          // send email and post to Slack
          sendEmail(range[i]);
          sendToSlack(range[i]);
          break;
      }
    };
  }
}

// function to create and send emails
function sendEmail(sheet) {

  MailApp.sendEmail({
     to: sheet[4],
     subject: "Learn Anything Budget Update",
     htmlBody:
      "Hi " + sheet[0] +",<br><br>" +
      "Here is the status of your learn anything budget. Be sure to use it by the end of the year or it goes away!<br><br>" +
      "<table  border='1'><tr><td><b>Money Spent</b></td>" +
      "<td><b>Remaining Budget</b></td>" +
      "<tr><td>" + "$" + Math.round(sheet[8]) + "</td>" +
      "<td>" + "$" + Math.round(sheet[9]) +"</td></tr></table>"
   });
}



// function to send message to Slack
function sendToSlack(sheet) {
  var timestamp = new Date();

  var url = "https://hooks.slack.com/services/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";

  var payload = {
    "channel": "@"+ sheet[5],
    "username": "emily",
    "text": "Hi " + sheet[0] +
      "\n Here is the status of your learn anything budget. Let ToC know if you have any questions! \n" +
      "\n Money Spent: " + "$" + Math.round(sheet[8]) +
      "\n Remaining Budget: " + "$" + Math.round(sheet[9]),
    "icon_emoji": ":party_parrot:"
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  return UrlFetchApp.fetch(url,options);
}
