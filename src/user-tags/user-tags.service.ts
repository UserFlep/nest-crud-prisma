import { Injectable} from "@nestjs/common";
import {TagsService} from "../tags/tags.service";
import {UsersService} from "../users/users.service";
import {Prisma, Tag, User} from "@prisma/client";

@Injectable()
export class UserTagsService {

  constructor(
      private tagService: TagsService,
      private userService: UsersService
  ) {}

  async createUserTags (params: Prisma.UserUpdateArgs): Promise<User>{
    return this.userService.updateUser(params)
  }

  async removeUserTag(params: Prisma.UserUpdateArgs): Promise<User> {
    return this.userService.updateUser(params)
  }

  async findUserCreatedTags(params: Prisma.TagFindManyArgs): Promise<Tag[]> {
    return this.tagService.findTags(params)
  }

}
