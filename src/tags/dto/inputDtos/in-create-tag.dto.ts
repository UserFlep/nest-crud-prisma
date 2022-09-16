import { OmitType } from "@nestjs/swagger";
import { TagDbDto } from "../tag-db.dto";

export  class InCreateTagDto extends OmitType(TagDbDto, ['id', 'creator'] as const){}