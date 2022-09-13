import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export  class FiltersWhitelistDto {
  @ApiProperty({description: "Сортировать по полю сортировки", default: false})
  @Transform(({ value} ) => value !== undefined)
  @IsBoolean()
  sortByOrder: boolean = false;

  @ApiProperty({description: "Сортировать по имени", default: false})
  @Transform(({ value} ) => value !== undefined)
  @IsBoolean()
  sortByName: boolean = false;

  @ApiProperty({example: 20, description: "Смещение", default: 0})
  @IsNumber()
  @Transform(({ value} ) => Number(value))
  offset: number = 0;

  @ApiProperty({example: 99, description: "Количество", default: 10})
  @IsNumber()
  @Transform(({ value} ) => Number(value))
  length: number = 10;
}