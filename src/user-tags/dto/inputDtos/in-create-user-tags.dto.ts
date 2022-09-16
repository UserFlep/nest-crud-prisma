import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class InCreateUserTagsDto {
  @ApiProperty({example: "[1,3,5,2]", description: "Cписок идентификаторов тегов"})
  @IsArray()
  tags: number[]
}