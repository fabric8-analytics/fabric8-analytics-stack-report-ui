webdriver_running() {
  curl --output /dev/null --silent --head --fail 127.0.0.1:4444
}

wait_for_webdriver() {
  echo "Waiting for the webdriver to start "
  # Wait for port 4444 to be listening connections
  until webdriver_running ; do
    sleep 1
    echo -n .
  done
  echo
  echo "Webdriver manager up and running - OK"
  echo
}

start_webdriver() {
  # Update webdriver
  echo "Updating Webdriver and Selenium..."
  npm run webdriver:update
  # Start selenium server just for this test run
  echo "Starting Webdriver and Selenium..."
  npm run webdriver:start >> /dev/null 2>&1 &
}

start_analytics_report() {
  echo "NODE_ENV=inmemory mode set"
  echo "Starting local development server"
  NODE_ENV=inmemory npm run run:app >>$LOGFILE 2>&1 &
}

analytics_report_running() {
  curl --output /dev/null --silent localhost:3333
}

wait_for_analytics_report() {
  echo "Waiting for the stack report to start "
  # Wait for port 4444 to be listening connections
  until analytics_report_running ; do
    sleep 1
    echo -n .
  done
  echo
  echo "Stack report up and running - OK"
  echo
}
