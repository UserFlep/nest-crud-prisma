import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/inputDtos"
import * as bcrypt from 'bcryptjs';
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {

  constructor(
      private prisma: PrismaService
  ) {}

  // async createUser (userDto: CreateUserDto): Promise<User>{
  //   const user = await this.userModel.create(userDto);
  //   return user;
  // }
  //
  // async getUserById (userId: string){
  //   const user = await this.userModel.findOne({
  //     where: {uid: userId},
  //     attributes: {exclude: ['uid', 'password']},
  //     include: [{
  //       model: Tag,
  //       as: 'tags',
  //       attributes: {exclude: ['creator']},
  //       through: {attributes: []}
  //     }]
  //   });
  //   return user;
  // }
  //
  // async updateUser (userId: string, userDto: UpdateUserDto): Promise<User> {
  //   const existUser = await this.findExistUser(userDto.email, userDto.nickname);
  //   if (existUser) {
  //     if (existUser.nickname === userDto.nickname) {
  //       throw new HttpException('Уже есть аккаунт с таким nickname', HttpStatus.BAD_REQUEST);
  //     } else {
  //       throw new HttpException('Уже есть аккаунт с таким email', HttpStatus.BAD_REQUEST);
  //     }
  //   }
  //   const hashPassword = await bcrypt.hash(userDto.password, 3);
  //   const [count, updatedRows] = await this.userModel.update({ ...userDto, password: hashPassword}, {
  //     where: {
  //       uid: userId
  //     },
  //     returning: ["email", "nickname"]
  //   })
  //   return updatedRows[0];
  // }
  //
  // async removeUser(userId: string){
  //   await this.userModel.destroy({where: {uid: userId}});
  // }
  //
  // async findExistUser(email: string, nickname: string): Promise<User>{
  //   const user = await this.userModel.findOne({
  //     where: {
  //       [Op.or]: [
  //         { email },
  //         { nickname }
  //       ]
  //     }
  //   })
  //   return user;
  // }
  //
  // async findUserByEmail(email: string): Promise<User>{
  //   const user = await this.userModel.findOne({
  //     where: { email }
  //   })
  //   return user;
  // }
  //
  // async findUserByNickname(nickname: string): Promise<User>{
  //   const user = await this.userModel.findOne({
  //     where: { nickname }
  //   })
  //   return user;
  // }
  //
  // async findUserById(userId: string): Promise<User>{
  //   return await this.userModel.findByPk(userId)
  // }

}
