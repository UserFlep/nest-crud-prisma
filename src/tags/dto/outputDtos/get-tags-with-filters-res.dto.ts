import { GetTagResDto } from "./get-tag-res.dto";
import { ApiProperty } from "@nestjs/swagger";

class getTagsMeta {
  @ApiProperty({example: 20, description: "Смещение", default: 0})
  readonly offset: number;
  @ApiProperty({example: 99, description: "Количество", default: 10})
  readonly length: number;
  @ApiProperty({example: 232, description: "Общее количество"})
  readonly quantity: number;
}
export class GetTagsWithFiltersResDto {
  data: GetTagResDto[];
  meta: getTagsMeta;
}