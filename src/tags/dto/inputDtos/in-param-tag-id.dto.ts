import {PickType} from "@nestjs/swagger";
import { TagDbDto } from "../tag-db.dto";

export  class InParamTagIdDto extends PickType(TagDbDto, ['id'] as const){}