'use strict';
console.log('Loading function');
const AWS = require('aws-sdk');
const sesClient = new AWS.SES();
const sesReplyAddress = "<ReplaceWithTheReplyAddressYouWantInTheEmail>";

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null)); //,# with added objects
    var emailObj = JSON.parse(event.body);
    var params = getEmailMessage(emailObj);
    var sendEmailPromise = sesClient.sendEmail(params).promise();

    var response = {
        statusCode: 200
    };

    sendEmailPromise.then(function(result) {
        console.log(result);
        callback(null, response);
    }).catch(function(err) {
        console.log(err);
        response.statusCode = 500;
        callback(null, response);
    });
};

function getEmailMessage (emailObj) {
    var emailRequestParams = {
        Destination: {
          ToAddresses: [ emailObj.email ]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Presigned URL"
                }
            },
            Subject: {
                Data: "Promotional Content"
            }
        },
        Source: sesReplyAddress,
        ReplyToAddresses: [ sesReplyAddress ]
    };

    return emailRequestParams;
}
