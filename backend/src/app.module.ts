import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadEntities: true,
            synchronize: true, // только для разработки
        }),
        TodoModule,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
