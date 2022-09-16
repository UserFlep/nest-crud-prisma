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
import { CreateTagDto, UpdateTagDto } from "./dto/inputDtos";
import { TagsService } from "./tags.service";
import { JwtPayloadDto } from "../tokens/dto";
import { Request } from "express";
import { FiltersWhitelistDto } from "./dto/inputDtos";
import { CreateTagResDto, GetTagResDto, GetTagsWithFiltersResDto, UpdateTagResDto } from "./dto/outputDtos";

@ApiTags('Теги')
@Controller('tag')
@UseInterceptors(CacheInterceptor)
export class TagsController {

  constructor(
    private tagService: TagsService
  ) {}

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: CreateTagResDto})
  @Post()
  async createTag(@Body() tagDto: CreateTagDto, @Req() req: Request): Promise<CreateTagResDto>{
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
    return new CreateTagResDto(createdTag)
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: GetTagResDto})
  @Get('/:id')
  async getTagById(@Param('id') tagId: number): Promise<GetTagResDto>{
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
    return new GetTagResDto(tag);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: GetTagsWithFiltersResDto})
  @Get()
  async getTagsWithFilters(@Query() filtersDto: FiltersWhitelistDto): Promise<GetTagsWithFiltersResDto>{
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
    return new GetTagsWithFiltersResDto(tags, meta);
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: UpdateTagResDto})
  @Put('/:id')
  async updateTag(
      @Param('id') tagId: number,
      @Body() tagDto: UpdateTagDto,
      @Req() req: Request
  ): Promise<UpdateTagResDto>{
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
    return new UpdateTagResDto(updatedTag)
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
