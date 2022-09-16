import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { PrismaService } from "src/prisma/prisma.service";
import { User, Prisma  } from "@prisma/client";

@Injectable()
export class UsersService {

  constructor(
      private prisma: PrismaService,
  ) {}

  async createUser (data: Prisma.UserCreateInput): Promise<User | null>{
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: Prisma.UserUpdateArgs): Promise<User> {
    if(params.data.password){
      const hashPassword = await bcrypt.hash(params.data.password, 3);
      params.data.password = hashPassword;
    }
    return this.prisma.user.update(params);
  }

  async removeUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    // След строка закомментирована
    // т.к. в методе logout на данный момент нет функционала кроме удаления токена из бд.
    // Это итак произойдет ( onDelete: Cascade )
    //
    // await this.authService.logout(where.uid)
    return this.prisma.user.delete({
      where,
    });
  }

  async findUser(
      params: Prisma.UserFindFirstArgsBase
  ): Promise<User | null > {
    return this.prisma.user.findFirst({
      ...params
    });
  }

}
