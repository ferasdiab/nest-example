import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskModel, Status } from './taskModel';
import { User, Task, Prisma } from '@prisma/client';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { SearchTasks } from '../dto/search-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {} // Inject the PrismaService

  async getAllTasks(searchTasks: SearchTasks): Promise<Task[]> {
    const taskFilters: Prisma.TaskWhereInput = {};
    if (searchTasks.name) {
      taskFilters.name = searchTasks.name;
    }

    if (searchTasks.status) {
      taskFilters.status = searchTasks.status;
    }

    if (searchTasks.assineeId) {
      taskFilters.assineeId = searchTasks.assineeId;
    }
    return this.prisma.task.findMany({
      where: taskFilters,
      include: {
        assinee: true,
      },
    });
  }

  async createTask(CreateTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask: Task = await this.prisma.task.create({
      data: {
        ...CreateTaskDTO,
        status: Status.New,
      },
    });

    return newTask;
  }

  async getTask(id: string) {
    const task: Task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (task) return task;
    else throw new NotFoundException(`task with id "${id}" not found `);
  }

  async deleteTask(id: string) {
    const deleted = await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return deleted;
  }

  async updateTask(id: string, status: Status): Promise<Task> {
    const existingTask: Task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    const updatedTask: Task = await this.prisma.task.update({
      data: { status },
      where: { id },
    });
    return updatedTask;
  }
}
