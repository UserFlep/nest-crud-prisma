import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { TokensDto } from "../tokens/dto";
import { CreateUserDto, LoginEmailUserDto } from "../users/dto/inputDtos";
import { UsersService } from "../users/users.service";
import {TokensService} from "../tokens/tokens.service"
// import {Prisma} from "@prisma/client";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private tokenService: TokensService,
  ) {}

  async registration (userDto: CreateUserDto): Promise<TokensDto> {
    const existUser = await this.usersService.findUser({
      email: userDto.email,
      nickname: userDto.nickname
    });
    if (existUser) {
      if (existUser.nickname === userDto.nickname) {
        throw new HttpException('Пользователь с таким nickname уже зарегистрирован', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST);
      }
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken({token: tokens.refreshToken, user: {connect: {uid: user.uid}}});
    return tokens;

  }

  async login (userDto: LoginEmailUserDto): Promise<TokensDto> {
    const existUser = await this.usersService.findUser({email: userDto.email});
    if(!existUser){
      throw new HttpException('Неверный логин или пароль', HttpStatus.BAD_REQUEST);
    }

    const validPassword = await bcrypt.compare(userDto.password, existUser.password);
    if (!validPassword) {
      throw new HttpException('Неверный логин или пароль', HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.tokenService.generateTokens(existUser);
    await this.tokenService.saveToken({token: tokens.refreshToken, user: {connect: {uid: existUser.uid}}});
    return tokens;
  }

  async logout (userId: string){
    await this.tokenService.removeToken({userId});
  }

  async refreshTokens (userId: string): Promise<TokensDto> {
    const user = await this.usersService.findUser({uid: userId});
    if(!user){
      throw new BadRequestException('Пользователя не существует');
    }
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken({token: tokens.refreshToken, user: {connect: {uid: user.uid}}});
    return tokens;
  }
}
