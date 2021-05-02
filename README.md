# Currently editing this
# Purpose:  
This repo can be used to deploy a singular simple landing page that allows customers to enter their email and have promotional content emailed to them. This was built for testing and learning purposes and would need some updates and changes to be production-ready.


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
The app processes the website requests with Lambda and uses SES to send the email. If you have a new AWS account your account is likley within the SES sandbox.
Some of the main limtations of the SES sandbox are:
* You can only send mail to verified email addresses and domains
* You can only send mail from verified email addresses and domains

You can [submit a request to move your account out of the SES sandbox](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html) however this project assumes you are still in the SES sandbox. To get started you will need to verify a sending address within SES:
1.  Navigate to SES in the AWS Console
2.  Click Email Addresses
3.  Click Verify a New Email Address
4.  Enter the email address you would like to use as the sending address
5.  Click Verify This Email Address
6.  Check your email for a verification email 
7.  Click the link in the email to confirm your email address

### Step 2: Deploy the infrastructure via CloudFormation
The "Resources.YAML"  (cfn\Resources.yaml) file deploys the following resources:
* An S3 bucket that is enabled for website hosting
* An S3 bucket with public read access that we will put the promotional content file into
* An HTTP API (including a route, stage, integration settings and deployment)
* A Lambda function that processes the requests and sends the email
* A Lambda execution role with SES and logging permissions 

1. Navigate to CloudFormation in the AWS console 
2. Click create stack and upload the "Resources.YAML" template
![image](https://user-images.githubusercontent.com/33853931/116828065-6982e080-ab6a-11eb-9fc1-446b57c5f8c9.png)
3. Enter a stack name and add the parameter values
![image](https://user-images.githubusercontent.com/33853931/116828366-43f6d680-ab6c-11eb-9a7b-407fdc642cbc.png)
* ***HttpApiName:*** This is the name that will be assigned to the HTTP API
* ***PromotionalDocumentName:*** Enter the name of your promotional document here. If your file is "Tips_for_securing_your_IT_enviorment.pdf" enter that file name here.
* ***ReplyEmail:*** This value is the sending email address. If you plan to send emails from "test@gmail.com" enter that here. If you completed step 1 you would enter that email here.
4. Click next, acknowledge that CloudFormation will create IAM resources and hit deploy
5. Wait till the stack deploys and then take note of the output values:
![image](https://user-images.githubusercontent.com/33853931/116828629-e2d00280-ab6d-11eb-9940-26adfe9de5da.png)

### Step 3: Upload the promotional content document to S3
1. Get the "PromotionalContentBucketName" from the CloudFormation output tab
2. Upload the promotional document to the S3 bucket: <br>
AWS CLI example:
```
aws s3 cp C:\Users\User\Documents\projectfolder\FileName.txt s3://BUCKETNAME/FileName.txt
``` 
![image](https://user-images.githubusercontent.com/33853931/116829114-1b251000-ab71-11eb-85d0-92f787047a66.png)

### Step 4: Update the index.html file
When the user submits thier email the website contacts the API that was created with the CloudFormation.
Before you upload the index.html website file to S3 you need need to add the API gateway invoke URL to the code.
1. Grab the "apiGatewayInvokeURL" value from the CloudFormation outputs
![image](https://user-images.githubusercontent.com/33853931/116829379-bae29e00-ab71-11eb-982c-f019ae2c5e99.png)
2. Add the URL to the index.html code:
![image](https://user-images.githubusercontent.com/33853931/116829411-f1b8b400-ab71-11eb-9129-8e8a656038a5.png)

### Step 5: Upload the index.html file to S3
The CloudFormation template created an S3 bucket enabled for website hosting. You need to upload the updated index.html file to that bucket.
1. Get the "WebsiteBucketName" from the CloudFormation output tab
2. Upload the index.html document to the S3 bucket: <br>
```
aws s3 cp C:\Users\User\Documents\projectfolder\index.html s3://BUCKETNAME/index.html
``` 
![image](https://user-images.githubusercontent.com/33853931/116829573-6a1f7500-ab72-11eb-85ad-67e38f6a7b3d.png)

### Step 6: Test the web app
With the infrastructure and files in place you can now test the site.
1. Click on the link for the "WebsiteURL" CloudFormation output
![image](https://user-images.githubusercontent.com/33853931/116829631-b9fe3c00-ab72-11eb-8efc-943a2a5450e7.png)
2. Enter an email and hit submit. If your account is still in the SES sandbox enter the email from step 1.
3.  Verify that you recived the email:
![image](https://user-images.githubusercontent.com/33853931/116829689-2e38df80-ab73-11eb-90db-c263102d4789.png)

### Clean up:
1. Empty the 2 S3 buckets:
```
aws s3 rm s3://BUCKETNAME --recursive
``` 
2. Delete the CloudFormation stack



### Room for improovement:
* The bucket that contains the promotional content is publicly availible. To prevent people from sharing the link we could make the bucket private and have Lambda generate presigned URL's
* There is no real record of what emails are entered. We could add logging or potentially sent the submitted addresses to a database. 

Notes:
* Website bucket
* aws s3 cp C:\Users\User\Documents\Repos\Get_Promotional_Content_AWS_Web_App\code\Website\index.html s3://testdeploy-s3websitebucket-tk9vfqpr55mr/index.html
* aws s3 rm s3://test-s3websitebucket-1thv9v4m6d2p7 --recursive

* Promo bucket
* aws s3 cp C:\Users\User\Documents\Repos\Get_Promotional_Content_AWS_Web_App\code\Website\FileName.txt s3://	testdeploy-mys3promobucket-1g0hqlnw50vi4/FileName.txt
* aws s3 rm s3://test-mys3promobucket-131u67lm370w9 --recursive
