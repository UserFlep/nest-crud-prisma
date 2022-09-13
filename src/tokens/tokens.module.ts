import { forwardRef, Module } from "@nestjs/common";
import { TokensService } from "./tokens.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [],
  providers: [TokensService],
  imports: [
    forwardRef(()=>UsersModule) ,
    JwtModule,
  ],
  exports: [TokensService]
})
export class TokensModule {}
