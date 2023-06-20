import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  getUsers() {
    return this.UserService.getNotionData();
  }

  @Post()
  createTask(@Body() CreateUserDTO: CreateUserDTO) {
    return this.UserService.createNotionRecord();
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.UserService.deleteRow();
  }

  @Put()
  updateRow() {
    return this.UserService.updateRow();
  }
}
