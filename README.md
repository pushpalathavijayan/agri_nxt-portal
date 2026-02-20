# AgRO NXT - AI-Based Smart Agriculture Decision Intelligence Platform

Complete full-stack web application for smart agriculture decision intelligence.

## Project Structure

```
agro-nxt/
├── client/              (React Frontend)
│   ├── src/
│   │   ├── components/  (Reusable UI components)
│   │   ├── pages/       (Page components)
│   │   ├── services/    (API calls)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── server/              (Node.js/Express Backend)
    ├── models/          (MongoDB schemas)
    ├── routes/          (API endpoints)
    ├── middleware/      (Auth middleware)
    ├── server.js
    ├── package.json
    └── .env
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or connection string)

### Installation

1. **Backend Setup**
```bash
cd agro-nxt/server
npm install
```

2. **Frontend Setup**
```bash
cd agro-nxt/client
npm install
```

### Running the Application

1. **Start MongoDB** (if using local MongoDB)
```bash
mongod
```

2. **Start Backend Server**
```bash
cd agro-nxt/server
npm start
# Server runs on http://localhost:5000
```

3. **Start Frontend** (in a new terminal)
```bash
cd agro-nxt/client
npm start
# Application opens on http://localhost:3000
```

## Features

### Authentication
- User registration with location and farm details
- JWT-based login
- Secure password hashing with bcrypt
- Protected routes

### Dashboard
- Weather summary
- Recommended crop with confidence score
- Profit prediction
- Risk indicators
- Soil health metrics
- Real-time market prices with charts

### Farm Management
- Add/Edit/Delete farms
- Soil input tracking (pH, NPK, moisture)
- Crop history management
- Multiple farm support

### AI Crop Recommendation
- Season-based recommendations (Kharif, Rabi, Summer)
- Soil pH analysis
- Budget consideration
- Confidence scoring
- Expected yield estimation

### Profit Simulation
- Land size input
- Crop type selection
- Investment cost calculation
- Revenue forecasting
- Profit margin calculation
- Risk scoring
- Visual charts (Bar & Pie)

### Government Schemes
- Browse available schemes
- Filter by state
- Subsidy information
- Eligibility criteria
- Requirements listing

### Sustainability Scoring
- Water usage analysis
- Soil health evaluation
- Chemical usage assessment
- Biodiversity tracking
- Carbon footprint calculation
- Eco-rating system
- Recommendations for improvement

### Voice Assistant (UI)
- Voice query interface
- Text recognition display
- AI response simulation
- Interactive microphone button

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Farm Management
- `POST /api/farm` - Create farm
- `GET /api/farm` - Get user's farms
- `GET /api/farm/:id` - Get single farm
- `PUT /api/farm/:id` - Update farm
- `DELETE /api/farm/:id` - Delete farm
- `POST /api/farm/:id/crop-history` - Add crop history

### AI Services
- `POST /api/ai/recommend` - Get crop recommendation
- `POST /api/ai/profit` - Calculate profit simulation

### Government Schemes
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/state/:state` - Filter by state
- `POST /api/schemes/check-eligibility` - Check farmer eligibility

### Sustainability
- `POST /api/sustainability/calculate` - Calculate sustainability score
- `GET /api/sustainability` - Get sustainability data

### Dashboard
- `GET /api/dashboard` - Get dashboard data

## Tech Stack

### Frontend
- React.js (v18)
- React Router DOM (v6)
- Axios for API calls
- Recharts for visualizations
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing
- CORS enabled

## Demo Credentials

```
Email: farmer@agro.com
Password: password123
```

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agro-nxt
JWT_SECRET=your_jwt_secret_key_change_in_production_12345
NODE_ENV=development
```

## UI Design Features

- **Theme**: Green earthy color palette
- **Layout**: Responsive sidebar navigation
- **Components**: Reusable Card, Button, Input, Select components
- **Responsive**: Mobile-first design
- **Accessibility**: Farmer-friendly interface with large buttons
- **Charts**: Interactive Recharts visualizations

## Mock AI Logic

- **Crop Recommendation**: Based on season, soil pH, and budget
- **Profit Calculation**: Crop-specific yield rates and market prices
- **Risk Scoring**: Randomized with environmental factors
- **Sustainability**: Multi-factor scoring system

## Performance Optimizations

- JWT token caching in localStorage
- Protected routes with authentication checks
- Responsive components that adapt to screen size
- Optimized database queries
- Error handling and validation

## Production Considerations

1. Change JWT_SECRET in production
2. Set NODE_ENV to production
3. Use environment-specific database URIs
4. Implement rate limiting
5. Add HTTPS
6. Implement proper error logging
7. Add input validation on frontend and backend
8. Implement refresh token rotation
9. Add request sanitization
10. Set up CORS properly for production domain

## Support

For issues or features, please refer to the main documentation or contact the development team.
