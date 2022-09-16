import {
  BadRequestException,
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

  @UseGuards(AtAuthGuard)
  @Post()
  async createUserTags(@Body() createUserTagsDto: CreateUserTagsDto, @Req() req: Request): Promise<ResCreateUserTagDto>{
    const user = req.user as JwtPayloadDto;
    const params = {
      where: {uid: user.uid},
      data: {
        tags: {
          connect: createUserTagsDto.tags.map(tagId => ({id: tagId}))
        }
      },
      select: {
        tags: {
          select: {
            id: true,
            name: true,
            sortOrder: true
          }
        }
      }
    }
    const userTags = await this.userTagsService.createUserTags(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new ResCreateUserTagDto(userTags)
  }

  @UseGuards(AtAuthGuard)
  @Delete('/:id')
  async removeUserTag(@Param() removeUserTagDto: RemoveUserTagDto, @Req() req: Request): Promise<ResRemoveUserTagDto>{
    const user = req.user as JwtPayloadDto;
    const params = {
      where: {uid: user.uid},
      data: {
        tags: {
          disconnect: {id: removeUserTagDto.id}
        }
      }
    }
    const userTags = await this.userTagsService.removeUserTag(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new ResRemoveUserTagDto(userTags);
  }

  @UseGuards(AtAuthGuard)
  @Get('/my')
  async getUserCreatedTags(@Req() req: Request): Promise<ResGetUserCreatedTagsDto>{
    const user = req.user as JwtPayloadDto;
    const params = {
      where: {creator: user.uid},
      select: {
        id: true,
        name: true,
        sortOrder: true
      }
    };
    const userCreatedTags = await this.userTagsService.findUserCreatedTags(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new ResGetUserCreatedTagsDto(userCreatedTags)
  }
}
