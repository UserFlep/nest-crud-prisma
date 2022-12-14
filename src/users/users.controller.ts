import {
  BadRequestException,
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UsersService } from "./users.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { AtAuthGuard } from "../auth/guards";
import { Request, Response } from "express";
import { JwtPayloadDto } from "../tokens/dto";
import { InUpdateUserDto} from "./dto/inputDtos";
import { OutGetOneUserDto, OutUpdateUserDto } from "./dto/outputDtos";

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UsersController {

  refreshCookieName = process.env.REFRESH_TOKEN_COOKIE_NAME;

  constructor(
    private userService: UsersService,
  ) {}

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutGetOneUserDto})
  @ApiOperation({ summary: 'Получить пользователя' })
  @Get()
  async getOneUser(@Req() req: Request): Promise<OutGetOneUserDto>{
    const user = req.user as JwtPayloadDto; //req.user это распарсенный jwt payload // или <User>req.user
    const userWithTags = await this.userService.findUser({
      where: {uid: user.uid},
      select: {
        email: true,
        nickname: true,
        tags: {
          select: {
            id: true,
            name: true,
            sortOrder: true
          }
        }
      }
    })
      .catch(error =>{
        console.log(error.message)
        throw new BadRequestException(error)
      });
    return new OutGetOneUserDto(userWithTags);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutUpdateUserDto})
  @ApiOperation({ summary: 'Обновить пользователя' })
  @Put()
  async updateUser(@Body() userDto: InUpdateUserDto, @Req() req: Request): Promise<OutUpdateUserDto>{
    const user = req.user as JwtPayloadDto;
    const updatedUser = await this.userService.updateUser({
      where: {uid: user.uid},
      data: userDto,
      select: {
        nickname: true,
        email: true,
      }
    })
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new OutUpdateUserDto(updatedUser);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({status: 200})
  @ApiOperation({ summary: 'Удалить пользователя' })
  @Delete()
  async removeUser(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void>{
    const user = req.user as JwtPayloadDto;
    await this.userService.removeUser({uid: user.uid})
      .catch(error =>{
        throw new BadRequestException(error)
      });

    res.clearCookie(this.refreshCookieName);
  }

}
