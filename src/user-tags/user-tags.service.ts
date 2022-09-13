import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { ResCreateUserTagDto } from "./dto/OutputDtos";
import { CreateUserTagsDto } from "./dto/inputDtos";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, UserTag} from "@prisma/client";

@Injectable()
export class UserTagsService {

  constructor(
      private prisma: PrismaService
  ) {}

  async createUserTags (data: Prisma.UserTagCreateInput): Promise<UserTag | null>{
    return this.prisma.userTag.create({
      data,
    });
  }

  async removeUserTag(where: Prisma.UserTagWhereUniqueInput): Promise<UserTag> {
    return this.prisma.userTag.delete({
      where,
    });
  }

  async findUserTags(userId: string): Promise<UserTag[]> {
    return this.prisma.userTag.findMany({
      where: {userId}
    });
  }

  async findUserCreatedTags(userId: string): Promise<UserTag[]> {
    return this.prisma.userTag.findMany({
      where: {
        userId
      }
    });
  }

}
