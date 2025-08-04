import { Request, Response } from 'express';
import todoService from '../services/todo.service';
import { StatusCodes } from 'http-status-codes';

// Get all todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId!;
    const todos = await todoService.getAllTodos(userId);
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// Get single todo
export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId!;

    const todo = await todoService.getTodoById(req.params.id, userId);

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
      error,
    });
  }
};

// Create new todo
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId!;

    const todo = await todoService.createTodo(req.body, userId);

    res.status(StatusCodes.CREATED).json({
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
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error,
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
    const userId = req.user?.userId!;

    const todo = await todoService.updateTodo(req.params.id, req.body, userId);

    if (!todo) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      const messages = Object.values(error).map((val) => val.message);

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error,
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
    const userId = req.user?.userId!;

    const todo = await todoService.deleteTodo(req.params.id, userId);

    if (!todo) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
};
