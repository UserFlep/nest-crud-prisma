import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {
  FiltersWhitelistDto,
  UpdateTagDto,
  CreateTagDto
} from "./dto/inputDtos";
import { CreateTagResDto, GetTagResDto, GetTagsWithFiltersResDto, UpdateTagResDto } from "./dto/outputDtos";

@Injectable()
export class TagsService {

  constructor(
      private prisma: PrismaService,
  ) {}

  // async createTag(tagDto: CreateTagDto, userId: string): Promise<CreateTagResDto>{
  //   const matchesTag = await this.tagModel.findOne({where: {name: tagDto.name}})
  //   if(matchesTag){
  //     throw new HttpException("Такой тег уже существует", HttpStatus.BAD_REQUEST)
  //   }
  //   const tag: TagCreationAttributes = {...tagDto, creator: userId};
  //   const createdTag = await this.tagModel.create(tag); //удаление "creator" из ответа опцией {returning: ['id','name','sortOrder']} почему-то не работает, запрос формируется правильный, ответ приходит неправильный
  //   return {
  //     id: createdTag.id,
  //     name: createdTag.name,
  //     sortOrder: createdTag.sortOrder
  //   };
  // }
  //
  // async getTagById(tagId: string): Promise<GetTagResDto>{
  //   const tag = await this.tagModel.findOne({
  //     where: {id: tagId},
  //     include: [{ model: User, as: 'user', attributes: {exclude: ['password','email']}}],
  //     attributes: {exclude: ['id', 'creator']}
  //   })
  //   return {
  //     creator: {
  //       uid: tag.user.uid,
  //       nickname: tag.user.nickname
  //     },
  //     name: tag.name,
  //     sortOrder: tag.sortOrder
  //   }
  // }
  //
  // async getTagsWithFilters(tagQueryDto: FiltersWhitelistDto): Promise<GetTagsWithFiltersResDto>{
  //   const orderFields:string[] = [];
  //   tagQueryDto.sortByName && orderFields.push('name')
  //   tagQueryDto.sortByOrder && orderFields.push('sortOrder')
  //
  //   const count = await this.tagModel.count();
  //   const tags = await this.tagModel.findAll({
  //     order: orderFields,
  //     limit: tagQueryDto.length,
  //     offset: tagQueryDto.offset,
  //     include: [{ model: User, as: 'user', attributes: {exclude: ['password','email']}}],
  //     attributes: {exclude: ['id', 'creator']}
  //   })
  //
  //   //переименовываем user в creator
  //   for(let tag of tags){
  //     Object.defineProperty(tag['dataValues'], 'creator',
  //       Object.getOwnPropertyDescriptor(tag['dataValues'], 'user'));
  //     delete tag['dataValues'].user;
  //   }
  //
  //   return {
  //     data: tags as unknown as GetTagResDto[],
  //     meta: {
  //       offset: tagQueryDto.offset,
  //       length: tagQueryDto.length,
  //       quantity: count
  //     }
  //   }
  // }
  //
  // async updateTag(userid: string, tagId: number, tagDto: UpdateTagDto): Promise<UpdateTagResDto>{
  //   //Тег с таким ид существует
  //   const matchesTag = await this.tagModel.findByPk(tagId);
  //   if(!matchesTag){
  //     throw new HttpException("Тег не найден", HttpStatus.BAD_REQUEST)
  //   }
  //   //Устанавливаемое имя тега не занято
  //   const equalTag = await this.tagModel.findOne({
  //     where: {name: tagDto.name}
  //   });
  //   if(equalTag){
  //     throw new HttpException("Имя тега занято", HttpStatus.BAD_REQUEST)
  //   }
  //   //Тег обновляется создателем
  //   if(matchesTag.creator !== userid){
  //     throw new HttpException("Только создатель может изменть тег", HttpStatus.UNAUTHORIZED)
  //   }
  //
  //   await this.tagModel.update(tagDto, {
  //     where: {id: tagId},
  //     returning: false,
  //   });
  //   const tag = await this.tagModel.findOne({
  //     where: {id: tagId},
  //     include: [{model: User, as: 'user', attributes: {exclude: ['email']}}],
  //     attributes: {exclude: ['id', 'creator']}
  //   })
  //   return {
  //     creator: {
  //       uid: tag.user.uid,
  //       nickname: tag.user.nickname
  //     },
  //     name: tag.name,
  //     sortOrder: tag.sortOrder
  //   }
  // }
  //
  // async removeTag(tagId: number, userId: string){
  //   const matchesTag = await this.tagModel.findByPk(tagId)
  //   //Тег с таким ид существует
  //   if(!matchesTag){
  //     throw new HttpException("Тег не найден", HttpStatus.BAD_REQUEST)
  //   }
  //   //Тег удаляется создателем
  //   if(matchesTag.creator !== userId){
  //     throw new HttpException("Только создатель может изменять тег", HttpStatus.UNAUTHORIZED)
  //   }
  //   await this.tagModel.destroy({where: {id: tagId}})
  // }

}
