#!/usr/bin/env bash

## FIXME: Firefox complains about a missing machine-id file. So I set a random one
echo 8636d9aff3933f48b95ad94891cd1839 > /var/lib/dbus/machine-id

echo -n Running Xvfb...
/usr/bin/Xvfb :99 -screen 0 1024x768x24 &

declare -r SCRIPT_PATH=$(readlink -f "$0")
declare -r SCRIPT_DIR=$(cd $(dirname "$SCRIPT_PATH") && pwd)

LOGFILE=$(pwd)/functional_tests.log
echo Using logfile $LOGFILE

# source env variables
source "$SCRIPT_DIR/ui-test-env.sh"

source "$SCRIPT_DIR/lib/common.inc.sh"

main() {
  local base_url=${BASE_URL:-"http://localhost:3333/"}
  local protractor="$(npm bin)/protractor"
  local suite=${1:-fullTest}

  # BASE_URL is set means planner is already running.
  # Start planner only if BASE_URL is not set
  if [[ -z ${BASE_URL+x} ]]; then
    echo "Starting stack report in inmemory mode"
    start_analytics_report
    wait_for_analytics_report
  fi

  if [[ ${DIRECT_CONNECT:-false} == false ]]; then
    echo "DIRECT_CONNECT not set; Using webdriver. Tests may run slow .. checking webdriver status"
    echo
    webdriver_running || {
      start_webdriver
      wait_for_webdriver
    }
  else
    echo "DIRECT_CONNECT is set; using direct connection (faster)"
    echo
  fi

  if [[ ${HEADLES_MODE:-false} == true ]]; then
    echo "HEADLESS_MODE is set. Chrome will run in headless mode"
    echo
  fi

  # Checking env variable ANALYSES_REQUEST_ID is available
  if [ -z ${ANALYSES_REQUEST_ID} ]; then
    echo 'ANALYSES_REQUEST_ID is not set in the environment'
    exit 1
  fi

  # Checking env variable RECOMMENDER_API_TOKEN is available
  if [ -z ${RECOMMENDER_API_TOKEN} ]; then
    echo 'RECOMMENDER_API_TOKEN is not set in the environment'
    exit 2
  fi

  # Checking env variable RECOMMENDER_API_END_POINT is available
  if [ -z ${RECOMMENDER_API_END_POINT} ]; then
    echo 'RECOMMENDER_API_END_POINT is not set in the environment'
    exit 3
  fi

  $protractor --baseUrl "${base_url}" "$SCRIPT_DIR/protractor.config.js" --params.ANALYSES_REQUEST_ID=${ANALYSES_REQUEST_ID} --params.RECOMMENDER_API_TOKEN=${RECOMMENDER_API_TOKEN} --params.RECOMMENDER_API_END_POINT=${RECOMMENDER_API_END_POINT}

  TEST_RESULT=$?

  fuser -k -n tcp 4444
  fuser -k -n tcp 3333

  # Return test result
  if [ $TEST_RESULT -eq 0 ]; then
    echo 'Functional tests OK'
    exit 0
  else
    echo 'Functional tests FAIL'
    exit 1
  fi
}

main "$@"


