import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connect() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI environment variable not defined');
    }

    console.log('Connecting to MongoDB URI:', uri.split('@')[1]); // Debug: Don't log the full URI in production

    await mongoose.connect(uri);
    const connection = mongoose.connection;

    // Events after connection is established
    connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    connection.on('error', (err) => {
      console.error('MongoDB connection error, please make sure DB is up and running: ' + err);
      process.exit(1);
    });

    connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error('Something went wrong in connecting to DB:');
    console.error(error);
  }
}
