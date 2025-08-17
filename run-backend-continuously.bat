@echo off
title Backend Server - Lomba 17 Agustus
color 0A

echo ========================================
echo    BACKEND SERVER - LOMBA 17 AGUSTUS
echo ========================================
echo.
echo Server akan berjalan terus menerus
echo Tekan Ctrl+C untuk menghentikan
echo.

:start
echo [%date% %time%] Starting backend server...
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start the server
npm start

echo.
echo [%date% %time%] Server stopped. Restarting in 5 seconds...
echo.

timeout /t 5 /nobreak >nul
goto start
