import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtPayloadDto } from "../../tokens/dto";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(
    private userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<JwtPayloadDto> {
    const matchesUser = await this.userService.findUser({where: {uid: payload.uid}});
    if(!matchesUser){
      throw new UnauthorizedException('Токен не валиден');
    }
    return payload
  }
}