/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }


  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      // create a new user with hashed password
      data: {
        name: data.name,
        email: data.email,
        password: await bcrypt.hash(data.password, 10)
      }
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

  async updateUser(id: number, data: Omit<User, "password">): Promise<User> {

    if (id !== data.id) {
      throw new Error('El id del usuario no coincide con el id de los datos enviados');
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        id: id,
        name: data.name,
        email: data.email,
      }
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
