@echo off
setlocal

REM Prompt for MySQL password
set /p MYSQL_PASSWORD=Enter MySQL root password: 

REM Set database name
set DB_NAME=capstone

REM Just to be safe, print the current directory
echo Current directory: %cd%

REM Create the database (if it doesn't exist)
mysql -u root -p%MYSQL_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"

REM Run each SQL script — paths are relative to where this batch file runs (root)
mysql -u root -p%MYSQL_PASSWORD% %DB_NAME% < backend\sql\users.sql
mysql -u root -p%MYSQL_PASSWORD% %DB_NAME% < backend\sql\roles.sql
mysql -u root -p%MYSQL_PASSWORD% %DB_NAME% < backend\sql\teams.sql

echo Done executing all SQL files.
pause
