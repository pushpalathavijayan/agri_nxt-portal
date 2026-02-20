QUICK REFERENCE GUIDE - AgRO NXT
================================

🚀 QUICK START (3 STEPS)
======================

Step 1: Install Dependencies
----------------------------
Windows:
  cd agro-nxt
  install.bat

macOS/Linux:
  cd agro-nxt
  chmod +x install.sh
  ./install.sh

Manual:
  cd agro-nxt/server && npm install
  cd ../client && npm install

Step 2: Start MongoDB
-------------------
Windows: mongod
macOS:   brew services start mongodb-community
Linux:   sudo systemctl start mongod

Step 3: Run Application
---------------------
Terminal 1:
  cd agro-nxt/server
  npm start

Terminal 2:
  cd agro-nxt/client
  npm start

✓ Open http://localhost:3000

Login:
  Email: farmer@agro.com
  Password: password123


📁 PROJECT FOLDERS
==================

server/        → Backend (Node.js, Express, MongoDB)
client/        → Frontend (React, Tailwind CSS)
README.md      → Full documentation
SETUP.md       → Detailed setup guide
STRUCTURE.md   → Project architecture


📊 MAIN PAGES
=============

/              Dashboard
/login         Login page
/register      Register page
/farms         Farm management
/recommendation Crop recommendation
/profit        Profit simulation
/schemes       Government schemes
/sustainability Sustainability scoring
/voice         Voice assistant


🔧 USEFUL COMMANDS
==================

Backend (server folder):
  npm start              Start server
  npm run dev            Start with auto-reload
  npm run seed           Add demo data

Frontend (client folder):
  npm start              Start dev server
  npm run build          Create production build
  npm test               Run tests

Root (agro-nxt folder):
  npm run server         Start backend only
  npm run client         Start frontend only
  npm run dev            Start both (with concurrently)
  npm run seed           Seed database


🔑 DEMO CREDENTIALS
===================

Email: farmer@agro.com
Password: password123

(Or create new account via Register)


🌐 URLS
=======

Frontend:   http://localhost:3000
Backend:    http://localhost:5000
API:        http://localhost:5000/api


⚙️ ENVIRONMENT VARIABLES
========================

server/.env:
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/agro-nxt
  JWT_SECRET=your_jwt_secret_key
  NODE_ENV=development

(.env.example provided as template)


🐛 COMMON ISSUES & FIXES
=======================

Issue: Port 5000 in use
Fix:   Change PORT in server/.env

Issue: MongoDB connection error
Fix:   Ensure mongod is running

Issue: Port 3000 in use
Fix:   PORT=3001 npm start (in client folder)

Issue: npm install fails
Fix:   Delete node_modules & package-lock.json, retry

Issue: Cannot login
Fix:   Run "npm run seed" in server folder

Issue: CORS error
Fix:   Check server CORS settings

Issue: Pages not loading
Fix:   Clear browser cache (Ctrl+Shift+Del)


📦 TECH STACK
=============

Frontend:
  ✓ React.js
  ✓ React Router
  ✓ Axios
  ✓ Tailwind CSS
  ✓ Recharts

Backend:
  ✓ Node.js
  ✓ Express.js
  ✓ MongoDB
  ✓ Mongoose
  ✓ JWT
  ✓ Bcryptjs


🎯 FEATURES
===========

✓ User Authentication (JWT + bcrypt)
✓ Farm Management (CRUD)
✓ Crop Recommendations (AI-based)
✓ Profit Simulation (Charts)
✓ Government Schemes (Filtered)
✓ Sustainability Scoring (Eco-metrics)
✓ Voice Assistant (UI)
✓ Responsive Design (Mobile-friendly)
✓ Protected Routes (Auth)
✓ Dashboard (Real-time data)


📈 API ENDPOINTS (20+)
=====================

Auth:
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/profile

Farms:
  POST   /api/farm
  GET    /api/farm
  GET    /api/farm/:id
  PUT    /api/farm/:id
  DELETE /api/farm/:id
  POST   /api/farm/:id/crop-history

AI:
  POST   /api/ai/recommend
  POST   /api/ai/profit

Schemes:
  GET    /api/schemes
  GET    /api/schemes/state/:state
  POST   /api/schemes/check-eligibility

Sustainability:
  POST   /api/sustainability/calculate
  GET    /api/sustainability

Dashboard:
  GET    /api/dashboard


🎨 UI COMPONENTS
================

Card         Generic container
Button       Interactive button (4 variants)
Input        Text input with label
Select       Dropdown selector
Loader       Loading spinner
Alert        Message display (4 types)


🔐 AUTHENTICATION FLOW
======================

1. User registers or logs in
2. Server generates JWT token
3. Token saved in localStorage
4. Token sent with each API request
5. Server verifies token
6. Protected routes accessible
7. Logout clears token


💾 DATABASE MODELS
==================

User
  - fullName, email, password (hashed)
  - phone, state, district
  - landSize, farmType

Farm
  - userId (foreign key)
  - farmName, location, landSize
  - soilPH, N, P, K, moisture
  - cropHistory

Recommendation
  - userId, cropRecommended
  - season, confidence, explanation
  - expectedYield, estimatedRevenue

Scheme
  - schemeName, description
  - minLandSize, maxLandSize
  - subsidy, eligibleStates, cropType


🎓 USAGE EXAMPLES
=================

Creating a Farm:
1. Go to /farms
2. Click "+ Add Farm"
3. Fill form
4. Click "Create Farm"
5. Farm appears in list

Getting Crop Recommendation:
1. Go to /recommendation
2. Select season (Kharif, Rabi, Summer)
3. Enter soil pH
4. Set budget
5. Click "Get Recommendation"
6. View results with confidence score

Running Profit Simulation:
1. Go to /profit
2. Enter land size
3. Select crop
4. Enter investment cost
5. Click "Simulate Profit"
6. View charts and results

Checking Schemes:
1. Go to /schemes
2. Filter by state (optional)
3. View scheme details
4. Check eligibility and requirements

Tracking Sustainability:
1. Go to /sustainability
2. Enter farm metrics
3. Click "Calculate Sustainability"
4. View scores and recommendations


📝 DOCUMENTATION FILES
======================

README.md              Main documentation
SETUP.md               Detailed setup guide
PROJECT_STRUCTURE.md   Architecture overview
QUICK_REFERENCE.md     This file


🔍 DEBUGGING TIPS
================

Browser Console (F12 > Console):
  - Shows client-side errors
  - Shows API responses
  - Check Network tab for requests

Server Console:
  - Shows backend errors
  - Shows database queries
  - Check for connection errors

Network Tab (F12 > Network):
  - See all HTTP requests
  - Check response status
  - View response data
  - Monitor performance


📋 CHECKLIST FOR FIRST RUN
===========================

☐ Node.js installed? (node --version)
☐ MongoDB running? (mongod command)
☐ Dependencies installed? (npm install done)
☐ .env file exists in server folder?
☐ Backend starts? (npm start in server)
☐ Frontend starts? (npm start in client)
☐ Can access http://localhost:3000?
☐ Can login with demo credentials?
☐ Dashboard loads?
☐ Can add a farm?
☐ Can get crop recommendation?
☐ Can run profit simulation?


🚀 NEXT STEPS
=============

1. Explore the dashboard
2. Create test farm
3. Try recommendations
4. Simulate profits
5. Check schemes
6. Analyze sustainability
7. Review code structure
8. Customize colors (tailwind.config.js)
9. Modify mock AI logic (server/routes/ai.js)
10. Deploy to production


⚡ PERFORMANCE TIPS
===================

- Use chrome DevTools for profiling
- Optimize images for mobile
- Enable caching on client
- Use CDN for static files
- Monitor database query performance
- Use indexes on frequently queried fields
- Consider pagination for large datasets


🎯 PRODUCTION CHECKLIST
=======================

☐ Change JWT_SECRET
☐ Update NODE_ENV to production
☐ Configure production MongoDB
☐ Set CORS for production domain
☐ Enable HTTPS/SSL
☐ Add logging service
☐ Set up error tracking
☐ Configure backups
☐ Set up monitoring
☐ Document API endpoints
☐ Create user documentation
☐ Test all features
☐ Performance testing
☐ Security audit
☐ Load testing


💬 SUPPORT & HELP
=================

Common Issues:
→ Check SETUP.md troubleshooting section
→ Review browser console (F12)
→ Check server logs
→ Verify .env configuration
→ Ensure MongoDB is running

For More Help:
→ Read README.md
→ Check PROJECT_STRUCTURE.md
→ Review code comments
→ Check API endpoint documentation


📞 QUICK CONTACTS
=================

Node.js:     https://nodejs.org
MongoDB:     https://www.mongodb.com
React:       https://react.dev
Tailwind:    https://tailwindcss.com
Express:     https://expressjs.com


Version: 1.0.0
Ready for: Development & Production
Last Updated: 2026-02-20

Good luck with AgRO NXT! 🌾🚀
