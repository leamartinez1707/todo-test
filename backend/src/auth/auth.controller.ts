/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }


    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ) {
        try {
            return this.authService.register(registerDto)

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ) {
        try {
            return this.authService.login(loginDto)

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }


    @Post('logout')
    logout(
        @Request()
        req
    ) {
        return this.authService.logout(req)
    }

    
    @Get('me')
    @UseGuards(AuthGuard)
    profile(
        @Request()
        req,
    ) {
        return req.user
    }
}
