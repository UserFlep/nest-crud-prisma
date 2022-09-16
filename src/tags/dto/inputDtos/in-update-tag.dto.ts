import { PartialType } from "@nestjs/swagger";
import { InCreateTagDto } from "./in-create-tag.dto";

export class InUpdateTagDto extends PartialType(InCreateTagDto){}