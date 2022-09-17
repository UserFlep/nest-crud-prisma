import {CacheModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import {UsersModule} from "./users/users.module";
import {TokensModule} from "./tokens/tokens.module";
import {AuthModule} from "./auth/auth.module";
import {UserTagsModule} from "./user-tags/user-tags.module";
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `.env.${process.env.NODE_ENV}`,
    //   expandVariables: true,
    // }),
    CacheModule.register({
      isGlobal: true
    }),
    UsersModule,
    TagsModule,
    AuthModule,
    UserTagsModule,
    TokensModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
