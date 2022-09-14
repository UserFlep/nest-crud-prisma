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

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    if(data.password){
      const hashPassword = await bcrypt.hash(data.password, 3);
      data.password = hashPassword
    }
    return this.prisma.user.update({
      data,
      where,
    });
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
      userWhereInput: Prisma.UserWhereInput,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput
    });
  }

}
