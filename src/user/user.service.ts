import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // Inject the PrismaService
  async createUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    const newUser: User = await this.prisma.user.create({
      data: CreateUserDTO,
    });

    return newUser;
  }
}
