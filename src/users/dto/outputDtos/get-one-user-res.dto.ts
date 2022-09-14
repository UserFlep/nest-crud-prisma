import { OmitType } from "@nestjs/swagger";
import { CreateTagResDto } from "src/tags/dto/outputDtos";
import { UserDbDto } from "../user-db.dto";

export class GetOneUserResDto extends OmitType(UserDbDto, ['uid', 'password'] as const){
  tags: CreateTagResDto[]

  constructor(data) {
    super();
    this.nickname = data.nickname;
    this.email = data.nickname;
    this.tags = data.tags.map(tag => (tag.tag.valueOf()))
  }
}