FROM alpine:latest
RUN apk add --no-cache sqlite
COPY public_html/db/catalog.db /dbdata/catalog.db
COPY public_html/db/admins.db /dbdata/admins.db
RUN chown -R 100:100 /dbdata && chmod -R 664 /dbdata -R /dbdata/catalog.db /dbdata/admins.db
VOLUME /dbdata
CMD ["tail", "-f", "/dev/null"]