@echo off
REM Start Development Servers for Bhagirathi Ayurveda

echo.
echo Starting Bhagirathi Ayurveda Development Servers...
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if frontend dependencies are installed
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo Dependencies ready!
echo.
echo Starting servers...
echo   - Backend: http://localhost:5000
echo   - Frontend: http://localhost:1234
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd backend && npm start"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting in separate windows...
echo Close those windows to stop the servers.
echo.
pause
