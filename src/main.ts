import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import {BadRequestException, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
      .setTitle('Nestjs API')
      .setDescription('API с JWT авторизацией, кешированием запросов. ORM - Prisma, БД - Postgres.' +
          '<div>' +
          '<b>Эндпоинты</b>:' +
          '<p>auth - Авторизация и регистрация пользователей, работы с токенами.</p>' +
          '<p>user - CRUD для пользователей.</p>' +
          '<p>tag - CRUD для тегов.</p>' +
          '<p>user/tag - CRUD для тегов пользователя. Пользователю могут назначатся теги, созданные как им самим, так и другими пользователями. У каждого тега есть создатетель.</p>' +
          '</div>' +
          '<div>' +
          '<b>Авторизация</b>:' +
          '<p>Пользователю выдается access и refresh токен. ' +
          'Refresh дополнительно сохраняется в бд для дальнейшей верификации. ' +
          'Access записывается и хранится в cookie.</p>' +
          '</div>')
      .setVersion('1.0')
      .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT Access',
            description: 'Enter JWT Access token',
            in: 'header',
          })
      .build();
// .addBearerAuth({
//             type: 'http',
//             scheme: 'bearer',
//             bearerFormat: 'JWT',
//             name: 'JWT Refresh',
//             description: 'Enter JWT Refresh token',
//             in: 'cookie',
//         },
//         'jwt-refresh')
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (errors)=>{ //Чтобы понятно было какому полю принадлежат ошибки
      const messages = errors.map(err => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`
      })
      throw new BadRequestException(messages)}
  }));
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

}
bootstrap();
