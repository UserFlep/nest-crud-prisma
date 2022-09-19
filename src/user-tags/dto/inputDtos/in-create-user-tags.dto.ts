import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class InCreateUserTagsDto {
  @ApiProperty({example: "[1,3,5,2]", type: 'array', description: "Cписок идентификаторов тегов", items: {type: 'number', description: "Идентификатор тега"}})
  @IsArray()
  tags: number[]
}