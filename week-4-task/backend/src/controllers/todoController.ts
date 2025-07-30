import { Request, Response } from 'express';
import todoService from '../services/todoService';

// Get all todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Get single todo
export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await todoService.getTodoById(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Create new todo
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoService.createTodo(req.body);

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      const messages = Object.values(error).map((val) => val.message);

      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// Update todo
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);

    if (!todo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      const messages = Object.values(error).map((val) => val.message);

      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// Delete todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
