import { Injectable } from '@nestjs/common';
import { JwtPayloadDto, TokensDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Token, User} from "@prisma/client";

@Injectable()
export class TokensService {
  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
  ) {}

  async generateTokens(user: User): Promise<TokensDto>{
    const accessExpiresIn = Number(process.env.ACCESS_EXPIRES_IN);
    const refreshExpiresIn = Number(process.env.REFRESH_EXPIRES_IN);
    const payload: JwtPayloadDto = { uid: user.uid, nickname: user.nickname, email: user.email  }
    const accessToken = await this.jwtService.signAsync(payload, {secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: accessExpiresIn});
    const refreshToken = await this.jwtService.signAsync(payload, {secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: refreshExpiresIn});
    return {
      accessToken,
      expiresIn: accessExpiresIn,
      refreshToken
    }
  }

  async saveToken (data: Prisma.TokenCreateInput): Promise<Token | null>{
    return this.prisma.token.upsert({
      create: {
        ...data,
      },
      update: {
        token: data.token
      },
      where: {
        userId: data.user.connect.uid
      }
    })
  }
  async removeToken(where: Prisma.TokenWhereUniqueInput): Promise<Token> {
    return this.prisma.token.delete({
      where,
    });
  }

  async findToken(
      tokenWhereUniqueInput: Prisma.TokenWhereUniqueInput,
  ): Promise<Token | null> {
    return this.prisma.token.findUnique({
      where: tokenWhereUniqueInput,
    });
  }

}
