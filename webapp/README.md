# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Install packages dependencies

```bash
yarn install
```

## Environment variables

```bash
REACT_APP_API=<url-to-lambda-function>
```

## Create a S3 bucket

```bash
AWS_REGION=us-east-1
S3_BUCKET_NAME=uci-ml-models
aws s3api create-bucket --bucket $S3_BUCKET_NAME --region $AWS_REGION
```

## Enable S3 bucket website hosting
```bash
S3_BUCKET_NAME=uci-ml-models
aws s3 website s3://$S3_BUCKET_NAME/ --index-document index.html
```

## Enable public access
```bash
aws s3api put-public-access-block --bucket $S3_BUCKET_NAME --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

```


## Permission policy

```bash
aws s3api put-bucket-policy --bucket $S3_BUCKET_NAME  --policy '{
    "Version": "2012-10-17",
    "Id": "PublicReadGetObject",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME-HERE>/*"
        }
    ]
}'

```