import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AtAuthGuard, RtAuthGuard } from "../auth/guards";
import { Request, Response } from "express";
import { AuthService } from "../auth/auth.service";
import { JwtPayloadDto } from "../tokens/dto";
import { UpdateUserDto } from "./dto/inputDtos";
import { GetOneUserResDto, UpdateUserResDto } from "./dto/outputDtos";
import { UpdateTagResDto } from "../tags/dto/outputDtos";

@ApiTags('Пользователи')
@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UsersController {

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}
  //
  // @UseGuards(AtAuthGuard)
  // @ApiResponse({type: GetOneUserResDto})
  // @Get()
  // async getOneUser(@Req() req: Request): Promise<GetOneUserResDto>{
  //   const user = req.user as JwtPayloadDto; //req.user это распарсенный jwt payload // или <User>req.user
  //   return await this.userService.getUserById(user.uid);
  // }
  //
  // @UseGuards(AtAuthGuard)
  // @ApiResponse({type: UpdateUserResDto})
  // @Put()
  // async updateUser(@Body() userDto: UpdateUserDto, @Req() req: Request): Promise<UpdateUserResDto>{
  //   const user = req.user as JwtPayloadDto;
  //   return await this.userService.updateUser(user.uid, userDto);
  // }
  //
  // @UseGuards(AtAuthGuard)
  // @ApiResponse({status: 200})
  // @Delete()
  // async removeUser(@Req() req: Request, @Res({ passthrough: true }) res: Response){
  //   const user = req.user as JwtPayloadDto;
  //   await this.authService.logout(user.uid); // по факту просто удаляет токен из бд, необязательно т.к. токен итак удалится каскадно при удалении юзера, но можно добавить доп. логику в logout
  //   await this.userService.removeUser(user.uid);
  //   res.clearCookie('refreshToken');
  // }

}
