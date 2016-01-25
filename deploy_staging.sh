#!/usr/bin/env bash
DEFAULT="default"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=mugencalc
DIR=/
aws s3 sync $DIR s3://$BUCKET/ --profile "$PROFILE"