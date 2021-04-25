# Get_Promotional_Content_AWS_Web_App (in progress)
AWS web app that allows you to enter your email to get a link to promotional content emailed to you

### App architecture
* User goes to website hosted in S3
* User enters email into text field and hits submit
* The submit button contacts an AWS API
* API triggers a lambda function
* Lambda function generates a pre-signed URL for our promotional content file stored in S3
* Lambda uses SES to send the pre-signed URL to our user/customer
* Will potentially add: stores users email in a DynamoDB table
