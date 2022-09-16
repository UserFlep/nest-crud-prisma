import { CreateTagResDto } from "../../../tags/dto/outputDtos";
import { ApiProperty } from "@nestjs/swagger";

export class ResGetUserCreatedTagsDto {
  @ApiProperty({description: "Список тегов где пользователь является создателем"})
  tags: CreateTagResDto[]

  constructor(data) {
    this.tags = data;
  }
}