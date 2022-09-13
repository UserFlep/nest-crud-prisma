import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { UserDbDto } from "../../../users/dto/user-db.dto";
import { TagDbDto } from "../tag-db.dto";

class TagCreator extends PickType(UserDbDto, ['uid', 'nickname'] as const){}

export class GetTagResDto extends OmitType(TagDbDto, ['id', 'creator'] as const){
  @ApiProperty({description: "Создатель тега"})
  readonly creator: TagCreator;
}