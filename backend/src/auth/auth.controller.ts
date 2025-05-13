import {Controller, Post, Body} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthDto} from './dto/auth.dto';
import {ApiTags, ApiOperation} from '@nestjs/swagger';
import {RegisterDto} from "./dto/register.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {
    }

    @Post('register')
    @ApiOperation({summary: 'Register new user'})
    register(@Body() dto: RegisterDto) {
        return this.auth.register(dto);
    }

    @Post('login')
    @ApiOperation({summary: 'Login and get JWT token'})
    login(@Body() dto: AuthDto) {
        return this.auth.validateUser(dto);
    }
}
