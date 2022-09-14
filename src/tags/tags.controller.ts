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
  async createTag(@Body() tagDto: CreateTagDto, @Req() req: Request){
    const user = req.user as JwtPayloadDto;
    return await this.tagService.createTag({...tagDto, user: {connect: {uid: user.uid}}})
      .catch(error =>{
        throw new BadRequestException(error)
      });
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: GetTagResDto})
  @Get('/:id')
  async getTagById(@Param('id') tagId: number){
    return await this.tagService.findTag({id: tagId})
      .catch(error =>{
        throw new BadRequestException(error)
      });
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: GetTagsWithFiltersResDto})
  @Get()
  async getTagsWithFilters(
    @Query() filtersDto: FiltersWhitelistDto
  ){
    const orderBy = [];
    filtersDto.sortByOrder && orderBy.push({sortOrder: 'asc'})
    filtersDto.sortByName && orderBy.push({name: 'asc'})

    const params = {
      orderBy: orderBy.length !== 0 ? orderBy : undefined,
      take: filtersDto.length,
      skip: filtersDto.offset,
    }

    return await this.tagService.findTags(params)
      .catch(error =>{
        throw new BadRequestException(error)
      });
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: UpdateTagResDto})
  @Put('/:id')
  async updateTag(@Param('id') tagId: number, @Body() tagDto: UpdateTagDto, @Req() req: Request){
    const user = req.user as JwtPayloadDto;
    const updateParams = {
      where: {id: tagId},
      data: tagDto
    }
    return await this.tagService.updateTag(updateParams, user.uid)
      .catch(error =>{
        throw new BadRequestException(error)
      });
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({status: 200})
  @Delete('/:id')
  async removeTag(@Param('id') tagId: number, @Req() req: Request){
    const user = req.user as JwtPayloadDto;
    return await this.tagService.removeTag({id: tagId}, user.uid)
      .catch(error =>{
        throw new BadRequestException(error)
      });
  }
}
