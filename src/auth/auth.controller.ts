import {Body, Controller, Post, Res, Req, UseGuards, Get, BadRequestException} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { InLoginUserDto, InCreateUserDto } from "../users/dto/inputDtos";
import { AuthService } from "./auth.service";
import { JwtPayloadDto, TokensDto } from "../tokens/dto";
import { Request, Response } from 'express';
import { AtAuthGuard, RtAuthGuard } from "./guards";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  refreshCookieName = process.env.REFRESH_TOKEN_COOKIE_NAME;
  cookieOptions = {
    maxAge: Number(process.env.REFRESH_EXPIRES_IN),
    httpOnly: true
  }

  @ApiResponse({type: TokensDto})
  @ApiOperation({ summary: 'Зарегистрироваться, сохранить refresh в cookie' })
  @Post('signin') //signup
  async registration(@Body() userDto: InCreateUserDto, @Res({ passthrough: true }) res: Response):Promise<TokensDto>{
    const tokens = await this.authService.registration(userDto)
      .catch(error =>{
        throw new BadRequestException(error)
      });

    res.cookie(this.refreshCookieName, tokens.refreshToken, this.cookieOptions);
    return tokens;
  }

  @ApiResponse({type: TokensDto})
  @ApiOperation({ summary: 'Войти, сохранить refresh в cookie' })
  @Post('login')
  async login(@Body() userDto: InLoginUserDto, @Res({ passthrough: true }) res: Response):Promise<TokensDto>{
    const tokens = await this.authService.login(userDto)
      .catch(error =>{
        throw new BadRequestException(error)
      });

    res.cookie(this.refreshCookieName, tokens.refreshToken, this.cookieOptions);
    return tokens;
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({status: 201})
  @ApiOperation({ summary: 'Выйти, удалить refresh из cookie' })
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    const user = req.user as JwtPayloadDto;
    await this.authService.logout(user.uid)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    res.clearCookie(this.refreshCookieName);
  }

  @UseGuards(AtAuthGuard, RtAuthGuard)
  @ApiResponse({type: TokensDto})
  @ApiOperation({ summary: 'Обновить токен, обновить cookie' })
  @ApiBearerAuth()
  @Get('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response):Promise<TokensDto>{
    const user = req.user as JwtPayloadDto;
    const tokens = await this.authService.refreshTokens(user.uid)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    res.cookie(this.refreshCookieName, tokens.refreshToken, this.cookieOptions);
    return tokens;
  }

}
