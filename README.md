# Currently editing this
# Purpose:  
This repo can be used to deploy a simple landing page that allows customers to enter their email and have promotional content emailed to them. This was built for testing and learning purposes and would need some updates and changes to be production-ready.


EX: Enter your email to get a PDF guide with steps on how to complete xyz
![image](https://user-images.githubusercontent.com/33853931/116800396-aa2d1c00-aace-11eb-9c33-59e64da8e51a.png)
***
# App architecture
* User goes to a website hosted in S3
* User enters email into the text field and hits submit
* The submit button contacts an AWS API
* API triggers a lambda function
* Lambda function sends the S3 object URL to the user's email via SES

***
# Steps to deploy the site:
### Step 1: Add your email to SES
The app processes the website requests with Lambda and uses SES to send the email. If you have a new AWS account

### Step 1: Deploy the infrastructure via CloudFormation
The "Resources.YAML"  (cfn\Resources.yaml) file deploys the following resources:
* An S3 bucket that is enabled for website hosting
* An S3 bucket with public read access that will contain the promotional content file
* An HTTP API (including a route, stage, integration settings and deployment)
* A Lambda function that processes the requests and sends the email
* A Lambda execution role




Notes:
* Website bucket
* aws s3 cp C:\Users\User\Documents\Repos\Get_Promotional_Content_AWS_Web_App\code\Website\index.html s3://test-s3websitebucket-1thv9v4m6d2p7/index.html
* aws s3 rm s3://test-s3websitebucket-1thv9v4m6d2p7 --recursive

* Promo bucket
* aws s3 cp C:\Users\User\Documents\Repos\Get_Promotional_Content_AWS_Web_App\code\Website\FileName.txt s3://test-mys3promobucket-131u67lm370w9/FileName.txt
* aws s3 rm s3://test-mys3promobucket-131u67lm370w9 --recursive
