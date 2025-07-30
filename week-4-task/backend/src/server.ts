import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middleware/errorHandler';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Todo API is running...');
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
