import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {
    }

    @Post('register')
    @ApiOperation({ summary: 'Register new user' })
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        const user = await this.auth.register(dto);
        const token = this.auth.generateToken(user.id, user.email);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });

        return { success: true };
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.auth.login(dto);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });

        return { success: true };
    }
}
