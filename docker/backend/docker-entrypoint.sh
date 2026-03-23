#!/usr/bin/env bash
set -e

cd /var/www/html

chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true

if [ -z "${APP_KEY:-}" ]; then
    export APP_KEY=$(php -r "echo 'base64:'.base64_encode(random_bytes(32));")
    echo "APP_KEY gerada automaticamente (defina APP_KEY no ambiente para um valor fixo em produção)."
fi

php artisan config:clear --no-interaction 2>/dev/null || true
php artisan migrate --force --no-interaction

exec apache2-foreground
