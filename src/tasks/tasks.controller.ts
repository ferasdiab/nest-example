import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { TaskModel, Status } from './taskModel';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { SearchTasks } from '../dto/search-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() searchTasks: SearchTasks) {
    return this.tasksService.getAllTasks(searchTasks);
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Post()
  createTask(@Body() CreateTaskDTO: CreateTaskDTO) {
    return this.tasksService.createTask(CreateTaskDTO);
  }

  @Patch('/:id/status')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          description: 'The status of the task',
        },
      },
      example: {
        status: 'Progress',
      },
    },
  })
  updateTask(
    @Body('status') status: Status,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }
}
