import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtPayloadDto } from '../../tokens/dto';
import { TokensService } from "../../tokens/tokens.service";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(
    private tokenService: TokensService
  ) {
    super({
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      ignoreExpiration: false,//true
      passReqToCallback:true,
      jwtFromRequest:ExtractJwt.fromExtractors([(req:Request) => {
        const {refreshToken} = req.cookies;
        if(!refreshToken){
          return null;
        }
        return refreshToken;
      }]),
    });
  }

  // Passport гарантирует, что получаем действительный токен
  ///////////////////////////////////////////////////////////////
  // Passport создаст user объект на основе возвращаемого значения нашего validate()метода
  // и прикрепит его как свойство к Request объекту
  ///////////////////////////////////////////////////////////////
  //Здесь мы могли бы выполнить поиск в базе данных в нашем validate() методе
  // , чтобы извлечь больше информации о пользователе, в результате чего user в нашем Request.
  // Это также место, где мы можем решить выполнить дальнейшую проверку токена, например
  // , найти userId в списке отозванных токенов, что позволит нам выполнить отзыв токена.
  async validate(req:Request, payload:JwtPayloadDto){
    const refreshToken = req?.cookies?.refreshToken;
    if(!refreshToken){
      throw new UnauthorizedException('Токен не валиден');
    }
    const matchesToken = await this.tokenService.findToken({token: refreshToken});
    if(!matchesToken){
      throw new UnauthorizedException('Токен не валиден');
    }
    return payload
  }
}