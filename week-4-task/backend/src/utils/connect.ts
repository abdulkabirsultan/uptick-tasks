import mongoose from 'mongoose';
import config from 'config';

const connectDb = async () => {
  try {
    const dbUrl = config.get<string>('dbUrl');
    await mongoose.connect(dbUrl);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
export default connectDb;
