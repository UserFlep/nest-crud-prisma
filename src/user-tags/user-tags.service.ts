import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { ResCreateUserTagDto } from "./dto/OutputDtos";
import { CreateUserTagsDto } from "./dto/inputDtos";
import {PrismaService} from "../prisma.service";

@Injectable()
export class UserTagsService {

  constructor(
      private prisma: PrismaService
  ) {}

  // async createUserTags (userId: string, createUserTagsDto: CreateUserTagsDto): Promise<ResCreateUserTagDto>{
  //   const user = await this.userModel.findByPk(userId, {include: [{model: Tag, as: 'tags'}]});
  //   const tagsIsExist = user.tags.some(tag=>createUserTagsDto.tags.includes(tag.id))
  //   if(tagsIsExist){
  //     throw new BadRequestException("Операция невозможна т.к. один или несколько тегов уже присвоены пользователю");
  //   }
  //   await user.$add('tags', createUserTagsDto.tags);
  //   return await this.getAllUserTags(userId)
  // }
  //
  // async removeTagById (userId: string, tagId: number){
  //   const tag = await this.tagModel.findByPk(tagId);
  //   if(tag.creator !== userId){
  //     throw new HttpException("Только создатель может удалить тег", HttpStatus.UNAUTHORIZED)
  //   }
  //   const user = await this.userModel.findByPk(userId);
  //   await user.$remove('tags', tagId);
  //   return await this.getAllUserTags(userId);
  // }
  //
  // async getAllUserTags (userId: string){
  //   return await this.userModel.findOne({
  //     where: {uid: userId},
  //     include: [{
  //       model: Tag,
  //       as: 'tags',
  //       attributes: {exclude: ['creator']},
  //       through: {attributes: []}
  //     }],
  //     attributes: []
  //   })
  // }
  // async getUserCretedTags (userId: string){
  //   const createdTags = await this.userModel.findOne({
  //     where: {uid: userId},
  //     include: [{
  //       model: Tag,
  //       as: 'createdTags',
  //       attributes: {exclude: ['creator']}
  //     }],
  //     attributes: []
  //   })
  //   return {
  //     tags: createdTags.createdTags
  //   }
  // }

}
