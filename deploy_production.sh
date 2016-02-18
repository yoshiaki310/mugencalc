#!/usr/bin/env bash
DEFAULT="default"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=mugencalc.satoh.xyz
REGION=ap-northeast-1
DIR=./app/
aws s3 sync $DIR s3://$BUCKET/ --profile "$PROFILE" --region="$REGION"

git subtree push --prefix app origin gh-pages