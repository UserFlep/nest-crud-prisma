import { Injectable } from '@nestjs/common';
import { JwtPayloadDto, TokensDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import {PrismaService} from "../prisma.service";

@Injectable()
export class TokensService {
  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
  ) {}

  // async generateTokens(user: User): Promise<TokensDto>{
  //   const accessExpiresIn = Number(process.env.ACCESS_EXPIRES_IN);
  //   const refreshExpiresIn = Number(process.env.REFRESH_EXPIRES_IN);
  //   const payload: JwtPayloadDto = { uid: user.uid, nickname: user.nickname, email: user.email  }
  //   const accessToken = await this.jwtService.signAsync(payload, {secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: accessExpiresIn});
  //   const refreshToken = await this.jwtService.signAsync(payload, {secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: refreshExpiresIn});
  //
  //   return {
  //     accessToken,
  //     expiresIn: accessExpiresIn,
  //     refreshToken
  //   }
  // }
  //
  // async saveToken(userId, refreshToken): Promise<Token>{
  //   const existsToken = await this.tokenModel.findOne({where: {userId}});
  //
  //   if(existsToken){
  //     existsToken.token = refreshToken;
  //     await existsToken.save();
  //     return existsToken;
  //   }
  //
  //   return await this.tokenModel.create({userId, token: refreshToken});
  // }
  //
  // async removeToken(userId: string): Promise<void>{
  //   await this.tokenModel.destroy({where: {userId}});
  // }
  //
  // async findToken(refreshToken: string): Promise<Token>{
  //   return await this.tokenModel.findOne({where: {token: refreshToken}});
  // }

}
