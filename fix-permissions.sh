#!/usr/bin/env bash
# Fix permissions on the given directory to allow group read/write of
# regular files and execute of directories.
set -eux

#for item in "/etc/httpd" "/var/www"; do
#    find ${item} -exec chown apache {} \;
#    find ${item} -exec chgrp 0 {} \;
#    find ${item} -exec chmod g+rw {} \;
#    find ${item} -type d -exec chmod g+x {} +
#done

chown -R apache:apache  /etc/httpd/*
chown -R apache:apache /var/www/*
chmod -R g+rwxs /etc/httpd
chmod -R g+rwxs /var/www

chmod -R 777 /etc/httpd/logs
