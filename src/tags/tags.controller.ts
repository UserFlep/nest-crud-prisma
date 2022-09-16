import {
  BadRequestException,
  Body, CacheInterceptor,
  Controller, Delete,
  Get,
  Param,
  Post, Put,
  Query,
  Req,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AtAuthGuard } from "../auth/guards";
import { InCreateTagDto, InUpdateTagDto } from "./dto/inputDtos";
import { TagsService } from "./tags.service";
import { JwtPayloadDto } from "../tokens/dto";
import { Request } from "express";
import { InFiltersDto } from "./dto/inputDtos";
import { OutCreateTagDto, OutGetTagDto, OutGetTagsWithFiltersDto, OutUpdateTagDto } from "./dto/outputDtos";

@ApiTags('Теги')
@Controller('tag')
@UseInterceptors(CacheInterceptor)
export class TagsController {

  constructor(
    private tagService: TagsService
  ) {}

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutCreateTagDto})
  @Post()
  async createTag(@Body() tagDto: InCreateTagDto, @Req() req: Request): Promise<OutCreateTagDto>{
    const user = req.user as JwtPayloadDto;
    const params = {
      data: {
        ...tagDto,
        user: {connect: {uid: user.uid}}
      },
      select: {
        id: true,
        name: true,
        sortOrder: true
      }
    }
    const createdTag = await this.tagService.createTag(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new OutCreateTagDto(createdTag)
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutGetTagDto})
  @Get('/:id')
  async getTagById(@Param('id') tagId: number): Promise<OutGetTagDto>{
    const params = {
      where: {id: tagId},
      select: {
        name: true,
        sortOrder: true,
        user: {
          select: {
            uid: true,
            nickname: true,
          }
        }
      }
    };
    const tag = await this.tagService.findTag(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new OutGetTagDto(tag);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutGetTagsWithFiltersDto})
  @Get()
  async getTagsWithFilters(@Query() filtersDto: InFiltersDto): Promise<OutGetTagsWithFiltersDto>{
    const orderBy = [];
    filtersDto.sortByOrder && orderBy.push({sortOrder: 'asc'})
    filtersDto.sortByName && orderBy.push({name: 'asc'})

    const params = {
      orderBy: orderBy.length !== 0 ? orderBy : undefined,
      take: filtersDto.length,
      skip: filtersDto.offset,
      select: {
        name: true,
        sortOrder: true,
        user: {
          select: {
            uid: true,
            nickname: true,
          }
        }
      }
    }

    const tags = await this.tagService.findTags(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    const tagsCount = await this.tagService.getTagsCount();
    const meta = {
      offset: filtersDto.offset,
      length: filtersDto.length,
      quantity: tagsCount
    }
    return new OutGetTagsWithFiltersDto(tags, meta);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutUpdateTagDto})
  @Put('/:id')
  async updateTag(
      @Param('id') tagId: number,
      @Body() tagDto: InUpdateTagDto,
      @Req() req: Request
  ): Promise<OutUpdateTagDto>{
    const user = req.user as JwtPayloadDto;
    const params = {
      where: {id: tagId},
      data: tagDto,
      select: {
        name: true,
        sortOrder: true,
        user: {
          select: {
            uid: true,
            nickname: true,
          }
        }
      }
    }
    const updatedTag = await this.tagService.updateTag(params, user.uid)
      .catch(error =>{
        throw new BadRequestException(error)
      });
    return new OutUpdateTagDto(updatedTag)
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({status: 200})
  @Delete('/:id')
  async removeTag(@Param('id') tagId: number, @Req() req: Request): Promise<void>{
    const user = req.user as JwtPayloadDto;
    await this.tagService.removeTag({id: tagId}, user.uid)
      .catch(error =>{
        throw new BadRequestException(error)
      });
  }
}
