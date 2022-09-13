import { OmitType } from "@nestjs/swagger";
import { UserDbDto } from "../user-db.dto";

export  class CreateUserDto extends OmitType(UserDbDto, ['uid'] as const) {}