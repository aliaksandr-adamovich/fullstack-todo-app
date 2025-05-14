import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UserService,
        private readonly jwt: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.users.findByEmail(dto.email);
        if (existing) {
            throw new UnauthorizedException('Email уже зарегистрирован');
        }

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = await this.users.create({
            name: dto.name,
            email: dto.email,
            password: hashed,
        });

        return user;
    }

    async login(dto: AuthDto) {
        const user = await this.users.findByEmail(dto.email);
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateToken(user.id, user.email);
    }

    generateToken(userId: number, email: string): string {
        return this.jwt.sign({ sub: userId, email });
    }
}
