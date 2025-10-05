#!/bin/sh
echo "Checking database /dbdata/catalog.db..."
sqlite3 /dbdata/catalog.db ".tables" && echo "Database /dbdata/catalog.db opened successfully" || { echo "Failed to open /dbdata/catalog.db"; exit 1; }
echo "Checking database /dbdata/admins.db..."
sqlite3 /dbdata/admins.db ".tables" && echo "Database /dbdata/admins.db opened successfully" || { echo "Failed to open /dbdata/admins.db"; exit 1; }
exit 0