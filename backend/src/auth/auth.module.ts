import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {UserModule} from '../user/user.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        ConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
})
export class AuthModule {
}
