import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // Inject the PrismaService
  async createUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    try {
      const newUser: User = await this.prisma.user.create({
        data: CreateUserDTO,
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2021') {
        throw new NotFoundException('User already exists');
      }
    }
  }

  async deleteUser(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: id },
      include: { Task: true }, // Include the associated Task for deletion
    });
    return deletedUser;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: { Task: true }, //
    });
    return users;
  }
}
