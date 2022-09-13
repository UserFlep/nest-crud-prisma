import {
  BadRequestException,
  Body, CacheInterceptor,
  Controller, DefaultValuePipe, Delete,
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
    return this.tagService.createTag({...tagDto, user: {connect: {uid: user.uid}}});
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: GetTagResDto})
  @Get('/:id')
  async getTagById(@Param('id') tagId: number){
    if(isNaN(tagId)){
      throw new BadRequestException("id не валиден")
    }
    return this.tagService.findTag({id: tagId});
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: GetTagsWithFiltersResDto})
  @Get()
  async getTagsWithFilters(
    @Query() filtersDto: FiltersWhitelistDto
  ){
    // return await this.tagService.findTags({});
    return
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({type: UpdateTagResDto})
  @Put('/:id')
  async updateTag(@Param('id') tagId: number, @Body() tagDto: UpdateTagDto, @Req() req: Request){
    if(isNaN(tagId)){
      throw new BadRequestException("id не валиден")
    }
    const user = req.user as JwtPayloadDto;
    return this.tagService.updateTag({where: {id: tagId}, data: {...tagDto}},  user.uid)
  }

  @UseGuards(AtAuthGuard)
  @ApiResponse({status: 200})
  @Delete('/:id')
  async removeTag(@Param('id') tagId: number, @Req() req: Request){
    if(isNaN(tagId)){
      throw new BadRequestException("id не валиден")
    }
    const user = req.user as JwtPayloadDto;
    await this.tagService.removeTag({id: tagId}, user.uid)
  }
}
