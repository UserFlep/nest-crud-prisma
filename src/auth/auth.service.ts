import {BadRequestException, Injectable} from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { TokensDto } from "../tokens/dto";
import { CreateUserDto, LoginEmailUserDto } from "../users/dto/inputDtos";
import { UsersService } from "../users/users.service";
import {TokensService} from "../tokens/tokens.service"

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private tokenService: TokensService,
  ) {}

  async registration (userDto: CreateUserDto): Promise<TokensDto> {
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken({token: tokens.refreshToken, user: {connect: {uid: user.uid}}});
    return tokens;
  }

  async login (userDto: LoginEmailUserDto): Promise<TokensDto> {

      const validUser = await this.usersService.findUser({where: {email: userDto.email}});
      if(!validUser){
        throw new BadRequestException('Неверный логин или пароль');
      }

      const validPassword = await bcrypt.compare(userDto.password, validUser.password);
      if (!validPassword) {
        throw new BadRequestException('Неверный логин или пароль');
      }

      const tokens = await this.tokenService.generateTokens(validUser);
      await this.tokenService.saveToken({
        token: tokens.refreshToken,
        user: {connect: {uid: validUser.uid}}
      });

      return tokens;
  }

  async logout (userId: string){
    await this.tokenService.removeToken({userId})
  }

  async refreshTokens (userId: string): Promise<TokensDto> {
    const user = await this.usersService.findUser({where: {uid: userId}});
    if(!user){
      throw new BadRequestException('Пользователя не существует');
    }
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken({
      token: tokens.refreshToken,
      user: {connect: {uid: user.uid}}
    })

    return tokens;
  }
}
