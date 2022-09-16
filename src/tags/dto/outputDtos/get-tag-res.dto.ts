import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { UserDbDto } from "../../../users/dto/user-db.dto";
import { TagDbDto } from "../tag-db.dto";

class TagCreator extends PickType(UserDbDto, ['uid', 'nickname'] as const){
  constructor(data) {
    super();
    this.uid = data.uid;
    this.nickname = data.nickname;
  }
}

export class GetTagResDto extends OmitType(TagDbDto, ['id', 'creator'] as const){
  @ApiProperty({description: "Создатель тега"})
  readonly creator: TagCreator;

  constructor(data) {
    super();
    this.name = data.name;
    this.sortOrder = data.sortOrder;
    this.creator = new TagCreator(data.user);
  }
}