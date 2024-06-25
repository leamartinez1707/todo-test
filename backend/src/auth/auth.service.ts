/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
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
            password: await bcrypt.hash(password, 10),
        })
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findUserByEmail(email)
        if (!user) throw new UnauthorizedException('Credenciales inválidas')
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) throw new UnauthorizedException('La contraseña es incorrecta')

        const payload = { email: user.email }
        const token = await this.jwtService.signAsync(payload)
        return {
            email, token
        }
    }
}
