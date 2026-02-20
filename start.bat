@echo off
REM AgRO NXT - Development Start Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║        🌾 AgRO NXT - Smart Agriculture Platform 🌾           ║
echo ║              Development Server Starter                       ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed: 
node --version
echo.

REM Check if packages are installed
if not exist "server\node_modules\" (
    echo Installing server dependencies...
    cd server
    call npm install
    cd ..
)

if not exist "client\node_modules\" (
    echo Installing client dependencies...
    cd client
    call npm install
    cd ..
)

echo.
echo ═════════════════════════════════════════════════════════════════
echo Starting AgRO NXT Services...
echo ═════════════════════════════════════════════════════════════════
echo.

REM Check if concurrently is available
where npm >nul 2>&1
if errorlevel 1 goto nompm

REM Try to use concurrently if available
cd server
start "AgRO NXT Backend" cmd /k npm start
cd ..

timeout /t 3 /nobreak

cd client
start "AgRO NXT Frontend" cmd /k npm start
cd ..

echo.
echo ✓ Both servers are starting!
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press any key to continue...
pause

exit /b 0

:nompm
echo ❌ npm command not found
echo Please ensure Node.js is properly installed
pause
exit /b 1
