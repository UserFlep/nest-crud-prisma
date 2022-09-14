import {BadGatewayException, BadRequestException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, UserTag} from "@prisma/client";
import {TagsService} from "../tags/tags.service";

@Injectable()
export class UserTagsService {

  constructor(
      private prisma: PrismaService,
      private tagServiсe: TagsService
  ) {}

  async createUserTags (data:Prisma.UserTagCreateManyInput[]){
    try {
        return await this.prisma.userTag.createMany({
          data,
        })
    } catch (error) {
      // console.log(error)
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   switch (error.code) {
      //     case 'P2002':
      //       throw new BadRequestException("Добавляемые записи уже существуют")
      //     case 'P2003':
      //       throw new BadRequestException("Добавляемые данные не валидны")
      //     default:
      //       throw new BadRequestException("Непредвиденная ошибка валидации")
      //   }
      // }
      throw new BadRequestException(error)
    }
  }

  async removeUserTag(where: Prisma.UserTagWhereUniqueInput): Promise<UserTag> {
    try {
      return await this.prisma.userTag.delete({
        where,
      });
    }catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findUserTags(userId: string) {
    try {
      return await this.tagServiсe.findTags({where: {creator: userId}})
    }catch (error) {
      throw new BadRequestException(error)
    }
  }

}
