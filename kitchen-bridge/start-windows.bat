@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed.
  echo Install Node.js, then run this file again.
  echo.
  pause
  exit /b 1
)
if not exist .env (
  echo.
  echo Missing .env file.
  echo Copy .env.example to .env and enter the printer IP and kitchen bridge token.
  echo.
  pause
  exit /b 1
)
echo Starting Flamebachi Kitchen Printer Bridge...
echo Keep this window open while the kitchen printer is in use.
echo.
node bridge.mjs
pause
