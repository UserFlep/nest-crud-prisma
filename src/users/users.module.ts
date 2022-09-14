import { Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    PrismaModule,
  ],
  exports: [UsersService]
})
export class UsersModule {}
