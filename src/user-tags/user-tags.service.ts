import { Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {TagsService} from "../tags/tags.service";

@Injectable()
export class UserTagsService {

  constructor(
      private prisma: PrismaService,
      private tagService: TagsService
  ) {}

  //оптимизировать, чтоб исп-ся userService
  async createUserTags (userId: string, tagIds: number[]){
    return this.prisma.user.update({
      where: {uid: userId},
      data: {
        tags: {
          connect: tagIds.map(tagId => ({id: tagId}))
        }
      }
    })
  }

//оптимизировать, чтоб исп-ся userService
  async removeUserTag(userId: string, tagId: number) {
    return this.prisma.user.update({
      where: {uid: userId},
      data: {
        tags: {
          disconnect: {id: tagId}
        }
      }
    })
  }

  async findUserCreatedTags(userId: string) {
    return this.tagService.findTags({where: {creator: userId}})
  }

}
