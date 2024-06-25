/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }


  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneUser(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data
    });
  }

  async removeUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
