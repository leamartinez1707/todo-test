/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAllUsers();

    } catch (error) {
      throw new BadRequestException('Error al buscar los usuarios');
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const userFound = await this.usersService.findOneUser(+id);
      if (!userFound) throw new NotFoundException('El usuario no se encontró');
      return {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,

      }
    } catch (error) {
      throw new NotFoundException('Error al buscar el usuario');
    }
  }

  @Post()
  async create(@Body() user: User) {
    try {
      // Verificar si el usuario ya existe
      const userFound = await this.usersService.findUserByEmail(user.email);
      if (userFound) throw new BadRequestException('El usuario ya existe')
      else {
        const createdUser = await this.usersService.createUser(user);
        return createdUser;
      }
    } catch (error) {
      // Si el usuario ya existe enviamos una response con un mensaje personalizado
      throw new BadRequestException(error.message === 'El usuario ya existe' ? error.message : 'El usuario no se pudo crear');
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUser: User) {
    try {
      const updatedUser = await this.usersService.updateUser(+id, updateUser);
      return updatedUser
    } catch (error) {
      throw new BadRequestException('El usuario no se pudo actualizar');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.removeUser(+id);
    } catch (error) {
      throw new NotFoundException('El usuario no se pudo eliminar');
    }
  }
}
