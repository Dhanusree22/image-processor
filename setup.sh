#!/bin/bash

# Handwritten Text Segmentation - Automated Setup Script
# This script automates the setup process for Linux/Mac users

echo "🚀 Setting up Handwritten Text Segmentation..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_api_key_here

# API URL for development
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF
    echo "✅ .env.local created"
    echo "⚠️  Please update OPENAI_API_KEY in .env.local"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your OPENAI_API_KEY in .env.local"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
