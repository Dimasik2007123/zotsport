FROM alpine:latest
RUN apk add --no-cache sqlite
RUN mkdir -p /dbdata
COPY public_html/check-dbs.sh /dbdata/check-dbs.sh
COPY public_html/db/admins.db /dbdata
COPY public_html/db/catalog.db /dbdata
RUN chown -R 100:100 /dbdata && chmod -R 775 /dbdata && chmod +x /dbdata/check-dbs.sh
RUN mv /dbdata/check-dbs.sh /check-dbs.sh
CMD ["/check-dbs.sh"]