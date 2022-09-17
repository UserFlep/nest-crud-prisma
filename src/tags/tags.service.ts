import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {Prisma, Tag} from "@prisma/client";

@Injectable()
export class TagsService {

  constructor(
      private prisma: PrismaService,
  ) {}

  async findTag(params: Prisma.TagFindUniqueArgs): Promise<Tag | null> {
      return this.prisma.tag.findUnique(params);
  }

  async findTags(params: Prisma.TagFindManyArgs): Promise<Tag[]> {
    return this.prisma.tag.findMany(params);
  }

  async getTagsCount(): Promise<number>{
    return this.prisma.tag.count();
  }

  async createTag (params: Prisma.TagCreateArgs): Promise<Tag>{
    return this.prisma.tag.create(params);
  }

  async updateTag(params: Prisma.TagUpdateArgs, userId: string): Promise<Tag> {
    const { where, data } = params;
    //Тег с таким ид существует
    if(where.id){
      const matchesTag = await this.prisma.tag.findUnique({where: {id: where.id}})
      if(!matchesTag){
        throw new BadRequestException("Tag not found")
      }
      //Тег обновляется создателем
      if(matchesTag.creator !== userId){
        throw new UnauthorizedException("Only creator can do it")
      }
    }
    return this.prisma.tag.update(params);
  }

  async removeTag(where: Prisma.TagWhereUniqueInput, userId: string): Promise<Tag> {
    //Тег с таким ид существует
    if(where.id){
      const matchesTag = await this.prisma.tag.findUnique({where: {id: where.id}})
      if(!matchesTag){
        throw new BadRequestException("Tag not found")
      }
      //Тег удаляется создателем
      if(matchesTag.creator !== userId){
        throw new UnauthorizedException("Only creator can do it")
      }
    }
    return this.prisma.tag.delete({
      where,
    });
  }

}
