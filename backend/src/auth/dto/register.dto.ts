import {
    IsEmail,
    IsString,
    MinLength,
    MaxLength,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

}
