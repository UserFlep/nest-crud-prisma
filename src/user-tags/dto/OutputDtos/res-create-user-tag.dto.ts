import { CreateTagResDto } from "../../../tags/dto/outputDtos";
import { ApiProperty } from "@nestjs/swagger";

export class ResCreateUserTagDto {
  @ApiProperty({description: "Обновленный список тегов пользователя"})
  tags: CreateTagResDto[]
}