import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID, Length } from "class-validator";
import { Transform } from "class-transformer";

export class TagDbDto {
  @ApiProperty({example: "1", description: "Уникальный идентификатор"})
  @IsNumber()
  @Transform(({ value} ) => Number(value))
  id: number;

  @ApiProperty({example: "Тег1", description: "Название"})
  @IsString()
  @Length(2, 40)
  name: string;

  @ApiProperty({example: "d7dc1f44-284b-4fcc-b66c-fd9934b1d390", description: "Идентификатор автора"})
  @IsUUID()
  creator: string;

  @ApiProperty({example: "0", description: "Значение сортировки"})
  @IsNumber()
  @Transform(({ value} ) => Number(value))
  sortOrder: number;
}