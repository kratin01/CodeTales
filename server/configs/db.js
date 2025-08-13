// configs/db.js

import mongoose from 'mongoose';


const isConnected = () => mongoose.connection.readyState === 1;

const connectDB = async () => {
  // If we're already connected, don't create a new connection
  if (isConnected()) {
    console.log('=> using existing database connection');
    return;
  }

  // If we're not connected, create a new connection
  console.log('=> using new database connection');
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/CodeTales`);
    
    // These listeners should only be attached once
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;