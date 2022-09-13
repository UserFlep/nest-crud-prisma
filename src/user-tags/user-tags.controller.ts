import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AtAuthGuard } from "../auth/guards";
import {Request} from "express";
import { JwtPayloadDto } from "../tokens/dto";
import { UserTagsService } from "./user-tags.service";
import { ApiTags } from "@nestjs/swagger";
import { ResCreateUserTagDto, ResGetUserCreatedTagsDto, ResRemoveUserTagDto } from "./dto/OutputDtos";
import { CreateUserTagsDto, RemoveUserTagDto } from "./dto/inputDtos";

@ApiTags('Теги пользователя')
@Controller('/user/tag')
@UseInterceptors(CacheInterceptor)
export class UserTagsController {

  constructor(
    private userTagsService: UserTagsService
  ) {}

  // @UseGuards(AtAuthGuard)
  // @Post()
  // async createUserTags(@Body() createUserTagsDto: CreateUserTagsDto, @Req() req: Request): Promise<ResCreateUserTagDto>{
  //   const user = req.user as JwtPayloadDto;
  //   return await this.userTagsService.createUserTags(user.uid, createUserTagsDto);
  // }
  //
  // @UseGuards(AtAuthGuard)
  // @Delete('/:id')
  // async removeUserTag(@Param() removeUserTagDto: RemoveUserTagDto, @Req() req: Request): Promise<ResRemoveUserTagDto>{
  //   const user = req.user as JwtPayloadDto;
  //   return await this.userTagsService.removeTagById(user.uid, removeUserTagDto.id);
  // }
  //
  // @UseGuards(AtAuthGuard)
  // @Get('/my')
  // async getUserCreatedTags(@Req() req: Request): Promise<ResGetUserCreatedTagsDto>{
  //   const user = req.user as JwtPayloadDto;
  //   return await this.userTagsService.getUserCretedTags(user.uid);
  // }
}
