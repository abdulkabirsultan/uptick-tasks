import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Todo from './models/Todo';
import connectDB from './config/db';

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Sample data
const todos = [
  {
    title: 'Learn TypeScript',
    description: 'Learn TypeScript fundamentals and advanced concepts',
    completed: false,
  },
  {
    title: 'Build a REST API',
    description: 'Create a RESTful API using Express and TypeScript',
    completed: true,
  },
  {
    title: 'Learn MongoDB',
    description: 'Master MongoDB and Mongoose for Node.js',
    completed: false,
  },
];

// Import data
const importData = async () => {
  try {
    await Todo.deleteMany({});
    await Todo.insertMany(todos);
    console.log('Data imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing data', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Todo.deleteMany({});
    console.log('Data destroyed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error deleting data', error);
    process.exit(1);
  }
};

// Check command line arguments to determine action
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use -i to import data or -d to delete data');
  process.exit();
}
