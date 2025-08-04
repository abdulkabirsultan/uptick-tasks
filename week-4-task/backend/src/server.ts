import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import todoRoutes from './routes/todo.route';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middleware/errorHandler';
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Todo API is running...');
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
