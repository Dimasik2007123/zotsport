#!/bin/sh
echo "Checking database /dbdata/catalog.db..."
result=$(sqlite3 /dbdata/catalog.db "SELECT EXISTS (SELECT * FROM sqlite_master WHERE type='table' AND name='catalog');")
if [ "$result" -eq 1 ]; then
    echo "Database /dbdata/catalog.db opened successfully"
else
    echo "Failed to open /dbdata/catalog.db or table 'catalog' not found"
    exit 1
fi

echo "Checking database /dbdata/admins.db..."
result=$(sqlite3 /dbdata/admins.db "SELECT EXISTS (SELECT * FROM sqlite_master WHERE type='table' AND name='users');")
if [ "$result" -eq 1 ]; then
    echo "Database /dbdata/admins.db opened successfully"
else
    echo "Failed to open /dbdata/admins.db or table 'users' not found"
    exit 1
fi

exit 0