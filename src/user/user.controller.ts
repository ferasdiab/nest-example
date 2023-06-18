import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post()
  createTask(@Body() CreateUserDTO: CreateUserDTO) {
    return this.UserService.createUser(CreateUserDTO);
  }

  @Get()
  getUsers() {
    return [];
  }
}
