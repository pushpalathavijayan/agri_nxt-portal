#!/bin/bash

# AgRO NXT - Development Start Script

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        🌾 AgRO NXT - Smart Agriculture Platform 🌾           ║"
echo "║              Development Server Starter                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js is installed: $(node --version)${NC}"

# Check if MongoDB is running
echo ""
echo -e "${BLUE}Checking MongoDB connection...${NC}"
mongosh --version &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Note: MongoDB CLI not found${NC}"
    echo "   Make sure MongoDB service is running separately (mongod)"
fi

# Check if packages are installed
echo ""
echo -e "${BLUE}Checking dependencies...${NC}"

if [ ! -d "server/node_modules" ]; then
    echo -e "${YELLOW}Installing server dependencies...${NC}"
    cd server
    npm install
    cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo -e "${YELLOW}Installing client dependencies...${NC}"
    cd client
    npm install
    cd ..
fi

echo -e "${GREEN}✓ Dependencies check complete${NC}"

# Start servers
echo ""
echo -e "${BLUE}═════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Starting AgRO NXT Services...${NC}"
echo -e "${BLUE}═════════════════════════════════════════════════════════════════${NC}"
echo ""

# Check if concurrently is installed at root
if [ -f "package.json" ] && grep -q "concurrently" package.json; then
    echo -e "${GREEN}Starting both servers with concurrently...${NC}"
    npm run dev
else
    echo -e "${YELLOW}Starting servers separately...${NC}"
    echo ""
    echo -e "${BLUE}Opening server terminal...${NC}"
    echo ""
    
    # Start backend in background
    cd server
    npm start &
    SERVER_PID=$!
    cd ..
    
    sleep 3
    
    echo -e "${BLUE}Opening client terminal...${NC}"
    echo ""
    
    # Start frontend
    cd client
    npm start
    CLIENT_PID=$!
    cd ..
    
    # Wait for all processes
    wait
fi

echo ""
echo -e "${YELLOW}Development servers stopped${NC}"
echo ""
