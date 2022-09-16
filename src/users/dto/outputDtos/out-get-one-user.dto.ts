import { OmitType } from "@nestjs/swagger";
import { OutCreateTagDto } from "src/tags/dto/outputDtos";
import { UserDbDto } from "../user-db.dto";

export class OutGetOneUserDto extends OmitType(UserDbDto, ['uid', 'password'] as const){
  tags: OutCreateTagDto[]

  constructor(data) {
    super();
    this.nickname = data.nickname;
    this.email = data.nickname;
    this.tags = data.tags;
  }
}