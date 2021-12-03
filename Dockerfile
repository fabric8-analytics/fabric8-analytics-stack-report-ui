FROM centos/nodejs-10-centos7:latest 

LABEL Codeready dependency analytics

USER 0

RUN mkdir -p /opt/scripts /var/www/html

RUN chown -R 1001:0 /var/www/html

ADD ./fix-permissions.sh ./install.sh ./passwd.template ./run.sh /opt/scripts/

RUN chmod -R 777 /opt/scripts && . /opt/scripts/install.sh

WORKDIR /var/www/html

ADD package.json  /var/www/html

ADD package-lock.json /var/www/html

USER 1001

RUN npm install

ENV PATH="./var/www/html/node_modules/.bin:$PATH"

ADD . /var/www/html

# Requires root user to build a production build
USER root

# Create A production build
RUN npm run build:prod

ADD dist /var/www/html

EXPOSE 8080 8443

USER apache

ENTRYPOINT ["/opt/scripts/run.sh"]

CMD ["apache"]
