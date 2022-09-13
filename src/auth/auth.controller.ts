import { Body, Controller, Post, Headers, Res, Req, UseGuards, Get } from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginEmailUserDto, CreateUserDto } from "../users/dto/inputDtos";
import { AuthService } from "./auth.service";
import { JwtPayloadDto, TokensDto } from "../tokens/dto";
import { Request, Response } from 'express';
import { AtAuthGuard, RtAuthGuard } from "./guards";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  refreshCookieName = 'refreshToken';
  cookieOptions = {
    maxAge: Number(process.env.REFRESH_EXPIRES_IN),
    httpOnly: true
  }

  @ApiResponse({type: TokensDto})
  @Post('signin') //signup
  async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response):Promise<TokensDto>{
    const tokens = await this.authService.registration(userDto);
    res.cookie(this.refreshCookieName, tokens.refreshToken, this.cookieOptions);
    return tokens;
  }

  @ApiResponse({type: TokensDto})
  @Post('login')
  async login(@Body() userDto: LoginEmailUserDto, @Res({ passthrough: true }) res: Response):Promise<TokensDto>{
    const tokens = await this.authService.login(userDto);
    res.cookie(this.refreshCookieName, tokens.refreshToken, this.cookieOptions);
    return tokens;
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({status: 201})
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    const user = req.user as JwtPayloadDto;
    await this.authService.logout(user.uid);
    res.clearCookie(this.refreshCookieName);
  }

  @UseGuards(RtAuthGuard)
  @ApiResponse({type: TokensDto})
  @Get('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response):Promise<TokensDto>{
    const user = req.user as JwtPayloadDto;
    const tokens = await this.authService.refreshTokens(user.uid);
    res.cookie(this.refreshCookieName, tokens.refreshToken, this.cookieOptions);
    return tokens;
  }

}
