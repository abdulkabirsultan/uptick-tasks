import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './createTaskDto';
import { UpdateTaskDto } from './updateTaskDto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private task: typeof Task) {}
  getTasks() {
    return this.task.findAll();
  }

  async addTask(createTaskDto: CreateTaskDto) {
    return this.task.create({ ...createTaskDto });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.task.update(updateTaskDto, { where: { id } });
  }

  async deleteTask(id: number) {
    const task = await this.task.findByPk(id);
    if (task) {
      await task.destroy();
      return { message: 'Task deleted successfully' };
    }
    throw new Error('Task not found');
  }
}
