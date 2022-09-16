import { PickType } from "@nestjs/swagger";
import { TagDbDto } from "../../../tags/dto/tag-db.dto";

export class InRemoveUserTagDto extends PickType(TagDbDto, ['id'] as const){}