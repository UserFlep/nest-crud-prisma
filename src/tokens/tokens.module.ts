import { Module } from "@nestjs/common";
import { TokensService } from "./tokens.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [],
  providers: [TokensService],
  imports: [
    UsersModule,
    JwtModule,
    PrismaModule
  ],
  exports: [TokensService]
})
export class TokensModule {}
