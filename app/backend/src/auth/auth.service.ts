/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register({ email, password, name }: RegisterDto) {
        const userExists = await this.usersService.findUserByEmail(email)
        if (userExists) throw new BadRequestException('El email ya está en uso')
        return await this.usersService.createUser({
            name,
            email,
            password,
        })
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findUserByEmail(email)
        if (!user) throw new UnauthorizedException('Credenciales inválidas')
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) throw new UnauthorizedException('La contraseña es incorrecta')

        const payload = { id: user.id, email: user.email, name: user.name }

        return {
            token: await this.jwtService.signAsync(payload)
        }
    }

    //Create a logout method
    async logout(req) {
        req.user = null
        req.token = null
        return { message: 'Logged out' }
    }
}
