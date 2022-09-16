import { OutCreateTagDto } from "../../../tags/dto/outputDtos";
import { ApiProperty } from "@nestjs/swagger";

export class OutCreateUserTagDto {
  @ApiProperty({description: "Обновленный список тегов пользователя"})
  tags: OutCreateTagDto[]

  constructor(data) {
    this.tags = data.tags || [];
  }
}