import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AtStrategy, RtStrategy } from "./strategies";
import { TokensModule } from "../tokens/tokens.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({}),
    forwardRef(() => UsersModule),
    PassportModule,
    TokensModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
