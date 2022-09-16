import { OutCreateTagDto } from "../../../tags/dto/outputDtos";
import { ApiProperty } from "@nestjs/swagger";

export class OutGetUserCreatedTagsDto {
  @ApiProperty({description: "Список тегов где пользователь является создателем"})
  tags: OutCreateTagDto[]

  constructor(data) {
    this.tags = data || [];
  }
}