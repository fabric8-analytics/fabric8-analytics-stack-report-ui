#!/bin/bash


echo -n Updating Webdriver and Selenium...
webdriver-manager update
webdriver-manager update --versions.chrome 2.30

## FIXME: Firefox complains about a missing machine-id file. So I set a random one
echo 8636d9aff3933f48b95ad94891cd1839 > /var/lib/dbus/machine-id
