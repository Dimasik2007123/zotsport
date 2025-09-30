FROM alpine:latest
RUN apk add --no-cache sqlite
COPY public_html/db/catalog.db /data/catalog.db
COPY public_html/db/admins.db /data/admins.db
RUN chown -R 100:100 /data && chmod -R 664 /data -R /data/catalog.db /data/admins.db
VOLUME /dbdata
CMD ["tail", "-f", "/dev/null"]