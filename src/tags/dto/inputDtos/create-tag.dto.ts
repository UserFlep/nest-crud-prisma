import { OmitType } from "@nestjs/swagger";
import { TagDbDto } from "../tag-db.dto";

export  class CreateTagDto extends OmitType(TagDbDto, ['id', 'creator'] as const){}