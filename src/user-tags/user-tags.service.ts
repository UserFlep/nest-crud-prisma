import { Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, UserTag} from "@prisma/client";
import {TagsService} from "../tags/tags.service";

@Injectable()
export class UserTagsService {

  constructor(
      private prisma: PrismaService,
      private tagService: TagsService
  ) {}

  async createUserTags (data:Prisma.UserTagCreateManyInput[]){
    return this.prisma.userTag.createMany({
      data,
    })
  }

  async removeUserTag(where: Prisma.UserTagWhereUniqueInput): Promise<UserTag> {
    return this.prisma.userTag.delete({
      where,
    });
  }

  async findUserCreatedTags(userId: string) {
    return this.tagService.findTags({where: {creator: userId}})
  }

}
