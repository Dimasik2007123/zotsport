FROM alpine:3.20

RUN apk add --no-cache sqlite
RUN mkdir -p /dbdata

COPY init-databases.sh /init-databases.sh
RUN chmod +x /init-databases.sh

# Выполнение скрипта инициализации при старте
CMD ["init-databases.sh"]