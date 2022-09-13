import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
  FiltersWhitelistDto,
  UpdateTagDto,
  CreateTagDto
} from "./dto/inputDtos";
import { CreateTagResDto, GetTagResDto, GetTagsWithFiltersResDto, UpdateTagResDto } from "./dto/outputDtos";
import {Prisma, Tag} from "@prisma/client";

@Injectable()
export class TagsService {

  constructor(
      private prisma: PrismaService,
  ) {}

  async findTag(
      tagWhereUniqueInput: Prisma.TagWhereUniqueInput,
  ): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: tagWhereUniqueInput,
    });
  }

  async findTags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTag (data: Prisma.TagCreateInput): Promise<Tag | null>{
    return this.prisma.tag.create({
      data,
    });
  }

  async updateTag(params: {
    where: Prisma.TagWhereUniqueInput;
    data: Prisma.TagUpdateInput;
  }): Promise<Tag> {
    const { where, data } = params;
    return this.prisma.tag.update({
      data,
      where,
    });
  }

  async removeTag(where: Prisma.TagWhereUniqueInput): Promise<Tag> {
    return this.prisma.tag.delete({
      where,
    });
  }

}
