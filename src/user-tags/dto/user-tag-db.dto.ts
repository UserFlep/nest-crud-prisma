import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export class UserTagDbDto {
  @ApiProperty({example: "3", description: "Уникальный идентификатор"})
  @IsNumber()
  id: number;

  @ApiProperty({example: "d7dc1f44-284b-4fcc-b66c-fd9934b1d390", description: "Идентификатор пользовтеля"})
  @IsUUID()
  userId: string;

  @ApiProperty({example: "3", description: "Идентификатор тега"})
  @IsNumber()
  tagId: number;
}