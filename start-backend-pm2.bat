@echo off
echo Starting Backend Server with PM2...
echo.

cd /d "%~dp0"

REM Check if PM2 is installed
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo PM2 not found. Installing PM2 globally...
    npm install -g pm2
)

echo Starting backend with PM2...
npm run pm2:start

echo.
echo Backend is now running with PM2!
echo.
echo Commands:
echo - Monitor: npm run pm2:monit
echo - Logs: npm run pm2:logs
echo - Restart: npm run pm2:restart
echo - Stop: npm run pm2:stop
echo.

pause
