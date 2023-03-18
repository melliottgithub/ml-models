docker build -t ml-course:latest .
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 037747827681.dkr.ecr.us-west-2.amazonaws.com
docker tag ml-course:latest 037747827681.dkr.ecr.us-west-2.amazonaws.com/ml-course:latest
docker push 037747827681.dkr.ecr.us-west-2.amazonaws.com/ml-course:latest