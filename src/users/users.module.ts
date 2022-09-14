import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from "../auth/auth.module";
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
