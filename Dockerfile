# By Meer Sawood <msawood@redhat.com> 
# uses ubi minimal image to build and httpd as the server
FROM registry.access.redhat.com/ubi8/ubi-minimal

RUN microdnf module enable nodejs:14
RUN microdnf install nodejs
RUN microdnf install httpd
RUN sed -i 's/Listen 80/Listen 8080\nServerName localhost\nListen 8443/' /etc/httpd/conf/httpd.conf
RUN sed -i 's/^Group apache/Group root/g' /etc/httpd/conf/httpd.conf
RUN sed -i 's/logs\/error_log/\/dev\/stderr/g' /etc/httpd/conf/httpd.conf
RUN sed -i 's/logs\/access_log/\/dev\/stdout/g' /etc/httpd/conf/httpd.conf
RUN mkdir -p /etc/httpd/logs && touch /etc/httpd/logs/error_log && touch /etc/httpd/logs/access_log;
ADD . /tmp/src/
WORKDIR /tmp/src
USER root
RUN npm install 
RUN npm run build:prod
RUN ./fix-permissions.sh
USER apache
WORKDIR /var/www/html
EXPOSE 8080 8443
CMD ["-D", "FOREGROUND"]
ENTRYPOINT ["/usr/sbin/httpd"]