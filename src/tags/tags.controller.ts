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
import {ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import { AtAuthGuard } from "../auth/guards";
import {InCreateTagDto, InParamTagIdDto, InUpdateTagDto, InFiltersDto} from "./dto/inputDtos";
import { TagsService } from "./tags.service";
import { JwtPayloadDto } from "../tokens/dto";
import { Request } from "express";
import { OutCreateTagDto, OutGetTagDto, OutGetTagsWithFiltersDto, OutUpdateTagDto } from "./dto/outputDtos";

@ApiTags('Теги')
@ApiBearerAuth()
@Controller('tag')
@UseInterceptors(CacheInterceptor)
export class TagsController {

  constructor(
    private tagService: TagsService
  ) {}

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutCreateTagDto})
  @ApiOperation({ summary: 'Создать тег' })
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
  @ApiOperation({ summary: 'Получить тег' })
  @Get('/:id')
  async getTagById(@Param() getTagDto: InParamTagIdDto): Promise<OutGetTagDto>{
    const params = {
      where: {id: getTagDto.id},
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
    if(!tag){
      throw new BadRequestException("Tag not found")
    }
    return new OutGetTagDto(tag);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: OutGetTagsWithFiltersDto})
  @ApiOperation({ summary: 'Получить теги' })
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
  @ApiOperation({ summary: 'Обновить тег' })
  @Put('/:id')
  async updateTag(
      @Param() tagParamDto: InParamTagIdDto,
      @Body() tagBodyDto: InUpdateTagDto,
      @Req() req: Request
  ): Promise<OutUpdateTagDto>{
    const user = req.user as JwtPayloadDto;
    const params = {
      where: {id: tagParamDto.id},
      data: tagBodyDto,
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
  @ApiOperation({ summary: 'Удалить тег' })
  @Delete('/:id')
  async removeTag(@Param('id') tagId: number, @Req() req: Request): Promise<void>{
    const user = req.user as JwtPayloadDto;
    await this.tagService.removeTag({id: tagId}, user.uid)
      .catch(error =>{
        throw new BadRequestException(error)
      });
  }
}
