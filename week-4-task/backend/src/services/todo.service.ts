import Todo from '../models/Todo.model';
import { ITodo } from '../models/Todo.model';
import { ITodoService } from '../interfaces/ITodoService';
import { CreateTodoInput, UpdateTodoInput } from '../validation/todoSchema';

class TodoService implements ITodoService {
  async getAllTodos(userId: string): Promise<ITodo[]> {
    return await Todo.find({ createdBy: userId }).sort({ createdAt: -1 });
  }

  async getTodoById(id: string, userId: string): Promise<ITodo | null> {
    return await Todo.findOne({ _id: id, createdBy: userId });
  }

  async createTodo(todoData: CreateTodoInput, userId: string): Promise<ITodo> {
    todoData.createdBy = userId;
    return await Todo.create(todoData);
  }

  async updateTodo(
    id: string,
    todoData: UpdateTodoInput,
    userId: string
  ): Promise<ITodo | null> {
    return await Todo.findOneAndUpdate(
      { _id: id, createdBy: userId },
      todoData,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async deleteTodo(id: string, userId: string): Promise<ITodo | null> {
    const todo = await Todo.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });
    if (!todo) {
      throw new Error(
        'Todo not found or you do not have permission to delete it'
      );
    }

    return todo;
  }
}

export default new TodoService();
