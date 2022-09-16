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
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AtAuthGuard, RtAuthGuard } from "../auth/guards";
import { Request, Response } from "express";
import { JwtPayloadDto } from "../tokens/dto";
import { UpdateUserDto} from "./dto/inputDtos";
import { GetOneUserResDto, UpdateUserResDto } from "./dto/outputDtos";

@ApiTags('Пользователи')
@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UsersController {

  refreshCookieName = process.env.REFRESH_TOKEN_COOKIE_NAME;

  constructor(
    private userService: UsersService,
  ) {}

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: GetOneUserResDto})
  @Get()
  async getOneUser(@Req() req: Request): Promise<GetOneUserResDto>{
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
    return new GetOneUserResDto(userWithTags);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: UpdateUserResDto})
  @Put()
  async updateUser(@Body() userDto: UpdateUserDto, @Req() req: Request): Promise<UpdateUserResDto>{
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
    return new UpdateUserResDto(updatedUser);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({status: 200})
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
