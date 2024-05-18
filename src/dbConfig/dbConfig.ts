import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

export async function connect() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI environment variable not defined');
    }
    
    await mongoose.connect(uri);
    const connection = mongoose.connection;

    // Events after connection is established
    connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error, please make sure DB is up and running: ' + err);
      process.exit(1);
    });
  } catch (error) {
    console.log('Something went wrong in connecting to DB:');
    console.log(error);
  }
}
