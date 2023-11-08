# ML Models
REMOVE LATER...

## Conda environment (for local dev)
```
conda create --name ml-models python=3.11
conda activate ml-models
conda install --yes --file requirements.txt
```

## Docker build

```bash
docker build -t ml-models:latest .
```


## Running unit tests

```
python -m unittest discover
```

## Create ECR repository

```bash
AWS_REGION=us-east-1
ECR_REPOSITORY=ml-course
aws ecr create-repository --repository-name "$ECR_REPOSITORY" --region "$AWS_REGION"
```

## Create Lambda function

Environment variables para following commands.

```bash
AWS_REGION=us-east-1
FUNCTION_NAME=ml_course
```

Create the role for the Lambda access to container repository.

```bash
ROLE_NAME="${FUNCTION_NAME}-role"
TRUST_POLICY='{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
aws iam create-role --role-name "$ROLE_NAME" --assume-role-policy-document "$TRUST_POLICY" --region "$AWS_REGION"
aws iam attach-role-policy --role-name "$ROLE_NAME" --policy-arn "arn:aws:iam::aws:policy/AWSLambda_FullAccess" --region "$AWS_REGION"
```

Create lambda function using the role created.

```bash
CONTAINER_IMAGE=<container-image-uri>
aws lambda create-function \
  --function-name "$FUNCTION_NAME" \
  --package-type Image \
  --code "ImageUri=$CONTAINER_IMAGE" \
  --role "arn:aws:iam::$(aws sts get-caller-identity --query 'Account' --output text):role/$ROLE_NAME" \
  --region "$AWS_REGION"
```

## Enable Function URL option

Create Function URL configuration

```bash
aws lambda create-function-url-config \
--function-name "$FUNCTION_NAME" \
--auth-type NONE \
--cors '{"AllowOrigins":["*"],"AllowMethods":["POST"],"AllowHeaders":["Content-Length","Accept","Date","Content-Type"],"ExposeHeaders":["Content-Length","Content-Type","Date","Referer","X-Amz-Apigw-Id","X-Amzn-Requestid","X-Amzn-Trace-Id"]}'

```

Give permission for public access to Function URL invocation

```bash
aws lambda add-permission \
--function-name "$FUNCTION_NAME" \
--statement-id "${FUNCTION_NAME}-stmt-public" \
--action lambda:InvokeFunctionUrl \
--principal "*" \
--function-url-auth-type NONE
```

## Enable CloudWatch logging

Attach permission policy to Lambda function role

```bash
aws iam attach-role-policy \
--role-name "$ROLE_NAME" --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```