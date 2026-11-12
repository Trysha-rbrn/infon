@echo off
echo Installing InFON frontend dependencies...
cd /d "%~dp0"

npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed. Make sure Node.js is installed.
    pause
    exit /b 1
)

echo.
echo All dependencies installed successfully!
echo.
echo Starting development server...
npm run dev
