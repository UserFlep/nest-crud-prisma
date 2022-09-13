import { Module } from '@nestjs/common';
import { UserTagsController } from './user-tags.controller';
import { UserTagsService } from './user-tags.service';
import { TokensModule } from "../tokens/tokens.module";
import { UsersModule } from "../users/users.module";
import { TagsModule } from "../tags/tags.module";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [UserTagsController],
  providers: [UserTagsService],
  imports: [
    TokensModule,
    UsersModule,
    TagsModule,
    PrismaModule
  ],
})
export class UserTagsModule {}
