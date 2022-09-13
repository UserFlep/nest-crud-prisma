import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import {BadRequestException, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
      .setTitle('Nestjs API')
      .setDescription('API с JWT авторизацией, кешированием запросов. ORM - Sequelize, БД - postgres')
      .setVersion('1.0')
      .build();
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
