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

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.UserService.deleteUser(id);
  }

  @Get()
  getUsers() {
    return this.UserService.getUsers()
  }
}
