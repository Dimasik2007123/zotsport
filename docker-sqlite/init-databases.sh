#!/bin/sh

# Инициализация catalog.db
sqlite3 /dbdata/catalog.db <<EOF
CREATE TABLE IF NOT EXISTS catalog (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    old_price INTEGER,
    price REAL,
    sale INTEGER,
    brand TEXT,
    image TEXT,
    available INTEGER
);
EOF

# Инициализация admins.db
sqlite3 /dbdata/admins.db <<EOF
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY,
    login TEXT,
    password TEXT
);
EOF

# Настройка прав доступа
chmod -R 664 /dbdata/*.db
chown -R 1000:1000 /dbdata

# Предотвращение завершения контейнера
tail -f /dev/null