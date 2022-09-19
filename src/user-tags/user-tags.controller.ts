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
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { OutCreateUserTagDto, OutGetUserCreatedTagsDto, OutRemoveUserTagDto } from "./dto/OutputDtos";
import { InCreateUserTagsDto, InRemoveUserTagDto } from "./dto/inputDtos";

@ApiTags('Теги пользователя')
@ApiBearerAuth()
@Controller('/user/tag')
@UseInterceptors(CacheInterceptor)
export class UserTagsController {

  constructor(
    private userTagsService: UserTagsService
  ) {}

  @ApiResponse({type: OutCreateUserTagDto})
  @ApiOperation({ summary: 'Присвоить тег пользователю' })
  @UseGuards(AtAuthGuard)
  @Post()
  async createUserTags(@Body() createUserTagsDto: InCreateUserTagsDto, @Req() req: Request): Promise<OutCreateUserTagDto>{
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
    return new OutCreateUserTagDto(userTags)
  }

  @ApiResponse({type: OutRemoveUserTagDto})
  @ApiOperation({ summary: 'Удалить тег пользователя' })
  @UseGuards(AtAuthGuard)
  @Delete('/:id')
  async removeUserTag(@Param() removeUserTagDto: InRemoveUserTagDto, @Req() req: Request): Promise<OutRemoveUserTagDto>{
    const user = req.user as JwtPayloadDto;
    const params = {
      where: {uid: user.uid},
      data: {
        tags: {
          disconnect: {id: removeUserTagDto.id}
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
    const userTags = await this.userTagsService.removeUserTag(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new OutRemoveUserTagDto(userTags);
  }

  @ApiResponse({type: OutGetUserCreatedTagsDto})
  @ApiOperation({ summary: 'Получить теги, созданные пользователем' })
  @UseGuards(AtAuthGuard)
  @Get('/my')
  async getUserCreatedTags(@Req() req: Request): Promise<OutGetUserCreatedTagsDto>{
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
    return new OutGetUserCreatedTagsDto(userCreatedTags)
  }
}
