import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    return [];
  }
}


// import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';


