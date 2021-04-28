# Get_Promotional_Content_AWS_Web_App (in progress)
AWS web app that allows you to enter your email to get a link to promotional content emailed to you

### App architecture
* User goes to website hosted in S3
* User enters email into text field and hits submit
* The submit button contacts an AWS API
* API triggers a lambda function
* Lambda function generates a pre-signed URL for our promotional content file stored in S3
* Lambda uses SES to send the pre-signed URL to our user/customer

### Resources
* S3.yaml - deploys an S3 bucket and enables it for static website hosting
* LambdaAndAPI.yaml - (in progress) - deploys the lambda function with the API and associated roles
* Index.html - (in progress) site code
* LambdaCode.js - will be used in the lambda function
