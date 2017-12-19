#!/usr/bin/env bash

LOGFILE=$(pwd)/functional_tests.log
echo Using logfile $LOGFILE 

# For the functional tests, we are mocking the core
export NODE_ENV=inmemory

# Start the web app
echo 'Application build START'
npm run build:prod
echo 'Application build DONE'
BUILD_RESULT=$?
if [ $BUILD_RESULT -eq 0 ]; then
  echo 'Application build OK'
else
  echo 'Application build FAIL'
  exit 1
fi

# Deploy the application at http://localhost:3333
(httpster -d ./dist -p 3333 >>$LOGFILE 2>&1 &)
DEPLOY_APP_RESULT=$?
if [ $DEPLOY_APP_RESULT -eq 0 ]; then
  # Wait for the deployment to finish (index.html is delivered)
  curl http://localhost:3333/ -o /dev/null -s
  echo 'Application deployed at http://localhost:3333 OK'
else
  echo 'Application deployment FAIL'
  exit 2
fi

# Checking env variable ANALYSES_REQUEST_ID is available
if [ -z ${ANALYSES_REQUEST_ID} ]; then
  echo 'ANALYSES_REQUEST_ID is not set in the environment'
  exit 3
fi

# Checking env variable RECOMMENDER_API_TOKEN is available
if [ -z ${RECOMMENDER_API_TOKEN} ]; then
  echo 'RECOMMENDER_API_TOKEN is not set in the environment'
  exit 4
fi

# Checking env variable RECOMMENDER_API_END_POINT is available
if [ -z ${RECOMMENDER_API_END_POINT} ]; then
  echo 'RECOMMENDER_API_END_POINT is not set in the environment'
  exit 5
fi

# Update webdriver manager
npm run webdriver:update
WEBDRIVER_UPDATE_RESULT=$?
if [ $WEBDRIVER_UPDATE_RESULT -eq 0 ]; then
  echo 'Web driver update OK'
else
  echo 'Web driver update FAIL'
  exit 6
fi

# Update webdriver manager
(npm run webdriver:start >>$LOGFILE 2>&1 &)
WEBDRIVER_START_RESULT=$?
if [ $WEBDRIVER_START_RESULT -eq 0 ]; then
  echo 'Web driver start OK'
else
  echo 'Web driver start FAIL'
  exit 7
fi

# Finally run protractor
echo Running tests...
node_modules/protractor/bin/protractor --params.ANALYSES_REQUEST_ID=${ANALYSES_REQUEST_ID} --params.RECOMMENDER_API_TOKEN=${RECOMMENDER_API_TOKEN} --params.RECOMMENDER_API_END_POINT=${RECOMMENDER_API_END_POINT}

TEST_RESULT=$?

# Cleanup webdriver-manager and web app processes (for MACOS)
lsof -i tcp:4444 | grep LISTEN | awk '{print $2}' | xargs kill
lsof -i tcp:3333 | grep LISTEN | awk '{print $2}' | xargs kill

# Cleanup webdriver-manager and web app processes (for LINUX)
# fuser -k -n tcp 4444
# fuser -k -n tcp 8088

# Return test result
if [ $TEST_RESULT -eq 0 ]; then
  echo 'UI Integration tests OK'
  exit 0
else
  echo 'UI Integration tests FAIL'
  exit 6
fi