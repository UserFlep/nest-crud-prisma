import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TokensModule } from "../tokens/tokens.module";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
    TokensModule,
    PrismaModule
  ],
  exports: [TagsService]
})
export class TagsModule {}
