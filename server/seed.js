const User = require('./models/User');
const Farm = require('./models/Farm');
const Scheme = require('./models/Scheme');
const mongoose = require('mongoose');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create demo user
    const demoUser = await User.create({
      fullName: 'Farmer Demo',
      email: 'farmer@agro.com',
      password: 'password123',
      phone: '9876543210',
      state: 'Maharashtra',
      district: 'Pune',
      landSize: 5.5,
      farmType: 'Mixed Farming',
    });

    console.log('✓ Demo user created:', demoUser.email);

    // Create demo farms
    const farms = await Farm.insertMany([
      {
        userId: demoUser._id,
        farmName: 'Green Valley Farm',
        location: 'Pune, Maharashtra',
        landSize: 3,
        soilPH: 6.8,
        nitrogen: 45,
        phosphorus: 38,
        potassium: 42,
        moisture: 65,
      },
      {
        userId: demoUser._id,
        farmName: 'Harvest Fields',
        location: 'Belgaum, Karnataka',
        landSize: 2.5,
        soilPH: 7.2,
        nitrogen: 52,
        phosphorus: 42,
        potassium: 48,
        moisture: 58,
      },
    ]);

    console.log('✓ Demo farms created:', farms.length);

    // Create demo schemes
    const schemes = [
      {
        schemeName: 'PM KISAN',
        description: 'Pradhan Mantri Kisan Samman Nidhi - Direct income support to farmers',
        minLandSize: 0,
        maxLandSize: 2,
        subsidy: 6000,
        eligibleStates: ['All States'],
        cropType: ['All Crops'],
        requirements: ['Own farm', 'Aadhaar', 'Bank Account'],
      },
      {
        schemeName: 'Soil Health Card Scheme',
        description: 'Free soil testing and nutrient management',
        minLandSize: 0,
        maxLandSize: 10,
        subsidy: 0,
        eligibleStates: ['All States'],
        cropType: ['All Crops'],
        requirements: ['Farm verification', 'Soil sample'],
      },
      {
        schemeName: 'Pradhan Mantri Fasal Bima Yojana',
        description: 'Crop insurance for all registered farmers',
        minLandSize: 0,
        maxLandSize: 5,
        subsidy: 50,
        eligibleStates: ['All States'],
        cropType: ['Rice', 'Wheat', 'Cotton', 'Sugarcane'],
        requirements: ['Farm details', 'Crop selection', 'Premium payment'],
      },
    ];

    await Scheme.insertMany(schemes);
    console.log('✓ Demo schemes created:', schemes.length);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('Email: farmer@agro.com');
    console.log('Password: password123');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
