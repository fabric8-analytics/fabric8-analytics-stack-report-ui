#!/usr/bin/env bash
# Fix permissions on the given directory to allow group read/write of
# regular files and execute of directories.
set -eux
chown -R apache:apache  /etc/httpd
chown -R apache:apache /var/www
chmod -R g+rwxs /etc/httpd
chmod -R 777 /etc/httpd/run
chmod -R g+rwxs /var/www
chmod -R 777 /etc/httpd/logs
