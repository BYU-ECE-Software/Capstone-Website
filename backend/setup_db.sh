#!/bin/bash

# Prompt for MySQL root password (hidden input)
read -s -p "Enter MySQL root password: " MYSQL_PASSWORD
echo ""

# Set database name
DB_NAME="capstone"

# Print current directory (just like in your .bat file)
echo "Current directory: $(pwd)"

# Create the database (if it doesn't exist)
mysql -u root -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\`;"

# Run each SQL script (assuming relative paths from script location)
mysql -u root -p"$MYSQL_PASSWORD" "$DB_NAME" < sql/users.sql
mysql -u root -p"$MYSQL_PASSWORD" "$DB_NAME" < sql/roles.sql
mysql -u root -p"$MYSQL_PASSWORD" "$DB_NAME" < sql/teams.sql
mysql -u root -p"$MYSQL_PASSWORD" "$DB_NAME" < sql/vehicle_requests.sql
mysql -u root -p"$MYSQL_PASSWORD" "$DB_NAME" < sql/vehicle_vendors.sql

echo "Done executing all SQL files."