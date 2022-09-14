import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
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
    orderBy?: Prisma.TagOrderByWithRelationInput[];
    include?: Prisma.TagInclude;
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    });
  }

  async createTag (data: Prisma.TagCreateInput): Promise<Tag | null>{
    return this.prisma.tag.create({
      data,
    });
  }

  async updateTag(params: {
    where: Prisma.TagWhereUniqueInput;
    data: Prisma.TagUpdateManyMutationInput;
  }, userId: string): Promise<Tag> {
    const { where, data } = params;
    //Тег с таким ид существует
    if(where.id){
      const matchesTag = await this.prisma.tag.findUnique({where: {id: where.id}})
      if(!matchesTag){
        throw new BadRequestException("Тег не найден")
      }
      //Тег обновляется создателем
      if(matchesTag.creator !== userId){
        throw new UnauthorizedException("Только создатель может изменять тег")
      }
    }
    return this.prisma.tag.update({
      data,
      where,
    });
  }

  async removeTag(where: Prisma.TagWhereUniqueInput, userId: string): Promise<Tag> {
    //Тег с таким ид существует
    if(where.id){
      const matchesTag = await this.prisma.tag.findUnique({where: {id: where.id}})
      if(!matchesTag){
        throw new BadRequestException("Тег не найден")
      }
      //Тег удаляется создателем
      if(matchesTag.creator !== userId){
        throw new UnauthorizedException("Только создатель может удалять тег")
      }
    }
    return this.prisma.tag.delete({
      where,
    });
  }

}
