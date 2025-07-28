import Todo from '../models/Todo';
import { ITodo } from '../models/Todo';
import { ITodoService } from '../interfaces/ITodoService';
import { CreateTodoInput, UpdateTodoInput } from '../validation/todoSchema';

class TodoService implements ITodoService {
  async getAllTodos(): Promise<ITodo[]> {
    return await Todo.find().sort({ createdAt: -1 });
  }

  async getTodoById(id: string): Promise<ITodo | null> {
    return await Todo.findById(id);
  }

  async createTodo(todoData: CreateTodoInput): Promise<ITodo> {
    return await Todo.create(todoData);
  }

  async updateTodo(
    id: string,
    todoData: UpdateTodoInput
  ): Promise<ITodo | null> {
    return await Todo.findByIdAndUpdate(id, todoData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTodo(id: string): Promise<ITodo | null> {
    const todo = await Todo.findById(id);
    if (todo) {
      await todo.deleteOne();
    }
    return todo;
  }
}

export default new TodoService();
