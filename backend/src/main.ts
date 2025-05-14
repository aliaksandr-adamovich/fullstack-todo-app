import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Todo API')
        .setDescription('Basic todo backend with NestJS')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
