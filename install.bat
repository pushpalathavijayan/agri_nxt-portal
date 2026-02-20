@echo off
REM AgRO NXT - Quick Start Script for Windows

echo.
echo 🌾 AgRO NXT - AI-Based Smart Agriculture Platform
echo ==================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed: 
node --version

echo.
echo 📦 Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Server npm install failed
    pause
    exit /b 1
)
echo ✓ Server dependencies installed
cd ..

echo.
echo 📦 Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ❌ Client npm install failed
    pause
    exit /b 1
)
echo ✓ Client dependencies installed
cd ..

echo.
echo ✅ Installation complete!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running: mongod
echo 2. Start the backend: cd server ^&^& npm start
echo 3. Start the frontend (new terminal): cd client ^&^& npm start
echo.
echo Application will open at http://localhost:3000
echo Backend API at http://localhost:5000
echo.
echo Demo credentials:
echo   Email: farmer@agro.com
echo   Password: password123
echo.
pause
