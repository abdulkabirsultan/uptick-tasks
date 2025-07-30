import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
    await mongoose.connect(mongoURI);
    console.log('Database connected successfully...');
  } catch (err) {
    console.error('Failed to connect to MongoDB database', err);
    process.exit(1);
  }
};

export default connectDB;
