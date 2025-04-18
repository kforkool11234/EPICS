import dotenv from "dotenv";
// Uses jQuery library
var accountKey = process.env.acoount;
var destinationNumber = process.env.rnum;

var postUrl = "https://secure.smsgateway.ca/services/message.svc/" + accountKey + "/" + destinationNumber;

var body = JSON.stringify({
    MessageBody: "Message Body"
});

$.ajax({
    url: postUrl,
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    data: body
}).done(function(response) {
    alert(response);
}).fail(function(xhr, textStatus, errorThrown) {
    alert(xhr.responseText);
});