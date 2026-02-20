#!/bin/bash

# AgRO NXT - Quick Start Script

echo "🌾 AgRO NXT - AI-Based Smart Agriculture Platform"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js is installed: $(node --version)"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
# This is optional - MongoDB might be on a different host

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Server npm install failed"
    exit 1
fi
echo "✓ Server dependencies installed"
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Client npm install failed"
    exit 1
fi
echo "✓ Client dependencies installed"
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running: mongod"
echo "2. Start the backend: cd server && npm start"
echo "3. Start the frontend (new terminal): cd client && npm start"
echo ""
echo "Application will open at http://localhost:3000"
echo "Backend API at http://localhost:5000"
echo ""
echo "Demo credentials:"
echo "  Email: farmer@agro.com"
echo "  Password: password123"
