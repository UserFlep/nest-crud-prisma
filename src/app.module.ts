import {CacheModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import {UsersModule} from "./users/users.module";
import {TokensModule} from "./tokens/tokens.module";
import {AuthModule} from "./auth/auth.module";
import {UserTagsModule} from "./user-tags/user-tags.module";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.NODE_ENV}.env`,
    // }),
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: Number(process.env.POSTGRES_PORT),
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DB,
    //   models: [User, Tag, UserTags, Token],
    //   autoLoadModels: true,
    // }),
    CacheModule.register({
      isGlobal: true
    }),
    UsersModule,
    TagsModule,
    AuthModule,
    UserTagsModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
