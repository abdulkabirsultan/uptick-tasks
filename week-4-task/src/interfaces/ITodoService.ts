import { ITodo } from '../models/Todo';
import { CreateTodoInput, UpdateTodoInput } from '../validation/todoSchema';

export interface ITodoService {
  getAllTodos(): Promise<ITodo[]>;
  getTodoById(id: string): Promise<ITodo | null>;
  createTodo(todoData: CreateTodoInput): Promise<ITodo>;
  updateTodo(id: string, todoData: UpdateTodoInput): Promise<ITodo | null>;
  deleteTodo(id: string): Promise<ITodo | null>;
}
