import { OmitType } from "@nestjs/swagger";
import { TagDbDto } from "../tag-db.dto";

export class CreateTagResDto extends OmitType(TagDbDto, ['creator'] as const) {}