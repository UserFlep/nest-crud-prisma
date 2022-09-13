import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
    //Раскомментировать и изменить для prisma
    // const matchesUser = this.userService.findUserById(payload.uid);
    // if(!matchesUser){
    //   throw new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED);
    // }
    return payload
  }
}