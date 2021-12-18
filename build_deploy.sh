#!/bin/bash
set -exv

BASE_IMG="rhel-fabric8-analytics-stack-report-ui"
QUAY_IMAGE="quay.io/app-sre/${BASE_IMG}"
IMG="${BASE_IMG}:revamp-latest"

GIT_HASH=`git rev-parse --short=7 HEAD`

# build the image
docker build  --no-cache \
              --force-rm \
              -t ${IMG}  \
              -f ./Dockerfile .

# push the image
skopeo copy --dest-creds "${QUAY_USER}:${QUAY_TOKEN}" \
    "docker-daemon:${IMG}" \
    "docker://${QUAY_IMAGE}:revamp-latest"

skopeo copy --dest-creds "${QUAY_USER}:${QUAY_TOKEN}" \
    "docker-daemon:${IMG}" \
    "docker://${QUAY_IMAGE}:revamp-${GIT_HASH}"