import {Controller, Get, UseGuards, Req} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt.guard';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Request} from 'express';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }
}
