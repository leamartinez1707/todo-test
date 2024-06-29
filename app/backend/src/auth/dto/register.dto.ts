import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @Transform(({ value }) => value.trim())
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}