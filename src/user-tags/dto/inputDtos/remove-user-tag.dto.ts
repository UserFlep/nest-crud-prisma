import { PickType } from "@nestjs/swagger";
import { TagDbDto } from "../../../tags/dto/tag-db.dto";

export class RemoveUserTagDto extends PickType(TagDbDto, ['id'] as const){}