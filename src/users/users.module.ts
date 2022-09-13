import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
