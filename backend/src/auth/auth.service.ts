import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthDto} from './dto/auth.dto';
import {RegisterDto} from "./dto/register.dto";
import {UserService} from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UserService,
        private readonly jwt: JwtService,
    ) {
    }

    async validateUser(dto: AuthDto) {
        const user = await this.users.findByEmail(dto.email);
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.jwt.sign({sub: user.id, email: user.email});
    }

    async register(dto: RegisterDto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        return this.users.create({
            name: dto.name,
            email: dto.email,
            password: hashed,
        });
    }

    async login(dto: AuthDto) {
        const user = await this.users.findByEmail(dto.email);
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {access_token: this.jwt.sign({sub: user.id, email: user.email})};
    }

}
