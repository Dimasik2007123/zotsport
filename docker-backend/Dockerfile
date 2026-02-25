FROM php:8.3-apache
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    curl \
    unzip \
    git \
    && docker-php-ext-install pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install curl || true
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && chmod +x /usr/local/bin/composer
RUN composer require phpmailer/phpmailer symfony/mime railsware/mailtrap-php nyholm/psr7 php-http/discovery -W --no-interaction --working-dir=/var/www/html
RUN mkdir -p /var/www/html/backend

COPY --chown=www-data:www-data public_html/backend /var/www/html

RUN mkdir -p /var/www/html/db && \
    chown -R www-data:www-data /var/www/html/db && \
    chmod -R 777 /var/www/html/db
RUN chown -R www-data:www-data /var/www/html \
      && chown -R www-data:www-data /var/www/html/backend \
      && chmod -R 775 /var/www/html/backend
RUN echo '#!/bin/bash\n\
      chown -R www-data:www-data /var/www/html/db /var/www/html/backend\n\
      chmod -R 775 /var/www/html/db /var/www/html/backend\n\
      exec apache2-foreground' > /entrypoint.sh && chmod +x /entrypoint.sh
RUN a2enmod rewrite
RUN echo "<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>" > /etc/apache2/conf-available/custom.conf && a2enconf custom
EXPOSE 80
CMD ["apache2-foreground"]