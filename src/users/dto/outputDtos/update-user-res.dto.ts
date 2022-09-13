import { OmitType } from "@nestjs/swagger";
import { UpdateUserDto } from "../inputDtos";

export class UpdateUserResDto extends OmitType(UpdateUserDto, ['password'] as const) {}