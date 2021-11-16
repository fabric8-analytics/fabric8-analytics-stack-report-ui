FROM registry.centos.org/centos/centos:7

LABEL Codeready dependency analytics

RUN mkdir -p /opt/scripts 

ADD ./fix-permissions.sh ./install.sh ./passwd.template ./run.sh /opt/scripts/

RUN chmod -R 777 /opt/scripts && . /opt/scripts/install.sh

EXPOSE 8080 8443

USER apache

ENTRYPOINT ["/opt/scripts/run.sh"]

CMD ["apache"]
