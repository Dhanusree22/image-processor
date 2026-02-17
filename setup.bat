@echo off

REM Handwritten Text Segmentation - Automated Setup Script
REM This script automates the setup process for Windows users

echo 🚀 Setting up Handwritten Text Segmentation...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install it first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo # OpenAI API Key (get from https://platform.openai.com/api-keys
        echo OPENAI_API_KEY=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
# Optional: For development/testing
        echo.
        echo # API URL for development
        echo NEXT_PUBLIC_API_URL=http://localhost:3000
    ) > .env.local
    echo ✅ .env.local created
    echo ⚠️  Please update OPENAI_API_KEY in .env.local
) else (
    echo ✅ .env.local already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Update your OPENAI_API_KEY in .env.local
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
pause
