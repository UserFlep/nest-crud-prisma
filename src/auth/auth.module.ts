import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AtStrategy, RtStrategy } from "./strategies";
import { TokensModule } from "../tokens/tokens.module";
import { PassportModule } from "@nestjs/passport";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  imports: [
    JwtModule,
    UsersModule,
    PassportModule,
    TokensModule,
    PrismaModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
