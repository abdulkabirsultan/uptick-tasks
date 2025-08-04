import { ITodo } from '../models/Todo.model';
import { CreateTodoInput, UpdateTodoInput } from '../validation/todoSchema';

export interface ITodoService {
  getAllTodos(userId: string): Promise<ITodo[]>;
  getTodoById(id: string, userId: string): Promise<ITodo | null>;
  createTodo(todoData: CreateTodoInput, userId: string): Promise<ITodo>;
  updateTodo(
    id: string,
    todoData: UpdateTodoInput,
    userId: string
  ): Promise<ITodo | null>;
  deleteTodo(id: string, userId: string): Promise<ITodo | null>;
}
