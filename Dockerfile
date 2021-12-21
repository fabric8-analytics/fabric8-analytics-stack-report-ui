# By Meer Sawood <msawood@redhat.com> 
# uses ubi minimal image to build and httpd as the server
FROM registry.access.redhat.com/ubi8/ubi-minimal

RUN microdnf module enable nodejs:14
RUN microdnf install nodejs
RUN microdnf install httpd
RUN sed -i 's/Listen 80/Listen 80\nServerName localhost\nListen 8080/' /etc/httpd/conf/httpd.conf
ADD . /tmp/src/
WORKDIR /tmp/src
USER root
RUN npm install 
RUN npm run build:prod
USER apache
WORKDIR /var/www/html
EXPOSE 80 8080 8443
CMD ["-D", "FOREGROUND"]
ENTRYPOINT ["/usr/sbin/httpd"]